import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    token: '',
    user_email: '',
    searches: [{id:0, name:'AWS'}, {id:1, name:'NODE JS'}, {id:2, name:'React JS'}]
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setEmail: (state, action) => {
      state.user_email = action.payload
    },
    setSearches: (state, action) => {
        state.searches = [...state.searches, action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { setName, setToken, setEmail, setSearches } = userSlice.actions

export default userSlice.reducer