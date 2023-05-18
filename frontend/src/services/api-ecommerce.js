import { api } from "./api-public";

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

export const registerPedidoRequest = async (order) => {
    return api.post('/pedido/add', order)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error.response;
        });
}

export const getPedidos = async (token) => {
    return api.get('/pedidos/' + token).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}