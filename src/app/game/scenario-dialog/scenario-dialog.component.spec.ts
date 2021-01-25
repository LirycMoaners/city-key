import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDialogComponent } from './scenario-dialog.component';

describe('ScenarioDialogComponent', () => {
  let component: ScenarioDialogComponent;
  let fixture: ComponentFixture<ScenarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
