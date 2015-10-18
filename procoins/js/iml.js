/*
IML v1.0.0 | 2015-09-06
Сustom tooltip/popover/modal jQuery plugin
Developed under the MIT license http://opensource.org/licenses/MIT
*/
+function($){

    function Modal(target){
        this.element;
        this.target = target;
        this.fOut_bg = parseInt(target.attr('data-fadeOut-bg')) || 300;
        this.fIn_bg = parseInt(target.attr('data-fadeIn-bg')) || 300;
        this.fOut_modal = parseInt(target.attr('data-fadeOut-modal')) || 100;
        this.fIn_modal = parseInt(target.attr('data-fadeIn-modal')) || 100;
        this.background = target.attr('data-background') || '#fff';
        this.width = parseFloat(target.attr('data-width')) || '550';
        this.trigger_on = target.attr('data-trigger-on')|| "click";
        this.winWidth = $(window).width();
        this.topMargin = $(window).scrollTop();
        this.bb = $('<div id="background"></div>');
    }

    Modal.prototype.constructor = Modal;

    Modal.prototype.scrollStop = function(){
        if (document.body.addEventListener) document.body.addEventListener('DOMMouseScroll', this.blockWheel, false);
        document.body.onmousewheel = this.blockWheel;
    }
    Modal.prototype.blockWheel = function(event){
        if (!event) event = window.event;
        if (event.stopPropagation) event.stopPropagation();
        else event.cancelBubble = true;
        if(event.preventDefault) event.preventDefault();
        else event.returnValue = false;
    }
    Modal.prototype.scrollStart = function(){
        if (document.body.addEventListener) document.body.addEventListener('DOMMouseScroll', this.enabledWheel, true);
        document.body.onmousewheel = this.enabledWheel;
    }
    Modal.prototype.enabledWheel = function(event){
        event.returnValue = true;
    }

    Modal.prototype.showModal = function(){
        $(this.element).css({'background-color':this.background});
	$(this.element).children('.close').append('&times;');
        $(this.element).fadeIn(this.fIn_modal);
        this.bb.fadeIn(this.fIn_bg);
        this.scrollStop();
    }


    Modal.prototype.hideModal = function(){
      $('body').css({
        'overflow': 'auto'
      });
        $(this.element).fadeOut(this.fOut_modal);
		$(this.element).children('.close').html('');
        this.bb.fadeOut(this.fOut_bg,function(){$(this).remove();});
        this.scrollStart();
    }
    Modal.prototype.stayPosition = function(){

        var stayTop,stayLeft;
        stayTop = (this.topMargin + 180);
        stayLeft = (parseFloat($(window).width()) - this.width)/2;
        $(this.element).css({
            'top':stayTop+'px',
            'left':stayLeft+'px',
            'width':this.width
        });
        $('#background').css({
            'width':'100%',
            'height': '100%'
        });

    }

    Modal.prototype.start = function(target,obj){
      $('body').css({
        'overflow': 'hidden'
      });
        this.bb.appendTo('body');
        this.stayPosition();
        this.showModal();
        $('.close,#background').on('click', function(){
            obj.hideModal();
        });
    }

    $.fn.modal = function(el){
        var target = this, md = new Modal(target);
        md.element = el;
        target.on(md.trigger_on,function(){
            md.start(target,md);
        });
        $(window).resize(function(){
            target.modalresize(el);
        });
    };

    $.fn.modalresize = function(el){
        var md = new Modal(this);
        md.element = el;
        md.stayPosition();
    };
}(jQuery);
