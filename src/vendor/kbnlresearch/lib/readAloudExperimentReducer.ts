import { createSlice } from "@reduxjs/toolkit";
import { DocumentTextNodesChunk } from "../helpers/visibleElementHelpers";


export interface ReadAloudExperimentState {
    wnd: Window|null
    lastNavTS: number
    documentTextNodes: DocumentTextNodesChunk[]
    clickedPosition: {x:number,y:number}|null,
    wordRects: DOMRect[]
}

const initialState : ReadAloudExperimentState = {
    wnd: null,
    documentTextNodes: [],
    lastNavTS: 0,
    clickedPosition: null,
    wordRects: []
}



export const readAloudExperimentSlice = createSlice({
    name: "readAloudExperiment",
    initialState,
    reducers: {
        setWindow: (state, action) => {
            state.wnd = action.payload.window;
            state.documentTextNodes = action.payload.textNodes;
        },
        setLastNavTS: (state, action) => {
            if (state.lastNavTS < action.payload) {
                state.lastNavTS = action.payload;
                state.wordRects = [];
            }
        },
        setClickedPosition: (state, action) => {
            state.clickedPosition = action.payload;
        },
        setWordRects: (state, action) => {
            state.wordRects = action.payload;
        }
    }
});

export const {
    setWindow,
    setLastNavTS,
    setClickedPosition,
    setWordRects
} = readAloudExperimentSlice.actions;

export default readAloudExperimentSlice.reducer