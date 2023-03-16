import { Container } from '@mui/material'; 
import React, {  useState } from 'react'
import { useSelector } from 'react-redux'; 
import MovieCard from '../component/MovieCard'; 
import {  getSearchedMovie } from '../features/movieSlice';
import { nanoid } from '@reduxjs/toolkit';

const Search = () => {
   
  const searchedData = useSelector(getSearchedMovie)
  console.log(searchedData)
  const gridStyle = {
    display:'grid',
    gridTemplateColumns: `repeat(auto-fit,minmax(100px,250px))`,
    gridGap:'10px', 
    gridAutoRows: '150px',
    justifyContent:'center',
    marginTop:'30px',
    marginBottom:'200px'
   }
    
  return (
    <Container sx={gridStyle}>
      { searchedData.map((x,i)=>{
        return(<MovieCard key={nanoid()} movie={x} />)
      })} 
   </Container>
  )
}

export default Search