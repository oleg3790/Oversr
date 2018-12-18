import Axios from 'axios';
import decode from 'jwt-decode';

export const UserService = {
    Login,
    IsAuthenticated
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
        
        // Remove old tokens
        if (localStorage.getItem('authToken')) {
            localStorage.removeItem('authToken');
        }

        localStorage.setItem('authToken', r.data.token);
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

    const decodedToken = decode(token);

    if (Date.now() / 1000 > decodedToken.exp)
    {
        return false;
    } 
    else {
        return true;
    }
}