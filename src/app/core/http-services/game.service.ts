import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Game } from 'src/app/shared/models/game.model';
import { Scenario } from 'src/app/shared/models/scenario.model';

@Injectable()
export class GameService {
  private mockDB: Game[] = [];
  private currentGame$: ReplaySubject<Game> = new ReplaySubject(1);

  constructor() { }

  public getCurrentGame(): Observable<Game> {
    return this.currentGame$;
  }

  public updateGame(game: Game): Observable<void> {
    this.mockDB.splice(this.mockDB.findIndex(g => g.id === game.id), 1, game);
    this.currentGame$.next({...game});
    return of();
  }

  /**
   * Create a game from a scenario, add it to the user's games and put it in the currentGame subject
   * @param scenario The scenario to create the game from
   */
  public createGame(scenario: Scenario): Observable<Game> {
    const newGame: Game = new Game(scenario);
    this.mockDB.push(newGame);
    this.currentGame$.next({...newGame});
    return of(newGame);
  }
}
