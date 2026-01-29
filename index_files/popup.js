var pifyJQ = null;
if (typeof jQuery === 'undefined') {
	var script = document.createElement('script');
	script.src = 'https://form-builder-cdn.pifyapp.com/assets/plugins/jquery/jquery.min.js';
	script.onload = function() {
		console.log('pify jQuery loaded');
		pifyJQ = jQuery.noConflict();
		PifyInnitPopup()
	};
	document.head.appendChild(script)
} else {
	console.log('jQuery exists');
	pifyJQ = jQuery;
	PifyInnitPopup()
}
function PifyInnitPopup() {
	var formIframe = '<style>.pify-form-wrap.formloading iframe{visibility: hidden !important;} .pify-form-wrap.formloading{background-image: url(https://form-builder.pifyapp.com/assets/images/loading.gif?v=4.6);background-position: center 30px;background-size: 30px 30px;background-repeat: no-repeat;}</style><div class="pifyform pify-form-wrap" style="margin:10px 0;"><script charset="UTF-8" defer>document.querySelector(".pify-form-wrap").classList.add("formloading");(function(h){function n(a){return null===a?null:a.scrollHeight>a.clientHeight?a:n(a.parentNode)}function updatePopupHeight(height){try{if(d&&height>0){d.style.height=height+"px";setTimeout(function(){if(d.style.height!=height+"px"){d.style.height=height+"px";}},200);}}catch(e){console.warn("Popup height update failed:",e);}}function t(b){if(b.data && typeof(b.data)=="string"){var f =null;try{f=JSON.parse(b.data);}catch(e){}if(f!=null&&f.popupHeight!=undefined&&!p&&!q){updatePopupHeight(f.popupHeight);}if(f!=null&&f.redirect!=undefined&&f.redirect!=""){window.location.href=f.redirect;}if(f!=null&&f.retsetHeight!=undefined&&f.retsetHeight){updatePopupHeight(520);}if(document.getElementsByClassName("lazyframe").length>0){var lazyframe=document.getElementsByClassName("lazyframe")[0];lazyframe.style.height="100%";lazyframe.removeAttribute("data-ratio");lazyframe.parentNode.style.overflow="hidden"} document.querySelector(".pify-form-wrap").classList.remove("formloading");if(f!=null&&f.getter){b={};var f=[].concat(f.getter),k,h=f.length,m,c,g,e;for(k=0;k<h;k++){m=k;c=f[k]||{};c.n&&(m=c.n);g=null;try{switch(c.t){case "window":e=window;break;case "scrollParent":e=n(a)||window;break;default:e=a}if(c.e)if("rect"===c.v){g={};var l=e.getBoundingClientRect();g={top:l.top,left:l.left,width:l.width,height:l.height}}else g=e[c.v].apply(e,[].concat(c.e))||!0;else c.s?(e[c.v]=c.s,g=!0):g=e[c.v]||!1}catch(u){}b[m]=g}b.innerState=!p&&!q;a.contentWindow.postMessage(JSON.stringify({queryRes:b}),"*")}}}for(var r=h.document,b=r.documentElement;b.childNodes.length&&1==b.lastChild.nodeType;)b=b.lastChild;var d=b.parentNode,a=r.createElement("iframe");var p=d.style.height&&"auto"!==d.style.height,q="absolute"===d.style.position||window.getComputedStyle&&"absolute"===window.getComputedStyle(d,null).getPropertyValue("position")||d.currentStyle&&"absolute"===d.currentStyle.position;h.addEventListener&&h.addEventListener("message",t,!1);a.src="about:blank";a.id="pify-form-iframe";a.onload=function(){document.querySelector(".pify-form-wrap").classList.remove("formloading");a.contentWindow.postMessage(JSON.stringify({parentUrl: window.location.href}), "*");};a.frameBorder=0;a.scrolling="no";a.style.display="block";a.style.minWidth="100%";a.style.width="100px";a.style.height="100%";a.style.border="none";a.style.overflow="auto";a.style.display="none";d.insertBefore(a,b)})(window);</script></div>';
	var pifyFormPopupHtml = '<div id="pify-form-popup" class="popup_form myscroll" style="height:0;display: block;" ><div class="popup-form-body "><div class="close_popup" href="javascript:void(0)"><img src="{WebHost}/assets/plugins/popup-form/icon/icon-clo.png?v=4.0" alt=""></div><div>' + formIframe + '</div></div></div>';
	pifyJQ(document).ready(function() {
		var webHost = "";
		var cookiePifyRequestHost = pifyGetCookie("PifyApp-RequestHost");
		if (cookiePifyRequestHost != undefined && cookiePifyRequestHost != null && cookiePifyRequestHost != "") {
			webHost = decodeURI(cookiePifyRequestHost)
		} else {
			pifyJQ.ajax({
				url: "https://form-builder-cdn.pifyapp.com/api/form/requestdomain/get?shop=" + pify_shop,
				dataType: 'json',
				type: 'GET',
				cache: true,
				async: false,
				success: function(res) {
					if (res.code == 1) {
						webHost = res.result;
						pifySetCookie("PifyApp-RequestHost", encodeURI(webHost), 15 * 24 * 60 * 60)
					}
				}
			})
		}
		pifyJQ("body").on("click", ".pify-form-bar-btn",
		function(e) {
			var formId = pifyJQ(this).attr("form-id");
			var position = pifyJQ(this).attr("button-position");
			var popupSize = pifyJQ(this).attr("popup-size");
			var openType = pifyJQ(this).attr("open-type");
			var pifyIframe = pifyJQ("#pify-form-iframe");
			if (pifyJQ("#pify-form-popup iframe").length == 0) {
				if (pifyIframe != null && pifyIframe != undefined && pifyIframe.length > 0) {
					pifyIframe.appendTo("#pify-form-popup .pify-form-wrap")
				} else {
					pifyJQ("#pify-form-popup .pify-form-wrap").append("<iframe src=\"about:blank\" id=\"pify-form-iframe\" frameborder=\"0\" scrolling=\"no\" style=\"display: block; min-width: 100%; width: 100px; height: 100%; border: none; overflow: auto;\"></iframe>")
				}
			}
			pifyJQ("#pify-form-popup").fadeIn();
			pifyJQ("#pify-form-popup").css("height", "100%");
			if (pifyJQ(".popup_form iframe").attr("src") != webHost + "/form/s/" + formId + "?popup=true") {
				pifyJQ(".pify-form-wrap").addClass("formloading");
				pifyJQ(".popup_form iframe").attr("src", webHost + "/form/s/" + formId + "?popup=true")
			}
			if (openType == "bubble") {
				pifyJQ(".popup-form-body").attr("class", "popup-form-body " + position)
			} else {
				pifyJQ(".popup-form-body").attr("class", "popup-form-body ")
			}
			var popupWidth = "650px";
			switch (popupSize) {
			case "small":
				popupWidth = "525px";
				break;
			case "medium":
				popupWidth = "675px";
				break;
			case "large":
				popupWidth = "825px";
				break
			}
			pifyJQ(".popup-form-body").css("width", popupWidth);
			pifyJQ(".popup-form-body").css("max-width", "90%");
			var iframe = document.getElementById("pify-form-iframe");
			if (iframe.attachEvent) {
				iframe.attachEvent("onload",
				function() {
					iframe.document.body.style.setProperty("background-color", "transparent", "important");
					iframe.document.body.style.setProperty("background-image", "none", "important");
					iframe.document.getElementsByClassName('.form-qrcode')[0].style.setProperty("display", "none", "important");
					if (iframe.document.querySelector(".form-qrcode") != null) iframe.document.querySelector(".form-qrcode").style.setProperty("display", "none", "important");
					iframe.contentWindow.postMessage(JSON.stringify({
						parentUrl: window.location.href
					}), "*")
				})
			} else {
				iframe.onload = function() {
					if (iframe.contentDocument != null) iframe.contentDocument.body.style.setProperty("background-color", "transparent", "important");
					if (iframe.contentDocument != null) iframe.contentDocument.body.style.setProperty("background-image", "none", "important");
					if (iframe.contentDocument != null && iframe.contentDocument.querySelector(".form-qrcode") != null) iframe.contentDocument.querySelector(".form-qrcode").style.setProperty("display", "none", "important");
					iframe.contentWindow.postMessage(JSON.stringify({
						parentUrl: window.location.href
					}), "*")
				}
			}
			pifyIframe.show();
			pifyJQ("body").css("overflow-y", "hidden");
			e.preventDefault()
		});
		pifyJQ("body").on("click", ".close_popup",
		function() {
			pifyJQ("body").css("overflow-y", "initial");
			pifyJQ("#pify-form-popup").css("height", "0")
		});
		if (pify_shop == undefined || pify_shop == "") return;
		pifyJQ.ajax({
			url: webHost + "/api/form/popup/list?shop=" + pify_shop,
			dataType: 'json',
			type: 'GET',
			cache: false,
			success: function(res) {
				if (res.code == 1) {
					var forms = res.result;
					var buttonHtmlLeftTop = '';
					var buttonHtmlLeftBottom = '';
					var buttonHtmlBottomLeft = '';
					var buttonHtmlBottomRight = '';
					var buttonHtmlRightTop = '';
					var buttonHtmlRightBottom = '';
					var buttonHtmlBottomLeftFloating = '';
					var buttonHtmlBottomRightFloating = '';
					var autoOpenForms = [];
					var currentPageUrl = window.location.pathname;
					var fullPageUrl = window.location.href;
					for (var i = 0; i < forms.length; i++) {
						var apprearance = JSON.parse(forms[i].popupAppearance);
						var publish = JSON.parse(forms[i].popupPublish);
						var showForm = true;
						if (typeof isPreviewMode == "undefined") {
							if (publish != null && publish != undefined) {
								switch (publish.pageType) {
								case "none":
									showForm = false;
									break;
								case "homepage":
									if (currentPageUrl != "/") {
										showForm = false
									}
									break;
								case "exactly_url":
									showForm = false;
									var exactlyPageUrls = publish.pageUrl.split(';');
									for (var e = 0; e < exactlyPageUrls.length; e++) {
										if (fullPageUrl == exactlyPageUrls[e]) {
											showForm = true
										}
									}
									break;
								case "include_url":
									if (fullPageUrl.indexOf(publish.pageUrl) < 0) {
										showForm = false
									}
									break;
								case "exclude_url":
									if (fullPageUrl.indexOf(publish.pageUrl) >= 0) {
										showForm = false
									}
									break
								}
							} else {
								showForm = false
							}
						}
						if (typeof isPreviewMode != "undefined") {
							showForm = true
						}
						if (showForm) {
							if (forms[i].plan != "FREE" && apprearance.autoOpen) {
								autoOpenForms.push(forms[i].formId)
							}
							switch (apprearance.buttonPosition) {
							case "left-top":
								buttonHtmlLeftTop = buttonHtmlLeftTop + getButtonHtml(forms[i].formId, apprearance);
								break;
							case "left-bottom":
								buttonHtmlLeftBottom = buttonHtmlLeftBottom + getButtonHtml(forms[i].formId, apprearance);
								break;
							case "bottom-left":
								if (apprearance.displayType.indexOf("floating") >= 0) {
									buttonHtmlBottomLeftFloating = buttonHtmlBottomLeftFloating + getButtonHtml(forms[i].formId, apprearance)
								} else {
									buttonHtmlBottomLeft = buttonHtmlBottomLeft + getButtonHtml(forms[i].formId, apprearance)
								}
								break;
							case "bottom-right":
								if (apprearance.displayType.indexOf("floating") >= 0) {
									buttonHtmlBottomRightFloating = buttonHtmlBottomRightFloating + getButtonHtml(forms[i].formId, apprearance)
								} else {
									buttonHtmlBottomRight = buttonHtmlBottomRight + getButtonHtml(forms[i].formId, apprearance)
								}
								break;
							case "right-top":
								buttonHtmlRightTop = buttonHtmlRightTop + getButtonHtml(forms[i].formId, apprearance);
								break;
							case "right-bottom":
								buttonHtmlRightBottom = buttonHtmlRightBottom + getButtonHtml(forms[i].formId, apprearance);
								break
							}
						}
						generatePopupButtonV1(forms[i].formId, apprearance);
						generatePopupButtonV2(forms[i].formId, apprearance);
					}
					if (buttonHtmlLeftTop != "") {
						pifyJQ("body").append('<div class="pify-form-btn left-top " style="display:none;">' + buttonHtmlLeftTop + '</div>')
					}
					if (buttonHtmlLeftBottom != "") {
						pifyJQ("body").append('<div class="pify-form-btn left-bottom " style="display:none;">' + buttonHtmlLeftBottom + '</div>')
					}
					if (buttonHtmlBottomLeft != "") {
						pifyJQ("body").append('<div class="pify-form-btn bottom-left " style="display:none;">' + buttonHtmlBottomLeft + '</div>')
					}
					if (buttonHtmlBottomRight != "") {
						pifyJQ("body").append('<div class="pify-form-btn bottom-right " style="display:none;">' + buttonHtmlBottomRight + '</div>')
					}
					if (buttonHtmlRightTop != "") {
						pifyJQ("body").append('<div class="pify-form-btn right-top " style="display:none;">' + buttonHtmlRightTop + '</div>')
					}
					if (buttonHtmlRightBottom != "") {
						pifyJQ("body").append('<div class="pify-form-btn right-bottom " style="display:none;">' + buttonHtmlRightBottom + '</div>')
					}
					if (buttonHtmlBottomLeftFloating != "") {
						pifyJQ("body").append('<div class="pify-form-btn bottom-left floating-btn" style="display:none;">' + buttonHtmlBottomLeftFloating + '</div>')
					}
					if (buttonHtmlBottomRightFloating != "") {
						pifyJQ("body").append('<div class="pify-form-btn bottom-right floating-btn" style="display:none;">' + buttonHtmlBottomRightFloating + '</div>')
					}
					if (pifyJQ(".pify-form-bar-btn").length > 0) {
						var style = document.createElement('link');
						style.rel = "stylesheet";
						style.href = webHost + "/assets/plugins/popup-form/css/popup.css?v=6.1";
						document.head.appendChild(style);
						pifyJQ(".pify-form-btn").show();
						pifyJQ("body").append(pifyFormPopupHtml.replace("{WebHost}", webHost));
						if (typeof onPifyPopupLoaded === "function") {
							onPifyPopupLoaded()
						}
					}
					if (autoOpenForms.length > 0) {
						var formSubmited = pifyGetCookie('form-submited-' + autoOpenForms[0]);
						var popupDelay = apprearance.autoPopupSettings != undefined ? apprearance.autoPopupSettings.popupDelay * 1000 : 1000;
						if (formSubmited != 'true') {
							setTimeout(function() {
								var formPopuped = pifyGetCookie("pify-form-popuped-" + autoOpenForms[0]);
								if (formPopuped == undefined || formPopuped == null || apprearance.autoPopupSettings.nextShowinDay == 0) {
									pifyJQ("#pify-form-bar-btn-" + autoOpenForms[0]).click();
									if (apprearance.autoPopupSettings != undefined) {
										var nextShowTime = apprearance.autoPopupSettings.nextShowinDay * 24 * 60 * 60;
										pifySetCookie("pify-form-popuped-" + autoOpenForms[0], true, nextShowTime)
									}
								}
							},
							popupDelay)
						}
					}
				}
			}
		});
		window.addEventListener("message", receiveMessage, false)
	})
}
function getButtonHtml(formId, apprearance) {
	if (apprearance.displayType != "custom-position") {
		var buttonRadiusCss = "border-radius:" + apprearance.buttonRadius + "px " + apprearance.buttonRadius + "px 0 0";
		var iconSize = Number(apprearance.buttonTextSize);
		if (iconSize > 0) {
			iconSize = iconSize + 0
		} else {
			iconSize = 20
		}
		if (apprearance.displayType.indexOf("floating") >= 0) {
			buttonRadiusCss = "border-radius:" + apprearance.buttonRadius + "px"
		}
		return '<a href="javascript:void(0)" id="pify-form-bar-btn-' + formId + '" class="pify-form-bar-btn" form-id="' + formId + '" button-position="' + apprearance.buttonPosition + '" popup-size="' + apprearance.popupSize + '" open-type="' + apprearance.openType + '" style="' + ((IsMobile() && !apprearance.showOnMobile) || (apprearance.autoOpen == true && apprearance.autoPopupSettings != undefined && apprearance.autoPopupSettings.showTriggerButton == false) ? "display:none;": "") + '">	<samp style="' + (apprearance.buttonBackgroundColor != null && apprearance.buttonBackgroundColor != "" ? "background-color:" + apprearance.buttonBackgroundColor + ";": "") + 'font-size:' + apprearance.buttonTextSize + 'px;' + (apprearance.buttonTextColor != null && apprearance.buttonTextColor != "" ? "color:" + apprearance.buttonTextColor + ";": "") + (apprearance.buttonRadius > 0 && apprearance.buttonRadius != undefined ? buttonRadiusCss: '') + '" class="' + (apprearance.buttonLabel != null && apprearance.buttonLabel != "" && apprearance.buttonLabel != undefined ? "with-text": "") + '">' + (apprearance.displayType == "icon" || apprearance.displayType == "tab-icon" || apprearance.displayType == "floating-icon" || apprearance.displayType == "floating-texticon" ? '		<i class="fas iconfont ' + apprearance.buttonIcon + ' ' + (apprearance.displayType == "icon" || apprearance.displayType == "floating-icon" ? "onlyicon": "") + '" style="font-size:' + iconSize + 'px;' + (apprearance.buttonTextColor != null && apprearance.buttonTextColor != "" ? "color:" + apprearance.buttonTextColor + ";": "") + '"></i>': '') + (apprearance.displayType == "tab" || apprearance.displayType == "tab-icon" || apprearance.displayType == "floating-text" || apprearance.displayType == "floating-texticon" ? '<i>' + apprearance.buttonLabel + '</i>': '') + '	</samp></a>'
	} else {
		return ""
	}
}
function generatePopupButtonV1(formId, apprearance) {
	var selector = "pifybutton[id='" + formId + "'], pifybutton[form-id='" + formId + "'], pifybutton[data-form-id='" + formId + "']";
	pifyJQ(selector).each(function() {
		var $this = pifyJQ(this);
		var btHtml = '<a href="javascript:void(0)" id="pify-form-bar-btn-' + formId + '" class="pify-form-bar-btn" form-id="' + formId + '" button-position="' + apprearance.buttonPosition + '" popup-size="' + apprearance.popupSize + '" open-type="' + apprearance.openType + '" style="' + (IsMobile() && !apprearance.showOnMobile ? "display:none;": "") + '">	<samp style="' + (apprearance.buttonBackgroundColor != null && apprearance.buttonBackgroundColor != "" ? "background-color:" + apprearance.buttonBackgroundColor + ";": "") + 'font-size:' + apprearance.buttonTextSize + 'px;' + (apprearance.buttonTextColor != null && apprearance.buttonTextColor != "" ? "color:" + apprearance.buttonTextColor + ";": "") + (apprearance.buttonRadius > 0 && apprearance.buttonRadius != undefined ? ("border-radius:" + apprearance.buttonRadius + "px") : '') + '" class="' + (apprearance.buttonLabel != null && apprearance.buttonLabel != "" && apprearance.buttonLabel != undefined ? "with-text": "") + '"><i>' + apprearance.buttonLabel + '</i>	</samp></a>';
		$this.html(btHtml);
		$this.addClass("loaded");
	});
}
function generatePopupButtonV2(formId, apprearance) {
	var selector = "pifypopup[id='" + formId + "'], pifypopup[form-id='" + formId + "'], pifypopup[data-form-id='" + formId + "']";
	pifyJQ(selector).each(function() {
		var $this = pifyJQ(this);
		var btHtml = '<button type="button" id="pify-form-bar-btn-' + formId + '"  class="pify-form-bar-btn ' + (apprearance.buttonLabel != null && apprearance.buttonLabel != "" && apprearance.buttonLabel != undefined ? "with-text": "") + '" form-id="' + formId + '" button-position="' + apprearance.buttonPosition + '" popup-size="' + apprearance.popupSize + '" open-type="' + apprearance.openType + '" style="' + (IsMobile() && !apprearance.showOnMobile ? "display:none;": "") + (apprearance.buttonBackgroundColor != null && apprearance.buttonBackgroundColor != "" ? "background-color:" + apprearance.buttonBackgroundColor + ";": "") + (apprearance.buttonTextSize != null && apprearance.buttonTextSize != "" ? "font-size:" + apprearance.buttonTextSize + "px;": "") + (apprearance.buttonRadius > 0 && apprearance.buttonRadius != undefined ? ("border-radius:" + apprearance.buttonRadius + "px") : '') + '"><span style="' + (apprearance.buttonTextColor != null && apprearance.buttonTextColor != "" ? "color:" + apprearance.buttonTextColor + ";": "") + '">' + apprearance.buttonLabel + '</span></button>';
		$this.html(btHtml);
	});
}
function IsMobile() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone"];
	var flag = false;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = true;
			break
		}
	}
	return flag
}
function pifySetCookie(cname, cvalue, seconds) {
	var expiredDate = new Date();
	expiredDate.setTime(expiredDate.getTime() + seconds * 1000);
	var expires = "expires=" + expiredDate.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";"
}
function pifyGetCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) return decodeURIComponent(arr[2]);
	else return null
}
function receiveMessage(event) {
	if (event.data != "" && typeof(event.data) == "string") {
		var datas = null;
		try {
			datas = JSON.parse(event.data)
		} catch(e) {}
		if (datas != null && datas.SubmittedFormId) {
			pifySetCookie("form-submited-" + datas.SubmittedFormId, true, 365 * 24 * 60 * 60)
		}
	}
}