import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankUserRegisterComponent } from './bank-user-register.component';

describe('BankUserRegisterComponent', () => {
  let component: BankUserRegisterComponent;
  let fixture: ComponentFixture<BankUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankUserRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
