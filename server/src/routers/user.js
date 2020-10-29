import express from "express";
import upload from "../config/multer";
import auth from "../middlewares/auth";
import UserAuthControl from "../controllers/auth";
import AvatarControl from "../controllers/avatar";
import UserControl from "../controllers/user";
import {
  userSignupValidator,
  userSigninValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
} from "../validators/auth";
import { runValidation } from "../validators";

const router = express.Router();

const {
  signup,
  accountActivation,
  login,
  forgetPassword,
  resetPassword,
  logout,
  logoutAll,
} = UserAuthControl;

const {
  checkForUsername,
  userProfile,
  updateUserProfile,
  deleteUserProfile,
  openUserProfile,
  followUser,
  unFollowUser,
  getUserNames,
} = UserControl;

const {
  getAvatar,
  deleteAvatar,
  multerErrHandler,
  uploadAvatar,
} = AvatarControl;

/* 
LOGIN AND SIGNUP ARE PUBLIC ROUTES
*/

// Sign Up
router.post(
  "/user",
  userSignupValidator,
  runValidation,
  signup
);

// Account Activation
router.post("/account-activation", accountActivation);

// Log In
router.post(
  "/user/login",
  userSigninValidator,
  runValidation,
  login
);

// Check if username exists or not
router.post("/user/username/check", checkForUsername);

// Forget Password
router.put(
  "/forget-password",
  forgetPasswordValidator,
  runValidation,
  forgetPassword
);

// Reset Password
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

// Log Out
router.get("/user/logout", auth, logout);

// Log out from every device
router.get("/user/logoutAll", auth, logoutAll);

/* *****************
    Avatar Routes
    **************** */

// upload Profile Picture
router.post(
  "/user/me/avatar",
  auth,
  upload.single("avatar"),
  uploadAvatar,
  multerErrHandler
);

// Get Profile Picture
router.get("/user/me/avatar", auth, getAvatar);

// Delete profile picture
router.delete("/user/me/avatar", auth, deleteAvatar);

//User profile
router.get("/user/me", auth, userProfile);

//Update profile
router.patch("/user/me", auth, updateUserProfile);

// Delete user profile
router.delete("/user/me", auth, deleteUserProfile);

//Public user profile
router.get("/user/open/:id", auth, openUserProfile);

//Follow other user's
router.put("/follow", auth, followUser);

router.put("/unfollow", auth, unFollowUser);

export default router;
