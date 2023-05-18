import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Render from "../../../components/Admin/Render";
import { useNavigate, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { errorMessage, infoMessage } from "../../../components/UI/notify";
import { AdminContext } from "../../../contexts/admin";

const AdminProdutoForm = function (props) {

    const { addProduto } = useContext(AdminContext);
    const [sending, setSending] = useState(false);

    const [formData, setFormData] = useState({
        produto: {
            id: null,
            nome: '',
            descricao: '',
            linkImagem: '',
        },
        produtosDerivacoes: [],
    });

    const handleInputChange = (e) => {
        const { name, value, dataset } = e.target;
        const { index, field } = dataset;

        if (index) {
            const updatedDerivacoes = [...formData.produtosDerivacoes];
            updatedDerivacoes[index][field] = value;
            setFormData((prevData) => ({
                ...prevData,
                produtosDerivacoes: updatedDerivacoes,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                produto: {
                    ...prevData.produto,
                    [name]: value,
                },
            }));
        }
    };

    const handleAddDerivacao = () => {
        setFormData((prevData) => ({
            ...prevData,
            produtosDerivacoes: [
                ...prevData.produtosDerivacoes,
                {
                    id: null,
                    tamanho: '',
                    estoque: '',
                    preco: '',
                },
            ],
        }));
    };

    const handleRemoveDerivacao = (index) => {
        setFormData((prevData) => {
            const updatedDerivacoes = [...prevData.produtosDerivacoes];
            updatedDerivacoes.splice(index, 1);
            return {
                ...prevData,
                produtosDerivacoes: updatedDerivacoes,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sending) {
            infoMessage("Operação em andamento, aguarde finalização...");
            return;
        }
        const errors = [];
        if (formData.produto.nome.trim() === '') {
            errors.push('Campo nome obrigatório');
        }
        if (formData.produto.descricao.trim() === '') {
            errors.push('Campo descrição obrigatório');
        }
        if (formData.produto.linkImagem.trim() === '') {
            errors.push('Campo link da imagem obrigatório');
        }

        if (formData.produtosDerivacoes.length <= 0) {
            errors.push('Produto precisa possuir ao menos uma Derivação.');
        }

        formData.produtosDerivacoes.map((derivacao) => {
            if (derivacao.tamanho.trim() === '') {
                errors.push('Campo tamanho obrigatório');
            }

            if (derivacao.estoque.trim() === '') {
                errors.push('Campo estoque obrigatório');
            }

            if (derivacao.preco.trim() === '') {
                errors.push('Campo preço obrigatório');
            }
        });
        if (errors.length) {
            infoMessage(<div>{errors.join(' - ')}</div>)
        } else {
            setSending(true);
            await addProduto(formData);
            setSending(false);
        }
    };

    return (
        <Render>
            <h3>{props.title}</h3>
            <form onSubmit={handleSubmit}>
                <h4>Informações do Produto</h4>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={formData.produto.nome}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        className="form-control"
                        id="descricao"
                        name="descricao"
                        value={formData.produto.descricao}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="linkImagem">Link da Imagem:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="linkImagem"
                        name="linkImagem"
                        value={formData.produto.linkImagem}
                        onChange={handleInputChange}
                    />
                </div>

                <h2>Produtos Derivações</h2>
                {formData.produtosDerivacoes.map((derivacao, index) => (
                    <div key={index}>
                        <h4>Derivação {index + 1}</h4>
                        <div className="form-group">
                            <label htmlFor={`tamanho-${index}`}>Tamanho:</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`tamanho-${index}`}
                                name={`produtosDerivacoes[${index}].tamanho`}
                                data-index={index}
                                data-field="tamanho"
                                value={derivacao.tamanho}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`estoque-${index}`}>Estoque:</label>
                            <input
                                type="number"
                                className="form-control"
                                id={`estoque-${index}`}
                                name={`produtosDerivacoes[${index}].estoque`}
                                data-index={index}
                                data-field="estoque"
                                value={derivacao.estoque}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`preco-${index}`}>Preço:</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                id={`preco-${index}`}
                                name={`produtosDerivacoes[${index}].preco`}
                                data-index={index}
                                data-field="preco"
                                value={derivacao.preco}
                                onChange={handleInputChange}
                            />
                        </div>
                        {index >= 0 && (
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleRemoveDerivacao(index)}
                            >
                                Remover
                            </button>
                        )}
                        <hr />
                    </div>
                ))}

                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleAddDerivacao}
                >
                    Adicionar Derivação
                </button>
                <br/>
                <br/>
                <button type="submit" className="btn btn-lg btn-success mt-3">
                    Confirmar Cadastro
                </button>
            </form>
        </Render>
    );
}

/*
{
    "produto" : {
        "nome": "Teste 13",
        "descricao": "Teste Descrição 13",
        "linkImagem": "https://images.tcdn.com.br/img/img_prod/606732/produto_teste_3919_1_85010fa0e84b19ffcfe78386f6f702cd.jpg"
    },
    "produtosDerivacoes": [
        {
            "tamanho": "P",
            "estoque": 10,
            "preco": 12.25
        },
        {
            "tamanho": "M",
            "estoque": 12,
            "preco": 12.50
        },
        {
            "tamanho": "G",
            "estoque": 11,
            "preco": 12.75
        }
    ]
}
*/
export default AdminProdutoForm;