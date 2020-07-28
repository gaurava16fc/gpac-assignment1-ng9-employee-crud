import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListNewComponent } from './employee-list-new.component';

describe('EmployeeListNewComponent', () => {
  let component: EmployeeListNewComponent;
  let fixture: ComponentFixture<EmployeeListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
