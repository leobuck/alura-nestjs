import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDto } from './dto/CriaPedidoDto.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from 'src/modulos/produto/produto.entity';
import { AtualizaPedidoDto } from './dto/AtualizaPedidoDto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private async buscaUsuario(id) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado.');
    }
    return usuario;
  }

  private async trataDadosDoPedido(
    dadosDoPedido: CriaPedidoDto,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );
      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O produto com id ${itemPedido.produtoId} não foi encontrado.`,
        );
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}.`,
        );
      }
    });
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDto) {
    const usuario = await this.buscaUsuario(usuarioId);

    const pedidoEntity = new PedidoEntity();
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );
    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });

    await this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntidades;
    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async buscarPedidosDoUsuario(usuarioId: string) {
    const usuario = await this.buscaUsuario(usuarioId);

    const pedidos = await this.pedidoRepository.find({
      where: {
        usuario: { id: usuario.id },
      },
      relations: {
        usuario: true,
      },
    });
    return pedidos;
  }

  async atualizaPedido(pedidoId: string, dto: AtualizaPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });

    if (pedido === null) {
      throw new NotFoundException('O pedido não foi encontrado.');
    }

    Object.assign(pedido, dto as PedidoEntity);

    return await this.pedidoRepository.save(pedido);
  }
}
