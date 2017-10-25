import { Observable } from 'rxjs/Observable';
import { Either } from 'tsmonad';
import { ServerError } from "app/models/server-error";
import { Bookmark } from "app/models/bookmark";

export interface StoreInterface<T> {
  getState(): Observable<T>;
}