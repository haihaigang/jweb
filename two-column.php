<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>个人中心</title>
	<link rel="stylesheet" href="../content/css/common.css" />
	<link rel="stylesheet" href="../content/css/personal.css" />
	<link rel="stylesheet" href="../content/css/personal-index.css" />
</head>
<body>
<div class="header">
    <div class="page-vertical">
        <a class="icon-logo" href="../"></a>
    </div>
</div><!--//header-->

<div class="section content-left-bg">
	<div class="page-vertical clearfix">
		<?php include '../com/nav-left.php'; ?>
		<div class="content-right"style="padding-top: 15px;">
			<div class="my-credit-info gray-box clearfix" id="zj-summary"></div>
			<div class="project-tuijian gray-box" style='display:none;'>
				<div class="tuijian-title">
					<span>XXXXX项目采购推荐</span>
					<button><a href="my-order.html">查看订单</a></button>
				</div>
				<div class="p-t-content clearfix">
					<ul>
						<li>商品名称：<span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span></li>
					</ul>
					<ul class="p-t-left">
						<li>合同编号：<span>xxxxxx</span></li>
						<li>订单金额：<span>xxxxxxxxxxxxxx</span></li>
					</ul>
					<ul class="p-t-right">
						<li>交货时间：<span>xxxxxx</span></li>
						<li>公司单位：<span>xxxxxx</span></li>
					</ul>
				</div>
			</div>
			<div class="product-tuijian gray-box">
			<div class="tuijian-title"><span>相关商品推荐</span></div>
				<ul class="clearfix" id="zj-list"></ul>
			</div>
		</div>
	</div>
</div>
<!--//section-->

<div class="footer">
    <div class="nav">
        <ul class="page-vertical clearfix">
            <li><a href="../">首页</a></li><li>
            <a href="../credit/">信用池</a></li><li>
            <a href="../mall/">基建商城</a></li><li>
            <a href="../wrt/">物融通</a></li><li>
            <a href="../customize/">定制专区</a></li><li>
            <a href="../jifen/">积分商城</a></li><li>
            <a href="../znsj/">数据智能</a></li><li>
            <a href="../ydwr/">移动物融</a></li><li>
            <a href="../project/">工程资讯</a></li><li>
            <a href="../news/">物融新闻</a></li>
        </ul>
    </div>
    <div class="helper">
        <div class="page-vertical clearfix">
            <ul class="helper-item">
                <li class="helper-title"><a href="../help/common-page.html?type=guide">采购指南</a></li>
                <li><a href="../help/common-page.html?type=guide&id=38">采购流程</a></li>
                <li><a href="../help/common-page.html?type=guide&id=39">配送方式</a></li>
                <li><a href="../help/common-page.html?type=guide&id=40">支付方式</a></li>
                <li><a href="../help/common-page.html?type=guide&id=41">会员制度</a></li>
                <li><a href="../help/common-page.html?type=guide&id=42">交易条款</a></li>
                <li><a href="../help/common-page.html?type=guide&id=43">积分说明</a></li>
                <li><a href="../help/common-page.html?type=guide&id=88">常见问题</a></li>
            </ul>
            <ul class="helper-item">
                <li class="helper-title"><a href="../help/common-page.html?type=service">售后服务</a></li>
                <li><a href="../help/common-page.html?type=service&id=103">售后政策</a></li>
                <li><a href="../help/common-page.html?type=service&id=102">返修与退换货</a></li>
                <li><a href="../help/common-page.html?type=service&id=36">信用B退还说明</a></li>
                <li><a href="../help/common-page.html?type=service&id=37">发票制度</a></li>
            </ul>
            <ul class="helper-item">
                <li class="helper-title"><a href="../help/index.html">帮助中心</li>
                <li><a href="../help/self-service.html">自助服务</a></li>
                <li><a href="../help/people-service.html">人工服务</a></li>
                <li><a href="../personal/my-security.html">安全中心</a></li>
            </ul>
            <ul class="helper-item">
                <li class="helper-title"><a href="../help/common-page.html?type=about">关于我们</a></li>
                <li><a href="../help/common-page.html?type=about#0">中交物融介绍</a></li>
                <li><a href="../help/common-page.html?type=about#1">物融新闻</a></li>
                <li><a href="../help/common-page.html?type=about#2">合作加盟</a></li>
                <li><a href="../help/common-page.html?type=about#3">下载中心</a></li>
                <li><a href="../help/common-page.html?type=about#4">联系我们</a></li>
            </ul>
        </div>
    </div>
    <div class="company">
    	<div class="page-vertical">
    		<span class="copyright-zh">中交物融集成服务平台有限公司&nbsp;&nbsp;版权所有&nbsp;&nbsp;浙AICP-42344534号-2号</span>
    		<span>&copy;Copyright2014 All Rights Reserved&nbsp;&nbsp;互联网基建平台&nbsp;&nbsp;产业链金融的贴身管家.</span>
    	</div>
    </div>
</div> <!--//footer-->

<div id="zj-panel" class="panel">
    <div class="panel-content">
        <div class="panel-cell">
            <h3 class="panel-title">提示</h3>
            <p class="panel-text"></p>
        </div>
    </div>
    <div class="panel-buttons">
        <div class="options">
            <a href="javascript:;" class="btn btn-ok">确定</a><a 
            href="javascript:;" class="btn btn-cancel">取消</a>
        </div>
        <div class="panel-tips">若在<span class="panel-tick">5</span>秒内无反应自动跳转到订单的详情页面</div>
    </div>
</div>
<div id="zj-panel-bg" class="panel-bg"></div>

<div id="zj-toast"><span></span></div>

<div id="zj-loading">
    <div class="loading">
        <div class="s-1"></div>
        <div class="s-2"></div>
        <div class="s-3"></div>
        <div class="s-4"></div>
    </div>
</div>

<div class="modal modal2" id="modal-login">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="modal-return">&lt;</button>
                <button class="modal-close">×</button>
                <h4 class="modal-title">登录</h4>
            </div>
            <div class="modal-body">
                <div class="login-form">
                    <form id="login-form">
                        <div class="input-un-border">
                            <label>用户名：</label>
                            <input type="text" name="account" placeholder="请输入用户名" maxlength="50" autocomplete="off" />
                            <ul class="login-history"></ul>
                        </div>
                        <div class="input-pw-border">
                            <label>密码：</label>
                            <input type="password" name="password" placeholder="请输入用密码" maxlength="50" />
                        </div>
                        <div class="input-rm">
                            <label><input type="checkbox" name="rememberMe" checked="checked" />记住密码</label>
                            <label><a href="javascrip:void(0);" id="findPwd">找回密码</a></label>
                        </div>
                        <div class="login-btn">
                            <button type="submit" class="button btn-secondary big">登录</button><button 
                            class="button btn-reg big" id="registerBtn">注册</button>
                        </div>
                    </form>
                </div>
                <div class="forget-form">
                    <form id="forget-form" class="form">
                        <div class="forget-phone">
                            <label>手机号：</label>
                            <input type="text" name="mobile" placeholder="请输入手机号" maxlength="11" />
                        </div>
                        <div class="forget-vcode">
                            <label>验证码：</label>
                            <input type="text" name="verifyCode" placeholder="请输入验证码" maxlength="6" />
                        </div>
                        <div class="forget-btn">
                            <input type="button" id="sendMsg" class="button btn-secondary big" value="发送验证码" />
                            <label></label>
                            <input type="submit" class="button btn-secondary big disabled" value="提交" disabled />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script id="zj-summary-tmpl" type="text/html">
	<div class="m-c-i-left">
		<div class="m-c-i-info clearfix">
			<div class="show-icon">
				<a href="my-info.html"><img class="user-icon" alt="" src="<!--[= $getUserIcon(icon)]-->" /></a>
			</div>
			<div class="m-c-i-text">
				<div><span class="gray-span">信用等级：</span><!--[= cusLevel || '--']--></div>
				<div><span class="gray-span">客户号：</span><!--[= cusFnum || '--']--></div>
				<div title="<!--[= cusName]-->"><span class="gray-span">客户名：</span><!--[= cusName || '--']--></div>
			</div>
		</div>
		<div class="m-c-i-btns">
			<a class="button btn-gray"  href="../credit/more.html">了解信用B</a>
			<a class="button btn-gray"  href="my-address.html">收货地址</a>
			<a class="button btn-primary" href="javascript:;">安全等级：高</a>
		</div>
	</div>
	<table width="100%" cellpadding="0" cellspacing="0" class="m-c-i-center">
		<tr>
			<td class="gray-span">总信用额度：</td>
			<td class="money"><!--[= $formatCurrency1(creAmtTot)]-->RMB</td>
		</tr>
		<tr>
			<td class="gray-span">可用总信用额度：</td>
			<td><!--[= $formatCurrency1(spendAmtTot)]-->RMB</td>
		</tr>
		<tr>
			<td class="gray-span">已使用信用额度：</td>
			<td><!--[= $formatCurrency1(lastAmtTot)]-->RMB</td>
		</tr>
		<tr>
			<td class="gray-span">已恢复信用额度：</td>
			<td><!--[= $formatCurrency1(restoreAmtTot)]-->RMB</td>
		</tr>
	</table>
	<div class="m-c-i-right">
		<a class="button btn-yellow" href='../credit/additional.html'>追加信用额度</a>
		<a class="button btn-secondary" href='my-creditb-bill.html'>票据兑换到期提醒</a>
		<a class="button btn-cgdd" href='my-creditb-history.html'>使用流水历史记录</a>
	</div>
</script>
<script id="zj-list-tmpl" type="text/html">
	<!--[for(i = 0; i < list.length; i ++) {]-->
		<li class="product-border">
			<div class="product-name"><a href="../mall/detail.html?id=<!--[= list[i].id]-->" title="<!--[= list[i].name]-->"><!--[= list[i].name || '--']--></a></div>
			<div class="products-img">
				<a href="../mall/detail.html?id=<!--[= list[i].id]-->" title="<!--[= list[i].name]-->"><img alt="" src="<!--[= $absImg(list[i].thumb)]-->"/></a>
			</div>
			<div class="product-infos">
				<div class="product-price clearfix">

					<div class="vip">
						<span class="price-label">交易单价</span><span 
						class="price-value"><!--[== $formatCurrency(list[i].vipPrice)]--></span><span 
						class="price-unit">&nbsp;信用B</span>
					</div>
					<div class="default">
						<span class="price-label factory">挂牌单价</span><span 
						class="price-value"><!--[== $formatCurrency(list[i].price)]--></span><span 
						class="price-unit">&nbsp;信用B</span>
					</div>
				</div>
				<div class="product-operate">
					<button class="operate-shoucang <!--[= (list[i].hasFavorites == '1' ? 'active' : '')]-->" data-id="<!--[= list[i].id]-->"><span>收藏</span></button>
					<button class="shop-product operate-cart" data-id="<!--[= list[i].id]-->">加入购物车</button>
				</div>
			</div>
		</li>
	<!--[}]-->
	</ul>
</script>

<script src="../content/js/module/seajs/2.2.0/sea.js"></script>
<script src="../content/js/module/seajs/2.2.0/sea-config.js"></script>
<script>
	seajs.use('../content/js/personal/index');
</script>

</body>
</html>