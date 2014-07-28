(function() {

    var app = angular.module('pledgling', []);

  
    app.controller('AppController', ['$http', '$scope', function($http, $scope){
        var info = this;
        info.arr = [];

        // Get json data
        $http.get('data.json').success(function(data){
        	info.arr = data;
            var causes = info.arr.results;

            // Initialize counts for each Cause
            angular.forEach(causes, function(cause){
                var selectedOrgs = 0;
                angular.forEach(cause.organizations, function(organization){
                    if (organization.is_followed == true){
                        selectedOrgs += 1;
                    }
                });
                cause.count = selectedOrgs;
            });      
        });
    }]);


    app.controller('OrganizationController', ['$scope', function($scope) {

        $scope.clicked = function() {
            // Use the organization.id to find other instances 
            var orgId = $scope.organization.id;

            // Find all instances of this organization and toggle "is_followed" 
            angular.forEach($scope.appCtrl.arr.results, function(result){
                angular.forEach(result.organizations, function(organization){

                    if (organization.id == orgId){
                        organization.is_followed = !organization.is_followed;
                        if (organization.is_followed){
                            result.count ++;
                        } else {
                            result.count --;
                        }
                    }
                });
            });
        };
    }]);


    app.directive("causes", function() {
        return {
            restrict: 'E',
            templateUrl: "causes.html"
        };
    });
})();