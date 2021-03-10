import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableRowGroupComponent } from './mat-table-row-group.component';

describe('MatTableRowGroupComponent', () => {
  let component: MatTableRowGroupComponent;
  let fixture: ComponentFixture<MatTableRowGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableRowGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableRowGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
