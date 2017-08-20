import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Bookmark } from '../../models/bookmark';
import { BookmarksStore } from '../../states/bookmarks.store';
import { BookmarksState } from "app/states/reducers/bookmarks.reducer";
import { ServerError } from "app/models/server-error";


@Component({
  selector: 'bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.css']
})
export class BookmarksComponent implements OnDestroy {  
  items: Bookmark[];
  tagBundleName: string;
  tag:string;  
  errorMessage: string = '';
  routingSubscription: Subscription;

  constructor(
    private bookmarkStore: BookmarksStore,
    private route: ActivatedRoute
  ) { 

    //TODO: dispatch request for bookmarks
    this.routingSubscription = this.route.params.subscribe(params => {
      //get route parameters
      const skip = params['skip'] ? +params['skip'] : 0;      
      const tagBundleName = params['tagBundleName'] ? params['tagBundleName'] : 'security';
      this.bookmarkStore.requestBookmarksByTagBundle(tagBundleName, skip, 10);
      //console.log("params obj", params);
      this.bookmarkStore.getBookmarks()        
        .subscribe((response: BookmarksState) => {
          response.data.caseOf({
            right: (bks: Bookmark[]) => this.items = bks,
            left:  (err: ServerError) => { err.errorMessage === '' ? 
                                           this.errorMessage = 'unknown error!':
                                           this.errorMessage = err.errorMessage } 
          })});
    });
  }

  ngOnDestroy() {    
    this.routingSubscription.unsubscribe();    
  }
}
