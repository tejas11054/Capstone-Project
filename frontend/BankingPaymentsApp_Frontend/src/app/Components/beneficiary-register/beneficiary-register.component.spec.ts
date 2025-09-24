import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryRegisterComponent } from './beneficiary-register.component';

describe('BeneficiaryRegisterComponent', () => {
  let component: BeneficiaryRegisterComponent;
  let fixture: ComponentFixture<BeneficiaryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
