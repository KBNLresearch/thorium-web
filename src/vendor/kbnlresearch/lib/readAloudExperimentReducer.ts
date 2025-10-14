import { createSlice } from "@reduxjs/toolkit";
import { DocumentTextNodesChunk } from "../helpers/visibleElementHelpers";


export interface ReadAloudExperimentState {
    wnd: Window|null
    lastNavTS: number
    documentTextNodes: DocumentTextNodesChunk[]
}

const initialState : ReadAloudExperimentState = {
    wnd: null,
    documentTextNodes: [],
    lastNavTS: 0
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
            state.lastNavTS = action.payload;
        }
    }
});

export const {
    setWindow,
    setLastNavTS
} = readAloudExperimentSlice.actions;

export default readAloudExperimentSlice.reducer