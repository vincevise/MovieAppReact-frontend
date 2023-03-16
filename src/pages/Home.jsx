import { Container, Typography,Box, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, getAllMovies, getMoviesStatus } from '../features/movieSlice'  
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick' 
import NewSlider from '../component/NewSlider';   

const Home = () => {
  const dispatch = useDispatch()
  const moviesStatus = useSelector(getMoviesStatus);
  useEffect(()=>{
    if(moviesStatus === 'idle'){
        dispatch(fetchMovies())
    } 
  },[moviesStatus])
  const movies = useSelector(getAllMovies);  

  var slideShowSetting = {
    dots:true,
    infinite:true,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1,
    focusOnSelect:true,
    swipeToSlide:true
  }

  const genres = [
    'movies-coming','top-rated-india','top-rated-movies','movies-in-theaters'
  ]

  
  
  return (
    <> 
    <Box sx={{display:'flex',justifyContent:'center',marginTop:'30px',overflow:'hidden',marginBottom:'20px'}}> 
    <Slider className='slideshow' {...slideShowSetting} >
          {movies.slice(0,4).map((x)=>{
            
            return (
              <div className='slideshowCard' style={{backgroundImage:`url(${x.posterurl})` }}>
                <img src={x.posterurl} alt="" />
              </div>
            )
          })}
            
    </Slider> 
    </Box>
    <Box mt={10} >
      <NewSlider   />  
    </Box> 
     
    </>
  )
}

export default Home