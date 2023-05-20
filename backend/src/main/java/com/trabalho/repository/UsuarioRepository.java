package com.trabalho.repository;

import com.trabalho.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    @Query("SELECT usuario FROM Usuario usuario WHERE usuario.email = :email AND usuario.senha = :senha")
    Usuario getToken(@Param("email") String email, @Param("senha") String senha);

    @Query("SELECT usuario FROM Usuario usuario WHERE usuario.token = :token")
    Usuario getByToken(@Param("token") String token);

    List<Usuario> findByTipo(int tipo);

}
