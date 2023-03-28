package com.trabalho.response;

public class ParamResponse {

    private String nome;

    private Object valor;

    public ParamResponse(String nome, Object valor) {
        this.nome = nome;
        this.valor = valor;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public Object getValor() {
        return valor;
    }

    public void setValor(Object valor) {
        this.valor = valor;
    }
}
