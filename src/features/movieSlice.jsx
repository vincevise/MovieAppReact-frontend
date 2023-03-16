import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'


export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ()=> {
     
    const fetch1 = fetch('http://localhost:3023/movies-coming').
        then((res)=>res.json());
    const fetch2 = fetch('http://localhost:3023/movies-in-theaters')
        .then((res)=>res.json());
    const fetch3 = fetch('http://localhost:3023/top-rated-india')
        .then((res)=>res.json())
    const fetch4 = fetch('http://localhost:3023/top-rated-movies')
        .then((res)=>res.json()) 

    const allData = Promise.all([fetch1,fetch2,fetch3,fetch4])
    return allData.then((res)=>res )
})

 
const movieSlice = createSlice({
    name:'movies',
    initialState:{
        movies:[],
        status:'idle',
        error:null,
        myList:[],
        searchedMovie:[],
        selectedMovie:null
    },
    reducers:{
        addToMyList(state,action){
            state.myList.push(action.payload)
        },
        removeFromList(state,action){
            state.myList = state.myList.filter((x)=>{
                return action.payload.storyline !== x.storyline && action.payload.title !== x.title
            })
        },
        selectMovie(state,action){
            state.selectedMovie = action.payload;
        },
        searchedData(state,action){ 
            if(action.payload.trim()!==''){
                state.searchedMovie = state.movies.filter((x)=> x.title.toLowerCase().includes(action.payload.toLowerCase()) || x.storyline.toLowerCase().includes(action.payload.toLowerCase())  )
            } 
        }
    },
    extraReducers(builder){
       builder
            .addCase(fetchMovies.pending, (state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchMovies.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.movies = action.payload.flat() 
            })
            .addCase(fetchMovies.rejected,(state,action)=>{
                state.status = 'failed'
                state.movies = action.error.message
            })
    }
})

export const getAllMovies = (state) => state.movies.movies
export const getMoviesStatus = (state) => state.movies.status
export const getMyList = (state) => state.movies.myList;
export const selectedMovie = (state) => state.movies.selectedMovie;
export const getSearchedMovie = (state) => state.movies.searchedMovie;

export const {addToMyList,removeFromList,selectMovie,searchedData } = movieSlice.actions

export default movieSlice.reducer;