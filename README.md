angular-sharepoint
==================
This project is a framework to assist in building [AngularJS](http://angularjs.org/) SharePoint applications.
You can use it to quickly interact with host web or app web lists. The framework leverages the SharePoint REST API and provides a chainable syntax for querying SharePoint data.

#Setup
####Include the module:
```
var myApp = angular.module('myApp', ['ngSP']);
```
####Reference the service in your controller:
```
myApp.controller('AppCtrl', ['$scope', '$spService', function ($scope, $spService) {
}]);
```

#Examples

###Lists
####Get lists in the host web:
```
$spService.lists.value().then(
    function (data) {
        //do stuff
    },
    function (sender, args) {
        console.log('error');
    }
);
```

####Get lists by [template type](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.splisttemplatetype.aspx) value:
```
$spService.lists.getByBaseTemplateType('104').value().then(
    function (data) {
      //expect announcement lists
      //do stuff
    },
    function (sender, args) {
        console.log('error');
    }
);
```

####Get task lists:
```
$spService.lists.getTaskLists().value().then(
    function (data) {
      //expect task lists
      //do stuff
    },
    function (sender, args) {
        console.log('error');
    }
);
```

####Get list by name:
```
$spService.lists.getByTitle('My List').value().then(
    function (data) {
      //do stuff
    },
    function (sender, args) {
        console.log('error');
    }
);
```

###Items
####Get list items from a specific list:
```
$spService.lists.getByTitle('My List').getItems().value().then(
    function (data) {
      //do stuff
    },
    function (sender, args) {
        console.log('error');
    }
);
```

####Get list items from a specific list:
```
$spService.lists.getByTitle('My List').getItems().value().then(
    function (data) {
      //do stuff
    },
    function (sender, args) {
        console.log('error');
    }
);
```

###Fields
####Get field from a specific list:
```
$spService.lists.getByTitle('My Task List').getFieldByName('Task Status').value().then(
    function (data) {
      //do stuff
    },
    function (sender, args) {
        console.log('error');
    }
);
```

