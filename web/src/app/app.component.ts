import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <header></header>
    <router-outlet></router-outlet>
    <footer></footer>
  `,
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  constructor() {
    console.log('AppComponent')
  }
}
