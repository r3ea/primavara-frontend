import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriiComponent } from './categorii.component';

describe('CategoriiComponent', () => {
  let component: CategoriiComponent;
  let fixture: ComponentFixture<CategoriiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
