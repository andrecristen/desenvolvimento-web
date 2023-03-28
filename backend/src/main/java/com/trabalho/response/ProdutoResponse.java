package com.trabalho.response;

import com.trabalho.model.ProdutoDerivacao;
import com.trabalho.request.ProdutoRequest;

public class ProdutoResponse extends ProdutoRequest {

    public void addProdutoDerivacao(ProdutoDerivacao produtoDerivacao) {
        int n = 0;
        if (this.getProdutosDerivacoes() != null) {
            n = this.getProdutosDerivacoes().length;
        }
        ProdutoDerivacao[] newArr = new ProdutoDerivacao[n + 1];
        for (int i = 0; i < n; i++) {
            newArr[i] = this.getProdutosDerivacoes()[i];
        }
        newArr[n] = produtoDerivacao;
        this.setProdutosDerivacoes(newArr);
    }

}
