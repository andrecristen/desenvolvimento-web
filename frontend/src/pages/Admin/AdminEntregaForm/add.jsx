import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Render from "../../../components/Admin/Render";
import { faBug, faCheckCircle, faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { AdminContext } from "../../../contexts/admin";
import Order from "../../../models/Order";
import { errorMessage, infoMessage, successMessage } from "../../../components/UI/notify";

const AdminEntregaAdd = function () {

    const selectRef = useRef(null);

    const { getPedidosSituacao, getEntregaPedidoProdutosDisponiveis, entrega } = useContext(AdminContext);
    const [pedidosDisponiveis, setPedidosDisponiveis] = useState([]);
    const [produtosPedidoSelecionado, setProdutosPedidoSelecionado] = useState([]);
    const [produtosAdicionados, setProdutosAdicionados] = useState({});
    const [loadingProdutos, setLoadingProdutos] = useState(false);
    const [creatingEntrega, setCreatingEntrega] = useState(false);

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        const orderInstance = new Order();
        setPedidosDisponiveis([]);
        getPedidosSituacao(orderInstance.STATUS_PAGAMENTO_CONFIRMADO).then((data) => {
            setPedidosDisponiveis(data);
            clearSelect();
        }).catch((exc) => {
            console.log(exc);
        });
    }

    const handleOptionChange = (event) => {
        if (loadingProdutos) {
            errorMessage("Aguarde carregamento dos pedidos");
            clearSelect();
            event.preventDefault();
            event.stopPropagation();
            event.stop();
        } else {
            const selectedValue = event.target.value;
            if (selectedValue) {
                infoMessage("Carregando produtos do pedido...");
                setLoadingProdutos(true);
                setProdutosPedidoSelecionado([]);
                getEntregaPedidoProdutosDisponiveis(selectedValue).then((data) => {
                    setProdutosPedidoSelecionado(data);
                    setLoadingProdutos(false);
                }).catch((exc) => {
                    setLoadingProdutos(false);
                });
            }
        }
    };

    const clearSelect = () => {
        if (selectRef.current) {
            selectRef.current.value = null;
        }
    }

    const addProduto = (produto) => {
        if (produtosAdicionados[produto.id]) {
            errorMessage("Produto JÁ adicionado na organização de entrega...");
        } else {
            produtosAdicionados[produto.id] = produto;
            successMessage("Produto adicionado a organização de entrega...");
            setProdutosAdicionados(produtosAdicionados);
            setProdutosPedidoSelecionado(produtosPedidoSelecionado);
        }
        load();
    }

    const removeProduto = (produto) => {
        if (!produtosAdicionados[produto.id]) {
            errorMessage("Produto NÃO adicionado na organização de entrega...");
        } else {
            delete produtosAdicionados[produto.id];
            successMessage("Produto removido da organização de entrega...");
            setProdutosAdicionados(produtosAdicionados);
        }
        load();
    }

    const handleClickEntregar = async () => {
        if (!creatingEntrega) {
            if (Object.keys(produtosAdicionados).length) {
                var entregaData = [];
                Object.entries(produtosAdicionados).map(([key, produtoAdicionado]) => (
                    entregaData.push(produtoAdicionado)
                ));
                setCreatingEntrega(true);
                await entrega(entregaData);
                setCreatingEntrega(false);
            } else {
                errorMessage("Nenhum produto adicionado na organização de entregea.");
            }
        } else {
            infoMessage("Já está sendo criada uma entrgea, aguarde resposta.");
        }
    }

    return (
        <Render>
            <h2>Pedidos Disponíveis</h2>
            <select ref={selectRef} onChange={handleOptionChange} style={{ width: "100%" }}>
                {pedidosDisponiveis.map((pedido, index) => (
                    <option key={index} value={pedido.id}>
                        #{pedido.id} - {pedido.cliente.nome}
                    </option>
                ))}
            </select>
            {produtosPedidoSelecionado && produtosPedidoSelecionado.length > 0
                ?
                <div>
                    <h2>Produtos Carregados</h2>
                    {produtosPedidoSelecionado.map((produto, index) => (
                        <button key={produto.id} onClick={() => { addProduto(produto) }} style={{ width: "100%" }} type="button" className="btn btn-md btn-outline-success">#{produto.id} - {produto.produtoDerivacao.produto.nome} {produto.quantidade} Unidade(s) <FontAwesomeIcon icon={faCheckCircle} /></button>
                    ))}
                </div>
                : ""}
            <h2>Produtos Adicionados</h2>
            {produtosAdicionados && Object.keys(produtosAdicionados).length > 0 ? (
                <div>
                    {Object.entries(produtosAdicionados).map(([key, produtoAdicionado]) => (
                        <button key={produtoAdicionado.id} onClick={() => { removeProduto(produtoAdicionado) }} style={{ width: "100%" }} type="button" className="btn btn-md btn-outline-danger">#{produtoAdicionado.id} - {produtoAdicionado.produtoDerivacao.produto.nome} {produtoAdicionado.quantidade} Unidade(s) <FontAwesomeIcon icon={faClose} /></button>

                    ))}
                </div>
            ) : (
                <p className="mt-3">Nenhum produto adicionado a entrega.</p>
            )}
            <button onClick={handleClickEntregar} type="button" className="btn btn-lg btn-success"><FontAwesomeIcon icon={faPaperPlane} />Entregar</button>
        </Render>
    )
}

export default AdminEntregaAdd;