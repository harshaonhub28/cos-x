import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardUploadComponent } from './standard-upload.component';

describe('StandardUploadComponent', () => {
  let component: StandardUploadComponent;
  let fixture: ComponentFixture<StandardUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
