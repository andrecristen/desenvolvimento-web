import "./render.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faDashboard, faMoneyBill, faShop, faUserFriends, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PublicContext } from "../../contexts/public";
const Render = (props) => {

    const { logout, user } = useContext(PublicContext);

    const onClickLogout = () => {
        logout();
    }

    console.log(user);

    return (
        <div>
            <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Droneseta Admin</a>
                <ul class="navbar-nav px-3">
                    <li class="nav-item text-nowrap">
                        <span class="nav-link">Bem-vindo(a) {user ? user.nome : ""}</span>
                    </li>
                    <li class="nav-item text-nowrap">
                        <a class="nav-link" href="#" onClick={onClickLogout}>Sair</a>
                    </li>
                </ul>
            </nav>
            <div class="container-fluid">
                <div class="row">
                    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                        <div class="sidebar-sticky">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <FontAwesomeIcon icon={faDashboard}></FontAwesomeIcon> Dashboard
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon> Pedidos Aguardando Pagamento
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon> Pedidos Pagamento Confirmado
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <FontAwesomeIcon icon={faDragon}></FontAwesomeIcon> Entregas
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon> Clientes
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <FontAwesomeIcon icon={faUserGear}></FontAwesomeIcon> Usuários
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main role="main" class="col-md-10 pt-3 px-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Render;