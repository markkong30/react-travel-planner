import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Rating, Container, Box, } from '@mui/material';
import Pin from '../images/pin';
const styles = require('../mapStyle.json')

const Map = ({ setCoords, setBounds, coords, places, weatherData, setChildClick }) => {
  const isMobile = useMediaQuery('(min-width: 600px)');

  const updateCoords = e => {
    const newCoord = { lat: e.center.lat, lng: e.center.lng };
    const { lat, lng } = coords;
    const initialRender = Math.abs(lat - newCoord.lat) < 0.000001 && Math.abs(lng - newCoord.lng) < 0.000001;

    console.log(initialRender, Math.abs(lat - newCoord.lat) > 0.02, Math.abs(lng - newCoord.lng) > 0.02)

    if (initialRender) {
      setCoords({ lat: e.center.lat, lng: e.center.lng });
      setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
      return;
    }

    if (Math.abs(lat - newCoord.lat) > 0.5 || Math.abs(lng - newCoord.lng) > 0.5) {
      setCoords({ lat: e.center.lat, lng: e.center.lng });
      setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
    }
  }

  return (
    <Box sx={{ height: '91.5vh', width: '100%', paddingRight: 0 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={{ lat: 51.5, lng: -0.12 }}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: styles }}
        isMarkerShown={false}
        onChange={updateCoords}
        onChildClick={(child) => setChildClick(child)}
      >
        {places?.map((place, i) => {
          if (!place.photo || !place.name) return;


          return (
            <Box
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              <Pin />
              {/* <Paper
              elevation={1}
              sx={{ width: 70, height: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}

            > */}
              {/* <SentimentVerySatisfied sx={{ color: '#FAAF00' }} fontSize='large' /> */}
              {/* <ReportProblemIcon sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%) rotate(180deg)', fill: 'white', stroke: 'white' }} /> */}
              {/* <Box sx={{ position: 'absolute', bottom: 0, left: '50%', width: 0, height: 0, borderLeft: '15px solid transparent', transform: 'translate(-50%, 70%)', borderRight: '15px solid transparent', borderTop: '20px solid white' }} > */}
              {/* </Box> */}
              {/* </Paper> */}
            </Box>
          )
        })}

        {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </div>
        ))}

      </GoogleMapReact>
    </Box>
  );
};

export default Map;