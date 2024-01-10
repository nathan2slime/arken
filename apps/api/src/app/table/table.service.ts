import { Injectable } from '@nestjs/common'
import { logger } from '@ark/logger'
import { toDate, parse, isValid } from 'date-fns'
import xlsx from 'xlsx'
import { SignatureItem } from './table.types'

@Injectable()
export class TableService {
  parseDate(date: string) {
    const formats = ['MM/dd/yyyy', 'dd/MM/yyyy']

    for (const format of formats) {
      const parsedDate = parse(date, format, new Date())

      if (isValid(parsedDate)) return parsedDate
    }

    return null
  }

  getData(file: Express.Multer.File): SignatureItem[] {
    logger.start('parse table', { file: file.filename })

    const res = xlsx.read(file.buffer, {
      type: 'buffer',
      cellDates: false,
      cellText: true,
    })
    const sheetName = res.SheetNames[0]
    const sheet = res.Sheets[sheetName]

    const tableInJson = xlsx.utils.sheet_to_json<Record<string, string>>(
      sheet,
      {
        raw: false,
      },
    )

    const tableData = tableInJson.map(e => {
      const data = {
        frequency: e['periodicidade'],
        amount_charges: parseInt(e['quantidade cobranças']),
        range_days: parseInt(e['cobrada a cada X dias']),
        start_date: toDate(e['data início']),
        status: e['status'],
        date_status: toDate(e['data status']),
        price: parseFloat(e['valor']),
        subscriber: e['ID assinante'],
        cancellation_date: e['data cancelamento']
          ? toDate(e['data cancelamento'])
          : undefined,
        next_cycle: e['próximo ciclo']
          ? this.parseDate(e['próximo ciclo'].trim())
          : undefined,
      }
      logger.complete('transforming subscription data', data)

      return data
    })

    logger.complete('table data processing')

    return tableData
  }
}
