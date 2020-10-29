import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";

class ColoredLinearProgress extends Component {
  render() {
    const { classes } = this.props;
    return (
      <LinearProgress
        {...this.props}
        classes={{
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary,
        }}
      />
    );
  }
}

const styles = (props) => ({
  colorPrimary: {
    backgroundColor: "#fafafa",
  },
  barColorPrimary: {
    backgroundColor: "#757575",
  },
});

export default withStyles(styles)(ColoredLinearProgress);
