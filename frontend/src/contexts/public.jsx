import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom"

import { auth, create } from "../services/api-public"
import { errorMessage, infoMessage, successMessage } from "../components/UI/notify";

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        loadUser();
        loadCart();
    }, []);

    const loadUser = () => {
        var userData = null;
        const userSession = localStorage.getItem("userSession");
        if (userSession) {
            userData = JSON.parse(userSession);
            setUser();
        }
        setLoading(false);
        return userData;
    }

    const loadCart = () => {
        const cartSession = localStorage.getItem("cartSession");
        if (cartSession) {
            setCart(JSON.parse(cartSession));
        }
        setLoading(false);
    }

    const login = async (email, password) => {
        const response = await auth(email, password);
        if (response.status == 200 && response.data.params) {
            let userData = {};
            response.data.params.map((param) => {
                userData[param.nome] = param.valor;
            });
            localStorage.setItem("userSession", JSON.stringify(userData));
            setUser(userData);
            return true;
        } else {
            errorMessage('Não foi possível realizar o login com as credenciais informadas.');
            return false;
        }
    };

    const logout = async () => {
        localStorage.removeItem("userSession");
        setUser(null);
        infoMessage('Deslogado com sucesso.');
        navigate("/");
    };

    const setCartData = (cart) => {
        localStorage.setItem("cartSession", JSON.stringify(cart));
        setCart(cart);
    } 

    const addItemOnCart = (item) => {
        if (!cart[item.id]) {
            item.quantidade = 1;
            cart[item.id] = item;
        } else {
            cart[item.id].quantidade++;
        }
        setCartData(cart);
        successMessage('Produto adicionado ao carrinho.');
        navigate("/cart");
    }

    const updateItemOnCart = (item) => {
        cart[item.id] = item;
        setCartData(cart);
        successMessage('Produto alterado no carrinho.');
        navigate("/cart");
    }

    const removeItemOnCart = (id) => {
        if (cart[id]) {
            delete cart[id];
        }
        setCartData(cart);
        successMessage('Produto removido do carrinho.');
        navigate("/cart");
    }

    const clearCart = () => {
        setCartData({})
    }


    return (
        <PublicContext.Provider
            value={{
                loading,
                login,
                logout,
                loadUser,
                cart,
                setCartData,
                addItemOnCart,
                updateItemOnCart,
                removeItemOnCart,
                clearCart
            }}>
            {children}
        </PublicContext.Provider>
    );
}