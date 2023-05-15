export default class Order {

    id;
    cliente;
    cartao;
    endereco;
    produtos;
    situacao;

    get STATUS_LIST() {
        return {
            1: "Pago",
            2: "Em entrega",
            3: "Entregue"
        };
    }

    constructor() {

    }

}