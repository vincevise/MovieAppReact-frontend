import moviesReducer from "../features/movieSlice";
import categoriesReducer from "../features/categoriesSlice"; 
import upcomingSlice from "../features/upcomingSlice";
import {configureStore} from '@reduxjs/toolkit' 

export const store = configureStore({
    reducer:{
        movies:moviesReducer,
        category:categoriesReducer,
        upcoming:upcomingSlice
    }
}) 