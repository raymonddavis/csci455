import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import { Router } from '@angular/router'
import { UserService } from '../services/user.service'

@Injectable()
export class HttpService {
  constructor(private http: Http, private userService: UserService) { }

  create(model: string, body: any) {
    return this.http.post(`http://localhost:3000/v1/${model}s`,
      body,
      new RequestOptions({ headers: this.userService.setHeaders() })
    ).map(res => res.json())
  }

  getAll(model: string) {
    return this.http.get(`http://localhost:3000/v1/${model}s`,
      new RequestOptions({ headers: this.userService.setHeaders() })
    ).map(res => res.json())
  }

  update(model: string, id: number, body: any) {
    return this.http.put(`http://localhost:3000/v1/${model}s/${id}`,
      body,
      new RequestOptions({ headers: this.userService.setHeaders() })
    ).map(res => res.json())
  }

  delete(model: string, id: number) {
    return this.http.delete(`http://localhost:3000/v1/${model}s/${id}`,
      new RequestOptions({ headers: this.userService.setHeaders() })
    ).map(res => res.json())
  }
}
