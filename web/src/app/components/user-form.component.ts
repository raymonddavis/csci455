import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'user-form',
  template: `
    <div style="padding:25px">
      <h3>Add User</h3>
      <form class="form-horizontal" #form="ngForm" (ngSubmit)="create(form.value)">
        <div class="form-group">
          <label class="control-label col-sm-2" for="email">Email:</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" placeholder="Enter email" name="email" ngModel required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Password:</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" placeholder="Enter password" name="password" ngModel required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">First Name:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Enter first name" name="firstName" ngModel required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Last Name:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Enter last name" name="lastName" ngModel required>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
              <label style="font-weight: bold;"><input type="checkbox" name="isAdmin" ngModel>Is Admin</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class UserFormComponent {
  @Output() onCreate: EventEmitter<any> = new EventEmitter()

  create(body: any) {
    this.onCreate.emit(body)
  }

}
