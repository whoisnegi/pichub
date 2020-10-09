import Axios from "axios";

const axiosDefaultOption = {
    baseURL: process.env.REACT_APP_API,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
    },
    responseType: "json",
};

const createConfig = () => {
    const authToken = localStorage.getItem("access_token");
    const isAuth = !!authToken;
    if (isAuth) {
        axiosDefaultOption.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return axiosDefaultOption;
};

const httpRequest = (options) => {
    const { data, url, method } = options;
    const axiosOption = createConfig();
    return Axios({
        method,
        url,
        data,
        ...axiosOption,
    });
};

export default httpRequest;
