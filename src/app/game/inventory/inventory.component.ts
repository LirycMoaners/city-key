import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/core/http-services/item.service';
import { Item } from 'src/app/shared/models/item.model';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public items$: Observable<Item[]>;

  constructor(
    private readonly itemService: ItemService,
    private readonly dialog: MatDialog
  ) {
    this.items$ = this.itemService.readAll();
  }

  ngOnInit(): void {
  }

  public openItem(item: Item): void {
    if (item.text || item.imgSrc) {
      this.dialog.open(ItemComponent, { data: item, minWidth: '100vw', height: '100vh' });
    }
  }
}
