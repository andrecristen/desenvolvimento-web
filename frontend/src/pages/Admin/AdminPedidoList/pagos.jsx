import Render from "../../../components/Admin/Render";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../contexts/admin";
import Order from "../../../models/Order";
import { faPlaneDeparture, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AdminPedidoPagoList = function () {

    const navigate = useNavigate();

    const { getPedidosSituacao } = useContext(AdminContext);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        const orderInstance = new Order();
        setPedidos([]);
        getPedidosSituacao(orderInstance.STATUS_PAGAMENTO_CONFIRMADO).then((data) => {
            setPedidos(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    return (
        <Render>
            <h3>Pedidos Pagamento Confirmado</h3>
            <div className="btn-group display-table">
                <button type="button" onClick={() => { navigate("/admin/pedidos/entrega/add") }} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faPlaneDeparture}></FontAwesomeIcon> Organizar entrega</button>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Cartão</th>
                        <th scope="col">Endereço</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos && pedidos.map(pedido => {
                        return (
                            <tr>
                                <th>{pedido.id}</th>
                                <td>{pedido.cliente.nome}</td>
                                <td>{pedido.cartao.nome} - {pedido.cartao.numero}  </td>
                                <td>{pedido.endereco.logradouro} ({pedido.endereco.cidade} - {pedido.endereco.estado}) </td>
                                <td>
                                    <div className="btn-group">
                                        <button onClick={() => { navigate("/admin/pedidos/view/" + pedido.id) }} type="button" className="btn btn-sm btn-info"><FontAwesomeIcon icon={faSearch}> </FontAwesomeIcon> Visualizar</button>
                                    </div>
                                </td>
                            </tr>);
                    })}
                </tbody>
            </table>
        </Render>
    )
}

export default AdminPedidoPagoList;