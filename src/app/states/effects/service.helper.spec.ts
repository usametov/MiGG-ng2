import {BookmarksService} from "../../services/bookmarks.service";
import { ApiService } from '../../services/api.service';
import {invokeService} from "./service.helper";
import { BookmarksByTagBundle } from "app/models/bookmarks-by-tagbundle";
import { Either } from "tsmonad";
import { Observable } from "rxjs/Observable";
import {BookmarksReply} from "../../states/actions/bookmarks";
import { ServerError } from "app/models/server-error";
import { Bookmark } from "app/models/bookmark";

describe ("invoke service", ()=> {

  var apiService, bookmarksService;
  var mockData = [ {                    
    "Description": "",
    "Id": "57146c5f083989dcf1e69c44",
    "LinkText": "An OpenSSL Users Guide to DROWN - OpenSSL Blog",
    "LinkUrl": "https://www.openssl.org/blog/blog/2016/03/01/an-openssl-users-guide-to-drown/",
    "Tags": [
        "cryptography",
        "openssl"
    ]}];

  beforeEach(()=>{
    
    apiService = jasmine.createSpyObj<ApiService>("ApiService", ["get","post"]);
    bookmarksService = new BookmarksService(apiService);
  });

  it("should call getBookmarksByTagBundle", (done)=>{

    var req = new BookmarksByTagBundle();
    var result: Bookmark[];
    
    spyOn(bookmarksService, "getBookmarksByTagBundle")
      .and.returnValue(Observable.of(Either.right<ServerError, Bookmark[]>(mockData)));

    var reply = invokeService<Observable<BookmarksReply>>
      (bookmarksService, "getBookmarksByTagBundle", req);

    reply.subscribe(resp => resp.caseOf({
      left: result = null,
      right: boo => {result = boo}
      }));

    expect(bookmarksService.getBookmarksByTagBundle).toHaveBeenCalled();
    expect(result).toEqual(mockData);
    done();
  });  

});