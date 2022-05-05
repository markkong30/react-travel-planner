import React from "react";
import { CssBaseline, Grid } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SelectProvider } from "./context/SelectContext";

const theme = createTheme({
	palette: {
		primary: {
			main: '#273154',
		},
		secondary: {
			main: '#5A627D',

		}
	},
});

const App = () => {

	return (
		<SelectProvider>
			<ThemeProvider theme={theme}>
				<div className="App">
					<CssBaseline />
					{/* <Navbar /> */}
					<Home />
				</div>
			</ThemeProvider>
		</SelectProvider>

	);
}

export default App;
