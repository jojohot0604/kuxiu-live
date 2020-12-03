import { SEND_VERIFICATION_CODE, BIND_MOBILE } from '../actionTypes'

export const initialState = {
    sendVerificationCode: {
        result: true,
        msg: '',
        code: 200
    },
    bindMobile: {
        result: true,
        msg: '',
        code: 200
    },
}

export default (state = initialState, action) => {
    const {
        type,
        svc_succ,
        svc_msg,
        svc_code,
        bm_succ,
        bm_msg,
        bm_code
    } = action
    switch (type) {
        case SEND_VERIFICATION_CODE:
            return {
                ...state,
                sendVerificationCode: {
                    result: svc_succ,
                    msg: svc_msg,
                    code: svc_code
                }
            }
        case BIND_MOBILE:
            return {
                ...state,
                bindMobile: {
                    result: bm_succ,
                    msg: bm_msg,
                    code: bm_code
                }
            }
        default: return state
    }
}