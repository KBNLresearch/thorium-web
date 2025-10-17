import { useAppSelector } from "@/lib";
import { CSSProperties } from "react";
import "./highlighting.css";

function getAbsoluteRectCSSPosition(container : HTMLDivElement, rect : DOMRect): CSSProperties {
    return {
        position: "absolute",
        top: `${(container?.offsetTop || 0) + rect.top}px`,
        left: `${(container?.offsetLeft || 0) + rect.left}px`,
        width: `${rect.right - rect.left}px`,
        height: `${rect.bottom - rect.top}px`,

        pointerEvents: "none"
    }
}

export function StatefulControlledReadAloudExperimentHighlights({ container } : { container : HTMLDivElement|null}) {
    const { wordRects } = useAppSelector(state => state.readAloudExperiment);
    if (!container) { return null; }
    return <>
        {wordRects.map((rect, idx) => (
            <div className="word-highlight" key={`word-rect-${idx}`} style={{...getAbsoluteRectCSSPosition(container, rect)}} >
                
            </div>
        ))}
    </>
}