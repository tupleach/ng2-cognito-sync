"use strict";
var core_1 = require('@angular/core');
var ng2_cognito_sync_config_1 = require('./ng2-cognito-sync.config');
var ng2_cognito_sync_facebook_1 = require('./ng2-cognito-sync.facebook');
var Ng2CognitoSync = (function () {
    function Ng2CognitoSync(zone, config) {
        this.zone = zone;
        this.config = config;
        this.facebook = new ng2_cognito_sync_facebook_1.Ng2CognitoSyncFacebook(zone, config);
    }
    Ng2CognitoSync.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Ng2CognitoSync.ctorParameters = [
        { type: core_1.NgZone, },
        { type: ng2_cognito_sync_config_1.Ng2CognitoSyncConfig, decorators: [{ type: core_1.Inject, args: [ng2_cognito_sync_config_1.COGNITO_SYNC_CONFIG,] },] },
    ];
    return Ng2CognitoSync;
}());
exports.Ng2CognitoSync = Ng2CognitoSync;
//# sourceMappingURL=ng2-cognito-sync.service.js.map