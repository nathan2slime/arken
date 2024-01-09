import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SignatureEntity, SubscriberEntity } from '@ark/database'

import { TableService } from '../table/table.service'
import { SignatureService } from './signature.service'
import { SignatureController } from './signature.controller'

@Module({
  imports: [TypeOrmModule.forFeature([SignatureEntity, SubscriberEntity])],
  providers: [SignatureService, TableService],
  controllers: [SignatureController],
})
export class SignatureModule {}
