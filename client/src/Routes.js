import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AccountActivation from "./pages/AccountActivation";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import FallBack from "./pages/404.jsx";
import UserProfile from "./pages/UserProfile";
import PublicUserProfile from "./pages/PublicUserProfile";
import EditProfileForm from "./pages/EditProfileForm";

const Routes = () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <Route
                    exact
                    path="/auth/activate/:token"
                    // path="/auth/activate"
                    component={AccountActivation}
                />
                {/* Route when user click on forget password or change password */}
                <Route
                    exact
                    path="/forget-password"
                    component={ForgetPassword}
                />
                <Route
                    exact
                    path="/auth/password/reset/:token"
                    // path="/auth/password/reset"
                    component={ResetPassword}
                />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/discover" component={Discover} />
                <PrivateRoute
                    exact
                    path="/profile/edit"
                    component={EditProfileForm}
                />
                <PrivateRoute exact path="/profile" component={UserProfile} />
                <PrivateRoute
                    exact
                    path="/open/profile/:userId"
                    component={PublicUserProfile}
                />
                <Route path="/:fallback" component={FallBack} />
            </Switch>
        </Fragment>
    );
};

export default Routes;
