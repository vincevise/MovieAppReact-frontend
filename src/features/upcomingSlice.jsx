import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCategories = createAsyncThunk('category/fetchCategories',async ()=>{
    return fetch(`http://localhost:3023/movies-coming`)
        .then((res)=> res.json())
})

const upcomingSlice = createSlice({
    name:'upcoming',
    initialState:{
        category:[],
        status:'idle',
        error:null
    },
    reducers:{

    },
    extraReducers(builder){
        builder
            .addCase(fetchCategories.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.upcoming = action.payload
            })
            .addCase(fetchCategories.rejected,(state,action)=>{
                state.status = 'failed',
                state.upcoming = action.error.message
            })
    }
})

export const getMovies = (state) => state.upcoming.upcoming
export const getStatus = (state) => state.upcoming.status 

export default upcomingSlice.reducer