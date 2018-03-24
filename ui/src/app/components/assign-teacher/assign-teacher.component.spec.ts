import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTeacherComponent } from './assign-teacher.component';

describe('AssignTeacherComponent', () => {
  let component: AssignTeacherComponent;
  let fixture: ComponentFixture<AssignTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
