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

const AppRoutes = () => {

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
                        <Route exact path="/finalizar-pedido" element={<PrivateContainer><FinalizarPedidoPage /></PrivateContainer>}></Route>
                        <Route exact path="/profile" element={<PrivateContainer><ProfilePage /></PrivateContainer>}></Route>
                    </Routes>
                </EcommerceProvider>
                <AdminProvider>
                    <Routes>
                        <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
                        <Route exact path="/admin/home" element={<PrivateContainer><AdminHomePage /></PrivateContainer>}></Route>
                        <Route exact path="/admin/produtos" element={<PrivateContainer><AdminProdutoList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/pedidos/nao-pagos" element={<PrivateContainer><AdminPedidoNaoPagoList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/pedidos/pagos" element={<PrivateContainer><AdminPedidoPagoList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/pedidos/entregues" element={<PrivateContainer><AdminPedidoEntregueList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/usuarios/clientes" element={<PrivateContainer><AdminUsuarioClienteList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/usuarios/admins" element={<PrivateContainer><AdminUsuarioAdmistradorList /></PrivateContainer>}></Route>
                        <Route exact path="/admin/profile" element={<PrivateContainer><ProfilePage /></PrivateContainer>}></Route>
                    </Routes>
                </AdminProvider>
            </PublicProvider>
        </Router>
    );
}

export default AppRoutes;