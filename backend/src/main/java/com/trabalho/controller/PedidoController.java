package com.trabalho.controller;

import com.trabalho.model.*;
import com.trabalho.repository.PedidoProdutoRepository;
import com.trabalho.repository.PedidoRepository;
import com.trabalho.repository.ProdutoDerivacaoRepository;
import com.trabalho.repository.UsuarioRepository;
import com.trabalho.request.PedidoRequest;
import com.trabalho.response.DashboardResponse;
import com.trabalho.response.MessageResponse;
import com.trabalho.response.ParamResponse;
import com.trabalho.response.PedidoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    PedidoRepository pedidoRepository;
    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    PedidoProdutoRepository pedidoProdutoRepository;
    @Autowired
    ProdutoDerivacaoRepository produtoDerivacaoRepository;

    private final PlatformTransactionManager transactionManager;

    public PedidoController(PlatformTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

    @GetMapping("/pedidos/dashboard")
    public List<DashboardResponse> dashboard() {
        return pedidoProdutoRepository.getDashboard();
    }

    @GetMapping("/pedidos/situacao/{situacao}")
    public List<Pedido> pedidoSituacao(@PathVariable int situacao) {
        return pedidoRepository.findBySituacao(situacao);
    }

    @PutMapping("/pedido/{id}/nova-situacao/{situacao}")
    public MessageResponse alterarSituacao(@PathVariable Long id, @PathVariable int situacao) {
        MessageResponse message;
        try {
            Optional<Pedido> pedido = pedidoRepository.findById(id);
            if (pedido.isPresent()) {
                pedido.get().setSituacao(situacao);
                pedidoRepository.save(pedido.get());
            } else {
                throw new Exception("Não localizado pedido informado");
            }
            message = new MessageResponse(true, "Alterada situação do pedido #[" + id + "]");
        } catch (Exception exception) {
            message = new MessageResponse(false, exception.getMessage());
        }
        return message;
    }

    @GetMapping("/pedido/{id}")
    public Optional<PedidoResponse> findPedido(@PathVariable Long id) {
        PedidoResponse response = null;
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        if (pedido.isPresent()) {
            response = new PedidoResponse();
            response.setPedido(pedido.get());
            List<PedidoProduto> pedidoProdutos = pedidoProdutoRepository.findByPedido(pedido.get());
            response.setPedidoProdutos(pedidoProdutos.toArray(PedidoProduto[]::new));
        }
        return Optional.ofNullable(response);
    }

    @GetMapping("/pedidos/{token}")
    public MessageResponse meusPedidos(@PathVariable String token) {
        MessageResponse message;
        try {
            Usuario usuario = usuarioRepository.getByToken(token);
            List<Pedido> pedidos = pedidoRepository.getByUsuarioId(usuario.getId());
            for (Pedido pedido : pedidos) {
                pedido.setCartao(null);
                pedido.setEndereco(null);
                pedido.setCliente(null);
            }
            message = new MessageResponse(true, "Pedidos carregados com sucesso");
            message.addParam(new ParamResponse("pedidos", pedidos));
        } catch (Exception exception) {
            message = new MessageResponse(false, exception.getMessage());
        }
        return message;
    }

    @PostMapping("/pedido/add")
    public MessageResponse add(@RequestBody PedidoRequest pedidoRequest) {
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
        try {
            Pedido pedido = new Pedido();
            pedido.setCliente(usuarioRepository.getByToken(pedidoRequest.getCliente().getToken()));
            pedido.setCartao(pedidoRequest.getCartao());
            pedido.setEndereco(pedidoRequest.getEndereco());
            pedido.setSituacao(Pedido.SITUACAO_NAO_PAGO);
            pedidoRepository.save(pedido);
            for (PedidoProduto pedidoProduto : pedidoRequest.getProdutos()) {
                if (pedidoProduto.getQuantidade() > Entrega.QUANTIDADE_MAXIMA_PRODUTOS) {
                    throw new Exception("A quantidade máxima para um produto é de ["+Entrega.QUANTIDADE_MAXIMA_PRODUTOS+"] unidades, pois nosso drone não suporta mais que isso.");
                }
                pedidoProduto.setPedido(pedido);
                BigDecimal precoTotal = new BigDecimal(pedidoProduto.getQuantidade()).multiply(pedidoProduto.getPreco());
                pedidoProduto.setPreco(precoTotal);
                pedidoProdutoRepository.save(pedidoProduto);
                Optional<ProdutoDerivacao> produtoDerivacao = produtoDerivacaoRepository.findById(pedidoProduto.getProdutoDerivacao().getId());
                if (produtoDerivacao.isPresent()) {
                    ProdutoDerivacao produtoDerivacaoInstance = produtoDerivacao.get();
                    produtoDerivacaoInstance.setEstoque(produtoDerivacaoInstance.getEstoque() - pedidoProduto.getQuantidade());
                    if (produtoDerivacaoInstance.getEstoque() < 0) {
                        throw new Exception("Não há estoque suficiente para o produto [" + produtoDerivacaoInstance.getProduto().getNome() + "] tamanho: [" + produtoDerivacaoInstance.getTamanho() + "]");
                    }
                    produtoDerivacaoRepository.save(produtoDerivacao.get());
                }
            }
            transactionManager.commit(status);
            return new MessageResponse(true, "Pedido gravado com sucesso");
        } catch (Exception exception) {
            transactionManager.rollback(status);
            return new MessageResponse(false, exception.getMessage());
        }
    }

}
