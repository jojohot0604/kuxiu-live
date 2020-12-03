import qs from 'qs'
import { FETCH_HOT_LIVE_LIST, FETCH_IMAGE_SIGN, GUEST_FETCH_HOT_LIVE_LIST, FETCH_RANDOM_LIVE_LIST, GUEST_FETCH_RANDOM_LIVE_LIST, FETCH_HOT_SEARCH_LIST, GUEST_FETCH_HOT_SEARCH_LIST, FETCH_FRESH_ANCHOR_LIST, GUEST_FETCH_FRESH_ANCHOR_LIST } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, initWhiteListRequestHeaders, isRespSuccess, isArray, isObject } from '../../utils'

const _fetchHotLiveList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_HOT_LIVE_LIST,
        fhll_succ: success,
        fhll_msg: resp.retMsg || '',
        fhll_code: resp.retCode || 200,
        fhll_list: success ? resp.data : []
    })
}

export const fetchHotLiveList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/live/hot/list/v2?${_data}`, {
            headers
        })
        return await dispatch(_fetchHotLiveList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchHotLiveList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: GUEST_FETCH_HOT_LIVE_LIST,
        gfhll_succ: success,
        gfhll_msg: resp.retMsg || '',
        gfhll_code: resp.retCode || 200,
        gfhll_list: success ? resp.data : []
    })
}

export const guestFetchHotLiveList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders()
        const response = await fetchApi.get(`supplement/guest/live/hot/list?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchHotLiveList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchRandomLiveList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_RANDOM_LIVE_LIST,
        frll_succ: success,
        frll_msg: resp.retMsg || '',
        frll_code: resp.retCode || 200,
        frll_list: success ? resp.data : []
    })
}

export const fetchRandomLiveList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/live/change/list?${_data}`, {
            headers
        })
        return await dispatch(_fetchRandomLiveList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchRandomLiveList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: GUEST_FETCH_RANDOM_LIVE_LIST,
        gfrll_succ: success,
        gfrll_msg: resp.retMsg || '',
        gfrll_code: resp.retCode || 200,
        gfrll_list: success ? resp.data : []
    })
}

export const guestFetchRandomLiveList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`supplement/guest/live/change/list?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchRandomLiveList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchHotSearchList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_HOT_SEARCH_LIST,
        fhsl_succ: success,
        fhsl_msg: resp.retMsg || '',
        fhsl_code: resp.retCode || 200,
        fhsl_list: success ? resp.data : []
    })
}

export const fetchHotSearchList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/live/hot/search/list?${_data}`, {
            headers
        })
        return await dispatch(_fetchHotSearchList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchHotSearchList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: GUEST_FETCH_HOT_SEARCH_LIST,
        gfhsl_succ: success,
        gfhsl_msg: resp.retMsg || '',
        gfhsl_code: resp.retCode || 200,
        gfhsl_list: success ? resp.data : []
    })
}

export const guestFetchHotSearchList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`supplement/guest/live/hot/search/list?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchHotSearchList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchFreshAnchorList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_FRESH_ANCHOR_LIST,
        ffal_succ: success,
        ffal_msg: resp.retMsg || '',
        ffal_code: resp.retCode || 200,
        ffal_list: success ? resp.data : []
    })
}

export const fetchFreshAnchorList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/live/new/anchor/list/web?${_data}`, {
            headers
        })
        return await dispatch(_fetchFreshAnchorList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchFreshAnchorList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: GUEST_FETCH_FRESH_ANCHOR_LIST,
        gffal_succ: success,
        gffal_msg: resp.retMsg || '',
        gffal_code: resp.retCode || 200,
        gffal_list: success ? resp.data : []
    })
}

export const guestFetchFreshAnchorList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`supplement/guest/live/new/anchor/list/web?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchFreshAnchorList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchImageSign = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isObject(resp.data.credentials)
    return ({
        type: FETCH_IMAGE_SIGN,
        fis_succ: success,
        fis_msg: resp.retMsg || '',
        fis_code: resp.retCode || 200,
        fis_data: success ? resp.data : {}
    })
}

export const fetchImageSign = () => async (dispatch) => {
    try {
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/image/temp/sign`, {
            headers
        })
        return await dispatch(_fetchImageSign(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}