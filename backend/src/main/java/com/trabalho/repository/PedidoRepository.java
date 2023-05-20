package com.trabalho.repository;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trabalho.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query("SELECT pedido FROM Pedido pedido JOIN Usuario usuario ON pedido.cliente = usuario WHERE usuario.id = :id")
    List<Pedido> getByUsuarioId(@Param("id") Long id);

    List<Pedido> findBySituacao(int situacao);

}
