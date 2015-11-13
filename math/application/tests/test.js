describe("Tests Service Token and regCtrl", function(){
    beforeEach(module('User'));
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    it("Test regCtrl validation", function(){
        var $scope = {};
        var controller = $controller('regCtrl',{$scope:$scope});

        expect($scope.getError({required:{}})).toEqual('Поле не должно быть пустым');
        expect($scope.getError({minlength:{}})).toEqual('В данное поле должно быть введено более 6 символов');
        expect($scope.getError({email:{}})).toEqual('Введите корректные данные');
    });

    it("Token Test",function(){
        inject(function(TokenService){
            expect($storage).toBeDefined();//определены ли переменные
            expect(TokenService.getToken()).toBeDefined();

            TokenService.setToken('7eb5a2f3110e2341ce3a9e2d576cc0393d489847bdcf4664e408da991144c9faa13a9d67c7462d54e1cbacef0d66641c86c837428a2482e7f68c652bb0803f0f');//изменение при установке значения
            expect($storage.token).toEqual('7eb5a2f3110e2341ce3a9e2d576cc0393d489847bdcf4664e408da991144c9faa13a9d67c7462d54e1cbacef0d66641c86c837428a2482e7f68c652bb0803f0f');
        })
    })
})
describe('User Service Tests', function () {
    var mockUserResource, $httpBackend;
    beforeEach(module('User'));

    beforeEach(function () {
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            mockUserResource = $injector.get('UserService');
        })
    });

    describe('login/logout', function () {
       it('login user', inject(function (UserService) {
            $httpBackend.expectPOST('http://178.47.139.131:9000/authorization/user')
                .respond({user:{email:"solakkie@gmail.com",password:"qwerty"}});
            var result = mockUserResource.auth.login();
            $httpBackend.flush();
            expect(result.user.email).toEqual('solakkie@gmail.com');
            expect(result.user.password).toEqual('qwerty');
        }));

        it('logout user', inject(function (UserService) {
            $httpBackend.expectDELETE('http://178.47.139.131:9000/logout/user',{"token":"","Accept":"application/json, text/plain, */*"})
                .respond(200);
            var result = mockUserResource.out.logout();
            $httpBackend.flush();
            expect(result).toBeDefined();
        }));

        it('ContextAuth', inject(function (UserService) {
             $httpBackend.expectGET('http://178.47.139.131:9000/authorization/mathematicsContext',
             {"token":"7eb5a2f3110e2341ce3a9e2d576cc0393d489847bdcf4664e408da991144c9faa13a9d67c7462d54e1cbacef0d66641c86c837428a2482e7f68c652bb0803f0f","Accept":"application/json, text/plain, */*"})
                 .respond({user:{email:"solakkie@gmail.com",password:"qwerty"}});
             var result = mockUserResource.mathContext.isToken();
             $httpBackend.flush();
             expect(result.user.email).toEqual('solakkie@gmail.com');
             expect(result.user.password).toEqual('qwerty');
        }));
    });
});
