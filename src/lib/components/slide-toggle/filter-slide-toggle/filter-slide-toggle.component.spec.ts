import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSlideToggleComponent } from './filter-slide-toggle.component';

describe('FilterSlideToggleComponent', () => {
  let component: FilterSlideToggleComponent;
  let fixture: ComponentFixture<FilterSlideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSlideToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
