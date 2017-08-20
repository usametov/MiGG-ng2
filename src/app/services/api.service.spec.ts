import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {  
  Response, ResponseOptions, 
  BaseRequestOptions, ConnectionBackend, Http,
  RequestOptions
} from '@angular/http';
import {BASE_URL} from './constants'
// import http testing libs
import { MockBackend, MockConnection } from '@angular/http/testing';
// import your service
import { ApiService} from './api.service';
import { Bookmark } from "app/models/bookmark";


describe('Service: Api', () => {
  
  beforeEach(() => {
      this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      ApiService,
    ]);
    this.apiService =  this.injector.get(ApiService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('should call proper url for security bookmarks', () => {

    this.apiService.get(`${BASE_URL}/security/0/10`);
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(`${BASE_URL}/security/0/10`, 'url invalid');
  });

  it('should get some bookmarks', fakeAsync(() => {

    let result: Bookmark[];
    this.apiService.get(`${BASE_URL}/security/0/10`).
      then((bookmarks: Bookmark[]) => result = bookmarks);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
         body: JSON.stringify({data: 
            [
               {                    
                    "Description": "",
                    "Id": "57146c5f083989dcf1e69c44",
                    "LinkText": "An OpenSSL Users Guide to DROWN - OpenSSL Blog",
                    "LinkUrl": "https://www.openssl.org/blog/blog/2016/03/01/an-openssl-users-guide-to-drown/",
                    "Tags": [
                        "cryptography",
                        "openssl"
                    ]
                },
                {                    
                    "Description": " https://samhobbs.co.uk/2013/12/remove-network-may-be-monitored-by-an-unknown-third-party-in-android-4-4-kitkat --- https://code.google.com/p/android/issues/detail?id=82036#c31\n",
                    "Id": "57146c5f083989dcf1e69cb5",
                    "LinkText": "F-Droid :: Move Certs! Resolve certificates warnings",
                    "LinkUrl": "https://f-droid.org/repository/browse/?fdfilter=move%20certs&fdid=com.nutomic.zertman",
                    "Tags": [
                        "android",
                        "security",
                        "apps",
                        "computernetworks"
                    ]
                },
                {                    
                    "Description": "",
                    "Id": "57146c5f083989dcf1e69cbc",
                    "LinkText": "GitHub - Astonex/Antox: Scala android client for Project Tox - secure p2p messaging",
                    "LinkUrl": "https://github.com/Astonex/Antox",
                    "Tags": [
                        "scala",
                        "android",
                        "cryptography"
                    ]
                }
            ]}),
       })));
       
       tick();  
       expect(result.length).toEqual(3, 'should contain given amount of heroes');
       expect(result[0].LinkText).toContain("OpenSSL", 'first bookmark is about OpenSSL');     
  }));
});