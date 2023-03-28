package com.trabalho.repository;

import com.trabalho.model.ProdutoDerivacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutoDerivacaoRepository extends JpaRepository<ProdutoDerivacao, Long> {

    @Query("SELECT derivacao.id FROM ProdutoDerivacao derivacao where derivacao.produto.id = :produto")
    List<Long> findIdByProdutoId(@Param("produto") Long produto);

}
