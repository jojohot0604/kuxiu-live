import { UPDATE_AVATAR, FETCH_ROOM_USER_STATUS, GUEST_FETCH_ROOM_USER_STATUS, FETCH_USER_INFO, FETCH_TARGET_USER_INFO, GUEST_FETCH_TARGET_USER_INFO, FETCH_USER_NICK_NAME, FETCH_ITEM_CONFIG_LIST, GUEST_FETCH_ITEM_CONFIG_LIST } from '../actionTypes'

export const initialState = {
    fetchRoomUserStatus: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    guestFetchRoomUserStatus: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    fetchUserInfo: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    fetchTargetUserInfo: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    guestFetchTargetUserInfo: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    fetchUserNickName: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    fetchItemConfigList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchItemConfigList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    updateUserAvatar: {
        result: true,
        msg: '',
        code: 200,
    }
}

export default (state = initialState, action) => {
    const {
        type,
        frus_succ,
        frus_msg,
        frus_code,
        frus_data,
        gfrus_succ,
        gfrus_msg,
        gfrus_code,
        gfrus_data,
        fui_succ,
        fui_msg,
        fui_code,
        fui_data,
        ftui_succ,
        ftui_msg,
        ftui_code,
        ftui_data,
        gftui_succ,
        gftui_msg,
        gftui_code,
        gftui_data,
        funn_succ,
        funn_msg,
        funn_code,
        funn_data,
        ficl_succ,
        ficl_msg,
        ficl_code,
        ficl_list,
        gficl_succ,
        gficl_msg,
        gficl_code,
        gficl_list,
        uua_succ,
        uua_msg,
        uua_code,
    } = action
    switch (type) {
        case FETCH_ROOM_USER_STATUS:
            return {
                ...state,
                fetchRoomUserStatus: {
                    result: frus_succ,
                    msg: frus_msg,
                    code: frus_code,
                    data: frus_data
                }
            }
        case GUEST_FETCH_ROOM_USER_STATUS:
            return {
                ...state,
                guestFetchRoomUserStatus: {
                    result: gfrus_succ,
                    msg: gfrus_msg,
                    code: gfrus_code,
                    data: gfrus_data
                }
            }
        case FETCH_USER_INFO:
            return {
                ...state,
                fetchUserInfo: {
                    result: fui_succ,
                    msg: fui_msg,
                    code: fui_code,
                    data: fui_data
                }
            }
        case FETCH_TARGET_USER_INFO:
            return {
                ...state,
                fetchTargetUserInfo: {
                    result: ftui_succ,
                    msg: ftui_msg,
                    code: ftui_code,
                    data: ftui_data
                }
            }
        case GUEST_FETCH_TARGET_USER_INFO:
            return {
                ...state,
                guestFetchTargetUserInfo: {
                    result: gftui_succ,
                    msg: gftui_msg,
                    code: gftui_code,
                    data: gftui_data
                }
            }
        case FETCH_USER_NICK_NAME:
            return {
                ...state,
                fetchUserNickName: {
                    result: funn_succ,
                    msg: funn_msg,
                    code: funn_code,
                    data: funn_data
                }
            }
        case FETCH_ITEM_CONFIG_LIST:
            return {
                ...state,
                fetchItemConfigList: {
                    result: ficl_succ,
                    msg: ficl_msg,
                    code: ficl_code,
                    list: ficl_list
                }
            }
        case GUEST_FETCH_ITEM_CONFIG_LIST:
            return {
                ...state,
                guestFetchItemConfigList: {
                    result: gficl_succ,
                    msg: gficl_msg,
                    code: gficl_code,
                    list: gficl_list
                }
            }
        case UPDATE_AVATAR:
            return {
                ...state,
                updateUserAvatar: {
                    result: uua_succ,
                    msg: uua_msg,
                    code: uua_code,
                }
            }
        default: return state
    }
}