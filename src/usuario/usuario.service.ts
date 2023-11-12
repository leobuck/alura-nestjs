import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async listaUsuarios() {
        const usuarios = await this.usuarioRepository.find();

        const lista = usuarios.map((usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome));

        return lista;
    }
}