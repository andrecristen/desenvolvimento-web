import React, { useState, useContext, useEffect } from "react";

import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'

import "./styles.css"
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/Ecommerce/Menu";
import { EcommerceContext } from "../../../contexts/ecommerce";
import { PublicContext } from "../../../contexts/public";
import { toast } from "react-toastify";

const LoginPage = function () {

    let navigate = useNavigate();

    const { loginCliente } = useContext(EcommerceContext);
    const { authenticated } = useContext(PublicContext);

    const [validatingLogin, setValidatingLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateRegister = () => {
        navigate("/register");
    }

    if (authenticated) {
        toast.info('Usuário já logado', {
            position: toast.POSITION.TOP_CENTER
        });
        navigate("/");
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidatingLogin(true);
        await loginCliente(email, password);
        setValidatingLogin(false);
    }

    return (
        <div>
            <Menu />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha:</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                            </div>
                            <button type="button" className="btn btn-secondary mt-4" onClick={navigateRegister}><FontAwesomeIcon icon={faSignInAlt} /> Cadastrar-se</button>
                            <button type="submit" className="btn btn-primary mt-4"><FontAwesomeIcon icon={faSignInAlt} /> Entrar {validatingLogin ? <FontAwesomeIcon icon={faSpinner} spin /> : ''}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;