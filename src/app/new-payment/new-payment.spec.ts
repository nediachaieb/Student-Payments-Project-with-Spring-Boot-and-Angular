import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPayment } from './new-payment';

describe('NewPayment', () => {
  let component: NewPayment;
  let fixture: ComponentFixture<NewPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
