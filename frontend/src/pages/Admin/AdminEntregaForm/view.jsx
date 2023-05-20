import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Render from "../../../components/Admin/Render";
import { AdminContext } from "../../../contexts/admin";
import "./styles.css"

const AdminPedidoEntregasView = function (props) {


    const { getEntregasPedido } = useContext(AdminContext);
    let { id } = useParams();

    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        if (id) {
            getEntregasPedido(id).then((data) => {
                setJsonData(data);
            }).catch((exc) => {
                console.log(exc);
            });
        }
    }, []);

    return (
        <Render>
            <div>
                {jsonData.map((item) => (
                    <div className="form-horizontal" key={item.entrega.id}>
                        <fieldset>
                            <legend>Entrega #{item.entrega.id}</legend>
                        </fieldset>
                        <fieldset>
                            <legend>Pedido Produtos</legend>
                            {item.entregaPedidoProdutoList.map((subItem) => (
                                <div key={subItem.id}>
                                    <p>#: {subItem.id}</p>
                                    <p>Pedido Produto #: {subItem.pedidoProduto.id}</p>
                                    <p>Pedido #: {subItem.pedidoProduto.pedido.id}</p>
                                    <p>Quantidade: {subItem.pedidoProduto.quantidade}</p>
                                    <p>Preço: R$ {subItem.pedidoProduto.preco.toFixed(2)}</p>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                ))}
            </div>
        </Render>
    );
};

export default AdminPedidoEntregasView;