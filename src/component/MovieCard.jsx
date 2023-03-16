import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useRef } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToMyList, getMyList, removeFromList, selectedMovie, selectMovie } from '../features/movieSlice';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '1px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function MovieCard({movie}) {
  const location = useLocation()
  const [isHover,setIsHover] = useState(false)
  const cardRef = useRef();
  const avgRating = movie.ratings.reduce((tot,x)=> tot+x)/movie.ratings.length 

  const dispatch = useDispatch();
  const myListData = useSelector(getMyList)

  const handleRemove = () =>{ 
      dispatch(removeFromList(movie))
  }

  const handleClick = () =>{ 
      dispatch(addToMyList(movie))
      console.log(myListData)
  }

  
  
  const handleHover = () =>{
    setIsHover(true) 
  }

  const handleLeave = () =>{
    setIsHover(false)
  }

  const movieCardHover = {
    position:'absolute', 
    zIndex:100, 
    width:'250px'
  }

  const movieCardLeave = {
    position:'static' ,
    zIndex:0, 
  } 
  
  const navigate = useNavigate() 
  const openMovie = () =>{   
    dispatch(selectMovie(movie))
  } 

  console.log(location.pathname)

  return (
    <Card ref={cardRef}    >
      <CCard 
        className='movie-card' 
        sx={isHover ? movieCardHover : movieCardLeave} 
        onMouseEnter={handleHover} 
        onMouseLeave={handleLeave}  
        >
      <CardMedia
        component="img"
        height="150"
        image={movie.posterurl|| ''}
        alt="Paella dish"
      />
      <Box className='card-action'  >
          <Box ml={1} mt={1}    > 
            <Typography variant="subtitle2" component="p">
              {movie.title}  
            </Typography>
          </Box> 
          <Box >
            <IconButton ><PlayCircleIcon fontSize="medium"/></IconButton>
            {myListData.includes(movie) ? 
              <IconButton onClick={handleRemove}><CheckCircleOutlineIcon fontSize="medium"/></IconButton>
            :
              <IconButton onClick={handleClick}><AddCircleOutlineIcon fontSize="medium"/></IconButton>
            }
            <Link  style={{alignSelf:'flex-end'}} to={`/${location.pathname.slice(1)}/${movie.id}` }>
                <IconButton onClick={openMovie}><ExpandCircleDownOutlinedIcon fontSize="medium" /></IconButton>  
            </Link>
             
          </Box>
          <Box ml={2} mb={1}>
            {location.pathname !== '/' &&  
            <Typography variant="caption"  >
               {movie.genres.map((x)=>{
                return (
                  <span> {bull} {x}</span>
                )
               })}
            </Typography>}
            
          </Box>
      </Box>
      </CCard>
    </Card>
  );
}


const CCard = styled(Card)(({theme})=>({
  cursor:'pointer',
    '&:hover':{ 
      animationName:'zoomin',
      animationDuration: '1s',
      animationFillMode: 'forwards',
  },

  '@keyframes zoomin': {
      '0%':{

      },
      '100%':{
          transform: 'scale(1.05,1.05)'
      }
  }
}))
