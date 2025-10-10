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

export function getVisibleElementsWithOwnText(wnd : Window, current? : Element, gathered? : HTMLElement[]): HTMLElement[] {
    current = current ?? wnd.document.documentElement;
    gathered = gathered ?? [];

    for (let idx = 0; idx < current.childNodes.length; idx++) {
        if (current.childNodes[idx].nodeType === Node.TEXT_NODE && current.childNodes[idx].textContent!.trim().length > 0) {
            if (gathered.indexOf(current as HTMLElement) < 0 && isElementVisible(wnd, current as HTMLElement)) {
                gathered.push(current as HTMLElement);
            }
        } else if (current.childNodes[idx].nodeType === Node.ELEMENT_NODE) {
            getVisibleElementsWithOwnText(wnd, current.childNodes[idx] as Element, gathered);
        }
    }
    return gathered
}

export function getVisibleOrderedTextRangesFromElementsWithOwnText(wnd : Window, elems : HTMLElement[]): any[] {
    // first purge out the elements that are already accounted for because they are a child
    // of one of the elements in the original list
    const elemsWithChildren = elems.filter((el) => el.childElementCount > 0);
    const purgedElems = elems.filter((el) => elemsWithChildren.indexOf(el.parentElement as HTMLElement) < 0)
    console.log("purged list of elements that should be read out")
    purgedElems.map(console.log);

    return []
}