package com.trabalho.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "pedido_produto")
public class PedidoProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    private Pedido pedido;

    @ManyToOne(fetch=FetchType.LAZY)
    private ProdutoDerivacao produtoDerivacao;

    @Column(columnDefinition = "integer")
    private Long quantidade;

    @Column(precision = 10, scale = 2)
    @Type(type = "big_decimal")
    private BigDecimal preco;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public ProdutoDerivacao getProdutoDerivacao() {
        return produtoDerivacao;
    }

    public void setProdutoDerivacao(ProdutoDerivacao produtoDerivacao) {
        this.produtoDerivacao = produtoDerivacao;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

}
