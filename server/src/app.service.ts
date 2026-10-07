import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getDate(): string {
    return 'Hoy es el dia 7 de octubre del 2026';
  }
}
