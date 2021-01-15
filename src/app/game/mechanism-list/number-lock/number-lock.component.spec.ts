import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberLockComponent } from './number-lock.component';

describe('NumberLockComponent', () => {
  let component: NumberLockComponent;
  let fixture: ComponentFixture<NumberLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberLockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
