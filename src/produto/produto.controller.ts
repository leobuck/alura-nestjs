import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";

@Controller('/produtos')
export class ProdutoController {

    constructor(private produtoRepository: ProdutoRepository) {}

    @Post()
    async criaProduto(@Body() produto) {
        this.produtoRepository.salvar(produto);
        return produto;
    }

    @Get()
    async listaProdutos() {
        return this.produtoRepository.listar();
    }
}