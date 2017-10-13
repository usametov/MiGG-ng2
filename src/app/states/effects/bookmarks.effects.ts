import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestByTagBundle, ActionTypes, BookmarksReply, Reply, BookmarkActions } 
  from "../actions/bookmarks"; 
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import {BookmarksService} from "../../services/bookmarks.service";
import {BookmarksByTagBundle} from "../../models/bookmarks-by-tagbundle";
import { ServerError } from "app/models/server-error";
import { Action } from "@ngrx/store";
import {bookmarksActionDispatcher} from "./bookmarks.actions.dispatcher";
import {invokeService} from "./service.helper";

@Injectable()
export class BookmarksEffects {
  
  constructor(private bookmarksService: BookmarksService,
              private actions$: Actions) {      
  }  
  
  @Effect()
  requestBookmarksGeneric$ = 
    this.actions$.filter((action: Action) => 
      !!bookmarksActionDispatcher[action.type])
      .switchMap((action: Action) => 
        invokeService<Observable<BookmarksReply>>(this.bookmarksService
          , bookmarksActionDispatcher[action.type], toPayload(action))
        .map(reply => new Reply(reply))
      );
} 