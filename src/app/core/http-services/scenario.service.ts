import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, Query } from '@angular/fire/firestore';
import { distanceBetween, geohashQueryBounds } from 'geofire-common';
import { forkJoin, Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { Scenario } from 'src/app/shared/models/scenario.model';
import { ScenarioFilter } from '../../shared/models/scenario-filter';


@Injectable()
export class ScenarioService {
  public currentScenarioFilter: ScenarioFilter;
  private currentUser$: Observable<firebase.default.User>;
  private currentPosition$: Observable<google.maps.LatLngLiteral>;

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly store: AngularFirestore
  ) {
    this.currentUser$ = this.auth.user.pipe(
      filter(user => user !== null),
      first()
    );
    this.currentPosition$ = new Observable(obs =>
      navigator.geolocation.getCurrentPosition(p => {
        obs.next({lat: p.coords.latitude, lng: p.coords.longitude});
        obs.complete();
      })
    );
  }

  /**
   * Get all the scenarii or filtered list of scenarii if param
   * @param filter Filter properties
   */
  public readAllScenario(scenarioFilter: ScenarioFilter): Observable<Scenario[]> {
    let pos: google.maps.LatLngLiteral;

    return !!scenarioFilter && !!scenarioFilter.city
      ? this.currentUser$.pipe(
        switchMap(() => this.getScenarioCollection(scenarioFilter).get()),
        map(snapshot => snapshot.docs.map(doc => this.getScenarioFromSnapshot(doc)))
      )
      : forkJoin([
        this.currentUser$,
        this.currentPosition$
      ]).pipe(
        switchMap(([_, p]) => {
          pos = p;
          const bounds = geohashQueryBounds([pos.lat, pos.lng], 10000);
          return forkJoin(bounds.map(b => this.getScenarioCollection(scenarioFilter, b).get()));
        }),
        map(snapshots => this.getScenariiFromSnapshots(scenarioFilter, snapshots, pos))
      );
  }

  /**
   * Get a scenario from the database
   * @param id Scenario id to read
   */
  public readScenario(id: string): Observable<Scenario> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(_ => this.store.collection<Scenario>('scenarii').doc(id).get()),
      map(this.getScenarioFromSnapshot)
    );
  }

  /**
   * Get a subcollection from the scenario collection filtered by filter and map area
   * @param scenariofilter Filter to construct the subcollection
   * @param bound Map area range
   */
  private getScenarioCollection(scenariofilter: ScenarioFilter, bound?: string[]): AngularFirestoreCollection<Scenario> {
    return this.store.collection<Scenario>('scenarii', ref => {
      let query: Query = ref.limit(50);
      if (!!scenariofilter) {
        query = scenariofilter.rate !== null
          ? (
            scenariofilter.city !== null
              ? query.where('scenarioMetadata.rate', '>=', scenariofilter.rate)
              : query.where('scenarioMetadata.rate', '>=', scenariofilter.rate).orderBy('scenarioMetadata.rate')
          ) : query;
        query = scenariofilter.estimatedDuration !== null
          ? query.where('scenarioMetadata.estimatedDuration', '==', scenariofilter.estimatedDuration)
          : query;
        query = scenariofilter.difficulty !== null
          ? query.where('scenarioMetadata.difficulty', '==', scenariofilter.difficulty)
          : query;
        query = scenariofilter.type !== null
          ? query.where('scenarioMetadata.type', '==', scenariofilter.type)
          : query;
        query = scenariofilter.city !== null
          ? query.where('scenarioMetadata.city', '==', scenariofilter.city)
          : query.orderBy('scenarioMetadata.geohash').startAt(bound[0]).endAt(bound[1]);
      } else {
        query = query.orderBy('scenarioMetadata.geohash').startAt(bound[0]).endAt(bound[1]);
      }
      return query;
    });
  }

  /**
   * Get the scenarii from the snapshots after the completed queries
   * @param scenariofilter Filter to know if we need to check false positiv
   * @param snapshots Scenario snapshots from the queries
   * @param pos Current user position to detect false positiv
   */
  private getScenariiFromSnapshots(
    scenariofilter: ScenarioFilter,
    snapshots: firebase.default.firestore.QuerySnapshot<Scenario>[],
    pos: google.maps.LatLngLiteral
  ): Scenario[] {
    return snapshots
      .map(snapshot => snapshot.docs.map(this.getScenarioFromSnapshot))
      .flat(1)
      .filter((scenario: Scenario) => {
        const {lat, lng} = scenario.scenarioMetadata.position;
        return !!scenariofilter && !!scenariofilter.city ? true : distanceBetween([pos.lat, pos.lng], [lat, lng]) <= 10000;
      });
  }

  /**
   * Get the scenario from document snapshot & modify it for front-end usage
   * @param doc Document snapshot containing the scenario
   */
  private getScenarioFromSnapshot(
    doc: firebase.default.firestore.DocumentSnapshot<Scenario> | firebase.default.firestore.QueryDocumentSnapshot<Scenario>
  ): Scenario {
    const scenario = {...doc.data(), uid: doc.id};
    scenario.scenarioMetadata.creationDate = new Date(scenario.scenarioMetadata.creationDate);
    scenario.scenarioMetadata.lastUpdateDate = new Date(scenario.scenarioMetadata.lastUpdateDate);
    return scenario;
  }
}
