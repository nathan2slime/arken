import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    VITE_APP_WEB_PORT: z.number(),
    APP_API_PORT: z.number(),
    POSTGRES_PORT: z.number(),
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DB: z.string().min(1),
  },

  runtimeEnv: {
    ...process.env,
    POSTGRES_PORT: z.coerce.number().parse(process.env.POSTGRES_PORT),
    VITE_APP_WEB_PORT: z.coerce.number().parse(process.env.VITE_APP_WEB_PORT),
    APP_API_PORT: z.coerce.number().parse(process.env.APP_API_PORT),
  },
  emptyStringAsUndefined: true,
})
