import jwt from "jsonwebtoken";
import User from "../models/user";

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // It will return an object
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }
        req.token = token; //logout
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please Authenticate" });
    }
};

export default auth;
