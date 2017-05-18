import { Component } from '@angular/core'

@Component({
  selector: 'locations',
  template: `
    <rd-table [model]="'location'" [title]="'Locations'"></rd-table>
    <!-- Below is for sub routing -->
    <!-- <router-outlet></router-outlet> -->
  `,
})
export class LocationsComponent { }
