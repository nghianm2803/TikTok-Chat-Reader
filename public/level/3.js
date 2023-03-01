oS.Init({
    PName: [oPeashooter, oSunFlower, oCherryBomb],
    ZName: [oZombie, oConeheadZombie],
    PicArr: function () {
        var a = oWallNut.prototype, b = a.PicArr;
        return ["images/interface/background1unsodded2.jpg", b[a.CardGif], b[a.NormalGif]]
    }(),
    backgroundImage: "images/interface/background1unsodded2.jpg",
    LF: [0, 0, 1, 1, 1, 0],
    CanSelectCard: 0,
    LevelName: "关卡 1-3",
    LargeWaveFlag: {8: $CFun("imgFlag1")},
    LoadMusic: function () {
        NewEle("oEmbed", "embed", "width:0;height:0", {src: "music/Faster.mp3"}, EDAll)
    },
    InitLawnMower: function () {
        var a = 5;
        while (--a > 1) {
            CustomSpecial(oLawnCleaner, a, -1)
        }
    },
    StartGame: function () {
        ClearChild($CFun("oEmbed"));
        NewEle("oEmbed", "embed", "width:0;height:0", {src: "music/UraniwaNi.mp3"}, EDAll);
        SetVisible($CFun("dFlagMeter"));
        oS.InitLawnMower();
        PrepareGrowPlants(function () {
            oP.Monitor();
            BeginCool();
            AutoProduceSun(25);
            oSym.addTask(1500, function () {
                oP.AddZombiesFlag();
                SetVisible($CFun("dFlagMeterContent"))
            }, [])
        })
    }
}, {
    ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie],
    FlagNum: 8,
    SumToZombie: {1: 8, "default": 10},
    FlagToSumNum: {a1: [3, 5, 7], a2: [1, 2, 3, 6]},
    FlagToMonitor: {7: [ShowFinalWave, 0]},
    FlagToEnd: function () {
        NewImg("imgSF", "images/card/plants/WallNut.png", "left:827px;top:330px", EDAll, {
            onclick: function () {
                GetNewCard(this, oWallNut, 4)
            }
        });
        NewImg("PointerUD", "images/interface/PointerDown.gif", "top:295px;left:836px", EDAll)
    }
});
