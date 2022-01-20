import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ProductModel from '../../../models/product.model'
import ProductService from '../../../services/product.service';
import { RootState } from '../../store';

// SERVICES
const productService = new ProductService();

// STATE INTERFACE
export interface ProductState {
    products: ProductModel[];
    isLoading: boolean;
    selectedProduct: ProductModel | undefined;
}

// INITIAL STATE
const initialState: ProductState = {
    products: [],
    isLoading: false,
    selectedProduct: undefined
}

// SELECTORS
export const selectProducts = (state: RootState) => {
    return state.productStore;
}


// ASYNC TASKS
export const getProductsAsync = createAsyncThunk(
    'products/getProductsAsync',
    async () => {
        const response = await productService.get();
        return response;
    }
);


// SLICE
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            // Get products
            .addCase(getProductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(getProductsAsync.rejected, (state, action) => {
                console.warn("Something Went Wrong - Reducer Products")
            })
    },
});

export default productSlice.reducer