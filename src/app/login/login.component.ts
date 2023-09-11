import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { FormGroup } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private taskService: TaskService,
    private router: Router
  ) { }

  addUserForm = new FormGroup({});
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    let user: any;

    this.authService.login(username, password).subscribe((response) => {
      response.headers
        .keys()
        .forEach((keyName: string) =>
          console.log(
            `The value of the ${keyName} header is: ${response.headers.get(
              keyName
            )}`
          )
        )
      this.tokenStorage.saveToken(this.cookieService.get('X-Bonita-API-Token'));
      this.router.navigate(['/orders'])

    }).add(() => {
      if (!this.tokenStorage.getToken()) {
        //fail
        this.errorMessage = 'login failed';
        this.isLoginFailed = true;
      }
    });


  }

  getSession() {
    console.log('GET SESSION');
    this.authService.getCurrentSession()
      .subscribe(data => {
        console.log(JSON.stringify(data));
      });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
