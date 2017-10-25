import { bookmarksReducer, BookmarksState } from "./bookmarks.reducer";
import { combineReducers, Action, ActionReducerMap } from "@ngrx/store";
import { compose, ActionReducer } from "@ngrx/store";
import { AuthState, authReducer } from "./auth.reducer";


export const reducers: ActionReducerMap<State> = {
    bookmarks: bookmarksReducer,
    userState: authReducer
}

export interface State {    
    bookmarks: BookmarksState;
    userState: AuthState
}