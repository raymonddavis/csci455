import { Component, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'itemtype-form',
  template: `
    <div style="padding:25px">
      <h3>Add Item Type</h3>
      <form class="form-horizontal" #form="ngForm" (ngSubmit)="create(form.value)">
        <div class="form-group">
          <label class="control-label col-sm-2" for="email">Name:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Enter Name" name="name" ngModel required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Description:</label>
          <div class="col-sm-10">
            <textarea class="form-control" placeholder="Enter Description" name="description" ngModel></textarea>
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
export class ItemTypeFormComponent {
  @Output() onCreate: EventEmitter<any> = new EventEmitter()

  create(body: any) {
    this.onCreate.emit(body)
  }

}
