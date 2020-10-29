import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error("Age must be a positive number");
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error('Password shouldn\'t be "password".');
                }
            },
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        bio: {
            type: String,
            trim: true,
        },
        avatar: {
            public_id: {
                type: String,
            },
            imageUrl: {
                type: String,
            },
        },
        followers: [
            {
                userId: {
                    type: ObjectId,
                },
            },
        ],
        following: [
            {
                userId: {
                    type: ObjectId,
                },
            },
        ],
        savedPosts: [{ type: ObjectId }],
    },
    {
        timestamps: true,
    }
);

userSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "owner",
});

// .methods -> methods that available on the instances, called as Instances methods
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.__v;
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};

// attaching a method to user schema  (User)
// statics -> Attaching the method to model, called as Model methods
userSchema.statics.findByCredentials = async (email, password) => {
    // we can use this method through 'User' model
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Email doesn't exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Wrong Password");
    }
    return user;
};

// mongoose middleware
// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        // it will be true while signup and when password gets modified
        user.password = await bcrypt.hash(
            user.password,
            Number(process.env.ROUND)
        );
    }
    next();
});

// userSchema.pre('remove', async function (next) {
//     const user = this;
//     await Menstrual.findOneAndRemove({ owner: user._id });
//     next();
// });

// User Model
const User = mongoose.model("User", userSchema);
export default User;
