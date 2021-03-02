import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, ReplaySubject } from 'rxjs';
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

  /**
   * Retrieve the current game subject
   */
  public getCurrentGame(): Observable<Game> {
    return this.currentGame$;
  }

  /**
   * Set the current game subject with the game in parameter
   * @param game Game to push in the subject
   */
  public setCurrentGame(game: Game): void {
    this.currentGame$.next(game);
  }

  /**
   * Retrieve all the user's games for a scenario
   * @param scenarioId Scenario id for the query
   */
  public getGamesByScenarioId(scenarioId: string): Observable<Game[]> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(user =>
        this.store.collection<Game>(
          'users/' + user?.uid + '/games',
          ref => ref.where('scenario.uid', '==', scenarioId)
        ).get()
      ),
      map(snapshot => snapshot.docs.map(doc => ({...doc.data(), uid: doc.id})))
    );
  }

  /**
   * Update a game with the one in parameter
   * @param game The updated game
   */
  public updateGame(game: Game): Observable<void> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(user => {
        const {uid, ...g} = game;
        return from(this.store.collection<Game>('users/' + user?.uid + '/games').doc(uid).update(g));
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
      scenario,
      completedMechanismsId: [],
      itemsId: [],
      markersId: [],
      mechanismsId: [],
      reachableStepsId: []
    };

    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(user => from(this.store.collection<Game>('users/' + user?.uid + '/games').add(newGame))),
      map(ref => {
        newGame.uid = ref.id;
        this.currentGame$.next({...newGame});
        return newGame;
      })
    );
  }

  /**
   * Delete a game from the database
   * @param game The game to delete
   */
  public deleteGame(game: Game): Observable<void> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(user => from(this.store.collection<Game>('users/' + user?.uid + '/games').doc(game.uid).delete()))
    );
  }
}
