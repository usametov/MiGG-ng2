import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestByTagBundle, ActionTypes, BookmarksReply, Reply, BookmarkActions } 
  from "../actions/bookmarks"; 
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import {BookmarksService} from "../../services/bookmarks.service";
import {BookmarksByTagBundle} from "../../models/bookmarks-by-tagbundle";
import { ServerError } from "app/models/server-error";
import { Action } from "@ngrx/store";


@Injectable()
export class BookmarksEffects {

    //TODO: inject our new service here, remove bookmarksService 
  constructor(private bookmarksService: BookmarksService,
              private actions$: Actions) {      
  }  
    // Listen for the 'REQUEST' action
  @Effect() 
  requestBookmarks$ /*: Observable<BookmarkActions>*/ = 
    this.actions$.ofType(ActionTypes.REQUEST_BOOKMARKS_BY_TAG_BUNDLE)
    //TODO: retire this code, use filter with custom predicate
    //TODO: replace this predicate with map.contains call
    //.filter(a => a.type === ActionTypes.REQUEST_BOOKMARKS_BY_TAG_BUNDLE)
    //.do(a => console.log("effects:",a))
    // Map the payload into JSON to use as the request body    
    .map(toPayload)
    .switchMap((pl: BookmarksByTagBundle) => //TODO: get function ref
      this.bookmarksService.getBookmarksByTagBundle(pl) //TODO: use apply here
        // dispatch reply action
        .map(reply => new Reply(reply))
    );    
}