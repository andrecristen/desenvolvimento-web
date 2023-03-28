package com.trabalho.model;

import javax.persistence.*;

@Entity
@Table(name = "pedido_produto")
public class PedidoProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

}
