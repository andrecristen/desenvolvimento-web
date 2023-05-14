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

export const getCartoes = async (token) => {
    return api.get('/cartoes/' + token).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getEnderecos = async (token) => {
    return api.get('/enderecos/' + token).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const registerEnderecoRequest = async (address) => {
    return api.post('/endereco/add', address)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error.response;
        });
}

export const registerCartaoRequest = async (card) => {
    return api.post('/cartao/add', card)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error.response;
        });
}