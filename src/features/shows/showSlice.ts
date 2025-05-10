import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Show } from "../../model/Show";



interface ShowState {
    show: Show[];
    loading: boolean;
    error: string | null;
    categoryName : string
}

const initialState: ShowState = {
    show: [],
    loading: false,
    error: null,
    categoryName : ""
}

export const fetchShows = createAsyncThunk<Show[], string | undefined>("shows/fetchShows", async (genre : string = "") => {
    const res = await axios.get<Show[]>("https://api.tvmaze.com/shows")
    if(genre != "") {
        const categoryShow =  res.data.filter(show => show.genres.includes(genre))
        return categoryShow
    }
    return res.data
})


const showsSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {
        setCategoryName : (state, action:PayloadAction<string>) => {
            state.categoryName = action.payload
        } 
    },
    extraReducers: builder => {
        builder
            .addCase(fetchShows.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchShows.fulfilled, (state, action) => {
                state.show = action.payload
                state.loading = false
            })
            .addCase(fetchShows.rejected, (state, action) => {
                state.loading = true
                state.error =  action.error.message ?? "error"
        })
    },
})

export const {setCategoryName} = showsSlice.actions
export default showsSlice.reducer