import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteMaterialComponent } from './teste-material.component';

describe('TesteMaterialComponent', () => {
  let component: TesteMaterialComponent;
  let fixture: ComponentFixture<TesteMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
