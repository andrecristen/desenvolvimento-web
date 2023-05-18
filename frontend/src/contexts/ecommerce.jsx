import React, { createContext, useContext } from "react";

import { useNavigate } from "react-router-dom"

import { auth, getProdutosRequest, getProdutoDerivacoesRequest } from "../services/api-public"
import { registerUsuarioRequest, getCartoes, getEnderecos, registerEnderecoRequest, registerCartaoRequest, registerPedidoRequest, getPedidos } from "../services/api-ecommerce"
import { PublicContext } from "./public";
import Order from "../models/Order";
import { errorMessage, successMessage } from "../components/UI/notify";

export const EcommerceContext = createContext();

export const EcommerceProvider = ({ children }) => {

    const navigate = useNavigate();

    const { login, loadUser, cart, clearCart } = useContext(PublicContext);

    const user = loadUser();

    const getProdutos = async () => {
        const response = await getProdutosRequest();
        if (response && response.status && response.status == 200) {
            return response.data.content;
        } else {
            errorMessage('Não foi possível realizar a busca de produtos');
        }
    }

    const getProdutoDerivacoes = async (id) => {
        const response = await getProdutoDerivacoesRequest(id);
        if (response && response.status && response.status == 200) {
            return response.data;
        } else {
            errorMessage('Não foi possível realizar a busca de derivações do produto ' + id);
        }
    }

    const registerCliente = async (user) => {
        const response = await registerUsuarioRequest(user);
        if (response && response.status && response.status == 200) {
            successMessage('Cliente registrado com sucesso');
            navigate("/login");
        } else {
            errorMessage('Não foi possível se registrar');
        }
    }

    const loginCliente = async (email, password) => {
        const success = await login(email, password);
        if (success) {
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    const getMeusCartoes = async () => {
        const response = await getCartoes(user.token);
        if (response && response.status && response.status == 200) {
            return response.data.params[0].valor;
        } else {
            errorMessage('Não foi possível realizar a busca dos seus cartões');
        }
    }

    const registerCartao = async (card) => {
        const response = await registerCartaoRequest(card);
        if (response && response.status && response.status == 200 && response.data && response.data.success) {
            successMessage('Cartão registrado com sucesso');
            window.location.reload(false);
        } else {
            errorMessage('Não foi possível registrar o cartão');
        }
    }

    const getMeusEnderecos = async () => {
        const response = await getEnderecos(user.token);
        if (response && response.status && response.status == 200) {
            return response.data.params[0].valor;
        } else {
            errorMessage('Não foi possível realizar a busca dos seus endereços');
        }
    }

    const registerEndereco = async (address) => {
        const response = await registerEnderecoRequest(address);
        if (response && response.status && response.status == 200 && response.data && response.data.success) {
            successMessage('Endereço registrado com sucesso');
            window.location.reload(false);
        } else {
            errorMessage('Não foi possível registrar o endereço');
        }
    }

    const finalizarCompraCarrinho = async (address, card) => {
        const order = new Order();
        order.cliente = {
            token: user.token
        }
        order.cartao = {
            id: card.id
        };
        order.endereco = {
            id: address.id
        };
        order.produtos = [];
        Object.entries(cart).map(([key, item]) => {
            order.produtos.push({
                produtoDerivacao: {
                    id: item.id
                },
                quantidade: parseInt(item.quantidade),
                preco: item.preco
            });
        });
        const response = await registerPedidoRequest(order);
        if (response && response.status && response.status == 200 && response.data && response.data.success) {
            successMessage('Pedido registrado com sucesso');
            clearCart();
            navigate("/profile");
        } else {
            errorMessage('Não foi possível registrar o pedido: "' + response.data.message +'"');
        }
    }

    const getMeusPedidos = async () => {
        const response = await getPedidos(user.token);
        if (response && response.status && response.status == 200) {
            return response.data.params[0].valor;
        } else {
            errorMessage('Não foi possível realizar a busca dos seus pedidos');
        }
    }


    return (
        <EcommerceContext.Provider
            value={{
                auth,
                getProdutos,
                getProdutoDerivacoes,
                registerCliente,
                loginCliente,
                getMeusEnderecos,
                registerEndereco,
                getMeusCartoes,
                registerCartao,
                finalizarCompraCarrinho,
                getMeusPedidos
            }}>
            {children}
        </EcommerceContext.Provider>
    );

}