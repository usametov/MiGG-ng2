import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { BASE_URL } from "./constants";
import { ServerError } from "../models/server-error";
import { Either } from "tsmonad";

@Injectable()
export class ApiService {

  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
    
  constructor(private http: Http) {
    
  }

  private getJson(response: Response) {
    return response.json();
  }
  
  private checkForError(response: Response): Either<ServerError, any> {
    console.log("check4err", response.status);    
    return response.status >= 200 && response.status < 300 ? 
       Either.right<ServerError, any>(this.getJson(response)) :
       Either.left<ServerError, any>(new ServerError(response.status,response.statusText));          
  }
  
  get(path: string): Observable<Either<ServerError, any>> {
    
    return this.http.get(`${BASE_URL}${path}`, { headers: this.headers })
      .map((res) => this.checkForError(res))
      .catch((err, cought) => {

        let errMsg = err.statusText == '' ? 
          "server is not available" :
          err.statusText;

        return Observable.of(Either.left<ServerError, any>(new ServerError(0,errMsg)));        
    });
  }
  
  post(path: string, body): Observable<any> {

    return this.http.post(
      `${BASE_URL}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
    .map((response: Response) => 
          this.checkForError(response));        
  }
  
  delete(path:string): Observable<any> {

    return this.http.delete(
      `${BASE_URL}${path}`,
      { headers: this.headers }
    )
    .map((response: Response ) => 
          this.checkForError(response));    
  }

  setHeaders(headers) {

    Object.keys(headers).forEach
      (header => this.headers.set(header, headers[header]));
  }
}
