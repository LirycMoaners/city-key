import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDialogComponent } from './step-dialog.component';

describe('StepDialogComponent', () => {
  let component: StepDialogComponent;
  let fixture: ComponentFixture<StepDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
