package com.trabalho.repository;

import com.trabalho.model.PedidoProduto;
import com.trabalho.response.DashboardResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoProdutoRepository extends JpaRepository<PedidoProduto, Long> {

    @Query("SELECT new com.trabalho.response.DashboardResponse(produto, sum(pedidoProduto.quantidade))" +
            "FROM PedidoProduto pedidoProduto " +
            "JOIN ProdutoDerivacao produtoDerivacao ON produtoDerivacao = pedidoProduto.produtoDerivacao " +
            "JOIN Produto produto ON  produtoDerivacao.produto = produto " +
            "GROUP BY produto.id " +
            "ORDER BY sum(pedidoProduto.quantidade) DESC")
    List<DashboardResponse> getDashboard();

}
