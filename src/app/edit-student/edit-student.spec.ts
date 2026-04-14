import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudent } from './edit-student';

describe('EditStudent', () => {
  let component: EditStudent;
  let fixture: ComponentFixture<EditStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
