import {
  Controller,
  Get,
  UploadedFile,
  Post,
  UseInterceptors,
  Body,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes } from '@nestjs/swagger'

import { SignatureService } from './signature.service'
import { CreateSignaturesDto } from './signature.dto'

@Controller('signatures')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  register(
    @UploadedFile() file: Express.Multer.File,
    @Body() _body: CreateSignaturesDto,
  ) {
    return this.signatureService.process(file)
  }
}
