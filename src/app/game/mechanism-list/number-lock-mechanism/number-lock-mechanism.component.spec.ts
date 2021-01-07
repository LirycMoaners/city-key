import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberLockMechanismComponent } from './number-lock-mechanism.component';

describe('NumberLockMechanismComponent', () => {
  let component: NumberLockMechanismComponent;
  let fixture: ComponentFixture<NumberLockMechanismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberLockMechanismComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberLockMechanismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
