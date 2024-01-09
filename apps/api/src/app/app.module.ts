import { Module } from '@nestjs/common'
import { config} from '@ark/database'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SignatureModule } from './signature/signature.module'
import { StatModule } from './stat/stat.module'

@Module({
  imports: [TypeOrmModule.forRoot(config), SignatureModule, StatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
