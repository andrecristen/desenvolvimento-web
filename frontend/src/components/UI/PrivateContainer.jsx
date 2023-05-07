import {
    Navigate
} from "react-router-dom";

import { useContext, useState } from "react";
import { PublicContext } from "../../contexts/public";
import { toast } from "react-toastify";

const PrivateContainer = ({ children }) => {

    const [notificado, setNotificado] = useState(false);

    const { authenticated, loading } = useContext(PublicContext);

    if (loading) {
        return <div className="loading">Carregando...</div>
    }

    if (!authenticated) {
        if (!notificado) {
            toast.error('Você precisa estar logado para acessar essa página', {
                position: toast.POSITION.TOP_CENTER
            });
            setNotificado(true);
        }
        return (<Navigate to="/" />);
    }

    return children;
}

export default PrivateContainer;