import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { auth } from "../services/api"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    return (
        <AuthContext.Provider
            value={{
                auth
            }}>
            {children}
        </AuthContext.Provider>
    );
}