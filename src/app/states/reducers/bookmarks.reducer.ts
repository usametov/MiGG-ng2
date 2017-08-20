import { Bookmark } from "app/models/bookmark";
import { ActionTypes } from "../actions/bookmarks";
import { ServerError } from "app/models/server-error";
import { Either } from "tsmonad";
import { BookmarkActions, BookmarksReply } from "../actions/bookmarks";
import { Action } from "@ngrx/store/src";
import {ResponseStatus} from '../../models/response.status';
//import * as _ from "mori";

export interface BookmarksState {
  data: BookmarksReply; 
  status: ResponseStatus;
  
}

export const initialState: BookmarksState = {
  data: Either.right(Bookmark[0]),
  status: ResponseStatus.Pending,
  
}

export function bookmarksReducer(state = initialState, action: BookmarkActions) 
  : BookmarksState {

    console.log("reducer", action);
    switch(action.type) {      
      case ActionTypes.BOOKMARKS_BY_TAG_BUNDLE_REPLY:
        return Object.assign({}, state, 
          {data: action.payload, status: ResponseStatus.Complete});
      case ActionTypes.REQUEST_BOOKMARKS_BY_TAG_BUNDLE:
        return initialState;                   
      default: 
        return state;    
    }
}