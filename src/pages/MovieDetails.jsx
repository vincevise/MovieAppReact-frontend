import { Chip, Container, Divider, IconButton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { addToMyList, getMyList, removeFromList, selectedMovie } from '../features/movieSlice';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; 
import StarBorderIcon from '@mui/icons-material/StarBorder';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '1px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const MovieDetails = () => {
    const location = useLocation();
    const dispatch = useDispatch()
   
    const movie = useSelector(selectedMovie); 
    const avgRating = movie.ratings.reduce((tot,x)=> tot+x)/movie.ratings.length 
    console.log(movie)

    const myListData = useSelector(getMyList)

    const handleRemove = () =>{ 
        dispatch(removeFromList({title:movie.title, storyline:movie.storyline}))
    }
  
    const handleClick = () =>{ 
        dispatch(addToMyList(movie))
        console.log(myListData)
    }
  return (
    <Container   sx={{
        display:'grid',
        gridTemplateColumns:'1fr 2fr',
        marginTop:'30px'
    }} >
       <Box>
            <img src={movie.posterurl} alt="" />
       </Box>
       <Box >
            <Typography 
                variant="h2" 
                color="initial" 
                ml={5} mb={1}>
                {movie.title}
            </Typography>
            <Divider variant="middle" />
            <Typography 
                variant="h5" 
                color="initial" 
                ml={5} mt={1}>
                {movie.year} 
            </Typography> 
            <Typography ml={5} > 
                    <Chip icon={<StarBorderIcon fontSize='small'/>} label={ avgRating.toFixed(1)} variant="outlined" />
            </Typography>
                
            <Typography variant="h6" color="initial" ml={5} mb={1} mt={1}>
                {movie.genres.map((x)=>{
                    return (<Chip sx={{marginRight:'10px'}} label={x} variant="Filled" />)
                })}
            </Typography>

            <Typography 
                variant="p" 
                color="initial"
                component="p"  ml={5}>
                 {movie.storyline}
            </Typography>
            <Box ml={5}>
                <IconButton>
                    <PlayCircleOutlineIcon fontSize='large'/>
                </IconButton> 

                {myListData.includes(movie) ? 
                    <IconButton onClick={handleRemove}><CheckCircleOutlineIcon fontSize="large"/></IconButton>
                :
                    <IconButton onClick={handleClick}><AddCircleOutlineIcon fontSize="large"/></IconButton>
                }
            </Box>
            <Box>
                <Typography variant='h5' ml={5}>
                    Actors
                </Typography>
                <Typography 
                    variant="p" 
                    color="initial"
                    component="p"  ml={5}>
                    {movie.actors.map((x)=>{
                        return (<p>{x} </p>)
                    })}
                </Typography>
            </Box>
            
       </Box>
    </Container>
  )
}

export default MovieDetails