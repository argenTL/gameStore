import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGamesData = createAsyncThunk(
    'cart/fetchGamesData',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://611e6c6d9771bf001785c44f.mockapi.io/api/items');

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            return data;

        } catch (error) {
            rejectWithValue(error.message)
        }
    }
);

export const addGamesInData = createAsyncThunk(
    'cart/addGamesInData',
    async function(items, {rejectWithValue}) {
        try {
            const response = await axios.post('https://611e6c6d9771bf001785c44f.mockapi.io/api/basket', {
                time: new Date().toLocaleString(),
                orders: {...items},
            });

            if (!response.ok) {
                throw new Error('Can\'t add games. Server error.');
            }
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsInCart: [],
        gamesData: [],
    },
    reducers: {
        setItemInCart: (state, action) => {
            state.itemsInCart.push(action.payload)
        },
        deleteItemFromCart: (state, action) => {
            state.itemsInCart = state.itemsInCart.filter(game => game.id !== action.payload)
        },
    },
    extraReducers: {
        [fetchGamesData.fulfilled]: (state, action) => {
            state.gamesData = action.payload
        },
        [addGamesInData.fulfilled]: (state) => {
            state.itemsInCart = [];
        },
    }
});

export const { setItemInCart, deleteItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;