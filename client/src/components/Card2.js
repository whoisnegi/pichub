import React, { Suspense } from "react";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { IconButton } from "@material-ui/core";
import ReactImageAppear from "react-image-appear";
import LoaderImage from "../images/placeholder.gif";

export default function ImgMediaCard({ post }) {
    return (
        <Suspense>
            <IconButton>
                <div className="container">
                    <ReactImageAppear
                        src={post.image.imageUrl}
                        alt="Avatar"
                        className="image"
                        style={{ width: "100%" }}
                        loader={LoaderImage}
                    />
                    <div className="middle">
                        <div className="text">
                            <FavoriteOutlinedIcon /> {post.likes.length}
                            <AddCommentIcon style={{ margin: "10px" }} />{" "}
                            {post.comments.length}
                        </div>
                    </div>
                </div>
            </IconButton>
        </Suspense>
    );
}
