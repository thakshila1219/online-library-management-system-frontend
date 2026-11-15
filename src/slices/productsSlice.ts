import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ProductData} from "../modal/ProductData.ts";
import {backendApi} from "../api.ts";

interface ProductState {
    list: ProductData[],
    error: string | null | undefined,
}

const initialState: ProductState = {
    list: [],
    error: null,
}

export const getAllProducts = createAsyncThunk(
    'product/all',
    async () => {
        const response = await backendApi.get("/product/all");
        return await response.data;
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: ((builder) => {
        builder.addCase(getAllProducts.pending,
            () => {
                console.log("Products are loading, please wait...")
            }).addCase(getAllProducts.fulfilled,
            (state, action) => {
                state.list = action.payload;
            }).addCase(getAllProducts.rejected,
            (state, action) => {
                state.error = action.error.message;
                alert("Error fetching products: " + state.error);
            });
    })
})


export const productReducer = productSlice.reducer;