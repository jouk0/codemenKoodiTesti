import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from './users'
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public backend: string = 'http://localhost:3000'
  public users: Array<Users> = []
  constructor(private http: HttpClient) {
    this.getUsers()
  }
  getUsers() {
    this.http.get(this.backend + '/users').subscribe((response: any) => {
      console.log(response)
      if(response.success) {
        this.users = response.users
      }
    })
  }
  addToUsers(user: Users) {
    this.http.post(this.backend + '/users', JSON.stringify(user), {
      'headers': new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }).subscribe((response: any) => {
      if(response.success) {
        console.log('Lisätty')
      }
    })
  }
  updateUser(user: Users, id: number) {
    this.http.put(this.backend + '/users/'+ id, JSON.stringify(user), {
      'headers': new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }).subscribe((response: any) => {
      if(response.success) {
        console.log('Päivitetty')
      }
    })
  }
  deleteFromUsers(id: number) {
    this.http.delete(this.backend + '/users/' + id, {
      'headers': new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }).subscribe((response: any) => {
      if(response.success) {
        console.log('Käyttäjä poistettu')
      }
    })
  }
}
