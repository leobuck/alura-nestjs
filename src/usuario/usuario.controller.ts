import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { UsuarioService } from "./usuario.service";

@Controller('/usuarios')
export class UsuarioController {

    constructor(
        private usuarioRepository: UsuarioRepository,
        private usuarioService: UsuarioService
    ) {}

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
            mensagem: 'Usuário criado com sucesso' };
    }

    @Get()
    async listaUsuarios() {
        const lista = await this.usuarioService.listaUsuarios();
        return lista;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() usuario: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, usuario);
        return { 
            usuario: usuarioAtualizado,
            mensagem: 'Usuário atualizado com sucesso'
        };
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.remove(id);
        return { 
            usuario: usuarioRemovido,
            mensagem: 'Usuário removido com sucesso'
        };
    }
}
