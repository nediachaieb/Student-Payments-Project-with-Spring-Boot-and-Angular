import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadStudents } from './load-students';

describe('LoadStudents', () => {
  let component: LoadStudents;
  let fixture: ComponentFixture<LoadStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadStudents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
