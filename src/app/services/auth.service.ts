import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { JWT_KEY } from "./constants";
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {
  
  constructor(
     private api: ApiService) { }

  setJwt(jwt: string) {
    window.localStorage.setItem(JWT_KEY, jwt);   
  }
  
  authenticate(path, creds): Observable<any> {
    return this.api.post(`/${path}`, creds)
      .do((res: any) => this.setJwt(res.token))//TODO: move this to effects
      .map((res: any) => res.data);
  }

  signout() {
    window.localStorage.removeItem(JWT_KEY);        
  }
}
