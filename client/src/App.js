import React, { Fragment, useState, useEffect } from "react";
import {
    createMuiTheme,
    CssBaseline,
    Paper,
    ThemeProvider,
} from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.min.css";
import { connect } from "react-redux";
import { loadUser } from "./redux/actions/authActions";

const App = ({ loadUser }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (
            localStorage.getItem("access_token") &&
            localStorage.getItem("user_info")
        ) {
            loadUser();
        }
    }, [loadUser]);

    const theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
        },
    });

    const handleChange = () => {
        setDarkMode(!darkMode);
        // localStorage.setItem("isDarkMode", darkMode);
    };

    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <Paper style={{ minHeight: "100vh" }}>
                    <BrowserRouter>
                        <Navbar checked={darkMode} onChange={handleChange} />
                        <ToastContainer />
                        <Routes />
                        <CssBaseline />
                    </BrowserRouter>
                </Paper>
            </ThemeProvider>
        </Fragment>
    );
};

export default connect(null, { loadUser })(App);
