import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusPedido } from "./enum/statuspedido.enum";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { PedidoEntity } from "./pedido.entity";

@Entity({ name: 'itens_pedido' })
export class ItemPedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'quantidade', nullable: false })
    quantidade: number;

    @Column({ name: 'preco_venda', nullable: false })
    precoVenda: number;

    @ManyToOne(() => PedidoEntity, 
        (pedido) => pedido.itensPedido, 
        {onDelete: 'CASCADE', onUpdate: 'CASCADE'}
    )
    pedido: PedidoEntity;

}
