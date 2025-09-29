import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankUserProfileComponent } from './bank-user-profile.component';

describe('BankUserProfileComponent', () => {
  let component: BankUserProfileComponent;
  let fixture: ComponentFixture<BankUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
