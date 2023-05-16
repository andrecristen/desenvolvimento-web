import { useContext, useEffect, useRef, useState } from "react";
import { EcommerceContext } from "../../../contexts/ecommerce";
import CarrinhoPage from "../CarrinhoPage";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Address from "../../../models/Address";
import { PublicContext } from "../../../contexts/public";
import Card from "../../../models/Card";
import { errorMessage } from "../../../components/UI/notify";


const FinalizarPedidoPage = function () {

    const { getMeusEnderecos, getMeusCartoes, registerEndereco, registerCartao, finalizarCompraCarrinho } = useContext(EcommerceContext);
    const { user } = useContext(PublicContext);

    const [validatingRegisterNewAddress, setValidatingRegisterNewAddress] = useState(false);
    const [newAddressLogradouro, setNewAddressLogradouro] = useState('');
    const [newAddressNumero, setNewAddressNumero] = useState('');
    const [newAddressCidade, setNewAddressCidade] = useState('');
    const [newAddressEstado, setNewAddressEstado] = useState('');
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [validatingRegisterNewCard, setValidatingRegisterNewCard] = useState(false);
    const [newCardNome, setNewCardNome] = useState('');
    const [newCardNumero, setNewCardNumero] = useState('');
    const [cardList, setCardList] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        //Endereço
        setAddressList([]);
        getMeusEnderecos().then((data) => {
            setAddressList(data);
        }).catch((exc) => {
            console.log(exc);
        });
        //Cartão
        setCardList([]);
        getMeusCartoes().then((data) => {
            setCardList(data);
        }).catch((exc) => {
            console.log(exc);
        });
    }, []);

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    };

    const handleCardSelect = (card) => {
        setSelectedCard(card);
    };

    const modalEnderecoRef = useRef(null);

    const handleModalEnderecoShow = () => {
        const modalElement = modalEnderecoRef.current;
        const modal = new Modal(modalElement);
        modal.show();
    };

    const handleSubmitEndereco = async (event) => {
        event.preventDefault();
        if (!validatingRegisterNewAddress) {
            if (newAddressLogradouro != "" && newAddressNumero != "" && newAddressCidade != "" && newAddressEstado != "") {
                const address = new Address();
                address.id = null;
                address.cliente = {
                    "token": user.token
                };
                address.logradouro = newAddressLogradouro;
                address.numero = newAddressNumero;
                address.cidade = newAddressCidade;
                address.estado = newAddressEstado;
                setValidatingRegisterNewAddress(true);
                await registerEndereco(address);
                setValidatingRegisterNewAddress(false);
            } else {
                setValidatingRegisterNewAddress(false);
                errorMessage('Preencha todos os campos.');
            }
        } else {
            errorMessage('Registro em processamento, aguarde finalização.');
        }
    }

    const modalCartaoRef = useRef(null);

    const handleModalCartaoShow = () => {
        const modalElement = modalCartaoRef.current;
        const modal = new Modal(modalElement);
        modal.show();
    };

    const handleSubmitCartao = async (event) => {
        event.preventDefault();
        if (!validatingRegisterNewCard) {
            if (newCardNome != "" && newCardNumero != "") {
                const card = new Card();
                card.id = null;
                card.cliente = {
                    "token": user.token
                };
                card.nome = newCardNome;
                card.numero = newCardNumero;
                setValidatingRegisterNewCard(true);
                await registerCartao(card);
                setValidatingRegisterNewCard(false);
            } else {
                setValidatingRegisterNewCard(false);
                errorMessage('Preencha todos os campos.');
            }
        } else {
            errorMessage('Registro em processamento, aguarde finalização.');
        }
    }

    const handleSubmitCompra = () => {
        if (!selectedAddress) {
            errorMessage('Selecione um endereço para realização da compra.');
            return;
        }
        if (!selectedCard) {
            errorMessage('Selecione um cartão para realização da compra.');
            return;
        }
        finalizarCompraCarrinho(selectedAddress, selectedCard);
    }

    return (
        <div>
            <CarrinhoPage disableEdit="true" title="Finalizar Pedido"></CarrinhoPage>
            <br />
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12 col-md-6">
                        <h3>Selecione o endereço de entrega</h3>
                        <button type="button" onClick={handleModalEnderecoShow} className="btn btn-primary">Adicionar novo endereço</button>
                        {addressList.map((address) => (
                            <div
                                key={address.id}
                                className={`card mb-3 ${selectedAddress?.id === address.id ? "border-primary" : ""
                                    }`}
                                onClick={() => handleAddressSelect(address)}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">{address.logradouro}</h5>
                                    <p className="card-text">Núm.: {address.numero} {`${address.cidade} - ${address.estado}`}</p>
                                </div>
                            </div>
                        ))}
                        <>
                            <div className="modal fade" ref={modalEnderecoRef} tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Novo Endereço</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                        </div>
                                        <form onSubmit={handleSubmitEndereco}>
                                            <div className="modal-body">

                                                <div className="form-group">
                                                    <label htmlFor="logradouroInput">Logradouro</label>
                                                    <input type="text" className="form-control" id="logradouroInput" onChange={(event) => { setNewAddressLogradouro(event.target.value) }} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="numeroInput">Número</label>
                                                    <input type="text" className="form-control" id="numeroInput" onChange={(event) => { setNewAddressNumero(event.target.value) }} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="cidadeInput">Cidade</label>
                                                    <input type="text" className="form-control" id="cidadeInput" onChange={(event) => { setNewAddressCidade(event.target.value) }} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="estadoInput">Estado</label>
                                                    <input type="text" className="form-control" id="estadoInput" onChange={(event) => { setNewAddressEstado(event.target.value) }} />
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Selecione o cartão</h3>
                        <button type="button" onClick={handleModalCartaoShow} className="btn btn-primary">Adicionar novo cartão</button>
                        {cardList.map((card) => (
                            <div
                                key={card.id}
                                className={`card mb-3 ${selectedCard?.id === card.id ? "border-primary" : ""
                                    }`}
                                onClick={() => handleCardSelect(card)}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">{card.nome}</h5>
                                    <p className="card-text">{card.numero}</p>
                                </div>
                            </div>
                        ))}
                         <>
                            <div className="modal fade" ref={modalCartaoRef} tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Novo Cartão</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                        </div>
                                        <form onSubmit={handleSubmitCartao}>
                                            <div className="modal-body">

                                                <div className="form-group">
                                                    <label htmlFor="logradouroInput">Nome</label>
                                                    <input type="text" className="form-control" id="logradouroInput" onChange={(event) => { setNewCardNome(event.target.value) }} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="numeroInput">Número</label>
                                                    <input type="text" className="form-control" id="numeroInput" onChange={(event) => { setNewCardNumero(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>
            <button type="button" onClick={handleSubmitCompra} className="btn btn-lg btn-success">FINALIZAR COMPRA</button>
        </div>
    );

}

export default FinalizarPedidoPage;