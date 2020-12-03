import qs from 'qs'
import { FETCH_ATTENTION_LIST, FETCH_LIVE_ATTENTION_LIST, ADD_ATTENTION, CANCEL_ATTENTION } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, isRespSuccess, isObject, isArray } from '../../utils'

const _fetchAttentionList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_ATTENTION_LIST,
        fal_succ: success,
        fal_msg: resp.retMsg || '',
        fal_code: resp.retCode || 200,
        fal_list: success ? resp.data : []
    })
}

export const fetchAttentionList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`user/getAttentionList`, _data, {
            headers
        })
        return await dispatch(_fetchAttentionList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchLiveAttentionList = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isArray(resp.data.list)
    return ({
        type: FETCH_LIVE_ATTENTION_LIST,
        flal_succ: success,
        flal_msg: resp.retMsg || '',
        flal_code: resp.retCode || 200,
        flal_list: success ? resp.data.list : []
    })
}

export const fetchLiveAttentionList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`user/getAttentionListPlaying`, _data, {
            headers
        })
        return await dispatch(_fetchLiveAttentionList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _addAttention = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: ADD_ATTENTION,
        aa_succ: success,
        aa_msg: resp.retMsg || '',
        aa_code: resp.retCode || 200
    })
}

export const addAttention = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`user/attentionAdd`, _data, {
            headers
        })
        return await dispatch(_addAttention(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _cancelAttention = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: CANCEL_ATTENTION,
        ca_succ: success,
        ca_msg: resp.retMsg || '',
        ca_code: resp.retCode || 200
    })
}

export const cancelAttention = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`user/attentionCancel`, _data, {
            headers
        })
        return await dispatch(_cancelAttention(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}