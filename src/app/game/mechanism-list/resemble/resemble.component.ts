import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Mechanism } from 'src/app/shared/models/mechanism.model';
import { ImageTool } from 'src/app/shared/tools/image.tool';

@Component({
  selector: 'app-resemble',
  templateUrl: './resemble.component.html',
  styleUrls: ['./resemble.component.scss']
})
export class ResembleComponent implements OnInit, AfterViewInit {
  @ViewChild(WebcamComponent) webcam: WebcamComponent;
  @ViewChild('overlay') img: ElementRef<HTMLImageElement>;

  constructor(
    public dialogRef: MatDialogRef<ResembleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mechanism: Mechanism },
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  /**
   * Compare the image in parameter to the overlay image
   * @param image The image from the webcam
   */
  public compareImage(image: WebcamImage): void {
    ImageTool.compare(this.data.mechanism.image, image.imageAsDataUrl, this.img.nativeElement.width, this.img.nativeElement.height)
      .subscribe(result => {
        if (result < 30) {
          this.dialogRef.close(true);
        } else {
          this.snackBar.open('It\'s not the same, try again or come back later.', null, {
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['mat-warn']
          });
        }
      });
  }
}
