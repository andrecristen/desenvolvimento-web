import {
    Navigate
} from "react-router-dom";

import { useContext, useState } from "react";
import { PublicContext } from "../../contexts/public";
import {errorMessage} from "./notify.js";

const PrivateContainer = ({ children }) => {


    const [notificado, setNotificado] = useState(false);

    const { authenticated, loading } = useContext(PublicContext);

    if (loading) {
        return <div className="loading">Carregando...</div>
    }

    if (!authenticated) {
        if (!notificado) {
            errorMessage('Você precisa estar logado para acessar essa página');
            setNotificado(true);
        }
        return (<Navigate to="/" />);
    }

    return children;
}

export default PrivateContainer;