const CPlants = NewO({
    name: "Plants",
    HP: 300,
    PKind: 1,
    beAttackedPointL: 20,
    NormalGif: 2,
    CardGif: 0,
    canEat: 1,
    zIndex: 0,
    coolTime: 7.5,
    canTrigger: 1,
    Stature: 0,
    Sleep: 0,
    CanGrow: function (c, b, d) {
        var a = b + "_" + d;
        return oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1]
    },
    getHurt: function (e, c, b) {
        var d = this, a = d.id;
        /*(AKind%3)?
			(p.HP-=Attack)<1?
				p.Die():(
					SetAlpha($(pid).childNodes[1],50,0.5),
					oSym.addTask(10,function(id){$P[id]&&SetAlpha($(id).childNodes[1],100,1)},[pid])
				)
			:p.Die(1);*/
        !(c % 3) ? (d.HP -= b) < 1 && d.Die() : d.Die(1)
    },
    GetDY: function (b, c, a) {
        return a[0] ? -21 : -15
    },
    GetDX: function () {
        return -Math.floor(this.width * 0.5)
    },
    GetDBottom: function () {
        return this.height
    },
    Birth: function (d, c, h, a, l) {
        var e = this, k = d + e.GetDX(), i = c + e.GetDY(h, a, l), g = i - e.height, b = e.id = "P_" + Math.random(),
            j = e.zIndex += 3 * h, f = $Pn[e.EName].cloneNode(true);
        e.pixelLeft = k;
        e.pixelRight = k + e.width;
        e.pixelTop = g;
        e.pixelBottom = g + e.GetDBottom();
        e.opacity = 1;
        e.InitTrigger(e, b, e.R = h, e.C = a, e.AttackedLX = k + e.beAttackedPointL, e.AttackedRX = k + e.beAttackedPointR);
        $P[b] = e;
        e.BirthStyle(e, b, f, {left: k + "px", top: g + "px", zIndex: j});
        oGd.add(e, h + "_" + a + "_" + e.PKind);
        e.PrivateBirth(e)
    },
    getShadow: function (a) {
        return "left:" + (a.width * 0.5 - 48) + "px;top:" + (a.height - 22) + "px"
    },
    BirthStyle: function (c, d, b, a) {
        EditEle(b, {id: d}, a, EDAll)
    },
    PrivateBirth: function (a) {
    },
    getTriggerRange: function (a, b, c) {
        return [[b, oS.W, 0]]
    },
    getTriggerR: function (a) {
        return [a, a]
    },
    InitTrigger: function (c, b, f, a, h, g) {
        var j = {}, i = c.getTriggerR(f), e = i[0], d = i[1];
        do {
            oT.add(e, j[e] = c.getTriggerRange(e, h, g), b)
        } while (e++ != d);
        c.oTrigger = j
    },
    TriggerCheck: function (b, a) {
        this.AttackCheck2(b) && (this.canTrigger = 0, this.CheckLoop(b.id, a))
    },
    CheckLoop: function (b, c) {
        var a = this.id;
        this.NormalAttack(b);
        oSym.addTask(140, function (e, f, h) {
            var g;
            (g = $P[e]) && g.AttackCheck1(f, h)
        }, [a, b, c])
    },
    AttackCheck1: function (g, f) {
        var b = this, c = b.oTrigger, a = $Z[g], h, e, k, j;
        if (a && (h = c[a.R])) {
            k = a.ZX;
            e = h.length;
            while (e--) {
                j = h[e];
                if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {
                    b.CheckLoop(g, j[2]);
                    return
                }
            }
        }
        b.canTrigger = 1
    },
    AttackCheck2: function (a) {
        return a.Altitude > 0
    },
    PrivateDie: function (a) {
    },
    Die: function (a) {
        var b = this, c = b.id;
        b.oTrigger && oT.delP(b);
        b.HP = 0;
        delete $P[c];
        delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
        !a && ClearChild($CFun(c));
        b.PrivateDie(b)
    }
});


const oLawnCleaner = InheritO(CPlants, {
    EName: "oLawnCleaner",
    CName: "Máy Cắt Cỏ",
    width: 71,
    height: 57,
    beAttackedPointL: 0,
    beAttackedPointR: 71,
    SunNum: 0,
    PicArr: ["images/LawnCleaner.png"],
    canEat: 0,
    getTriggerRange: function (a, b, c) {
        return [[b, c, 0]]
    },
    TriggerCheck: function (b, a) {
        b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this))
    },
    Tooltip: "Máy cắt cỏ phổ biến",
    NormalAttack: function (a) {
        (function (j, c, b, d, h, e) {
            var g = oZ.getArZ(b, d, h), f = g.length;
            while (f--) {
                g[f].Die(2)
            }
            b > c ? j.Die() : (j.pixelRight += 10, j.AttackedLX = b += 10, j.AttackedRX = d += 10, e.style.left = (j.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [j, c, b, d, h, e]))
        })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $CFun(a.id))

    }
});


const oBrains = InheritO(CPlants, {
    EName: "oBrains",
    CName: "脑子",
    width: 32,
    height: 31,
    beAttackedPointL: 0,
    beAttackedPointR: 32,
    SunNum: 0,
    PicArr: ["images/brain.png"],
    Tooltip: "Não",
    InitTrigger: function () {
    },
    PrivateBirth: function (a) {
        a.PrivateDie = oS.BrainsNum ? (a.DieStep = Math.floor(150 / oS.BrainsNum), function (d) {
            var c, b;
            try {
                (b = --oS.BrainsNum) ? (c = b * d.DieStep, $CFun("imgFlagHead").style.left = (c - 11) + "px", $CFun("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + c + "px)") : ($CFun("imgFlagHead").style.left = "-1px", $CFun("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)", oP.FlagToEnd())

            } catch (err) {
                console.log(err)
            }
        }) : function (b) {
            // GameOver()
        }
    },
    GetDX: function () {
        return -40
    }
});


const oStarfruit = InheritO(CPlants, {
    EName: "oStarfruit",
    CName: "Sao trái cây",
    width: 77,
    height: 70,
    beAttackedPointR: 57,
    SunNum: 125,
    PicArr: ["images/Card/Plants/Starfruit.png", "images/Card/Plants/StarfruitG.png", "images/Plants/Starfruit/Starfruit.gif", "images/Plants/Starfruit/Star.gif"],
    Tooltip: "Theo hướng khởi động của ngôi sao",
    Produce: 'Có thể khởi động trái cây ngôi sao nhỏ<p>Sát thương：<font color="#FF0000">Trung bình</font><br>Phạm vi：<font color="#FF0000">5 hướng</font></p>Sao trái cây：“Zombie”',
    GetDY: function (b, c, a) {
        return a[0] ? -17 : -10
    },
    PrivateBirth: function (d) {
        var c = d.pixelLeft + 38, b = c - 15, a = d.pixelTop + 15;
        d.BulletClass = NewO({X: c, R: d.R, pixelLeft: b, pixelTop: a, F: oGd.MB3});
        d.BulletEle = NewImg(0, "images/Plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2))
    },
    PrivateDie: function (a) {
        a.BulletEle = null
    },
    NormalAttack: function () {
        var g = this, d, b = oGd.$B, e = 5, h, a = [1, 2, 4, 6, 7], f = g.BulletClass, c = g.BulletEle;
        while (e--) {
            (function (j) {
                h = (d = new f).id = "StarB" + Math.random();
                d.D = a[j];
                EditEle(c.cloneNode(false), {id: h}, 0, EDAll);
                b.push(d);
                oSym.addTask(15, function (k) {
                    var i = $CFun(k);
                    i && SetBlock(i)
                }, [h])
            })(e)
        }

    }
});


const oPeashooter = InheritO(CPlants, {
    EName: "oPeashooter",
    CName: "Đậu bắn súng",
    width: 71,
    height: 71,
    beAttackedPointR: 51,
    SunNum: 100,
    BKind: 0,
    PicArr: ["images/Card/Plants/Peashooter.png", "images/Card/Plants/PeashooterG.png", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
    Tooltip: "Bắn hạt đậu vào kẻ thù",
    Produce: 'Đậu bắn súng, cây phòng thủ đầu tiên. Chúng để tấn công các zombie bằng hạt đậu Hà Lan.<p>Sát thương：<font color="#FF0000">Trung bình</font></p>”',
    PrivateBirth: function (c) {
        var b = c.AttackedLX, a = b - 40;
        c.BulletClass = NewO({X: b, R: c.R, D: 0, Attack: 20, Kind: c.BKind, ChangeC: 0, pixelLeft: a, F: oGd.MB1});
        c.BulletEle = NewImg(0, c.PicArr[3], "left:" + a + "px;top:" + (c.pixelTop + 3) + "px;display:none;z-index:" + (c.zIndex + 2))
    },
    PrivateDie: function (a) {
        a.BulletEle = null
    },
    NormalAttack: function () {

        var b = this, a = new b.BulletClass, c = a.id = "PB" + Math.random();
        EditEle(b.BulletEle.cloneNode(false), {id: c}, 0, EDAll);
        oGd.$B.push(a);
        oSym.addTask(15, function (e) {
            var d = $CFun(e);
            d && SetBlock(d)
        }, [c])

    }
});


const oSnowPea = InheritO(oPeashooter, {
    EName: "oSnowPea",
    CName: "Đậu bắn băng",
    SunNum: 175,
    BKind: -1,
    PicArr: ["images/Card/Plants/SnowPea.png", "images/Card/Plants/SnowPeaG.png", "images/Plants/SnowPea/SnowPea.gif", "images/Plants/PB-10.gif", "images/Plants/PeaBulletHit.gif"],
    Tooltip: "Tác dụng chấn thương và làm chậm",
    Produce: 'Có tác dụng chấn thương và làm chậm<p>Sát thương：<font color="#FF0000">trung bình + hiệu ứng làm chậm</font></p>Có tác dụng chấn thương và làm chậm'
});


const oRepeater = InheritO(oPeashooter, {
    EName: "oRepeater",
    CName: "Đậu súng đôi",
    width: 73,
    height: 71,
    beAttackedPointR: 53,
    SunNum: 200,
    PicArr: ["images/Card/Plants/Repeater.png", "images/Card/Plants/RepeaterG.png", "images/Plants/Repeater/Repeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
    Tooltip: "Bắn ra hai viên đậu hà lan",
    Produce: 'Đậu súng đôi bắn ra 2 viên đậu Hà Lan<p>Sát thương：<font color="#FF0000">Trung bình</font></p>',
    NormalAttack: function (b, f) {

        var c = this, e = c.id, a = new c.BulletClass, d = a.id = "PB" + Math.random(), f;
        EditEle(c.BulletEle.cloneNode(false), {id: d}, 0, EDAll);
        oGd.$B.push(a);
        oSym.addTask(15, function (h) {
            var g = $CFun(h);
            g && SetBlock(g)
        }, [d]);
        f ? ++f : f = 1;
        f < 2 && oSym.addTask(15, function (j, g, i) {
            var h;
            (h = $P[j]) && h.NormalAttack(g, i)
        }, [e, b, f])

    }
});


const oThreepeater = InheritO(oPeashooter, {
    EName: "oThreepeater",
    CName: "Đậu ba súng",
    width: 73,
    height: 80,
    beAttackedPointR: 53,
    SunNum: 325,
    PicArr: ["images/Card/Plants/Threepeater.png", "images/Card/Plants/ThreepeaterG.png", "images/Plants/Threepeater/Threepeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
    Tooltip: "Bắn ra ba viên đậu",
    Produce: 'Đậu ba súng bắn ra 3 viên đậu Hà Lan trên 3 đường<p>Sát thương：<font color="#FF0000">Tổng hợp (mỗi viên)</font><br>Phạm vi<font color="#FF0000">3 đường</font></p> Đậu ba súng',
    getTriggerR: function (a) {
        return [a > 2 ? a - 1 : 1, a < oS.R ? a + 1 : a]
    },
    PrivateBirth: function (f) {
        var e = f.AttackedLX, d = e - 40, a, c = f.oTrigger, b;
        f.BulletClass = [];
        f.BulletEle = [];
        for (b in c) {
            f.BulletClass.push(NewO({X: e, R: b, D: 0, Attack: 20, Kind: 0, ChangeC: 0, pixelLeft: d, F: oGd.MB1}));
            f.BulletEle.push(NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(b) - 50) + "px;display:none;z-index:" + (3 * b + 2)))
        }
    },
    PrivateDie: function (a) {
        a.BulletEle.length = 0
    },
    NormalAttack: function () {

        var e = this, d = e.BulletClass, c = e.BulletEle, b, f, a = d.length;
        while (a--) {
            b = new d[a];
            oSym.addTask(15, function (h) {
                var g = $CFun(h);
                g && SetBlock(g)
            }, [f = b.id = "PB" + Math.random()]);
            EditEle(c[a].cloneNode(false), {id: f}, 0, EDAll);
            oGd.$B.push(b)
        }

    }
});


const oGatlingPea = InheritO(oPeashooter, {
    EName: "oGatlingPea",
    CName: "Gatlin 4 súng",
    width: 88,
    height: 84,
    beAttackedPointR: 68,
    SunNum: 250,
    coolTime: 50,
    PicArr: ["images/Card/Plants/GatlingPea.png", "images/Card/Plants/GatlingPeaG.png", "images/Plants/GatlingPea/GatlingPea.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
    Tooltip: "Một lần bắn ra 4 hạt đậu<br>(Cần súng bắn đôi)",
    Produce: 'Gatlin có thể bắn ra 4 hạt đậu<p>Sát thương：<font color="#FF0000">Trung binh (mỗi viên)</font><br>Tỉ lệ bắn：<font color="#FF0000">Bốn lần<br>Chỉ trồng được khi súng bắn đôi</font></p>Gatlin',
    PrivateBirth: function (c) {
        var b = c.AttackedLX, a = b - 40;
        c.BulletClass = NewO({X: b, R: c.R, D: 0, Attack: 20, Kind: c.BKind, ChangeC: 0, pixelLeft: a, F: oGd.MB1});
        c.BulletEle = NewImg(0, c.PicArr[3], "left:" + a + "px;top:" + (c.pixelTop + 8) + "px;display:none;z-index:" + (c.zIndex + 2))
    },
    // CanGrow: function (b, a, d) {
    //     var c = b[1];
    //     return c && c.EName == "oRepeater"
    // },
    NormalAttack: function (b, f) {

        var c = this, e = c.id, a = new c.BulletClass, d = a.id = "PB" + Math.random(), f;
        EditEle(c.BulletEle.cloneNode(false), {id: d}, 0, EDAll);
        oGd.$B.push(a);
        oSym.addTask(15, function (h) {
            var g = $CFun(h);
            g && SetBlock(g)
        }, [d]);
        f ? ++f : f = 1;
        f < 4 && oSym.addTask(15, function (j, g, i) {
            var h;
            (h = $P[j]) && h.NormalAttack(g, i)
        }, [e, b, f])

    }
});


const oSplitPea = InheritO(oPeashooter, {
    EName: "oSplitPea",
    CName: "Súng hai chiều",
    width: 92,
    height: 72,
    beAttackedPointR: 72,
    SunNum: 125,
    PicArr: ["images/Card/Plants/SplitPea.png", "images/Card/Plants/SplitPeaG.png", "images/Plants/SplitPea/SplitPea.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PeaBulletHit.gif"],
    Tooltip: "Bắn hai chiều trước và sau",
    Produce: 'Có thể bắn đậu Hà Lan theo 2 hướng trước sau<p>Sát thương :<font color="#FF0000">Trung bình</font><br>Phạm vi：<font color="#FF0000">Phía trước và phía sau</font><br>Tỉ lệ bắn：<font color="#FF0000">Tốc độ bình thường ở phía trước, tốc độ gấp đôi ở phía sau</font></p>Súng hai chiều',
    GetDX: function () {
        return -55
    },
    getTriggerRange: function (a, b, c) {
        return [[100, b + 25, 1], [b + 26, oS.W, 0]]
    },
    PrivateBirth: function (f) {
        var c = f.R, a = 0, g, d = [f.AttackedLX, f.AttackedRX], e = [d[0] - 40, d[1] - 16],
            b = "px;top:" + (f.pixelTop + 3) + "px;display:none;z-index:" + f.zIndex + 2;
        f.BulletClass = [];
        f.BulletEle = [];
        f.aTri = [0, 0];
        while (a < 2) {
            f.BulletClass[a] = NewO({
                X: d[a],
                pixelLeft: g = e[a],
                R: c,
                D: a,
                Attack: 20,
                Kind: 0,
                ChangeC: 0,
                F: oGd.MB1
            });
            f.BulletEle[a] = NewImg(0, f.PicArr[++a + 2], "left:" + g + b)
        }
    },
    PrivateDie: function (a) {
        a.BulletEle.length = 0
    },
    TriggerCheck: function (b, a) {
        if (this.aTri[a]) {
            return
        }
        if (this.AttackCheck2(b)) {
            ++this.aTri[a];
            this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
            this.CheckLoop(b.id, a)
        }
    },
    AttackCheck1: function (b, f) {
        var e = this, c = $Z[b], a;
        if (c && (c.R == e.R)) {
            a = c.ZX > e.AttackedLX + 25 ? 0 : 1;
            f == a ? (e.AttackCheck2(c) ? e.CheckLoop(b, f) : --e.aTri[f]) : (++e.aTri[a], --e.aTri[f])
        } else {
            --e.aTri[f]
        }
        e.canTrigger = e.aTri[0] && e.aTri[1] ? 0 : 1
    },
    CheckLoop: function (a, b) {
        this.NormalAttack(b);
        oSym.addTask(140, function (c, e, g) {
            var f;
            (f = $P[c]) && f.AttackCheck1(e, g)
        }, [this.id, a, b])
    },
    NormalAttack: function (d, f) {

        var c = this, a = c.id, b = new c.BulletClass[d], e = b.id = "PB" + Math.random();
        oGd.$B.push(b);
        EditEle(c.BulletEle[d].cloneNode(false), {id: e}, 0, EDAll);
        oSym.addTask(15, function (h) {
            var g = $CFun(h);
            g && SetBlock(g)
        }, [e]);
        d && !f && oSym.addTask(15, function (g) {
            var h = $P[g];
            h && h.NormalAttack(1, 1)
        }, [a])

    }
});


const oSunFlower = InheritO(CPlants, {
    EName: "oSunFlower",
    CName: "Hoa mặt trời",
    width: 73,
    height: 74,
    beAttackedPointR: 53,
    SunNum: 50,
    PicArr: ["images/Card/Plants/SunFlower.png", "images/Card/Plants/SunFlowerG.png", "images/Plants/SunFlower/SunFlower.gif"],
    Tooltip: "Cung cấp thêm mặt trời cho bạn",
    Produce: 'Sản xuất thêm mặt trời cho bạn, hãy phát triển nó càng nhiều càng tốt<p>Năng suất mặt trời: <font color="#FF0000">Trung bình</font></p>Hoa mặt trời',
    PrivateBirth: function (a) {
        oS.ProduceSun ? oSym.addTask(600, function (d, c, b) {
            $P[d] && (AppearSun(Math.floor(c + Math.random() * 41), b, 25, 0), oSym.addTask(2400, arguments.callee, [d, c, b]))
        }, [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function (e, c, b) {
            var d = this;
            switch (c) {
                case 0:
                    AppearSun(Math.floor(GetX(d.C) - 40 + Math.random() * 41), GetY(d.R), 25, 0);
                    oSym.addTask(50, function (g, f) {
                        AppearSun(Math.floor(GetX(g) - 40 + Math.random() * 41), GetY(f), 25, 0)
                    }, [d.C, d.R]);
                    (d.HP -= b) < 1 ? d.Die() : oSym.addTask(50, function (g, f) {
                        AppearSun(Math.floor(GetX(g) - 40 + Math.random() * 41), GetY(f), 25, 0)
                    }, [d.C, d.R]);
                    break;
                case 3:
                    (d.HP -= b) < 1 && d.Die();
                    break;
                default:
                    d.Die(1)
            }
        }
    },
    InitTrigger: function () {
    }
});


const oTwinSunflower = InheritO(oSunFlower, {
    EName: "oTwinSunflower",
    CName: "Hoa mặt trời đôi",
    width: 83,
    height: 84,
    beAttackedPointR: 63,
    SunNum: 150,
    coolTime: 50,
    PicArr: ["images/Card/Plants/TwinSunflower.png", "images/Card/Plants/TwinSunflowerG.png", "images/Plants/TwinSunflower/TwinSunflower.gif"],
    Tooltip: "Năng suất gấp đôi so với hoa mặt trời<br>(Bạn cần phải trồng hoa mặt trời trước)",
    Produce: 'Sản lượng gấp đôi so với hoa mặt trời<p>Năng suất mặt trời: <font color="#FF0000">Hai lần<br>Trồng được khi có hoa mặt trời</font></p>Hoa mặt trời đôi',
    CanGrow: function (b, a, d) {
        var c = b[1];
        return c && c.EName == "oSunFlower"
    },
    PrivateBirth: function (a) {
        var b = GetX(a.C);
        oSym.addTask(600, function (f, d, c, e) {
            $P[f] && (AppearSun(d, e, 25, 0), AppearSun(c, e, 25, 0), oSym.addTask(2400, arguments.callee, [f, d, c, e]))
        }, [a.id, b - 10, b + 10, GetY(a.R)])
    }
});


const oPumpkinHead = InheritO(CPlants, {
    EName: "oPumpkinHead",
    CName: "Đầu bí ngô",
    width: 97,
    height: 67,
    beAttackedPointL: 15,
    beAttackedPointR: 82,
    SunNum: 125,
    PKind: 2,
    HP: 4000,
    coolTime: 30,
    zIndex: 1,
    PicArr: ["images/Card/Plants/PumpkinHead.png", "images/Card/Plants/PumpkinHeadG.png", "images/Plants/PumpkinHead/PumpkinHead.gif", "images/Plants/PumpkinHead/PumpkinHead1.gif", "images/Plants/PumpkinHead/PumpkinHead2.gif", "images/Plants/PumpkinHead/pumpkin_damage1.gif", "images/Plants/PumpkinHead/pumpkin_damage2.gif", "images/Plants/PumpkinHead/Pumpkin_back.gif"],
    Tooltip: "Bảo vệ các loài cây chồng",
    Produce: 'Đầu bí ngô dùng vỏ để bảo vệ cây trồng<p>Độ bền: <font color="#FF0000">Cao</font><br>Tính năng: <font color="#FF0000">Có thể trồng vào các cây trồng</font></p>Đầu bí ngô',
    CanGrow: function (c, b, d) {
        var a = b + "_" + d;
        return c[2] ? 1 : oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0]
    },
    GetDY: function (b, c, a) {
        return a[0] ? -12 : -5
    },
    HurtStatus: 0,
    getHurt: function (e, c, b) {

        var d = this, f = d.id, a = $CFun(f);
        switch (true) {
            case c && c < 3:
                d.Die(1);
                break;
            case (d.HP -= b) < 1:
                d.Die();
                break;
            case d.HP < 1334:
                try {
                    d.HurtStatus < 2 && (d.HurtStatus = 2, a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage2.gif");

                } catch (err) {
                    console.log(err)
                }
                break;
            case d.HP < 2667:
                try {
                    d.HurtStatus < 1 && (d.HurtStatus = 1, a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage1.gif", $CFun(f + "_2").src = "images/Plants/PumpkinHead/Pumpkin_back.gif")

                } catch (err) {
                    console.log(err)
                }
        }

    },
    InitTrigger: function () {
    },
    BirthStyle: function (c, d, b, a) {
        b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
        EditEle(b, {id: d}, a, EDAll);
        NewImg(d + "_2", "images/Plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDAll)
    },
    PrivateDie: function (a) {

        ClearChild($CFun(a.id + "_2"))

    }
});


const oFlowerPot = InheritO(CPlants, {
    EName: "oFlowerPot",
    CName: "Bình cắm hoa",
    width: 72,
    height: 68,
    beAttackedPointR: 52,
    SunNum: 25,
    PicArr: ["images/Card/Plants/FlowerPot.png", "images/Card/Plants/FlowerPotG.png", "images/Plants/FlowerPot/FlowerPot.gif"],
    PKind: 0,
    Stature: -1,
    GetDY: function (b, c, a) {
        return 6
    },
    CanGrow: function (e, d, f) {
        var c = d + "_" + f, b = oGd.$LF[d], a = f < 1 || f > 9;
        return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0
    },
    Tooltip: "Làm cho cây mọc trên mái nhà",
    Produce: 'Cho phép bạn trồng cây trên mái nhà<p>Tính năng: <font color="#FF0000">Giúp bạn trồng cây trên mái nhà</font></p>“Bình cắm hoa',
    InitTrigger: function () {
    }
});


const oLilyPad = InheritO(oFlowerPot, {
    EName: "oLilyPad",
    CName: "Hoa lily",
    width: 79,
    height: 58,
    beAttackedPointR: 59,
    PicArr: ["images/Card/Plants/LilyPad.png", "images/Card/Plants/LilyPadG.png", "images/Plants/LilyPad/LilyPad.gif"],
    CanGrow: function (c, b, d) {
        var a = b + "_" + d;
        return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || oGd.$Crater[a])
    },
    Tooltip: "Làm cho cây trồng không phát triển trên nó",
    Produce: 'Hoa Lily làm cho cây trồng không phát triển<p>Tính năng: <font color="#FF0000">Cây trồng không thể trồng trên đó<br>Phải được trồng trong nước'
});


const oPotatoMine = InheritO(CPlants, {
    EName: "oPotatoMine",
    CName: "Boom khoai tây",
    width: 75,
    height: 55,
    beAttackedPointR: 55,
    SunNum: 25,
    coolTime: 30,
    Stature: -1,
    CanGrow: function (d, c, e) {
        var b = c + "_" + e, a = oGd.$LF[c];
        return a % 2 ? a < 3 ? !(e < 1 || e > 9 || d[1] || oGd.$Crater[b] || oGd.$Tombstones[b]) : d[0] && !d[1] : 0
    },
    PicArr: ["images/Card/Plants/PotatoMine.png", "images/Card/Plants/PotatoMineG.png", "images/Plants/PotatoMine/PotatoMine.gif", "images/Plants/PotatoMine/PotatoMineNotReady.gif", "images/Plants/PotatoMine/PotatoMine_mashed.gif", "images/Plants/PotatoMine/ExplosionSpudow.gif"],
    Tooltip: "Phát nổ kẻ thù<br>Cần thời gian để đặt",
    Produce: 'Bom khoai tây có một quyền lực mạnh mẽ của khoai tây, nhưng nó cần thời gian để đặt. Bạn nên đặt chúng trước hướng đi tới của Zombie, khi Zombie đến sẽ nổ tung một bằng cảm ứng.<p>Sát thương: <font color="FF0000">Lớn</font><br>Phạm vi: <font color="#FF0000">Một khu vực nhỏ các Zombies</font><br>Sử dụng: <font color="#FF0000">Sử dụng riêng lẻ, cần thời gian để gài bom</font></p>Bom khoai tây',
    Status: 0,
    canTrigger: 0,
    BirthStyle: function (c, d, b, a) {
        b.childNodes[1].src = "images/Plants/PotatoMine/PotatoMineNotReady.gif";
        EditEle(b, {id: d}, a, EDAll)
    },
    PrivateBirth: function (a) {

        oSym.addTask(1500, function (c) {
            var b = $P[c];
            try {
                b && ($CFun(c).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif", b.Status = 1, b.canTrigger = 1, b.getHurt = function (g, e, d) {
                    var f = this;
                    e > 2 ? (f.HP -= d) < 1 && f.Die() : f.NormalAttack(f.pixelLeft, f.pixelLeft + f.width, f.R)
                })
            } catch (err) {
                console.log(err)
            }

        }, [a.id])

    },
    getTriggerRange: function (a, b, c) {
        return [[b, c, 0]]
    },
    TriggerCheck: function (e, c) {
        var a = this.R, b = this.C;
        e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelLeft + this.width, this.R)
    },
    NormalAttack: function (k, j, f) {

        var h = this, b = h.id, d = $CFun(b), c = oZ.getArZ(k, j, f), g = c.length, a, l = h.pixelLeft, e = h.pixelTop;
        while (g--) {
            (a = c[g]).Altitude < 2 && a.getHurt(0, 0, 1800, 0, 0, 0, 2)
        }
        h.Die(1);
        try {
            EditEle(d.childNodes[1], {src: "images/Plants/PotatoMine/PotatoMine_mashed.gif"}, {
                width: "132px",
                height: "93px",
                left: "-40px",
                top: "-20px"
            });
        } catch (err) {
            console.log(err)
        }

        NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
        oSym.addTask(200, function (i) {
            ClearChild(i.lastChild);
            oSym.addTask(100, ClearChild, [i])
        }, [d])

    }
});


const oTorchwood = InheritO(CPlants, {
    EName: "oTorchwood",
    CName: "Gốc cây cháy",
    width: 73,
    height: 83,
    beAttackedPointR: 53,
    SunNum: 175,
    PicArr: ["images/Card/Plants/Torchwood.png", "images/Card/Plants/TorchwoodG.png", "images/Plants/Torchwood/Torchwood.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PB10.gif", "images/Plants/PB11.gif", "images/Plants/Torchwood/SputteringFire.gif"],
    Tooltip: "Tạo ngọn lửa chuyền vào đạn hạt đậu",
    Produce: 'Trở thành quả cầu lửa hạt đậu, tạo ra hai lần sát thương<p>Tính năng: <font color="#FF0000">Gây hai lần sát thương bởi quả cầu lửa</font></p>Gốc cây cháy',
    PrivateBirth: function (a) {
        oGd.$Torch[a.R + "_" + a.C] = 1
    },
    InitTrigger: function () {
    },
    PrivateDie: function (a) {
        delete oGd.$Torch[a.R + "_" + a.C]
    }
});


const oWallNut = InheritO(CPlants, {
    EName: "oWallNut",
    CName: "Hạt dào cản",
    width: 65,
    height: 73,
    beAttackedPointR: 45,
    SunNum: 50,
    HP: 4000,
    coolTime: 30,
    PicArr: ["images/Card/Plants/WallNut.png", "images/Card/Plants/WallNutG.png", "images/Plants/WallNut/WallNut.gif", "images/Plants/WallNut/Wallnut_cracked1.gif", "images/Plants/WallNut/Wallnut_cracked2.gif"],
    Tooltip: "Cản trở tiến bộ của Zombies",
    Produce: 'Làm rào cản bảo vệ cây trồng<p>Độ bền: <font color="FF0000">Cao</font></p>Hạt rào cản',
    CanGrow: function (c, b, e) {
        var a = b + "_" + e, d = c[1];
        return d && d.EName == "oWallNut" ? 1 : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
    },
    InitTrigger: function () {
    },
    HurtStatus: 0,
    getHurt: function (e, b, a) {
        try{
            var c = this, d = $CFun(c.id).childNodes[1];
            !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/WallNut/Wallnut_cracked2.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/WallNut/Wallnut_cracked1.gif") : c.Die(1)
        }catch (err){
            console.log(err)
        }
        }
});


const oTallNut = InheritO(oWallNut, {
    EName: "oTallNut",
    CName: "Rào cản cao",
    width: 83,
    height: 119,
    beAttackedPointR: 63,
    SunNum: 125,
    HP: 8000,
    PicArr: ["images/Card/Plants/TallNut.png", "images/Card/Plants/TallNutG.png", "images/Plants/TallNut/TallNut.gif", "images/Plants/TallNut/TallnutCracked1.gif", "images/Plants/TallNut/TallnutCracked2.gif"],
    Tooltip: "Hàng rào vững chắc không thể qua",
    Produce: 'Rào cản cao rất vững trãi<p>Độ bền: <font color="#FF0000">Rất cao</font><br>Đặc biệt: <font color="#FF0000">Không thể vượt qua hay qua</font></p>Hạt rào cản cao',
    CanGrow: function (c, b, e) {
        var a = b + "_" + e, d = c[1];
        return d && d.EName == "oTallNut" ? 1 : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
    },
    Stature: 1,
    getHurt: function (e, b, a) {
        try{
            var c = this, d = $CFun(c.id).childNodes[1];
            !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 2667 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/TallNut/TallnutCracked2.gif") : c.HP < 5333 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/TallNut/TallnutCracked1.gif") : c.Die(1)

        }catch (err){
            console.log(err)
        }

    }
});


const oCherryBomb = InheritO(CPlants, {
    EName: "oCherryBomb",
    CName: "Boom dâu tây",
    width: 112,
    height: 81,
    beAttackedPointR: 92,
    SunNum: 150,
    coolTime: 50,
    PicArr: ["images/Card/Plants/CherryBomb.png", "images/Card/Plants/CherryBombG.png", "images/Plants/CherryBomb/CherryBomb.gif", "images/Plants/CherryBomb/Boom.gif"],
    Tooltip: "Sát thương lên tất cả Zombies trong khu vực nhất định",
    Produce: 'Nổ một khu vực nhất định tất cả các Zombies<p>Sát thương: <font color="#FF0000">Lớn</font><br>Phạm vi: <font color="#FF0000">Một khu vực trung bình các Zombies</font><br>Sử dụng: <font color="#FF0000">Sử dụng một mình và ngay lập tức phát nổ</font></p>Bom dâu tây',
    InitTrigger: function () {
    },
    getHurt: function () {
    },
    PrivateBirth: function (a) {

        oSym.addTask(63, function (b) {
            var c = $P[b];
            if (c) {
                var f = $CFun(b), j = c.R, g = j > 2 ? j - 1 : 1, e = j < oS.R ? j + 1 : oS.R, l = c.pixelLeft - 80,
                    k = c.pixelLeft + 160, d, h;
                do {
                    h = (d = oZ.getArZ(l, k, g)).length;
                    while (h--) {
                        d[h].getHurt(0, 0, 1800, 0, 0, 0, 1)
                    }
                } while (g++ < e);
                c.Die(1);
                try{
                    EditEle(f.childNodes[1], {src: "images/Plants/CherryBomb/Boom.gif"}, {
                        width: "213px",
                        height: "160px",
                        left: "-50px",
                        top: "-30px"
                    });
                }catch (err){
                    console.log(err)
                }

                oSym.addTask(65, ClearChild, [f])
            }
        }, [a.id])

    }
});


const oJalapeno = InheritO(oCherryBomb, {
    EName: "oJalapeno",
    CName: "Ớt nóng",
    width: 68,
    height: 89,
    beAttackedPointR: 48,
    PicArr: ["images/Card/Plants/Jalapeno.png", "images/Card/Plants/JalapenoG.png", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
    Tooltip: "Tiêu diệt những kẻ thù theo toàn bộ dây chuyền",
    Produce: 'Ớt nóng phá hủy một dòng kẻ thù<p>Sát thương: <font color="#FF0000">Cao</font><br>Phạm vi: <font color="#FF0000">Toàn bộ dây chuyền của zombies</font><br>Sử dụng: <font color="#FF0000">Sử dụng một mình, với hiệu lực ngay lập tức</font></p>Ớt nóng',
    PrivateBirth: function (a) {

        oSym.addTask(72, function (g) {
            var f = $P[g];
            if (f) {
                var b = $CFun(g), e = f.R, c = oZ.getArZ(100, oS.W, e), d = c.length;
                while (d--) {
                    c[d].getHurt(0, 0, 1800, 0, 0, 0, 1)
                }
                f.Die(1);
                try{
                    EditEle(b.childNodes[1], {src: "images/Plants/Jalapeno/JalapenoAttack.gif"}, {
                        width: "755px",
                        height: "131px",
                        left: 120 - f.pixelLeft + "px",
                        top: "-42px"
                    });
                }catch (err){
                    console.log(err)
                }

                oSym.addTask(135, ClearChild, [b])
            }
        }, [a.id])

    }
});


const oSpikeweed = InheritO(CPlants, {
    EName: "oSpikeweed",
    CName: "Bẫy chuông",
    width: 85,
    height: 35,
    beAttackedPointL: 10,
    beAttackedPointR: 75,
    SunNum: 100,
    Stature: -1,
    canEat: 0,
    PicArr: ["images/Card/Plants/Spikeweed.png", "images/Card/Plants/SpikeweedG.png", "images/Plants/Spikeweed/Spikeweed.gif"],
    Attack: 20,
    ArZ: {},
    Tooltip: "Đâm thủng lốp xe, mà còn làm tổn thương các zombie đi bộ qua",
    Produce: 'Đâm thủng lốp xe, mà còn làm tổn thương các zombie đi bộ qua<p>Sát thương: <font color="#FF0000">Tổng</font><br>Phạm vi: <font color="#FF0000">Mọi Zombies bước qua</font><br>Tính năng: <font color="#FF0000">Sẽ không thể ăn thây ma</font></p>Bẫy chông',
    CanGrow: function (c, b, d) {
        var a = b + "_" + d;
        return !(d < 1 || d > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a])
    },
    getHurt: function (d, b, a) {
        var c = this;
        !(b % 3) ? (c.HP -= a) < 1 && c.Die() : b < 2 ? (d.getHurt(1, 0, 20, 0, 0, 0, 0), c.Die(1)) : (d.HP = d.BreakPoint, d.GoingDie(), c.Die())
    },
    NormalAttack: function (b, a) {
        $Z[b].getHurt(1, 0, this.Attack, 0, 0, 0, 0)
    },
    GetDY: function (b, c, a) {
        return -2
    },
    getTriggerRange: function (a, b, c) {
        return [[this.pixelLeft, this.pixelLeft + this.width, 0]]
    },
    TriggerCheck: function (i, h) {
        var c = i.id, g = this.ArZ, a, b, e, f;
        !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(100, function (d, j) {
            var k = $P[d];
            k && delete k.ArZ[j]
        }, [this.id, c]))
    },
    AttackCheck2: function (a) {
        return a.Altitude == 1 && a.beAttacked
    }
});


const oSpikerock = InheritO(oSpikeweed, {
    EName: "oSpikerock",
    CName: "Bẫy chuông lớn",
    width: 84,
    height: 43,
    beAttackedPointL: 10,
    beAttackedPointR: 74,
    SunNum: 125,
    coolTime: 50,
    PicArr: ["images/Card/Plants/Spikerock.png", "images/Card/Plants/SpikerockG.png", "images/Plants/Spikerock/Spikerock.gif"],
    Attack: 40,
    Tooltip: "Đâm thủng lốp xe, mà còn làm tổn thương các zombie đi bộ qua<br>(Cần có bẫy chông)",
    Produce: 'Đâm thủng lốp xe, mà còn làm tổn thương các zombie đi bộ qua<p><font color="#FF0000">Bẫy chông lớn phải được trồng trong đất</font></p>Bẫy chông lớn',
    CanGrow: function (b, a, d) {
        var c = b[1];
        return c && c.EName == "oSpikeweed"
    },
    GetDY: function (b, c, a) {
        return 0
    },
    getHurt: function (c, b, a) {
        switch (b) {
            case 2:
                c.HP = c.BreakPoint;
                c.GoingDie();
                break;
            case 1:
                c.getHurt(1, 0, 40, 0, 0, 0, 0)
        }
        (this.HP -= a) < 1 && this.Die()
    }
});


const oGarlic = InheritO(CPlants, {
    EName: "oGarlic",
    CName: "Tỏi",
    width: 60,
    height: 59,
    beAttackedPointR: 40,
    SunNum: 50,
    HP: 400,
    PicArr: ["images/Card/Plants/Garlic.png", "images/Card/Plants/GarlicG.png", "images/Plants/Garlic/Garlic.gif", "images/Plants/Garlic/Garlic_body2.gif", "images/Plants/Garlic/Garlic_body3.gif"],
    Tooltip: "Zombie hung hăng sẽ được đưa ngay đến chỗ khác",
    Produce: 'Tỏi có thể thay đổi đường chuyển tiếp của zombies.<p>Phạm vi: <font color="#FF0000">Tiếp xúc gần</font><br>Tính năng: <font color="#FF0000">Thay đổi đường đi phía trước Zombies</font></p>Tỏi',
    CanGrow: function (c, b, e) {
        var a = b + "_" + e, d = c[1];
        return d && d.EName == "oGarlic" ? 1 : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
    },
    InitTrigger: function () {
    },
    HurtStatus: 0,
    getHurt: function (e, b, a) {
        try{
            var c = this, d = $CFun(c.id).childNodes[1];
            !(b % 3) ? (c.HP -= 20) < 1 ? c.Die() : (e.ChangeR({R: c.R}), c.HP < 134 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/Garlic/Garlic_body3.gif") : c.HP < 267 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/Garlic/Garlic_body2.gif")) : c.Die(1)

        }catch (err){
            console.log(err)
        }

    }
});


const oSquash = InheritO(CPlants, {
    EName: "oSquash",
    CName: "Bí",
    width: 100,
    height: 226,
    beAttackedPointR: 67,
    SunNum: 50,
    coolTime: 30,
    PicArr: ["images/Card/Plants/Squash.png", "images/Card/Plants/SquashG.png", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
    Tooltip: "Bí gần với zombies",
    Produce: 'Bí cảm tử cho Zombie nghiền nát<p>Sát thương: <font color="#FF0000">Cao</font><br>Phạm vi: <font color="#FF0000">ngắn</font><br>Sử dụng: <font color="#FF0000">Sử dụng riêng biệt</font></p>Bí',
    GetDY: function (b, c, a) {
        return a[0] ? -21 : -10
    },
    getHurt: function (d, b, a) {
        var c = this;
        b - 3 ? c.NormalAttack(d) : (c.HP -= a) < 1 && c.Die()
    },
    getTriggerRange: function (a, b, c) {
        return [[b - 50, c + 80, 0]]
    },
    TriggerCheck: function (h, g, e) {

        var c = h.ZX, b = this.id, a = $CFun(b).childNodes[1], f = h.isAttacking;
        h.beAttacked && h.Altitude > -1 && h.Altitude < 2 && (f || !f && c - this.AttackedRX < 71) && (oT.$[this.R].splice(e, 1), a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png", oSym.addTask(100, function (d, j, i) {
            var k = $P[d];
            k && k.NormalAttack(k, h.id, i)
        }, [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]))

    },
    NormalAttack: function (d, c, b) {

        var a = $CFun(d.id), e = $Z[c];
        e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
        try{
            a.childNodes[1].src = "images/Plants/Squash/SquashAttack.gif" + $Random + Math.random();
            SetStyle(a, {left: b + "px"});
        }catch (err){
            console.log(err)
        }

        d.Die(1);
        oSym.addTask(45, function (f, l, j) {
            var g = oZ.getArZ(l, l + 100, j), h = g.length, k;
            while (h--) {
                (k = g[h]).Altitude > -1 && k.Altitude < 3 && k.getHurt(0, 0, 1800, 0, 0, 0, 2)
            }
            oSym.addTask(185, ClearChild, [f])
        }, [a, b, d.R])

    }
});


const oChomper = InheritO(CPlants, {
    EName: "oChomper",
    CName: "Hoa ăn thịt",
    width: 130,
    height: 114,
    beAttackedPointR: 70,
    SunNum: 150,
    PicArr: ["images/Card/Plants/Chomper.png", "images/Card/Plants/ChomperG.png", "images/Plants/Chomper/Chomper.gif", "images/Plants/Chomper/ChomperAttack.gif", "images/Plants/Chomper/ChomperDigest.gif"],
    Tooltip: "Có khả năng nuốt một thây ma, trong trạng thái nhai rất yếu",
    Produce: 'Có thể nuốt chửng Zombies, nhưng dễ bị tổn thuông khi đang tiêu hóa<p>Sát thương: <font color="#FF0000">Lớn</font><br>Phạm vi: <font color="#FF0000">Rất gần</font><br>Tính năng: <font color="#FF0000">Một thời gian rất dài để tiêu hóa</font></p>Hoa ăn thịt',
    GetDX: function () {
        return -40
    },
    getShadow: function (a) {
        return "top:" + (a.height - 22) + "px"
    },
    getTriggerRange: function (a, b, c) {
        return [[this.pixelLeft, c + 80, 0]]
    },
    TriggerCheck: function (a) {
        this.AttackCheck2(a) && (this.canTrigger = 0, this.NormalAttack(this.id, a.id))
    },
    AttackCheck2: function (a) {
        return a.Altitude == 1 && a.beAttacked
    },
    NormalAttack: function (a, b) {
        try{
            $CFun(a).childNodes[1].src = "images/Plants/Chomper/ChomperAttack.gif" + $Random + Math.random();
        }catch (err){
            console.log(err)
        }

        oSym.addTask(70, function (c, d) {
            var e;
            $P[c] && ((e = $Z[d]) && e.beAttacked ? oSym.addTask(18, function (f) {
                var g = $P[f];
                try{
                    g && ($CFun(f).childNodes[1].src = e.getRaven(f) ? (oSym.addTask(4200, function (h) {
                        var i = $P[h];
                        i && (i.canTrigger = 1, $CFun(h).childNodes[1].src = "images/Plants/Chomper/Chomper.gif")
                    }, [f]), "images/Plants/Chomper/ChomperDigest.gif") : (g.canTrigger = 1, "images/Plants/Chomper/Chomper.gif"))
                }catch (err){
                    console.log(err)
                }

            }, [c]) : oSym.addTask(18, function (f) {
                var g = $P[f];
                try{
                    g && (g.canTrigger = 1, $CFun(f).childNodes[1].src = "images/Plants/Chomper/Chomper.gif")
                }catch (err){
                    console.log(err)
                }

            }, [c]))
        }, [a, b])

    }
});


const oFumeShroom = InheritO(CPlants, {
    EName: "oFumeShroom",
    CName: "Nấm phun",
    width: 100,
    height: 88,
    beAttackedPointR: 80,
    SunNum: 75,
    SleepGif: 3,
    PicArr: ["images/Card/Plants/FumeShroom.png", "images/Card/Plants/FumeShroomG.png", "images/Plants/FumeShroom/FumeShroom.gif", "images/Plants/FumeShroom/FumeShroomSleep.gif", "images/Plants/FumeShroom/FumeShroomAttack.gif", "images/Plants/FumeShroom/FumeShroomBullet.gif"],
    Tooltip: "Nấm phun dịch",
    Produce: 'Nấm phun ra lượng lớn có thể xuyên qua dây thép gai<p>Sát thương: <font color="#FF0000">tổng, xuyên qua cửa dây thép gai</font><br>Phạm vi: <font color="#FF0000">Mùi hôi tất cả các zombies<br>Ngủ suốt ngày</font></p>Nấm phun lớn',
    GetDY: function (b, c, a) {
        return a[0] ? -18 : -10
    },
    GetDX: function () {
        return -45
    },
    BirthStyle: function (c, d, b, a) {
        oS.DKind && (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]);
        EditEle(b, {id: d}, a, EDAll)
    },
    PrivateBirth: function (b) {
        var a = b.id;
        NewEle(a + "_Bullet", "div", "position:absolute;display:none;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDAll)
    },
    PrivateDie: function (a) {

        ClearChild($CFun(a.id + "_Bullet"))

    },
    getTriggerRange: function (a, b, c) {
        return [[b, Math.min(c + 330, 900), 0]]
    },
    NormalAttack: function () {

        var f = this, d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, 900), f.R), e = d.length, g, c = f.id,
            b = $CFun(c), a = c + "_Bullet";
        while (e--) {
            (g = d[e]).Altitude < 2 && g.getHurt(0, 0, 20, 0, 0, 0, 0)
        }
        try{
            b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
        }catch (err){
            console.log(err)
        }

        SetBlock($CFun(a));
        ImgSpriter(a, c, [["0 0", 90, 1], ["0 -62px", 90, 2], ["0 -124px", 90, 3], ["0 -186px", 90, 4], ["0 -248px", 90, 5], ["0 -310px", 90, 6], ["0 -372px", 90, 7], ["0 -434px", 90, -1]], 0, function (i, j) {
            var h = $CFun(j);
            try{
                $P[j] && (h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif");
            }catch (err){
                console.log(err)
            }

            SetNone($CFun(i))
        })

    }
});


const oCoffeeBean = InheritO(CPlants, {
    EName: "oCoffeeBean",
    CName: "Hạt cafe",
    width: 39,
    height: 97,
    beAttackedPointL: 10,
    beAttackedPointR: 29,
    SunNum: 75,
    PKind: 3,
    canEat: 0,
    PicArr: ["images/Card/Plants/CoffeeBean.png", "images/Card/Plants/CoffeeBeanG.png", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif"],
    Tooltip: "Đánh thức nấm phun ngủ ngày",
    Produce: 'Hạt cà phê đánh thức nấm phun lớn<p>Sử dụng: <font color="#FF0000">Sử dụng một mình, với hiệu lực ngay lập tức</font><br>Tính năng: <font color="#FF0000">Có thể trồng trong các cây trồng, dùng để đánh thức nấm phun</font></p>Hạt cà phê',
    InitTrigger: function () {
    },
    GetDBottom: function () {
        return 49
    },
    GetDY: function () {
        return -30
    },
    CanGrow: function (a, b) {
        return (b = a[1]) && b.Sleep && !a[3]
    },
    BirthStyle: function (c, d, b, a) {
        b.childNodes[1].src = "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random + Math.random();
        EditEle(b, {id: d}, a, EDAll)
    },
    PrivateBirth: function (a) {

        oSym.addTask(240, function (c) {
            var d = oGd.$[c], b;
            try{
                d && (b = d.WakeUP, (!b ? ($CFun(d.id).childNodes[1].src = d.PicArr[d.NormalGif], d.canTrigger = 1, d.Sleep = 0) : b(d)));

            }catch (err){
                console.log(err)
            }
            a.Die()
        }, [a.R + "_" + a.C + "_1"])

    }
});


const oGloomShroom = InheritO(oFumeShroom, {
    EName: "oGloomShroom",
    CName: "Gloom",
    width: 88,
    height: 83,
    beAttackedPointR: 68,
    SunNum: 150,
    coolTime: 50,
    PicArr: ["images/Card/Plants/GloomShroom.png", "images/Card/Plants/GloomShroomG.png", "images/Plants/GloomShroom/GloomShroom.gif", "images/Plants/GloomShroom/GloomShroomSleep.gif", "images/Plants/GloomShroom/GloomShroomAttack.gif", "images/Plants/GloomShroom/GloomShroomBullet.gif"],
    Tooltip: "Giải phóng lượng lớn bông cừu<br>(Cần nấm phun lớn)",
    Produce: 'Chuyển đổi giới tính hủy diệt, giải phóng lượng lớn bông cừu<p><font color="#FF0000">Phải được trồng trên nấm phun lớn</font></p>Gloom',
    CanGrow: function (b, a, d) {
        var c = b[1];
        return c && c.EName == "oFumeShroom"
    },
    BirthStyle: function (c, d, b, a) {
        oGd.$[c.R + "_" + c.C + "_1"].Sleep && (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = c.PicArr[3]);
        EditEle(b, {id: d}, a, EDAll)
    },
    GetDX: CPlants.prototype.GetDX,
    PrivateBirth: function (b) {
        var a = b.id;
        NewEle(a + "_Bullet", "div", "position:absolute;display:none;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Plants/GloomShroom/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDAll)
    },
    PrivateDie: function (a) {

        ClearChild($CFun(a.id + "_Bullet"))

    },
    getTriggerRange: function (c, d, e) {
        var f = GetX(this.C), b = this.MinX = f - 120, a = this.MaxX = f + 120;
        return [[b, a, 0]]
    },
    getTriggerR: function (c) {
        var b = this.MinR = c > 2 ? c - 1 : 1, a = this.MaxR = c < oS.R ? c + 1 : c;
        return [b, a]
    },
    NormalAttack: function () {

        var k = this, g, f = k.MaxR, c = k.MinX, b = k.MaxX, e, h, a, j = k.id, d = $CFun(j), l = j + "_Bullet";
        for (g = k.MinR; g <= f; g++) {
            e = oZ.getArZ(c, b, g);
            for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHurt(0, 0, 80, 0, 0, 0, 0)) {
            }
        }
        try{
            d.childNodes[1].src = "images/Plants/GloomShroom/GloomShroomAttack.gif";
        }catch (err){
            console.log(err)
        }

        SetBlock($CFun(l));
        ImgSpriter(l, j, [["0 0", 90, 1], ["0 -200px", 90, 2], ["0 -400px", 90, 3], ["0 -600px", 90, 4], ["0 -800px", 90, 5], ["0 -1000px", 90, 6], ["0 -1200px", 90, 7], ["0 -1400px", 90, 8], ["0 -1600px", 90, 9], ["0 -1800px", 90, 10], ["0 -2000px", 90, 11], ["0 -2200px", 90, -1]], 0, function (m, n) {
            var i = $CFun(n);
            try{
                $P[n] && (i.childNodes[1].src = "images/Plants/GloomShroom/GloomShroom.gif");
            }catch (err){
                console.log(err)
            }

            SetNone($CFun(m))
        })

    }
});


const oPuffShroom = InheritO(oFumeShroom, {
    EName: "oPuffShroom",
    CName: "Nấm phu nhỏ",
    width: 40,
    height: 66,
    beAttackedPointL: 15,
    beAttackedPointR: 25,
    SunNum: 0,
    Stature: -1,
    PicArr: ["images/Card/Plants/PuffShroom.png", "images/Card/Plants/PuffShroomG.png", "images/Plants/PuffShroom/PuffShroom.gif", "images/Plants/PuffShroom/PuffShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
    Tooltip: "Bắn kẻ thù cự ly ngắn",
    Produce: 'Nấm phun nhỏ là miễn phí nhưng cự ly gần<p>Sát thương: <font color="#FF0000">Trung bình</font><br>Phạm vi: <font color="#FF0000">Gần<br>Ngủ vào ban ngày</font></p>Nấm phun nhỏ',
    GetDX: CPlants.prototype.GetDX,
    getTriggerRange: function (a, b, c) {
        return [[b, Math.min(c + 250, 900), 0]]
    },
    PrivateBirth: function (c) {
        var b = c.AttackedLX, a = b - 46;
        c.BulletClass = NewO({X: b, R: c.R, pixelLeft: a, F: oGd.MB2});
        c.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + a + "px;top:" + (c.pixelTop + 40) + "px;display:none;z-index:" + (c.zIndex + 2))
    },
    PrivateDie: function (a) {
        a.BulletEle = null
    },
    NormalAttack: function () {

        var b = this, a = new b.BulletClass, c = a.id = "PSB" + Math.random();
        EditEle(b.BulletEle.cloneNode(false), {id: c}, 0, EDAll);
        oGd.$B.push(a);
        oSym.addTask(15, function (e) {
            var d = $CFun(e);
            d && SetBlock(d)
        }, [c])

    }
});


const oScaredyShroom = InheritO(oFumeShroom, {
    EName: "oScaredyShroom",
    CName: "Nấm nhút nhát",
    width: 57,
    height: 81,
    beAttackedPointR: 37,
    SunNum: 25,
    Cry: 0,
    ArZ: [],
    Attacking: 0,
    PicArr: ["images/Card/Plants/ScaredyShroom.png", "images/Card/Plants/ScaredyShroomG.png", "images/Plants/ScaredyShroom/ScaredyShroom.gif", "images/Plants/ScaredyShroom/ScaredyShroomSleep.gif", "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
    Tooltip: "Bắn từ xa",
    Produce: 'Nấm nhút nhát là bắn súng tầm xa, địch sẽ ẩn thân.<p>Sát thương: <font color="#FF0000">thường</font><br>Tính năng: <font color="#FF0000">Ngưng các cuộc tấn công sau khi kết thúc đối phương<br>Ngủ suốt ngày</font></p>Nấm nhút nhát',
    GetDX: CPlants.prototype.GetDX,
    getTriggerRange: CPlants.prototype.getTriggerRange,
    getTriggerR: function (c) {
        var b = this.MinR = c > 2 ? c - 1 : 1, a = this.MaxR = c < oS.R ? c + 1 : c;
        return [b, a]
    },
    TriggerCheck: function (e, c) {

        var b = this, a = b.id;
        try{
            Math.abs(e.ZX - b.MX) < 121 && e.beAttacked ? (b.ArZ.push(e.id), !b.Cry && (b.Cry = 1, $CFun(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", b.CryCheck(a))) : (!b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack())

        }catch (err){
            console.log(err)
        }

    },
    PrivateBirth: function (c) {
        var b = c.AttackedLX, a = b - 46;
        c.BulletClass = NewO({X: b, R: c.R, pixelLeft: a, F: oGd.MB2});
        c.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + a + "px;top:" + (c.pixelTop + 35) + "px;display:none;z-index:" + (c.zIndex + 2));
        c.MX = b + 9
    },
    PrivateDie: function (a) {
        a.BulletEle = null
    },
    NormalAttack: function () {

        var c = this, a = c.id, b = new c.BulletClass, d = b.id = "SSB" + Math.random();
        EditEle(c.BulletEle.cloneNode(false), {id: d}, 0, EDAll);
        oGd.$B.push(b);
        c.Attacking = 1;
        oSym.addTask(10, function (g, e) {
            var f = $CFun(g);
            f && SetBlock(f);
            oSym.addTask(130, function (h) {
                var i = $P[h];
                i && (i.Attacking = 0)
            }, [e])
        }, [d, a])

    },
    CryCheck: function (a) {

        oSym.addTask(140, function (b) {
            var d = $P[b], c, f, e;
            if (d) {
                c = (f = d.ArZ).length;
                while (c--) {
                    (!(e = $Z[f[c]]) || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1)
                }
                try{
                    f.length ? d.CryCheck(b) : (d.Cry = 0, $CFun(b).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif")

                }catch (err){
                    console.log(err)
                }
            }
        }, [a])

    }
});


const oSunShroom = InheritO(oFumeShroom, {
    EName: "oSunShroom",
    CName: "Nấm quyến rũ",
    width: 59,
    height: 61,
    beAttackedPointL: 15,
    beAttackedPointR: 44,
    SunNum: 25,
    Stature: -1,
    Status: 0,
    PicArr: ["images/Card/Plants/SunShroom.png", "images/Card/Plants/SunShroomG.png", "images/Plants/SunShroom/SunShroom2.gif", "images/Plants/SunShroom/SunShroomSleep.gif", "images/Plants/SunShroom/SunShroom.gif"],
    Tooltip: "Cho phép một thây ma đấu tranh cho bạn",
    Produce: 'Khi Zombies ăn nấm quyến rũ , chúng sẽ chiến đấu cho bạn<p>Sử dụng: <font color="#FF0000">Sử dụng một mình, lực lượng liên hệ<br>Tính năng: <font color="#FF0000">Cho phép một thây ma đấu tranh cho bạn<br>Ngủ suốt ngày</font></p>Nấm quyến rũ',
    GetDX: CPlants.prototype.GetDX,
    GetDY: CPlants.prototype.GetDY,
    InitTrigger: function () {
    },
    PrivateDie: function (a) {
    },
    PrivateBirth: function () {
    },
    BirthStyle: function (c, d, b, a) {

        oS.DKind ? (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = "images/Plants/SunShroom/SunShroomSleep.gif") : (oSym.addTask(600, function (h, g, f) {
            var e = $P[h];
            e && e.ProduceSun(e, g, f)
        }, [d, GetX(c.C) - 40, GetY(c.R)]), oSym.addTask(12000, function (f) {
            var e = $P[f];
            try{
                e && (e.Sleep = 0, $CFun(f).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif", e.Status = 1)

            }catch (err){
                console.log(err)
            }
        }, [d]));
        EditEle(b, {id: d}, a, EDAll)

    },
    ProduceSun: function (a, c, b) {
        AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0), oSym.addTask(2400, function (g, f, e) {
            var d = $P[g];
            d && d.ProduceSun(d, f, e)
        }, [a.id, c, b])
    },
    WakeUP: function (a) {

        var b = a.id;
        a.ProduceSun(a, GetX(a.C) - 40, GetY(a.R));
        try{
            $CFun(b).childNodes[1].src = "images/Plants/SunShroom/SunShroom2.gif";

        }catch (err){
            console.log(err)
        }
        a.Sleep = 0;
        oSym.addTask(12000, function (d) {
            var c = $P[d];
            try{
                c && ($CFun(d).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif", c.Status = 1)

            }catch (err){
                console.log(err)
            }
        }, [b])

    }
});
