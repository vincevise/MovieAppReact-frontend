import { Container } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from '../component/MovieCard'
import MovieGrid from '../component/MovieGrid'
import { getMyList } from '../features/movieSlice'

const Favourites = () => {
  const data = useSelector(getMyList)
 
  return ( 
    <MovieGrid data={data}/>
  )
}

export default Favourites