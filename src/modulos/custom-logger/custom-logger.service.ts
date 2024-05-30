import { ConsoleLogger, Injectable } from '@nestjs/common';
import { bgMagenta, white } from 'colors';
import { appendFileSync } from 'fs';
import { ProdutoEntity } from '../produto/produto.entity';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  formataLog(nome: string, quantidade: number, valor: number): string {
    return `LOCAL ${
      this.context
    } - NOME: ${nome} - QUANTIDADE: ${quantidade} - PRECO: ${valor} - TIMESTAMP ${this.getTimestamp()}`;
  }

  logColorido(produto: ProdutoEntity) {
    const { nome, quantidadeDisponivel, valor } = produto;
    const logFormatado = this.formataLog(nome, quantidadeDisponivel, valor);

    console.log(bgMagenta(white(logFormatado)));
  }

  logEmArquivo(produto: ProdutoEntity) {
    const { nome, quantidadeDisponivel, valor } = produto;
    const mensagemFormatada =
      this.formataLog(nome, quantidadeDisponivel, valor) + '\n';
    const caminhoDoLog = './src/modulos/custom-logger/arquivo.log';
    appendFileSync(caminhoDoLog, mensagemFormatada);
  }
}
