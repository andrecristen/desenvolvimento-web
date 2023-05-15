package com.trabalho.request;

import com.trabalho.model.*;

public class PedidoRequest {

    Usuario cliente;

    Cartao cartao;

    Endereco endereco;

    private PedidoProduto[] produtos;

    public Usuario getCliente() {
        return cliente;
    }

    public void setCliente(Usuario cliente) {
        this.cliente = cliente;
    }

    public Cartao getCartao() {
        return cartao;
    }

    public void setCartao(Cartao cartao) {
        this.cartao = cartao;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public PedidoProduto[] getProdutos() {
        return produtos;
    }

    public void setProdutos(PedidoProduto[] produtos) {
        this.produtos = produtos;
    }

}
