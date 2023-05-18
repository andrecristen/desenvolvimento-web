import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../../components/Ecommerce/Menu";
import { EcommerceContext } from "../../../contexts/ecommerce";
import { PublicContext } from "../../../contexts/public";
import { errorMessage } from "../../../components/UI/notify";

const ProdutoPage = function () {

    const { getProdutoDerivacoes } = useContext(EcommerceContext);
    const { addItemOnCart } = useContext(PublicContext);
    let { id } = useParams();

    const [derivacaoSelecionada, setDerivacaoSelecionada] = useState(0);
    const [produto, setProduto] = useState({});

    const selecionarDerivacao = (event) => {
        setDerivacaoSelecionada(event.target.value);
    }

    const getDerivacaoSelecionada = () => {
        if (produto && produto.produtosDerivacoes && produto.produtosDerivacoes[derivacaoSelecionada]) {
            return produto.produtosDerivacoes[derivacaoSelecionada];
        }
        return null;
    }

    const addDerivacaoSelecionadaOnCart = () => {
        if (getDerivacaoSelecionada()) {
            addItemOnCart(getDerivacaoSelecionada())
        } else {
            errorMessage('Selecione um tamanho para adicionar ao carrinho.');
        }
    }

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        setProduto([]);
        getProdutoDerivacoes(id).then((data) => {
            setProduto(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }

    return (
        <div>
            <Menu></Menu>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <img className="img-fluid" src={produto.produto ? produto.produto.linkImagem : ''} alt="Imagem do produto" />
                    </div>
                    <div className="col-md-12">
                        <h2>{produto.produto ? produto.produto.nome : ''}</h2>
                        <p>{produto.produto ? produto.produto.descricao : ''}</p>
                        <h4>Tamanhos:</h4>
                        <select className="form-select" value={derivacaoSelecionada} onChange={selecionarDerivacao}>
                            {produto && produto.produtosDerivacoes && produto.produtosDerivacoes.map((derivacao, index) => {
                                return (
                                    <option value={index}>{derivacao.tamanho}</option>
                                );
                            })}
                        </select>
                        <h4>Preço: R$ {getDerivacaoSelecionada() ? getDerivacaoSelecionada().preco : "Selecione um tamanho"}</h4>
                        <h4>Estoque: {getDerivacaoSelecionada() ? getDerivacaoSelecionada().estoque : "Sem estoque"}</h4>
                        {getDerivacaoSelecionada() ? getDerivacaoSelecionada().estoque ?
                            <button type="button" className="btn btn-success mt-4" onClick={addDerivacaoSelecionadaOnCart}><FontAwesomeIcon icon={faCartPlus} /> Adicionar ao carrinho</button> : "Tamanho sem estoque"
                            : "Selecione um tamanho"}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProdutoPage;