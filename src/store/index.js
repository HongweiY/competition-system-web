/**
 * vuex 管理
 */

import {createStore} from 'vuex'
import storage from '../utils/storage'
import mutations from './mutations'


const state = {
    userInfo: storage.getItem('userInfo') || {},
    competeInfo: storage.getItem('competeInfo') || {},
    token: storage.getItem('token') || {},
    ws: null,
    matchUserInfo: [],
    penInfo: [],
    roomId: '',
    rounds: 1,
    finalInfo: {},
    pushInfo: {}
}
const actions = {
    matchRoom({commit}, matchInfo) {
        commit('enterRoom', matchInfo)
    },
    finalUser({commit}, finalUserInfos) {
        commit('finalUserInfos', finalUserInfos)
    },
    pushPen({commit}, prnInfo) {
        commit('pushPen', prnInfo)
    },
    matchMewRoom({commit}, newRoomId) {
        commit('matchMewRoom', newRoomId)
    },
    changeCompeteType({commit}, competenfo) {
        commit('changeCompeteType', competenfo)
    },
    pushAnswerInfo({commit}, userInfos) {
        commit('pushAnswerInfo', userInfos)
    },
    //开始终极排位赛
    finalCompetition({commit}, competitionInfo) {
        commit('finalCompetition', competitionInfo)
    },
    pushFinalPen({commit}, prnInfo) {
        commit('pushFinalPen', prnInfo)
    },
    pushFinalMessage({commit}, pushInfo) {
        commit('pushFinalMessage', pushInfo)
    },


}

export default createStore({
    mutations,
    state,
    actions
})
