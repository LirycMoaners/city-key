import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';

@Injectable()
export class ImageStorageService {
  constructor(
    private readonly auth: AngularFireAuth,
    private readonly storage: AngularFireStorage
  ) { }

  public pushFileToStorage(file: File, fileName: string): Observable<string> {
    let path: string;
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(user => {
        path = user?.uid + '/' + fileName;
        const uploadTask = this.storage.upload(path, file);
        return from(uploadTask);
      }),
      switchMap(() => this.storage.ref(path).getDownloadURL()),
    );
  }
}
