export function isElementVisible(wnd : Window, element : HTMLElement) {
    const style = wnd.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    // Basic visibility checks
    if (style.display === 'none' ||
        style.visibility === 'hidden' ||
        parseFloat(style.opacity) === 0) {
        return false;
    }

    // Check dimensions
    if (rect.width === 0 || rect.height === 0) {
        return false;
    }

    // Check if element is in viewport
    const viewport = {
        width: wnd.innerWidth || wnd.document.documentElement.clientWidth,
        height: wnd.innerHeight || wnd.document.documentElement.clientHeight
    };

    if (rect.bottom < 0 || rect.right < 0 ||
        rect.top > viewport.height || rect.left > viewport.width) {
        return false;
    }
    return true
}

function isTextNodeVisible(wnd : Window, textNode : Node): boolean {
    const range = new Range();
    range.setStart(textNode, 0);
    range.setEnd(textNode, textNode.textContent!.length)
    const rect = range.getBoundingClientRect();
    const viewport = {
        width: wnd.innerWidth || wnd.document.documentElement.clientWidth,
        height: wnd.innerHeight || wnd.document.documentElement.clientHeight
    };
    if (rect.bottom < 0 || rect.right < 0 ||
        rect.top > viewport.height || rect.left > viewport.width) {
        return false;
    }
    return true;
}

export function getVisibleElementsWithOwnText(wnd : Window, currentElement? : Element, gathered? : HTMLElement[]): HTMLElement[] {
    currentElement = currentElement ?? wnd.document.documentElement;
    gathered = gathered ?? [];

    for (let idx = 0; idx < currentElement.childNodes.length; idx++) {
        if (currentElement.childNodes[idx].nodeType === Node.TEXT_NODE && currentElement.childNodes[idx].textContent!.trim().length > 0) {
            if (gathered.indexOf(currentElement as HTMLElement) < 0 && isElementVisible(wnd, currentElement as HTMLElement)) {
                gathered.push(currentElement as HTMLElement);
            }
        } else if (currentElement.childNodes[idx].nodeType === Node.ELEMENT_NODE) {
            getVisibleElementsWithOwnText(wnd, currentElement.childNodes[idx] as Element, gathered);
        }
    }
    return gathered
}

interface TextNodeWithVisibility {
    textNode : Node
    inViewport : boolean
}

function gatherTextNodes(wnd : Window, currentElement : HTMLElement, gathered? : TextNodeWithVisibility[] ): TextNodeWithVisibility[] {
    gathered = gathered ?? []

    for (let idx = 0; idx < currentElement.childNodes.length; idx++) {
        if (currentElement.childNodes[idx].nodeType === Node.TEXT_NODE) {
            gathered.push({
                textNode: currentElement.childNodes[idx],
                inViewport:  isTextNodeVisible(wnd, currentElement.childNodes[idx])
            })
        } else if (currentElement.childNodes[idx].nodeType === Node.ELEMENT_NODE) {
            gatherTextNodes(wnd, currentElement.childNodes[idx] as HTMLElement, gathered);
        }
    }
    return gathered;
}

export function getVisibleOrderedTextRangesFromElementsWithOwnText(wnd : Window, elems : HTMLElement[]): any[] {
    // first purge out the elements that are already accounted for because they are a child
    // of one of the elements in the original list
    const elemsWithChildren = elems.filter((el) => el.childElementCount > 0);
    const purgedElems = elems.filter((el) => elemsWithChildren.indexOf(el.parentElement as HTMLElement) < 0)

    // For each of these root-elements distill all their text-nodes as one utterance
    // also make sure the text range is within the viewport
    const textNodeSentences = purgedElems.map((el) => gatherTextNodes(wnd, el));
    console.log("the text nodes that should be part of the utterance made unique in a nested array: ")
    textNodeSentences.forEach((tns, idx) => {
        console.log(`Utterance Chunk ${idx + 1}:`)
        tns.forEach((tn) => console.log(tn.textNode, tn.inViewport ? "...in viewport" : "...NOT in viewport"));
    })

    return [];
}