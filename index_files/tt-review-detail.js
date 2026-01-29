// 评论详情弹窗所需要的各个值
const TTRevDetail = {
	reviewsData: {},
	resources: [],
	showType: null,
	pageNo: null,
	pageCount: null,
	pageSize: 15,
	revDetail: null,
	preBtn: null,
	nextBtn: null,
	reviewLists: [],
	isLoading: false,
	lastPageSize: 0,
	isInserted: false,
	detailCloseEvent: new CustomEvent("onTrustooDetailClose", {
		detail: {},
		bubbles: true,
		cancelable: true
	}),
	resourceSwitchingCycle: false,
	reviewId: "",
	isCFSdkLoaded: false,

	// Mark 嵌入评论详情弹窗
	insertTTReviewDetail(v) {
		if (TTRevDetail.revDetail) {
			return;
		} else {
			TTRevDetail.isInserted = true;
		}
		let { reviewsData } = TTRevDetail;
		TTRevDetail.resourceSwitchingCycle = v.shop_id === 26046955594 || v.shop_id === 17400017;
		let relatePro = "";
		var ttSty = document.createElement("link");
		ttSty.rel = "stylesheet";
		let link = "";
		if (v.env === "local") {
			link = "../css/module/tt-review-detail.min.css";
		} else {
			link =
				"https://" +
				v.staticBaseUrl +
				"/static/css/module/tt-review-detail.min.css?" +
				v.constructTime;
		}
		ttSty.href = link;
		document.head.appendChild(ttSty);

		relatePro = `
      <div class="product-info">
        <div class="product-image"></div>
        <div>
          <div class="tt-product-name"></div>
          <div class="product-shop">
          </div>
        </div>
      </div>`;

		const direction = getComputedStyle(document.querySelector("body")).direction;
		const revDetailHtml = ` <div id="trustoo-review-detail" data-closed="1" style="--photo-radius:${
			v.userSetting.photo_radius || 0
		}px" class="trustoo-widget trustoo-${direction}">
    <div class="close-wrapper"><svg xmlns="http://www.w3.org/2000/svg" style="width: 18px;height: 18px;" width="18" height="18" viewBox="0 0 18 18" fill="none">
		<path d="M10.2732 9.00016L15.9369 3.33646C16.1057 3.1677 16.2005 2.93882 16.2005 2.70016C16.2005 2.4615 16.1057 2.23261 15.9369 2.06386C15.7682 1.8951 15.5393 1.80029 15.3006 1.80029C15.062 1.80029 14.8331 1.8951 14.6643 2.06386L9.00065 7.72756L3.33695 2.06386C3.25339 1.9803 3.15418 1.91401 3.04501 1.86879C2.93583 1.82357 2.81882 1.80029 2.70065 1.80029C2.58247 1.80029 2.46546 1.82357 2.35628 1.86879C2.24711 1.91401 2.14791 1.9803 2.06435 2.06386C1.89559 2.23261 1.80078 2.4615 1.80078 2.70016C1.80078 2.93882 1.89559 3.1677 2.06435 3.33646L7.72805 9.00016L2.06435 14.6639C1.89559 14.8326 1.80078 15.0615 1.80078 15.3002C1.80078 15.5388 1.89559 15.7677 2.06435 15.9365C2.2331 16.1052 2.46199 16.2 2.70065 16.2C2.9393 16.2 3.16819 16.1052 3.33695 15.9365L9.00065 10.2728L14.6643 15.9365C14.7477 16.0203 14.8469 16.0869 14.9561 16.1323C15.0653 16.1777 15.1824 16.2011 15.3006 16.2011C15.4189 16.2011 15.536 16.1777 15.6452 16.1323C15.7544 16.0869 15.8536 16.0203 15.9369 15.9365C16.0206 15.8529 16.087 15.7538 16.1322 15.6446C16.1775 15.5354 16.2008 15.4184 16.2008 15.3002C16.2008 15.182 16.1775 15.0649 16.1322 14.9557C16.087 14.8465 16.0206 14.7474 15.9369 14.6639L10.2732 9.00016Z" fill="white"/>
		</svg></div>
      <div class="media-swiper">
        <div class="image-btn-wrapper pre-btn-wrapper"><div class="tt-review_detail_pre_image"></div></div>
        <div class="image-btn-wrapper next-btn-wrapper"><div class="tt-review_detail_next_image"></div></div>
        <script src="https://embed.cloudflarestream.com/embed/sdk.latest.js" defer="true"></script>
        <video class="tt-detail-video" style="display:none" type="video/mp4,video/wmv, video/avi, video/mp4, video/flv,
          video/3gp, video/mov, video/mkv, video/vob" autoplay  controls></video>
					<iframe src="" class="tt-detail-frame"
				style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;display:none";
				allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>
      </div>

    <div class="review-detail">
        <div class="review-info" ></div>
        ${relatePro}
    </div>
  </div>`;
		if (!TTRevDetail.dqs("#trustoo-mask")) {
			document.body.insertAdjacentHTML(
				"beforeend",
				'<div id="trustoo-mask" style="display:none"></div>'
			);
		}
		TTRevDetail.dqs("#trustoo-mask").insertAdjacentHTML("beforeend", revDetailHtml);
		const revDetail = TTRevDetail.dqs("#trustoo-review-detail");
		TTRevDetail.revDetail = v.revDetail = revDetail;
		const onTTDetailEmbed = new CustomEvent("onTTDetailEmbed", {
			detail: {
				v: TTRevDetail
			},
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(onTTDetailEmbed);

		TTRevDetail.dqs(".close-wrapper", revDetail).onclick = function () {
			if (location.href.indexOf("tt-reviews-detail-open") !== -1 && v.isMobile) {
				window.history.replaceState(
					{},
					document.title,
					window.location.href.replace("#tt-reviews-detail-open", "")
				);
			}
			TTRevDetail.closeTTDetail(v);
		};

		TTRevDetail.dqs(".review-info", revDetail).onclick = function (e) {
			const target = e.target;
			const resourceNode = target.closest(".resource-item");
			if (resourceNode) {
				// ## 图片预览点击
				const imgNode = TTRevDetail.dqs("img", resourceNode);
				TTRevDetail.changeTTDetailImagesActive(imgNode, imgNode.getAttribute("alt"));
				TTRevDetail.switchImgVisibleStatus(v.revDetailInfo.imageIndex, v.revDetailInfo.no, "click");
			}
		};
		// Mark 上一页按钮点击事件
		TTRevDetail.preBtn = TTRevDetail.dqs(".pre-btn-wrapper", revDetail);
		TTRevDetail.preBtn.onclick = async function () {
			if (TTRevDetail.isLoading) {
				return;
			}
			const v = reviewsData;
			const info = v.revDetailInfo;
			isSwitch = false;

			if (info.imageIndex - 1 >= 0) {
				info.imageIndex--;
				TTRevDetail.switchImgVisibleStatus(info.imageIndex, info.no, "pre");
			} else {
				if (
					TTRevDetail.showType === "trustoo_swiper_review" ||
					TTRevDetail.resourceSwitchingCycle
				) {
					info.imageIndex = TTRevDetail.resources.length - 1;
				} else {
					// 评论跨页
					isSwitch = true;
					await TTRevDetail.switchReview("pre");
				}
			}
			if (!isSwitch) {
				const target = TTRevDetail.dqs(`img[alt="${info.imageIndex}"]`, revDetail);
				TTRevDetail.changeTTDetailImagesActive(target, info.imageIndex);
			}
		};
		// Mark 下一页按钮点击事件
		TTRevDetail.nextBtn = TTRevDetail.dqs(".next-btn-wrapper", revDetail);
		TTRevDetail.nextBtn.onclick = async function () {
			if (TTRevDetail.isLoading) {
				return;
			}
			const info = reviewsData.revDetailInfo;
			isSwitch = false;

			if (info.imageIndex + 1 < TTRevDetail.resources.length) {
				info.imageIndex++;
				TTRevDetail.switchImgVisibleStatus(info.imageIndex, info.no, "next");
			} else {
				if (
					TTRevDetail.showType === "trustoo_swiper_review" ||
					TTRevDetail.resourceSwitchingCycle
				) {
					info.imageIndex = 0;
				} else {
					// 评论跨页
					isSwitch = true;
					await TTRevDetail.switchReview("next");
				}
				// info.imageIndex = 0;;
			}
			if (!isSwitch) {
				const target = TTRevDetail.dqs(`img[alt="${info.imageIndex}"]`, revDetail);
				TTRevDetail.changeTTDetailImagesActive(target, info.imageIndex);
			}
		};
		// 点击空白地方关闭弹窗
		window.addEventListener("click", function (e) {
			const mask = TTRevDetail.dqs("#trustoo-mask");
			if (
				mask &&
				mask.contains(e.target) &&
				!revDetail.contains(e.target) &&
				!revDetail.getAttribute("data-closed")
			) {
				if (location.href.indexOf("tt-reviews-detail-open") !== -1 && reviewsData.isMobile) {
					window.history.replaceState(
						{},
						document.title,
						window.location.href.replace("#tt-reviews-detail-open", "")
					);
				}
				TTRevDetail.closeTTDetail(v);
			}
		});
		window.addEventListener("hashchange", function () {
			// 在这里执行处理哈希变化的自定义代码
			var newHash = window.location.hash;
			if (
				newHash.indexOf("tt-reviews-detail-open") === -1 &&
				revDetail.getAttribute("data-opened")
			) {
				TTRevDetail.closeTTDetail(v);
			}
		});
	},

	// Mark 显示评论详情弹窗
	showTTReviewDetail(v, html = "", data, type) {
		let { pageNo, revDetail } = TTRevDetail;
		let resources = null;
		TTRevDetail.showType = type;
		TTRevDetail.reviewId = data.id;
		Object.assign(TTRevDetail.reviewsData, v);
		const revInfo = TTRevDetail.dqs(".review-info", revDetail);
		const media = TTRevDetail.dqs(".media-swiper", revDetail);
		let h = 0;
		if (data.corresponding_product !== null) {
			h = 101;
		}

		if (!revDetail.getAttribute("data-opened")) {
			revDetail.setAttribute("data-opened", 1);
		}
		if (data.corresponding_product) {
			revInfo.dataset.hasProduct = 1;
		} else {
			revInfo.removeAttribute("data-has-product");
		}

		// if (v.isMobile) {
		// 	let vhNum = 40;
		// 	if (data.resources.length === 0) {
		// 		vhNum = 100;
		// 	}
		// 	revInfo.style.height = `calc(${vhNum}vh - ${h}px)`;
		// 	if (data.corresponding_product !== null) {
		// 		media.style.height = `calc(60vh - ${h}px)`;
		// 	} else {
		// 		media.style.height = "60vh";
		// 	}
		// } else {
		// 	revInfo.style.height = 600 - h + "px";
		// 	media.style.height = "600px";
		// }
		if (v.isMobile) {
			window.location.hash = "tt-reviews-detail-open";
		}
		revDetail.setAttribute("type", type);
		if (html === "") {
			html = TTRevDetail.getTTDetailReviewInfo(data);
		}

		TTRevDetail.resources = resources = data.resources.slice();

		// 不知道当前评论处于图片评论列表哪一页，说明是点击进来的，不是跨页进来的
		if (
			pageNo === null &&
			type !== "trustoo_swiper_review" &&
			!TTRevDetail.resourceSwitchingCycle
		) {
			TTRevDetail.getTTDetailReviewsList(data.id);
		}

		revInfo.innerHTML = html;
		const info = data.corresponding_product;
		if (info) {
			let proName = info.product_name;
			if (proName.length > 50) {
				proName = proName.substring(0, 50) + "...";
			}

			TTRevDetail.dqs(".tt-product-name", revDetail).innerHTML = proName;
			TTRevDetail.dqs(
				".product-image",
				revDetail
			).style.backgroundImage = `url(${info.product_image})`;
			const proShop = TTRevDetail.dqs(".product-shop", revDetail);
			const linkBtn = TTRevDetail.dqs(".product-shop>a", revDetail);
			// 全部评论且开启后嵌入关联产品，通过读取属性实现文本自定义
			if (linkBtn) {
				linkBtn.href = info.product_url;
			} else {
				const curLang =
					v.userSetting.auto_switch_language === 1
						? (Shopify && Shopify.locale) || "en"
						: v.userSetting.language;
				const showNowText =
					proShop.getAttribute("text") || TTRevDetail.shopNow[curLang] || "Shop Now";
				proShop.insertAdjacentHTML(
					"afterbegin",
					`<a target="_Blank" href="${info.product_url}">
						<span class="tt-shop"></span><span>${showNowText}</span>
					</a>`
				);
			}

			TTRevDetail.dqs(".product-info", revDetail).style.display = "flex";
		}

		TTRevDetail.dqs(".reviews-text,.tt-card-body", revDetail).innerHTML = data.content;
		TTRevDetail.dqsa(".resource-list img", revDetail).forEach((it) => {
			it.onerror = function () {
				const inx = this.getAttribute("alt");
				resources.splice(inx, 1);
				it.closest(".resource-item").remove();
				if (inx == 0) {
					TTRevDetail.changeTTDetailImagesActive(
						TTRevDetail.dqs(".resource-list img", revDetail),
						0
					);
				}

				if (resources.length === 1) {
					if (type === "trustoo_swiper_review" || TTRevDetail.resourceSwitchingCycle) {
						TTRevDetail.dqs(".media-swiper", revDetail).classList.add("hide-btn");
					}
				} else {
					TTRevDetail.dqsa(".resource-list img", revDetail).forEach((it, inx) => {
						it.setAttribute("index", inx);
						it.setAttribute("alt", inx);
					});
				}
			};
		});
		const multiPhotoIcon = TTRevDetail.dqs(".multi-photo-wrapper", revDetail);
		multiPhotoIcon && multiPhotoIcon.remove();

		document.body.classList.add("trustoo-open");
		TTRevDetail.dqs("#trustoo-mask").style.display = "flex";

		let d = "block";
		let cls = "has-image";
		revDetail.classList.remove("no-image");
		if (resources.length === 0) {
			cls = "no-image";
			d = "none";
		} else if (resources.length > 1) {
			media.classList.remove("hide-btn");
		} else {
			TTRevDetail.dqs(".resource-list", revDetail).remove();
			if (type === "trustoo_swiper_review" || TTRevDetail.resourceSwitchingCycle) {
				media.classList.add("hide-btn");
			}
		}
		if (resources.length > 0) {
			const imageIndex = v.revDetailInfo.imageIndex;
			this.switchResourceShow(resources[imageIndex], media, data.review_id);
			const nodes = TTRevDetail.dqsa(".resource-item", revDetail);
			nodes.forEach((itm) => {
				child = itm.children[0];
				child.style.display = "block";
				const proportion = parseFloat(itm.getAttribute("proportion"));
				if (proportion > 0) {
					if (proportion > 1) {
						child.style.height = "100%";
					} else {
						child.style.width = "100%";
					}
				}
			});
			if (resources.length > 1) {
				TTRevDetail.dqs(`img[alt="${imageIndex}"]`, revDetail).parentNode.classList.add("active");
			}
		}
		revDetail.classList.remove("has-image", "no-image");
		revDetail.classList.add(cls);
		revDetail.removeAttribute("data-closed");
		// const display = v.isMobile ? "block" : "flex";
		// revDetail.style.display = display;
		if (v.scenes === "detail" && typeof trustooAfterExecute !== "undefined") {
		}
		media.style.display = d;
	},

	// ## 大媒体展示切换
	switchResourceShow(resource, media, review_id) {
		const revDetail = TTRevDetail.revDetail;
		const iframe = TTRevDetail.dqs(".tt-detail-frame", revDetail);
		const video = TTRevDetail.dqs(".tt-detail-video", revDetail);
		video.style.display = iframe.style.display = "none";
		iframe.src = video.src = "";
		if (resource.resource_type === 2) {
			if (resource.video_player_url) {
				TTRevDetail.loadCFSdk(review_id);
				iframe.style.display = "block";
				iframe.src = resource.video_player_url + "?autoplay=true";
			} else if (resource.src) {
				const video = TTRevDetail.dqs(".tt-detail-video", revDetail);
				video.style.display = "block";
				video.src = resource.src;
			}
		} else if (resource.resource_type === 1) {
			// let imgSty = `background-image:url(${resource.src});`;
			// imgSty += TTRevDetail.getTTDetailImageStyle(resource);
			// console.log("imgSty", imgSty);
			const width = resource.width,
				height = resource.height;

			let size = "100% auto";

			const p = parseFloat((width / height).toFixed(1));
			if (p >= 0.7 && p <= 1) {
				size = "cover";
			} else if (width <= height) {
				size = "auto 100%";
			}

			let color = resource.average_hue || "#cec9b6";
			media.style.backgroundColor = color;
			media.style.backgroundSize = size;
			media.style.backgroundImage = `url(${resource.src})`;
		}
	},
	loadCFSdk(review_id) {
		if (TTRevDetail.isCFSdkLoaded || !window.TrustooReviews.apiDomain) {
			return;
		}
		TTRevDetail.isCFSdkLoaded = true;
		const script = document.createElement("script");
		script.src = "https://embed.cloudflarestream.com/embed/sdk.latest.js";
		script.onload = () => {
			const iframe = TTRevDetail.dqs(".tt-detail-frame", TTRevDetail.revDetail);
			const player = Stream(iframe);
			player.addEventListener("error", () => {
				const videoLoadedError = 4;
				fetch("//" + window.TrustooReviews.apiDomain + "/api/v1/product/customer_media_feedback", {
					method: "POST",
					body: JSON.stringify({
						shop_id: Review.shop_id,
						media_url: iframe.src,
						review_id,
						feedback_type: videoLoadedError
					})
				});
			});
		};
		document.head.appendChild(script);
	},

	// Mark 切换评论
	async switchReview(type) {
		let { reviewsData, showType, pageNo, pageCount, revDetail, reviewLists } = TTRevDetail;
		const v = reviewsData;
		// const revDetail = TTRevDetail.dqs("#trustoo-review-detail");
		let no = v.revDetailInfo.no;

		if (type === "pre") {
			if (no === 0) {
				pageNo--;
				no = 14;
			} else {
				no--;
			}
		} else if (type === "next") {
			if (no === 14) {
				pageNo++;
				no = 0;
			} else {
				no++;
			}
		}

		let previewPageNo = null;
		if (no === 13 && previewPageNo < pageCount) {
			previewPageNo = pageNo + 1;
		} else if (no === 2 && pageNo > 1) {
			previewPageNo = pageNo - 1;
		}
		TTRevDetail.pageNo = pageNo;
		if (
			previewPageNo &&
			previewPageNo <= pageCount &&
			typeof reviewLists[previewPageNo - 1] === "undefined"
		) {
			TTRevDetail.getTTDetailReviewsList("", previewPageNo);
		}

		v.revDetailInfo.no = no;

		if (revDetail.classList.contains("has-video")) {
			TTRevDetail.dqs(".tt-detail-frame", revDetail).style.display = "none";
			revDetail.classList.remove("has-video");
		}
		const d = await TTRevDetail.getReview(no);
		if (type === "pre") {
			v.revDetailInfo.imageIndex = d.resources.length - 1;
		} else if (type === "next") {
			v.revDetailInfo.imageIndex = 0;
		}

		TTRevDetail.dqs(".media-swiper", revDetail).style.backgroundImage = "none";
		TTRevDetail.showTTReviewDetail(v, "", d, showType);
		TTRevDetail.switchVisibleStatus(no, type, d.resources.length);
	},

	async getReview(no) {
		let { pageNo, reviewLists } = TTRevDetail;
		let d = null;
		if (typeof reviewLists[pageNo - 1] !== "undefined") {
			d = reviewLists[pageNo - 1][no];
		} else {
			TTRevDetail.isLoading = true;
			const list = await TTRevDetail.getTTDetailReviewsList("", pageNo);
			TTRevDetail.isLoading = false;
			d = list[no];
		}
		return d;
	},
	getAttributeHtml(attributes) {
		if (!attributes || attributes.length === 0 || !TrustooReviews.reviews.createRangeDisplayHTML) {
			return ["", ""];
		}

		const v = TTRevDetail.reviewsData;
		const rounded = 1,
			square = 2;
		const style = {
			[rounded]: "rounded",
			[square]: "square"
		};
		let rangeHtml = "",
			choiceHtml = "";
		const rangeAttributes = [],
			choiceAttributes = [];
		attributes.forEach((attr) => {
			if (attr.type.includes("range")) {
				rangeAttributes.push(attr);
			} else {
				choiceAttributes.push(attr);
			}
		});
		rangeAttributes.forEach((it) => {
			rangeHtml += TrustooReviews.reviews.createRangeDisplayHTML({
				type: it.type === "centered_range" ? "centered" : "range",
				title: it.title,
				labels: it.options,
				value: it.range_value,
				style: style[v.userSetting.attributes_style]
			});
		});
		if (rangeHtml) {
			rangeHtml = `<div class="tt-range-container">${rangeHtml}</div>`;
		}
		choiceAttributes.forEach((it) => {
			choiceHtml += `<div>
						<p style="font-size: 12px; opacity: 0.6">
							${it.title}:
						</p>
						<p style="font-size: 14px;">${it.options.join(",")}</p>
					</div>`;
		});
		return [rangeHtml, choiceHtml];
	},

	// Mark 获取评论
	async getTTDetailReviewsList(reviewId = "", reqPageNo = 0) {
		let { reviewsData, resources, showType, pageNo, pageCount, reviewLists } = TTRevDetail;
		let isBuyersShow = 2;
		let sortType = "image-descending",
			ratingFilter = 0;
		const v = reviewsData;
		if (showType === "trustoo_buyers_show") {
			isBuyersShow = v.buyersShowType;
		}

		if (
			[
				"trustoo_reviews",
				"trustoo_all_reviews",
				"trustoo_shop_reviews",
				"trustoo_popup_shop_reviews"
			].includes(showType)
		) {
			sortType = (v.isWdoRevOpen ? v.wdoRevDom : v.reviewsDom).getAttribute("review_sort_by");
			ratingFilter = (v.isWdoRevOpen ? v.wdoRev : v.reviews).ratingFilter;
		}

		return v
			.getRevList({
				sortType,
				ratingFilter,
				limit: 15,
				page: reqPageNo,
				isBuyersShow,
				hasResource: true,
				reviewId
			})
			.then((res) => {
				const d = res[1];
				if (!pageNo) {
					pageNo = TTRevDetail.pageNo = d.page.cur_page;
					pageCount = TTRevDetail.pageCount = d.page.total_page;
					if (pageNo === pageCount) {
						TTRevDetail.pageSize = d.list.length;
					}
				}
				if (d.page.cur_page === pageCount) {
					TTRevDetail.lastPageSize = d.list.length;
				}
				if (reviewId) {
					const no = (v.revDetailInfo.no = d.list.findIndex((it) => {
						return it.id == reviewId;
					}));
					let previewPageNo = null;
					if (no >= 13 && pageNo < pageCount) {
						previewPageNo = pageNo + 1;
					} else if (no <= 2 && pageNo > 1) {
						previewPageNo = pageNo - 1;
					}
					if (previewPageNo) {
						TTRevDetail.getTTDetailReviewsList("", previewPageNo);
					}
					TTRevDetail.switchVisibleStatus(no, "click", resources.length);
				}
				reviewLists[d.page.cur_page - 1] = d.list;
				return d.list;
			});
	},

	//Mark 切换评论按钮显示状态切换
	switchVisibleStatus(no, type, resourceCount) {
		let { reviewsData, pageNo, pageCount, pageSize, lastPageSize, preBtn, nextBtn } = TTRevDetail;
		const info = reviewsData.revDetailInfo;
		if (no === 0 && pageNo === 1 && info.imageIndex === 0) {
			preBtn.style.display = "none";
		} else if (no === 1 && pageNo === 1 && type === "next") {
			preBtn.style.display = "flex";
		}
		if (no === lastPageSize - 1 && pageNo === pageCount && info.imageIndex + 1 === resourceCount) {
			nextBtn.style.display = "none";
		} else if (no === lastPageSize - 2 && pageNo === pageCount && type === "pre") {
			nextBtn.style.display = "flex";
		}
	},

	// Mark 图片切换按钮显示状态切换
	switchImgVisibleStatus(index, no, type) {
		let { resources, pageNo, pageCount, pageSize, preBtn, nextBtn } = TTRevDetail;
		if (
			((index === 1 && type === "next") || (index !== 0 && type === "click")) &&
			pageNo === 1 &&
			no === 0
		) {
			preBtn.style.display = "flex";
		} else if (index === 0 && pageNo === 1 && no === 0) {
			preBtn.style.display = "none";
		}
		if (index + 1 === resources.length && pageNo === pageCount && no === this.lastPageSize - 1) {
			nextBtn.style.display = "none";
		} else if (
			((index + 2 === resources.length && type === "pre") ||
				(index + 1 !== resources.length && type === "click")) &&
			pageNo === pageCount &&
			no === this.lastPageSize - 1
		) {
			nextBtn.style.display = "flex";
		}
	},

	// Mark 关闭弹窗
	closeTTDetail() {
		const { showType, revDetail, reviewsData } = TTRevDetail;
		TTRevDetail.pageNo = null;
		revDetail.setAttribute("data-closed", 1);
		revDetail.parentNode.style.display = "none";
		TTRevDetail.dqs(".review-info", revDetail).innerHTML = "";
		TTRevDetail.dqsa(".tt-detail-frame,.tt-detail-video", revDetail).forEach((it) => {
			it.src = "";
			it.style.display = "none";
		});
		if (showType !== "trustoo_swiper_review" && !TTRevDetail.resourceSwitchingCycle) {
			TTRevDetail.dqsa(".image-btn-wrapper", revDetail).forEach(
				(it) => (it.style.display = "flex")
			);
		}

		TTRevDetail.dqs(".media-swiper", revDetail).style.backgroundImage = "none";
		// revDetail.style.display = "none";
		document.body.classList.remove("trustoo-open");
		TTRevDetail.dqs(".product-info", revDetail).style.display = "none";
		TTRevDetail.dqs(".product-info .product-shop", revDetail).innerHTML = "";
		TTRevDetail.dqs(".media-swiper", revDetail).classList.remove("hide-btn");
		TTRevDetail.revDetail.removeAttribute("data-opened");
		reviewsData.revDetailInfo.imageIndex = 0;
		document.dispatchEvent(TTRevDetail.detailCloseEvent);
	},

	getTTDetailImageStyle(image) {
		const width = image.width,
			height = image.height;

		const average_hue = image.average_hue;
		const bdc = average_hue ? average_hue : "#cec9b6";

		let style = "";
		if (width > height) {
			style = "background-size:100% auto;";
		} else {
			const p = parseFloat((width / height).toFixed(1));
			if (p >= 0.7 && p <= 1) {
				style = "background-size:100% auto;";
			} else {
				style = "background-size:auto 100%;";
			}
		}
		style += `background-color:${bdc};`;
		return style;
	},

	changeTTDetailImagesActive(target, index) {
		let { reviewsData, resources, revDetail } = TTRevDetail;
		const activeNode = TTRevDetail.dqs(".active", revDetail);
		if (activeNode) {
			activeNode.classList.remove("active");
		}
		target.parentNode.classList.add("active");
		const v = reviewsData;
		v.revDetailInfo.imageIndex = parseInt(index);
		this.switchResourceShow(resources[index], TTRevDetail.dqs(".media-swiper", revDetail));
	},

	dqs(selector, context) {
		let node;
		if (context) {
			node = context.querySelector(selector);
		} else {
			node = document.querySelector(selector);
		}
		return node;
	},

	dqsa(selector, context) {
		let nodes;
		if (context) {
			nodes = context.querySelectorAll(selector);
		} else {
			nodes = document.querySelectorAll(selector);
		}
		return nodes;
	},

	getTTDetailReviewInfo(data) {
		let { reviewsData } = TTRevDetail;
		const v = reviewsData;
		const userSetting = v.userSetting;

		let resources = "";
		if (data.resources.length > 0) {
			data.resources.forEach((it, index) => {
				const videoTipHtml =
					it.resource_type === 2
						? `<div class="tt-video-player" style="position:absolute">
      ${TTRevDetail.videoIcon}
    </div>`
						: "";
				const imgSrc = it.resource_type === 2 ? it.thumb_src : it.src;
				let proportion = it.width && it.height ? (it.width / it.height).toFixed(2) : 0;
				resources += `<div class="resource-item" proportion="${proportion}"><img index="${index}"  alt="${index}"  src="${imgSrc}">
				${videoTipHtml}
			</div>`;
			});
			resources = `<div class="resource-list">${resources}</div>`;
		}

		// 名字的显示
		let authorCountry = "";
		const flagCls = data.author_country ? "country-flag " + data.author_country : "";
		const flag = `<span class="${flagCls}"
   style="${data.author_country ? "border: 1px solid #ccc;" : ""}" ></span>`;
		const country = ` <span class="country-name">${data.author_country}</span>`;
		const flagType = userSetting.is_show_country_flag;
		if (flagType == 1) {
			authorCountry = flag + country;
		} else if (flagType == 3) {
			authorCountry = flag;
		} else if (flagType == 4) {
			authorCountry = country;
		}

		// 时间的显示
		let reviewDate = "";
		let d = [];
		const timeAgoType = 5;
		const date = data.commented_at.split(" ")[0];
		if (date.indexOf("/") !== -1) {
			d = date.split("/");
		} else if (date.indexOf("-") !== -1) {
			d = date.split("-");
		}
		const mmddyyyy = 1,
			ddmmyyyy = 2,
			yyyymmdd = 3;
		if (userSetting.review_date_format_type === timeAgoType) {
			reviewDate = TTRevDetail.getTimeAgo(data.commented_at);
		} else {
			if (userSetting.review_date_format_type === mmddyyyy) {
				reviewDate = d[1] + "/" + d[2] + "/" + d[0];
			} else if (userSetting.review_date_format_type === ddmmyyyy) {
				reviewDate = d[2] + "/" + d[1] + "/" + d[0];
			} else if (userSetting.review_date_format_type === yyyymmdd) {
				reviewDate = date;
			}
		}

		let dateHtml = reviewDate ? `<span class="reviews-date">${reviewDate}</span>` : "";

		// 徽章的显示
		const veryIcon = v.badgeIconSvg;
		const veryText = `<span class="verified-text">${v.lang.verified_purchase}</span>`;
		const veryType = userSetting.is_show_verified_badge;
		let onlyVeryIcon = "",
			userVerified = "";

		if (data.verified_badge === 1) {
			if (veryType === 1) {
				userVerified = `<div class="user-verified">
				${veryIcon + veryText}</div>
			`;
			} else if (veryType === 2) {
			} else if (veryType === 3) {
				onlyVeryIcon = veryIcon;
			}
		}

		let itemType = "";
		if (v.userSetting.item_type === 1 && data.item_type) {
			itemType = `<div>
			<p style="font-size: 12px; opacity: 0.6">
				${v.lang.item_type}
			</p>
			<p style="font-size: 14px;">${data.item_type}</p>
		</div>`;
		}

		// 反馈的显示
		let merchantReply = "";
		if (data.reply_content !== "") {
			const content = v.lang.shop_name.replace("{{shop_name}}", v.userSetting.store_name);
			merchantReply = `<div class="merchant-reply">
			<div class="reply-title">
			 ${content}</div>
				<div class="reply-content">${data.reply_content}</div>
			</div>`;
		}

		const [rangeHtml, choiceHtml] = TTRevDetail.getAttributeHtml(data.review_attribute);
		let variablesAttr = "";
		if (itemType || choiceHtml) {
			variablesAttr = `<div class="tt-review-labels">
		${itemType} ${choiceHtml}</div>`;
		}

		return `
	<div class="review-row-one">
		<div class="vstar-star">${TTRevDetail.getTTDetailStar(data.star)}  </div>
		${dateHtml}
	</div>
		<div class="user-message">  
			<span class="user-name"> <span class="author-name"> ${data.author}  </span> </span>
			${authorCountry}
			${onlyVeryIcon}
			${userVerified}     
		</div>
		${resources}
		<p class="reviews-text">${data.content}</p>
		${variablesAttr}
		${rangeHtml}
		${merchantReply}
	`;
	},

	// type-1 字体文件星星图标 type-2 幻灯片星星图标（黑白） type-3 产品页、集合页评价星星图标
	getTTDetailStar(rating) {
		const { reviewsData: v } = TTRevDetail;
		// size参数有值，说明是要用svg星星图标
		const star = v.ratingIconSvg;
		const starString = `<div class="star-item">${star}</div>`;
		const nostarString = `<div class="star-item nostar">${star}</div>`;

		if (!parseInt(rating)) rating = 0;
		var starTag = "";
		var starNum = Math.floor(rating);

		for (var i = 0; i < starNum; i++) {
			starTag += starString;
		}

		for (var i = 0; i < 5 - starNum; i++) {
			starTag += nostarString;
		}

		return starTag;
	},
	shopNow: {
		ar: "تسوق الآن",
		bg: "Пазарувай сега",
		cs: "Nakupovat nyní",
		da: "Shop nu",
		de: "Jetzt einkaufen",
		el: "Ψώνισε τώρα",
		es: "Compra ahora",
		et: "Osta kohe",
		fi: "Osta nyt",
		fr: "Achetez maintenant",
		he: "קנה עכשיו",
		hr: "Kupi sada",
		hu: "Vásárolj most",
		id: "Belanja sekarang",
		it: "Acquista ora",
		ja: "今すぐ購入",
		ka: "შეიძინე ახლა",
		ko: "지금 쇼핑하기",
		lt: "Pirkti dabar",
		lv: "Iepērcies tagad",
		ms: "Beli sekarang",
		nl: "Nu winkelen",
		no: "Handle nå",
		pl: "Kup teraz",
		pt: "Compre agora",
		"pt-BR": "Compre agora",
		"pt-PT": "Compre agora",
		ro: "Cumpără acum",
		sk: "Nakupujte teraz",
		sl: "Kupite zdaj",
		sv: "Handla nu",
		th: "ช้อปทันที",
		tr: "Şimdi alışveriş yap",
		uk: "Купити зараз",
		vi: "Mua ngay",
		"zh-CN": "立即购买",
		"zh-TW": "立即購買"
	},
	getTimeAgo(timeString) {
		// 将时间字符串转换为 Date 对象
		const date = new Date(timeString + "Z");
		const timestamp = date.getTime(); // 获取毫秒时间戳

		const now = new Date().getTime();
		const diffInSeconds = Math.floor((now - timestamp) / 1000); // 时间差（秒）

		const secondsInMinute = 60;
		const secondsInHour = 60 * secondsInMinute;
		const secondsInDay = 24 * secondsInHour;
		const secondsInMonth = 30 * secondsInDay;
		const secondsInYear = 365 * secondsInDay;

		const texts = TTRevDetail.reviewsData.lang.time_ago;
		let number = "",
			field = "just";
		if (diffInSeconds < secondsInMinute) {
			field = "just";
		} else if (diffInSeconds < secondsInHour) {
			number = Math.floor(diffInSeconds / secondsInMinute);
			field = "minute";
		} else if (diffInSeconds < secondsInDay) {
			number = Math.floor(diffInSeconds / secondsInHour);
			field = "hour";
		} else if (diffInSeconds < secondsInMonth) {
			number = Math.floor(diffInSeconds / secondsInDay);
			field = "day";
		} else if (diffInSeconds < secondsInYear) {
			number = Math.floor(diffInSeconds / secondsInMonth);
			field = "month";
		} else {
			number = Math.floor(diffInSeconds / secondsInYear);
			field = "year";
		}
		if (number !== 1 && field !== "just") {
			field += "s";
		}
		return texts[field].replace("{{time_number}}", number);
	},
	videoIcon: `<svg class="tt-video-icon" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" width="24" height="24" viewBox="0 0 36 36" fill="none">
  <g filter="url(#filter0_d_5903_67423)">
    <path d="M18 4C10.2806 4 4 10.2806 4 18C4 25.7194 10.2806 32 18 32C25.7194 32 32 25.7194 32 18C32 10.2806 25.7194 4 18 4ZM18 29.8462C11.4685 29.8462 6.15385 24.5315 6.15385 18C6.15385 11.4685 11.4685 6.15385 18 6.15385C24.5315 6.15385 29.8462 11.4685 29.8462 18C29.8462 24.5315 24.5315 29.8462 18 29.8462ZM16.4794 11.7054C16.3187 11.5886 16.1289 11.5185 15.9308 11.5029C15.7328 11.4873 15.5343 11.5267 15.3573 11.6169C15.1803 11.7071 15.0317 11.8444 14.9279 12.0138C14.8241 12.1832 14.7692 12.378 14.7692 12.5766V24.0114C14.7694 24.2099 14.8245 24.4046 14.9283 24.5738C15.0322 24.743 15.1808 24.8802 15.3578 24.9703C15.5347 25.0603 15.7332 25.0997 15.9311 25.084C16.129 25.0684 16.3188 24.9983 16.4794 24.8815L24.3409 19.1642C24.4784 19.0643 24.5903 18.9332 24.6674 18.7818C24.7446 18.6304 24.7848 18.4629 24.7848 18.2929C24.7848 18.123 24.7446 17.9554 24.6674 17.804C24.5903 17.6526 24.4784 17.5216 24.3409 17.4217L16.4794 11.7054Z" fill="white"/>
  </g>
  <defs>
    <filter id="filter0_d_5903_67423" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5903_67423"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5903_67423" result="shape"/>
    </filter>
  </defs>
</svg>`
};
