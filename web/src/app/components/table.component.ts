import { Component, Input, Output, OnChanges } from '@angular/core'
import { UserService } from '../services/user.service'
import { HttpService } from '../services/http.service'
import { Observable } from 'rxjs/Rx'

@Component({
  selector: 'rd-table',
  template: `
    <div class="toolbar">
      <h3 class="header">{{title}}<p *ngIf="error !== undefined" class="error">{{error}}</p></h3>
      <div class="buttons">
        <i *ngIf="selected.length === 1 && showEdit && model === 'item'" (click)="showEdit = !showEdit" fa [name]="'times'" [size]="2" class="pointer"></i>
        <i *ngIf="selected.length === 1 && !showEdit && model === 'item'" (click)="showEdit = !showEdit" fa [name]="'pencil-square-o'" [size]="2" class="pointer edit"></i>
        <i *ngIf="selected.length === 0" (click)="showAdd = !showAdd" fa [name]="'plus'" [size]="2" class="pointer"></i>
        <i *ngIf="selected.length > 0 && !showEdit" (click)="delete()" class="fa-checkbox" fa [name]="'trash'" [size]="2" class="delete"></i>
      </div>
    </div>
    <div *ngIf="data.length === 0" style="margin: 0 auto;text-align: center;">
      No {{model}}s found.
    </div>
    <!-- Start Page Forms -->
    <user-form *ngIf="showAdd && model === 'user'" (onCreate)="create($event)"></user-form>
    <item-form *ngIf="showAdd && model === 'item'" (onCreate)="create($event)"></item-form>
    <item-edit *ngIf="showEdit && model === 'item'" [item]="selected[0]" (onSave)="update($event)"></item-edit>
    <itemtype-form *ngIf="showAdd && model === 'itemtype'" (onCreate)="create($event)"></itemtype-form>
    <location-form *ngIf="showAdd && model === 'location'" (onCreate)="create($event)"></location-form>
    <itemlocation-form *ngIf="showAdd && model === 'itemlocation'" (onCreate)="create($event)"></itemlocation-form>
    <!-- End Page Create Forms-->
    <div>
    <table *ngIf="data.length > 0" class="table table-hover" style="margin: 0 auto;">
      <thead style="height: 56px;">
        <tr>
          <th class="header-checkbox"></th>
          <th *ngFor="let column of columns" (click)="sortBy(column)" class="header-data">
            {{fixColumn(column)}}
            <i *ngIf="currentOrder == column && order[column].slice(0, 1) === '-'" fa [name]="'arrow-up'"></i>
            <i *ngIf="currentOrder == column && order[column].slice(0, 1) !== '-'"fa [name]="'arrow-down'"></i>
          <th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of data" (click)="selectItem(item)" style="cursor: pointer;">
          <td class="data-checkbox">
            <div>
              <i class="fa-checkbox" fa [name]="'square-o'" [size]="2"></i>
              <i *ngIf="selected && selected.includes(item)" class="fa-checkbox" fa [name]="'check'" [size]="2"></i>
            </div>
          </td>
          <td *ngFor="let column of columns" class="data-column">
            {{column === 'createdAt' || column === 'updatedAt' ? (item[column] | date:'medium') : item[column]}}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .pointer {
      cursor: pointer;
    }

    .header-checkbox {
      width: 100px;
    }

    .header-data {
      padding: 0 24px;
      cursor: pointer;
    }

    .data-checkbox {
      width: 100px;
      text-align: center;
    }

    .data-column {
      padding-top: 12px;
      transition: background-color 0.2s;
      height: 48px;
    }

    .fa-checkbox {
      display: block;
    }

    .fa-check {
      position: absolute;
      margin-top: -30px;
      margin-left: 32px;
      color: green;
    }

    .toolbar {
      padding-left: 15px;
      padding-right: 15px;
    }

    .header {
      float: left;
      margin-top: -5px;
    }

    .buttons {
      float: right;
    }

    .delete {
      cursor: pointer;
      display: inline-block;
    }
    .error {
      display: inline-block;
      color: red;
      margin-left: 15px;
      font-weight: bold;
      font-size: 18px;
    }

    .edit {
      position: absolute;
      right: 45px;
      margin-top: 2px;
    }
  `]
})
export class TableComponent implements OnChanges {
  @Input() model: any
  @Input() title: string
  addForm: any = undefined
  showAdd = false
  showEdit = false
  columns: string[] = []
  selected: any[] = []
  data: any[] = []
  order: any = {}
  currentOrder: string = undefined
  error: string = undefined

  constructor(private userService: UserService, private httpService: HttpService) { }

  ngOnChanges() {
    this.getAll()
  }

  selectItem(item: any) {
    const index = this.selected.indexOf(item)
    if (index === -1) {
      this.selected.push(item)
    } else {
      this.selected.splice(index, 1)
    }
  }

  fixColumn(column: string) {
    return (column.charAt(0).toUpperCase() + column.slice(1)).split(/(?=[A-Z])/).join(' ')
  }

  setup(data: any[]) {
    for (const key in data[0]) {
      if (key !== 'id' && this.columns.indexOf(key) === -1) {
        this.columns.push(key)
        this.order[key] = key
      }
    }

    if (this.currentOrder !== undefined) {
      this.sortBy(this.currentOrder)
    } else {
      this.sortBy(this.columns[0])
    }
  }

  sortBy(column: string, flip = true) {
    this.currentOrder = column
    const ASC = this.order[column].slice(0, 1) === '-' ? false : true
    if (ASC) {
      this.order[column] = `-${column}`
    } else {
      this.order[column] = column
    }

    for (const item in this.order) {
      if (item !== column && item.slice(0, 1) === '-') {
        item.slice(1, item.length)
      }
    }

    this.data.sort((a, b) => {
      let A
      let B
      switch (typeof a[column]) {
        case 'string':
          A = a[column] ? a[column].toUpperCase() : a[column]
          B = b[column] ? b[column].toUpperCase() : b[column]
          break
        case 'number':
          A = a[column]
          B = b[column]
          break
        case 'boolean':
          A = a[column]
          B = b[column]
          break
        default:
          A = ''
          B = ''
      }
      if (!ASC) { [A, B] = [B, A] }
      if (A < B) { return -1 }
      if (A > B) { return 1 }
      return 0
    })
  }

  getAll() {
    this.httpService.getAll(this.model).subscribe(res => {
      this.data = res.data.map(item => {
        for (const i in item) {
          item[i] = typeof item[i] === 'object' ? item[i].name : item[i]
        }
        return item
      })

      if (this.data.length > 0) { this.setup(this.data) }
    })
  }

  update(body: any) {
    this.httpService.update(this.model, this.selected[0].id, body).subscribe(res => {
      this.showEdit = !this.showEdit
      this.selected = []
      this.getAll()
    }, error => {
      error = JSON.parse(error._body)

      if (error.code === 'E_VALIDATION') {
        error = error.data[Object.keys(error.data)[0]][0].message
      } else {
        error = error.data.raw.message
      }

      this.error = error
      setTimeout(() => {
        this.error = undefined
      }, 5000)
    })
  }

  create(body: any) {
    this.error = undefined
    this.httpService.create(this.model, body).subscribe(res => {
      this.showAdd = !this.showAdd
      this.getAll()
    }, error => {
      error = JSON.parse(error._body)

      if (error.code === 'E_VALIDATION') {
        error = error.data[Object.keys(error.data)[0]][0].message
      } else {
        error = error.data.raw.message
      }

      this.error = error
      setTimeout(() => {
        this.error = undefined
      }, 5000)
    })
  }

  delete() {
    const promises = []

    this.selected.forEach(item => promises.push(this.httpService.delete(this.model, item.id)))

    Observable.forkJoin(promises).subscribe(res => {
      this.selected = []
      this.getAll()
    })
  }
}
