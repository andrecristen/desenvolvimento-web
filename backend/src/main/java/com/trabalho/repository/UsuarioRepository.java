package com.trabalho.repository;

import com.trabalho.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    @Query("SELECT usuario.token FROM Usuario usuario WHERE usuario.email = :email AND usuario.senha = :senha")
    String getToken(@Param("email") String email, @Param("senha") String senha);

}
