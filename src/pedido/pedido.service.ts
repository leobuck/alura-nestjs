import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDto } from './dto/CriaPedidoDto.dto';
import { ItemPedidoEntity } from './itempedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

    const pedidoEntity = new PedidoEntity();
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.precoVenda = 10;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
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
    const pedidos = await this.pedidoRepository.find(
      {
        where: {
          usuario: { id: usuarioId },
        },
        relations: {
          usuario: true
        },
      }
    );
    return pedidos;
  }
}
