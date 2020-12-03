import qs from 'qs'
import { FETCH_GIFT_LIST, GUEST_FETCH_GIFT_LIST, FETCH_SPECIAL_GIFT_LIST, GUEST_FETCH_SPECIAL_GIFT_LIST, SEND_GIFT } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, initWhiteListRequestHeaders, isRespSuccess, isArray, isObject, isPositiveZero } from '../../utils'

const _fetchGiftList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_GIFT_LIST,
        fgl_succ: success,
        fgl_msg: resp.retMsg || '',
        fgl_code: resp.retCode || 200,
        fgl_list: success ? resp.data : []
    })
}

export const fetchGiftList = () => async (dispatch) => {
    try {
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`gift/room/giftList`, null, {
            headers
        })
        return await dispatch(_fetchGiftList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchGiftList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: GUEST_FETCH_GIFT_LIST,
        gfgl_succ: success,
        gfgl_msg: resp.retMsg || '',
        gfgl_code: resp.retCode || 200,
        gfgl_list: success ? resp.data : []
    })
}

export const guestFetchGiftList = () => async (dispatch) => {
    try {
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`gift/guest/room/giftList`, null, {
            headers
        })
        return await dispatch(_guestFetchGiftList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _sendGift = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isPositiveZero(resp.data.balance)
    return ({
        type: SEND_GIFT,
        sg_succ: success,
        sg_msg: resp.retMsg || '',
        sg_code: resp.retCode || 200,
        sg_value: success ? resp.data.balance : -1
    })
}

export const sendGift = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`gift/room/sendGift`, _data, {
            headers
        })
        return await dispatch(_sendGift(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchSpecialGiftList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_SPECIAL_GIFT_LIST,
        fsgl_succ: success,
        fsgl_msg: resp.retMsg || '',
        fsgl_code: resp.retCode || 200,
        fsgl_list: success ? resp.data : []
    })
}

export const fetchSpecialGiftList = () => async (dispatch) => {
    try {
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`gift/room/specialGiftList`, null, {
            headers
        })
        return await dispatch(_fetchSpecialGiftList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchSpecialGiftList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: GUEST_FETCH_SPECIAL_GIFT_LIST,
        gfsgl_succ: success,
        gfsgl_msg: resp.retMsg || '',
        gfsgl_code: resp.retCode || 200,
        gfsgl_list: success ? resp.data : []
    })
}

export const guestFetchSpecialGiftList = () => async (dispatch) => {
    try {
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`gift/guest/room/specialGiftList`, null, {
            headers
        })
        return await dispatch(_guestFetchSpecialGiftList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}