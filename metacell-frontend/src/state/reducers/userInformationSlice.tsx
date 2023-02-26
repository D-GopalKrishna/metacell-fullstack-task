import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '',
    userinfo: {},
}   

export const userInformationSlice = createSlice({
    name: 'userInformation',
    initialState,
    reducers: {
        setupUserInformation: (state, action) => {
            let response = action.payload
            state.token = response.token
            state.userinfo = response.userinfo
        },
    },
})

// Action creators are generated for each case reducer function
export const { setupUserInformation } = userInformationSlice.actions

export default userInformationSlice.reducer