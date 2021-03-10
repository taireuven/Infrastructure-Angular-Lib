import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuV2Component } from './dropdown-menu.v2.component';

describe('DropdownMenuV2Component', () => {
  let component: DropdownMenuV2Component;
  let fixture: ComponentFixture<DropdownMenuV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownMenuV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
