import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from 'src/app/core/http-services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/shared/models/item.model';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  public items: Item[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly gameService: GameService,
    private readonly dialog: MatDialog
  ) {
    this.subscriptions.push(
      this.gameService.getCurrentGame().pipe(
        map(game => game.items)
      ).subscribe(items => this.items = items)
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public openItem(item: Item): void {
    if (item.text || item.imgSrc) {
      this.dialog.open(ItemComponent, { data: item, minWidth: '100vw', height: '100vh' });
    }
  }
}
