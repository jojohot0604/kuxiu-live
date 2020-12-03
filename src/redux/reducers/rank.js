import { FETCH_USER_RANK_LIST, GUEST_FETCH_USER_RANK_LIST, FETCH_ANCHOR_RANK_LIST, GUEST_FETCH_ANCHOR_RANK_LIST } from '../actionTypes'

export const initialState = {
    fetchUserRankList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchUserRankList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    fetchAnchorRankList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchAnchorRankList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
}

export default (state = initialState, action) => {
    const {
        type,
        furl_succ,
        furl_msg,
        furl_code,
        furl_list,
        gfurl_succ,
        gfurl_msg,
        gfurl_code,
        gfurl_list,
        farl_succ,
        farl_msg,
        farl_code,
        farl_list,
        gfarl_succ,
        gfarl_msg,
        gfarl_code,
        gfarl_list,
    } = action
    switch (type) {
        case FETCH_USER_RANK_LIST:
            return {
                ...state,
                fetchUserRankList: {
                    result: furl_succ,
                    msg: furl_msg,
                    code: furl_code,
                    list: furl_list
                }
            }
        case GUEST_FETCH_USER_RANK_LIST:
            return {
                ...state,
                guestFetchUserRankList: {
                    result: gfurl_succ,
                    msg: gfurl_msg,
                    code: gfurl_code,
                    list: gfurl_list
                }
            }
        case FETCH_ANCHOR_RANK_LIST:
            return {
                ...state,
                fetchAnchorRankList: {
                    result: farl_succ,
                    msg: farl_msg,
                    code: farl_code,
                    list: farl_list
                }
            }
        case GUEST_FETCH_ANCHOR_RANK_LIST:
            return {
                ...state,
                guestFetchAnchorRankList: {
                    result: gfarl_succ,
                    msg: gfarl_msg,
                    code: gfarl_code,
                    list: gfarl_list
                }
            }
        default: return state
    }
}