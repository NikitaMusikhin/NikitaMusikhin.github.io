angular.module('User',['ngResource','ngStorage'])
.controller('regCtrl',['$scope','$location','UserService',function($scope,$location,UserService){
    $scope.addNewUser = function(user){
        UserService.user.create(user,function success(newUser){
            alert('Поздравляем,вы успешно зарегистрированы!');
            $location.path('/login');
        },function err(){
            alert(':(');
        });
        $scope.regForm.$setPristine();
        $scope.user = {};
    }
    $scope.getError = function(err){
        if(angular.isDefined(err)){
            if(err.required){
                return "Поле не должно быть пустым";
            }
            if(err.minlength){
                return "В данное поле должно быть введено более 6 символов";
            }
            if(err.email){
                return "Введите корректные данные";
            }
        }
    }
}])
.controller('loginCtrl',['$scope','$rootScope','$http','$localStorage','$location','UserService',function($scope,$rootScope,$http,$localStorage,$location,UserService){
    $scope.$storage = $localStorage;
    $scope.authorize = function(user){
         UserService.auth.login(user,function success(data){
             $scope.$storage.token = data.token;
             $rootScope.user = data.user;
             $location.path('/dashboard');
        },function err(){
            alert(':(');
        });
    };
}])
.controller('profCtrl',['$scope','$window','$rootScope','$localStorage','$location','UserService',
function($scope,$window,$rootScope,$localStorage,$location,UserService){
    $window.location.reload();
    if($localStorage.token){
        if(!$rootScope.user){
            UserService.mathContext.isToken({},function success(data){
                $rootScope.user = data.user;
            },function err(){
                console.log(arguments)
                $location.path('/login');
            });
        }
    }else{
        $location.path('/login');
    }

    $scope.logout = function() {
        UserService.out.logout({},function success(){
            delete $localStorage.token;
            $location.path('/login');
        },function err(){
            alert(':(');
        });
    };

    $rootScope.$watch('user',function() {
        $scope.profile = $rootScope.user;
    });
}]);
