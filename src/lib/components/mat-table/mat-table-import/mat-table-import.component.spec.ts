import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableImportComponent } from './mat-table-import.component';

describe('MatTableImportComponent', () => {
  let component: MatTableImportComponent;
  let fixture: ComponentFixture<MatTableImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
