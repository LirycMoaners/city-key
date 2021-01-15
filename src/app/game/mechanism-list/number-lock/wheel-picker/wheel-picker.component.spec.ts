import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelPickerComponent } from './wheel-picker.component';

describe('WheelPickerComponent', () => {
  let component: WheelPickerComponent;
  let fixture: ComponentFixture<WheelPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WheelPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
