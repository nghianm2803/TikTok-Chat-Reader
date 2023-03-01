const CZombies = function (b, a) {
    return (a = function () {
    }).prototype = {
        name: "Zombies",
        HP: 270,
        Lvl: 1,
        NormalGif: 2,
        CardGif: 0,
        AttackGif: 3,
        LostHeadGif: 4,
        LostHeadAttackGif: 5,
        HeadGif: 6,
        DieGif: 7,
        BoomDieGif: 8,
        width: 166,
        height: 144,
        beAttackedPointL: 82,
        beAttackedPointR: 156,
        BreakPoint: 90,
        SunNum: 50,
        coolTime: 0,
        Ornaments: 0,
        OrnHP: 0,
        OSpeed: 1.6,
        Speed: 1.6,
        AKind: 0,
        beAttacked: 1,
        isAttacking: 0,
        Attack: 100,
        WalkDirection: 0,
        Altitude: 1,
        canSlow: 1,
        canFreeze: 1,
        canSputtering: 1,
        canRaven: 1,
        canSetbody: 1,
        FreeSetbodyTime: "",
        FreeFreezeTime: "",
        FreeSlowTime: "",
        CanPass: function (d, c) {
            return c && c != 2
        },
        CanGrow: function (d, c, e) {
            return this.CanPass(c, oGd.$LF[c]) && e > oS.ArP.ArC[1]
        },
        GetDX: function () {
            return -110
        },
        GetDY: function () {
            return -10
        },
        getRaven: function (c) {
            return this.Die(2), 1
        },
        ChangeR: function (e) {
            var h = e.R, g = e.ar || [], k = e.CustomTop, d = this, r = h - 1, m, l = d.id, n = -1, f = $CFun(l),
                q = f.childNodes[1], j = oGd.$LF, c;
            !g.length && (d.CanPass(r, j[r]) && (g[++n] = r), d.CanPass(r += 2, j[r]) && (g[++n] = r));
            g.length ? (m = !d.WalkDirection ? -5 : 5, d.ZX += m, d.AttackedLX += m, d.AttackedRX += m, d.X += m, r = g[Math.floor(Math.random() * g.length)], SetStyle(f, {
                left: d.X + "px",
                top: (d.pixelTop = k == undefined ? GetY(r) - d.height + d.GetDY() : k) + "px",
                zIndex: d.zIndex = 3 * r + 1
            }), d.isAttacking && (q.src = d.PicArr[d.NormalGif]), oZ.moveTo(l, h, r), ZombieWin(e, this.name, this.score, this.userId, this.avatar)) : q.src = d.PicArr[d.NormalGif];
            d.isAttacking = 0
        },
        getShadow: function (c, bonusSpaceLeft = 0, bonusSpaceTop = 0) {
            return "left:" + (c.beAttackedPointL - 10 + bonusSpaceLeft) + "px;top:" + (c.height - 22 + bonusSpaceTop) + "px"
        },
        Init: function (g, j, e, d) {
            var c = 0, h = this, f = [];
            j.AttackedRX = (j.X = (j.ZX = j.AttackedLX = g) - j.beAttackedPointL) + j.beAttackedPointR;
            while (--d) {
                j.CanPass(d, e[d]) && (f[c++] = d)
            }
            j.ArR = f;
            j.ArHTML = [
                '<div id="',
                '" style="position:absolute;visibility:',
                ";left:",
                "px;top:",
                "px;z-index:",
                '"><img src="' + ShadowPNG + '" style="' + j.getShadow(j) + '"><img style="position:absolute;clip:rect(0,auto,',
                ',0);top:',
                'px" src="' + j.PicArr[j.NormalGif] + '"><img src="',
                j.getShadow(j, 15) + ';width: 50px;height: 50px;border: 2px solid #fff;border-radius: 30px; transform: rotateY(180deg);"><img src="images/vip.png" style="'+j.getShadow(j, 15, -44)+';width: 50px;height: 50px;transform: rotateY(180deg);',
                '"></div>']
            // j.ArHTML = ['<div id="', '" style="position:absolute;visibility:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + j.getShadow(j) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);top:", 'px" src="' + j.PicArr[j.NormalGif] + '"></div>']
        },
        getHTML: function (k, f, e, j, h, c, d, avatar, isVip) {
            var g = this.ArHTML;
            // return g[0] + k + g[1] + h + g[2] + f + g[3] + e + g[4] + j + g[5] + name + g[6] + c + g[7] + d + g[8]
            return g[0] + k + g[1] + h + g[2] + f + g[3] + e + g[4] + j + g[5] + c + g[6] + d + g[7] + (avatar ? avatar + "\" style=\"" : "\" style=\"visibility: hidden;") + g[8] + (isVip?"visibility: visible;":"visibility: hidden;") + g[9]
        },
        getVisible: "visible",
        prepareBirth: function (delayTime, userId, isVip, name = "", avatar = undefined, score, numOfLane) {
            var zombie = this, e = zombie.ArR, g = GetY(numOfLane) + zombie.GetDY(),
                c = g - zombie.height, k = 3 * numOfLane + 1, j = zombie.id = "Z_" + Math.random();
            zombie.R = numOfLane;
            zombie.pixelTop = c;
            zombie.zIndex = k;
            zombie.name = name;
            zombie.userId = userId;
            zombie.avatar = avatar;
            zombie.score = score;
            zombie.isVip = isVip;
            (zombie.delayT = delayTime) && (zombie.FreeSetbodyTime = oSym.Now);
            return zombie.getHTML(j, zombie.X, c, k, zombie.getVisible, "auto", 0, zombie.avatar, zombie.isVip)
        },
        CustomBirth: function (j, c, d, n) {
            var g = this, f = GetY(j) + g.GetDY(), h = f - g.height, l = 3 * j + 1, e = g.id = "Z_" + Math.random(),
                m = g.beAttackedPointL, k = g.beAttackedPointR;
            g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = GetX(c) - (k - m) * 0.5) - m) + k;
            g.R = j;
            g.pixelTop = h;
            g.zIndex = l;
            (g.delayT = d) && (g.FreeSetbodyTime = oSym.Now);
            return g.getHTML(e, g.X, h, l, g.getVisible, n || 0, g.height + "px")
        },
        BirthCallBack: function (d) {
            var c = d.delayT;
            c && oSym.addTask(c, function (e) {
                e.FreeSetbodyTime = ""
            }, [d])
        },
        Birth: function () {
            var c = this;
            oZ.add($Z[c.id] = c);
            c.BirthCallBack(c)
        },
        Die: function (d) {
            var e = this, f = e.id, c = $CFun(f);
            try{
                !d ? (c.childNodes[1].src = e.PicArr[e.DieGif] + Math.random(), oSym.addTask(250, ClearChild, [c])) : d < 2 ? (c.childNodes[1].src = e.PicArr[e.BoomDieGif] + Math.random(), oSym.addTask(300, ClearChild, [c])) : ClearChild(c);
            }catch (err){
                console.log(err)
            }
            e.HP = 0;
            delete $Z[f];
            // oP.MonPrgs()

        },
        GoingDieHead: function (e, c, d) {
            oSym.addTask(200, ClearChild, [NewImg(0, c[d.HeadGif] + Math.random(), "left:" + d.AttackedLX + "px;top:" + (d.pixelTop - 20) + "px;z-index:" + d.zIndex, EDAll)])
        },
        GoingDie: function (d) {
            var c = this, e = c.id;
            try{
                $CFun(e).childNodes[1].src = d;
            }catch (err){
                console.log(err)
            }

            c.GoingDieHead(e, c.PicArr, c);
            c.beAttacked = 0;
            c.FreeFreezeTime = c.FreeSetbodyTime = c.FreeSlowTime = "";
            c.AutoReduceHP(e)
        },
        AutoReduceHP: function (c) {
            oSym.addTask(100, function (e) {
                var d = $Z[e];
                d && ((d.HP -= 60) < 1 ? d.Die() : d.AutoReduceHP(e))
            }, [c])
        },
        JudgeAttack: function () {
            var g = this, d = g.ZX, e = g.R + "_", f = GetC(d), h = oGd.$, c;
            try{
                (c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) ? c[0](c[1], c[2]) : g.isAttacking && (g.isAttacking = 0, $CFun(g.id).childNodes[1].src = g.PicArr[g.NormalGif])

            }catch (err){
                console.log(err)
            }
        },
        JudgeLR: function (f, d, e, c, g) {
            return e > 10 || e < 1 ? false : function () {
                d += --e + "_";
                var h = 3, k;
                while (h--) {
                    if ((k = g[d + h]) && k.canEat && k.AttackedRX >= c && k.AttackedLX <= c) {
                        return [f.NormalAttack, f.id, k.id]
                    }
                }
            }()
        },
        JudgeSR: function (f, d, e, c, g) {
            return e > 9 ? false : function () {
                d += e + "_";
                var h = 3, k;
                while (h--) {
                    if ((k = g[d + h]) && k.canEat && k.AttackedRX >= c && k.AttackedLX <= c) {
                        return [f.NormalAttack, f.id, k.id]
                    }
                }
            }()
        },
        NormalAttack: function (d, c) {
            var e = $Z[d];
            try{
                e && !e.isAttacking && (e.isAttacking = 1, $CFun(d).childNodes[1].src = e.PicArr[e.AttackGif]);
            }catch (err){
                console.log(err)
            }

            oSym.addTask(100, function (g, f) {
                var j = $Z[g], h;
                j && j.beAttacked && !j.FreeFreezeTime && !j.FreeSetbodyTime && ((h = $P[f]) && h.getHurt(j, j.AKind, !j.FreeSlowTime ? j.Attack : Math.round(j.Attack * 0.5)), j.JudgeAttack())
            }, [d, c])

        }
    }, a
}();


const OrnNoneZombies = InheritO(CZombies, {
    getHurt: function (l, a, j, q, c, n, m) {
        var e = this;
        if (!e.beAttacked) {
            m && e.Die(2);
            return
        }
        var f, h, b = e.id, k = e.HP, d = e.PicArr, g = e.isAttacking;
        switch (true) {
            case (k -= j) < 1:
                e.HP = 0;
                e.Die(m);
                return;
            case k < 91:
                e.HP = k;
                e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][g]]);
                return;
            default: {
                e.HP = k;
                switch (q) {
                    case 0:
                        break;
                    case -1:
                        e.canSlow && (!e.FreeSlowTime && (e.Speed *= 0.5), oSym.addTask(1000, function (o, s, r) {
                            (r = $Z[o]) && s == r.FreeSlowTime && (r.FreeSlowTime = "", r.Speed = r.OSpeed)
                        }, [b, e.FreeSlowTime = oSym.Now]));
                        break;
                    default:
                        e.FreeSlowTime && (e.FreeSlowTime = "", e.Speed = e.OSpeed);
                        if (e.canSputtering) {
                            f = !a ? oZ.getArZ(e.AttackedLX, e.AttackedLX + 40, e.R) : oZ.getArZ(e.AttackedRX - 40, e.AttackedRX, e.R);
                            for (h = f.length; h--; f[h].canSputtering && f[h].getHurt(1, 0, 13, 0, 0, 0, 0)) {
                            }
                        }
                }
                try{
                    SetAlpha($CFun(b).childNodes[1], 50, 0.5);
                }catch (err){
                    console.log(err)
                }

                oSym.addTask(10, function (o) {
                    try{
                        $Z[o] && SetAlpha($CFun(o).childNodes[1], 100, 1)
                    }catch (err){
                        console.log(err)
                    }

                }, [b])

            }
        }
    }
});


const oZombie = InheritO(OrnNoneZombies, {
    EName: "oZombie",
    CName: "Buộc Zombie",
    PicArr: (function () {
        var a = "images/Zombies/Zombie/";
        return ["images/Card/Zombies/zombie.png", "images/Card/Zombies/zombieG.png", a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random]
    })(),
    Produce: 'Thông thường Zombie<p>dẻo dai：<font color="#FF0000">thấp</font></p>Các zombies yêu não, tham lam hơn là hài lòng. Não, não, não, ngày và đêm theo đuổi. Bộ não cũ và có mùi? Thối rữa não? Không quan trọng. Zombie cần chúng.'
});


const oZombie2 = InheritO(oZombie, {EName: "oZombie2"}, {PicArr: {0: "images/Zombies/Zombie/Zombie2.gif"}});


const oZombie3 = InheritO(oZombie, {EName: "oZombie3"}, {PicArr: {0: "images/Zombies/Zombie/Zombie3.gif"}});


const oFlagZombie = InheritO(oZombie, {
    EName: "oFlagZombie",
    CName: "Cờ Zombie",
    OSpeed: 2.2,
    Speed: 2.2,
    beAttackedPointR: 101,
    Produce: 'Cờ đánh dấu sự tấn công sắp xảy ra của rất nhiều zombie "dòng chảy". <p> Thích nghi: <font color="#FF0000"> thấp </ font> </ p> Không nghi ngờ gì, vẫy cờ zombie yêu bộ não. Nhưng trong tim bị ám ảnh với các cờ. Có lẽ vì các cờ cũng vẽ để ý, thật khó để nói.'
}, {
    PicArr: {
        2: "images/Zombies/FlagZombie/FlagZombie.gif",
        3: "images/Zombies/FlagZombie/FlagZombieAttack.gif",
        4: "images/Zombies/FlagZombie/FlagZombieLostHead.gif",
        5: "images/Zombies/FlagZombie/FlagZombieLostHeadAttack.gif"
    }
});


const OrnIZombies = InheritO(CZombies, {
    Ornaments: 1, OrnLostNormalGif: 9, OrnLostAttackGif: 10, getHurt: function (j, a, g, n, c, l, k) {
        var e = this;
        if (!e.beAttacked) {
            k && e.Die(2);
            return
        }
        var b = e.id, m = e.OrnHP, h = e.HP, f = e.isAttacking, d = e.PicArr;
        switch (true) {
            case !m:
                switch (true) {
                    case (h -= g) < 1:
                        e.HP = 0;
                        e.Die(k);
                        return;
                    case h < 91:
                        e.HP = h;
                        e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
                        return
                }
                e.HP = h;
                break;
            case (m -= g) > 0:
                e.OrnHP = m;
                break;
            case m < 0:
                switch (true) {
                    case (h += m) < 1:
                        e.HP = 0;
                        e.Die(k);
                        return;
                    case h < 91:
                        e.HP = h;
                        e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
                        return
                }
                e.HP = h;
            default: {
                try {
                    e.OrnHP = 0;
                    try{
                        $CFun(b).childNodes[1].src = e.PicArr[[e.NormalGif = e.OrnLostNormalGif, e.AttackGif = e.OrnLostAttackGif][f]]
                    }catch (err){
                        console.log(err)
                    }

                } catch (err) {
                    console.log(err)
                }

            }
        }
        switch (n) {
            case 0:
                break;
            case -1:
                e.canSlow && (!e.FreeSlowTime && (e.Speed = e.OSpeed * 0.5), oSym.addTask(1000, function (o, r, q) {
                    (q = $Z[o]) && r == q.FreeSlowTime && (q.FreeSlowTime = "", q.Speed = q.OSpeed)
                }, [b, e.FreeSlowTime = oSym.Now]));
                break;
            default:
                e.FreeSlowTime && (e.FreeSlowTime = "", e.Speed = e.OSpeed);
                if (e.canSputtering) {
                    ar = !a ? oZ.getArZ(e.AttackedLX, e.AttackedLX + 40, e.R) : oZ.getArZ(e.AttackedRX - 40, e.AttackedRX, e.R);
                    for (i = ar.length; i--; ar[i].canSputtering && ar[i].getHurt(1, 0, 13, 0, 0, 0, 0)) {
                    }
                }
        }
        try{
            SetAlpha($CFun(b).childNodes[1], 50, 0.5);
        }catch (err){
            console.log(err)
        }

        oSym.addTask(10, function (o) {
            try{
                $Z[o] && SetAlpha($CFun(o).childNodes[1], 100, 1)
            }catch (err){
                console.log(err)
            }

        }, [b])

    }
});


const oConeheadZombie = InheritO(OrnIZombies, {
    EName: "oConeheadZombie",
    CName: "Barrier Zombie",
    OrnHP: 370,
    Lvl: 2,
    SunNum: 75,
    PicArr: (function () {
        var b = "images/Zombies/ConeheadZombie/", a = "images/Zombies/Zombie/";
        return ["images/Card/Zombies/ConeheadZombie.png", "images/Card/Zombies/ConeheadZombieG.png", b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif"]
    })(),
    Produce: 'Zombie có đội mũ bảo hiểm<p>Độ bền: <font color="#FF0000">Trung</font></p>'
});


const oBucketheadZombie = InheritO(oConeheadZombie, {
    EName: "oBucketheadZombie",
    CName: "Drum zombie",
    OrnHP: 1100,
    Lvl: 3,
    SunNum: 125,
    Produce: '他Có đội mũ sắt, có thể chịu được một mức độ lớn thiệt hại.<p>Độ bền: <font color="#FF0000">cao</font><br>Điểm yếu: <font color="#FF0000">từ nấm</font></p>'
}, {
    PicArr: {
        0: "images/Card/Zombies/BucketheadZombie.png",
        1: "images/Card/Zombies/BucketheadZombieG.png",
        2: "images/Zombies/BucketheadZombie/BucketheadZombie.gif",
        3: "images/Zombies/BucketheadZombie/BucketheadZombieAttack.gif",
        9: "images/Zombies/Zombie/Zombie2.gif"
    }
});


const oFootballZombie = InheritO(oConeheadZombie, {
    EName: "oFootballZombie",
    CName: "Rugby zombie",
    OrnHP: 1400,
    Lvl: 3,
    SunNum: 175,
    width: 154,
    height: 160,
    OSpeed: 3.2,
    Speed: 3.2,
    beAttackedPointL: 40,
    beAttackedPointR: 134,
    getShadow: function (a, bonusSpaceLeft = 0, bonusSpaceTop = 0) {
        return "left:" + (a.beAttackedPointL + 15 + bonusSpaceLeft) + "px;top:" + (a.height - 22 + bonusSpaceTop) + "px"
    },
    Produce: 'Zombies chơi Bóng bầu dục<p>Độ bền: <font color="#FF0000">Cực cao</font><br>Tốc độ: <font color="#FF0000">nhanh</font><br>Điểm yếu: <font color="#FF0000">từ nấm</font></p>'
}, {
    PicArr: {
        0: "images/Card/Zombies/FootballZombie.png",
        1: "images/Card/Zombies/FootballZombieG.png",
        2: "images/Zombies/FootballZombie/FootballZombie.gif",
        3: "images/Zombies/FootballZombie/FootballZombieAttack.gif",
        9: "images/Zombies/FootballZombie/FootballZombieOrnLost.gif",
        10: "images/Zombies/FootballZombie/FootballZombieOrnLostAttack.gif"
    }
});


const oPoleVaultingZombie = InheritO(OrnNoneZombies, {
    EName: "oPoleVaultingZombie",
    CName: "Rod zombie",
    HP: 500,
    width: 348,
    height: 218,
    OSpeed: 3.2,
    Speed: 3.2,
    beAttackedPointL: 215,
    beAttackedPointR: 260,
    GetDY: function () {
        return 2
    },
    Lvl: 2,
    SunNum: 75,
    PicArr: (function () {
        var a = "images/Zombies/PoleVaultingZombie/";
        return ["images/Card/Zombies/zombie.png", "images/Card/Zombies/zombieG.png", a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif"]
    })(),
    Produce: 'Zombie có để nhảy qua chướng ngại vật<p>Độ bền: <font color="#FF0000">Trung</font><Br>Tốc độ: <font color="#FF0000">Nhanh, sau đó chậm (sau khi nhảy)</font><BR>Tính năng: <font color="#FF0000">Nhảy qua cây đầu tiên gặp phải</font></p>',
    getShadow: function (a, bonusSpaceLeft = 0, bonusSpaceTop = 0) {
        return "left:" + (a.beAttackedPointL - 20 + bonusSpaceLeft) + "px;top:" + (a.height - 35 + bonusSpaceTop) + "px"
    },
    getVisible: "hidden",
    GoingDieHead: function (c, a, b) {
        oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDAll)])
    },
    BirthCallBack: function (b) {
        var a = b.delayT;
        a ? oSym.addTask(a, function (c) {
            c.FreeSetbodyTime = "";
            SetVisible($CFun(c.id))
        }, [b]) : SetVisible($CFun(b.id))
    },
    JudgeAttack: function () {
        var g = this, b = g.ZX, d = g.R + "_", c = GetC(b), h = oGd.$, f, a, e = b - 74;
        for (f = c - 2; f <= c; f++) {
            if (f > 9 || f < 1) {
                continue
            }
            for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && p.canEat && p.AttackedRX >= e && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id))) {
            }
        }
    },
    getRaven: function (a) {
        return !this.isAttacking && this.NormalAttack(this.id, a), 0
    },
    NormalAttack: function (d, b) {
        var g = $Z[d], f = $P[b].AttackedLX, a = $CFun(d), c = a.firstChild, e = a.childNodes[1];
        e.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
        SetNone(c);
        g.isAttacking = 1;
        g.Altitude = 2;
        oSym.addTask(100, function (l, j, h, k, r) {
            var q = $Z[l], m, n;
            q && ((m = $P[j]) && m.Stature > 0 ? (q.AttackedRX = (q.X = (q.AttackedLX = q.ZX = n = m.AttackedRX) - q.beAttackedPointL) + q.beAttackedPointR, SetStyle(h, {left: q.X + "px"}), r.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", SetBlock(k), q.isAttacking = 0, q.Altitude = 1, q.OSpeed = q.Speed = 1.6, q.NormalGif = 9, q.LostHeadGif = 10, q.NormalAttack = CZombies.prototype.NormalAttack, q.getRaven = CZombies.prototype.getRaven) : (q.ZX = q.AttackedLX = (q.X = (q.AttackedRX = f) - q.beAttackedPointR) + q.beAttackedPointL, SetStyle(h, {left: q.X + "px"}), r.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetBlock(k), oSym.addTask(80, function (s, u) {
                var t = $Z[s];
                t && (u.src = "images/Zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", t.isAttacking = 0, t.Altitude = 1, t.OSpeed = t.Speed = 1.6, t.NormalGif = 9, t.LostHeadGif = 10, t.NormalAttack = CZombies.prototype.NormalAttack, t.getRaven = CZombies.prototype.getRaven)
            }, [l, r])))
        }, [d, b, a, c, e])

    }
});


const OrnIIZombies = InheritO(CZombies, {
    Ornaments: 2,
    BreakPoint: 91,
    NormalGif: 2,
    AttackGif: 3,
    LostHeadGif: 4,
    LostHeadAttackGif: 5,
    OrnLostNormalGif: 6,
    OrnLostAttackGif: 7,
    OrnLostHeadNormalGif: 8,
    OrnLostHeadAttackGif: 9,
    HeadGif: 10,
    DieGif: 11,
    BoomDieGif: 12,
    getHurt: function (h, a, e, l, c, k, j) {
        var d = this, b = d.id;
        if (!d.beAttacked) {
            j && d.Die(2);
            return
        }
        d.OrnHP ? !h ? (d.OrnHP = Math.max(d.OrnHP - e, 0), d.HP -= e) : h == -1 && !a ? d.OrnHP = Math.max(d.OrnHP - e, 0) : d.HP -= e : d.HP -= e;
        switch (true) {
            case !d.OrnHP:
                d.HP -= e;
                break;
            case (d.OrnHP -= e) > 0:
                break;
            case d.OrnHP < 0:
                d.HP += d.OrnHP;
                d.OrnHP = 0;
            default:
                var g = d.NormalGif = d.OrnLostNormalGif, f = d.AttackGif = d.OrnLostAttackGif;
                try{
                    $CFun(b).childNodes[1].src = (!d.isAttacking ? d.PicArr[g] : d.PicArr[f])
                }catch (err){
                    console.log(err)
                }

        }
        switch (true) {
            case d.HP > d.BreakPoint:
                switch (l) {
                    case 0:
                        break;
                    case -1:
                        d.canSlow && (!d.FreeSlowTime && (d.Speed *= 0.5), oSym.addTask(1000, function (m, o, n) {
                            (n = $Z[m]) && o == n.FreeSlowTime && (n.FreeSlowTime = "", n.Speed = n.OSpeed)
                        }, [b, d.FreeSlowTime = oSym.Now]));
                        break;
                    default:
                        d.FreeSlowTime && (d.FreeSlowTime = "", d.Speed = d.OSpeed);
                        if (d.canSputtering) {
                            ar = !a ? oZ.getArZ(d.AttackedLX, d.AttackedLX + 40, d.R) : oZ.getArZ(d.AttackedRX - 40, d.AttackedRX, d.R);
                            for (i = ar.length; i--; ar[i].canSputtering && ar[i].getHurt(1, 0, 13, 0, 0, 0, 0)) {
                            }
                        }
                }
                try{
                    SetAlpha($CFun(b).childNodes[1], 50, 0.5);
                }catch (err){
                    console.log(err)
                }

                oSym.addTask(10, function (m) {
                    try{
                        $Z[m] && SetAlpha($CFun(m).childNodes[1], 100, 1)
                    }catch (err){
                        console.log(err)
                    }

                }, [b]);
                break;
            case d.HP > 0:
                d.GoingDie();
                break;
            default:
                d.Die(j)
        }
    }
});


const oNewspaperZombie = InheritO(OrnIIZombies, {
    EName: "oNewspaperZombie",
    CName: "Newspaper zombie",
    OrnHP: 150,
    Lvl: 2,
    LostPaperGif: 11,
    width: 216,
    height: 164,
    beAttackedPointL: 60,
    beAttackedPointR: 130,
    LostPaperSpeed: 4.8,
    PicArr: (function () {
        var a = "images/Zombies/NewspaperZombie/";
        return ["images/Card/Zombies/zombie.png", "images/Card/Zombies/zombieG.png", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "LostNewspaper.gif"]
    })(),
    Produce: 'Tờ báo để phòng thủ<p>Độ bền: <font color="#FF0000">thấp</font><p>Độ bền báo: <font color="#FF0000">thấp</font></p><p>Tốc độ: Bình thường, sau đó nhanh (sau khi mất tờ báo)</p>',
    getShadow: function (a, bonusSpaceLeft = 0, bonusSpaceTop = 0) {
        return "left:" + (75 + bonusSpaceLeft) + "px;top:" + (a.height - 25 + bonusSpaceTop) + "px"
    },
    GoingDie: function (b) {
        var a = this, c = a.id;
        try{
            $CFun(c).childNodes[1].src = b;
        }catch (err){
            console.log(err)
        }

        oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif] + Math.random(), "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDAll)]);
        a.beAttacked = 0;
        a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = "";
        a.AutoReduceHP(c)
    },
    getHurt: function (j, a, g, n, c, l, k) {
        var e = this;
        if (!e.beAttacked) {
            k && e.Die(2);
            return
        }
        var b = e.id, m = e.OrnHP, h = e.HP, f = e.isAttacking, d = e.PicArr;
        if (m) {
            if (!j || n == 1) {
                switch (true) {
                    case (h = e.HP -= g) < 1:
                        e.Die(k);
                        return;
                    case h < 91:
                        e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
                        return;
                    default:
                        !(e.OrnHP = Math.max(m - g, 0)) && (e.isAttacking = 1, e.FreeSlowTime = "", $CFun(b).childNodes[1].src = d[e.LostPaperGif], oSym.addTask(150, function (s, t, r, q) {
                            s.isAttacking = q, s.Speed = s.OSpeed = s.LostPaperSpeed;
                            try{
                                $CFun(t).childNodes[1].src = r
                            }catch (err){
                                console.log(err)
                            }

                        }, [e, b, d[[e.NormalGif = e.OrnLostNormalGif, e.AttackGif = e.OrnLostAttackGif][f]], f]))
                }
            } else {
                if (j == -1 && !a) {
                    !(e.OrnHP = Math.max(m - g, 0)) &&
                    (e.isAttacking = 1, $CFun(b).childNodes[1].src = d[e.LostPaperGif], oSym.addTask(150, function (s, t, r, q) {
                        s.isAttacking = q, s.FreeSlowTime = "", s.Speed = s.OSpeed = s.LostPaperSpeed;
                        try{
                            $CFun(t).childNodes[1].src = r
                        }catch (err){
                            console.log(err)
                        }

                    }, [e, b, d[[e.NormalGif = e.OrnLostNormalGif, e.AttackGif = e.OrnLostAttackGif][f]], f]))
                } else {
                    switch (true) {
                        case (h = e.HP -= g) < 1:
                            e.Die(k);
                            return;
                        case h < 91:
                            e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
                            return
                    }
                }
            }
        } else {
            switch (true) {
                case (h = e.HP -= g) < 1:
                    e.Die(k);
                    return;
                case h < 91:
                    e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
                    return
            }
        }
        switch (n) {
            case 0:
                break;
            case -1:
                e.canSlow && (!e.FreeSlowTime && (e.Speed = e.OSpeed * 0.5), oSym.addTask(1000, function (o, r, q) {
                    (q = $Z[o]) && r == q.FreeSlowTime && (q.FreeSlowTime = "", q.Speed = q.OSpeed)
                }, [b, e.FreeSlowTime = oSym.Now]));
                break;
            default:
                e.FreeSlowTime && (e.FreeSlowTime = "", e.Speed = e.OSpeed);
                if (e.canSputtering) {
                    ar = !a ? oZ.getArZ(e.AttackedLX, e.AttackedLX + 40, e.R) : oZ.getArZ(e.AttackedRX - 40, e.AttackedRX, e.R);
                    for (i = ar.length; i--; ar[i].canSputtering && ar[i].getHurt(1, 0, 13, 0, 0, 0, 0)) {
                    }
                }
        }
        try{
            SetAlpha($CFun(b).childNodes[1], 50, 0.5);
        }catch (err){
            console.log(err)
        }

        oSym.addTask(10, function (o) {
            try{
                $Z[o] && SetAlpha($CFun(o).childNodes[1], 100, 1)
            }catch (err){
                console.log(err)
            }

        }, [b])

    }
});


const oScreenDoorZombie = InheritO(oNewspaperZombie, {
    EName: "oScreenDoorZombie",
    CName: "Zombie door grilles",
    OrnHP: 1100,
    Lvl: 3,
    SunNum: 100,
    width: 166,
    height: 144,
    beAttackedPointL: 50,
    beAttackedPointR: 116,
    PicArr: (function () {
        var a = "images/Zombies/ScreenDoorZombie/", b = "images/Zombies/Zombie/";
        return ["images/Card/Zombies/ScreenDoorZombie.png", "images/Card/Zombies/ScreenDoorZombieG.png", a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", b + "Zombie.gif", b + "ZombieAttack.gif", b + "ZombieLostHead.gif", b + "ZombieLostHeadAttack.gif", b + "ZombieHead.gif" + $Random, b + "ZombieDie.gif" + $Random, b + "BoomDie.gif" + $Random]
    })(),
    Produce: 'Cánh cửa làm lá chắn hiệu quả<p>Độ bền: <font color="#FF0000">thấp</font><p>Độ bền cửa: <font color="#FF0000">cao</font></p><p>Điểm yếu: Nấm phun lớn</p>',
    GoingDie: CZombies.prototype.GoingDie,
    getHurt: function (j, a, g, n, c, l, k) {
        var e = this;
        if (!e.beAttacked) {
            k && e.Die(2);
            return
        }
        var b = e.id, m = e.OrnHP, h = e.HP, f = e.isAttacking, d = e.PicArr;
        if (m) {
            if (!j || n == 1) {
                switch (true) {
                    case (h = e.HP -= g) < 1:
                        e.Die(k);
                        return;
                    case h < 91:
                        e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
                        return;
                    default:
                        !(e.OrnHP = Math.max(m - g, 0)) && (e.isAttacking = 1, e.FreeSlowTime = "", $CFun(b).childNodes[1].src = d[e.LostPaperGif], oSym.addTask(150, function (s, t, r, q) {
                            s.isAttacking = q, s.Speed = s.OSpeed = s.LostPaperSpeed;
                            try{
                                $CFun(t).childNodes[1].src = r
                            }catch (err){
                                console.log(err)
                            }

                        }, [e, b, d[[e.NormalGif = e.OrnLostNormalGif, e.AttackGif = e.OrnLostAttackGif][f]], f]))
                }
            } else {
                if (j == -1 && !a) {
                    !(e.OrnHP = Math.max(m - g, 0)) && (e.isAttacking = 1, $CFun(b).childNodes[1].src = d[e.LostPaperGif], oSym.addTask(150, function (s, t, r, q) {
                        s.isAttacking = q, s.FreeSlowTime = "", s.Speed = s.OSpeed = s.LostPaperSpeed;
                        try{
                            $CFun(t).childNodes[1].src = r
                        }catch (err){
                            console.log(err)
                        }

                    }, [e, b, d[[e.NormalGif = e.OrnLostNormalGif, e.AttackGif = e.OrnLostAttackGif][f]], f]))
                } else {
                    switch (true) {
                        case (h = e.HP -= g) < 1:
                            e.Die(k);
                            return;
                        case h < 91:
                            e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
                            return
                    }
                }
            }
        } else {
            switch (true) {
                case (h = e.HP -= g) < 1:
                    e.Die(k);
                    return;
                case h < 91:
                    e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
                    return
            }
        }
        switch (n) {
            case 0:
                break;
            case -1:
                e.canSlow && (!e.FreeSlowTime && (e.Speed = e.OSpeed * 0.5), oSym.addTask(1000, function (o, r, q) {
                    (q = $Z[o]) && r == q.FreeSlowTime && (q.FreeSlowTime = "", q.Speed = q.OSpeed)
                }, [b, e.FreeSlowTime = oSym.Now]));
                break;
            default:
                e.FreeSlowTime && (e.FreeSlowTime = "", e.Speed = e.OSpeed);
                if (e.canSputtering) {
                    ar = !a ? oZ.getArZ(e.AttackedLX, e.AttackedLX + 40, e.R) : oZ.getArZ(e.AttackedRX - 40, e.AttackedRX, e.R);
                    for (i = ar.length; i--; ar[i].canSputtering && ar[i].getHurt(1, 0, 13, 0, 0, 0, 0)) {
                    }
                }
        }
        try{
            SetAlpha($CFun(b).childNodes[1], 50, 0.5);
        }catch (err){
            console.log(err)
        }

        oSym.addTask(10, function (o) {
            try{
                $Z[o] && SetAlpha($CFun(o).childNodes[1], 100, 1)
            }catch (err){
                console.log(err)
            }

        }, [b])

    }
});


let ZombieName = [oZombie, oZombie2, oZombie3, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oFlagZombie, oFootballZombie, oNewspaperZombie, oScreenDoorZombie]
let ZNamePackage = {
    package1: [oZombie, oFlagZombie],
    package5: [oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
    package10: [oFootballZombie, oNewspaperZombie, oScreenDoorZombie]
}
