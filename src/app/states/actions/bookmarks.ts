import { Action } from "@ngrx/store";
import { Either } from "tsmonad";

import { Bookmark } from "../../models/bookmark";
import { BookmarksByTagBundle } from "../../models/bookmarks-by-tagbundle";
import { ServerError } from "../../models/server-error";

export const ActionTypes = {
    REQUEST_BOOKMARKS_BY_TAG_BUNDLE: '[Bookmarks By-TagBundle] Request',
    BOOKMARKS_BY_TAG_BUNDLE_REPLY: '[Bookmarks By-TagBundle] Reply'    
}

export type BookmarksReply = Either<ServerError, Bookmark[]>;

export class RequestByTagBundle implements Action {
    
    readonly type = ActionTypes.REQUEST_BOOKMARKS_BY_TAG_BUNDLE;

    constructor(public payload: BookmarksByTagBundle) {        
    }
}

export class Reply implements Action {

    readonly type = ActionTypes.BOOKMARKS_BY_TAG_BUNDLE_REPLY;

    constructor(public payload: BookmarksReply) {        
    }
}

export type BookmarkActions = RequestByTagBundle | Reply;
