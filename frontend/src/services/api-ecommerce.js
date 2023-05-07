import { api } from "./api";

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

export const registerUsuarioRequest = async (user) => {
    return api.post('/usuario/register', user)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error.response;
        });
}