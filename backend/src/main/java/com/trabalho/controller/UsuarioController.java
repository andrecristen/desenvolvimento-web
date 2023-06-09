package com.trabalho.controller;

import com.trabalho.controller.abstracts.HashController;
import com.trabalho.model.Pedido;
import com.trabalho.model.Usuario;
import com.trabalho.repository.UsuarioRepository;
import com.trabalho.request.AuthRequest;
import com.trabalho.response.MessageResponse;
import com.trabalho.response.ParamResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/usuarios/clientes")
    public Page<Usuario> findAllClientes(Pageable pageable) {
        return usuarioRepository.findAll(pageable);
    }

    @GetMapping("/usuarios/administradores")
    public Page<Usuario> findAllAdministradores(Pageable pageable) {
        return usuarioRepository.findAll(pageable);
    }

    @PostMapping("/usuario/add")
    public MessageResponse add(@RequestBody Usuario usuario) {
        usuario.setTipo(Usuario.TIPO_ADMINISTRADOR);
        usuario.setToken(UUID.randomUUID().toString());
        return this.operate(usuario, "adicionado");
    }

    @PostMapping("/usuario/register")
    public MessageResponse register(@RequestBody Usuario usuario) throws NoSuchAlgorithmException {
        usuario.setTipo(Usuario.TIPO_CLIENTE);
        usuario.setToken(UUID.randomUUID().toString());
        usuario.setSenha(HashController.encode(usuario.getSenha()));
        return this.operate(usuario, "registrado");
    }
    @PostMapping("/usuario/admin/register")
    public MessageResponse registerAdmin(@RequestBody Usuario usuario) throws NoSuchAlgorithmException {
        usuario.setTipo(Usuario.TIPO_ADMINISTRADOR);
        usuario.setToken(UUID.randomUUID().toString());
        usuario.setSenha(HashController.encode(usuario.getSenha()));
        return this.operate(usuario, "registrado");
    }

    @GetMapping("/usuarios/tipo/{tipo}")
    public List<Usuario> pedidoSituacao(@PathVariable int tipo) {
        return usuarioRepository.findByTipo(tipo);
    }

    @PutMapping("/usuario/edit")
    public MessageResponse edit(@RequestBody Usuario usuario) {
        return this.operate(usuario, "alterado");
    }

    private MessageResponse operate(Usuario usuario, String textoSucesso) {
        try {
            usuarioRepository.save(usuario);
            return new MessageResponse(true, "Usuário " + textoSucesso + " com sucesso");
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }

    @PostMapping("/usuario/auth")
    public MessageResponse auth(@RequestBody AuthRequest authRequest) {
        try {
            Usuario usuario = usuarioRepository.getToken(authRequest.getEmail(), HashController.encode(authRequest.getSenha()));
            if (usuario == null) {
                throw new Exception("Não localizado usuário para as credenciais informadas.");
            }
            ArrayList<ParamResponse> params = new ArrayList<>();
            params.add(new ParamResponse("tipo", usuario.getTipo()));
            params.add(new ParamResponse("nome", usuario.getNome()));
            params.add(new ParamResponse("token", usuario.getToken()));
            return new MessageResponse(true, "Usuário logado com sucesso", params);
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }

}
