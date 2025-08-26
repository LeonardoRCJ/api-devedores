import { HttpException, HttpStatus } from "@nestjs/common";


export class AccountNotFoundException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: message,
        error: 'AccountNotFound'
      },
      HttpStatus.NOT_FOUND
    )
  }
}