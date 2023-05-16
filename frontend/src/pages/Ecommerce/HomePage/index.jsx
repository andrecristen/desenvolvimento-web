import Menu from "../../../components/Ecommerce/Menu";
import Produto from "../../../components/Ecommerce/Produto";
import { useContext, useEffect, useState } from "react";
import { EcommerceContext } from '../../../contexts/ecommerce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HomePage = function () {

    const { getProdutos } = useContext(EcommerceContext);
    const [produtos, setProdutos] = useState([]);

    const navigate = useNavigate();

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

    const handleClickLoginAdmin = () => {
        navigate("/admin/login");
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
            <div className="bg-light text-center text-lg-start">
                <div className="text-center p-3" style={{"background-color": "rgba(0, 0, 0, 0.2)"}}>
                    <button onClick={handleClickLoginAdmin}className='btn btn-lg btn-info'><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Painel administrativo</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;