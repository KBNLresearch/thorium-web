import { createSlice } from "@reduxjs/toolkit";
import { DocumentTextNodesChunk } from "../helpers/visibleElementHelpers";


export interface ReadAloudExperimentState {
    wnd: Window|null
    lastNavTS: number
    documentTextNodes: DocumentTextNodesChunk[]
    clickedPosition: {x:number,y:number}|null
}

const initialState : ReadAloudExperimentState = {
    wnd: null,
    documentTextNodes: [],
    lastNavTS: 0,
    clickedPosition: null
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
            }
        },
        setClickedPosition: (state, action) => {
            state.clickedPosition = action.payload;
        }
    }
});

export const {
    setWindow,
    setLastNavTS,
    setClickedPosition
} = readAloudExperimentSlice.actions;

export default readAloudExperimentSlice.reducer