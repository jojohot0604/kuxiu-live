import qs from 'qs'
import { FETCH_USER_RANK_LIST, GUEST_FETCH_USER_RANK_LIST, FETCH_ANCHOR_RANK_LIST, GUEST_FETCH_ANCHOR_RANK_LIST } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, initWhiteListRequestHeaders, isRespSuccess, isArray, isObject } from '../../utils'

const _fetchUserRankList = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isArray(resp.data.userRankList)
    return ({
        type: FETCH_USER_RANK_LIST,
        furl_succ: success,
        furl_msg: resp.retMsg || '',
        furl_code: resp.retCode || 200,
        furl_list: success ? resp.data.userRankList : []
    })
}

export const fetchUserRankList = (data) => async (dispatch) => {
    try {
        data.date = new Date().getTime()
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/rank/user?${_data}`, {
            headers
        })
        return await dispatch(_fetchUserRankList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchUserRankList = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isArray(resp.data.userRankList)
    return ({
        type: GUEST_FETCH_USER_RANK_LIST,
        gfurl_succ: success,
        gfurl_msg: resp.retMsg || '',
        gfurl_code: resp.retCode || 200,
        gfurl_list: success ? resp.data.userRankList : []
    })
}

export const guestFetchUserRankList = (data) => async (dispatch) => {
    try {
        data.date = new Date().getTime()
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`supplement/guest/rank/user?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchUserRankList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchAnchorRankList = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isArray(resp.data.anchorRankList)
    return ({
        type: FETCH_ANCHOR_RANK_LIST,
        farl_succ: success,
        farl_msg: resp.retMsg || '',
        farl_code: resp.retCode || 200,
        farl_list: success ? resp.data.anchorRankList : []
    })
}

export const fetchAnchorRankList = (data) => async (dispatch) => {
    try {
        data.date = new Date().getTime()
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/rank/anchor?${_data}`, {
            headers
        })
        return await dispatch(_fetchAnchorRankList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchAnchorRankList = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isArray(resp.data.anchorRankList)
    return ({
        type: GUEST_FETCH_ANCHOR_RANK_LIST,
        gfarl_succ: success,
        gfarl_msg: resp.retMsg || '',
        gfarl_code: resp.retCode || 200,
        gfarl_list: success ? resp.data.anchorRankList : []
    })
}

export const guestFetchAnchorRankList = (data) => async (dispatch) => {
    try {
        data.date = new Date().getTime()
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`supplement/guest/rank/anchor?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchAnchorRankList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}