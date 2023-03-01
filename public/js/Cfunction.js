const CONFIG = {
    SPEED: 2,
    DELAY_ROW_INDEX_LOGIC: 4000,
    RANDOM_ROW_INDEX: 10000,
    MAX_TIME_AUTO_BORN_ZOMBIE: 9000,
    MIN_TIME_AUTO_BORN_ZOMBIE: 2000,
    TIME_HIDE_HONORS: 3000,
}
let autoZombieRowIndex = 1;
let currentRowIndex = 1;

let timeoutAutoBornZombie;

let leaderBoard = [];
let topLeaderBoard = [];

const compareScore = (a, b) => {
    if (a.score < b.score) {
        return 1;
    } else return -1;
}

//6 dòng
const arrLocationCell = [
    [175, 187],
    [270, 187],
    [380, 187],
    [470, 187],
    [575, 187],
    [175, 267],
    [270, 267],
    [380, 267],
    [470, 267],
    [575, 267],
    [175, 347],
    [270, 347],
    [380, 347],
    [470, 347],
    [575, 347],
    [175, 427],
    [270, 427],
    [380, 427],
    [470, 427],
    [575, 427],
    [175, 507],
    [270, 507],
    [380, 507],
    [470, 507],
    [575, 507],
    [175, 587],
    [270, 587],
    [380, 587],
    [470, 587],
    [575, 587],
];
const arrIndexCell = [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
    [5, 4],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
    [1, 6],
    [2, 6],
    [3, 6],
    [4, 6],
    [5, 6]
];
const arrPositionMouseOnCell = [
    [182, 138],
    [179, 234],
    [180, 333],
    [180, 425],
    [175, 521],
    [259, 130],
    [255, 237],
    [257, 337],
    [259, 433],
    [257, 533],
    [338, 134],
    [334, 237],
    [341, 335],
    [341, 436],
    [339, 533],
    [423, 137],
    [416, 227],
    [427, 332],
    [426, 434],
    [424, 528],
    [505, 126],
    [497, 229],
    [500, 328],
    [503, 443],
    [496, 523],
    [586, 134],
    [588, 227],
    [587, 331],
    [584, 425],
    [580, 528]
]

const $User = function () {
    var a = navigator.platform, e = navigator.userAgent, c = (a == "Win32" || a == "Windows"),
        d = (a == "Mac68K" || a == "MacPPC" || a == "Macintosh"), b = (a == "X11" && !c && !d), g = c || d || b,
        f = "pvz.lonelystar.org";
    return {
        Browser: {
            IE: !!(window.attachEvent && !window.opera),
            IE6: !!(window.attachEvent && !window.opera) && !window.XMLHttpRequest,
            Opera: !!window.opera,
            WebKit: e.indexOf("AppleWebKit/") > -1,
            Gecko: e.indexOf("Gecko") > -1 && e.indexOf("KHTML") == -1
        },
        System: {Win: c, Mac: d, Unix: b},
        Client: {PC: g, Mobile: !g},
        HTTP: location.protocol.toLowerCase() == "http:" ? 1 : 0,
        AuthorWebsite: f,
        isAuthorWebsite: location.hostname === f
    }
}();


const oSym = {
        Init: function (b, a) {
            this.Now = 0;
            this.Timer = null;
            this.execTask = null;
            this.TQ = [{T: 0, f: b, ar: a || []}];
            this.TimeStep = 10;
            this.Start()
        }, Clear: function () {
            this.TQ.length = 0
        }, Start: function () {
            (function () {
                try {
                    ++oSym.Now
                } catch (a) {
                    alert("Hết thời gian thoát khỏi trò chơi");
                    location.reload()
                }
                oSym.Timer = setTimeout(arguments.callee, oSym.TimeStep)
            })();
            (function () {
                var d = oSym, a = d.TQ, c = a.length, b, e;
                while (c--) {
                    d.Now >= (b = a[c]).T && ((e = b.f).apply(e, b.ar), d.removeTask(c))
                }
                d.execTask = setTimeout(arguments.callee, oSym.TimeStep)
            })()
        }, Stop: function () {
            clearTimeout(this.Timer);
            clearTimeout(this.execTask);
            this.Timer = null
        }, addTask: function (b, c, a) {
            var d = this.TQ;
            d[d.length] = {T: this.Now + b, f: c, ar: a};
            return this
        }, removeTask: function (a) {
            this.TQ.splice(a, 1);
            return this
        }
    },
    ShadowPNG = "images/plantshadow" + ($User.Browser.IE6 ? (document.execCommand("BackgroundImageCache", false, true), "8.gif") : "32.png"),
    innerText = (function () {
        return $User.Browser.IE ? ($Random = "?", function (b, a) {
            b.innerHTML = a
        }) : ($Random = "#", function (b, a) {
            b.innerHTML = a;
        })
    })();

const oS = {
    W: 900,
    H: 600,
    C: 9,
    LawnMowerX: 70,
    Lvl: 0,
    GlobalVariables: {},
    LvlVariables: {},
    SelfVariables: [],
    LvlClearFunc: null,
    Init: function (e, g, b, d) {
        var c, a = window;
        if (b != d) {
            for (c in b) {
                a[c] != d ? (this.GlobalVariables[c] = a[c], a[c] = b[c]) : this.LvlVariables[c] = a[c] = b[c]
            }
        }
        ArCard = [];
        ArPCard = [];
        ArSun = [];
        $Pn = [];
        $Z = [];
        $P = [];
        EDAll = $CFun("dAll");
        EDNewAll = EDAll.cloneNode(true);
        EDNewFlagMeter = $CFun("dFlagMeter").cloneNode(true);
        ESSunNum = $CFun("sSunNum");
        this.LoadAccess = null;
        this.InitLawnMower = null;
        this.StartGame = null;
        this.ChoseCard = this.MPID = "";
        this.PicNum = this.AccessNum = this.MCID = this.Chose = 0;
        this.Monitor = null;
        this.UserDefinedFlagFunc = null;
        for (c in e) {
            this.SelfVariables.push(c);
            this[c] = e[c]
        }
        !this.PicArr && (this.PicArr = []);
        !this.PName && (this.PName = []);
        !this.ZName && (this.ZName = []);
        !this.backgroundImage && (this.backgroundImage = "images/interface/background1.jpg");
        !this.LF && (this.LF = [0, 1, 1, 1, 1, 1]);
        !this.ZF && (this.ZF = this.LF);
        !this.LargeWaveFlag && (this.LargeWaveFlag = {});
        !this.StartGameMusic && (this.StartGameMusic = "UraniwaNi.swf");
        this.ArCard = this.CardKind == d ? e.PName : e.ZName;
        this.SunNum == d && (this.SunNum = 50);
        this.CanSelectCard == d && (this.CanSelectCard = 1);
        this.DKind == d && (this.DKind = 1);
        this.StaticCard == d && (this.StaticCard = 1);
        this.ShowScroll == d && (this.ShowScroll = true);
        this.ProduceSun == d && (this.ProduceSun = true);
        (this.Coord || function () {
            oS.R = 5;
            ChosePlantX = function (f) {
                return Compare(GetC(f), 1, oS.C, GetX)
            };
            ChosePlantY = function (f) {
                return $SSml(f, [86, 181, 281, 386, 476], [[75, 0], [175, 1], [270, 2], [380, 3], [470, 4], [575, 5]])
            };
            GetC = function (f) {
                return $SSml(f, [-50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
            };
            GetR = function (f) {
                return $SSml(f, [86, 181, 281, 386, 476], [0, 1, 2, 3, 4, 5])
            };
            GetX = function (f) {
                return $SEql(f, {
                    "-2": -50,
                    "-1": 100,
                    0: 140,
                    1: 187,
                    2: 267,
                    3: 347,
                    4: 427,
                    5: 507,
                    6: 587,
                    7: 667,
                    8: 747,
                    9: 827,
                    10: 865,
                    11: 950
                })
            };
            GetY = function (f) {
                return $SEql(f, {0: 75, 1: 175, 2: 270, 3: 380, 4: 470, 5: 575})
            };
            GetY1Y2 = function (f) {
                return $SEql(f, {
                    0: [0, 85],
                    1: [86, 180],
                    2: [181, 280],
                    3: [281, 385],
                    4: [386, 475],
                    5: [476, 600]
                })
            };
            GetX1X2 = function (f) {
                return $SEql(f, {
                    "-2": [-100, -49],
                    "-1": [-50, 99],
                    0: [100, 139],
                    1: [140, 219],
                    2: [220, 294],
                    3: [295, 378],
                    4: [379, 459],
                    5: [460, 539],
                    6: [540, 624],
                    7: [625, 694],
                    8: [695, 774],
                    9: [775, 854],
                    10: [855, 934],
                    11: [950, 1030]
                })
            };
            !oS.InitLawnMower && (oS.InitLawnMower = function () {
                var f = 6;
                while (--f) {
                    CustomSpecial(oLawnCleaner, f, -1)
                }
            })
        })();

        g && oP.Init(g);
        oT.Init(this.R);
        oZ.Init(this.R);
        oGd.Init();
        this.LoadMusic();
        this.LoadProgress()
    },
    LoadProgress: function (r, l, a) {
        SetVisible($CFun("dFlagMeter"));
        SetHidden($CFun("imgGQJC"));
        var p = oS, j = [], i = p.PicArr, k = p.PName, s = p.ZName, u = 0,
            d = document.createTextNode("Đang tải。。。"),
            t = GetX(11), g = oGd.$LF, b = oGd.$ZF, c = oS.R + 1, e = p.LoadImage, h = p.CheckImg, f = p.InitPn, m,
            q;
        // innerText($("sFlagMeterTitleF"), d.data);
        // $("dFlagMeterTitleB").insertBefore(d, $("sFlagMeterTitleF"));
        u += (r = k.length);
        NewImg(0, "images/brain.png", "", $Pn.oBrains = NewEle(0, "div", "position:absolute"));
        NewImg(0, "images/LawnCleaner.png", "", $Pn.oLawnCleaner = NewEle(0, "div", "position:absolute"));
        while (r--) {
            a = (l = k[r].prototype).PicArr.slice(0);
            j[j.length] = [l.EName, a[l.NormalGif], l.getShadow(l)];
            a.splice(l.NormalGif, 1);
            Array.prototype.push.apply(i, a)
        }
        for (r in oS.LargeWaveFlag) {
            s[s.length] = oFlagZombie;
            break
        }
        r = s.length;
        while (r--) {
            Array.prototype.push.apply(i, (l = (q = s[r]).prototype).PicArr.slice(0));
            l.Init.call(q, t, l, b, c)
        }
        p.PicNum = u += i.length;
        r = i.length;
        while (r--) {
            e(i[r], h)
        }
        r = j.length;
        while (r--) {
            e((m = j[r])[1], f, m)
        }
    },
    InitPn: function (a) {
        var b = $Pn[a[0]] = NewEle(0, "div", "position:absolute");
        NewImg(0, ShadowPNG, a[2], b);
        NewImg(0, a[1], "", b);
        oS.CheckImg()
    },
    LoadImage: $User.Browser.IE ? function (b, d, c) {
        var a = new Image();
        a.onreadystatechange = function () {
            a.readyState == "complete" && d(c)
        };
        a.onerror = function () {
            a.onreadystatechange = null;
            a.title = b;
            d(c)
        };
        a.src = b
    } : function (b, d, c) {
        var a = new Image();
        a.src = b;
        a.complete ? d(c) : (a.onload = function () {
            a.complete && d(c)
        }, a.onerror = function () {
            a.title = b;
            d(c)
        })
    },
    CheckImg: function (b, a) {
        var c = oS;
        if (c.AccessNum > c.PicNum) {
            return
        }
        b = 139 - c.AccessNum++ * 140 / c.PicNum - 11;
        $CFun("imgFlagHead").style.left = b + "px";
        a = "Tải:(" + c.AccessNum + "/" + c.PicNum + ")";
        // innerText($("sFlagMeterTitleF"), a);
        $CFun("dFlagMeterTitleB").firstChild.data = a;
        $CFun("imgFlagMeterFull").style.clip = "rect(0,auto,21px," + (b + 11) + "px)";
        if (c.AccessNum == c.PicNum) {
            SetHidden($CFun("dFlagMeterContent"), $CFun("dFlagMeter"));
            SetStyle($CFun("dFlagMeter"), {left: "260px", top: "560px"});
            // innerText($("sFlagMeterTitleF"), $("dFlagMeterTitleB").firstChild.data = c.LevelName);
            $CFun("imgFlagHead").style.left = "139px";
            $CFun("imgFlagMeterFull").style.clip = "rect(0,auto,auto,157px)";
            (oS.AutoSun = $User.Client.PC && $User.HTTP ? Math.floor(getCookie("JSPVZAutoSun")) : 1) && ($CFun("cAutoSun").checked = true);
            delete c.PicArr;
            delete c.Coord;
            delete c.LF;
            delete c.ZF;
            (c.LoadAccess || function () {
                NewImg("imgGrowSoil", "images/interface/GrowSoil.png", "display:none;z-index:50", EDAll);
                NewEle("dTitle", "div", 0, 0, EDAll);
                innerText(ESSunNum, c.SunNum);
                SetStyle($CFun("tGround"), {background: "url(" + c.backgroundImage + ") no-repeat", display: "block"});
                // InitPCard();
                // c.ShowScroll ? oSym.addTask(100, function () {
                //     var d = EDAll.scrollLeft += 25;
                //     d < 320 ? oSym.addTask(2, arguments.callee, []) : (DisplayZombie(), oS.CanSelectCard ? (SetBlock($("dSelectCard")), SetVisible($("dCardList"))) : (AutoSelectCard(), oSym.addTask(200, LetsGO, [])))
                // }, []) : (AutoSelectCard(), LetsGO())
                LetsGO()
            })()
        }
    }
};


const oP = {
    Init: function (b) {
        var a;
        this.NumZombies = 0;
        this.FlagZombies = 0;
        for (a in b) {
            this[a] = b[a]
        }
        oP.FlagNum && (this.LAr = this.ArZ.length, this.FlagHeadStep = Math.floor(140 / (b.FlagNum - 1)));
        !b.FlagToEnd && (oP.FlagToEnd = function () {
            NewImg("imgSF", "images/interface/trophy.png", "left:417px;top:233px", EDAll, {
                onclick: function () {
                    SelectModal(0)
                }
            })
        })
    }, SelectFlagZombie: function (d) {
        var h = oP, c = [], a = 0, g = h.ArZ, f = oS.LargeWaveFlag[h.FlagZombies], e = h.SumToZombie,
            b = !f ? 150 : (f.style.top = "5px", --d, c[a++] = oFlagZombie, 30);
        while (d > 0) {
            d -= (c[a++] = g[Math.floor(Math.random() * $SEql(d, e))]).prototype.Lvl
        }
        h.NumZombies += a;
        h.SetTimeoutZombie(c, b)
    }, SetTimeoutTomZombie: function (c) {
        var f = [], d = [], e = 0, a = c.length, h = oGd.$Tombstones, b, g;
        for (b in h) {
            g = b.split("_");
            d[e] = (f[e] = new c[Math.floor(Math.random() * a)]).CustomBirth(g[0], g[1], 100);
            ++e
        }
        oP.NumZombies += e;
        asyncInnerHTML(d.join(""), function (n, l) {
            EDAll.appendChild(n);
            var k = l.length, m, j;
            while (k--) {
                m = l[k];
                oSym.addTask(10, function (r, q, i, p) {
                    q = Math.max(q - p, 0);
                    SetStyle(r, {top: q + "px", clip: "rect(0,auto," + (i += p) + "px,0)"});
                    q && oSym.addTask(10, arguments.callee, [r, q, i, p])
                }, [$CFun(m.id).childNodes[1], j = m.height, 0, j * 0.1]);
                m.Birth()
            }
        }, f)
    }, SetTimeoutZombie: function (b, d) {
        console.log(b, "b")
        console.log(d, "d")
        var f = [], c = [], e = delayT = 0, a = b.length;
        while (e < a) {
            c[e] = (f[e] = new b[e]).prepareBirth(delayT);
            delayT += d;
            ++e
        }
        asyncInnerHTML(c.join(""), function (j, h) {
            EDAll.appendChild(j);
            var g = h.length;
            while (g--) {
                h[g].Birth()
            }
        }, f)
    }, AddZombiesFlag: function (d) {
        var g = oP, c = oS.LargeWaveFlag, e, b = g.FlagHeadStep, a = g.FlagNum;
        SetVisible($CFun("imgGQJC"), $CFun("dFlagMeterContent"));
        for (e in c) {
            Math.floor(e) < a ? SetStyle(c[e], {
                display: "block",
                left: (150 - (e - 1) * b) + "px"
            }) : SetBlock(c[e])
        }
        g.ReadyFlag = 1;
        g.FlagPrgs(d)
    }, FlagPrgs: function () {
        var f = oP, c = f.FlagZombies, e = f.FlagToSumNum, a = 139 - c * f.FlagHeadStep, d = $SSml(c, e.a1, e.a2),
            b;
        f.FlagNum > (c = ++f.FlagZombies) ? ($CFun("imgFlagHead").style.left = a + "px", $CFun("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + (a + 11) + "px)", (b = $SEql(c, f.FlagToMonitor)) && oSym.addTask(1690, function (g) {
            !g[1] && (g[0](), g[1] = 1)
        }, [b]), oSym.addTask(2490, function (g) {
            var h = oP;
            h.ReadyFlag == g++ && (h.ReadyFlag = g, h.FlagPrgs())
        }, [c])) : ($CFun("imgFlagHead").style.left = "-1px", $CFun("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)");
        f.SelectFlagZombie.call(f, d);
        f.UserDefinedFlagFunc && f.UserDefinedFlagFunc()
    }, MonPrgs: function () {
        var c = oP, b, a = c.FlagZombies;
        !--c.NumZombies && (a < c.FlagNum ? ((b = $SEql(a, c.FlagToMonitor)) && (b[0](), b[1] = 1), c.ReadyFlag = ++a, oSym.addTask(500, c.FlagPrgs, [])) : (c.FlagToEnd(), oSym.Stop()))
    }, Monitor: function (a, b) {
        a && a.f.apply(a.f, a.ar);
        b && (oP.UserDefinedFlagFunc = b);
        (function () {
            oZ.traversalOf();
            oSym.addTask(10, arguments.callee, [])
        })()
    }
};


const oGd = {
    Init: function () {
        this.$ = [];
        this.$Crater = [];
        this.$Tombstones = [];
        this.$Torch = [];
        this.$LF = oS.LF;
        this.$ZF = oS.ZF;
        this.$B = []
    }, add: function (c, a, b, d) {
        (b = (d = this.$)[a]) && b.Die();
        d[a] = c
    }, del: function (a) {
        delete this.$[a.R + "_" + a.C + "_" + a.PKind]
    }, MoveBullet: function () {
        var d = oGd.$B, a = d.length, c, b = oGd.$Torch;
        while (a--) {
            (c = d[a]).F(c, a, d, b)
        }
        oSym.addTask(1, arguments.callee, [])
    }, MB1: function (e, j, m, f) {
        var d = e.id, k = $CFun(d), h = e.Attack, a = e.D, p, q = e.X, c = GetC(q), g = e.R, n = e.Kind, l = e.ChangeC,
            b = oZ.getZ(q, g, a);
        n < 1 && f[g + "_" + c] && l != c && ((e.Kind = ++n) && (h = e.Attack = 40), e.ChangeC = c, k.src = "images/Plants/PB" + n + a + ".gif");
        b && b.Altitude == 1 ? (b.getHurt(-1, a, h, n, 0, 0, 0), m.splice(j, 1), (SetStyle(k, {left: e.pixelLeft + 28 + "px"})).src = "images/Plants/PeaBulletHit.gif", oSym.addTask(10, ClearChild, [k])) : (e.X += (p = !a ? 5 : -5)) < oS.W && e.X > 100 ? k.style.left = (e.pixelLeft += p) + "px" : (m.splice(j, 1), ClearChild(k))
    }, MB2: function (d, g, h) {
        var c = d.id, j = d.X, a = GetC(j), f = d.R, b = oZ.getZ(j, f, 0), e = $CFun(c);
        b && b.Altitude == 1 ? (b.getHurt(-1, 0, 20, 0, 0, 0, 0), h.splice(g, 1), (SetStyle(e, {left: d.pixelLeft + 38 + "px"})).src = "images/Plants/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [e])) : (d.X += 5) < oS.W ? e.style.left = (d.pixelLeft += 5) + "px" : (h.splice(g, 1), ClearChild(e))
    }, MB3: function (g, d, a) {
        var h = g.id, b = $CFun(h), f = oZ.getZ(g.X, g.R, 0), e = g.D, c = g.pixelTop;
        if (f && f.Altitude == 1) {
            f.getHurt(-1, 0, 20, 0, 0, 0, 0);
            a.splice(d, 1);
            ClearChild(b)
        } else {
            switch (g.D) {
                case 4:
                    (g.X -= 5) < 100 ? (a.splice(d, 1), ClearChild(b)) : b.style.left = (g.pixelLeft -= 5) + "px";
                    break;
                case 6:
                    (c = g.pixelTop -= 5) < -15 ? (a.splice(d, 1), ClearChild(b)) : (b.style.top = c + "px", g.R = GetR(c + 15));
                    break;
                case 2:
                    (c = g.pixelTop += 5) > 600 ? (a.splice(d, 1), ClearChild(b)) : (b.style.top = c + "px", g.R = GetR(c + 15));
                    break;
                case 7:
                    (g.X += 4.3) > 900 || (c = g.pixelTop -= 5) < -15 ? (a.splice(d, 1), ClearChild(b)) : (g.R = GetR(c + 15), b.style.left = (g.pixelLeft += 9.6) + "px", b.style.top = c + "px");
                    break;
                case 1:
                    (g.X += 4.3) > 900 || (c = g.pixelTop += 5) > 600 ? (a.splice(d, 1), ClearChild(b)) : (g.R = GetR(c + 15), b.style.left = (g.pixelLeft += 9.6) + "px", b.style.top = c + "px")
            }
        }
    }
};


const oZ = {
    Init: function (b) {
        this.$ = [];
        this.$R = [];
        var a;
        for (a = b; a; this.$[a] = [], this.$R[a--] = []) {
        }
    }, add: function (b, a) {
        (a = this.$[b.R]).push(b);
        a.sort(function (d, c) {
            return d.AttackedLX - c.AttackedLX
        });
        a.RefreshTime = oSym.Now
    }, getZ: function (k, b, g) {
        var e = 0, m = this.$[b], h = this.$R[b], j, c, l, f;
        if (!g) {
            f = (j = m).length;
            while (e < f && (c = j[e++]).AttackedLX <= k) {
                if (c.HP && c.AttackedRX >= k) {
                    return c
                }
            }
        } else {
            (l = m.RefreshTime) == h.RefreshTime ? j = h : (j = (this.$R[b] = m.slice(0)).sort(function (i, d) {
                return d.AttackedRX - i.AttackedRX
            })).RefreshTime = l;
            f = j.length;
            while (e < f && (c = j[e++]).AttackedRX >= k) {
                if (c.HP && c.AttackedLX <= k) {
                    return c
                }
            }
        }
        return
    }, getArZ: function (e, d, b) {
        var g = 0, l = this.$[b], f = [], k = 0, c, h = l.length, j;
        while (g < h && (j = (c = l[g++]).AttackedLX) < d) {
            c.HP && (j > e || c.AttackedRX > e) && (f[k++] = c)
        }
        return f
    }, moveTo: function (g, f, c) {
        var b = this.$[f], a = this.$[c], e = b.length, d;
        while (e--) {
            (o = b[e]).id == g && (b.splice(e, 1), o.R = c, a.push(o), (a.sort(function (i, h) {
                return i.AttackedLX - h.AttackedLX
            })).RefreshTime = b.RefreshTime = oSym.Now, e = 0)
        }
    }, traversalOf: function () {
        var c, a, e = this.$, i, k = Refresh = 0, j = 1000, h, g, b = function (m) {
            (h = m.AttackedLX) > j && (k = Refresh = 1);
            j = h
        }, d = function (m) {
            Refresh = 1;
            j = h
        }, f = e.length, l;
        (function (p) {
            var n = (i = e[p]).length, m = arguments.callee;
            while (n--) {
                c = i[n];
                c.HP && c.ZX < 901 && oT.check(c);
                !c.HP ? (i.splice(n, 1), d(c)) : !(c.FreeFreezeTime || c.FreeSetbodyTime) ? (c.beAttacked && !c.isAttacking && c.JudgeAttack(), g = c.id, !c.isAttacking ? (a = c.Speed * CONFIG.SPEED, !c.WalkDirection ? ((l = c.AttackedRX -= a) < 0 ? (i.splice(n, 1), c.Die(2), d(c)) : (l < 100 && !c.PointZombie && (c.PointZombie = 1, c.ChangeR({
                    R: p,
                    ar: [oS.R - 1],
                    CustomTop: 400 - c.height + c.GetDY()
                })), c.ZX = c.AttackedLX -= a, $CFun(g).style.left = Math.floor(c.X -= a) + "px", b(c))) : (c.AttackedLX += a) > oS.W ? (i.splice(n, 1), c.Die(2), d(c)) : (c.ZX = c.AttackedRX += a, $CFun(g).style.left = Math.ceil(c.X += a) + "px", b(c))) : b(c)) : b(c)
            }
            k ? (k = 0, i.sort(function (r, q) {
                return r.AttackedLX - q.AttackedLX
            }), i.RefreshTime = oSym.Now) : Refresh && (i.RefreshTime = oSym.Now);
            --p && oSym.addTask(0, m, [p])
        })(e.length - 1)
    }
};


const oT = {
    Init: function (b) {
        this.$ = [];
        this.$L = [];
        for (var a = b; a;) {
            this.$[a] = [];
            this.$L[a--] = []
        }
    }, add: function (f, c, g) {
        var e = this.$[f], d = c.length, b;
        while (d--) {
            b = c[d];
            e.push([b[0], b[1], b[2], g])
        }
        e.sort(function (i, h) {
            return h[1] - i[1]
        });
        e.RefreshTime = new Date
    }, check: function (b, l, k, e, a, j, c) {
        var h = b.AttackedLX, f = b.AttackedRX, d = 0, g = this.$[c = b.R];
        if (!b.WalkDirection) {
            while (d < g.length && (e = g[d])[1] >= h) {
                (a = $P[e[3]]).canTrigger && e[0] <= h && a.TriggerCheck(b, e[2], d);
                ++d
            }
        } else {
            (k = g.RefreshTime) == (j = this.$L[c]).RefreshTime ? l = j : (l = (this.$L[c] = g.slice(0)).sort(function (m, i) {
                return m[0] - i[0]
            })).RefreshTime = k;
            while (d < l.length && (e = l[d])[0] <= f) {
                (a = $P[e[3]]).canTrigger && e[1] >= f && a.TriggerCheck(b, e[2], d);
                ++d
            }
        }
    }, delP: function (e) {
        var b = e.oTrigger, f = e.id, d, a, c;
        for (d in b) {
            for (c = (a = this.$[d]).length; c--; a[c][3] == f && a.splice(c, 1)) {
            }
            a.RefreshTime = new Date
        }
    }, indexOf: function (j, d) {
        var f = new RegExp(d + ",", "g"), h = (j.toString() + ",").replace(f, "┢,").replace(/[^,┢]/g, ""), i = 0,
            g = 0,
            b = [];
        for (; (g = h.indexOf("┢", g)) > 0; b.push((g++ - i++ - 2) / 3)) {
        }
        return b
    }
};


const asyncInnerHTML = function (d, c, a) {
    var b = $n("div"), e = document.createDocumentFragment();
    b.innerHTML = d;
    (function (g) {
        var f = arguments.callee;
        g-- ? (e.appendChild(b.firstChild), setTimeout(function () {
            f(g)
        }, 0)) : c(e, a)
    })(b.childNodes.length)
};


const WhichMouseButton = function (a) {
    a = window.event || a;
    var b = $User.Browser;
    return !b.Gecko ? $SEql(a.button, {1: 1, 0: b.IE ? 2 : 1, 2: 2, "default": 1}) : $SEql(a.which, {
        1: 1,
        3: 2,
        "default": 1
    })
};


const GroundOnmousedown = function (i) {
    i = window.event || i;
    var a = i.clientX + document.documentElement.scrollLeft, k = i.clientY + document.documentElement.scrollTop,
        g = ChosePlantX(a), h = ChosePlantY(k), d = g[0], c = h[0], f = h[1], b = g[1], j = GetAP(a, k, f, b);
    switch (oS.Chose) {
        case 1:
            WhichMouseButton(i) < 2 ? GrowPlant(j[0], d, c, f, b) : CancelPlant();
            break;
        case -1:
            WhichMouseButton(i) < 2 ? ShovelPlant(j) : CancelShovel()
    }
};


const GetAP = function (mouseLocationX, mouseLocationY, numOfRow, numOfColumn) {
    var f, e, g = [], currentPlant;
    // console.log(oGd,"oGd")
    for (f = 0; f < 4; g.push(e = oGd.$[numOfRow + "_" + numOfColumn + "_" + f++]), e && !(mouseLocationX < e.pixelLeft || mouseLocationX > e.pixelRight || mouseLocationY < e.pixelTop || mouseLocationY > e.pixelBottom) && (currentPlant = e)) {
    }
    return [g, currentPlant]
};


const GroundOnkeydown = function (b) {
    var a;
    if ((a = (b || event).keyCode) == 27) {
        switch (oS.Chose) {
            case 1:
                CancelPlant();
                break;
            case -1:
                CancelShovel()
        }
        return false
    } else {
        !oS.Chose && KeyBoardGrowPlant(a)
    }
};


const KeyBoardGrowPlant = function (b, a) {
    a = a || 0;
    if (b > 47 && b < 58) {
        switch (a) {
            case 0:
                ChosePlant({clientX: 450, clientY: 300}, String.fromCharCode(b))
        }
    }
};


const GroundOnmousemove = function (k) {
    k = window.event || k;
    var d = k.clientX + document.documentElement.scrollLeft, b = k.clientY + document.documentElement.scrollTop,
        m = oS.ChoseCard, h = ChosePlantX(d), i = ChosePlantY(b), f = h[0], c = i[0], g = i[1], a = h[1],
        p = GetAP(d, b, g, a);
    switch (oS.Chose) {
        case 1:
            var n = ArCard[m].PName.prototype;
            SetStyle($CFun("MovePlant"), {left: d - n.width * 0.5 + "px", top: b + 20 - n.height + "px"});
            n.CanGrow(p[0], g, a) ? SetStyle($CFun("MovePlantAlpha"), {
                display: "block",
                left: f + n.GetDX() + "px",
                top: c - n.height + n.GetDY(g, a, p[0]) + "px"
            }) : SetNone($CFun("MovePlantAlpha"));
            break;
        case -1:
            var j = p[1], l = j ? j.id : "", q = oS.MPID;
            q != l && (q && SetAlpha($CFun(q).childNodes[1], 100, 1), (oS.MPID = l) && SetAlpha($CFun(l).childNodes[1], 60, 0.6));
            SetStyle($CFun("tShovel"), {left: d - 15 + "px", top: b - 16 + "px"})
    }
};


const ViewProducePlant = function (b) {
    var a = b.prototype;
    $CFun("pHandBookPlant").src = a.PicArr[a.NormalGif];
    $CFun("tdProducePlant").innerHTML = a.Produce;
    innerText($CFun("tdHandBookPlantName"), a.CName);
    innerText($CFun("spSunNum"), a.SunNum);
    innerText($CFun("spCoolTime"), a.coolTime + "秒")
};


const ViewProduceZombie = function (b) {
    var a = b.prototype;
    $CFun("pHandBookZombie").src = a.PicArr[a.NormalGif];
    $CFun("tdProduceZombie").innerHTML = a.Produce;
    innerText($CFun("tdHandBookZombieName"), a.CName)
};


const DisplayZombie = function () {
    var c = oP.ArZ.slice(0), b = l2 = c.length, f, g = $CFun("dZombie"), e = [], d = [], a;
    while (b--) {
        e.push(Math.floor(150 + Math.random() * 444))
    }
    e.sort(function (i, h) {
        return i - h
    });
    while (l2) {
        f = c[a = Math.floor(Math.random() * l2)].prototype;
        c.splice(a, 1);
        d[l2--] = f.getHTML("", Math.floor(50 + Math.random() * 201) - f.width * 0.5, e[l2] - f.height, 1, "visibility", "auto", 0)
    }
    asyncInnerHTML(d.join(""), function (h) {
        g.appendChild(h)
    })
};


const AutoSelectCard = function () {
    var c = oS.ArCard, b = -1, a = c.length;
    while (++b < a) {
        SelectCard(c[b].prototype.EName)
    }
};


const InitPCard = function () {
    var d = "", f, e = oS.ArCard, a = e.length, b = 0, c;
    while (b < a) {
        f = e[b];
        c = f.prototype;
        ArPCard[EName = c.EName] = {Select: 0, PName: f};
        d += '<div class="span1" id="Card' + EName + '" onmouseout="SetNone($CFun(\'dTitle\'))" onmousemove="ViewCardTitle(\'' + EName + "',event)\" onclick=\"SelectCard('" + EName + '\')"><img src="' + c.PicArr[c.CardGif + 1] + '"><img src="' + c.PicArr[c.CardGif] + '"><span class="span2">' + c.SunNum + "</span></div>";
        b++ % 6 == 5 && (d += "<br>")
    }
    $CFun("dPCard").innerHTML = d
};


const ViewCardTitle = function (b, c) {
    c = c || window.event;
    var f = $CFun("dTitle"), a = ArPCard[b].PName.prototype;
    f.innerHTML = a.CName + "<br>冷却时间:" + a.coolTime + "秒<br>" + a.Tooltip;
    SetStyle(f, {left: c.clientX + EDAll.scrollLeft - 3 + "px", top: c.clientY + 18 + "px", display: "block"})
};


const SelectCard = function (e) {
    var i = $CFun("Card" + e).childNodes, g = i[1], c = i[0], b = ArPCard[e], j = b.PName.prototype, h, a, k,
        f = $CFun("btnOK");
    if (!b.Select) {
        if (!(ArPCard.SelNum |= 0)) {
            f.disabled = "";
            f.style.color = "#FC6"
        } else {
            if (ArPCard.SelNum > 9) {
                return
            }
        }
        ++ArPCard.SelNum;
        b.Select = 1;
        oS.StaticCard && (h = NewEle("dCard" + e, "div", 0, {
            onclick: function () {
                SelectCard(e)
            }
        }, $CFun("dCardList")), NewImg(0, c.src, 0, h), NewImg(0, g.src, 0, h), innerText(NewEle("sSunNum" + e, "span", 0, 0, h), j.SunNum), SetNone(g))
    } else {
        b.Select = 0;
        !--ArPCard.SelNum && (f.disabled = "disabled", f.style.color = "#888");
        (h = $CFun("dCard" + e)).onclick = null;
        ClearChild(h.firstChild, h.childNodes[1], h.lastChild, h);
        SetBlock(g)
    }
};


const ResetSelectCard = function () {
    var b, a = $CFun("btnOK");
    for (b in ArPCard) {
        ArPCard[b].Select && SelectCard(b)
    }
    a.disabled = "disalbed";
    a.style.color = "#888"
};


const LetsGO = function () {
    var b = $CFun("dZombie"), f = $CFun("dCardList"), h = 0, l = f.childNodes.length, g, j, m, e, k, a, c = $CFun("dAll");
    while (b.hasChildNodes()) {
        b.removeChild(k = b.lastChild);
        k = null
    }
    SetNone(b, $CFun("dSelectCard"));
    $CFun("tGround").style.left = "-115px";
    EDAll.scrollLeft = 0;
    // SetStyle($("dTop"), {left: "105px", top: 0});
    f.style.left = 0;
    while (h < l) {
        (function (d) {
            g = (k = f.childNodes[d]).id.substr(5);
            m = (j = ArPCard[g].PName).prototype;
            k.onclick = function (i) {
                ChosePlant(i, d)
            };
            k.onmouseover = function () {
                SetBlock($CFun("dTitle"));
                ViewPlantTitle(oS.MCID = d)
            };
            k.onmouseout = function () {
                SetNone($CFun("dTitle"))
            };
            (a = k.lastChild).id = "sSunNum" + d;
            innerText(a, m.SunNum);
            SetNone(k.childNodes[1]);
            ArCard.push({DID: k.id, CDReady: 0, SunReady: 0, PName: j})
        })(h++)
    }
    c.onkeydown = function (d) {
        GroundOnkeydown(d)
    };
    c.onmousedown = function (d) {
        GroundOnmousedown(d)
    };
    c.onmousemove = function (d) {
        GroundOnmousemove(d)
    };
    SetVisible(f);
    !oS.BrainsNum && CustomSpecial(oBrains, oS.R - 1, -2);
    oGd.MoveBullet();
    (oS.StartGame || function () {
        ClearChild($CFun("oEmbed"));
        NewEle("oEmbed", "embed", "width:0;height:0", {src: "music/" + oS.StartGameMusic}, EDAll);
        SetVisible($CFun("tdShovel"), $CFun("dFlagMeter"));
        // SetBlock($("dTop"));
        oS.InitLawnMower();
        PrepareGrowPlants(function () {
            oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
            BeginCool();
            oS.DKind && AutoProduceSun(25);
            oSym.addTask(1500, function () {
                oP.AddZombiesFlag();
                SetVisible($CFun("dFlagMeterContent"))
            }, [])
        })
    })()
};


const ViewPlantTitle = function (b) {
    var f = $CFun("dTitle"), e = ArCard[b], c = e.PName.prototype, a = c.CName;
    !oS.CardKind && (a += "<br>Thời gian chờ:" + c.coolTime + "giây<br>" + c.Tooltip, !e.CDReady && (a += '<br><span style="color:#F00">Đang được nạp...</span>'));
    !e.SunReady && (a += '<br><span style="color:#F00">Không đủ ánh sáng!</span>');
    f.innerHTML = a;
    SetStyle(f, {top: 60 * b + "px", left: "100px"})
};


const BeginCool = function () {
    var b = ArCard.length, c, d, a, e;
    while (b--) {
        a = (c = (d = ArCard[b]).PName.prototype).coolTime;
        e = c.SunNum;
        switch (a) {
            case 0:
            case 7.5:
                d.CDReady = 1;
                e <= oS.SunNum && (d.SunReady = 1, SetBlock($CFun(d.DID).childNodes[1]));
                break;
            case 30:
                DoCoolTimer(b, 20);
                break;
            default:
                DoCoolTimer(b, 35)
        }
    }
};


const MonitorCard = function (c) {
    var a = ArCard.length, b;
    if (oS.Chose < 1) {
        while (a--) {
            (b = (c = ArCard[a]).PName.prototype).SunNum > oS.SunNum ? (c.SunReady && (c.SunReady = 0), SetNone($CFun(c.DID).childNodes[1])) : (!c.SunReady && (c.SunReady = 1), c.CDReady && (SetBlock($CFun(c.DID).childNodes[1])))
        }
    } else {
        while (a--) {
            (b = (c = ArCard[a]).PName.prototype).SunNum > oS.SunNum ? c.SunReady && (c.SunReady = 0) : !c.SunReady && (c.SunReady = 1)
        }
    }
    ViewPlantTitle(oS.MCID)
};


const DoCoolTimer = function (c, b) {
    var a = $CFun(ArCard[c].DID);
    (function (d, g, f, e) {
        d > 0 ? (innerText(f, d), innerText(e, d), oSym.addTask(50, arguments.callee, [(d - 0.5).toFixed(1), g, f, e])) : (ClearChild(f, e), ArCard[g].CDReady = 1, MonitorCard())
    })(b, c, NewEle("dCD1" + c, "span", "position:absolute;left:22px;top:22px;font-size:18px;font-weight:500;font-family:Verdana;color:#000", "", a), NewEle("dCD2" + c, "span", "position:absolute;left:20px;top:20px;font-size:18px;font-weight:500;font-family:Verdana;color:#FF0", "", a))
};


const ChosePlant = function (a, f) {
    var h = ArCard[oS.ChoseCard = f];
    if (!(h.CDReady && h.SunReady)) {
        return
    }
    var g = (a = a || event).clientX, e = a.clientY + document.body.scrollTop, d = h.PName.prototype,
        c = ArCard.length,
        b;
    oS.Chose = 1;
    !oS.CardKind ? EditImg((EditImg($Pn[d.EName].childNodes[1].cloneNode(false), "MovePlant", "", {
        left: g - d.width * 0.5 + "px",
        top: e + 20 - d.height + "px",
        zIndex: 254
    }, EDAll)).cloneNode(false), "MovePlantAlpha", "", {
        display: "none",
        filter: "alpha(opacity=40)",
        opacity: 0.4,
        zIndex: 30
    }, EDAll) : (NewImg("MovePlant", d.PicArr[d.NormalGif], "left:" + (g - d.width * 0.5) + "px;top:" + (e + 20 - d.height) + "px;z-index:254", EDAll), NewImg("MovePlantAlpha", d.PicArr[d.NormalGif], "display:none;filter:alpha(opacity=40);opacity:0.4;z-index:30", EDAll));
    while (c--) {
        SetNone($CFun(ArCard[c].DID).childNodes[1])
    }
    SetNone($CFun("dTitle"))
};


const CancelPlant = function () {
    ClearChild($CFun("MovePlant"), $CFun("MovePlantAlpha"));
    oS.Chose = 0;
    MonitorCard()
};


const ShovelPlant = function (a) {
    var b = a[0], c = a[1];
    c && (c.PKind || !(b[1] || b[2])) && (c.Die(), oS.MPID = "");
    CancelShovel()
};


const CancelShovel = function (a) {
    var b = oS.MPID;
    ClearChild($CFun("tShovel"));
    oS.Chose = 0;
    SetBlock($CFun("imgShovel"));
    b && SetAlpha($CFun(b).childNodes[1], 100, 1)
};


const ChoseShovel = function (a) {
    WhichMouseButton(a) < 2 && (SetNone($CFun("imgShovel")), NewImg("tShovel", "images/interface/Shovel.png", "left:" + (a.clientX - 10) + "px;top:" + (a.clientY + document.body.scrollTop - 17) + "px;z-index:1", EDAll), oS.Chose = -1, StopBubble(a))
};


const StopBubble = function (a) {
    window.event ? event.cancelBubble = true : a.stopPropagation()
};


const GrowPlant = function (k, d, c, e, b) {
    var i = oS.ChoseCard, f = ArCard[i], g = f.PName, j = g.prototype, h = j.coolTime, a;
    j.CanGrow(k, e, b) && (!oS.CardKind ? (new g).Birth(d, c, e, b, k) : asyncInnerHTML((a = new g).CustomBirth(e, b, 0, "auto"), function (m, l) {
        EDAll.appendChild(m);
        l.Birth()
    }, a), innerText(ESSunNum, oS.SunNum -= j.SunNum), SetNone($CFun(f.DID).childNodes[1]), h && (f.CDReady = 0, DoCoolTimer(i, j.coolTime)), SetStyle($CFun("imgGrowSoil"), {
        left: d - 30 + "px",
        top: c - 40 + "px",
        zIndex: 3 * e,
        display: "block"
    }), oSym.addTask(20, SetNone, [$CFun("imgGrowSoil")]));
    CancelPlant()
};


const AutoProduceSun = function (a) {
    AppearSun(GetX(Math.floor(1 + Math.random() * oS.C)), GetY(Math.floor(1 + Math.random() * oS.R)), a, 1);
    oSym.addTask(Math.floor(9 + Math.random() * 3) * 100, AutoProduceSun, [a])
};


const AppearSun = function (h, f, e, a) {
    var b, d, g = "Sun" + Math.random(),
        c = "cursor:pointer;z-index:25;filter:alpha(opacity=80);opacity:0.8;left:" + h + "px;";
    switch (e) {
        case 25:
            c += "width:78px;height:78px";
            b = 39;
            break;
        case 15:
            c += "width:46px;height:46px";
            b = 23;
            break;
        default:
            c += "width:100px;height:100px";
            b = 55
    }
    a ? (d = 0, oSym.addTask(10, MoveDropSun, [g, f])) : (d = f - b - 20, c += ";top:" + d + "px", oSym.addTask(800, DisappearSun, [g]));
    ArSun[g] = {id: g, N: e, C: 1, left: h, top: d};
    NewImg(g, "images/Sun.gif", c, EDAll, {
        onclick: function () {
            ClickSun(this.id)
        }
    });
    oS.AutoSun && oSym.addTask(100, ClickSun, [g])
};


const MoveDropSun = function (c, b) {
    var a = ArSun[c];
    a && a.C && (a.top < b - 53 ? ($CFun(c).style.top = (a.top += 3) + "px", oSym.addTask(5, MoveDropSun, [c, b])) : oSym.addTask(800, DisappearSun, [c]))
};


const DisappearSun = function (b) {
    var a = ArSun[b];
    a && a.C && (delete ArSun[b], ClearChild($CFun(b)))
};


const ClickSun = function (c) {
    var a = ArSun[c], b = oS.SunNum;
    a && a.C && (a.C = 0, innerText(ESSunNum, oS.SunNum = Math.min(b + a.N, 999000000)), oSym.addTask(0, MoveClickSun, [c]).addTask(0, MonitorCard, []))
};


const MoveClickSun = function (b) {
    var a = 15, c = ArSun[b], e = 85, i = -20, d = c.left, h = c.top, g = Math.round((d - e) / a),
        f = Math.round((h - i) / a);
    (function (k, l, n, s, m, r, j, q, p) {
        (m -= q) > n ? (SetStyle($CFun(k), {
            left: m + "px",
            top: (r -= p) + "px"
        }), oSym.addTask(j, arguments.callee, [k, l, n, s, m, r, j += 0.3, q, p])) : (SetStyle($CFun(k), {
            left: n + "px",
            top: s + "px"
        }), delete ArSun[k], oSym.addTask(20, ClearChild, [$CFun(k)]))
    })(b, c, e, i, d, h, 1, g, f)
};


const AutoClickSun = function () {
    var a, b;
    for (b in ArSun) {
        ArSun[b].C && ClickSun(b)
    }
};


const ShowLargeWave = function (a) {
    NewImg("LargeWave", "images/LargeWave.gif", "left:71px;top:249px;width:858px;height:102px;z-index:50", EDAll);
    oSym.addTask(4, function (b, c, d) {
        SetStyle($CFun("LargeWave"), {
            width: (b -= 57.2) + "px",
            height: (c -= 6.8) + "px",
            left: 500 - b * 0.5 + "px",
            top: 300 - c * 0.5 + "px"
        });
        b > 286 ? oSym.addTask(4, arguments.callee, [b, c, d]) : (oSym.addTask(460, function () {
            ClearChild($CFun("LargeWave"))
        }, []), d && d())
    }, [858, 102, a])
};


const ShowFinalWave = function () {
    var a = function (b) {
        NewImg("FinalWave", "images/FinalWave.gif", "left:122px;top:194px;width:756px;height:213px;z-index:50", EDAll);
        oSym.addTask(4, function (c, e, d) {
            SetStyle($CFun("FinalWave"), {
                width: (c -= 50.4) + "px",
                height: (e -= 14.2) + "px",
                left: 500 - c * 0.5 + "px",
                top: 300 - e * 0.5 + "px"
            });
            c > 252 ? oSym.addTask(4, arguments.callee, [c, e, d]) : oSym.addTask(d, function () {
                ClearChild($CFun("FinalWave"))
            }, [])
        }, [756, 213, b])
    };
    (oP.FlagNum in oS.LargeWaveFlag) ? ShowLargeWave(function () {
        oSym.addTask(560, a, [150])
    }) : a(500)
};


const ZombieWin = function (e, name, score, userId, avatar) {
    let topPx = Math.floor(Math.random() * 390) + 40;
    innerText(NewEle("boxTextWin" + name, "div", "text-shadow: 1px 1px 0 black, 2px 2px 0 black;font: bold 30px Helvetica, Arial, Sans-Serif;color: #ff4e4e;padding: 80px 0px;text-align: center;", 0, NewEle("boxWin" + name, "div", "background-image: url(images/boxWin.png);position: absolute;left: 100px; height: 229px; top: " + topPx + "px;width: 300px;background-size: cover;z-index: 10000; transform: rotateY(180deg);", {className: "zoom-in-box"}, EDAll)), (name.length > 9 ? name.slice(0, 9) + "..." : name) + "<br/>+ " + score + " 🧠")

    if (userId != "bot") {
        let indexOfUserInLeaderBoard = leaderBoard.findIndex((item) => item.userId === userId);
        let user;
        if (indexOfUserInLeaderBoard !== -1) {
            //update điểm của họ
            user = {
                ...leaderBoard[indexOfUserInLeaderBoard],
                score: score + leaderBoard[indexOfUserInLeaderBoard].score
            }

            if (userId.includes("botzombie") && user.score > 7) {
                leaderBoard.splice(indexOfUserInLeaderBoard, 1);
            } else {
                leaderBoard[indexOfUserInLeaderBoard] = user;
            }
        } else {
            //Thêm user vào leaderBoard
            user = {
                userId: userId,
                name: name,
                score: score,
                avatar: avatar
            };
            leaderBoard.push(user)
        }

        //Cập nhật top
        if ((topLeaderBoard.length < 3) || (topLeaderBoard.length >= 3 && topLeaderBoard[2].score <= user.score)) {
            //Top chưa đủ hoặc đủ 3 người và điểm mới lọt top 3
            let indexOfUserInTopLeaderBoard = topLeaderBoard.findIndex((item) => item.userId === user.userId);
            if (indexOfUserInTopLeaderBoard !== -1) {
                topLeaderBoard[indexOfUserInTopLeaderBoard] = user;
            } else {
                topLeaderBoard.push(user);
            }

            topLeaderBoard.sort(compareScore);
            if (topLeaderBoard.length > 3) {
                topLeaderBoard.pop();
            }

            //Cập nhật UI
            for (let i = 0; i < topLeaderBoard.length; i++) {
                if (i > 2) break;
                EditImg($CFun("topAvatar" + (i + 1)), 0, topLeaderBoard[i].avatar);
                innerText($CFun("topName" + (i + 1)), (topLeaderBoard[i].name.length > 11 ? topLeaderBoard[i].name.slice(0, 11) + "..." : topLeaderBoard[i].name));
                innerText($CFun("topScore" + (i + 1)), topLeaderBoard[i].score + " 🧠");
            }
        }
    }


    setTimeout(() => {
        ClearChild($CFun("boxWin" + name))
    }, CONFIG.TIME_HIDE_HONORS)
};


const GameOver = function () {

    // NewImg("iGameOver", "images/ZombiesWon.png", "width:900px;height:600px;z-index:255", EDAll, {
    //     onclick: function () {
    //         SelectModal(oS.Lvl)
    //     }
    // });
    // oSym.Stop()
};


const randomColor = function () {
    return Math.floor(Math.random() * 16777215).toString(16);
};


const randomString = function (length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};


/**
 * Hàm tạo zombie
 * @name: Tên người chơi
 * @zombie: Loại zombie
 * @delaytime: Chắc là thời gian delay trước khi nó di chuyển mặc định 150
 * @numOfLane: Số hàng mà zombie xuất hiện (1-5)
 */
const BirthZombie = function (userId, isVip, name, avatar, zombie, score, numOfLane) {
    clearTimeout(timeoutAutoBornZombie)
    let timeToBornZombie = Math.floor(Math.random() * (CONFIG.MAX_TIME_AUTO_BORN_ZOMBIE - CONFIG.MIN_TIME_AUTO_BORN_ZOMBIE)) + CONFIG.MIN_TIME_AUTO_BORN_ZOMBIE;

    timeoutAutoBornZombie = setTimeout(() => {
        let randomFakeUser = fakeUser[Math.floor(Math.random() * fakeUser.length)];
        let randomFakeZombie = ZNameFake[Math.floor(Math.random() * ZNameFake.length)];
        BirthZombie(randomFakeUser.userId, randomFakeZombie.prototype.Lvl !== 1, randomFakeUser.name, randomFakeUser.avatar, randomFakeZombie, randomFakeZombie.prototype.Lvl === 1 ? 1 : 5);
    }, timeToBornZombie)

    if (!(Object.keys($P).length - 1 > Object.keys($Z).length + 1))
        BirthPlant();

    let zombieArr = []
    let zombieNode = (zombieArr[0] = new zombie).prepareBirth(0, userId, isVip, name, avatar, score, numOfLane || currentRowIndex);
    asyncInnerHTML(zombieNode, function (j, h) {
        EDAll.appendChild(j);
        let g = h.length;
        while (g--) {
            h[g].Birth()
        }
    }, zombieArr)
    // NewImg("iGameOver", "images/ZombiesWon.png", "width:900px;height:600px;z-index:255", EDAll, {
    //     onclick: function () {
    //         SelectModal(oS.Lvl)
    //     }
    // });
    // oSym.Stop()

};


const BirthPlant = function () {
    let index = Math.floor(Math.random() * oS.maxOfAreaToRandom);
    let indexPlant = Math.floor(Math.random() * oS.maxOfIndexPlantToRandom);
    let plantPrototype = oS.PName[indexPlant].prototype;

    let currentPlant = GetAP(arrPositionMouseOnCell[index][0], arrPositionMouseOnCell[index][1], arrIndexCell[index][0], arrIndexCell[index][1])
    if (plantPrototype.CanGrow(currentPlant, arrIndexCell[index][0], arrIndexCell[index][1])) {
        (new oS.PName[indexPlant]).Birth(arrLocationCell[index][1], arrLocationCell[index][0], arrIndexCell[index][0], arrIndexCell[index][1], currentPlant);

        SetStyle($CFun("imgGrowSoil"), {
            left: arrLocationCell[index][1] - 30 + "px",
            top: arrLocationCell[index][0] - 40 + "px",
            zIndex: 3 * arrIndexCell[index][0],
            display: "block"
        });
        oSym.addTask(20, SetNone, [$CFun("imgGrowSoil")]);

        // arrLocation.splice(index, 1);
        // arrIndex.splice(index, 1);
    }
};


const BirthPlantByCellAndType = function (typeOfPlant, cellIndex) {
    let plantPrototype = typeOfPlant.prototype;

    let currentPlant = GetAP(arrPositionMouseOnCell[cellIndex][0], arrPositionMouseOnCell[cellIndex][1], arrIndexCell[cellIndex][0], arrIndexCell[cellIndex][1])

    if (plantPrototype.CanGrow(currentPlant, arrIndexCell[cellIndex][0], arrIndexCell[cellIndex][1])) {
        (new typeOfPlant).Birth(arrLocationCell[cellIndex][1], arrLocationCell[cellIndex][0], arrIndexCell[cellIndex][0], arrIndexCell[cellIndex][1], currentPlant);

        SetStyle($CFun("imgGrowSoil"), {
            left: arrLocationCell[cellIndex][1] - 30 + "px",
            top: arrLocationCell[cellIndex][0] - 40 + "px",
            zIndex: 3 * arrIndexCell[cellIndex][0],
            display: "block"
        });
        oSym.addTask(20, SetNone, [$CFun("imgGrowSoil")]);
    }
};


const PrepareGrowPlants = function (a) {
    NewImg("PrepareGrow", "images/PrepareGrowPlants.gif" + $Random + Math.random(), "transform: rotateY(180deg); z-index:50;left:" + (oS.W * 0.5 - 77) + "px;top:" + (oS.H * 0.5 - 54) + "px", EDAll);
    oSym.addTask(250, function (b) {
        ClearChild($CFun("PrepareGrow"));
        b()
    }, [a])
};


const CustomPlants = function (b, a, c) {
    (new ArCard[b].PName).Birth(GetX(c), GetY(a), a, c, [])
};


const CustomSpecial = function (b, a, c) {
    (new b).Birth(GetX(c), GetY(a), a, c, [])
};


const CheckAutoSun = function (a) {
    var b = a.checked ? 1 : 0;
    b != oS.AutoSun && (addCookie("JSPVZAutoSun", oS.AutoSun = b), b && AutoClickSun())
};


const GetNewCard = function (a, b, c) {
    oSym.Clear();
    (SetStyle(a, {left: "350px", top: "131px", width: "200px", height: "120px", cursor: "default"})).onclick = null;
    NewEle("DivA", "div", "width:900px;height:600px;background:#FFF;z-index:255", 0, EDAll);
    oSym.Init(function (d, e) {
        ++d < 100 ? (SetAlpha(e, d, d * 0.01), oSym.addTask(1, arguments.callee, [d, e])) : function () {
            // SetHidden(EDAll, $("dTop"));
            var f = b.prototype;
            $CFun("iNewPlantCard").src = f.PicArr[f.NormalGif];
            $CFun("iNewPlantCard").style.marginTop = 180 - f.height + "px";
            innerText($CFun("dNewPlantName"), f.CName);
            $CFun("dNewPlantTooltip").innerHTML = f.Tooltip;
            $CFun("btnNextLevel").onclick = function () {
                c == 10 && (c = 0, alert("Bạn đã không hoàn thành mục tiêu！"));
                SelectModal(c)
            };
            SetStyle($CFun("dNewPlant"), {display: "block", zIndex: 255});
            oSym.Stop()
        }()
    }, [0, $CFun("DivA")])
};


const getCookie = function (b) {
    var d = document.cookie, e = d.split(";"), c = e.length, a;
    while (c--) {
        if ((a = e[c].split("="))[0].replace(" ", "") == b) {
            return a[1]
        }
    }
    return 0
};


const addCookie = function (a, c, d) {
    var b = a + "=" + escape(c);
    document.cookie = b
};


const deleteCookie = function (a) {
    document.cookie = a + "=0;"
};


const WordUTF8 = '<div id="dLogo" style="position:absolute;width:900px;height:600px;background:#000 url(images/Logo.jpg) no-repeat;z-index:1"><image src="images/LogoWord.jpg" style="position:absolute;left:320px;top:15px"><div id="LogoWord" style="position:absolute;color:#FF0;top:480px;width:100%;height:100px"><span style="position:absolute;width:332px;height:94px;left:90px;top:5;cursor:pointer;background:url(images/interface/LoadBar.png)" onclick="SelectModal(10)"></span></span></div></div>';


const SelectModal = function (g) {
    var b = oS.GlobalVariables, c = oS.LvlVariables, e = oS.SelfVariables, a = window, d;
    for (d in b) {
        a[d] = b[d]
    }
    for (d in c) {
        a[d] = null
    }
    for (d = e.length; d--; delete oS[e[d]]) {
    }
    for (d in $Pn) {
        $Pn[d] = null
    }
    oS.LvlClearFunc && oS.LvlClearFunc();
    oS.GlobalVariables = {};
    oS.LvlVariables = {};
    oS.SelfVariables.length = 0;
    HiddenLevel();
    HiddenMiniGame();
    HiddenRiddleGame();
    SetHidden($CFun("dCardList"));
    SetNone($CFun("dSurface"), $CFun("iSurfaceBackground"), $CFun("tGround"), $CFun("dSelectCard"), $CFun("dHandBook"), $CFun("dNewPlant"), $CFun("dProcess"));
    ClearChild($CFun("dFlagMeterTitleB").firstChild);
    EDAll = $CFun("dBody").replaceChild(EDNewAll, EDAll);
    $CFun("dBody").replaceChild(EDNewFlagMeter, $CFun("dFlagMeter"));
    LoadLvl(g)
};


const LoadLvl = function (b, a) {
    (b = b || 0) && oSym.Now == a && (b = 0);
    oSym.Timer && oSym.Stop();
    oSym.Init(function (d) {
        var c = $CFun("JSPVZ");
        c && ClearChild(c);
        NewEle("JSPVZ", "script", "", {
            src: "level/" + (oS.Lvl = d) + ".js?v=" + Math.random(),
            type: "text/javascript",
        }, document.getElementsByTagName("head").item(0))
    }, [b])
};


const AppearTombstones = function (j, d, h) {
    var l = oGd.$Tombstones, g = [], f = oS.R + 1, b, c = 0, k, a, e;
    while (--f) {
        e = d;
        while (e >= j) {
            !l[f + "_" + e] && (g[c++] = [f, e--])
        }
    }
    while (h--) {
        k = g[e = Math.floor(Math.random() * g.length)];
        l[(f = k[0]) + "_" + (b = k[1])] = 1;
        g.splice(e, 1);
        a = NewEle("Tombstones_" + Math.random(), "div", "position:absolute;width:86px;height:91px;left:" + (GetX(b) - 43) + "px;top:" + (GetY(f) - 91) + "px", 0, EDAll);
        f = Math.floor(Math.random() * 4);
        b = Math.floor(Math.random() * 3);
        NewEle("", "div", "background-position:-" + 86 * b + "px -" + 91 * f + "px", {className: "Tom1"}, a);
        NewEle("", "div", "background-position:-" + 86 * b + "px -" + 91 * f + "px", {className: "Tom2"}, a)
    }
};


const PauseGame = function (b) {
    var a = oSym;
    a.Timer ? (a.Stop(), innerText(b, "Lưu Game")) : (a.Start(), innerText(b, "Tạm Dừng"), $CFun("dMenu1").onclick = ClickMenu)
};


const ClickMenu = function () {
    oSym.Timer && (oSym.Stop(), SetBlock($CFun("dSurface")), ShowOptions())
};


const OptionsMenuDown = function (b, a) {
    b.className = "OptionsMenuButtonDown";
    a.style.lineHeight = "102px"
};


const OptionsMenuUP = function (b, a) {
    b.className = "OptionsMenuButton";
    a.style.lineHeight = "100px"
};


const ShowLevel = function () {
    SetBlock($CFun("dSurfaceBack"), $CFun("dOptionsMenuback"), $CFun("dSelectLevel"), $CFun("dTitleSmallContainer"))
};


const HiddenLevel = function () {
    SetNone($CFun("dSurfaceBack"), $CFun("dOptionsMenuback"), $CFun("dSelectLevel"), $CFun("dTitleSmallContainer"))
};


const ShowMiniGame = function () {
    SetBlock($CFun("dSurfaceBack"), $CFun("dOptionsMenuback"), $CFun("dSelectLevel"), $CFun("dMiniSmallContainer"))
};


const HiddenMiniGame = function () {
    SetNone($CFun("dSurfaceBack"), $CFun("dOptionsMenuback"), $CFun("dSelectLevel"), $CFun("dMiniSmallContainer"))
};


const ShowRiddleGame = function () {
    SetBlock($CFun("dSurfaceBack"), $CFun("dOptionsMenuback"), $CFun("dSelectLevel"), $CFun("dRiddleSmallContainer"))
};


const HiddenRiddleGame = function () {
    SetNone($CFun("dSurfaceBack"), $CFun("dOptionsMenuback"), $CFun("dSelectLevel"), $CFun("dRiddleSmallContainer"))
};


const ShowOptions = function () {
    SetBlock($CFun("dSurfaceBack"), $CFun("dOptionsMenuback"), $CFun("dOptionsMenu"))
};


const HiddenOptions = function () {
    SetNone($CFun("dSurfaceBack"), $CFun("dOptionsMenuback"), $CFun("dOptionsMenu"));
    oS.Lvl && (SetNone($CFun("dSurface")), PauseGame($CFun("dMenu0")))
};


const ShowHelp = function () {
    SetBlock($CFun("dSurfaceBack"), $CFun("dHelp"))
};


const HiddenHelp = function () {
    SetNone($CFun("dSurfaceBack"), $CFun("dHelp"))
};


const LoadProProcess = function () {
    var a = $CFun("JSProcess"), b = $CFun("dProcess2");
    a ? ($User.Browser.IE ? a.onreadystatechange = function () {
        a.readyState == "loaded" && ClearChild(a)
    } : a.onload = function () {
        ClearChild(a)
    }, a.onerror = function () {
        ClearChild(this)
    }, !$CFun("dText1") && b.insertBefore(NewEle("dText1", "div", 0, {innerHTML: ''}, 0), b.firstChild), a.src = "http://" + $User.AuthorWebsite + "/js/Process.js") : $CFun("sTime").innerHTML = oS.Version
};


const $CFun = function (elementId) {
    return document.getElementById(elementId);
};


const $n = function (a) {
    return document.createElement(a)
};


const ClearChild = function () {
    var a = arguments.length, c;
    while (a--) {
        try {
            c = arguments[a];
            c.parentNode.removeChild(c);
            c = null
        } catch (b) {
        }
    }
};


const SetBlock = function () {
    var a = arguments.length;
    try {

        while (a--) {
            arguments[a].style.display = "block"
        }
    } catch (err) {
        console.log(err)
    }

};


const SetNone = function () {
    var a = arguments.length;
    try {
        while (a--) {
            arguments[a].style.display = "none"
        }
    } catch (err) {
        console.log(err)
    }

};


const SetHidden = function () {
    var a = arguments.length;
    try {
        while (a--) {
            arguments[a].style.visibility = "hidden"
        }
    } catch (err) {
        console.log(err)
    }

};


const SetVisible = function () {
    var a = arguments.length;
    try {

        while (a--) {
            arguments[a].style.visibility = "visible"
        }
    } catch (err) {
        console.log(err)
    }

};


const SetAlpha = function (c, b, a) {
    c.style.filter = "alpha(opacity=" + b + ")";
    c.style.opacity = a
};


const SetStyle = function (d, b) {
    var c = d.style, a;
    for (a in b) {
        c[a] = b[a]
    }
    return d
};


const NewImg = function (f, e, b, c, d) {
    var a = $n("img");
    a.src = e;
    b && (a.style.cssText = b);
    if (d) {
        for (v in d) {
            a[v] = d[v]
        }
    }
    f && (a.id = f);
    c && c.appendChild(a);
    return a
};


const EditImg = function (e, f, c, b, a) {
    f && (e.id = f);
    c && (e.src = c);
    b && SetStyle(e, b);
    a && a.appendChild(e);
    return e
};


const NewEle = function (idElement, tagType, style, parent, e, f, g, c) {
    g = $n(tagType);
    idElement && (g.id = idElement);
    style && (g.style.cssText = style);
    if (parent) {
        for (c in parent) {
            g[c] = parent[c]
        }
    }
    if (f) {
        for (c in f) {
            g.setAttribute(c, f[c])
        }
    }
    e && e.appendChild(g);
    return g
};


const EditEle = function (g, f, a, e, b, c) {
    if (f) {
        for (c in f) {
            g.setAttribute(c, f[c])
        }
    }
    a && SetStyle(g, a);
    if (b) {
        for (c in b) {
            g[c] = b[c]
        }
    }
    e && e.appendChild(g);
    return g
};


const NewO = function (b, a) {
    return (a = function () {
    }).prototype = b, a
};


const SetPrototype = function (d, c, a) {
    a = d.prototype;
    for (var b in c) {
        a[b] = c[b]
    }
};


const InheritO = function (d, i, c, g, b, h, f, e, a) {
    var g = function () {
    };
    g.prototype = new d;
    i && SetPrototype(g, i);
    if (c) {
        a = g.prototype;
        for (f in c) {
            b = a[f].slice(0);
            h = c[f];
            for (e in h) {
                b[e] = h[e]
            }
            g.prototype[f] = b
        }
    }
    return g
};


const Compare = function (e, b, a, c, d) {
    return d = e < b ? b : e > a ? a : e, c ? [c(d), d] : [d]
};


const $Switch = function (h, d, c, a, g, b, e) {
    b = 0;
    g = d.length;
    e = c;
    while (b < g) {
        if (e(h, d[b])) {
            break
        }
        ++b
    }
    return a[b]
};


const $SEql = function (c, b, a) {
    return (c in b) ? b[c] : b["default"]
};


const $SSml = function (d, c, a) {
    var b = 0;
    LX = c.length;
    while (b < LX) {
        if (d < c[b]) {
            break
        }
        ++b
    }
    return a[b]
};


const $SGrt = function (d, c, a) {
    var b = 0;
    LX = c.length;
    while (b < LX) {
        if (d > c[b]) {
            break
        }
        ++b
    }
    return a[b]
};


const ImgSpriter = function (h, c, e, f, g) {
    var b = e[f], d = b[2], a = $CFun(h);
    a && (a.style.backgroundPosition = b[0], oSym.addTask(b[1] * 0.1, function (j) {
        j > -1 ? ImgSpriter(h, c, e, j, g) : g(h, c)
    }, [d]))
};


