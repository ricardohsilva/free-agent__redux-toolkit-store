import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ProductModel from '../../../models/product.model';
import ProductService from '../../../services/product.service';
import { RootState } from '../../store';

// SERVICES
const productService = new ProductService();

// STATE INTERFACE
export interface SearchState {
    products: ProductModel[];
    isLoading: boolean
}

// INITIAL STATE
const initialState: SearchState = {
    products: [],
    isLoading: false
}

// SELECTORS
export const selectSearch = (state: RootState) => {
    return state.searchStore;
}

// ASYNC TASKS
export const searchProductsAsync = createAsyncThunk(
    'search/searchProductsAsync',
    async (search?: string) => {
        let response = await productService.get();
        if (typeof search === 'string'){
            response = response.filter(product => product.name.includes(search));
        }
         
        return response;
    }
);


// SLICE
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            // Search products
            .addCase(searchProductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(searchProductsAsync.rejected, (state, action) => {
                console.warn("Something Went Wrong - Reducer Search")
            })
    },

});

export default searchSlice.reducer;