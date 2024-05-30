import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  Module,
} from '@nestjs/common';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { ProdutoModule } from './modulos/produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtro-de-excecao-global';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
import { LoggerGlobalInterceptor } from './recursos/interceptores/logger-global.interceptor';
import { CustomLoggerModule } from './modulos/custom-logger/custom-logger.module';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    PedidoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 }),
      }),
      isGlobal: true,
    }),
    AutenticacaoModule,
    CustomLoggerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoGlobal,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor,
    },
    ConsoleLogger,
  ],
})
export class AppModule {}
