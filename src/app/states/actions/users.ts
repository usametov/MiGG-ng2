import { Action } from "@ngrx/store";
import { ServerError } from "../../models/server-error";
import { UserCredentials } from "app/models/user-credentials";
import { Either } from "tsmonad";
import { TokenResponse } from "../../models/ok-response";

export const ActionTypes = {
    REQUEST_LOGIN: '[Login] Request',
    LOGIN_REPLY: '[Login] Reply'    
}

export type AuthReply = Either<ServerError, TokenResponse>;

export class RequestLogin implements Action {

  readonly type = ActionTypes.REQUEST_LOGIN;

  constructor(public payload: UserCredentials) {}
}

export class LoginReplyAction implements Action {

  readonly type = ActionTypes.LOGIN_REPLY;

  constructor(public payload: AuthReply) {}
}

export type UserActions = RequestLogin | LoginReplyAction;