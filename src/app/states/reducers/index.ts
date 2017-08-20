import { bookmarksReducer, BookmarksState } from "./bookmarks.reducer";
import { combineReducers, Action, ActionReducerMap } from "@ngrx/store";
import { compose, ActionReducer } from "@ngrx/store";


export const reducers: ActionReducerMap<State> = {
    bookmarks: bookmarksReducer
}

export interface State {    
    bookmarks: BookmarksState;
}

// export const metaReducers: Array<ActionReducer<any, any>> = [localStorageSyncReducer];

// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//   return localStorageSync({keys: ['bookmarks']})(reducer);
// }