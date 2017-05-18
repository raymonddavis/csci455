import { Component } from '@angular/core'
import { UserService } from '../services/user.service'

@Component({
  selector: 'header',
  template: `
    <nav *ngIf="user.loggedIn()" class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" [routerLink]="['/']">CSci 455 Final Project</a>
        </div>
        <ul class="nav navbar-nav">
          <li *ngIf="user.isAdmin()" [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
            <a [routerLink]="['/users']">Users</a>
          </li>
          <li [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
          <a [routerLink]="['/']">Items</a></li>
          <li [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
          <a [routerLink]="['/itemtypes']">Item Type</a></li>
          <li [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
            <a [routerLink]="['/locations']">Locations</a></li>
          <li [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}">
            <a [routerLink]="['/itemlocations']">Item Locations</a></li>
          <li ><a [routerLink]="['/']" (click)="user.logout()">Logout</a></li>
        </ul>
      </div>
    </nav>
  `,
})
export class HeaderComponent {
  constructor(public user: UserService) { }
}
