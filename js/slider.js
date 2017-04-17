import $ from 'jquery'
export default {
    timer: null,
    duration: 8000,
    offset: 0,
    len: 0,
    init: function(len) {
        this.len = len;
        $(window).on('resize',function(){
            $('.banner>li').width($(window).width());
            $('.banner').width($('.banner>li').width()*5);
        });
        $('.banner>li').width($(window).width());
        $('.banner').width($('.banner>li').width() * this.len);
        this.createIconUl();
        $('.icon').on('click','li',function(ev){
            clearTimeout(this.timer);
            this.timer=null;
            var $target=$(ev.target);
            var idx=$target.index();
            this.offset=idx;
            this.updateView(); 
            this.move();
        }.bind(this));
        this.autoMove();
    },
    updateView:function(){
        $('.icon>li:eq('+this.offset+')').addClass('selected').siblings('.selected').removeClass('selected');
        this.autoMove();
    },
    move: function() {
        $('.slider').css({
            transform: 'translateX(' + (-this.offset * 100) + '%)'
        })
    },
    autoMove: function() {
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setInterval(function() {
            this.offset++;
            if (this.offset == this.len) {
                this.offset = 0;
            };
            this.move();
            this.updateView();
        }.bind(this), this.duration)
    },
    /*创建图标ul*/
    createIconUl:function(){
        let $icon=$('<ul class="icon list-inline"></ul>');
        for (var i = 0; i < this.len; i++) {
            let $li=$("<li></li>");
            i==0&&$li.addClass('selected');
            $icon.append($li);
        };
        $('.wrapper').append($icon);
    }
}