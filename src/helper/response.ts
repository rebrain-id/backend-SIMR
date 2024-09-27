import { HttpException } from '@nestjs/common';

export class Response {
  statusCode: number;
  message: string;
  data: any;
  constructor(statusCode: number, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(
    statusCode: number,
    message: string,
    data: any,
    totalData?: number,
  ) {
    return {
      statusCode: statusCode,
      message: message,
      data: data,
      totalData,
    };
  }

  static error(statusCode: number, message: string) {
    return new HttpException(
      {
        statusCode: statusCode,
        error: message,
      },
      statusCode,
    );
  }
}
