import React, { Fragment, Suspense, useState } from "react";
import {
    Avatar,
    Badge,
    Grid,
    IconButton,
    makeStyles,
    Modal,
} from "@material-ui/core";
import ReactImageAppear from "react-image-appear";
import LoaderImage from "../images/placeholder.gif";
import SingleComment from "./SingleComment";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CommentForm from "./CommentForm";
import { connect } from "react-redux";
import { addUserLike, removeUserLike } from "../redux/actions/postActions";
import AddCommentIcon from "@material-ui/icons/AddComment";
import FavoriteBorderTwoToneIcon from "@material-ui/icons/FavoriteBorderTwoTone";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import DeleteDialog from "../components/DeleteDialog";

const getModalStyle = () => {
    return {
        top: "10%",
        left: "10%",
        width: "80vw",
        height: "80vh",
    };
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
    },
    modalRightSide: {
        padding: theme.spacing(2),
    },
}));

const ImgMediaCard = ({
    addUserLike,
    removeUserLike,
    post: { _id, caption, comments, likes, image, owner },
    user,
    loginUser,
}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [like, setLike] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);

    let display;

    if (user && _id) {
        display = (
            <Fragment>
                <Suspense>
                    <IconButton onClick={() => setOpen(true)}>
                        <div className="container">
                            <ReactImageAppear
                                src={image.imageUrl}
                                alt="Avatar"
                                className="image"
                                style={{ width: "100%" }}
                                loader={LoaderImage}
                            />
                            <div className="middle">
                                <div className="text">
                                    <FavoriteOutlinedIcon /> {likes.length}
                                    <AddCommentIcon
                                        style={{ margin: "10px" }}
                                    />
                                    {comments.length}
                                </div>
                            </div>
                        </div>
                    </IconButton>
                </Suspense>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div style={modalStyle} className={classes.paper}>
                        <Grid container style={{ display: "flex" }}>
                            <Grid item xs={6}>
                                <img
                                    src={image.imageUrl}
                                    alt="Avatar"
                                    height="100%"
                                    width="100%"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                className={classes.modalRightSide}
                            >
                                <Grid container>
                                    <Grid
                                        item={2}
                                        style={{ marginRight: "10px" }}
                                    >
                                        <Avatar
                                            alt="AvatarImage"
                                            src={
                                                user.avatar
                                                    ? user.avatar.imageUrl
                                                    : "https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png"
                                            }
                                        />
                                    </Grid>
                                    <Grid item={9}>
                                        <h4
                                            style={{
                                                marginTop: "8px",
                                                marginRight: "8px",
                                            }}
                                        >
                                            {user.username}
                                        </h4>
                                    </Grid>
                                    <Grid
                                        item={1}
                                        style={{
                                            position: "absolute",
                                            right: "20px",
                                        }}
                                    >
                                        {owner === loginUser._id && (
                                            <IconButton
                                                onClick={() =>
                                                    setDialogOpen(true)
                                                }
                                            >
                                                <DeleteForeverIcon color="secondary" />
                                            </IconButton>
                                        )}
                                    </Grid>
                                </Grid>

                                <DeleteDialog
                                    open={dialogOpen}
                                    setDialogOpen={setDialogOpen}
                                    postId={_id}
                                />

                                <hr />

                                <p>
                                    <strong>Caption: </strong>
                                    {caption}
                                </p>

                                <div
                                    style={{
                                        height: "250px",
                                        overflowY: "scroll",
                                    }}
                                >
                                    {comments.map((comment) => (
                                        <SingleComment
                                            key={comment._id}
                                            comment={comment}
                                            postId={_id}
                                        />
                                    ))}
                                </div>

                                <div style={{ marginTop: "20px" }}>
                                    {like ? (
                                        <IconButton
                                            onClick={(e) => {
                                                addUserLike(_id);
                                                setLike(false);
                                            }}
                                        >
                                            <Badge
                                                badgeContent={likes.length}
                                                color="primary"
                                            >
                                                <FavoriteBorderTwoToneIcon />
                                            </Badge>
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={(e) => {
                                                removeUserLike(_id);
                                                setLike(true);
                                            }}
                                        >
                                            <Badge
                                                badgeContent={likes.length}
                                                color="primary"
                                            >
                                                <FavoriteOutlinedIcon color="secondary" />
                                            </Badge>
                                        </IconButton>
                                    )}

                                    <Badge
                                        badgeContent={comments.length}
                                        color="primary"
                                    >
                                        <AddCommentIcon />
                                    </Badge>
                                </div>

                                <Fragment>
                                    <CommentForm postId={_id} />
                                </Fragment>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            </Fragment>
        );
    } else {
        display = null;
    }

    return display;
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.userRoot.user,
    };
};

export default connect(mapStateToProps, {
    addUserLike,
    removeUserLike,
})(ImgMediaCard);
