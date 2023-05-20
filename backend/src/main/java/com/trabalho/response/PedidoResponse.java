package com.trabalho.response;

import com.trabalho.model.Pedido;
import com.trabalho.model.PedidoProduto;

public class PedidoResponse {

    Pedido pedido;

    PedidoProduto[] pedidoProdutos;

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public PedidoProduto[] getPedidoProdutos() {
        return pedidoProdutos;
    }

    public void setPedidoProdutos(PedidoProduto[] pedidoProdutos) {
        this.pedidoProdutos = pedidoProdutos;
    }

}
