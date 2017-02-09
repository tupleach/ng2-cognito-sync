import { Observable } from 'rxjs/Observable';
export interface Ng2CognitoSyncProvider {
    login(fields?: string, initParams?: any, options?: any): Observable<any>;
    openDataset(datasetName: string): Observable<any>;
}
export declare abstract class AbstructNg2CognitoSyncProvider implements Ng2CognitoSyncProvider {
    protected abstract syncManager: any;
    constructor();
    abstract login(fields?: string, initParams?: any, options?: any): Observable<any>;
    openDataset(datasetName: string): Observable<any>;
    loadSdkAsync(scripts: Array<any>): void;
    private loadScript(script, target);
}
