import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCategories = createAsyncThunk('category/fetchCategories',async (data)=>{
    return fetch(`http://localhost:3023/${data}`)
        .then((res)=> res.json())
})

const categoriesSlice = createSlice({
    name:'category',
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
                state.status = 'succeeded',
                state.category = action.payload
            })
            .addCase(fetchCategories.rejected,(state,action)=>{
                state.status = 'failed',
                state.error = action.error.message
            })
    }
})

export const getMovies = (state) => state.category.category
export const getStatus = (state) => state.category.status 

export default categoriesSlice.reducer