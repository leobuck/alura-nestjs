import { Controller, Get, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(@Query('usuarioId') usuarioId: string) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(usuarioId);
    return {
      pedido: pedidoCriado,
      mensagem: 'Pedido criado com sucesso.'
    };
  }

  @Get()
  async buscarPedidosDoUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.buscarPedidosDoUsuario(usuarioId);
    return pedidos;
  }
}
