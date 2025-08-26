import { HttpException, HttpStatus } from "@nestjs/common";


export class ClientNotFoundException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: message,
        error: 'ClientNotFound'
      },
      HttpStatus.NOT_FOUND
    )
  }
}