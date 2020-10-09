import React, { useEffect, lazy, Suspense, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core"
import LoaderImage from "../images/placeholder.gif";

const Card2 = lazy(() => import("../components/Card2"));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonAuto({ posts, gridImg }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} >
            <AppBar position="static" color="transparent" elevation={0} 
                style={{ marginTop: "20px" }}
            >
                <Tabs
                    centered
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    TabIndicatorProps={{style: {backgroundColor: "#efb6b2"}}}
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="POSTS" {...a11yProps(0)} />
                    <Tab label="SAVED" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {/* User Posts */}
                <Grid container item xs={12} className={gridImg}>
                        {posts &&
                            posts.map((post) => (
                                <Grid item xs={4} key={post._id}>
                                    <Suspense
                                        fallback={
                                            <img
                                                src={LoaderImage}
                                                alt="loader_image"
                                                width={345}
                                            />
                                        }
                                    >
                                        <Card2 post={post} />
                                    </Suspense>
                                </Grid>
                            ))}
                    </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* User Posts */}
                <Grid container item xs={12} className={gridImg}>
                        {posts &&
                            posts.map((post) => (
                                <Grid item xs={4} key={post._id}>
                                    <Suspense
                                        fallback={
                                            <img
                                                src={LoaderImage}
                                                alt="loader_image"
                                                width={345}
                                            />
                                        }
                                    >
                                        <Card2 post={post} />
                                    </Suspense>
                                </Grid>
                            ))}
                    </Grid>
            </TabPanel>
        </div>
    );
}




