import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AADLoginCubeComponent } from './login-cube.component';

describe('AADLoginCubeComponent', () => {
  let component: AADLoginCubeComponent;
  let fixture: ComponentFixture<AADLoginCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AADLoginCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AADLoginCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
