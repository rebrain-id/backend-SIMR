import { HttpException } from '@nestjs/common';

export class Response {
  status: number;
  message: string;
  data: any;
  constructor(status: number, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success(status: number, message: string, data: any) {
    return {
      status: status,
      message: message,
      data: data,
    };
  }

  static error(status: number, message: string) {
    return new HttpException(
      {
        status: status,
        error: message,
      },
      status,
    );
  }
}
