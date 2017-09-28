import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";
//import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import {PageNotFoundComponent} from './pageNotFound.component';
import { BookmarksService, ApiService, AuthService }  from './services';
import {reducers} from "./states/reducers";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent    
  ],
  imports: [
    BrowserModule,    
    HttpModule,
    //StoreModule.forRoot({ routerReducer: routerReducer }),
    StoreModule.forRoot(reducers),
    routing,    
    //StoreRouterConnectingModule,
    CoreModule,    
    RouterModule,
    //Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrument({
      maxAge: 10 //  Retains last 10 states
    }),
    EffectsModule.forRoot([]),    
  ],
  providers: [ 
    BookmarksService,
    ApiService, 
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
