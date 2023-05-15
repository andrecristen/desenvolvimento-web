import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { auth, create } from "../services/api"

export const PublicContext = createContext();

export const PublicProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(true);

    const loadUser = () => {
        const userSession = localStorage.getItem("userSession");
        if (userSession) {
            setUser(JSON.parse(userSession));
        }
        setLoading(false);
    }

    const loadCart = () => {
        const cartSession = localStorage.getItem("cartSession");
        if (cartSession) {
            setCart(JSON.parse(cartSession));
        }
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        loadUser();
        loadCart();
    }, []);

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
        toast.success('Produto adicionado ao carrinho.', {
            position: toast.POSITION.TOP_CENTER
        });
        navigate("/cart");
    }

    const updateItemOnCart = (item) => {
        cart[item.id] = item;
        setCartData(cart);
        toast.success('Produto alterado no carrinho.', {
            position: toast.POSITION.TOP_CENTER
        });
        navigate("/cart");
    }

    const removeItemOnCart = (id) => {
        if (cart[id]) {
            delete cart[id];
        }
        setCartData(cart);
        toast.success('Produto removido do carrinho.', {
            position: toast.POSITION.TOP_CENTER
        });
        navigate("/cart");
    }

    const clearCart = () => {
        setCartData({})
    }


    return (
        <PublicContext.Provider
            value={{
                authenticated: user,
                loading,
                user,
                login,
                logout,
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