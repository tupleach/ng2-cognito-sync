import { Injectable, Inject, NgZone } from '@angular/core';

import { COGNITO_SYNC_CONFIG, Ng2CognitoSyncConfig } from './ng2-cognito-sync.config';
import { Ng2CognitoSyncFacebook } from './ng2-cognito-sync.facebook';

declare const FB;
declare const AWS;

@Injectable()
export class Ng2CognitoSync {

  facebook: Ng2CognitoSyncFacebook;

  constructor(private zone: NgZone, @Inject(COGNITO_SYNC_CONFIG) private config: Ng2CognitoSyncConfig) {
    this.facebook = new Ng2CognitoSyncFacebook(zone, config);
  }
}
