import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
      this.gameService.getCurrentGame().subscribe(game =>
        this.items = game.scenario.items.filter(item => game.itemsId.includes(item.uid))
      )
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * Open an item in a dialog
   * @param item The item to open
   */
  public openItem(item: Item): void {
    if (item.text || item.imgSrc) {
      this.dialog.open(ItemComponent, { data: item, minWidth: '100vw', height: '100vh' });
    }
  }
}
