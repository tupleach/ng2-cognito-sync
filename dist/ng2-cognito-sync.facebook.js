"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('rxjs/Observable');
var AWS = require('aws-sdk');
require('amazon-cognito-js');
var ng2_cognito_sync_models_1 = require('./ng2-cognito-sync.models');
var Ng2CognitoSyncFacebook = (function (_super) {
    __extends(Ng2CognitoSyncFacebook, _super);
    function Ng2CognitoSyncFacebook(zone, config) {
        _super.call(this);
        this.zone = zone;
        this.config = config;
    }
    Ng2CognitoSyncFacebook.prototype.login = function (fields, initParams, options) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            if (!window.hasOwnProperty('FB')) {
                window.fbAsyncInit = function () { return _this.zone.run(function () {
                    _this.fbInit(initParams).subscribe(function () { _this.fbLogin(observer, fields, options); });
                }); };
                _this.loadSdkAsync([
                    { id: 'facebook-jssdk', src: '//connect.facebook.net/ja_JP/sdk.js' }
                ]);
            }
            else {
                _this.fbLogin(observer, fields, options);
            }
        });
    };
    Ng2CognitoSyncFacebook.prototype.fbInit = function (initParams) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var params = Object.assign(_this.config.facebookInitParams || {}, initParams);
            if (params.hasOwnProperty('appId')) {
                FB.init(_this.config.facebookInitParams);
                observer.next();
            }
            else {
                observer.error(new Error(''));
            }
        });
    };
    Ng2CognitoSyncFacebook.prototype.fbLogin = function (observer, fields, options) {
        var _this = this;
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected' && response.authResponse) {
                _this.getCognitoCredentials(observer, fields, response);
            }
            else {
                FB.login(function (resLogin) {
                    if (resLogin.status === 'connected' && resLogin.authResponse) {
                        _this.getCognitoCredentials(observer, fields, resLogin);
                    }
                    else {
                        observer.error(new Error('Facebook login failure.'));
                    }
                }, options);
            }
        });
    };
    Ng2CognitoSyncFacebook.prototype.getCognitoCredentials = function (observer, fields, resLogin) {
        var _this = this;
        var result = {};
        result['login'] = resLogin;
        // Get cognito credentials.
        var credentials = Object.assign({}, this.config.identityCredentials);
        credentials.Logins = { 'graph.facebook.com': resLogin.authResponse.accessToken };
        AWS.config.region = this.config.region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials(credentials);
        AWS.config.getCredentials(function (err) {
            if (err) {
                console.error(err);
                observer.error(err);
                return;
            }
            _this.syncManager = new AWS.CognitoSyncManager();
            // Get facebook user profile.
            FB.api('/me', { fields: fields }, function (resMe) {
                if (resMe && !resMe.error) {
                    result['profile'] = resMe;
                    observer.next(result);
                }
                else {
                    console.error(resMe.error);
                    observer.error(resMe.error);
                }
            });
        });
    };
    return Ng2CognitoSyncFacebook;
}(ng2_cognito_sync_models_1.AbstructNg2CognitoSyncProvider));
exports.Ng2CognitoSyncFacebook = Ng2CognitoSyncFacebook;
//# sourceMappingURL=ng2-cognito-sync.facebook.js.map