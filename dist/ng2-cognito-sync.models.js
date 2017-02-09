"use strict";
var Observable_1 = require('rxjs/Observable');
var AbstructNg2CognitoSyncProvider = (function () {
    function AbstructNg2CognitoSyncProvider() {
    }
    AbstructNg2CognitoSyncProvider.prototype.openDataset = function (datasetName) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            _this.syncManager.openOrCreateDataset(datasetName, function (err, dataset) {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next(dataset);
                }
                observer.complete();
            });
        });
    };
    AbstructNg2CognitoSyncProvider.prototype.loadSdkAsync = function (scripts) {
        var target = document.getElementsByTagName('script')[0];
        for (var _i = 0, scripts_1 = scripts; _i < scripts_1.length; _i++) {
            var script = scripts_1[_i];
            this.loadScript(script, target);
        }
    };
    AbstructNg2CognitoSyncProvider.prototype.loadScript = function (script, target) {
        var _this = this;
        if (script.must && !window.hasOwnProperty(script.must)) {
            setTimeout(function () {
                _this.loadScript(script, target);
            }, 10);
            return;
        }
        if (!document.getElementById(script.id)) {
            var element = document.createElement('script');
            element.id = script.id;
            element.src = script.src;
            target.parentNode.insertBefore(element, target);
        }
    };
    return AbstructNg2CognitoSyncProvider;
}());
exports.AbstructNg2CognitoSyncProvider = AbstructNg2CognitoSyncProvider;
//# sourceMappingURL=ng2-cognito-sync.models.js.map