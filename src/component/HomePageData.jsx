import { Container, Typography,Box, IconButton } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, getAllMovies, getMoviesStatus } from '../features/movieSlice' 
import MovieCard from '../component/MovieCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; 

const HomePageData = ({movies}) => {

    const boxRef = useRef()
    const handleTransition = () =>{
     console.log(boxRef.current)
     // boxRef.current.style.transform = 'translateX(10%)'
     boxRef.current.style.paddingLeft = boxRef.current.style.paddingLeft.slice(0,-2) + 10 +'px'
    }

    const gridStyle = {
        width:'100vw',
        display:'grid',
        gridTemplateColumns: `repeat(10,minmax(200px,250px))`,
        gridGap:'5px',  
        gridAutoRows: '150px',
        justifyContent:'center',
        marginBottom:'50px',
        overflow:'auto',
        paddingLeft:'40px'
       } 

  return (
    <div>
        <Typography variant="h6" color="initial">
        Top Rated
      </Typography>
      
      <Box sx={gridStyle} ref={boxRef} >
        { movies[0].slice(0,10).map((x)=>{
          return(<MovieCard key={x.id + x.title} movie={x} />)
        })  }
      </Box>
      <IconButton onClick={handleTransition}>
        <ChevronRightIcon/>
      </IconButton>
    </div>
  )
}

export default HomePageData