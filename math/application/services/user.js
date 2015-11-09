angular.module('User')
.constant('urlForResource','http://178.47.139.131\\:9000/')
.factory('TokenService',['$localStorage',function($localStorage) {
    $storage = $localStorage;
    var _token='';
    return {
        setToken:function(token){
            $storage.token = token;
            _token:token;
        },
        getToken:function(){
            return _token;
        }
    }
}])
.factory('UserService',['$http','$resource','$localStorage','urlForResource','TokenService',function($http,$resource,$localStorage,urlForResource,TokenService){
    return {
        auth : $resource(urlForResource+'authorization/user',{},{
            login:{
                method:'POST'
            }
        }),
        out: $resource(urlForResource+'logout/user',{},{
            logout:{
                method:'DELETE',
                headers:{
                   'token':TokenService.getToken()
                }
            }
        }),
        user : $resource(urlForResource+'registration/user',{},{
            create:{
                method:'POST'
            }
        }),
        health : $resource(urlForResource+'health',{},{
            isHealth:{
                method:'GET'
            }
        }),
        mathContext : $resource(urlForResource+'authorization/mathematicsContext',{},{
            isToken:{
                method:'GET',
                headers:{
                   'token':$localStorage.token
                }
            }
        })
    }
}]);
