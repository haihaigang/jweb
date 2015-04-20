define(function(require, exports, module) {

    var config = require('../base/config');

    // config.server = location.protocol + '//' + 'www.3tixa.com:9901';

    config.getrdbrands = config.server + '/goods/getrdbrands';
    config.getAllCategory = config.server + '/goods/getAllCategory';
    config.getrdgoods = config.server + '/goods/getrdgoods';
    config.goodsCondition = config.server + '/goods/getSearchCondition';
    config.goodsSearch = config.server + '/goods/search';
    config.getDetail = config.server + '/goods/detail';
    config.getHistory = config.server + '/goods/historylist';
    config.getcommonList = config.server + '/goods/getcommonList';
    config.addCommon = config.server + '/goods/addCommon';
    config.addCart = config.server + '/goods/addCart';
    config.goodsCartList = config.server + '/goods/getcartList';

    config.favoritesSave = config.server + '/favorites/save';
    config.favoritesDelete = config.server + '/favorites/delete';
    
    config.iMyAddress = config.server+'/address/getlist';//收货地址列表
    config.iSaveAddress = config.server+'/address/save';//保存收货地址

    config.addorder = config.server+'/goods/addorder';//提交订单
    config.updateCart = config.server+'/goods/updateCart';//修改购物车商品数量
    config.getCartTotal = config.server+'/goods/getCartTotal';//获取购物车添加的商品数
    config.getCartLast = config.server+'/goods/getCartLast';//获取购物车最新商品
    config.getbuyamt = config.server+'/credit/getbuyamt';//获取可用采购额度
    config.searchdz = config.server + '/goods/searchdz';//大宗类搜索
    config.getFactoryList = config.server + '/global/getFactoryList';//
    config.getSimilar = config.server + '/goods/getSimilar';//同类商品推荐

    config.goodsFind = config.server + '/goods/find';//商品预览搜索
    config.goodsFindBP = config.server + '/goods/findbp';//标品类商品搜索
    config.goodsFindDZ = config.server + '/goods/finddz';//大宗类商品搜索

    //顶级分类数据
    config.topCategory = {
        '10000000': '钢材钢绞线系列',
        '20000000': '水泥、沥青、混凝土外加剂系列',
        '30000000': '锚具、锚杆系列',
        '40000000': '支座、伸缩缝、止水带系列',
        '50000000': '土工材料、塑料管材系列',
        '60000000': '工程机械、交通设施系列',
        '70000000': '科技产品系列'
    };

    //默认区域
    config.defaultArea = undefined;
    config.defaultArea1 = {
        id: 31,
        name: '浙江省'
    };

    //会员等级，0:网站注册会员，1 :ERP会员，2:ERP下单会员
    config.customLevel = {
        COMMON: 0,
        ERP: 1,
        ERPORDER: 2
    }

    module.exports = config;

});
