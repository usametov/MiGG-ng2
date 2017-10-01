# MiGG-ng2

The purpose of this project is to provide UI for bookmark aggregation engine. 

# Technical Design Notes

This project follows the principles of Elm-style architecture. It builds on top of existing angular/ngrx/store/effects framework by introducing two improvements:

1. use Command Object design pattern for dealing with side-effects. 
2. use _Either_ monad from [TsMonad library](https://github.com/cbowdon/TsMonad).

Rationale for using Command Object implementation is to minimize dependency on ngrx/effects module, reduce amount of  boilerplate code and make code more testable. Isolated unit tests usually run faster and easier to write. This opens the door for future code changes: the less _ngrx_ boiler plate code we have the easier it makes to maintain it.  

_Either_ monad plays really well with Typescript's union types. These two things just made for each other. This works out well for intercepting client/server communication. Just use _right_ for valid response and _left_ for exceptional/validation scenarios. This results with fewer _if_/_else_ statements and simplifies exception handling as well as improves test coverage. The code becomes pretty much linear. That is what they call *explicit context*. 

The proposed approach combines Functional Programming techniques with Domain Driven design. This way we can have best of two worlds.

The code excerpts below provides a quick overview of technical design.

[service.helper.ts](https://github.com/usametov/MiGG-ng2/blob/master/src/app/states/effects/service.helper.ts)
This helper class executes the command object.
The command object consists of methodName and action payload.

```
import { Action } from "@ngrx/store";

// this is a 'by-the-book' implementation of command object pattern
export function invokeService<T>(service, methodName: string, payload: any){

  return service[methodName] 
      && service[methodName].apply(service, [payload]) as T;
}
```

[bookmarks.effects.ts](https://github.com/usametov/MiGG-ng2/blob/master/src/app/states/effects/bookmarks.effects.ts)
This is effects code, which was modified to build command object using _action_ instance and pass it to service helper.
```
@Effect()
  requestBookmarksGeneric$ = 
    this.actions$.filter((action: Action) => 
      !!bookmarksActionDispatcher[action.type])
      .switchMap((action: Action) => 
        invokeService<Observable<BookmarksReply>>(this.bookmarksService
          , bookmarksActionDispatcher[action.type], toPayload(action))
        .map(reply => new Reply(reply))
      );
```

[bookmarks.actions.dispatcher.ts](https://github.com/usametov/MiGG-ng2/blob/master/src/app/states/effects/bookmarks.actions.dispatcher.ts)
```
import { ActionTypes } from "../actions/bookmarks"; 

//this is just an action router
//this code will grow and that's totally fine, because it easy to test
//here we are making use of code-is-data approach
//this helps to decouple bookmarks.effects class
//now it's easier to replace/upgrade it when better alternative emerges 
export const bookmarksActionDispatcher: { [action: string] : string } = {
  [ActionTypes.REQUEST_BOOKMARKS_BY_TAG_BUNDLE] : "getBookmarksByTagBundle"
}
```

Below are standard instructions for Angular projects.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

