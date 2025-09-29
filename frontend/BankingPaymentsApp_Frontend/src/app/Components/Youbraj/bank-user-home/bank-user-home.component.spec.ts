import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankUserHomeComponent } from './bank-user-home.component';

describe('BankUserHomeComponent', () => {
  let component: BankUserHomeComponent;
  let fixture: ComponentFixture<BankUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankUserHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
