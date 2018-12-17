import axios from 'axios';

const headers = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    }
}

export const RequestHandler = {
    Get,
    Post
};

async function Get(requestUrl) {
    const result = await axios.get(requestUrl, headers);
    return await result.data;
}

async function Post(requestUrl, data) {
    const result = await axios.post(requestUrl, data, headers);
    return await result.data;
}