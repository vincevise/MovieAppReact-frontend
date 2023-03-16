import { Box, CircularProgress, Container, LinearProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Container sx={{ 
        display: 'flex', 
        height:'100vh',
        width:'100vw', 
        justifyContent:'center', 
        alignItems:'center'}}>
      <CircularProgress />
    </Container> 
  )
}

export default Loading