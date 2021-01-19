import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResembleComponent } from './resemble.component';

describe('ResembleComponent', () => {
  let component: ResembleComponent;
  let fixture: ComponentFixture<ResembleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResembleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
