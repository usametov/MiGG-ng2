import { ActionTypes } from "../actions/bookmarks"; 

//this is just an action router
//it will grow and that's totally fine, because it easy to test
//making use of code-is-data approach
//the benefit of this approach is that 
//now we less dependent of bookmarks.effects class
//this makes it easy to replace it when better alternative emerges 
export const bookmarksActionDispatcher: { [action: string] : string } = {
  [ActionTypes.REQUEST_BOOKMARKS_BY_TAG_BUNDLE] : "getBookmarksByTagBundle"
}

