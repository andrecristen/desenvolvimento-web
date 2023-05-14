package com.trabalho.controller;

import com.trabalho.model.Endereco;
import com.trabalho.model.Usuario;
import com.trabalho.repository.EnderecoRepository;
import com.trabalho.repository.UsuarioRepository;
import com.trabalho.response.MessageResponse;
import com.trabalho.response.ParamResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class EnderecoController {

    @Autowired
    private EnderecoRepository enderecoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/enderecos/{token}")
    public MessageResponse findById(@PathVariable String token) {
        MessageResponse message;
        try {
            Usuario usuario = usuarioRepository.getByToken(token);
            List<Endereco> enderecos = enderecoRepository.getByUsuarioId(usuario.getId());
            message = new MessageResponse(true, "Endereços carregados com sucesso");
            message.addParam(new ParamResponse("endereco", enderecos));
        } catch (Exception exception) {
            message =  new MessageResponse(false, exception.getMessage());
        }
        return message;
    }

    @PostMapping("/endereco/add")
    public MessageResponse add(@RequestBody Endereco endereco) {
        try {
            Usuario usuario = usuarioRepository.getByToken(endereco.getCliente().getToken());
            endereco.setCliente(usuario);
            enderecoRepository.save(endereco);
            return new MessageResponse(true, "Endereço criado com sucesso");
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }

    @DeleteMapping("/endereco/delete/{enderecoId}")
    public MessageResponse delete(@PathVariable Long enderecoId) {
        try {
            Optional<Endereco> endereco = enderecoRepository.findById(enderecoId);
            if (endereco.isPresent()) {
                enderecoRepository.delete(endereco.get());
            } else {
                throw new Exception("Não localizado endereço");
            }
            return new MessageResponse(true, "Endereço excluido com sucesso");
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }

}
