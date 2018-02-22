angular.module('ItemCtrl', []).controller('ItemController', function($scope, $http) {
    //$scope.tagline = "yoyo";
    $http.get('/api/items').then(function(result) {
       $scope.tagline = result.data; 
    });
    
    $scope.createItem = function() {
        var name = $scope.name;
        var color = $scope.color;
        var price = $scope.price;
        var picture = $scope.picture;
        var date = new Date();
        var time = date.getTime();
        
        var data = {
            name: name,
            color: color,
            price: price,
            picture: picture,
            meta: {
                UpVotes: 0,
                DownVotes: 0
            },
            created_at: time,
            updated_at: time
        };
        
        $http.post('/api/items', data).then(function(result) {
            $scope.name = "";
            $scope.color = "";
            $scope.price = "";
            $scope.picture = "";
            console.log(result)
        }, function(err, status) {
            alert(err);
        });
    };
});