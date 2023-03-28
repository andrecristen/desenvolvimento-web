package com.trabalho.model;

import javax.persistence.*;

@Entity
@Table(name = "cartao")
public class Cartao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    private Usuario cliente;

    @Column(columnDefinition = "text")
    private String nome;

    @Column(columnDefinition = "integer")
    private Long numero;

}
