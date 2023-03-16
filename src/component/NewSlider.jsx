import styled from '@emotion/styled'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react' 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useDispatch, useSelector } from 'react-redux'; 
import MovieCard from './MovieCard';
import { fetchCategories, getMovies, getStatus } from '../features/upcomingSlice';

const NewSlider = () => {  

    const dispatch = useDispatch();
    const status = useSelector(getStatus) 
  
    useEffect(()=>{
        if(status==='idle'){
            dispatch(fetchCategories())
        }
      
    },[status])
    const data = useSelector(getMovies);

    const [counter,setCounter] = useState(6);
    const [transition,setTransition] = useState('300ms')

    const boxStyle = { 
        width:'95vw',
        marginRight:'auto',
        marginLeft:'auto',  
        height:'260px',
        display:'flex',
        alignItems:'flex-start',
        paddingLeft:'10px',
        paddingRight:'10px',
        position:'relative' 
    }


   useEffect(()=>{
    console.log(counter)
    if(counter === 16){
        setTransition('none')
        setCounter(6); 
    }else if(counter === 0){
        setTransition('none')
        setCounter(16); 
    }

   },[counter])
    

    const handleClickRight = () => {
        
        setTransition('300ms')
        setCounter(counter + 1)
        console.log(counter) 
    }

    const handleClickLeft = () => {
        setTransition('300ms')
        setCounter(counter - 1)
        console.log('left')
    }

    
    const slideStyle = {
        transition:transition,
        transform : `translateX(-${220 * counter}px)`,
    } 
    
    const rightButtonStyle = {
        '&:hover':{
            transition:'300ms',
            background: 'rgb(255,255,255)',
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 0%, rgba(0,0,0,0.7) 100%)'
        }   
    }

    const leftButtonStyle = {
        '&:hover':{ 
            transition:'300ms',
            background: 'rgb(255,255,255)',
            background: 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.0984768907563025) 0%, rgba(0,0,0,0.7) 100%)'
        }   
    }


    

  return (
    <>
    <Typography variant='h6' ml={5}  >
        Upcoming
    </Typography>
    <Box className='boxstyle'  sx={boxStyle} >
        <Slider sx={slideStyle} mt={1}>
        {
            status === 'succeeded' 
            && 
            data.slice(4,10).map((x,i)=>{
                return(
                    <CustomDiv key={x.id+ x.title}>
                        <MovieCard key={x.id+x.title} movie={x} />
                    </CustomDiv>
                    )
            })    
        }    
        {
        status === 'succeeded' 
        && 
        data.slice(0,10).map((x,i)=>{
            return(
                <CustomDiv key={x.id+ x.title}>
                    <MovieCard key={x.id+x.title} movie={x} />
                </CustomDiv>
                )
         })    
        }
        {
        status === 'succeeded' 
        && 
        data.slice(0,6).map((x,i)=>{
            return(
                <CustomDiv key={x.id+ x.title}>
                    <MovieCard key={x.id+x.title} movie={x} />
                </CustomDiv>
                )
         })    
        }
       
        </Slider>
        <CIconButton sx={{ right:'0', ...rightButtonStyle }} onClick={handleClickRight}>
            <ChevronRightIcon/>
        </CIconButton>
        <CIconButton sx={{ left:'0',...leftButtonStyle }} onClick={handleClickLeft}>
            <NavigateBeforeIcon/>
        </CIconButton>
    </Box>
    </>
  )
}

export default NewSlider

const CustomDiv = styled('div')(({ theme }) => ({ 
    minWidth:'250px', 
    height:'250px',
    margin:'10px', 
  }));

const Slider = styled(Box)(({ theme }) => ({ 
     display:'flex'
}));

const CIconButton = styled(Button)(({theme})=>({
    position:'absolute'  ,
    top:'18px',
    zIndex:100, 
    height:'150px',
    // border:'1px solid red', 
    borderRadius:'none',
    transition:'300ms'
}))