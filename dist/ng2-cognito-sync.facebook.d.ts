import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'amazon-cognito-js';
import { Ng2CognitoSyncConfig } from './ng2-cognito-sync.config';
import { AbstructNg2CognitoSyncProvider } from './ng2-cognito-sync.models';
export declare class Ng2CognitoSyncFacebook extends AbstructNg2CognitoSyncProvider {
    private zone;
    private config;
    protected syncManager: any;
    constructor(zone: NgZone, config: Ng2CognitoSyncConfig);
    login(fields?: string, initParams?: any, options?: any): Observable<any>;
    private fbInit(initParams?);
    private fbLogin(observer, fields?, options?);
    private getCognitoCredentials(observer, fields, resLogin);
}
