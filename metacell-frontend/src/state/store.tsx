import { configureStore } from '@reduxjs/toolkit'
import userInformationReducer from './reducers/userInformationSlice'

export const store =  configureStore({
    reducer: {
        userInformationStore: userInformationReducer,
    }, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
    }),
})