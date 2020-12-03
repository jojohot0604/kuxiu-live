import { combineReducers } from 'redux'
import asset, { initialState as assetState } from './asset'
import attention, { initialState as attentionState } from './attention'
import gift, { initialState as giftState } from './gift'
import live, { initialState as liveState } from './live'
import login, { initialState as loginState } from './login'
import mobile, { initialState as mobileState } from './mobile'
import rank, { initialState as rankState } from './rank'
import room, { initialState as roomState } from './room'
import search, { initialState as searchState } from './search'
import service, { initialState as serviceState } from './service'
import user, { initialState as userState } from './user'
import guard, { initialState as guardState } from './guard'

export const initialState = {
    fetchAsset: assetState.fetchAsset,
    fetchPaymentOrder: assetState.fetchPaymentOrder,
    payment: assetState.payment,
    fetchAttentionList: attentionState.fetchAttentionList,
    fetchLiveAttentionList: attentionState.fetchLiveAttentionList,
    addAttention: attentionState.addAttention,
    cancelAttention: attentionState.cancelAttention,
    fetchGiftList: giftState.fetchGiftList,
    guestFetchGiftList: giftState.guestFetchGiftList,
    fetchSpecialGiftList: giftState.fetchSpecialGiftList,
    guestFetchSpecialGiftList: giftState.guestFetchSpecialGiftList,
    sendGift: giftState.sendGift,
    fetchHotLiveList: liveState.fetchHotLiveList,
    guestFetchHotLiveList: liveState.guestFetchHotLiveList,
    fetchRandomLiveList: liveState.fetchRandomLiveList,
    guestFetchRandomLiveList: liveState.guestFetchRandomLiveList,
    fetchHotSearchList: liveState.fetchHotSearchList,
    guestFetchHotSearchList: liveState.guestFetchHotSearchList,
    fetchFreshAnchorList: liveState.fetchFreshAnchorList,
    guestFetchFreshAnchorList: liveState.guestFetchFreshAnchorList,
    fetchImageSign: liveState.fetchImageSign,
    login: loginState.login,
    loginByThird: loginState.loginByThird,
    loginByToken: loginState.loginByToken,
    register: loginState.register,
    checkMobile: loginState.checkMobile,
    resetPassword: loginState.resetPassword,
    fetchWechatOpenId: loginState.fetchWechatOpenId,
    fetchQqOpenId: loginState.fetchQqOpenId,
    sendVerificationCode: mobileState.sendVerificationCode,
    bindMobile: mobileState.bindMobile,
    fetchUserRankList: rankState.fetchUserRankList,
    guestFetchUserRankList: rankState.guestFetchUserRankList,
    fetchAnchorRankList: rankState.fetchAnchorRankList,
    guestFetchAnchorRankList: rankState.guestFetchAnchorRankList,
    sendBarrage: roomState.sendBarrage,
    enterRoom: roomState.enterRoom,
    enterRoomNew: roomState.enterRoomNew,
    fetchSensitiveWords: roomState.fetchSensitiveWords,
    guestEnterRoom: roomState.guestEnterRoom,
    exitRoom: roomState.exitRoom,
    fetchAudienceList: roomState.fetchAudienceList,
    guestFetchAudienceList: roomState.guestFetchAudienceList,
    fetchManagerList: roomState.fetchManagerList,
    guestFetchManagerList: roomState.guestFetchManagerList,
    fetchGuardList: roomState.fetchGuardList,
    guestFetchGuardList: roomState.guestFetchGuardList,
    sendFeedback: roomState.sendFeedback,
    userReport: roomState.userReport,
    fetchLiveUrl: roomState.fetchLiveUrl,
    guestFetchLiveUrl: roomState.guestFetchLiveUrl,
    querySystemConfig: roomState.querySystemConfig,
    guestQuerySystemConfig: roomState.guestQuerySystemConfig,
    fetchImSig: roomState.fetchImSig,
    guestFetchImSig: roomState.guestFetchImSig,
    fetchSearchList: searchState.fetchSearchList,
    guestFetchSearchList: searchState.guestFetchSearchList,
    fetchServiceList: serviceState.fetchServiceList,
    sendServiceMsg: serviceState.sendServiceMsg,
    fetchRoomUserStatus: userState.fetchRoomUserStatus,
    guestFetchRoomUserStatus: userState.guestFetchRoomUserStatus,
    fetchUserInfo: userState.fetchUserInfo,
    fetchTargetUserInfo: userState.fetchTargetUserInfo,
    guestFetchTargetUserInfo: userState.guestFetchTargetUserInfo,
    fetchUserNickName: userState.fetchUserNickName,
    fetchItemConfigList: userState.fetchItemConfigList,
    guestFetchItemConfigList: userState.guestFetchItemConfigList,
    updateUserAvatar: userState.updateUserAvatar,
    buyGuard: guardState.buyGuard,
}

export default combineReducers({
    asset,
    attention,
    gift,
    live,
    login,
    mobile,
    rank,
    room,
    search,
    service,
    user,
    guard
})