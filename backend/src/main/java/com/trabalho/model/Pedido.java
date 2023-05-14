package com.trabalho.model;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    private Cartao cartao;

    @ManyToOne(fetch=FetchType.LAZY)
    private Endereco endereco;

    @Column(columnDefinition = "integer")
    private Long quantidade;

    @Column(precision = 10, scale = 2)
    @Type(type = "big_decimal")
    private BigDecimal preco;

}
