import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { environment } from './../environments/environment'

const AUTH_API = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
  ) { }

  public getTasks(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      observe: 'response' as 'response'
    };

    return this.http.get(AUTH_API + 'API/bpm/userTask?p=0&c=10', httpOptions);
    //return of(this.data);
  }

  public executeTask(id: Number, token: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Bonita-API-Token': token,
      }),
      withCredentials: true,
      observe: 'response' as 'response'
    };

    return this.http.post(AUTH_API + 'API/bpm/userTask/' + id + '/execution?assign=true', null, httpOptions);

  }

  public getCaseVariables(id: Number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      observe: 'response' as 'response'
    };

    return this.http.get(AUTH_API + 'API/bpm/caseVariable?p=0&c=10&f=case_id=' + id, httpOptions);

  }
}
