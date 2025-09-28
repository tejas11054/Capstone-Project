import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewBankComponent } from './admin-view-bank.component';

describe('AdminViewBankComponent', () => {
  let component: AdminViewBankComponent;
  let fixture: ComponentFixture<AdminViewBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewBankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
