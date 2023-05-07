import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { auth, create } from "../services/api"

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = () => {
        const userSession = localStorage.getItem("userSession");
        if (userSession) {
            setUser(JSON.parse(userSession));
        }
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        loadUser();
    }, []);

    const login = async (email, password) => {
        const response = await auth(email, password);
        if (response.status == 200 && response.data.params) {
            debugger;
            let userData = {};
            response.data.params.map((param) => {
                userData[param.nome] = param.valor;
            });
            localStorage.setItem("userSession", JSON.stringify(userData));
            setUser(userData);
            return true;
        } else {
            toast.error('Não foi possível realizar o login com as credenciais informadas.', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
    };

    const logout = async () => {
        localStorage.removeItem("userSession");
        setUser(null);
        navigate("/");
    };


    return (
        <PublicContext.Provider
            value={{
                authenticated: user,
                loading,
                user,
                login,
                logout,
            }}>
            {children}
        </PublicContext.Provider>
    );
}