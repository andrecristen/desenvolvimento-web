import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Render from "../../../components/Admin/Render";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../contexts/admin";

const AdminHomePage = function () {

    const { getDashboard } = useContext(AdminContext);
    const [dashboard, setDashboard] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        setDashboard([]);
        getDashboard().then((data) => {
            setDashboard(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    return (
        <Render>
            <h1>Produtos Mais Vendidos</h1>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Vendas</th>
                    </tr>
                </thead>
                <tbody>
                    {dashboard && dashboard.map(dashboard => {
                        return (
                            <tr>
                                <th>{dashboard.produto.id}</th>
                                <td>{dashboard.produto.nome}</td>
                                <td>{dashboard.quantidade}</td>
                            </tr>);
                    })}
                </tbody>
            </table>
        </Render>
    )
}

export default AdminHomePage;