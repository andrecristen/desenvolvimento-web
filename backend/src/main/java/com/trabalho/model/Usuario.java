package com.trabalho.model;

import javax.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    final int TIPO_CLIENTE = 1;
    final int TIPO_ADMINISTRADOR = 2;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

}
