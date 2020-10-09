import React, { Fragment, useState } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  makeStyles,
  Badge,
} from "@material-ui/core";
import AddCommentIcon from "@material-ui/icons/AddComment";
import FavoriteBorderTwoToneIcon from "@material-ui/icons/FavoriteBorderTwoTone";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import {
  addLike,
  removeLike,
} from "../redux/actions/postActions";
import { connect } from "react-redux";
import CommentForm from "./CommentForm";
import SingleComment from "./SingleComment";
import { Link } from "react-router-dom";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "100vw",
    margin: "5%",
  },
  media: {
    paddingTop: "56.25%",
    height: 0,
  },
  linkColor: {
    textDecoration: "none",
    color: "#696969",
  },
}));

const MainCards = ({
  addLike,
  removeLike,
  auth,
  post: {
    _id,
    image,
    caption,
    owner,
    likes,
    comments,
    createdAt,
  },
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [like, setLike] = useState(true);

  return (
    <Fragment>
      <Card className={classes.root} elevation={4}>
        <CardHeader
          avatar={
            <Avatar
              alt="AvatarImage"
              src={
                owner.avatar
                  ? owner.avatar.imageUrl
                  : "https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png"
              }
            />
          }
          title={
            <Link
              to={`/open/profile/${owner._id}`}
              className={classes.linkColor}
            >
              <Typography variant="subtitle2">
                {owner.name}
              </Typography>
            </Link>
          }
          subheader={owner.username}
        />
        <CardMedia
          className={classes.media}
          image={image.imageUrl}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {caption}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {like ? (
            <IconButton
              onClick={(e) => {
                addLike(_id);
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
                removeLike(_id);
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
          <IconButton
            onClick={() => setExpanded(!expanded)}
          >
            <Badge
              badgeContent={comments.length}
              color="primary"
            >
              <AddCommentIcon />
            </Badge>
          </IconButton>
        </CardActions>
        <CommentForm postId={_id} />
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <CardContent>
            <strong>Comments:</strong>
            {comments.map((comment) => (
              <SingleComment
                key={comment._id}
                comment={comment}
                postId={_id}
              />
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.userRoot.isAuthenticated,
    addLike: state.publicRoot.posts,
  };
};

export default connect(mapStateToProps, {
  addLike,
  removeLike,
})(MainCards);
