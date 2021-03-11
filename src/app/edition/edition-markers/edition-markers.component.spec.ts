import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionMarkersComponent } from './edition-markers.component';

describe('EditionMarkersComponent', () => {
  let component: EditionMarkersComponent;
  let fixture: ComponentFixture<EditionMarkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionMarkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionMarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
