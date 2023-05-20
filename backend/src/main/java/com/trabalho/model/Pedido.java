package com.trabalho.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "pedido")
public class Pedido {

    public static final int SITUACAO_NAO_PAGO = 1;
    public static final int SITUACAO_PAGO = 2;
    public static final int SITUACAO_EM_ENTREGA = 3;
    public static final int SITUACAO_ENTREGUE = 4;
    public static final int SITUACAO_CANCELADO = 5;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    private Usuario cliente;

    @ManyToOne(fetch=FetchType.LAZY)
    private Cartao cartao;

    @ManyToOne(fetch=FetchType.LAZY)
    private Endereco endereco;

    @Column(columnDefinition = "integer")
    private int situacao;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getCliente() {
        return cliente;
    }

    public void setCliente(Usuario cliente) {
        this.cliente = cliente;
    }

    public Cartao getCartao() {
        return cartao;
    }

    public void setCartao(Cartao cartao) {
        this.cartao = cartao;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public int getSituacao() {
        return situacao;
    }

    public void setSituacao(int situacao) {
        this.situacao = situacao;
    }

}
