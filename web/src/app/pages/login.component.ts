import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service'

@Component({
  selector: 'login',
  template: `
    <div style="display: table; position: absolute;  height: 100%; width: 100%;">
      <div style="display: table-cell; vertical-align: middle;">
        <div class="panel panel-default" style="margin-left: auto; margin-right: auto; width: 350px;">
          <div class="panel-body">
            <h3>CSci 455 Final Project Demo</h3>
            <form #form="ngForm" (ngSubmit)="login(form.value)">
              <div class="form-group">
                <label for="email">Email address:</label>
                <input type="email" name="email" class="form-control" ngModel>
              </div>
              <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" name="password" class="form-control" ngModel>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {
    if(this.userService.token) this.userService.logout()
  }

  login(value: any) {
    this.userService.login(value).subscribe(res => {
      this.userService.storeInfo(res.data.token, res.data.user)
      this.router.navigate(['/'])
    }, error => {
      console.log(JSON.parse(error._body).message)
    })
  }
}
