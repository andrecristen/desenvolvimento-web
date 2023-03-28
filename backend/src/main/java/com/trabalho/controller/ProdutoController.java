package com.trabalho.controller;

import com.trabalho.model.ProdutoDerivacao;
import com.trabalho.repository.ProdutoDerivacaoRepository;
import com.trabalho.request.ProdutoRequest;
import com.trabalho.model.Produto;
import com.trabalho.repository.ProdutoRepository;
import com.trabalho.response.MessageResponse;
import com.trabalho.response.ProdutoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ProdutoDerivacaoRepository produtoDerivacaoRepository;

    @GetMapping("/produtos")
    public Page<Produto> findAll(Pageable pageable) {
        return produtoRepository.findAll(pageable);
    }

    @GetMapping("/produto/{produtoId}")
    public Optional<Produto> findById(@PathVariable Long produtoId) {
        return produtoRepository.findById(produtoId);
    }

    @GetMapping("/produto/{produtoId}/derivacoes")
    public ProdutoResponse findDerivacoesByProdutoId(@PathVariable Long produtoId) {
        List<Long> ids = produtoDerivacaoRepository.findIdByProdutoId(produtoId);
        ProdutoResponse produtoDerivacaos = new ProdutoResponse();
        Optional<Produto> produto = produtoRepository.findById(produtoId);
        produto.ifPresent(produtoDerivacaos::setProduto);
        for (Long id : ids) {
            Optional<ProdutoDerivacao> produtoDerivacao = produtoDerivacaoRepository.findById(id);
            produtoDerivacao.ifPresent(produtoDerivacaos::addProdutoDerivacao);
        }
        return produtoDerivacaos;
    }

    @PostMapping("/produto/add")
    public MessageResponse add(@RequestBody ProdutoRequest produtoRequest) {
        return this.operate(produtoRequest, "criado");
    }

    @PutMapping("/produto/edit")
    public MessageResponse edit(@RequestBody ProdutoRequest produtoRequest) {
        return this.operate(produtoRequest, "alterado");
    }

    private MessageResponse operate(ProdutoRequest produtoRequest, String textoSucesso) {
        try {
            produtoRepository.save(produtoRequest.getProduto());
            for (ProdutoDerivacao produtoDerivacao : produtoRequest.getProdutosDerivacoes()) {
                produtoDerivacao.setProduto(produtoRequest.getProduto());
                produtoDerivacaoRepository.save(produtoDerivacao);
            }
            return new MessageResponse(true, "Produto " + textoSucesso + " com sucesso");
        } catch (Exception exception) {
            return new MessageResponse(false, exception.getMessage());
        }
    }


}
