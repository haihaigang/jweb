define(function(require) {
    var $ = require('jquery'),
        config = require('./config'),
        Ajax = require('../base/ajax'),
        Tools = require('../base/tools');

    require('../base/common');
    require('../module/validator/local/zh_CN');

    var addressId = Tools.getQueryValue('adrId'),
        contractNo = Tools.getQueryValue('contractNo'); //合同编号

    $('input[name="addressId"]').val(addressId);

    //获取购物车数据
    Ajax.custom({
        url: config.goodsCartList
    }, function(response) {
        if (response.code != 0) {
            return;
        }
        var result = template.render('zj-cart-tmpl', {
            'list': response.body || []
        });
        $('#zj-cart').html(result);
        // contractNo = response.body.length; //回写合同编号
        $('#zj-contracts').val(contractNo);

        calculate(response.body);
    });

    //提交订单
    $('#order-form').validator({
        focusCleanup: true,
        msgWrapper: 'div',
        msgMaker: function(opt) {
            return '<span class="' + opt.type + '">' + opt.msg + '</span>';
        },
        fields: {
            "invPayee": {
                rule: "发票抬头: required;"
            },
            "invAddress": {
                rule: "收票地址: required;"
            }
        },
        //验证成功
        valid: function(form) {
            if (!contractNo) {
                Tools.showAlert('请选择一个合同');
                return;
            }

            Ajax.submit({
                url: config.addorder,
                data: $('#order-form'),
            }, function(response) {
                if (!response || response.code != 0) {
                    if(response.code == -4){
                        //库存不足
                        showStock(response.body);
                        Tools.showAlert(response.message || '库存不足');
                        return;
                    }
                	if(response.code == -7){
                        Tools.showConfirm({
                            message: '你的采购额度不足，可取消下单或追加申请额度后下单',
                            okText: '返回商城',
                            cancelText: '取消下单',
                            yesCallback: function() {
                                location.href = 'index.html';
                            },
                            noCallback: function(){
                                location.href = 'cart.html';
                            }
                        });
                		return;
                	}
                    Tools.showAlert(response.message);
                    return;
                }

                Tools.showAlert({
                    message: '感谢您的支持，您的订单已提交成功，<br/>请记住您的订单号: <span class="c-green">' + response.body.orderNo + '</span>',
                    okText: '返回商城',
                    tick: 5000,
                    showTips: true,
                    yesCallback: function() {
                        location.href = 'index.html';
                    },
                    tipsCallback: function(){
                        location.href = '../personal/my-order.html';
                    }
                });
            });
        }
    });

    //获取合同编号
    config.getContracts('', '', function() {
        $('#zj-contracts').val(contractNo);
    });

    //改变合同
    $('#zj-contracts').change(function() {
        contractNo = $(this).val();
    });

    //定义计算总价方法
    function calculate(data) {
        var totalPrice = 0;
        for (var i = 0; i < data.length; i++) {
            totalPrice += (parseInt(data[i].nums) * parseInt(data[i].price));
        }
        $('#total-price').text(totalPrice.toFixed(2));
    }

    //显示库存不足提示
    function showStock(data){
        for(var i in data){
            $('#goods-' + data[i].id).find('.stock').show();
        }
    }

});
