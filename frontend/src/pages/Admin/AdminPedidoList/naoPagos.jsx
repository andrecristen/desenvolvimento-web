import Render from "../../../components/Admin/Render";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../contexts/admin";
import Order from "../../../models/Order";
import { faCancel, faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminPedidoNaoPagoList = function () {

    const navigate = useNavigate();

    const { getPedidosSituacao, novaSituacaoPedido } = useContext(AdminContext);
    const [pedidos, setPedidos] = useState([]);
    const orderInstance = new Order();

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        setPedidos([]);
        getPedidosSituacao(orderInstance.STATUS_AGUARDANDO_CONFIRMACAO_PAGAMENTO).then((data) => {
            setPedidos(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    const handleClickCancelar = (pedidoId) => {
        novaSituacaoPedido(pedidoId, orderInstance.STATUS_CANCELADO);
    }

    const handleClickConfirmarPagamento = (pedidoId) => {
        novaSituacaoPedido(pedidoId, orderInstance.STATUS_PAGAMENTO_CONFIRMADO);
    }

    return (
        <Render>
            <h3>Pedidos Aguardando Pagamento</h3>
            <div className="btn-group display-table">
                {/* Ações Sem linha */}
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
                                        <button onClick={() => { handleClickCancelar(pedido.id) }} type="button" className="btn btn-sm btn-danger"><FontAwesomeIcon icon={faCancel}> </FontAwesomeIcon> Cancelar</button>
                                        <button onClick={() => { handleClickConfirmarPagamento(pedido.id) }} type="button" className="btn btn-sm btn-success"><FontAwesomeIcon icon={faCheckCircle}> </FontAwesomeIcon> Confirmar Pagamento</button>
                                    </div>
                                </td>
                            </tr>);
                    })}
                </tbody>
            </table>
        </Render>
    )
}

export default AdminPedidoNaoPagoList;