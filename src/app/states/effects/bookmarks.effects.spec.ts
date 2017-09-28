import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
//import { hot, cold } from 'jasmine-marbles';
import { Action } from "@ngrx/store";
import { BookmarksEffects } from './bookmarks.effects';
import { Observable } from 'rxjs/Observable';
import { RequestByTagBundle, ActionTypes, BookmarksReply, Reply, BookmarkActions } 
from "../actions/bookmarks"; 
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { BookmarksByTagBundle } from '../../models/bookmarks-by-tagbundle';
import { Either } from 'tsmonad';
import { BookmarksService } from '../../services';
import { ServerError } from 'app/models/server-error';
import { Bookmark } from 'app/models/bookmark';

describe('Bookmarks Effects', () => {

  let mockData = [ {                    
    "Description": "",
    "Id": "57146c5f083989dcf1e69c44",
    "LinkText": "An OpenSSL Users Guide to DROWN - OpenSSL Blog",
    "LinkUrl": "https://www.openssl.org/blog/blog/2016/03/01/an-openssl-users-guide-to-drown/",
    "Tags": [
        "cryptography",
        "openssl"
    ]}];

  let effects: BookmarksEffects;
  let actions: Observable<Action>;
  
  let bookmarksService = jasmine.createSpyObj("BookmarksService", ["getBookmarksByTagBundle"]);    

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        BookmarksEffects,
        provideMockActions(() => actions),
        {provide: BookmarksService, useValue: bookmarksService}
      ],
    });

    effects = TestBed.get(BookmarksEffects);
  });
  
  it('should call  getBookmarksByTagBundle', () => {
   
    bookmarksService.getBookmarksByTagBundle
      .and.returnValue(Observable.of(Either.right<ServerError, Bookmark[]>(mockData)));

    actions = new ReplaySubject(1);
   
    var payload = {tagBundleName: "test",skip: 0, take:10};
    (<ReplaySubject<Action>>actions).next(new RequestByTagBundle(payload));

    effects.requestBookmarksGeneric$.subscribe(result => {
      expect(result).toEqual(new Reply(Either.right(mockData)));
    });
  });  
});