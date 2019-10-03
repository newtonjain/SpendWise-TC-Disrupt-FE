angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('location', [function(){
    this.getLocation = function () {
        return { latitude: '1234', longitude: '4321' };
    };

    this.distanceBetweenInMeters = function (a, b) {
        return 1000;
    }
}])

.service('notifier', [function(){
    var listeners = [];

    this.addListener = function(listener) {
        listeners.push(listener);
    };

    this.notify = function(message) {
        listeners.forEach(listener => listener(message));
    };
}])
