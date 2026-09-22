import { Product } from "@/type/product.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  delete_product,
  edit_product,
  fetch_all_products,
  post_product,
} from "./list-product/product.action";
import { loadBindings } from "next/dist/build/swc";

type InitialState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  products: [],
  loading: true,
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetch_all_products.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(
      post_product.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      },
    );
    builder.addCase(
      delete_product.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.products = state.products.filter(
          (item) => item.id !== action.payload,
        );
      },
    );
    builder.addCase(
      edit_product.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.products = state.products.map((item) => {
          if (item.id === action.payload.id) return action.payload;
          return item;
        });
      },
    );
  },
});

export default productSlice.reducer;
