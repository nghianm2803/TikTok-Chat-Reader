let ZName = [oZombie, oZombie2, oZombie3, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oFlagZombie, oFootballZombie, oNewspaperZombie, oScreenDoorZombie]
let ZNameFake = [oZombie, oZombie, oZombie2, oZombie2, oZombie3, oZombie3, oFlagZombie, oFlagZombie, oFlagZombie, oFlagZombie, oFlagZombie, oNewspaperZombie, oConeheadZombie, oPoleVaultingZombie]

// ipcRenderer.on('comment', (e, data) => {
//     let arrParam = data.comment.split("-")
//     if (arrParam.length === 2 && Number.isInteger(parseInt(arrParam[0])) && Number.isInteger(parseInt(arrParam[1]))) {
//         if (parseInt(arrParam[0]) <= 5 && parseInt(arrParam[0]) >= 1 && parseInt(arrParam[1]) >= 1 && parseInt(arrParam[1]) <= 10) {
//             BirthZombie(data.nickname ||," "", ZName[arrParam[1] - 1, arrParam[0]);
//         }
//     }
// })

const fakeUser = [
    {
        "userId": "7185284372689650693botzombie",
        "avatar": "images/avatarFakeUser/7185284372689650693botzombie.jpeg",
        "name": "christ1"
    },
    {
        "userId": "6997581612750029830botzombie",
        "avatar": "images/avatarFakeUser/6997581612750029830botzombie.jpeg",
        "name": "jasson_carranza"
    },
    {
        "userId": "6933239965343220741botzombie",
        "avatar": "images/avatarFakeUser/6933239965343220741botzombie.jpeg",
        "name": "Paulino"
    },
    {
        "userId": "6958142568283161606botzombie",
        "avatar": "images/avatarFakeUser/6958142568283161606botzombie.jpeg",
        "name": "johanluquez385"
    },
    {
        "userId": "7146531139061498886botzombie",
        "avatar": "images/avatarFakeUser/7146531139061498886botzombie.jpeg",
        "name": "alejandrolaguna494"
    },
    {
        "userId": "7184872602397312043botzombie",
        "avatar": "images/avatarFakeUser/7184872602397312043botzombie.jpeg",
        "name": "realman"
    },
    {
        "userId": "6979606273987052549botzombie",
        "avatar": "images/avatarFakeUser/6979606273987052549botzombie.jpeg",
        "name": "Cool_Unc_Nate"
    },
    {
        "userId": "6935475353939821574botzombie",
        "avatar": "images/avatarFakeUser/6935475353939821574botzombie.jpeg",
        "name": "SALTY OUTCAST"
    },
    {
        "userId": "6858326538397008902botzombie",
        "avatar": "images/avatarFakeUser/6858326538397008902botzombie.jpeg",
        "name": "Lauro Lopez"
    },
    {
        "userId": "6662523733470085126botzombie",
        "avatar": "images/avatarFakeUser/6662523733470085126botzombie.jpeg",
        "name": "sweetla20"
    },
    {
        "userId": "7121204410837812270botzombie",
        "avatar": "images/avatarFakeUser/7121204410837812270botzombie.jpeg",
        "name": "TheParrott"
    },
    {
        "userId": "6930405409594229766botzombie",
        "avatar": "images/avatarFakeUser/6930405409594229766botzombie.jpeg",
        "name": "Omodebirin Arewa"
    },
    {
        "userId": "6843750098066981893botzombie",
        "avatar": "images/avatarFakeUser/6843750098066981893botzombie.jpeg",
        "name": "J Owen"
    },
    {
        "userId": "7150660319485641774botzombie",
        "avatar": "images/avatarFakeUser/7150660319485641774botzombie.jpeg",
        "name": "robfett1982"
    },
    {
        "userId": "7028319279301215237botzombie",
        "avatar": "images/avatarFakeUser/7028319279301215237botzombie.jpeg",
        "name": "Clockworkmask"
    },
    {
        "userId": "6877511493651497990botzombie",
        "avatar": "images/avatarFakeUser/6877511493651497990botzombie.jpeg",
        "name": "Matej Bodlaj"
    },
    {
        "userId": "6799457884645164037botzombie",
        "avatar": "images/avatarFakeUser/6799457884645164037botzombie.jpeg",
        "name": "Parker Larkin"
    },
    {
        "userId": "6895125919691310085botzombie",
        "avatar": "images/avatarFakeUser/6895125919691310085botzombie.jpeg",
        "name": "user4351160080439"
    },
    {
        "userId": "6872881586770445318botzombie",
        "avatar": "images/avatarFakeUser/6872881586770445318botzombie.jpeg",
        "name": "bobbycox1991"
    },
    {
        "userId": "6788600583412335621botzombie",
        "avatar": "images/avatarFakeUser/6788600583412335621botzombie.jpeg",
        "name": "Uili Manako"
    },
    {
        "userId": "6812250290013471749botzombie",
        "avatar": "images/avatarFakeUser/6812250290013471749botzombie.jpeg",
        "name": "Robert Myren"
    },
    {
        "userId": "88766397329104896botzombie",
        "avatar": "images/avatarFakeUser/88766397329104896botzombie.jpeg",
        "name": "Jason Boucher 01"
    },
    {
        "userId": "7184814937822004229botzombie",
        "avatar": "images/avatarFakeUser/7184814937822004229botzombie.jpeg",
        "name": "obrian"
    },
    {
        "userId": "6606435424604110853botzombie",
        "avatar": "images/avatarFakeUser/6606435424604110853botzombie.jpeg",
        "name": "Christopher Mustard"
    },
    {
        "userId": "7121820372044071941botzombie",
        "avatar": "images/avatarFakeUser/7121820372044071941botzombie.jpeg",
        "name": "davehughes817"
    },
    {
        "userId": "7041919568969204741botzombie",
        "avatar": "images/avatarFakeUser/7041919568969204741botzombie.jpeg",
        "name": "Stitch & Angel"
    },
    {
        "userId": "7032708261132846086botzombie",
        "avatar": "images/avatarFakeUser/7032708261132846086botzombie.jpeg",
        "name": "Neo"
    },
    {
        "userId": "7150004428073124869botzombie",
        "avatar": "images/avatarFakeUser/7150004428073124869botzombie.jpeg",
        "name": "haddeh72"
    },
    {
        "userId": "6532041749269856257botzombie",
        "avatar": "images/avatarFakeUser/6532041749269856257botzombie.jpeg",
        "name": "Alejandro"
    },
    {
        "userId": "6940400945814029317botzombie",
        "avatar": "images/avatarFakeUser/6940400945814029317botzombie.jpeg",
        "name": "Daniel Bourgeois365"
    },
    {
        "userId": "6809984377221776390botzombie",
        "avatar": "images/avatarFakeUser/6809984377221776390botzombie.jpeg",
        "name": "Onur Can Yiğit"
    },
    {
        "userId": "7063324151953228846botzombie",
        "avatar": "images/avatarFakeUser/7063324151953228846botzombie.jpeg",
        "name": "Lakota49"
    },
    {
        "userId": "7178620990631527429botzombie",
        "avatar": "images/avatarFakeUser/7178620990631527429botzombie.jpeg",
        "name": "ladytomahawk"
    },
    {
        "userId": "6785222957407192070botzombie",
        "avatar": "images/avatarFakeUser/6785222957407192070botzombie.jpeg",
        "name": "Okuyasu"
    },
    {
        "userId": "6842386964198048773botzombie",
        "avatar": "images/avatarFakeUser/6842386964198048773botzombie.jpeg",
        "name": "IsitBussin.                 🪳"
    },
    {
        "userId": "7170491590145803306botzombie",
        "avatar": "images/avatarFakeUser/7170491590145803306botzombie.jpeg",
        "name": "koygo-"
    },
    {
        "userId": "6887646246665421830botzombie",
        "avatar": "images/avatarFakeUser/6887646246665421830botzombie.jpeg",
        "name": "Eric Moreno"
    },
    {
        "userId": "7069914197882864682botzombie",
        "avatar": "images/avatarFakeUser/7069914197882864682botzombie.jpeg",
        "name": "Heavy Metal Zombie"
    },
    {
        "userId": "6844615762985255942botzombie",
        "avatar": "images/avatarFakeUser/6844615762985255942botzombie.jpeg",
        "name": "Martin Payne"
    },
    {
        "userId": "6889930074473300997botzombie",
        "avatar": "images/avatarFakeUser/6889930074473300997botzombie.jpeg",
        "name": "Jamesjr"
    },
    {
        "userId": "6826000287650055173botzombie",
        "avatar": "images/avatarFakeUser/6826000287650055173botzombie.jpeg",
        "name": "Jens Wuckelt"
    },
    {
        "userId": "7138275310789886982botzombie",
        "avatar": "images/avatarFakeUser/7138275310789886982botzombie.jpeg",
        "name": "raphoustaquet"
    },
    {
        "userId": "6811302988319245317botzombie",
        "avatar": "images/avatarFakeUser/6811302988319245317botzombie.jpeg",
        "name": "rudympl09"
    },
    {
        "userId": "7141500162510242822botzombie",
        "avatar": "images/avatarFakeUser/7141500162510242822botzombie.jpeg",
        "name": "HielkeDusseljee"
    },
    {
        "userId": "7114803341414368298botzombie",
        "avatar": "images/avatarFakeUser/7114803341414368298botzombie.jpeg",
        "name": "TheTranscendentBeard"
    },
    {
        "userId": "6912588566292972549botzombie",
        "avatar": "images/avatarFakeUser/6912588566292972549botzombie.jpeg",
        "name": "Pedrooo5607"
    },
    {
        "userId": "6972811859519194117botzombie",
        "avatar": "images/avatarFakeUser/6972811859519194117botzombie.jpeg",
        "name": "danielstefan"
    },
    {
        "userId": "7060527191121576966botzombie",
        "avatar": "images/avatarFakeUser/7060527191121576966botzombie.jpeg",
        "name": "Svenna71"
    },
    {
        "userId": "7050124159095079942botzombie",
        "avatar": "images/avatarFakeUser/7050124159095079942botzombie.jpeg",
        "name": "Steven Lent865"
    },
    {
        "userId": "6873873808030827526botzombie",
        "avatar": "images/avatarFakeUser/6873873808030827526botzombie.jpeg",
        "name": "🪳"
    },
    {
        "userId": "6819310999407100933botzombie",
        "avatar": "images/avatarFakeUser/6819310999407100933botzombie.jpeg",
        "name": "Jamie Worwood"
    },
    {
        "userId": "6889070989670810630botzombie",
        "avatar": "images/avatarFakeUser/6889070989670810630botzombie.jpeg",
        "name": "steven"
    },
    {
        "userId": "6608845070978973701botzombie",
        "avatar": "images/avatarFakeUser/6608845070978973701botzombie.jpeg",
        "name": "Oktay Sivri"
    },
    {
        "userId": "6773564423165772806botzombie",
        "avatar": "images/avatarFakeUser/6773564423165772806botzombie.jpeg",
        "name": "Márcio Moreira"
    },
    {
        "userId": "6997838430203315206botzombie",
        "avatar": "images/avatarFakeUser/6997838430203315206botzombie.jpeg",
        "name": ".."
    },
    {
        "userId": "6986725961387836422botzombie",
        "avatar": "images/avatarFakeUser/6986725961387836422botzombie.jpeg",
        "name": "[VIBES]"
    },
    {
        "userId": "7176364263195411461botzombie",
        "avatar": "images/avatarFakeUser/7176364263195411461botzombie.jpeg",
        "name": "Prostarshop"
    },
    {
        "userId": "6793471248904848390botzombie",
        "avatar": "images/avatarFakeUser/6793471248904848390botzombie.jpeg",
        "name": "II_Dropex_II"
    },
    {
        "userId": "6995277019757331461botzombie",
        "avatar": "images/avatarFakeUser/6995277019757331461botzombie.jpeg",
        "name": "KittyMommy"
    },
    {
        "userId": "7031576987610481669botzombie",
        "avatar": "images/avatarFakeUser/7031576987610481669botzombie.jpeg",
        "name": "estebang1971"
    },
    {
        "userId": "6897360436132660230botzombie",
        "avatar": "images/avatarFakeUser/6897360436132660230botzombie.jpeg",
        "name": "Angela M. Stroud"
    },
    {
        "userId": "7078374121368929323botzombie",
        "avatar": "images/avatarFakeUser/7078374121368929323botzombie.jpeg",
        "name": "Bigbeardaddy80"
    },
    {
        "userId": "6645613679852814341botzombie",
        "avatar": "images/avatarFakeUser/6645613679852814341botzombie.jpeg",
        "name": "WyoTruckerUSMC"
    },
    {
        "userId": "7172183893872772102botzombie",
        "avatar": "images/avatarFakeUser/7172183893872772102botzombie.jpeg",
        "name": "user3769327063531"
    },
    {
        "userId": "6827555694665974790botzombie",
        "avatar": "images/avatarFakeUser/6827555694665974790botzombie.jpeg",
        "name": "The Thunk"
    },
    {
        "userId": "6827563869843260422botzombie",
        "avatar": "images/avatarFakeUser/6827563869843260422botzombie.jpeg",
        "name": "TAZAONDE91"
    },
    {
        "userId": "7152291901248586757botzombie",
        "avatar": "images/avatarFakeUser/7152291901248586757botzombie.jpeg",
        "name": "suki"
    },
    {
        "userId": "6828627351087121413botzombie",
        "avatar": "images/avatarFakeUser/6828627351087121413botzombie.jpeg",
        "name": "user862136980378"
    },
    {
        "userId": "6976908877091898373botzombie",
        "avatar": "images/avatarFakeUser/6976908877091898373botzombie.jpeg",
        "name": "Sairden"
    },
    {
        "userId": "6844854400974275589botzombie",
        "avatar": "images/avatarFakeUser/6844854400974275589botzombie.jpeg",
        "name": "The Wombo King"
    },
    {
        "userId": "6891998172093154310botzombie",
        "avatar": "images/avatarFakeUser/6891998172093154310botzombie.jpeg",
        "name": "Заключеный6.2.7"
    },
    {
        "userId": "7107611084583896070botzombie",
        "avatar": "images/avatarFakeUser/7107611084583896070botzombie.jpeg",
        "name": "jan6467"
    },
    {
        "userId": "6922869961224815621botzombie",
        "avatar": "images/avatarFakeUser/6922869961224815621botzombie.jpeg",
        "name": "tony ervolina"
    },
    {
        "userId": "6989048366642643974botzombie",
        "avatar": "images/avatarFakeUser/6989048366642643974botzombie.jpeg",
        "name": "Chris Cortez95"
    },
    {
        "userId": "6975508028750840838botzombie",
        "avatar": "images/avatarFakeUser/6975508028750840838botzombie.jpeg",
        "name": "dwanewilliamsjr"
    },
    {
        "userId": "7153341382421414918botzombie",
        "avatar": "images/avatarFakeUser/7153341382421414918botzombie.jpeg",
        "name": "silviuleauta"
    },
    {
        "userId": "7182180683531830278botzombie",
        "avatar": "images/avatarFakeUser/7182180683531830278botzombie.jpeg",
        "name": "ttwspierapedofilców"
    },
    {
        "userId": "7141083578137396229botzombie",
        "avatar": "images/avatarFakeUser/7141083578137396229botzombie.jpeg",
        "name": "VIVERE  IN MOMENTO"
    },
    {
        "userId": "7078871103011308587botzombie",
        "avatar": "images/avatarFakeUser/7078871103011308587botzombie.jpeg",
        "name": "REAL MCKOY"
    },
    {
        "userId": "7006990475341628422botzombie",
        "avatar": "images/avatarFakeUser/7006990475341628422botzombie.jpeg",
        "name": "Ukrainetop"
    },
    {
        "userId": "7146564105678242822botzombie",
        "avatar": "images/avatarFakeUser/7146564105678242822botzombie.jpeg",
        "name": "Серёга49db71bqyb"
    },
    {
        "userId": "7075708324188521478botzombie",
        "avatar": "images/avatarFakeUser/7075708324188521478botzombie.jpeg",
        "name": "francisosche"
    },
    {
        "userId": "6742062483261342725botzombie",
        "avatar": "images/avatarFakeUser/6742062483261342725botzombie.jpeg",
        "name": "Ilias,mst"
    },
    {
        "userId": "6735939939743335430botzombie",
        "avatar": "images/avatarFakeUser/6735939939743335430botzombie.jpeg",
        "name": "user3638543160833"
    },
    {
        "userId": "6831893767650624517botzombie",
        "avatar": "images/avatarFakeUser/6831893767650624517botzombie.jpeg",
        "name": "Dudu Claudiu"
    },
    {
        "userId": "7154473126403064837botzombie",
        "avatar": "images/avatarFakeUser/7154473126403064837botzombie.jpeg",
        "name": "pasztorandras0"
    },
    {
        "userId": "7127336860263302149botzombie",
        "avatar": "images/avatarFakeUser/7127336860263302149botzombie.jpeg",
        "name": "Hugo"
    },
    {
        "userId": "7115778136930878466botzombie",
        "avatar": "images/avatarFakeUser/7115778136930878466botzombie.jpeg",
        "name": "user10lpxrj051"
    },
    {
        "userId": "7105609979772257285botzombie",
        "avatar": "images/avatarFakeUser/7105609979772257285botzombie.jpeg",
        "name": "SLAVON"
    },
    {
        "userId": "6862577289969468421botzombie",
        "avatar": "images/avatarFakeUser/6862577289969468421botzombie.jpeg",
        "name": "Blaxxiikan Reborn"
    },
    {
        "userId": "6962001754347439106botzombie",
        "avatar": "images/avatarFakeUser/6962001754347439106botzombie.jpeg",
        "name": "user3709555"
    },
    {
        "userId": "7173111497980888110botzombie",
        "avatar": "images/avatarFakeUser/7173111497980888110botzombie.jpeg",
        "name": "davidzemeckis"
    },
    {
        "userId": "6829402007348052998botzombie",
        "avatar": "images/avatarFakeUser/6829402007348052998botzombie.jpeg",
        "name": "Jesus Reyna"
    },
    {
        "userId": "6878154650861388805botzombie",
        "avatar": "images/avatarFakeUser/6878154650861388805botzombie.jpeg",
        "name": "Dustin Rose"
    },
    {
        "userId": "7010128475433337862botzombie",
        "avatar": "images/avatarFakeUser/7010128475433337862botzombie.jpeg",
        "name": "вася"
    },
    {
        "userId": "7135075984076227627botzombie",
        "avatar": "images/avatarFakeUser/7135075984076227627botzombie.jpeg",
        "name": "geoloong"
    },
    {
        "userId": "6630739148557139974botzombie",
        "avatar": "images/avatarFakeUser/6630739148557139974botzombie.jpeg",
        "name": "xxjuniorxx101"
    },
    {
        "userId": "6841134002775737350botzombie",
        "avatar": "images/avatarFakeUser/6841134002775737350botzombie.jpeg",
        "name": "Bogdan Mihai Florin"
    },
    {
        "userId": "6962711122290787334botzombie",
        "avatar": "images/avatarFakeUser/6962711122290787334botzombie.jpeg",
        "name": "Deion"
    }
]


document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && !e.code.includes("ontrol")) {
        switch (e.code) {
            case "Digit1": {
                BirthZombie("bot", false, randomString(15), "", oZombie, 0, 1);
                break;
            }
            case "Digit2": {
                BirthZombie("bot", false, randomString(15), "", oZombie, 0, 2);
                break;
            }
            case "Digit3": {
                BirthZombie("bot", false, randomString(15), "", oZombie, 0, 3);
                break;
            }
            case "Digit4": {
                BirthZombie("bot", false, randomString(15), "", oZombie, 0, 4);
                break;
            }
            case "Digit5": {
                BirthZombie("bot", false, randomString(15), "", oZombie, 0, 5);
                break;
            }
            case "KeyQ": {
                BirthZombie("bot", false, randomString(15), "", oPoleVaultingZombie, 0, 1);
                break;
            }
            case "KeyW": {
                BirthZombie("bot", false, randomString(15), "", oPoleVaultingZombie, 0, 2);
                break;
            }
            case "KeyE": {
                BirthZombie("bot", false, randomString(15), "", oPoleVaultingZombie, 0, 3);
                break;
            }
            case "KeyR": {
                BirthZombie("bot", false, randomString(15), "", oPoleVaultingZombie, 0, 4);
                break;
            }
            case "KeyT": {
                BirthZombie("bot", false, randomString(15), "", oPoleVaultingZombie, 0, 5);
                break;
            }
            case "KeyA": {
                BirthZombie("bot", false, randomString(15), "", oNewspaperZombie, 0, 1);
                break;
            }
            case "KeyS": {
                BirthZombie("bot", false, randomString(15), "", oNewspaperZombie, 0, 2);
                break;
            }
            case "KeyD": {
                BirthZombie("bot", false, randomString(15), "", oNewspaperZombie, 0, 3);
                break;
            }
            case "KeyF": {
                BirthZombie("bot", false, randomString(15), "", oNewspaperZombie, 0, 4);
                break;
            }
            case "KeyG": {
                BirthZombie("bot", false, randomString(15), "", oNewspaperZombie, 0, 5);
                break;
            }
            case "KeyZ": {
                BirthZombie("bot", false, randomString(15), "", oScreenDoorZombie, 0, 1);
                break;
            }
            case "KeyX": {
                BirthZombie("bot", false, randomString(15), "", oScreenDoorZombie, 0, 2);
                break;
            }
            case "KeyC": {
                BirthZombie("bot", false, randomString(15), "", oScreenDoorZombie, 0, 3);
                break;
            }
            case "KeyV": {
                BirthZombie("bot", false, randomString(15), "", oScreenDoorZombie, 0, 4);
                break;
            }
            case "KeyB": {
                BirthZombie("bot", false, randomString(15), "", oScreenDoorZombie, 0, 5);
                break;
            }
            case "KeyO": {
                let currentRow = currentRowIndex;
                let cellIndex = arrIndexCell.findIndex((item) => item[0] === currentRow && item[1] === 6)
                BirthPlantByCellAndType(oJalapeno, cellIndex);
                break;
            }
            case "KeyP": {
                BirthZombie("bot", false, "Test", undefined, ZName[Math.floor(Math.random() * ZName.length)], 0);
                break;
            }
        }
    }

})

