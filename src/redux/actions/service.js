import qs from 'qs'
import { FETCH_CUSTOMER_SERVICE_LIST, SEND_CUSTOMER_SERVICE_MSG } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, isRespSuccess, isArray } from '../../utils'

const _fetchServiceList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_CUSTOMER_SERVICE_LIST,
        fsl_succ: success,
        fsl_msg: resp.retMsg || '',
        fsl_code: resp.retCode || 200,
        fsl_list: success ? resp.data : []
    })
}

export const fetchServiceList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/sys/msg/my/records?${_data}`, {
            headers
        })
        return await dispatch(_fetchServiceList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _sendServiceMsg = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: SEND_CUSTOMER_SERVICE_MSG,
        ssm_succ: success,
        ssm_msg: resp.retMsg || '',
        ssm_code: resp.retCode || 200
    })
}

export const sendServiceMsg = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`supplement/sys/send/msg`, _data, {
            headers
        })
        return await dispatch(_sendServiceMsg(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}