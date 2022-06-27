/**
 * api管理
 */

import request from '../utils/request'

export default {
    //用户排名
    rankList(params) {
        return request({
            url: '/compete/show',
            method: 'get',
            data: params,
        })
    },
    competitionInfo(params) {
        return request({
            url: '/compete/competitionInfo',
            method: 'get',
            data: params,
        })
    },
    //开始匹配
    startMatch(params) {
        return request({
            url: '/compete/match',
            method: 'post',
            data: params,
        })
    },
    //开始匹配
    startFinal(params) {
        return request({
            url: '/compete/startFinal',
            method: 'post',
            data: params,
        })
    },
    dealUserInfo(params) {
        return request({
            url: '/compete/userAdd',
            method: 'post',
            data: params,
        })
    },
    //提交答案
    checkAnswer(params) {
        return request({
            url: '/score/checkAnswer',
            method: 'post',
            data: params
        })
    },
    timeOutAnswer(params) {
        return request({
            url: '/score/timeOutAnswer',
            method: 'post',
            data: params
        })
    },

    getNoticeCount() {
        return request({
            url: '/notice/count',
            method: 'get',
            data: {},
            mock: true,
        })
    },
}
