var validator = (function(){
    
    var config = {
        mail:'isEmail',
        text:'isText'
    }
    
    var types = {
        isEmail : {
            validate:function(value){
                var re,valid;
                re = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
                valid = re.test(value);
                if(valid === false){
                    $('#e-mail').css({
                        'border':'1px solid red'
                    })
                }else{
                    $('#e-mail').css({
                        'border':'1px solid rgba(0,0,0,0.0)'
                    })
                    $('#e-mail').focus(function(){
                        $(this).css({
                            'border':'1px solid #9BA5B4'
                        })
                    })
                }
                return valid ? true : false;
            },
            message:'Error is mail'
        },
        isText :{
            validate:function(value){
                var re,valid;
                re = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
                valid = re.test(value);
                if(valid === false){
                    $('#bug_descript').css({
                        'border':'1px solid red'
                    })
                }else{
                    $('#bug_descript').css({
                        'border':'1px solid rgba(0,0,0,0.0)'
                    })
                    $('#bug_descript').focus(function(){
                        $(this).css({
                            'border':'1px solid #9BA5B4'
                        })
                    })
                }
                return valid ? true : false;
            },
            message:'Error is text'
        }
    }
    
    return {
        validate: function (data) {
            var type,checker,result,i;
            this.messages = [];

            for(i in data){
                if (data.hasOwnProperty(i)) {
                    type = config[i];
                    checker = types[type];
                    result = checker.validate(data[i]);
                    if(result !== true){
                        this.messages.push(checker.message + '</br>');
                    }    
                }
            }
            if(this.messages.length !== 0){ 
                $('#errors').html(this.messages);
                return false;
            }else{
                return true;
            }
        }
    }
})();