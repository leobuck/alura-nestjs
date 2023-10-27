import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() usuario: CriaUsuarioDTO) {
        this.usuarioRepository.salvar(usuario);
        return usuario;
    }

    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }
}
