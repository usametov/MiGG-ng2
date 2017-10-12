import {Bookmark} from '../models/bookmark'
import {Injectable} from '@angular/core';
import { StoreInterface } from "app/states/store.interface";
import { Observable } from "rxjs/Observable";
import { Store, createSelector } from "@ngrx/store";
import { bookmarksReducer, BookmarksState } from "./reducers/bookmarks.reducer";
import { State } from "./reducers";
import { BookmarksReply} from "./actions/bookmarks";
import { ActionTypes, RequestByTagBundle } from "app/states/actions/bookmarks";
import { ServerError } from "app/models/server-error";
import {ResponseStatus} from '../models/response.status';
import 'rxjs/add/operator/distinctUntilKeyChanged';


@Injectable()
export class BookmarksStore implements StoreInterface<BookmarksState> {
    
  protected state: Store<BookmarksState>; 

  constructor(public store: Store<State>, ) {        
    this.state = this.store.select('bookmarks'); //listen for bookmarks reducer   
  }

  getState(): Store<BookmarksState> {
    return this.state;
  }

  requestBookmarksByTagBundle(tagBundleName: string, 
    skip: number, 
    take: number) {
    
    const act = new RequestByTagBundle({tagBundleName, skip, take});
    //console.log("store", act);          
    this.store.dispatch(act);
  }
  
  getBookmarks() {
    //enter pre-condition: state should not be in 'pending' status 
    //state.data is either ServerError or valid response
    return this.getState()
      .filter(state=>state.status !== ResponseStatus.Pending)
      .distinctUntilKeyChanged("status")      
      //.do(res => console.log("trying to get bookmarks", res)); //for debugging only     
  }
    
  
}
