describe('art.js tests', function(){
      beforeEach(module('artBoard'));

    it('should return true', inject(function($controller) {
      var $scope = {};
      var ctrl = $controller('artCtrl', {$scope: $scope});
      expect($scope.orderProp).to.equal('rank');
      expect($scope.quantity).to.equal(4);
    }));
  });