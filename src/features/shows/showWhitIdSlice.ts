import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Show } from "../../model/Show";

interface ShowState {
    show: Show | null;
    detailsLoading: boolean;
    detailsError: string | null;
}

const initialState: ShowState = {
    show: null,
    detailsLoading: false,
    detailsError: null,
}

export const fetchDetailsShows = createAsyncThunk<Show, string | undefined>("shows/fetchDetailsShows", async (id) => {
    const res = await axios.get<Show>(`https://api.tvmaze.com/shows/${id}`)
    return res.data
})


const showsWhitIdSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDetailsShows.pending, state => {
                state.detailsLoading = true
                state.detailsError = null
            })
            .addCase(fetchDetailsShows.fulfilled, (state, action) => {
                state.show = action.payload
                state.detailsLoading = false
            })
            .addCase(fetchDetailsShows.rejected, (state, action) => {
                state.detailsLoading = true
                state.detailsError = action.error.message ?? "error"
            })
    },
})

export default showsWhitIdSlice.reducer