import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/core/http-services/item.service';
import { Item } from 'src/app/shared/models/item.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public items$: Observable<Item[]>;

  constructor(
    private readonly itemService: ItemService
  ) {
    this.items$ = this.itemService.readAll();
  }

  ngOnInit(): void {
  }

}
