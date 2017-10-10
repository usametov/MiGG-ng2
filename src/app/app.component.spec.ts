import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from "app/core/core.module";
import { BookmarksService, ApiService, AuthService } from "app/services";
import { HttpModule, XHRBackend, Http, BaseRequestOptions, RequestOptions, ConnectionBackend } from "@angular/http";
import { StoreModule } from "@ngrx/store";
import {reducers /*, metaReducers*/} from "./states/reducers";
import { routing } from './app.routes';
import { EffectsModule } from "@ngrx/effects";
import {PageNotFoundComponent} from './pageNotFound.component';
import { APP_BASE_HREF } from '@angular/common';
import { MockBackend } from '@angular/http/testing';
import { ReflectiveInjector } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {

    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      ApiService,
    ]);
    const apiService =  this.injector.get(ApiService);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PageNotFoundComponent
      ],

      imports:[HttpModule,
        StoreModule.forRoot(reducers/*, {metaReducers}*/),
        EffectsModule.forRoot([]),
        CoreModule,
         RouterModule,
         routing
        ],

      providers: [
                  { provide: APP_BASE_HREF, useValue : '/' },
                  { provide: XHRBackend, useClass: MockBackend },
                  { provide: ApiService, useValue: apiService}, 
                    BookmarksService,                 
                    AuthService
                 ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Bookmarks App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    console.log("app", app);
    expect(app.title).toEqual('Bookmarks App');
  }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('div > a').textContent).toContain('Bookmarks App');
  // }));
});
