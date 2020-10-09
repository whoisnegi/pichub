import React, { useState } from "react";
import {
    Backdrop,
    Fab,
    Fade,
    makeStyles,
    Modal,
    TextField,
    Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import cx from "classnames";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    absolute: {
        border: "2px solid #efb6b2",
        backgroundColor: "#efb6b2",
        color: "white",
        "&:hover": {
            backgroundColor: "white",
            color: "#efb6b2",
            border: "none",
        },
    },
    input: {
        display: "none",
    },
    inputStyle: {},
}));

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [previewFile, setPreviewFile] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const handleChange = (e) => {
        let file = e.target.files[0];
        const types = ["image/png", "image/jpeg", "image/jpg"];
        if (file && types.includes(file.type)) {
            setPreviewFile(URL.createObjectURL(file));
            setFile(file);
            setError("");
            setOpen(true);
            console.log(file);
        } else {
            setError("Please select an image file (png/jpeg)");
            setFile(null);
            console.log(error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <IconButton
                aria-label="upload picture"
                component="span"
                onClick={handleOpen}
                style={{ fontSize: 40 }}
                shadow-4
                className={cx(classes.absolute)}
            >
                <AddIcon />
            </IconButton> */}
            <div>
                <input
                    onChange={handleChange}
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                />
                <Tooltip
                    className={classes.root}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title="Upload a photo"
                    aria-label="add"
                >
                    <Fab className={cx(classes.absolute)}>
                        <label htmlFor="icon-button-file">
                            <AddIcon />
                        </label>
                    </Fab>
                </Tooltip>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {/* <TextField
                            id="standard-multiline-static"
                            multiline
                            rows={3}
                            fullwidth
                            style={{
                                display: "block",
                                marginBottom: '4%'
                            }}
                            placeholder="What's up dude??"
                        /> */}
                        <TextField
                            id="standard-full-width"
                            label="Label"
                            style={{ margin: 8, width: 400 }}
                            placeholder="Placeholder"
                            helperText="Full width!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {previewFile && (
                            <img
                                src={previewFile}
                                alt="uploaded"
                                width={400}
                            ></img>
                        )}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
