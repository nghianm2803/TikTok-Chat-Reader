oS.Init({
    PName: [oPeashooter, oPotatoMine, oSquash, oCherryBomb, oJalapeno],
    ZName: [oZombie],
    PicArr: ["images/interface/background1.jpg"],
    backgroundImage: "images/interface/background1.jpg",
    CanSelectCard: 0,
    SunNum: 100,
    LevelName: "Bạn có đủ mạnh mẽ trải nghiệm trò chơi?",
    LargeWaveFlag: {1: $CFun("imgFlag1")},
    LoadMusic: function () {
        NewEle("oEmbed", "embed", "width:0;height:0", {src: "music/Look up at the.mp3"}, EDAll)
    },
    StartGame: function () {
        SetVisible($CFun("tdShovel"), $CFun("dFlagMeter"));
        var a = NewEle("DivTeach", "div", "line-height:40px;font-size: 14px", 0, EDAll);
        NewEle("spanT", "span", "position:absolute;left:0;width:500px;text-align: center; font-family: 幼圆; font-size: 14px;line-height:50px", 0, a);
        NewEle("btnClick1", "span", "cursor:pointer;position:absolute;left:510px;height:40px;width:50px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
        NewEle("btnClick2", "span", "cursor:pointer;position:absolute;left:580px;height:40px;width:100px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
        NewEle("btnClick3", "span", "cursor:pointer;position:absolute;left:700px;height:40px;width:200px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
        innerText($CFun("spanT"), "Bạn lên kiểm tra trình duyệt và cpu của bạn có đủ không？Mở Task Manager, kích Start,！");
        innerText($CFun("btnClick1"), "100个");
        innerText($CFun("btnClick2"), "1000 Zombie！");
        innerText($CFun("btnClick3"), "Cho tui 5000 Zombie！");
        oP.Monitor({
            ar: [0], f: function () {
                var b = function () {
                    ClearChild($CFun("oEmbed"));
                    NewEle("oEmbed", "embed", "width:0;height:0", {src: "music/Watery Graves.mp3"}, EDAll);
                    oS.InitLawnMower();
                    PrepareGrowPlants(function () {
                        BeginCool();
                        AutoProduceSun(25);
                        oP.AddZombiesFlag();
                        SetVisible($CFun("dFlagMeterContent"))
                    })
                };
                $CFun("btnClick1").onclick = function () {
                    oP.FlagToSumNum.a2 = [100];
                    innerText($CFun("DivTeach"), "Dưới đây xin 100 khách mời của chúng tôi chơi zombie！");
                    b()
                };
                $CFun("btnClick2").onclick = function () {
                    oP.FlagToSumNum.a2 = [1000];
                    innerText($CFun("DivTeach"), "Zombie là khách mời 1000 năm của chúng tui！");
                    b()
                };
                $CFun("btnClick3").onclick = function () {
                    oP.FlagToSumNum.a2 = [5000];
                    innerText($CFun("DivTeach"), "Có 5.000 khách mời ngôi sao, xin vui lòng! ! Có lẽ họ cần một chút make-up thời gian, hãy kiên nhẫn。。。");
                    b()
                }
            }
        });
        SetBlock($CFun("dFlagMeter"));
        CustomPlants(0, 2, 5);
        CustomPlants(0, 3, 9);
        CustomPlants(0, 4, 1)
    }
}, {
    ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie],
    FlagNum: 1,
    SumToZombie: {1: 30, "default": 30},
    FlagToSumNum: {a1: [], a2: [1000]},
    FlagToMonitor: {1: [ShowFinalWave, 0]}
});
