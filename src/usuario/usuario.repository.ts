import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );
    return possivelUsuario !== undefined;
  }

  async atualiza(id: string, usuario: Partial<UsuarioEntity>) {
    const usuarioEncontrado = this.buscaPorId(id);

    Object.entries(usuario).forEach(([chave, valor]) => {
      if (chave === 'id') return;

      usuarioEncontrado[chave] = valor;
    });

    return usuarioEncontrado;
  }

  async remove(id: string) {
    const usuarioEncontrado = this.buscaPorId(id);

    this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);

    return usuarioEncontrado;
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find((usuario) => usuario.id === id);

    if (!possivelUsuario) throw new Error('Usuário não encontrado');

    return possivelUsuario;
  }
}
