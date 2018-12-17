import axios from 'axios';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
}

export const RequestHandler = {
    Get
}

async function Get(requestUrl) {
    const result = await axios.get(requestUrl, { headers: headers });
    return await result.data;
}