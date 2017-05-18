import { Component } from '@angular/core'

@Component({
  selector: 'users',
  template: `
    <rd-table [model]="'user'" [title]="'Users'"></rd-table>
  `
})
export class UsersComponent {}
