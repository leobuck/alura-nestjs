import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, IsUrl, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CaracteristicaProdutoDTO {
    @IsNotEmpty({ message: 'Nome da caracteristica não pode ser vazio' })
    nome: string;

    @IsNotEmpty({ message: 'Descrição da caracteristica não pode ser vazia' })
    descricao: string;
}

export class ImagemProdutoDTO {
    @IsUrl(undefined, { message: 'URL da imagem inválida' })
    url: string;

    @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
    descricao: string;
}

export class CriaProdutoDTO {
    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    nome: string;

    @IsPositive({ message: 'Valor do produto deve ser maior que zero'})
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }, { message: 'Valor do produto deve ser um número' })
    valor: number;

    @IsNumber(undefined, { message: 'Quantidade do produto de ser um número' })
    @Min(0, { message: 'Quantidade do produto não pode ser menor que zero' })
    quantidade: number;

    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia' })
    @MaxLength(1000, { message: 'Descrição do produto não pode ter mais que 1000 caracteres' })
    descricao: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];

    @IsNotEmpty({ message: "Categoria do produto não pode ser vazia" })
    categoria: string;
}