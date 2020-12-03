import { BUY_GUARD } from '../actionTypes'

export const initialState = {
    buyGuard: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
}

export default (state = initialState, action) => {
    const {
        type,
        bg_succ,
        bg_msg,
        bg_code,
        bg_data
    } = action
    switch (type) {
        case BUY_GUARD:
            return {
                ...state,
                buyGuard: {
                    result: bg_succ,
                    msg: bg_msg,
                    code: bg_code,
                    data: bg_data
                }
            }
        default: return state
    }
}