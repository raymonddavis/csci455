import { Component, Output, EventEmitter } from '@angular/core'
import { HttpService } from '../services/http.service'

@Component({
  selector: 'itemlocation-form',
  template: `
    <div style="padding:25px">
      <h3>Add Item Location</h3>
      <form class="form-horizontal" #form="ngForm" (ngSubmit)="create(form.value)">
        <div class="form-group">
          <label class="control-label col-sm-2" for="sel1">Location:</label>
          <div class="col-sm-10">
            <select class="form-control" name="location" ngModel required>
              <option *ngFor="let location of locations" [value]="location.id">{{location.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2" for="sel1">Item:</label>
          <div class="col-sm-10">
            <select class="form-control" name="item" ngModel required>
              <option *ngFor="let item of items" [value]="item.id">{{item.name}}</option>
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
export class ItemLocationFormComponent {
  @Output() onCreate: EventEmitter<any> = new EventEmitter()
  locations: any[] = []
  items: any[] = []

  constructor(private httpService: HttpService) {
    this.httpService.getAll('item').subscribe(res => {
      this.items = res.data
    })
    this.httpService.getAll('location').subscribe(res => {
      this.locations = res.data
    })
  }

  create(body: any) {
    console.log(body)
    this.onCreate.emit(body)
  }

}
