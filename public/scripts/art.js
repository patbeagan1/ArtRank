var app = angular.module('artBoard', ['ui.bootstrap']);

app.service('Art', function($http) {

  return {

    //Request JSON data from Image API
    getImgArt: function(callback){

      $http.get('/content/image').success(function(data){

        callback(data);

        }).error(function(data) {

        console.log("Error on GET request to /content/image");

        });

    },

    //Request JSON data from Text API
    getTxtArt: function(callback){

      $http.get('/content/text').success(function(data){

        callback(data);

      }).error(function(data){

        console.log("Error on GET request to /content/text")

      });
    },

    //Request JSON data from Audio API
    getAudioArt: function(callback){

      $http.get('/content/audio').success(function(data){

        callback(data);

      }).error(function(data){

        console.log("Error on GET request to /content/audio");

      });
    }


  }

});


app.controller('artCtrl', ['$scope', 'Art', function($scope, Art) {

  $scope.orderProp = 'rank';
  $scope.iQuantity = 4;
  $scope.tQuantity = 4;
  $scope.aQuantity = 3;
  $scope.selected = undefined;
  $scope.tags = [];

  Art.getImgArt(function(data){

    $scope.imageArt = data;
    /*for (int i = 0; i< $scope.imageArt.length; i++){
      for (int j = 0; j < $scope.imageArt[i].tags.length; j++){
        var tag = $scope.imgArt[i].tags[j].toLowerCase();
        if (scope.tags.indexOf(tag) >= 0){
          $scope.tags.push(tag);
        }
      }
    }*/

  });

  Art.getTxtArt(function(data){

    $scope.txtArt = data;

  });

  Art.getAudioArt(function(data){

    $scope.audioArt = data;

  });

  $scope.tags = ['Test', 'help', 'photography', 'aaa', 'abc', 'abb', 'bca', 'horror', 'nature', 'tttt'];

  /*function(){
    $scope.tags = []
    for (int i = 0; i< $scope.imgArt.length; i++){
      for (int j = 0; j < $scope.imgArt[i].tags.length; j++){
        var tag = $scope.imgArt[i].tags[j].toLowerCase();
        if (scope.tags.indexOf(tag) >= 0){
          $scope.tags.push(tag);
        }
      }
    }
  }*/

  console.log("tags" + $scope.tags)

  $scope.loadTxt =  	function (ele, url){
  		console.log("HERE");
  		console.log(ele);
  		console.log(url);
  		document.getElementById(ele).value = url;
  	}

}]);

app.filter('tagFilter', function () {
  // function to invoke by Angular each time
  // Angular passes in the `items` which is our Array
  return function (items, tag) {
    // Create a new Array
    console.log(tag);
      if(tag.length <= 0){
        return items;
      }
    var filtered = [];
    var lTag = tag.toLowerCase();
    console.log(lTag);
    // loop through existing Array
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      // check if the individual Array element is tagged with the tag
      if (item.tags.indexOf(lTag) >= 0) {
        // push it into the Array if it does!
        filtered.push(item);
      }
    }
    //return the Array after iteration's complete
    return filtered;
  };
});


app.config(function($logProvider){
    $logProvider.debugEnabled(true);
});
