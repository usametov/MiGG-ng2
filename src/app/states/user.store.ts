import { UserCredentials } from "../models/user-credentials";
import {Injectable} from '@angular/core';
import { StoreInterface } from "./store.interface";
import { Observable } from "rxjs/Observable";
import { Store, createSelector } from "@ngrx/store";
import { State } from "./reducers";
import { AuthReply,ActionTypes,RequestLogin } from "./actions/users";
import { ServerError } from "app/models/server-error";
import {ResponseStatus} from '../models/response.status';
import 'rxjs/add/operator/distinctUntilKeyChanged';
import { AuthState, authReducer } from "./reducers/auth.reducer";

@Injectable()
export class UserStore implements StoreInterface<AuthState> {

  protected state: Store<AuthState>; 

  constructor(public store: Store<State>) {
    
    this.state = this.store.select("userState"); //listen for user state
  }

  getState(): Observable<AuthState> {
    return this.state;
  }

  requestLogin(userName: string, pass: string) {

    const act = new RequestLogin({userName: userName, password: pass});
    this.store.dispatch(act);
  }

  getAuthState() {

    return this.state.filter(state=>state.status !== ResponseStatus.Pending)
    .distinctUntilKeyChanged("status")
  }
}

