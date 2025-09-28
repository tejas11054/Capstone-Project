import { Pipe, PipeTransform } from '@angular/core';
import { TxnType } from '../Models/TransactionType';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
          case 1: return TxnType.CREDIT;
          case 2: return TxnType.DEBIT;
          default: return 'UNKNOWN';
        }
  }

}
