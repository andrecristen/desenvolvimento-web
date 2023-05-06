import axios from "axios";

export const URL_API = "http://127.0.0.1:8080";
export const URL_WS = "ws://129.148.45.90";

export const api = axios.create({
    baseURL: URL_API,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
});

export const getProdutosRequest = async () => {
    return api.get('/produtos').then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getProdutoDerivacoesRequest = async (id) => {
    return api.get('/produto/' + id + '/derivacoes').then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const auth = async (email, password) => {
    return api.post('/api/v1/auth/', { username: email, password })
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


