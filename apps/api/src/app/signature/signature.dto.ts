import { ApiProperty } from '@nestjs/swagger'

export class CreateSignaturesDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: BinaryData
}
