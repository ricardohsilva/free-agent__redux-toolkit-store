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
    selectedProduct: undefined,
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

export const deleteProductAsync = createAsyncThunk(
    'products/deleteProductAsync',
    async (id: number) => {
        const response = await productService.delete(id);
        return response;
    }
);

export const getProductByIdAsync = createAsyncThunk(
    'products/getProductByIdAsync',
    async (id: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        let response: ProductModel | undefined;
        if (id) {
            if (state.productStore.products.length > 0) {
                response = state.productStore.products.find(item => item.id === id);
            } else {
                response = await productService.getById(id);
            }
        } else {
            response = undefined;
        }

        return response;
    }
);

export const saveProductAsync = createAsyncThunk(
    'products/saveProductAsync',
    async (model: ProductModel) => {
        const response = await productService.save(model);
        return { isEdit: model.id ? true : false, data: response };
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
                console.warn("Something Went Wrong")
            })

            // Save products
            .addCase(saveProductAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveProductAsync.fulfilled, (state, action) => {
                if (!action.payload.isEdit) {
                    state.products.push(action.payload.data);
                } else {
                    state.products.forEach((item, index) => {
                        if (item.id === action.payload.data.id) {
                            return state.products[index] = action.payload.data;
                        }
                    });
                }
                state.selectedProduct = action.payload.data;
                state.isLoading = false;
            })
            .addCase(saveProductAsync.rejected, (state, action) => {
                console.warn("Something Went Wrong")
            })

            // Get By Id products
            .addCase(getProductByIdAsync.pending, (state) => {
                state.selectedProduct = undefined;
                state.isLoading = true;
            })
            .addCase(getProductByIdAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload?.id ? action.payload : undefined;
            })
            .addCase(getProductByIdAsync.rejected, (state, action) => {
                console.warn("Something Went Wrong")
            })

            // Delete
            .addCase(deleteProductAsync.pending, (state, action) => {
                state.products.forEach((product, index) => {
                    if (product.id === action.meta.arg) {
                        return state.products[index].isUpdating = true;
                    }
                });
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                console.warn("Something Went Wrong");
            })
    },
});

export default productSlice.reducer