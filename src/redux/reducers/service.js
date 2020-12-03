import { FETCH_CUSTOMER_SERVICE_LIST, SEND_CUSTOMER_SERVICE_MSG } from '../actionTypes'

export const initialState = {
    fetchServiceList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    sendServiceMsg: {
        result: true,
        msg: '',
        code: 200
    },
}

export default (state = initialState, action) => {
    const {
        type,
        fsl_succ,
        fsl_msg,
        fsl_code,
        fsl_list,
        ssm_succ,
        ssm_msg,
        ssm_code
    } = action
    switch (type) {
        case FETCH_CUSTOMER_SERVICE_LIST:
            return {
                ...state,
                fetchServiceList: {
                    result: fsl_succ,
                    msg: fsl_msg,
                    code: fsl_code,
                    list: fsl_list
                }
            }
        case SEND_CUSTOMER_SERVICE_MSG:
            return {
                ...state,
                sendServiceMsg: {
                    result: ssm_succ,
                    msg: ssm_msg,
                    code: ssm_code
                }
            }
        default: return state
    }
}