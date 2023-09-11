import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment'

const AUTH_API = environment.apiUrl


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  public login(username: string, password: string): Observable<any> {
    const url = AUTH_API + 'loginservice';
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    return this.http.post(url, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true, //THIS IS NECESSARY !!!
      observe: 'response',
    });
  }

  public getCurrentSession(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    console.log('HERE');

    return this.http.get(AUTH_API + 'API/system/session/unusedId', httpOptions);

  }
}
