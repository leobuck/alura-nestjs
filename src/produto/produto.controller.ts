import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProdutoDTO.dto";

@Controller('/produtos')
export class ProdutoController {

    constructor(private produtoRepository: ProdutoRepository) {}

    @Post()
    async criaProduto(@Body() produto: CriaProdutoDTO) {
        this.produtoRepository.salvar(produto);
        return produto;
    }

    @Get()
    async listaProdutos() {
        return this.produtoRepository.listar();
    }
}