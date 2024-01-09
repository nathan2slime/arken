import { SignatureEntity } from '@ark/database'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { eachMonthOfInterval, isBefore, isWithinInterval } from 'date-fns'

import { SignatureInMoth } from '../table/table.types'

@Injectable()
export class StatService {
  constructor(
    @InjectRepository(SignatureEntity)
    private readonly signatureRepository: Repository<SignatureEntity>,
  ) {}

  getChurnRate(signatures: SignatureEntity[], moth: Date) {
    const canceledSignatures = signatures.filter(signature => {
      if (
        signature.cancellation_date &&
        moth.getMonth() == signature.cancellation_date.getMonth()
      ) {
        return signature
      }
    })

    return parseFloat(
      ((canceledSignatures.length / signatures.length) * 100 || 0).toFixed(2),
    )
  }

  getMRR(signatures: SignatureEntity[], moth: Date) {
    const monthlySubscriptionRevenue =
      (signatures.reduce((acc, { price }) => acc + price, 0) /
        signatures.length) *
      signatures.length

    const monthlyUpgradeRevenue = signatures.reduce(
      (acc, { status, price, date_status }) => {
        if (status == 'Upgrade' && moth.getMonth() == date_status.getMonth()) {
          return acc + price
        }
      },
      0,
    )

    const revenueMonthlyChurn = signatures.reduce(
      (acc, { cancellation_date, price }) => {
        if (
          !!cancellation_date &&
          moth.getMonth() == cancellation_date.getMonth()
        ) {
          return acc + price
        }
      },
      0,
    )

    const mrr =
      (monthlySubscriptionRevenue || 0) +
      (monthlyUpgradeRevenue || 0) -
      (revenueMonthlyChurn || 0)

    return parseFloat(mrr.toFixed(2))
  }

  async getStats() {
    const data = await this.signatureRepository.find()

    if (data.length == 0) return data

    const { start_date } = data.reduce((prev, next) => {
      if (!prev || isBefore(next.start_date, prev.start_date)) {
        return next
      } else {
        return prev
      }
    }, null)

    const intervals = eachMonthOfInterval({
      end: new Date(),
      start: start_date,
    })

    const signatureInMoth: SignatureInMoth[] = intervals.map(moth => {
      const items = data.filter(item => {
        if (item.cancellation_date) {
          return isWithinInterval(moth, {
            start: item.start_date,
            end: item.cancellation_date,
          })
        } else {
          return isWithinInterval(moth, {
            start: item.start_date,
            end: new Date(),
          })
        }
      })

      return { moth, items }
    })

    return signatureInMoth.map(({ moth, items }) => {
      const churnRate = this.getChurnRate(items, moth)
      const mrr = this.getMRR(items, moth)

      return { moth, mrr, churnRate }
    })
  }
}
