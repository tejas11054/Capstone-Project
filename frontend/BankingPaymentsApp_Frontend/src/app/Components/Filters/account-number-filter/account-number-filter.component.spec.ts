import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNumberFilterComponent } from './account-number-filter.component';

describe('AccountNumberFilterComponent', () => {
  let component: AccountNumberFilterComponent;
  let fixture: ComponentFixture<AccountNumberFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountNumberFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountNumberFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
