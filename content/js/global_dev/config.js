//debug
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
