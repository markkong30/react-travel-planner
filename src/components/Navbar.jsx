import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css'

const themePrimary = '#273154';

const Navbar = ({ setCoords }) => {
  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoComplete) => setAutoComplete(autoComplete);
  const onPlaceChange = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    console.log(lat, lng)
    return setCoords({ lat, lng });
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar posiiton='static' elevation={0}>
        <Toolbar sx={{ background: 'white', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' noWrap sx={{ color: themePrimary, ml: 2 }}>
            Travel Advisor
          </Typography>
          <Autocomplete onPlaceChanged={onPlaceChange} onLoad={onLoad}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Typography variant='body1' color='primary' sx={{ mr: 2 }}>
                Explore New Places
              </Typography>
              <InputBase placeholder='Search...' sx={{ boxShadow: '0 0 2px rgba(8, 6, 6, 0.2)', px: '0.5rem', borderRadius: 1, width: '200px' }} />
              <IconButton sx={{ color: themePrimary, ml: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Autocomplete>



        </Toolbar>

      </AppBar>
    </Box>
  );
};

export default Navbar;