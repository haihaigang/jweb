/**
 * TODO 根据具体业务逻辑修改
 */
(function() {

    //获取登录的id
    config.getId = function(){
        var auth = Cookie.get(Storage.AUTH);
        return auth;
    };
    
    //获取微信号
    config.getOpenId = function(){
        return Cookie.get(Storage.OPENID);
    };
    
    //重定向登录
    config.redirectLogin = function(from){
        from = encodeURIComponent(from);
        location.href = '../login?from=' + from;
    };

    // 返回按钮
    $('.icon_return').click(function(e) {
        e.preventDefault();

        if($(this).attr('data-flag') == 'true'){
            return;
        }
        
        //特殊跳转
        var special = Tools.getQueryValue('special');
        if(special){
            location.href = special;
        }else{
            history.go(-1);
        }
    });
    
    //返回顶部
    $('#wu-back').click(function(e){
        e.preventDefault();
        
        window.scrollTo(0,-1);
    });
    
    //会员中心按钮，未登录则跳转登陆
    $('.icon_user').on('click', function(e){
        e.preventDefault();
        
        var prefix = $(this).attr('href') == '#login' ? '../' : '';
        
        if (!config.getId()) {
            location.href = prefix + 'login';
        } else {
            location.href = prefix + 'hui/index';
        }
    });

    // 下一页按钮
    $('body').on('click', '.nextpage', function(e) {
        e.preventDefault();

        if ($(this).hasClass('loading')) {
            // 正在加载，不可点击
            return;
        }

        if (typeof config.paging == 'function') {
            config.paging();
        }
    });

    //初始化滚动
    config.initScroll = function(opt,mode) {
        var nav = $('.subscript');
        var len = $('.scroller').children().length;
        if (len == 0) {
            return;
        }
        // 有两种导航模式
        if (opt && opt.mode == 'mode2') {
            nav.html('<span>1</span>/' + len);
        } else {
            var res = '';
            for(var i=0;i<len;i++){
                if(i==0){
                    res += '<span class="active"></span>';
                }else{
                    res += '<span></span>';
                }
            }
            nav.html(res);
        }
        config.previewScroll = new jScroll($('.slider')[0], {
            onBeforeScrollStart : function(){
                if(config.scrollInte){
                    clearInterval(config.scrollInte);
                    config.scrollInte = undefined;
                }
            },
            onScrollEnd : function() {
                var cur = $('#img-'+this.currPageX);
                cur.attr('src',cur.attr('data-src'));
                if (mode && mode == 'mode2') {
                    nav.find('span').text(this.currPageX + 1);
                } else {
                    nav.find('span').removeClass('active');
                    nav.find('span').eq(this.currPageX).addClass('active');
                    $(nav.find('span')[this.currPageX]).addClass('active');
                }

                if(opt && opt.auto && !config.scrollInte){
                    config.scrollInte = setInterval(function(){
                        config.previewScroll.currPageX++;
                        if(config.previewScroll.currPageX >= config.previewScroll.pagesX){
                            config.previewScroll.currPageX = 0;
                        }
                        var w = config.previewScroll.warpperW;
                        var i = config.previewScroll.currPageX;
                        config.previewScroll.scrollTo(-w*i,0,200);
                    },3000);
                }
            }
        });
        
        if(opt && opt.auto){
            config.scrollInte = setInterval(function(){
                config.previewScroll.currPageX++;
                if(config.previewScroll.currPageX >= config.previewScroll.pagesX){
                    config.previewScroll.currPageX = 0;
                }
                var w = config.previewScroll.warpperW;
                var i = config.previewScroll.currPageX;
                config.previewScroll.scrollTo(-w*i,0,200);
            },8000);
        }
        
        $('#img-0').attr('src',$('#img-0').attr('data-src'));
    };
})();
