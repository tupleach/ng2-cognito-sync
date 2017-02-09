import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2CognitoSync } from './ng2-cognito-sync.service';
import { Ng2CognitoSyncConfig, COGNITO_SYNC_CONFIG } from './ng2-cognito-sync.config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [Ng2CognitoSync]
})
export class Ng2CognitoSyncModule {

  static forRoot(config?: Ng2CognitoSyncConfig): ModuleWithProviders {
    return {
      ngModule: Ng2CognitoSyncModule,
      providers: [
        { provide: COGNITO_SYNC_CONFIG, useValue: config }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: Ng2CognitoSyncModule) {
    if (parentModule) {
      throw new Error('Ng2CognitoSyncModule is already loaded.');
    }
  }
}
