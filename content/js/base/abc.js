jQuery.extend({
    createUploadIframe: function(e, t) {
        var n = "jUploadFrame" + e,
            r = '<iframe id="' + n + '" name="' + n + '" style="position:absolute; top:-9999px; left:-9999px"';
        return window.ActiveXObject && (typeof t == "boolean" ? r += ' src="javascript:false"' : typeof t == "string" && (r += ' src="' + t + '"')),
            r += " />",
            jQuery(r).appendTo(document.body),
            jQuery("#" + n).get(0)
    },
    createUploadForm: function(e, t, n) {
        var r = "jUploadForm" + e,
            i = "jUploadFile" + e,
            s = jQuery('<form  action="" method="POST" name="' + r + '" id="' + r + '" enctype="multipart/form-data"></form>');
        if (n)
            for (var o in n) jQuery('<input type="hidden" name="' + o + '" value="' + n[o] + '" />').appendTo(s);
        var u = jQuery("#" + t),
            a = jQuery(u).clone();
        return jQuery(u).attr("id", i),
            jQuery(u).before(a),
            jQuery(u).appendTo(s),
            jQuery(s).css("position", "absolute"),
            jQuery(s).css("top", "-1200px"),
            jQuery(s).css("left", "-1200px"),
            jQuery(s).appendTo("body"),
            s
    },
    ajaxFileUpload: function(e) {
        e = jQuery.extend({},
            jQuery.ajaxSettings, e);
        var t = (new Date).getTime(),
            n = jQuery.createUploadForm(t, e.fileElementId, typeof e.data == "undefined" ? !1 : e.data),
            r = jQuery.createUploadIframe(t, e.secureuri),
            i = "jUploadFrame" + t,
            s = "jUploadForm" + t;
        e.global && !(jQuery.active++) && jQuery.event.trigger("ajaxStart");
        var o = !1,
            u = {};
        e.global && jQuery.event.trigger("ajaxSend", [u, e]);
        var a = function(t) {
            var r = document.getElementById(i);
            try {
                r.contentWindow ? (u.responseText = r.contentWindow.document.body ? r.contentWindow.document.body.innerHTML : null, u.responseXML = r.contentWindow.document.XMLDocument ? r.contentWindow.document.XMLDocument : r.contentWindow.document) : r.contentDocument && (u.responseText = r.contentDocument.document.body ? r.contentDocument.document.body.innerHTML : null, u.responseXML = r.contentDocument.document.XMLDocument ? r.contentDocument.document.XMLDocument : r.contentDocument.document)
            } catch (s) {
                jQuery.handleError(e, u, null, s)
            }
            if (u || t == "timeout") {
                o = !0;
                var a;
                try {
                    a = t != "timeout" ? "success" : "error";
                    if (a != "error") {
                        var f = jQuery.uploadHttpData(u, e.dataType);
                        e.success && e.success(f, a),
                            e.global && jQuery.event.trigger("ajaxSuccess", [u, e])
                    } else jQuery.handleError(e, u, a)
                } catch (s) {
                    a = "error",
                        jQuery.handleError(e, u, a, s)
                }
                e.global && jQuery.event.trigger("ajaxComplete", [u, e]),
                    e.global && !--jQuery.active && jQuery.event.trigger("ajaxStop"),
                    e.complete && e.complete(u, a),
                    jQuery(r).unbind(),
                    setTimeout(function() {
                            try {
                                jQuery(r).remove(),
                                    jQuery(n).remove()
                            } catch (t) {
                                jQuery.handleError(e, u, null, t)
                            }
                        },
                        100),
                    u = null
            }
        };
        e.timeout > 0 && setTimeout(function() {
                o || a("timeout")
            },
            e.timeout);
        try {
            var n = jQuery("#" + s);
            jQuery(n).attr("action", e.url),
                jQuery(n).attr("method", "POST"),
                jQuery(n).attr("target", i),
                n.encoding ? jQuery(n).attr("encoding", "multipart/form-data") : jQuery(n).attr("enctype", "multipart/form-data"),
                jQuery(n).submit()
        } catch (f) {
            jQuery.handleError(e, u, null, f)
        }
        return jQuery("#" + i).load(a), {
            abort: function() {}
        }
    },
    uploadHttpData: function(r, type) {
        var data = !type;
        return data = type == "xml" || data ? r.responseXML : r.responseText,
            type == "script" && jQuery.globalEval(data),
            type == "json" && eval("data = " + data),
            type == "html" && jQuery("<div>").html(data).evalScripts(),
            data
    }
});
var Pianke = {
        baseInit: function() {
            common_init(),
                Pianke.comment.init(),
                Pianke.search && Pianke.search.init()
        }
    },
    HAS_AUDIO = !!document.createElement("video").canPlayType;
$(function() {
        Pianke.baseInit(),
            window.noBase || pageInit()
    }),
    pageInit = function() {
        var e = location.pathname.split("/"),
            t = e[1].toString();
        switch (t) {
            case "index":
                Pianke.slider.init();
                break;
            case "home":
            case "draft":
            case "fav":
            case "feedtype":
            case "followed":
                Pianke.home.init(),
                    Pianke.draft.init(),
                    Pianke.user.init();
                break;
            case "talk":
                Pianke.talk.init();
                break;
            case "write":
                Pianke.write.init(),
                    Pianke.draft.init();
                break;
            case "writegposts":
                Pianke.writegposts.init();
                break;
            case "note":
                Pianke.note.init();
                break;
            case "wordcard":
            case "posts":
            case "card":
            case "cardrec":
                Pianke.wordcard.init(),
                    Pianke.slider.init(),
                    Pianke.draft.init(),
                    Pianke.detailpage.init(),
                    Pianke.write.init(),
                    Pianke.classic.init();
                break;
            case "timeline":
                Pianke.timeline.init(),
                    Pianke.user.init();
                break;
            case "album":
                Pianke.album.init();
                break;
            case "mobile":
                mobileAnimate();
                break;
            case "":
                defaultBgInit();
                break;
            case "reg":
            case "user":
                Pianke.reg.init(),
                    Pianke.user.init(),
                    Pianke.changePwd.init(),
                    Pianke.draft.init();
                break;
            case "bind":
                Pianke.Oauth.init();
                break;
            case "create":
            case "eposts":
                Pianke.create.init(),
                    Pianke.draft.init();
                break;
            case "profile":
                Pianke.user.init(),
                    Pianke.album.init(),
                    Pianke.wordcard.init(),
                    Pianke.timeline.init(),
                    Pianke.theater.init();
                break;
            case "theater":
            case "subject":
                Pianke.theater.init();
                break;
            case "public":
                Pianke.public.init();
                break;
            case "fposts":
                Pianke.topic.init(),
                    Pianke.detailpage.init(),
                    Pianke.draft.init();
                break;
            case "gposts":
                Pianke.writegposts.init();
                break;
            case "feeling":
                Pianke.topic.init();
                break;
            case "contribute":
                Pianke.contribute.init();
                break;
            case "message":
                Pianke.message.init();
                break;
            case "collect":
            case "topic":
                Pianke.collect.init();
                break;
            case "event":
                Pianke.the100th.init();
                break;
            case "read":
            case "reader":
            case "explore":
            case "writing":
                Pianke.read.init();
                break;
            case "ting":
                Pianke.ting.init();
                break;
            case "search":
                break;
            case "classic":
            case "cposts":
                Pianke.classic.init();
                break;
            default:
        }
    },
    Pianke.SendEmail = function(e) {
        $.ajax({
            type: "POST",
            data: "email=" + e,
            url: "../api/reg/resendemail",
            dataType: "json",
            success: function(e) {
                e.code == "A00000" ? alert("鍙戦€佹垚鍔燂紒") : alert(PKINFO.eCode[e.code])
            }
        })
    },
    window.console || (window.console = {
        log: function() {}
    }),
    window.alert = function(e) {
        var t = "poplayer",
            n = $("<div class='poplayer'>" + e + "</div>");
        $(document.body).append(n);
        var r = $(window).width(),
            i = $(window).height(),
            s = (r - n.width()) / 2 - 40 - 5,
            o = (i - n.height()) / 2 + $(document.body).scrollTop();
        n.hide().css({
                left: s,
                top: o
            }).fadeIn(500),
            setTimeout(function() {
                    $("body .poplayer").remove()
                },
                2e3)
    },
    window.confirm = function(e, t, n, r) {
        var i = $("#fix_confirm");
        i.show().find(".inner").text(e).end().find(".cancel").unbind("click").bind("click",
            function() {
                i.hide()
            }).end().find(".primary").unbind("click").bind("click",
            function() {
                t && t(),
                    i.hide()
            });
        if (n) {
            var s = i.find(".delete");
            i.css({
                    overflow: "visible",
                    position: "absolute"
                }),
                s.css({
                    left: $(window).width() / 2,
                    top: $(window).height() / 2
                })
        }
    },
    window.show_dialog = function(e, t, n) {
        if (!PKINFO.islogin) return !1;
        var r = $(".layer_friend"),
            i = e.data.data.user,
            s = e.data.data.relation.star,
            o = s ? "鍙栨秷鍏虫敞" : "鍏虫敞",
            u = s ? "listen_c" : "listen_a",
            a = s ? "" : "follow";
        r.css(t).show().find("h2").text(i.uname),
            r.find("h2").parent().attr("href", "/profile/" + n),
            r.find(".name").attr("href", "/profile/" + n),
            r.find(".avatar").attr("src", i.icon),
            r.find(".follow_btn").removeClass("follow").addClass(a).attr("data-id", n),
            r.find("span").text(o).end().find("strong").removeClass("listen_a listen_c").addClass(u)
    },
    window.hide_dialog = function() {
        $(".layer_friend").hide()
    },
    window.msg_modal = function(e, t) {
        t = t || 1e3,
            el = $("<div class='delete radius i_delete' style='display:none'><div class='btn_control'><p  class='blue'>" + e + "</p></div></div>"),
            $("body").append(el.fadeIn()),
            setTimeout(function() {
                    el.fadeOut(2e3,
                        function() {
                            $(".delete.i_delete").remove()
                        })
                },
                t)
    },
    common_init = function() {
        var e = ".lbox a,.self li a,.create_content .image a,.create_content .images a,.model li a,.own .user a,.author a,.d_user_img a",
            t = !1,
            n = ".content .open,.create_content .open,.i_picture",
            r = ".content,.create_content";
        backToTop(),
            $(window).height() >= $("body").height() && ($(".footer").css({
                position: "absolute"
            }), $("body").css("height", $(window).height())),
            $(n).live("click",
                function() {
                    var e = $(this),
                        t = e.parents(r),
                        n = t.find(".long,.short"),
                        i = e.hasClass("down"),
                        s = i ? "灞曞紑" : "鏀惰捣",
                        o = e.attr("href") + (e.find("a").length ? e.find("a").attr("href") : "");
                    /\//.test(o) || (e.hasClass("i_picture") && (e = t.find(".open")), e.text(s).toggleClass("down"), n.toggle())
                });
        if (window.location.pathname == "/app/ting.php") {
            var i = function() {
                    var e = $(".app_hot p img").attr("src"),
                        t = $(".app_bg .hot_btn a:first").attr("data-src"),
                        n = $(".app_bg .hot_btn a:last").attr("data-src");
                    e = e == t ? n : t,
                        $(".app_hot p img").attr("src", e),
                        $(".app_bg .hot_btn a").toggleClass("current")
                },
                s = setInterval(i, 5e3);
            $(".app_bg .hot_btn a").bind("click",
                function() {
                    clearInterval(s);
                    var e = $(this).attr("data-src");
                    $(".app_hot p img").attr("src", e),
                        $(".app_bg .hot_btn a").removeClass("current"),
                        $(this).addClass("current"),
                        s = setInterval(i, 5e3)
                })
        }
        $(".fake_enter").live("click",
                function() {
                    if (!PKINFO.islogin) openlogintip();
                    else {
                        var e = $(this),
                            t = e.parent().find(".true_enter");
                        e.hide(),
                            t.show(),
                            t.find("textarea,input").focus()
                    }
                }),
            $(document).bind("scroll",
                function() {
                    $(window).height() <= $("body").height() && $(".footer").attr("style", "")
                }),
            $(document).click(function(e) {
                $(e.target).parents(".bq,.tjbq,.choose_log").length || $(".bq,.log_list").hide()
            }),
            $(".report").live("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    var e = $(this).attr("data-id");
                    $(".report_layer").show().data("content_id", e)
                }),
            $(".report_layer .checkbox_other").click(function() {
                $(".reason_entry").toggle($(this).is(":checked"))
            }),
            $(".report_layer .close,.report_layer .cancel_btn").bind("click",
                function() {
                    $(".report_layer").hide()
                }),
            $(".report_layer .save_btn").bind("click",
                function() {
                    var e = "/api/report/add.php",
                        t = "%$$%",
                        n = $(".report_layer"),
                        r = $(".report_layer textarea"),
                        i = n.data("content_id"),
                        s = r.val();
                    s = s.length ? t + s : "",
                        $.post(e, {
                                content_id: i,
                                reason: $.map($(".checkbox:checked"),
                                    function(e) {
                                        return e.value
                                    }).join(t) + s
                            },
                            function(e) {
                                e.code == "A00000" ? (n.hide(), r.val(""), $(".checkbox:checked").attr("checked", !1)) : showerrortip(e.data.msg)
                            },
                            "json")
                }),
            $(".new_bigindex .i_new_main .list_content").hover(function() {
                    $(this).data("close") || ($(this).find(".cover").css("opacity", 1).hide().fadeIn(200), $(this).data("close", !0))
                },
                function() {
                    $(this).data("close") && ($(this).find(".cover").dequeue().hide(), $(this).data("close", !1))
                }),
            $("#fix_layer_login_form").submit(function(e) {
                e.preventDefault(),
                    Pianke.LayerLogin.clickOnRegBtn()
            }),
            $(".layer_friend").hover(function() {
                    t = !0
                },
                function() {
                    t = !1,
                        setTimeout(function() {
                                t || hide_dialog()
                            },
                            150)
                }),
            $(e).live("mouseenter",
                function() {
                    if (location.pathname.split("/")[1].toString() == "ting" || !PKINFO.islogin) return !1;
                    t = !0;
                    var e = $(this),
                        n = e.find("img"),
                        r = $(".layer_friend:first"),
                        i = r.height() + 15,
                        s = n.height() + 9,
                        o = n.offset().top - $("body").scrollTop() - $(".header").height() > i,
                        u = {
                            top: o ? n.offset().top - i : n.offset().top + s,
                            left: n.offset().left
                        },
                        a = e.attr("href").replace(/http:\/\/|https:\/\//, "").split("/")[2];
                    if (PKINFO.uinfo.uid == a) return !1;
                    $.getJSON("/api/user/get", {
                            fuid: a
                        },
                        function(e) {
                            show_dialog(e, u, a)
                        })
                }).live("mouseleave",
                function() {
                    t = !1,
                        setTimeout(function() {
                                t || hide_dialog()
                            },
                            150)
                }),
            $(".follow_btn").live("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    var e = $(this),
                        t = e.hasClass("follow"),
                        n = e.attr("data-id"),
                        r = e.attr("data-type"),
                        i = r ? "/api/follow/" : "/api/attention/",
                        s = Math.floor(Math.random() * 9999999999),
                        o = i + (t ? "follow" : "unfollow"),
                        u = t ? "鍙栨秷鍏虫敞" : "鍏虫敞",
                        a = {
                            type: r,
                            rand: s
                        },
                        f = r ? "cid" : "staruids";
                    a[f] = n;
                    if (e.hasClass("gray")) return !1;
                    e.addClass("gray"),
                        Pianke.user.get_attention(e, o, a,
                            function() {
                                e.toggleClass("follow").find("span").text(u).end().find("strong").toggleClass("listen_a listen_c")
                            })
                }),
            Pianke.emotion.init(),
            $("#send_mail,.open_msg_dialog").bind("click",
                function() {
                    var e = $(this),
                        t = e.hasClass("open_msg_dialog"),
                        n = t ? $(".layer_friend .follow_btn").attr("data-id") : $(".follow_btn[data-id]").attr("data-id"),
                        r = t ? $(".layer_friend h2").text() : $(".approve h2").text();
                    initMailBox(r, n)
                }),
            $(".f_secret .widthg94").live("click",
                function() {
                    $(this).parents(".f_secret").remove()
                }),
            $(".f_secret .close").live("click",
                function() {
                    if ($(this).parents(".layer_vcode").length) return;
                    $(this).parents(".f_secret").remove()
                }),
            $(".f_secret textarea,.s_entry textarea").live("keyup",
                function() {
                    var e = $(this).val(),
                        t = e.length,
                        n = 500,
                        r = n - t;
                    r >= 0 ? $(".f_secret .point_text,.s_entry .point_text").html("杩樺彲浠ヨ緭鍏�<span>" + r + "</span>瀛�</p>") : $(".f_secret .point_text,.s_entry .point_text").html('宸茬粡瓒呰繃<span class="red">' + -r + "</span>瀛�</p>")
                }),
            $(".judge-recommend .click-all").live("click",
                function() {
                    var e = $(this),
                        t = e.parents(".judge-recommend").find(".judge-word"),
                        n = ["<<鏀惰捣", "鏌ョ湅鍏ㄩ儴 >>"],
                        r = t.filter(":last").is(":visible");
                    t.not(":first").toggle(!r),
                        e.find("a").text(n[Number(r)])
                }),
            $(".f_secret .width94").live("click",
                function() {
                    var e = $(this).parents(".f_secret"),
                        t = e.find("textarea").val(),
                        n = e.data("uid"),
                        r = 500;
                    if (t.length > r) return alert("鐗囬偖姝ｆ枃闄愬埗" + r + "瀛椾互鍐�"), !1;
                    $.trim(t).length && $.post("/api/message/send", {
                            withuid: n,
                            content: t
                        },
                        function(e) {
                            e.code == "A00000" ? ($(".f_secret").remove(), msg_modal("鐗囬偖鍙戦€佹垚鍔燂紒")) : alert(PKINFO.eCode[e.code])
                        },
                        "json")
                }),
            $("#love,.love").live("click",
                function() {
                    var e = $(this);
                    $.post("/api/attitude/love.php", {
                            id: e.attr("data-id")
                        },
                        function(t) {
                            t.code == "A00000" ? e.find(".number").text(t.data.data.love) : t.code == "A00001" ? openlogintip() : showerrortip(t.data.msg)
                        },
                        "json")
                }),
            $(".icon .like,.like_btn").live("click",
                function() {
                    var e = $(this),
                        t = e.parents(".icon").attr("data-id") || e.attr("data-id"),
                        n = e.attr("data-type");
                    t && submitlike(t, e, n)
                })
    },
    submitlike = function(e, t, n) {
        var r = location.pathname.split("/")[1] == "posts" && !n;
        if (PKINFO.islogin != 1) return openlogintip(), !1;
        if ("" == e || "undefined" == typeof e) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
        var i = {
            id: e,
            isdetail: r ? 1 : 0,
            type: 1
        };
        return $.post("/api/attitude/like.php", i,
            function(e) {
                e.data.data.canReview && init_recommend_box(e.data.data.contentid),
                    addlikeswitch = !0;
                switch (e.code) {
                    case "A00001":
                        return openlogintip(), !1;
                    case "A00000":
                        var n = e.data.data.good;
                        return n = n ? n : "",
                            t.find(".number,.num").text(n).show(),
                            t.parents("li").find(".good_number").text(n + "璧�"),
                            r && (info = Pianke.detailpage.get_info(e), $(".arrow_opend .arrow_people").data("info", info), Pianke.detailpage.open_like_list(!0)), !0;
                    default:
                        return showerrortip(e.data.msg), !1
                }
            },
            "json"), !0
    },
    hide_recommend_box = function() {
        $("#article-recommend-box").hide()
    },
    init_recommend_box = function(e) {
        var t = $("#article-recommend-box");
        t.length || ($("body").append(get_article_recommend_box()), t = $("#article-recommend-box"), t.attr("data-id", e), t.find(".re-cancel,.cl").bind("click",
            function() {
                hide_recommend_box()
            }).end().find("textarea").bind("focus",
            function() {
                $(this).next("span").hide()
            }).end().find(".re-ok").bind("click",
            function() {
                var e = t.find("textarea").val();
                n({
                    contentid: t.attr("data-id"),
                    comment: e,
                    ifcomment: $("#submit_as_comment:checked").length
                })
            }).end().find(".recommend-word span").bind("click",
            function() {
                t.find("textarea").focus()
            }));
        var n = function(e) {
            var n = t.find("textarea").val();
            if (!n.length) {
                alert("鍐呭涓嶈兘涓虹┖");
                return
            }
            $.post("/api/attitude/addReview.php", e,
                function(e) {
                    e.code == "A00000" ? (alert("鍙戦€佹垚鍔燂紒"), hide_recommend_box(), t.find("textarea").val(""), t.find(".recommend-word span").show()) : showerrortip(e.data.msg)
                },
                "json")
        };
        t.show().attr("data-id", e)
    },
    get_article_recommend_box = function() {
        return '<div id="article-recommend-box" class="article-recommend"> <div class="recommend-title">鎺ㄨ崘濂藉唴瀹� <span>浣犳槸[鐬籡寰界珷鐢ㄦ埛锛�<a target="_blank" href="/public/help.php#medal">浜嗚В鏇村</a></span> <a href="javascript:void(0);" class="cl"></a></div> <div class="recommend-word"><textarea></textarea> <span>鐪嬪埌濂藉唴瀹癸紝鍐欎笅浣犵殑鎺ㄨ崘璇紝鍒嗕韩缁欐洿澶氱墖瀹㈠惂</span></div> <div class="recommend-more"><input type="checkbox" id="submit_as_comment" checked>  <label for="submit_as_comment" class="css-label">鍚屾椂浣滀负璇勮鍙戝嚭</label><span class="re-action"><button name="re-ok" class="re-ok">鎻愪氦</button> <button name="re-cancel" class="re-cancel">鍙栨秷</button> </span> </div> </div>'
    },
    mobileAnimate = function() {
        var e = $(".app_hot a"),
            t = $(".hot_btn a"),
            n = e.length,
            r = null,
            i = 5e3,
            s = function(o) {
                clearTimeout(r);
                var u = $(e).filter(":eq(" + o + ")"),
                    a = $(e).not(":eq(" + o + ")");
                if (u.is(":visible")) return;
                u.fadeIn(1e3),
                    a.fadeOut(1e3),
                    t.removeClass("current").filter(":eq(" + o + ")").addClass("current"),
                    r = setTimeout(function() {
                            o += 1,
                                o >= n && (o = 0),
                                s(o)
                        },
                        i)
            };
        t.bind("click",
            function() {
                var e = $(this).index();
                s(e)
            })
    },
    defaultBgInit = function() {
        var e = $("#defaultBg").attr("src");
        $.backstretch(e)
    },
    initMailBox = function(e, t) {
        if (PKINFO.islogin != 1) return openlogintip(), !1;
        var n = $("<div class='f_secret' style='display:none'><div class='box'><a href='javascript:void(0);' class='close'></a><div class='case'><h2>鍙戠墖閭粰锛�<span>" + e + "</span></h2><textarea></textarea><div class='but'><p class='point_text'>杩樺彲浠ヨ緭鍏�<span>500</span>瀛�</p><a class='widthg94'>鍙栨秷</a><a class='width94'>鍙戦€�</a></div></div></div></div>");
        $("body").append(n),
            n.data("uid", t),
            $(".f_secret").show().find("textarea").focus()
    },
    jQuery.handleError = jQuery.handleError ||
    function(e, t, n, r) {
        e.error && e.error.call(e.context || e, t, n, r),
            e.global && (e.context ? jQuery(e.context) : jQuery.event).trigger("ajaxError", [t, e, r])
    };
Pianke.read = {
    GET_WRITING_URL: "/api/writing/debuts.php",
    fall_canload: !0,
    on_writing: /writing/.test(location.pathname),
    _cur_page: 1,
    cur_num: 0,
    cur_type: 0,
    cur_page: 1,
    contentid: "",
    total_count: 0,
    is_max: !1,
    is_loading: !1,
    cur_play: {},
    cur_info: {},
    play_st: 0,
    list_length: 0,
    on_move: !1,
    url: "/api/read/list?type=",
    slidt_st: null,
    timmer: 1e4,
    listened_counter: {},
    articles: [],
    init: function() {
        that = this,
            /explore|writing|read/.test(location.pathname.split("/")[1]) ? that.indexEvent() : (that.initView(), that.fetchData(that.contentid), that.bindEvent(), that.list_resize()),
            $(".slide-list").length && (that.slidt_st = setTimeout(function() {
                    that.next_slide()
                },
                that.timmer))
    },
    indexEvent: function() {
        var e = this;
        $(document).scroll(function() {
                $(document).height() <= $(window).height() + $(window).scrollTop() + 20 && e.fall_canload && e.fall_load_more()
            }),
            $(".story-category .filter-tabs .tab").bind("click",
                function() {
                    index = $(this).index(),
                        $(".story-category .filter-tabs li").removeClass("on").filter(":eq(" + index + ")").addClass("on"),
                        $(".story-category .bd ul").hide().filter(":eq(" + index + ")").show()
                }),
            $(".slide-btns").find(".slide-prev,.slide-next").bind("click",
                function() {
                    var t = $(this),
                        n = t.hasClass("slide-prev"),
                        r = $(".slide-list li"),
                        i = r.filter(":visible").index(),
                        s = r.length;
                    i += n ? -1 : 1,
                        i >= s ? i = 0 : i < 0 && (i = s - 1),
                        e.select_slide(i)
                }),
            $(".slide-controls .dots li").bind("click",
                function() {
                    var t = $(this).index();
                    e.select_slide(t)
                }),
            $(".t_left .tag a").bind("click",
                function() {
                    var e = $(this).attr("data-id");
                    $(".tag_cont").hide().filter('[data-id="' + e + '"]').show(),
                        $(".tag a").removeClass("current"),
                        $(this).addClass("current")
                }),
            $(".p_nav a").bind("click",
                function() {
                    var e = $(this),
                        t = e.attr("data-type"),
                        n = e.parents(".piece6");
                    n.find(".p_nav a").removeClass("current").end().find(".p_box").hide().filter("[data-type=" + t + "]").show(),
                        e.addClass("current")
                }),
            $(".hot_author .hot_btn .r_icon,.hot_anchor .hot_btn .r_icon").bind("click",
                function() {
                    var e = $(this).hasClass("up"),
                        t = $($(this).parents(".hot_author")[0] || $(this).parents(".hot_anchor")[0]),
                        n = t.find(".hot_cont");
                    Pianke.home.suggest_slider(e, n, n)
                }),
            $(".p_box_bg .p_box:first li").hover(function() {
                    $(this).data("close") || ($(this).find(".cover").css("opacity", 1).hide().fadeIn(200), $(this).data("close", !0))
                },
                function() {
                    $(this).data("close") && ($(this).find(".cover").dequeue().hide(), $(this).data("close", !1))
                })
    },
    initView: function() {
        $(".r_card").attr("title", "杩炶浇"),
            $.ajaxSetup({
                cache: !1
            }),
            window.HAS_AUDIO ? ($(".mp3_player").remove(), this.cur_play = document.getElementById("playerAudio")) : $(".m_player").remove(),
            this.contentid = location.hash.replace("#", "")
    },
    fall_load_more: function() {
        var e = this;
        e.fall_canload && e.on_writing && ($("#loading").show(), e.fall_canload = !1, e._cur_page += 1, $.getJSON(e.GET_WRITING_URL, {
                page: e._cur_page,
                _: Math.floor(Math.random() * 999999)
            },
            function(t) {
                $("#loading").hide(),
                    t.data.data.ended ? (showerrortip("宸茬粡琚綘娴忚瀹屼簡锛屼紤鎭竴涓嬪惂锝�"), e.fall_canload = !1) : ($(".main_cont").append(t.data.data.html), e.fall_canload = !0)
            }))
    },
    bindEvent: function() {
        var e = this;
        $(document).ajaxSuccess(function() {
                e.update_counter()
            }),
            $("html").bind("keydown",
                function(t) {
                    switch (t.keyCode) {
                        case 37:
                            e.prev_page();
                            break;
                        case 39:
                            e.next_page()
                    }
                }),
            $(window).bind("resize",
                function() {
                    e.list_resize()
                }),
            $(".get_comment").bind("click",
                function() {
                    el = $(this),
                        hei = el.offset().top,
                        $("html,body").delay(100).animate({
                                scrollTop: hei
                            },
                            200)
                }),
            $(".read_l a[r_type]").bind("click",
                function() {
                    var t = $(this),
                        n = t.attr("r_type");
                    if (n == e.cur_type) return !1;
                    e.cur_type = n,
                        e.cur_page = 1,
                        e.is_max = !1,
                        e.articles = [],
                        e.total_count = 0,
                        e.fetchData(),
                        $(".read_l_cont ul").empty(),
                        $(".head_read li a[r_type]").removeClass().filter("[r_type=" + n + "]").addClass("current")
                }),
            $(".read_l_cont li").live("click",
                function(t) {
                    var n = $(this),
                        r = parseInt(n.attr("data-id"), 10),
                        i = $(t.target).hasClass("sing");
                    e.render_detail(r, i)
                }),
            $(".read_l_cont").bind("scroll",
                function() {
                    var t = $(this),
                        n = t.scrollTop(),
                        r = t.find("ul").height(),
                        i = t.height() + n;
                    if (i + 200 >= r) {
                        if (e.is_loading) return !1;
                        e.fetchData()
                    }
                }),
            $(".but_ico.random").bind("click",
                function() {
                    e.random_detail()
                }),
            $(".but_ico.up").bind("click",
                function() {
                    e.prev_page()
                }),
            $(".but_ico.down").bind("click",
                function() {
                    e.next_page()
                }),
            $(".but_ico.switch").bind("click",
                function() {
                    var e = $(".read_l"),
                        t = -e.width() - 1;
                    e.animate({
                            left: t
                        },
                        200)
                }),
            $(".like_btn").bind("click",
                function() {
                    var e = $(this),
                        t = $(".read_r").attr("data-id"),
                        n = e.attr("data-type");
                    submitlike(t, e, n)
                }),
            $(".social").bind("click",
                function() {
                    e.share_to_sns(this)
                }),
            $(".unfold").bind("click",
                function() {
                    $(".read_l").animate({
                            left: 0
                        },
                        200)
                }),
            $(".m_player .progress").bind("click",
                function(t) {
                    num = t.offsetX,
                        curtime = num / 100 * e.cur_play.duration,
                        e.cur_play.currentTime = curtime,
                        $(".progress_bar").width(num + "%"),
                        e.play_music()
                }),
            $(".m_player .play").bind("click",
                function() {
                    e.play_music()
                }),
            $(".m_player .pause").bind("click",
                function() {
                    e.cur_play.pause(),
                        $(".m_player .play").show(),
                        $(".m_player .pause").hide()
                })
    },
    get_url: function(e, t) {
        return e = e || 0,
            t = t || 1,
            contentid = this.contentid,
            that.url + e + "&page=" + t + "&contentid=" + contentid
    },
    fetchData: function(e) {
        that = this,
            get_url = that.get_url(that.cur_type, that.cur_page);
        if (that.is_max) return !1;
        $(".loading").show(),
            that.is_loading = !0,
            $.getJSON(get_url,
                function(t) {
                    t.data && !t.data.data.length ? that.is_max = !0 : $(".but_ico.down").show(),
                        $(".loading").hide(),
                        that.is_loading = !1;
                    var n = t.data.data,
                        r = [];
                    $.each(n,
                            function() {
                                var e = 1;
                                r.push(this),
                                    this.type == "album" && this.detail.contentlist.length && (e = _length = this.detail.contentlist.length, r = r.concat(Array(_length - 1))),
                                    that.list_length += e
                            }),
                        that.articles = that.articles.concat(r),
                        that.render_list(n),
                        that.cur_page == 1 && that.render_detail(0, !1, e),
                        5,
                        that.cur_page++
                })
    },
    random_detail: function() {
        this.articles = Shuffle(this.articles),
            $(".read_l_cont ul").empty(),
            this.render_list(this.articles),
            this.render_detail(0)
    },
    render_list: function(e) {
        var t = e,
            n = $(".read_list"),
            r = this;
        $.each(t,
                function() {
                    var e = r.create_list_item(this).addClass("read_item");
                    n.append(e)
                }),
            $(".read_l_cont li:first").addClass("first")
    },
    create_list_item: function(e) {
        return e.type == "default" ? el = this.create_default(e.detail) : e.type == "album" && (el = this.create_album(e.detail)),
            el
    },
    create_album: function(e) {
        var t = e.albumInfo,
            n = this,
            r = t.title,
            r = r ? n.cut_str(r, 16) : "鏃犻",
            i = t.userinfo.uname,
            s = $("#mul_list_temp").clone().removeAttr("id"),
            o = "";
        return s.attr("data-id", n.total_count).find(".album_info").find("h3").text(r).end().find("p").text("by锛�" + i),
            $.each(e.contentlist,
                function(e) {
                    o += '<li data-id="' + n.total_count + '"><a href="javascript:void(0);"><p>' + this.title + "</p>",
                        this.musicUserInfo.uid && (o += '<span class="but_ico sing" title="涓绘挱"></span>'),
                        o += "</a></li>",
                        n.total_count++
                }),
            s.find(".r_up_read").hide().find("ul").html(o),
            s
    },
    create_default: function(e) {
        var t = e.title,
            t = t ? that.cut_str(t, 16) : "鏃犻",
            n = e.userinfo.uname,
            r = $("#template_box .list_temp").clone().removeAttr("class");
        return r.attr("data-id", that.total_count),
            r.find("h3").text(t),
            r.find("p").text("by锛�" + n),
            r.find(".sing").hide(),
            e.musicUserInfo && e.musicUserInfo.uid && r.find(".sing").show().attr("title", "涓绘挱"),
            that.total_count++,
            r
    },
    prev_page: function() {
        if (this.cur_num == 0) return;
        this.cur_num--,
            this.render_detail(this.cur_num)
    },
    next_page: function() {
        if (this.cur_num == this.articles.length - 1) {
            if (that.is_loading) return !1;
            that.fetchData()
        } else this.cur_num++,
            this.render_detail(this.cur_num)
    },
    get_data: function(e) {
        var t = 1,
            n = this,
            r = {},
            s = n.articles,
            e = e.length ? e : parseInt(e, 10);
        if (typeof e != "string")
            if (typeof e != "number" || e < 0 || s.length == 0) return !1;
        if (typeof e == "string") {
            if (s[0].type == "default") r = s[0].detail;
            else if (s[0].type == "album") {
                contentlist = s[0].detail.contentlist,
                    i = 0;
                for (li in contentlist) {
                    if (contentlist[li].contentid == e) {
                        r = contentlist[li],
                            this.cur_num = i;
                        break
                    }
                    i++
                }
            }
            r.contentid || (e = 0)
        }
        if (!r.contentid)
            if (s[e]) s[e].type == "default" ? r = s[e].detail : s[e].type == "album" && (r = s[e].detail.contentlist[0]);
            else
                while (r || e < 0) {
                    if (s[e] && s[e].type == "album") {
                        r = s[e].detail.contentlist[t - 1];
                        break
                    }
                    e -= 1,
                        t += 1;
                    if (t > 50) return
                }
        return r
    },
    render_detail: function(e, t, n) {
        this.cur_num = e;
        var r = $(".read_r").fadeIn(),
            i = this.get_data(n ? n : e),
            s = i.contentid,
            o = i.userinfo,
            u = i.imgUrl,
            a = i.content,
            f = "url(" + u + ")",
            l = $(".fillmoreInner"),
            c = l.css("background-image"),
            h = i.musicUrl,
            p = i.musicUserInfo,
            d = i.musicVisit,
            t = t ? t : !1;
        this.cur_play && (this.cur_play.src = ""),
            e = this.cur_num,
            $(".progress_bar").width(0),
            this.update_visit(s),
            location.hash = s,
            i.musicUserInfo && i.musicUserInfo.uid && $(".host_name").attr("href", "/profile/" + i.musicUserInfo.uid).text(i.musicUserInfo.uname),
            $(".music_info").fadeOut(),
            $(".comment_list,.ajax_fenye").empty(),
            $("html,body").animate({
                    scrollTop: 0
                },
                200),
            $(".play_count").text(i.musicVisit),
            this.full_userinfo(o),
            this.full_content(i),
            this.slider_animate(e),
            $(".recid_input").attr("id", "recid_" + s),
            $(".reuid_input").attr("id", "reuid_" + s),
            r.attr("data-id", s),
            $(".entry").hide().find(".send,textarea").attr("data-id", s),
            $(".icon5.fav_btn").attr("f-contentid", s),
            h && ($(".music_info").fadeIn(), this.edit_player(h, p, d, t, s)),
            c && !c.match(u) && (l.fadeOut(300,
                function() {
                    $(this).remove()
                }), $("body").append($("<div></div>").addClass("fillmoreInner").hide().css("background-image", f).fadeIn(500))),
            e == 0 ? $(".but_ico.up").hide() : e == that.list_length ? ($(".but_ico.down").hide(), this.fetchData()) : $(".but_ico.up,.but_ico.down").show(),
            Pianke.comment.getcomment($(".entry"), 0, 1, !0, !0)
    },
    slider_animate: function(e) {
        var t = $(".read_l_cont li[data-id=" + e + "]:first");
        t.hasClass("read_item") || (t = t.parents(".read_item"));
        var n = t.find(".r_idea");
        t.siblings().find(".r_up_read").hide(),
            $(".r_idea").removeClass("current"),
            $(".read_l_cont li").removeClass("current").filter("[data-id=" + e + "]").addClass("current"),
            n.addClass("current").find(".r_up_read").show()
    },
    full_content: function(e) {
        var t = $(".r_content"),
            n = $(".get_comment .number"),
            r = $(".like_btn .number"),
            i = $(".fav_btn .number"),
            s = $(".fav_btn"),
            o = $(".detail_title a"),
            u = $(".article_content p"),
            a = $(".from_type"),
            f = $(".r_name"),
            l = $(".r_time"),
            c = $(".essay"),
            h = $(".follow_btn"),
            p = $(".icon .tag"),
            d = e.relation.isStar;
        i.remove(),
            r.text(e.counter.like || ""),
            s.addClass(e.isFav ? "on" : "").text(e.isFav ? "鍙栨秷鏀惰棌" : "鏀惰棌").append('<span class="number">' + (e.counter.fav || "") + "</span>"),
            n.text(e.counter.comment || ""),
            o.text(e.title || "鏃犻").attr("href", e.content_url),
            u.html(e.content),
            a.text(e.from).attr("href", e.from_url),
            f.text(e.userinfo.uname),
            l.text(e.time.addtime_f),
            e.userinfo.uid == PKINFO.uinfo.uid ? h.hide() : (h.attr("data-id", e.userinfo.uid).find("span").text(d ? "鍙栨秷鍏虫敞" : "鍏虫敞").end()[0].className = "follow_btn " + (d ? "" : "follow"), d ? h.find("strong").removeClass("listen_a").addClass("listen_c") : h.find("strong").removeClass("listen_c").addClass("listen_a")),
            p.empty(),
            $.map(e.styles,
                function(e) {
                    p.append("<span>#" + e + "</span>")
                }),
            e.remark && e.remark.length ? c.show().find(".contents").html(e.remark) : c.hide()
    },
    share_to_sns: function(e) {
        var t = e.className.split(" ")[1],
            n = $(".detail_title a").attr("href"),
            r = $.trim(this.cut_str($(".article_content p").text(), 90)),
            i = "",
            s = $(".detail_title a").text();
        redirect_to_sns(t, n, r, i, !0, s)
    },
    update_counter: function() {
        var e = this,
            t = e.get_data(e.cur_num),
            n = $(".fav_btn .number").text() || 0,
            r = $(".like_btn .number").text() || 0,
            i = $(".get_comment .number").text() || 0,
            s = !$(".follow_btn").hasClass("follow"),
            o = $(".follow_btn").attr("data-id");
        t && (t.counter = {
                card: 0,
                comment: i,
                fav: n,
                like: r
            },
            t.isFav = $(".fav_btn").hasClass("on"), t.relation.isStar = s, $.map(e.articles,
                function(e) {
                    e && e.type == "default" && e.detail.userinfo.uid == o && (e.detail.relation.isStar = s)
                }))
    },
    full_userinfo: function(e) {
        $(".anthor_news").find(".name_t").attr("href", "/profile/" + e.uid).end().find("h3").text(e.uname).end().find(".name_t img").attr("src", e.icon).end().find("p").html(e.desc).end().find(".att").attr("data-id", e.uid)
    },
    cut_str: function(e, t) {
        return e.length < t ? e : e.substr(0, t) + "..."
    },
    update_visit: function(e) {
        var t = "/visit/read/" + e;
        $.post(t, {},
            function(e) {
                return !0
            })
    },
    edit_player: function(e, t, n, r, i) {
        var s = "",
            o = "http://pkstatic.b0.upaiyun.com/swf/singlemp3player.swf";
        if (t.uid)
            if (window.HAS_AUDIO) {
                var u = this.cur_play;
                u.src = e,
                    u.setAttribute("data-id", i),
                    clearInterval(this.play_st),
                    $(".m_player .play").show(),
                    $(".m_player .pause").hide(),
                    r && (this.play_music(), this.send_listencount(), this.listened_counter[i] = !0)
            } else params = o + "?file=" + e + "&repeatPlay=true&songVolume=100&frontColor=827bb4",
                params += "&autoStart=" + r + "&contentId=" + i,
                $(".mp3_player").empty().html('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="145" height="20" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="wmode" value="transparent"><param name="movie" value="' + params + '"><embed wmode="transparent" width="145" height="30" src="' + params + '" pluginspage="http://www.macromedia.com/go/getflashplayer"></object>')
    },
    play_music: function() {
        var e = this,
            t = e.cur_play;
        t.play(),
            $(".m_player .play").hide(),
            $(".m_player .pause").show(),
            clearInterval(e.play_st),
            e.listened_counter[t.getAttribute("data-id")] || (e.send_listencount(), e.listened_counter[t.getAttribute("data-id")] = !0),
            e.play_st = setInterval(function() {
                    e.show_progress(t)
                },
                33)
    },
    show_progress: function(e) {
        var e = e || this.cur_play;
        $(".progress_bar").width(Math.floor(100 * (e.currentTime / e.duration)) + "%"),
            e.duration && e.currentTime == e.duration && (e.currentTime = 0, this.send_listencount(), this.listened_counter[e.getAttribute("data-id")] = !0)
    },
    next_slide: function() {
        var e = $(this),
            t = e.hasClass("slide-prev"),
            n = $(".slide-list li"),
            r = n.filter(":visible").index(),
            i = n.length;
        r += 1,
            r >= i && (r = 0),
            that.select_slide(r)
    },
    select_slide: function(e) {
        that = this;
        if (that.on_move) return;
        clearInterval(that.slidt_st),
            that.on_move = !0,
            next = $(".slide-list .slide-item:eq(" + e + ")"),
            prev = $(".slide-list .slide-item:visible"),
            bool = e > prev.index(),
            width = $(".slide-item").width(),
            timmer = 500,
            next.show().css({
                left: width * (bool ? 1 : -1)
            }).animate({
                    left: 0
                },
                timmer),
            prev.animate({
                    left: width * (bool ? -1 : 1)
                },
                timmer,
                function() {
                    that.on_move = !1,
                        prev.hide(),
                        that.slidt_st = setTimeout(function() {
                                that.next_slide()
                            },
                            that.timmer)
                }),
            $(".slide-controls .dots li").removeClass("active").filter(":eq(" + e + ")").addClass("active")
    },
    send_listencount: function() {
        var e = this.cur_play.getAttribute("data-tingid");
        $.getJSON("container=" + e,
            function(e) {
                $(".play_count").text(e.data.data)
            })
    },
    list_resize: function() {
        $(".read_l_cont").height($(window).height() - $(".head_read").height())
    }
};
Pianke.emotion = {
    EMOTION_BASE_URL: "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/",
    init: function(e) {
        this.bindEvent()
    },
    bindEvent: function() {
        var e = this;
        $(".tjbq").live("click",
                function() {
                    var t = $(this),
                        n = t.find(".emotionlist");
                    n.length ? n.fadeIn() : e.createBox(t)
                }),
            $(".emotionlist li a").live("click",
                function() {
                    var t = $(this),
                        n = t.find("img")[0].title;
                    e.commentinsertemotion(t, n)
                }),
            $(".emotionlist .closed").live("click",
                function() {
                    el = $(this),
                        el.parents(".emotionlist").hide(),
                        el.parents(".post_item").removeClass("zindex"),
                        /commentbox/.test(location.pathname) && el.parents("li").removeClass("zindex")
                })
    },
    createBox: function(e) {
        var t = "",
            n = e.parent();
        $.each(this.lists,
                function() {
                    var e = this.name,
                        n = Pianke.emotion.EMOTION_BASE_URL + this.url;
                    t += '<li><a href="javascript:void();" ><img title="' + e + '" alt="' + e + '" src="' + n + '"></a></li>'
                }),
            list = $("<div class='bq emotionlist'></div>").html('<div class="jt"></div><div class="detailbox"><div class="closed"><a href="javascript:void(0);"></a></div><div class="detail"><ul node-type="inner" class="faces_list clearfix"></ul></div></div>'),
            list.find("ul").html(t),
            n.find(".emotionlist").remove(),
            n.append(list),
            list.fadeIn(100,
                function() {
                    n.find(".emotionlist").show(),
                        list.show()
                }),
            e.parents(".post_item,.create_content").addClass("zindex"),
            /commentbox/.test(location.pathname) && e.parents("li").addClass("zindex")
    },
    commentinsertemotion: function(e, t) {
        return $(".fake_enter").hide(),
            $(".true_enter").show(),
            e.parents(".entry,.enter,.m_write").find("textarea").insertAtCaret("[" + t + "]"),
            $(".emotionlist").remove(), !0
    },
    lists: {
        smilea: {
            name: "鍛靛懙",
            url: "ac/smilea_thumb.gif"
        },
        tootha: {
            name: "鍢诲樆",
            url: "0b/tootha_thumb.gif"
        },
        laugh: {
            name: "鍝堝搱",
            url: "6a/laugh.gif"
        },
        tza: {
            name: "鍙埍",
            url: "14/tza_thumb.gif"
        },
        kl: {
            name: "鍙€�",
            url: "af/kl_thumb.gif"
        },
        kbsa: {
            name: "鎸栭蓟灞�",
            url: "a0/kbsa_thumb.gif"
        },
        cj: {
            name: "鍚冩儕",
            url: "f4/cj_thumb.gif"
        },
        shamea: {
            name: "瀹崇緸",
            url: "6e/shamea_thumb.gif"
        },
        zy: {
            name: "鎸ょ溂",
            url: "c3/zy_thumb.gif"
        },
        bz: {
            name: "闂槾",
            url: "29/bz_thumb.gif"
        },
        bs2: {
            name: "閯欒",
            url: "71/bs2_thumb.gif"
        },
        lovea: {
            name: "鐖变綘",
            url: "6d/lovea_thumb.gif"
        },
        sada: {
            name: "娉�",
            url: "9d/sada_thumb.gif"
        },
        heia: {
            name: "鍋风瑧",
            url: "19/heia_thumb.gif"
        },
        qq: {
            name: "浜蹭翰",
            url: "8f/qq_thumb.gif"
        },
        sb: {
            name: "鐢熺梾",
            url: "b6/sb_thumb.gif"
        },
        mb: {
            name: "澶紑蹇�",
            url: "58/mb_thumb.gif"
        },
        ldln: {
            name: "鎳掑緱鐞嗕綘",
            url: "17/ldln_thumb.gif"
        },
        yhh: {
            name: "鍙冲摷鍝�",
            url: "98/yhh_thumb.gif"
        },
        zhh: {
            name: "宸﹀摷鍝�",
            url: "6d/zhh_thumb.gif"
        },
        x: {
            name: "鍢�",
            url: "a6/x_thumb.gif"
        },
        cry: {
            name: "琛�",
            url: "af/cry.gif"
        },
        wq: {
            name: "濮斿眻",
            url: "73/wq_thumb.gif"
        },
        t: {
            name: "鍚�",
            url: "9e/t_thumb.gif"
        },
        k: {
            name: "鎵撳搱娆�",
            url: "f3/k_thumb.gif"
        },
        bba: {
            name: "鎶辨姳",
            url: "27/bba_thumb.gif"
        },
        angrya: {
            name: "鎬�",
            url: "7c/angrya_thumb.gif"
        },
        yw: {
            name: "鐤戦棶",
            url: "5c/yw_thumb.gif"
        },
        cza: {
            name: "棣嬪槾",
            url: "a5/cza_thumb.gif"
        },
        88: {
            name: "鎷滄嫓",
            url: "70/88_thumb.gif"
        },
        sk: {
            name: "鎬濊€�",
            url: "e9/sk_thumb.gif"
        },
        sweata: {
            name: "姹�",
            url: "24/sweata_thumb.gif"
        },
        sleepya: {
            name: "鍥�",
            url: "7f/sleepya_thumb.gif"
        },
        sleepa: {
            name: "鐫¤",
            url: "6b/sleepa_thumb.gif"
        },
        money: {
            name: "閽�",
            url: "90/money_thumb.gif"
        },
        sw: {
            name: "澶辨湜",
            url: "0c/sw_thumb.gif"
        },
        cool: {
            name: "閰�",
            url: "40/cool_thumb.gif"
        },
        hsa: {
            name: "鑺卞績",
            url: "8c/hsa_thumb.gif"
        },
        hatea: {
            name: "鍝�",
            url: "49/hatea_thumb.gif"
        },
        gza: {
            name: "榧撴帉",
            url: "36/gza_thumb.gif"
        },
        dizzya: {
            name: "鏅�",
            url: "d9/dizzya_thumb.gif"
        },
        bs: {
            name: "鎮蹭激",
            url: "1a/bs_thumb.gif"
        },
        crazya: {
            name: "鎶撶媯",
            url: "62/crazya_thumb.gif"
        },
        h: {
            name: "榛戠嚎",
            url: "91/h_thumb.gif"
        },
        yx: {
            name: "闃撮櫓",
            url: "6d/yx_thumb.gif"
        },
        nm: {
            name: "鎬掗獋",
            url: "89/nm_thumb.gif"
        },
        hearta: {
            name: "蹇�",
            url: "40/hearta_thumb.gif"
        },
        unheart: {
            name: "浼ゅ績",
            url: "ea/unheart.gif"
        },
        pig: {
            name: "鐚ご",
            url: "58/pig.gif"
        },
        ok: {
            name: "ok",
            url: "d6/ok_thumb.gif"
        },
        ye: {
            name: "鑰�",
            url: "d9/ye_thumb.gif"
        },
        good: {
            name: "good",
            url: "d8/good_thumb.gif"
        },
        no: {
            name: "涓嶈",
            url: "c7/no_thumb.gif"
        },
        z2: {
            name: "璧�",
            url: "d0/z2_thumb.gif"
        },
        come: {
            name: "鏉�",
            url: "40/come_thumb.gif"
        },
        sad: {
            name: "寮�",
            url: "d8/sad_thumb.gif"
        },
        lazu: {
            name: "铚＄儧",
            url: "91/lazu_thumb.gif"
        },
        cake: {
            name: "铔嬬硶",
            url: "6a/cake.gif"
        },
        clock: {
            name: "閽�",
            url: "d3/clock_thumb.gif"
        },
        m: {
            name: "璇濈瓛",
            url: "1b/m_thumb.gif"
        }
    }
};
Pianke.reg = {
    init: function() {
        if (/changepwd|setemail/.test(location.pathname)) return;
        this.bindEvent()
    },
    bindEvent: function() {
        var e = this,
            t = ".registerform";
        $(t + " input").focus(function() {
                e.getFocus(this)
            }).live("blur",
                function() {
                    e.loseFocus(this)
                }),
            $("form").bind("submit",
                function(t) {
                    t.preventDefault(),
                        e.checkAll() && e.register()
                }),
            $("#submit_find_pwd").click(function(t) {
                t.preventDefault();
                var n = $("#email");
                if (!e.emailTest()) return $("#nobody").slideDown(200).text("閭欢鏍煎紡閿欒"), !1;
                if ($.trim(n.val()) == "" || $.trim(n.val()) == "璇疯緭鍏ユ偍娉ㄥ唽鏃跺～鍐欑殑閭") return $("#nobody").slideDown(200).text("閭涓嶈兘涓虹┖"), !1;
                e.submitData()
            }),
            $("#resend").click(function(e) {
                Pianke.SendEmail($(this).attr("data")),
                    e.preventDefault()
            }),
            $("#register_btn").bind("click",
                function(t) {
                    t.preventDefault(),
                        t.stopPropagation();
                    if ($(this).hasClass("login_gray")) return !1;
                    e.clickOnRegBtn()
                }),
            $("#read").bind("click",
                function(e) {
                    $("#read:checked").length ? $("#register_btn").removeClass("login_gray") : $("#register_btn").addClass("login_gray")
                }),
            /login/.test(location.pathname) && $('input[type="password"]').live("keydown",
                function(e) {
                    e.keyCode == 13 && Pianke.reg.user_login()
                }),
            $("#email").focus(function() {
                var e = $(this),
                    t = e.val();
                e.removeClass("gray1"), (t == PKINFO.defText.email || e.val() == "甯哥敤閭" || t == "璇疯緭鍏ユ偍娉ㄥ唽鏃跺～鍐欑殑閭") && e.val("")
            }).blur(function() {
                el = $(this),
                    el.addClass("gray1"),
                    el.val() == "" && (text = $(".wrapper").hasClass("resetx") ? PKINFO.defText.find_password : PKINFO.defText.email, /reg/.test(location.pathname) && text == "閭" && (text = "甯哥敤閭"), el.val(text))
            }),
            $("#password").focus(function() {
                $(".password_tips").hide()
            }).blur(function() {
                $(this).val().length == 0 && $(".password_tips").show()
            }),
            $('input[type="password"]').focus(function() {
                $(this).removeClass("gray1")
            }).blur(function() {
                $(this).addClass("gray1"),
                    $(this).val() == "" && ($("#n_password").show(), $("#n_password").val(PKINFO.defText.password))
            }),
            $("#login_btn").bind("click",
                function(t) {
                    t.preventDefault(),
                        e.user_login()
                })
    },
    user_login: function() {
        var e = $.trim($("#email").val()),
            t = $.trim($("#password").val()),
            n = $("#fromurl").val() || "";
        if (e == "" || e == PKINFO.defText.email || t == "") return;
        $.ajax({
            url: "../api/user/login",
            type: "POST",
            data: {
                passwd: t,
                email: e,
                fromurl: n
            },
            dataType: "json",
            success: function(e) {
                e.code != "A00000" ? ($("#err_password").html(PKINFO.eCode[e.code]).show, $("#err_password").fadeIn()) : window.location = e.data.redirect
            }
        })
    },
    clickOnRegBtn: function() {
        var e = this;
        e.checkAll() && e.register()
    },
    getFocus: function(e) {
        var t = this,
            e = $(e),
            n = e.attr("id");
        e.parent().prev().hide();
        switch (n) {
            case "nickname":
                t.msg("4-30浣嶅瓧绗︼紝涓嫳鏂囧潎鍙�", n);
                break;
            case "email":
                t.msg("寰堥噸瑕侊紝楠岃瘉鍚庢柟鍙櫥褰曠墖鍒�", n);
                break;
            case "password":
            case "n_password":
                t.msg("6-20浣嶅瓧绗︼紝鍖哄垎澶у皬鍐�", "password");
                break;
            default:
        }
    },
    loseFocus: function(e) {
        var t = this,
            e = $(e);
        setTimeout(function() {
                $.trim(e.val()).length == 0 && (e.parent().prev().show(), e.val("")),
                    t.check(e)
            },
            100)
    },
    check: function(e) {
        if (!e) return;
        var t = this,
            n = e.attr("id"),
            r = $.trim(e.val());
        switch (n) {
            case "nickname":
                if (r == "") return t.msg("鏄电О涓嶈兘涓虹┖", n), !1;
                t.name_isuniq(e);
                if (r.replace(/[^\x00-\xff]/g, "**").length < 4 || r.replace(/[^\x00-\xff]/g, "**").length > 30) return t.msg("鏄电О闀垮害涓�4-30浣嶅瓧绗�", n), !1;
                break;
            case "email":
                var i = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;
                if (r.length == 0 || r == "甯哥敤閭") return t.msg("閭涓嶈兘涓虹┖", n), !1;
                if (!i.test(r)) return t.msg("閭鏍煎紡閿欒", n), !1;
                $.post("/api/reg/checkemail", {
                        email: r
                    },
                    function(e) {
                        if (e.data.msg) return t.msg(e.data.msg, n), !1
                    },
                    "json");
                break;
            case "password":
                n = "password";
                if (r == "") return t.msg("瀵嗙爜涓嶈兘涓虹┖", n), !1;
                if (r.length < 6 || r.length > 20) return t.msg("瀵嗙爜闀垮害涓�6-20浣嶅瓧绗�", n),
                    $(this).val(""), !1;
                t.msg("", n, !0);
                break;
            default:
                return !0
        }
        return t.msg("", n, !0), !0
    },
    msg: function(e, t, n) {
        n = n || !1,
            n ? $("#err_" + t).html(e).slideUp(200) : $("#err_" + t).html(e).slideDown(200)
    },
    checkAll: function() {
        var e = this,
            t = e.check($("#nickname")),
            n = e.check($("#password")),
            r = e.check($("#email"));
        return t && n && r ? !0 : !1
    },
    register: function() {
        var e = this,
            t = $.trim($("#nickname").val()),
            n = $.trim($("#email").val()),
            r = $.trim($("#password").val());
        if (!$("#read:checked")) {
            alert("璇峰厛闃呰骞跺悓鎰忎娇鐢ㄥ崗璁�");
            return
        }
        $("#register_btn").addClass("login_gray"),
            $.ajax({
                url: "../api/reg/reg",
                type: "POST",
                data: "email=" + n + "&uname=" + t + "&passwd=" + r,
                dataType: "json",
                success: function(t) {
                    t.code != "A00000" ? (e.msg(PKINFO.eCode[t.code], "password"), $("#register_btn").removeClass("login_gray")) : window.location = "gotoemail.php?email=" + n
                }
            })
    },
    submitData: function() {
        var e = $("#email"),
            t = $("#nobody");
        if ($.trim(e.val()) == "") return;
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/api/user/findpwd",
            data: "email=" + $.trim(e.val()),
            success: function(e) {
                e.code != "A00000" ? t.show().html(PKINFO.eCode[e.code]) : window.location = e.data.redirect
            }
        })
    },
    emailTest: function() {
        var e = $("#email"),
            t = $("nobody"),
            n = /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i,
            r = e.val();
        return !n.test(r) && $.trim(r) != "" && $.trim(r) != "璇疯緭鍏ユ偍娉ㄥ唽鏃跺～鍐欑殑閭" ? (t.show().html("閭鏍煎紡閿欒"), !1) : (t.hide(), !0)
    },
    name_isuniq: function(e) {
        var t = $.trim(e.val()),
            n = this;
        $.post("/api/reg/checkuname", {
                uname: t
            },
            function(e) {
                e.code == "A00202" && n.msg(e.data.msg, "nickname")
            },
            "json")
    }
};
Pianke.comment = {
        first_loaded: !1,
        is20: !1,
        init: function() {
            this.bindEvent(),
                $("#comment_isdetail").length != 0 && (this.is20 = !0)
        },
        bindEvent: function() {
            var e = this;
            $(".get_comment").live("click",
                    function() {
                        var e = $(this).parent().next();
                        $(".arrow_people").hide();
                        if (!e.length || !e.hasClass("entry")) e = $(this).parents(".own,.create_content,.detail_comment,.list_block").find(".cont,.arrow_top,.detail_comment").show().end().find(".entry"), !e.length && /create/.test(location.pathname) && ($(".detail_comment").show(), e = $(".entry"));
                        Pianke.comment.getcomment(e, 0, 1, !0)
                    }),
                $(".entry .send,.entry .sendn,.m_send").live("click",
                    function() {
                        e.submitcomment($(this))
                    }),
                $(".close_comment_box").live("click",
                    function() {
                        $(this).hide().prev().hide()
                    }),
                $(".ajax_fenye a").live("click",
                    function(t) {
                        t.preventDefault(),
                            t.cancelBubble = !0;
                        var n = $(this).attr("href").match(/page=(\d+)/),
                            r = $(this).parents(".entry,.message_box"),
                            i = $(".message_box").length ? "nj" : "";
                        return n && e.getcomment(r, 1, n[1], !0, !0, i), !1
                    }),
                $(".you_reply .close").live("click",
                    function() {
                        var e = $(".send").attr("data-id");
                        $(".you_reply").hide(),
                            $("#recid_" + e).val(""),
                            $("#reuid_" + e).val("")
                    }),
                $(".entry .sort a").live("click",
                    function() {
                        var t = $(this).attr("data-sort"),
                            n = $(this).parents(".entry");
                        $(".entry .sort a").removeClass("sort_current"),
                            $(this).addClass("sort_current"),
                            n.data("sort", t),
                            e.getcomment(n, 1, 1, !0, !0)
                    }),
                $(".comment_reply").live("click",
                    function() {
                        var t = $(this),
                            n = t.hasClass("m_reply"),
                            r = t.attr("data-type"),
                            i = t.parents("li,.create_content").first(),
                            s = n ? $(".m_text textarea") : t.parents(".entry").find("textarea"),
                            o = t.attr("data-id"),
                            u = t.parents("li").find(".comment_user_name"),
                            a = $.trim(u.text()) + ":",
                            f = n ? t.parents("li").attr("data-id") : i.attr("data-id"),
                            l = n ? $(".m_send").attr("data-id") : s.attr("data-id"),
                            c = r == "quote";
                        /@/.test(a) || (a = "@" + a),
                            $(".fake_enter").hide(),
                            $(".true_enter").show(),
                            e.replycomment(l, f, o, a, s, c);
                        if (c) {
                            var i = t.parents(".create_content"),
                                h = i.find(".word_article p").text(),
                                p = i.find(".images a"),
                                d = p.attr("href"),
                                a = p.attr("title"),
                                v = i.find(".blockquote");
                            v.length && (h = h.replace(v.text(), "")),
                                $(".you_reply").show().find("li").html("<span class='quote_text'>" + h + "</span> - <a href='" + d + "'>" + a + "</a><a href='javascript:void(0)' class='close'></a>"),
                                s.focus()
                        }
                    })
        },
        getcomment: function(e, t, n, r, i, s) {
            var o = e,
                u = o.find(".comment_list"),
                a = o.find("textarea"),
                f = o.find(".pagination"),
                l = o.find(".send,.sendn,.m_send").attr("data-id"),
                c = e.prev(".arrow_top"),
                h = e.data("sort"),
                p = this;
            if ("" == l || "undefined" == typeof l) return !1;
            PKINFO.islogin != 1 && location.pathname.split("/")[1] != "create" ? (tips = '<div class="login_point"><p><a href="/user/login.php">绔嬪嵆鐧诲綍</a>鍙備笌璇勮锛岄€夋嫨鍏跺畠甯愬彿鐧诲綍锛�<a href="/oauth/sina/" class="login_ico sina" title="鏂版氮寰崥"></a><a href="/oauth/qq/" class="login_ico qzone" title="鑵捐QQ"></a><a href="/oauth/renren/" class="login_ico renren" title="浜轰汉缃�"></a><a href="/oauth/douban/" class="login_ico douban" title="璞嗙摚缃�"></a></p></div>', o.find(".texta,.add,.send,textarea").hide(), o.find(".login_point").length || o.find("input:last").after(tips)) : o.find(".texta,.add,.send,textarea").show();
            var d = $("#type_" + l).val() || 1;
            if ("" == d || "undefined" == typeof d) return !1;
            if ("" == n || "undefined" == typeof n) n = 1;
            if (t != 1) {
                var v = e.is(":visible");
                if (!!v) return o.hide(),
                    c.hide(),
                    o.next(".cl").hide(), !1;
                o.show(),
                    o.next(".cl").show(),
                    c.show(),
                    i || a.focus()
            }
            var m = p.is20 ? 20 : 10;
            $(".message_box").length && (m = 5);
            var g = {
                contentid: l,
                type: d,
                page: n,
                pagesize: m,
                sort: h,
                from: s || "",
                _: (new Date).valueOf()
            };
            return $.getJSON("/api/comment/get.php", g,
                function(e) {
                    if (e.code != "A00000") return !1;
                    u.show(),
                        u.html(e.data.list),
                        e.data.pagehtml != "" && f.show().html(e.data.pagehtml),
                        p.first_loaded && (r || $("html,body").scrollTop(o.offset().top - 100)),
                        p.first_loaded = !0
                }), !0
        },
        submitcomment: function(e) {
            var t = e.attr("data-id"),
                n = e.hasClass("m_send") ? $(".message_box") : e.parents(".entry"),
                r = n.find("textarea"),
                i = r.val(),
                s = n.find(".comment_list"),
                o = n.prev().find(".get_comment .number"),
                u = $("#recid_" + t).val(),
                a = $("#reuid_" + t).val();
            s = s.find("ul").length ? s.find("ul") : s;
            if ("" == t || "undefined" == typeof t) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
            if ("" == i || "undefined" == typeof i) return showerrortip("鎶辨瓑锛屽唴瀹逛笉鑳戒负绌猴紒"), !1;
            o.length == 0 && (o = $(n).parents(".own").find(".get_comment .number"));
            var f = {
                contentid: t,
                content: i,
                recid: u,
                reuid: a
            };
            return $(".you_reply").length && (f.from = "quote"),
                e.hasClass("m_send") && (f.from = "nj"),
                addcommentswitch = !1,
                $.post("/api/comment/add.php", f,
                    function(e) {
                        addcommentswitch = !0;
                        switch (e.code) {
                            case "A00001":
                                return openlogintip(), !1;
                            case "A00000":
                                r.val(""),
                                    $("#recid_" + t).val(""),
                                    $("#reuid_" + t).val(""),
                                    s.show(),
                                    e.data.data.num == 1 ? s.html(e.data.data.list) : f.from == "quote" ? s.append(e.data.data.list) : s.prepend(e.data.data.list);
                                var n = o.html();
                                if ("" == n || "undefined" == typeof n || isNaN(n)) n = 0;
                                return n = parseInt(n) + 1,
                                    n = isNaN(n) ? 1 : n,
                                    o.html(n).removeClass("no"),
                                    $(".you_reply").hide(), !0;
                            default:
                                return showerrortip(e.data.msg), !1
                        }
                    },
                    "json"), !0
        },
        replycomment: function(e, t, n, r, i, s) {
            return $("#recid_" + e).val(t),
                $("#reuid_" + e).val(n),
                $(".msg_input").hide().find("textarea").parents(".msg_input").show(),
                s || i.focus().val("鍥炲 " + r), !1
        }
    },
    $.fn.insertAtCaret = function(e) {
        return this.each(function() {
            var t = this;
            if (document.selection) t.focus(),
                sel = document.selection.createRange(),
                sel.text = e,
                t.focus();
            else if (t.selectionStart || t.selectionStart == "0") {
                var n = t.selectionStart,
                    r = t.selectionEnd,
                    i = t.scrollTop;
                t.value = t.value.substring(0, n) + e + t.value.substring(r, t.value.length),
                    t.focus(),
                    t.selectionStart = n + e.length,
                    t.selectionEnd = n + e.length,
                    t.scrollTop = i
            } else t.value += e,
                t.focus()
        })
    };
Pianke.draft = {
    DEFAULT_TITLE: "濡傛灉闇€瑕佹爣棰橈紝閭ｅ氨鍐欏湪杩欏効鍚�",
    DRAFT_SUBMIT: "/api/draft/submit",
    st: null,
    draft_params: !1,
    init: function() {
        this.bindEvent(),
            $("#editor").length && (this.st = setInterval(this.save_draft, 1e4))
    },
    bindEvent: function() {
        var e = this;
        $(".more_link .save_btn").bind("click",
                function(t) {
                    t.preventDefault(),
                        clearInterval(e.st),
                        e.save_draft(function() {
                            location.href = "/draft"
                        })
                }),
            $(".preview_btn").bind("click",
                function(t) {
                    t.preventDefault(),
                        e.preview_form()
                }),
            $(".operating .o_cancel").bind("click",
                function(t) {
                    t.preventDefault(),
                        $(".title input").val() != e.DEFAULT_TITLE || $(".write textarea").val().length > 0 ? confirm("纭鍙栨秷鍚楋紵鏈繚瀛樻暟鎹細涓㈠け锛�",
                            function() {
                                e.back_to_index()
                            }) : e.back_to_index()
                }),
            $(".delDraft,.submitDraft").bind("click",
                function() {
                    var e = $(this),
                        t = e.hasClass("submitDraft"),
                        n = t ? "/api/draft/addposts" : "/api/draft/deldraft",
                        r = e.parents(".cont,.create_content"),
                        i = t ? "鍙戝竷鎴愬姛" : "鑽夌鍒犻櫎鎴愬姛",
                        s = t ? "鎻愪氦" : "鍒犻櫎",
                        o = $(".draft_icon .m_num"),
                        u = {
                            id: e.parents(".icon").attr("data-id")
                        },
                        a = function(e) {
                            e.code == "A00000" && (r.slideUp(function() {
                                r.remove()
                            }), o.text(parseInt(o.text(), 10) - 1), msg_modal(i, 2e3))
                        };
                    u.id || (u.id = e.attr("data-id")),
                        t ? $.post(n, u, a, "json") : confirm("纭" + s + "璇ヨ崏绋�?",
                            function() {
                                $.post(n, u, a, "json")
                            })
                })
    },
    save_draft: function(e) {
        var t = this,
            n = Pianke.draft.get_params();
        if (!Pianke.draft.match_params(n) || $("#isupdate").val()) return !1;
        $(".process").show(),
            $.ajax({
                url: "/api/draft/submit",
                type: "POST",
                data: n,
                dataType: "json",
                success: function(n) {
                    $(".process").hide(),
                        e && e(),
                        clearInterval(Pianke.draft.st),
                        t.st = setInterval(function() {
                                Pianke.draft.save_draft()
                            },
                            1e4)
                }
            })
    },
    preview_form: function() {
        var e = "<form action='/postpreview/preview.php' target='_blank' method='post' id='previewForm'>";
        $.each(this.get_params(),
                function(t, n) {
                    e += "<input type='hidden' name='" + t + "' value='" + n + "'/>"
                }),
            e += "</form>",
            $("#previewForm").remove(),
            $("body").append(e),
            $("#previewForm").submit()
    },
    match_params: function(e) {
        var t = !1,
            n = this.draft_params;
        return n ? ($.each(e,
            function(e, r) {
                n[e] != r && (t = !0)
            }), this.draft_params = e) : (this.draft_params = e, t = !0), !0
    },
    back_to_index: function() {
        var e = $("#wordcardid").length ? $("#wordcardid").val() : $("#topic_id").val(),
            t = location.pathname.split("/")[1];
        /create|eposts/.test(t) ? location.href = "/create/" + $("#createid").val() : location.href = "/" + location.pathname.split("/")[1] + "/" + e
    },
    get_params: function() {
        var e = $(".title_input").val() || "",
            t = $.map($(".tag_choose .tag_name"),
                function(e, t) {
                    return $.trim($(e).text())
                }).join(","),
            e = e == this.DEFAULT_TITLE ? "" : e,
            n = $("input[name=copyright]:checked").val(),
            r = Pianke.write;
        return param = {
                fromid: $("#fromid").val(),
                postsfrom: $("#postsfrom").val(),
                title: e,
                draftid: $("#draftid").val(),
                content: UE.getEditor("editor").getContent() || "",
                tags: $.map($(".tag_choose .tag_name"),
                    function(e, t) {
                        return $.trim($(e).text())
                    }).join(","),
                copyright: n || 1,
                copyright_desc: n == 2 ? $("#copyright_desc").val() : ""
            },
            param.songid = r.$search_data[r.cur_song_index],
            param.songid ? param.songid = param.songid.id : window.musicConf && (param.songid = musicConf.songid),
            param
    }
};
Pianke.contribute = {
    URLMP3: "",
    init: function() {
        this.bindEvent()
    },
    bindEvent: function() {
        var that = this;
        $("#feeling_submit").bind("click",
                function() {
                    var e = "/api/contribute/add.php",
                        t = "feeling",
                        n = $("#title").val(),
                        r = $("#content").val(),
                        i = $.map($("a[name=pics]"),
                            function(e) {
                                return $(e).attr("href")
                            }).join(","),
                        s = {
                            type: t,
                            title: n,
                            content: r,
                            pic: i,
                            story: $("#story").val()
                        };
                    n && r && i && $.post(e, s,
                        function(e) {
                            if (e.code == "A00000") return alert("鎶曠鎴愬姛锛岃嫢琚噰鐢ㄥ皢鍙﹁閫氱煡鎮紝璋㈣阿鎮ㄥ鐗囧埢鐨勬敮鎸侊紒"),
                                setTimeout(function() {
                                        location.reload()
                                    },
                                    "2500"), !0;
                            alert(e.data.msg)
                        },
                        "JSON")
                }),
            $("#appscreen_submit").bind("click",
                function() {
                    var e = "/api/contribute/add.php",
                        t = "appscreen",
                        n = $("#content").val(),
                        r = $.map($("a[name=pics]"),
                            function(e) {
                                return $(e).attr("href")
                            }).join(","),
                        i = {
                            type: t,
                            content: n,
                            pic: r
                        };
                    r && $.post(e, i,
                        function(e) {
                            if (e.code == "A00000") return alert("鎶曠鎴愬姛锛岃嫢琚噰鐢ㄥ皢鍙﹁閫氱煡鎮紝璋㈣阿鎮ㄥ鐗囧埢鐨勬敮鎸侊紒"),
                                setTimeout(function() {
                                        location.reload()
                                    },
                                    "2500"), !0;
                            alert(e.data.msg)
                        },
                        "JSON")
                }),
            $("#livinglab_submit").bind("click",
                function() {
                    var e = "/api/contribute/add.php",
                        t = "livinglab",
                        n = $("#articleurl").val(),
                        r = {
                            type: t,
                            articleurl: n
                        };
                    e && $.post(e, r,
                        function(e) {
                            if (e.code == "A00000") return alert("鎶曠鎴愬姛锛岃嫢琚噰鐢ㄥ皢鍙﹁閫氱煡鎮紝璋㈣阿鎮ㄥ鐗囧埢鐨勬敮鎸侊紒"),
                                setTimeout(function() {
                                        location.reload()
                                    },
                                    "2500"), !0;
                            alert(e.data.msg)
                        },
                        "JSON")
                }),
            $(".c_box_cont .add_btn").bind("click",
                function() {
                    var e = $(this),
                        t = e.parent(".c_right"),
                        n = t.find("input").length + 1,
                        r = t.find("p:first").clone();
                    r.find(".c_text").val("绗�" + n + "绔犳枃绔犻摼鎺ュ湴鍧€").removeClass("gray").addClass("gray"),
                        e.before(r)
                }),
            $("#album_submit").bind("click",
                function() {
                    var e = that.check_album();
                    e && that.submit_contribute("album", e)
                }),
            $("input,textarea").live("focus",
                function() {
                    var e = $(this);
                    e.data("text") || e.data("text", e.val()),
                        e.hasClass("gray") && e.val("").removeClass("gray")
                }).live("blur",
                function() {
                    var e = $(this);
                    e.val() === "" && e.val(e.data("text")).addClass("gray")
                }),
            $("#uploadfile").bind("click",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1
                }),
            $.browser.msie ? $("#uploadfile").live("click",
                function(e) {
                    var t = $(this),
                        n = function() {
                            t.blur(),
                                that.uploadFile()
                        };
                    clearInterval(t.data("st")),
                        t.data("st", setInterval(function() {
                                i >= 1e3 && clearInterval(t.data("st")),
                                    t.val().length > 0 && (n(), clearInterval(t.data("st"))),
                                    i += 1
                            },
                            300))
                }) : $("#uploadfile").live("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    that.uploadFile()
                }),
            $(".d_mp3 .close").live("click",
                function() {
                    $(".d_mp3").children().remove(),
                        $(".d_mp3").hide(),
                        $(".inst_add").show(),
                        that.URLMP3 = ""
                }),
            $("#audio_submit").bind("click",
                function() {
                    var e = $(".case .text_l").val(),
                        t = that.URLMP3;
                    if (e && t) var n = {
                        url: e,
                        fileurl: t
                    };
                    that.submit_contribute("audio", n)
                }),
            $("#wordcard_submit").bind("click",
                function() {
                    var bool = !1,
                        num = 0;
                    str = $(".case:first input").map(function() {
                            var e = this.value,
                                t = /gray/.test(this.className);
                            return num += t ? 0 : e.length, (e == "" && bool == 0 || t) && (bool = !0),
                                e.replace(/\s+/g, "")
                        }).get().join(","),
                        key = "word";
                    if (num > 7) return showerrortip("涓変釜璇嶆€诲叡涓嶈秴杩囦竷涓瓧锛�"), !1;
                    if (bool) return showerrortip("鎶辨瓑锛岃妫€鏌ユ偍鐨勬彁浜ゅ唴瀹癸紒"), !1;
                    params = eval("({" + key + ':"' + str + '"})'),
                        params.desc = $("#desc").val(),
                        that.submit_contribute("wordcard", params)
                }),
            $("#subject_submit").bind("click",
                function() {
                    var e = $(".image img");
                    if (!e.length) return showerrortip("鎶辨瓑锛岃妫€鏌ユ偍鐨勬彁浜ゅ唴瀹癸紒"), !1;
                    var t = e.map(function() {
                            return this.src
                        }).get().join(","),
                        n = {
                            imglist: t
                        };
                    type = $(this).hasClass("background_add") ? "background" : "subject",
                        that.submit_contribute(type, n)
                }),
            $(".pic .close").live("click",
                function() {
                    location.pathname == "/contribute/album.php" && $(this).parents("#album_img").hide(),
                        $(this).parent().remove()
                }),
            $("#picfile").bind("click",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1
                }),
            $.browser.msie ? $("#picfile").live("click",
                function(e) {
                    var t = $(this);
                    clearInterval(t.data("st")),
                        t.data("st", setInterval(function() {
                                i >= 1e3 && clearInterval(t.data("st")),
                                    t.val().length > 0 && (t.blur(), bool = $(this).hasClass("background_add"), that.uploadImage(bool), clearInterval(t.data("st"))),
                                    i += 1
                            },
                            300))
                }) : $("#picfile").live("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    if ($(".pic li").length >= 5) return !1;
                    if (location.pathname == "/contribute/album.php" && $(".pic li").length >= 1) return !1;
                    bool = $(this).hasClass("background_add"),
                        that.uploadImage(bool)
                })
    },
    uploadImage: function(e) {
        var t = this,
            n = $(".add_inst img"),
            r = $("#picfile").parents(".case");
        n.show(),
            data = e ? {
                type: "background"
            } : {},
            location.pathname == "/contribute/album.php" && (data = {
                type: "album"
            }),
            $.ajaxFileUpload({
                url: "/api/posts/uploadimg",
                secureuri: !1,
                fileElementId: "picfile",
                dataType: "json",
                type: "post",
                success: function(e) {
                    url = e.data.picurl,
                        n.hide(),
                        $("a[name=pics]").remove(),
                        e.code == "A00000" ? r.after('<a class="blue" name="pics" target="_blank" href="' + url + '">' + "鐐瑰嚮鏌ョ湅銆�" + "</a>") : showerrortip(PKINFO.eCode[e.code])
                },
                error: function(e, t, i) {
                    url = e.data.picurl,
                        $("a[name=pics]").remove(),
                        n.hide(),
                        e.responseText && (e = JSON.parse(e.responseText), e.code == "A00000" ? r.after('<a class="blue" name="pics" target="_blank" href="' + url + '">' + "鐐瑰嚮鏌ョ湅銆�" + "</a>") : showerrortip(PKINFO.eCode[e.code]))
                }
            })
    },
    afterUpload: function(data) {
        data = eval("(" + data.responseText + ")");
        if (data.code != "A00000") alert(PKINFO.eCode[data.code]);
        else {
            var src = data.data.picurl,
                inner = '<a href="javascript:void(0);" class="close"></a><div class="image"><p><img src="' + src + '" /></p></div>',
                el = $("<li></li>").html(inner);
            $("ul.pic").append(el)
        }
    },
    submit_contribute: function(e, t) {
        t.type = e,
            $.post("/api/contribute/add", t,
                function(t) {
                    switch (t.code) {
                        case "A00001":
                            return openlogintip(), !1;
                        case "A00000":
                            return alert("鎶曠鎴愬姛锛岃嫢琚噰鐢ㄥ皢鍙﹁閫氱煡鎮紝璋㈣阿鎮ㄥ鐗囧埢鐨勬敮鎸侊紒"),
                                e == "album" && (location.href = "/album/"), !0;
                        default:
                            return showerrortip(t.data.msg), !1
                    }
                },
                "json")
    },
    uploadFile: function() {
        var e = this,
            t = $(".add_inst img");
        t.show(),
            $.ajaxFileUpload({
                url: "/api/contribute/uploadfile.php",
                secureuri: !1,
                fileElementId: "uploadfile",
                dataType: "json",
                type: "post",
                success: function(n, r) {
                    t.hide(),
                        e.afterUploadMp3(n)
                },
                error: function(n, r, i) {
                    t.hide(),
                        e.afterUploadMp3(n)
                }
            })
    },
    afterUploadMp3: function(e) {
        if (e.code != "A00000") alert(PKINFO.eCode[e.code]);
        else {
            this.URLMP3 = e.data.fileurl;
            var t = e.data.filename,
                n = '<a href="javascript:void(0);" class="close"></a><p>' + t + "</p>";
            $(".inst_add").hide(),
                $(".d_mp3").append(n).show()
        }
    },
    check_album: function() {
        var e = $("#title").val(),
            t = $("#content").val(),
            n = [],
            r = $(".c_box_cont p .c_text"),
            i = !0,
            s = $("#album_img .image img").attr("src");
        return e.length == 0 || e.length > 30 ? (text = e.length == 0 ? "鏍囬涓嶈兘涓虹┖" : "鏍囬闀垮害涓嶈兘澶т簬30", showerrortip(text), !1) : t.length == 0 ? (showerrortip("涓撹緫浠嬬粛涓嶈兘涓虹┖"), !1) : ($.each(r,
            function() {
                url = $(this).val(),
                    url.length ? n.push(url) : i = !1
            }), i ? {
            title: e,
            content: t,
            finish: $(".c_right select").val(),
            contentidlist: n.join(","),
            img: s
        } : (showerrortip("鍒嗛泦鍒楄〃杩炴帴鍦板潃涓嶈兘涓虹┖"), !1))
    }
};
Pianke.home = {
    RANDOM_CHANGE: "/api/home/getrecommend.php",
    GET_FEED_URL: "/api/home/getfeed",
    SET_FEED_URL: "/api/home/setfeedtype",
    GET_FEEDCOUNT: "/api/home/getaddednumber",
    GET_NEW_FEED: "/api/home/getaddedfeed",
    GET_INTERESTED: "/api/operations/getInterestedList.php",
    on_slide: !1,
    fall_canload: !0,
    cur_page: 1,
    active_st: null,
    init: function() {
        var e = this;
        e.bindEvent(),
            e.load_music_list(),
            e.active_st = setInterval(function() {
                    e.get_new_feedcount()
                },
                3e4),
            e.word_slider_st = setTimeout(function() {
                    e.word_slider(1)
                },
                1e4)
    },
    bindEvent: function() {
        var e = this;
        $(window).scroll(function() {
                $(document).height() <= $(window).height() + $(window).scrollTop() + 100 && e.fall_canload && e.load_more()
            }),
            $("#recommend_user .close").bind("click",
                function() {
                    $("#recommend_user").hide()
                }),
            getCookie("nofeedtips") != "false" ? $(".moving_none .close").bind("click",
                function() {
                    $(".moving_none").hide(),
                        setCookie("nofeedtips", 1)
                }) : $(".moving_none").hide(),
            $(".moving_more .more_left .more_btn").live("click",
                function() {
                    $(this).parents(".more_left").find(".active_info").toggle()
                }),
            $("#recommend_user .change_btn").bind("click",
                function() {
                    $.getJSON("/api/home/getrecommend.php", {},
                        function(e) {
                            console.log(e),
                                e.code === "A00000" && $("#recommend_user .contact_box").html(e.data.data.html)
                        })
                }),
            $(".approve_join").bind("click",
                function() {}),
            $(".moving_none").bind("click",
                function() {
                    e.render_new_feed()
                }),
            $("#save_feed_type").bind("click",
                function() {
                    var t = $.map($("input[name=feedtype]:checked"),
                        function(e) {
                            return e.value
                        });
                    t.length ? $.post(e.SET_FEED_URL, {
                            feedtypes: t
                        },
                        function(e) {
                            e.code === "A00000" ? alert("淇濆瓨鎴愬姛") : showerrortip(e.data.msg)
                        },
                        "json") : msg_modal("璇疯嚦灏戦€変竴椤�", 5e3)
                }),
            $(".delfav").live("click",
                function() {
                    var e = $(this),
                        t = "/api/fav/delfav.php",
                        n = {
                            contentid: e.attr("data-id")
                        };
                    PKINFO.islogin != 1 && openlogintip(),
                        confirm("纭鍙栨秷鏀惰棌锛�",
                            function() {
                                $.post(t, n,
                                    function(t) {
                                        t.code === "A00000" ? e.parents(".create_content").slideUp(function() {
                                            $(this).remove()
                                        }) : showerrortip(t.data.msg)
                                    },
                                    "json")
                            })
                }),
            $("#in_group").live("click",
                function() {
                    $.getJSON(e.GET_INTERESTED, {},
                        function(e) {
                            e.code === "A00000" && ($(".maybe_interested ul").html(e.data.data.html), $(".maybe_interested li").length || $(".maybe_interested").fadeOut(function() {
                                $(this).remove()
                            }))
                        })
                }),
            $(".empty_draft").bind("click",
                function(e) {
                    var t = this.href;
                    e.preventDefault(),
                        confirm("纭畾瑕佹竻绌烘墍鏈夎崏绋匡紵",
                            function() {
                                location.href = t
                            })
                }),
            $(".topnav li").mousemove(function() {
                var e = $(this),
                    t = e.index();
                $(".c_name_idea ul").hide().filter(":eq(" + t + ")").show(),
                    $(".topnav li a").removeClass("current"),
                    e.find("a").addClass("current")
            }),
            $(".cutover li a").bind("click",
                function() {
                    var t = $(this),
                        n = t.parent().index();
                    t.hasClass("current") || e.word_slider(n)
                }),
            $(".switch_but .but_ico").bind("click",
                function() {
                    var t = $(this).hasClass("up");
                    e.suggest_slider(t)
                })
    },
    suggest_slider: function(e, t, n) {
        var r = t || $(".interesting ul"),
            i = r.filter(":visible"),
            s = e ? i.prev() : i.next(),
            o = n && n.width() * (e ? -1 : 1) || $(".interesting").width() * (e ? -1 : 1),
            u = this;
        if (u.on_slide) return !1;
        u.on_slide = !0,
            s.length == 0 && (s = e ? r.filter(":last") : r.filter(":first")),
            s.css("left", o).show().animate({
                    left: 0
                },
                1e3,
                function() {
                    u.on_slide = !1
                }),
            i.animate({
                    left: -o
                },
                1e3,
                function() {
                    i.hide()
                })
    },
    word_slider: function(e) {
        var t = this;
        $(".cutover li a").removeClass("current").filter(":eq(" + e + ")").addClass("current"),
            $(".card_slider li").filter(".current").fadeOut().removeClass("current").end().filter(":eq(" + e + ")").fadeIn().addClass("current"),
            e == $(".cutover li").length - 1 ? e = 0 : e += 1,
            clearTimeout(t.word_slider_st),
            t.word_slider_st = setTimeout(function() {
                    t.word_slider(e)
                },
                1e4)
    },
    load_more: function() {
        var e = this,
            t;
        if (!e.fall_canload || location.pathname.split("/")[1] != "home") return !1;
        e.fall_canload = !1,
            e.cur_page += 1,
            $(".main_left .loading").show(),
            $.getJSON(e.GET_FEED_URL, {
                    page: e.cur_page,
                    _: Math.floor(Math.random() * 999999)
                },
                function(n) {
                    t = n.data.data.html,
                        $(".main_left .loading").hide(),
                        t.length ? (e.fall_canload = !0, $(".main_cont").append($(t)), e.load_music_list()) : e.fall_canload = !1
                })
    },
    load_music_list: function() {
        var e = this,
            t = Pianke.player,
            n, r;
        $.each($(".player"),
            function() {
                r = $(this),
                    r.data("on_play") || (n = r.attr("data-url"), Pianke.player.init_player(n, r))
            })
    },
    get_new_feedcount: function() {
        var e = this,
            t = $(".moving_none");
        $.getJSON(e.GET_FEEDCOUNT, {
                _: (new Date).valueOf()
            },
            function(e) {
                e.code === "A00000" ? e.data.data.total ? t.show().find("span").html(e.data.data.total) : t.hide().html() : showerrortip(e.data.msg)
            })
    },
    render_new_feed: function() {
        var e = this,
            t = $(".moving_none");
        $.getJSON(e.GET_NEW_FEED, {
                _: (new Date).valueOf()
            },
            function(e) {
                e.code === "A00000" ? (console.log(e), e.data.data.html && t.after(e.data.data.html), t.hide()) : showerrortip(e.data.msg)
            })
    }
};
Pianke.wordcard = {
    list_on_play: !1,
    list_play_st: null,
    CARD_MAX_LEN: 1e3,
    ITEM_SIZE: {
        height: 310,
        width: 270
    },
    ISLOADMORE: !0,
    scrollLoad: !0,
    UP_LOAD_IMG: !0,
    fall_canload: !0,
    cur_column: 0,
    GET_CARD_URL: "/api/card/getcard.php",
    GET_PAGE_URL: "/api/card/getPagecard.php",
    ADD_CARD_URL: "/api/card/addcard",
    cur_page: 1,
    load_page: 1,
    waterfall_pos: [],
    init: function() {
        var e = this;
        e.bindEvent(),
            e.recount_text(),
            $(".make_img").length && e.init_waterfall(),
            location.pathname.split("/")[1] == "wordcard" && location.pathname.split("/")[2] != "before" && location.pathname.split("/")[3] != "publish" && $("#wordcardid").val() && $(document).height() <= parseFloat($(window).height()) + parseFloat($(window).scrollTop()) + 500 && e.autoLoading(),
            location.pathname.split("/")[1] == "card" && (Pianke.comment.getcomment($(".entry"), 1, 1, !0), $(".digest_main .pages a").live("click",
                function(t) {
                    t.preventDefault();
                    var n = $(this),
                        r = n.attr("href"),
                        i = n.hasClass("up") || n.hasClass("next");
                    i ? e.cur_page += n.hasClass("next") ? 1 : -1 : e.cur_page = parseInt(n.text(), 10),
                        e.load_fall_page(r)
                })),
            e.list_play_st = setInterval(function() {
                    var t = $(".slide-list .current").index(),
                        n = t + 1,
                        r = $(".slide-list li").length;
                    n >= r && (n = 0),
                        e.page_change(t, n)
                },
                1e4)
    },
    bindEvent: function() {
        var e = this;
        $(window).resize(function() {
                e.reset_position(0, $(".make_img li").length)
            }),
            $(window).bind("scroll",
                function() {
                    e.autoLoading()
                }),
            $(window).scroll(function() {
                $(document).height() <= $(window).height() + $(window).scrollTop() + 20 && e.fall_canload && e.fall_load_more()
            }),
            $(".slide-btns").find(".slide-prev,.slide-next").bind("click",
                function() {
                    var t = $(this),
                        n = t.hasClass("slide-prev"),
                        r = $(".slide-list .current").index(),
                        i = r + (n ? -1 : 1),
                        s = $(".slide-list li").length;
                    i < 0 ? i = s - 1 : i >= s && (i = 0),
                        e.page_change(r, i)
                }),
            $(".slide-controls .dots li").bind("click",
                function() {
                    var t = $(this),
                        n = $(".slide-list .current").index(),
                        r = $(this).index();
                    if (t.hasClass("active")) return;
                    e.page_change(n, r)
                }),
            $(".special_icon").hover(function() {
                    $(this).find(".s_cont").show(200)
                },
                function() {
                    $(this).find(".s_cont").hide(200)
                }),
            $(".make_img li").live("click",
                function() {
                    var e = $(this).attr("data-url");
                    window.open(e)
                }),
            $(".d_img_layer").live("mouseenter",
                function() {
                    $(this).find(".cover").fadeIn()
                }).live("mouseleave",
                function() {
                    $(this).find(".cover").hide()
                }),
            $(".w_card .start_create").click(function() {
                if (PKINFO.islogin != 1) return openlogintip(), !1
            }),
            $("#currenloadpageno").val((Number($("#currenpageno").val()) - 1) * 3 + 1),
            $(".write textarea").autosize && $(".write textarea").autosize(),
            $(".card_editor .write textarea").bind("keydown",
                function(e) {
                    var t = $(this).val(),
                        n = t.length;
                    t.split("\n").length >= 50 && e.keyCode == 13 && e.preventDefault()
                }).bind("keyup",
                function() {
                    var t = e.recount_text();
                    t > e.CARD_MAX_LEN ? $("#contentlengthnum").parent().addClass("bold_red") : $("#contentlengthnum").parent().removeClass("bold_red")
                }),
            $(".hot_btn .r_icon").bind("click",
                function() {
                    var e = $(this),
                        t = e.hasClass("down"),
                        n = $(".card_right .c_right_img ul"),
                        r = n.width(),
                        i = 86,
                        s = $(".c_right_img li").length - 2,
                        o = n.data("num") || 0;
                    if (n.data("not_run")) return !1;
                    n.data("not_run", !0),
                        o += t ? 1 : -1,
                        o = o < 0 ? s : o,
                        o = o >= s ? 0 : o,
                        n.data("num", o).animate({
                                left: -o * i
                            },
                            200,
                            function() {
                                n.data("not_run", !1)
                            })
                }),
            $(".send_box .invite_btn").bind("click",
                function() {
                    $(".u_text").show()
                }),
            $(".submit_btn a").bind("click",
                function() {
                    e.submit_card()
                }),
            $(".more_operate .fav,.icon .fav").live("click",
                function() {
                    PKINFO.islogin != 1 && openlogintip();
                    var e = $(this),
                        t = e.hasClass("on"),
                        n = e.parents(".icon").attr("data-id") || e.attr("data-id"),
                        r = t ? "/api/fav/delfav.php" : "/api/fav/addfav.php",
                        i = {
                            contentid: n
                        };
                    $.post(r, i,
                        function(n) {
                            if (n.code != "A00000") return alert(n.data.msg), !1;
                            e.toggleClass("on"),
                                num = n.data.data.fav,
                                num == 0 && (num = ""),
                                num_text = t ? "<span class='number'>" + num + "</span>" : "<span class='number'>" + num + "</span>",
                                inner = t ? "鏀惰棌" + num_text : "鍙栨秷鏀惰棌" + num_text,
                                e.html(inner)
                        },
                        "json")
                }),
            $(".detailfav").live("click",
                function() {
                    PKINFO.islogin != 1 && openlogintip();
                    var e = $(this),
                        t = e.text(),
                        n = e.attr("data-id"),
                        r = t == "鏀惰棌",
                        i = r ? "/api/fav/delfav.php" : "/api/fav/addfav.php",
                        s = {
                            contentid: n
                        };
                    $.post(i, s,
                        function(t) {
                            return t.code != "A00000" ? (alert(t.data.msg), !1) : (e.text(r ? "鍙栨秷鏀惰棌" : "鏀惰棌"), !1)
                        },
                        "json")
                }),
            $(".delcntcard").live("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    var e = $(this).attr("data-id");
                    confirm("鎮ㄧ‘瀹氳鍒犻櫎姝ゅ紶Card锛�",
                        function() {
                            var t = {
                                contentid: e
                            };
                            $.post("/api/card/delcard.php", t,
                                function(e) {
                                    return e.code != "A00000" ? (alert(e.data.msg), !1) : (window.location.href = e.data.redirect, !1)
                                },
                                "json")
                        })
                }),
            $("#posts_style a").live("click",
                function() {
                    $("#posts_style a").removeClass("on"),
                        $(this).addClass("on")
                }),
            $(".index_title .mainnav a").bind("click",
                function() {
                    e.ISLOADMORE = !0;
                    var t = $(this).attr("s-key");
                    t && ($(".index_title .mainnav a").removeClass("current"), $(this).addClass("current"), $("#currentstyle").val(t), e.clickCardCount("style", t), e.loadselectposts(), window.scroll(0, $(".index_title").offset().top - 50))
                }),
            $(".contain .cardlist").hover(function() {
                    $(this).find(".ico").show()
                },
                function() {
                    $(this).find(".ico").hide(),
                        $(".icon6").removeClass("curon"),
                        $(".icon6").parents(".cont").removeAttr("style")
                }),
            $(".icon6").live("mouseover",
                function() {
                    $(this).parents(".cont").css("z-index", "90"),
                        $(this).addClass("curon").css("z-index", "99")
                }),
            $(".cardxq .icon6, .cardxq_1 .icon6").live("mouseout",
                function() {
                    $(this).removeClass("curon").removeAttr("style"),
                        $(this).parents(".cont").removeAttr("style")
                }),
            $(".hour").hover(function() {
                    $(this).find("ul").show().parents(".newstyle").addClass("zindex")
                },
                function() {
                    $(this).find("ul").hide().parents(".newstyle").removeClass("zindex")
                }),
            $(".hour_new a").bind("click",
                function() {
                    e.ISLOADMORE = !0,
                        hot = $(this).attr("hotitem"),
                        $(".hour_new a").removeClass("on"),
                        $(this).addClass("on"),
                        $("#currenthotitem").val(hot),
                        e.clickCardCount("hotitem", hot),
                        e.loadselectposts()
                }),
            $(".post_item .clo").live("click",
                function() {
                    $(this).next().show()
                }),
            $(".post_item .cancel").live("click",
                function() {
                    $(this).parents(".delete").hide()
                }),
            $(".post_item .submit_del").live("click",
                function() {
                    var t = $(this),
                        n = t.attr("data-id");
                    e.delposts(n, t)
                }),
            $(".card_load").live("click",
                function() {
                    e.loadmorewordcard($(this).attr("data-type"))
                }),
            $(".profile_card_load").live("click",
                function() {
                    e.loadmoreprofileposts("new", $(this).attr("data-id"))
                }),
            $(".detail_list").length && $(window).unbind("scroll"),
            $(".content .increase .big, .content .increase img").live("click",
                function() {
                    var e = $("a.increase img:first").attr("s_img"),
                        t = $(".layer_pop.d_img img").attr("src", e),
                        n = $(window).width(),
                        r = $(window).height();
                    window_per = n * (r / n),
                        t.load(function() {
                            var e = t.width();
                            e > window_per && (e = window_per, t.width(e)),
                                t.show().css({
                                    "margin-top": -t.attr("height") / 2,
                                    "margin-left": -e / 2
                                })
                        }),
                        t.parents(".layer_pop").show()
                }),
            $(".layer_pop.d_img").click(function(e) {
                $(this).hide()
            }),
            e.multi_bind()
    },
    multi_bind: function() {
        var e = this;
        $(".add_cont .close").live("click",
                function() {
                    $(this).parents(".add_cont").hide(),
                        $(this).parent().find("img").attr("src", ""),
                        $(this).parent().hasClass("a_emerge") && (e.UP_LOAD_IMG = !1)
                }),
            $.browser.msie ? ($(".add_images #picfile").live("click",
                function(t) {
                    var n = $(this),
                        r = 0,
                        i = function() {
                            n.blur(),
                                $(".add_cont .a_image").parent().show(),
                                e.UP_LOAD_IMG = !0,
                                e.uploadImage()
                        };
                    clearInterval(n.data("st")),
                        n.data("st", setInterval(function() {
                                r >= 1e3 && clearInterval(n.data("st")),
                                    n.val().length > 0 && (i(), clearInterval(n.data("st"))),
                                    r += 1
                            },
                            300))
                }), $("#picfile.uploadcard").die("click").live("click",
                function() {
                    var t = $(this),
                        n = 0,
                        r = function() {
                            t.blur(),
                                e.uploadCardImage()
                        };
                    clearInterval(t.data("st")),
                        t.data("st", setInterval(function() {
                                n >= 1e3 && clearInterval(t.data("st")),
                                    t.val().length > 0 && (r(), clearInterval(t.data("st"))),
                                    n += 1
                            },
                            300))
                })) : ($(".add_images #picfile").live("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    $(".add_cont .a_emerge").parent().show(),
                        e.UP_LOAD_IMG = !0,
                        e.uploadImage()
                }), $("#picfile.uploadcard").die("change").live("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    e.uploadCardImage()
                })),
            $(".card_editor .essay h2").bind("click",
                function() {
                    $(".card_editor .essay .pen").toggle()
                }),
            $(".card_editor .storystyle .style_more a").bind("click",
                function() {
                    var e = $(this).attr("data-id");
                    $(".card_editor .storystyle .style_more a").removeClass("on"),
                        $(this).addClass("on"),
                        $(".card_editor .storystyle .more_tag .m_tag_cont").hide().filter('[data-id="' + e + '"]').show().end().find("a").removeClass("on")
                }),
            $(".card_editor .title input").bind("focus",
                function() {
                    var e = $(this),
                        t = e.val();
                    t == "濡傛灉闇€瑕佹爣棰橈紝閭ｅ氨鍐欏湪杩欏効鍚�" && e.val("")
                }).bind("blur",
                function() {
                    var e = $(this),
                        t = $.trim(e.val());
                    t == "" && $(this).val("濡傛灉闇€瑕佹爣棰橈紝閭ｅ氨鍐欏湪杩欏効鍚�")
                }),
            $(".card_editor .storystyle .more_tag .m_tag_cont a").bind("click",
                function() {
                    if ($(".m_tag_cont a.on").length > 3) return !1;
                    $(this).toggleClass("on")
                })
    },
    fall_load_more: function() {
        var e = this;
        if (!e.fall_canload || location.pathname.split("/")[1] != "card") return !1;
        e.fall_canload = !1,
            e.load_page += 1,
            $.getJSON(e.GET_CARD_URL, {
                    page: e.cur_page,
                    load_page: e.load_page,
                    sort: $(".menu_nav .on").attr("data-type"),
                    _: Math.floor(Math.random() * 999999)
                },
                function(t) {
                    t.data.data.list == "" ? (showerrortip("宸茬粡琚綘娴忚瀹屼簡锛屼紤鎭竴涓嬪惂锝�"), e.fall_canload = !1) : (e.fall_canload = !0, t.data.data.page && ($(".digest_main").append($(t.data.data.page)), e.fall_canload = !1), t = t.data.data.list, e.add_waterfall(t))
                })
    },
    uploadCardImage: function() {
        var e = this,
            t = "/api/card/uploadimg",
            n = $(".loading_img"),
            r = $(".u_pic img:first");
        n.show(),
            $.ajaxFileUpload({
                url: t,
                secureuri: !1,
                fileElementId: "picfile",
                dataType: "json",
                type: "post",
                success: function(t) {
                    n.hide(),
                        console.log(t),
                        t.code != "A00000" ? showerrortip(t.data.msg) : e.UP_LOAD_IMG && (r.attr("src", t.data.picurl), $(".u_pic").addClass("already_add"))
                },
                error: function(e, t, r) {
                    n.hide()
                }
            })
    },
    uploadImage: function() {
        var e = this,
            t = $(".add_cont .a_emerge").parent(),
            n = $(".add_cont:first");
        t.show(),
            $.ajaxFileUpload({
                url: "/api/wordcard/uploadimg.php",
                secureuri: !1,
                fileElementId: "picfile",
                dataType: "json",
                type: "post",
                success: function(r) {
                    t.hide(),
                        r.code != "A00000" ? alert(PKINFO.eCode[r.code]) : e.UP_LOAD_IMG && n.show().find("img").attr("src", r.data.picurl).end().find("p a").attr("href", r.data.picurl)
                },
                error: function(e, n, r) {
                    t.hide(),
                        $(".add_cont .a_image:first img").attr("src") != "" && $(".add_cont .a_image").parent().show()
                }
            })
    },
    submit_card: function() {
        var e = this;
        if (!$(".u_pic").hasClass("already_add")) return showerrortip(PKINFO.eCode.A01405), !1;
        $.post(e.ADD_CARD_URL, {
                picurl: $(".u_pic img:first").attr("src"),
                content: $(".true_enter textarea").val(),
                emaillist: $(".u_text textarea").val()
            },
            function(e) {
                switch (e.code) {
                    case "A00001":
                        return openlogintip(), !1;
                    case "A00000":
                        return location.href = e.data.url, !0;
                    default:
                        return showerrortip(e.data.msg), !1
                }
            },
            "json")
    },
    clickCardCount: function(e, t) {
        var n = {
            type: e,
            value: t
        };
        $.post("/api/pdata/addpostscount.php", n,
            function(e) {
                return "A00000" == e.code ? !0 : !1
            },
            "json")
    },
    init_waterfall: function() {
        var e = cardList;
        this.add_waterfall(e)
    },
    add_waterfall: function(e) {
        var t = "",
            n = $(".make_img li").length,
            r = 0;
        for (i in e) t += this.create_card_item(e[i]),
            r++;
        t = $(t),
            $(".make_img ul").append(t),
            this.reset_position(n, r)
    },
    reset_position: function(e, t) {
        var n = this.ITEM_SIZE,
            r = $(".make_img").width(),
            s = e + t,
            o = Math.floor(r / n.width),
            u = Math.floor(s / o) + (s % o ? 1 : 0),
            a = (r - o * n.width) / 2;
        for (i = e; i < s; i++) _top = Math.floor(i / o),
            $(".make_img li:eq(" + i + ")").css({
                top: _top * (n.height + 18) + 50,
                left: i % o * n.width + a
            });
        $(".make_img").height(u * (n.height + 18) + 50)
    },
    loadselectposts: function() {
        var e = this,
            t = $("#currenpageno").val(),
            n = $("#wordcardid").val(),
            r = $("#currentstyle").val(),
            i = $("#currenthotitem").val(),
            s = $("#currenthascard").val(),
            o = {
                wordcardid: n,
                page: 1,
                style: r,
                hotitem: i,
                hascard: s
            };
        return $.get("/api/wordcard/getposts.php", o,
            function(t) {
                if (t.code != "A00000") return !1;
                $("#currenpageno").val(1),
                    $("#currenloadpageno").val(1);
                if (t.data.data.curtotal < 1) {
                    e.ISLOADMORE = !1;
                    var n = '<div class="cont"><div class="none">鏈潯鏍囩鏆傛椂杩樻病鏈夊唴瀹癸紒</div> <div class="clear"></div></div>';
                    return $("#posts_showlist").html(n),
                        $("#errormsg").hide(), !0
                }
                t.data.data.curtotal < 15 ? (e.ISLOADMORE = !1, $("#errormsg").hide()) : $("#errormsg").show(),
                    $("#posts_showlist").html(t.data.data.html)
            },
            "json"), !0
    },
    submitposts: function() {
        if (!addpostsswitch) return !1;
        var e = $("#wordcardid").val(),
            t = $("#contentid").val(),
            n = $(".card_editor .write textarea").val(),
            r = $(".storystyle a.on").attr("s-key"),
            i = $(".card_editor .title input").val() == "濡傛灉闇€瑕佹爣棰橈紝閭ｅ氨鍐欏湪杩欏効鍚�" ? "" : $(".card_editor .title input").val(),
            s = $(".essay .pen textarea").val(),
            o = $(".a_image img:first").attr("src"),
            u = this,
            a = [],
            f = $(".card_editor .storystyle .more_tag .m_tag_cont a.on");
        f.each(function(e) {
            a.push($(this).attr("key"))
        });
        if ("" == e) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
        if ("" == n) return showerrortip("鎶辨瓑锛屽唴瀹逛笉鑳戒负绌猴紒"), !1;
        "" == r && (r = 1);
        if (!f.length) return showerrortip("鎶辨瓑锛岃繕娌℃湁閫夋嫨浣滃搧椋庢牸锛�"), !1;
        var l = {
                wordcardid: e,
                content: n,
                style: r,
                title: i,
                remark: s,
                img: o,
                tags: a
            },
            c = "/api/wordcard/addposts.php";
        location.href.split("/")[location.href.split("/").length - 1] == "update" && (c = "/api/wordcard/updateposts", l.contentid = t),
            addpostsswitch = !1;
        var h = $(".card_editor .write textarea").val(),
            p = h.length;
        if (p > u.CARD_MAX_LEN) {
            msg_modal("鍐呭涓嶈兘澶т簬1000瀛�", 2e3),
                addpostsswitch = !0;
            return
        }
        this.submit_wordcard(c, l)
    },
    loadmoreposts: function(e) {
        ShareClickCount("wordcard");
        var t = this,
            n = $("#currenloadpageno").val(),
            r = Number(n) + 1,
            i = $("#currenpageno").val(),
            s = $("#wordcardid").val(),
            o = $("#currentstyle").val(),
            u = $("#currenthascard").val();
        if (s) {
            if ("" == i || "undefined" == typeof i || "undefined" == typeof e) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
            if (!t.ISLOADMORE) return !1;
            t.ISLOADMORE = !1,
                $("#submore").text("鏁版嵁鍔犺浇涓�,璇风◢鍊�...").show(),
                $(".wordcard_loading").show();
            var a = {
                wordcardid: s,
                page: i,
                load_page: r,
                sort: e,
                style: o,
                hascard: u
            };
            $.ajax({
                type: "GET",
                url: "/api/wordcard/getposts.php",
                dataType: "json",
                data: a,
                cache: !1,
                success: function(e) {
                    e ? e.code != "A00000" ? $("#submore").hide() : ($("#currenloadpageno").val(r), $(".create_content:last").after(e.data.data.html), $("#submore").hide(), t.ISLOADMORE = !0, t.scrollLoad = !0, e.data.data.curtotal < 15 ? (t.ISLOADMORE = !1, $("#errormsg").hide()) : $("#errormsg").show()) : $("#submore").unbind("click").html("鏁版嵁鍔犺浇寮傚父,<a href='javascript:'>閲嶆柊鍔犺浇</a>").click(function() {
                            $(this).unbind("click"),
                                t.loadmoreposts("")
                        }),
                        $(".wordcard_loading").hide()
                },
                error: function() {
                    $(".wordcard_loading").hide(),
                        $("#submore").unbind("click").html("鏁版嵁鍔犺浇寮傚父,<a href='javascript:'>閲嶆柊鍔犺浇</a>").click(function() {
                            $(this).unbind("click"),
                                t.loadmoreposts("")
                        })
                }
            })
        }
        return !0
    },
    loadmorewordcard: function(e) {
        ShareClickCount("historyCard");
        var t = $("#currenpageno").val(),
            n = Number(t) + 1;
        return $("#submore").hide(),
            $(".wordcard_loading").show(),
            $.get("/api/wordcard/getwordcards.php", {
                    page: n,
                    sort: e
                },
                function(e) {
                    $(".wordcard_loading").hide(),
                        $("#submore").show();
                    if (e.code != "A00000") return $("#submore").html("璇烽噸璇曪紝鍔犺浇鏇村"), !1;
                    if (e.data.data.curtotal < 1) return $("#submore").html('<span class="gray">鎶辨瓑锛屽凡缁忔病鏈夋洿澶�</span>'), !0;
                    $("#currenpageno").val(n),
                        $("#wordcardlist li:last").after(e.data.data.list),
                        e.data.data.curtotal < 21 ? $("#errormsg").hide() : $("#errormsg").show()
                },
                "json"), !0
    },
    loadmoreprofileposts: function(e, t) {
        var n = $("#currenpageno").val(),
            r = Number(n) + 1;
        return "" == r || "undefined" == typeof r || "undefined" == typeof e || "" == t || "undefined" == typeof t ? (showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1) : ($("#submore").hide(), $(".wordcard_loading").show(), $.get("/api/wordcard/getuserposts.php", {
                page: r,
                sort: e,
                uid: t,
                "class": "posts"
            },
            function(e) {
                if (e.code != "A00000") return $("#submore").html("璇烽噸璇曪紝鍔犺浇鏇村"), !1;
                if (e.data.data.curtotal < 1) return $("#submore").html('<span class="gray">鎶辨瓑锛屽凡缁忔病鏈夋洿澶�</span>'), !0;
                $("#currenpageno").val(r),
                    $(".create_content::last").after(e.data.data.html),
                    e.data.data.curtotal < 15 ? $("#errormsg").hide() : $("#errormsg").show(),
                    $(".wordcard_loading").hide(),
                    $("#submore").show()
            },
            "json"), !0)
    },
    autoLoading: function() {
        var e = 0,
            t = this;
        totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()) + 500,
            $(document).height() <= totalheight && !$(".card_posts_pagination .pages a").length && t.scrollLoad && t.ISLOADMORE && (t.scrollLoad = !1, t.loadmoreposts(""))
    },
    recount_text: function() {
        var e = $("#contentlengthnum"),
            t = $(".card_editor .write textarea"),
            n = 0;
        return e.length && t.length && (n = t.val().length, e.text(n)),
            n
    },
    load_fall_page: function(e) {
        var t = this;
        $(".digest_main .pages").remove(),
            $(".make_img").height(0).find("ul").empty(),
            t.load_page = 1,
            $.getJSON(t.GET_PAGE_URL + e + "&load_page=" + t.load_page, {
                    _: Math.floor(Math.random() * 999999)
                },
                function(e) {
                    if (e.code != "A00000") return alert(e.data.msg), !1;
                    list = e.data.data.list,
                        t.fall_canload = !0,
                        t.add_waterfall(list),
                        e.data.data.page && ($(".digest_main").append(e.data.data.page), t.fall_canload = !1)
                })
    },
    create_card_item: function(e) {
        return '<li data-url="' + e.content_url + '"><div class="img_middle"><div class="d_img_cont"><div class="d_img_layer"><img src="' + e.cardExt.picurl_s + '"><div class="cover"><div class="cover_bg"></div><div class="cover_cont"><p class="w_cont">' + e.content + '</p><p class="come">by锛�<a href="javascript:void(0);" class="blue">' + e.userinfo.uname + '</a></p><p class="d_time">' + e.addtime_f + '</p></div></div></div></div></div><div class="img_idea"><a href="javascript:void(0);" class="m_icon look">' + e.counterList.view + '</a><a href="javascript:void(0);" class="m_icon write">' + e.counterList.comment + '</a><a href="javascript:void(0);" class="m_icon like">' + e.counterList.like + "</a></div></li>"
    },
    ajax_load: function(e) {
        var t = this,
            n = "/api/wordcard/getNpagePosts.php",
            r = $("#wordcardid").val(),
            i = $("#currentstyle").val(),
            s = $("#currenthotitem").val(),
            o = e.text();
        e.hasClass("next") ? o = Number($(".pages .on").text()) + 1 : e.hasClass("up") && (o = Number($(".pages .on").text()) - 1),
            t.ISLOADMORE = !1;
        var u = {
            page: o,
            wordcardid: r,
            style: i,
            hotitem: s
        };
        $.post(n, u,
            function(e) {
                if (e.code != "A00000") return !1;
                $("#currenpageno").val(o),
                    $(".cont, .pages").remove(),
                    window.scroll(0, $(".index_title").offset().top - 50),
                    $("#posts_showlist").html(e.data.data.html),
                    $("#currenloadpageno").val(e.data.data.load_page),
                    t.ISLOADMORE = !0
            },
            "json")
    },
    page_change: function(e, t) {
        var n = e > t,
            r = 700,
            i = $(".slide-list li"),
            s = i.filter(":eq(" + e + ")"),
            o = i.filter(":eq(" + t + ")"),
            u = this;
        if (u.list_on_play) return;
        u.list_on_play = !0,
            s.removeClass("current"),
            o.addClass("current"),
            $(".slide-controls .dots li").removeClass("active").filter(":eq(" + t + ")").addClass("active"),
            s.fadeOut(r,
                function() {
                    u.list_on_play = !1
                }),
            o.fadeIn(r)
    }
};
Pianke.write = {
    ADD_POST_URL: "/api/posts/add",
    DEL_POST_URL: "/api/posts/del",
    UPDATE_POST_URL: "/api/posts/update",
    EXCUTE_URL: "/api/common/getUrlResponse.php",
    SEARCH_URL: "http://www.xiami.com/web/search-songs",
    XIAMI_GETSONGS: "http://www.xiami.com/web/get-songs",
    MAX_TITLE_LENGTH: 30,
    TAG_MAX_LENGTH: 3,
    SEARCHLIST_ID: "_SEARCHLIST_ID_",
    on_writing: /writing/.test(location.pathname),
    cur_request: null,
    cur_search_st: null,
    $search_data: [],
    $search_page: 1,
    cur_song_index: null,
    can_search: !0,
    search_ended: !1,
    search_item_limit: 10,
    init: function() {
        if ($("#editor").length || this.on_writing) this.bindEvent(),
            Pianke.user.bindChooselog(),
            UE && UE.getEditor("editor", {
                initialFrameWidth: "100%",
                autoHeightEnabled: !0
            });
        window.musicConf && ($(".add_music_btn").hide(), this.render_xiamiplayer(musicConf.songid, $(".editor_music"), musicConf.isupdate))
    },
    bindEvent: function() {
        var e = this;
        $(".tag_delete").live("click",
                function() {
                    $(this).parent().remove(),
                        $(".tag_delete").length || $(".tag_choose").find("p,input").toggle()
                }),
            $(".title_input").bind("focus",
                function() {
                    $(this).removeClass("gray")
                }),
            $.browser.msie ? $("#picfile").live("click",
                function(t) {
                    var n = $(this),
                        r = 0,
                        i = function() {
                            n.blur(),
                                $(".add_cont .a_image").parent().show(),
                                e.UP_LOAD_IMG = !0,
                                e.uploadImage()
                        };
                    clearInterval(n.data("st")),
                        n.data("st", setInterval(function() {
                                r >= 1e3 && clearInterval(n.data("st")),
                                    n.val().length > 0 && (i(), clearInterval(n.data("st"))),
                                    r += 1
                            },
                            300))
                }) : $("#picfile").die("change").live("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    e.uploadImage()
                }),
            $(".tag_choose").bind("click",
                function() {
                    var e = $(this),
                        t = e.find("input");
                    e.find("p").hide(),
                        t.length || (t = $("<input/>"), e.append(t)),
                        t.show().focus()
                }),
            $(".editor_tag .tag_name").bind("click",
                function() {
                    var t = !1;
                    $.each($(".tag_choose .tag_name"),
                        function() {
                            if (t) return;
                            inner_text = $(this).text(),
                                $.each($(".editor_tag .tag_name"),
                                    function() {
                                        $(this).text() == inner_text && (t = !0);
                                        if (t) return
                                    })
                        });
                    if (t) {
                        alert("鍙兘閫夋嫨涓€涓被鍨嬫爣绛�!");
                        return
                    }
                    var n = $(".tag_choose"),
                        r = $(this).text(),
                        i = $(e.create_tag(r)),
                        s = n.find("input");
                    s.length || (s = $("<input/>"), n.append(s)),
                        s.before(i),
                        n.find("p").hide()
                }),
            $(".tag_choose input").live("keyup",
                function(t) {
                    var n = $(this);
                    if (t.keyCode == 13) {
                        text = $.trim(n.val()),
                            tag_el = $(e.create_tag(text)),
                            len = text.length;
                        if (len) {
                            if (len > 8) return alert("鏍囩闀垮害涓嶈兘瓒呰繃鍏釜瀛�"), !1
                        } else alert("鏍囩闀垮害涓嶈兘涓虹┖");
                        n.before(tag_el),
                            n.val("").focus()
                    }
                }),
            $(".send").bind("click",
                function() {
                    if (!$("#isupdate").val()) e.show_vcode();
                    else {
                        var t = e.get_submit_param();
                        t && e.submit_post(t)
                    }
                }),
            $("#copyright_desc").focus(function() {
                $(this).hasClass("gray") && $(this).val("").removeClass("gray")
            }),
            $(".layer_vcode").find(".close").bind("click",
                function() {
                    $(".layer_vcode").hide()
                }).end().find(".the_code a").bind("click",
                function() {
                    $(".the_code img").attr("src", "/api/posts/getvcode.php")
                }).end().end().find(".submit_code a").bind("click",
                function() {
                    var t = e.get_submit_param();
                    t.vcode = $(".valid_code input").val(),
                        t && e.submit_post(t)
                }),
            $("input[name=copyright]").bind("click",
                function() {
                    this.value == 2 ? $("#copyright_desc,.vesting .red").show() : $("#copyright_desc,.vesting .red").hide()
                }),
            e.xiamiEvent()
    },
    show_vcode: function() {
        if (PKINFO.islogin != 1) return openlogintip(), !1;
        $(".layer_vcode").show().find(".the_code img").attr("src", "/api/posts/getvcode.php")
    },
    xiamiEvent: function() {
        var e = this,
            t = "璇风敤姝屽悕銆佷笓杈戙€佽壓鏈鎼滅储",
            n = "#" + e.SEARCHLIST_ID,
            r = n + " li";
        $(".add_music_btn").bind("click",
                function() {
                    $(this).hide(),
                        $(".music_text").show()
                }),
            $(r).live("mousemove",
                function() {
                    $(r).removeClass("current"),
                        $(this).addClass("current")
                }).live("click",
                function() {
                    e.song_select()
                }),
            $(".editor_music_box .stop,.editor_music_box .play").live("click",
                function() {
                    e.music_control($(this).hasClass("stop"))
                }),
            $(".music_delete").live("click",
                function() {
                    $(".editor_music").empty(),
                        window.musicConf = e.cur_song_index = null,
                        $(".music_text").show(),
                        clearInterval(e.xiami_st)
                }),
            $(".music_text input").bind("focus",
                function(t) {
                    var n = $(this);
                    n.data("st") && clearTimeout(n.data("st"));
                    if (!e.can_search) return !1;
                    n.hasClass("gray") ? n.val("").removeClass("gray") : e.search_song(n.val()),
                        $("#" + this.SEARCHLIST_ID).length || e.add_search_list(n)
                }).bind("blur",
                function() {
                    var n = $(this);
                    $.trim(n.val()).length == 0 && n.val(t).addClass("gray"),
                        n.data("st", setTimeout(function() {
                                e.can_search = !0,
                                    e.removeSearch()
                            },
                            300))
                }).bind("keyup",
                function(t) {
                    var n = $(this),
                        r = t.keyCode,
                        i = n.val();
                    e.can_search = !0;
                    switch (r) {
                        case 13:
                            e.song_select();
                            break;
                        case 38:
                            t.preventDefault(),
                                e.change_cur_select(!1);
                            break;
                        case 40:
                            t.preventDefault(),
                                e.change_cur_select(!0);
                            break;
                        case 27:
                            e.removeSearch();
                            break;
                        default:
                            e.cur_search_st && clearTimeout(e.cur_search_st),
                                e.cur_search_st = setTimeout(function() {
                                        e.search_song(i),
                                            e.cur_search_st = null
                                    },
                                    100)
                    }
                })
    },
    search_song: function(e, t) {
        var n = this;
        t = t || 1,
            e = $.trim(e);
        if (e.length == 0) return !1;
        n.cur_request && n.can_search && n.cur_request.abort(),
            r_num = Math.floor(Math.random() * 999999),
            url = n.SEARCH_URL + "?key=" + e + "&page=" + t + "&_=" + r_num,
            url = encodeURI(url),
            n.cur_request = $.ajax({
                url: n.EXCUTE_URL,
                type: "get",
                dataType: "json",
                data: {
                    url: url
                },
                success: function(e, t) {
                    var r = "";
                    if (e) {
                        list_data = n.$search_data = e;
                        for (i in list_data) r += n.render_search_item(list_data[i]);
                        n.search_ended = e.length < n.search_item_limit,
                            console.log(e),
                            $("#" + n.SEARCHLIST_ID).show().find(".m_total").text("").end().find("ul").html(r).find("li:first").addClass("current")
                    }
                },
                error: function() {
                    $("#" + n.SEARCHLIST_ID).hide()
                }
            })
    },
    song_select: function() {
        var e = this,
            t = $("#" + e.SEARCHLIST_ID + " li.current").index(),
            n = e.$search_data[t];
        e.cur_song_index = t,
            n.title && e.render_xiamiplayer(n.id, $(".editor_music"), !0)
    },
    change_cur_select: function(e) {
        var t = this,
            n = $("#" + t.SEARCHLIST_ID + " li"),
            r = n.length,
            i = n.filter(".current").index(),
            s = i + (e ? 1 : -1);
        if (s < 0 || s > r - 1) return !1;
        n.removeClass("current").filter(":eq(" + s + ")").addClass("current")
    },
    add_search_list: function(e) {
        var t = '<div id="' + this.SEARCHLIST_ID + '" class="find_list_end hide"><div class="find_cont"><ul></ul><div class="music_idea clearfix"><div class="music_switch"><a href="javasctipt:void(0);" class="m_switch_btn up_btn"></a><a href="javasctipt:void(0);" class="m_switch_btn next_btn"></a></div><p><span class="m_total">鍏辨湁<span class="number"></span>棣栫浉鍏虫瓕鏇�</span><span class="m_come">鏉ヨ嚜锛氳櫨绫抽煶涔�</span></p></div></div></div>',
            n = this;
        $("#" + n.SEARCHLIST_ID).remove(),
            $("body").append(t),
            $("#" + n.SEARCHLIST_ID).css({
                top: e.offset().top + e.height() + 2,
                left: e.offset().left - 1,
                width: e.width() + 6
            }).find(".next_btn,.up_btn").unbind("click").bind("click",
                function(e) {
                    var t = $(".music_text input");
                    n.can_search = !1,
                        n.$search_page = n.$search_page + ($(this).hasClass("next_btn") ? 1 : -1);
                    if (n.$search_page <= 0 || n.search_ended) return !1;
                    n.search_song(t.val(), n.$search_page),
                        t.focus(),
                        e.preventDefault()
                })
    },
    music_control: function(e) {
        var t = document.getElementById("xiami_player");
        e ? (t.play(), $(".editor_music_box .stop").hide(), $(".editor_music_box .play").show()) : (t.pause(), $(".editor_music_box .stop").show(), $(".editor_music_box .play").hide())
    },
    render_xiamiplayer: function(e, t, n) {
        var r = this,
            i = '<embed src="http://www.xiami.com/widget/0_' + e + '/singlePlayer.swf" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent">',
            s = !1;
        $(".editor_music_box").remove(),
            $(".music_text").hide().find("input").blur(),
            r.removeSearch(),
            t.html(i),
            n && t.append('<div class="music_box_right"><a href="javascript:void(0);" class="music_delete"></a></div>');
        if (s) {
            var o = document.getElementById("xiami_player");
            o && o.play()
        } else $(".editor_music_box .play,.editor_music_box .stop").toggle()
    },
    xiami_play: function() {
        var e = $(".music_box_right .schedule span"),
            t = document.getElementById("xiami_player"),
            n = 100 * (t.currentTime / t.duration);
        e.width(n + "%"),
            t.currentTime >= t.duration - 1 && t.duration && (t.load(), t.currentTime = 0, t.play())
    },
    flash_xiamiplayer: function(e, t) {
        var n = this.sub_name(e.title, 13),
            r = this.sub_name(e.author, 13),
            i = "http://pkstatic.b0.upaiyun.com/xiami_player.swf?mp3=" + e.src + "&name=" + n + " 鈥斺€� " + r + "&auto=" + t,
            s = 240,
            o = 33;
        return '<div class="editor_music_box clearfix"><object id="xiami_player" width="' + s + '" height="' + o + '" classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" type="application/x-shockwave-flash"><param name="movie" value="' + i + '"><param name="wmode" value="transparent"/><embed wmode="transparent" width="' + s + '" height="' + o + '" src="' + i + '" name="xiami_player" pluginspage="http://www.macromedia.com/go/getflashplayer"/></object></div>'
    },
    html5_xiamiplayer: function(e) {
        var t = this.sub_name(e.title, 13),
            n = this.sub_name(e.author, 13),
            r = e.src;
        return '<div class="editor_music_box clearfix"><div class="music_box_left"><a href="javascript:void(0);" class="music_broadcast play"></a><a href="javascript:void(0);" class="music_broadcast stop" style="display: none;"></a></div><div class="music_box_right"><h4>' + t + " 鈥斺€� <span>" + n + '</span></h4><div class="schedule"><span></span></div></div></div><audio id="xiami_player"  preload="auto" src="' + r + "?data=" + (new Date).valueOf() + '"></audio></div>'
    },
    render_search_item: function(e) {
        var t = this.sub_name(decodeURIComponent(e.title), 12),
            n = this.sub_name(decodeURIComponent(e.author), 12),
            r = e.src;
        return '<li><a href="javascript:void(0);"><p><span>' + t + " 鈥斺€� </span>" + n + "</p></a></li>"
    },
    sub_name: function(e, t) {
        return e.length < t ? e : e.substr(0, t - 3) + "..."
    },
    removeSearch: function() {
        $("#" + this.SEARCHLIST_ID).hide()
    },
    uploadImage: function() {
        var e = this,
            t = "/api/card/uploadimg";
        if (PKINFO.islogin != 1) return openlogintip(), !1;
        $.ajaxFileUpload({
            url: "/api/posts/uploadimg",
            secureuri: !1,
            fileElementId: "picfile",
            dataType: "json",
            type: "post",
            success: function(e) {
                if (e.code == "A00000") {
                    var t = "<p><img src='" + e.data.picurl + "'/></p>";
                    $editor.execCommand("insertHtml", t)
                } else showerrortip(PKINFO.eCode[e.code])
            },
            error: function(e, t, n) {
                console.log(e)
            }
        })
    },
    create_tag: function(e) {
        var t = !0;
        $.each($(".tag_choose .tag_name"),
            function() {
                $(this).text() == e && (t = !1)
            });
        if ($.trim(e).length == 0 || $(".tag_choose .tag_name").length >= this.TAG_MAX_LENGTH) t = !1;
        return t ? '<div class="tag_name">' + e + '<a class="tag_delete"></a></div>' : ""
    },
    get_submit_param: function() {
        var e = this,
            t = {},
            n = $(".title_input"),
            r = ["font", "align", "lang", "width", "height", "hspace", "valign"];
        return t.title = $.trim(n.val()),
            t.content = UE.getEditor("editor").getContent(),
            t.contentid = $("#contentid").val(),
            t.postsfrom = $("#postsfrom").val(),
            t.draftid = $("#draftid").val(),
            t.fromid = $("#fromid").val(),
            t.copyright = $("input[name=copyright]:checked").val(),
            t.copyright_desc = t.copyright == "2" ? $("#copyright_desc").val() : "",
            t.collectid = $("#collectid").val(),
            t.tags = $.map($(".tag_choose .tag_name"),
                function(e, t) {
                    return $.trim($(e).text())
                }).join(","),
            e.$search_data && typeof e.cur_song_index == "number" && (t.songid = e.$search_data[e.cur_song_index]),
            t.albumids = $("#albumids").val(),
            t.songid ? t.songid = t.songid.id : window.musicConf && (t.songid = musicConf.songid),
            e.check_param(t) ? t : !1
    },
    check_param: function(e) {
        return e.title.length > this.MAX_TITLE_LENGTH ? (showerrortip("鏍囬闀垮害涓嶈兘澶т簬" + this.MAX_TITLE_LENGTH), !1) : $(e.content).text().length == 0 ? (showerrortip("鍐呭涓嶈兘涓虹┖"), !1) : $("input[name=copyright]").length ? !0 : (showerrortip("璇烽€夋嫨鐗堟潈褰掑睘"), !1)
    },
    submit_post: function(e) {
        var t = this,
            n = !!$("#isupdate").val(),
            r = n ? t.UPDATE_POST_URL : t.ADD_POST_URL;
        if (!$(".tag_choose .tag_name").length) {
            alert("鑷冲皯閫夋嫨涓€涓被鍨嬫爣绛俱€�");
            return
        }
        $.post(r, e,
            function(e) {
                e.code == "A00000" ? $("#collectid").length ? showerrortip(e.data.msg,
                    function() {
                        location.href = e.data.data.url
                    }) : location.href = e.data.data.url : showerrortip(e.data.msg)
            },
            "json")
    }
};
Pianke.writegposts = {
    ADD_POST_URL: "/api/gposts/add",
    UPDATE_POST_URL: "/api/gposts/update",
    EXCUTE_URL: "/api/common/getUrlResponse.php",
    SEARCH_URL: "http://www.xiami.com/web/search-songs",
    XIAMI_GETSONGS: "http://www.xiami.com/web/get-songs",
    MAX_TITLE_LENGTH: 30,
    TAG_MAX_LENGTH: 3,
    SEARCHLIST_ID: "_SEARCHLIST_ID_",
    on_writing: /writing/.test(location.pathname),
    cur_request: null,
    cur_search_st: null,
    $search_data: [],
    $search_page: 1,
    cur_song_index: null,
    can_search: !0,
    search_ended: !1,
    search_item_limit: 10,
    init: function() {
        if ($("#editor").length || this.on_writing) this.bindEvent(),
            Pianke.user.bindChooselog(),
            UE && UE.getEditor("editor", {
                initialFrameWidth: "100%",
                autoHeightEnabled: !0
            });
        window.musicConf && ($(".add_music_btn").hide(), this.render_xiamiplayer(musicConf.songid, $(".editor_music"), musicConf.isupdate))
    },
    bindEvent: function() {
        var e = this;
        $(".title_input").bind("focus",
                function() {
                    $(this).removeClass("gray")
                }),
            $.browser.msie ? $("#picfile").live("click",
                function(t) {
                    var n = $(this),
                        r = 0,
                        i = function() {
                            n.blur(),
                                $(".add_cont .a_image").parent().show(),
                                e.UP_LOAD_IMG = !0,
                                e.uploadImage()
                        };
                    clearInterval(n.data("st")),
                        n.data("st", setInterval(function() {
                                r >= 1e3 && clearInterval(n.data("st")),
                                    n.val().length > 0 && (i(), clearInterval(n.data("st"))),
                                    r += 1
                            },
                            300))
                }) : $("#picfile").die("change").live("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    e.uploadImage()
                }),
            $(".gposts_send").bind("click",
                function() {
                    if (!$("#isupdate").val()) e.show_vcode();
                    else {
                        var t = e.get_submit_param();
                        t && e.submit_post(t)
                    }
                }),
            $(".layer_vcode").find(".close").bind("click",
                function() {
                    $(".layer_vcode").hide()
                }).end().find(".the_code a").bind("click",
                function() {
                    $(".the_code img").attr("src", "/api/posts/getvcode.php")
                }).end().end().find(".submit_code a").bind("click",
                function() {
                    var t = e.get_submit_param();
                    t.vcode = $(".valid_code input").val(),
                        t && e.submit_post(t)
                }),
            e.xiamiEvent()
    },
    show_vcode: function() {
        if (PKINFO.islogin != 1) return openlogintip(), !1;
        $(".layer_vcode").show().find(".the_code img").attr("src", "/api/posts/getvcode.php")
    },
    xiamiEvent: function() {
        var e = this,
            t = "璇风敤姝屽悕銆佷笓杈戙€佽壓鏈鎼滅储",
            n = "#" + e.SEARCHLIST_ID,
            r = n + " li";
        $(".add_music_btn").bind("click",
                function() {
                    $(this).hide(),
                        $(".music_text").show()
                }),
            $(r).live("mousemove",
                function() {
                    $(r).removeClass("current"),
                        $(this).addClass("current")
                }).live("click",
                function() {
                    e.song_select()
                }),
            $(".editor_music_box .stop,.editor_music_box .play").live("click",
                function() {
                    e.music_control($(this).hasClass("stop"))
                }),
            $(".music_delete").live("click",
                function() {
                    $(".editor_music").empty(),
                        window.musicConf = e.cur_song_index = null,
                        $(".music_text").show(),
                        clearInterval(e.xiami_st)
                }),
            $(".music_text input").bind("focus",
                function(t) {
                    var n = $(this);
                    n.data("st") && clearTimeout(n.data("st"));
                    if (!e.can_search) return !1;
                    n.hasClass("gray") ? n.val("").removeClass("gray") : e.search_song(n.val()),
                        $("#" + this.SEARCHLIST_ID).length || e.add_search_list(n)
                }).bind("blur",
                function() {
                    var n = $(this);
                    $.trim(n.val()).length == 0 && n.val(t).addClass("gray"),
                        n.data("st", setTimeout(function() {
                                e.can_search = !0,
                                    e.removeSearch()
                            },
                            300))
                }).bind("keyup",
                function(t) {
                    var n = $(this),
                        r = t.keyCode,
                        i = n.val();
                    e.can_search = !0;
                    switch (r) {
                        case 13:
                            e.song_select();
                            break;
                        case 38:
                            t.preventDefault(),
                                e.change_cur_select(!1);
                            break;
                        case 40:
                            t.preventDefault(),
                                e.change_cur_select(!0);
                            break;
                        case 27:
                            e.removeSearch();
                            break;
                        default:
                            e.cur_search_st && clearTimeout(e.cur_search_st),
                                e.cur_search_st = setTimeout(function() {
                                        e.search_song(i),
                                            e.cur_search_st = null
                                    },
                                    100)
                    }
                })
    },
    search_song: function(e, t) {
        var n = this;
        t = t || 1,
            e = $.trim(e);
        if (e.length == 0) return !1;
        n.cur_request && n.can_search && n.cur_request.abort(),
            r_num = Math.floor(Math.random() * 999999),
            url = n.SEARCH_URL + "?key=" + e + "&page=" + t + "&_=" + r_num,
            url = encodeURI(url),
            n.cur_request = $.ajax({
                url: n.EXCUTE_URL,
                type: "get",
                dataType: "json",
                data: {
                    url: url
                },
                success: function(e, t) {
                    var r = "";
                    if (e) {
                        list_data = n.$search_data = e;
                        for (i in list_data) r += n.render_search_item(list_data[i]);
                        n.search_ended = e.length < n.search_item_limit,
                            console.log(e),
                            $("#" + n.SEARCHLIST_ID).show().find(".m_total").text("").end().find("ul").html(r).find("li:first").addClass("current")
                    }
                },
                error: function() {
                    $("#" + n.SEARCHLIST_ID).hide()
                }
            })
    },
    song_select: function() {
        var e = this,
            t = $("#" + e.SEARCHLIST_ID + " li.current").index(),
            n = e.$search_data[t];
        e.cur_song_index = t,
            n.title && e.render_xiamiplayer(n.id, $(".editor_music"), !0)
    },
    change_cur_select: function(e) {
        var t = this,
            n = $("#" + t.SEARCHLIST_ID + " li"),
            r = n.length,
            i = n.filter(".current").index(),
            s = i + (e ? 1 : -1);
        if (s < 0 || s > r - 1) return !1;
        n.removeClass("current").filter(":eq(" + s + ")").addClass("current")
    },
    add_search_list: function(e) {
        var t = '<div id="' + this.SEARCHLIST_ID + '" class="find_list_end hide"><div class="find_cont"><ul></ul><div class="music_idea clearfix"><div class="music_switch"><a href="javasctipt:void(0);" class="m_switch_btn up_btn"></a><a href="javasctipt:void(0);" class="m_switch_btn next_btn"></a></div><p><span class="m_total">鍏辨湁<span class="number"></span>棣栫浉鍏虫瓕鏇�</span><span class="m_come">鏉ヨ嚜锛氳櫨绫抽煶涔�</span></p></div></div></div>',
            n = this;
        $("#" + n.SEARCHLIST_ID).remove(),
            $("body").append(t),
            $("#" + n.SEARCHLIST_ID).css({
                top: e.offset().top + e.height() + 2,
                left: e.offset().left - 1,
                width: e.width() + 6
            }).find(".next_btn,.up_btn").unbind("click").bind("click",
                function(e) {
                    var t = $(".music_text input");
                    n.can_search = !1,
                        n.$search_page = n.$search_page + ($(this).hasClass("next_btn") ? 1 : -1);
                    if (n.$search_page <= 0 || n.search_ended) return !1;
                    n.search_song(t.val(), n.$search_page),
                        t.focus(),
                        e.preventDefault()
                })
    },
    music_control: function(e) {
        var t = document.getElementById("xiami_player");
        e ? (t.play(), $(".editor_music_box .stop").hide(), $(".editor_music_box .play").show()) : (t.pause(), $(".editor_music_box .stop").show(), $(".editor_music_box .play").hide())
    },
    render_xiamiplayer: function(e, t, n) {
        var r = this,
            i = '<embed src="http://www.xiami.com/widget/0_' + e + '/singlePlayer.swf" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent">',
            s = !1;
        $(".editor_music_box").remove(),
            $(".music_text").hide().find("input").blur(),
            r.removeSearch(),
            t.html(i),
            n && t.append('<div class="music_box_right"><a href="javascript:void(0);" class="music_delete"></a></div>');
        if (s) {
            var o = document.getElementById("xiami_player");
            o && o.play()
        } else $(".editor_music_box .play,.editor_music_box .stop").toggle()
    },
    xiami_play: function() {
        var e = $(".music_box_right .schedule span"),
            t = document.getElementById("xiami_player"),
            n = 100 * (t.currentTime / t.duration);
        e.width(n + "%"),
            t.currentTime >= t.duration - 1 && t.duration && (t.load(), t.currentTime = 0, t.play())
    },
    flash_xiamiplayer: function(e, t) {
        var n = this.sub_name(e.title, 13),
            r = this.sub_name(e.author, 13),
            i = "http://pkstatic.b0.upaiyun.com/xiami_player.swf?mp3=" + e.src + "&name=" + n + " 鈥斺€� " + r + "&auto=" + t,
            s = 240,
            o = 33;
        return '<div class="editor_music_box clearfix"><object id="xiami_player" width="' + s + '" height="' + o + '" classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" type="application/x-shockwave-flash"><param name="movie" value="' + i + '"><param name="wmode" value="transparent"/><embed wmode="transparent" width="' + s + '" height="' + o + '" src="' + i + '" name="xiami_player" pluginspage="http://www.macromedia.com/go/getflashplayer"/></object></div>'
    },
    html5_xiamiplayer: function(e) {
        var t = this.sub_name(e.title, 13),
            n = this.sub_name(e.author, 13),
            r = e.src;
        return '<div class="editor_music_box clearfix"><div class="music_box_left"><a href="javascript:void(0);" class="music_broadcast play"></a><a href="javascript:void(0);" class="music_broadcast stop" style="display: none;"></a></div><div class="music_box_right"><h4>' + t + " 鈥斺€� <span>" + n + '</span></h4><div class="schedule"><span></span></div></div></div><audio id="xiami_player"  preload="auto" src="' + r + "?data=" + (new Date).valueOf() + '"></audio></div>'
    },
    render_search_item: function(e) {
        var t = this.sub_name(decodeURIComponent(e.title), 12),
            n = this.sub_name(decodeURIComponent(e.author), 12),
            r = e.src;
        return '<li><a href="javascript:void(0);"><p><span>' + t + " 鈥斺€� </span>" + n + "</p></a></li>"
    },
    sub_name: function(e, t) {
        return e.length < t ? e : e.substr(0, t - 3) + "..."
    },
    removeSearch: function() {
        $("#" + this.SEARCHLIST_ID).hide()
    },
    uploadImage: function() {
        var e = this,
            t = "/api/card/uploadimg";
        if (PKINFO.islogin != 1) return openlogintip(), !1;
        $.ajaxFileUpload({
            url: "/api/posts/uploadimg",
            secureuri: !1,
            fileElementId: "picfile",
            dataType: "json",
            type: "post",
            success: function(e) {
                if (e.code == "A00000") {
                    var t = "<p><img src='" + e.data.picurl + "'/></p>";
                    $editor.execCommand("insertHtml", t)
                } else showerrortip(PKINFO.eCode[e.code])
            },
            error: function(e, t, n) {
                console.log(e)
            }
        })
    },
    get_submit_param: function() {
        var e = this,
            t = {},
            n = $(".groupid_select"),
            r = $(".title_input"),
            i = ["font", "align", "lang", "width", "height", "hspace", "valign"];
        return t.groupid = $.trim(n.val()),
            t.title = $.trim(r.val()),
            t.content = UE.getEditor("editor").getContent(),
            t.contentid = $("#contentid").val(),
            e.$search_data && typeof e.cur_song_index == "number" && (t.songid = e.$search_data[e.cur_song_index]),
            t.songid ? t.songid = t.songid.id : window.musicConf && (t.songid = musicConf.songid),
            e.check_param(t) ? t : !1
    },
    check_param: function(e) {
        return e.title.length > this.MAX_TITLE_LENGTH ? (showerrortip("鏍囬闀垮害涓嶈兘澶т簬" + this.MAX_TITLE_LENGTH), !1) : $(e.content).text().length == 0 ? (showerrortip("鍐呭涓嶈兘涓虹┖"), !1) : !0
    },
    submit_post: function(e) {
        var t = this,
            n = !!$("#isupdate").val(),
            r = n ? t.UPDATE_POST_URL : t.ADD_POST_URL;
        $.post(r, e,
            function(e) {
                e.code == "A00000" ? location.href = e.data.data.url : showerrortip(e.data.msg)
            },
            "json")
    }
};
Pianke.public = {
    init: function() {
        this.bindEvent()
    },
    bindEvent: function() {
        var e = [],
            t = $(".q_nav ul"),
            n = this;
        $.each($(".q_article"),
                function(t) {
                    var n = $(this),
                        r = n.offset().top,
                        i = t ? r : 0,
                        s = r + n.height() + parseInt(n.css("padding-top"), 10);
                    e.push({
                        top: i,
                        bottom: s
                    })
                }),
            n.init_copyclipboard($(".copy_link")[0], $(".links_input textarea").val()),
            $(window).bind("scroll",
                function() {
                    var n = $(this).scrollTop();
                    for (i in e) e[i].top < n && e[i].bottom > n && (t.find("li:eq(" + i + ")").hasClass("current") || t.find("li").removeClass("current").filter(":eq(" + i + ")").addClass("current"))
                }),
            $(".pic .close").live("click",
                function() {
                    $(this).parent().remove()
                }),
            $.browser.msie ? $("#picfile").live("click",
                function(e) {
                    var t = $(this),
                        r = function() {
                            t.blur(),
                                bool = $(this).hasClass("background_add"),
                                n.uploadImage(bool)
                        };
                    clearInterval(t.data("st")),
                        t.data("st", setInterval(function() {
                                i >= 1e3 && clearInterval(t.data("st")),
                                    t.val().length > 0 && (r(), clearInterval(t.data("st"))),
                                    i += 1
                            },
                            300))
                }) : $("#picfile").live("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    if ($(".pic li").length >= 5) return !1;
                    bool = $(this).hasClass("background_add"),
                        n.uploadImage(bool)
                })
    },
    uploadImage: function(e) {
        var t = this,
            n = $(".add_inst img");
        n.show(),
            data = e ? {
                type: "background"
            } : {},
            $.ajaxFileUpload({
                url: "/api/contribute/uploadimg.php",
                secureuri: !1,
                fileElementId: "picfile",
                dataType: "json",
                type: "post",
                success: function(e, r) {
                    n.hide(),
                        t.afterUpload(e)
                },
                error: function(e, r, i) {
                    n.hide(),
                        t.afterUpload(e)
                }
            })
    },
    afterUpload: function(data) {
        data = eval("(" + data.responseText + ")");
        if (data.code != "A00000") alert(PKINFO.eCode[data.code]);
        else {
            var src = data.data.picurl,
                inner = '<a href="javascript:void(0);" class="close"></a><div class="image"><p><img src="' + src + '" /></p></div>',
                el = $("<li></li>").html(inner);
            $(".case ul").append(el)
        }
    },
    init_copyclipboard: function(e, t) {
        var n = "http://pkstatic.b0.upaiyun.com/zeroClipBoard.js",
            r = document.createElement("script"),
            i = "_copy_";
        r.src = n,
            r.id = "copy_script",
            document.body.appendChild(r),
            $("#copy_script").load(function() {
                $(e).attr({
                        id: i
                    }),
                    ZeroClipboard.setMoviePath("http://davidwalsh.name/demo/ZeroClipboard.swf");
                var n = new ZeroClipboard.Client;
                n.addEventListener("mousedown",
                        function() {
                            n.setText(t)
                        }),
                    n.addEventListener("complete",
                        function(e, t) {
                            alert("澶嶅埗鎴愬姛銆�")
                        }),
                    n.glue(i)
            })
    }
};
Pianke.slider = {
    banner_st: null,
    init: function() {
        var e = this;
        e.bindEvent();
        if (location.pathname.split("/")[1] == "index") {
            var t = getCookie("closeBanner-mobile") != "1";
            $(".dots,.banner:first").toggle(t),
                t && $(".index-banner").addClass("on"),
                Pianke.create.create_player(!0),
                Pianke.create.bindPlayer(),
                e.banner_st = setTimeout(function() {
                        t && e.change_banner()
                    },
                    5e3),
                st = setInterval(function() {
                        e.change_hot()
                    },
                    27e3)
        }
    },
    bindEvent: function() {
        var e = this;
        $(".banner-close").click(function() {
                setCookie("closeBanner-mobile", "1", 1),
                    $(".index-banner").removeClass("on"),
                    $(".banner,.index-banner .dots").remove(),
                    clearTimeout(e.banner_st)
            }),
            $(".index-banner .dots li").bind("click",
                function() {
                    var t = $(this).index();
                    e.change_banner(t)
                }),
            $(".hot_caption .cutover li").bind("click",
                function() {
                    var t = $(this),
                        n = t.index();
                    e.change_hot(n)
                }),
            $(".card_list_slider .down,.c_switch .imgdown").bind("click",
                function() {
                    e.slider_move()
                }),
            $(".card_list_slider .up,,.c_switch .imgup").bind("click",
                function() {
                    e.slider_move("prev")
                }),
            $(".card_list_slider .share").bind("click",
                function() {
                    e.share_card($(this))
                })
    },
    change_hot: function(e) {
        var t = $(".hot_caption .cutover li");
        e || (e = t.find("a.current").parent().index(), e++, e >= t.length && (e = 0)),
            $(".cutover a.current").removeClass("current"),
            t.filter(":eq(" + e + ")").find("a").addClass("current"),
            $(".recommend_hot ul").hide().filter(":eq(" + e + ")").show()
    },
    change_banner: function(e) {
        var t = this,
            n = $(".index-banner .banner"),
            r = 500;
        clearTimeout(t.banner_st);
        if (n.length == 1) return;
        e || (e = $(".banner:visible").index(), e++, e >= n.length && (e = 0)),
            $(".index-banner .dots li").removeClass("active").filter(":eq(" + e + ")").addClass("active"),
            n.fadeOut(r),
            n.filter(":eq(" + e + ")").fadeIn(r),
            t.banner_st = setTimeout(function() {
                    t.change_banner()
                },
                5e3)
    },
    slider_move: function(e) {
        var t = $(".card_list_slider .area").length ? $(".card_list_slider .area") : $(".c_cont_auther"),
            n = t.filter(":visible"),
            e = e || "next";
        e == "next" ? (next = n.next(), next.length || (next = t.first())) : (next = n.prev(), next.length || (next = t.last())),
            n.hide(),
            next.fadeIn()
    },
    share_card: function(e) {
        var t = {
                url: e.attr("data-url") || location.href,
                type: "3",
                count: "",
                appkey: "2069323349",
                title: e.attr("data-content"),
                pic: e.attr("data-img_url"),
                ralateUid: "",
                language: "zh_cn",
                rnd: (new Date).valueOf()
            },
            n = [];
        for (var r in t) n.push(r + "=" + encodeURIComponent(t[r] || ""));
        var i = "http://service.weibo.com/share/share.php?" + n.join("&");
        return window.open(i), !1
    }
};
Pianke.ting = {
    HEADER_HEI: 100,
    ITEM_SIZE: 240,
    DETAIL_SIZE: 166,
    page: 0,
    cur_type: "list",
    ting: [],
    origin_ting: [],
    ting_hash: {},
    cur_ting: !1,
    cur_form: "all",
    pagination_count: 0,
    DEFAULT_WIDTH: 245,
    running: !1,
    p_animate: null,
    pause_counter: 0,
    cur_time: 0,
    GET_LIST_URL: "/api/ting/list",
    PLAYER_URL: "http://pkstatic.b0.upaiyun.com/ting.swf",
    tingid: location.hash.split("#")[1] || !1,
    cur_num: 0,
    for_list: /profile|nj/.test(location.href),
    init: function() {
        this.reset_layout(),
            this.bindEvent(),
            this.for_list ? window.tingList ? (this.origin_ting = this.ting = tingList, this.serialize_hash(tingList), this.render_profileList(), Pianke.comment.getcomment($(".message_box"), 1, 1, !0, !0, "nj")) : window.njList && (this.origin_ting = this.ting = njList, this.serialize_hash(njList), this.render_njList(njList)) : (this.tingid && (this.cur_type = "detail"), $("#from_uid").val() && $("#from_uid").val().length && (this.cur_form = "user"), this.fetchData())
    },
    bindEvent: function() {
        var e = this;
        $(document).bind("keyup",
                function(e) {
                    e.keyCode == 32 && $(".h5_control .btn:visible").click()
                }),
            $(document).ajaxSuccess(function() {
                setTimeout(function() {
                        if (e.for_list) {
                            var t = $(".list_left").height() - 50,
                                n = $(".l_left_box").height();
                            t < n && $(".list_left").height(n + 120)
                        }
                    },
                    333)
            }),
            $(window).resize(function() {
                window.HAS_AUDIO && (e.reset_layout(), e.render_ting())
            }),
            $("#ting_detail_list li").live("mousemove",
                function() {
                    if ($(this).hasClass("current")) return !1;
                    $(this).css({
                        marginTop: -30
                    }).find("img")
                }).live("mouseleave",
                function() {
                    if ($(this).hasClass("current")) return !1;
                    $(this).css({
                        marginTop: 0
                    }).find("img")
                }),
            $(".h5_control .btn").live("click",
                function() {
                    var t = $(this).hasClass("play");
                    $(".h5_control .btn").toggle(),
                        e.h5_control(t)
                }),
            $(".subnav_style a").bind("click",
                function(t) {
                    var n = $(this),
                        r = n.attr("data-type"),
                        i = n.attr("data-value") ? "_" + n.attr("data-value") : "",
                        s = r + i;
                    t.preventDefault(),
                        $(".subnav_style a").removeClass("current"),
                        n.addClass("current"),
                        r ? (e.cur_form = "tag", e.ting = e.ting_hash[s]) : (e.cur_form = "all", e.ting = e.origin_ting),
                        location.hash = "",
                        e.page = 0,
                        e.tingid = !1,
                        /nj/.test(location.pathname) ? e.render_njList(e.ting) : e.render_list()
                }),
            $(".like_btn").live("click",
                function() {
                    e.like_ting($(this))
                }),
            $(".msg_input,.m_cancel").bind("click",
                function() {
                    var e = $(this);
                    e.find("textarea").length || (e.hasClass("m_right") ? $(".msg_input").toggle().find("textarea").focus() : $(".msg_input").toggle().find("textarea").val(""))
                }),
            $(".l_icon.all,.all_btn,.s_all_btn,.s_style_btn").live("click",
                function(t) {
                    if (!e.for_list) {
                        t.preventDefault();
                        if (PKINFO.islogin != 1) return openlogintip(), !1
                    }
                    $(".subnav_style .current").attr("data-type") ? e.cur_form = "tag" : e.cur_form = "all",
                        e.cur_type = "list",
                        $(".subnav_style a:first").click(),
                        e.show_listView()
                }),
            $(".random_btn").live("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(function() {
                        var t = Math.floor(Math.random() * e.ting.length);
                        e.cur_type = "detail",
                            e.render_detail(t)
                    }), !1;
                    var t = Math.floor(Math.random() * e.ting.length);
                    e.cur_type = "detail",
                        e.render_detail(t)
                }),
            $(".list_cont .up_btn").live("click",
                function() {
                    if ($(this).hasClass("up_btn_no")) return !1;
                    e.prev_slide()
                }),
            $(".list_cont .down_btn").live("click",
                function() {
                    if ($(this).hasClass("down_btn_no")) return !1;
                    e.next_slide()
                }),
            $(".l_right .next_btn,.l_right .up_btn").live("click",
                function() {
                    var t = $(this).hasClass("next_btn");
                    if (PKINFO.islogin != 1) return openlogintip(function() {
                        e.change_ting(t)
                    }), !1;
                    e.change_ting(t)
                }),
            $(".l_footer .up_btn,.l_footer .down_btn").live("click",
                function() {
                    var t = $(this).hasClass("down_btn");
                    e.change_detail_list(t)
                }),
            e.for_list || $(".pics li,#ting_detail_list li").live("click",
                function() {
                    var t = parseInt($(this).attr("data-id"), 10);
                    $("#ting_detail_list li").removeClass("current"),
                        $(this).addClass("current"),
                        e.cur_type = "detail",
                        e.cur_num = t,
                        e.render_detail(t)
                }),
            $(".l_share li a").live("click",
                function() {
                    var t = $(this),
                        n = e.ting[e.cur_ting],
                        r = t.attr("data-type"),
                        i = location.href,
                        s = n.cntInfo.title,
                        o = n.cntInfo.userinfo.uname,
                        u = n.musicUserInfo.uname,
                        a = "鎴戞鍦ㄦ敹鍚潵鑷�" + o + "鐨勪綔鍝併€�" + s + "銆嬶紝涓绘挱锛�" + u + "銆傜敤澹伴煶浜ゆ崲涓栫晫锛屾垜鍦�#鐗囧埢路ting#",
                        f = n.imgUrl,
                        l = !1;
                    redirect_to_sns(r, i, a, f, l, s)
                })
    },
    fetchData: function() {
        var e = this;
        if (e.tingid) var t = {
            tingid: e.tingid
        };
        $.ajax({
            url: e.GET_LIST_URL,
            type: "GET",
            data: t || {},
            success: function(t) {
                t.code == "A00000" ? (e.ting = t.data.data, e.origin_ting = e.ting, e.serialize_hash(e.ting), /show_all/.test(location.href) ? (e.cur_type = "list", e.show_listView()) : (e.cur_type = "detail", e.cur_form == "user" && (e.ting = e.ting_hash["user_" + $("#from_uid").val()]), e.render_detail(0))) : msg_modal(t.data.msg, 99999)
            },
            dataType: "json"
        })
    },
    render_ting: function() {
        var e = this;
        e.cur_type == "detail" ? e.render_detail(0) : e.render_list()
    },
    serialize_hash: function(e) {
        var t = this;
        for (i in e) {
            var n = e[i];
            if (n) {
                if (n.styleInfo && n.styleInfo.style) {
                    var r = n.styleInfo.style.toString().split(",");
                    for (i in r) {
                        var s = r[i];
                        s && (t.ting_hash["style_" + s] || (t.ting_hash["style_" + s] = []), t.ting_hash["style_" + s].push(n))
                    }
                }
                n.genderInfo && n.genderInfo.gender && (t.ting_hash["gender_" + n.genderInfo.gender] || (t.ting_hash["gender_" + n.genderInfo.gender] = []), t.ting_hash["gender_" + n.genderInfo.gender].push(n)),
                    n.gender && (t.ting_hash["gender_" + n.gender] || (t.ting_hash["gender_" + n.gender] = []), t.ting_hash["gender_" + n.gender].push(n));
                if (n.musicUserInfo) {
                    var o = n.musicUserInfo.uid;
                    t.ting_hash["user_" + o] || (t.ting_hash["user_" + o] = []),
                        t.ting_hash["user_" + o].push(n)
                }
            }
        }
        if (e[0] && e[0].hot) {
            var u = e.slice(0);
            t.ting_hash.hot = t.sort_data(u)
        }
    },
    sort_data: function(e) {
        for (var t = 0,
                n = e.length; t < n; t++)
            for (var r = 0,
                    i = n - r; r < i; r++) e[t].hot > e[r].hot && (temp = e[r], e[r] = e[t], e[t] = temp);
        return e
    },
    change_ting: function(e) {
        var t = this.cur_num + (e ? 1 : -1),
            n = this;
        if (t < 0 || t >= this.ting.length) return !1;
        n.cur_type = "detail",
            this.render_detail(t)
    },
    prev_slide: function() {
        var e = this;
        if (e.page == 0 || e.running) return;
        e.page--,
            e.render_list()
    },
    next_slide: function() {
        var e = this;
        if (e.page * e.pagination_count >= e.ting.length || e.running) return;
        e.page++,
            e.render_list()
    },
    item_filpping: function() {
        var e = this,
            t = e.page * e.pagination_count,
            n = e.get_cur_page();
        if (e.running) return !1;
        e.running = !0,
            e.update_arrow_btn()
    },
    render_list: function() {
        this.reset_layout();
        var e = this,
            t = "",
            n = [],
            r = e.pagination_count * e.page;
        $(".list_cont .btn").show(),
            n = e.get_cur_page(),
            $.each(n,
                function(n) {
                    this && (this.index = r + n, t += e.list_item(this))
                }),
            $(".from_btn").empty(),
            $(".pics").html(t),
            e.update_arrow_btn()
    },
    get_cur_page: function() {
        var e = this,
            t = e.pagination_count * e.page,
            n = [];
        if (e.ting) {
            for (var r = 0; r < e.pagination_count; r++) {
                var i = e.ting[t + r];
                i && n.push(i)
            }
            return n
        }
        return 0
    },
    update_arrow_btn: function() {
        var e = $(".list_cont,.l_footer").find(".up_btn,.up_btn_no"),
            t = $(".list_cont,.l_footer").find(".down_btn,.down_btn_no"),
            n = $(".l_right .next_btn,.l_right .next_btn_no"),
            r = $(".l_right .up_btn,.l_right .up_btn_no"),
            i = this.ting.length,
            s = (this.page + 1) * this.pagination_count,
            o = this.cur_ting > 0 ? "up_btn" : "up_btn_no",
            u = this.cur_ting < i - 1 ? "next_btn" : "next_btn_no",
            a = this.page > 0 ? "up_btn" : "up_btn_no",
            f = s >= i - 1 ? "down_btn_no" : "down_btn";
        n.removeClass("up_btn up_btn_no").addClass(u),
            r.removeClass("next_btn next_btn_no").addClass(o),
            e.removeClass("up_btn up_btn_no").addClass(a),
            t.removeClass("down_btn_no down_btn").addClass(f)
    },
    reset_layout: function() {
        var e = this.DEFAULT_WIDTH,
            t = $(window).width(),
            n = $(window).height(),
            r = n - this.HEADER_HEI,
            i = t - 95 - (this.for_list ? $(".l_left_box").width() : 0),
            s = Math.floor(i / this.ITEM_SIZE),
            o = Math.floor(r / this.ITEM_SIZE),
            u = t - 260,
            a = Math.floor(u / this.DETAIL_SIZE),
            u = a * this.DETAIL_SIZE,
            f = $(".list_left"),
            l = $(".message_box").length ? $(".message_box").offset().top + 300 : 0,
            c = {
                width: this.ITEM_SIZE * s
            };
        return f.length && f.height() < l && f.height(l),
            this.for_list && ($.browser.msie && parseInt($.browser.version) <= 7 && /profile/.test(location.href) ? c.marginLeft = c.marginRight = 0 : c.marginLeft = f.width()),
            this.for_list || $(".list_cont").height(r),
            $(".pics").css(c),
            this.for_list || $(".l_footer .foot").width(u),
            this.pagination_count = $(".list_main:visible").length != 0 ? s * o : a,
            this.pagination_count
    },
    render_detail: function(e) {
        var t = this;
        if (t.for_list) return !1;
        e = e || e == 0 ? e : t.cur_num,
            t.cur_ting = e;
        if (t.cur_type == "list") return !1;
        $(".from_btn").html(t.get_from()),
            $(".l_main").is(":visible") ? (t.update_detail(e), t.init_detail_list()) : t.init_detailView(function() {
                t.reset_layout(),
                    t.update_detail(e),
                    t.init_detail_list()
            })
    },
    update_detail: function(e) {
        var t = this,
            n = t.ting[e] || t.ting[0],
            r = n.cntInfo.contentid;
        $(".list_cont .btn").hide(),
            t.cur_num = e,
            t.tingid = n.tingid,
            t.get_curlist_page(),
            location.hash = t.tingid,
            $(".l_main").show().html(t.detail_item(n)),
            $("#ting_player").html(t.get_player(n)),
            t.update_arrow_btn(),
            t.send_listencount(r);
        if (window.HAS_AUDIO) {
            var i = document.getElementById("h5_player");
            i.play(),
                clearInterval(t.p_animate),
                t.p_animate = setInterval(function() {
                        t.playing_animate()
                    },
                    50)
        }
    },
    get_curlist_page: function() {
        var e = this.cur_num,
            t = Math.floor(e / this.pagination_count),
            n = e + 1 - t * this.pagination_count > 0 ? 0 : 1;
        return this.page = t + n,
            t + n
    },
    show_listView: function(e) {
        var t = this;
        $(".l_main").hide(),
            $(".list_main").show().animate({
                    "margin-left": 0
                },
                500,
                function() {
                    location.hash = "",
                        t.page = 0,
                        t.tingid = !1,
                        t.render_list(),
                        e && e()
                }),
            $(".l_footer").animate({
                    bottom: -280
                },
                400,
                function() {
                    $(this).hide()
                })
    },
    init_detailView: function(e) {
        $(".list_main").animate({
                    "margin-left": -$(window).width()
                },
                500,
                function() {
                    $(this).hide(),
                        e && e()
                }),
            $(".l_footer").fadeIn().animate({
                    bottom: 0
                },
                800)
    },
    change_detail_list: function(e) {
        var t = this.page + (e ? 1 : -1),
            n = Math.floor(this.ting.length / this.pagination_count),
            r = this.ting.length / this.pagination_count > n ? 1 : 0;
        n += r;
        if (t < 0 || t >= n) return !1;
        this.page = t,
            this.init_detail_list(t)
    },
    init_detail_list: function(e) {
        var t = this,
            n = t.pagination_count,
            e = e || e == 0 ? e : t.get_curlist_page(),
            r = t.get_cur_page(),
            i = "",
            s = e * n;
        t.page = e,
            t.update_arrow_btn(),
            $.each(r,
                function(e) {
                    this && (this.index = s + e, i += t.detail_list_item(this))
                }),
            $("#ting_detail_list").html(i).find("[data-id=" + t.cur_ting + "]").addClass("current")
    },
    detail_list_item: function(e) {
        return '<li data-id="' + e.index + '"><div class="f_img"><div class="img_top clearfix"><h3>' + this.cut_str(e.cntInfo.title, 8) + '</h3><div class="listen_btn l_icon"><span class="blue">' + e.counterInfo.musicVisit + '</span></div></div> <a href="javascript:void(0);" ><img src="' + e.imgUrl + '" /></a></div><div class="cover"></div></li>'
    },
    list_item: function(e, t, n) {
        var r = e.counterInfo ? e.counterInfo.musicVisit : 1,
            i = e.cntInfo ? this.cut_str(e.cntInfo.title, 7) : "鏃犻",
            s = t ? "href='/ting?uid=" + e.musicUserInfo.uid + "#" + e.tingid + "' target='_blank'" : "href='javascript:void(0);'";
        return '<li data-id="' + e.index + '"><a ' + s + '><div class="img"><div class="mask_inner"></div><a ' + s + ' class="listen_to"></a><img src="' + e.imgUrl + '"><div class="listen_btn l_icon"><span>鏀跺惉锛�</span><span>' + r + '</span></div></div><div class="author"><div class="mask_inner"></div><div class="mask_content"><p class="l_idea"><span>涓绘挱锛�</span><a href="/profile/' + e.musicUserInfo.uid + '">' + e.musicUserInfo.uname + '</a></p></div></div><p class="name">' + e.cntInfo.title + "</p></a></li>"
    },
    detail_item: function(e) {
        var t = e.musicUserInfo.isnj ? '<a href="/ting/profile/' + e.musicUserInfo.uid + '" class="album">[涓撹緫]</a>' : "";
        return '<div class="l_left"><h2>' + e.cntInfo.title + '</h2><p class="l_idea"><span>涓绘挱锛�</span><a href="/profile/' + e.musicUserInfo.uid + '" target="_blank">' + e.musicUserInfo.uname + "</a>" + t + '<span class="l_away">鏂囷細</span><a href="/profile/' + e.cntInfo.userinfo.uid + '" target="_blank">' + e.cntInfo.userinfo.uname + '</a></p><div class="article"><p>' + e.cntInfo.content + '<a href="' + e.cntInfo.content_url + '" target="_blank">[鍘熸枃]</a></p></p></div><div class="icon_btn clearfix" data-id="' + e.cur_num + '"><a href="javascript:void(0);" class="icon_btn like_btn"><span class="like_icon">鍠滄</span><span class="l_number">' + e.counterInfo.love + '</span></a><div class="l_share"><a href="javascript:void(0);" class="share_btn"><span class="l_icon share_icon">鍒嗕韩</span></a><ul><li><a href="javascript:void(0);" data-type="sina" class="l_icon sina"></a></li><li><a data-type="qzone" href="javascript:void(0);" class="l_icon qzone"></a></li><li><a data-type="tengxun" href="javascript:void(0);" class="l_icon tt"></a></li><li><a href="javascript:void(0);" data-type="renren" class="l_icon renren"></a></li></ul></div><div class="listen_btn l_icon"><span>鏀跺惉锛�</span><span class="blue" id="visit_count">' + e.counterInfo.musicVisit + '</span></div></div></div><div class="l_middle" id="ting_player"><p id="ting_el"></p></div><div class="l_right" data-id="' + e.cur_num + '"><a href="javascript:void(0);" class="l_icon up_btn_no"></a><a href="javascript:void(0);" class="l_icon next_btn"></a><a href="javascript:void(0);" class="l_icon random_btn"></a></div>'
    },
    h5_control: function(e) {
        var t = document.getElementById("h5_player"),
            n = this;
        t && (e ? (t.play(), n.p_animate = setInterval(function() {
                n.playing_animate(t)
            },
            80)) : (t.pause(), clearInterval(n.p_animate)))
    },
    playing_animate: function() {
        var e = document.getElementById("h5_player"),
            t = Math.floor(e.duration - e.currentTime),
            n = t % 60,
            r = Math.floor(t / 60),
            i = $(".h5_control img"),
            s = i.data("degree") || 0,
            o = Math.sin(s),
            u = Math.cos(s),
            a = this;
        i.data("degree", s + 1),
            e.duration && e.currentTime == e.duration && (clearInterval(a.p_animate), PKINFO.islogin == 1 ? a.change_ting(!0) : openlogintip(function() {
                a.change_ting(!0)
            })),
            e.currentTime == a.cur_time ? (a.pause_counter += 1, a.pause_counter >= 3 && (e.pause(), e.currentTime && (e.currentTime = a.cur_time), e.play(), a.pause_counter = 0)) : a.pause_counter = 0,
            n = n.toString().length < 2 ? "0" + n : n,
            isNaN(r) ? $(".timer_text").hide() : $(".timer_text").text("-" + r + ":" + n).fadeIn(),
            i.css({
                "-webkit-transform": "rotate(" + s + "deg)",
                "-moz-transform": "rotate(" + s + "deg)",
                "-o-transform": "rotate(" + s + "deg)",
                "-ms-transform": "rotate(" + s + "deg)",
                transform: "rotate(" + s + "deg)"
            }),
            e.currentTime > a.cur_time && (a.cur_time = e.currentTime)
    },
    get_player: function(e) {
        return window.HAS_AUDIO ? this.h5_player(e) : this.flash_player(e)
    },
    h5_player: function(e) {
        var t = e.musicUrl,
            n = e.imgUrl;
        return '<div class="h5_player"><div class="h5_control"><img src="' + n + '"/><div class="img_mask"></div><a style="display:none"  class="btn play" href="javascript:;"></a><a class="btn pause" href="javascript:;"></a></div><div class="timer_text"></div></div><audio id="h5_player"  preload="auto" src="' + t + '"></audio>'
    },
    flash_player: function(e) {
        var t = this.PLAYER_URL + "?mp3=" + e.musicUrl + "&img=" + e.imgUrl;
        return $.browser.mozilla ? '<embed width="300" height="300"  src="' + t + '" type="application/x-shockwave-flash"  wmode="transparent"/>' : '<object width="300" height="300" id="ting_el" type="application/x-shockwave-flash" style="visibility: visible;"><param name="movie" value="' + t + '"><param name="wmode" value="transparent"/><embed wmode="transparent" width="300" height="300" src="' + t + '" pluginspage="http://www.macromedia.com/go/getflashplayer"/></object>'
    },
    render_profileList: function(e) {
        var t = this,
            n = e || t.ting,
            r = '<ul class="pics clearfix">';
        $.each(n,
                function() {
                    r += t.list_item(this, !0, !0)
                }),
            r += "</ul>",
            $(".list_cont").html(r),
            this.reset_layout()
    },
    render_njList: function(e) {
        var t = this,
            n = e || t.ting,
            r = '<ul class="pics clearfix pics_uesr">';
        e && $.each(n,
                function() {
                    r += t.nj_item(this, !0)
                }),
            r += "</ul>",
            $(".list_cont").html(r),
            this.reset_layout()
    },
    nj_item: function(e) {
        return '<li><div class="img"><a href="/ting/profile/' + e.userinfo.uid + '"><img src="' + e.userinfo.icon + '"></a></div><div class="author"></div><div class="info_uesr"><a href="/ting/profile/' + e.userinfo.uid + '" class="name_blue">' + e.userinfo.uname + "</a><p>" + e.userinfo.desc + "</p></div></li>"
    },
    cut_str: function(e, t) {
        return e.length > t ? e.substr(0, t - 3) + "..." : e
    },
    like_ting: function(e) {
        var t = this.ting[this.cur_ting],
            n = t && t.cntInfo.contentid;
        n ? $.post("/api/attitude/love", {
                id: n
            },
            function(t) {
                switch (t.code) {
                    case "A00001":
                        return openlogintip(), !1;
                    case "A00000":
                        var n = t.data.data.love;
                        e.addClass("on").find(".l_number").text(n);
                        break;
                    default:
                        msg_modal(t.data.msg)
                }
            },
            "json") : msg_modal("鍙傛暟鏈夎")
    },
    get_from: function() {
        switch (this.cur_form) {
            case "all":
                return '<p><span class="gray">From锛�</span><a href="javascript锛歷oid(0)" class="btn_icon s_all_btn">ALL</a></p>';
            case "tag":
                return '<p><span class="gray">From锛�</span><a href="javascript锛歷oid(0)" class="btn_icon s_style_btn">#' + $(".subnav_style .current").text() + "</a></p>";
            case "user":
                var e = this.ting_hash["user_" + $("#from_uid").val()][0].musicUserInfo;
                return '<p><span class="gray">From锛�</span><a href="/ting/profile/' + e.uid + '" class="btn_icon s_video_btn">' + e.uname + "</a></p>"
        }
    },
    send_listencount: function(e) {
        $.getJSON("/api/ting/count?tingid=" + e,
            function(e) {
                if (e.code == "A00000") return !0
            })
    }
};
Pianke.collect = {
    ADD_COLLECT: "/api/collect/addrequest.php",
    GET_COLLECT: "/api/collect/getcollect.php",
    CREATE_URL: "/api/collect/create.php",
    UPDATE_URL: "/api/collect/update.php",
    ADD_POST: "/api/collectposts/submit.php",
    GET_POST: "/api/collectposts/getposts.php",
    ADD_NOTICE: "/api/collect/addnotice.php",
    REVIEW_URL: "/api/collectposts/review.php",
    REMOVE_NOTICE: "/api/collect/delnotice.php",
    RECOMMEND_URL: "/api/collectposts/recommend.php",
    music_url: $("input[name=music_url]").val(),
    music_name: $("input[name=music_name]").val(),
    TIPS: {
        name: "鍦ㄦ杈撳叆鎮ㄧ殑涓撻鍚嶇О锛�10瀛椾互鍐咃級",
        description: "鍦ㄦ鐢ㄦ枃瀛楁弿杩版偍鐨勪笓棰樺唴瀹癸紙50瀛椾互鍐咃級",
        notice: "鍏充簬杩欎釜璇濋锛屾偍瀵瑰ぇ瀹舵湁浠€涔堟湡鏈涳紵鏈変粈涔堟兂璇寸殑锛熸垨鑰呮槸鍏憡涔堬紵锛�200瀛椾互鍐咃級"
    },
    cur_page: 1,
    isloading: !1,
    init: function() {
        this.bindEvent(),
            Pianke.create.music_url = this.music_url,
            Pianke.create.create_player(),
            Pianke.create.bindPlayer()
    },
    bindEvent: function() {
        var e = this;
        $(window).bind("scroll",
                function() {
                    var t = $(window),
                        n = t.height() + t.scrollTop() + 50;
                    $(document).height() <= n && $(".main_cont,.collect_container").length && !e.isloading && e.cur_page % 3 != 0 && e.get_collect()
                }),
            $(".new_topic,.new_subject_layer .close,#edit-collect-post").bind("click",
                function() {
                    $(".new_subject_layer").toggle()
                }),
            $(".salon_entry textarea").bind("keyup",
                function() {
                    var e = $(this),
                        t = e.val(),
                        n = t.length,
                        r = 300,
                        i = r - n;
                    i >= 0 ? $(".salon_entry .point_text").html("杩樺彲浠ヨ緭鍏�<span>" + i + "</span>瀛�</p>") : $(".salon_entry .point_text").html('宸茬粡瓒呰繃<span class="red">' + -i + "</span>瀛�</p>")
                }),
            $(".new_subject_layer .save_btn").bind("click",
                function() {
                    var e = $("#collectid").val(),
                        t = $(".new_subject_layer input").val(),
                        n = $(".new_subject_layer textarea").val(),
                        r = $("#contentid").val(),
                        i = "/api/collecttopics" + (r ? "/edit.php" : "/add.php");
                    if (!t.length || !n.length) return alert("鏍囬鎴栧唴瀹逛笉鑳戒负绌猴紒"), !1;
                    $.post(i, {
                            collectid: e,
                            contentid: r,
                            title: t,
                            content: n
                        },
                        function(e) {
                            e.code == "A00000" ? location.href = e.data.data.url : showerrortip(e.data.msg)
                        },
                        "json")
                }),
            $("#del-collect-post,.c_right .s_top_btn").bind("click",
                function() {
                    var e = $(this),
                        t = e.hasClass("s_delete"),
                        n = t ? "/api/collecttopics/del.php" : "/api/collecttopics/recommend.php",
                        r = $("#contentid").val(),
                        i = e.hasClass("btn_recommend"),
                        s = e.hasClass("s_top_btn") ? i : null,
                        o = {
                            contentid: r,
                            recommend: s ? 1 : 0
                        };
                    t ? tips = "纭畾瑕佸垹闄よ繖涓瘽棰橈紵" : i ? tips = "纭畾瑕佺疆椤惰繖涓瘽棰橈紵" : tips = "纭畾瑕佸彇娑堢疆椤惰繖涓瘽棰橈紵",
                        confirm(tips,
                            function() {
                                $.ajax({
                                    url: n,
                                    type: "post",
                                    data: o,
                                    success: function(e) {
                                        e.code == "A00000" ? location.href = e.data.data.url : showerrortip(e.data.msg)
                                    },
                                    dataType: "json"
                                })
                            })
                }),
            $(".p_box_bg .t_list_cont").hover(function() {
                    $(this).find(".cover").fadeIn()
                },
                function() {
                    $(this).find(".cover").hide()
                }),
            $(".entry_address input").bind("focus",
                function() {
                    var e = $(this);
                    e.hasClass("gray") && e.val("").removeClass("gray")
                }),
            $(".add_admin_btn").bind("click",
                function() {
                    $.post("/api/collect/addadmin.php", {
                            id: $("#collect_id").val(),
                            url: $("input[name=admin_url]").val(),
                            type: 2
                        },
                        function(e) {
                            if (e.code == "A00000") {
                                var t = e.data.data;
                                $(".manager").append('<div class="d_mp3"><a href="javascript:void(0);" class="close" data-uid="' + t.uid + '"></a><p><span class="manager_name">绠＄悊鍛橈細</span>' + t.uname + "</p></div>")
                            } else showerrortip(e.data.msg)
                        },
                        "json")
                }),
            $(".upload_mp3 .close").bind("click",
                function() {
                    $(".music_add .add_button,.upload_mp3").toggle(),
                        e.music_url = null,
                        e.music_name = null
                }),
            $(".manager .d_mp3 .close").live("click",
                function() {
                    var e = $(this),
                        t = e.attr("data-uid");
                    $.post("/api/collect/deladmin.php", {
                            id: $("#collect_id").val(),
                            uid: t
                        },
                        function(t) {
                            t.code == "A00000" ? e.parent().remove() : showerrortip(t.data.msg)
                        },
                        "json")
                }),
            $(".recommend_btn").bind("click",
                function() {
                    var t = $(this),
                        n = $("#collectid").val(),
                        r = t.attr("data-recommend"),
                        i = t.attr("data-id");
                    $.post(e.RECOMMEND_URL, {
                            id: n,
                            contentid: i,
                            recommend: r
                        },
                        function(e) {
                            e.code == "A00000" ? (alert("缃《鎴愬姛"), location.reload()) : showerrortip(e.data.msg)
                        },
                        "json")
                }),
            $("#create_topic_btn").bind("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    $("#collect_create").show().find(".error").hide()
                }),
            $("#collect_create .save_btn").bind("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    $.each($("#collect_create input"),
                        function() {
                            $(this).hasClass("gray") && $(this).val("")
                        });
                    var t = e.get_collect_param();
                    if (!t) return !1;
                    if (e.submiting) return !1;
                    e.submiting = !0,
                        $.post(e.ADD_COLLECT, t,
                            function(t) {
                                e.submiting = !1,
                                    $("#collect_create").hide(),
                                    showerrortip(t.data.msg)
                            },
                            "json")
                }),
            $("#collect_create .close").bind("click",
                function() {
                    $("#collect_create").hide()
                }),
            $("#nopassreason").find(".cancel_btn,.close").bind("click",
                function() {
                    $("#nopassreason").hide()
                }),
            $("#nopassreason .save_btn").live("click",
                function() {
                    var t = $(this),
                        n = t.data("param"),
                        r = t.data("el");
                    n.reason = $("#nopassreason .e_cont textarea").val(),
                        e.submit_action(n, r)
                }),
            $(".s_detail_bgimg img").ready(function() {
                e.edit_bgImg()
            }),
            $("#add_notice_btn").bind("click",
                function() {
                    var t = $.trim($("textarea[name=notice]").val());
                    if (t.length > 200) return $(".m_summary .error").show().text("闄愬畾200瀛椾互鍐�"), !1;
                    if (!t.length) return $(".m_summary .error").show().text("Editor璇翠笉鑳戒负绌�"), !1;
                    $.post(e.ADD_NOTICE, {
                            id: $("#collect_id").val(),
                            notice: t
                        },
                        function(e) {
                            e.code == "A00000" ? location.reload() : showerrortip(e.data.msg)
                        },
                        "json")
                }),
            $("#collectlayer .c_text,#collect_create .c_text").focus(function() {
                $(this).hasClass("gray") && $(this).val("").removeClass("gray")
            }),
            $("#collectlayer .save_btn").bind("click",
                function() {
                    e.add_collectItem()
                }),
            $("#update_btn,#apply_btn").bind("click",
                function() {
                    var t = $(this);
                    this.id == "apply_btn" ? confirm("鎮ㄦ槸鍚︾湡鐨勫噯澶囨彁浜わ紵",
                        function() {
                            e.submit_collect(t)
                        }) : e.submit_collect(t)
                }),
            $(".main_left").find("input[type=text],textarea").bind("focus",
                function() {
                    var t = $(this).removeClass("gray"),
                        n = t.attr("name");
                    t.val() == e.TIPS[n] && t.val("")
                }).live("blur",
                function() {
                    var e = $(this),
                        t = e.attr("name");
                    e.val().length || e.addClass("gray")
                }),
            $(".sns_more_right .draft_btn,#collectlayer .close").live("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    $("#collectlayer").toggle().find(".error").hide()
                }),
            $.browser.msie ? $(".setadd").live("click",
                function(t) {
                    var n = $(this),
                        r = 0,
                        i = function() {
                            n.blur(),
                                e.uploadThing(n)
                        };
                    clearInterval(n.data("st")),
                        n.data("st", setInterval(function() {
                                r += 1,
                                    r >= 1e3 && clearInterval(n.data("st")),
                                    n.val().length > 0 && (i(), clearInterval(n.data("st")))
                            },
                            300))
                }) : $(".setadd").die("change").live("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    e.uploadThing($(this))
                }),
            $(".no_through_btn,.through_btn,.delete_btn").bind("click",
                function() {
                    var t = $(this);
                    t.hasClass("delete_btn") ? confirm("纭瑕佸垹闄よ繖绡囨枃绔犲悧锛�",
                        function() {
                            e.collect_action(t)
                        }) : e.collect_action(t)
                }),
            $(".pagination a").live("click",
                function(t) {
                    t.preventDefault();
                    var n = this.href,
                        r = n.split("page=")[1];
                    e.cur_page = (Number(r) - 1) * 3,
                        $(document).scrollTop(0),
                        e.get_collect(!0)
                })
    },
    collect_action: function(e) {
        var t = $("#collectid").val(),
            n = e.attr("data-status"),
            r = e.attr("data-id"),
            i = this,
            s = {
                id: t,
                contentid: r,
                status: n
            };
        /notice/.test(location.href) && (url = i.REMOVE_NOTICE, s = {
                id: r
            }),
            n == "-1" ? $("#nopassreason").show().find(".save_btn").data({
                param: s,
                el: e
            }) : i.submit_action(s, e)
    },
    submit_action: function(e, t) {
        var n = this,
            r = $("textarea[name=notice]").length ? n.REMOVE_NOTICE : n.REVIEW_URL;
        if (n.submiting) return !1;
        n.submiting = !0,
            $.post(r, e,
                function(e) {
                    n.submiting = !1,
                        $("#nopassreason").hide(),
                        e.code == "A00000" ? (t.parents(".create_content").remove(), n.edit_num(status)) : showerrortip(e.data.msg)
                },
                "json")
    },
    edit_num: function(e) {
        var t = $("#deftotal"),
            n = $("#nopasstotal"),
            r = $("#nortotal");
        if (e) {
            var i = -1,
                s = 0,
                o = 0,
                u = !0;
            switch (parseInt(e, 10)) {
                case 1:
                    s = 1;
                    break;
                case -1:
                    o = 1;
                    break;
                case 2:
                    i = 0,
                        s = -1;
                    break;
                default:
                    u = !1
            }
            u && (t.text(parseInt(t.text(), 10) + i), n.text(parseInt(n.text(), 10) + o), r.text(parseInt(r.text(), 10) + s))
        }
    },
    get_collect: function(e) {
        var t = this,
            n = $(".loading"),
            r = !!$("#collectid").length,
            i = r ? t.GET_POST : t.GET_COLLECT,
            s = 15;
        if (!!t.isloading) return n.hide(), !1;
        n.show(),
            t.cur_page += 1,
            param = {
                page: t.cur_page,
                size: s,
                style: $("#style").val(),
                sort: $("#sort").val(),
                _: Math.floor(9999999 * Math.random())
            };
        if (r) {
            if (!$("#collectlayer").length) return !1;
            param.id = $("#collectid").val(),
                param.sort = $(".mainnav .current").attr("data-type")
        }
        t.isloading = !0,
            $.getJSON(i, param,
                function(i) {
                    n.hide(),
                        i.code == "A00000" ? i.data.data ? (t.isloading = !1, t.render_collect(i.data.data.html, r, e)) : t.isloading = !0 : showerrortip(i.data.msg)
                })
    },
    get_collect_param: function() {
        var e = {
                name: $("#collect_create input:first").val(),
                description: $("#collect_create textarea").val(),
                posts: $.map($(".add_link input"),
                    function(e) {
                        if (!/gray/.test(e.className)) return e.value
                    })
            },
            t = e.name.length,
            n = e.description.length,
            r = !1,
            s = {};
        t ? t > 10 && (r = "涓撻鍚嶇О涓嶅緱瓒呰繃10瀛�") : r = "涓撻鍚嶇О涓嶅緱涓虹┖",
            n ? n > 50 && (r = "涓撻绠€浠嬩笉寰楄秴杩�50瀛�") : r = "涓撻绠€浠嬩笉寰椾负绌�",
            e.posts.length || (r = "鐩稿叧浣滃搧涓嶅緱涓虹┖");
        for (i in e.posts) url = e.posts[i],
            s[url] && (r = "鐩稿叧浣滃搧鐨勯摼鎺ヤ笉寰楅噸澶�"),
            s[url] = url;
        return r ? ($("#collect_create .error").show().text(r), !1) : e
    },
    uploadThing: function(e) {
        var t = this,
            n = !!e.parents(".music_add").length,
            r = n ? "/api/collect/uploadmusic.php" : "/api/posts/uploadimg",
            i = n ? "file" : "picfile",
            s = n ? null : e.parents(".manage_right").find(".u_add_img"),
            o = n ? null : s.find("img");
        if (PKINFO.islogin != 1) return openlogintip(), !1;
        $(".setadd").removeAttr("name"),
            e.attr({
                name: i,
                id: i
            }),
            $.ajaxFileUpload({
                url: r,
                secureuri: !1,
                fileElementId: i,
                dataType: "json",
                type: "post",
                success: function(e) {
                    if (e.code == "A00000")
                        if (n) {
                            var r = e.data.data;
                            $(".music_add .add_button,.upload_mp3").toggle().find(".d_mp3").find("p").text(r.name),
                                t.music_url = r.url,
                                t.music_name = r.name
                        } else o.attr("src", e.data.picurl),
                            s.find("a").attr("href", e.data.picurl);
                    else showerrortip(PKINFO.eCode[e.code])
                },
                error: function(e, t, n) {
                    console.log(e)
                }
            })
    },
    render_collect: function(e, t, n) {
        var r = t ? $(".main_cont") : $(".collect_container"),
            i = $(e);
        console.log(e, t),
            n && r.empty(),
            r.append(i),
            this.isloading = !1
    },
    submit_collect: function(e) {
        var t = !!$("#collect_id").length,
            n = t ? this.UPDATE_URL : this.CREATE_URL,
            r = this.get_param(e);
        if (!r) return !1;
        $.post(n, r,
            function(e) {
                e.code == "A00000" ? location.href = e.data.url : showerrortip(e.data.msg)
            },
            "json")
    },
    get_param: function(e) {
        var t = $("input[name=name]"),
            n = $("textarea[name=description]"),
            r = $("textarea[name=rule]"),
            i = this,
            s = {
                id: $("#collect_id").val(),
                name: t.val(),
                description: n.val(),
                headerpic: $(".u_add_img img:first").attr("src"),
                coverpic: $(".u_add_img img:last").attr("src"),
                rule: r.val(),
                apply: e.attr("data-apply"),
                music_url: i.music_url,
                music_name: i.music_name
            },
            o = !0;
        return s.name.length > 10 && (o = !1, text = "鏍囬闀垮害涓嶅緱瓒呰繃10涓瓧", e = t),
            s.description.length > 50 && (o = !1, text = "闀垮害涓嶅緱瓒呰繃50涓瓧", e = n),
            $(".error").hide(),
            o ? s : (e.parents(".manage_right").find(".error").show().text(text), !1)
    },
    add_collectItem: function() {
        var e = $("#collectlayer .c_text").val(),
            t = $("#collectid").val(),
            n = $("#collectlayer .error"),
            r = this;
        e.length ? $.post(r.ADD_POST, {
                id: t,
                url: e
            },
            function(e) {
                e.code == "A00000" ? ($("#collectlayer").hide().find(".c_text").val(""), showerrortip("鎻愪氦鎴愬姛")) : showerrortip(e.data.msg)
            },
            "json") : n.text("鍐呭涓嶈兘涓虹┖")
    },
    edit_bgImg: function() {
        var e = $(".s_detail_bgimg img"),
            t = $(".s_detail_bgimg"),
            n = e.width(),
            r = e.height(),
            i = t.height(),
            s;
        if (!e.length) return !1;
        s = -(r - i) / 2,
            r < i && (e.width(i * (n / r)), s = 0),
            e.css("top", s),
            jQuery.browser.msie && jQuery.browser.version <= 7 ? e.fadeIn(2500) : e.show()
    }
};
Pianke.user = {
    APPLY_URL: "/api/writer/apply",
    GET_POSTS_URL: "/api/posts/getuserposts.php",
    EDIT_LAYOUT: "/api/profile/layout.php",
    POST_RECOMMEND: "/api/posts/recommend.php",
    GET_SELECT_LIST: "/api/album/select.php",
    TAKE_SELECT_URL: "/api/album/taketo.php",
    iconurl: "",
    ready: !1,
    fall_canload: !0,
    cur_page: 1,
    op: {
        crop_icon_x: {},
        crop_icon_y: {},
        crop_icon_w: {},
        crop_icon_ow: "",
        crop_icon_oh: ""
    },
    jcrop_api: "",
    init: function() {
        this.bindEvent(),
            this.bindChooselog()
    },
    bindEvent: function() {
        var e = this,
            t = $("div.contact li.current a").attr("source");
        $("div.bit.shadow div.inst_add p.fileupbox").append("<img style='display:none;' src='http://pkstatic.b0.upaiyun.com/images/loading.gif'>"),
            $("#picfile").bind("change",
                function() {
                    e.initCropArea(),
                        $("div.bit.shadow div.inst_add p.fileupbox img").show(),
                        e.uploadImage(this)
                }),
            $(".edit_adress").bind("click",
                function() {
                    var e = $("input.b_text,textarea.b_textarea").serializeArray(),
                        t = {};
                    for (i in e) t[e[i].name] = e[i].value;
                    $.post("/api/user/setaddre.php", t,
                        function(e) {
                            if (e.code != "A00000") {
                                showerrortip(e.data.msg);
                                return
                            }
                            alert("淇濆瓨鎴愬姛"),
                                setTimeout(function() {
                                        location.reload()
                                    },
                                    3e3)
                        },
                        "json")
                }),
            $(".approve_join,.approve_botton,.approve_author a,.approve_layer .close").bind("click",
                function() {
                    $(".approve_layer").toggle()
                }),
            $(".approve_layer input").bind("focus",
                function() {
                    $(this).removeClass("gray")
                }),
            $(".approve_layer .save_btn").bind("click",
                function() {
                    e.submit_apply()
                }),
            $(".edit_avatar .login_true").bind("click",
                function() {
                    e.saveImage(this)
                }),
            $(".bind_cont #password").keydown(function(t) {
                t.keyCode == 13 && e.set_email()
            }),
            $("#set_email").bind("click",
                function(t) {
                    t.preventDefault(),
                        e.set_email()
                }),
            $(".close").live("click",
                function() {
                    $(".close").parents(".f_secret").hide()
                }),
            $(".delete-post").live("click",
                function() {
                    var e = $(this),
                        t = e.attr("data-id"),
                        n = e.attr("data-type"),
                        r = "/api/posts/del.php",
                        i = "鍒涗綔",
                        s = null;
                    n === "talk" && (i = "纰庣墖", s = "/timeline", r = "/api/timeline/deltalk.php"),
                        confirm("纭瑕佸垹闄よ繖鏉�" + i + "鍚楋紵",
                            function() {
                                $.post(r, {
                                        contentid: t
                                    },
                                    function(t) {
                                        if (t.code != "A00000") {
                                            showerrortip(t.data.msg);
                                            return
                                        }
                                        n != "talk" && s && (location.href = s),
                                            e.parents(".create_content").slideUp(function() {
                                                $(this).remove()
                                            })
                                    },
                                    "json")
                            })
                }),
            $(".f_right .close,.f_right .closed").live("click",
                function() {
                    var t = $(this),
                        n = t.attr("data-type"),
                        r = t.attr("data-id"),
                        i = "";
                    switch (n) {
                        case "posts":
                            i = "/api/wordcard/delposts.php",
                                text = "璇嶅崱";
                            break;
                        case "subject":
                            i = "/api/subject/subject_posts_del",
                                text = "鍓у満";
                            break;
                        case "talk":
                            i = "/api/timeline/deltalk.php",
                                text = "鏃堕棿绾�";
                            break;
                        case "topic":
                            i = "/api/topic/delposts",
                                text = "鐭ヨ";
                            break;
                        case "classic":
                            i = "/api/classic/delclassic",
                                text = "Classic鎶曠"
                    }
                    e.del_profile_item(i, t, {
                            contentid: r
                        },
                        text)
                }),
            $(".contact").find(".icon7,.icon8").live("click",
                function() {
                    var t = $(this),
                        n = t.is(".icon7"),
                        r = "/api/attention/" + (n ? "unfollow" : "follow"),
                        i = {
                            staruids: t.attr("data-id")
                        },
                        s = $(".icon_name .icon4").next(),
                        o = $(".icon_name .icon5").next(),
                        u = t.parents(".info"),
                        a = parseInt(s.text(), 10) + (n ? -1 : 1),
                        f = n ? "鍏虫敞" : "鍙栨秷鍏虫敞",
                        l = PKINFO.uinfo.uid == location.pathname.split("/")[2];
                    e.get_attention(t, r, i,
                        function() {
                            t.toggleClass("icon8 icon7").attr("title", f),
                                u.find(".icon6").toggle(),
                                l == 1 && s.text(a);
                            if (/fan/.test(location.pathname) && l == 1) {
                                var e = '<a href="javascript:void(0);" class="ic icon6 curon" title="宸蹭簰鐩稿叧娉�"></a>';
                                u.find(".icon6").length || u.append(e)
                            }
                        })
                }),
            $(".create_content .heading p").live("click",
                function() {
                    var e = $(this);
                    e.hasClass("gray") || (e.hide(), e.next().show().find("input").focus())
                }),
            $(".top_btn").live("click",
                function() {
                    var t = $(this),
                        n = t.is("[data-module]"),
                        r = n ? parseInt(t.attr("data-recommend"), 10) : !t.hasClass("undo"),
                        i = r ? 1 : 0,
                        s = n ? e.EDIT_LAYOUT : e.POST_RECOMMEND,
                        o = n ? null : t.parents(".create_content").attr("data-id");
                    $.post(s, {
                            contentid: o,
                            module: t.attr("data-module"),
                            recommend: i
                        },
                        function(e) {
                            e.code == "A00000" ? (t.text(i ? "鍙栨秷缃《" : "缃《").attr("data-recommend", i ? 0 : 1), n || t.toggleClass("undo")) : showerrortip(e.data.msg)
                        },
                        "json")
                }),
            $(".title_edit input").blur(function() {
                var e = $(this);
                $.trim(e.val()) == "" && setTimeout(function() {
                        e.parents(".title_edit").hide().prev().show()
                    },
                    200)
            }),
            $(".ok").live("click",
                function(e) {
                    var t = $(this),
                        n = $.trim(t.prev().val()),
                        r = t.parents(".create_content").find(".icon").attr("data-id"),
                        i = "/api/wordcard/updatetitle";
                    location.href.split("/")[location.href.split("/").length - 1] == "feeling" && (i = "/api/topic/updatetitle"),
                        n == "" ? alert("鏍囬涓嶈兘涓虹┖") : $.post(i, {
                                contentid: r,
                                title: n
                            },
                            function(e) {
                                e.code == "A00000" && (t.parents(".title_edit").hide(), t.parents(".heading").first().prepend('<h2><a href="/posts/' + r + '">' + e.data.data.title + "</a></h2>"))
                            },
                            "json")
                }),
            e.msgTips("姝ｅ湪鍔犺浇,璇风◢鍊�..."),
            $("#friends_list .pages a.up").live("click",
                function() {
                    return e.getFriendsList(parseInt($(".pages span.on").text()) - 1), !1
                }),
            $("#friends_list .pages a.next").live("click",
                function() {
                    return e.getFriendsList(parseInt($(".pages span.on").text()) + 1), !1
                }),
            $("#friends_list .pages a:not(.next,.up)").live("click",
                function() {
                    return e.getFriendsList(parseInt($(this).text())), !1
                }),
            $("#friends_list .invite_icon").live("click",
                function() {
                    var t = $(this);
                    e.sendInvitations(t)
                }),
            $(".contact ul.p_media.clearfix .nsina").click(function() {
                return $(".contact ul.p_media.clearfix li").attr("class", ""),
                    $(this).parent().attr("class", "current"),
                    e.getFriendsList(1), !1
            }),
            $(".contact ul.p_media.clearfix .ntt").click(function() {
                return $(".contact ul.p_media.clearfix li").attr("class", ""),
                    $(this).parent().attr("class", "current"),
                    e.getFriendsList(1), !1
            }),
            $(".contact ul.p_media.clearfix .nrenr").click(function() {
                return $(".contact ul.p_media.clearfix li").attr("class", ""),
                    $(this).parent().attr("class", "current"),
                    e.getFriendsList(1), !1
            }),
            $(".contact ul.p_media.clearfix .ndoub").click(function() {
                return $(".contact ul.p_media.clearfix li").attr("class", ""),
                    $(this).parent().attr("class", "current"),
                    e.getFriendsList(1), !1
            }),
            $("#friends_list .invit_bind a").live("click",
                function(t) {
                    t.preventDefault(),
                        e.openInviteOauth(this)
                })
    },
    bindChooselog: function() {
        var e = this;
        $(".log_cont").live("click",
                function() {
                    var t = $(this),
                        n = t.parents(".choose_log"),
                        r = t.parents(".create_content").attr("data-id") || $("#contentid").val();
                    n.data("log") ? n.find(".log_list").toggle() : $.getJSON(e.GET_SELECT_LIST, {
                            contentid: r
                        },
                        function(e) {
                            e.code == "A00000" ? n.data("log", !0).find(".log_list").html(e.data.data.html).show() : showerrortip(e.data.msg)
                        })
                }),
            $(".choose_log li").live("click",
                function() {
                    var t = $(this),
                        n = t.parents(".create_content").attr("data-id") || $("#contentid").val(),
                        r = t.attr("data-id"),
                        i = t.find(".selected").length ? 0 : 1;
                    n ? $.post(e.TAKE_SELECT_URL, {
                            albumid: r,
                            contentid: n,
                            action: i,
                            _: (new Date).valueOf()
                        },
                        function(e) {
                            e.code == "A00000" ? i ? t.find("h4").after('<span class="selected"></span>') : t.find(".selected").remove() : showerrortip(e.data.msg)
                        },
                        "json") : (i ? t.addClass("got_selected").find("h4").after('<span class="selected"></span>') : t.removeClass("got_selected").find(".selected").remove(), $("#albumids").val($.map($(".got_selected"),
                        function(e) {
                            return $(e).attr("data-id")
                        }).join(",")))
                })
    },
    del_profile_item: function(e, t, n, r) {
        if (PKINFO.islogin != 1) return openlogintip(), !1;
        confirm("纭畾瑕佸垹闄よ繖鏉�" + r,
            function() {
                $.post(e, n,
                    function(e) {
                        switch (e.code) {
                            case "A00001":
                                return openlogintip(), !1;
                            case "A00000":
                                return t.parents(".model,.creation,.create_content").remove(), !0;
                            default:
                                return showerrortip(e.data.msg), !1
                        }
                    },
                    "json")
            }, !0, t)
    },
    get_attention: function(e, t, n, r) {
        $.post(t, n,
            function(t) {
                e.removeClass("gray");
                switch (t.code) {
                    case "A00001":
                        return openlogintip(), !1;
                    case "A00000":
                        return r(), !0;
                    default:
                        return showerrortip(t.data.msg), !1
                }
            },
            "json")
    },
    set_email: function() {
        email = $.trim($("#email").val()),
            pwd = $.trim($("#password").val());
        if (!email.length && !pwd.length) return msg_modal("閭鎴栧瘑鐮佷笉鑳戒负绌�"), !1;
        $.ajax({
            type: "POST",
            url: "/api/user/setemail",
            dataType: "json",
            data: {
                email: email,
                passwd: pwd
            },
            success: function(e) {
                e.code != "A00000" ? msg_modal(e.data.msg) : window.location = e.data.redirect
            }
        })
    },
    initCropArea: function() {
        var e = this;
        $("#crop_icon_x, #crop_icon_y, #crop_icon_w, #crop_icon_ow, #crop_icon_oh").val(0),
            e.ready = !1,
            e.jcrop_api && ($("#uploadArea").hide(), e.jcrop_api.destroy(), $("#jcrop_target").attr("style", ""))
    },
    showPreview: function(e) {
        var t = Pianke.user,
            n = 180 / e.w,
            r = 180 / e.w;
        $("#crop_icon_x").val(e.x),
            $("#crop_icon_y").val(e.y),
            $("#crop_icon_w").val(e.w),
            t.op.crop_icon_ow = $("#crop_icon_ow").val(),
            t.op.crop_icon_oh = $("#crop_icon_oh").val(),
            $("#preview").css({
                width: Math.round(n * t.op.crop_icon_ow) + "px",
                height: Math.round(r * t.op.crop_icon_oh) + "px",
                marginLeft: "-" + Math.round(n * e.x) + "px",
                marginTop: "-" + Math.round(n * e.y) + "px"
            })
    },
    showCoords: function(e) {
        $("#crop_icon_x").val(e.x),
            $("#crop_icon_y").val(e.y),
            $("#crop_icon_w").val(e.w)
    },
    uploadImage: function(e) {
        var t = this;
        return $.ajaxFileUpload({
            url: "/api/user/uploadicon",
            secureuri: !1,
            fileElementId: "picfile",
            dataType: "json",
            type: "post",
            success: function(e, n) {
                $("div.bit.shadow div.inst_add p.fileupbox img").hide(),
                    e.code != "A00000" ? (alert(PKINFO.eCode[e.code]), t.ready = !1) : ($("#crop_icon_ow").val(e.data.w), $("#crop_icon_oh").val(e.data.h), $("#j-default-icon").hide(), $("#jcrop_target").attr("src", e.data.url + "?" + (new Date).getTime()), $("#preview").attr("src", e.data.rawurl + "?" + (new Date).getTime()), $("#uploadArea").show(), options = {
                            onChange: t.showPreview,
                            onSelect: t.showPreview
                        },
                        $("#jcrop_target").Jcrop(options,
                            function() {
                                t.jcrop_api = this,
                                    t.jcrop_api.animateTo([0, 0, 180, 180]),
                                    t.jcrop_api.setOptions({
                                        allowSelect: !1,
                                        allowMove: !0,
                                        minSize: [50, 50],
                                        maxSize: [300, 300],
                                        aspectRatio: 1
                                    }),
                                    t.ready = !0
                            }), $("#picfile").bind("change",
                            function() {
                                t.initCropArea(),
                                    $("div.bit.shadow div.inst_add p.fileupbox img").show(),
                                    t.uploadImage(this)
                            }))
            },
            error: function(e, n, r) {
                t.ready = !1,
                    alert(r)
            }
        }), !1
    },
    saveImage: function(e) {
        var t = this;
        t.op.crop_icon_x = $("#crop_icon_x").val(),
            t.op.crop_icon_y = $("#crop_icon_y").val(),
            t.op.crop_icon_w = $("#crop_icon_w").val(),
            t.op.crop_icon_ow = $("#crop_icon_ow").val(),
            t.op.crop_icon_oh = $("#crop_icon_oh").val();
        if (t.ready == 0) return;
        return $.ajax({
            url: "/api/user/genicon",
            type: "post",
            dataType: "json",
            data: {
                x: t.op.crop_icon_x,
                y: t.op.crop_icon_y,
                w: t.op.crop_icon_w,
                ow: t.op.crop_icon_ow,
                oh: t.op.crop_icon_oh
            },
            success: function(e) {
                e.code == "A00000" ? (alert("淇敼鎴愬姛"), t.initCropArea(), window.location.reload()) : alert(PKINFO.eCode[data.code])
            }
        }), !1
    },
    getFriendsList: function(e) {
        var t = $("div.contact li.current a"),
            n = t.attr("class").slice(5);
        return source = t.attr("source"),
            $("div.delete.radius.i_delete").show(),
            $.getJSON("/api/attention/getinvite", {
                    page: e,
                    source: source
                },
                function(e) {
                    e.code == "A00000" ? ($("div.delete.radius.i_delete").hide(), $("#friends_list").html(e.data.data)) : alert(PKINFO.eCode[e.code])
                }), !1
    },
    sendInvitations: function(e) {
        msg_modal("姝ｅ湪鍙戦€侀個璇�...");
        var t = e.prev().text(),
            n = $("div.contact li.current a").attr("source");
        $.getJSON("/api/attention/sendinvite", {
                uname: t,
                source: n
            },
            function(e) {
                e.code == "A00000" ? setTimeout(function() {
                        msg_modal("閭€璇峰彂閫佹垚鍔�")
                    },
                    2600) : alert(PKINFO.eCode[e.code])
            })
    },
    msgTips: function(e) {
        el = $("<div class='delete radius i_delete' style='display:none;white-space:nowrap '><div class='btn_control'><p  class='blue'>" + e + "</p></div></div>"),
            $("body").append(el)
    },
    openInviteOauth: function(e) {
        var t = $(e).attr("url"),
            n = this;
        setcookie("is_invite", null);
        var r = window.open("", "newwindow", "height=450, width=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no");
        r.location = t;
        var i = setInterval(function() {
                getSpecificCookie("is_invite").toString() == "true" && (n.getFriendsList(1), clearInterval(i))
            },
            100)
    },
    load_more: function() {
        var e = this,
            t;
        if (!e.fall_canload || location.pathname.split("/")[1] != "profile") return !1;
        e.cur_page += 1,
            e.fall_canload = !1,
            $.getJSON(e.GET_POSTS_URL, {
                    uid: $("#uid").val(),
                    page: e.cur_page,
                    tag: $("input[name=tag]").val() || "",
                    sort: $("input[name=sort]").val() || ""
                },
                function(n) {
                    n.code == "A00000" ? (t = n.data.data.html, t && ($(".create_content:last").removeClass("last").after(t), e.fall_canload = !0)) : showerrortip(n.data.msg)
                })
    },
    submit_apply: function() {
        var e = this,
            t = e.get_apply_data();
        t && $.post(e.APPLY_URL, t,
            function(e) {
                e.code == "A00000" ? ($(".approve_layer").hide().find("input:visible").val(""), showerrortip("鐢宠鎴愬姛锛佹垜浠畼鏂逛汉鍛樺皢浼氬敖蹇仈绯绘偍锛屽苟鍛婄煡鍏朵綑鐩稿叧浜嬪疁銆�")) : showerrortip(e.data.msg)
            },
            "json")
    },
    get_apply_data: function() {
        var e = {},
            t = {
                realname: "鐪熷疄濮撳悕",
                phone: "鎵嬫満鍙�",
                pin: "韬唤璇佸彿鐮�",
                email: "鐢靛瓙閭欢",
                address: "閫氳鍦板潃",
                card: "閾惰鍗′俊鎭�"
            };
        $.each($(".approve_layer input[name]"),
            function() {
                el = $(this),
                    e[el.attr("name")] = el.attr("value")
            });
        for (i in t)
            if (!e[i].length) return showerrortip(t[i] + "涓嶈兘涓虹┖"), !1;
        return e
    }
};
Pianke.album = {
    ADD_ALBUM_URL: "/api/album/add.php",
    DEL_ALBUM_URL: "/api/album/del.php",
    EDIT_ALBUM_URL: "/api/album/update.php",
    ADD_PART_URL: "/api/album/addpart.php",
    SAVE_PART_URL: "/api/album/savepart.php",
    ALBUM_APPLY: "/api/album/apply",
    first_loaded: !1,
    replace_el: null,
    init: function() {
        this.bindEvent()
    },
    bindEvent: function() {
        var e = this;
        $(".editor_btn").bind("click",
                function() {
                    $(".editor_layer").fadeIn(600)
                }),
            $("#delete_album,.delete_layer .save_btn,.delete_layer .close").bind("click",
                function() {
                    $(".delete_layer").toggle()
                }),
            $(".delete_layer .delete_btn").bind("click",
                function() {
                    var t = $("#albumid").val();
                    $.post(e.DEL_ALBUM_URL, {
                            albumid: t
                        },
                        function(e) {
                            alert("璇ユ枃闆嗗凡鍒犻櫎"),
                                location.href = "/profile/" + PKINFO.uinfo.uid
                        },
                        "json")
                }),
            $(".apply_btn,.corpus_layer .close").bind("click",
                function() {
                    $(".corpus_layer").toggle()
                }),
            $(".corpus_layer .save_btn").bind("click",
                function() {
                    $.post(e.ALBUM_APPLY, {
                            albumid: $("#albumid").val(),
                            reason: $(".corpus_layer textarea").val()
                        },
                        function(e) {
                            e.code == "A00000" ? (showerrortip("鎻愪氦鎴愬姛"), $(".corpus_layer").hide().find("textarea").val("")) : showerrortip(e.data.msg)
                        },
                        "json")
                }),
            $(".ta_corpus li").hover(function() {
                    $(this).css("zIndex", 2).find(".cover").fadeIn(200)
                },
                function() {
                    $(this).css("zIndex", 1).find(".cover").hide()
                }),
            $(".true_add").bind("click",
                function() {
                    var t = $(".e_cont input").val(),
                        n = $(".drag_cont li").length + 1;
                    $(".e_cont input").val("").focus();
                    if (!t.length) return showerrortip("鍦板潃涓嶈兘涓虹┖"), !1;
                    $.post(e.ADD_PART_URL, {
                            album: $("#albumid").val(),
                            url: t
                        },
                        function(e) {
                            e.code == "A00000" ? (e = e.data.data, $(".drag_cont").append('<li data-id="' + e.contentid + '"><span class="number">' + n + '</span><a class="drag_btn">' + e.title + '</a><a href="javascript:void(0);" class="true_delete"></a></li>')) : showerrortip(e.data.msg)
                        },
                        "json")
                }),
            $(".true_delete").live("click",
                function() {
                    $(this).parent().remove(),
                        e.refresh_num()
                }),
            $(".m_tag_cont a").bind("click",
                function() {
                    var e = $(this);
                    if (e.hasClass("current")) $(this).removeClass("current");
                    else {
                        if ($(".m_tag_cont a.current").length >= 3) return !1;
                        $(this).addClass("current")
                    }
                }),
            $(".editor_layer .save_btn").bind("click",
                function() {
                    e.submit_edit()
                }),
            $(".editor_layer .cancel_btn,.editor_layer .close").bind("click",
                function() {
                    $(".editor_layer").hide()
                }),
            $("#submit_album").bind("click",
                function() {
                    e.submit_ablum()
                }),
            $.browser.msie ? $(".album_add_img .setadd").bind("click",
                function() {
                    var t = $(this),
                        n = 0,
                        r = function() {
                            t.blur(),
                                e.uploadImage(t)
                        };
                    clearInterval(t.data("st")),
                        t.data("st", setInterval(function() {
                                n >= 1e3 && clearInterval(t.data("st")),
                                    t.val().length > 0 && (r(), clearInterval(t.data("st"))),
                                    n += 1
                            },
                            300))
                }) : $(".album_add_img .setadd").bind("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    e.uploadImage($(this))
                }),
            $(".p_nav a").bind("click",
                function() {
                    var e = $(this).attr("data-type");
                    $(".n_main_right .p_box").hide().filter('[data-type="' + e + '"]').show(),
                        $(".p_nav a").removeClass("current"),
                        $(this).addClass("current")
                }),
            $(".e_cont input").bind("focus",
                function() {
                    $(this).val("").removeClass("gray")
                }),
            $(".drag_cont").length && ($(".drag_cont li").live("mousedown",
                function(t) {
                    var n = $(this);
                    t.preventDefault(),
                        t.returnValue = !1,
                        e.replace_el = n,
                        n.addClass("on_drag")
                }), $(document).bind("mousemove",
                function(t) {
                    if (!e.replace_el) return !1;
                    t.preventDefault(),
                        t.returnValue = !1;
                    var n = t.clientY,
                        r = e.replace_el,
                        i = r.height(),
                        s = r.offset().top,
                        o = s + i,
                        u = n > s,
                        a = e.find_li(n);
                    if (s < n && n < o) return !1;
                    a && a != r && (u ? e.replace_el.insertAfter(a) : e.replace_el.insertBefore(a), e.refresh_num())
                }).bind("mouseup",
                function(t) {
                    if (!e.replace_el) return !1;
                    t.preventDefault(),
                        t.returnValue = !1,
                        e.replace_el.removeClass("on_drag"),
                        e.replace_el = null
                })),
            $("#submit_sequence").bind("click",
                function() {
                    e.submit_sequence()
                })
    },
    refresh_num: function() {
        $.each($(".drag_cont li"),
            function(e) {
                $(this).find(".number").text(e + 1)
            })
    },
    find_li: function(e) {
        var t = null;
        return $.each($(".drag_cont li"),
                function() {
                    if (!t) {
                        var n = $(this),
                            r = n.offset().top,
                            i = n.height() + r;
                        r < e && e < i && (t = n)
                    }
                }),
            t
    },
    submit_sequence: function() {
        var e = {
                albumid: $("#albumid").val(),
                ids: $.map($(".drag_cont li"),
                    function(e) {
                        return $(e).attr("data-id")
                    }).join(",")
            },
            t = this;
        $.post(t.SAVE_PART_URL, e,
            function(e) {
                e.code == "A00000" ? (alert("淇濆瓨鎴愬姛"), location.href = e.data.url) : showerrortip(e.data.msg)
            },
            "json")
    },
    submit_edit: function() {
        var e = {
                albumid: $("#albumid").val(),
                desc: $("#desc").val(),
                remark: $("#remark").val(),
                finish: $("#finish").val(),
                tags: $.map($(".m_tag_cont a.current"),
                    function(e, t) {
                        return $(e).text()
                    }).join(",")
            },
            t = this;
        $.post(t.EDIT_ALBUM_URL, e,
            function(e) {
                e.code == "A00000" ? location.reload() : showerrortip(e.data.msg)
            },
            "json")
    },
    uploadImage: function(e) {
        var t = this,
            n = "picfile";
        e.attr({
                id: n,
                name: n
            }),
            $.ajaxFileUpload({
                url: "/api/posts/uploadimg",
                secureuri: !1,
                fileElementId: n,
                dataType: "json",
                type: "post",
                success: function(e) {
                    e.code == "A00000" ? $(".u_add_img").html('<img src="' + e.data.picurl + '"/>') : showerrortip(PKINFO.eCode[e.code])
                },
                error: function(e, t, n) {
                    console.log(e)
                }
            })
    },
    submit_ablum: function() {
        var e = this,
            t = e.get_param(),
            n = !!$("#albumid").length,
            r = n ? e.EDIT_ALBUM_URL : e.ADD_ALBUM_URL,
            i = n ? "淇敼" : "鍒涘缓";
        t && $.post(r, t,
            function(e) {
                e.code === "A00000" ? showerrortip("鏂囬泦" + i + "鎴愬姛",
                    function() {
                        location.href = e.data.url
                    }) : showerrortip(e.data.msg)
            },
            "json")
    },
    get_param: function() {
        var e = {
            albumid: $("#albumid").val(),
            title: $("input[name=title]").val(),
            desc: $("textarea[name=desc]").val(),
            img: $(".u_add_img img:visible").attr("src"),
            type: $("select[name=type]").val(),
            style: $("select[name=style]").val(),
            gender: $("select[name=gender]").val()
        };
        return $.trim(e.title).length > 10 ? (showerrortip("璇疯緭鍏ユ枃闆嗘爣棰�,10瀛椾互鍐呫€�"), !1) : $.trim(e.desc).length > 200 ? (showerrortip("璇疯緭鍏ユ枃闆嗙畝浠�,200瀛椾互鍐呫€�"), !1) : e
    }
};
Pianke.detailpage = {
    LIKE_LIST: "/api/attitude/likelist",
    DEL_POST: "/api/posts/del",
    INFO_SIZE: 5,
    INFO_FULL_SIZE: 42,
    mouse_st: null,
    init: function() {
        switch (location.hash) {
            case "#comment":
                $(".detail_comment").show(),
                    Pianke.comment.getcomment($(".entry"), 0, 1, !0, !1),
                    $(document).scrollTop($(".detail_comment").offset().top - 100);
                break;
            case "#like":
                this.fill_info(null, $(".arrow_opend .arrow_people"));
                break;
            default:
        }
        this.bindEvent(),
            window.musicConf && (Pianke.write.xiamiEvent(), Pianke.write.render_xiamiplayer(musicConf.songid, $(".editor_music"), window.musicConf.isupdate))
    },
    bindEvent: function() {
        var e = this;
        $(".s_left.icon .like").mouseover(function() {
                if (!!$(".arrow_opend .arrow_people:visible").length) return;
                var e = $(this).parents(".icon").find(".arrow_people");
                e.show()
            }),
            $(".icon .arrow_people,.s_left .icon .like").mouseleave(function(e) {
                var t = $(e.relatedTarget);
                !t.hasClass("arrow_people") && !t.parents(".arrow_people").length && !t.hasClass("like") && $(".icon .arrow_people").hide()
            }),
            $(".arrow_people .hot_btn .r_icon").bind("click",
                function() {
                    var t = $(this),
                        n = t.hasClass("up"),
                        r = $(".arrow_opend .arrow_people"),
                        i = r.data("info"),
                        s = i.page,
                        o = i.max_page,
                        u = s + (n ? -1 : 1);
                    if (u > o || u == 0) return;
                    i.page = u,
                        r.data("info", i),
                        e.fill_info(i, r)
                }),
            $(".get_more_like").bind("click",
                function() {
                    e.open_like_list()
                }),
            $(".delete-post").bind("click",
                function() {
                    var t = $(this),
                        n = t.attr("data-id"),
                        r = {
                            contentid: n
                        };
                    confirm("纭瑕佸垹闄よ繖绡囨枃绔犲悧锛�",
                        function() {
                            $.post(e.DEL_POST, {
                                    contentid: n
                                },
                                function(e) {
                                    if (e.code != "A00000") {
                                        showerrortip(e.data.msg);
                                        return
                                    }
                                    location.href = e.data.data.url
                                },
                                "json")
                        })
                }),
            $(".p_nav a").bind("click",
                function() {
                    var e = $(this),
                        t = e.attr("data-type"),
                        n = e.parents(".piece6");
                    $(".p_nav a").removeClass("current"),
                        e.addClass("current"),
                        n.find(".p_box").hide().filter("[data-type=" + t + "]").show()
                }),
            $(".font_size").bind("click",
                function() {
                    var e = $(this),
                        t = e.hasClass("size_small"),
                        n = t ? "size_16" : "size_14",
                        r = t ? "size_14" : "size_16";
                    $(".list_block .d_article .write").removeClass(n).addClass(r),
                        $(".font_size").removeClass("current"),
                        e.addClass("current")
                }),
            $(".list_block .increase_img img").live("click",
                function() {
                    var e = $("a.increase img:first").attr("s_img"),
                        t = $(".layer_pop.d_img img").attr("src", e),
                        n = $(window).width(),
                        r = $(window).height();
                    window_per = n * (r / n),
                        t.load(function() {
                            var e = t.width();
                            e > window_per && (e = window_per, t.width(e)),
                                t.show().css({
                                    "margin-top": -t.attr("height") / 2,
                                    "margin-left": -e / 2
                                })
                        }),
                        t.parents(".layer_pop").show()
                }),
            $(".layer_pop.d_img").bind("click",
                function(e) {
                    $(this).hide()
                }),
            $("#deleteposts").bind("click",
                function() {
                    confirm("纭瑕佸垹闄よ繖鏉″垱浣滃悧锛�",
                        function() {
                            $.post("/api/detailpage/delposts.php", {
                                    contentid: $(".entry .send").attr("data-id")
                                },
                                function(e) {
                                    if (e.code != "A00000") {
                                        showerrortip(e.data.msg);
                                        return
                                    }
                                    location.href = e.data.data.redirect
                                },
                                "json")
                        })
                }),
            $(".t_icon").bind("click",
                function() {
                    var e = $(this),
                        t = $(".entry .send").attr("data-id"),
                        n = e.hasClass("love");
                    if (!PKINFO.islogin) return openlogintip(), !1;
                    n ? (url = "/api/fav/" + (n && e.hasClass("current") ? "del" : "add") + "fav", param = {
                            contentid: t
                        }) : (url = "/api/attitude/like", param = {
                            id: t,
                            type: 1
                        }),
                        $.post(url, param,
                            function(t) {
                                t.code == "A00000" ? (e.toggleClass("current"), t.data.data && (num = n ? t.data.data.fav : t.data.data.good, e.next().text(num))) : showerrortip(t.data.msg)
                            },
                            "json")
                }),
            $(".detail_list .detail_list_toggle.close").bind("click",
                function() {
                    var e = $(".detali_article_list");
                    $.browser.msie ? e.animate({
                            left: -e.width()
                        },
                        900,
                        function() {
                            $(this).hide()
                        }) : e.css({
                        left: -e.width()
                    })
                }),
            $(".unfold").bind("click",
                function() {
                    var e = $(".detali_article_list");
                    e.css("left", -e.width()).show().animate({
                            left: 0
                        },
                        300)
                })
    },
    open_like_list: function(e) {
        var t = $(".arrow_opend .arrow_people"),
            n = t.data("info"),
            r = this;
        t.is(":visible") ? e || t.hide() : (r.fill_info(n, t), $(".detail_comment,.entry").hide())
    },
    get_info: function(e) {
        var t = e.data.data.list,
            n = this.INFO_FULL_SIZE,
            r = t.length,
            i = Math.floor(r / n) + (r % n == 0 ? 0 : 1);
        return info = {
            data: t,
            page: 1,
            max_page: i
        }
    },
    create_info: function(e, t) {
        var n = this;
        $.getJSON(this.LIKE_LIST, {
                id: t
            },
            function(t) {
                t.code == "A00000" ? (info = n.get_info(t), e.data("info", info), n.fill_info(info, e)) : showerrortip(t.data.msg)
            })
    },
    fill_info: function(e, t) {
        if (e) {
            var n = [],
                r = "",
                i = this.INFO_FULL_SIZE,
                s = e.data.length > i;
            for (var o = 0; o < i; o++) {
                var u = o + (Number(e.page) - 1) * i;
                if (!e.data[u]) break;
                n.push(e.data[u])
            }
            r = this.return_fill_str(n),
                $(".icon .arrow_people").hide(),
                t.show().find(".hot_btn").toggle(s).end().find("ul").html(r)
        } else this.create_info(t, $(".icon").attr("data-id"))
    },
    return_fill_str: function(e) {
        var t = "";
        for (i in e) user_info = e[i],
            t += this.fill_item(user_info);
        return t
    },
    fill_item: function(e) {
        return str = e ? '<li title="' + e.uname + '"><a target="_blank" href="/profile/' + e.uid + '"><img src="' + e.icon + '"></a></li>' : "",
            str
    }
};
Pianke.topic = {
    ISLOADMORE: !0,
    scrollLoad: !0,
    init: function() {
        this.bindEvent()
    },
    text_tips: "璇寸偣浠€涔堝惂锛�",
    bindEvent: function() {
        var e = this;
        $(".write textarea").length && $(".write textarea").autosize(),
            $(".topic_l .s_topic").click(function() {
                if (PKINFO.islogin != 1) return openlogintip(), !1
            }),
            $("#submore").hide(),
            $("#currenloadpageno").val((Number($("#currenpageno").val()) - 1) * 3 + 1),
            $(".card_editor .title input").bind("focus",
                function() {
                    var e = $(this),
                        t = e.val();
                    t == "濡傛灉闇€瑕佹爣棰橈紝閭ｅ氨鍐欏湪杩欏効鍚�" && e.val("")
                }).bind("blur",
                function() {
                    var e = $(this),
                        t = $.trim(e.val());
                    t == "" && $(this).val("濡傛灉闇€瑕佹爣棰橈紝閭ｅ氨鍐欏湪杩欏効鍚�")
                }),
            $(".card_editor .write textarea").bind("keydown",
                function(e) {
                    var t = $(this).val();
                    t.split("\n").length >= 40 && e.keyCode == 13 && e.preventDefault()
                }),
            $(".card_editor .essay h2").bind("click",
                function() {
                    $(".card_editor .essay .pen").toggle()
                }),
            $(".card_editor .storystyle .style_more a").bind("click",
                function() {
                    var e = $(this).attr("data-id");
                    $(".card_editor .storystyle .style_more a").removeClass("on"),
                        $(this).addClass("on"),
                        $(".card_editor .storystyle .more_tag .m_tag_cont").hide().filter('[data-id="' + e + '"]').show(),
                        $(".card_editor .storystyle .more_tag .m_tag_cont a").removeClass("on")
                }),
            $(".card_editor .storystyle .more_tag .m_tag_cont a").bind("click",
                function() {
                    $(this).toggleClass("on"),
                        $(this).parent().find("a.on").length > 3 && $(this).removeClass("on")
                }),
            $(".true_enter textarea").bind("focus",
                function() {
                    var t = $(this),
                        n = t.val();
                    e.text_tips == n && t.val("").removeClass("gray")
                }).bind("blur",
                function() {
                    var t = $(this),
                        n = t.val();
                    "" == n && t.val(e.text_tips).addClass("gray")
                }),
            $(".say_but").bind("click",
                function() {
                    var t = $(".true_enter textarea"),
                        n = t.val();
                    if (n.length == 0 || n == e.text_tips && t.hasClass("gray")) $(".true_enter .red").show();
                    else {
                        var r = "/api/topic/addposts",
                            i = {
                                topicid: $("#topic_id").val(),
                                content: n
                            };
                        $.post(r, i,
                            function(e) {
                                $(".true_enter .red").hide();
                                switch (e.code) {
                                    case "A00001":
                                        return openlogintip(), !1;
                                    case "A00000":
                                        return html = e.data.data.html,
                                            $(".topic_list").prepend(html),
                                            t.val(""), !0;
                                    default:
                                        return showerrortip(e.data.msg), !1
                                }
                            },
                            "json")
                    }
                }),
            $(".del_topic").live("click",
                function() {
                    var e = $(this),
                        t = e.attr("data-id"),
                        n = e.parents(".create_content"),
                        r = n.hasClass("first") ? "first" : "";
                    confirm("鎮ㄧ‘瀹氳鍒犻櫎姝ゆ潯鍐呭锛�",
                        function() {
                            var e = {
                                contentid: t
                            };
                            $.post("/api/topic/delposts", e,
                                function(e) {
                                    e.code === "A00000" ? /fposts/.test(location.pathname) ? location.href = "/feeling/" : (n.slideUp(function() {
                                        n.remove()
                                    }), $(".create_content:first").addClass(r)) : showerrortip(e.data.msg)
                                },
                                "json")
                        })
                }),
            $(".topic_posts_pagination .pages a").live("click",
                function() {
                    var t = $(this);
                    return e.ajax_load(t, "", ""), !1
                }),
            $(".topic_style_list a").live("click",
                function() {
                    var t = $(this);
                    return $(".topic_style_list a").removeClass("current"),
                        t.addClass("current"),
                        $(".main_cont .cont").remove(),
                        e.ajax_load(t, "", 1), !1
                }),
            location.pathname.split("/")[1] == "feeling" && location.pathname.split("/").length < 4 && ($("#submore").text("鏁版嵁鍔犺浇涓�,璇风◢鍊�..."), $(window).scroll(function() {
                e.autoLoading()
            }), $(document).height() <= parseFloat($(window).height()) + parseFloat($(window).scrollTop()) + 500 && e.autoLoading())
    },
    autoLoading: function() {
        var e = 0,
            t = this,
            n = $("#currenloadpageno").val() % 3 != 0;
        totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()) + 500,
            $(document).height() <= totalheight && $("#topicid").val() && n && !$(".topic_posts_pagination .pages").first().find("a")[0] && t.scrollLoad == 1 && t.ISLOADMORE == 1 && (t.scrollLoad = !1, t.loadmoreposts())
    },
    loadmoreposts: function() {
        if ($(".topic_style_list").length) {
            var e = this,
                t = $("#currenloadpageno").val(),
                n = Number(t) + 1,
                r = $("#currenpageno").val(),
                i = $("#topicid").val(),
                s = s || 15,
                o = $(".topic_style_list a.current").attr("s-key");
            $("#submore").show().text("鏁版嵁鍔犺浇涓�,璇风◢鍊�..."),
                $("#errormsg").show();
            var u = {
                topicid: i,
                page: r,
                load_page: n,
                sort: o,
                size: s
            };
            return $.ajaxSetup({
                    cache: !1
                }),
                $.post("/api/topic/getposts", u,
                    function(t) {
                        $("#errormsg").hide();
                        if (t.code != "A00000") return !1;
                        $("#currenloadpageno").val(n),
                            $("#errormsg").before(t.data.data.html),
                            e.scrollLoad = !0;
                        if (t.data.data.curtotal < 1 && !$(".create_content").length) {
                            e.ISLOADMORE = !1;
                            var r = '<div class="cont"><div class="none">鏆傛椂杩樻病鏈変粈涔堝彲鎺ㄨ崘鐨勩€�</div> <div class="clear"></div></div>';
                            return $("#errormsg").hide().before(r), !0
                        }
                        t.data.data.curtotal < 15 && (e.ISLOADMORE = !1)
                    },
                    "json"), !0
        }
    },
    ajax_load: function(e, t, n) {
        var r = this,
            i = "/api/topic/getNpagePosts.php",
            s = $("#topicid").val(),
            t = t || 15,
            o = $(".topic_style_list .current").attr("s-key"),
            n = n ? n : e.text();
        switch (n) {
            case "涓婇〉":
                n = Number($(".pages .on").text()) - 1;
                break;
            case "涓嬮〉":
                n = Number($(".pages .on").text()) + 1;
                break;
            default:
                n = n
        }
        var u = {
            page: n,
            topicid: s,
            size: t,
            sort: o
        };
        $.post(i, u,
            function(e) {
                if (e.code != "A00000") return !1;
                $("#currenpageno").val(n),
                    $(".create_content, .pages").remove(),
                    $("#errormsg").before(e.data.data.html),
                    window.scroll(0, $(".index_title").offset().top - 50),
                    $("#currenloadpageno").val(e.data.data.load_page),
                    r.ISLOADMORE = !0
            },
            "json")
    }
};
Pianke.LayerLogin = {
    init: function() {
        this.checkEmpty(),
            this.bindEvent()
    },
    checkEmpty: function() {
        var e = ".registerform",
            t = $(e + " input");
        for (var n = 0; n < t.length; n++) $(t[n]).val() != "" && $(".placehoder", $(t[n]).parent().parent()).hide()
    },
    bindEvent: function() {
        var e = this,
            t = "#fixedlogin .registerform";
        $(t + " input").focus(e.getFocus()).blur(e.loseFocus()),
            $(".away .loginw").bind("click",
                function() {
                    e.clickOnRegBtn()
                })
    },
    clickOnRegBtn: function(e) {
        var t = this;
        e && e.preventDefault && e.preventDefault();
        if ($(this).attr("logining")) return;
        $(this).attr("logining", !0),
            t.login(this)
    },
    getFocus: function() {
        var e = this;
        return function(e) {
            $(".placehoder", $(this).parent().parent()).hide()
        }
    },
    loseFocus: function() {
        var e = this;
        return function(e) {
            $.trim($(this).val()) == "" && ($(".placehoder", $(this).parent().parent()).show(), $(this).val(""))
        }
    },
    login: function(e) {
        var e = this,
            t = $.trim($("#layer_email").val()),
            n = $.trim($("#layer_pass").val()),
            r = $("#fixedlogin .fromurl").val();
        if (t == "" || n == "") {
            $(e).removeAttr("logining");
            return
        }
        $.ajax({
            url: "../../api/user/login",
            type: "POST",
            data: "email=" + t + "&fromurl=" + r + "&passwd=" + n,
            dataType: "json",
            success: function(t) {
                t.code != "A00000" ? ($(".registerform .ts").html(PKINFO.eCode[t.code]).show(), $(e).removeAttr("logining")) : e.updateUser(t)
            }
        })
    },
    updateUser: function(e) {
        el = '<a class="name_pic" href="/profile/"><img src="' + e.data.icon + '"></a><div class="account"><a href="#" class="off">甯愬彿<span class="xia"></span></a><ul class="xl radius shadow1" style="display: none;"><li><a href="/user/setinfo.php">甯愬彿璁剧疆</a></li><li><a href="/commentbox/inbox">娑堟伅涓績</a></li><li><a href="/user/logout.php">閫€鍑�</a></li></ul></div>',
            $(".weibo:first").html(el).attr("id", "logininfobox"),
            $(".loginw,.login_point").remove(),
            $(".entry .texta,.add,.send,.entry textarea").show(),
            $(".head").append('<div class="new_idea" id="newunread" style="display: none;"><div class="box"></div></div>'),
            window.PKINFO = {
                islogin: 1,
                uinfo: {
                    uid: e.data.uid,
                    uname: e.data.uname,
                    icon: e.data.icon
                }
            },
            $("#fixedlogin").slideDown(200,
                function() {
                    $(this).remove()
                }),
            $("#logininfobox .account").hover(function(e) {
                    e.preventDefault(),
                        e.stopPropagation();
                    var t = $("ul", $(this));
                    t.show(),
                        $("a", $(this)).get(0).className = "on"
                },
                function(e) {
                    $("a", $(this)).get(0).className = "off";
                    var t = $("ul", $(this));
                    t.hide()
                }),
            $("#logininfobox .account > a").click(function(e) {
                e.preventDefault()
            })
    }
};
Pianke.timeline = {
    init: function() {
        this.bindEvent(),
            /timeline/.test(location.pathname) && Pianke.comment.getcomment($(".entry"), 0, 1, !0)
    },
    bindEvent: function() {
        var e = this;
        $(".model .cls,.model .big,.model .big1").live("click",
                function() {
                    var e = $(this).parents(".model"),
                        t = e.parents(".block");
                    e.toggleClass("zindex").find(".item").toggleClass("layermo").end().find("p").toggle().end().find(".big,.big1").toggle(),
                        t.toggleClass("zindex")
                }),
            $(".addphotos .cl").bind("click",
                function() {
                    $(".uploading").hide().data("img_url", "")
                }),
            $(".model").mouseleave(function() {
                $(this).find(".delete").hide()
            }),
            $.browser.msie ? $("#upphoto").live("click",
                function(t) {
                    var n = $(this),
                        r = 0,
                        i = function() {
                            n.blur(),
                                $(".add_cont .a_image").parent().show(),
                                e.UP_LOAD_IMG = !0,
                                e.uploadImage()
                        };
                    clearInterval(n.data("st")),
                        n.data("st", setInterval(function() {
                                r >= 1e3 && clearInterval(n.data("st")),
                                    n.val().length > 0 && (i(), clearInterval(n.data("st"))),
                                    r += 1
                            },
                            300))
                }) : $("#upphoto").die("change").live("change",
                function() {
                    if (PKINFO.islogin == 0) return openlogintip(), !1;
                    e.uploadImage()
                }),
            $(".time_m .send").bind("click",
                function() {
                    e.submittalk()
                }),
            $("#content").bind("keyup",
                function() {
                    var e = $(this).val().length;
                    $("#contentnum").text(e),
                        e > 140 ? $("#contentnum").parent().addClass("bold_red") : $("#contentnum").parent().removeClass("bold_red")
                }),
            $("#mood_list a.color").live("click",
                function() {
                    $("#mood_list a.color").removeClass("current"),
                        $(this).addClass("current")
                }),
            $(".timeline_loading").live("click",
                function() {
                    e.loadmoretimeline("new")
                }),
            $("#my_loading").live("click",
                function() {
                    e.loadmoremytimeline("new")
                }),
            $("#timelinelist .delete_item").live("click",
                function() {
                    $(this).next().show()
                }),
            $("#timelinelist .submit_del").live("click",
                function() {
                    id = $(this).attr("data-id"),
                        e.deltalk(id, $(this))
                }),
            $("#timelinelist .cancel").live("click",
                function() {
                    $(this).parents(".radius").hide()
                })
    },
    submittalk: function() {
        if (!addtalkswitch) return !1;
        var e = $("#content").val(),
            t = $("#mood_list a.current").find("span").attr("class"),
            n = $("#firstid").val(),
            r = $("#firstday").val(),
            t = t || "";
        if ($.trim(e).length == 0) return showerrortip("鎶辨瓑锛屽唴瀹逛笉鑳戒负绌猴紒"), !1;
        var i = {
            content: e,
            color: t,
            firstid: n,
            firstday: r,
            firstimage: $(".uploading").data("img_url")
        };
        return addtalkswitch = !1,
            $.post("/api/timeline/addtalk.php", i,
                function(e) {
                    $(".uploading").hide().data("img_url", ""),
                        addtalkswitch = !0;
                    switch (e.code) {
                        case "A00001":
                            return openlogintip(), !1;
                        case "A00000":
                            return $("#content").val(""),
                                e.data.data.list == "" ? $("#timelinelist div.model").first().before(e.data.data.tmplist) : e.data.data.tmplist == "" && $("#timelinelist").prepend(e.data.data.list),
                                $("#firstday").val(e.data.data.firstday), !0;
                        default:
                            return showerrortip(e.data.msg), !1
                    }
                },
                "json"), !0
    },
    loadmoretimeline: function(e) {
        ShareClickCount("timeline");
        var t = $("#currenpageno").val(),
            n = $("#lastid").val(),
            r = Number(t) + 1;
        return "" != n && "undefined" != typeof n || "" != r && "undefined" != typeof r || "undefined" != typeof e ? ($("#submore").hide(), $("#loading").show(), $.post("/api/timeline/gettalk.php", {
                lastid: n,
                page: r,
                sort: e
            },
            function(e) {
                if (e.code != "A00000") return $("#submore").html("璇烽噸璇曪紝鍔犺浇鏇村"),
                    $("#loading").hide(),
                    $("#submore").show(), !1;
                if (e.data.data.curtotal < 1) return $("#submore").html('<span class="gray">鎶辨瓑锛屽凡缁忔病鏈夋洿澶�</span>'),
                    $("#loading").hide(),
                    $("#submore").show(), !0;
                $("#currenpageno").val(r),
                    $("#lastid").val(e.data.data.lastid),
                    e.data.data.list == "" ? $("#timelinelist div.model").last().after(e.data.data.tmplist) : e.data.data.tmplist == "" ? $("#timelinelist").append(e.data.data.list) : ($("#timelinelist div.model").last().after(e.data.data.tmplist), $("#timelinelist").append(e.data.data.list)),
                    $("#loading").hide(),
                    $("#submore").show(),
                    e.data.data.curtotal < 16 ? $("#errormsg").hide() : $("#errormsg").show()
            },
            "json"), !0) : (showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1)
    },
    loadmoremytimeline: function(e) {
        var t = $("#currenpageno").val(),
            n = $("#lastid").val(),
            r = $("#uid").val(),
            i = Number(t) + 1;
        return "" == n || "undefined" == typeof n && "" == i || "undefined" == typeof i && "undefined" == typeof e ? (showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1) : ($("#submore").hide(), $("#loading").show(), $.post("/api/timeline/gettalk.php", {
                lastid: n,
                uid: r,
                page: i,
                sort: e
            },
            function(e) {
                if (e.code != "A00000") return $("#submore").html("璇烽噸璇曪紝鍔犺浇鏇村"),
                    $("#loading").hide(),
                    $("#submore").show(), !1;
                if (e.data.data.curtotal < 1) return $("#submore").html('<span class="gray">鎶辨瓑锛屽凡缁忔病鏈夋洿澶�</span>'),
                    $("#loading").hide(),
                    $("#submore").show(), !0;
                $("#currenpageno").val(i),
                    $("#lastid").val(e.data.data.lastid),
                    e.data.data.list == "" ? $("#timelinelist div.model").last().after(e.data.data.tmplist) : e.data.data.tmplist == "" ? $("#timelinelist").append(e.data.data.list) : ($("#timelinelist div.model").last().after(e.data.data.tmplist), $("#timelinelist").append(e.data.data.list)),
                    $("#loading").hide(),
                    $("#submore").show(),
                    e.data.data.curtotal < 16 ? $("#errormsg").hide() : $("#errormsg").show()
            },
            "json"), !0)
    },
    deltalk: function(e, t) {
        if ("" == e || "undefined" == typeof e) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
        var n = t.parents(".block").find(".model").length,
            r = {
                contentid: e
            };
        return $.post("/api/timeline/deltalk.php", r,
            function(e) {
                switch (e.code) {
                    case "A00001":
                        return openlogintip(), !1;
                    case "A00000":
                        return n - 1 == 0 ? t.parents("div.block").remove() : t.parents(".model").remove(), !0;
                    default:
                        return showerrortip(e.data.msg), !1
                }
            },
            "json"), !0
    },
    uploadImage: function() {
        var e = this,
            t = "/api/posts/uploadimg";
        if (PKINFO.islogin != 1) return openlogintip(), !1;
        $(".uploading,.isuploading").show(),
            $(".current-photo").hide(),
            $.ajaxFileUpload({
                url: t,
                secureuri: !1,
                fileElementId: "upphoto",
                dataType: "json",
                type: "post",
                success: function(e) {
                    e.code == "A00000" ? ($(".isuploading").hide(), $(".current-photo").show().find("p a").text(e.data.name.substring(0, 20)).attr("href", e.data.picurl), $(".uploading").data("img_url", e.data.picurl)) : showerrortip(e.data.msg)
                },
                error: function(e, t, n) {
                    console.log(e)
                }
            })
    }
};
Pianke.create = {
    GET_POST: "/api/create/getposts",
    ADD_POST_URL: "/api/create/addposts",
    UPDATE_POST_URL: "/api/create/updateposts",
    POST_MAX_LEN: 1e4,
    music_url: $("#musicurl").val(),
    h5_player: null,
    on_count: !1,
    time: 0,
    st: null,
    el_map_data: [],
    on_check: !0,
    in_page: /create/.test(location.href),
    title_tips: "濡傛灉闇€瑕佹爣棰橈紝閭ｅ氨鍐欏湪杩欏効鍚�",
    $NAV_OFFSET: 85,
    init: function() {
        this.bindEvent(),
            this.create_player(),
            this.counter_animate(),
            this.auto_grow(),
            this.recount_text(),
            Pianke.wordcard.multi_bind(),
            Pianke.comment.getcomment($(".entry"), 1, 1, !0)
    },
    bindEvent: function() {
        var e = this;
        e.bindPlayer(),
            $(".vote_btn").bind("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    var e = $(this).attr("data-id");
                    $.post("/api/attitude/vote", {
                            id: e
                        },
                        function(e) {
                            showerrortip(e.data.msg)
                        },
                        "json")
                }),
            e.el_map_data.length || (e.el_map_data = $.map($(".event-nav li a"),
                function(t, n) {
                    return next_el = $(".event-nav li a:eq(" + (n + 1) + ")"),
                        x1 = next_el.length ? $(next_el[0].hash).offset().top : $("body").height(),
                        offset = e.$NAV_OFFSET + $(".event-nav li").height(), {
                            x: $(t.hash).offset().top - offset,
                            x1: x1 - offset
                        }
                })),
            $(window).scroll(function() {
                page = window.page = window.page || 1,
                    e.on_check && e.check_position(e.el_map_data)
            }),
            $(".brief_edit").bind("click",
                function() {
                    $(".enter_brief,.cont_brief").toggle()
                }),
            $(".enter_brief .send").bind("click",
                function() {
                    $.post("/api/create/adddesc.php", {
                            contentid: $(".vote_btn").attr("data-id"),
                            desc: $(".enter_brief textarea").val()
                        },
                        function(e) {
                            e.code == "A00000" ? location.reload() : showerrortip(e.data.msg)
                        },
                        "json")
                }),
            $(".change_btn").bind("click",
                function() {
                    var t = $(this),
                        n = !!$(".list_tab a.current").index(),
                        r = {
                            style: n ? "list" : "thumb",
                            id: $("#create_id").val(),
                            stylenum: $("#stylenum").val() || 0
                        };
                    $.getJSON(e.GET_POST, r,
                        function(e) {
                            e.code == "A00000" && (_top = $(".list_tab_cont").offset().top - 130, $("html,body").animate({
                                    scrollTop: _top
                                },
                                300), inner = $(".list_tab_cont ul"), e = e.data.data, $("#stylenum").val(e.stylenum), inner.html(e.html))
                        })
                }),
            $(".operating .send").bind("click",
                function() {
                    e.submit_post()
                }),
            $(".event-nav li").bind("click",
                function(t) {
                    t.preventDefault(),
                        e.check_event_nav($(this).index(), !0)
                }),
            $(".card_editor .write textarea").bind("keydown",
                function(e) {
                    var t = $(this).val(),
                        n = t.length
                }).bind("keyup",
                function() {
                    var t = e.recount_text();
                    e.auto_grow(),
                        t > e.POST_MAX_LEN ? $("#contentlengthnum").parent().addClass("bold_red") : $("#contentlengthnum").parent().removeClass("bold_red")
                }),
            $(".like_btn").bind("click",
                function() {
                    var e = $(this),
                        t = $("#contentid").val();
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    $.post("/api/attitude/love.php", {
                            id: t
                        },
                        function(e) {
                            e.code == "A00000" ? $(".like_btn span").text(e.data.data.love) : e.code == "A00001" ? openlogintip() : showerrortip(e.data.msg)
                        },
                        "json")
                })
    },
    recount_text: function() {
        var e = $("#contentlengthnum"),
            t = $(".card_editor .write textarea"),
            n = 0;
        return e.length && t.length && (n = t.val().length, e.text(n)),
            n
    },
    bindPlayer: function() {
        var e = this;
        $(".play,.pause").live("click",
            function() {
                var t = $(this).hasClass("pause");
                $(".play,.pause").toggle(),
                    e.h5_player_play(t)
            })
    },
    h5_player_play: function(e) {
        var t = this;
        e ? (t.first_play && (t.send_listencount(), t.first_play = !1), t.h5_player.play()) : t.h5_player.pause()
    },
    auto_grow: function() {
        var e = $("#__grow"),
            t = $(".card_editor .write textarea");
        if (!t.length) return !1;
        e.length || (e = $("<div>").attr("id", "__grow"), e.css({
                position: "absolute",
                top: 0,
                left: 0,
                visibility: "hidden",
                display: "none",
                "font-size": "14px",
                "line-height": "25px",
                width: t.width(),
                opacity: 0
            }), $("body").append(e)),
            e.html(t.val().replace(/\n/g, "<br>")),
            e.height() > 300 ? t.height(e.height()) : t.height(300)
    },
    submit_post: function() {
        var e = $("#createid").val(),
            t = $("#contentid").val(),
            n = $(".card_editor .write textarea").val(),
            r = $(".storystyle a.on").attr("s-key"),
            i = $(".card_editor .title input").val() == this.title_tips ? "" : $(".card_editor .title input").val(),
            s = $(".essay .pen textarea").val(),
            o = $(".a_image img:first").attr("src"),
            u = this,
            a = [],
            f = $(".more_tag .m_tag_cont a.on");
        f.each(function(e) {
            a.push($(this).attr("key"))
        });
        if ("" == n) return showerrortip("鎶辨瓑锛屽唴瀹逛笉鑳戒负绌猴紒"), !1;
        "" == r && (r = 1);
        if (!f.length) return showerrortip("鎶辨瓑锛岃繕娌℃湁閫夋嫨浣滃搧椋庢牸锛�"), !1;
        var l = {
                createid: e,
                content: n,
                style: r,
                title: i,
                remark: s,
                img: o,
                tags: a
            },
            c = u.ADD_POST_URL;
        location.href.split("/")[location.href.split("/").length - 1] == "update" && (c = u.UPDATE_POST_URL, l.contentid = t);
        var h = $(".card_editor .write textarea").val(),
            p = h.length;
        if (p > u.POST_MAX_LEN) {
            msg_modal("鍐呭涓嶈兘澶т簬10000瀛�", 2e3);
            return
        }
        this.submit_wordcard(c, l)
    },
    submit_wordcard: function(e, t) {
        var n = this;
        $.post(e, t,
            function(e) {
                return "A00001" == e.code ? (openlogintip(), !1) : "A00000" == e.code ? (location.href = e.data.data.url, !1) : (showerrortip(e.data.msg), !1)
            },
            "json")
    },
    counter_animate: function() {
        var e = $(".e_minute"),
            t = $(".e_hour"),
            n = parseInt(e.text(), 10),
            r = parseInt(t.text(), 10),
            i = this;
        i.time = n + r * 60,
            i.st = setInterval(function() {
                    i.time -= 1;
                    var n = i.time,
                        r = n % 60,
                        s = Math.floor(n / 60);
                    r == 0 && s == 0 && clearInterval(i.st),
                        r = r >= 10 ? r : "0" + r,
                        e.text(r),
                        t.text(s)
                },
                6e4)
    },
    create_player: function(e) {
        var t = this,
            n = t.in_page ? $(".i_new_main") : $(".broadcast"),
            r = String(e);
        r != "undefind" && (t.on_count = !0),
            window.HAS_AUDIO && !$.browser.msie ? str = t.html5_player() : str = t.flash_player(e),
            t.h5_player && t.h5_player.pause(),
            $(".create_broadcast").remove(),
            n.append('<div class="create_broadcast">' + str + "</div>"),
            t.h5_player = document.getElementById("h5_player"),
            t.h5_player && (t.h5_player.addEventListener("ended",
                function() {
                    t.h5_player.currentTime = 0,
                        t.h5_player_play(!0),
                        t.send_listencount()
                }), e ? (t.first_play = !0, t.h5_player_play(!1), n.find(".play").hide()) : (t.h5_player_play(!0), t.send_listencount(), n.find(".pause").hide()))
    },
    check_position: function(e) {
        var t = this,
            n = $(window).scrollTop();
        for (i in e) {
            var r = e[i];
            if (r.x <= n && r.x1 >= n) {
                t.check_event_nav(i);
                return
            }
        }
        $(".event-nav").removeClass("event-nav-top"),
            $(".event-nav li").removeClass("active").filter(":eq(0)").addClass("active")
    },
    check_event_nav: function(e, t) {
        var n = this;
        $(".event-nav").hasClass("event-nav-top") || $(".event-nav").addClass("event-nav-top"),
            $(".event-nav li").removeClass("active").filter(":eq(" + e + ")").addClass("active");
        if (t) {
            n.on_check = !1;
            var r = n.el_map_data[e].x + 1;
            $("html,body").animate({
                    scrollTop: r
                },
                500,
                function() {
                    n.on_check = !0
                })
        }
    },
    send_listencount: function() {
        var e = this,
            t = $(".broadcast").attr("data-tingid");
        t && e.on_count && $.getJSON("/api/ting/count?tingid=" + t,
            function(e) {
                if (e.code == "A00000") return !0
            })
    },
    flash_player: function(e) {
        var t = this.in_page ? "create_player" : "topic_player",
            n = "http://pkstatic.b0.upaiyun.com/" + t + ".swf?mp3=" + this.music_url + (e ? "&auto=0" : "");
        return $.browser.mozilla ? '<embed width="44" height="44"  src="' + n + '" type="application/x-shockwave-flash"  wmode="transparent"/>' : '<object id="create_player" width="44" height="44" classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" type="application/x-shockwave-flash"><param name="movie" value="' + n + '"><param name="wmode" value="transparent"/><embed wmode="transparent" width="44" height="44" src="' + n + '" name="create_player" pluginspage="http://www.macromedia.com/go/getflashplayer"/></object>'
    },
    html5_player: function() {
        var e = this.in_page ? "new_index" : "subject";
        return '<audio id="h5_player" preload="auto" src="' + this.music_url + '"><source src="' + this.music_url + '" type="audio/mp3"/></audio><img src="http://pkstatic.b0.upaiyun.com/images/' + e + '/broadcast.png" class="play"><img src="http://pkstatic.b0.upaiyun.com/images/' + e + '/broadcast_stop.png" class="pause">'
    }
};
Pianke.message = {
    init: function(e) {
        this.bindEvent()
    },
    bindEvent: function() {
        var e = this,
            t, n, r, i, s = $("div.topic").find("h2 span").text(),
            o = $(".current").find(".num").text();
        $(".say li").bind("mouseenter",
                function() {
                    $(this).find(".close").show()
                }),
            $(".say li").bind("mouseleave",
                function() {
                    $(this).find(".close").hide()
                }),
            $(".close").hide(),
            /鍒犻櫎/.test($(".say li").find(".out").text()) && $(".say li").find(".out").hide(),
            /鍒犻櫎/.test($(".say li").find(".out").text()) && ($(".say li").live("mouseenter",
                function() {
                    var e = $(this).find(".out");
                    e.show()
                }), $(".say li").live("mouseleave",
                function() {
                    var e = $(this).find(".out");
                    e.hide()
                })),
            $(".reset").html() == "鍥炲" && $(".reset").click(function() {
                return $("textarea")[0].focus(), !1
            }),
            $(".send").bind("click",
                function() {
                    var e = $(".send").attr("data-id"),
                        t = $("textarea:not([data-id])").val(),
                        n = 500;
                    if (t.length > n) return alert("鐗囬偖姝ｆ枃闄愬埗" + n + "瀛椾互鍐�"), !1;
                    $.trim(t) != "" && $.post("/api/message/send", {
                            withuid: e,
                            content: t
                        },
                        function(e) {
                            e.code == "A00000" ? ($("textarea").val(""), $("textarea")[0].focus(), s = s - 0 + 1, $("h2 span").text(s), $(".say").prepend(e.data.data.html), $(".delete").fadeIn().fadeOut(2e3)) : alert(PKINFO.eCode[e.code])
                        },
                        "json")
                }),
            $(".say .reset").html() == "蹇€熷洖澶�" && $(".say .reset").bind("click",
                function(e) {
                    var t = $(this),
                        n = t.parent().parent().find("a.comment_user_name").attr("href").split("/")[2],
                        r = t.parents("li").find(".name").text(),
                        i = r.slice(1, r.length - 1);
                    initMailBox(i, n)
                }),
            /鍒犻櫎/.test($(".say li").find(".out").text()) && $(".out").live("click",
                function(e) {
                    var t = $(e.target),
                        n = $(".send").attr("data-id"),
                        r = t.parent().parent().attr("id");
                    confirm("鎮ㄧ‘瀹氳鍒犻櫎璇ユ潯瀵硅瘽锛�",
                        function() {
                            $.post("/api/message/delete", {
                                    withuid: n,
                                    contentid: r
                                },
                                function(e) {
                                    e.code == "A00000" && (t.parent().parent().remove(), s -= 1, $("h2 span").text(s))
                                },
                                "json")
                        })
                }),
            $(".say li .close").click(function() {
                var e = $(this),
                    t = e.parent().find(".comment_user_name"),
                    n = t.attr("href").split("/")[2],
                    r = e.parent().find(".name").text(),
                    i = r.slice(1, r.length - 1);
                confirm("纭畾瑕佸垹闄や笌" + i + "鐨勫璇濓紵鍒犻櫎鍚庝笉鍙仮澶嶏紒",
                    function() {
                        $.post("/api/message/delcontact", {
                                withuid: n
                            },
                            function(t) {
                                t.code == "A00000" && (e.parent().remove(), o -= 1, $(".current").find(".num").text(o), $(".total").find("span").text(o))
                            },
                            "json")
                    })
            })
    }
};
Pianke.changePwd = {
    init: function() {
        / changepwd /.test(location.pathname) && this.attachEvents()
    },
    checkEmpty: function() {
        var e = ".registerform",
            t = $(e + " input");
        for (var n = 0; n < t.length; n++) $(t[n]).val() != "" && $(".placehoder", $(t[n]).parent().parent()).hide()
    },
    attachEvents: function() {
        var e = this,
            t = ".registerform";
        $(t + " input").focus(e.getFocus()),
            $(".registerform .login_true").bind("click",
                function(t) {
                    e.clickOnRegBtn(t)
                })
    },
    clickOnRegBtn: function(e) {
        var t = this;
        e.preventDefault();
        if ($("#o_pass").val() == "" || $("#n_pass").val() == "" || $("#c_pass").val() == "") {
            $(".registerform .login_true").removeAttr("logining");
            return
        }
        if ($(this).attr("logining") == 1) return;
        t.checkAll() && t.register()
    },
    getFocus: function() {
        return function(e) {
            $(".placehoder", $(this).parent().parent()).hide()
        }
    },
    loseFocus: function() {
        var e = this;
        return function(t) {
            $.trim($(this).val()) == "" && ($(".placehoder", $(this).parent().parent()).show(), $(this).val("")),
                e.check(this)
        }
    },
    check: function(e) {
        var t = this;
        if (!e) return;
        var n = e.id,
            r = $.trim($(e).val());
        return r == "" ? (t.msg("瀵嗙爜涓嶈兘涓虹┖"), !1) : r.length < 6 || r.length > 20 ? (t.msg("瀵嗙爜闀垮害涓�6-20浣嶅瓧绗�"), $(this).val(""), !1) : (t.msg("", n, !0), !0)
    },
    msg: function(e, t) {
        t = t || !1,
            t ? $("#err_msg").html(e).css("display", "none") : $("#err_msg").html(e).css("display", "list-item")
    },
    checkAll: function() {
        var e = this,
            t = e.check($("#c_pass")[0]);
        if (!t) return !1;
        var n = e.check($("#n_pass")[0]);
        if (!n) return !1;
        var r = e.check($("#o_pass")[0]);
        return r ? t && n && r ? $("#c_pass").val() !== $("#n_pass").val() ? (e.msg("涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷达紝璇烽噸璇�"), $("#c_pass").val(""), $("#n_pass").val(""), !1) : !0 : !1 : !1
    },
    register: function() {
        var e = this;
        $(".registerform .login_true").attr("logining", !0);
        var t = $.trim($("#o_pass").val()),
            n = $.trim($("#n_pass").val());
        $.ajax({
            url: "../api/user/changepwd",
            type: "POST",
            data: "oldpwd=" + t + "&newpwd=" + n,
            dataType: "json",
            success: function(t) {
                t.code != "A00000" ? (e.msg(PKINFO.eCode[t.code]), $(".registerform .login_true").removeAttr("logining")) : alert("瀵嗙爜淇敼鎴愬姛"),
                    $("#o_pass").val(""),
                    $("#n_pass").val(""),
                    $("#c_pass").val("")
            }
        })
    }
};
Pianke.pSetting = function() {
    var e = $("#province"),
        t = e.attr("data"),
        n = $("#city"),
        r = n.attr("data"),
        i = CITYINFO;
    return {
        init: function() {
            var e = this;
            e.initList(),
                e.bindEvents()
        },
        initList: function() {
            var r = [];
            for (var s in i.province) r.push("<li data='" + s + "'>" + i.province[s] + "</li>");
            $("ul", e.parent().parent()).html(r.join(""));
            var o = [];
            for (var s in i.city["" + t]) o.push("<li data='" + s + "'>" + i.city["" + t][s] + "</li>");
            $("ul", n.parent().parent()).html(o.join(""))
        },
        bindEvents: function() {
            var t = this;
            e.bind("click", t.showMenu()),
                n.bind("click", t.showMenu()),
                $("ul", e.parent().parent()).delegate("li", "click", t.clickProvince()),
                $("ul", n.parent().parent()).delegate("li", "click", t.clickCity()),
                $(".setbut a").bind("click", t.post()),
                $("#desc").focus(function() {
                    $(this).removeClass("gray"),
                        $("label", $(this).parent().parent()).hide()
                }).blur(function() {
                    $(this).val() == "" && $("label", $(this).parent().parent()).show()
                }).keyup(function() {
                    $.trim($(this).val()).replace(/[^\x00-\xff]/g, "**").length > 200 ? $("p", $(this).parent().parent()).show() : $("p", $(this).parent().parent()).hide()
                }),
                $("#uname").focus(function() {
                    $(this).parent().next().text("4-30浣嶅瓧绗︼紝涓嫳鏂囧潎鍙�").show()
                }).blur(function(e) {
                    var t = $(this),
                        n = $(this).parent().next();
                    t.parent().next().hide();
                    if ($.trim(t.val()) == "") {
                        n.html("鏄电О涓嶈兘涓虹┖").show();
                        return
                    }
                    var r = $.trim($(this).val()).replace(/[^\x00-\xff]/g, "**").length;
                    if (r < 4 || r > 30) {
                        n.html("鏄电О闀垮害涓� 4- 30 浣嶅瓧绗�").show();
                        return
                    }
                    $.ajax({
                        type: "post",
                        url: "/api/reg/checkuname",
                        dataType: "json",
                        data: "uname=" + $.trim($(this).val()) + "&page=setinfo",
                        success: function(e) {
                            e.code == "A00000" ? n.html("").hide() : n.html(PKINFO.eCode[e.code]).show()
                        }
                    })
                })
        },
        post: function() {
            return function(t) {
                t.preventDefault();
                var r = $.trim($("#uname").val()),
                    i = $.trim($("input[name=gender]:checked").val()),
                    s = e.attr("data"),
                    o = n.attr("data"),
                    u = $.trim($("#desc").val());
                if (r == "") {
                    alert("鐢ㄦ埛鍚嶄笉鑳戒负绌�");
                    return
                }
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: "uname=" + r + "&gender=" + i + "&province=" + s + "&city=" + o + "&desc=" + u,
                    url: "../api/user/setinfo",
                    success: function(e) {
                        e.code == "A00000" ? alert("淇敼鎴愬姛") : alert(PKINFO.eCode[e.code])
                    }
                })
            }
        },
        showMenu: function() {
            return function(e) {
                e.stopPropagation(),
                    $("#province").removeClass("gray"),
                    $("#city").removeClass("gray"),
                    $("ul", $(this).parent().parent()).toggle()
            }
        },
        clickProvince: function() {
            return function(t) {
                var r = $(this).attr("data"),
                    s = $(this).html();
                e.attr("data", r).val(s),
                    $(this).parent().hide();
                var o = [];
                for (var u in i.city["" + r]) o.push("<li data='" + u + "'>" + i.city["" + r][u] + "</li>");
                $("ul li", n.parent().parent()).remove(),
                    $("ul", n.parent().parent()).html(o.join("")),
                    n.attr("data", "-1").val("璇烽€夋嫨")
            }
        },
        clickCity: function() {
            return function(e) {
                var t = $(this).attr("data"),
                    r = $(this).html();
                n.attr("data", t).val(r),
                    $(this).parent().hide()
            }
        }
    }
};
Pianke.Oauth = {
    init: function() {
        this.bindEvent()
    },
    bindEvent: function() {
        var e = this,
            t = ".registerform";
        $(t + " input").bind("focus",
                function() {
                    e.getFocus($(this))
                }).bind("blur",
                function() {
                    e.loseFocus($(this))
                }),
            $("#bindnew").bind("keydown",
                function(e) {
                    e.keyCode == 13 && $(".away .login_but").trigger("click")
                }),
            $(".away .login_but").bind("click", e.clickOnRegBtn()),
            $("#myTab").delegate("li", "click",
                function(e) {
                    if ($(this).hasClass("current")) return;
                    var t = $(".current", $(this).parent()),
                        n = $(t.attr("target"));
                    t.removeClass("current"),
                        n.hide(),
                        $(this).addClass("current"),
                        $($(this).attr("target")).show(),
                        e.preventDefault()
                }),
            $("#read").bind("click",
                function() {
                    $(this).attr("checked") ? $("#register_btn").removeClass("login_gray") : $("#register_btn").addClass("login_gray")
                })
    },
    clickOnRegBtn: function() {
        var e = this;
        return function(t) {
            t.preventDefault();
            if ($(this).hasClass("login_gray")) return;
            if (e.checkAll() && this.id == "register_btn") {
                e.register(this);
                return
            }
            if (this.id == "bind_btn" && ($("#pass2").val() == "" || $("#email2").val() == "")) return;
            if (e.checkAllExt() && this.id == "bind_btn") {
                e.bindOauth(this);
                return
            }
        }
    },
    getFocus: function(e) {
        var t = this;
        e.parent().prev().hide();
        var n = e.attr("id");
        switch (n) {
            case "uname":
            case "nickname":
                t.msg("4-30浣嶅瓧绗︼紝涓嫳鏂囧潎鍙�", n);
                break;
            case "email":
                t.msg("寰堥噸瑕侊紝鐢ㄤ簬鐧诲綍鐗囧埢缃戠珯", n);
                break;
            case "password":
                t.msg("6-20浣嶅瓧绗︼紝鍖哄垎澶у皬鍐�", n);
                break;
            default:
        }
    },
    loseFocus: function(e) {
        var t = this;
        if (t.id == "email2" || t.id == "pass2") return;
        $.trim(e.val()) == "" && e.parent().prev().show().val(""),
            setTimeout(function() {
                    t.check(e)
                },
                100)
    },
    check: function(e) {
        if (!e) return;
        var t = this,
            n = e.attr("id"),
            r = $.trim(e.val());
        switch (n) {
            case "uname":
                if (r == "") return t.msg("鏄电О涓嶈兘涓虹┖", n), !1;
                t.name_isuniq(e);
                if (r.replace(/[^\x00-\xff]/g, "**").length < 4 || r.replace(/[^\x00-\xff]/g, "**").length > 30) return t.msg("鏄电О闀垮害涓�4-30浣嶅瓧绗�", n), !1;
                break;
            case "email":
                var i = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;
                if (r.length == 0 || r == "甯哥敤閭") return t.msg("閭涓嶈兘涓虹┖", n), !1;
                if (!i.test(r)) return t.msg("閭鏍煎紡閿欒", n), !1;
                $.post("/api/reg/checkemail", {
                        email: r
                    },
                    function(e) {
                        if (e.data.msg) return t.msg(e.data.msg, n), !1
                    },
                    "json");
                break;
            case "password":
                if (r == "") return t.msg("瀵嗙爜涓嶈兘涓虹┖", n), !1;
                if (r.length < 6 || r.length > 20) return t.msg("6-20浣嶅瓧绗︼紝鍖哄垎澶у皬鍐�", n), !1;
                t.msg("", n, !0);
                break;
            default:
                return !0
        }
        return t.msg("", n, !0), !0
    },
    msg: function(e, t, n) {
        n = n || !1,
            n ? $("#err_" + t).slideUp(200).html(e) : $("#err_" + t).slideDown(200).html(e)
    },
    checkAll: function() {
        var e = this,
            t = e.check($("#password")),
            n = e.check($("#email"));
        return t && n ? !0 : !1
    },
    checkAllExt: function() {
        var e = this,
            t = e.check($("#pass2")),
            n = e.check($("#email2"));
        return t && n ? !0 : !1
    },
    register: function(e) {
        var e = this;
        if (!$("#read").attr("checked")) {
            alert("璇峰厛闃呰骞跺悓鎰忎娇鐢ㄥ崗璁�");
            return
        }
        var t = $.trim($("#email").val()),
            n = $.trim($("#password").val()),
            r = $("#ouid").val(),
            i = $("#oauthSource").val(),
            s = $("#uname").val();
        $.ajax({
            url: "../../api/bind/bindnew",
            type: "POST",
            data: "email=" + t + "&uname=" + s + "&passwd=" + n + "&ouid=" + r + "&source=" + i,
            dataType: "json",
            success: function(t) {
                t.code != "A00000" ? e.msg(PKINFO.eCode[t.code], "password") : window.location = t.data.redirect
            }
        })
    },
    bindOauth: function(e) {
        var e = this;
        $(e).addClass("login_gray");
        var t = $.trim($("#email2").val()),
            n = $.trim($("#pass2").val()),
            r = $("#ouid").val(),
            i = $("#oauthSource").val();
        if (t == "" || n == "") return;
        $.ajax({
            url: "../../api/bind/bindexists",
            type: "POST",
            data: "email=" + t + "&passwd=" + n + "&ouid=" + r + "&source=" + i,
            dataType: "json",
            success: function(t) {
                t.code != "A00000" ? (e.msg(PKINFO.eCode[t.code], "pass2"), $(e).removeClass("login_gray")) : window.location = t.data.redirect
            }
        })
    },
    name_isuniq: function(e) {
        var t = $.trim(e.val()),
            n = this;
        $.post("/api/reg/checkuname", {
                uname: t
            },
            function(e) {
                e.code == "A00202" && n.msg(e.data.msg, "uname")
            },
            "json")
    }
};
Pianke.note = {
    load_page: 1,
    fall_canload: !0,
    scrollLoad: !0,
    GET_POST_URL: "/api/note/getpost.php",
    stream_content: $(".main_cont"),
    per_pagecount: 3,
    requester: null,
    init: function() {
        this.bindEvent()
    },
    bindEvent: function() {
        var e = this;
        $(window).scroll(function() {
                $(document).height() <= $(window).height() + $(window).scrollTop() + 20 && e.fall_canload && e.load_more()
            }),
            $(".mainnav a,.total a").bind("click",
                function() {
                    var t = $(this),
                        n = t.is("[s-key]"),
                        r = n ? $("#currentsort") : $("#currentquery"),
                        i = n ? "s-key" : "q-key",
                        s = t.attr(i);
                    e.fall_canload = !0,
                        n && $(".time_tab").toggle(s == "2"),
                        t.parents(".mainnav,.total").find("a").removeClass("current"),
                        t.addClass("current"),
                        r.val(s),
                        e.stream_content.empty(),
                        e.load_more(1)
                }),
            $(".loadpages a").live("click",
                function(t) {
                    t.preventDefault();
                    var n = $(this),
                        r = e.load_page,
                        i = e.per_pagecount;
                    e.fall_canload = !0,
                        n.hasClass("next") ? r += 1 : n.hasClass("up") ? r -= r % i ? r % i + i - 1 : 2 * i - 1 : r = (parseInt(n.text(), 10) - 1) * i + 1,
                        e.stream_content.empty(),
                        e.load_page = r,
                        e.load_more(e.load_page)
                })
    },
    load_more: function(e) {
        var t = this,
            n = $("#errormsg.loading"),
            r = !1;
        r = e ? !1 : t.load_page % t.per_pagecount == 0,
            t.requester && t.requester.abort && t.requester.abort();
        if (!t.fall_canload || !/note/.test(location.pathname.split("/")[1]) || r) return !1;
        e ? t.load_page = e : t.load_page += 1,
            t.fall_canload = !1,
            n.show(),
            t.requester = $.getJSON(t.GET_POST_URL, {
                    page: t.load_page,
                    sort: $("#currentsort").val(),
                    query: $("#currentquery").val(),
                    _: Math.floor(Math.random() * 999999)
                },
                function(e) {
                    n.hide(),
                        e.data.data.ended ? (showerrortip("宸茬粡琚綘娴忚瀹屼簡锛屼紤鎭竴涓嬪惂锝�"), t.fall_canload = !1) : (t.fall_canload = !0, e.data.data.html && t.stream_content.append($(e.data.data.html)))
                })
    }
};
Pianke.theater = {
    init: function() {
        this.bindEvent(),
            $(".entry").length && /theater/.test(location.pathname) && Pianke.comment.getcomment($(".entry"), 1, 1, !0, !1)
    },
    none_pic: "http://pkstatic.b0.upaiyun.com/images/theater/none.jpg",
    bindEvent: function() {
        var e = this;
        $("#theater_title").bind("focus",
                function() {
                    var e = $(this),
                        t = e.val();
                    t == "璇疯緭鍏ユ爣棰�" && e.val("").removeClass("gray1")
                }).bind("blur",
                function() {
                    var e = $(this),
                        t = e.val();
                    e.removeClass("gray1"),
                        t == "" && $(this).val("璇疯緭鍏ユ爣棰�").addClass("gray1")
                }),
            $(".box textarea").bind("keydown",
                function(e) {
                    text = $(this).val(),
                        text.split("\n").length >= 10 && e.keyCode == 13 && e.preventDefault()
                }),
            $(".newstyle .times a").bind("click",
                function() {
                    $(".newstyle .times a").removeClass("on"),
                        $(this).addClass("on"),
                        e.renderTheater(),
                        e.subject_posts_pdata({
                            type: "tag",
                            value: $(this).text()
                        })
                }),
            $(".newstyle .hour_new a").bind("click",
                function() {
                    $(".newstyle .hour_new a").removeClass("on"),
                        $(this).addClass("on"),
                        e.renderTheater(),
                        e.subject_posts_pdata({
                            type: "hotitem",
                            value: $(this).text()
                        })
                }),
            $(".theater_pagination a").live("click",
                function(t) {
                    t.preventDefault();
                    var n = $(this)[0].href.split("page=")[1];
                    e.renderTheater(n)
                }),
            $(".send").bind("click",
                function() {
                    if ($(this).hasClass("sub_send")) return !1;
                    e.theater_submit()
                }),
            $(".sub_send").bind("click",
                function() {
                    var t = $(this).attr("data-id");
                    e.theater_submit(!0, t)
                }),
            $(".sendn").live("click",
                function() {
                    Pianke.comment.submitcomment($(this), 0, 1)
                }),
            $(".talk .like,.creation .like").live("click",
                function() {
                    var e = $(this),
                        t = e.parents(".icon").attr("data-id") || e.attr("data-id");
                    submitlike(t, e)
                }),
            $(".del_theater").live("click",
                function() {
                    var e = $(this),
                        t = e.attr("data-id");
                    confirm("鎮ㄧ‘瀹氳鍒犻櫎杩欎釜鍓ф湰锛�",
                        function() {
                            var n = {
                                contentid: t
                            };
                            $.post("/api/subject/subject_posts_del", n,
                                function() {
                                    / profile /.test(location.pathname) ? (e = e.parent(), e.slideUp(200,
                                        function() {
                                            e.remove()
                                        })) : location.href = "/subject/"
                                },
                                "json")
                        })
                }),
            $(".direction .arrow").bind("click",
                function() {
                    var e = $(".theater_img"),
                        t = $(this).hasClass("down") ? $(".theater .shadow ul").height() + 75 : 260;
                    e.animate({
                                height: t
                            },
                            500),
                        $(".arrow.down").hasClass("hide") && $("html,body").animate({
                                scrollTop: 0
                            },
                            500),
                        $(".arrow.up,.arrow.down").toggleClass("hide")
                }),
            $(".theater_img li").bind("click",
                function() {
                    var t = $(this),
                        n = $(".theater_img li.selected").length;
                    if (n >= 3 && !t.hasClass("selected")) return !1;
                    $(".arrow.up").hasClass("hide") && $(".arrow.down").trigger("click"),
                        t.toggleClass("selected"),
                        e.change_selector(t, n, t.find("span").length)
                }),
            $(".essay a").bind("click",
                function() {
                    $(".essay .pen").toggle()
                }),
            $(".began").bind("click",
                function() {
                    var e = $(this),
                        t = $(".theater_img li.selected"),
                        n = t.length;
                    if (e.hasClass("began_gray")) return !1;
                    url = "/subject/publish?",
                        $.each(t,
                            function(e) {
                                var t = $(this),
                                    r = parseInt(t.find("span").text(), 10);
                                url += "img" + r + "=" + (parseInt(t.index(), 10) + 1),
                                    url += e != n - 1 ? "&" : ""
                            }),
                        PKINFO.islogin ? location.href = url : openlogintip()
                }),
            $(".path").bind("click",
                function(e) {
                    e.preventDefault(),
                        e.cancelBubble = !0,
                        $(this).parents(".box").toggleClass("right_box").toggleClass("left_box")
                }),
            $(".own").hover(function() {
                    $(this).addClass("zindex")
                },
                function() {
                    $(this).removeClass("zindex")
                }),
            $(".box .close").bind("click",
                function() {
                    var t = $(this).parent(".img"),
                        n = t.attr("data-id"),
                        r = $(".choose li[data-id=" + n + "]");
                    setTimeout(function() {
                                t.addClass("none_img")
                            },
                            50),
                        e.exchangeAnimate(r.find("img"), t.find("img"),
                            function() {
                                r.removeClass("selected"),
                                    t.attr("data-id", "00").fadeOut(100,
                                        function() {
                                            t.find("img").attr({
                                                src: e.none_pic
                                            }).end().fadeIn(100)
                                        })
                            })
                }),
            $(".storystyle a").bind("click",
                function() {
                    var e = $(this);
                    !e.hasClass("on") && $(".storystyle a.on").length < 3 ? e.addClass("on") : e.removeClass("on")
                }),
            $(".box .img").bind("click",
                function() {
                    flag = $(this).hasClass("selected") ? !1 : !0,
                        $(".box .img").removeClass("selected"),
                        flag ? $(this).addClass("selected") : $(this).removeClass("selected")
                }),
            $(".choose li").bind("click",
                function() {
                    var t = $(this),
                        n = $(".none_img:first"),
                        r = n.length,
                        i = $(".img.selected"),
                        s = i.length;
                    if (t.hasClass("selected") || s == 0 && r == 0) return !1;
                    var o = n,
                        u = t.find("img").attr("src"),
                        a = o.attr("data-id"),
                        f = t.attr("data-id");
                    s && (o = i, a = o.attr("data-id")),
                        e.exchangeAnimate(o.find("img"), t.find("img"),
                            function() {
                                o.removeClass("selected none_img").attr("data-id", f).find("img").attr("src", u),
                                    t.addClass("selected"),
                                    $(".choose li[data-id=" + a + "]").removeClass("selected")
                            })
                }),
            $(".times a").bind("click",
                function() {})
    },
    renderTheater: function(e) {
        var t = this,
            n = e ? !0 : !1,
            r = r || {
                page: e || 1,
                hotitem: $(".hour_new a.on").attr("hotitem"),
                tag: $(".times a.on").text()
            };
        $.getJSON("/api/subject/subject_posts_get", r,
            function(e) {
                if (e.code == "A00000") {
                    $(".theater_inner").html(e.data.data);
                    var t = $(".newstyle").offset().top - 70;
                    n && $("html,body").animate({
                            scrollTop: t
                        },
                        100)
                } else alert(PKINFO.eCode[e.code])
            })
    },
    subject_posts_pdata: function(e) {
        $.post("/api/subject/subject_posts_pdata", e,
            function() {
                return !0
            },
            "json")
    },
    change_selector: function(e, t, n) {
        var r = $(".began");
        if (n) {
            var i = e.find("span"),
                s = parseInt(i.text(), 10);
            r.hasClass("began_gray") || r.addClass("began_gray"),
                i.remove(),
                $.each($(".theater_img li span"),
                    function() {
                        var e = $(this),
                            t = parseInt(e.text(), 10);
                        t -= s < t ? 1 : 0,
                            e.text(t)
                    })
        } else {
            t += 1,
                i = $('<span class="counter">' + t + "</span>"),
                e.append(i);
            if (t == 3) {
                r.removeClass("began_gray"),
                    r.next().hide();
                var o = r.offset().top - $(window).height() / 2;
                $("html,body").animate({
                        scrollTop: o
                    },
                    300)
            }
        }
    },
    exchangeAnimate: function(e, t, n) {
        var r = window.navigator.userAgent.toLowerCase(),
            i = $.browser.msie && /msie 8\.0/i.test(r),
            s = $.browser.msie && /msie 7\.0/i.test(r),
            o = !$.browser.msie8 && !$.browser.msie7 && $.browser.msie && /msie 6\.0/i.test(r);
        if (o || s || i) n();
        else {
            clone = t ? t.clone() : e.clone(),
                $("body").append(clone.hide());
            var u = this.get_css(t),
                a = this.get_css(e),
                f = this.get_css(t);
            f.top -= 200,
                f.len -= 200,
                clone.show().css(u).animate(f, 200,
                    function() {
                        clone.animate(a, 400,
                            function() {
                                n(),
                                    clone.remove()
                            })
                    })
        }
    },
    get_css: function(e) {
        return {
            position: "absolute",
            top: e.offset().top,
            left: e.offset().left,
            width: e.width(),
            height: e.height(),
            "z-index": 999
        }
    },
    theater_submit: function(e, t) {
        var n = "",
            r = $(".storystyle .on"),
            i = e ? "/api/subject/subject_posts_edit" : "/api/subject/subject_posts_add",
            t = t || "0";
        if (!this.check()) return !1;
        r.each(function(e) {
                n += $(this).text(),
                    e != r.length - 1 && (n += ",")
            }),
            params = {
                id: t,
                title: $.trim($("#theater_title").val()),
                type: n,
                afterword: $.trim($("#afterword").val()),
                content: {},
                subject_id: $("#subject_id").val()
            },
            $.each($(".content .box"),
                function(e) {
                    var t = $(this);
                    params.content["item" + e] = {
                        style: t.hasClass("left_box") ? 0 : 1,
                        content: t.find("textarea").val(),
                        img: t.find("img").attr("src")
                    }
                }),
            $.post(i, params,
                function(e) {
                    e.code != "A00000" ? alert(PKINFO.eCode[e.code]) : location.href = e.data.url
                },
                "json")
    },
    check: function() {
        var e = $("#theater_title").val(),
            t = $.trim(e).length,
            n = this;
        return t == 0 || e == "璇疯緭鍏ユ爣棰�" ? (n.error_text("璇疯緭鍏ユ爣棰�"), !1) : t > 30 ? (n.error_text("鏍囬闀垮害涓嶈兘瓒呰繃30涓瓧"), !1) : $(".choose .selected").length != 3 && !/edit/.test(location.pathname) ? (n.error_text("鍐呭鎴栧浘鐗囦笉瀹屾暣"), !1) : (bool = !0, $.each($(".box textarea"),
            function() {
                if (this) {
                    var e = $.trim($(this).val()).length;
                    e == 0 && (n.error_text("鍐呭鎴栧浘鐗囦笉瀹屾暣"), bool = !1),
                        e > 300 && (n.error_text("姣忎釜鍦烘櫙鐨勫唴瀹逛笉鑳借秴杩�300瀛�"), bool = !1)
                }
            }), bool ? $("#afterword").val().length > 140 ? (n.error_text("鍚庤鍐呭涓嶈兘瓒呰繃140瀛�"), !1) : $(".storystyle .on").length == 0 ? (n.error_text("璇烽€夋嫨浣犵殑鍒涗綔绫诲瀷"), !1) : !0 : !1)
    },
    error_text: function(e) {
        var t = $(".storystyle .brown");
        t.show().text(e)
    }
};
$(document).ready(function() {
    $("#logininfobox .account").hover(function(e) {
                e.preventDefault(),
                    e.stopPropagation();
                var t = $("ul", $(this));
                t.show(),
                    $("a", $(this)).get(0).className = "on"
            },
            function(e) {
                $("a", $(this)).get(0).className = "off";
                var t = $("ul", $(this));
                t.hide()
            }),
        $("#logininfobox .account > a").click(function(e) {
            e.preventDefault()
        }),
        $(document).click(function(e) {
            $(".d_dropmenu").hide()
        }),
        $(".dropmemu").parent().hover(function() {
                var e = $("ul", $(this).parent());
                e.css("display", "block"),
                    $(".dropmemu", this).addClass("current")
            },
            function() {
                var e = $("ul", $(this).parent());
                e.css("display", "none"),
                    $(".dropmemu", this).removeClass("current")
            }),
        $("#user_setting") && $("#user_setting").size() == 1 && (new Pianke.pSetting).init(),
        $("#fixedlogin") && $("#fixedlogin").size() == 1 && Pianke.LayerLogin.init()
});
Pianke.search = {
    current_request: {},
    cur_num: -1,
    init: function() {
        $(".f_text .f_search").bind("click",
            function() {
                $(this).prev().submit()
            })
    },
    bindEvent: function() {
        var e = this;
        e.result_hide(),
            $(".f_text .f_search").bind("click",
                function() {
                    $(this).prev().submit()
                }),
            $(".find_end li").live("click",
                function() {
                    location.href = $(this).find(".current a").attr("href")
                }),
            location.pathname.split("/")[1].toString() == "search" && ($(".contact .icon7, .contact .icon8").live("click",
                function() {
                    var t = $(this);
                    e.toggle_attention(t)
                }), $("#suser").live("click",
                function() {
                    location.href = "/search/user/" + encodeURIComponent($(".find_t_cont .f_text input").val())
                }), $("#scontent").live("click",
                function() {
                    location.href = "/search/pianke/" + encodeURIComponent($(".find_t_cont .f_text input").val())
                }))
    },
    fetch_search: function(e) {
        return
    },
    request_search: function(e) {
        var t = this;
        t.current_request.onreadystatechange && t.current_request.abort(),
            t.current_request = $.ajax({
                url: "/api/search/suggest",
                data: e,
                dataType: "json",
                success: function(e) {
                    t.render_list(e);
                    var n = $(".f_text input:focus").siblings(".find_end");
                    n.show(),
                        n.find("li").length < 1 && n.hide(),
                        t.current_request = {}
                }
            })
    },
    render_list: function(e) {
        var t = e ? e.data.data.user : [],
            n = e ? e.data.data.scnt : [],
            r = "";
        r += this.result_html(n, "content"),
            r += this.result_html(t, "user"),
            $(".f_text input:focus").siblings(".find_end").find("ul").html(r)
    },
    result_html: function(e, t) {
        var n = "",
            r = this.cut_text($("input:focus").val(), 4),
            i = this.type_detail(t);
        return $("input:focus").parents(".find_t_cont").find("li").is(".current") ? $(".f_tab li.current").attr("data-type") && $.each(e,
                function() {
                    i.isBool(this) && (n += i.innerStr(this))
                }) : (n += "<li><a class='recommon' href=" + i.search_url + ">鎼�'<span class='orange'>" + r + "</span>'" + i.type_text + "</a></li>", $.each(e,
                function() {
                    i.isBool(this) && (n += i.innerStr(this))
                })),
            n
    },
    toggle_attention: function(e) {
        var e = e,
            t = e.is(".icon7"),
            n = "/api/attention/" + (t ? "unfollow" : "follow"),
            r = {
                staruids: e.attr("data-id")
            },
            i = t ? "鍔犲叧娉�" : "鍙栨秷鍏虫敞";
        Pianke.user.get_attention(e, n, r,
            function() {
                e.toggleClass("icon8 icon7").attr("title", i),
                    e.siblings(".icon6").toggle()
            })
    },
    type_detail: function(e) {
        var t = {},
            n = this;
        switch (e) {
            case "user":
                t.type_text = "鐩稿叧鐢ㄦ埛禄",
                    t.search_url = "/search/user/" + encodeURIComponent($("input:focus").val()),
                    t.innerStr = function(e) {
                        var t = e.uname;
                        return $("input:focus").parents(".find_t_cont").find("li").is(".current") || (t = n.cut_text(e.uname, 12)),
                            "<li><a href='/profile/" + e.uid + "/'>" + "<img src='" + e.icon + "'/><p>" + t + "</p></a></li>"
                    },
                    t.isBool = function(e) {
                        return e && e.uid
                    };
                break;
            case "content":
                t.type_text = "鐩稿叧鍐呭禄",
                    t.search_url = "/search/pianke/" + encodeURIComponent($("input:focus").val()),
                    t.innerStr = function(e) {
                        return "<li><a href='/profile/" + e.uid + "/'>" + "<img src='" + e.icon + "'/><p>" + e.uname + "</p></a></li>"
                    },
                    t.isBool = function(e) {
                        return e && e
                    };
                break;
            default:
                t = {}
        }
        return t
    },
    choose_item: function(e) {
        $(".f_text input:focus").siblings(".find_end").find("li").removeClass("current").filter(":eq(" + e + ")").addClass("current")
    },
    next_item: function() {
        this.cur_num = this.cur_num == $(".f_text input:focus").siblings(".find_end").find("li").length - 1 ? 0 : this.cur_num += 1,
            this.choose_item(this.cur_num)
    },
    prev_item: function() {
        this.cur_num = this.cur_num == -1 ? $(".f_text input:focus").siblings(".find_end").find("li").length - 1 : this.cur_num -= 1,
            this.choose_item(this.cur_num)
    },
    result_hide: function() {
        $(".f_text .find_end").hide(),
            this.cur_num = -1
    },
    cut_text: function(e, t) {
        var e = e,
            n = 0,
            r;
        for (r = 0; r < e.length; r++) {
            e.charCodeAt(r) > 256 ? n += 2 : n += 1;
            if (n > t) return e.substr(0, r) + "..."
        }
        return e.substr(0, r + 1)
    }
};
Pianke.classic = {
    ISLOADMORE: !0,
    scrollLoad: !0,
    cur_play: {},
    play_st: 0,
    is_play: /classic/.test(location.pathname),
    init: function() {
        this.bindEvent(),
            location.pathname.split("/")[1] == "cposts" && ($(".entry").hide(), Pianke.comment.getcomment($(".entry"), 0, 1, !0, !1)),
            Pianke.player.init_player($("#musicurl").val(), $(".mp3_mian"))
    },
    bindEvent: function() {
        var e = this;
        $(".say_but").bind("click",
                function() {
                    var e = "/api/classic/addposts.php",
                        t = $("#classic_id").val(),
                        n = $(".true_enter textarea").val();
                    !n || $.post(e, {
                            classicid: t,
                            content: n
                        },
                        function(e) {
                            e.code == "A00000" ? ($(".create_content.first").removeClass("first"), $(".topic_list").prepend($('<div id="domSpace" style="display:none"></div>').append(e.data.data.html)), $("#domSpace").slideDown(), $(".true_enter textarea").val("")) : showerrortip(e.data.msg)
                        },
                        "json")
                }),
            $(".del_classic").live("click",
                function() {
                    var e = $(this),
                        t = e.attr("data-id"),
                        n = e.parents(".create_content"),
                        r = n.hasClass("first") ? "first" : "";
                    confirm("鎮ㄧ‘瀹氳鍒犻櫎姝ゆ潯鍐呭锛�",
                        function() {
                            $.post("/api/classic/delposts.php", {
                                    contentid: t
                                },
                                function(e) {
                                    e.code === "A00000" ? (n.slideUp(function() {
                                        n.remove()
                                    }), $(".create_content:first").addClass(r)) : showerrortip(e.data.msg)
                                },
                                "json")
                        })
                }),
            $(".classic_posts_pagination .pages a").live("click",
                function() {
                    var t = $(this);
                    return $(".create_content, .pages").remove(),
                        e.ajax_load(t, "", ""), !1
                }),
            $(".classic_style_list a").live("click",
                function() {
                    var t = $(this);
                    return $(".icon_name a").removeClass("current"),
                        t.addClass("current"),
                        e.ajax_load(t, "", 1), !1
                }),
            location.pathname.split("/")[1] == "classic" && location.pathname.split("/").length < 4 && ($("#submore").text("鏁版嵁鍔犺浇涓�,璇风◢鍊�..."), $(window).scroll(function() {
                e.autoLoading()
            }), $(document).height() <= parseFloat($(window).height()) + parseFloat($(window).scrollTop()) + 500 && e.autoLoading())
    },
    ajax_load: function(e, t, n) {
        var r = this,
            i = "/api/classic/getNpagePosts.php",
            s = $("#classic_id").val(),
            t = t || 15,
            o = /new/.test($(".current").attr("href")) ? "new" : "hot",
            n = n ? n : e.text();
        switch (n) {
            case "涓婇〉":
                n = Number($(".pages .on").text()) - 1;
                break;
            case "涓嬮〉":
                n = Number($(".pages .on").text()) + 1;
                break;
            default:
                n = n
        }
        var u = {
            page: n,
            classicid: s,
            size: t,
            sort: o
        };
        $.post(i, u,
            function(e) {
                if (e.code != "A00000") return !1;
                $("#currenpageno").val(n),
                    $(".create_content, .pages").remove(),
                    $(".topic_list").prepend(e.data.data.html),
                    window.scroll(0, $(".topic_l .s_topic").offset().top - 15),
                    $("#currenloadpageno").val(e.data.data.load_page),
                    r.ISLOADMORE = !0
            },
            "json")
    },
    loadmoreposts: function() {
        var e = this,
            t = $("#currenloadpageno").val(),
            n = Number(t) + 1,
            r = $("#currenpageno").val(),
            i = $("#classic_id").val(),
            s = s || 15,
            o = /new/.test($(".current").attr("href")) ? "new" : "hot";
        $("#submore").show(),
            $("#loading").show();
        var u = {
            classicid: i,
            page: r,
            load_page: n,
            sort: o,
            size: s
        };
        return $.ajaxSetup({
                cache: !1
            }),
            $.post("/api/classic/getposts", u,
                function(t) {
                    if (t.code != "A00000") return $("#loading").hide(),
                        $("#submore").hide(), !1;
                    $("#currenloadpageno").val(n),
                        $(".create_content:last").after(t.data.data.html),
                        $("#loading").hide(),
                        $("#submore").hide(),
                        e.scrollLoad = !0,
                        t.data.data.curtotal < 15 ? (e.ISLOADMORE = !1, $("#errormsg").hide()) : $("#errormsg").show()
                },
                "json"), !0
    },
    edit_player: function(e) {
        var t = "",
            n = "http://pkstatic.b0.upaiyun.com/swf/singlemp3player.swf",
            r = location.pathname.split("/")[1] == "classic" ? 220 : 145;
        if (!e) return !1;
        if (window.HAS_AUDIO) {
            var i = this.cur_play;
            i.src = e,
                clearInterval(this.play_st),
                this.is_play ? ($(".m_player .play").hide(), $(".m_player .pause").show(), this.play_music()) : ($(".m_player .play").show(), $(".m_player .pause").hide())
        } else params = n + "?file=" + e + "&repeatPlay=true&songVolume=100&frontColor=827bb4&autoStart=" + this.is_play,
            $(".mp3_player").empty().html('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + r + '" height="20" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="wmode" value="transparent"><param name="movie" value="' + params + '"><embed wmode="transparent" width="' + r + '" height="30" src="' + params + '" pluginspage="http://www.macromedia.com/go/getflashplayer"></object>')
    },
    play_music: function(e) {
        var t = this,
            n = t.cur_play;
        n.play(),
            e.find(".play").hide(),
            e.find(".pause").show(),
            clearInterval(t.play_st),
            t.play_st = setInterval(function() {
                    t.show_progress(n)
                },
                33)
    },
    show_progress: function(e) {
        var e = e || this.cur_play;
        $(".progress_bar").width(Math.floor(100 * (e.currentTime / e.duration)) + "%"),
            e.duration && e.currentTime == e.duration && (e.currentTime = 0, e.play())
    },
    autoLoading: function() {
        var e = 0,
            t = this,
            n = $("#currenloadpageno").val() % 3 != 0;
        totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()) + 500,
            $(document).height() <= totalheight && n && !$(".classic_posts_pagination .pages").first().find("a")[0] && t.scrollLoad == 1 && t.ISLOADMORE == 1 && (t.scrollLoad = !1, t.loadmoreposts())
    }
};
Pianke.talk = {
    LIST: window.othertalk || [],
    init: function() {
        this.bindEvent(),
            Pianke.comment.getcomment($(".entry"), 1, 1, !0)
    },
    bindEvent: function() {
        var e = this;
        $(".prior_img .up,.prior_img .down").bind("click",
            function() {
                var t = $(this).hasClass("up");
                e.change_slide(t)
            })
    },
    change_slide: function(e) {
        var t = null,
            n = this.LIST.length;
        n > $(".prior_cont li").length ? (this.fill_slider(), t = e ? this.LIST.length - 1 : 1) : (t = $(".prior_cont li:visible").index() + (e ? -1 : 1), t < 0 ? t = n - 1 : t == n && (t = 0)),
            $(".prior_cont li").hide().filter(":eq(" + t + ")").show()
    },
    fill_slider: function() {
        var e = this.LIST,
            t = "",
            n = null;
        if (e.length) {
            for (i in e) data = e[i],
                t += '<li><p><a href="/talk/' + data.url + '"><img src="' + data.user_img + '"></a></p><p class="user_new">VoL.' + data.number + '<a href="/talk/' + data.url + '">' + data.name + "</a></p></li>";
            n = $(t),
                n.hide(),
                $(".prior_cont ul").html(n)
        }
    }
};
Pianke.player = {
    cur_player: {},
    is_play: /classic/.test(location.pathname),
    bindEvent: function(e) {
        var t = this,
            n = e.find("audio")[0];
        e.find(".progress").bind("click",
            function(r) {
                var i = r.offsetX / ($(this).width() / 100),
                    s = i / 100 * n.duration;
                n.currentTime = s,
                    e.find(".progress_bar").width(i + "%"),
                    t.play_music(e)
            }).end().find(".play").bind("click",
            function() {
                t.play_music(e)
            }).end().find(".pause").bind("click",
            function() {
                n.pause(),
                    e.find(".play").show().end().find(".pause").hide()
            })
    },
    init_player: function(e, t) {
        var n = this,
            r = "",
            i = "http://pkstatic.b0.upaiyun.com/swf/singlemp3player.swf",
            s = location.pathname.split("/")[1] == "classic" ? 220 : 145,
            o = window.HAS_AUDIO ? t.find(".mp3_player") : t.find(".m_player"),
            u = window.HAS_AUDIO ? t.find(".m_player") : t.find(".mp3_player"),
            a;
        if (!e) return !1;
        o.remove(),
            u.slideDown(),
            window.HAS_AUDIO ? (a = u.find("audio"), a.attr("src", e), n.cur_player[e] = a, n.is_play && n.play_music(u)) : (params = i + "?file=" + e + "&repeatPlay=true&songVolume=100&frontColor=827bb4&autoStart=" + n.is_play, u.empty().html(n.get_flash_obj(params, s))),
            t.data("on_play", !0),
            n.bindEvent(u)
    },
    play_music: function(e) {
        var t = this,
            n = e[0].src,
            r = e.find("audio")[0],
            i = e.attr("data-tingid");
        i && !e.data("played") && (e.data("played", !0), Pianke.ting.send_listencount(i)),
            r.play(),
            e.find(".play").hide().end().find(".pause").show(),
            clearInterval(t.play_st),
            t.play_st = setInterval(function() {
                    t.show_progress(e)
                },
                33)
    },
    show_progress: function(e) {
        var t = e.find("audio")[0],
            n = e.attr("data-id");
        e.find(".progress_bar").width(Math.floor(100 * (t.currentTime / t.duration)) + "%"),
            t.duration && t.currentTime == t.duration && (n && Pianke.ting.send_listencount(n), t.currentTime = 0, t.play())
    },
    get_flash_obj: function(e, t) {
        return '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + t + '" height="20" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"><param name="wmode" value="transparent"><param name="movie" value="' + e + '"><embed wmode="transparent" width="' + t + '" height="30" src="' + e + '" pluginspage="http://www.macromedia.com/go/getflashplayer"></object>'
    }
};

function backToTop() {
    var e = $("#goTopBtn"),
        t = $(window),
        n = $("html,body"),
        r = 260;
    setTimeout(function() {
            t.scroll(function() {
                    t.scrollTop() > r ? e.show() : e.hide()
                }),
                e.bind("click",
                    function() {
                        n.animate({
                                scrollTop: 0
                            },
                            500)
                    })
        },
        0)
}

function deletecntcomment(e, t, n, r) {
    confirm("鎮ㄧ‘瀹氳鍒犻櫎姝ゆ潯璇勮锛�",
        function() {
            if ("" == e || "undefined" == typeof e && "" == t || "undefined" == typeof t && "" == n || "undefined" == typeof n) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
            var i = {
                contentid: e,
                commentid: t,
                type: n
            };
            $.post("/api/comment/delcmt.php", i,
                function(e) {
                    return "A00001" == e.code ? (openlogintip(), !1) : "A00000" == e.code ? (item = $(r).parents("li"), item = item.length ? item : $(r).parents(".create_content"), item.slideUp(), !0) : (showerrortip(e.data.msg), !1)
                },
                "json")
        })
}

function submitfeedback() {
    if (!addfeedbackswitch) return !1;
    var e = $("#feedback").val();
    if ("" == e) return showerrortip("鎶辨瓑锛屽唴瀹逛笉鑳戒负绌猴紒"), !1;
    var t = {
        feedback: e
    };
    return addfeedbackswitch = !1,
        $.post("/api/feedback/addfeedback.php", t,
            function(e) {
                return addfeedbackswitch = !0,
                    "A00001" == e.code ? (openlogintip(), !1) : "A00000" == e.code ? ($("#feedback").val(""), $("#feedbackpub").hide(), $("#feedbacksucess").show(), !0) : (showerrortip(e.data.msg), !1)
            },
            "json"), !0
}

function delshare(e) {
    return confirm("鎮ㄧ‘瀹氳鍒犻櫎姝ゆ潯鍐呭锛�",
        function() {
            if ("" == e || "undefined" == typeof e) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
            var t = {
                id: e
            };
            $.post("/api/share/delshare.php", t,
                function(t) {
                    return "A00001" == t.code ? (openlogintip(), !1) : "A00000" == t.code ? ($("#posts_" + e).remove(), !0) : (showerrortip(t.data.msg), !1)
                },
                "json")
        }), !0
}

function submitshare() {
    if (!addshareswitch) return !1;
    var e = $("#id").val(),
        t = $("#type").val(),
        n = $("#content").val(),
        r = $("#pic").val();
    if ("" == e || "undefined" == typeof e) return alert("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
    if ("" == t || "undefined" == typeof t) return alert("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
    if ("" == n || "undefined" == typeof n) return alert("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
    "undefined" == typeof r && (r = "");
    var i = {
        id: e,
        type: t,
        pic: r,
        content: n
    };
    return addshareswitch = !1,
        $.post("/api/share/addshare.php", i,
            function(e) {
                return addshareswitch = !0,
                    "A00000" == e.code ? (window.close(), !0) : (alert(e.data.msg), !1)
            },
            "json"), !0
}

function insertemotion(e) {
    return $("#content").insertAtCaret(e),
        closeemotion(), !0
}

function commentinsertemotion(e, t) {
    return $(e).parents(".entry").find("textarea").insertAtCaret(t),
        $(e).parents(".bq").hide(), !0
}

function openlogintip(e) {
    $("#fixedlogin").show();
    var t = $(document.body).height(),
        n = $(window).height(),
        r = n > t ? n : t;
    return e && $("#fixedlogin .loginw").unbind("click.other").bind("click.other",
        function() {
            setTimeout(function() {
                e()
            })
        }), !0
}

function closelogintip(e) {
    return e && e.preventDefault && e.preventDefault(),
        $("#fixedlogin .ts").hide(),
        $("#fixedlogin .placehoder").show(),
        $("#layer_email").val(""),
        $("#layer_pass").val(""),
        $("#fixedlogin").hide(), !0
}

function openloginpage() {
    var e = $(window).height(),
        t = $(window).width(),
        n = 0,
        r = 0;
    return 400 <= e && (n = (e - 400) / 2),
        600 <= e && (r = (t - 600) / 2),
        closelogintip(),
        window.open("/user/login.php?js=yes", "", "width=600,height=400,top=" + n + ",left=" + r + ",scrollbars=yes,status =yes"), !0
}

function refreshlogininfo(e) {
    return "" == e || "undefined" == typeof e ? !1 : ($("#logininfobox").html('<a class="name" href="/profile/">' + e + '</a><a href="/user/logout.php">閫€鍑�</a>'), !0)
}

function changetag() {
    var e = $("#scoreuser").css("display");
    return "none" == e ? ($("#me").attr("class", "current"), $("#time").attr("class", "")) : ($("#time").attr("class", "current"), $("#me").attr("class", "")), !1
}

function changejob(e) {
    var t = new Array("job_php", "job_js", "job_weibo");
    for (var n = 0; n < t.length; n++) e == t[n] ? ($("#" + e).show(), $("#nav" + e).addClass("on")) : ($("#" + t[n]).hide(), $("#nav" + t[n]).removeClass("on"));
    return !1
}

function addattention(e) {
    if ("" == e || "undefined" == typeof e) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
    var t = {
        suid: e
    };
    return $.post("/api/attention/addattention.php", t,
        function(e) {
            return "A00001" == e.code ? (openlogintip(), !1) : "A00000" == e.code ? !0 : (showerrortip(e.data.msg), !1)
        },
        "json"), !0
}

function setCookie(e, t, n) {
    var r = new Date;
    n = n || 365,
        r.setTime(r.getTime() + n * 24 * 60 * 60 * 1e3),
        document.cookie = e + "=" + escape(t) + ";domain=.pianke.me;path=/;expires=" + r.toGMTString()
}

function getCookie(e) {
    cookies = document.cookie.split("; ");
    for (i = 0; i < cookies.length; i++) {
        kv = cookies[i].split("=");
        if ($.trim(kv[0]) == e) return $.trim(kv[1])
    }
}

function getlatestnews() {
    var e = $("#latestnewsid").val(),
        t = getCookie(e);
    return t == 1 ? $("#latestnews").hide() : $("#latestnews").show(), !1
}

function ShareClickCount(e) {
    var t = {
        type: e
    };
    $.post("/api/share/clickcount.php", t,
        function(e) {
            return "A00000" == e.code ? !0 : !1
        },
        "json")
}

function _shareJump(e, t, n) {
    ShareClickCount(t);
    var r, i, s, o;
    if (!n) {
        var u = /subject/.test(location.pathname),
            a = u ? $(e).parents(".icon").prev().find(".contents:first") : $(".card_inner"),
            o = u ? a.parents(".content").find("img")[0].src : "http://www.pianke.me" + a.attr("data-url"),
            f = "...鈥�  鈥斺€斿彂鐜颁腑鏂囩殑鏇村鍙兘锛屾垜鍦ˊ鐗囧埢 ",
            l = "...鈥�  --鐢ㄦ枃瀛楄杩板墽鎯咃紝鐢ㄥ浘鐗囦紶閫掗暅澶达紝鎴戝湪鐗囧埢鍓у満锛屽ソ鎴忔鍦ㄤ笂鏄犮€�",
            s = "鈥�" + subString($.trim(a.text()), 80) + (u ? l : f),
            c = u ? "?r=subjectshare" : "?r=postshare",
            h = "http://pianke.me";
        h += u ? "/subject/" + $(e).parents(".icon").attr("data-id") : location.pathname,
            h += c
    } else n == "card" ? (h = "http://pianke.me" + $(e).parents(".inclode").find("a").attr("href"), s = "鎴戝湪鐗囧埢鍙戠幇浜嗕竴寮犱笉閿欑殑璇嶅崱锛屼綘涔熸潵鐪嬬湅銆�", o = $(e).parents(".inclode").find("img").attr("src").replace("/s/", "/m/")) : n == "detail" ? (h = location.href, s = "鎴戝湪鐗囧埢鍙戠幇浜嗕竴寮犱笉閿欑殑璇嶅崱锛屼綘涔熸潵鐪嬬湅銆�", o = $(e).parents(".area").find("img").attr("src")) : n == "fav" && (h = "http://pianke.me" + $(e).parents(".inclode").find("a").attr("href"), s = "鎴戝湪鐗囧埢鍙戠幇浜嗕竴寮犱笉閿欑殑璇嶅崱锛屼綘涔熸潵鐪嬬湅銆�", o = $(e).parents(".inclode").find("img").attr("src").replace("/s/", "/m/"));
    redirect_to_sns(t, h, s, o)
}

function redirect_to_sns(e, t, n, r, i, s) {
    var o = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
        u = "http://service.weibo.com/share/share.php?",
        a = "http://widget.renren.com/dialog/share?",
        f = "http://v.t.qq.com/share/share.php?title=";
    if (e == "sina") {
        var l = {
            url: t,
            type: "3",
            count: "1",
            appkey: "2069323349",
            title: n,
            pic: r,
            ralateUid: "",
            language: "zh_cn",
            rnd: (new Date).valueOf()
        };
        i && (l.title = "銆�" + s + "銆�" + l.title);
        var c = [];
        for (var h in l) c.push(h + "=" + encodeURIComponent(l[h] || ""));
        var p = u + c.join("&");
        return window.open(p, "_blank"), !1
    }
    if (e == "renren") {
        var d = {
            resourceUrl: t,
            srcUrl: t,
            pic: r,
            title: "鍙戠幇涓枃鐨勬洿澶氬彲鑳斤紝鎴戝湪@鐗囧埢  http://www.pianke.me",
            description: n
        };
        d.title = i ? s : d.title;
        var v = [];
        for (var m in d) d[m] && v.push(m + "=" + encodeURIComponent(d[m]));
        var p = a + v.join("&");
        window.open(p, "_blank")
    } else if (e == "douban") "http://shuo.douban.com/!service/share?href=" + encodeURIComponent(t) + "&name=" + encodeURIComponent(s);
    else if (e == "tengxun") window.open(f + encodeURIComponent((i ? "銆�" + s + "銆�" : "") + n) + "&url=" + encodeURIComponent(t) + "&source=bookmark&pic=" + r, "_blank");
    else if (e == "qzone") {
        var h = {
            url: t,
            showcount: "1",
            desc: "",
            summary: n,
            title: "鍙戠幇涓枃鐨勬洿澶氬彲鑳斤紝鎴戝湪@pianker  ",
            site: "鐗囧埢缃�",
            pics: r,
            style: "101",
            width: 199,
            height: 30
        };
        h.title = i ? s : h.title;
        var v = [];
        for (var m in h) v.push(m + "=" + encodeURIComponent(h[m] || ""));
        var p = o + v.join("&");
        window.open(p, "_blank")
    }
}

function subString(e, t, n) {
    var r = 0,
        i = "",
        s = /[^\x00-\xff]/g,
        o = "",
        u = e.replace(s, "**").length;
    for (var a = 0; a < u; a++) {
        o = e.charAt(a).toString(),
            o.match(s) != null ? r += 2 : r++;
        if (r > t) break;
        i += o
    }
    return n && u > t && (i += "..."),
        i
}

function removeNotify(e) {
    confirm("鎮ㄧ‘瀹氳鍒犻櫎姝ゆ潯閫氱煡锛�",
        function() {
            var t = {
                id: e
            };
            $.post("/api/notify/del.php", t,
                function(t) {
                    t.code === "A00000" ? $("#item_" + e).remove() : showerrortip(t.data.msg)
                },
                "json")
        })
}

function openOauth(e) {
    var t = $(e).attr("source");
    setcookie("is_" + t, null);
    var n = window.open("", "newwindow", "height=450, width=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no"),
        r = "http://" + window.location.host;
    n.location = r + "/user/syncoauthurl.php?source=" + t,
        st = setInterval(function() {
                getSpecificCookie("is_" + t).toString() == "true" && (location.reload(), clearInterval(st))
            },
            100)
}

function delsync(e) {
    type = $(e).attr("data-type") || "",
        confirm("鎮ㄧ‘瀹氳鍙栨秷缁戝畾" + type + "锛�",
            function() {
                $.ajax({
                    type: "POST",
                    url: "/api/user/delsync.php",
                    data: {
                        source: $(e).attr("source")
                    },
                    success: function(e) {
                        e.code == "A00000" ? location.reload() : alert($res.msg)
                    },
                    dataType: "json"
                })
            })
}

function addfeedback() {
    var e = $("#fb_email").val(),
        t = $("#fb_title").val(),
        n = $("#fb_cnt").val();
    if ("" == n || "undefined" == typeof n) return showerrortip("浜诧紝杩樻病鍐欏唴瀹瑰摝~"), !1;
    var r = {
        fb_email: e,
        fb_title: t,
        feedback: n,
        imgurl: $.map($(".case .image img"),
            function(e) {
                return e.src
            }).join(",")
    };
    return $.post("/api/feedback/addfeedback.php", r,
        function(e) {
            return "A00001" == e.code ? (openlogintip(), !1) : "A00000" == e.code ? (showerrortip("闈炲父鎰熻阿鎮ㄧ殑鍙嶉鎰忚~"), $("#fb_cnt").val(""), $("#fb_title").val(""), $("#fb_email").val(""), location.reload(), !0) : (showerrortip(e.data.msg), !1)
        },
        "json"), !0
}

function cancelfeedback() {
    return $("#fb_cnt").val(""),
        $("#fb_title").val(""),
        $("#fb_email").val(""), !0
}

function addcard() {
    var e = $("#postsid").val(),
        t = $("#cardpid").val();
    if ("" == e || "undefined" == typeof e) return showerrortip("鎿嶄綔澶辫触锛岃閲嶈瘯~"), !1;
    if ("" == t || "undefined" == typeof t) return showerrortip("鎮ㄨ繕娌℃湁涓婁紶鍗＄墖鍛"), !1;
    var n = {
        contentid: e,
        pid: t
    };
    $.post("/api/card/addcard.php", n,
        function(e) {
            e.code === "A00000" ? window.location.href = "/card/" + e.data.data.contentid : showerrortip(e.data.msg)
        },
        "json")
}

function _loading(e) {
    e == 1 ? $("#_loading").show() : $("#_loading").hide()
}

function uploadImage(e) {
    if (PKINFO.islogin != 1) return openlogintip(), !1;
    var t = e.value;
    document.domain = "pianke.me",
        validateImage(e) && (_loading(!0), $.ajaxFileUpload({
            url: "http://img.pianke.me/uploadcard",
            secureuri: !1,
            fileElementId: "pic",
            dataType: "json",
            type: "post",
            success: function(e, t) {
                _loading(!1);
                if (e.code == "A00000") {
                    var n = e.data.url + e.data.pid;
                    $("#showpic").attr("src", n),
                        $("#cardpid").val(e.data.pid)
                } else e.code == "D10088" && alert("鍥剧墖灏哄涓嶅锛岃鏍稿疄")
            },
            error: function(e, t, n) {
                $("#pic").val("")
            }
        }))
}

function validateImage(e) {
    var t = e,
        n = t.value;
    return /^.*?\.(gif|png|jpg|jpeg)$/.test(n.toLowerCase()) ? !0 : (alert("鍥剧墖鏍煎紡鏈夎锛�"), !1)
}

function showtime() {
    var e = new Date,
        t = e.getFullYear(),
        n = e.getMonth();
    n += 1;
    var r = e.getDate(),
        i = e.getHours(),
        s = e.getMinutes(),
        o = e.getSeconds();
    return $("#time_date").html(t + "-" + zeroize(n) + "-" + zeroize(r)),
        $("#time_hour").html(zeroize(i)),
        $("#time_minute").html(zeroize(s)),
        $("#time_second").html(zeroize(o)), !0
}

function openusercomment(e) {
    return $(e).parent().next().show(), !1
}

function delusercomment(e) {
    confirm("鎮ㄧ‘瀹氳鍒犻櫎姝ゆ潯璇勮锛�",
        function() {
            var t = {
                commentid: e
            };
            $.post("/api/comment/delusercmt.php", t,
                function(t) {
                    t.code === "A00000" ? $("#item_" + e).remove() : showerrortip(t.data.msg)
                },
                "json")
        })
}

function submitusercomment(e) {
    box = $(e).parents(".entry"),
        contentid = box.attr("data-id");
    if ("" == contentid || "undefined" == typeof contentid) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
    var t = $("#id_" + contentid).val(),
        n = $("#type_" + contentid).val(),
        r = $("#content_" + contentid).val(),
        i = $("#reuid_" + contentid).val();
    if ("" == n || "undefined" == typeof n) return showerrortip("鎶辨瓑锛岀己灏戝繀瑕佸弬鏁帮紒"), !1;
    if ("" == r || "undefined" == typeof r) return showerrortip("鎶辨瓑锛屽唴瀹逛笉鑳戒负绌猴紒"), !1;
    var s = {
        contentid: t,
        type: n,
        content: r,
        recid: contentid,
        reuid: i
    };
    return $.post("/api/comment/add.php", s,
        function(e) {
            return "A00002" == e.code ? (openlogintip(), !1) : "A00000" == e.code ? (box.find("test").val(""), box.hide(), !0) : (showerrortip(e.data.msg), !1)
        },
        "json"), !0
}

function toolTipDialog(e, t, n) {
    var r = $('<div class="delete radius" id="succ_pop"><div class="box"><p class="p">' + e + "</p></div></div>");
    $("#succ_pop").length && $("#succ_pop").stop().remove();
    var i;
    t ? t.top && t.left ? i = t : i = t.position() : i = {
            top: $(window).scrollTop() + $(window).height() / 2,
            left: $(window).width() / 2 - 180
        },
        r.css({
            top: i.top - 10,
            left: i.left + 150
        }),
        r.appendTo("body").fadeOut(3e3),
        typeof n != "undefined" && setTimeout(n, 3e3)
}

function getSpecificCookie(e) {
    return document.cookie.length > 0 ? (start = document.cookie.indexOf(e + "="), start != -1 && (start = start + e.length + 1, end = document.cookie.indexOf(";", start), end == -1 && (end = document.cookie.length)), decodeURI(document.cookie.substring(start, end))) : ""
}

function setcookie(e, t) {
    var n = e + "=" + encodeURI(t);
    document.cookie = n
}

function Shuffle(e) {
    for (var t, n, r = e.length; r; t = parseInt(Math.random() * r), n = e[--r], e[r] = e[t], e[t] = n);
    return e
}
var addtalkswitch = !0,
    addpostsswitch = !0,
    addcommentswitch = !0,
    addfeedbackswitch = !0,
    addlikeswitch = !0,
    addshareswitch = !0,
    commonpagesize = 15;
showerrortip = function(e, t) {
        if ("" == e || "undefined" == typeof e) e = "鎶辨瓑锛岀郴缁熺箒蹇欙紒";
        return $("#errortiptext").html(e),
            $("#errortip").show().find(".e_close").unbind("click").bind("click",
                function() {
                    $("#errortip").hide(),
                        t && t()
                }), !0
    },
    $(function() {
        PKINFO.uinfo && msg_list_init(),
            $("#notice_box").find("span:first>a").click(function() {
                return $("#notice_box").remove(), !1
            }),
            $("#notice_box").find("span:first").click(function() {
                return $("#notice_box").find("#feedbackpub").get(0).style.display === "none" ? ($("#feedbackbox").attr("class", "layer_word"), $("#notice_box").find("#feedbackpub").show(), $("#notice_box").find("#feedbacksucess").hide()) : ($("#feedbackbox").attr("class", ""), $("#notice_box").find("#feedbackpub").hide()), !1
            }),
            $("#latestnews span.cl").live("click",
                function() {
                    var e = $("#latestnewsid").val();
                    return setCookie(e, 1, 30),
                        $("#latestnews").hide(), !1
                }),
            $("ul.cntcmtlist li").hover(function() {
                    $(this).find("a.out").show()
                },
                function() {
                    $(this).find("a.out").hide()
                }),
            $(".fav_btn").live("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    var e = $(this),
                        t = e.attr("f-contentid"),
                        n = {
                            contentid: t
                        },
                        r = e.hasClass("on"),
                        i = "/api/fav/" + (r ? "delfav" : "addfav"),
                        s = r ? "鏀惰棌" : "鍙栨秷鏀惰棌",
                        o = parseInt(e.find(".number").text(), 10),
                        o = (isNaN(o) ? 0 : o) + (r ? -1 : 1);
                    if (e.hasClass("gray")) return !1;
                    e.text("鏀惰棌涓�").addClass("gray"),
                        $.post(i, n,
                            function(t) {
                                return t.code != "A00000" ? (alert(t.data.msg), !1) : (e.toggleClass("on gray").text(s), o = o < "" ? 0 : o, o != 0 && e.append('<span class="number">' + o + "</span>"), !1)
                            },
                            "json")
                }),
            $(".sc,.sced").live("click",
                function() {
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    var e = $(this),
                        t = e.attr("f-contentid"),
                        n = e.hasClass("sced"),
                        r = {
                            contentid: t
                        },
                        i = "/api/fav/" + (n ? "delfav" : "addfav");
                    if (e.hasClass("gray")) return !1;
                    e.addClass("gray"),
                        $.post(i, r,
                            function(t) {
                                return t.code != "A00000" ? (alert(t.data.msg), !1) : (e.toggleClass("sc sced gray"), !1)
                            },
                            "json")
                }),
            $(".share .xl,.ico .xl,.icon6 .xl").live("click",
                function() {
                    _shareJump(this, "sina", $(this).attr("ref"))
                }),
            $(".kj").live("click",
                function() {
                    _shareJump(this, "qzone", $(this).attr("ref"))
                }),
            $(".rr").live("click",
                function() {
                    _shareJump(this, "renren", $(this).attr("ref"))
                }),
            $(".tx").live("click",
                function() {
                    _shareJump(this, "tengxun", $(this).attr("ref"))
                })
    });
var msg_list_init = function() {
        if (!PKINFO.uinfo || !PKINFO.uinfo.uid || /player/.test(location.href)) return;
        if (!PKINFO.msglist)
            if ($(".new_idea").length > 0) PKINFO.msglist = $(".new_idea:first");
            else {
                var e = $(".head:first");
                e = e.length ? e : $(".header:first"),
                    e = e.length ? e : $(".wrapper"),
                    window.noBase && (e = $("body")),
                    PKINFO.msglist = $('<div class="new_idea hide" id="newunread"><div class="box"></div></div> '),
                    PKINFO.msglist.appendTo(e)
            }
        PKINFO.msglist.hide(),
            window.noBase && PKINFO.msglist.addClass("noBase"),
            msg_list_round(),
            PKINFO.ePublicWord.id = setInterval("msg_list_round()", 15e3)
    },
    uid_url = "profile/" + PKINFO.uinfo.uid + "/fans";
PKINFO.ePublicWord = {
    comment: ["鏉℃柊璇勮", "commentbox/inbox", "鏌ョ湅璇勮"],
    attitude: ["涓柊鎺ㄨ崘", "likebox/inbox", "鏌ョ湅鎺ㄨ崘"],
    notice: ["鏉℃柊閫氱煡", "notify/inbox", "鏌ョ湅閫氱煡"],
    card: ["寮犳柊鍗＄墖", "cardbox/inbox", "鏌ョ湅Card"],
    friend: ["涓柊绮変笣", uid_url, "鏌ョ湅鏂扮矇涓�"],
    fav: ["涓柊鏀惰棌", "favbox/inbox", "鏌ョ湅鏂版敹钘�"],
    message: [" 灏佹柊鐗囬偖", "message/inbox", "鏌ョ湅鐗囬偖"],
    a: "abc",
    close: !1,
    id: 0
};
var closeunread = function() {
        return $("#newunread").remove(),
            PKINFO.ePublicWord.close = !0,
            clearInterval(PKINFO.ePublicWord.id), !1
    },
    msg_list_show = function(e) {
        if (!e || !e.comment && !e.attitude && !e.notice && !e.card && !e.friend && !e.fav && !e.message) return $(".new_idea").hide(), !1;
        var t = [];
        for (var n in e) e[n] && t.push("<p>" + e[n] + PKINFO.ePublicWord[n][0] + '锛�<a href="/' + PKINFO.ePublicWord[n][1] + '" title="">' + PKINFO.ePublicWord[n][2] + "</a></p>");
        $(".new_idea").find("div.box").html(t.join("") + '<a href="javascript:void(0);" onclick="javascript:closeunread();" class="cl"></a>').end().show()
    },
    msg_list_round = function() {
        $.get("/api/common/unreadmsg.php?r=" + Math.floor(Math.random() * 999999999999),
            function(e) {
                if (e.code === "A00000")
                    if (!PKINFO.public_msg) PKINFO.public_msg = e.data.list,
                        msg_list_show(e.data.list);
                    else {
                        var t = e.data.list;
                        msg_list_show(e.data.list)
                    }
            },
            "json")
    };
$(function() {
    $("#fb_email").focus(function() {
            $(this).val() === "QQ/Email" && $(this).val("").removeClass("gray1")
        }).blur(function() {
            $(this).val() === "" && $(this).val("QQ/Email").addClass("gray1")
        }).addClass("gray1").val("QQ/Email"),
        $("#fb_title").focus(function() {
            $(this).val() === "(6-20瀛�)" && $(this).val("").removeClass("gray1")
        }).blur(function() {
            $(this).val() === "" && $(this).val("(6-20瀛�)").addClass("gray1")
        }).addClass("gray1").val("(6-20瀛�)")
});
var zeroize = function(e, t) {
        t || (t = 2),
            e = String(e);
        for (var n = 0,
                r = ""; n < t - e.length; n++) r += "0";
        return r + e
    },
    st = setInterval("showtime();", 1e3),
    JSON = JSON || {};
JSON.stringify = JSON.stringify ||
    function(e) {
        var t = typeof e;
        if (t != "object" || e === null) return t == "string" && (e = '"' + e + '"'),
            String(e);
        var n, r, i = [],
            s = e && e.constructor == Array;
        for (n in e) r = e[n],
            t = typeof r,
            t == "string" ? r = '"' + r + '"' : t == "object" && r !== null && (r = JSON.stringify(r)),
            i.push((s ? "" : '"' + n + '":') + String(r));
        return (s ? "[" : "{") + String(i) + (s ? "]" : "}")
    };
Pianke.the100th = {
    MC: $(".main_container .inner"),
    is_post: !1,
    page_size: 28,
    page: 1,
    base_size: {
        width: 355,
        height: 220
    },
    item_length: 7,
    base_scale: {
        a: 1,
        b: .666,
        c: .833
    },
    getArr: function(e) {
        var t = this.base_scale.a,
            n = this.base_scale.b,
            r = this.base_scale.c;
        return {
            pos_arr: [
                [
                    [0, 0],
                    [0, t],
                    [t, 0],
                    [n, t],
                    [2 * n, t],
                    [2 * t, 0],
                    [3 * n, r]
                ],
                [
                    [0, 0],
                    [0, r],
                    [r, 0],
                    [r, t],
                    [r + t, 0],
                    [n + r, t],
                    [r + 2 * n, t]
                ]
            ],
            obj_arr: [
                ["a", "b", "a", "b", "b", "c", "c"],
                ["c", "c", "a", "b", "a", "b", "b"]
            ]
        }
    },
    init: function() {
        this.listInit(),
            this.bind_Event()
    },
    bind_Event: function() {
        var e = this;
        $(".the_item").live("click",
                function() {
                    var t = $(".the_item"),
                        n = $(this),
                        r = t.length - 1,
                        i = parseInt(e.get_index(n), 10),
                        i = i < 0 ? r + i : i,
                        s = i == 0 ? r : i - 1,
                        o = i == r ? 0 : i + 1,
                        u = e.find_for_index(i, "cur"),
                        a = e.find_for_index(s, "prev"),
                        f = e.find_for_index(o, "next"),
                        u = e.bigger_img(u);
                    $(".light_box").attr("data-c_id", i),
                        $(".light_box").fadeIn().find(".list").append(u, a, f)
                }),
            $(".big_close,.list .cur").live("click",
                function() {
                    e.light_close()
                }),
            $(".u_but a").bind("click",
                function() {
                    var e = {
                        address: $(".box_r_idea textarea").val(),
                        contact: $(".box_r_idea input:first").val(),
                        posts: $(".box_r_idea input:last").val()
                    };
                    if (PKINFO.islogin != 1) return openlogintip(), !1;
                    $.post("/api/event/hundred_posts", e,
                        function(e) {
                            return e.code != "A00000" ? (msg_modal(e.data.msg), !1) : (msg_modal(e.data.msg), setTimeout(function() {
                                    window.location.reload()
                                },
                                2e3), !1)
                        },
                        "json")
                }),
            document.oncontextmenu = function(e) {
                return !1
            },
            $("body,html").mousedown(function(e) {
                if (e.which == 3) return e.preventDefault(), !1
            }),
            $(window).keyup(function(t) {
                var n = t.keyCode;
                $(".light_box").is(":visible") && (n == 37 ? e.light_box_slide(!1) : n == 39 && e.light_box_slide(!0))
            }),
            $(".next,.prev").live("click",
                function() {
                    var t = $(this),
                        n = $(this).hasClass("next");
                    e.light_box_slide(n)
                })
    },
    get_index: function(e) {
        return index = $(e).index(),
            index += e.parents(".item_100th").index() * 7,
            index
    },
    find_for_index: function(e, t) {
        return el = $(".item_100th").eq(parseInt(e / 7, 10)).find(".the_item").eq(e % 7),
            el.find("img").clone().addClass(t)
    },
    light_box_slide: function(e) {
        var t = parseInt($(".light_box").attr("data-c_id"), 10) + (e ? 1 : -1),
            n = $(".item_100th img").map(function() {
                return this.src
            }),
            r = n.length - 1,
            t = t > r ? 0 : t < 0 ? r : t,
            i = t == 0 ? r : t - 1,
            s = t == r ? 0 : t + 1;
        $(".light_box").find(".cur").attr("src", n[t].replace("bmiddle", "large")).end().find(".next").attr("src", n[s]).end().find(".prev").attr("src", n[i]),
            $(".light_box").attr("data-c_id", t)
    },
    light_close: function() {
        $(".light_box").fadeOut(function() {
            $(this).find("img").remove()
        })
    },
    bigger_img: function(e) {
        return src = e.attr("src").replace("bmiddle", "large"),
            e.attr("src", src)
    },
    listInit: function() {
        this.MC.length && (this.fetch_data(), this.bind_scroll())
    },
    bind_scroll: function() {
        var e = this;
        $("html,body").bind("mousewheel",
            function(t) {
                t.preventDefault();
                var n = e.MC,
                    r = parseInt(n.css("left"), 10),
                    i = r - (-t.wheelDelta > 0 ? 50 : -50),
                    s = $(".item_100th").length * 600;
                s - 400 >= i && (e.is_post || ++e.page, e.fetch_data());
                if (i >= 0 || i <= -(s - $(window).width())) return !1;
                n.css({
                    left: i
                })
            })
    },
    fetch_data: function() {
        var e = this;
        if (e.page > 10 || e.is_post) return !1;
        e.is_post = !0,
            $.getJSON("/api/event/hundred_getpic", {
                    page: e.page,
                    size: e.page_size
                },
                function(t) {
                    var n = t.data.data.list;
                    e.render_page(n),
                        e.is_post = !1
                })
    },
    render_page: function(e) {
        var t = this.item_length,
            n = this.base_size.width,
            r = this.base_size.height,
            i = this.base_scale,
            s = i.c * 2 * n,
            o = this.MC,
            u = {},
            a = this;
        $.each(e,
            function(f) {
                if (f % t == 0) {
                    u = $("<div class='item_100th'></div>"),
                        o.append(u);
                    var l = u.index();
                    u.css({
                        left: s * l
                    })
                }
                base = f < t ? 0 : 1,
                    i_index = f % 7,
                    pos_obj = a.getArr(base),
                    pos_arr = pos_obj.pos_arr[base],
                    obj_arr = pos_obj.obj_arr[base],
                    u.append($('<div class="the_item"><img src="' + e[f] + '"></div>').css({
                        top: pos_arr[i_index][0] * r,
                        left: pos_arr[i_index][1] * n,
                        width: i[obj_arr[i_index]] * n,
                        height: i[obj_arr[i_index]] * r
                    }))
            })
    }
};
