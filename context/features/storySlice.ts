import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface storyState {
    value: string
}

const initialState: storyState = {
    value: "",
}

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        updateStory: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        restoreStory: (state) => {
            state.value = ""
        }
    },
})

export const { updateStory, restoreStory } = storySlice.actions

export default storySlice.reducer