import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTransactionComponent } from './client-transaction.component';

describe('ClientTransactionComponent', () => {
  let component: ClientTransactionComponent;
  let fixture: ComponentFixture<ClientTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
