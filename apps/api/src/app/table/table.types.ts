import { SignatureEntity } from '@ark/database'

export type SignatureItem = {
  frequency: string
  amount_charges: number
  range_days: number
  start_date: Date
  status: string
  date_status: Date
  price: number
  subscriber: string
  next_cycle: Date
}

export type SignatureInMoth = {
  moth: Date
  items: SignatureEntity[]
}
