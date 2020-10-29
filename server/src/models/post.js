import mongoose, { Schema } from "mongoose";
// import validator from 'validator';
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    image: {
      publicId: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
      },
    },
    caption: {
      type: String,
      trim: true,
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    likes: [
      {
        userId: {
          type: ObjectId,
        },
      },
    ],
    comments: [
      {
        userId: {
          type: ObjectId,
        },
        comment: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
