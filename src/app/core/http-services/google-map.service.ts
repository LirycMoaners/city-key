import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as apiKeys from '../../../assets/secure/api-keys.json';

@Injectable()
export class GoogleMapService {
  private isGoogleMapInit = false;
  public lastPosition?: google.maps.LatLngLiteral;

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Initialise the google map api
   */
  public initGoogleMap(): Observable<boolean> {
    return this.isGoogleMapInit ? of(true) : this.httpClient.jsonp(
      'https://maps.googleapis.com/maps/api/js?key=' + apiKeys.googleMapKey,
      'callback'
    ).pipe(
      map(() => {
        this.isGoogleMapInit = true;
        return this.isGoogleMapInit;
      }),
      catchError(() => of(false))
    );
  }
}
