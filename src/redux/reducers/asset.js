import { FETCH_ASSET, PAYMENT, FETCH_PAYMENT_ORDER } from '../actionTypes'

export const initialState = {
    fetchAsset: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    fetchPaymentOrder: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    payment: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    }
}

export default (state = initialState, action) => {
    const {
        type,
        fa_succ,
        fa_msg,
        fa_code,
        fa_data,
        fpo_succ,
        fpo_msg,
        fpo_code,
        fpo_data,
        p_succ,
        p_msg,
        p_code,
        p_data,
    } = action
    switch (type) {
        case FETCH_ASSET:
            return {
                ...state,
                fetchAsset: {
                    result: fa_succ,
                    msg: fa_msg,
                    code: fa_code,
                    data: fa_data
                }
            }
        case FETCH_PAYMENT_ORDER:
            return {
                ...state,
                fetchPaymentOrder: {
                    result: fpo_succ,
                    msg: fpo_msg,
                    code: fpo_code,
                    data: fpo_data
                }
            }
        case PAYMENT:
            return {
                ...state,
                payment: {
                    result: p_succ,
                    msg: p_msg,
                    code: p_code,
                    list: p_data
                }
            }
        default: return state
    }
}