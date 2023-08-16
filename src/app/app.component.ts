import { Component, VERSION } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'http_with_angular_new';
  name = 'Angular ' + VERSION.major;
  cookieValue: any;

  constructor(private cookieService: CookieService) {
    this.cookieValue = this.cookieService.get('X-Bonita-API-Token');
  }
}
