/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Ng2CognitoSyncService } from './ng2-cognito-sync.service';

describe('Ng2CognitoSyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ng2CognitoSyncService]
    });
  });

  it('should ...', inject([Ng2CognitoSyncService], (service: Ng2CognitoSyncService) => {
    expect(service).toBeTruthy();
  }));
});
