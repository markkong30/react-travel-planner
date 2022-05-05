import React, { createRef, useContext, useEffect, useState } from 'react';
import { Container, FormControl, Select, MenuItem, InputLabel, Grid, Typography, Box, CircularProgress } from '@mui/material';
import PlaceDetails from './PlaceDetails';
import SelectContext from '../context/SelectContext';

const inputs = [
  { label: 'Type', name: 'type', options: ['Restaurants', 'Hotels', 'Attractions'] },
  { label: 'Rating', name: 'rating', options: ['All', 'Above 3', '3 - 4.5', 'Above 4.5'] },
  { label: 'Price', name: 'price', options: ['Any Price', '$ - $$', '$$ - $$$', '$$$ - $$$$'] },
]

const Place = ({ places, isLoading, childClick }) => {
  const { selected, handleType, handleRating, handlePrice } = useContext(SelectContext);
  const [eleRefs, setEleRefs] = useState([]);

  useEffect(() => {
    if (places) {
      setEleRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }
  }, [places])

  const changeOptions = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "type":
        return handleType(value);
      case "rating":
        return handleRating(value);
      case "price":
        return handlePrice(value);
    }
  }

  return (
    <Container sx={{ mt: 5 }} >
      <Box sx={{ display: 'flex', gap: '1rem', mb: 5 }}>
        {inputs.map(ele => (
          <FormControl key={ele.name} sx={{ flex: 1 }} disabled={selected.type == 'Attractions' && ele.name == 'price' ? true : false} >
            <InputLabel sx={{
              '&.MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: 'secondary'
                }
              }
            }} >{ele.label}</InputLabel>
            <Select
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'secondary',
                },
                // '&.Mui-selected': {
                //   background: 'black'
                // }
              }}
              name={ele.name}
              label={ele.name}
              // value={selectedValues[ele.name] || ''}
              value={selected[ele.name] || ''}
              onChange={changeOptions}
            >
              {ele.options.map(ele => (
                <MenuItem key={ele} value={ele}>{ele}</MenuItem>
              ))}
            </Select>
          </FormControl >
        ))}
      </Box>

      {isLoading ?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50vh' }} >
          <CircularProgress color='primary' size='5rem' />
        </Box>
        :
        <Grid container spacing={3} sx={{ overflowY: 'scroll', maxHeight: '76vh' }}>
          {places.length == 0 &&
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50vh' }} >
              <Typography variant='h6' color='primary'>
                Sorry, no places matches your criteria...
              </Typography>
            </Box>
          }

          {places?.map((place, i) => (
            <Grid ref={eleRefs[i]} item xs={12} key={i} >
              <PlaceDetails place={place} selected={Number(childClick) == i} refProp={eleRefs[i]} />
            </Grid>
          ))}
        </Grid>
      }

    </Container >
  );
};

export default Place;