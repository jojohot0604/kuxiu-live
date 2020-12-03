import qs from 'qs'
import { LOGIN, REGISTER, RESET_PASSWORD, CHECK_MOBILE, LOGIN_BY_THIRD, LOGIN_BY_TOKEN, FETCH_WECHAT_OPENID, FETCH_QQ_OPENID } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initWhiteListRequestHeaders, initRequestHeaders, isRespSuccess, isObject } from '../../utils'

const _login = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: LOGIN,
        l_succ: success,
        l_msg: resp.retMsg || '',
        l_code: resp.retCode || 200,
        l_data: success ? resp.data : {}
    })
}

export const login = (data, channel) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null, channel)
        const response = await fetchApi.post(`/user/login`, _data, {
            headers
        })
        return await dispatch(_login(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _register = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: REGISTER,
        r_succ: success,
        r_msg: resp.retMsg || '',
        r_code: resp.retCode || 200,
        r_data: success ? resp.data : {}
    })
}

export const register = (data, channel) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null, channel)
        const response = await fetchApi.post(`/user/register`, _data, {
            headers
        })
        return await dispatch(_register(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _checkMobile = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: CHECK_MOBILE,
        cm_succ: success,
        cm_msg: resp.retMsg || '',
        cm_code: resp.retCode || 200
    })
}

export const checkMobile = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`/user/checkMobile`, _data, {
            headers
        })
        return await dispatch(_checkMobile(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _resetPassword = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: RESET_PASSWORD,
        rp_succ: success,
        rp_msg: resp.retMsg || '',
        rp_code: resp.retCode || 200
    })
}

export const resetPassword = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`/user/resetPassword`, _data, {
            headers
        })
        return await dispatch(_resetPassword(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _loginByThird = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: LOGIN_BY_THIRD,
        lbt_succ: success,
        lbt_msg: resp.retMsg || '',
        lbt_code: resp.retCode || 200,
        lbt_data: resp.data || {},
    })
}

export const loginByThird = (data, channel) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null, channel)
        const response = await fetchApi.post(`/user/loginByThird`, _data, {
            headers
        })
        return await dispatch(_loginByThird(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _loginByToken = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: LOGIN_BY_TOKEN,
        lbto_succ: success,
        lbto_msg: resp.retMsg || '',
        lbto_code: resp.retCode || 200,
        lbto_data: success ? resp.data : {}
    })
}

export const loginByToken = () => async (dispatch) => {
    try {
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`/user/loginByToken`, null, {
            headers
        })
        return await dispatch(_loginByToken(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchWechatOpenId = (resp) => {
    const data = JSON.parse(resp.data)
    const success = isRespSuccess(resp) && isObject(data)
    return ({
        type: FETCH_WECHAT_OPENID,
        fwo_succ: success,
        fwo_msg: resp.retMsg || '',
        fwo_code: resp.retCode || 200,
        fwo_data: success ? data : {}
    })
}

export const fetchWechatOpenId = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`/user/getWeixinOpenId`, _data, {
            headers
        })
        return await dispatch(_fetchWechatOpenId(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchQqOpenId = (resp) => {
    const data = JSON.parse(resp.data)
    const success = isRespSuccess(resp) && isObject(data)
    return ({
        type: FETCH_QQ_OPENID,
        fqo_succ: success,
        fqo_msg: resp.retMsg || '',
        fqo_code: resp.retCode || 200,
        fqo_data: success ? data : {}
    })
}

export const fetchQqOpenId = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`/user/getQqOpenId`, _data, {
            headers
        })
        return await dispatch(_fetchQqOpenId(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}