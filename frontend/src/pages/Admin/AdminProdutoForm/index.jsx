import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Render from "../../../components/Admin/Render";
import { useNavigate, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { errorMessage, infoMessage } from "../../../components/UI/notify";
import { AdminContext } from "../../../contexts/admin";

const AdminProdutoForm = function (props) {

    const { getProdutoDerivacoes, addProduto, editProduto } = useContext(AdminContext);
    const [sending, setSending] = useState(false);
    let { id } = useParams();

    const [formData, setFormData] = useState({
        produto: {
            id: null,
            nome: '',
            descricao: '',
            linkImagem: '',
        },
        produtosDerivacoes: [],
    });

    useEffect(() => {
        if (id) {
            getProdutoDerivacoes(id).then((data) => {
                setFormData(data);
            }).catch((exc) => {
                console.log(exc);
            });
        }
    }, []);

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
                    estoque: 0,
                    preco: null,
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

            if (derivacao.estoque === null || derivacao.estoque.toString().trim() === '') {
                errors.push('Campo estoque obrigatório');
            }

            if (derivacao.preco === null|| derivacao.preco.toString().trim() === '') {
                errors.push('Campo preço obrigatório');
            }
        });
        if (errors.length) {
            infoMessage(<div>{errors.join(' - ')}</div>)
        } else {
            setSending(true);
            if (id) {
                await editProduto(formData);
            } else {
                await addProduto(formData);
            }
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
                                step={1}
                                pattern="[0-9]" 
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
                        {derivacao.id == null && (
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
                <br />
                <br />
                <button type="submit" className="btn btn-lg btn-success mt-3">
                    Confirmar Cadastro
                </button>
            </form>
        </Render>
    );
}
export default AdminProdutoForm;