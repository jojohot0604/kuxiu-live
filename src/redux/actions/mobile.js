import qs from 'qs'
import { SEND_VERIFICATION_CODE, BIND_MOBILE } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, initWhiteListRequestHeaders, isRespSuccess } from '../../utils'

const _sendVerificationCode = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: SEND_VERIFICATION_CODE,
        svc_succ: success,
        svc_msg: resp.retMsg || '',
        svc_code: resp.retCode || 200
    })
}

export const sendVerificationCode = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`/user/getVerificationCode`, _data, {
            headers
        })
        return await dispatch(_sendVerificationCode(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _bindMobile = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: BIND_MOBILE,
        bm_succ: success,
        bm_msg: resp.retMsg || '',
        bm_code: resp.retCode || 200
    })
}

export const bindMobile = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`/user/bindMobile`, _data, {
            headers
        })
        return await dispatch(_bindMobile(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}