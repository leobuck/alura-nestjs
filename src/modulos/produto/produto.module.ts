import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';
import { CustomLoggerModule } from '../custom-logger/custom-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity]), CustomLoggerModule],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
