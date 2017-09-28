import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {map} from 'rxjs/Operator/map';
import { Bookmark } from "app/models/bookmark";
import { Either } from "tsmonad";
import {BookmarksReply} from "../states/actions/bookmarks";
import { Observable } from "rxjs/Observable";
import { ServerError } from "app/models/server-error";
import { BookmarksByTagBundle } from "app/models/bookmarks-by-tagbundle";

@Injectable()
export class BookmarksService {

  path: string = '/bookmarks';
  constructor(private apiService: ApiService) {}

  getBookmarksByTagBundle(req: BookmarksByTagBundle) : Observable<BookmarksReply> {
                                
    return this.apiService.get
      (`${this.path}/${req.tagBundleName}/${req.skip}/${req.take}`)
        .map(ei => //the 'right' response should be converted to Bookmarks list
          ei.bind(bookma => Either.right<ServerError, Bookmark[]>
            (bookma.map(_b =>{ _b as Bookmark }))));           
            //.do((res: any) => console.log('getBookmarksByTagBundle', res));
  }
 
}
