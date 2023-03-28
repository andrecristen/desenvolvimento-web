package com.trabalho.controller;

import com.trabalho.response.MessageResponse;
import com.trabalho.response.ParamResponse;

import java.util.ArrayList;

public class UsuarioController {


    public MessageResponse add() {
        try {
            return new MessageResponse(true, "Usuário criado com sucesso");
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }

    public MessageResponse edit() {
        try {
            return new MessageResponse(true, "Usuário criado com sucesso");
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }

    public MessageResponse auth() {
        try {
            ArrayList<ParamResponse> params = new ArrayList<>();
            params.add(new ParamResponse("token", "valor"));
            return new MessageResponse(true, "Usuário logado com sucesso", params);
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }


}
