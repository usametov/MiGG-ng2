import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarksComponent } from './core/bookmarks/bookmarks-list.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { Login } from 'app/core/login/login.component';

export const routes: Routes = [  
  {
      path: 'bookmarks/:tagBundleName/:skip/:take'
    , component: BookmarksComponent, canActivate: [AuthGuard] 
  }  
  ,      
  {path: 'bookmarks', redirectTo: '/bookmarks/security/0/10', pathMatch: 'full', canActivate: [AuthGuard] },
  {path: '', redirectTo: '/bookmarks/security/0/10', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: Login },
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
