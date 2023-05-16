import { useState, useContext } from "react";
import "./styles.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import User from "../../../models/User";
import Menu from "../../../components/Ecommerce/Menu";
import { EcommerceContext } from "../../../contexts/ecommerce";
import { errorMessage } from "../../../components/UI/notify";



const RegisterPage = function () {

    const { registerCliente } = useContext(EcommerceContext);

    const [validatingRegister, setValidatingRegister] = useState(false);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validatingRegister) {
            if (confirmPassword == password) {
                const user = new User();
                user.nome = name;
                user.cpf = cpf;
                user.email = email;
                user.senha = password;
                setValidatingRegister(true);
                await registerCliente(user);
                setValidatingRegister(false);
            } else {
                setValidatingRegister(false);
                errorMessage('Os campos Senha e Confirme sua Senha devem ser iguais.');
            }
        } else {
            errorMessage('Registro em processamento, aguarde finalização.');
        }
        
    }

    return (
        <div>
            <Menu />
            <div class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <h2>Cadastrar-se</h2>
                        <form onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label for="name">Nome:</label>
                                <input type="text" class="form-control" id="name" value={name} onChange={handleNameChange} />
                            </div>
                            <div class="form-group">
                                <label for="cpf">CPF:</label>
                                <input type="text" class="form-control" id="cpf" value={cpf} onChange={handleCpfChange} />
                            </div>
                            <div class="form-group">
                                <label for="email">E-mail:</label>
                                <input type="email" class="form-control" id="email" value={email} onChange={handleEmailChange} />
                            </div>
                            <div class="form-group">
                                <label for="password">Senha:</label>
                                <input type="password" class="form-control" id="password" value={password} onChange={handlePasswordChange} />
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword">Confirme sua Senha:</label>
                                <input type="password" class="form-control" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            </div>
                            <button type="submit" class="btn btn-primary">Cadastrar {validatingRegister ? <FontAwesomeIcon icon={faSpinner} spin /> : ''}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
