import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule, MatButtonModule, MatListModule } from '@angular/material';

import { BroadcastService, MsalService, MsalAngularConfiguration } from '@azure/msal-angular';
import { MSAL_CONFIG, MSAL_CONFIG_ANGULAR } from '@azure/msal-angular/dist/msal.service';
import { Configuration, CacheLocation } from 'msal';

import * as config from './app-config.json';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
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
              clientId: config.auth.clientId, // This is your client ID
              authority: config.auth.authority, // This is your tenant info
              redirectUri: config.auth.redirectUri, // This is your redirect URI
            },
            cache: {
              cacheLocation: <CacheLocation>config.cache.cacheLocation,
              storeAuthStateInCookie: false
            },
          } as Configuration
        },
        {
          provide: MSAL_CONFIG_ANGULAR,
          useValue: {
            popUp: false,
            consentScopes: [
              config.resources.graphApi.resourceScope,
              ...config.scopes.loginRequest
            ],
            unprotectedResources: [],
            protectedResourceMap: [
              [config.resources.graphApi.resourceUri, [config.resources.graphApi.resourceScope]]
            ]
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
