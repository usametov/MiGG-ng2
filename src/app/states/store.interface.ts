import { Observable } from 'rxjs/Observable';
//import { Action as BaseAction} from "@ngrx/store";
import { Either } from 'tsmonad';
import { ServerError } from "app/models/server-error";
import { Bookmark } from "app/models/bookmark";

export interface StoreInterface<T> {
  getState(): Observable<T>;
}

// export interface Action<T> extends BaseAction {
//   payload?:{ data: T};
// }