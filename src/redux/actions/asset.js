import qs from 'qs'
import { FETCH_ASSET, PAYMENT, FETCH_PAYMENT_ORDER } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, initWhiteListRequestHeaders, isRespSuccess, isObject } from '../../utils'

const _fetchAsset = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: FETCH_ASSET,
        fa_succ: success,
        fa_msg: resp.retMsg || '',
        fa_code: resp.retCode || 200,
        fa_data: success ? resp.data : {}
    })
}

export const fetchAsset = () => async (dispatch) => {
    try {
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`payment/asset/query`, {
            headers
        })
        return await dispatch(_fetchAsset(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchPaymentOrder = (resp) => {
    const data = JSON.parse(resp.data)
    const success = isRespSuccess(resp) && isObject(data)
    return ({
        type: FETCH_PAYMENT_ORDER,
        fpo_succ: success,
        fpo_msg: resp.retMsg || '',
        fpo_code: resp.retCode || 200,
        fpo_data: success ? data : {}
    })
}

export const fetchPaymentOrder = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders()
        const response = await fetchApi.get(`payment/order/query?${_data}`, {
            headers
        })
        return await dispatch(_fetchPaymentOrder(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _payment = (resp) => {
    const data = JSON.parse(resp.data)
    const success = isRespSuccess(resp) && isObject(data)
    return ({
        type: PAYMENT,
        p_succ: success,
        p_msg: resp.retMsg || '',
        p_code: resp.retCode || 200,
        p_data: success ? data : {}
    })
}

export const payment = (userId, type, data) => async (dispatch) => {
    try {
        const headers = initWhiteListRequestHeaders(userId)
        let paymentUrl;
        switch (type) {
            case 'wechat':
                paymentUrl = 'payment/order/webchat_qrcode_pc'
                break;
            case 'alipay':
                paymentUrl = 'payment/order/ali_qrcode_pc'
                break;
            case 'unionpay':
                paymentUrl = 'payment/order/chinapay_pc'
                break;
            default:
                break;
        }
        if (!paymentUrl) {
            return;
        }
        const response = await fetchApi.post(paymentUrl, data, {
            headers
        })
        return await dispatch(_payment(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}