import { NestFactory } from '@nestjs/core'
import { env } from '@ark/env'
import { logger } from '@ark/logger'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app/app.module'

import 'reflect-metadata'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: ['fatal', 'error'],
  })

  const config = new DocumentBuilder()
    .setTitle('Arken')
    .setDescription('Docs')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document)

  await app.listen(env.APP_API_PORT || 3000, async () =>
    logger.success(await app.getUrl()),
  )
}

bootstrap()
