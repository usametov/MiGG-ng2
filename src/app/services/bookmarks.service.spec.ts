import { BookmarksService } from "./bookmarks.service"
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Either } from "tsmonad";
import { ServerError } from "app/models/server-error";
import { BookmarksByTagBundle } from "app/models/bookmarks-by-tagbundle";
import { Bookmark } from "app/models/bookmark";

describe("bookmark service", () => {

  let apiService = jasmine.createSpyObj("ApiService", ["get"]);
  let bookmarksService: BookmarksService;
  var mockData = [ {                    
    "Description": "",
    "Id": "57146c5f083989dcf1e69c44",
    "LinkText": "An OpenSSL Users Guide to DROWN - OpenSSL Blog",
    "LinkUrl": "https://www.openssl.org/blog/blog/2016/03/01/an-openssl-users-guide-to-drown/",
    "Tags": [
        "cryptography",
        "openssl"
    ]}];

  beforeEach(() => {
    
    bookmarksService = new BookmarksService(apiService);
  });

  it("should call getBookmarksByTagBundle", (done) => {
    
    var req = new BookmarksByTagBundle();
    var result: Bookmark[];

    apiService.get.and.returnValue(Observable.of(
      Either.right<ServerError, any>(mockData)));

    let reply = bookmarksService.getBookmarksByTagBundle(req);

    reply.subscribe(resp => {
      
      resp.caseOf({
        left: result = null,
        right: boo => {result = boo}
      });

      expect(result).toBeTruthy();  
      expect(result).toEqual(mockData);
    });
    
    done();  
    });

});
