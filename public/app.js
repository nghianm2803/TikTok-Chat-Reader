// This will use the demo backend if you open index.html locally via file://, otherwise your server will be used
let backendUrl = location.protocol === 'file:' ? "https://tiktok-chat-reader.zerody.one/" : undefined;
let connection = new TikTokIOConnection(backendUrl);

// Counter
let viewerCount = 0;
let likeCount = 0;
let diamondsCount = 0;

// These settings are defined by obs.html
if (!window.settings) window.settings = {};

let idComment = undefined;

let bannedUserSpam = []

$(document).ready(() => {
    $('#connectButton').click(connect);
    $('#uniqueIdInput').on('keyup', function (e) {
        if (e.key === 'Enter') {
            connect();
        }
    });

    if (window.settings.username) connect();
})

const ENUM_TYPE_ACTION = {
    SHARE_FOLLOW: "SHARE_FOLLOW",
    LIKE: "LIKE",
    GIFT: "GIFT",
    COMMENT: "COMMENT",
}

function connect() {
    let uniqueId = window.settings.username || $('#uniqueIdInput').val();
    if (uniqueId !== '') {

        $('#stateText').text('Connecting...');
        connection.connect(uniqueId, {
            enableExtendedGiftInfo: true
        }).then(state => {
            console.log("Connected: " + state)
            $('#stateText').text(`Connected to roomId ${state.roomId}`);

            // reset stats
            viewerCount = 0;
            likeCount = 0;
            diamondsCount = 0;
            updateRoomStats();
            SelectModal(10)
        }).catch(errorMessage => {
            console.log(errorMessage, "errorMessage")
            $('#stateText').text(errorMessage);

            // schedule next try if obs username set
            if (window.settings.username) {
                setTimeout(() => {
                    connect(window.settings.username);
                }, 30000);
            }
        })

    } else {
        alert('no username entered');
    }
}

connect();

// Prevent Cross site scripting (XSS)
function sanitize(text) {
    return text.replace(/</g, '&lt;')
}

function updateRoomStats() {
    $('#roomStats').html(`Viewers: <b>${viewerCount.toLocaleString()}</b> Likes: <b>${likeCount.toLocaleString()}</b> Earned Diamonds: <b>${diamondsCount.toLocaleString()}</b>`)
}

function generateUsernameLink(data) {
    return `<a class="usernamelink" href="https://www.tiktok.com/@${data.uniqueId}" target="_blank">${data.uniqueId}</a>`;
}

function isPendingStreak(data) {
    return data.giftType === 1 && !data.repeatEnd;
}

/**
 * Add a new message to the chat container
 */
function handleEventLive(typeEvent, data) {
    if ([ENUM_TYPE_ACTION.SHARE_FOLLOW, ENUM_TYPE_ACTION.GIFT, ENUM_TYPE_ACTION.LIKE].includes(typeEvent)) {
        if (idComment === data.msgId) return;
        idComment = data.msgId;

        if (typeEvent === ENUM_TYPE_ACTION.GIFT) {
            if (Number.isInteger(data.diamondCount) && data.diamondCount > 0) {
                if (ZNamePackage["package" + data.diamondCount]) {
                    // Chọn zombie theo gói
                    BirthZombie(data.userId + "", true, data.nickname || "", data.profilePictureUrl, ZNamePackage["package" + data.diamondCount][Math.floor(Math.random() * ZNamePackage["package" + data.diamondCount].length)], data.diamondCount);
                } else {
                    if (data.diamondCount === 100) {
                        //Trồng ớt
                        let currentRow = currentRowIndex;
                        let cellIndex = arrIndexCell.findIndex((item) => item[0] === currentRow && item[1] === 6)
                        BirthPlantByCellAndType(oJalapeno, cellIndex);
                    } else {
                        //Chọn bất kỳ vì giá ko theo quy tắc
                        BirthZombie(data.userId + "", true, data.nickname || "", data.profilePictureUrl, ZombieName[Math.floor(Math.random() * ZombieName.length)], data.diamondCount);
                    }
                }
            }
        } else {
            if (typeEvent === ENUM_TYPE_ACTION.LIKE) {
                if (!bannedUserSpam.includes(data.userId)) {
                    BirthZombie(data.userId + "", false, data.nickname || "", data.profilePictureUrl || "", oZombie, 1);
                    bannedUserSpam.push(data.userId);
                    setTimeout(() => {
                        let indexUserInBannedArr = bannedUserSpam.indexOf(data.userId);
                        if (indexUserInBannedArr > -1) {
                            bannedUserSpam.splice(indexUserInBannedArr, 1);
                        }
                    }, 15000)
                }
            } else {
                // Tạo zombie cho bọn share và follow, like
                BirthZombie(data.userId + "", false, data.nickname || "", data.profilePictureUrl || "", oZombie, 1);
            }
        }
    }

}

/**
 * Add a new gift to the gift container
 */
// function addGiftItem(data) {
//     let container = location.href.includes('obs.html') ? $('.eventcontainer') : $('.giftcontainer');
//
//     if (container.find('div').length > 200) {
//         container.find('div').slice(0, 100).remove();
//     }
//
//     let streakId = data.userId.toString() + '_' + data.giftId;
//
//     let html = `
//         <div data-streakid=${isPendingStreak(data) ? streakId : ''}>
//             <img class="miniprofilepicture" src="${data.profilePictureUrl}">
//             <span>
//                 <b>${generateUsernameLink(data)}:</b> <span>${data.describe}</span><br>
//                 <div>
//                     <table>
//                         <tr>
//                             <td><img class="gifticon" src="${data.giftPictureUrl}"></td>
//                             <td>
//                                 <span>Name: <b>${data.giftName}</b> (ID:${data.giftId})<span><br>
//                                 <span>Repeat: <b style="${isPendingStreak(data) ? 'color:red' : ''}">x${data.repeatCount.toLocaleString()}</b><span><br>
//                                 <span>Cost: <b>${(data.diamondCount * data.repeatCount).toLocaleString()} Diamonds</b><span>
//                             </td>
//                         </tr>
//                     </tabl>
//                 </div>
//             </span>
//         </div>
//     `;
//
//     let existingStreakItem = container.find(`[data-streakid='${streakId}']`);
//
//     if (existingStreakItem.length) {
//         existingStreakItem.replaceWith(html);
//     } else {
//         container.append(html);
//     }
//
//     container.stop();
//     container.animate({
//         scrollTop: container[0].scrollHeight
//     }, 800);
// }


// viewer stats
// connection.on('roomUser', (msg) => {
//     if (typeof msg.viewerCount === 'number') {
//         viewerCount = msg.viewerCount;
//         updateRoomStats();
//     }
// })

// like stats
connection.on('like', (data) => {
    console.log("Nhan ne")
    handleEventLive(ENUM_TYPE_ACTION.LIKE, data);
})

// Member join
// let joinMsgDelay = 0;
// connection.on('member', (msg) => {
//     if (window.settings.showJoins === "0") return;
//
//     let addDelay = 250;
//     if (joinMsgDelay > 500) addDelay = 100;
//     if (joinMsgDelay > 1000) addDelay = 0;
//
//     joinMsgDelay += addDelay;
//
//     setTimeout(() => {
//         joinMsgDelay -= addDelay;
//         handleEventLive('#21b2c2', msg, 'joined', true);
//     }, joinMsgDelay);
// })

// New chat comment received
// connection.on('chat', (msg) => {
//     if (window.settings.showChats === "0") return;
//
//     handleEventLive('', msg, msg.comment);
// })

// New gift received
connection.on('gift', (data) => {
    if (data.gift.repeat_end == 0) {
        handleEventLive(ENUM_TYPE_ACTION.SHARE_FOLLOW, data);
    }
})

// share, follow
connection.on('social', (data) => {
    handleEventLive(ENUM_TYPE_ACTION.SHARE_FOLLOW, data);
})

// connection.on('streamEnd', () => {
//     $('#stateText').text('Stream ended.');
//
//     // schedule next try if obs username set
//     if (window.settings.username) {
//         setTimeout(() => {
//             connect(window.settings.username);
//         }, 30000);
//     }
// })
