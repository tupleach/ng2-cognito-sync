import { Observable } from 'rxjs/Observable';

export interface Ng2CognitoSyncProvider {

  login(fields?: string, initParams?: any, options?: any): Observable<any>;
  openDataset(datasetName: string): Observable<any>;
}

export abstract class AbstructNg2CognitoSyncProvider implements Ng2CognitoSyncProvider {

  protected abstract syncManager: any;

  constructor() { }

  abstract login(fields?: string, initParams?: any, options?: any): Observable<any>;

  openDataset(datasetName: string): Observable<any> {
    return new Observable(observer => {
      this.syncManager.openOrCreateDataset(datasetName, (err, dataset) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(dataset);
        }
        observer.complete();
      });
    });
  }

  loadSdkAsync(scripts: Array<any>) {

    let target = document.getElementsByTagName('script')[0];
    for (let script of scripts) {
      this.loadScript(script, target);
    }
  }

  private loadScript(script, target) {
    if (script.must && !window.hasOwnProperty(script.must)) {
      setTimeout(() => {
        this.loadScript(script, target);
      }, 10);
      return;
    }
    if (!document.getElementById(script.id)) {
      let element = document.createElement('script');
      element.id = script.id;
      element.src = script.src;
      target.parentNode.insertBefore(element, target);
    }
  }
}
