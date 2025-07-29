
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    // reducers are pure functions that are used to modify the initialState into a new state
    reducers: {
        // Action
        setUserData: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer
