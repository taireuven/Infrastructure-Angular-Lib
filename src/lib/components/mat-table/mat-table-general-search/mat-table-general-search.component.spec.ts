import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableGeneralSearchComponent } from './mat-table-general-search.component';

describe('MatTableGeneralSearchComponent', () => {
  let component: MatTableGeneralSearchComponent;
  let fixture: ComponentFixture<MatTableGeneralSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableGeneralSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableGeneralSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
