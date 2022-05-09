import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Pokemon',
        national_dex_number: "Number",
        generation: "Original Generation",
        types: 'Types',
        abilities: 'Abilities',

    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseDex: (state, action) => { state.national_dex_number = action.payload},
        chooseGen: (state, action) => {state.generation = action.payload},
        chooseType: (state, action) => { state.types = action.payload},
        chooseAbility: (state, action) => { state.abilities = action.payload},
    }
})

// export reducers
export const reducer = rootSlice.reducer;
export const { chooseName, chooseDex, chooseGen, chooseType, chooseAbility } = rootSlice.actions;