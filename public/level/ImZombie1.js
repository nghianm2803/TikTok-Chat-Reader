oS.Init({
    PName: [oPeashooter, oSunFlower, oSnowPea, oSquash],
    ZName: [oZombie, oBucketheadZombie, oFootballZombie],
    PicArr: ["images/interface/background2.jpg", "images/interface/trophy.png", "images/Stripe.png"],
    backgroundImage: "images/interface/background2.jpg",
    ShowScroll: false,
    SunNum: 150,
    BrainsNum: 5,
    ProduceSun: false,
    CardKind: 1,
    LevelName: "Puzzle Mode: Zombie của tôi！",
    LoadMusic: function () {
        NewEle("oEmbed", "embed", "width:0;height:0", {src: "music/Look up at the.mp3"}, EDAll)
    },
    InitLawnMower: function () {
        var a = 6;
        while (--a) {
            CustomSpecial(oBrains, a, -1)
        }
    },
    ArP: {ArC: [1, 4], ArR: [1, 5], Auto: 1, P: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3]},
    RiddleAutoGrow: function () {
        var k = oS.ArP, f = k.ArC, j = k.ArR, e = k.P, d = oS.PName, c, g = f[0], b = f[1], i = j[0], h = j[1], a;
        if (k.Auto) {
            while (i <= h) {
                CustomSpecial(oBrains, i, 0);
                for (a = g; a <= b; a++) {
                    CustomSpecial(d[e[c = Math.floor(Math.random() * e.length)]], i, a);
                    e.splice(c, 1)
                }
                ++i
            }
        }
        NewImg("iStripe", "images/Stripe.png", "left:" + (GetX1X2(5)[0] - 11) + "px;top:65px", EDAll)
    },
    StartGame: function () {
        NewEle("DivTeach", "div", 0, 0, EDAll);
        oP.Monitor({
            ar: [0], f: function (d) {
                var b = oS.Chose, a = arguments.callee, c = $CFun("DivTeach");
                switch (d) {
                    case 0:
                        innerText(c, "Hàng xóm của bạn Dave: zombie muốn tôi giúp họ thực hành nhà xâm lược (Nhấn vào đây để tiếp tục)");
                        c.onclick = function () {
                            oSym.addTask(10, a, [1])
                        };
                        break;
                    case 1:
                        innerText(c, "Hàng xóm Dave của bạn: Tôi nói với họ không bị phá hủy miễn là nhà máy không có vấn đề (bấm vào để tiếp tục)");
                        c.onclick = function () {
                            oSym.addTask(10, a, [2])
                        };
                        break;
                    case 2:
                        innerText(c, "Hàng xóm của bạn Dave: Vì vậy, tôi sử dụng các tông để bãi cỏ của bạn tách (Nhấn vào đây để tiếp tục)");
                        c.onclick = function () {
                            oSym.addTask(10, a, [3])
                        };
                        break;
                    case 3:
                        innerText(c, "Hàng xóm của bạn Dave: Have fun! (Nhấn vào đây để tiếp tục)");
                        c.onclick = function () {
                            oSym.addTask(10, a, [4])
                        };
                        break;
                    case 4:
                        innerText(c, "Bởi tắt này cần phải ăn tất cả của não！");
                        BeginCool();
                        c.onclick = null;
                        oSym.addTask(500, function () {
                            SetNone(c)
                        }, []);
                        (function () {
                            SetVisible($CFun("dFlagMeter"), $CFun("dFlagMeterContent"));
                            ClearChild($CFun("oEmbed"));
                            NewEle("oEmbed", "embed", "width:0;height:0", {src: "music/Watery Graves.mp3"}, EDAll)
                        })()
                }
            }
        });
        SetVisible($CFun("dFlagMeter"));
        oS.RiddleAutoGrow()
    }
});
