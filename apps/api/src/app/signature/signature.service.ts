import { SubscriberEntity, SignatureEntity } from '@ark/database'
import { logger } from '@ark/logger'
import { Injectable } from '@nestjs/common'

import { DataSource, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { SignatureItem } from '../table/table.types'
import { TableService } from '../table/table.service'

@Injectable()
export class SignatureService {
  constructor(
    private readonly tableService: TableService,
    private dataSource: DataSource,
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
    @InjectRepository(SignatureEntity)
    private readonly signatureRepository: Repository<SignatureEntity>,
  ) {}

  async process(file: Express.Multer.File) {
    const data: SignatureItem[] = this.tableService.getData(file)

    await this.save(data)

    return { success: true }
  }

  async save(data: SignatureItem[]) {
    logger.start('saves processed table data')

    const batchSize = 100

    for (let i = 0; i < data.length; i += batchSize) {
      const group = data.slice(i, i + batchSize)
      const signatures: SignatureEntity[] = []
      const subscribers: SubscriberEntity[] = []

      for (const { subscriber, ...signature } of group) {
        const exist = await this.subscriberRepository.findOne({
          where: { number: subscriber },
        })

        const signatureEntity = this.signatureRepository.create(signature)

        if (exist) {
          subscribers.push(exist)
          signatureEntity.subscriber = exist
        } else {
          const subscriberEntity = await this.subscriberRepository.save({
            number: subscriber,
          })

          subscribers.push(subscriberEntity)
          signatureEntity.subscriber = subscriberEntity
        }

        signatures.push(signatureEntity)
      }

      const queryRunner = this.dataSource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      try {
        await queryRunner.manager.save(signatures)

        await queryRunner.commitTransaction()
      } catch (err) {
        logger.error(err)
        await queryRunner.rollbackTransaction()
      } finally {
        await queryRunner.release()

        logger.complete('saves processed table data')
      }
    }
  }
}
