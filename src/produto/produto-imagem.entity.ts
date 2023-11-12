import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'produto_imagens' })
export class ProdutoImagemEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'url', length: 255, nullable: false })
    url: string;

    @Column({ name: 'descricao', length: 255, nullable: false })
    descricao: string;
}