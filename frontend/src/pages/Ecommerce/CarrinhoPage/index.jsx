import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/Ecommerce/Menu";
import { PublicContext } from "../../../contexts/public";
import { infoMessage } from "../../../components/UI/notify";

const CarrinhoPage = function (props) {

    const navigate = useNavigate();

    const { authenticated, cart, setCartData, updateItemOnCart, removeItemOnCart } = useContext(PublicContext);

    const getTotal = () => {
        let total = 0;
        Object.entries(cart).map(([key, item]) => {
            total += item.preco * item.quantidade;
        });
        return total.toFixed(2);
    };

    const handleAlteracaoQuantidade = (id, newQuantity) => {
        let item = cart[id];
        item.quantidade = newQuantity
        updateItemOnCart(item);
    };

    const handleRemoveItem = (id) => {
        removeItemOnCart(id);
    };

    const handleFinalizarCompra = () => {
        if (!authenticated) {
            infoMessage('Por favor efetue login antes de finalizar a compra.');
            navigate("/login");
        } else {
            navigate("/finalizar-pedido");
        }
    }

    return (
        <div>
            <Menu />
            <div className="row p-3">
                <h1 className="mt-3">{!props.title ? "Meu Carrinho" : props.title}</h1>
                {cart && Object.keys(cart).length > 0 ? (
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Tamanho</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Total</th>
                                    {!props.disableEdit ? <th></th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(cart).map(([key, item]) => (
                                    <tr key={item.id}>
                                        <td>{item.produto.nome}</td>
                                        <td>{item.tamanho}</td>
                                        <td>R$ {item.preco.toFixed(2)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="1"
                                                value={item.quantidade}
                                                disabled={props.disableEdit}
                                                onChange={(e) =>
                                                    handleAlteracaoQuantidade(item.id, e.target.value)
                                                }
                                            />
                                        </td>
                                        <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                                        {!props.disableEdit ? <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleRemoveItem(item.id)}>
                                                Remover
                                            </button>
                                        </td> : null}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-3">
                            <h2 className="float-end">Total: R$ {getTotal()}</h2>
                            {!props.disableEdit ? <button onClick={handleFinalizarCompra} className="btn btn-success">Finalizar Compra</button> : null}

                        </div>
                    </div>
                ) : (
                    <p className="mt-3">O seu carrinho está vazio.</p>
                )}
            </div>
        </div>
    );


}

export default CarrinhoPage;