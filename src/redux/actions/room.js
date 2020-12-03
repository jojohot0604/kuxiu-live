import qs from 'qs'
import { SEND_BARRAGE, FETCH_SENSITIVE_WORDS, ENTER_ROOM, ENTER_ROOM_NEW, GUEST_ENTER_ROOM, EXIT_ROOM, FETCH_AUDIENCE_LIST, GUEST_FETCH_AUDIENCE_LIST, FETCH_MANAGER_LIST, GUEST_FETCH_MANAGER_LIST, FETCH_GUARD_LIST, GUEST_FETCH_GUARD_LIST, SEND_FEEDBACK, USER_REPORT, QUERY_SYSTEM_CONFIG, GUEST_QUERY_SYSTEM_CONFIG, FETCH_IM_SIG, GUEST_FETCH_IM_SIG, FETCH_LIVE_URL, GUEST_FETCH_LIVE_URL } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, initWhiteListRequestHeaders, isRespSuccess, isObject, isPositiveZero, isArray } from '../../utils'

const _sendBarrage = (resp) => {
    const success = isRespSuccess(resp) && isPositiveZero(resp.data)
    return ({
        type: SEND_BARRAGE,
        sb_succ: success,
        sb_msg: resp.retMsg || '',
        sb_code: resp.retCode || 200,
        sb_value: success ? resp.data : -1
    })
}

export const sendBarrage = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`liveroom/sendBarrage`, _data, {
            headers
        })
        return await dispatch(_sendBarrage(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _enterRoomNew = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: ENTER_ROOM_NEW,
        ern_succ: success,
        ern_msg: resp.retMsg || '',
        ern_code: resp.retCode || 200,
        ern_data: success ? resp.data : {}
    })
}

export const enterRoomNew = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`liveroom/userEnterRoom`, _data, {
            headers
        })
        return await dispatch(_enterRoomNew(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _enterRoom = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: ENTER_ROOM,
        er_succ: success,
        er_msg: resp.retMsg || '',
        er_code: resp.retCode || 200,
        er_data: success ? resp.data : {}
    })
}

export const enterRoom = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`liveroom/userEnterRoom`, _data, {
            headers
        })
        return await dispatch(_enterRoom(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestEnterRoom = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: GUEST_ENTER_ROOM,
        ger_succ: success,
        ger_msg: resp.retMsg || '',
        ger_code: resp.retCode || 200,
        ger_data: success ? resp.data : {}
    })
}

export const guestEnterRoom = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`liveroom/guest/getEnterRoomInfoGuest?${_data}`, {
            headers
        })
        return await dispatch(_guestEnterRoom(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _exitRoom = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: EXIT_ROOM,
        exr_succ: success,
        exr_msg: resp.retMsg || '',
        exr_code: resp.retCode || 200
    })
}

export const exitRoom = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`liveroom/userExitRoom`, _data, {
            headers
        })
        return await dispatch(_exitRoom(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchAudienceList = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isArray(resp.data.list) && isPositiveZero(resp.data.number)
    return ({
        type: FETCH_AUDIENCE_LIST,
        fal_succ: success,
        fal_msg: resp.retMsg || '',
        fal_code: resp.retCode || 200,
        fal_value: success ? resp.data.number : 0,
        fal_list: success ? resp.data.list : []
    })
}

export const fetchAudienceList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`liveroom/getAudienceList`, _data, {
            headers
        })
        return await dispatch(_fetchAudienceList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchAudienceList = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isArray(resp.data.list) && isPositiveZero(resp.data.number)
    return ({
        type: GUEST_FETCH_AUDIENCE_LIST,
        gfal_succ: success,
        gfal_msg: resp.retMsg || '',
        gfal_code: resp.retCode || 200,
        gfal_value: success ? resp.data.number : 0,
        gfal_list: success ? resp.data.list : []
    })
}

export const guestFetchAudienceList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`liveroom/guest/getAudienceListGuest`, _data, {
            headers
        })
        return await dispatch(_guestFetchAudienceList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchManagerList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_MANAGER_LIST,
        fml_succ: success,
        fml_msg: resp.retMsg || '',
        fml_code: resp.retCode || 200,
        fml_list: success ? resp.data : []
    })
}

export const fetchManagerList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`liveroom/getOnlineManageList?${_data}`, {
            headers
        })
        return await dispatch(_fetchManagerList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchManagerList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: GUEST_FETCH_MANAGER_LIST,
        gfml_succ: success,
        gfml_msg: resp.retMsg || '',
        gfml_code: resp.retCode || 200,
        gfml_list: success ? resp.data : []
    })
}

export const guestFetchManagerList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`liveroom/guest/getOnlineManageListGuest?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchManagerList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchGuardList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: FETCH_GUARD_LIST,
        fgl_succ: success,
        fgl_msg: resp.retMsg || '',
        fgl_code: resp.retCode || 200,
        fgl_list: success ? resp.data : []
    })
}

export const fetchGuardList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`liveroom/getGuardList?${_data}`, {
            headers
        })
        return await dispatch(_fetchGuardList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchGuardList = (resp) => {
    const success = isRespSuccess(resp) && isArray(resp.data)
    return ({
        type: GUEST_FETCH_GUARD_LIST,
        gfgl_succ: success,
        gfgl_msg: resp.retMsg || '',
        gfgl_code: resp.retCode || 200,
        gfgl_list: success ? resp.data : []
    })
}

export const guestFetchGuardList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`liveroom/guest/getGuardListGuest?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchGuardList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _userReport = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: USER_REPORT,
        ur_succ: success,
        ur_msg: resp.retMsg || '',
        ur_code: resp.retCode || 200
    })
}

export const userReport = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`liveroom/userReport`, _data, {
            headers
        })
        return await dispatch(_userReport(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _sendFeedBack = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: SEND_FEEDBACK,
        sf_succ: success,
        sf_msg: resp.retMsg || '',
        sf_code: resp.retCode || 200
    })
}

export const sendFeedBack = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`supplement/sys/giveFeedback/commit`, _data, {
            headers
        })
        return await dispatch(_sendFeedBack(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _querySystemConfig = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: QUERY_SYSTEM_CONFIG,
        qsc_succ: success,
        qsc_msg: resp.retMsg || '',
        qsc_code: resp.retCode || 200,
        qsc_data: success ? resp.data : {}
    })
}

export const querySystemConfig = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/system/querySystemConfigByTypeAndCode?${_data}`, {
            headers
        })
        return await dispatch(_querySystemConfig(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestQuerySystemConfig = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: GUEST_QUERY_SYSTEM_CONFIG,
        gqsc_succ: success,
        gqsc_msg: resp.retMsg || '',
        gqsc_code: resp.retCode || 200,
        gqsc_data: success ? resp.data : {}
    })
}

export const guestQuerySystemConfig = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`supplement/guest/system/querySystemConfigByTypeAndCodeGuest?${_data}`, {
            headers
        })
        return await dispatch(_guestQuerySystemConfig(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchImSig = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: FETCH_IM_SIG,
        fis_succ: success,
        fis_msg: resp.retMsg || '',
        fis_code: resp.retCode || 200,
        fis_value: success ? resp.data.userSig : ''
    })
}

export const fetchImSig = () => async (dispatch) => {
    try {
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/tx/getIMUserSig`, {
            headers
        })
        return await dispatch(_fetchImSig(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchImSig = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: GUEST_FETCH_IM_SIG,
        gfis_succ: success,
        gfis_msg: resp.retMsg || '',
        gfis_code: resp.retCode || 200,
        gfis_data: success ? resp.data : {}
    })
}

export const guestFetchImSig = () => async (dispatch) => {
    try {
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`supplement/guest/tx/getIMUserSigGuest`, {
            headers
        })
        return await dispatch(_guestFetchImSig(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchLiveUrl = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data);
    return ({
        type: FETCH_LIVE_URL,
        flu_succ: success,
        flu_msg: resp.retMsg || '',
        flu_code: resp.retCode || 200,
        flu_data: success ? resp.data : {},
    })
}

export const fetchLiveUrl = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data);
        const headers = initRequestHeaders();
        const response = await fetchApi.get(`liveroom/getPlayUrl?${_data}`, {
            headers
        })
        return await dispatch(_fetchLiveUrl(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchLiveUrl = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data);
    return ({
        type: GUEST_FETCH_LIVE_URL,
        gflu_succ: success,
        gflu_msg: resp.retMsg || '',
        gflu_code: resp.retCode || 200,
        gflu_data: success ? resp.data : {},
    })
}

export const guestFetchLiveUrl = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data);
        const headers = initWhiteListRequestHeaders(null);
        const response = await fetchApi.get(`liveroom/guest/getPlayUrlGuest?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchLiveUrl(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchSensitiveWords = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data) && isArray(resp.data.sensitiveWordList)
    return ({
        type: FETCH_SENSITIVE_WORDS,
        fsw_succ: success,
        fsw_msg: resp.retMsg || '',
        fsw_code: resp.retCode || 200,
        fsw_list: success ? resp.data.sensitiveWordList : [],
        fsw_value: success ? resp.data.wordDigest : ''
    })
}

export const fetchSensitiveWords = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`supplement/sensitiveWord/getSensitiveWords?${_data}`, {
            headers
        })
        return await dispatch(_fetchSensitiveWords(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}