import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart/reducer';
import gamesReducer from './games/reducer';
import orderReducer from './order/reducer';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        game: gamesReducer,
        order: orderReducer,
    },
});