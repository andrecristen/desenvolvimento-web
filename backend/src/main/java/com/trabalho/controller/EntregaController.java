package com.trabalho.controller;

import com.trabalho.model.Entrega;
import com.trabalho.model.EntregaPedidoProduto;
import com.trabalho.model.Pedido;
import com.trabalho.model.PedidoProduto;
import com.trabalho.repository.EntregaPedidoProdutoRepository;
import com.trabalho.repository.EntregaRepository;
import com.trabalho.repository.PedidoProdutoRepository;
import com.trabalho.repository.PedidoRepository;
import com.trabalho.response.EntregaResponse;
import com.trabalho.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*")
public class EntregaController {

    @Autowired
    PedidoRepository pedidoRepository;
    @Autowired
    PedidoProdutoRepository pedidoProdutoRepository;
    @Autowired
    EntregaRepository entregaRepository;
    @Autowired
    EntregaPedidoProdutoRepository entregaPedidoProdutoRepository;
    private final PlatformTransactionManager transactionManager;

    public EntregaController(PlatformTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

    @GetMapping("/entregas/pedido/{id}")
    public Collection<EntregaResponse> findEntregasPedidoProdutos(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        HashMap<Long, EntregaResponse> entregas = new HashMap<>();
        if (pedido.isPresent()) {
            List<PedidoProduto> pedidoProdutos = pedidoProdutoRepository.findByPedido(pedido.get());
            if (!pedidoProdutos.isEmpty()) {
                for (PedidoProduto pedidoProduto : pedidoProdutos) {
                    List<EntregaPedidoProduto> entregaPedidoProdutos = entregaPedidoProdutoRepository.findByPedidoProduto(pedidoProduto);
                    for (EntregaPedidoProduto entregaPedidoProduto : entregaPedidoProdutos) {
                        if (entregas.get(entregaPedidoProduto.getEntrega().getId()) == null) {
                            EntregaResponse newEntrega = new EntregaResponse();
                            newEntrega.setEntrega(entregaPedidoProduto.getEntrega());
                            entregas.put(newEntrega.getEntrega().getId(), newEntrega);
                        }
                        EntregaResponse currentEntregaResponse = entregas.get(entregaPedidoProduto.getEntrega().getId());
                        currentEntregaResponse.getEntregaPedidoProdutoList().add(entregaPedidoProduto);
                    }
                }
            }
        }
        return entregas.values();
    }

    @GetMapping("/entrega/produtos-disponiveis/pedido/{id}")
    public List<PedidoProduto> findPedidoProdutos(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        return pedido.map(value -> pedidoProdutoRepository.findByPedido(value)).orElse(null);
    }

    @PostMapping("/entrega/add")
    public MessageResponse add(@RequestBody List<PedidoProduto> entregaRequest) {
        TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
        try {
            int quantidade = 0;
            Entrega entrega = new Entrega();
            entregaRepository.save(entrega);
            HashMap<Long, Pedido> pedidos = new HashMap<>();
            for (PedidoProduto pedidoProduto : entregaRequest) {
                if (entregaPedidoProdutoRepository.findByPedidoProduto(pedidoProduto).isEmpty()) {
                    quantidade += pedidoProduto.getQuantidade();
                    EntregaPedidoProduto entregaPedidoProduto = new EntregaPedidoProduto();
                    entregaPedidoProduto.setEntrega(entrega);
                    entregaPedidoProduto.setPedidoProduto(pedidoProduto);
                    entregaPedidoProdutoRepository.save(entregaPedidoProduto);
                    pedidos.put(pedidoProduto.getPedido().getId(), pedidoProduto.getPedido());
                } else {
                    throw new Exception("Produto #[" + pedidoProduto.getId() + "] já pertence a uma entrega, remova-o da organização de entrega atual.");
                }
            }
            if (quantidade > Entrega.QUANTIDADE_MAXIMA_PRODUTOS) {
                throw new Exception("Quantidade máxima de produtos permitida é [" + Entrega.QUANTIDADE_MAXIMA_PRODUTOS + "] unidades.");
            }
            for (Pedido pedido : pedidos.values()) {
                int quantidadeEntregues = 0;
                List<PedidoProduto> pedidoProdutosCheckEntrega = pedidoProdutoRepository.findByPedido(pedido);
                for (PedidoProduto pedidoProdutoCheckEntrega : pedidoProdutosCheckEntrega) {
                    if (!entregaPedidoProdutoRepository.findByPedidoProduto(pedidoProdutoCheckEntrega).isEmpty()) {
                        quantidadeEntregues++;
                    }
                    if (quantidadeEntregues == pedidoProdutosCheckEntrega.size()) {
                        pedido.setSituacao(Pedido.SITUACAO_ENTREGUE);
                        pedidoRepository.save(pedido);
                    }
                }
            }
            transactionManager.commit(status);
            return new MessageResponse(true, "Entrega gravada com sucesso");
        } catch (Exception exception) {
            transactionManager.rollback(status);
            return new MessageResponse(false, exception.getMessage());
        }
    }

}
