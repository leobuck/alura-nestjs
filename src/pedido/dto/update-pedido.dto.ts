import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDto } from './CriaPedidoDto.dto';

export class UpdatePedidoDto extends PartialType(CriaPedidoDto) {}
