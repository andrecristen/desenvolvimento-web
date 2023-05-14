package com.trabalho.repository;

import com.trabalho.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

    @Query("SELECT endereco FROM Endereco endereco JOIN Usuario usuario ON endereco.cliente = usuario WHERE usuario.id = :id")
    List<Endereco> getByUsuarioId(@Param("id") Long id);
}
