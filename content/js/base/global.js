/**
 * 封装异步请求
 * 包含通用的四大类请求
 * paging
 * detail
 * submit
 * custom
 */
(function() {
    var NODATA = '<div class="nodata">暂无数据。</div>',
        NOMOREDATA = '<div class="nodata">没有更多数组。</div>',
        csrftoken,
        loadingDom = $('#ti-loading');

    /**
     * 接口基类
     */
    function Api(options) {
        this.options = options || {};
        this.timeout = 15000; //请求超时时间
        this.cache = true; //是否缓存
        this.defaultListTmpl = 'flv-list-tmpl';
        this.defaultListEle = '#flv-list';
        this.defaultDetailTmpl = 'flv-detail-tmpl';
        this.defaultDetailEle = '#flv-detail';
        this.isLoading = false; //是否正在请求
        this.hasNext = true; //是否有下一页
        this.queue = {}; //请求队列
        this.tempPage = {}; //分页dom
        this.onEnd = function() {}; //当请求都完成
    }

    Api.prototype._init = function() {
        var spinnings = this.spinnings;

        return this;
    }

    /**
     * 分页查询
     *
     * @param options-请求参数
     * *****
     * url 请求URL
     * data 请求数据 {} $(form)
     * type 请求类型 GET POST
     * renderFor 渲染模板
     * renderEle 渲染容器
     * showLoading 是否显示loading提示 true false
     * *****
     * pagingDom 分页容器
     * pagingMode 分页形式 'number'、'next'、'' 默认 number
     * key 分页数据的关键字 默认'body' '-1'时整个返回值为分页数据
     * *****
     * @param callback-请求成功后执行的回调方法
     * @param callbackError-请求失败后执行的回调方法
     */
    Api.prototype.paging = function(options, callback, callbackError) {
        var that = this,
            isFirst = options.data.page == 1, //是否第一次请求
            opt = { //默认配置
                renderFor: this.defaultListTmpl,
                renderEle: this.defaultListEle,
                pagingDom: '.pagination',
                pagingMode: 'number',
                timeKey: 'createAt',
                key: 'data',
                showLoading: true,
                logtype: 'paging'
            };

        extend(options, opt);

        if (options.pagingMode == 'number') {
            $(options.renderEle).html('正在加载中...');
            $(options.pagingDom).hide();
        } else if (options.pagingMode == 'next') {
            var np = findByKey(that.tempPage, options.url);
            var next = $('#np-' + np),
                nextStr = '<div id="np-' + np + '" class="nextpage">正在加载中...</div>';

            if (options.pagingDom) {
                next = $(options.pagingDom);
            }
            if (next.length == 0) {
                $(options.renderEle).after(nextStr);
                next = $('#np-' + np);
            }
            next.html('正在加载中...');

            if (isFirst) {
                //查第一页数据一定清空当前容器
                $(options.renderEle).html('');
            }
        }

        that.ajaxSend(options, function(response, textStatus, jqXHR) {
            var body = response[options.key];

            if (options.key == '-1') {
                //设置key=-1，所有返回值为分页数据
                body = response;
            }

            if (options.pagingMode == 'number') {
                if (!body || body.length == 0) {
                    //数据没有结果显示无数据提示
                    if (isFirst) {
                        $(options.renderEle).html(NODATA);
                    }
                } else {
                    that.render(options.renderEle, options.renderFor, body);
                }

                initPagination(response.pageInfo, options.pagingDom);
            } else if (options.pagingMode == 'next') {
                that.hasNext = body.length == options.data.pageSize;
                if (body.length == 0) {
                    //数据没有结果显示无数据提示
                    if (isFirst) {
                        next.hide();
                        $(options.renderEle).html(NODATA);
                    }
                } else {
                    next.show();
                    that.render(options.renderEle, options.renderFor, body, !isFirst);
                    if (!that.hasNext) {
                        //没有下一页显示无更多数据提示
                        next.html(NOMOREDATA);
                    } else {
                        options.nextButton && next.html(options.nextButton.text);
                    }
                }
            }

            if (typeof callback == 'function') {
                callback(response);
            }
        }, callbackError);
        //异步 分页导航 模板渲染 绑定分页事件 = 分页
    };

    /**
     * 详情查询
     *
     * @param options-请求参数
     * *****
     * url 请求URL
     * data 请求数据 {} $(form)
     * type 请求类型 GET POST
     * renderFor 渲染模板
     * renderEle 渲染容器
     * showLoading 是否显示loading提示 true false
     * *****
     * @param callback-请求成功后执行的回调方法
     * @param callbackError-请求失败后执行的回调方法
     */
    Api.prototype.detail = function(options, callback, callbackError) {
        var that = this,
            opt = { //默认配置
                renderFor: this.defaultDetailTmpl,
                renderEle: this.defaultDetailEle,
                key: 'data',
                showLoading: true,
                logtype: 'detail'
            };

        extend(options, opt);

        if (options.showLoading) {
            $(options.renderEle).html('<div class="loading">加载中...</div>');
        }

        that.ajaxSend(options, function(response, textStatus, jqXHR) {
            if (response.error) {
                $(options.renderEle).html(response.error);
                return;
            }
            var data = response[options.key] || {};
            if (data) {
                render(options.renderEle, options.renderFor, data);
            }
            if (typeof callback == 'function') {
                callback(response);
            }
        }, callbackError);
    };

    /**
     * 表单提交
     *
     * @param options-请求参数
     * *****
     * url 请求URL
     * data 请求数据 {} $(form)
     * type 请求类型 GET POST
     * showLoading 是否显示loading提示 true false
     * *****
     * @param callback-请求成功后执行的回调方法
     * @param callbackError-请求失败后执行的回调方法
     */
    Api.prototype.submit = function(options, callback, callbackError) {
        var formData,
            that = this,
            isForm = !!options.data.length,
            btnSubmit,
            opt = {
                type: 'POST',
                showLoading: true,
                logtype: 'submit'
            };

        extend(options, opt);

        if (isForm) {
            formData = options.data.serializeArray();
            btnSubmit = options.data.find('[type="submit"]');
            btnSubmit.attr('disabled', true);
        } else {
            formData = options.data;
        }
        options.data = formData;

        that.ajaxSend(options, function(response, textStatus, jqXHR) {
            if (isForm) {
                btnSubmit.removeAttr('disabled');
            }
            if (typeof callback == 'function') {
                callback(response);
            }
        }, function(jqXHR, textStatus, errorThrown) {
            if (isForm) {
                btnSubmit.removeAttr('disabled');
            }
            if (typeof callbackError == 'function') {
                callbackError(jqXHR, textStatus, errorThrown);
            }
        });
    };

    /**
     * 自定义查询
     *
     * @param options-封装请求url，请求数据，请求类型
     * @param callback-请求成功后执行的回调方法
     * @param callbackError-请求失败后执行的回调方法
     */
    Api.prototype.custom = function(options, callback, callbackError) {
        var that = this,
            opt = {
                logtype: 'custom'
            };

        extend(options, opt);

        that.ajaxSend(options, callback, callbackError);
    };

    /**
     * jquery.ajax
     */
    Api.prototype.ajaxSend = function(options, callback, callbackError) {
        var that = this;
        that.isLoading = true;
        that.queue[options.url] = true;

        if (options.showLoading) {
            $(options.renderEle).hide();
            loadingDom.show();
        }

        //TODO 一般这里需要添加不同的请求参数
        options = options || {};
        var csrftoken = Storage.get('CSRFTOKEN');
        if (!!csrftoken) {
            options.url += '?csrftoken=' + csrftoken;
        }

        if (typeof options.contentType == undefined) {
            options.contentType = 'application/json'
        }
        if (typeof options.processData == undefined) {
            options.processData = true;
        }

        $.ajax({
            url: options.url,
            data: options.data,
            type: options.type || 'GET',
            dataType: 'JSON',
            timeout: that.timeout,
            cache: that.cache,
            contentType: options.contentType,
            processData: options.processData
        }).then(function(response, textStatus, jqXHR) {
            //TODO 一般这里需要处理不同的业务逻辑
            csrftoken = jqXHR.getResponseHeader('csrftoken');
            Storage.set('CSRFTOKEN', csrftoken);

            // try {
            //     response = eval('(' + response + ')'); //測試模擬接口
            // } catch (e) {
            //     response = {
            //         code: -999,
            //         message: '(TI)返回数据格式解析错误'
            //     };
            // }

            that.isLoading = false;
            delete(that.queue[options.url]);

            if (!response) {
                logged(options.logtype, response.message || response, options.url);
                if (typeof callbackError == 'function') {
                    callbackError('Malformed', response);
                }
                return;
            }

            if (typeof callback == 'function') {
                callback(response);
            }
            if (isEmpety(that.queue) && typeof that.onEnd == 'function') {
                that.onEnd.call(this);
            }
        }, function(jqXHR, textStatus, errorThrown) {
            that.isLoading = false;
            delete(that.queue[options.url]);

            logged(options.logtype, textStatus, options.url);
            if (typeof callbackError == 'function') {
                callbackError(textStatus);
            }

            if (isEmpety(that.queue) && typeof that.onEnd == 'function') {
                that.onEnd.call(this);
            }
        }).done(function() {
            loadingDom.hide();
            $(options.renderEle).fadeIn();
        });
    }

    /**
     * 数据渲染到模板
     * @param renderEle-渲染容器
     * @param renderFor-渲染模版
     * @param data-数据
     * @param isAppend-是否追加
     */
    function render(renderEle, renderFor, data, isAppend) {
        if ($('#' + renderFor).length > 0 && data) {
            if (typeof data.length != 'undefined') {
                data = {
                    'list': data
                };
            }
            var result = tmpl(renderFor, data);
            if (isAppend) {
                $(renderEle).append(result);
            } else {
                $(renderEle).html(result);
            }
        }
    }

    /**
     * 使用模板
     * @param renderFor 模板名称
     * @data 数据
     */
    function tmpl(renderFor, data) {
        return template.render(renderFor, data);
    }

    /**
     * 记录接口的错误日志
     * @param type-接口请求类型
     * @param message-错误内容
     * @param url-错误地址
     */
    function logged(type, message, url) {
        log('[' + type + '] ' + message + ':' + url, 2);
    }

    /**
     * 判断对象是否为空
     * @param  {[type]}
     * @return {Boolean}
     */
    function isEmpety(obj) {
        var flag = true;
        for (var i in obj) {
            flag = false;
            break;
        }

        return flag;
    }

    /**
     * 验证key是否存在obj中
     * @param  obj 要验证的对象
     * @param  key 要验证的关键字
     */
    function findByKey(obj, key) {
        var arr = [],
            tar;
        for (var i in obj) {
            arr.push(obj[i]);
            if (key == i) {
                tar = obj[i];
            }
        }

        if (arr.length == 0) return obj[key] = 1;
        if (tar) return tar;
        arr = arr.sort();
        return obj[key] = arr[arr.length - 1] + 1;
    }

    /**
     * 初始化数字分页
     * @param  data 分页数据
     * current 当前页
     * size 每页条数
     * count 总记录数
     * @param  dom 分页的容器
     */
    function initPagination(data, dom) {
        if (!data) return; //数据错误不初始化

        var d = {
            current_page: data.current,
            per_page: data.size,
            total: data.count
        };

        d.current_page = parseInt(d.current_page);
        d.total = parseInt(d.total);
        d.per_page = parseInt(d.per_page);
        d.total = Math.ceil(d.total / d.per_page);

        d.prev_page = d.current_page == 1 ? 1 : d.current_page - 1;
        d.next_page = d.current_page == d.total ? d.current_page : d.current_page + 1;
        var start = d.current_page - 2,
            end = d.current_page + 2;

        if (d.total <= 5) {
            start = 1;
            end = d.total;
        } else {
            if (start < 1) {
                start = 1;
                end = start + 4;
            }
            if (end > d.total) {
                end = d.total;
                start = d.total - 4;
            }
        }

        var result = '';

        result += '<dl><dt' + (d.prev_page == 1 ? ' class="disabled"' : '') + '><a href="#' + d.prev_page + '"><img src="images/arrow_left.gif"></a></dt><dd>';
        for (var i = start; i <= end; i++) {
            result += '<a href="#' + i + '"' + (d.current_page == i ? ' class="active"' : '') + '>' + i + '</a>';
        }
        result += '</dd><dt class="ari' + (d.next_page >= d.total ? ' disabled' : '') + '"><a href="#' + d.next_page + '"><img src="images/arrow_left.gif"></a></dt></dl>';

        $(dom).html(result).show();
    }

    /**
     * 扩展参数
     * @param  options 被扩展参数 
     * @param  opt 扩展参数
     */
    function extend(options, opt) {
        options = options || {};
        for (var i in opt) {
            options[i] = typeof options[i] == 'undefined' ? opt[i] : options[i];
        }
    }

    //抛出公用方法，保持模板调用入口唯一
    Api.prototype.render = render;
    Api.prototype.logged = logged;

    window.Ajax = new Api();
})();
;/**
 * TODO 
 */
(function($, undefined) {
    var props = {
            "animation": {},
            "transition": {}
        },
        testElement = document.createElement("a"),
        vendorPrefixes = ["", "webkit-", "moz-", "o-"];

    $.each(["animation", "transition"], function(i, test) {

        // Get correct name for test
        var testName = (i === 0) ? test + "-" + "name" : test;

        $.each(vendorPrefixes, function(j, prefix) {
            if (testElement.style[$.camelCase(prefix + testName)] !== undefined) {
                props[test]["prefix"] = prefix;
                return false;
            }
        });

        // Set event and duration names for later use
        props[test]["duration"] =
            $.camelCase(props[test]["prefix"] + test + "-" + "duration");
        props[test]["event"] =
            $.camelCase(props[test]["prefix"] + test + "-" + "end");

        // All lower case if not a vendor prop
        if (props[test]["prefix"] === "") {
            props[test]["event"] = props[test]["event"].toLowerCase();
        }
    });

    // If a valid prefix was found then the it is supported by the browser
    $.support.cssTransitions = (props["transition"]["prefix"] !== undefined);
    $.support.cssAnimations = (props["animation"]["prefix"] !== undefined);

    // Remove the testElement
    $(testElement).remove();

    // Animation complete callback
    $.fn.animationComplete = function(callback, type, fallbackTime) {
        var timer, duration,
            that = this,
            eventBinding = function() {

                // Clear the timer so we don't call callback twice
                clearTimeout(timer);
                callback.apply(this, arguments);
            },
            animationType = (!type || type === "animation") ? "animation" : "transition";

        // Make sure selected type is supported by browser
        if (($.support.cssTransitions && animationType === "transition") ||
            ($.support.cssAnimations && animationType === "animation")) {

            // If a fallback time was not passed set one
            if (fallbackTime === undefined) {

                // Make sure the was not bound to document before checking .css
                if ($(this).context !== document) {

                    // Parse the durration since its in second multiple by 1000 for milliseconds
                    // Multiply by 3 to make sure we give the animation plenty of time.
                    duration = parseFloat(
                        $(this).css(props[animationType].duration)
                    ) * 3000;
                }

                // If we could not read a duration use the default
                if (duration === 0 || duration === undefined || isNaN(duration)) {
                    duration = $.fn.animationComplete.defaultDuration;
                }
            }

            // Sets up the fallback if event never comes
            timer = setTimeout(function() {
                $(that).off(props[animationType].event, eventBinding);
                callback.apply(that);
            }, duration);

            // Bind the event
            return $(this).one(props[animationType].event, eventBinding);
        } else {

            // CSS animation / transitions not supported
            // Defer execution for consistency between webkit/non webkit
            setTimeout($.proxy(callback, this), 0);
            return $(this);
        }
    };

    // Allow default callback to be configured on mobileInit
    $.fn.animationComplete.defaultDuration = 1000;
})(jQuery);
;//debug
var log = function(m) {
    if (typeof console != 'undefined') {
        console.log(m);
    }
};

/**
 * 配置信息
 */
(function() {
    var config = {
        begin: 0, //当前第几页，从0开始
        beginTime: undefined, //第一条数据的时间戳
        endTime: undefined, //最后一条数据的时间戳
        forward: undefined, //分页方向，0向后1向前，默认空
        pageSize: 10, //默认分页大小
        page: 1, //当前页
        HOST_API: location.protocol + '//' + location.host,
        HOST_IMAGE: location.protocol + '//' + location.host + '/',
        //HOST_IMAGE: 'http://61.155.169.178:9988/' //测试服务器上图片
        DEF_IMG_URL: '../content/images/common/d300x300-1.png' //默认图片
    };

    //接口配置
    config.API_GLOBAL_AD = config.HOST_API + '/global/get';

    //TODO 其它一些配置...

    window.config = config;
})();
;/**
 * 本地cookie读写
 */
(function() {
    var Cookie = {
        get: function(sname) {
            var sre = "(?:;)?" + sname + "=([^;]*);?";
            var ore = new RegExp(sre);
            if (ore.test(document.cookie)) {
                try {
                    return unescape(RegExp["$1"]); // decodeURIComponent(RegExp["$1"]);
                } catch (e) {
                    return null;
                }
            } else {
                return null;
            }
        },

        //expires默认7天，0不设置，-1移除
        set: function(c_name, value, expires) {
            if (typeof expires == 'number') {
                if (expires == 0) {
                    expires = null;
                } else {
                    expires = this.getExpDate(expires, 0, 0);
                }
            } else {
                expires = expires || this.getExpDate(7, 0, 0);
            }
            document.cookie = c_name + "=" + escape(value) + ((expires == null) ? "" : ";expires=" + expires) + "; path=/";
        },

        remove: function(key) {
            this.set(key, '', -1);
        },

        getExpDate: function(e, t, n) {
            var r = new Date;
            if (typeof e == "number" && typeof t == "number" && typeof n == "number")
                return r.setDate(r.getDate() + parseInt(e)), r.setHours(r
                        .getHours() + parseInt(t)), r.setMinutes(r.getMinutes() + parseInt(n)),
                    r.toGMTString()
        }
    };
    window.Cookie = Cookie;
})();
;/**
 * 自定义验证，用于简单的规格验证
 */
(function() {
    String.prototype.isSpaces = function() {
        for (var i = 0; i < this.length; i += 1) {
            var ch = this.charAt(i);
            if (ch != ' ' && ch != "\n" && ch != "\t" && ch != "\r") {
                return false;
            }
        }
        return true;
    };

    String.prototype.isValidMail = function() {
        return (new RegExp(
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)
            .test(this));
    };

    String.prototype.isPhone = function() {
        return (new RegExp(/^1\d{10}?$/).test(this));
    };

    String.prototype.isEmpty = function() {
        return (/^\s*$/.test(this));
    };

    String.prototype.isValidPwd = function() {
        return (new RegExp(/^([_]|[a-zA-Z0-9@]){6,16}$/).test(this));
    };

    String.prototype.isPostCode = function() {
        return (new RegExp(/^\d{6}?$/).test(this));
    };
})();
;/**
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
})(window);;/**
 * 本地存储扩展
 */
(function() {
    var Storage = {
        AUTH: 'FLV-AUTH',
        ACCOUNT: 'FLV-ACCOUNT',
        REMEMBER: 'FLV-REMEMBER',
        LOGIN_HISTORY: 'LH',
        AREA: 'FLV-AREA',
        get: function(key, isSession) {
            if (!this.isLocalStorage()) {
                return;
            }
            var value = this.getStorage(isSession).getItem(key);
            if (value) {
                return JSON.parse(value);
            } else {
                return undefined;
            }
        },
        set: function(key, value, isSession) {
            if (!this.isLocalStorage()) {
                return;
            }
            value = JSON.stringify(value);
            this.getStorage(isSession).setItem(key, value);
        },
        remove: function(key, isSession) {
            if (!this.isLocalStorage()) {
                return;
            }
            this.getStorage(isSession).removeItem(key);
        },
        getStorage: function(isSession) {
            return isSession ? sessionStorage : localStorage;
        },
        isLocalStorage: function() {
            try {
                if (!window.localStorage) {
                    log('不支持本地存储');
                    return false;
                }
                return true;
            } catch (e) {
                log('本地存储已关闭');
                return false;
            }
        }
    };

    window.Storage = Storage;
})();;/**
 * 扩展模板帮助方法
 * 依赖artTemplate，tools
 */
(function(template) {
    if(!template) return;

    template.openTag = "<!--[";
    template.closeTag = "]-->";

    // 模板帮助方法，绝对化图片地址
    template.helper('$absImg', function(content, defaultValue) {
        return Tools.absImg(content, defaultValue);
    });

    // 模板帮助方法，转换时间戳成字符串
    template.helper('$formatDate', function(content, type, defaultValue) {
        return Tools.formatDate(content, type, defaultValue || '--');
    });

    //模板帮助方法，编码url参数
    template.helper('$encodeUrl', function(content) {
        return encodeURIComponent(content);
    });

    //模板帮助方法，格式化货币
    template.helper('$formatCurrency', function(content, defaultValue, unit) {
        return Tools.formatCurrency(content, defaultValue, unit);
    });

    //模板帮助方法，\r\n替换换行
    template.helper('$convertRN', function(content) {
        if (!content) {
            return '--';
        }
        return content.replace(/\r\n/gi, '<br/>');
    });

    //模板帮助方法，根据序列值添加样式名
    template.helper('$addClassByIdx', function(i, v, className) {
        if (i == v) {
            return className || '';
        }
    });

    //模板帮助方法，截取内容长度添加省略号
    template.helper('$ellipsis', function(content, length) {
        var v = content.replace(/[^\x00-\xff]/g, '__').length;
        if (v / 2 > length) {
            return content.substring(0, length) + '...';
        }
        return content;
    });

    //模板帮助方法， 从时间字符串中截取日期，限定字符串yyyy-MM-dd...
    template.helper('$getDateFromStr', function(content) {
        if (!content || content.length == 0) {
            return;
        }

        var len = content.length > 10 ? 10 : content.length;
        return content.substring(0, len);
    });
})(window.template)
;/**
 * 工具类，包括自定义提示框、格式化日期、格式化货币、获取查询字符串、格式化表单等
 **/
(function() {
    var that = this,
        preventDefault, panel, panelBg, delay, count = 0,
        toastPanel, temp;

    //自定义提示框，依赖jquery
    var TipPanel = function(el, options) {
        var that = this;

        that.panel = el || $('#ti-panel');
        that.panelBg = panelBg || $('#ti-panel-bg');
        that.panelTitle = that.panel.find('.panel-title');
        that.panelTips = that.panel.find('.panel-tips');
        that.btnOk = that.panel.find('.btn-ok');
        that.btnCancel = that.panel.find('.btn-cancel');
        that.panelText = that.panel.find('.panel-text');
        that.panelTick = that.panel.find('.panel-tick');

        that.options = {
            type: 'error',
            tick: 0,
            okText: '确定',
            cancelText: '取消',
            showTitle: false,
            showTips: false
        };

        //关闭
        that.panel.on('click', '.btn-ok', function(e) {
            e.preventDefault();
            that.hide(true);
        });

        //取消
        that.panel.on('click', '.btn-cancel', function(e) {
            e.preventDefault();
            that.hide();
        });
    };

    TipPanel.prototype = {
        delay: undefined,
        count: 0,
        setOptions: function(options) {
            var that = this;

            for (i in options) that.options[i] = options[i];

            if (that.options.showTitle) {
                that.panelTitle.show();
            } else {
                that.panelTitle.hide();
            }
            if (that.options.showTips) {
                that.panelTips.show();
            } else {
                that.panelTips.hide();
            }
            if (that.options.okText) {
                that.btnOk.text(that.options.okText);
            }
            if (that.options.cancelText) {
                that.btnCancel.text(that.options.cancelText);
            }
            if (that.options.tipsText) {
                that.panelTips.html(that.options.tipsText);
            }
            if (that.options.type == 'confirm') {
                that.btnOk.show();
                that.btnCancel.show();
            } else {
                that.btnOk.show();
                that.btnCancel.hide();
            }
            that.panelText.html(that.options.message);
            that.panel.css('margin-top', -(that.panel.height() / 2)).show();
            that.panelBg.show();

            if (that.options.tick > 1000) {
                that.panelTick.text(that.options.tick / 1000);
                that.delay = setInterval(function() {
                    if (that.count < that.options.tick - 1000) {
                        that.count = count + 1000;
                        that.panelTick.text((that.options.tick - count) / 1000);
                    } else {
                        that._end();
                        that.count = 0;
                        clearInterval(that.delay);
                    }
                }, 1000);
            } else if (that.options.tick <= 1000 && that.options.tick > 0) {
                that.delay = setTimeout(function() {
                    that._end();
                }, that.options.tick);
            }
        },
        _end: function() {
            var that = this;

            that.panel.hide();
            that.panelBg.hide();

            if (typeof that.options.tipsCallback == 'function') {
                that.options.tipsCallback();
                that.options.tipsCallback = undefined;
            } else if (typeof that.options.yesCallback == 'function') {
                that.options.yesCallback();
                that.options.yesCallback = undefined;
            }
        },
        show: function() {

        },
        hide: function(yesClick) {
            var that = this;

            if (that.delay) {
                clearTimeout(that.delay);
            }
            if (!that.panel) {
                return;
            }
            that.panel.hide();
            that.panelBg.hide();

            if (yesClick) {
                typeof that.options.yesCallback == 'function' && that.options.yesCallback();
            } else {
                typeof that.options.noCallback == 'function' && that.options.noCallback();
            }
            that.options.yesCallback = undefined;
            that.options.noCallback = undefined;
        }
    }

    //按指定格式格式化日期
    function format(date, pattern) {
        var that = date;
        var o = {
            "M+": that.getMonth() + 1,
            "d+": that.getDate(),
            "h+": that.getHours(),
            "m+": that.getMinutes(),
            "s+": that.getSeconds(),
            "q+": Math.floor((that.getMonth() + 3) / 3),
            "S": that.getMilliseconds()
        };
        if (/(y+)/.test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (that.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(pattern)) {
                pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return pattern;
    };

    var Tools = {
        //绝对化图片地址
        absImg: function(content, defaultValue) {
            if (!content) {
                // 测试时使用相对
                return defaultValue || config.DEF_IMG_URL;
            }
            if (content && content.indexOf('http://') == 0) {
                return content;
            }
            return config.HOST_IMAGE + content;
        },
        //时间戳格式化
        formatDate: function(content, type, defaultValue) {
            var pattern = type || "yyyy-MM-dd hh:mm";
            if (isNaN(content) || content == null) {
                return defaultValue || content;
            } else if (typeof(content) == 'object') {
                var y = dd.getFullYear(),
                    m = dd.getMonth() + 1,
                    d = dd.getDate();
                if (m < 10) {
                    m = '0' + m;
                }
                var yearMonthDay = y + "-" + m + "-" + d;
                var parts = yearMonthDay.match(/(\d+)/g);
                var date = new Date(parts[0], parts[1] - 1, parts[2]);
                return format(date, pattern);
            } else {
                if (content.length == 10)
                    content = content + '000';
                var date = new Date(parseInt(content));
                return format(date, pattern);
            }
        },
        // 货币格式化，2050.5=>2,050.5
        formatCurrency: function(content, defaultValue, unit) {
            if (!content) {
                return defaultValue || '--';
            }

            content = content + ''; //转字符串

            var prefix, subfix, idx = content.indexOf('.');
            if (idx > 0) {
                prefix = content.substring(0, idx);
                subfix = content.substring(idx, content.length);
            } else {
                prefix = content;
                subfix = '';
            }

            var mod = prefix.toString().length % 3;
            var sup = '';
            if (mod == 1) {
                sup = '00';
            } else if (mod == 2) {
                sup = '0';
            }

            prefix = sup + prefix;
            prefix = prefix.replace(/(\d{3})/g, '$1,');
            prefix = prefix.substring(0, prefix.length - 1);
            if (sup.length > 0) {
                prefix = prefix.replace(sup, '');
            }
            if (subfix) {
                if (subfix.length == 2) {
                    subfix += '0';
                } else if (subfix.length == 1) {
                    subfix += '00';
                }
                subfix = subfix.substring(0, 3);
            }
            return prefix + subfix;
        },
        strToDate: function(str) { //字符串转日期，yyyy-MM-dd hh:mm:ss
            var tempStrs = str.split(" ");
            var dateStrs = tempStrs[0].split("-");
            var year = parseInt(dateStrs[0], 10);
            var month = parseInt(dateStrs[1], 10) - 1;
            var day = parseInt(dateStrs[2], 10);

            var timeStrs = tempStrs[1].split(":");
            var hour = parseInt(timeStrs[0], 10);
            var minute = parseInt(timeStrs[1], 10) - 1;
            var second = parseInt(timeStrs[2], 10);
            var date = new Date(year, month, day, hour, minute, second);
            return date;
        },
        //获取URL参数
        getQueryValue: function(key) {
            var q = location.search,
                keyValuePairs = new Array();

            if (q.length > 1) {
                var idx = q.indexOf('?');
                q = q.substring(idx + 1, q.length);
            } else {
                q = null;
            }

            if (q) {
                for (var i = 0; i < q.split("&").length; i++) {
                    keyValuePairs[i] = q.split("&")[i];
                }
            }

            for (var j = 0; j < keyValuePairs.length; j++) {
                if (keyValuePairs[j].split("=")[0] == key) {
                    // 这里需要解码，url传递中文时location.href获取的是编码后的值
                    // 但FireFox下的url编码有问题
                    return decodeURI(keyValuePairs[j].split("=")[1]);

                }
            }
            return '';
        },
        // 获取窗口尺寸，包括滚动条
        getWindow: function() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        // 获取文档尺寸，不包括滚动条但是高度是文档的高度
        getDocument: function() {
            var doc = document.documentElement || document.body;
            return {
                width: doc.clientWidth,
                height: doc.clientHeight
            };
        },
        // 获取屏幕尺寸
        getScreen: function() {
            return {
                width: screen.width,
                height: screen.height
            };
        },
        // 显示、禁用滚动条
        showOrHideScrollBar: function(isShow) {
            preventDefault = preventDefault || function(e) {
                e.preventDefault();
            };
            (document.documentElement || document.body).style.overflow = isShow ? 'auto' : 'hidden';
            // 手机浏览器中滚动条禁用取消默认touchmove事件
            if (isShow) {
                // 注意这里remove的事件必须和add的是同一个
                document.removeEventListener('touchmove', preventDefault, false);
            } else {
                document.addEventListener('touchmove', preventDefault, false);
            }
        },
        // 显示对话框
        showDialog: function() {},
        // 显示着遮罩层
        showOverlay: function() {},
        // 显示确认框
        showConfirm: function(msg, yesCallback, noCallback) {
            var opt = {};
            if (typeof msg == 'object') {
                opt = msg;
            } else {
                opt.message = msg;
                opt.yesCallback = yesCallback;
                opt.noCallback = noCallback;
            }
            opt.type = 'confirm';
            opt.showTitle = true;
            opt.showTip = false;

            panel = panel || new TipPanel();
            panel.setOptions(opt);
        },
        // 显示提示
        showAlert: function(msg, tick, callback) {
            var opt = {};
            if (typeof msg == 'object') {
                opt = msg;
            } else {
                opt.message = msg;
                opt.tick = tick;
                opt.yesCallback = callback;
            }
            opt.type = 'alert';

            panel = panel || new TipPanel();
            panel.setOptions(opt);
        },
        // 显示加载框
        showLoading: function() {
            $('#ti-loading').show();
        },
        hideLoading: function() {
            $('#ti-loading').hide();
        },
        hidePanel: function(yesClick) {
            panel && panel.hide(yesClick);
        },
        showToast: function(msg, tick) {
            toastPanel = toastPanel || $('#ti-toast');
            tick = tick || 600;

            if (delay) {
                clearTimeout(delay);
            }

            toastPanel.find('span').text(msg);
            toastPanel.show();
            delay = setTimeout(function() {
                toastPanel.hide();
            }, tick);
        },
        isIPad: function() {
            return (/iPad/gi).test(navigator.appVersion);
        },
        isIos: function() {
            return (/iphone|iPad/gi).test(navigator.appVersion);
        },
        isAndroid: function() {
            return (/android/gi).test(navigator.appVersion);
        },
        // 将form中的值转换为键值对
        formJson: function(form) {
            var o = {};
            var a = $(form).serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        }
    };

    window.Tools = Tools;
})();
