import { useCallback, useRef, useState } from 'react';

type BeforeAfterSliderProps = {
    /** One combined image: left half = before, right half = after */
    src: string;
    alt: string;
};

/**
 * Interactive before/after comparison.
 * The combined asset is split in two by rendering it at 200% width twice
 * (left half / right half); the "after" layer is clipped at the handle.
 * Draggable by pointer, and keyboard-accessible through a hidden range input.
 */
export const BeforeAfterSlider = ({ src, alt }: BeforeAfterSliderProps) => {
    const [pos, setPos] = useState(50);
    const frameRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    const moveTo = useCallback((clientX: number) => {
        const frame = frameRef.current;
        if (!frame) return;
        const rect = frame.getBoundingClientRect();
        const pct = ((clientX - rect.left) / rect.width) * 100;
        setPos(Math.min(97, Math.max(3, pct)));
    }, []);

    const onPointerDown = (e: React.PointerEvent) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        moveTo(e.clientX);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        if (dragging.current) moveTo(e.clientX);
    };
    const endDrag = () => { dragging.current = false; };

    return (
        <div
            ref={frameRef}
            className="ba-frame"
            style={{ ['--ba-pos' as string]: `${pos}%` }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
        >
            <div className="ba-layer ba-before" aria-hidden="true">
                <img src={src} alt="" draggable={false} />
            </div>
            <div className="ba-layer ba-after">
                <img src={src} alt={alt} draggable={false} />
            </div>
            <div className="ba-handle" aria-hidden="true">
                <span className="ba-handle-grip">⇔</span>
            </div>
            <span className="ba-tag ba-tag-before" aria-hidden="true">Before</span>
            <span className="ba-tag ba-tag-after" aria-hidden="true">After</span>
            <input
                type="range"
                className="ba-range"
                min={3}
                max={97}
                value={Math.round(pos)}
                aria-label="Before / After の表示割合"
                onChange={e => setPos(Number(e.target.value))}
            />
        </div>
    );
};
