import React, { Fragment } from "react";
import { TextField } from "@material-ui/core";

const MuiInput = (props) => {
  const {
    name,
    label,
    type,
    value,
    error = null,
    onChange,
    ...other
  } = props;

  return (
    <Fragment>
      <TextField
        variant="outlined"
        fullWidth={true}
        name={name}
        label={label}
        type={type}
        multiline={false}
        rows={1}
        value={value}
        onChange={onChange}
        autoComplete="off"
        {...other}
        size="small"
        // If error is not null then we'll do rest of the operations
        {...(error && {
          error: true,
          helperText: error,
        })}
      />
    </Fragment>
  );
};

export default MuiInput;
