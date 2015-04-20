//封装异步请求
(function() {
    var nodata = '<div class="nodata">暂无数据。</div>';
    var nomoredata = '<div class="nodata">没有更多数组。</div>';
    var csrftoken;

    /**
     * 接口基类
     */
    function Api(options) {
        this.options = options || {};
        //extends(options,this.options);
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

        for (var i in opt) {
            options[i] = options[i] || opt[i];
        }

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
            body = body.items;

            if (options.key == '-1') {
                //设置key=-1，所有返回值为分页数据
                body = response;
            }

            if (options.pagingMode == 'number') {
                if (!body || body.length == 0) {
                    //数据没有结果显示无数据提示
                    if (isFirst) {
                        $(options.renderEle).html(nodata);
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
                        $(options.renderEle).html(nodata);
                    }
                } else {
                    next.show();
                    that.render(options.renderEle, options.renderFor, body, !isFirst);
                    if (!that.hasNext) {
                        //没有下一页显示无更多数据提示
                        next.html(nomoredata);
                    } else {
                        options.nextButton && next.html(options.nextButton.text);
                    }
                }
            }

            if (typeof callback == 'function') {
                callback(response);
            }
        }, callbackError);
    };

    /**
     * 详情查询
     *
     * @param options-封装请求url，请求数据，请求类型，渲染容器，渲染模版
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

        for (var i in opt) {
            options[i] = options[i] || opt[i];
        }

        if (options.showLoading) {
            $(options.renderEle).html('<div class="loading">加载中...</div>');
        }

        that.ajaxSend(options, function(response, textStatus, jqXHR) {
            if (response.error) {
                $(options.renderEle).html(response.error);
                return;
            }
            var data = response[options.key] || {};
            if (data)
                render(options.renderEle, options.renderFor, data);
            if (typeof callback == 'function') {
                callback(response);
            }
        }, callbackError);
    };
    /**
     * 表单提交
     *
     * @param options-传入的参数
     * @param callback-请求成功后执行的回调方法
     * @param callbackError-请求失败后执行的回调方法
     */
    Api.prototype.submit = function(options, callback, callbackError) {
        var formData,
            that = this,
            isForm = !!options.data.length,
            btnSubmit;

        if (isForm) {
            formData = options.data.serializeArray();
            btnSubmit = options.data.find('[type="submit"]');
            btnSubmit.attr('disabled', true);
        } else {
            formData = options.data;
        }
        options.data = formData;
        options.type = options.type || 'POST';
        options.logtype = 'submit';

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
        var that = this;
        options = options || {};
        options.logtype = 'custom';

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
            $('#ti-loading').show();
        }

        //添加url参数csrftoken
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
            $('#ti-loading').hide();
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

    //判断对象是否为空
    function isEmpety(obj) {
        var flag = true;
        for (var i in obj) {
            flag = false;
            break;
        }

        return flag;
    }

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

    //准备滚动加载的数据
    function prepareData(data) {
        var prevData = [],
            moreData = [];
        for (var i in data) {
            if (i < data.length / 2) {
                prevData.push(data[i]);
            } else {
                moreData.push(data[i]);
            }
        }
        data = prevData;
        this.moreData = moreData;
        return data;
    }

    //初始化数字分页
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

    //抛出公用方法，保持模板调用入口唯一
    Api.prototype.render = render;
    Api.prototype.logged = logged;

    window.Ajax = new Api();
})();
