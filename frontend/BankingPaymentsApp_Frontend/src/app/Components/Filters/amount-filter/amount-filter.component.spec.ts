import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountFilterComponent } from './amount-filter.component';

describe('AmountFilterComponent', () => {
  let component: AmountFilterComponent;
  let fixture: ComponentFixture<AmountFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
