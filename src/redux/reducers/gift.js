import { FETCH_GIFT_LIST, GUEST_FETCH_GIFT_LIST, FETCH_SPECIAL_GIFT_LIST, GUEST_FETCH_SPECIAL_GIFT_LIST, SEND_GIFT } from '../actionTypes'

export const initialState = {
    fetchGiftList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchGiftList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    fetchSpecialGiftList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchSpecialGiftList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    sendGift: {
        result: true,
        msg: '',
        code: 200,
        value: -1
    },
}

export default (state = initialState, action) => {
    const {
        type,
        fgl_succ,
        fgl_msg,
        fgl_code,
        fgl_list,
        gfgl_succ,
        gfgl_msg,
        gfgl_code,
        gfgl_list,
        fsgl_succ,
        fsgl_msg,
        fsgl_code,
        fsgl_list,
        gfsgl_succ,
        gfsgl_msg,
        gfsgl_code,
        gfsgl_list,
        sg_succ,
        sg_msg,
        sg_code,
        sg_value
    } = action
    switch (type) {
        case FETCH_GIFT_LIST:
            return {
                ...state,
                fetchGiftList: {
                    result: fgl_succ,
                    msg: fgl_msg,
                    code: fgl_code,
                    list: fgl_list
                }
            }
        case GUEST_FETCH_GIFT_LIST:
            return {
                ...state,
                guestFetchGiftList: {
                    result: gfgl_succ,
                    msg: gfgl_msg,
                    code: gfgl_code,
                    list: gfgl_list
                }
            }
        case FETCH_SPECIAL_GIFT_LIST:
            return {
                ...state,
                fetchSpecialGiftList: {
                    result: fsgl_succ,
                    msg: fsgl_msg,
                    code: fsgl_code,
                    list: fsgl_list
                }
            }
        case GUEST_FETCH_SPECIAL_GIFT_LIST:
            return {
                ...state,
                guestFetchSpecialGiftList: {
                    result: gfsgl_succ,
                    msg: gfsgl_msg,
                    code: gfsgl_code,
                    list: gfsgl_list
                }
            }
        case SEND_GIFT:
            return {
                ...state,
                sendGift: {
                    result: sg_succ,
                    msg: sg_msg,
                    code: sg_code,
                    value: sg_value
                }
            }
        default: return state
    }
}