import { LOGIN, REGISTER, RESET_PASSWORD, CHECK_MOBILE, LOGIN_BY_THIRD, LOGIN_BY_TOKEN, FETCH_WECHAT_OPENID, FETCH_QQ_OPENID } from '../actionTypes'

export const initialState = {
    login: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    loginByThird: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    loginByToken: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    register: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    checkMobile: {
        result: true,
        msg: '',
        code: 200
    },
    resetPassword: {
        result: true,
        msg: '',
        code: 200
    },
    fetchWechatOpenId: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    fetchQqOpenId: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
}

export default (state = initialState, action) => {
    const {
        type,
        l_succ,
        l_msg,
        l_code,
        l_data,
        lbt_succ,
        lbt_msg,
        lbt_code,
        lbt_data,
        lbto_succ,
        lbto_msg,
        lbto_code,
        lbto_data,
        fwo_succ,
        fwo_msg,
        fwo_code,
        fwo_data,
        fqo_succ,
        fqo_msg,
        fqo_code,
        fqo_data,
        r_succ,
        r_msg,
        r_code,
        r_data,
        cm_succ,
        cm_msg,
        cm_code,
        rp_succ,
        rp_msg,
        rp_code
    } = action
    switch (type) {
        case LOGIN:
            return {
                ...state,
                login: {
                    result: l_succ,
                    msg: l_msg,
                    code: l_code,
                    data: l_data
                }
            }
        case LOGIN_BY_THIRD:
            return {
                ...state,
                loginByThird: {
                    result: lbt_succ,
                    msg: lbt_msg,
                    code: lbt_code,
                    data: lbt_data,
                }
            }
        case LOGIN_BY_TOKEN:
            return {
                ...state,
                loginByToken: {
                    result: lbto_succ,
                    msg: lbto_msg,
                    code: lbto_code,
                    data: lbto_data,
                }
            }
        case FETCH_WECHAT_OPENID:
            return {
                ...state,
                fetchWechatOpenId: {
                    result: fwo_succ,
                    msg: fwo_msg,
                    code: fwo_code,
                    data: fwo_data
                }
            }
        case FETCH_QQ_OPENID:
            return {
                ...state,
                fetchQqOpenId: {
                    result: fqo_succ,
                    msg: fqo_msg,
                    code: fqo_code,
                    data: fqo_data
                }
            }
        case REGISTER:
            return {
                ...state,
                register: {
                    result: r_succ,
                    msg: r_msg,
                    code: r_code,
                    data: r_data
                }
            }
        case CHECK_MOBILE:
            return {
                ...state,
                checkMobile: {
                    result: cm_succ,
                    msg: cm_msg,
                    code: cm_code
                }
            }
        case RESET_PASSWORD:
            return {
                ...state,
                resetPassword: {
                    result: rp_succ,
                    msg: rp_msg,
                    code: rp_code
                }
            }
        default: return state
    }
}