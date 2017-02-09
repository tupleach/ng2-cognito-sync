"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var ng2_cognito_sync_service_1 = require('./ng2-cognito-sync.service');
var ng2_cognito_sync_config_1 = require('./ng2-cognito-sync.config');
var Ng2CognitoSyncModule = (function () {
    function Ng2CognitoSyncModule(parentModule) {
        if (parentModule) {
            throw new Error('Ng2CognitoSyncModule is already loaded.');
        }
    }
    Ng2CognitoSyncModule.forRoot = function (config) {
        return {
            ngModule: Ng2CognitoSyncModule,
            providers: [
                { provide: ng2_cognito_sync_config_1.COGNITO_SYNC_CONFIG, useValue: config }
            ]
        };
    };
    Ng2CognitoSyncModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [],
                    providers: [ng2_cognito_sync_service_1.Ng2CognitoSync]
                },] },
    ];
    /** @nocollapse */
    Ng2CognitoSyncModule.ctorParameters = [
        { type: Ng2CognitoSyncModule, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
    ];
    return Ng2CognitoSyncModule;
}());
exports.Ng2CognitoSyncModule = Ng2CognitoSyncModule;
//# sourceMappingURL=ng2-cognito-sync.module.js.map