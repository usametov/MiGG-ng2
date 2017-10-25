import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { AuthService } from "app/services";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { ActionTypes, LoginReplyAction, AuthReply } from "../actions/users";
import { UserCredentials } from 'app/models/user-credentials';
import { Either } from 'tsmonad';

@Injectable()
export class AuthEffects {

  constructor(private authService: AuthService, 
    private actions$: Actions) { }

  //by the book implementation
  @Effect() 
  login$  = 
    this.actions$.ofType(ActionTypes.REQUEST_LOGIN)      
    .map(toPayload)
    .switchMap((pl: UserCredentials) => 
      this.authService.authenticate(pl)
        .do((eith: AuthReply) =>//do the right thing :)
           eith.bind(res=>Either.right(this.authService.setJwt(res))))
        //pass reply to UI in case if we need to deal with logon failure   
        .map(reply => new LoginReplyAction(reply))
    );
}