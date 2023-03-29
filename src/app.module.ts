import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatModule } from './modules/flats/flat.module';
import { Flat } from './modules/flats/models/flat.model';
import { OperationType } from './modules/operation-types/models/op.model';
import { OptModule } from './modules/operation-types/op.modul';
import { Operation } from './modules/operations/models/operation.model';
import { OperationModule } from './modules/operations/operation.modul';
import { Owner } from './modules/owners/models/owner.model';
import { Worker } from './modules/workers/models/worker.model';
import { OwnerModule } from './modules/owners/owner.modul';
import { WorkerModule } from './modules/workers/worker.modul';

@Module({
  imports: [
    FlatModule,
    OptModule,
    OperationModule,
    OwnerModule,
    WorkerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST') ?? 'localhost',
        port: config.get<number>('DB_PORT') ?? 5432,
        username: config.get<string>('DB_USER') ?? 'user',
        password: config.get<string>('DB_PASS') ?? 'admin',
        database: config.get<string>('DB_NAME') ?? 'lab_5',
        entities: [Flat, OperationType, Operation, Owner, Worker],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
