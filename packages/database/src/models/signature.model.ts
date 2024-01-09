import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { BaseModelEntity } from './base.model'
import { SubscriberEntity } from './subscriber.model'

@Entity({
  name: 'signatures',
  synchronize: true,
})
export class SignatureEntity extends BaseModelEntity {
  @Column()
  frequency: string

  @Column()
  amount_charges: number

  @Column()
  range_days: number

  @Column()
  start_date: Date

  @Column()
  status: string

  @Column()
  date_status: Date

  @Column({ nullable: true })
  cancellation_date: Date

  @Column({ type: 'float' })
  price: number

  @ManyToOne(() => SubscriberEntity, subscriber => subscriber.signatures)
  subscriber: SubscriberEntity

  @Column({ nullable: true })
  next_cycle: Date
}
