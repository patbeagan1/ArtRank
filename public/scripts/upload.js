var app = angular.module('fileUpload', ['angularFileUpload']);

app.controller('UploadCtrl', ['$scope', '$upload', function ($scope, $upload) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function () {
                $upload.upload({
                    url: 'http://requestb.in/1b7l9jx1',
                    fields: {'artist': $scope.artist, 'tags': $scope.tags, 'type': $scope.type,'file': $scope.file}
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                })
    };
}]);
