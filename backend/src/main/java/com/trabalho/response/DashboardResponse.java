package com.trabalho.response;

import com.trabalho.model.Produto;

public class DashboardResponse {

    Produto produto;

    long quantidade;

    public DashboardResponse(Produto produto, long quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(long quantidade) {
        this.quantidade = quantidade;
    }

}
