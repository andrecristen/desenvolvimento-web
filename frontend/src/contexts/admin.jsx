import React, { useState, useEffect, createContext, useContext } from "react";

import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { auth } from "../services/api"
import { PublicContext } from "./public";
import User from "../models/User";

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
                toast.error('Tipo de usuário não possui privilégio para acessar essa área do sistema.', {
                    position: toast.POSITION.TOP_CENTER
                });
                logout();
            }
        } else {
            navigate("/admin/login");
        }
    };

    return (
        <AdminContext.Provider
            value={{
                auth,
                loginAdmin
            }}>
            {children}
        </AdminContext.Provider>
    );
    
}