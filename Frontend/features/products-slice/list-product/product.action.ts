import api from "@/app/api/axios";
import { Post_product, Product } from "@/type/product.type";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetch_all_products= createAsyncThunk(
    'products/fetch_all_products',
    async() => {
        try{
            const response = await api.get('/product');
            if (!response.data) throw new Error('Respone not found');

            return response.data as Product[]
            
        } catch(err) {
            console.error(err)
            throw err
        }
        
    }
)

export const post_product= createAsyncThunk(
    'products/post_product',
    async(product: Post_product) => {
        try{
            const response = await api.post('/products', product);
            if (!response.data) throw new Error('Error occur while sending data')

            return response.data as Product
            
        } catch(err) {
            console.error(err)
            throw err
        }
        
    }
)

export const edit_product= createAsyncThunk(
    'products/edit_product',
    async(product: Product) => {
        try{

            const response = await api.put('/products', product);
            if (!response.data) throw new Error('Error occur while updating data')

            return response.data as Product
            
        } catch(err) {
            console.error(err)
            throw err
        }
        
    }
)


export const delete_product= createAsyncThunk(
    'products/delete_product',
    async(id : string) => {
        try{

            const response = await api.delete(`/products/${id}`);
            if (!response.data) throw new Error('Error occur while sending data')

            return response.data as string
            
        } catch(err) {
            console.error(err)
            throw err
        }
        
    }
)

