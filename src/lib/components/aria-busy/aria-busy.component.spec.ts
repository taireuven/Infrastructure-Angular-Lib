import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AriaBusyComponent } from './aria-busy.component';

describe('AriaBusyComponent', () => {
  let component: AriaBusyComponent;
  let fixture: ComponentFixture<AriaBusyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AriaBusyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AriaBusyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
