package com.trabalho.repository;

import com.trabalho.model.Cartao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartaoRepository extends JpaRepository<Cartao, Long> {

    @Query("SELECT cartao FROM Cartao cartao JOIN Usuario usuario ON cartao.cliente = usuario WHERE usuario.id = :id")
    List<Cartao> getByUsuarioId(@Param("id") Long id);

}
