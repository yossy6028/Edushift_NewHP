import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ヒーロー背景の3Dパーティクル演出。
 * 数千〜1.5万個の粒子がフレーズの文字形状に集まり、保持後に次のフレーズへ集散する。
 * - 文字形状は offscreen canvas にテキストを描画してピクセルサンプリングで生成
 * - モーフは aFrom/aTo の2属性を uMorph uniform でGPU補間（JS側の毎フレーム処理はuniformのみ）
 * - マウス反発・スクロール散開・アイドル漂いはすべて頂点シェーダー内で計算
 * - reduced-motion / WebGL2非対応環境では親側で静的フォールバック（透かし文字）を出す前提
 */

type Phrase = { text: string; font?: string };

const PHRASES: Phrase[] = [
    { text: 'SHIFT' },
    { text: 'AI × WEB' },
    { text: 'EduShift' },
];

const HOLD_MS = 3800;   // 文字形状を保持する時間
const MORPH_MS = 2000;  // 集散モーフにかける時間
const BASE_FONT = "900 220px 'Inter', 'Noto Sans JP', sans-serif";

const VERT = /* glsl */ `
attribute vec3 aFrom;
attribute vec3 aTo;
attribute float aRand;
uniform float uMorph;
uniform float uTime;
uniform float uScroll;
uniform float uMouseOn;
uniform float uHalfW;
uniform float uPix;
uniform vec2 uMouse;
varying float vAlpha;
varying float vMix;
void main() {
    // 粒子ごとに開始をずらした smoothstep で「ばらばらに到着する」質感を出す
    float d = aRand * 0.55;
    float t = clamp((uMorph - d) / (1.0 - d), 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 pos = mix(aFrom, aTo, t);

    // アイドル時の漂い（形成後は振幅を絞って輪郭を保つ）
    float amp = mix(2.8, 0.18, t);
    pos.x += sin(uTime * 0.7 + aRand * 43.0) * amp;
    pos.y += cos(uTime * 0.6 + aRand * 29.0) * amp * 0.8;
    pos.z += sin(uTime * 0.5 + aRand * 17.0) * amp * 1.6;

    // カーソル反発
    vec2 dm = pos.xy - uMouse;
    float dist = length(dm);
    float force = smoothstep(16.0, 0.0, dist) * uMouseOn;
    pos.xy += (dm / max(dist, 0.001)) * force * (5.0 + aRand * 5.0);

    // スクロールで外側へ散開しつつ沈む
    pos.xy *= 1.0 + uScroll * 1.5;
    pos.y -= uScroll * 26.0 * (0.3 + aRand);

    vMix = clamp(aTo.x / (uHalfW * 1.7) + 0.5, 0.0, 1.0);
    vAlpha = mix(0.3, 0.8, t) * (1.0 - uScroll * 0.9);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (1.1 + aRand * 1.5) * (150.0 / -mv.z) * uPix;
    gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
precision mediump float;
uniform vec3 uColA;
uniform vec3 uColB;
varying float vAlpha;
varying float vMix;
void main() {
    float a = smoothstep(0.5, 0.08, length(gl_PointCoord - 0.5)) * vAlpha;
    if (a < 0.02) discard;
    gl_FragColor = vec4(mix(uColA, uColB, vMix), a);
}
`;

/**
 * テキストを offscreen canvas に描き、不透過ピクセルを count 個の目標座標へ変換する。
 * 見出しコピー（左上〜中央）と重ならないよう、旧透かし文字と同じ右下領域に配置する。
 */
const samplePhrase = (phrase: Phrase, count: number, halfW: number, halfH: number): Float32Array => {
    const W = 1200;
    const H = 340;
    const cnv = document.createElement('canvas');
    cnv.width = W;
    cnv.height = H;
    const ctx = cnv.getContext('2d', { willReadFrequently: true });
    const out = new Float32Array(count * 3);
    if (!ctx) return out;

    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 長いフレーズでも横幅に収まるまでフォントサイズを詰める
    const font = phrase.font ?? BASE_FONT;
    let size = 220;
    do {
        ctx.font = font.replace(/\d+px/, `${size}px`);
        size -= 10;
    } while (ctx.measureText(phrase.text).width > W * 0.94 && size > 40);
    ctx.fillText(phrase.text, W / 2, H / 2);

    const data = ctx.getImageData(0, 0, W, H).data;
    const pts: number[] = [];
    for (let y = 0; y < H; y += 3) {
        for (let x = 0; x < W; x += 3) {
            if (data[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
        }
    }
    if (!pts.length) return out;

    // ワールド座標系へ変換（x: 右+ / y: 上+、可視範囲は x∈[-halfW,halfW], y∈[-halfH,halfH]）
    // 横長画面: 文字幅はビューポート幅の~62%、旧透かし文字と同じ右下領域
    let scale = (halfW * 1.25) / W;
    let cx = halfW * 0.36;
    let cy = -halfH * 0.42;
    if (halfW < halfH) {
        // 縦長（スマホ）画面: 右下配置だとヒーロー文言・CTAカードの真後ろに隠れ、
        // halfW比例のスケールでは判読不能なほど小さくなるため、
        // 画面幅いっぱい・中央配置でコピーの背後に透かすレイアウトに切り替える
        scale = (halfW * 1.9) / W;
        cx = 0;
        cy = halfH * 0.55; // 中央だとCTAカード、0.4だと細字タグラインに重なるため、太字大見出しの背後へ
    }
    for (let i = 0; i < count; i++) {
        const j = Math.floor(Math.random() * (pts.length / 2)) * 2;
        out[i * 3] = (pts[j] - W / 2) * scale + cx + (Math.random() - 0.5) * 0.25;
        out[i * 3 + 1] = -(pts[j + 1] - H / 2) * scale + cy + (Math.random() - 0.5) * 0.25;
        out[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
    }
    return out;
};

export const ParticleHero = ({ phrases = PHRASES }: { phrases?: Phrase[] }) => {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host || !phrases.length) return;

        let disposed = false;
        let renderer: THREE.WebGLRenderer | null = null;
        let geometry: THREE.BufferGeometry | null = null;
        let material: THREE.ShaderMaterial | null = null;
        let io: IntersectionObserver | null = null;
        let ro: ResizeObserver | null = null;
        let resizeTimer = 0;
        const listeners: Array<() => void> = [];

        const init = () => {
            if (disposed || !host.clientWidth) return;

            const coarse = window.matchMedia('(pointer: coarse)').matches;
            const COUNT = coarse ? 6000 : 15000;
            const CAM_Z = 120;
            const FOV = 40;

            let w = host.clientWidth;
            let h = host.clientHeight;
            let halfH = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAM_Z;
            let halfW = halfH * (w / h);

            try {
                renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: false,
                    powerPreference: 'high-performance',
                });
            } catch {
                return; // WebGL初期化失敗時はCSSの背景演出のみで成立させる
            }
            const pix = Math.min(window.devicePixelRatio, 2);
            renderer.setPixelRatio(pix);
            renderer.setSize(w, h);
            host.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(FOV, w / h, 1, 500);
            camera.position.z = CAM_Z;

            // 初期状態: 全天球に散らばった粒子が最初のフレーズへ集まる
            const scatter = new Float32Array(COUNT * 3);
            const rand = new Float32Array(COUNT);
            for (let i = 0; i < COUNT; i++) {
                const r = 60 + Math.random() * 90;
                const th = Math.random() * Math.PI * 2;
                const ph = Math.acos(Math.random() * 2 - 1);
                scatter[i * 3] = r * Math.sin(ph) * Math.cos(th);
                scatter[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
                scatter[i * 3 + 2] = r * Math.cos(ph) * 0.5;
                rand[i] = Math.random();
            }

            geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
            geometry.setAttribute('aFrom', new THREE.BufferAttribute(scatter, 3));
            geometry.setAttribute('aTo', new THREE.BufferAttribute(samplePhrase(phrases[0], COUNT, halfW, halfH), 3));
            geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
            geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 400);

            const uniforms = {
                uMorph: { value: 0 },
                uTime: { value: 0 },
                uScroll: { value: 0 },
                uMouseOn: { value: 0 },
                uHalfW: { value: halfW },
                uPix: { value: pix },
                uMouse: { value: new THREE.Vector2(9999, 9999) },
                uColA: { value: new THREE.Color('#00c2c7') },
                uColB: { value: new THREE.Color('#2ea8ff') },
            };
            material = new THREE.ShaderMaterial({
                uniforms,
                vertexShader: VERT,
                fragmentShader: FRAG,
                transparent: true,
                depthWrite: false,
                depthTest: false,
                blending: THREE.AdditiveBlending,
            });
            const points = new THREE.Points(geometry, material);
            points.frustumCulled = false;
            scene.add(points);

            // ---- フレーズ巡回 ----
            let idx = 0;
            let morphStart = performance.now();
            const advance = () => {
                if (!geometry) return;
                idx = (idx + 1) % phrases.length;
                const aFrom = geometry.getAttribute('aFrom') as THREE.BufferAttribute;
                const aTo = geometry.getAttribute('aTo') as THREE.BufferAttribute;
                (aFrom.array as Float32Array).set(aTo.array as Float32Array);
                (aTo.array as Float32Array).set(samplePhrase(phrases[idx], COUNT, halfW, halfH));
                aFrom.needsUpdate = true;
                aTo.needsUpdate = true;
            };

            // ---- 入力 ----
            const mouseTarget = new THREE.Vector2(9999, 9999);
            const onMove = (e: PointerEvent) => {
                const rect = renderer!.domElement.getBoundingClientRect();
                if (e.clientY < rect.top || e.clientY > rect.bottom) {
                    mouseTarget.set(9999, 9999);
                    return;
                }
                const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
                mouseTarget.set(nx * halfW, -ny * halfH);
                uniforms.uMouseOn.value = 1;
            };
            const onLeave = () => mouseTarget.set(9999, 9999);
            const onScroll = () => {
                uniforms.uScroll.value = Math.min(Math.max(window.scrollY / Math.max(h, 1), 0), 1);
            };
            if (!coarse) {
                window.addEventListener('pointermove', onMove, { passive: true });
                document.documentElement.addEventListener('pointerleave', onLeave);
                listeners.push(() => {
                    window.removeEventListener('pointermove', onMove);
                    document.documentElement.removeEventListener('pointerleave', onLeave);
                });
            }
            window.addEventListener('scroll', onScroll, { passive: true });
            listeners.push(() => window.removeEventListener('scroll', onScroll));

            // ---- ループ ----
            const animate = (now: number) => {
                uniforms.uTime.value = now / 1000;
                const el = now - morphStart;
                uniforms.uMorph.value = Math.min(el / MORPH_MS, 1);
                if (el > MORPH_MS + HOLD_MS && phrases.length > 1) {
                    advance();
                    morphStart = now;
                }
                uniforms.uMouse.value.lerp(mouseTarget, 0.12);
                if (uniforms.uScroll.value < 1) renderer!.render(scene, camera);
            };
            renderer.setAnimationLoop(animate);

            // ヒーローが画面外の間はループを止める（スクロール後のGPU消費ゼロ）
            io = new IntersectionObserver(([entry]) => {
                renderer?.setAnimationLoop(entry.isIntersecting ? animate : null);
            });
            io.observe(host);

            // リサイズ: 寸法系を更新し、文字ターゲットを取り直す（デバウンス）
            ro = new ResizeObserver(() => {
                if (!renderer || !host.clientWidth) return;
                w = host.clientWidth;
                h = host.clientHeight;
                renderer.setSize(w, h);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                halfW = halfH * (w / h);
                uniforms.uHalfW.value = halfW;
                window.clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(() => {
                    if (!geometry) return;
                    const aTo = geometry.getAttribute('aTo') as THREE.BufferAttribute;
                    (aTo.array as Float32Array).set(samplePhrase(phrases[idx], COUNT, halfW, halfH));
                    aTo.needsUpdate = true;
                }, 350);
            });
            ro.observe(host);
        };

        // フォント読込前にサンプリングするとフォールバック字形で形が崩れるため待つ
        let cancelled = false;
        Promise.race([document.fonts.ready, new Promise(res => setTimeout(res, 1500))])
            .then(() => { if (!cancelled) init(); });

        return () => {
            cancelled = true;
            disposed = true;
            window.clearTimeout(resizeTimer);
            listeners.forEach(off => off());
            io?.disconnect();
            ro?.disconnect();
            renderer?.setAnimationLoop(null);
            geometry?.dispose();
            material?.dispose();
            if (renderer) {
                renderer.dispose();
                renderer.domElement.remove();
            }
        };
    }, [phrases]);

    return <div ref={hostRef} className="m-hero-canvas" aria-hidden="true" />;
};
