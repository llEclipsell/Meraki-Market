
// This is how we implement Redux store
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'

export default configureStore({
  reducer: {
    user: userReducer,
    wishlist: []
  }
})
// And then we wrap the main with the redux store

// Note: It refreshes after a reload/re-render
