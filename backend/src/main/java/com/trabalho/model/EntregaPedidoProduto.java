package com.trabalho.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "entrega_pedido_produto")
public class EntregaPedidoProduto {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Entrega entrega;

    @OneToOne(fetch = FetchType.LAZY)
    private PedidoProduto pedidoProduto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Entrega getEntrega() {
        return entrega;
    }

    public void setEntrega(Entrega entrega) {
        this.entrega = entrega;
    }

    public PedidoProduto getPedidoProduto() {
        return pedidoProduto;
    }

    public void setPedidoProduto(PedidoProduto pedidoProduto) {
        this.pedidoProduto = pedidoProduto;
    }

}
