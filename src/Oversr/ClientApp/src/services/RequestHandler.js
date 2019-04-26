import axios from 'axios';

function getHeaders() {
    const token = localStorage.getItem('authToken');

    return {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        }
    };
}

export const RequestHandler = {
    Get,
    Post,
    Put
};

async function Get(requestUrl) {
    const headers = getHeaders();
    const result = await axios.get(requestUrl, headers);
    return await result.data;
}

async function Post(requestUrl, data) {
    const headers = getHeaders();
    const result = await axios.post(requestUrl, data, headers);
    return await result.data;
}

async function Put(requestUrl, data) {
    const headers = getHeaders();
    const result = await axios.put(requestUrl, data, headers);
    return await result.data;
}