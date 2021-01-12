import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-wheel-picker',
  templateUrl: './wheel-picker.component.html',
  styleUrls: ['./wheel-picker.component.scss']
})
export class WheelPickerComponent implements OnInit, AfterViewInit {
  @Input() values: string[];
  @Output() valueSelected: EventEmitter<string> = new EventEmitter();
  public orderedValues: string[] = [];
  private valueHeight = 36;
  private isScrolling: any;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document
  ) { }

  ngOnInit(): void {
    this.orderedValues = this.orderValues(this.values);
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.scrollTop = Math.floor((this.values.length - 1) / 2) * this.valueHeight - this.valueHeight / 2;
    this.elementRef.nativeElement.style.scrollBehavior = 'smooth';
  }

  private orderValues(values: string[]): string[] {
    const orderedValues: string[] = [...values];
    for (let i = values.length - 1; i > Math.trunc(values.length / 2); i--) {
      orderedValues.unshift(orderedValues.splice(orderedValues.length - 1, 1)[0]);
    }
    return orderedValues;
  }

  @HostListener('scroll') onScroll(): void {
    if (this.elementRef.nativeElement.scrollTop < this.valueHeight * 1.5) {
      this.orderedValues.unshift(this.orderedValues.splice(this.orderedValues.length - 1, 1)[0]);
    } else if (this.elementRef.nativeElement.scrollTop > (this.orderedValues.length - 1) * this.valueHeight - this.valueHeight * 1.5) {
      this.orderedValues.push(this.orderedValues.shift());
      this.elementRef.nativeElement.style.scrollBehavior = 'auto';
      this.elementRef.nativeElement.scrollTop -= this.valueHeight;
      this.elementRef.nativeElement.style.scrollBehavior = 'smooth';
    }
  }

  @HostListener('touchstart') onTouchStart(): void {
    this.elementRef.nativeElement.removeEventListener('scroll', this.scrollEvent);
    this.document.addEventListener('touchend', () => {
      this.setValue();
      this.elementRef.nativeElement.addEventListener('scroll', this.scrollEvent);
    });
  }

  private scrollEvent = () => {
    clearTimeout(this.isScrolling);
    this.isScrolling = setTimeout(() => {
      this.setValue();
    }, 66);
  }

  private setValue(): void {
    this.elementRef.nativeElement.scrollTo({ top:
      Math.round(
        (this.elementRef.nativeElement.scrollTop + this.valueHeight / 2) / this.valueHeight
      ) * this.valueHeight - this.valueHeight / 2
    });
    this.valueSelected.emit(this.orderedValues[Math.round(this.elementRef.nativeElement.scrollTop / this.valueHeight)]);
  }
}
