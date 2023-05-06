import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { auth, create, getProdutoDerivacoesRequest, getProdutosRequest } from "../services/api"

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //On start/render view
    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (userSession) {
            setUser(JSON.parse(userSession));
        }
        setLoading(false);
    }, []);

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

    const login = async (email, password) => {
        const response = await auth(email, password);
        if (response.status == 200) {
            const loggedUser = response.data;
            localStorage.setItem("userSession", JSON.stringify(loggedUser));
            setUser(loggedUser);
            navigate("/");
        } else {
            toast.error('Não foi possível realizar o login com as credenciais informadas.', {
                position: toast.POSITION.TOP_CENTER
            });
            navigate("/login");
        }
    };

    const register = async (user) => {
        const response = await create(user);
        if (response.status == 200 || response.status == 201) {
            navigate("/login");
        } else {
            toast.error("Erro ao criar conta, tente novamente.", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    };

    const logout = async () => {
        localStorage.removeItem("userSession");
        setUser(null);
        navigate("/login");
    };


    return (
        <PublicContext.Provider
            value={{
                //User
                authenticated: user,
                user,
                login,
                logout,
                register,
                getProdutos,
                getProdutoDerivacoes
            }}>
            {children}
        </PublicContext.Provider>
    );
}