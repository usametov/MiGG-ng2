import { ActionTypes } from "../actions/bookmarks"; 

//this is just an action router
//it will grow and that's totally fine, because it easy to test
export const bookmarksActionDispatcher: { [action: string] : string } = {
  [ActionTypes.REQUEST_BOOKMARKS_BY_TAG_BUNDLE] : "getBookmarksByTagBundle"
}

