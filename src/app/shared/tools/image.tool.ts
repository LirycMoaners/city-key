import * as resemble from 'resemblejs';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class ImageTool {
  public static compare(firstImagePath: string, secondImagePath: string, canvasWidth: number, canvasHeight: number): Observable<number> {
    return forkJoin([
      ImageTool.cropImage(firstImagePath, canvasWidth, canvasHeight),
      ImageTool.cropImage(secondImagePath, canvasWidth, canvasHeight)
    ]).pipe(
      mergeMap(([first, second]) => {
        return new Promise((resolve: (value: number) => void, reject) => {
          resemble(first)
            .compareTo(second)
            .ignoreColors()
            .ignoreAntialiasing()
            .onComplete((result) => resolve(result.misMatchPercentage));
        });
      })
    );
  }

  public static cropImage(url: string, canvasWidth: number, canvasHeight: number): Promise<ImageData> {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.src = url;

    return new Promise((resolve, reject) => {
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

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);
        resolve(ctx.getImageData(0, 0, canvasWidth, canvasHeight));
      };
    });
  }

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
