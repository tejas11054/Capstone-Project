import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankuserEditComponent } from './bankuser-edit.component';

describe('BankuserEditComponent', () => {
  let component: BankuserEditComponent;
  let fixture: ComponentFixture<BankuserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankuserEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankuserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
