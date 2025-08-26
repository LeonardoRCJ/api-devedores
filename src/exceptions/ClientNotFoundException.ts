import { HttpException, HttpStatus } from "@nestjs/common";


export class ClientNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Cliente não foi encontrado',
        error: 'ClientNotFound'
      },
      HttpStatus.NOT_FOUND
    )
  }
}