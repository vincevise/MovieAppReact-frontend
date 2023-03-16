import ClearIcon from '@mui/icons-material/Clear';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar'; 
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase'; 
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useContext, useEffect, useRef, useState } from 'react'; 
import Menu from './Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton' 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import debounce from 'lodash.debounce'
import { Context } from '../App';
import { getAllMovies, searchedData } from '../features/movieSlice';
import { useDispatch, useSelector } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavBar() {
 
  const[search,setSearch] = useState('') 
  const moviesData = useSelector(getAllMovies);
  const dispatch = useDispatch();
  
  const changeHandler =  (e) =>{
    setSearch(e.target.value)
  }
  const debounceChangeHandler = useCallback(
    debounce(changeHandler,300),[]
  )
 
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const inputRef = useRef()

  const handleClose =  async () =>{
    
     inputRef.current.children[0].value ='' 
    setSearch('') 
     dispatch(searchedData(''))
     navigate(-1)
  } 
 
  if(search){
    dispatch(searchedData(search))
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
        <Box sx={{display:'flex', alignItems:'center'}}> 
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                <Link style={{color:'inherit',textDecoration:'none'}} to='/'>Movie App</Link>
                
            </Typography>
            {location.pathname !== '/search' && <Menu/>}
            
        </Box>
        <Box sx={{display:'flex',gap:'10px',alignItems:'center'}}>
          <Search>
            <Link to='/search' style={{color:'inherit',textDecoration:'none'}}>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase 
                  // value={search}
                  ref={inputRef}
                  onChange={debounceChangeHandler}
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
            </Link>
            
            <IconButton  onClick={handleClose}>
              {location.pathname === '/search' && <ClearIcon sx={{color:'white'}}/>}
              
            </IconButton>
          </Search>
          <IconButton>
            <AccountCircleIcon fontSize='large' color='white'/>
          </IconButton>
        </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
