package com.trabalho.controller.abstracts;

import com.trabalho.model.Usuario;

abstract public class ValidaPermissaoController {

    public boolean validate(Usuario usuario, int tipoPermissao)
    {
        return true;
    }

}
