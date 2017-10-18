import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Login } from "./login/login.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BookmarksComponent } from './bookmarks/bookmarks-list.component';
import { BookmarkComponent } from './bookmarks/bookmark.component';
import { BookmarksStore } from "./../states/bookmarks.store";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import {BookmarksEffects} from "./../states/effects/bookmarks.effects";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule,     
    EffectsModule.forFeature([BookmarksEffects]),    
  ],
  declarations: [ 
    Login,
    HeaderComponent, 
    FooterComponent, 
    BookmarksComponent, 
    BookmarkComponent,    
  ],
  providers: [BookmarksStore],
  exports: [
     Login,
     HeaderComponent,
     FooterComponent,
     BookmarksComponent,
     BookmarkComponent
    ]
})
export class CoreModule { }
