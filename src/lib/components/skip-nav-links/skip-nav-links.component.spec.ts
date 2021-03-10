import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipNavLinksComponent } from './skip-nav-links.component';

describe('SkipNavLinksComponent', () => {
  let component: SkipNavLinksComponent;
  let fixture: ComponentFixture<SkipNavLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkipNavLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipNavLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
