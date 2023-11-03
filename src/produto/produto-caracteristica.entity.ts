import { Column, Entity } from "typeorm";

@Entity({ name: 'produto_caracteristicas' })
export class ProdutoCaracteristicaEntity {
    
    @Column({ name: 'nome', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'descricao', length: 255, nullable: false })
    descricao: string;
}