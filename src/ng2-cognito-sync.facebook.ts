import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as AWS from 'aws-sdk';
import 'amazon-cognito-js';

import { Ng2CognitoSyncConfig } from './ng2-cognito-sync.config';
import { AbstructNg2CognitoSyncProvider } from './ng2-cognito-sync.models';

declare const FB;

export class Ng2CognitoSyncFacebook extends AbstructNg2CognitoSyncProvider {

  protected syncManager: any;

  constructor(private zone: NgZone, private config: Ng2CognitoSyncConfig) {
    super();
  }

  login(fields?: string, initParams?: any, options?: any): Observable<any> {
    return new Observable(observer => {
      if (!window.hasOwnProperty('FB')) {
        (<any>window).fbAsyncInit = () => this.zone.run(() => {
          this.fbInit(initParams).subscribe(() => { this.fbLogin(observer, fields, options); });
        });
        this.loadSdkAsync([
            { id: 'facebook-jssdk', src: '//connect.facebook.net/ja_JP/sdk.js' }
        ]);
      } else {
        this.fbLogin(observer, fields, options);
      }
    });
  }

  private fbInit(initParams?: any): Observable<any> {
    return new Observable(observer => {
      let params = Object.assign(this.config.facebookInitParams || {}, initParams);
      if (params.hasOwnProperty('appId')) {
        FB.init(this.config.facebookInitParams);
        observer.next();
      } else {
        observer.error(new Error(''));
      }
    });
  }

  private fbLogin(observer, fields?: string, options?: any) {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected' && response.authResponse) {
        this.getCognitoCredentials(observer, fields, response);
      } else {
        FB.login((resLogin) => {
          if (resLogin.status === 'connected' && resLogin.authResponse) {
            this.getCognitoCredentials(observer, fields, resLogin);
          } else {
            observer.error(new Error('Facebook login failure.'));
          }
        }, options);
      }
    });
  }

  private getCognitoCredentials(observer, fields, resLogin) {
    let result = {};
    result['login'] = resLogin;
    // Get cognito credentials.
    let credentials = Object.assign({}, this.config.identityCredentials);
    credentials.Logins = { 'graph.facebook.com': resLogin.authResponse.accessToken };
    AWS.config.region = this.config.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials(credentials);
    AWS.config.getCredentials((err) => {
      if (err) {
        console.error(err);
        observer.error(err);
        return;
      }

      this.syncManager = new (<any>AWS).CognitoSyncManager();

      // Get facebook user profile.
      FB.api('/me', {fields: fields}, (resMe) => {
        if (resMe && !resMe.error) {
          result['profile'] = resMe;
          observer.next(result);
        } else {
          console.error(resMe.error);
          observer.error(resMe.error);
        }
      });
    });
  }
}
