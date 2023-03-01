oS.Init({
    PName: [oPeashooter],
    ZName: [oZombie],
    PicArr: function () {
        var a = oSunFlower.prototype, b = a.PicArr;
        return ["images/interface/SodRollCap.png", "images/interface/SodRoll.png", "images/interface/sod1row.png", "images/interface/background1unsodded.jpg", b[a.CardGif], b[a.NormalGif]]
    }(),
    SunNum: 10000,
    backgroundImage: "images/interface/background1unsodded.jpg",
    LF: [1, 1, 1, 1, 1, 1],
    CanSelectCard: 0,
    LevelName: "Bài 1-1",
    LoadMusic: function () {
        NewEle("oEmbed", "embed", "width:0;height:0", {src: "music/UraniwaNi.mp3"}, EDAll)
    },
    InitLawnMower: function () {
        CustomSpecial(oLawnCleaner, 3, -1)
    },
    StartGame: function () {
        NewImg("sod1row", "images/interface/sod1row.png", "left:132px;top:280px;clip:rect(0,0,117px,0);z-index:1", EDAll);
        NewImg("SodRoll", "images/interface/SodRoll.png", "left:112px;top:244px;z-index:1", EDAll);
        NewImg("SodRollCap", "images/interface/SodRollCap.png", "left:17px;top:322px;z-index:1", EDAll);
        (function (e, g, a, d, c, f, b) {
            e += 15;
            g += 16;
            d += 16;
            $CFun("sod1row").style.clip = "rect(0," + e + "px,117px,0)";
            SetStyle($CFun("SodRoll"), {left: g + "px", width: --a + "px", height: "141px"});
            SetStyle($CFun("SodRollCap"), {left: d + "px", width: --c + "px", height: --f + "px", top: ++b + "px"});
            e < 755 ? oSym.addTask(3, arguments.callee, [e, g, a, d, c, f, b]) : (ClearChild($CFun("SodRoll"), $CFun("SodRollCap")), (function () {
                // SetBlock($("dTop"));
                NewEle("DivTeach", "div", 0, 0, EDAll);
                oS.InitLawnMower();
                oP.Monitor({
                    ar: [0], f: function (k) {
                        var l = oS.C + 1, i = oS.Chose;
                        switch (k) {
                            case 0:
                                innerText($CFun("DivTeach"), "Bấm vào lựa chọn hạt đậu！");
                                NewImg("PointerUD", "images/interface/PointerUP.gif", "top:60px;left:50px", EDAll);
                                oSym.addTask(10, arguments.callee, [++k]);
                                break;
                            case 1:
                                i > 0 && (innerText($CFun("DivTeach"), "Nhấn chuột trồng cây bắn súng, trồng tốt nhất cánh bên trái！"), EditImg($CFun("PointerUD"), "", "images/interface/PointerDown.gif", {
                                    left: "170px",
                                    top: "270px"
                                }), ++k);
                                oSym.addTask(10, arguments.callee, [k]);
                                break;
                            case 2:
                                var h = oGd.$;
                                while (--l) {
                                    if (h["3_" + l + "_1"]) {
                                        SetNone($CFun("PointerUD"));
                                        innerText($CFun("DivTeach"), "Bấm vào thu thập ánh sáng rơi xuống！");
                                        AutoProduceSun(25);
                                        oSym.addTask(10, arguments.callee, [++k]);
                                        return
                                    }
                                }
                                !i && (ClearChild($CFun("PointerUD")), k = 0);
                                oSym.addTask(10, arguments.callee, [k]);
                                break;
                            case 3:
                                oS.SunNum > 99 && (innerText($CFun("DivTeach"), "Bạn có đủ ánh sáng mặt trời đẻ phát triển！"), EditImg($CFun("PointerUD"), "", "images/interface/PointerUP.gif", {
                                    left: "50px",
                                    top: "60px",
                                    display: "block"
                                }), ++k);
                                oSym.addTask(10, arguments.callee, [k]);
                                break;
                            default:
                                var j = 0, h = oGd.$;
                                while (--l) {
                                    h["3_" + l + "_1"] && (++j)
                                }
                                j > 0 ? (SetNone($CFun("PointerUD")), innerText($CFun("DivTeach"), "Đừng để những con zombie đến gần ngôi nhà của bạn！"), oP.AddZombiesFlag(), oSym.addTask(500, SetNone, [$CFun("DivTeach")])) : oSym.addTask(10, arguments.callee, [4])
                        }
                    }
                });
                BeginCool();
                SetVisible($CFun("dFlagMeter"))
            })())
        })(35, 122, 68, 117, 73, 71, 322)
    }
}, {
    ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie],
    FlagNum: 4,
    SumToZombie: {1: 5, "default": 5},
    FlagToSumNum: {a1: [3], a2: [1, 2]},
    FlagToMonitor: {3: [ShowFinalWave, 0]},
    FlagToEnd: function () {
        NewImg("imgSF", "images/card/plants/SunFlower.png", "left:667px;top:330px", EDAll, {
            onclick: function () {
                GetNewCard(this, oSunFlower, 2)
            }
        });
        EditImg($CFun("PointerUD"), 0, "images/interface/PointerDown.gif", {left: "676px", top: "295px", display: "block"})
    }
});
