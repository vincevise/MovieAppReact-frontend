import React, { Suspense }  from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom' 
import { fetchCategories, getMovies, getStatus } from '../features/categoriesSlice' 
import Loading from './Loading'
import MovieGrid from '../component/MovieGrid'
import { lazy } from 'react'
// const MovieGrid = lazy(()=>import('../component/MovieGrid'))


const MoviesComing = () => {
   const dispatch = useDispatch();
   const status = useSelector(getStatus)
   const param = useLocation().pathname.slice(1)
 
   useEffect(()=>{ 
         dispatch(fetchCategories(param)) 
   },[param])  

   const data = useSelector(getMovies)  
  return (
         <>
            {/* <Suspense fallback={<Loading/>}>
               <MovieGrid data={data}/>
            </Suspense> */}
            {status === 'loading' ? <Loading/> : <MovieGrid data={data}/>}
             {/* <MovieGrid data={data}/> */}
            
         </>
  )
}



export default MoviesComing