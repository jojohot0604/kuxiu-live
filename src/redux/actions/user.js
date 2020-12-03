import qs from 'qs'
import { UPDATE_AVATAR, FETCH_ROOM_USER_STATUS, GUEST_FETCH_ROOM_USER_STATUS, FETCH_USER_INFO, FETCH_TARGET_USER_INFO, GUEST_FETCH_TARGET_USER_INFO, FETCH_USER_NICK_NAME, FETCH_ITEM_CONFIG_LIST, GUEST_FETCH_ITEM_CONFIG_LIST } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, initWhiteListRequestHeaders, isRespSuccess, isObject, isArray } from '../../utils'

const _fetchRoomUserStatus = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: FETCH_ROOM_USER_STATUS,
        frus_succ: success,
        frus_msg: resp.retMsg || '',
        frus_code: resp.retCode || 200,
        frus_data: success ? resp.data : {}
    })
}

export const fetchRoomUserStatus = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`liveroom/getRoomUserStatus?${_data}`, {
            headers
        })
        return await dispatch(_fetchRoomUserStatus(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchRoomUserStatus = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: GUEST_FETCH_ROOM_USER_STATUS,
        gfrus_succ: success,
        gfrus_msg: resp.retMsg || '',
        gfrus_code: resp.retCode || 200,
        gfrus_data: success ? resp.data : {}
    })
}

export const guestFetchRoomUserStatus = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`liveroom/guest/getRoomUserStatusGuest?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchRoomUserStatus(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchUserInfo = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: FETCH_USER_INFO,
        fui_succ: success,
        fui_msg: resp.retMsg || '',
        fui_code: resp.retCode || 200,
        fui_data: success ? resp.data : {}
    })
}

export const fetchUserInfo = () => async (dispatch) => {
    try {
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`user/getUserInfo`, null, {
            headers
        })
        return await dispatch(_fetchUserInfo(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchTargetUserInfo = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: FETCH_TARGET_USER_INFO,
        ftui_succ: success,
        ftui_msg: resp.retMsg || '',
        ftui_code: resp.retCode || 200,
        ftui_data: success ? resp.data : {}
    })
}

export const fetchTargetUserInfo = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`user/getTargetUserInfo`, _data, {
            headers
        })
        return await dispatch(_fetchTargetUserInfo(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchTargetUserInfo = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: GUEST_FETCH_TARGET_USER_INFO,
        gftui_succ: success,
        gftui_msg: resp.retMsg || '',
        gftui_code: resp.retCode || 200,
        gftui_data: success ? resp.data : {}
    })
}

export const guestFetchTargetUserInfo = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`user/guest/getTargetUserInfoGuest`, _data, {
            headers
        })
        return await dispatch(_guestFetchTargetUserInfo(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchUserNickName = (resp) => {
    const data = JSON.parse(resp.data)
    const success = isRespSuccess(resp) && isObject(data)
    return ({
        type: FETCH_USER_NICK_NAME,
        funn_succ: success,
        funn_msg: resp.retMsg || '',
        funn_code: resp.retCode || 200,
        funn_data: success ? data : {}
    })
}

export const fetchUserNickName = (data) => async (dispatch) => {
    try {
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.post(`user/getNickNameByUserId`, data, {
            headers
        })
        return await dispatch(_fetchUserNickName(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _fetchItemConfigList = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: FETCH_ITEM_CONFIG_LIST,
        ficl_succ: success,
        ficl_msg: resp.retMsg || '',
        ficl_code: resp.retCode || 200,
        ficl_list: success ? resp.data && resp.data.list : [],
        ficl_value: success ? resp.data && resp.data.extMap && resp.data.extMap.configVersion : ''
    })
}

export const fetchItemConfigList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.get(`user/getItemConfigListFromApp?${_data}`, {
            headers
        })
        return await dispatch(_fetchItemConfigList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _guestFetchItemConfigList = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: GUEST_FETCH_ITEM_CONFIG_LIST,
        gficl_succ: success,
        gficl_msg: resp.retMsg || '',
        gficl_code: resp.retCode || 200,
        gficl_list: success ? resp.data && resp.data.list : [],
        gficl_value: success ? resp.data && resp.data.extMap && resp.data.extMap.configVersion : ''
    })
}

export const guestFetchItemConfigList = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initWhiteListRequestHeaders(null)
        const response = await fetchApi.get(`user/guest/getItemConfigListGuest?${_data}`, {
            headers
        })
        return await dispatch(_guestFetchItemConfigList(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}

const _updateUserAvatar = (resp) => {
    const success = isRespSuccess(resp)
    return ({
        type: UPDATE_AVATAR,
        uua_succ: success,
        uua_msg: resp.retMsg || '',
        uua_code: resp.retCode || 200,
    })
}

export const updateUserAvatar = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders(null)
        const response = await fetchApi.post(`user/userPhotoAdd`, _data, {
            headers
        })
        return await dispatch(_updateUserAvatar(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}