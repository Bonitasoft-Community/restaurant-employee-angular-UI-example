import { Injectable, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { AuthService } from '../auth.service';
import { forkJoin, mergeMap, Observable, of } from "rxjs";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService implements OnInit {
  constructor(private cookieService: CookieService, private authService: AuthService) { }
  ngOnInit(): void {
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.cookieService.delete('X-Bonita-API-Token', '/');
  }

  public saveToken(token: string): void {
    //this.signOut()

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {

    let token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }
    return this.cookieService.get('X-Bonita-API-Token');
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  /*
    public fetchUser(): Observable<boolean> {
      window.sessionStorage.removeItem(USER_KEY);
      if(!this.getToken()){
        return of(false);
      }
      return new Observable<boolean>((subscriber) =>{
        this.authService.getCurrentSession().pipe(
          mergeMap((sessionData) => {
            const userId = sessionData['user_id'];
            // join needed data to return user details
            return forkJoin([
              // get user infos
              this.authService.getUser(userId),
              // get user memberShips
              this.authService.getUserMemberShips(userId),
              // get roles
              this.authService.getRoles()
            ])
          })
        ).subscribe(data => {
          let user: any = data[0];
          const userRolesIds = data[1].map((userRole: any) => userRole["role_id"]);
          user.roles = data[2].filter((role: any) => userRolesIds.includes(role.id));
          //success
          this.saveUser(user);
        }).add(()=>{
          if(!this.getUser()){
            this.signOut();
          }
          subscriber.next(!!this.getUser());
          subscriber.complete();
        })
      });
    }
    */
}