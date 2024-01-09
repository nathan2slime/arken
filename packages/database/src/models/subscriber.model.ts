import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

import { BaseModelEntity } from './base.model'
import { SignatureEntity } from './signature.model'

@Entity({
  name: 'subscribers',
  synchronize: true,
})
export class SubscriberEntity extends BaseModelEntity {
  @Column({ unique: true })
  number: string

  @OneToMany(() => SignatureEntity, (signature) => signature.subscriber)
  signatures: SignatureEntity[]
}
