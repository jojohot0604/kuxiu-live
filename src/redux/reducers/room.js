import { FETCH_LIVE_URL, GUEST_FETCH_LIVE_URL, FETCH_SENSITIVE_WORDS, SEND_BARRAGE, ENTER_ROOM, ENTER_ROOM_NEW, GUEST_ENTER_ROOM, EXIT_ROOM, FETCH_AUDIENCE_LIST, GUEST_FETCH_AUDIENCE_LIST, FETCH_MANAGER_LIST, GUEST_FETCH_MANAGER_LIST, FETCH_GUARD_LIST, GUEST_FETCH_GUARD_LIST, SEND_FEEDBACK, USER_REPORT, GUEST_QUERY_SYSTEM_CONFIG, QUERY_SYSTEM_CONFIG, FETCH_IM_SIG, GUEST_FETCH_IM_SIG } from '../actionTypes'

export const initialState = {
    sendBarrage: {
        result: true,
        msg: '',
        code: 200,
        value: -1
    },
    enterRoom: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    enterRoomNew: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    guestEnterRoom: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    exitRoom: {
        result: true,
        msg: '',
        code: 200
    },
    fetchImSig: {
        result: true,
        msg: '',
        code: 200,
        value: ''
    },
    guestFetchImSig: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    fetchAudienceList: {
        result: true,
        msg: '',
        code: 200,
        list: [],
        value: 0
    },
    guestFetchAudienceList: {
        result: true,
        msg: '',
        code: 200,
        list: [],
        value: 0
    },
    fetchManagerList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    guestFetchManagerList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    fetchGuardList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    fetchSensitiveWords: {
        result: true,
        msg: '',
        code: 200,
        list: [],
        value: '',
    },
    guestFetchGuardList: {
        result: true,
        msg: '',
        code: 200,
        list: []
    },
    sendFeedback: {
        result: true,
        msg: '',
        code: 200
    },
    userReport: {
        result: true,
        msg: '',
        code: 200
    },
    querySystemConfig: {
        result: true,
        msg: '',
        code: 200
    },
    guestQuerySystemConfig: {
        result: true,
        msg: '',
        code: 200
    },
    fetchLiveUrl: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
    guestFetchLiveUrl: {
        result: true,
        msg: '',
        code: 200,
        data: {}
    },
}

export default (state = initialState, action) => {
    const {
        type,
        sb_succ,
        sb_msg,
        sb_code,
        sb_value,
        er_succ,
        er_msg,
        er_code,
        er_data,
        ern_succ,
        ern_msg,
        ern_code,
        ern_data,
        ger_succ,
        ger_msg,
        ger_code,
        ger_data,
        exr_succ,
        exr_msg,
        exr_code,
        fal_succ,
        fal_msg,
        fal_code,
        fal_value,
        fal_list,
        gfal_succ,
        gfal_msg,
        gfal_code,
        gfal_value,
        gfal_list,
        fml_succ,
        fml_msg,
        fml_code,
        fml_list,
        gfml_succ,
        gfml_msg,
        gfml_code,
        gfml_list,
        fgl_succ,
        fgl_msg,
        fgl_code,
        fgl_list,
        gfgl_succ,
        gfgl_msg,
        gfgl_code,
        gfgl_list,
        sf_succ,
        sf_msg,
        sf_code,
        ur_succ,
        ur_msg,
        ur_code,
        qsc_succ,
        qsc_msg,
        qsc_code,
        qsc_data,
        gqsc_succ,
        gqsc_msg,
        gqsc_code,
        gqsc_data,
        fis_succ,
        fis_msg,
        fis_code,
        fis_value,
        gfis_succ,
        gfis_msg,
        gfis_code,
        gfis_data,
        flu_succ,
        flu_msg,
        flu_code,
        flu_data,
        gflu_succ,
        gflu_msg,
        gflu_code,
        gflu_data,
        fsw_succ,
        fsw_msg,
        fsw_code,
        fsw_list,
        fsw_value,
    } = action
    switch (type) {
        case SEND_BARRAGE:
            return {
                ...state,
                sendBarrage: {
                    result: sb_succ,
                    msg: sb_msg,
                    code: sb_code,
                    value: sb_value
                }
            }
        case ENTER_ROOM:
            return {
                ...state,
                enterRoom: {
                    result: er_succ,
                    msg: er_msg,
                    code: er_code,
                    data: er_data
                }
            }
        case ENTER_ROOM_NEW:
            return {
                ...state,
                enterRoomNew: {
                    result: ern_succ,
                    msg: ern_msg,
                    code: ern_code,
                    data: ern_data
                }
            }
        case GUEST_ENTER_ROOM:
            return {
                ...state,
                guestEnterRoom: {
                    result: ger_succ,
                    msg: ger_msg,
                    code: ger_code,
                    data: ger_data
                }
            }
        case EXIT_ROOM:
            return {
                ...state,
                exitRoom: {
                    result: exr_succ,
                    msg: exr_msg,
                    code: exr_code
                }
            }
        case FETCH_AUDIENCE_LIST:
            return {
                ...state,
                fetchAudienceList: {
                    result: fal_succ,
                    msg: fal_msg,
                    code: fal_code,
                    value: fal_value,
                    list: fal_list
                }
            }
        case GUEST_FETCH_AUDIENCE_LIST:
            return {
                ...state,
                guestFetchAudienceList: {
                    result: gfal_succ,
                    msg: gfal_msg,
                    code: gfal_code,
                    value: gfal_value,
                    list: gfal_list
                }
            }
        case FETCH_MANAGER_LIST:
            return {
                ...state,
                fetchManagerList: {
                    result: fml_succ,
                    msg: fml_msg,
                    code: fml_code,
                    list: fml_list
                }
            }
        case GUEST_FETCH_MANAGER_LIST:
            return {
                ...state,
                guestFetchManagerList: {
                    result: gfml_succ,
                    msg: gfml_msg,
                    code: gfml_code,
                    list: gfml_list
                }
            }
        case FETCH_GUARD_LIST:
            return {
                ...state,
                fetchGuardList: {
                    result: fgl_succ,
                    msg: fgl_msg,
                    code: fgl_code,
                    list: fgl_list
                }
            }
        case FETCH_SENSITIVE_WORDS:
            return {
                ...state,
                fetchSensitiveWords: {
                    result: fsw_succ,
                    msg: fsw_msg,
                    code: fsw_code,
                    list: fsw_list,
                    value: fsw_value,
                }
            }
        case GUEST_FETCH_GUARD_LIST:
            return {
                ...state,
                guestFetchGuardList: {
                    result: gfgl_succ,
                    msg: gfgl_msg,
                    code: gfgl_code,
                    list: gfgl_list
                }
            }
        case SEND_FEEDBACK:
            return {
                ...state,
                sendFeedback: {
                    result: sf_succ,
                    msg: sf_msg,
                    code: sf_code
                }
            }
        case USER_REPORT:
            return {
                ...state,
                userReport: {
                    result: ur_succ,
                    msg: ur_msg,
                    code: ur_code
                }
            }
        case QUERY_SYSTEM_CONFIG:
            return {
                ...state,
                querySystemConfig: {
                    result: qsc_succ,
                    msg: qsc_msg,
                    code: qsc_code,
                    data: qsc_data
                }
            }
        case GUEST_QUERY_SYSTEM_CONFIG:
            return {
                ...state,
                guestQuerySystemConfig: {
                    result: gqsc_succ,
                    msg: gqsc_msg,
                    code: gqsc_code,
                    data: gqsc_data
                }
            }
        case FETCH_IM_SIG:
            return {
                ...state,
                fetchImSig: {
                    result: fis_succ,
                    msg: fis_msg,
                    code: fis_code,
                    value: fis_value
                }
            }
        case GUEST_FETCH_IM_SIG:
            return {
                ...state,
                guestFetchImSig: {
                    result: gfis_succ,
                    msg: gfis_msg,
                    code: gfis_code,
                    data: gfis_data
                }
            }
        case FETCH_LIVE_URL:
            return {
                ...state,
                fetchLiveUrl: {
                    result: flu_succ,
                    msg: flu_msg,
                    code: flu_code,
                    data: flu_data
                }
            }
        case GUEST_FETCH_LIVE_URL:
            return {
                ...state,
                guestFetchLiveUrl: {
                    result: gflu_succ,
                    msg: gflu_msg,
                    code: gflu_code,
                    data: gflu_data
                }
            }
        default: return state
    }
}