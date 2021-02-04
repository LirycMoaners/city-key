import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterScenarioDialogComponent } from './filter-scenario-dialog.component';

describe('FilterScenarioDialogComponent', () => {
  let component: FilterScenarioDialogComponent;
  let fixture: ComponentFixture<FilterScenarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterScenarioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterScenarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
