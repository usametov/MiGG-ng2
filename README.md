# MiGG-ng2

The purpose of this project is to provide UI for bookmark aggregation engine. 

# Technical Design Notes

This project follows the principles of Elm-style architecture. It builds on top of existing angular/ngrx/store/effects framework by introducing two improvements:

1. use Command Object design pattern for dealing with side-effects. 
2. use _Either_ monad from TsMonad library.

Rationale for using Command Object implementation is to minimize dependency on ngrx/effects module, reduce amount of  boilerplate code and make code more testable. Isolated unit tests usually run faster and easier to write. This opens the door for future code changes: the less _ngrx_ boiler plate code we have the easier it makes to upgrade (replace).  

_Either_ monad plays really well with Typescript's union types. These two things just made for each other. This works out well for intercepting client/server communication. Just use _right_ for valid response and _left_ for exceptional/validation scenarios. This results with fewer _if_/_else_ statements and simplifies exception handling as well as improves test coverage. The code becomes pretty much linear. That is what they call *explicit context*. 

The proposed approach combines Functional Programming techniques with Domain Driven design. This way we can have best of two worlds.




Below is standard instructions for projects generated with Angular CLI tool.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

