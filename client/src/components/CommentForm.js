import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import { connect } from "react-redux";
import { addUserComment } from "../redux/actions/postActions";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const CommentForm = ({ postId, addUserComment }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");

  return (
    <div className={classes.margin}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUserComment(postId, { comment });
          setComment("");
        }}
      >
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

          <Grid item sm={2}>
            <Button
              variant="outlined"
              style={{ marginBottom: "10px" }}
              type="submit"
            >
              Post
            </Button>
          </Grid>
          <Grid item sm={1}></Grid>
        </Grid>
      </form>
    </div>
  );
};

export default connect(null, { addUserComment })(
  CommentForm
);
