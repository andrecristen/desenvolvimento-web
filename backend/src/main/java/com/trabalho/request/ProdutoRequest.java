package com.trabalho.request;

import com.trabalho.model.Produto;
import com.trabalho.model.ProdutoDerivacao;

import java.util.Arrays;

public class ProdutoRequest {

    private Produto produto;

    private ProdutoDerivacao[] produtosDerivacoes;

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public ProdutoDerivacao[] getProdutosDerivacoes() {
        return produtosDerivacoes;
    }

    public void setProdutosDerivacoes(ProdutoDerivacao[] produtosDerivacoes) {
        this.produtosDerivacoes = produtosDerivacoes;
    }

}
