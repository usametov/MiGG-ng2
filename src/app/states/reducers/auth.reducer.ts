import { LoginReply, AuthReply, UserActions, ActionTypes } from "app/states/actions/users";
import { ResponseStatus } from "app/models/response.status";
import { TokenResponse } from "app/models/ok-response";
import { Either } from "tsmonad/lib/src";

export interface AuthState {

  data: AuthReply
  status: ResponseStatus;
}

export const initialState: AuthState = {
  data: Either.right(""),
  status: ResponseStatus.Pending
} 

export function authReducer(state=initialState, action: UserActions) {

  switch(action.type){
    case ActionTypes.REQUEST_LOGIN:
      return initialState;
    case ActionTypes.LOGIN_REPLY:
      return Object.assign({}, state, 
        {data: action.payload, status: ResponseStatus.Complete});  
  }
}