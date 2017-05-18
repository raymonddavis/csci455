import { Component } from '@angular/core'

@Component({
  selector: 'items',
  template: `
    <rd-table  [model]="'item'" [title]="'Items'"></rd-table>
  `,
})
export class ItemsComponent { }
