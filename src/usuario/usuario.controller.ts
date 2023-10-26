import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() usuario) {
        this.usuarioRepository.salvar(usuario);
        return usuario;
    }

    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }
}
