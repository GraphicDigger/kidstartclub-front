import { createSlice } from '@reduxjs/toolkit';
import { GAME_MODES, SPECIFICATION_MODES } from '../../const';

export const initialGameModes = {
    [GAME_MODES.SINGLE]: true,
    [GAME_MODES.MULTI]: false,
};

export const initialSpecificationModes = {
    [SPECIFICATION_MODES.INSTRUCTION]: true,
    [SPECIFICATION_MODES.SETTINGS]: false,
    [SPECIFICATION_MODES.ABOUT]: false,
};

const initialState = {
    gameMode: initialGameModes,
    specificationMode: null,
};

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setGameMode: (state, action) => {
            state.gameMode = action.payload;
        },
        setSpecificationMode: (state, action) => {
            state.specificationMode = action.payload;
        },
        resetSpecificationMode: (state) => {
            state.specificationMode = null;
        },
        toggleSpecificationMode: (state) => {
            state.specificationMode = state.specificationMode === SPECIFICATION_MODES.INSTRUCTION ? null : SPECIFICATION_MODES.INSTRUCTION;
        }
    }
});

export const {
    setGameMode,

    setSpecificationMode,
    resetSpecificationMode,
    toggleSpecificationMode,

} = modeSlice.actions;

export default modeSlice.reducer;
