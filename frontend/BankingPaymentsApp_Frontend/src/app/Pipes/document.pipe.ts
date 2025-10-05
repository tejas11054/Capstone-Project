import { Pipe, PipeTransform } from '@angular/core';
import { DocProofType } from '../Models/ProofType';

@Pipe({
  name: 'document'
})
export class DocumentPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
          case 1: return DocProofType.ADDRESS_PROOF;
          case 2: return DocProofType.DATE_OF_BIRTH_PROOF;
          case 3: return DocProofType.IDENTITY_PROOF;
          case 4: return DocProofType.PAN_CARD;
          case 5: return DocProofType.PHOTOGRAPH;
          default: return DocProofType.OTHER;
        }
  }

}
