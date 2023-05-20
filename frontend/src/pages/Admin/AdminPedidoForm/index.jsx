import Render from "../../../components/Admin/Render";
import "./styles.css"
import { useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../contexts/admin";

const AdminPedidoForm = function (props) {

    const { getPedido } = useContext(AdminContext);
    let { id } = useParams();

    const [pedido, setPedido] = useState([]);

    useEffect(() => {
        if (id) {
            getPedido(id).then((data) => {
                setPedido(data);
                console.log(data);
            }).catch((exc) => {
                console.log(exc);
            });
        }
    }, []);




    return (
        <Render>
            <br />
            <br />
            <br />
            <div>
                {pedido && pedido.pedido
                    ?
                    <div className="form-horizontal">
                        <fieldset>
                            <legend>Pedido</legend>
                            <p>#{pedido.pedido.id}</p>
                            <p>Situação: {pedido.pedido.situacao}</p>
                        </fieldset>
                        <fieldset>
                            <legend>Cliente</legend>
                            <p>#{pedido.pedido.cliente.id}</p>
                            <p>Nome: {pedido.pedido.cliente.nome}</p>
                            <p>CPF: {pedido.pedido.cliente.cpf}</p>
                            <p>Email: {pedido.pedido.cliente.email}</p>
                        </fieldset>
                        <fieldset>
                            <legend>Cartão</legend>
                            <p>#{pedido.pedido.cartao.id}</p>
                            <p>Nome: {pedido.pedido.cartao.nome}</p>
                            <p>Número: {pedido.pedido.cartao.numero}</p>
                        </fieldset>
                        <fieldset>
                            <legend>Endereço</legend>
                            <p>Logradouro: {pedido.pedido.endereco.logradouro}</p>
                            <p>Número: {pedido.pedido.endereco.numero}</p>
                            <p>Cidade: {pedido.pedido.endereco.cidade}</p>
                            <p>Estado: {pedido.pedido.endereco.estado}</p>
                        </fieldset>
                        <fieldset>
                            <legend>Produtos</legend>
                            {pedido.pedidoProdutos.map((produto) => (
                                <div key={produto.id}>
                                    <p>#{produto.id}</p>
                                    <p>Nome: {produto.produtoDerivacao.produto.nome} - Tamanho: {produto.produtoDerivacao.tamanho}</p>
                                    <p>Quantidade: {produto.quantidade} - Preço Total: {produto.preco}</p>
                                    <hr/>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                    : "Carregando"}

            </div>
        </Render>
    );
}
export default AdminPedidoForm;