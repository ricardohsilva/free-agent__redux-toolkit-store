import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ProductModel from '../../../models/product.model';
import { RootState } from '../../store';


// STATE INTERFACE
export interface CartState {
    cart: ProductModel[];
}

// INITIAL STATE
const initialState: CartState = {
    cart: [],
}

// SELECTORS
export const selectCart = (state: RootState) => {
    return state.cartStore;
}


// SLICE
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state, action: PayloadAction<string>) => {
            return state;
        },
        addToCart: (state, action: PayloadAction<ProductModel>) => {
            console.log('aqui')
            state.cart.push(action.payload)
            // return state;
        },
    },

});

// Action creators are generated for each case reducer function
export const { getCart, addToCart } = cartSlice.actions

export default cartSlice.reducer