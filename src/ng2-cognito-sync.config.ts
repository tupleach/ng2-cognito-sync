import { OpaqueToken } from '@angular/core';

export const COGNITO_SYNC_CONFIG = new OpaqueToken('CognitoSyncConfig');

export class Ng2CognitoSyncConfig {
  region: string;
  identityCredentials: any;
  facebookInitParams?: any;
}
