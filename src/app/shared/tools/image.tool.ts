import * as resemble from 'resemblejs';
import { forkJoin, Observable, throwError } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

export class ImageTool {

  public static getImageFromTarget(target: EventTarget | null): File | undefined {
    if (target) {
      const fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];
      const files = (target as HTMLInputElement).files;

      if (files && files[0] && fileTypes.includes(files[0].type)) {
        return files[0];
      }
    }
    return undefined;
  }

  /**
   * Compare 2 image by croping them to the same dimensions and use resemble module for comparison
   * @param firstImagePath The first image path for comparison
   * @param secondImagePath The second image path for comparison
   * @param canvasWidth The width of the canvas to crop the images
   * @param canvasHeight The height of the canvas to crop the images
   */
  public static compare(firstImagePath: string, secondImagePath: string, canvasWidth: number, canvasHeight: number): Observable<number> {
    return forkJoin([
      ImageTool.cropImage(firstImagePath, canvasWidth, canvasHeight),
      ImageTool.cropImage(secondImagePath, canvasWidth, canvasHeight)
    ]).pipe(
      mergeMap(([first, second]) => {
        if (!!first && !!second) {
          return new Observable<number>(obs => {
            resemble(first)
              .compareTo(second)
              .ignoreColors()
              .ignoreAntialiasing()
              .onComplete((result) => {
                obs.next(+result.misMatchPercentage);
                obs.complete();
              });
          });
        }
        return throwError('Error while croping images.');
      })
    );
  }

  /**
   * Crop an image to a canvas size by keeping the same ratio and reduce or enlarge it
   * @param url The path of the image
   * @param canvasWidth The width of the canvas to crop the image
   * @param canvasHeight The height of the canvas to crop the image
   */
  private static cropImage(url: string, canvasWidth: number, canvasHeight: number): Observable<ImageData | undefined> {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.src = url;

    return new Observable<ImageData | undefined>(obs => {
      img.onload = () => {
        const { sx, sy, sw, sh } = this.getLimitDimensions(
          img.width,
          img.height,
          canvasWidth,
          canvasHeight
        );
        console.log({ sx, sy, sw, sh });
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx?.drawImage(img, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);
        obs.next(ctx?.getImageData(0, 0, canvasWidth, canvasHeight));
        obs.complete();
      };
    });
  }

  /**
   * Get all the dimension to crop the image to the same ration than the canvas
   * @param width The image with
   * @param height The image height
   * @param limitWidth The canvas width
   * @param limitHeight The canvas height
   */
  private static getLimitDimensions(
    width: number,
    height: number,
    limitWidth: number,
    limitHeight: number
  ): {sx: number, sy: number, sw: number, sh: number}{
    const dim: {sx: number, sy: number, sw: number, sh: number} = { sx: 0, sy: 0, sw: width, sh: height};
    if (limitWidth / limitHeight >= dim.sw / dim.sh) {
      dim.sh = Math.round((dim.sw * limitHeight) / limitWidth);
      dim.sy = (height - dim.sh) / 2;
    } else {
      dim.sw = Math.round((dim.sh * limitWidth) / limitHeight);
      dim.sx = (width - dim.sw) / 2;
    }
    return dim;
  }
}
