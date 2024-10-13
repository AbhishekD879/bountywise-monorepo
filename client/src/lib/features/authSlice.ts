import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const getUser = createAsyncThunk('authSlice/getUser', async (_, thunkApi) => {
  const user = await fetch('/api/user/me')
  if (!user.ok) {
    throw new Error((await user.json()).message)
  } else {
    return (await user.json()) as TUser
  }
})

type TUser = {
  id: null | string
  firstName: null | string
  lastName: null | string
  email: null | string
  roleId: null | string
  profilePicture: null | string
}

const initialState: {
  isAuthenticated: boolean
  user: TUser
  loading: boolean
  error: string | null
} = {
  isAuthenticated: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    roleId: null,
    profilePicture: null
  },
  loading: true,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.user = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        roleId: null,
        profilePicture: null
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.isAuthenticated = false
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload && action.payload.email) {
          console.log('payload available', action.payload)
          state.isAuthenticated = true
          state.user = action.payload
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.error.message || 'Failed to fetch user'
        state.user = initialState.user
      })
  }
})

export const { logout } = authSlice.actions
export const authState = (state: RootState) => state.user
export default authSlice.reducer
