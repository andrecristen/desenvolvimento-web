import { useState, useContext } from "react";
import "./styles.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import User from "../../../models/User";
import { toast } from 'react-toastify';
import { PublicContext } from "../../../contexts/public";
import Menu from "../../../components/Ecommerce/Menu";



const RegisterPage = function () {

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Name: ', name);
        console.log('CPF: ', cpf);
        console.log('Email: ', email);
        console.log('Password: ', password);
        console.log('Confirm Password: ', confirmPassword);
    }

    return (
        <div>
            <Menu />
            <div class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <h2>Cadastrar-se</h2>
                        <form>
                            <div class="form-group">
                                <label for="name">Nome:</label>
                                <input type="text" class="form-control" id="name" />
                            </div>
                            <div class="form-group">
                                <label for="cpf">CPF:</label>
                                <input type="text" class="form-control" id="cpf" />
                            </div>
                            <div class="form-group">
                                <label for="email">E-mail:</label>
                                <input type="email" class="form-control" id="email" />
                            </div>
                            <div class="form-group">
                                <label for="password">Senha:</label>
                                <input type="password" class="form-control" id="password" />
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword">Confirme sua Senha:</label>
                                <input type="password" class="form-control" id="confirmPassword" />
                            </div>
                            <button type="submit" class="btn btn-primary">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
