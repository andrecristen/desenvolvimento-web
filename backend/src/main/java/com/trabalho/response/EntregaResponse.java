package com.trabalho.response;

import com.trabalho.model.Entrega;
import com.trabalho.model.EntregaPedidoProduto;

import java.util.ArrayList;
import java.util.List;

public class EntregaResponse {

    Entrega entrega;

    List<EntregaPedidoProduto> entregaPedidoProdutoList;

    public EntregaResponse() {
        this.entregaPedidoProdutoList = new ArrayList<EntregaPedidoProduto>();
    }

    public Entrega getEntrega() {
        return entrega;
    }

    public void setEntrega(Entrega entrega) {
        this.entrega = entrega;
    }

    public List<EntregaPedidoProduto> getEntregaPedidoProdutoList() {
        return entregaPedidoProdutoList;
    }

    public void setEntregaPedidoProdutoList(List<EntregaPedidoProduto> entregaPedidoProdutoList) {
        this.entregaPedidoProdutoList = entregaPedidoProdutoList;
    }

}
