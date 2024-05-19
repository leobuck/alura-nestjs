import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() usuario: CriaUsuarioDTO) {
    const criado = await this.usuarioService.criaUsuario(usuario);
    return {
      usuario: new ListaUsuarioDTO(criado.id, criado.nome),
      mensagem: 'Usuário criado com sucesso.',
    };
  }

  @Get()
  async listaUsuarios() {
    const lista = await this.usuarioService.listaUsuarios();
    return lista;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() usuario: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      usuario,
    );
    return {
      usuario: usuarioAtualizado,
      mensagem: 'Usuário atualizado com sucesso.',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);
    return {
      usuario: usuarioRemovido,
      mensagem: 'Usuário removido com sucesso.',
    };
  }
}
