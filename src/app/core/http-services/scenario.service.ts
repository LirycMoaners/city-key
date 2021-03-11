import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, Query, QuerySnapshot } from '@angular/fire/firestore';
import { distanceBetween, geohashQueryBounds } from 'geofire-common';
import { BehaviorSubject, forkJoin, from, Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { Item } from '../../shared/models/item.model';
import { Marker } from '../../shared/models/marker.model';
import { Mechanism } from '../../shared/models/mechanism.model';
import { Scenario } from '../../shared/models/scenario.model';
import { Step } from '../../shared/models/step.model';
import { ScenarioFilter } from '../../shared/models/scenario-filter';


@Injectable()
export class ScenarioService {
  public currentFilter?: ScenarioFilter;
  private scenarii$: BehaviorSubject<Scenario[]> = new BehaviorSubject([] as Scenario[]);
  private userScenarii$: BehaviorSubject<Scenario[]> = new BehaviorSubject([] as Scenario[]);
  private currentEditionScenarioVal?: Scenario;
  private currentUser$: Observable<firebase.default.User | null>;
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
   * Retrieve the current scenario for edition
   */
  public get currentEditionScenario(): Scenario | undefined {
    return this.currentEditionScenarioVal;
  }

  /**
   * Set the current scenario for edition
   * @param scenario Game to push in the subject
   */
  public set currentEditionScenario(scenario: Scenario | undefined) {
    this.currentEditionScenarioVal = scenario;
  }

  /**
   * Get all the scenarii or filtered list of scenarii if param
   * @param filter Filter properties
   */
  public readAllScenario(scenarioFilter?: ScenarioFilter): Observable<Scenario[]> {
    let pos: google.maps.LatLngLiteral;

    if (
      !!this.scenarii$.getValue()
      && !!this.scenarii$.getValue().length
      && JSON.stringify(this.currentFilter) === JSON.stringify(scenarioFilter)
    ) {
      return this.scenarii$;
    }
    this.currentFilter = scenarioFilter;
    return !!scenarioFilter && !!scenarioFilter.cityId
      ? this.currentUser$.pipe(
        switchMap(() => this.getScenarioCollection(scenarioFilter).get()),
        switchMap(snapshot => {
          this.scenarii$.next(snapshot.docs.map(doc => this.getScenarioFromSnapshot(doc)));
          return this.scenarii$;
        })
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
        switchMap(snapshots => {
          this.scenarii$.next(this.getScenariiFromSnapshots(snapshots, pos, scenarioFilter));
          return this.scenarii$;
        })
      );
  }

  /**
   * Get all the scenarii made by the author in parameter
   * @param authorId The author id
   */
  public readAllScenarioByAuthorId(authorId?: string): Observable<Scenario[]> {
    if (!!this.userScenarii$.getValue().length) {
      return this.userScenarii$;
    }
    return this.currentUser$.pipe(
      switchMap((user) => {
        return this.store.collection<Scenario>('scenarii', ref =>
          ref.where('metadata.authorId', '==', authorId ? authorId : user?.uid)
        ).get();
      }),
      switchMap(snapshot => {
        this.userScenarii$.next(snapshot.docs.map(this.getScenarioFromSnapshot));
        return this.userScenarii$;
      })
    );
  }

  /**
   * Get a full scenario from the database
   * @param scenario Scenario id with only metadata
   */
  public readScenario(scenario: Scenario): Observable<Scenario> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(_ => forkJoin([
        this.store.collection<Scenario>('scenarii').doc(scenario.uid).collection<Step>('steps').get(),
        this.store.collection<Scenario>('scenarii').doc(scenario.uid).collection<Mechanism>('mechanisms').get(),
        this.store.collection<Scenario>('scenarii').doc(scenario.uid).collection<Item>('items').get(),
        this.store.collection<Scenario>('scenarii').doc(scenario.uid).collection<Marker>('markers').get(),
      ])),
      map(([
        stepsSnapshot,
        mechanismsSnapshot,
        itemsSnapshot,
        markersSnapshot
      ]: [
        QuerySnapshot<Step>,
        QuerySnapshot<Mechanism>,
        QuerySnapshot<Item>,
        QuerySnapshot<Marker>
      ]) => ({
        ...scenario,
        steps: stepsSnapshot.docs.map(doc => ({...doc.data(), uid: doc.id})),
        mechanisms: mechanismsSnapshot.docs.map(doc => ({...doc.data(), uid: doc.id})),
        items: itemsSnapshot.docs.map(doc => ({...doc.data(), uid: doc.id})),
        markers: markersSnapshot.docs.map(doc => ({...doc.data(), uid: doc.id}))
      }))
    );
  }

  public updateScenario(scenario: Scenario): Observable<void> {
    return from(this.store.collection<Scenario>('scenarii').doc(scenario.uid).update(scenario)).pipe(
      tap(() => {
        const scenarii = this.userScenarii$.getValue();
        scenarii.splice(scenarii.findIndex(s => s.uid === scenario.uid), 1, scenario);
        this.userScenarii$.next(scenarii);
      })
    );
  }

  /**
   * Get a subcollection from the scenario collection filtered by filter and map area
   * @param scenariofilter Filter to construct the subcollection
   * @param bound Map area range
   */
  private getScenarioCollection(scenariofilter?: ScenarioFilter, bound?: string[]): AngularFirestoreCollection<Scenario> {
    return this.store.collection<Scenario>('scenarii', ref => {
      let query: Query = ref.limit(50);
      if (!!scenariofilter) {
        query = scenariofilter.rate !== null
          ? (
            scenariofilter.cityId !== null
              ? query.where('metadata.rate', '>=', scenariofilter.rate)
              : query.where('metadata.rate', '>=', scenariofilter.rate).orderBy('metadata.rate')
          ) : query;
        query = scenariofilter.estimatedDuration !== null
          ? query.where('metadata.estimatedDuration', '==', scenariofilter.estimatedDuration)
          : query;
        query = scenariofilter.difficulty !== null
          ? query.where('metadata.difficulty', '==', scenariofilter.difficulty)
          : query;
        query = scenariofilter.type !== null
          ? query.where('metadata.type', '==', scenariofilter.type)
          : query;
        query = scenariofilter.cityId !== null
          ? query.where('metadata.cityId', '==', scenariofilter.cityId)
          : !!bound ? query.orderBy('metadata.geohash').startAt(bound[0]).endAt(bound[1]) : query;
      } else if (!!bound) {
        query = query.orderBy('metadata.geohash').startAt(bound[0]).endAt(bound[1]);
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
    snapshots: firebase.default.firestore.QuerySnapshot<Scenario>[],
    pos: google.maps.LatLngLiteral,
    scenariofilter?: ScenarioFilter
  ): Scenario[] {
    return snapshots
      .map(snapshot => snapshot.docs.map(this.getScenarioFromSnapshot))
      .flat(1)
      .filter((scenario: Scenario) => {
        const {lat, lng} = scenario.metadata.position;
        return !!scenariofilter && !!scenariofilter.cityId ? true : distanceBetween([pos.lat, pos.lng], [lat, lng]) <= 10000;
      });
  }

  /**
   * Get the scenario from document snapshot & modify it for front-end usage
   * @param doc Document snapshot containing the scenario
   */
  private getScenarioFromSnapshot(
    snapshot: firebase.default.firestore.QueryDocumentSnapshot<Scenario>
  ): Scenario {
    const scenario = {...snapshot.data(), uid: snapshot.id};
    scenario.metadata.creationDate = new Date(scenario.metadata.creationDate);
    scenario.metadata.lastUpdateDate = new Date(scenario.metadata.lastUpdateDate);
    return scenario;
  }
}
