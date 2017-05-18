import { Component } from '@angular/core'

@Component({
  selector: 'itemtypes',
  template: `
    <rd-table [model]="'itemtype'" [title]="'Item Types'"></rd-table>
  `,
})
export class ItemTypesComponent { }
