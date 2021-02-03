import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { filter, first, switchMap, map, tap } from 'rxjs/operators';
import { Game } from 'src/app/shared/models/game.model';
import { Scenario } from 'src/app/shared/models/scenario.model';

@Injectable()
export class GameService {
  private currentGame$: ReplaySubject<Game> = new ReplaySubject(1);

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly store: AngularFirestore
  ) { }

  public getCurrentGame(): Observable<Game> {
    return this.currentGame$;
  }

  public setCurrentGame(game: Game): void {
    this.currentGame$.next(game);
  }

  public getGamesByScenarioId(scenarioId: string): Observable<Game[]> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(user => from(this.store.collection<Game>(
        'users/' + user.uid + '/games',
        ref => ref.where('scenarioId', '==', scenarioId)).snapshotChanges()
      )),
      map(changes => changes.map(c => ({...c.payload.doc.data(), uid: c.payload.doc.id})))
    );
  }

  public updateGame(game: Game): Observable<void> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(user => {
        const {uid, ...g} = game;
        return from(this.store.collection<Game>('users/' + user.uid + '/games').doc(uid).update(g));
      }),
      tap(_ => this.currentGame$.next({...game}))
    );
  }

  /**
   * Create a game from a scenario, add it to the user's games and put it in the currentGame subject
   * @param scenario The scenario to create the game from
   */
  public createGame(scenario: Scenario): Observable<Game> {
    const newGame: Game = {
      scenarioId: scenario.uid,
      completedMechanismsId: [],
      items: [],
      markers: [],
      mechanisms: [],
      reachableSteps: []
    };

    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(user => from(this.store.collection<Game>('users/' + user.uid + '/games').add(newGame))),
      map(ref => {
        newGame.uid = ref.id;
        this.currentGame$.next({...newGame});
        return newGame;
      })
    );
  }

  public deleteGame(game: Game): Observable<void> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(user => from(this.store.collection<Game>('users/' + user.uid + '/games').doc(game.uid).delete()))
    );
  }
}
