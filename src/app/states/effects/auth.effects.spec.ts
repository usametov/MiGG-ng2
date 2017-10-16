import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Action } from "@ngrx/store";
import {AuthEffects} from "./auth.effects";
import { Observable } from 'rxjs/Observable';
import { ActionTypes, AuthReply, RequestLogin, LoginReply, UserActions } 
  from "../actions/users";
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Either } from 'tsmonad';
import { ServerError } from 'app/models/server-error';
import { AuthService } from "../../services/auth.service";

describe ("auth effects", () => {

  let dummyToken = "dummy";

  let effects: AuthEffects;
  let actions: Observable<Action>;

  let authService = jasmine.createSpyObj("AuthService", 
    ["authenticate", "signout", "setJwt"]);

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        {provide: AuthService, useValue: authService}
      ],
    });

    effects = TestBed.get(AuthEffects);
  });

  it("should authenticate", (done) => {

    authService.authenticate.and.returnValue(Observable.of(
      Either.right<ServerError, string>(dummyToken)));

    actions = new ReplaySubject(1);
    
    var payload = {userName: "test", password: "test"};
    (<ReplaySubject<Action>>actions).next(new RequestLogin(payload));

    effects.login$.subscribe(result => {
      expect(result).toEqual(new LoginReply(Either.right(dummyToken)));
      expect(authService.setJwt).toHaveBeenCalledTimes(1);
    });

    done();
  });
})