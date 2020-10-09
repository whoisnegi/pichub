import React, {
  forwardRef,
  Fragment,
  useState,
} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@material-ui/core";

const Transition = forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setDialogOpen }) {

  const handleClose = ({ open }) => {
    setDialogOpen(false);
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
            variant="outlined"
            onClick={handleClose}
            color="secondary"
          >
            Just Kidding.
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            color="secondary"
          >
            Yes, Delete My Post.
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
