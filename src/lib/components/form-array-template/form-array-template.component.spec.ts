import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayTemplateComponent } from './form-array-template.component';

describe('FormArrayTemplateComponent', () => {
  let component: FormArrayTemplateComponent;
  let fixture: ComponentFixture<FormArrayTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArrayTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
