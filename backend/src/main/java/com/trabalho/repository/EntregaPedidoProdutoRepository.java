package com.trabalho.repository;

import com.trabalho.model.EntregaPedidoProduto;
import com.trabalho.model.PedidoProduto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EntregaPedidoProdutoRepository extends JpaRepository<EntregaPedidoProduto, Long> {

    List<EntregaPedidoProduto> findByPedidoProduto(PedidoProduto pedidoProduto);

}
