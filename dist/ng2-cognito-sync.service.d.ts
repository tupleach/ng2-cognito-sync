import { NgZone } from '@angular/core';
import { Ng2CognitoSyncConfig } from './ng2-cognito-sync.config';
import { Ng2CognitoSyncFacebook } from './ng2-cognito-sync.facebook';
export declare class Ng2CognitoSync {
    private zone;
    private config;
    facebook: Ng2CognitoSyncFacebook;
    constructor(zone: NgZone, config: Ng2CognitoSyncConfig);
}
