import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickySectionComponent } from './sticky-section.component';

describe('StickySectionComponent', () => {
  let component: StickySectionComponent;
  let fixture: ComponentFixture<StickySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
