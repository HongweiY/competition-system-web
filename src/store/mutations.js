import storage from '../utils/storage'
import websocket from "../utils/websocket";

export default {
    saveUserInfo(state, userInfo) {
        state.userInfo = userInfo
        storage.setItem('userInfo', userInfo)
    },
    saveCompeteInfo(state, competeInfo) {
        state.competeInfo = competeInfo
        storage.setItem('competeInfo', competeInfo)
    },
    saveToken(state, token) {
        state.token = token
        storage.setItem('token', token)
    },
    initWebSocket(state, config) {
        state.ws = new websocket(config)
        state.ws.init()
    },
    initMatchUser(state, value) {
        if(state.competeInfo.currentType === 'must') {
            state.matchUserInfo = [
                {
                    ...value,
                    role: '自己',
                    name: value.username
                },
                {
                    username: "匹配中",
                    name: '随机匹配中',
                    role: '对手',
                    img: 'src/assets/images/user.png'
                },
                {
                    username: "匹配中",
                    role: '对手',
                    name: '随机匹配中',
                    img: 'src/assets/images/user.png'
                },
                {
                    username: "匹配中",
                    name: '随机匹配中',
                    role: '对手',
                    img: 'src/assets/images/user.png'
                }
            ]
        } else {
            state.matchUserInfo = [
                {
                    city: "南京",
                    depart: "研发部",
                    img: "http://dummyimage.com/200x200/50B347&text=#FFF",
                    phone: "19899998888",
                    userId: 10000002,
                    username: "yhw",
                    role: '自己',
                    _id: "62a84d79eb29a16825a9c570"
                },
                {
                    role: '对手',
                },
            ]
        }
    },
    //有人员进入
    enterRoom(state, value) {
        const matchInfo = value.message
        const matchUserInfo = []
        const currentUser = storage.getItem('userInfo')
        if(matchInfo.userOneId) {
            matchUserInfo[0] = matchInfo.userOneId
        }
        if(matchInfo.userTwoId) {
            matchUserInfo[1] = matchInfo.userTwoId
        }
        if(matchInfo.userThreeId) {
            matchUserInfo[2] = matchInfo.userThreeId
        }
        if(matchInfo.userFourId) {
            matchUserInfo[3] = matchInfo.userFourId
        }

        state.matchUserInfo = [{
            ...currentUser,
            role: '自己',
            name: currentUser.username,
            useTime: 0,
            score: 0
        }]

        for(const user of matchUserInfo) {
            if(user._id !== currentUser._id) {
                state.matchUserInfo.push({
                    ...user,
                    role: '对手',
                    name: user.username,
                    useTime: 0,
                    score: user.__v
                })
            }
            if(user._id === currentUser._id) {
                state.matchUserInfo[0].score = user.__v
            }


        }
    },
    finalUserInfos(state, value) {
        const matchInfo = value.message
        const finalUserInfos = []
        const currentUser = storage.getItem('userInfo')


        finalUserInfos[0] = matchInfo[0]
        finalUserInfos[1] = matchInfo[1]
        state.matchUserInfo = []
        for(const user of finalUserInfos) {
            if(user._id !== currentUser._id) {
                state.matchUserInfo[0] = {
                    ...user,
                    rank: user.rank
                }

            } else {
                state.matchUserInfo[1] = {
                    ...user,
                    rank: user.rank
                }
            }

        }
    },
    pushPen(state, value) {
        const penInfo = value.message
        //获取题目
        state.penInfo = penInfo
    },
    pushFinalPen(state, value) {
        const penInfo = value.message
        //获取题目
        state.penInfo = penInfo
    },
    pushFinalMessage(state, value) {
        const pushInfo = value.message
        //获取题目
        state.pushInfo = pushInfo
    },

    //开始新的匹配
    matchMewRoom(state, value) {
        const rounds = value.message.rounds
        state.rounds = rounds
    },
    startMatch(state, value) {
        state.roomId = value
        state.ws.send(JSON.stringify({
            event: 'matchRoom',
            roomId: value,
            userId: state.userInfo.userId,
        }))
    },
    //更新答题模式
    changeCompeteType(state, value) {
        state.competeInfo = value.message
        storage.setItem('competeInfo', value.message)
        //展示匹配页面，开始匹配

    },
    //推送回答情况
    pushAnswerInfo(state, value) {
        const answerInfos = value.message

        const tempMatchUserInfo = state.matchUserInfo
        const newMatchUserInfo = []
        for(const user of tempMatchUserInfo) {
            for(const answerInfo of answerInfos) {
                if(user._id === answerInfo._id) {
                    newMatchUserInfo.push({
                        ...user,
                        useTime: answerInfo.useTime ? answerInfo.useTime : 0,
                        score: answerInfo.score ? answerInfo.score : 0,
                        isRight: answerInfo.isRight
                    })
                }
            }
        }
        state.matchUserInfo = newMatchUserInfo
        //
    },
    //终极排位赛信息
    finalCompetition(state, value) {
        state.competeInfo = value.newCompeteInfo
        storage.setItem('competeInfo', value.newCompeteInfo)
        //保存当前用户信息
        state.finalInfo = value.finalInfo
        storage.setItem('finalInfo', value.finalInfo)

    },


}
