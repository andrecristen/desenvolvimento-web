import 'react-toastify/dist/ReactToastify.css';
import Menu from "../../../components/Ecommerce/Menu";
import Produto from "../../../components/Ecommerce/Produto";
import { PublicContext } from "../../../contexts/public";
import { useContext, useEffect, useState } from "react";

const HomePage = function () {

    const { getProdutos } = useContext(PublicContext);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        setProdutos([]);
        getProdutos().then((data) => {
            setProdutos(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    return (
        <div>
            <Menu />
            <div className="container">
                <h3>Produtos</h3>
                <div className="col-md-12 row">
                    {produtos && produtos.map(produto => {
                        return (
                            <Produto data={produto}></Produto>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomePage;