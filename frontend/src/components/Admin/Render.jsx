import "./render.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faCreditCard, faDashboard, faDragon, faMoneyBill, faShop, faUserFriends, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PublicContext } from "../../contexts/public";
import { useNavigate } from "react-router-dom";
const Render = (props) => {

    const navigate = useNavigate();

    const { logout, loadUser } = useContext(PublicContext);

    const user = loadUser();

    const onClickLogout = () => {
        logout();
    }

    return (
        <div>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Droneseta Admin</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <span className="nav-link">Bem-vindo(a) {user ? user.nome : ""}</span>
                    </li>
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#" onClick={onClickLogout}>Sair</a>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => { navigate('/admin/home') }} href="">
                                        <FontAwesomeIcon icon={faDashboard}></FontAwesomeIcon> Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => { navigate('/admin/produtos') }} href="">
                                        <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon> Produtos
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => { navigate('/admin/pedidos/nao-pagos') }} href="">
                                        <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon> Pedidos Aguardando Pagamento
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => { navigate('/admin/pedidos/pagos') }} href="">
                                        <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon> Pedidos Pagamento Confirmado
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => { navigate('/admin/pedidos/entregues') }} href="">
                                        <FontAwesomeIcon icon={faDragon}></FontAwesomeIcon> Entregues
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => { navigate('/admin/usuarios/clientes') }} href="">
                                        <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon> Clientes
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => { navigate('/admin/usuarios/admins') }} href="">
                                        <FontAwesomeIcon icon={faUserGear}></FontAwesomeIcon> Administradores
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main role="main" className="col-md-10 pt-3 px-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Render;