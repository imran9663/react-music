import axios from 'axios';
// let AuthToken = process.env.REACT_APP_RAPID_API_KEY;
// console.log("Authtoken", AuthToken);
const headers = {
    // Authorization: `Bearer AuthToken`,
    // 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    accept: "application/json",
    "accept-language": "en_US",
    "content-type": "application/json",
};
const axiosInstence = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: headers,
});

axiosInstence.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        if (error.response.status === 401) {
            window.location.reload();
            localStorage.clear()
            // hoa_ClearLocal();
            // localStorage.deleteAll();
            // window.location.replace( RouteStrings.login)
        }
        else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
);
axiosInstence.interceptors.request.use(
    (request) =>
        new Promise((resolve, reject) => {
            resolve(request);
        }),
    (error) => {
        if (!error.request) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        if (error.request.status === 401) {
            window.location.reload()
            localStorage.clear()
            // hoa_ClearLocal();
            // localStorage.deleteAll();
            // window.location.replace(RouteStrings.accessdenied)
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
);

export default axiosInstence;
