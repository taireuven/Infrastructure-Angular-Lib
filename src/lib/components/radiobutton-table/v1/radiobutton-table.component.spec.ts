import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonTableComponent } from './radiobutton-table.component';

describe('RadiobuttonTableComponent', () => {
  let component: RadiobuttonTableComponent;
  let fixture: ComponentFixture<RadiobuttonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiobuttonTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
