import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.email = usuario.email;
    usuarioEntity.nome = usuario.nome;
    usuarioEntity.senha = usuario.senha;

    return await this.usuarioRepository.save(usuarioEntity);
  }

  async listaUsuarios() {
    const usuarios = await this.usuarioRepository.find();
    const lista = usuarios.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return lista;
  }

  async atualizaUsuario(id: string, dto: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (usuario === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    Object.assign(usuario, dto);

    await this.usuarioRepository.save(usuario);
  }

  async deletaUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected)
      throw new NotFoundException('O usuário não foi encontrado.');
  }

  async buscaPorEmail(email: string) {
    const emailEncontrado = this.usuarioRepository.findOne({
      where: { email },
    });

    if (emailEncontrado == null)
      throw new NotFoundException('O e-mail não foi encontrado.');

    return emailEncontrado;
  }
}
