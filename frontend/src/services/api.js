import axios from "axios";

export const URL_API = "http://127.0.0.1:8080";

export const api = axios.create({
    baseURL: URL_API,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
});


export const auth = async (email, password) => {
    return api.post('/usuario/auth', { email: email, senha: password })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error.response;
        });
}

export const create = async (user) => {
    return api.post('/api/v1/user/', user)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error.response;
        });
}