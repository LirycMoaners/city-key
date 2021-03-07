import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionInfoComponent } from './edition-info.component';

describe('EditionInfoComponent', () => {
  let component: EditionInfoComponent;
  let fixture: ComponentFixture<EditionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
