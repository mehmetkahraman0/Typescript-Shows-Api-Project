import { configureStore } from "@reduxjs/toolkit";
import showReducer from "../features/shows/showSlice"
import searchReducer from '../features/search/searchSlice';
import searchShowsReducer from '../features/shows/searchShowSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import showsWhitIdReducer from '../features/shows/showWhitIdSlice';

export const store = configureStore({
    reducer:{
        show : showReducer,
        search : searchReducer,
        searchShow : searchShowsReducer,
        favorites: favoritesReducer,
        details : showsWhitIdReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch