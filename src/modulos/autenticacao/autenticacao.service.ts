import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
  constructor(private usuarioService: UsuarioService) {}

  async login(email: string, senhaInformada: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado.');
    }

    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInformada,
      usuario.senha,
    );

    if (!usuarioFoiAutenticado) {
      throw new UnauthorizedException('O e-mail ou a senha está incorreto.');
    }

    console.log('Usuário autenticado.');

    return 'Usuário autenticado.';
  }
}
