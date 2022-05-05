import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
	// console.log(sw, ne, typeof sw.lat, typeof ne.lng);

	const options = {
		method: "GET",
		url: `https://travel-advisor.p.rapidapi.com/${type.toLowerCase()}/list-in-boundary`,
		params: {
			bl_latitude: sw.lat.toString(),
			tr_latitude: ne.lat.toString(),
			bl_longitude: sw.lng.toString(),
			tr_longitude: ne.lng.toString(),
		},
		headers: {
			"X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
			"X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
		},
	};

	try {
		const response = await axios.request(options);
		return response.data.data;
	} catch (err) {
		console.log(err);
	}
};

export const getWeatherData = async (lat, lng) => {
	const options = {
		method: "GET",
		url: "https://community-open-weather-map.p.rapidapi.com/find",
		params: {
			lat: lat,
			lon: lng,
		},
		headers: {
			"X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
			"X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};
