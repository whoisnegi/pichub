// if error occurs in auth file, we'll catch those errors here

import { validationResult } from "express-validator";

export const runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};
