import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { useLocation } from 'react-router-dom'
import MovieGrid from '../component/MovieGrid'
import { fetchCategories, getMovies, getStatus } from '../features/categoriesSlice' 
import Loading from './Loading'

const InTheater = () => { 
   const dispatch = useDispatch();
   const status = useSelector(getStatus)
   const param = useLocation().pathname.slice(1)
 
   useEffect(()=>{ 
         dispatch(fetchCategories(param)) 
   },[param])  

   const data = useSelector(getMovies) 
  
  return (<>
            {status === 'loading' ? <Loading/> : <MovieGrid data={data}/>}
         </>
  )
}

export default InTheater