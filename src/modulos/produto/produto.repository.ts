import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(produto: ProdutoEntity) {
    this.produtos.push(produto);
  }

  async listar() {
    return this.produtos;
  }

  async atualiza(id: string, produto: Partial<ProdutoEntity>) {
    const produtoEncontrado = this.buscaPorId(id);

    Object.entries(produto).forEach(([chave, valor]) => {
      if (chave === 'id' || chave === 'usuarioId') return;

      produtoEncontrado[chave] = valor;
    });

    return produtoEncontrado;
  }

  async remove(id: string) {
    const produtoEncontrado = this.buscaPorId(id);

    this.produtos = this.produtos.filter((produto) => produto.id !== id);

    return produtoEncontrado;
  }

  private buscaPorId(id: string) {
    const possivelProduto = this.produtos.find((produto) => produto.id === id);

    if (!possivelProduto) throw new Error('Produto não encontrado');

    return possivelProduto;
  }
}
