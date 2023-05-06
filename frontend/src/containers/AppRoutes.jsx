import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import { AuthProvider } from "../contexts/auth"

import PrivateContainer from "../components/UI/PrivateContainer";
import { PublicProvider } from "../contexts/public";

import HomePage from "../pages/Ecommerce/HomePage";
import LoginPage from "../pages/Ecommerce/LoginPage";
import RegisterPage from "../pages/Ecommerce/RegisterPage";
import ProdutoPage from "../pages/Ecommerce/ProdutoPage";

const AppRoutes = () => {

    return (
        <Router>
            <PublicProvider>
                <Routes>
                    <Route exact path="/" element={<HomePage />}></Route>
                    <Route exact path="/produto/:id" element={<ProdutoPage />}></Route>
                    <Route exact path="/login" element={<LoginPage />}></Route>
                    <Route exact path="/register" element={<RegisterPage />}></Route>
                </Routes>
            </PublicProvider>
            <AuthProvider>
                <Routes>
                    {/* <Route exact path="/profile" element={<PrivateContainer><ProfilePage /></PrivateContainer>}></Route> */}
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes;