import React, { Fragment, useState } from "react";
import {
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import { connect } from "react-redux";
import { addComment } from "../redux/actions/postActions";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const CommentForm = ({ postId, addComment }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");

  return (
    <Fragment>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item sm={1}>
            <ChatIcon />
          </Grid>
          <Grid item sm={8}>
            <TextField
              label="Add A Comment..."
              fullWidth
              margin="dense"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Grid item sm={1}></Grid>
          <Grid item sm={2}>
            <Button
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                addComment(postId, { comment });
                setComment("");
              }}
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default connect(null, { addComment })(CommentForm);
