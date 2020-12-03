import { FETCH_SEARCH_RESULT_LIST, GUEST_FETCH_SEARCH_RESULT_LIST } from '../actionTypes'

export const initialState = {
    fetchSearchResultList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchSearchResultList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
}

export default (state = initialState, action) => {
    const {
        type,
        fsrl_succ,
        fsrl_msg,
        fsrl_code,
        fsrl_list,
        gfsrl_succ,
        gfsrl_msg,
        gfsrl_code,
        gfsrl_list,
    } = action
    switch (type) {
        case FETCH_SEARCH_RESULT_LIST:
            return {
                ...state,
                fetchSearchResultList: {
                    result: fsrl_succ,
                    msg: fsrl_msg,
                    code: fsrl_code,
                    list: fsrl_list
                }
            }
        case GUEST_FETCH_SEARCH_RESULT_LIST:
            return {
                ...state,
                guestFetchSearchResultList: {
                    result: gfsrl_succ,
                    msg: gfsrl_msg,
                    code: gfsrl_code,
                    list: gfsrl_list
                }
            }
        default: return state
    }
}