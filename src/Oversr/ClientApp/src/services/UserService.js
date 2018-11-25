import Axios from 'axios';

export const UserService = {
    Login,
    IsAuthenticated,
    Authenticate
};

async function Login(username, password, onError, onSuccess) {
    Axios.post('/api/UserAccount/Login', {
        username: username,
        password: password
    }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }
    )
        .then(r => {
            if (!r.data.token) {
                onError("Authentication failed");
                return;
            }

            localStorage.setItem("authToken", r.data.token);
            onSuccess();
        })
        .catch(e => {
            onError(e.response.data.message);
        });
}

function IsAuthenticated() {
    // try get token; if doesn't exist, authentication cannot occur
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    return Authenticate(token);
}

async function Authenticate(token) {
    Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    await Axios.get('/api/UserAccount/Authenticate')
        .then(() => { return true; })
        .catch(() => { return false; });
}