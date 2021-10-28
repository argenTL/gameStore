import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGamesDataBasket = createAsyncThunk(
    'order/fetchGamesDataBasket',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch(`https://611e6c6d9771bf001785c44f.mockapi.io/api/basket`);

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            const dataReverse = data.reverse();

            return dataReverse;

        } catch (error) {
            rejectWithValue(error.message)
        }
    }
);

export const deleteGamesInData = createAsyncThunk(
    'order/deleteGamesInData',
    async function(id, {rejectWithValue}) {
        try {
            const response = await axios.delete(`https://611e6c6d9771bf001785c44f.mockapi.io/api/basket/${id}`, {
                headers: {'Content-Type': 'application/json'},
            });

            if (!response.ok) {
                throw new Error('Can\'t delete games. Server error.');
            }
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
);

const ordersSlice = createSlice({
    name: 'order',
    initialState: {
        gamesInCart: [],
    },
    extraReducers: {
        [fetchGamesDataBasket.fulfilled]: (state, action) => {
            state.gamesInCart = action.payload
        },
        [deleteGamesInData.fulfilled]: (state, action) => {
            state.gamesInCart = []
        },
    }
});

export default ordersSlice.reducer;