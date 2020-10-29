import httpRequest from "../../config/axiosConfig";
import { toast } from "react-toastify";

export const setFollowedPosts = () => async (dispatch) => {
  try {
    const option = {
      url: "posts/sub",
      method: "GET",
    };
    const res = await httpRequest(option);
    dispatch({
      type: "SET_POSTS",
      payload: res.data.posts,
    });
  } catch (e) {
    console.log(e);
  }
};

export const setPublicPosts = () => async (dispatch) => {
  try {
    const option = {
      url: "posts",
      method: "GET",
    };
    const res = await httpRequest(option);
    dispatch({ type: "SET_POSTS", payload: res.data });
  } catch (e) {
    console.log(e);
  }
};

export const setFollowUser = (userId) => async (
  dispatch
) => {
  try {
    const option = {
      data: { followId: userId },
      url: "follow",
      method: "PUT",
    };
    const res = await httpRequest(option);
    dispatch({
      type: "SET_FOLLOW_USER",
      payload: res.data.followers,
    });
    dispatch({
      type: "SET_FOLLOWING",
      payload: res.data.following,
    });
  } catch (e) {
    console.log(e);
  }
};

export const setUnFollowUser = (userId) => async (
  dispatch
) => {
  try {
    const option = {
      data: { unFollowId: userId },
      url: "unfollow",
      method: "PUT",
    };
    const res = await httpRequest(option);
    dispatch({
      type: "SET_FOLLOW_USER",
      payload: res.data.followers,
    });
    dispatch({
      type: "SET_FOLLOWING",
      payload: res.data.following,
    });
  } catch (e) {
    console.log(e);
  }
};

// Add Like
export const addLike = (id) => async (dispatch) => {
  try {
    const option = {
      url: `like/${id}`,
      method: "PUT",
    };
    const res = await httpRequest(option);
    dispatch({
      type: "UPDATE_LIKES",
      payload: { id, likes: res.data },
    });
  } catch (e) {
    console.log(e);
  }
};

// Add User Like
export const addUserLike = (id) => async (dispatch) => {
  try {
    const option = {
      url: `like/${id}`,
      method: "PUT",
    };
    const res = await httpRequest(option);
    dispatch({
      type: "UPDATE_USER_LIKES",
      payload: { id, likes: res.data },
    });
  } catch (e) {
    console.log(e);
  }
};

// Remove Like
export const removeLike = (id) => async (dispatch) => {
  try {
    const option = {
      url: `unlike/${id}`,
      method: "PUT",
    };

    const res = await httpRequest(option);

    dispatch({
      type: "UPDATE_LIKES",
      payload: { id, likes: res.data },
    });
  } catch (e) {
    console.log(e);
  }
};

// Remove User Like
export const removeUserLike = (id) => async (dispatch) => {
  try {
    const option = {
      url: `unlike/${id}`,
      method: "PUT",
    };

    const res = await httpRequest(option);

    dispatch({
      type: "UPDATE_USER_LIKES",
      payload: { id, likes: res.data },
    });
  } catch (e) {
    console.log(e);
  }
};

// Add comment
export const addComment = (postId, formData) => async (
  dispatch
) => {
  try {
    const option = {
      url: `comment/${postId}`,
      method: "POST",
      data: formData,
    };
    const res = await httpRequest(option);
    dispatch({
      type: "ADD_COMMENT",
      payload: { data: res.data, postId },
    });

    toast.success("Comment Added.");
  } catch (e) {
    console.log(e);
  }
};

// Add user comment
export const addUserComment = (postId, formData) => async (
  dispatch
) => {
  try {
    const option = {
      url: `comment/${postId}`,
      method: "POST",
      data: formData,
    };
    const res = await httpRequest(option);
    dispatch({
      type: "ADD_COMMENT",
      payload: { data: res.data, postId },
    });
    dispatch({
      type: "ADD_USER_COMMENT",
      payload: { data: res.data, postId },
    });

    toast.success("Comment Added.");
  } catch (e) {
    console.log(e);
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (
  dispatch
) => {
  try {
    const option = {
      url: `comment/${postId}/${commentId}`,
      method: "DELETE",
    };

    const res = await httpRequest(option);

    dispatch({
      type: "REMOVE_COMMENT",
      payload: { data: res.data, postId },
    });

    toast.info("Comment Deleted.");
  } catch (e) {
    console.log(e);
  }
};

// Delete comment
export const deleteUserComment = (
  postId,
  commentId
) => async (dispatch) => {
  try {
    const option = {
      url: `comment/${postId}/${commentId}`,
      method: "DELETE",
    };

    const res = await httpRequest(option);

    dispatch({
      type: "REMOVE_COMMENT",
      payload: { data: res.data, postId },
    });
    dispatch({
      type: "REMOVE_USER_COMMENT",
      payload: { data: res.data, postId },
    });

    toast.info("Comment Deleted.");
  } catch (e) {
    console.log(e);
  }
};
