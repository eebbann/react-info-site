import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
   data : null,
   token : '',
   firstname : '',
   lastname: '',
   email: ''
  },
  reducers: {
    majUser: (state, action) => {
        state.data = action.payload;
        state.token = action.payload.token;
        state.firstname = action.payload.tokenParsed.given_name;
        state.lastname = action.payload.tokenParsed.family_name;
        state.email = action.payload.tokenParsed.email
       },
    disconnectUser: (state) => {
        state.data = null;
        state.token = '';
        state.firstname = '';
        state.lastname = '';
        state.email = ''
      }

  },
})

export const { majUser, disconnectUser} = userSlice.actions

export const get_userData =(state)=>state.user.data
export const get_token =(state)=>state.user.token
export const get_firstname =(state)=>state.user.firstname
export const get_lastname = (state) => state.user.lastname
export const get_email = (state) => state.user.email

export default userSlice.reducer