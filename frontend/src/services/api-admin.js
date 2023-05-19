import { api } from "./api-public";

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