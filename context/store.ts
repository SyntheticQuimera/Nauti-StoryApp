import { configureStore } from '@reduxjs/toolkit'
import stepsReducer from '../context/features/stepsSlice'
import storyReducer from '../context/features/storySlice'
import tagsReducer from '../context/features/tagsSlice'



export const store = configureStore({
    reducer: {
        step: stepsReducer,
        story: storyReducer,
        tags: tagsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch