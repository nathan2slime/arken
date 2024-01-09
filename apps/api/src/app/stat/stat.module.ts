import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SignatureEntity } from '@ark/database'

import { StatService } from './stat.service'
import { StatController } from './stat.controller'

@Module({
  imports: [TypeOrmModule.forFeature([SignatureEntity])],
  providers: [StatService],
  controllers: [StatController],
})
export class StatModule {}
