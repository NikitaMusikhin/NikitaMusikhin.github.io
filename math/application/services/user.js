angular.module('User')
.constant('urlForResource','http://178.47.139.131\\:9000/')
.factory('UserService',['$http','$resource','$localStorage','urlForResource',
function($http,$resource,$localStorage,urlForResource){
    return {
        auth : $resource(urlForResource+'authorization/user',{},{
            login:{
                method:'POST'
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
        mathContext : $resource(urlForResource+'context/mathematics',{},{
            isToken:{
                method:'GET',
                headers:{
                   'token':$localStorage.token
                }
            }
        }),
        logout: $resource(urlForResource+'logout/user'),
        range : $resource(urlForResource+'context/examples'),
        exampleAPI : $resource(urlForResource+'example')
    }
}]);
