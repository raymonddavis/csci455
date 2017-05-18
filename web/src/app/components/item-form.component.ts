import { Component, Output, EventEmitter } from '@angular/core'
import { HttpService } from '../services/http.service'

@Component({
  selector: 'item-form',
  template: `
    <div style="padding:25px">
      <h3>Add Item</h3>
      <form class="form-horizontal" #form="ngForm" (ngSubmit)="create(form.value)">
        <div class="form-group">
          <label class="control-label col-sm-2" for="email">Barcode:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Enter barcode" name="barcode" ngModel required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Name:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Enter name" name="name" ngModel required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Description:</label>
          <div class="col-sm-10">
            <textarea class="form-control" placeholder="Enter a description" name="description" ngModel></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Quantity:</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" placeholder="Enter Quantity" name="quantity" ngModel>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Price:</label>
          <div class="col-sm-10">
            <input type="number" step="any" class="form-control" placeholder="Enter Price" name="price" ngModel>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="sel1">Item Type:</label>
          <div class="col-sm-10">
            <select class="form-control" name="type" ngModel required>
              <option *ngFor="let type of types" [value]="type.id">{{type.name}}</option>
            </select>
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
export class ItemFormComponent {
  @Output() onCreate: EventEmitter<any> = new EventEmitter()
  types: any[] = []

  constructor(private httpService: HttpService) {
    this.httpService.getAll('itemtype').subscribe(res => {
      this.types = res.data
    })
  }

  create(body: any) {
    this.onCreate.emit(body)
  }

}
