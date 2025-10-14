import { useAppSelector } from "@/lib"
import { useEffect } from "react"
import { gatherAndPrepareTextNodes, isTextNodeVisible } from "../helpers/visibleElementHelpers";

export function StatefulControlledReadAloudExperiment() {
    const { lastNavTS, wnd, documentTextNodes } = useAppSelector(state => state.readAloudExperiment)
    
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
        }
    }, [lastNavTS])

    return (
        <pre>
            {lastNavTS} - {wnd?.document?.title}
        </pre>
    )
}