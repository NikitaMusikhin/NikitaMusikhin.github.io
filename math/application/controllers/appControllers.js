angular.module('User',['ngResource','ngStorage'])
.controller('regCtrl',['$scope','$location','UserService',
function($scope,$location,UserService){
    $scope.addNewUser = function(user){
        UserService.user.create(user,function success(newUser){
            alert('Поздравляем,вы успешно зарегистрированы!');
            $location.path('/login');
        },function err(){
            alert('So sad');
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
.controller('loginCtrl',['$localStorage','$scope','$rootScope','$http','$location','UserService',
function($localStorage,$scope,$rootScope,$http,$location,UserService){
    $scope.authorize = function(user){
        UserService.auth.login(user,function success(data){
             $localStorage.token = data.token;
             $rootScope.user = data.user;
             $location.path('/dashboard');
        },function err(){
            alert(':(');
        });
    };
}])
.controller('profCtrl',['$http','$scope','$rootScope','$localStorage','$location','UserService',
function($http,$scope,$rootScope,$localStorage,$location,UserService){
    $scope.logout = function() {
        $http.defaults.headers.common['token'] = $localStorage.token;
        UserService.logout.delete({},
        function success(data){
            delete $localStorage.token;
            delete $localStorage.typeExample;
            delete $localStorage.modeExample;
            $location.path('/login');
        },function err(){
            alert(':(');
        });
    };
    if($localStorage.token){
        if(!$rootScope.user){
            UserService.mathContext.isToken({},function success(data){
                $rootScope.user = data.user;
            },function err(){
                $location.path('/login');
            });
        }
    }else{
        $location.path('/login');
    };
    $rootScope.$watch('user',function() {
        $scope.profile = $rootScope.user;
    });
    $scope.rangeSettings = {
        add:2,
        sub:2,
        mull:2,
        div:2
    }
    $scope.selectoObj = function(operation){
        switch (operation) {
            case 'add':
                return $scope.rangeSettings.add;
                break;
            case 'sub':
                return $scope.rangeSettings.sub;
                break;
            case 'mull':
                return $scope.rangeSettings.mull;
                break;
            case 'div':
                return $scope.rangeSettings.div;
                break;
        }
    }

    $scope.setExampleSettings = function(operation){
        $localStorage.typeExample = operation;
        $localStorage.modeExample = $scope.selectoObj(operation);
    };
}])
.controller('exampleCtrl',['$http','$scope','$rootScope','$localStorage','$location','UserService',
function($http,$scope,$rootScope,$localStorage,$location,UserService){
    if($localStorage.token){
        if(!$rootScope.user){
            UserService.mathContext.isToken({},function success(data){
                $rootScope.user = data.user;
            },function err(){
                $location.path('/login');
            });
        }
        $http.defaults.headers.common['token'] = $localStorage.token;
        UserService.range.get({},function success(data){
            $scope.range = $scope.returnTypeRange(data);
        },function err(){
            alert('error localstorage token');
        });
    }else{
        $location.path('/login');
    }

    $scope.returnTypeRange = function(obj){
        switch ($scope.settings.type) {
            case 'add':
                return obj.addition;
                break;
            case 'sub':
                return obj.substraction;
                break;
            case 'mull':
                return obj.multiplication;
                break;
            case 'div':
                return obj.division;
                break;
            }
    }

    $rootScope.$watch('user',function() {
        $scope.profile = $rootScope.user;
    });
//установка режима решения и типа задач
    if($localStorage.typeExample && $localStorage.modeExample){
        $scope.settings = {
            type:$localStorage.typeExample,
            mode:$localStorage.modeExample
        }
    }else{
        $location.path('/dashboard');
    }
//логика работы генератора
    $scope.counter = {
        wrong:0,
        right:0,
        overall:0
    }

    $scope.view = {
        blockInput:true,
        blockAnswer:false
    }

    $scope.example = {
        otvet  : 0,
        primer : '',
        type   : ''
    }

    $scope.startSolutions = function(){
        $scope.counter.overall = 0;
        $scope.counter.right = 0;
        $scope.counter.wrong = 0;
        $scope.view.blockInput = false;
        $scope.view.blockAnswer = true;
        $scope.generateNewExample();
    }

    $scope.generateNewExample = function(){
        if($scope.counter.overall < 10){
            var numbers = $scope.getNumbers();
            switch ($scope.settings.type) {
                case 'add':
                    $scope.example.type = 'ADDITION_BASIC';
                    $scope.example.otvet = numbers.reduce(function(x,y){
                        return x + y;
                    });
                    $scope.example.primer = numbers.join(' + ')+' = '+ $scope.example.otvet;
                    break;
                case 'sub':
                    $scope.example.type = 'SUBTRACTION_BASIC';
                    $scope.example.otvet = numbers.reduce(function(x,y){
                        return x - y;
                    });
                    $scope.example.primer = numbers.join(' - ')+' = '+ $scope.example.otvet;
                    break;
                case 'mull':
                    $scope.example.type = 'MULTIPLICATION_BASIC';
                    $scope.example.otvet = numbers.reduce(function(x,y){
                        return x * y;
                    });
                    $scope.example.primer = numbers.join(' * ')+' = '+ $scope.example.otvet;
                    break;
                case 'div':
                    $scope.example.type = 'DIVISION_BASIC';
                    $scope.example.otvet = numbers.reduce(function(x,y){
                        return x / y;
                    });
                    $scope.example.primer = numbers.join(' / ')+' = '+ $scope.example.otvet;
                    break;
                default:
                    $location.path('/dashboard');
            }
            $scope.exampleReady = true;
        }else{
            $scope.sendResult();
            $scope.example.userAnswer = '';
            $scope.view.blockInput = true;
            $scope.view.blockAnswer = false;
            //delete $localStorage.typeExample;
            //delete $localStorage.modeExample;
        }
    }

    $scope.sendResult = function(){
        $http.defaults.headers.common['token'] = $localStorage.token;
        UserService.exampleAPI.save({
            typeExample:$scope.example.type,
            right:$scope.counter.right,
            wrong:$scope.counter.wrong,
            count:$localStorage.modeExample
        },
        function success(){
            alert('success');
            /*$http.defaults.headers.common['token'] = $localStorage.token;//сразу обновляем количество правильно решенных

            UserService.range.get({},function success(data){
                $scope.range = $scope.returnTypeRange(data);
            },function err(){
                alert('error localstorage token');
            });*/
        },function err(){
            alert('error');
        });
    }

    $scope.saveSolution = function(otvet){
        otvet == $scope.example.otvet?$scope.counter.right++:$scope.counter.wrong++;
        $scope.counter.overall++;
        $scope.example.userAnswer = '';
    }

    $scope.getNumbers = function(){
        var numbers = [];
        for(var i = 0;i < $scope.settings.mode;i++){
            numbers.push($scope.getRandomNumber());
        }
        return numbers;
    }

    $scope.getRandomNumber = function(){
        //эта функция хавает число верных ответов и генерит числа в зависимости от соотношения диапазона и количества верных ответов этого
        return Math.floor((Math.random()*6)+1);
    }
}]);
