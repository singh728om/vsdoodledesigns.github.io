"use strict";
! function(t, e, i, s) {
    var n = "spCarousel";

    function o(i, s) {
        this.element = i, this.elementWidth = 0, this._name = n, this.item = null, this.delta = 1, this.isAnimating = !1, this.isDragging = !1, this.windowWidth = t(e).width(), this.timer = 0, this._timeoutId1 = 0, this._timeoutId2 = 0, this.resizeTimer = 0, this._dotControllerTimeId = 0, this._lastViewPort = 0, this.viewPort = null, this.responsiveRefreshRate = 200, this.itemWidth = 0, this._clones = 0, this._items = 0, this._itemCoordinate = [], this.coordinate = {
            x: 0,
            y: 0
        }, this.prevCoordinate = {
            x: 0,
            y: 0,
            diff: 0,
            dragPointer: -1
        }, this._defaults = t.fn.spCarousel.defaults, this.options = t.extend({}, this._defaults, s), 2 !== this.options.nav_text.length && (console.warn("nav text must be need two control element!"), this.options.nav_text = ["<", ">"]), this.options.speed > this.options.interval && (this.options.speed = this.options.interval), this.init()
    }
    t.extend(o.prototype, {
        init: function() {
            this.buildCache(), this.createHtmlDom(), this.applyBasicStyle(), this.bindEvents(), this.triggerOnStart(), this.options.autoplay && this.startLoop()
        },
        triggerOnStart: function() {
            if (this.options.dot_indicator && this.options.dots) {
                var t = this.$dotContainer.find("li.active");
                this.animateDotIndicator(t, "start")
            }
        },
        destroy: function() {
            this.unbindEvents(), this.$outerStage.children(".clone").remove(), this.$outerStage.unwrap(), this.$outerStage.children().unwrap(), this.$sliderList.unwrap(), this.options.dots && this.$dotContainer.parent(".sppb-carousel-extended-dots").remove(), this.options.nav && this.$nextBtn.parent(".sppb-carousel-extended-nav-control").remove(), this.$element.removeData(this._name)
        },
        buildCache: function() {
            this.$element = t(this.element)
        },
        unbindEvents: function() {
            this.$element.off("." + this._name)
        },
        createHtmlDom: function() {
            this.createOuterStage(), void 0 !== this.options.responsive && this.parseResponsiveViewPort(), this.itemProfessor(), this.options.nav && this.createNavigationController(), this.options.dots && this.createDotsController(), this.cloneItems()
        },
        itemProfessor: function() {
            this._numberOfItems = this.$element.find(".sppb-carousel-extended-item").length;
            var t = this.options.centerPadding;
            null !== this.viewPort && (this.options.items = void 0 === this.viewPort.items ? this.options.items : this.viewPort.items, t = void 0 === this.viewPort.centerPadding ? this.options.centerPadding : this.viewPort.centerPadding), this.elementWidth = this.$element.outerWidth() + this.options.margin, this.itemWidth = this.options.center ? Math.abs((this.elementWidth - 2 * t) / this.options.items) : Math.abs(this.elementWidth / this.options.items), this._clones = this._numberOfItems > this.options.items ? Math.ceil(this._numberOfItems / 2) : this.options.items, this._maxL = this.itemWidth * (this._numberOfItems + (this._clones - 1)), this._minL = !1 === this.options.center ? this.itemWidth * this._clones : this.itemWidth * this._clones - t
        },
        cloneItems: function() {
            for (var t = [], e = [], i = 0; i < this._clones; i++) i < this.options.items && this.$element.find(".sppb-carousel-extended-item:nth-child(" + (i + 1) + ")").addClass("active"), t.push(this.$element.find(".sppb-carousel-extended-item:nth-child(" + (this._numberOfItems - i) + ")").clone(!0).addClass("clone").removeClass("active")), e.push(this.$element.find(".sppb-carousel-extended-item:nth-child(" + (i + 1) + ")").clone(!0).addClass("clone").removeClass("active"));
            this.options.center && this.applyCenterMode(0, this.options.items - 1), this.appendBefore(t), this.appendAfter(e), this.calculateItemCoordinate()
        },
        appendBefore: function(t) {
            var e = this;
            t.map(function(t) {
                e.$outerStage.prepend(t)
            })
        },
        appendAfter: function(t) {
            var e = this;
            t.map(function(t) {
                e.$outerStage.append(t)
            })
        },
        calculateItemCoordinate: function() {
            var t = this;
            this.$outerStage.children().each(function(e, i) {
                t._itemCoordinate.push((e + 1) * t.itemWidth)
            })
        },
        createOuterStage: function() {
            this.sliderList = i.createElement("div"), this.sliderList.setAttribute("class", "sppb-carousel-extended-list"), this.outerStage = i.createElement("div"), this.outerStage.setAttribute("class", "sppb-carousel-extended-outer-stage"), this.outerStage.innerHTML = this.$element.html(), !0 === this.options.center && this.$element.addClass("sppb-carousel-extended-center"), this.sliderList.append(this.outerStage), this.$element.html(this.sliderList), this.$outerStage = t(this.outerStage), this.$sliderList = t(this.sliderList)
        },
        createNavigationController: function() {
            var e = i.createElement("div");
            e.setAttribute("class", "sppb-carousel-extended-nav-control"), this.$element.append(e), this.nextBtn = i.createElement("span"), this.nextBtn.setAttribute("class", "next-control nav-control"), this.prevBtn = i.createElement("span"), this.prevBtn.setAttribute("class", "prev-control nav-control"), e.append(this.nextBtn), e.append(this.prevBtn), this.nextBtn.innerHTML = this.options.nav_text[1], this.prevBtn.innerHTML = this.options.nav_text[0], this.$nextBtn = t(this.nextBtn), this.$prevBtn = t(this.prevBtn)
        },
        createDotsController: function() {
            var e = i.createElement("div");
            e.setAttribute("class", "sppb-carousel-extended-dots"), this.$element.append(e);
            var s = i.createElement("ul"),
                n = null;
            void 0 !== this.options.responsive && (n = this.parseResponsiveViewPort());
            var o = null === n ? this.options.items : void 0 === n.items ? this.options.items : n.items,
                a = Math.floor(this._numberOfItems / o);
            if (a > 1)
                for (var r = 0; r < a; r++) {
                    var h = i.createElement("li");
                    if (h.setAttribute("class", "sppb-carousel-extended-dot-" + r), t(h).css({
                            "-webkit-transition": "all 0.5s ease 0s",
                            transition: "all 0.5s ease 0s"
                        }), 0 === r && t(h).addClass("active"), this.options.dot_indicator) {
                        var d = i.createElement("span");
                        d.setAttribute("class", "sppb-carousel-extended-dot-indicator"), h.append(d)
                    }
                    s.append(h)
                }
            e.append(s), this.$element.append(e), this.$dotContainer = t(s)
        },
        applyBasicStyle: function() {
            var e = 0,
                i = {};
            if (i.width = this.itemWidth - this.options.margin + "px", this.options.margin > 0 && (i.marginRight = this.options.margin + "px"), this.$element.find(".sppb-carousel-extended-item").each(function() {
                    e++, t(this).css(i)
                }), this._currentPosition = this._clones * this.itemWidth, !0 === this.options.center) {
                var s = void 0 === this.viewPort.centerPadding ? this.options.centerPadding : this.viewPort.centerPadding;
                this._currentPosition = this._clones * this.itemWidth - s
            }
            this.$outerStage.css({
                "-webkit-transition-duration": "0s",
                "transition-duration": "0s",
                "-webkit-transform": "translate3D(-" + this._currentPosition + "px,0px,0px)",
                transform: "translate3D(-" + this._currentPosition + "px,0px,0px)",
                width: e * this.itemWidth + "px"
            }), this._items = e, this.updateResponsiveView()
        },
        startLoop: function() {
            var t = this;
            this.timer = setInterval(function() {
                !1 === t.isAnimating && t.Next()
            }, this.options.interval)
        },
        stopLoop: function() {
            clearInterval(this.timer), this.timer = 0
        },
        Next: function() {
            -1 === this.delta && (this.delta = 1), this.updateItemStyle()
        },
        Prev: function() {
            1 === this.delta && (this.delta = -1), this.updateItemStyle()
        },
        slideFromPosition: function(t, e) {
            var i = this.itemWidth * (this.options.items * t),
                s = 0 === t ? this._minL : this._minL + i;
            this.$outerStage.css({
                "-webkit-transition": "all " + this.options.speed + "ms ease 0s",
                transition: "all " + this.options.speed + "ms ease 0s",
                "-webkit-transform": "translate3D(-" + s + "px,0px,0px)",
                transform: "translate3D(-" + s + "px,0px,0px)"
            }), this._currentPosition = s, this.delta = e, this.processActivationWorker()
        },
        updateDotsFromPosition: function(t) {
            var e = this,
                i = this.$dotContainer.find("li.active").removeClass("active"),
                s = this.$dotContainer.find("li:nth-child(" + t + ")").addClass("active");
            this.options.dot_indicator && (this.animateDotIndicator(i, "stop"), this._dotControllerTimeId > 0 && (clearTimeout(this._dotControllerTimeId), this._dotControllerTimeId = 0), this._dotControllerTimeId = setTimeout(function() {
                e.animateDotIndicator(s, "start")
            }, this.options.speed)), s.css({
                "-webkit-transition": "all 0.5s ease 0s",
                transition: "all 0.5s ease 0s"
            })
        },
        animateDotIndicator: function(t, e) {
            if ("stop" === e && t.find(".sppb-carousel-extended-dot-indicator").removeClass("active").css({
                    "-webkit-transition-duration": "0s",
                    "transition-duration": "0s"
                }), "start" === e) {
                var i = Math.abs(this.options.interval - this.options.speed);
                t.find(".sppb-carousel-extended-dot-indicator").addClass("active").css({
                    "-webkit-transition-duration": i + "ms",
                    "transition-duration": i + "ms"
                })
            }
        },
        updateItemStyle: function() {
            var t = this;
            this._timeoutId1 > 0 && (clearTimeout(this._timeoutId1), this._timeoutId1 = 0);
            var e = -1 === this.prevCoordinate.dragPointer ? 0 : this.prevCoordinate.dragPointer,
                i = this._currentPosition,
                s = this.itemWidth;
            this.options.items > 1 && (s += parseInt(e));
            var n = 1 === this.delta ? i + s : i - s;
            if (n > this._maxL && (this.$outerStage.css({
                    "-webkit-transition": "0s",
                    transition: "0s",
                    "-webkit-transform": "translate3D(-" + (this._minL - this.itemWidth) + "px,0px,0px)",
                    transform: "translate3D(-" + (this._minL - this.itemWidth) + "px,0px,0px)"
                }), n = this._minL), i < this._minL && (this.$outerStage.css({
                    transition: "0s",
                    "-webkit-transform": "translate3D(-" + this._maxL + "px,0px,0px)",
                    transform: "translate3D(-" + this._maxL + "px,0px,0px)"
                }), n = this._maxL - this.itemWidth), this.isDragging && this.options.items > 1)
                for (var o = this._itemCoordinate, a = void 0 === this.viewPort.centerPadding ? this.options.centerPadding : this.viewPort.centerPadding, r = !1, h = 0; h < o.length && (o[h] > n && (n = !0 === this.options.center ? o[h] - a : o[h], r = !0), !0 !== r); h++);
            this._timeoutId1 = setTimeout(function() {
                t.$outerStage.css({
                    "-webkit-transition": "all " + t.options.speed + "ms ease 0s",
                    transition: "all " + t.options.speed + "ms ease 0s",
                    "-webkit-transform": "translate3D(-" + n + "px,0px,0px)",
                    transform: "translate3D(-" + n + "px,0px,0px)"
                })
            }, 100), this._currentPosition = n, this.processActivationWorker(), this.options.autoplay && 0 === this.timer && this.startLoop()
        },
        processActivationWorker: function() {
            var t = this._currentPosition,
                e = Math.floor(t / this.itemWidth);
            e = this.options.center ? e + 1 : e;
            var i = Math.floor(Math.abs(this.options.items + e));
            this.$outerStage.find(".active").removeClass("active");
            for (var s = e; s < i; s++) this.$outerStage.children(":eq(" + s + ")").addClass("active");
            this.options.center && this.applyCenterMode(e, i);
            var n = Math.floor((e - this._clones) / this.options.items) + 1;
            this.options.dots && (this.$dotContainer.find(".active").removeClass("active"), this.$dotContainer.find("li:nth-child(" + n + ")").addClass("active"))
        },
        applyCenterMode: function(t, e) {
            var i = Math.floor((t + e) / 2);
            this.$outerStage.find(".sppb-carousel-extended-item-center").removeClass("sppb-carousel-extended-item-center"), this.$outerStage.children(":eq(" + i + ")").addClass("sppb-carousel-extended-item-center")
        },
        dragoverActionToNextItem: function(t) {
            var e = this,
                i = this._currentPosition + parseInt(t);
            i > this._maxL && (i = this._minL - this.itemWidth + parseInt(t)), this._timeoutId2 > 0 && (clearTimeout(this._timeoutId2), this._timeoutId2 = 0), this._timeoutId2 = setTimeout(function() {
                e.$outerStage.css({
                    "-webkit-transition": "all 0s ease 0s",
                    transition: "all 0s ease 0s",
                    "-webkit-transform": "translate3D(-" + i + "px,0px,0px)",
                    transform: "translate3D(-" + i + "px,0px,0px)"
                })
            }, 0)
        },
        dragoverActionToPrevItem: function(t) {
            var e = this,
                i = this._currentPosition - parseInt(t);
            i < this._minL - this.itemWidth && (i = this._maxL - parseInt(t)), this._timeoutId2 > 0 && (clearTimeout(this._timeoutId2), this._timeoutId2 = 0), this._timeoutId2 = setTimeout(function() {
                e.$outerStage.css({
                    "-webkit-transition": "all 0s ease 0s",
                    transition: "all 0s ease 0s",
                    "-webkit-transform": "translate3D(-" + i + "px,0px,0px)",
                    transform: "translate3D(-" + i + "px,0px,0px)"
                })
            }, 0)
        },
        resetCoordiante: function() {
            this.prevCoordinate = {
                x: 0,
                y: 0,
                diff: 0,
                dragPointer: -1
            }, this.coordinate = {
                x: 0,
                y: 0
            }, this.options.autoplay && 0 === this.timer && this.startLoop()
        },
        backToStage: function() {},
        bindEvents: function() {
            var i = this;
            i.options.nav && (i.$nextBtn.on("click." + i._name, function(t) {
                !1 === i.isAnimating && (i.options.autoplay && i.stopLoop(), i.Next(), i.checkCallBackMethod.call(i))
            }), i.$prevBtn.on("click." + i._name, function(t) {
                !1 === i.isAnimating && (i.Prev(), i.options.autoplay && i.stopLoop(), i.checkCallBackMethod.call(i))
            })), i.options.dots && i.$dotContainer.find("li").each(function(e) {
                t(this).on("click." + i._name, function(s) {
                    if (t(this).hasClass("active") || !0 === i.isAnimating) return !1;
                    i.options.autoplay && i.stopLoop();
                    var n = t(this).parent().find("li.active"),
                        o = i.$dotContainer.find("li").index(n) > e ? -1 : 1;
                    i.slideFromPosition(e, o), i.updateDotsFromPosition(e + 1), i.checkCallBackMethod.call(i)
                })
            }), i.$outerStage.on("mousedown." + i._name, t.proxy(i.onDragStart, i)), i.$outerStage.on("mouseup." + i._name + " touchend." + i._name, t.proxy(i.onDragEnd, i)), i.$outerStage.on("touchstart." + i._name, t.proxy(i.onDragStart, i)), i.$outerStage.on("touchcancel." + i._name, t.proxy(i.onDragEnd, i)), t(e).focus(function() {
                i.options.autoplay && 0 === i.timer && i.startLoop()
            }), t(e).blur(function() {
                i.options.autoplay && i.stopLoop()
            }), t(e).on("resize." + i._name, t.proxy(i.windowResize, i))
        },
        windowResize: function(i) {
            void 0 !== i && this.options.responsive && this.windowWidth !== t(e).width() && (clearTimeout(this.resizeTimer), this.resizeTimer = setTimeout(this.onResize.bind(this), this.responsiveRefreshRate))
        },
        onResize: function() {
            this.destroy(), this.init()
        },
        parseResponsiveViewPort: function() {
            var t = this.options.responsive;
            if (void 0 !== t) {
                for (var i = null, s = e.innerWidth, n = 0; n < t.length; n++)
                    if (s > t[n].viewport) {
                        i = t[n];
                        break
                    }
                return null === i && (i = t[t.length - 1]), this.viewPort = i, i
            }
        },
        updateResponsiveView: function() {
            if (void 0 !== this.options.responsive) {
                var t = e.innerHeight,
                    i = this.parseResponsiveViewPort();
                if ("full" === i.height) {
                    if (this.$outerStage.css({
                            height: t + "px"
                        }), this._lastViewPort === t) return;
                    this._lastViewPort = t
                } else {
                    if (this.$outerStage.css({
                            height: i.height + "px"
                        }), this._lastViewPort === i.height) return;
                    this._lastViewPort = i.height
                }
            }
        },
        getPosition: function(t) {
            var i = {
                x: null,
                y: null
            };
            return (t = (t = t.originalEvent || t || e.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
        },
        onDragStart: function(e) {
            if (3 === e.which || 2 === e.which) return !1;
            var s = this,
                n = s.getPosition(e);
            s.coordinate.x = n.x, s.coordinate.y = n.y, t(i).one("mousemove." + s._name + " touchmove." + s._name, t.proxy(function(e) {
                t(i).on("mousemove." + s._name + " touchmove." + s._name, t.proxy(s.onDragMove, s)), e.preventDefault()
            }, this)), s.isDragging = !0
        },
        onDragMove: function(t) {
            var e = this;
            if (!1 !== e.isDragging) {
                e.options.autoplay && e.stopLoop();
                var i = e.getPosition(t),
                    s = e.coordinate;
                if (e.prevCoordinate.x !== i.x) {
                    var n = s.x - i.x,
                        o = (1 * Math.abs(n)).toFixed(0);
                    e.prevCoordinate = {
                        x: i.x,
                        y: i.y,
                        diff: n,
                        dragPointer: o
                    }, n > 0 && e.dragoverActionToNextItem(o), n < 0 && e.dragoverActionToPrevItem(o)
                }
                t.preventDefault()
            }
        },
        onDragEnd: function(t) {
            var e = this;
            if (e.isDragging) {
                var i = e.prevCoordinate.diff;
                Math.abs(i) > 100 ? (i > 0 && e.Next(), i < 0 && e.Prev()) : e.backToStage(), e.isDragging = !1
            }
            e.resetCoordiante()
        },
        checkCallBackMethod: function() {
            this.callback()
        },
        callback: function() {
            var t = this.options.onChange;
            if ("function" == typeof t) {
                var e = this.$element.find(".sppb-carousel-extended-item").length,
                    i = {
                        item: this.item,
                        items: e,
                        element: this.$element
                    };
                t.call(this.element, i)
            }
        }
    }), t.fn.spCarousel = function(e) {
        return this.each(function() {
            t.data(this, n) || t.data(this, n, new o(this, e))
        }), this
    }, t.fn.spCarousel.defaults = {
        items: 4,
        autoplay: !1,
        center: !1,
        centerPadding: 50,
        margin: 10,
        speed: 800,
        interval: 4500,
        onChange: null,
        dots: !0,
        dot_indicator: !1,
        nav: !0,
        nav_text: ["<", ">"]
    }
}(jQuery, window, document),
function(t) {
    t(document).on("ready", function() {
        t(".sppb-carousel-extended").each(function() {
            var e = t(this),
                i = e.data("image-layout"),
                s = e.data("item-number"),
                n = e.data("item-number-sm"),
                o = e.data("item-number-xs"),
                a = e.data("autoplay");
            a = 1 === a;
            var r = e.data("speed"),
                h = e.data("interval"),
                d = e.data("margin"),
                l = !1,
                p = 180,
                c = 90,
                u = 50;
            "layout3" !== i && "layout4" !== i || (l = !0), "layout3" === i && (s = 1, n = 1, o = 1), l && (p = e.data("padding"), c = e.data("padding-sm"), u = e.data("padding-xs")), "layout1" === i && (s = 1, n = 1, o = 1, p = 0, d = 0);
            var m = e.data("height"),
                v = e.data("height-sm"),
                f = e.data("height-xs");
            "" == e.data("testi-layout") || i || (m = "auto", v = "auto", f = "auto");
            var g = e.data("arrow");
            g = 1 === g;
            var x = e.data("dots");
            x = 1 === x;
            var _ = e.data("left-arrow"),
                b = e.data("right-arrow");
            e.spCarousel({
                autoplay: a,
                items: s,
                speed: r,
                interval: h,
                margin: d,
                center: l,
                centerPadding: p,
                dots: x,
                dot_indicator: x,
                nav: g,
                nav_text: ['<i class="fa ' + _ + '" aria-hidden="true"></i>', '<i class="fa ' + b + '" aria-hidden="true"></i>'],
                responsive: [{
                    viewport: 1170,
                    height: m,
                    items: s
                }, {
                    viewport: 767,
                    height: v,
                    items: n,
                    centerPadding: c
                }, {
                    viewport: 320,
                    height: f,
                    items: o,
                    centerPadding: u
                }]
            })
        });
        new MutationObserver(function(e) {
            e.forEach(function(e) {
                var i = e.addedNodes;
                null !== i && t(i).each(function() {
                    t(this).find(".sppb-carousel-extended").each(function() {
                        var e = t(this),
                            i = e.data("image-layout"),
                            s = e.data("item-number"),
                            n = e.data("item-number-sm"),
                            o = e.data("item-number-xs"),
                            a = e.data("autoplay");
                        a = 1 === a;
                        var r = e.data("speed"),
                            h = e.data("interval"),
                            d = e.data("margin"),
                            l = !1;
                        "layout3" !== i && "layout4" !== i || (l = !0);
                        var p = 180,
                            c = 90,
                            u = 50;
                        l && (p = e.data("padding"), c = e.data("padding-sm"), u = e.data("padding-xs")), "layout3" === i && (s = 1, n = 1, o = 1), "layout1" === i && (s = 1, n = 1, o = 1, p = 0, d = 0);
                        var m = e.data("height"),
                            v = e.data("height-sm"),
                            f = e.data("height-xs");
                        "" == e.data("testi-layout") || i || (m = "auto", v = "auto", f = "auto");
                        var g = e.data("arrow");
                        g = 1 === g;
                        var x = e.data("dots");
                        x = 1 === x;
                        var _ = e.data("left-arrow"),
                            b = e.data("right-arrow");
                        e.spCarousel({
                            autoplay: a,
                            items: s,
                            speed: r,
                            interval: h,
                            margin: d,
                            center: l,
                            centerPadding: p,
                            dots: x,
                            dot_indicator: x,
                            nav: g,
                            nav_text: ['<i class="fa ' + _ + '" aria-hidden="true"></i>', '<i class="fa ' + b + '" aria-hidden="true"></i>'],
                            responsive: [{
                                viewport: 1170,
                                height: m,
                                items: s
                            }, {
                                viewport: 767,
                                height: v,
                                items: n,
                                centerPadding: c
                            }, {
                                viewport: 320,
                                height: f,
                                items: o,
                                centerPadding: u
                            }]
                        })
                    })
                })
            })
        }).observe(document.body, {
            childList: !0,
            subtree: !0
        })
    })
}(jQuery);