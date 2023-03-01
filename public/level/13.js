oS.Init({
    PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom],
    ZName: [oZombie, oConeheadZombie, oScreenDoorZombie],
    PicArr: function () {
        var a = oFumeShroom.prototype, b = a.PicArr;
        return ["images/interface/background2.jpg", "images/interface/Tombstones.png", "images/interface/Tombstone_mounds.png", b[a.CardGif], b[a.NormalGif]]
    }(),
    backgroundImage: "images/interface/background2.jpg",
    CanSelectCard: 1,
    DKind: 0,
    SunNum: 50,
    LevelName: "关卡 2-3",
    LargeWaveFlag: {10: $CFun("imgFlag1")},
    Monitor: {f: AppearTombstones, ar: [7, 9, 4]},
    UserDefinedFlagFunc: function (a) {
        oP.FlagNum == oP.FlagZombies && oP.SetTimeoutTomZombie([oZombie, oConeheadZombie, oBucketheadZombie])
    },
    LoadMusic: function () {
        NewEle("oEmbed", "embed", "width:0;height:0", {src: "music/Look up at the.mp3"}, EDAll)
    },
    StartGameMusic: "Ultimate battle.mp3"
}, {
    ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oScreenDoorZombie],
    FlagNum: 10,
    SumToZombie: {1: 7, 2: 9, 3: 10, "default": 10},
    FlagToSumNum: {a1: [3, 5, 9], a2: [1, 2, 3, 10]},
    FlagToMonitor: {9: [ShowFinalWave, 0]}
});
