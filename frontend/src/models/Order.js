export default class Order {

    id;
    cliente;
    cartao;
    endereco;
    produtos;
    situacao;

    get STATUS_LIST() {
        return {
            1: "Aguardando Confirmação de Pagamento",
            2: "Pagamento Confirmado",
            3: "Em entrega",
            4: "Entregue"
        };
    }

    constructor() {

    }

}