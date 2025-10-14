import { useAppSelector } from "@/lib"
import { useEffect } from "react"
import { isTextNodeVisible } from "../helpers/visibleElementHelpers";
import { WebSpeechReadAloudNavigator } from "../readium-speech";


const navigator = new WebSpeechReadAloudNavigator()


export function StatefulControlledReadAloudExperiment() {
    const { lastNavTS, wnd, documentTextNodes, clickedPosition } = useAppSelector(state => state.readAloudExperiment)

    useEffect(() => {
        if (wnd) {
            navigator.loadContent(documentTextNodes.map((dtn, idx) => ({
                id: `${idx}`,
                text: dtn.utteranceStr
            })))
            navigator.on("boundary", (ev) => {
                console.log(navigator.getCurrentContent())
                console.log(ev.detail)
                console.log(documentTextNodes[parseInt(navigator.getCurrentContent()!.id!)])
            })
            wnd.addEventListener("beforeunload", () => navigator.stop())
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
            console.clear()
            documentTextNodes.forEach((dtn, idx) => {
                const mayLogIfVisible = `Text chunk ${idx + 1} - utterance:`;

                dtn.rangedTextNodes.filter((rt) => isTextNodeVisible(wnd, rt.textNode)).forEach((vrtn) => {
                    console.log(mayLogIfVisible);
                    console.log(vrtn.textNode, `--> PoS(${vrtn.parentStartCharIndex}) -->`, dtn.utteranceStr.substring(vrtn.parentStartCharIndex, vrtn.parentStartCharIndex + vrtn.textNode.textContent!.length))
                });
            })
            const utteranceIndices = documentTextNodes.map((dtn, idx) => {
                if (dtn.rangedTextNodes.find((rt) => isTextNodeVisible(wnd, rt.textNode))) {
                    return idx;
                }
                return -1;
            }).filter((idx) => idx > -1);
            if (utteranceIndices.length === 1) {
                navigator.jumpTo(utteranceIndices[0]);
                navigator.play()
            } else if (utteranceIndices.length > 1) {
                navigator.jumpTo(utteranceIndices[1]);
                navigator.play()
            } else {
                navigator.stop()
            }
        }
    }, [lastNavTS])

    return (
        <pre onClick={() => navigator.getState() === 'playing' ? navigator.pause() : navigator.play()}>
           {JSON.stringify(clickedPosition)} {lastNavTS} - {wnd?.document?.title}
        </pre>
    )
}