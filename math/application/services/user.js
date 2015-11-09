angular.module('User')
.constant('urlForResource','http://178.47.139.131\\:9000/')
.factory('UserService',['$http','$resource','$localStorage','urlForResource',function($http,$resource,$localStorage,urlForResource){
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
                   'token':$localStorage.token
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
