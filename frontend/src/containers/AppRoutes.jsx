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
                        <Route exact path="/profile" element={<PrivateContainer><ProfilePage /></PrivateContainer>}></Route>
                    </Routes>
                </EcommerceProvider>
                <AdminProvider>
                    <Routes>
                        <Route exact path="/my-profile" element={<PrivateContainer><ProfilePage /></PrivateContainer>}></Route>
                    </Routes>
                </AdminProvider>
            </PublicProvider>
        </Router>
    );
}

export default AppRoutes;