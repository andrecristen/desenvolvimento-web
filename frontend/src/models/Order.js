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
            4: "Entregue",
            5: "Cancelado",
        };
    }

    get STATUS_AGUARDANDO_CONFIRMACAO_PAGAMENTO() {
        return 1;
    }

    get STATUS_PAGAMENTO_CONFIRMADO() {
        return 2;
    }

    get STATUS_EM_ENTREGA() {
        return 3;
    }

    get STATUS_ENTREGUE() {
        return 4;
    }


    get STATUS_CANCELADO() {
        return 5;
    }

    constructor() {

    }

}