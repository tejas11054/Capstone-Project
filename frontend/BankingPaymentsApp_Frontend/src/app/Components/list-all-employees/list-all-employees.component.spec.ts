import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllEmployeesComponent } from './list-all-employees.component';

describe('ListAllEmployeesComponent', () => {
  let component: ListAllEmployeesComponent;
  let fixture: ComponentFixture<ListAllEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
