import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableMobileAccordionComponent } from './mat-table-mobile-accordion.component';

describe('MatTableMobileAccordionComponent', () => {
  let component: MatTableMobileAccordionComponent;
  let fixture: ComponentFixture<MatTableMobileAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableMobileAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableMobileAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
