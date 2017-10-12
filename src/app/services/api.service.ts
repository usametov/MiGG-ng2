import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { BASE_URL } from "./constants";
import { ServerError } from "../models/server-error";
import { Either } from "tsmonad";
import { JWT_KEY } from "./constants";

@Injectable()
export class ApiService {
  
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });    

  constructor(private http: Http) {    
  }
  
  refreshAuthToken() {
    
    const token = window.localStorage.getItem(JWT_KEY);    
    this.setHeaders({"Authorization": "Bearer " + token || ""});
  }

  private getJson(response: Response) {
    return response.json();
  }
  
  private checkForError(response: Response): Either<ServerError, any> {
    //console.log("check4err", response);    
    return response.status >= 200 && response.status < 300 ? 
       Either.right<ServerError, any>(this.getJson(response)) :
       Either.left<ServerError, any>(new ServerError(response.status,response.statusText));          
  }
    
  get( path: string): Observable<Either<ServerError, any>> {
    
    this.refreshAuthToken();

    return this.http.get(`${BASE_URL}${path}`, { headers: this.headers })
      .map((res) => this.checkForError(res))
      .catch((err, cought) => {

        let errMsg = err.statusText == '' ? 
          "server is not available" :
          err.statusText;

        return Observable.of(Either.left<ServerError, any>(new ServerError(0,errMsg)));        
    });
  }
    
  post( path: string, body): Observable<any> {
    
    this.refreshAuthToken();

    return this.http.post(`${BASE_URL}${path}`
      , JSON.stringify(body), { headers: this.headers }
    )
    .map((res) => this.checkForError(res))
    .catch((err, cought) => {

        let errMsg = err.statusText == '' ? 
          "server is not available" :
          err.statusText;

        return Observable.of(Either.left<ServerError, any>(new ServerError(0,errMsg)));        
    });        
  }
  
  delete( path:string): Observable<any> {
    
    this.refreshAuthToken();

    return this.http.delete(`${BASE_URL}${path}`, { headers: this.headers })
    .map((res) => this.checkForError(res))
    .catch((err, cought) => {
      
        let errMsg = err.statusText == '' ? 
          "server is not available" :
          err.statusText;

        return Observable.of(Either.left<ServerError, any>(new ServerError(0,errMsg)));        
    });    
  }

  setHeaders(headers) {
    
    Object.keys(headers).forEach
      (header => (this.headers || new Headers()).set(header, headers[header]));
  }
}
