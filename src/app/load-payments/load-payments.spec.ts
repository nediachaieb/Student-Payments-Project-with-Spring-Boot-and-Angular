import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPayments } from './load-payments';

describe('LoadPayments', () => {
  let component: LoadPayments;
  let fixture: ComponentFixture<LoadPayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadPayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPayments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
