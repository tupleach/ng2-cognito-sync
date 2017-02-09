import { Component } from '@angular/core';

import { Ng2CognitoSync } from 'ng2-cognito-sync';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  result: string;

  constructor(private cognitoSync: Ng2CognitoSync) { }

  login() {
    this.cognitoSync.facebook.login('name,gender,birthday,locale',
      {scope: 'public_profile,user_birthday', return_scopes: true}).subscribe(res => {
      console.log('loginFacebook', res);
      if (res.profile) {
        this.result  = JSON.stringify(res);
        this.cognitoSync.facebook.openDataset('user').subscribe(dataset => {
          dataset.put('update', String(new Date()), (errPut, record) => {});
          dataset.put('profile', JSON.stringify(res.profile), (errPut, record) => {
            dataset.synchronize({
              onSuccess: (data, newRecords) => {
                console.log('onSuccess', data);
                console.log('newRecords', newRecords);
              },
              onFailure: (errSync) => {
                console.error(errSync);
                this.result = JSON.stringify(errSync);
              },
              onConflict: (dataset, conflicts, callback) => {
                let resolved = [];
                for (let conflict of conflicts) {
                  resolved.push(conflict.resolveWithLocalRecord());
                }
                dataset.resolve(resolved, () => { return callback(true) });
              }
            });
          });
        });
      }
    }, error => {
      console.error(error);
      this.result = JSON.stringify(error);
    });
  }
}
