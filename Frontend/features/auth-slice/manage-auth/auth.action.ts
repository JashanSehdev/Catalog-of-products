import { createAsyncThunk } from "@reduxjs/toolkit";
import type  { GoogleLogin, LoginUser, RegisterUser } from "./auth.type";
import api from "@/app/api/axios";
import { User } from "@/type/user.type";
import { enqueueSnackbar } from "notistack";


export const registerUser = createAsyncThunk(
    'auth/register-user',
    async (user : RegisterUser) => {
        try{
             const response = await api.post('auth/register', user);

             if (!response.data) throw new Error ('Error occur while register');

             return response.data as User
        } catch (err : any) {
            console.error(err);
            
            const status = err?.response?.status;
            const message = err?.response.message || 'registration failed';
            enqueueSnackbar(`register failed..!! ${message}` , {variant: "error"})
            throw err
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login-user',
    async (credentials : LoginUser) => {
        try{
             const response = await api.post('auth/login', credentials);

             if (!response.data) throw new Error ('Error occur while register');

             return response.data as User
        } catch (err) {
            console.error(err);
             enqueueSnackbar("login failed..!!", {variant: "error"})
            throw err
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        try{
             const response = await api.get('auth/logout');

             if (!response.data) throw new Error ('Error occur while logout');

             return response.data
        } catch (err) {
            console.error(err);
            enqueueSnackbar("logout failed..!!", {variant: "error"})
            throw err
        }
    }
)

export const googleLogin = createAsyncThunk(
    'auth/google-login-user',
    async (credentials : GoogleLogin) => {
        try{
             const response = await api.post('auth/google', credentials);

             if (!response.data) throw new Error ('Error occur while login');
     
             return response.data as User
        } catch (err) {
            console.error(err);
            throw err
        }
    }
)