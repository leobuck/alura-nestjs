import { PartialType } from '@nestjs/mapped-types';
import { CriaProdutoDTO } from './CriaProdutoDTO.dto';

export class AtualizaProdutoDTO extends PartialType(CriaProdutoDTO) {}
