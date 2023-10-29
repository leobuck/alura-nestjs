import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() usuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = usuario.email;
        usuarioEntity.nome = usuario.nome;
        usuarioEntity.senha = usuario.senha;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity);
        return { 
            usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome), 
            message: 'Usuário criado com sucesso' };
    }

    @Get()
    async listaUsuarios() {
        const usuarioSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuarioSalvos.map(
            usuario => new ListaUsuarioDTO(usuario.id, usuario.nome)
        );
        return usuariosLista;
    }
}
