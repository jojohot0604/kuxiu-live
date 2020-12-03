import { FETCH_IMAGE_SIGN, FETCH_HOT_LIVE_LIST, GUEST_FETCH_HOT_LIVE_LIST, FETCH_RANDOM_LIVE_LIST, GUEST_FETCH_RANDOM_LIVE_LIST, FETCH_HOT_SEARCH_LIST, GUEST_FETCH_HOT_SEARCH_LIST, FETCH_FRESH_ANCHOR_LIST, GUEST_FETCH_FRESH_ANCHOR_LIST } from '../actionTypes'

export const initialState = {
    fetchHotLiveList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchHotLiveList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    fetchRandomLiveList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchRandomLiveList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    fetchHotSearchList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchHotSearchList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    fetchFreshAnchorList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchFreshAnchorList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    fetchImageSign: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
}

export default (state = initialState, action) => {
    const {
        type,
        fhll_succ,
        fhll_msg,
        fhll_code,
        fhll_list,
        gfhll_succ,
        gfhll_msg,
        gfhll_code,
        gfhll_list,
        frll_succ,
        frll_msg,
        frll_code,
        frll_list,
        gfrll_succ,
        gfrll_msg,
        gfrll_code,
        gfrll_list,
        fhsl_succ,
        fhsl_msg,
        fhsl_code,
        fhsl_list,
        gfhsl_succ,
        gfhsl_msg,
        gfhsl_code,
        gfhsl_list,
        ffal_succ,
        ffal_msg,
        ffal_code,
        ffal_list,
        gffal_succ,
        gffal_msg,
        gffal_code,
        gffal_list,
        fis_succ,
        fis_msg,
        fis_code,
        fis_data,
    } = action
    switch (type) {
        case FETCH_HOT_LIVE_LIST:
            return {
                ...state,
                fetchHotLiveList: {
                    result: fhll_succ,
                    msg: fhll_msg,
                    code: fhll_code,
                    list: fhll_list
                }
            }
        case GUEST_FETCH_HOT_LIVE_LIST:
            return {
                ...state,
                guestFetchHotLiveList: {
                    result: gfhll_succ,
                    msg: gfhll_msg,
                    code: gfhll_code,
                    list: gfhll_list
                }
            }
        case FETCH_RANDOM_LIVE_LIST:
            return {
                ...state,
                fetchRandomLiveList: {
                    result: frll_succ,
                    msg: frll_msg,
                    code: frll_code,
                    list: frll_list
                }
            }
        case GUEST_FETCH_RANDOM_LIVE_LIST:
            return {
                ...state,
                guestFetchRandomLiveList: {
                    result: gfrll_succ,
                    msg: gfrll_msg,
                    code: gfrll_code,
                    list: gfrll_list
                }
            }
        case FETCH_HOT_SEARCH_LIST:
            return {
                ...state,
                fetchHotSearchList: {
                    result: fhsl_succ,
                    msg: fhsl_msg,
                    code: fhsl_code,
                    list: fhsl_list
                }
            }
        case GUEST_FETCH_HOT_SEARCH_LIST:
            return {
                ...state,
                guestFetchHotSearchList: {
                    result: gfhsl_succ,
                    msg: gfhsl_msg,
                    code: gfhsl_code,
                    list: gfhsl_list
                }
            }
        case FETCH_FRESH_ANCHOR_LIST:
            return {
                ...state,
                fetchFreshAnchorList: {
                    result: ffal_succ,
                    msg: ffal_msg,
                    code: ffal_code,
                    list: ffal_list
                }
            }
        case GUEST_FETCH_FRESH_ANCHOR_LIST:
            return {
                ...state,
                guestFetchFreshAnchorList: {
                    result: gffal_succ,
                    msg: gffal_msg,
                    code: gffal_code,
                    list: gffal_list
                }
            }
        case FETCH_IMAGE_SIGN:
            return {
                ...state,
                fetchImageSign: {
                    result: fis_succ,
                    msg: fis_msg,
                    code: fis_code,
                    data: fis_data
                }
            }
        default: return state
    }
}