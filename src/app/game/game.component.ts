import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  @ViewChild('test') googleMap: ElementRef;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCRnkz903chyNcwW5W3A0_nWHE359oLdlw', 'callback')
        .pipe(
          map(() => of(true)),
          catchError(() => of(false))
        );
  }

}
