import { Component } from '@angular/core'

@Component({
  selector: 'itemlocations',
  template: `
    <rd-table [model]="'itemlocation'" [title]="'Item Locations'"></rd-table>
    <!-- Below is for sub routing -->
    <!-- <router-outlet></router-outlet> -->
  `,
})
export class ItemLocationsComponent { }
