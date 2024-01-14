import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, ValidateNested } from 'class-validator';

class ItemPedidoDTO {
    @IsInt()
    quantidade: number;
}

export class CriaPedidoDto {
    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ItemPedidoDTO)
    itensPedido: ItemPedidoDTO[];
}
