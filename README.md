# ng2-cognito-sync

## Installation

1. Create new identity pool

    [Create new identity pool](https://ap-northeast-1.console.aws.amazon.com/cognito/create/)

2. Registration Facebook for Developers and create facebook app.

    [Facebook for Developers](https://developers.facebook.com/)

3. Install ng2-cognito-sync

    ```bash
    npm install ng2-cognito-sync --save
    ```

4. Import Ng2CognitoSyncModule

    ```typescript
    import { Ng2CognitoSyncModule } from 'ng2-cognito-sync';

    @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      Ng2CognitoSyncModule.forRoot({
        region: 'ap-northeast-1',
        identityCredentials: {
          IdentityPoolId: 'ap-northeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        },
        facebookInitParams: {
          appId: '000000000000000'
        }
      })
    ],
    ```
5. Usage

    ````html
    <button (click)="login()">Login</button>
    ````
    ````typescript
    import { Ng2CognitoSync } from 'ng2-cognito-sync';
    ````
    ````typescript
    constructor(private cognitoSync: Ng2CognitoSync) { }
    
    login() {
      this.cognitoSync.facebook.login('name,gender,birthday,locale',
        {scope: 'public_profile,user_birthday', return_scopes: true}).subscribe(res => {
        if (res.profile) {
          this.cognitoSync.facebook.openDataset('user').subscribe(dataset => {
            dataset.put('profile', JSON.stringify(res.profile), (errPut, record) => {
              dataset.synchronize();
            });
          });
        }
      }, error => {
        console.error(error);
      });
    }
    ````
