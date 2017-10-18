import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { JWT_KEY } from "./constants";
import 'rxjs/add/operator/do';
import { UserCredentials } from 'app/models/user-credentials';
import { TokenResponse } from 'app/models/ok-response';
import { ServerError } from 'app/models/server-error';
import { Either } from 'tsmonad';
import { AuthReply } from 'app/states/actions/users';

@Injectable()
export class AuthService {
  
  path: string = "/login";

  constructor(
     private api: ApiService) { }

  isAuthenticated() {    
    return Boolean(window.localStorage.getItem(JWT_KEY));
  } 

  setJwt(jwt: string) {
    window.localStorage.setItem(JWT_KEY, jwt);   
  }
  
  authenticate(creds: UserCredentials): Observable<AuthReply> {
    return this.api.post(`/${this.path}`, creds)      
    .map(ei => //the 'right' response should be converted to TokenResponse
      ei.bind(res => Either.right<ServerError, TokenResponse>
        (res as TokenResponse)));         
  }

  signout() {
    window.localStorage.removeItem(JWT_KEY);        
  }
}
