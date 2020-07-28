import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeNewComponent } from './create-employee-new.component';

describe('CreateEmployeeNewComponent', () => {
  let component: CreateEmployeeNewComponent;
  let fixture: ComponentFixture<CreateEmployeeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmployeeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
