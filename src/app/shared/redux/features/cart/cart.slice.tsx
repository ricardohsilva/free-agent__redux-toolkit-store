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
        addToCart: (state, action: PayloadAction<ProductModel>) => {
            state.cart.push(action.payload)
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const newCart:ProductModel[] =[];
            let isRemoved: boolean = false;
            state.cart.forEach(product => {
                if(product.id === action.payload && !isRemoved){
                    isRemoved = true;
                }else{
                    newCart.push(product);
                }
            });

            state.cart = newCart;
            return state
        },
    },

});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer