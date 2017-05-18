import { Component } from '@angular/core'
import { UserService } from '../services/user.service'

@Component({
  selector: 'footer',
  template: `
    <div *ngIf="user.loggedIn()" style="text-align: center; width: 100%; bottom: 0; position: absolute;">
      <p>Created By: Ray Davis, Kristopher Lommen, Lundean Tomlin</p>
    </div>
  `,
})
export class FooterComponent {
  constructor(public user: UserService) { }
}
