import { FETCH_ATTENTION_LIST, FETCH_LIVE_ATTENTION_LIST, ADD_ATTENTION, CANCEL_ATTENTION } from '../actionTypes'

export const initialState = {
    fetchAttentionList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    fetchLiveAttentionList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    addAttention: {
        result: true,
        msg: '',
        code: 200
    },
    cancelAttention: {
        result: true,
        msg: '',
        code: 200
    },
}

export default (state = initialState, action) => {
    const {
        type,
        fal_succ,
        fal_msg,
        fal_code,
        fal_list,
        flal_succ,
        flal_msg,
        flal_code,
        flal_list,
        aa_succ,
        aa_msg,
        aa_code,
        ca_succ,
        ca_msg,
        ca_code
    } = action
    switch (type) {
        case FETCH_ATTENTION_LIST:
            return {
                ...state,
                fetchAttentionList: {
                    result: fal_succ,
                    msg: fal_msg,
                    code: fal_code,
                    list: fal_list
                }
            }
        case FETCH_LIVE_ATTENTION_LIST:
            return {
                ...state,
                fetchLiveAttentionList: {
                    result: flal_succ,
                    msg: flal_msg,
                    code: flal_code,
                    list: flal_list
                }
            }
        case ADD_ATTENTION:
            return {
                ...state,
                addAttention: {
                    result: aa_succ,
                    msg: aa_msg,
                    code: aa_code
                }
            }
        case CANCEL_ATTENTION:
            return {
                ...state,
                cancelAttention: {
                    result: ca_succ,
                    msg: ca_msg,
                    code: ca_code
                }
            }
        default: return state
    }
}