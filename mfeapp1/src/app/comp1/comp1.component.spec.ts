import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comp1Component } from './comp1.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('Comp1Component', () => {
  let component: Comp1Component;
  let fixture: ComponentFixture<Comp1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Comp1Component],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(Comp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
