import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarksComponent } from './core/bookmarks/bookmarks-list.component';
import { PageNotFoundComponent } from './pageNotFound.component';

export const routes: Routes = [  
  {
      path: 'bookmarks/:tagBundleName/:skip/:take'
    , component: BookmarksComponent
  }  
  ,      
  {path: 'bookmarks', redirectTo: '/bookmarks/security/0/10', pathMatch: 'full'},
  {path: '', redirectTo: '/bookmarks/security/0/10', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
