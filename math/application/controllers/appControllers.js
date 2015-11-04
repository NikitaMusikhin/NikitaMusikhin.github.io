angular.module('Ctrls',['ngResource'])
.constant('urlForResource','This is URL')
.controller('regCtrl',['$scope','$resource','urlForResource',function($scope,$resource,urlForResource){
    var newUser = $resource(urlForResource,{},{
        create:{method:'POST'}
    });
    $scope.addNewUser = function(user){
        if(user.password === user.secpassword){
            newUser.create(user,function(newUser){
                alert('Поздравляем,вы успешно зарегистрированы!');
            });
            $scope.regForm.$setPristine();
            $scope.user = {};
        }
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
}]);
