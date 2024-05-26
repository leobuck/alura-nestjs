import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDto } from './dto/CriaPedidoDto.dto';
import { AtualizaPedidoDto } from './dto/AtualizaPedidoDto';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDto,
  ) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosDoPedido,
    );
    return {
      pedido: pedidoCriado,
      mensagem: 'Pedido criado com sucesso.',
    };
  }

  @Get()
  async buscarPedidosDoUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.buscarPedidosDoUsuario(usuarioId);
    return pedidos;
  }

  @Patch(':id')
  async atualizaPedido(
    @Param('id') pedidoId: string,
    @Body() dadosDeAtualizacao: AtualizaPedidoDto,
  ) {
    const pedidoAtualizado = await this.pedidoService.atualizaPedido(
      pedidoId,
      dadosDeAtualizacao,
    );
    return {
      pedido: pedidoAtualizado,
      mensagem: 'Pedido atualizado com sucesso',
    };
  }
}
