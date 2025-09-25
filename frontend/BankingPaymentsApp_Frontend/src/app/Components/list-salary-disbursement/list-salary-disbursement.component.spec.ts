import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalaryDisbursementComponent } from './list-salary-disbursement.component';

describe('ListSalaryDisbursementComponent', () => {
  let component: ListSalaryDisbursementComponent;
  let fixture: ComponentFixture<ListSalaryDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSalaryDisbursementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSalaryDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
