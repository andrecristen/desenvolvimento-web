import {
    Navigate
} from "react-router-dom";

import { useContext, useState } from "react";
import { PublicContext } from "../../contexts/public";
import {errorMessage} from "./notify.js";

const PrivateContainer = (props) => {


    const [notificado, setNotificado] = useState(false);

    const { loadUser, loading } = useContext(PublicContext);

    if (loading) {
        return <div className="loading">Carregando...</div>
    }
    const user = loadUser();
    if (!user) {
        if (!notificado) {
            errorMessage('Você precisa estar logado para acessar essa página');
            setNotificado(true);
        }
        return (<Navigate to="/" />);
    } else if (props && props.tipo && user.tipo != props.tipo) {
        if (!notificado) {
            errorMessage('Tipo de usuário não tem acesso a essa parte do sistema');
            setNotificado(true);
        }
        return (<Navigate to="/" />);
    }

    return props.children;
}

export default PrivateContainer;