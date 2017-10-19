import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = "Bookmarks App";
  //isAuthenticated: boolean = false;

  //  constructor(public authService: AuthService) {
  //   //TODO: should we use a store here?
  //   this.isAuthenticated = authService.isAuthenticated();
  //  }   
  constructor() {}
}
