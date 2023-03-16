 import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Slider from 'react-slick'
import { fetchCategories, getMovies, getStatus } from '../features/categoriesSlice'
import MovieCard from './MovieCard'
import MovieGrid from './MovieGrid'
import MovieSlide from './MovieSlide'
 
 const MoviesComingSlider = () => {

  const dispatch = useDispatch();
  const status = useSelector(getStatus)
  const path = 'movies-coming';

  useEffect(()=>{
    dispatch(fetchCategories(path))
  },[])

  var setting = { 
    infinite:true,
    speed:500,
    slidesToShow:8,
    slidesToScroll:1,
    focusOnSelect:true
  }

  const data = useSelector(getMovies);
  // console.log(data)
   return (
    <Box sx={{width:'98vw',marginLeft:'auto',marginRight:'auto'}} mt={5}>
      <Typography variant='h5' ml={3}>
        Upcoming
      </Typography>
      {
        status !== 'loading' 
        &&  
        <MovieSlide data={data.slice(0,10)} />
            
      }
      
    </Box>
   )
 }
 
 export default MoviesComingSlider