import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Show } from "../../model/Show";

interface FavoritesState {
    favorites: Show[]
}

const initialState: FavoritesState = {
    favorites: []
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        controlFavorites: (state, action: PayloadAction<Show>) => {
            const control = state.favorites.find(show => show.id == action.payload.id)
            if (control) {
                state.favorites = state.favorites.filter(show => show.id !== action.payload.id)
            } else {
                state.favorites.push(action.payload)
            }

        }
    }
})


export const { controlFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer