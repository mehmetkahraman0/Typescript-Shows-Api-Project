import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Show } from "../../model/Show";

interface ShowState {
    searchShow: Show[];
    searchLoading: boolean;
    searchError: string | null;
}

const initialState: ShowState = {
    searchShow: [],
    searchLoading: false,
    searchError: null
}

export const fetchSearchShows = createAsyncThunk("shows/fetchSearchShows", async (searchInput:string) => {
    const res = await axios.get<Show[]>(`https://api.tvmaze.com/search/shows?q=${searchInput}`)
    return res.data
})


const searchShowsSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSearchShows.pending, state => {
                state.searchLoading = true
                state.searchError = null
            })
            .addCase(fetchSearchShows.fulfilled, (state, action) => {
                state.searchShow = action.payload
                state.searchLoading = false
            })
            .addCase(fetchSearchShows.rejected, (state, action) => {
                state.searchLoading = true
                state.searchError =  action.error.message ?? "error"
        })
    },
})


export default searchShowsSlice.reducer