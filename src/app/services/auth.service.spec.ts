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
});