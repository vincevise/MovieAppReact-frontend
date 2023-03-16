import { Container } from '@mui/system'
import React from 'react'
import MovieCard from './MovieCard';


const MovieSlide = ({data}) => {

    const gridStyle = {
        display:'grid',
        gridTemplateColumns: `repeat(10,minmax(200px,250px))`,
        gridGap:'10px', 
        gridAutoRows: '150px',
        justifyContent:'center',
        marginTop:'30px',
        marginBottom:'150px',
        overflow:'auto'
       }

  return (
    <Container sx={gridStyle}>
    {data.map((x,i)=>{
       return(<MovieCard key={x.id+x.title} movie={x} />)
    })} 
   </Container>
  )
}

export default MovieSlide