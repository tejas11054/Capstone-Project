import { Pipe, PipeTransform } from '@angular/core';
import { PayStatus } from '../Models/PaymentStatus';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
      case 1: return PayStatus.APPROVED;
      case 2: return PayStatus.DECLINED;
      case 3: return PayStatus.PENDING;
      default: return 'UNKNOWN';
    }
  }

}
