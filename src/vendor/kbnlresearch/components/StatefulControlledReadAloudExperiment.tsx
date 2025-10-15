import { useAppSelector } from "@/lib"
import { useEffect, useState } from "react"
import { isTextNodeVisible } from "../helpers/visibleElementHelpers";
import { WebSpeechReadAloudNavigator } from "../readium-speech";


let navigator = new WebSpeechReadAloudNavigator()
export function StatefulControlledReadAloudExperiment() {
    const { lastNavTS, wnd, documentTextNodes, clickedPosition } = useAppSelector(state => state.readAloudExperiment)
    const [ utteranceIndex, setUtteranceIndex ] = useState<number>(0);

    useEffect(() => {
        if (wnd) {
            navigator.loadContent(documentTextNodes.map((dtn, idx) => ({
                id: `${idx}`,
                text: dtn.utteranceStr
            })));
            navigator.on("boundary", (ev) => {
                const { charIndex, charLength, name } = ev.detail;
                if (name !== "word") { return; }
                const utIdx = parseInt(navigator.getCurrentContent()!.id!)
                console.log(ev.detail, navigator.getCurrentContent()?.text.substring(charIndex, charIndex + charLength));
                let firstTextNodeIndex = -1, lastTextNodeIndex = -1;
                for (let idx = 0; idx < (documentTextNodes[utIdx]?.rangedTextNodes || []).length; idx++) {
                    const rtn = documentTextNodes[utIdx].rangedTextNodes[idx];
                    if (rtn.parentStartCharIndex <= charIndex) {
                        firstTextNodeIndex = idx;
                        lastTextNodeIndex = idx
                    }
                    if (firstTextNodeIndex > -1 && rtn.parentStartCharIndex + rtn.textNode.textContent!.length <= charIndex + charLength) {
                        lastTextNodeIndex = idx
                    }
                }

                if (firstTextNodeIndex > -1) {
                    const sel = wnd.getSelection();
                    sel?.removeAllRanges();
                    for (let rtnIdx = firstTextNodeIndex; rtnIdx <= lastTextNodeIndex; rtnIdx++) {
                        const rtn = documentTextNodes[utIdx].rangedTextNodes[rtnIdx];
                        const chBegin = charIndex - rtn.parentStartCharIndex;
                        const chEnd = charIndex - rtn.parentStartCharIndex + charLength;
                        const rangeBegin = chBegin < 0 ? 0 : chBegin >  (rtn.textNode.textContent || "").length ?  (rtn.textNode.textContent || "").length : chBegin;
                        const rangeEnd = chEnd > (rtn.textNode.textContent || "").length ? (rtn.textNode.textContent || "").length : chEnd 
                        const range = new Range()
                        range.setStart(rtn.textNode, rangeBegin);
                        range.setEnd(rtn.textNode, rangeEnd);
                        sel?.addRange(range);
                    }
                }
                if (navigator.getState() === "playing") {
                    setUtteranceIndex(utIdx)
                }
            })
            wnd.addEventListener("beforeunload", () => {
                navigator.stop();
                navigator.destroy();
                navigator = new WebSpeechReadAloudNavigator();
            })
        }
    }, [wnd]);

    useEffect(() => {
        if (wnd && clickedPosition) {
            console.log("TODO: handle click:")
            console.log(clickedPosition.x, clickedPosition.y)
        }

    }, [clickedPosition])

    useEffect(() => {
        if (wnd) {
            const utteranceIndices = documentTextNodes.map((dtn, idx) => {
                if (dtn.rangedTextNodes.find((rt) => isTextNodeVisible(wnd, rt.textNode))) {
                    return idx;
                }
                return -1;
            }).filter((idx) => idx > -1);
            if (utteranceIndices.length === 1) {
                setUtteranceIndex(utteranceIndices[0])
            } else if (utteranceIndices.length > 1) {
                if (utteranceIndices[1] === 1) {
                    setUtteranceIndex(0)
                } else {
                    setUtteranceIndex(utteranceIndices[1])
                }
            }
        }
    }, [lastNavTS])



    return (
        <pre style={{cursor: "pointer"}} onClick={() => {if (navigator.getState() === "playing") { navigator.pause() } else {navigator.jumpTo(utteranceIndex); navigator.play()}}}>
           {JSON.stringify(clickedPosition)} UTidx:{utteranceIndex} {lastNavTS} - {wnd?.document?.title}
        </pre>
    )
}