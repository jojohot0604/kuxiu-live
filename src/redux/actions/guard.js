import qs from 'qs'
import { BUY_GUARD } from '../actionTypes'
import fetchApi from '../../utils/fetchApi'
import { initRequestHeaders, isRespSuccess, isObject } from '../../utils'

const _buyGuard = (resp) => {
    const success = isRespSuccess(resp) && isObject(resp.data)
    return ({
        type: BUY_GUARD,
        bg_succ: success,
        bg_msg: resp.retMsg || '',
        bg_code: resp.retCode || 200,
        bg_data: success ? resp.data : {}
    })
}

export const buyGuard = (data) => async (dispatch) => {
    try {
        const _data = qs.stringify(data)
        const headers = initRequestHeaders()
        const response = await fetchApi.post(`liveroom/buyGuard`, _data, {
            headers
        })
        return await dispatch(_buyGuard(response.data))
    } catch (error) {
        // console.log('error: ', error)
    }
}