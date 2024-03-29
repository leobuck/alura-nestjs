import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaProdutoDTO } from './dto/CriaProdutoDTO.dto';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @Post()
  async criaProduto(@Body() produto: CriaProdutoDTO) {
    const criado = await this.produtoService.criaProduto(produto);
    return {
      produto: criado,
      mensagem: 'Produto criado com sucesso.',
    };
  }

  @Get()
  async listaProdutos() {
    return await this.produtoService.listaProdutos();
  }

  @Put('/:id')
  async atualizaProduto(
    @Param('id') id: string,
    @Body() produto: AtualizaProdutoDTO,
  ) {
    const produtoAtualizado = await this.produtoService.atualizaProduto(
      id,
      produto,
    );
    return {
      produto: produtoAtualizado,
      mensagem: 'Produto atualizado com sucesso.',
    };
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletaProduto(id);
    return {
      produto: produtoRemovido,
      mensagem: 'Produto removido com sucesso.',
    };
  }
}
