import React, { useState, useEffect, createContext, useContext } from "react";

import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { auth } from "../services/api"
import { getProdutoDerivacoesRequest, getProdutosRequest, registerUsuarioRequest } from "../services/api-ecommerce"
import { PublicContext } from "./public";

export const EcommerceContext = createContext();

export const EcommerceProvider = ({ children }) => {

    const navigate = useNavigate();

    const { login } = useContext(PublicContext);


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

    return (
        <EcommerceContext.Provider
            value={{
                auth,
                getProdutos,
                getProdutoDerivacoes,
                registerCliente,
                loginCliente
            }}>
            {children}
        </EcommerceContext.Provider>
    );

}