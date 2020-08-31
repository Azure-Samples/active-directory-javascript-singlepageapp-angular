import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Configuration, CacheLocation } from 'msal';
import { 
  BroadcastService, 
  MsalService, 
  MsalAngularConfiguration,
  MSAL_CONFIG, 
  MSAL_CONFIG_ANGULAR } 
from '@azure/msal-angular';

import * as config from './app-config.json'; 

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        BrowserModule,
        HttpClientModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        MsalService,
        {
          provide: MSAL_CONFIG,
          useValue: {
            auth: {
              clientId: config.auth.clientId,
              authority: config.auth.authority,
              redirectUri: config.auth.redirectUri
            },
            cache: {
              cacheLocation: <CacheLocation>config.cache.cacheLocation,
              storeAuthStateInCookie: false, // set to true for IE 11
            },
          } as Configuration
        },
        {
          provide: MSAL_CONFIG_ANGULAR,
          useValue: {
            popUp: false,
            consentScopes: config.scopes.loginRequest,
            protectedResourceMap: [
              [config.resources.graphApi.resourceUri, [config.resources.graphApi.resourceScope]]
            ],
          } as MsalAngularConfiguration
        },
        BroadcastService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MSAL Angular - Sample App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('MSAL Angular - Sample App');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('MSAL Angular - Sample App');
  });
});
