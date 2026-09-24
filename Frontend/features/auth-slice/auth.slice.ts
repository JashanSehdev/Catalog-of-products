import type { User } from "@/type/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { googleLogin, loginUser, logoutUser, registerUser } from "./manage-auth/auth.action";


type InitialState = {
  user : User | null
};

const initialState: InitialState = {
  user : null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser : (state, action : PayloadAction<User>) => {
      state.user = action.payload
    },
    logout : (state) => {
        state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled,(state, action: PayloadAction<User>) => {
        state.user = action.payload
    });
    builder.addCase(loginUser.fulfilled,(state, action: PayloadAction<User>) => {
        state.user = action.payload
    } );
    builder.addCase(logoutUser.fulfilled,(state) => {
        state.user = null
    } );
    builder.addCase(googleLogin.fulfilled, (state, action ) => {
        state.user = action.payload
    })
  },
});

export const {setUser, logout} = authSlice.actions

export default authSlice.reducer;
