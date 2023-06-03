import { BadRequestException, ValidationPipeOptions } from '@nestjs/common'

export const validationConfig: ValidationPipeOptions = {
  disableErrorMessages: true,
  transform: true,
  exceptionFactory: (errors) => new BadRequestException(errors),
  whitelist: true,
  validationError: { target: false, value: false },
}
