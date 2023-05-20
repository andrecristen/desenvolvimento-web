import { api } from "./api-public";

export const registerUsuarioRequest = async (user) => {
    return api.post('/usuario/admin/register', user)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error.response;
        });
}

export const addProdutoRequest = async (data) => {
    return api.post('/produto/add', data)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error.response;
        });
}

export const editProdutoRequest = async (data) => {
    return api.put('/produto/edit', data)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error.response;
        });
}

export const getDashboardRequest = async () => {
    return api.get('/pedidos/dashboard').then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getPedidosSituacaoRequest = async (situacao) => {
    return api.get('/pedidos/situacao/' + situacao).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const putNovaSituacaoPedidoRequest = async (id, novaSituacao) => {
    return api.put('/pedido/' + id + '/nova-situacao/' + novaSituacao).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getUsuariosTipoRequest = async (tipo) => {
    return api.get('/usuarios/tipo/' + tipo).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}

export const getPedidoRequest = async (id) => {
    return api.get('/pedido/' + id).then((result) => {
        return result;
    }).catch((error) => {
        return error.response;
    });
}