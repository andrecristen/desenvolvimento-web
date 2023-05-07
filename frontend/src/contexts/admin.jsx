import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { auth } from "../services/api"

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    return (
        <AdminContext.Provider
            value={{
                auth
            }}>
            {children}
        </AdminContext.Provider>
    );
    
}