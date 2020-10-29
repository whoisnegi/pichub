import React, { forwardRef, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { connect } from "react-redux";
import { deletePost } from "../redux/actions/profileActions";

const Transition = forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = ({
  open,
  setDialogOpen,
  postId,
  setDeletePost,
}) => {
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleClick = async () => {
    await setDeletePost(postId);
    handleClose();
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {
            "Are You Sure, You Want To Delete This Amazing Post?"
          }
        </DialogTitle>

        <DialogActions>
          <Button
            style={{ marginRight: "20px" }}
            variant="outlined"
            onClick={handleClose}
            color="secondary"
          >
            Just Kidding.
          </Button>

          <Button
            variant="outlined"
            onClick={handleClick}
            // onClick={handleClose}
            color="secondary"
          >
            Yes, Delete My Post.
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDeletePost: (postId) => dispatch(deletePost(postId)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AlertDialogSlide);
