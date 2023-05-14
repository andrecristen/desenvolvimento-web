package com.trabalho.controller;

import com.trabalho.controller.abstracts.ValidaPermissaoController;
import com.trabalho.model.Cartao;
import com.trabalho.model.Usuario;
import com.trabalho.repository.CartaoRepository;
import com.trabalho.repository.UsuarioRepository;
import com.trabalho.response.MessageResponse;
import com.trabalho.response.ParamResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class CartaoController {

    @Autowired
    private CartaoRepository cartaoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/cartoes/{token}")
    public MessageResponse findById(@PathVariable String token) {
        MessageResponse message;
        try {
            Usuario usuario = usuarioRepository.getByToken(token);
            List<Cartao> cartoes = cartaoRepository.getByUsuarioId(usuario.getId());
            message = new MessageResponse(true, "Cartões carregados com sucesso");
            message.addParam(new ParamResponse("cartao", cartoes));
        } catch (Exception exception) {
            message =  new MessageResponse(false, exception.getMessage());
        }
        return message;
    }

    @PostMapping("/cartao/add")
    public MessageResponse add(@RequestBody Cartao cartao) {
        try {
            Usuario usuario = usuarioRepository.getByToken(cartao.getCliente().getToken());
            cartao.setCliente(usuario);
            cartaoRepository.save(cartao);
            return new MessageResponse(true, "Cartão criado com sucesso");
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }

    @DeleteMapping("/cartao/delete/{cartaoId}")
    public MessageResponse delete(@PathVariable Long cartaoId) {
        try {
            Optional<Cartao> cartao = cartaoRepository.findById(cartaoId);
            if (cartao.isPresent()) {
                cartaoRepository.delete(cartao.get());
            } else {
                throw new Exception("Não localizado cartão");
            }
            return new MessageResponse(true, "Cartão excluido com sucesso");
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }

}
