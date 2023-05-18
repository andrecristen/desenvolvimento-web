import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Render from "../../../components/Admin/Render";
import { faAdd, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../../contexts/admin";
import { useContext, useEffect, useState } from "react";

const AdminProdutoList = function () {

    const { getProdutos } = useContext(AdminContext);
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

    return (
        <Render>
            <h3>Produtos</h3>
            <div className="btn-group display-table">
                <button onClick={() => {navigate("/admin/produto/add")}} type="button" className="btn btn-sm btn-success"><FontAwesomeIcon icon={faAdd}> </FontAwesomeIcon>Adicionar</button>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos && produtos.map(produto => {
                        return (
                            <tr>
                                <th>{produto.id}</th>
                                <td>{produto.nome}</td>
                                <td>{produto.descricao}</td>
                                <td>
                                    <div className="btn-group">
                                        <button onClick={() => {navigate("/admin/produto/edit/" + produto.id)}} type="button" className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faEdit}> </FontAwesomeIcon>Alterar</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Render>
    )
}

export default AdminProdutoList;