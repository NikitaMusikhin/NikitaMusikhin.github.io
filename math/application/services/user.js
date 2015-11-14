angular.module("User").constant("urlForResource","http://178.47.139.131\\:9000/").factory("TokenService",["$localStorage",function(e){$storage=e;var t="";return{setToken:function(e){$storage.token=e},getToken:function(){return t}}}]).factory("UserService",["$http","$resource","$localStorage","urlForResource","TokenService",function(e,t,o,r,n){return{auth:t(r+"authorization/user",{},{login:{method:"POST"}}),out:t(r+"logout/user",{},{logout:{method:"DELETE",headers:{token:n.getToken()}}}),user:t(r+"registration/user",{},{create:{method:"POST"}}),health:t(r+"health",{},{isHealth:{method:"GET"}}),mathContext:t(r+"context/mathematics",{},{isToken:{method:"GET",headers:{token:o.token}}}),rangeExample:t(r+"context/examples",{},{range:{method:"GET",headers:{token:o.token}}}),addition:t(r+"example/addition/basic",{},{solutions:{method:"POST",headers:{token:o.token}}})}}]);