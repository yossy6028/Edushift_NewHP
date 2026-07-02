import { useState } from 'react';

type BeforeAfterSliderProps = {
    /** Two independent, fully self-contained panel images (each already carries its own label) */
    beforeSrc: string;
    afterSrc: string;
    alt: string;
};

/**
 * Before/After comparison. Unlike a drag-slider — which only makes sense when
 * both images share identical framing (e.g. a photo color grade) — these two
 * panels are independent page mockups, each complete with its own title and
 * annotation labels. Dragging a divider across them would always crop one
 * label mid-word, so this toggles between the two FULL images with a crossfade
 * instead, guaranteeing neither is ever cut off.
 */
export const BeforeAfterSlider = ({ beforeSrc, afterSrc, alt }: BeforeAfterSliderProps) => {
    const [showAfter, setShowAfter] = useState(true);

    return (
        <div className="ba-wrap">
            <div className="ba-frame">
                <div className="ba-layer ba-before" aria-hidden={showAfter}>
                    <img src={beforeSrc} alt="" draggable={false} />
                </div>
                <div className={`ba-layer ba-after${showAfter ? ' is-visible' : ''}`} aria-hidden={!showAfter}>
                    <img src={afterSrc} alt={alt} draggable={false} />
                </div>
            </div>
            <div className="ba-toggle" role="group" aria-label="Before / After 切り替え">
                <button
                    type="button"
                    className={`ba-toggle-btn${!showAfter ? ' is-active' : ''}`}
                    onClick={() => setShowAfter(false)}
                    aria-pressed={!showAfter}
                >
                    Before
                </button>
                <button
                    type="button"
                    className={`ba-toggle-btn${showAfter ? ' is-active' : ''}`}
                    onClick={() => setShowAfter(true)}
                    aria-pressed={showAfter}
                >
                    After
                </button>
            </div>
        </div>
    );
};
