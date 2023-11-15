import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProdutoDTO.dto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uuid } from 'uuid';
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { ProdutoService } from "./produto.service";

@Controller('/produtos')
export class ProdutoController {

    constructor(
        private produtoRepository: ProdutoRepository,
        private produtoService: ProdutoService
    ) {}

    @Post()
    async criaProduto(@Body() produto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();
        produtoEntity.nome = produto.nome;
        produtoEntity.valor = produto.valor;
        produtoEntity.quantidade = produto.quantidade;
        produtoEntity.descricao = produto.descricao;
        produtoEntity.caracteristicas = produto.caracteristicas;
        produtoEntity.imagens = produto.imagens;
        produtoEntity.categoria = produto.categoria;
        produtoEntity.usuarioId = produto.usuarioId;
        produtoEntity.id = uuid();

        this.produtoService.criaProduto(produtoEntity);
        return {
            produto: produtoEntity,
            mensagem: 'Produto criado com sucesso'
        };
    }

    @Get()
    async listaProdutos() {
        return this.produtoService.listaProdutos();
    }

    @Put('/:id')
    async atualizaProduto(@Param('id') id: string, @Body() produto: AtualizaProdutoDTO) {
        const produtoAtualizado = await this.produtoService.atualizaProduto(id, produto);
        return {
            produto: produtoAtualizado,
            mensagem: 'Produto atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id: string) {
        const produtoRemovido = await this.produtoService.deletaProduto(id);
        return {
            produto: produtoRemovido,
            mensagem: 'Produto removido com sucesso'
        }
    }
}