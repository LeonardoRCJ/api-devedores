import { HttpException, HttpStatus } from "@nestjs/common";


export class TransactionNotFoundException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: message,
        error: 'TransactionNotFound'
      },
      HttpStatus.NOT_FOUND
    )
  }
}