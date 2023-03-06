import { createSlice } from '@reduxjs/toolkit'

export interface stepsState {
    value: number
}

const initialState: stepsState = {
    value: 1,
}

export const stepsSlice = createSlice({
    name: 'steps',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        restore: (state) => {
            state.value = 1
        }

    },
})

export const { increment, decrement, restore } = stepsSlice.actions

export default stepsSlice.reducer