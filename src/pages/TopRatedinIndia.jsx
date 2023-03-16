import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import MovieCard from '../component/MovieCard'
import MovieGrid from '../component/MovieGrid'
import { fetchCategories, getMovies, getStatus } from '../features/categoriesSlice'
import { getAllMovies } from '../features/movieSlice'
import Loading from './Loading'

const TopRatedinIndia = () => {
   const dispatch = useDispatch();
   const status = useSelector(getStatus)
   const param = useLocation().pathname.slice(1)
 
   useEffect(()=>{ 
         dispatch(fetchCategories(param)) 
   },[param])  

   const data = useSelector(getMovies)    
 
  return (
   <>
      {status === 'loading' ? <Loading/> : <MovieGrid data={data}/>}
   </>
  )
}

export default TopRatedinIndia