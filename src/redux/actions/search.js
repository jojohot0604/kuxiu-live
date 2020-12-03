import qs from 'qs'
import { FETCH_SEARCH_RESULT_LIST, GUEST_FETCH_SEARCH_RESULT_LIST } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, isRespSuccess, isArray, initWhiteListRequestHeaders } from '../../utils'

const _fetchSearchList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_SEARCH_RESULT_LIST,
        fsl_succ: success,
        fsl_msg: resp.retMsg || '',
        fsl_code: resp.retCode || 200,
        fsl_list: success ? resp.data : []
    })
}

export const fetchSearchList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`user/search/user`, _data, {
            headers
        })
        return await dispatch(_fetchSearchList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchSearchList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: GUEST_FETCH_SEARCH_RESULT_LIST,
        gfsl_succ: success,
        gfsl_msg: resp.retMsg || '',
        gfsl_code: resp.retCode || 200,
        gfsl_list: success ? resp.data : []
    })
}

export const guestFetchSearchList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`user/guest/search/user`, _data, {
            headers
        })
        return await dispatch(_guestFetchSearchList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}