/**
 * 自定义弹出页
 */
(function(window) {
    var SecondPage = function(pageName) {
        var that = this;
        that.targetPage = $(pageName);

        $(pageName + ' .icon_return').click(function(e) {
            e.preventDefault();
            that.closeSidebar();
        })

        if(!$('body').hasClass('move')){
            $('body').addClass('move');
        }
    }

    SecondPage.prototype = {
        targetPage: undefined,
        openSidebar: function(fn) {
            var container = $(window);
            var w = container.width(),
                h = container.height();
            this.targetPage.css({
                'width': w,
                'height': h
            });

            this.targetPage.addClass('open');
            fn && fn();
        },

        closeSidebar: function(fn) {
            this.targetPage.removeClass('open');
            setTimeout(function() {
                $('#xg-panel-bg').hide();
                hasOpend = false;
                fn && fn();
                //provincePage.hide()
            }, 220);
        }
    }

    window.SecondPage = SecondPage;
})(window);