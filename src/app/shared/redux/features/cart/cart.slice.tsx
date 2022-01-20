import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';


// STATE INTERFACE
export interface CartState {
    cart: [];
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
            console.log(action)
            return state;
        },
    },

});

// Action creators are generated for each case reducer function
export const { getCart } = cartSlice.actions

export default cartSlice.reducer