import axios from 'axios';
import RouteStrings from '../../utils/RouteStrings';
import { loaclStorageStrings } from '../../utils/localStorageStrings';
const token = JSON.parse(localStorage.getItem(loaclStorageStrings.token))
const headers = {
    'Authorization': `Bearer ${token}`,
    'accept': "application/json",
    "accept-language": "en_US",
    "content-type": "application/json",
};

const axiosInstence = axios.create({
    baseURL: process.env.REACT_APP_API_AUTH_URL,
    headers: headers,
});

axiosInstence.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }),
    (error) => {
        console.log("error.response", error?.code)
        if (error.code === 'ERR_NETWORK') {
            window.location.href = RouteStrings.noNetwork
        }
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }

        if (error.response.status === 401) {
            // window.location.reload();
            // localStorage.clear()
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
            console.log("axiosInstence", axiosInstence.headers);
            // window.location.reload()
            // localStorage.clear()
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
);

export default axiosInstence;
