import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayment } from './edit-payment';

describe('EditPayment', () => {
  let component: EditPayment;
  let fixture: ComponentFixture<EditPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
