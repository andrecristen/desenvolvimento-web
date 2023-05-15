import React, { createContext, useContext } from "react";

import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { auth } from "../services/api"
import { getProdutoDerivacoesRequest, getProdutosRequest, registerUsuarioRequest, getCartoes, getEnderecos, registerEnderecoRequest, registerCartaoRequest, registerPedidoRequest, getPedidos } from "../services/api-ecommerce"
import { PublicContext } from "./public";
import Order from "../models/Order";

export const EcommerceContext = createContext();

export const EcommerceProvider = ({ children }) => {

    const navigate = useNavigate();

    const { login, user, cart, clearCart } = useContext(PublicContext);


    const getProdutos = async () => {
        const response = await getProdutosRequest();
        if (response && response.status && response.status == 200) {
            return response.data.content;
        } else {
            toast.error('Não foi possível realizar a busca de produtos', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const getProdutoDerivacoes = async (id) => {
        const response = await getProdutoDerivacoesRequest(id);
        if (response && response.status && response.status == 200) {
            return response.data;
        } else {
            toast.error('Não foi possível realizar a busca de derivações do produto ' + id, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const registerCliente = async (user) => {
        const response = await registerUsuarioRequest(user);
        if (response && response.status && response.status == 200) {
            toast.success('Cliente registrado com sucesso', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate("/login");
        } else {
            toast.error('Não foi possível se registrar', {
                position: toast.POSITION.TOP_CENTER
            });
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
            toast.error('Não foi possível realizar a busca dos seus cartões', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const registerCartao = async (card) => {
        const response = await registerCartaoRequest(card);
        if (response && response.status && response.status == 200 && response.data && response.data.success) {
            toast.success('Cartão registrado com sucesso', {
                position: toast.POSITION.TOP_CENTER
            });
            window.location.reload(false);
        } else {
            toast.error('Não foi possível registrar o cartão', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const getMeusEnderecos = async () => {
        const response = await getEnderecos(user.token);
        if (response && response.status && response.status == 200) {
            return response.data.params[0].valor;
        } else {
            toast.error('Não foi possível realizar a busca dos seus endereços', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const registerEndereco = async (address) => {
        const response = await registerEnderecoRequest(address);
        if (response && response.status && response.status == 200 && response.data && response.data.success) {
            toast.success('Endereço registrado com sucesso', {
                position: toast.POSITION.TOP_CENTER
            });
            window.location.reload(false);
        } else {
            toast.error('Não foi possível registrar o endereço', {
                position: toast.POSITION.TOP_CENTER
            });
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
            toast.success('Pedido registrado com sucesso', {
                position: toast.POSITION.TOP_CENTER
            });
            clearCart();
            navigate("/");
        } else {
            toast.error('Não foi possível registrar o pedido', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const getMeusPedidos = async () => {
        const response = await getPedidos(user.token);
        if (response && response.status && response.status == 200) {
            return response.data.params[0].valor;
        } else {
            toast.error('Não foi possível realizar a busca dos seus pedidos', {
                position: toast.POSITION.TOP_CENTER
            });
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