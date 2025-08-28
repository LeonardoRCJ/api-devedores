import { HttpException, HttpStatus } from "@nestjs/common";


export class CpfAlreadyExistsException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: message,
        error: 'CpfAlreadyExists'
      },
      HttpStatus.CONFLICT
    )
  }
}