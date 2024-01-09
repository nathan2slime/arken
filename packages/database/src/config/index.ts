import { DataSourceOptions } from 'typeorm'
import { env } from '@ark/env'

import { entities } from '../models'

export const config: DataSourceOptions = {
  type: 'postgres',
  port: env.POSTGRES_PORT,
  host: env.POSTGRES_HOST,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities,
  ssl: false,
  synchronize: true,
}
