import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Render from "../../../components/Admin/Render";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AdminPedidoNaoPagoList = function () {

    const navigate = useNavigate();

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
                        <th scope="col">CLiente</th>
                        <th scope="col">Cartão</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </Render>
    )
}

export default AdminPedidoNaoPagoList;