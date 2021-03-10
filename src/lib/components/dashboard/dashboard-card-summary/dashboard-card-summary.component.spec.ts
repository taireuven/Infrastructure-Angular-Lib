import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardSummaryComponent } from './dashboard-card-summary.component';

describe('DashboardCardSummaryComponent', () => {
  let component: DashboardCardSummaryComponent;
  let fixture: ComponentFixture<DashboardCardSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCardSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
