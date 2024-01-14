import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDto } from './dto/CriaPedidoDto.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDto) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);
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
