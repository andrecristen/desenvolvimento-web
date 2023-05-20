import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import { EcommerceProvider } from "../contexts/ecommerce"

import PrivateContainer from "../components/UI/PrivateContainer";
import { PublicProvider } from "../contexts/public";

import HomePage from "../pages/Ecommerce/HomePage";
import LoginPage from "../pages/Ecommerce/LoginPage";
import RegisterPage from "../pages/Ecommerce/RegisterPage";
import ProdutoPage from "../pages/Ecommerce/ProdutoPage";
import ProfilePage from "../pages/Ecommerce/ProfilePage";
import { AdminProvider } from "../contexts/admin";
import CarrinhoPage from "../pages/Ecommerce/CarrinhoPage";
import FinalizarPedidoPage from "../pages/Ecommerce/FinalizarPedidopage";
import AdminLoginPage from "../pages/Admin/AdminLogin";
import AdminHomePage from "../pages/Admin/AdminHome";
import AdminProdutoList from "../pages/Admin/AdminProdutoList";
import AdminPedidoNaoPagoList from "../pages/Admin/AdminPedidoList/naoPagos";
import AdminPedidoPagoList from "../pages/Admin/AdminPedidoList/pagos";
import AdminPedidoEntregueList from "../pages/Admin/AdminPedidoList/entregues";
import AdminUsuarioClienteList from "../pages/Admin/AdminUsuarioList/clientes";
import AdminUsuarioAdmistradorList from "../pages/Admin/AdminUsuarioList/administradores";
import User from "../models/User";
import AdminProdutoForm from "../pages/Admin/AdminProdutoForm";
import AdminRegisterPage from "../pages/Admin/AdminRegister";
import AdminPedidoCanceladoList from "../pages/Admin/AdminPedidoList/cancelados";
import AdminPedidoForm from "../pages/Admin/AdminPedidoForm";
import AdminEntregaAdd from "../pages/Admin/AdminEntregaForm/add";
import AdminPedidoEntregasView from "../pages/Admin/AdminEntregaForm/view";

const AppRoutes = () => {

    const userInstance = new User();
    const TIPO_ADMINISTRADOR = userInstance.TIPO_ADMINISTRADOR;
    const TIPO_CLIENTE = userInstance.TIPO_CLIENTE;

    return (
        <Router>
            <PublicProvider>
                <Routes>

                </Routes>
                <EcommerceProvider>
                    <Routes>
                        <Route exact path="/" element={<HomePage />}></Route>
                        <Route exact path="/register" element={<RegisterPage />}></Route>
                        <Route exact path="/login" element={<LoginPage />}></Route>
                        <Route exact path="/produto/:id" element={<ProdutoPage />}></Route>
                        <Route exact path="/cart" element={<CarrinhoPage />}></Route>
                        <Route exact path="/finalizar-pedido" element={<PrivateContainer tipo={TIPO_CLIENTE}><FinalizarPedidoPage /></PrivateContainer>}></Route>
                        <Route exact path="/profile" element={<PrivateContainer tipo={TIPO_CLIENTE}><ProfilePage /></PrivateContainer>}></Route>
                    </Routes>
                </EcommerceProvider>
                <AdminProvider>
                    <Routes>
                        {/* Acessos */}
                        <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
                        <Route exact path="/admin/register" element={<AdminRegisterPage />}></Route>
                        <Route exact path="/admin/home" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminHomePage /></PrivateContainer>}></Route>
                        {/* Produtos */}
                        <Route exact path="/admin/produtos" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminProdutoList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/produto/add" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminProdutoForm title="Adicionar Produto" /></PrivateContainer>}></Route>
                        <Route exact path="/admin/produto/edit/:id" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminProdutoForm title="Alterar Produto" /></PrivateContainer>}></Route>
                        {/* Pedidos */}
                        <Route exact path="/admin/pedidos/nao-pagos" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminPedidoNaoPagoList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/pedidos/pagos" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminPedidoPagoList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/pedidos/entregues" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminPedidoEntregueList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/pedidos/cancelados" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminPedidoCanceladoList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/pedidos/view/:id" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminPedidoForm /></PrivateContainer>}></Route>
                        <Route exact path="/admin/pedidos/view/entregas/:id" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminPedidoEntregasView /></PrivateContainer>}></Route>
                        <Route exact path="/admin/pedidos/entrega/add/" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminEntregaAdd /></PrivateContainer>}></Route>
                        {/* Usuários */}
                        <Route exact path="/admin/usuarios/clientes" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminUsuarioClienteList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/usuarios/admins" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><AdminUsuarioAdmistradorList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/profile" element={<PrivateContainer tipo={TIPO_ADMINISTRADOR}><ProfilePage /></PrivateContainer>}></Route>
                    </Routes>
                </AdminProvider>
            </PublicProvider>
        </Router>
    );
}

export default AppRoutes;