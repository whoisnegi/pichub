const initialState = {
    posts: null,
    user: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROFILE":
            return {
                ...state,
                posts: action.payload.posts,
                user: action.payload.user,
            };
        case "ADD_POST":
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                postUploading: true
            };
        default:
            return state;
    }
};

export default profileReducer;
