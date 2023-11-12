import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async criaUsuario(usuario: UsuarioEntity) {
        await this.usuarioRepository.save(usuario);
    }

    async listaUsuarios() {
        const usuarios = await this.usuarioRepository.find();

        const lista = usuarios.map((usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome));

        return lista;
    }

    async atualizaUsuario(id: string, usuario: AtualizaUsuarioDTO) {
        await this.usuarioRepository.update(id, usuario);
    }

    async deletaUsuario(id: string) {
        await this.usuarioRepository.delete(id);
    }
}