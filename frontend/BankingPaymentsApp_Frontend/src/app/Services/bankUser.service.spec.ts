import { TestBed } from '@angular/core/testing';

import { BankRegisterService } from './bankUser.service';

describe('BankRegisterService', () => {
  let service: BankRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
