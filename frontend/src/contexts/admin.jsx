import React, { useState, useEffect, createContext, useContext } from "react";

import { useNavigate } from "react-router-dom"

import { auth, getProdutosRequest } from "../services/api-public"
import { addProdutoRequest } from "../services/api-admin"
import { PublicContext } from "./public";
import User from "../models/User";
import { errorMessage, successMessage } from "../components/UI/notify";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    const navigate = useNavigate();

    let { login, logout, loadUser } = useContext(PublicContext);
    
    const loginAdmin = async (email, password) => {
        const success = await login(email, password);
        if (success) {
            const userInstance = new User();
            if (loadUser().tipo == userInstance.TIPO_ADMINISTRADOR) {
                navigate("/admin/home");   
            } else {
                errorMessage('Tipo de usuário não possui privilégio para acessar essa área do sistema.');
                logout();
            }
        } else {
            navigate("/admin/login");
        }
    };

    const getProdutos = async () => {
        const response = await getProdutosRequest();
        if (response && response.status && response.status == 200) {
            return response.data.content;
        } else {
            errorMessage('Não foi possível realizar a busca de produtos');
        }
    }

    const addProduto = async (data) => {
        const response = await addProdutoRequest(data);
        if (response && response.status && response.status == 200 && response.data && response.data.success) {
            successMessage('Produto adicionado com sucesso');
            navigate("/admin/produtos");
        } else {
            errorMessage('Não foi possível adicionar o produto');
        }
    }

    return (
        <AdminContext.Provider
            value={{
                auth,
                loginAdmin,
                getProdutos,
                addProduto,
            }}>
            {children}
        </AdminContext.Provider>
    );
    
}