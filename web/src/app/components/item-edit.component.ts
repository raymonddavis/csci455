import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { HttpService } from '../services/http.service'

@Component({
  selector: 'item-edit',
  template: `
    <div style="padding:25px">
      <h3>Edit Item</h3>
      <form class="form-horizontal" #form="ngForm" (ngSubmit)="save(form.value)">
        <div class="form-group">
          <label class="control-label col-sm-2" for="email">Barcode:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Enter barcode" name="barcode" [(ngModel)]="barcode" required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Name:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Enter name" name="name" [(ngModel)]="name" required>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Description:</label>
          <div class="col-sm-10">
            <textarea class="form-control" placeholder="Enter a description" name="description" [(ngModel)]="description"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Quantity:</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" placeholder="Enter Quantity" name="quantity" [(ngModel)]="quantity">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Price:</label>
          <div class="col-sm-10">
            <input type="number" step="any" class="form-control" placeholder="Enter Price" name="price" [(ngModel)]="price">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="sel1">Item Type:</label>
          <div class="col-sm-10">
            <select class="form-control" name="type" [(ngModel)]="type" required>
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
export class ItemEditComponent implements OnChanges {
  @Output() onSave: EventEmitter<any> = new EventEmitter()
  @Input() item: any
  types: any[] = []
  barcode: any
  name: any
  description: any
  quantity: any
  price: any
  type: any


  constructor(private httpService: HttpService) {
    this.httpService.getAll('itemtype').subscribe(res => {
      this.types = res.data
      this.types.forEach(type => {
        if (type.name === this.item.type) {
          this.type = type.id
        }
      })
    })
  }

  ngOnChanges() {
    this.barcode = this.item.barcode
    this.name = this.item.name
    this.description = this.item.description
    this.quantity = this.item.quantity
    this.price = this.item.price
    this.type = this.item.type
  }

  save(body: any) {
    this.onSave.emit(body)
  }

}
