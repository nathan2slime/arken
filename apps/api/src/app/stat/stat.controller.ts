import { Controller, Get } from '@nestjs/common'

import { StatService } from './stat.service'

@Controller('stats')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @Get()
  getStats() {
    return this.statService.getStats()
  }
}
