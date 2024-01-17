import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProdutoDTO.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    produtoEntity.nome = produto.nome;
    produtoEntity.valor = produto.valor;
    produtoEntity.quantidadeDisponivel = produto.quantidadeDisponivel;
    produtoEntity.descricao = produto.descricao;
    produtoEntity.caracteristicas = produto.caracteristicas;
    produtoEntity.imagens = produto.imagens;
    produtoEntity.categoria = produto.categoria;

    return await this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos() {
    return await this.produtoRepository.find();
  }

  async atualizaProduto(id: string, dto: AtualizaProdutoDTO) {
    const produto = await this.produtoRepository.findOneBy({ id });
    if (produto === null) {
      throw new NotFoundException('O produto não foi encontrado.');
    }

    Object.assign(produto, dto);

    await this.produtoRepository.save(produto);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
