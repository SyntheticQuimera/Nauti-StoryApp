import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface tagsState {
    value: []
}

const initialState: tagsState = {
    value: [],
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        updateTags: (state, action: PayloadAction<[]>) => {
            state.value = action.payload
        }
    },
})

export const { updateTags } = tagsSlice.actions

export default tagsSlice.reducer