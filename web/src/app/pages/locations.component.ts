import { Component } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

@Component({
  selector: 'locations',
  template: `
    <rd-table [model]="'location'" [title]="'Locations'"></rd-table>
    <!-- Below is for sub routing -->
    <!-- <router-outlet></router-outlet> -->
  `,
})
export class LocationsComponent {
  constructor(meta: Meta, title: Title) {
    title.setTitle('Location Page')
    meta.addTags([
      {
        name: 'description', content: 'This is where you can add, edit, and delete Locations from the database.'
      }
    ])
  }
}
