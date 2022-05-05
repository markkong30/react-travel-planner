import React, { useEffect, useState, useContext } from "react";
import { getPlacesData, getWeatherData } from "../api";
import Place from '../components/Place';
import Map from '../components/Map';
import SelectContext from "../context/SelectContext";
import { CssBaseline, Grid } from "@mui/material";
import Navbar from "../components/Navbar";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState(null);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClick, setChildClick] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { selected: { type, rating, price } } = useContext(SelectContext);

  useEffect(() => {
    setIsLoading(true);

    const fetchPlaces = setTimeout(() => {
      if (bounds) {
        getWeatherData(coords.lat, coords.lng)
          .then(data => {
            setWeatherData(data)
          })

        getPlacesData(type, bounds.sw, bounds.ne)
          .then((data) => {
            console.log(data)
            setPlaces(data)
            // setFilteredPlaces(null)
            setIsLoading(false)
          })
      }
    }, 2000)

    return () => clearTimeout(fetchPlaces)

  }, [type, bounds])

  useEffect(() => {
    let filteredPlaces = [];
    let filteredPlaces2 = [];

    if (places) {
      switch (rating) {
        case 'All':
          filteredPlaces = (places);
          break;
        case 'Above 3':
          filteredPlaces = (places.filter(place => place.rating >= 3))
          break;
        case '3 - 4.5':
          filteredPlaces = (places.filter(place => place.rating >= 3 && place.rating <= 4.5))
          break;
        case 'Above 4.5':
          filteredPlaces = (places.filter(place => place.rating >= 4.5))
          break;
      }

      switch (price) {
        case 'Any Price':
          filteredPlaces2 = filteredPlaces;
          break;
        case '$ - $$':
          filteredPlaces2 = filteredPlaces.filter(place => place.price_level == '$' || place.price_level == '$$' || place.price_level == '$ - $$');
          break;
        case '$$ - $$$':
          filteredPlaces2 = filteredPlaces.filter(place => place.price_level == '$$' || place.price_level == '$$$' || place.price_level == '$$ - $$$');
          break;
        case '$$$ - $$$$':
          filteredPlaces2 = filteredPlaces.filter(place => place.price_level == '$$$' || place.price_level == '$$$$' || place.price_level == '$$$ - $$$$');
          break;
      }
      console.log(filteredPlaces, filteredPlaces2)
      return setFilteredPlaces(filteredPlaces2);
    }

  }, [rating, price, places])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      const { latitude, longitude } = data.coords;
      setCoords({ lat: latitude, lng: longitude });
    })
  }, [])

  return (
    <>
      <Navbar setCoords={setCoords} />
      <Grid container spacing={0} sx={{ width: '100%' }}>
        <Grid item xs={12} md={6}>
          <Place places={filteredPlaces}
            childClick={childClick} isLoading={isLoading} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Map
            setCoords={setCoords}
            coords={coords}
            setBounds={setBounds}
            places={filteredPlaces}
            weatherData={weatherData}
            setChildClick={setChildClick}
          />
        </Grid>

      </Grid>

    </>
  );
};

export default Home;