export default angular.module('service', [])
    .factory('httpService', ['$http', '$q', function($http, $q) {
        return {
            GET: function(url, data) {
                var deferred = $q.defer();
                $http.get(url, {
                    params: data
                }).success(function(info) {
                    deferred.resolve(info);
                });
                return deferred.promise;
            },
            POST: function(url, data) {
                var deferred=$q.defer();
                $http({
                    method:'POST',
                    url:url,
                    data:data,
                    // headers:'application/x-www-form-urlencoded',
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest:function  (data) {
                        var str = [];  
                        for(var p in data){  
                           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));  
                        }  
                        return str.join("&");  
                    }
                }).success(function  (info) {
                    deferred.resolve(info);
                });
                return deferred.promise;
            }
        };
    }])