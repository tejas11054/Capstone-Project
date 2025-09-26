import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSalaryDisbursementComponent } from './client-salary-disbursement.component';

describe('ClientSalaryDisbursementComponent', () => {
  let component: ClientSalaryDisbursementComponent;
  let fixture: ComponentFixture<ClientSalaryDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSalaryDisbursementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSalaryDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
