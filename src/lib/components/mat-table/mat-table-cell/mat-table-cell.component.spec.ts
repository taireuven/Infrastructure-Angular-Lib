import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableCellComponent } from './mat-table-cell.component';

describe('MatTableCellComponent', () => {
  let component: MatTableCellComponent;
  let fixture: ComponentFixture<MatTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
