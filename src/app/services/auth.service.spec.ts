import { ApiService } from './api.service';
import { AuthService } from "./auth.service";
import { Either } from "tsmonad";
import { ServerError } from "app/models/server-error";
import { Observable } from 'rxjs/Observable';
import { TokenResponse } from 'app/models/ok-response';

describe("auth service", () => {

  let dummyToken = "dummy";
  let dummyUser = {userName: "test", password: "test"};
  let apiService = jasmine.createSpyObj("ApiService", ["post"]);
  let authService: AuthService;
  let result: TokenResponse;

  beforeEach(() => { 

     authService = new AuthService(apiService);
  });

  it("should logoff", (done) => {

    authService.signoutLocally();
    done();
  });

  it("should authenticate", (done) => {

    apiService.post.and.returnValue(Observable.of(Either.right(dummyToken)));

    authService.authenticate(dummyUser).subscribe(ei=>ei.caseOf({
      left: result = null,
      right: t => result = t
    }));

    expect(result).toBeTruthy();  
    expect(result).toBe(dummyToken);  
    
    done();
  });

  it("should report logon failure", (done) => {

    let errorMessage = "invalid username/password";
    let errMsg: string;

    apiService.post.and.returnValue(
      Observable.of(Either.left(new ServerError(401, errorMessage))));

      authService.authenticate(dummyUser).subscribe(ei=>ei.caseOf({
        left: err => errMsg = err.errorMessage,
        right: t => result = t
      }));
            
      expect(errMsg).toBe(errorMessage);
      done();  
  });
});