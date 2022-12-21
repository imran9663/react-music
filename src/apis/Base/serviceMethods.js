
//  AxiosInstence Get Request

import axiosInstence from "./index";

export const getRequest = async (url) => {
    try {
        const response = await axiosInstence.get(url);
        return response
    } catch (error) {
        console.log('getRequest error==>', error.response);
        return error.response
    }
}

//  AxiosInstence Post Request

export const postRequest = async (url, data) => {
    try {
        const response = await axiosInstence.post(url, data);
        console.log('postRequest response==>', response);
        return response;
    } catch (error) {
        console.log('postRequest  error==>', error.response);
        return error;
    }
}
export const postRequestWithProgress = async (url, data) => {
    try {
        const response = await axiosInstence.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: data => {
                console.log(Math.round((100 * data.loaded) / data.total));
            },
        });
        // console.log('postRequest response==>', response);
        return response;
    } catch (error) {
        console.log('postRequest  error==>', error.response);
        return error;
    }
}

//  AxiosInstence Put Request
export const putRequest = async (url, data = {}) => {

    try {
        const response = await axiosInstence.put(url, data);
        // console.log('putRequest response==>', response);
        return response;
    } catch (error) {
        console.log('putRequest  error==>', error.response);
        return error;
    }
}

//  AxiosInstence Post Request

export const deleteReqest = async (url, data) => {
    try {
        const response = await axiosInstence.delete(url, data || null);
        // console.log('deleteRequest response==>', response);
        return response;
    } catch (error) {
        console.log('deleteRequest error==>', error)
        return error
    }
}