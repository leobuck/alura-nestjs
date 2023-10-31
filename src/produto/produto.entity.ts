
export class ProdutoEntity {
    id: string;
    nome: string;
    valor: number;
    quantidade: number;
    descricao: string;
    caracteristicas: CaracteristicaProdutoEntity[];
    imagens: ImagemProdutoEntity[];
    categoria: string;
    usuarioId: string;
}

export class CaracteristicaProdutoEntity {
    nome: string;
    descricao: string;
}

export class ImagemProdutoEntity {
    url: string;
    descricao: string;
}