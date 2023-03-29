package com.trabalho.repository;

import com.trabalho.model.Produto;
import com.trabalho.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
