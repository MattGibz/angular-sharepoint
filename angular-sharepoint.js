// DIRECTIVE IDEAS
// - <spdialog>

// SERVICE IDEAS
// - perform REST get commands with selects, filters, etc.
// - perform JSOM for taxonomy & things REST can't do.
// - provide the same syntax to user so they don't care if it's REST or JSOM

(function (window, angular, undefined) {
    'use strict';

    var sp = angular.module('ngSP', []);

    sp.service('$spUtilityServices', function () {
        var self = this;
        self.getQueryStringParameter = function (paramToRetrieve) {
            var params =
                document.URL.split("?")[1].split("&");
            var strParams = "";
            for (var i = 0; i < params.length; i = i + 1) {
                var singleParam = params[i].split("=");
                if (singleParam[0] == paramToRetrieve)
                    return singleParam[1];
            }
        }
        self.getScripts = function (base, libraries, index, exec) {
            if (index === libraries.length) {
                exec();
            }
            else {
                var lib = libraries[index];
                index++;
                $.getScript(base + lib, function () {
                    this.getScripts(base, libraries, index, exec);
                });
            }
        }
        self.logError = function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.hasOwnProperty('responseJSON')) {
                console.error(jqXHR.responseJSON.error.message.value);
            }
            else {
                console.error(jqXHR.responseText);
            }
        }
        self.ajaxQuery = function (url) {
            var d = $.Deferred();
            $.ajax({
                url: url,
                method: "GET",
                async: false,
                headers: {
                    "Accept": "application/json; odata=verbose"
                },
                success: function (data) {
                    d.resolve(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    self.logError(jqXHR, textStatus, errorThrown);
                }
            });
            return d.promise();
        }
    });

    sp.service('$spServices', ['$spConstants', '$spUtilityServices', function ($spConstants, $spUtilityServices) {
        var self = this;
        self.lists = {
            outurl: $spConstants.appWebUrl + "/_api/SP.AppContextSite(@TargetSite)/web/lists?" +
                    "@TargetSite='" + $spConstants.hostWebUrl + "'",
            getByTitle:function(listtitle){
                this.outurl = this.outurl.replace("lists?", "lists/getByTitle(@TargetList)?");
                this.outurl += "&@TargetList='" + listtitle + "'";
                return this;
            },
            getByBaseTemplateType: function (id) {
                this.outurl = this.outurl.replace("?", "?$filter=BaseTemplate eq " + id + "&");
                return this;
            },
            getTaskLists: function(){
                return this.getByBaseTemplateType('171');
            },
            getItems: function(){
                this.outurl = this.outurl.replace("?", "/items?");
                return this;
            },
            getFieldByName: function (field) {
                this.outurl = this.outurl.replace("?", "/fields?$select=Choices&$filter=Title eq '" + field + "'&");
                return this;
            },
            value: function () {
                var fetch = this.outurl;
                this.outurl = $spConstants.appWebUrl + "/_api/SP.AppContextSite(@TargetSite)/web/lists?" +
                    "@TargetSite='" + $spConstants.hostWebUrl + "'";
                return $spUtilityServices.ajaxQuery(fetch);
            }
        };
    }]);

    sp.factory('$spConstants', function ($spUtilityServices) {
        var obj = {};
        obj.hostWebUrl = decodeURIComponent($spUtilityServices.getQueryStringParameter('SPHostUrl'));
        obj.appWebUrl = decodeURIComponent($spUtilityServices.getQueryStringParameter('SPAppWebUrl'));
        obj.scriptBase = obj.hostWebUrl + "/_layouts/15/";
        return obj;
    });

})(window, window.angular);
