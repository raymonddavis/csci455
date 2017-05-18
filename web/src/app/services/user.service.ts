import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import { Router } from '@angular/router'

@Injectable()
export class UserService {
  headers: Headers
  token: string = null
  user: any = null

  constructor(private http: Http, private router: Router) {
    this.token = localStorage.getItem('csci455_token')
    this.user = JSON.parse(localStorage.getItem('csci455_user'))
  }

  setHeaders() {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    headers.append('Authorization', `JWT ${this.token}`)
    return headers
  }

  isAdmin() {
    return this.user.isAdmin
  }

  loggedIn() {
    return this.user
  }

  login(value: any) {
    return this.http.post('http://localhost:3000/v1/auth/signin', value).map(res => res.json())
  }

  storeInfo(token: string, user: any) {
    localStorage.setItem('csci455_token', token)
    localStorage.setItem('csci455_user', JSON.stringify(user))
    this.user = user
    this.token = token
  }

  logout() {
    this.user = null
    this.token = null
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
