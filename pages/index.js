/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component, Fragment } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CryptoJS from 'crypto-js'
import moment from 'moment'
import _ from 'lodash'
import '../src/styles/index.scss'
import '../src/styles/service.scss'
import '../src/styles/login.scss'
import '../src/styles/focus-list.scss'
import '../src/styles/area-code.scss'
import '../src/styles/focus.scss'
import '../src/styles/header.scss'
import Drawer from '../src/components/Drawer'
import SpringScrollbars from '../src/components/SpringScrollbars'
import LazyLoad from '../src/components/LazyLoad'
import Footer from '../src/components/Footer'
import { prefetch } from '../src/components/Link'
import { fetchUserInfo, fetchTargetUserInfo, guestFetchTargetUserInfo, updateUserAvatar } from '../src/redux/actions/user'
import { fetchImSig } from '../src/redux/actions/room'
import { fetchUserRankList, guestFetchUserRankList, fetchAnchorRankList, guestFetchAnchorRankList } from '../src/redux/actions/rank'
import { fetchHotLiveList, guestFetchHotLiveList, fetchFreshAnchorList, guestFetchFreshAnchorList, fetchHotSearchList, guestFetchHotSearchList, fetchImageSign } from '../src/redux/actions/live'
import { sendVerificationCode } from '../src/redux/actions/mobile'
import { fetchSearchList, guestFetchSearchList } from '../src/redux/actions/search'
import { addAttention, cancelAttention, fetchAttentionList, fetchLiveAttentionList } from '../src/redux/actions/attention'
import { fetchServiceList, sendServiceMsg } from '../src/redux/actions/service'
import { fetchAsset } from '../src/redux/actions/asset'
import Modal from '../src/components/Modal'
import BrowserTip from '../src/components/BrowserTip'
import PayTip from '../src/components/PayTip'
import { login, register, checkMobile, resetPassword, loginByToken } from '../src/redux/actions/login'
import { isAccountExpire, isEmpty, isPassword, isVerCode, isMobile, returnKeywords, returnTitle, returnDescription, fetchBrowserVersion, imageToCanvas, is3rdAvatar, replaceCrossImgUrl, utf16toEntities, uncodeUtf16, fetchUrlParams, customCookie, asyncLoadScripts, aesEncrypt, formatLiveCover, formatUserAvatar } from '../src/utils'
import baseUrl, { areaCodeArray } from '../src/utils/const'
import { handleMsg } from '../src/utils/im'

const urlCdnLive = baseUrl.cdnLive
const urlCdnKuxiu = baseUrl.cdnKuxiu
const urlCdnLvUser = baseUrl.cdnLvUser
const urlCdnLvAnchor = baseUrl.cdnLvAnchor
const first = `${urlCdnLive}/first.png`
const second = `${urlCdnLive}/second.png`
const third = `${urlCdnLive}/third.png`
const qrcode = `${urlCdnLive}/qrcode.png`
const fresh = `${urlCdnLive}/fresh.png`
const hot = `${urlCdnLive}/hot.png`
const focus = `${urlCdnLive}/focus.png`
const devote_rank = `${urlCdnLive}/devote-rank.png`
const sun_rank = `${urlCdnLive}/sun-rank.png`
const sun = `${urlCdnLive}/sun.png`
const coin = '//img.17kuxiu.com/web/h5/luckycoin/icon_kuxiu.png'
const logo = `${urlCdnLive}/logo.png`
const wechat = `${urlCdnLive}/wechat.png`
const qq = `${urlCdnLive}/qq.png`
const fans = `${urlCdnLive}/fans.png`
const close_circle = `${urlCdnLive}/close-circle.png`
const eye = `${urlCdnKuxiu}/icon_eye.png`
const eye_open = `${urlCdnKuxiu}/icon_eyeopen.png`
const person_white = `${urlCdnLive}/person-white.png`
const person_gray = `${urlCdnLive}/person-gray.png`
const rank_empty = `${urlCdnLive}/rank-empty.png`
const default_avatar = '//img.17kuxiu.com/avatar/default_avatar.png'
const default_cover = '//img.17kuxiu.com/livingImg/defult_liveimg.png'

let errTimes = 1
let protocol
let statisticsUrl
let pageVisible = true
let visibilityChange = 'visibilitychange'
let channel = 'web'
let mapObj = {}
let geolocation = {}
let longitude
let latitude
let startIndex = 11
let drawer
let drawerOther
let loginStatus = true
let browser
const errMsg = '网络异常，请稍后再试'
const timerRefresh = 60000
const timerService = 300000
let lastCreateTime
let existServiceMsgStorage
let serviceMsgStorage
let tempServiceMsg
let lastReadId
const timerShowMsg = 100;
let isPreEnv = false
let pageIndexAttention = 1
let pageIndexHotLive = 1
let isBottom = false
let isAttentionBottom = false
let userId
let host
let userSig
let loginInfo

class Index extends Component {
    constructor(props) {
        super(props)
        this.timerUpdate = null
        this.timerFetchService = null
        this.timerCountDown = null
        this.scrollbarRef = React.createRef();
        this.handleSearch = _.throttle(() => {
            loginStatus ? this.fetchSearchList() : this.guestFetchSearchList()
        }, 1000)
    }

    state = {
        hotLiveTopList: [],
        hotLiveList: [],
        freshAnchorList: [],
        hotSearchList: [],
        anchorDayRankList: [],
        anchorWeekRankList: [],
        anchorMonthRankList: [],
        userDayRankList: [],
        userWeekRankList: [],
        userMonthRankList: [],
        attentionList: [],
        liveAttentionList: [],
        attentionType: 'live',
        serviceList: [],
        mobile: '',
        password: '',
        code: '',
        isLogin: true,
        drawerOpen: false,
        drawerOpenOther: false,
        drawerType: '',
        drawerTypeOther: '',
        tipsShow: false,
        tipsContent: '',
        countDown: 60,
        sendBtnEnable: true,
        loginType: 'login',
        dataUser: {},
        dataTarget: {},
        areaCode: '86',
        message: '',
        keywords: '',
        searchList: [],
        searchListTotal: [],
        userRankType: 'DAY',
        anchorRankType: 'DAY',
        pageIndex: 0,
        modalSearchShow: false,
        dotShow: false,
        browserTipShow: false,
        payTipShow: false,
        passwordType: 'password',
        // shortcutShow: false,
        // shortcutModalShow: false,
        mainOpacity: 0,
        kuCoin: 0
    }

    // 初始化当前位置
    initPosition = () => {
        latitude = window.localStorage.getItem('kx_live_latitude')
        longitude = window.localStorage.getItem('kx_live_longitude')
        if (latitude && longitude) {
            if (loginStatus) {
                this.fetchHotLiveList()
                this.fetchFreshAnchorList()
            } else {
                this.guestFetchHotLiveList()
                this.guestFetchFreshAnchorList()
            }
        } else {
            if (navigator.onLine) {
                if (browser === 'chrome') {
                    longitude = 121.51635
                    latitude = 31.06911
                    window.localStorage.setItem('kx_live_latitude', latitude)
                    window.localStorage.setItem('kx_live_longitude', longitude)
                    if (loginStatus) {
                        this.fetchHotLiveList()
                        this.fetchFreshAnchorList()
                    } else {
                        this.guestFetchHotLiveList()
                        this.guestFetchFreshAnchorList()
                    }
                    return
                }
                mapObj = new AMap.Map('iCenter')
                mapObj.plugin('AMap.Geolocation', () => {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0,
                        convert: true,
                        showButton: true,
                        buttonPosition: 'LB',
                        buttonOffset: new AMap.Pixel(10, 20),
                        showMarker: false,
                        showCircle: false,
                        panToLocation: true,
                        zoomToAccuracy: true,
                    })
                    mapObj.addControl(geolocation)
                    geolocation.getCurrentPosition()
                    AMap.event.addListener(geolocation, 'complete', this.onComplete)
                    AMap.event.addListener(geolocation, 'error', this.onError)
                    // AMap.event.addListener(geolocation, 'complete', (res) => {
                    //     console.log(res)
                    //     longitude = res.position.lng
                    //     latitude = res.position.lat
                    //     window.localStorage.setItem('kx_live_latitude', latitude)
                    //     window.localStorage.setItem('kx_live_longitude', longitude)
                    //     if (loginStatus) {
                    //         this.fetchHotLiveList()
                    //         this.fetchFreshAnchorList()
                    //     } else {
                    //         this.guestFetchHotLiveList()
                    //         this.guestFetchFreshAnchorList()
                    //     }
                    // })
                    // AMap.event.addListener(geolocation, 'error', (data) => {
                    //     console.log(data)
                    //     longitude = 121.51635
                    //     latitude = 31.06911
                    //     if (loginStatus) {
                    //         this.fetchHotLiveList()
                    //         this.fetchFreshAnchorList()
                    //     } else {
                    //         this.guestFetchHotLiveList()
                    //         this.guestFetchFreshAnchorList()
                    //     }
                    // })
                })
            } else {
                longitude = 121.51635
                latitude = 31.06911
                if (loginStatus) {
                    this.fetchHotLiveList()
                    this.fetchFreshAnchorList()
                } else {
                    this.guestFetchHotLiveList()
                    this.guestFetchFreshAnchorList()
                }
            }
        }
    }

    // 初始化当前位置成功回调
    onComplete = (res) => {
        longitude = res.position.lng
        latitude = res.position.lat
        window.localStorage.setItem('kx_live_latitude', latitude)
        window.localStorage.setItem('kx_live_longitude', longitude)
        if (loginStatus) {
            this.fetchHotLiveList()
            this.fetchFreshAnchorList()
        } else {
            this.guestFetchHotLiveList()
            this.guestFetchFreshAnchorList()
        }
    }

    // 初始化当前位置失败回调
    onError = () => {
        longitude = 121.51635
        latitude = 31.06911
        if (loginStatus) {
            this.fetchHotLiveList()
            this.fetchFreshAnchorList()
        } else {
            this.guestFetchHotLiveList()
            this.guestFetchFreshAnchorList()
        }
    }

    // 提示下载酷秀app toast
    handleShowAppTip = (e) => {
        e && e.preventDefault()
        this.handleErrMsg('暂不支持PC端查看<br />请下载酷秀直播APP查看')
    }

    // 获取更多热门直播列表
    fetchMoreHotLiveData = () => {
        pageIndexHotLive++;
        const { guestFetchHotLiveList, fetchHotLiveList } = this.props
        if (loginStatus) {
            fetchHotLiveList({
                longitude,
                latitude,
                currentPage: pageIndexHotLive,
            }).then(resp => {
                if (resp) {
                    if (resp.fhll_code) {
                        const result = isAccountExpire(resp.fhll_code)
                        if (result) {
                            this.initLogoutStatus(this.guestFetchHotLiveList)
                            return
                        }
                    }
                    if (resp.fhll_succ) {
                        this.setState({
                            hotLiveTopList: _.slice(resp.fhll_list, 0, startIndex) || [],
                            hotLiveList: _.slice(resp.fhll_list, startIndex) || [],
                        })
                        if (resp.fhll_list.length % 30 !== 0) {
                            isBottom = true
                        }
                    } else if (resp.fhll_msg) {
                        this.handleErrMsg(resp.fhll_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                } else {
                    this.initLogoutStatus(this.guestFetchHotLiveList)
                }
            })
        } else {
            guestFetchHotLiveList({
                longitude,
                latitude,
                currentPage: pageIndexHotLive,
            }).then(resp => {
                if (resp) {
                    if (resp.gfhll_succ) {
                        this.setState({
                            hotLiveTopList: _.slice(resp.gfhll_list, 0, startIndex) || [],
                            hotLiveList: _.slice(resp.gfhll_list, startIndex) || [],
                        })
                        if (resp.gfhll_list.length % 30 !== 0) {
                            isBottom = true
                        }
                    } else if (resp.gfhll_msg) {
                        this.handleErrMsg(resp.gfhll_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                }
            })
        }
    }

    // 游客获取热门直播列表
    guestFetchHotLiveList = () => {
        const { guestFetchHotLiveList } = this.props
        guestFetchHotLiveList({
            longitude,
            latitude,
            currentPage: pageIndexHotLive,
        }).then(resp => {
            if (resp) {
                if (resp.gfhll_succ) {
                    this.setState({
                        hotLiveTopList: _.slice(resp.gfhll_list, 0, startIndex) || [],
                        hotLiveList: _.slice(resp.gfhll_list, startIndex) || [],
                    })
                    if (resp.gfhll_list.length % 30 !== 0) {
                        isBottom = true
                    }
                } else if (resp.gfhll_msg) {
                    this.handleErrMsg(resp.gfhll_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 获取热门直播列表
    fetchHotLiveList = () => {
        const { fetchHotLiveList } = this.props
        fetchHotLiveList({
            longitude,
            latitude,
            currentPage: pageIndexHotLive,
        }).then(resp => {
            if (resp) {
                if (resp.fhll_code) {
                    const result = isAccountExpire(resp.fhll_code)
                    if (result) {
                        this.initLogoutStatus(this.guestFetchHotLiveList)
                        return
                    }
                }
                if (resp.fhll_succ) {
                    this.setState({
                        hotLiveTopList: _.slice(resp.fhll_list, 0, startIndex) || [],
                        hotLiveList: _.slice(resp.fhll_list, startIndex) || [],
                    })
                    if (resp.fhll_list.length % 30 !== 0) {
                        isBottom = true
                    }
                } else if (resp.fhll_msg) {
                    this.handleErrMsg(resp.fhll_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(this.guestFetchHotLiveList)
            }
        })
    }

    // fetchHotLiveListUpdate = () => {
    //     const { fetchHotLiveList } = this.props
    //     fetchHotLiveList({
    //         longitude,
    //         latitude,
    //         currentPage: pageIndexHotLive,
    //     }).then(resp => {
    //         if (resp) {
    //             if (resp.fhll_code) {
    //                 const result = isAccountExpire(resp.fhll_code)
    //                 if (result) {
    //                     this.initLogoutStatus()
    //                     this.guestFetchHotLiveList()
    //                     this.initPageUpdate()
    //                     return
    //                 }
    //             }
    //             if (resp.fhll_succ) {
    //                 this.setState({
    //                     hotLiveTopList: _.slice(resp.fhll_list, 0, 11) || [],
    //                     hotLiveList: _.slice(resp.fhll_list, startIndex) || [],
    //                 })
    //                 if (resp.fhll_list.length % 30 !== 0) {
    //                     isBottom = true
    //                 }
    //                 this.initPageUpdate()
    //             } else if (resp.fhll_msg) {
    //                 this.handleErrMsg(resp.fhll_msg)
    //             } else {
    //                 this.handleErrMsg(errMsg)
    //             }
    //         } else {
    //             this.initLogoutStatus()
    //             this.guestFetchHotLiveList()
    //             this.initPageUpdate()
    //         }
    //     })
    // }

    // 切换关注列表类型
    switchAttentionType = (e, isLive) => {
        e && e.preventDefault()
        if (isLive) {
            this.setState({
                attentionType: 'live'
            }, () => {
                this.fetchLiveAttentionList()
            })
        } else {
            pageIndexAttention = 1;
            isAttentionBottom = false;
            this.setState({
                attentionType: 'total'
            }, () => {
                this.fetchAttentionList()
            })
        }
    }

    // 获取用户关注列表
    fetchAttentionList = () => {
        const { fetchAttentionList } = this.props
        fetchAttentionList({
            pageIndex: pageIndexAttention,
            onlyAnchor: 1,
        }).then(resp => {
            if (resp) {
                if (resp.fal_code) {
                    const result = isAccountExpire(resp.fal_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.fal_succ) {
                    this.setState({
                        attentionList: resp.fal_list || [],
                    })
                    if (resp.fal_list.length % 21 !== 0) {
                        isAttentionBottom = true
                    }
                } else if (resp.fal_msg) {
                    this.handleErrMsg(resp.fal_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 获取更多关注列表
    fetchMoreData = () => {
        pageIndexAttention++;
        const { fetchAttentionList } = this.props
        fetchAttentionList({
            pageIndex: pageIndexAttention,
            onlyAnchor: 1,
        }).then(resp => {
            if (resp) {
                if (resp.fal_code) {
                    const result = isAccountExpire(resp.fal_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.fal_succ) {
                    const tempList = resp.fal_list || [];
                    if (tempList.length === 0) {
                        return;
                    }
                    const { attentionList } = this.state;
                    const tmpList = attentionList;
                    this.setState({
                        attentionList: tmpList.concat(tempList),
                    });
                    if (tempList.length % 21 !== 0) {
                        isAttentionBottom = true
                    }
                } else if (resp.fal_msg) {
                    this.handleErrMsg(resp.fal_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 获取正在直播的关注列表
    fetchLiveAttentionList = (callback = null) => {
        const { fetchLiveAttentionList } = this.props
        fetchLiveAttentionList({
            pageIndex: 1,
        }).then(resp => {
            if (resp) {
                if (resp.flal_code) {
                    const result = isAccountExpire(resp.flal_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.flal_succ) {
                    this.setState({
                        liveAttentionList: resp.flal_list || [],
                    }, () => {
                        callback && callback()
                    })
                } else if (resp.flal_msg) {
                    this.handleErrMsg(resp.flal_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 初始加载获取主播榜单
    fetchAnchorRankListInit = () => {
        const { fetchAnchorRankList } = this.props
        const { anchorRankType } = this.state
        fetchAnchorRankList({
            type: anchorRankType,
        }).then(resp => {
            if (resp.farl_code) {
                const result = isAccountExpire(resp.farl_code)
                if (result) {
                    this.initLogoutStatus(this.guestFetchAnchorRankListInit)
                    return
                }
            }
            if (resp) {
                if (resp.farl_succ) {
                    if (anchorRankType === 'DAY') {
                        this.setState({
                            anchorDayRankList: _.slice(resp.farl_list, 0, 10) || [],
                        })
                        if (resp.farl_list.length < 10) {
                            this.setState({
                                anchorRankType: 'WEEK'
                            }, () => {
                                this.fetchAnchorRankListInit()
                            })
                        }
                    } else if (anchorRankType === 'WEEK') {
                        this.setState({
                            anchorWeekRankList: _.slice(resp.farl_list, 0, 10) || [],
                        })
                        if (resp.farl_list.length < 10) {
                            this.setState({
                                anchorRankType: 'MONTH'
                            }, () => {
                                this.fetchAnchorRankListInit()
                            })
                        }
                    } else if (anchorRankType === 'MONTH') {
                        this.setState({
                            anchorMonthRankList: _.slice(resp.farl_list, 0, 10) || [],
                        })
                    }
                } else if (resp.farl_msg) {
                    this.handleErrMsg(resp.farl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(this.guestFetchAnchorRankListInit)
            }
        })
    }

    // 获取主播榜单
    fetchAnchorRankList = () => {
        const { fetchAnchorRankList } = this.props
        const { anchorRankType } = this.state
        fetchAnchorRankList({
            type: anchorRankType,
        }).then(resp => {
            if (resp) {
                if (resp.farl_code) {
                    const result = isAccountExpire(resp.farl_code)
                    if (result) {
                        this.initLogoutStatus(this.guestFetchAnchorRankList)
                        return
                    }
                }
                if (resp.farl_succ) {
                    switch (anchorRankType) {
                        case 'DAY':
                            this.setState({
                                anchorDayRankList: _.slice(resp.farl_list, 0, 10) || [],
                            })
                            break;
                        case 'WEEK':
                            this.setState({
                                anchorWeekRankList: _.slice(resp.farl_list, 0, 10) || [],
                            })
                            break;
                        case 'MONTH':
                            this.setState({
                                anchorMonthRankList: _.slice(resp.farl_list, 0, 10) || [],
                            })
                            break;
                        default:
                            break;
                    }
                } else if (resp.farl_msg) {
                    this.handleErrMsg(resp.farl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(this.guestFetchAnchorRankList)
            }
        })
    }

    // 初始加载游客获取主播榜单
    guestFetchAnchorRankListInit = () => {
        const { guestFetchAnchorRankList } = this.props
        const { anchorRankType } = this.state
        guestFetchAnchorRankList({
            type: anchorRankType,
        }).then(resp => {
            if (resp) {
                if (resp.gfarl_succ) {
                    if (anchorRankType === 'DAY') {
                        this.setState({
                            anchorDayRankList: _.slice(resp.gfarl_list, 0, 10) || [],
                        })
                        if (resp.gfarl_list.length < 10) {
                            this.setState({
                                anchorRankType: 'WEEK'
                            }, () => {
                                this.guestFetchAnchorRankListInit()
                            })
                        }
                    } else if (anchorRankType === 'WEEK') {
                        this.setState({
                            anchorWeekRankList: _.slice(resp.gfarl_list, 0, 10) || [],
                        })
                        if (resp.gfarl_list.length < 10) {
                            this.setState({
                                anchorRankType: 'MONTH'
                            }, () => {
                                this.guestFetchAnchorRankListInit()
                            })
                        }
                    } else if (anchorRankType === 'MONTH') {
                        this.setState({
                            anchorMonthRankList: _.slice(resp.gfarl_list, 0, 10) || [],
                        })
                    }
                } else if (resp.gfarl_msg) {
                    this.handleErrMsg(resp.gfarl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 初始加载游客获取主播榜单
    guestFetchAnchorRankList = () => {
        const { guestFetchAnchorRankList } = this.props
        const { anchorRankType } = this.state
        guestFetchAnchorRankList({
            type: anchorRankType,
        }).then(resp => {
            if (resp) {
                if (resp.gfarl_succ) {
                    switch (anchorRankType) {
                        case 'DAY':
                            this.setState({
                                anchorDayRankList: _.slice(resp.gfarl_list, 0, 10) || [],
                            })
                            break;
                        case 'WEEK':
                            this.setState({
                                anchorWeekRankList: _.slice(resp.gfarl_list, 0, 10) || [],
                            })
                            break;
                        case 'MONTH':
                            this.setState({
                                anchorMonthRankList: _.slice(resp.gfarl_list, 0, 10) || [],
                            })
                            break;
                        default:
                            break;
                    }
                } else if (resp.gfarl_msg) {
                    this.handleErrMsg(resp.gfarl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 初始加载获取用户榜单
    fetchUserRankListInit = () => {
        const { fetchUserRankList } = this.props
        const { userRankType } = this.state
        fetchUserRankList({
            type: userRankType,
        }).then(resp => {
            if (resp) {
                if (resp.furl_code) {
                    const result = isAccountExpire(resp.furl_code)
                    if (result) {
                        this.initLogoutStatus(this.guestFetchUserRankListInit)
                        return
                    }
                }
                if (resp.furl_succ) {
                    if (userRankType === 'DAY') {
                        this.setState({
                            userDayRankList: _.slice(resp.furl_list, 0, 10) || [],
                        })
                        if (resp.furl_list.length < 10) {
                            this.setState({
                                userRankType: 'WEEK'
                            }, () => {
                                this.fetchUserRankListInit()
                            })
                        }
                    } else if (userRankType === 'WEEK') {
                        this.setState({
                            userWeekRankList: _.slice(resp.furl_list, 0, 10) || [],
                        })
                        if (resp.furl_list.length < 10) {
                            this.setState({
                                userRankType: 'MONTH'
                            }, () => {
                                this.fetchUserRankListInit()
                            })
                        }
                    } else if (userRankType === 'MONTH') {
                        this.setState({
                            userMonthRankList: _.slice(resp.furl_list, 0, 10) || [],
                        })
                    }
                } else if (resp.furl_msg) {
                    this.handleErrMsg(resp.furl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(this.guestFetchUserRankListInit)
            }
        })
    }

    // 获取用户榜单
    fetchUserRankList = () => {
        const { fetchUserRankList } = this.props
        const { userRankType } = this.state
        fetchUserRankList({
            type: userRankType,
        }).then(resp => {
            if (resp) {
                if (resp.furl_code) {
                    const result = isAccountExpire(resp.furl_code)
                    if (result) {
                        this.initLogoutStatus(this.guestFetchUserRankList)
                        return
                    }
                }
                if (resp.furl_succ) {
                    switch (userRankType) {
                        case 'DAY':
                            this.setState({
                                userDayRankList: _.slice(resp.furl_list, 0, 10) || [],
                            })
                            break;
                        case 'WEEK':
                            this.setState({
                                userWeekRankList: _.slice(resp.furl_list, 0, 10) || [],
                            })
                            break;
                        case 'MONTH':
                            this.setState({
                                userMonthRankList: _.slice(resp.furl_list, 0, 10) || [],
                            })
                            break;
                        default:
                            break;
                    }
                } else if (resp.furl_msg) {
                    this.handleErrMsg(resp.furl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(this.guestFetchUserRankList)
            }
        })
    }

    // 初始化游客获取用户榜单
    guestFetchUserRankListInit = () => {
        const { guestFetchUserRankList } = this.props
        const { userRankType } = this.state
        guestFetchUserRankList({
            type: userRankType,
        }).then(resp => {
            if (resp) {
                if (resp.gfurl_succ) {
                    if (userRankType === 'DAY') {
                        this.setState({
                            userDayRankList: _.slice(resp.gfurl_list, 0, 10) || [],
                        })
                        if (resp.gfurl_list.length < 10) {
                            this.setState({
                                userRankType: 'WEEK'
                            }, () => {
                                this.guestFetchUserRankListInit()
                            })
                        }
                    } else if (userRankType === 'WEEK') {
                        this.setState({
                            userWeekRankList: _.slice(resp.gfurl_list, 0, 10) || [],
                        })
                        if (resp.gfurl_list.length < 10) {
                            this.setState({
                                userRankType: 'MONTH'
                            }, () => {
                                this.guestFetchUserRankListInit()
                            })
                        }
                    } else if (userRankType === 'MONTH') {
                        this.setState({
                            userMonthRankList: _.slice(resp.gfurl_list, 0, 10) || [],
                        })
                    }
                } else if (resp.gfurl_msg) {
                    this.handleErrMsg(resp.gfurl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 游客获取用户榜单
    guestFetchUserRankList = () => {
        const { guestFetchUserRankList } = this.props
        const { userRankType } = this.state
        guestFetchUserRankList({
            type: userRankType,
        }).then(resp => {
            if (resp) {
                if (resp.gfurl_succ) {
                    switch (userRankType) {
                        case 'DAY':
                            this.setState({
                                userDayRankList: _.slice(resp.gfurl_list, 0, 10) || [],
                            })
                            break;
                        case 'WEEK':
                            this.setState({
                                userWeekRankList: _.slice(resp.gfurl_list, 0, 10) || [],
                            })
                            break;
                        case 'MONTH':
                            this.setState({
                                userMonthRankList: _.slice(resp.gfurl_list, 0, 10) || [],
                            })
                            break;
                        default:
                            break;
                    }
                } else if (resp.gfurl_msg) {
                    this.handleErrMsg(resp.gfurl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 获取热门搜索列表
    fetchHotSearchList = () => {
        const { fetchHotSearchList } = this.props
        fetchHotSearchList({
            num: 21,
        }).then(resp => {
            if (resp) {
                if (resp.fhsl_code) {
                    const result = isAccountExpire(resp.fhsl_code)
                    if (result) {
                        this.initLogoutStatus(this.guestFetchHotSearchList)
                        return
                    }
                }
                if (resp.fhsl_succ) {
                    this.setState({
                        hotSearchList: resp.fhsl_list || [],
                    })
                } else if (resp.fhsl_msg) {
                    this.handleErrMsg(resp.fhsl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(this.guestFetchHotSearchList)
            }
        })
    }

    // 游客获取热门搜索列表
    guestFetchHotSearchList = () => {
        const { guestFetchHotSearchList } = this.props
        guestFetchHotSearchList({
            num: 21,
        }).then(resp => {
            if (resp) {
                if (resp.gfhsl_succ) {
                    this.setState({
                        hotSearchList: resp.gfhsl_list || [],
                    })
                } else if (resp.gfhsl_msg) {
                    this.handleErrMsg(resp.gfhsl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 获取新人列表
    fetchFreshAnchorList = () => {
        const { fetchFreshAnchorList } = this.props
        fetchFreshAnchorList({
            num: 9,
            longitude,
            latitude,
        }).then(resp => {
            if (resp) {
                if (resp.ffal_code) {
                    const result = isAccountExpire(resp.ffal_code)
                    if (result) {
                        this.initLogoutStatus(this.guestFetchFreshAnchorList)
                        return
                    }
                }
                if (resp.ffal_succ) {
                    this.setState({
                        freshAnchorList: _.slice(resp.ffal_list, 0, 7) || [],
                    })
                } else if (resp.ffal_msg) {
                    this.handleErrMsg(resp.ffal_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(this.guestFetchFreshAnchorList)
            }
        })
    }

    // 游客获取新人列表
    guestFetchFreshAnchorList = () => {
        const { guestFetchFreshAnchorList } = this.props
        guestFetchFreshAnchorList({
            num: 9,
            longitude,
            latitude,
        }).then(resp => {
            if (resp) {
                if (resp.gffal_succ) {
                    this.setState({
                        freshAnchorList: _.slice(resp.gffal_list, 0, 7) || [],
                    })
                } else if (resp.gffal_msg) {
                    this.handleErrMsg(resp.gffal_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 获取用户信息
    fetchUserInfo = (callback = null) => {
        const { fetchUserInfo } = this.props
        fetchUserInfo().then(resp => {
            if (resp) {
                if (resp.fui_code) {
                    const result = isAccountExpire(resp.fui_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.fui_succ) {
                    this.setState({
                        dataUser: resp.fui_data || {},
                    }, () => {
                        callback && callback()
                    })
                    if (loginStatus && resp.fui_data.avatarUrl) {
                        let avatarUrl = resp.fui_data.avatarUrl || ''
                        const result = is3rdAvatar(avatarUrl)
                        if (result) {
                            if (isPreEnv) {
                                avatarUrl = replaceCrossImgUrl(avatarUrl)
                            }
                            imageToCanvas(avatarUrl, this.uploadImg)
                        }
                    }
                } else if (resp.fui_msg) {
                    this.handleErrMsg(resp.fui_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 获取用户资产
    fetchAsset = () => {
        const { fetchAsset } = this.props
        fetchAsset().then(resp => {
            if (resp) {
                if (resp.fa_code) {
                    const result = isAccountExpire(resp.fa_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.fa_succ && _.parseInt(resp.fa_data.kucoin) >= 0) {
                    this.setState({
                        kuCoin: _.parseInt(resp.fa_data.kucoin),
                    })
                } else if (resp.fa_msg) {
                    this.handleErrMsg(resp.fa_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 切换密码类型
    handleChangePasswordType = (e) => {
        e && e.preventDefault()
        const { passwordType } = this.state
        if (passwordType === 'text') {
            this.setState({
                passwordType: 'password'
            })
        } else {
            this.setState({
                passwordType: 'text'
            })
        }
    }

    // 获取目标用户信息
    fetchTargetUserInfo = (targetUserId, callback = null) => {
        if (!targetUserId) {
            return
        }
        const { fetchTargetUserInfo } = this.props
        fetchTargetUserInfo({
            targetUserId,
        }).then(resp => {
            if (resp) {
                if (resp.ftui_code) {
                    const result = isAccountExpire(resp.ftui_code)
                    if (result) {
                        this.initLogoutStatusWithUser(targetUserId, callback, this.guestFetchTargetUserInfo)
                        return
                    }
                }
                if (resp.ftui_succ) {
                    this.setState({
                        dataTarget: resp.ftui_data || {},
                    }, () => {
                        callback && callback()
                    })
                } else if (resp.ftui_msg) {
                    this.handleErrMsg(resp.ftui_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatusWithUser(targetUserId, callback, this.guestFetchTargetUserInfo)
            }
        })
    }

    // 游客获取目标用户信息
    guestFetchTargetUserInfo = (targetUserId, callback = null) => {
        if (!targetUserId) {
            return
        }
        const { guestFetchTargetUserInfo } = this.props
        guestFetchTargetUserInfo({
            targetUserId,
        }).then(resp => {
            if (resp) {
                if (resp.gftui_succ) {
                    this.setState({
                        dataTarget: resp.gftui_data || {},
                    }, () => {
                        callback && callback()
                    })
                } else if (resp.gftui_msg) {
                    this.handleErrMsg(resp.gftui_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 添加关注
    addAttention = (e, targetUserId, callback = null) => {
        e && e.preventDefault()
        if (!targetUserId) {
            return
        }
        if (targetUserId === userId) {
            this.handleErrMsg('不能关注自己')
            return
        }
        if (!loginStatus) {
            this.handleDrawerLoginOpen(e)
            return
        }
        const { addAttention } = this.props
        addAttention({
            targetUserId,
            anchorUserId: 0,
        }).then(resp => {
            if (resp) {
                if (resp.aa_code) {
                    const result = isAccountExpire(resp.aa_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.aa_succ) {
                    this.handleErrMsg('关注成功')
                    callback && callback(targetUserId)
                } else if (resp.aa_msg) {
                    this.handleErrMsg(resp.aa_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 热门搜索添加关注
    addAttentionForSearch = (e, targetUserId, index, callback = null) => {
        e && e.preventDefault()
        if (!targetUserId) {
            return
        }
        if (targetUserId === userId) {
            this.handleErrMsg('不能关注自己')
            return
        }
        if (!loginStatus) {
            this.handleDrawerLoginOpen(e)
            return
        }
        const { addAttention } = this.props
        addAttention({
            targetUserId,
            anchorUserId: 0,
        }).then(resp => {
            if (resp) {
                if (resp.aa_code) {
                    const result = isAccountExpire(resp.aa_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.aa_succ) {
                    this.handleErrMsg('关注成功')
                    callback && callback(index)
                } else if (resp.aa_msg) {
                    this.handleErrMsg(resp.aa_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // handleDownloadShortcut = () => {
    //     window.localStorage.setItem('kx_live_shortcut', '0')
    // }

    // 取消关注
    cancelAttention = (e, targetUserId, callback = null) => {
        e && e.preventDefault()
        if (!targetUserId) {
            return
        }
        const { cancelAttention } = this.props
        cancelAttention({
            targetUserId,
        }).then(resp => {
            if (resp) {
                if (resp.ca_code) {
                    const result = isAccountExpire(resp.ca_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.ca_succ) {
                    this.handleErrMsg('取消关注成功')
                    callback && callback(targetUserId)
                } else if (resp.ca_msg) {
                    this.handleErrMsg(resp.ca_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 实时更新搜索结果
    updateSearchResult = (index) => {
        const { searchList, searchListTotal, pageIndex } = this.state
        searchList[index].status = 2
        if (pageIndex === 0) {
            searchListTotal[index].status = 2
        } else {
            searchListTotal[index + 10].status = 2
        }
        this.setState({
            searchList,
            searchListTotal
        })
    }

    // 获取搜索列表结果
    fetchSearchList = () => {
        const { fetchSearchList } = this.props
        const { keywords } = this.state
        fetchSearchList({
            keywords,
        }).then(resp => {
            if (resp) {
                if (resp.fsl_code) {
                    const result = isAccountExpire(resp.fsl_code)
                    if (result) {
                        this.initLogoutStatus(this.guestFetchSearchList)
                        return
                    }
                }
                if (resp.fsl_succ) {
                    const searchListTotal = resp.fsl_list || [];
                    this.setState({
                        searchList: _.slice(searchListTotal, 0, 10),
                        searchListTotal,
                    })
                } else if (resp.fsl_msg) {
                    this.handleErrMsg(resp.fsl_msg)
                } else {
                    // this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(this.guestFetchSearchList)
            }
        })
    }

    // 游客获取搜索列表结果
    guestFetchSearchList = () => {
        const { guestFetchSearchList } = this.props
        const { keywords } = this.state
        guestFetchSearchList({
            keywords,
        }).then(resp => {
            if (resp) {
                if (resp.gfsl_succ) {
                    const searchListTotal = resp.gfsl_list || [];
                    this.setState({
                        searchList: _.slice(searchListTotal, 0, 10),
                        searchListTotal,
                    })
                } else if (resp.gfsl_msg) {
                    this.handleErrMsg(resp.gfsl_msg)
                } else {
                    // this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 第三方token登录
    loginByToken = () => {
        const { loginByToken } = this.props
        loginByToken().then(resp => {
            if (resp) {
                if (resp.lbto_succ) {
                    if (resp.lbto_data.userId && resp.lbto_data.accessToken) {
                        // !window.sessionStorage.getItem('kx_live_slient_login') && window.sessionStorage.setItem('kx_live_slient_login', '1')
                        customCookie.setCookie("kx_live_token", resp.lbto_data.accessToken, "d6");
                        customCookie.setCookie("kx_live_userId", resp.lbto_data.userId, "d6");
                        userId = _.parseInt(resp.lbto_data.userId) || 0
                    }
                } else if (resp.lbto_msg) {
                    // this.handleErrMsg(resp.l_msg)
                } else {
                    // this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 登录
    login = (e) => {
        e && e.preventDefault();
        const { login } = this.props
        const { mobile, password, areaCode } = this.state
        if (isEmpty(mobile)) {
            this.handleErrMsg('请输入手机号')
            return
        }
        if (!isMobile(mobile, areaCode)) {
            this.handleErrMsg('请输入正确的手机号')
            return
        }
        if (isEmpty(password)) {
            this.handleErrMsg('请输入密码')
            return
        }
        if (!isPassword(password)) {
            this.handleErrMsg('请输入正确的密码6-18位')
            return
        }
        login({
            mobile,
            password: CryptoJS.MD5(password).toString().toUpperCase(),
            channel: 9,
            areaCode,
        }, channel).then(resp => {
            if (resp) {
                if (resp.l_succ) {
                    if (resp.l_data.userId && resp.l_data.accessToken) {
                        _hmt.push(['_trackEvent', 'PC登录', '手机登录']);
                        customCookie.setCookie("kx_live_token", resp.l_data.accessToken, "d6");
                        customCookie.setCookie("kx_live_userId", resp.l_data.userId, "d6");
                        window.localStorage.setItem('kx_live_login', '1')
                        // !window.sessionStorage.getItem('kx_live_slient_login') && window.sessionStorage.setItem('kx_live_slient_login', '1')
                        this.handleDrawerClose()
                        userId = _.parseInt(resp.l_data.userId) || 0
                        this.initRoomStatus('login')
                    } else {
                        this.handleErrMsg('接口返回的用户id或者token没有值')
                    }
                } else if (resp.l_msg) {
                    this.handleErrMsg(resp.l_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 注册
    register = (e) => {
        e && e.preventDefault();
        const { register } = this.props
        const { mobile, password, code, areaCode } = this.state
        if (isEmpty(mobile)) {
            this.handleErrMsg('请输入手机号')
            return
        }
        if (!isMobile(mobile, areaCode)) {
            this.handleErrMsg('请输入正确的手机号')
            return
        }
        if (isEmpty(code)) {
            this.handleErrMsg('请输入验证码')
            return
        }
        if (!isVerCode(code)) {
            this.handleErrMsg('请输入正确的验证码')
            return
        }
        if (isEmpty(password)) {
            this.handleErrMsg('请输入密码')
            return
        }
        if (!isPassword(password)) {
            this.handleErrMsg('请输入正确的密码6-18位')
            return
        }
        register({
            mobile,
            password: CryptoJS.MD5(password).toString().toUpperCase(),
            code,
            channel: 9,
            areaCode,
        }, channel).then(resp => {
            if (resp) {
                if (resp.r_succ) {
                    if (resp.r_data.userId && resp.r_data.accessToken) {
                        _hmt.push(['_trackEvent', 'PC注册', '手机注册']);
                        customCookie.setCookie("kx_live_token", resp.r_data.accessToken, "d6");
                        customCookie.setCookie("kx_live_userId", resp.r_data.userId, "d6");
                        window.localStorage.setItem('kx_live_login', '1')
                        // !window.sessionStorage.getItem('kx_live_slient_login') && window.sessionStorage.setItem('kx_live_slient_login', '1')
                        this.handleDrawerClose()
                        userId = _.parseInt(resp.r_data.userId) || 0
                        this.initRoomStatus('register')
                    } else {
                        this.handleErrMsg('接口返回的用户id或者token没有值')
                    }
                } else if (resp.r_msg) {
                    this.handleErrMsg(resp.r_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 检查手机号
    checkMobile = (e, type, callback = null) => {
        e && e.preventDefault()
        const { checkMobile } = this.props
        const { mobile, areaCode } = this.state
        if (isEmpty(mobile)) {
            this.handleErrMsg('请输入手机号')
            return
        }
        if (!isMobile(mobile, areaCode)) {
            this.handleErrMsg('请输入正确的手机号')
            return
        }
        checkMobile({
            mobile,
            areaCode,
        }).then(resp => {
            if (resp) {
                if (resp.cm_succ) {
                    callback && callback(e, type)
                } else if (resp.cm_msg) {
                    this.handleErrMsg(resp.cm_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // cdn更新上传用户头像图片
    uploadImg = (imgBlob) => {
        const _this = this;
        const cos = new COS({
            getAuthorization(options, callback) {
                const { fetchImageSign } = _this.props
                fetchImageSign().then(resp => {
                    if (resp) {
                        if (resp.fis_code) {
                            const result = isAccountExpire(resp.fis_code)
                            if (result) {
                                this.initLogoutStatus()
                                return
                            }
                        }
                        if (resp.fis_succ) {
                            const data = resp.fis_data || {}
                            callback({
                                TmpSecretId: data && data.credentials && data.credentials.tmpSecretId,
                                TmpSecretKey: data && data.credentials && data.credentials.tmpSecretKey,
                                XCosSecurityToken: data && data.credentials && data.credentials.sessionToken,
                                ExpiredTime: data && data.expiredTime,
                            });
                        } else if (resp.fis_msg) {
                            // this.handleErrMsg(resp.fis_msg)
                        } else {
                            // this.handleErrMsg(errMsg)
                        }
                    } else {
                        this.initLogoutStatus()
                        return
                    }
                })
            }
        });
        const fileName = `loginThirdAvatar_${userId.toString()}.png`;
        cos.sliceUploadFile({
            Bucket: "kuxiu-1257191655",
            Region: "ap-shanghai",
            Key: `avatar/${fileName}`,
            Body: imgBlob,
        }, (err, data) => {
            const url = `http://img.17kuxiu.com/avatar/${fileName}`
            this.updateUserAvatar(url)
            // console.log('res--->', data)
            // console.log('err--->', err)
        });
    }

    // cdn更新用户头像
    updateUserAvatar = (avatar) => {
        const { updateUserAvatar } = this.props
        updateUserAvatar({
            photoUrl: avatar,
        }).then(resp => {
            if (resp) {
                if (resp.uua_code) {
                    const result = isAccountExpire(resp.uua_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.uua_succ) {
                    const { dataUser } = this.state
                    let data = _.assign({}, dataUser)
                    data = {
                        ...data,
                        avatarUrl: avatar,
                    }
                    this.setState({
                        dataUser: data
                    })
                    // console.log(data)
                } else if (resp.uua_msg) {
                    // this.handleErrMsg(resp.uua_msg)
                } else {
                    // this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 发送验证码
    sendVerificationCode = (e, type) => {
        e && e.preventDefault()
        const { sendBtnEnable, areaCode } = this.state
        if (!sendBtnEnable) {
            return
        }
        const { sendVerificationCode } = this.props
        const { mobile } = this.state
        if (isEmpty(mobile)) {
            this.handleErrMsg('请输入手机号')
            return
        }
        if (!isMobile(mobile, areaCode)) {
            this.handleErrMsg('请输入正确的手机号')
            return
        }
        sendVerificationCode({
            mobile,
            type,
            areaCode,
        }).then(resp => {
            if (resp) {
                if (resp.svc_succ) {
                    this.setState({
                        sendBtnEnable: false,
                    }, () => {
                        this.timerCountDown = setInterval(() => {
                            const { countDown } = this.state
                            if (countDown === 1) {
                                this.timerCountDown && clearInterval(this.timerCountDown)
                                this.timerCountDown = null
                                this.setState({
                                    sendBtnEnable: true,
                                }, () => {
                                    this.setState({
                                        countDown: 60,
                                    })
                                })
                            } else {
                                this.setState({
                                    countDown: countDown - 1
                                })
                            }
                        }, 1000)
                    })
                } else if (resp.svc_msg) {
                    this.handleErrMsg(resp.svc_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 重置密码
    resetPassword = (e) => {
        e && e.preventDefault();
        const { resetPassword } = this.props
        const { mobile, password, code, areaCode } = this.state
        if (isEmpty(mobile)) {
            this.handleErrMsg('请输入手机号')
            return
        }
        if (!isMobile(mobile, areaCode)) {
            this.handleErrMsg('请输入正确的手机号')
            return
        }
        if (isEmpty(code)) {
            this.handleErrMsg('请输入验证码')
            return
        }
        if (!isVerCode(code)) {
            this.handleErrMsg('请输入正确的验证码')
            return
        }
        if (isEmpty(password)) {
            this.handleErrMsg('请输入密码')
            return
        }
        if (!isPassword(password)) {
            this.handleErrMsg('请输入正确的密码6-18位')
            return
        }
        resetPassword({
            mobile,
            password: CryptoJS.MD5(password).toString().toUpperCase(),
            code,
            channel: 9,
            areaCode,
        }).then(resp => {
            if (resp) {
                if (resp.rp_succ) {
                    this.setState({
                        loginType: 'login',
                    })
                } else if (resp.rp_msg) {
                    this.handleErrMsg(resp.rp_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 初始化用户登录状态
    initLogoutStatusWithUser = (targetUserId, callback1 = null, callback2 = null) => {
        if (loginStatus) {
            customCookie.delCookie("kx_live_token");
            customCookie.delCookie("kx_live_userId");
            window.localStorage.removeItem('kx_live_login')
            // this.logoutRoom()
            if (this.timerFetchServic) {
                clearInterval(this.timerFetchService)
                this.timerFetchService = null
            }
            userId = 0
            this.setState({
                isLogin: false
            })
            loginStatus = false
        }
        callback2 && callback2(targetUserId, callback1)
    }

    // 初始化登出状态
    initLogoutStatus = (callback = null) => {
        if (loginStatus) {
            customCookie.delCookie("kx_live_token");
            customCookie.delCookie("kx_live_userId");
            window.localStorage.removeItem('kx_live_login')
            // this.logoutRoom()
            if (this.timerFetchServic) {
                clearInterval(this.timerFetchService)
                this.timerFetchService = null
            }
            userId = 0
            this.setState({
                isLogin: false
            })
            loginStatus = false
        }
        callback && callback()
    }

    // 登出
    logoutRoom = () => {
        webim.logout(
            () => {
                this.setState({
                    isLogin: false
                })
                loginStatus = false
            },
            () => {
                this.setState({
                    isLogin: false
                })
                loginStatus = false
            },
        )
    }

    // 初始化房间状态
    initRoomStatus = (type) => {
        if (type === 'login' || type === 'register') {
            this.setState({
                isLogin: true,
            })
            loginStatus = true
            this.fetchUserInfo(this.initServiceMsgStatus)
            // this.fetchImSig()
        } else if (type === 'loginListen') {
            this.setState({
                isLogin: true,
            })
            loginStatus = true
            this.fetchUserInfo(this.initServiceMsgStatus)
            // const uid = userId
            // setTimeout(() => {
            //     if (loginStatus && uid === userId) {
            //         this.loginRoom()
            //     }
            // }, 2000);
        } else if (type === 'index') {
            window.location.href = !isPreEnv ? `/?channel=${channel}` : `/web/kuxiu?channel=${channel}`
        }
    }

    // 获取sig
    fetchImSig = () => {
        const { fetchImSig } = this.props
        fetchImSig().then(resp => {
            if (resp) {
                if (resp.fis_code) {
                    const result = isAccountExpire(resp.fis_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.fis_succ) {
                    if (resp.fis_value) {
                        userSig = resp.fis_value
                        customCookie.setCookie(`kx_live_sig_${userId.toString()}`, userSig, "d6");
                        // this.loginRoom()
                    }
                } else if (resp.fis_msg) {
                    this.handleErrMsg(resp.fis_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 获取客服对话列表
    fetchServiceList = (callback = null) => {
        const { fetchServiceList } = this.props
        const { dataUser } = this.state;
        const _this = this;
        fetchServiceList({
            fromId: dataUser.userId,
            receiveId: 0,
        }).then(resp => {
            if (resp) {
                if (resp.fsl_code) {
                    const result = isAccountExpire(resp.fsl_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.fsl_succ) {
                    this.setState({
                        serviceList: resp.fsl_list || [],
                    }, () => {
                        callback && callback()
                        setTimeout(() => {
                            _this.handleScrollTopPosition();
                        }, timerShowMsg);
                    })
                    const list = resp.fsl_list;
                    const len = list.length;
                    if (list.length > 0 && list[len - 1].fromId === 0 && (!lastReadId || lastReadId !== list[len - 1].id)) {
                        const { drawerType } = this.state
                        if (drawerType === 'service') {
                            const id = list[len - 1].id;
                            if (!existServiceMsgStorage) {
                                window.localStorage.setItem('kx_live_service_msg_unread', `${dataUser.userId}|${id}`)
                            } else if (tempServiceMsg) {
                                window.localStorage.setItem('kx_live_service_msg_unread', serviceMsgStorage.replace(tempServiceMsg, `${dataUser.userId}|${id}`))
                            } else {
                                window.localStorage.setItem('kx_live_service_msg_unread', `${serviceMsgStorage},${dataUser.userId}|${id}`)
                            }
                        }
                    }
                } else if (resp.fsl_msg) {
                    this.handleErrMsg(resp.fsl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 获取客服对话列表数据更新
    fetchServiceListUpdate = () => {
        const { fetchServiceList } = this.props
        const { dataUser } = this.state;
        const _this = this;
        fetchServiceList({
            fromId: dataUser.userId,
            receiveId: 0,
        }).then(resp => {
            if (resp) {
                if (resp.fsl_code) {
                    const result = isAccountExpire(resp.fsl_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.fsl_succ) {
                    const { serviceList } = this.state
                    const len1 = serviceList.length
                    const len2 = resp.fsl_list.length
                    if (len1 > 0 && len2 > 0 && serviceList[len1 - 1].createTime !== resp.fsl_list[len2 - 1].createTime) {
                        this.setState({
                            serviceList: resp.fsl_list || [],
                        }, () => {
                            setTimeout(() => {
                                _this.handleScrollTopPosition();
                            }, timerShowMsg);
                        })
                    }
                    const list = resp.fsl_list;
                    const len = list.length;
                    if (list.length > 0 && list[len - 1].fromId === 0 && (!lastReadId || lastReadId !== list[len - 1].id)) {
                        const { dotShow, drawerType } = this.state
                        if (!dotShow && drawerType !== 'service') {
                            this.setState({
                                dotShow: true
                            })
                        }
                        if (drawerType === 'service') {
                            const id = list[len - 1].id;
                            if (!existServiceMsgStorage) {
                                window.localStorage.setItem('kx_live_service_msg_unread', `${dataUser.userId}|${id}`)
                            } else if (tempServiceMsg) {
                                window.localStorage.setItem('kx_live_service_msg_unread', serviceMsgStorage.replace(tempServiceMsg, `${dataUser.userId}|${id}`))
                            } else {
                                window.localStorage.setItem('kx_live_service_msg_unread', `${serviceMsgStorage},${dataUser.userId}|${id}`)
                            }
                        }
                    }
                } else if (resp.fsl_msg) {
                    this.handleErrMsg(resp.fsl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 发送客服消息
    sendServiceMsg = (e) => {
        e && e.preventDefault();
        const { sendServiceMsg } = this.props
        const { message, dataUser } = this.state
        if (!message) {
            return;
        }
        sendServiceMsg({
            fromId: dataUser.userId,
            receiveId: 0,
            message: utf16toEntities(message),
        }).then(resp => {
            if (resp) {
                if (resp.ssm_code) {
                    const result = isAccountExpire(resp.ssm_code)
                    if (result) {
                        this.initLogoutStatus()
                        return
                    }
                }
                if (resp.ssm_succ) {
                    this.setState({
                        message: '',
                    })
                    this.fetchServiceList()
                } else if (resp.ssm_msg) {
                    this.handleErrMsg(resp.ssm_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus()
            }
        })
    }

    // 切换登录状态
    handleChangeLogin = (e) => {
        e && e.preventDefault()
        this.setState({
            loginType: 'login',
        })
    }

    // 切换注册状态
    handleChangeRegister = (e) => {
        e && e.preventDefault()
        this.setState({
            code: '',
        }, () => {
            this.setState({
                loginType: 'register',
            })
        })
    }

    // 切换密码重置状态
    handleChangeResetPassword = (e) => {
        e && e.preventDefault()
        this.setState({
            code: '',
        }, () => {
            this.setState({
                loginType: 'resetPassword',
            })
        })
    }

    // 改变输入的消息
    handleChangeMessage = (e) => {
        e && e.preventDefault()
        this.setState({
            message: e.target.value
        })
    }

    // 客服消息窗口显示
    handleShowService = (e) => {
        e && e.preventDefault()
        if (!loginStatus) {
            this.handleDrawerLoginOpen(e)
            return
        }
        const { dotShow } = this.state
        if (dotShow) {
            this.setState({
                dotShow: false
            })
        }
        this.fetchServiceList(this.handleDrawerServiceOpen)
    }

    // 跳转至直播间页面
    handleGoLive = (e, item) => {
        // e.preventDefault()
        if (e) {
            e.cancelBubble = true;
            e.stopPropagation();
        }
        const title = returnTitle(item.nickName || item.nickname || '', item.slogan || item.playTitle || '', item.anchorId || item.userId || '')
        const description = returnDescription(item.nickName || item.nickname || '', item.slogan || item.playTitle || '')
        const keywords = returnKeywords(item.nickName || item.nickname || '', item.slogan || item.playTitle || '')
        window.localStorage.setItem('kx_live_title', title)
        window.localStorage.setItem('kx_live_description', description)
        window.localStorage.setItem('kx_live_keywords', keywords)
        window.localStorage.setItem('kx_live_playUrl', aesEncrypt(item.urlPlayRtmp) || '')
        window.localStorage.setItem('kx_live_cover', item.livingImg || item.avatar || '')
    }

    // 显示用户信息
    handleShowTargetUserInfo = (e, item) => {
        e && e.preventDefault()
        loginStatus ? this.fetchTargetUserInfo(item.anchorId || item.userId, this.handleDrawerFocusOpen) : this.guestFetchTargetUserInfo(item.anchorId || item.userId, this.handleDrawerFocusOpen)
    }

    // 显示用户信息抽屉
    handleShowPersonal = (e) => {
        e && e.preventDefault()
        this.fetchAsset()
        this.fetchUserInfo(this.handleDrawerPersonalOpen)
    }

    // 显示关注列表
    handleShowFocusList = (e) => {
        e && e.preventDefault()
        if (!loginStatus) {
            this.handleDrawerLoginOpen(e)
            return
        }
        this.fetchLiveAttentionList(this.handleDrawerFocusListOpen)
    }

    // 切换用户榜单类型
    handleChangeUserRank = (e, type) => {
        e && e.preventDefault()
        this.setState({
            userRankType: type,
        }, () => {
            if (loginStatus) {
                this.fetchUserRankList()
            } else {
                this.guestFetchUserRankList()
            }
        })
    }

    // 切换主播榜单类型
    handleChangeAnchorRank = (e, type) => {
        e && e.preventDefault()
        this.setState({
            anchorRankType: type,
        }, () => {
            if (loginStatus) {
                this.fetchAnchorRankList()
            } else {
                this.guestFetchAnchorRankList()
            }
        })
    }

    // 用户搜索内容改变
    handleChangeSearch = (e) => {
        const value = e.target.value.replace(/\s/g, "")
        if (!value) {
            this.setState({
                keywords: '',
                searchList: [],
                searchListTotal: [],
                pageIndex: 0,
                modalSearchShow: false
            })
        } else {
            this.setState({
                keywords: value,
                pageIndex: 0,
                modalSearchShow: true,
            }, this.handleSearch)
        }
    }

    // 关闭用户搜索
    handleCancelSearch = () => {
        this.setState({
            keywords: '',
            searchList: [],
            searchListTotal: [],
            pageIndex: 0,
            modalSearchShow: false
        })
    }

    // 浏览器提示显示
    handleBrowserTipShow = () => {
        this.setState({
            browserTipShow: true
        })
    }

    // 浏览器提示隐藏
    handleBrowserTipHide = () => {
        this.setState({
            browserTipShow: false
        })
    }

    // 支付提示显示
    handlePayTipShow = () => {
        this.setState({
            payTipShow: true
        })
    }

    // 支付提示隐藏
    handlePayTipHide = () => {
        this.setState({
            payTipShow: false
        })
    }

    // 直播间im登录
    loginRoom = () => {
        const _this = this
        const identifier = userId;
        if (!identifier || !userSig) {
            return;
        }
        const { dataUser } = this.state
        loginInfo = {
            'sdkAppID': (host.indexOf('pre') !== -1 || host.indexOf('dev') !== -1 || host.indexOf('localhost') !== -1) ? 1400142184 : 1400131192,
            'appIDAt3rd': (host.indexOf('pre') !== -1 || host.indexOf('dev') !== -1 || host.indexOf('localhost') !== -1) ? 1400142184 : 1400131192,
            'accountType': (host.indexOf('pre') !== -1 || host.indexOf('dev') !== -1 || host.indexOf('localhost') !== -1) ? 36862 : 36630,
            'identifier': identifier,
            'userSig': userSig,
            'identifierNick': dataUser.nickName || '',
            'headurl': dataUser.avatarUrl || default_avatar,
        }
        const onDestoryGroupNotify = function () { }
        const onRevokeGroupNotify = function () { }
        const onCustomGroupNotify = function () { }
        const onGroupInfoChangeNotify = function () { }
        const onGroupSystemNotifys = {
            "5": onDestoryGroupNotify,
            "11": onRevokeGroupNotify,
            "255": onCustomGroupNotify,
        }
        const onKickedEventCall = function () {
            // _this.logout(null)
        }
        const onMultipleDeviceKickedOut = function () {
            setTimeout(() => {
                _this.handleErrMsg('您的账号已在其他设备上登录，请重新登录')
            }, 500);
            _this.logout(null)
        }
        const onC2cEventNotifys = {
            "96": onMultipleDeviceKickedOut,
        }
        const onConnNotify = function (resp) {
            switch (resp.ErrorCode) {
                case webim.CONNECTION_STATUS.ON:
                    break
                case webim.CONNECTION_STATUS.OFF:
                    break
                default:
                    break
            }
        }
        const jsonpCallback = function (rspData) {
            webim.setJsonpLastRspData(rspData)
        }
        const onMsgNotify = function (newMsgList) {
            for (const item of newMsgList) {
                const msg = handleMsg(item)
                if (!msg || !msg.retCode || (msg.retCode !== 102 && msg.retCode !== 106)) {
                    return
                }
                _this.handleImMsg(msg)
            }
        }
        const listeners = {
            onConnNotify,
            jsonpCallback,
            onMsgNotify,
            onGroupSystemNotifys,
            onGroupInfoChangeNotify,
            onKickedEventCall,
            onC2cEventNotifys,
        }
        const options = {
            'isAccessFormalEnv': true,
            'isLogOn': false
        }
        webim.login(loginInfo, listeners, options,
            () => {
                errTimes = 1
            },
            (e) => {
                if (e.ErrorCode === 70003 || e.ErrorCode === 70001 || e.ErrorCode === 70002 || e.ErrorCode === 70005 || e.ErrorCode === 70009 || e.ErrorCode === 70013 || e.ErrorCode === 70014 || e.ErrorCode === 70052) {
                    if (errTimes < 6) {
                        _this.fetchImSig()
                        errTimes++
                    }
                } else {
                    errTimes = 1
                }
            },
        )
    }

    // 页面初始化
    initPage = () => {
        if (loginStatus) {
            // const sig = customCookie.getCookie(`kx_live_sig_${userId.toString()}`)
            // if (!sig) {
            //     this.fetchImSig()
            // } else {
            // userSig = sig;
            // this.loginRoom()
            // }
            this.fetchHotSearchList()
            this.fetchUserRankListInit()
            this.fetchAnchorRankListInit()
            this.fetchUserInfo(this.initServiceMsgStatus)
            // setTimeout(() => {
            //     const slientLogin = window.sessionStorage.getItem('kx_live_slient_login') || ''
            //     if (!slientLogin) {
            //         this.loginByToken()
            //     }
            // }, 5000);
        } else {
            this.guestFetchHotSearchList()
            this.guestFetchUserRankListInit()
            this.guestFetchAnchorRankListInit()
        }
        const _this = this
        if (!this.timerUpdate) {
            this.timerUpdate = setInterval(() => {
                if (pageVisible) {
                    if (loginStatus) {
                        const result = isAccountExpire('')
                        if (result) {
                            _this.initLogoutStatus(_this.initPageUpdate)
                        } else {
                            _this.initPageUpdate()
                        }
                    } else {
                        _this.initPageUpdate()
                    }
                }
            }, timerRefresh)
        }
    }

    // 定时刷新页面初始化
    initPageUpdate = () => {
        if (loginStatus) {
            this.fetchHotLiveList()
            this.fetchFreshAnchorList()
            this.fetchHotSearchList()
            this.fetchUserRankList()
            this.fetchAnchorRankList()
        } else {
            this.guestFetchHotLiveList()
            this.guestFetchFreshAnchorList()
            this.guestFetchHotSearchList()
            this.guestFetchUserRankList()
            this.guestFetchAnchorRankList()
        }
    }

    // 登出
    logout = (e) => {
        e && e.preventDefault()
        this.initLogoutStatus()
        const { drawerOpen, drawerOpenOther } = this.state
        if (drawerOpen || drawerOpenOther) {
            this.handleDrawerClose()
        }
    }

    // 改变搜索页码
    handleChangeSearchIndex = (e, pageIndex) => {
        e && e.preventDefault();
        const { searchListTotal } = this.state;
        if (pageIndex === 0) {
            this.setState({
                pageIndex,
                searchList: _.slice(searchListTotal, 0, 10)
            })
        } else {
            this.setState({
                pageIndex,
                searchList: _.slice(searchListTotal, 10)
            })
        }
    }

    // 初始化客服消息状态
    initServiceMsgStatus = () => {
        const serviceMsgUnread = window.localStorage.getItem('kx_live_service_msg_unread')
        if (serviceMsgUnread !== null) {
            const { dataUser } = this.state;
            if (!dataUser || !dataUser.userId) {
                return;
            }
            existServiceMsgStorage = true
            serviceMsgStorage = serviceMsgUnread
            if (serviceMsgUnread.indexOf(dataUser.userId.toString()) >= 0) {
                const serviceMsgArray = serviceMsgUnread.split(',')
                const len = serviceMsgArray.length
                for (let i = 0; i < len; i += 1) {
                    if (serviceMsgArray[i].indexOf(dataUser.userId.toString()) >= 0) {
                        tempServiceMsg = serviceMsgArray[i]
                        lastReadId = _.parseInt(serviceMsgArray[i].split('|')[1])
                        break
                    }
                }
            }
        }
        this.fetchServiceListUpdate()
        const _this = this
        if (!this.timerFetchService) {
            this.timerFetchService = setInterval(() => {
                // const { drawerType } = this.state;
                // if (drawerType !== 'service') {
                if (pageVisible) {
                    _this.fetchServiceListUpdate()
                }
                // }
            }, timerService)
        }
    }

    // initShortCut = () => {
    //     let shortCount = window.localStorage.getItem("kx_live_shortcut")
    //     if (!shortCount) {
    //         window.localStorage.setItem('kx_live_shortcut', '1')
    //     } else {
    //         shortCount = _.parseInt(shortCount)
    //         if (shortCount === 0) {
    //             return
    //         } else if (shortCount === 5) {
    //             this.setState({
    //                 shortcutShow: true
    //             })
    //             window.localStorage.setItem('kx_live_shortcut', '1')
    //         } else {
    //             window.localStorage.setItem('kx_live_shortcut', _.toString(shortCount + 1))
    //         }
    //     }
    // }

    componentDidMount() {
        host = window.location.host
        protocol = window.location.protocol
        browser = fetchBrowserVersion();
        isPreEnv = host.indexOf('pre') !== -1 || host.indexOf('dev') !== -1
        channel = fetchUrlParams('channel') || 'web'
        if (browser === 'h5') {
            if (isPreEnv) {
                window.location.href = `${protocol}//${host}/uc/m/mlive/index.html`
            } else {
                switch (host) {
                    case 'zhibo.17kuxiu.com':
                        window.location.href = channel === 'web' ? `${protocol}//m1.17kuxiu.com` : `${protocol}//m1.17kuxiu.com?channel=${channel}`
                        break;
                    case 'www.17kuxiu.com':
                        window.location.href = channel === 'web' ? `${protocol}//m.17kuxiu.com` : `${protocol}//m.17kuxiu.com?channel=${channel}`
                        break;
                    default:
                        window.location.href = `${protocol}//m.17kuxiu.com`
                        break;
                }
            }
            return;
        }
        setTimeout(() => {
            this.setState({
                mainOpacity: 1
            })
        }, 50);
        const token = fetchUrlParams('token')
        const uid = fetchUrlParams('userId')
        if (token && uid) {
            customCookie.setCookie("kx_live_token", token, "d6");
            customCookie.setCookie("kx_live_userId", uid, "d6");
            window.localStorage.setItem('kx_live_login', '1')
            const state = { title: '', url: window.location.href };
            // eslint-disable-next-line no-restricted-globals
            history.pushState(state, '', `/?channel=${channel}`);
        }
        const result = isAccountExpire('')
        if (result) {
            customCookie.delCookie("kx_live_token");
            customCookie.delCookie("kx_live_userId");
            window.localStorage.removeItem('kx_live_login')
            userId = 0
            this.setState({
                isLogin: false,
            })
            loginStatus = false
        } else {
            userId = _.parseInt(customCookie.getCookie("kx_live_userId")) || 0
            this.setState({
                isLogin: true,
            })
            loginStatus = true
        }
        this.initPage()
        statisticsUrl = statisticsUrlArray
        let statistics = statisticsUrl && statisticsUrl.find(item => item.url === host);
        if (!statistics) {
            statistics = statisticsUrl && statisticsUrl[0]
        }
        if (statistics) {
            asyncLoadScripts([statistics.baiduHm, statistics.zhanzhangCore, statistics.zhanzhangStat])
        }
        this.onWindowResize()
        if (browser !== 'h5') {
            window.addEventListener('resize', this.onWindowResize, true)
        }
        window.addEventListener('beforeunload', this.onBeforeUnload, true);
        window.addEventListener('popstate', this.onPopState, true);
        window.addEventListener('storage', this.onWindowStorage, true)
        if (typeof document.hidden !== "undefined") {
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            visibilityChange = "webkitvisibilitychange";
        }
        window.addEventListener(visibilityChange, this.onWindowVisibilityChange, true);
        asyncLoadScripts(['https://qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js'], function () {
            setShareInfo({
                title: '酷秀直播',
                summary: '酷秀直播 - 演绎无限可能 - 高颜值的直播App',
                pic: '//img.17kuxiu.com/web/live/kuxiu/img/logo.png',
                url: window.location.href,
                WXconfig: {
                    swapTitleInWX: false,
                    appId: '',
                    timestamp: '',
                    nonceStr: '',
                    signature: ''
                }
            });
        })
        this.initPosition()
        // this.initShortCut()
        // preloadImages([
        //     `${urlCdnLive}/header.png`,
        //     `${urlCdnLive}/bg.png`,
        //     logo,
        //     first,
        //     second,
        //     third,
        //     qrcode,
        //     fresh,
        //     hot,
        //     focus,
        //     devote_rank,
        //     sun_rank,
        //     sun,
        //     coin,
        //     wechat,
        //     qq,
        //     fans,
        //     eye,
        //     eye_open,
        //     close_circle,
        //     `${urlCdnLive}/live.png`,
        //     `${urlCdnLive}/search.png`,
        //     `${urlCdnLive}/close.png`,
        //     `${urlCdnSite}/wen.png`,
        //     `${urlCdnSite}/gongan.png`,
        //     `${urlCdnSite}/yingyeshui.png`,
        //     `${urlCdnSite}/wangwenshui.png`,
        //     `${urlCdnLive}/first.png`,
        //     `${urlCdnLive}/second.png`,
        //     `${urlCdnLive}/third.png`,
        //     `${urlCdnKuxiu}/bg_runway.png`,
        //     `${urlCdnLive}/left-arrow-white.png`,
        //     `${urlCdnLive}/right-arrow-white.png`,
        //     `${urlCdnLive}/left-arrow.png`,
        //     `${urlCdnLive}/right-arrow.png`,
        //     `${urlCdnLive}/help.png`,
        //     `${urlCdnLive}/close-white.png`,
        //     `${urlCdnLive}/guard-header.png`,
        //     `${urlCdnLive}/guard-header-year.png`,
        //     `${urlCdnLive}/guard-open.png`,
        //     `${urlCdnKuxiu}/${0}.png`,
        //     `${urlCdnKuxiu}/${1}.png`,
        //     `${urlCdnKuxiu}/${2}.png`,
        //     `${urlCdnKuxiu}/${3}.png`,
        //     `${urlCdnKuxiu}/${4}.png`,
        //     `${urlCdnKuxiu}/${5}.png`,
        //     `${urlCdnKuxiu}/${6}.png`,
        //     `${urlCdnKuxiu}/${7}.png`,
        //     `${urlCdnKuxiu}/${8}.png`,
        //     `${urlCdnKuxiu}/${9}.png`
        // ])
        // preloadImages(emotionArray)
        // var s = fetchImei()
        // if (browser >= 6 && browser <= 9) {
        //     this.handleBrowserTipShow()
        //     window.location.href = `http://support.dmeng.net/upgrade-your-browser.html?referrer=${encodeURIComponent(window.location.href)}`;
        //     return
        // }
        prefetch('/live')
    }

    // 接收im消息
    handleImMsg = (object) => {
        switch (object.retCode) {
            case 102:
                if (object.data && object.data === userId) {
                    this.fetchAsset()
                }
                break
            case 106:
                if (object.data && object.data.type) {
                    if (object.data.message) {
                        setTimeout(() => {
                            this.handleErrMsg(object.data.message)
                        }, 500);
                    }
                    if (object.data.type === 3) {
                        this.logout(null)
                    }
                }
                break
            default:
                break
        }
    }

    onBeforeUnload = () => {
        // if (loginStatus) {
        // this.logoutRoom()
        // }
    }

    onPopState = () => {
        // if (loginStatus) {
        // this.logoutRoom()
        // }
    }

    // 点击首页logo
    handleGoIndex = (e) => {
        e && e.preventDefault()
        // if (loginStatus) {
        //     this.logoutRoom()
        // }
        this.initRoomStatus('index')
    }

    // 错误异常提示
    handleErrMsg = (text) => {
        const { tipsShow } = this.state
        if (!tipsShow && text) {
            if (text === 'accessToken验证失败') {
                text = '飞到外太空啦，请重新登录！'
            }
            this.setState({
                tipsShow: true,
                tipsContent: text
            }, () => {
                setTimeout(() => {
                    this.setState({
                        tipsShow: false,
                        tipsContent: '',
                    })
                }, 1900)
            })
        }
    }

    // 跳转支付页面
    handleGoRecharge = () => {
        this.setState({
            drawerOpen: false
        }, () => {
            this.handlePayTipShow();
        })
    }

    // 发送客服消息回车
    handleKeyUpServiceMsg = (e) => {
        e && e.preventDefault();
        if (e.keyCode === 13) {
            this.sendServiceMsg(e);
        }
    }

    // 区号抽屉显示
    handleDrawerAreaCodeOpen = () => {
        this.setState({
            drawerTypeOther: 'areaCode',
        }, () => {
            this.setState({
                drawerOpenOther: true,
            })
        })
    }

    // 抽屉关闭
    handleDrawerOtherClose = () => {
        this.setState({
            drawerOpenOther: false,
            drawerTypeOther: ''
        })
    }

    // 个人信息抽屉显示
    handleDrawerPersonalOpen = () => {
        this.setState({
            drawerType: 'personal',
        }, () => {
            this.setState({
                drawerOpen: true,
            })
        })
    }

    // 关注抽屉显示
    handleDrawerFocusOpen = () => {
        const { drawerOpen, drawerOpenOther } = this.state
        if (drawerOpen) {
            if (!drawerOpenOther) {
                this.setState({
                    drawerTypeOther: 'focus',
                }, () => {
                    this.setState({
                        drawerOpenOther: true,
                    })
                })
            }
        } else {
            this.setState({
                drawerType: 'focus',
            }, () => {
                this.setState({
                    drawerOpen: true,
                })
            })
        }
    }

    // handleShortcutHide = (e) => {
    //     e && e.preventDefault()
    //     this.setState({
    //         shortcutShow: false
    //     })
    // }

    // handleShortcutModalHide = () => {
    //     this.setState({
    //         shortcutModalShow: false
    //     })
    // }

    // handleShortcutModalShow = (e) => {
    //     e && e.preventDefault()
    //     this.setState({
    //         shortcutModalShow: true
    //     })
    // }

    // 监听滚动条位置
    handleScrollTopPosition = () => {
        if (this.scrollbarRef && this.scrollbarRef.current && this.scrollbarRef.current.props && this.scrollbarRef.current.props.children) {
            this.scrollbarRef.current.scrollToBottom();
        }
    }

    // 热门列表滚动至最底部获取数据
    handleScrollFrame = (e) => {
        if (e && e.top === 1 && !isBottom) {
            this.fetchMoreHotLiveData()
        }
    }

    // 关注列表滚动至最底部获取数据
    handleAttentionScrollFrame = (e) => {
        if (e && e.top === 1 && !isAttentionBottom) {
            this.fetchMoreData()
        }
    }

    // 客服抽屉打开
    handleDrawerServiceOpen = () => {
        this.setState({
            drawerType: 'service',
            dotShow: false
        }, () => {
            this.setState({
                drawerOpen: true,
            })
        })
    }

    // 登录抽屉打开
    handleDrawerLoginOpen = (e) => {
        e && e.preventDefault()
        this.setState({
            drawerType: 'login',
        }, () => {
            this.setState({
                drawerOpen: true,
            })
        })
    }

    // qq登录抽屉打开
    handleDrawerQqOpen = (e) => {
        e && e.preventDefault()
        this.setState({
            drawerTypeOther: 'qq',
        }, () => {
            this.setState({
                drawerOpenOther: true,
            }, () => {
                _hmt.push(['_trackEvent', 'PC登录', 'QQ登录']);
            })
        })
    }

    // 微信登录抽屉打开
    handleDrawerWechatOpen = (e) => {
        e && e.preventDefault()
        this.setState({
            drawerTypeOther: 'wechat',
        }, () => {
            this.setState({
                drawerOpenOther: true,
            }, () => {
                _hmt.push(['_trackEvent', 'PC登录', '微信登录']);
            })
        })
    }

    // 关注列表抽屉打开
    handleDrawerFocusListOpen = () => {
        this.setState({
            drawerType: 'focusList',
        }, () => {
            this.setState({
                drawerOpen: true,
            })
        })
    }

    // 选择区号
    handleSelectAreaCode = (e, item) => {
        e && e.preventDefault()
        const { mobile } = this.state
        if (item.value === '86' && mobile.length > 11) {
            this.setState({
                mobile: mobile.slice(0, 11)
            })
        }
        this.setState({
            areaCode: item.value,
        }, () => {
            this.setState({
                drawerOpenOther: false,
                drawerTypeOther: ''
            })
        })
    }

    // 抽屉关闭
    handleDrawerClose = () => {
        const { drawerOpenOther, tipsShow } = this.state
        if (tipsShow) {
            this.setState({
                tipsShow: false,
                tipsContent: ''
            })
        }
        if (drawerOpenOther) {
            const { drawerTypeOther } = this.state
            if (drawerTypeOther === 'login') {
                this.setState({
                    mobile: '',
                    password: '',
                    code: '',
                    loginType: 'login',
                    areaCode: '86',
                    passwordType: 'password',
                })
            }
            this.setState({
                drawerOpenOther: false,
                drawerTypeOther: ''
            })
        } else {
            const { drawerType } = this.state
            if (drawerType === 'login') {
                this.setState({
                    mobile: '',
                    password: '',
                    code: '',
                    loginType: 'login',
                    areaCode: '86',
                    passwordType: 'password',
                })
            }
            this.setState({
                drawerOpen: false,
                drawerType: '',
                attentionType: 'live'
            })
        }
    }

    // 改变区号
    handleChangeCode = (e) => {
        this.setState({
            code: e && e.target.value.replace(/\s/g, ""),
        })
    }

    // 改变手机号
    handleChangeMobile = (e) => {
        this.setState({
            mobile: e && e.target.value.replace(/\s/g, ""),
        })
    }

    // 改变密码
    handleChangePassword = (e) => {
        this.setState({
            password: e && e.target.value.replace(/\s/g, ""),
        })
    }

    // 窗口大小重置
    onWindowResize = () => {
        const _doc = document.documentElement
        const _docWidth = _doc.clientWidth
        if (_docWidth >= 1650) {
            startIndex = 11
        } else {
            startIndex = 7
        }
    }

    // 页面切后台监听
    onWindowVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            pageVisible = false
            customCookie.setCookie('kx_live_switch_time', '1', 's60')
        } else if (document.visibilityState === 'visible') {
            pageVisible = true
            const switch_time = customCookie.getCookie('kx_live_switch_time')
            if (switch_time) {
                return
            }
            if (loginStatus) {
                const result = isAccountExpire('')
                if (result) {
                    this.initLogoutStatus(this.initPageUpdate)
                } else {
                    this.initPageUpdate()
                    this.fetchServiceListUpdate()
                }
            } else {
                this.initPageUpdate()
            }
        }
    }

    // 缓存读写监听
    onWindowStorage = (e) => {
        if (e && e.key === 'kx_live_login') {
            if (!e.newValue && e.oldValue && loginStatus) {
                this.initLogoutStatus()
            } else if (e.newValue && !e.oldValue && !loginStatus) {
                userId = _.parseInt(customCookie.getCookie('kx_live_userId')) || 0
                this.setState({
                    mobile: '',
                    password: '',
                    code: '',
                    loginType: 'login',
                    areaCode: '86',
                    passwordType: 'password',
                    drawerOpen: false,
                    drawerType: '',
                    drawerOpenOther: false,
                    drawerTypeOther: '',
                })
                // !window.sessionStorage.getItem('kx_live_slient_login') && window.sessionStorage.setItem('kx_live_slient_login', '1')
                this.initRoomStatus('loginListen')
            }
        }
        // } else if (e.key === 'kx_live_qq_login_status') {
        //     if (e.newValue && !e.oldValue && !loginStatus) {
        //         window.localStorage.removeItem('kx_live_qq_login_status')
        //         this.slientLogin()
        //     }
        // }
    }

    errorImgAvatar = () => {
        // eslint-disable-next-line no-restricted-globals
        const img = event.srcElement;
        img.src = default_avatar;
        img.onerror = null;
    }

    errorImgCover = () => {
        // eslint-disable-next-line no-restricted-globals
        const img = event.srcElement;
        img.src = default_cover;
        img.onerror = null;
    }

    componentWillUnmount() {
        this.timerCountDown && clearInterval(this.timerCountDown)
        this.timerFetchService && clearInterval(this.timerFetchService)
        this.timerUpdate && clearInterval(this.timerUpdate)
        window.removeEventListener('resize', this.onWindowResize, true)
        window.removeEventListener('storage', this.onWindowStorage, true)
        window.removeEventListener('beforeunload', this.onBeforeUnload, true);
        window.removeEventListener('popstate', this.onPopState, true);
        window.removeEventListener(visibilityChange, this.onWindowVisibilityChange, true)
    }

    // 绘制抽屉
    renderDrawer = (type) => {
        const { dataUser } = this.state;
        switch (type) {
            case 'focusList':
                const { attentionList, liveAttentionList, attentionType } = this.state
                const liveList = (
                    liveAttentionList.length > 0
                        ?
                        <SpringScrollbars style={{ height: 'calc(100vh - 130px)', width: '100%' }} universal={true}>
                            <ul>
                                {
                                    liveAttentionList.map((item, index) => {
                                        return (
                                            <li className="live-box type1 fl pr" key={index} onClick={e => this.handleGoLive(e, item)}>
                                                <a target="_blank" href={!isPreEnv ? `/live?anchorId=${item.userId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.userId}&channel=${channel}`} className="db height100">
                                                    <img src={formatLiveCover(item.coverUrl)} onError={this.errorImgCover} />
                                                    <div className="live-state pa">
                                                        <i className="iconfont icon-dot dot"></i>
                                                        <span>直播中</span>
                                                    </div>
                                                    <div className="live-hover pa dn">
                                                        <span>
                                                            <div className="head">
                                                                <img src={formatUserAvatar(item.avatarUrl)} onError={this.errorImgAvatar} />
                                                            </div>
                                                            <div className="nickname txt-cut tc">{item.nickName || ''}</div>
                                                            <div className="address tc txt-cut">
                                                                <span className="person-box">
                                                                    <img src={person_white} alt='' />
                                                                </span>
                                                                <span>{item.viewerCount || 0}</span>
                                                            </div>
                                                            <div className="title txt-cut tc">{item.playTitle || ''}</div>
                                                        </span>
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </SpringScrollbars>
                        :
                        <div className="default">您关注的主播尚未开播，去看看其他主播吧～</div>
                )
                const totalList = (
                    attentionList.length > 0
                        ?
                        <SpringScrollbars onScrollFrame={e => this.handleAttentionScrollFrame(e)} style={{ height: 'calc(100vh - 130px)', width: '100%' }} universal={true}>
                            <ul>
                                {
                                    attentionList.map((item, index) => {
                                        return (
                                            item.isPlaying === 1
                                                ?
                                                <li className="live-box type1 fl pr" key={index} onClick={e => this.handleGoLive(e, item)}>
                                                    <a target="_blank" href={!isPreEnv ? `/live?anchorId=${item.userId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.userId}&channel=${channel}`} className="db height100">
                                                        <img src={formatLiveCover(item.coverUrl)} onError={this.errorImgCover} />
                                                        <div className="live-state pa">
                                                            <i className="iconfont icon-dot dot"></i>
                                                            <span>直播中</span>
                                                        </div>
                                                        <div className="live-hover pa dn">
                                                            <span>
                                                                <div className="head">
                                                                    <img src={formatUserAvatar(item.avatarUrl)} onError={this.errorImgAvatar} />
                                                                </div>
                                                                <div className="nickname txt-cut tc">{item.nickName || ''}</div>
                                                                <div className="address tc txt-cut">
                                                                    <span className="person-box">
                                                                        <img src={person_white} alt='' />
                                                                    </span>
                                                                    <span>{item.viewerCount || 0}</span>
                                                                </div>
                                                                <div className="title txt-cut tc">{item.playTitle || ''}</div>
                                                            </span>
                                                        </div>
                                                    </a>
                                                </li>
                                                :
                                                <li className="live-box type1 fl pr" key={index} onClick={e => this.handleShowTargetUserInfo(e, item)}>
                                                    <img src={formatUserAvatar(item.avatarUrl)} onError={this.errorImgAvatar} />
                                                    <div className="live-hover pa dn">
                                                        <span>
                                                            <div className="head type1">
                                                                <img src={formatUserAvatar(item.avatarUrl)} onError={this.errorImgAvatar} />
                                                            </div>
                                                            <div className="nickname txt-cut tc">{item.nickName || ''}</div>
                                                        </span>
                                                    </div>
                                                </li>
                                        )
                                    })
                                }
                            </ul>
                        </SpringScrollbars>
                        :
                        <div className="default">您还没有关注任何主播～</div>
                )
                return (
                    <div className="focus-list">
                        {
                            attentionType === 'live'
                                ?
                                <Fragment>
                                    {liveList}
                                    <div className="btn-switch-box">
                                        <button type="button" className="btn-switch" onClick={e => this.switchAttentionType(e, false)}>全部关注主播</button>
                                    </div>
                                </Fragment>
                                :
                                <Fragment>
                                    {totalList}
                                    <div className="btn-switch-box">
                                        <button type="button" className="btn-switch" onClick={e => this.switchAttentionType(e, true)}>返回</button>
                                    </div>
                                </Fragment>
                        }
                    </div>
                )
            case 'focus':
                const { dataTarget, isLogin, drawerType } = this.state
                const button = (
                    dataTarget.isAttention === 1
                        ?
                        drawerType === 'focusList'
                            ?
                            <button type="button" className="attention" onClick={e => this.cancelAttention(e, dataTarget.userId || 0, this.fetchTargetUserInfo)}>取消关注</button>
                            :
                            null
                        :
                        <button type="button" className="attention" onClick={e => this.addAttention(e, dataTarget.userId || 0, this.fetchTargetUserInfo)}>+关注</button>
                )
                const bottom = (
                    isLogin
                        ?
                        button
                        :
                        null
                )
                return (
                    dataTarget &&
                    <div className="focus">
                        <div className="detail fl" onClick={e => this.handleShowAppTip(e)}>
                            <div className="img fl pr">
                                <img src={formatUserAvatar(dataTarget.avatarUrl)} onError={this.errorImgAvatar} />
                            </div>
                            <div className="info fl">
                                <div className="p1 clearfix">
                                    <span className="name fl txt-cut">{dataTarget.nickName || ''}</span>
                                </div>
                                <div className="p1 clearfix">
                                    <span className="level sex fl">
                                        <img src={dataTarget.sex === 1 ? `${urlCdnKuxiu}/icon_man.png` : `${urlCdnKuxiu}/icon_woman.png`} alt='' />
                                    </span>
                                    <span className='level fl'>
                                        <img src={`${urlCdnLvUser}/user${dataTarget.userLevel || 0}.png`} alt='' />
                                    </span>
                                    {
                                        dataTarget.isAnchor === 1
                                            ?
                                            <span className='level fl'>
                                                <img src={`${urlCdnLvAnchor}/anchor${dataTarget.anchorLevel || 0}.png`} alt='' />
                                            </span>
                                            :
                                            null
                                    }
                                </div>
                                <div className="p2">
                                    酷秀ID:&nbsp;{dataTarget.userId || ''}
                                </div>
                                <div className="content">
                                    <div className="fl"><img src={focus} alt='' /><span className="highlight">{dataTarget.attentionCount || 0}</span><span>关注</span></div>
                                    <div className="fr"><img src={fans} alt='' /><span className="highlight">{dataTarget.fansCount || 0}</span><span>粉丝</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-focus">
                            {bottom}
                            <button type="button" className={isLogin ? "close is-login" : "close"} onClick={e => this.handleDrawerClose(e)}>收起</button>
                        </div>
                    </div>
                )
            case 'areaCode':
                return (
                    <div className="area-code">
                        <div className="title">选择国家地区</div>
                        <SpringScrollbars style={{ height: 'calc(100vh - 140px)', width: '100%' }} universal={true}>
                            {
                                areaCodeArray.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <div className="name">{item.name}</div>
                                            <ul>
                                                {
                                                    item.value.map((itemInner, indexInner) => {
                                                        return (
                                                            <li key={indexInner} onClick={e => this.handleSelectAreaCode(e, itemInner)}>
                                                                <div>
                                                                    <span className="fl">{itemInner.name}</span>
                                                                    <span className="fr">+{itemInner.value}</span>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </Fragment>
                                    )
                                })
                            }
                        </SpringScrollbars>
                    </div>
                )
            case 'login':
                const { areaCode, loginType, mobile, code, password, passwordType, sendBtnEnable, countDown } = this.state
                let value
                let btn
                switch (loginType) {
                    case 'login':
                        value = '登录'
                        btn = <button type='button' className={mobile && password ? 'active' : 'inactive'} onClick={e => this.login(e)}>{value}</button>
                        break
                    case 'register':
                        value = '注册'
                        btn = <button type='button' className={mobile && password && code ? 'active' : 'inactive'} onClick={e => this.register(e)}>{value}</button>
                        break
                    case 'resetPassword':
                        value = '重置密码'
                        btn = <button type='button' className={mobile && password && code ? 'active' : 'inactive'} onClick={e => this.resetPassword(e)}>{value}</button>
                        break
                    default:
                        break
                }
                return (
                    <div className="login">
                        <div className="logo"></div>
                        <div className="title">
                            {
                                loginType === 'login' || loginType === 'register'
                                    ?
                                    <Fragment>
                                        <span className={loginType === 'login' ? 'select' : ''} onClick={e => this.handleChangeLogin(e)}>登录</span>
                                        <span></span>
                                        <span className={loginType === 'register' ? 'select' : ''} onClick={e => this.handleChangeRegister(e)}>注册</span>
                                    </Fragment>
                                    :
                                    <span>重置密码</span>
                            }
                        </div>
                        <div className="content">
                            <div className="input">
                                <span onClick={e => this.handleDrawerAreaCodeOpen(e)}>{`+${areaCode}`}
                                    <i className="iconfont icon-arrow-down"></i>
                                </span>
                                <input autoComplete="off" value={mobile} onChange={this.handleChangeMobile} type="text" maxLength='11' placeholder="输入手机号" />
                            </div>
                            {
                                loginType === 'register' || loginType === 'resetPassword'
                                    ?
                                    <div className="half-input">
                                        <input autoComplete="off" value={code} type="text" maxLength='6' placeholder="输入验证码" onChange={this.handleChangeCode} />
                                        {
                                            loginType === 'register'
                                                ?
                                                <button type='button' className={sendBtnEnable ? "code" : "code done"} onClick={e => this.checkMobile(e, 1, this.sendVerificationCode)}>{sendBtnEnable ? '获取验证码' : `重新发送${countDown}s`}</button>
                                                :
                                                <button type='button' className={sendBtnEnable ? "code" : "code done"} onClick={e => this.sendVerificationCode(e, 3)}>{sendBtnEnable ? '获取验证码' : `重新发送${countDown}s`}</button>
                                        }
                                    </div>
                                    :
                                    null
                            }
                            <input autoComplete="off" value={password} type={passwordType} maxLength='18' placeholder="输入密码(6-18位数字或英文)" onChange={this.handleChangePassword} />
                            <span className='img-eye-box' onClick={e => this.handleChangePasswordType(e)}>
                                <img src={passwordType === 'password' ? eye : eye_open} alt='' />
                            </span>
                            {btn}
                            <div className="other">
                                {
                                    loginType === 'login' || loginType === 'register'
                                        ?
                                        <span className="fl" onClick={e => this.handleChangeResetPassword(e)}>
                                            忘记密码
                                        </span>
                                        :
                                        <Fragment>
                                            <span className="fl" onClick={e => this.handleChangeLogin(e)}>
                                                去登录
                                            </span>
                                            <span className="fr" onClick={e => this.handleChangeRegister(e)}>
                                                去注册
                                            </span>
                                        </Fragment>
                                }
                            </div>
                            <div className="third-login-title">其他登录方式</div>
                            <div className="third-login">
                                <span className="span-1">
                                    <img src={wechat} onClick={e => this.handleDrawerWechatOpen(e)} alt='' />
                                </span>
                                <span className="span-1">
                                    <img src={qq} onClick={e => this.handleDrawerQqOpen(e)} alt='' />
                                </span>
                            </div>
                            <div className="third-login second">
                                <span className="span-2">微信登录</span>
                                <span className="span-2">QQ登录</span>
                            </div>
                        </div>
                    </div>
                )
            case 'personal':
                const { kuCoin } = this.state
                return (
                    dataUser &&
                    <div className="focus">
                        <div className="detail fl" onClick={e => this.handleShowAppTip(e)}>
                            <div className="img fl pr">
                                <img src={formatUserAvatar(dataUser.avatarUrl)} onError={this.errorImgAvatar} />
                            </div>
                            <div className="info fl">
                                <p className="p1 clearfix">
                                    <span className="xu_name fl txt-cut">{dataUser.nickName || ''}</span>
                                </p>
                                <p className="p1 clearfix">
                                    <span className="level sex fl">
                                        <img src={dataUser.sex === 1 ? `${urlCdnKuxiu}/icon_man.png` : `${urlCdnKuxiu}/icon_woman.png`} alt='' />
                                    </span>
                                    <span className='level fl'>
                                        <img src={`${urlCdnLvUser}/user${dataUser.userLevel || 0}.png`} alt='' />
                                    </span>
                                    {
                                        dataUser.isAnchor === 1
                                            ?
                                            <span className='level fl'>
                                                <img src={`${urlCdnLvAnchor}/anchor${dataUser.anchorLevel || 0}.png`} alt='' />
                                            </span>
                                            :
                                            null
                                    }
                                </p>
                                <p className="p2">
                                    酷秀ID:&nbsp;{dataUser.userId || ''}
                                </p>
                                <p className="content">
                                    <div className="fl"><img src={focus} alt='' /><span className="highlight">{dataUser.attentionCount || 0}</span><span>关注</span></div>
                                    <div className="fr"><img src={fans} alt='' /><span className="highlight">{dataUser.fansCount || 0}</span><span>粉丝</span></div>
                                </p>
                            </div>
                        </div>
                        <div className="bottom-box">
                            <p className="bottom">
                                <div className="fl">我的酷币：{kuCoin || 0}</div>
                                <div className="fr payment" onClick={this.handleGoRecharge}>
                                    <a target="_blank" href={!isPreEnv ? `/pay-start?channel=${channel}` : `/web/kuxiu/pay-start?channel=${channel}`}>充值</a>
                                </div>
                            </p>
                        </div>
                        <div className="btn-focus">
                            <button type='button' className="logout" onClick={e => this.logout(e)}>退出登录</button>
                        </div>
                    </div>
                )
            case 'qq':
                let redirect
                if (!isPreEnv) {
                    redirect = encodeURIComponent(`${protocol}//www.17kuxiu.com/third-login?source=qq&channel=${channel}&fromHost=${host}`)
                } else {
                    redirect = encodeURIComponent(`${protocol}//pre.17kuxiu.com/web/kuxiu/third-login?source=qq&channel=${channel}&fromHost=${host}`)
                }
                return (
                    <iframe title='QQ登录' scrolling="no" name="_blank" id="_blank" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={`https://graph.qq.com/oauth2.0/show?display=pc&which=Login&display=pc&response_type=code&client_id=101508256&redirect_uri=${redirect}&scope=get_user_info`} style={{ width: '434px', height: "100%" }}></iframe>
                )
            case 'wechat':
                if (!isPreEnv) {
                    redirect = encodeURIComponent(`${protocol}//www.17kuxiu.com/third-login?source=wechat&channel=${channel}&fromHost=${host}`)
                    return (
                        <iframe title='微信登录' scrolling="no" name="_blank" id="_blank" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={`https://open.weixin.qq.com/connect/qrconnect?appid=wxfab5ae6702b51286&redirect_uri=${redirect}&scope=snsapi_login`} style={{ width: '375px', height: "100%", background: '#f5f5f5', paddingTop: '20px' }}></iframe>
                    )
                } else {
                    redirect = encodeURIComponent(`${protocol}//pre.17kuxiu.com/web/kuxiu/third-login?source=wechat&channel=${channel}&fromHost=${host}`)
                    return (
                        <iframe title='微信登录' scrolling="no" name="_blank" id="_blank" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={`https://open.weixin.qq.com/connect/qrconnect?appid=wx54c074f879c18f2b&redirect_uri=${redirect}&scope=snsapi_login`} style={{ width: '375px', height: "100%", background: '#f5f5f5', paddingTop: '20px' }}></iframe>
                    )
                }
            case 'service':
                const { message, serviceList } = this.state;
                return (
                    <div className="service">
                        <div className="title">
                            <span>在线客服</span>
                            <span className="subtitle">（周一至周日09:00-21:00）</span>
                        </div>
                        <SpringScrollbars style={{ height: 'calc(100vh - 177px)', width: '100%', marginBottom: '10px' }} universal={true} ref={this.scrollbarRef}>
                            <div className="content">
                                <div className="item fl">
                                    <div className="det-1">
                                        <img src={logo} alt='' />
                                        <span>在线客服为您服务</span>
                                    </div>
                                    <div className="det-2 fl">
                                        <span className="arrow"></span>
                                        欢迎来到酷秀直播，请说明您的问题，我将竭诚为您服务。温馨提示：热线电话021-6888-3887，服务时间周一至周日09：00-21：00
                                    </div>
                                </div>
                                <div className="item fl">
                                    <span className="det-1">
                                        <img src={logo} alt='' />
                                        <span>在线客服：酷秀001</span>
                                    </span>
                                    <div className="det-2 fl">
                                        <span className="arrow"></span>
                                        欢迎来到酷秀直播，我是酷秀客服001，很高兴为您服务！
                                    </div>
                                </div>
                                {
                                    serviceList.map((item, index) => {
                                        let time;
                                        const isEqual = lastCreateTime && lastCreateTime === item.createTime;
                                        if (!isEqual) {
                                            time = moment(item.createTime || '').format('YYYY-MM-DD HH:mm:ss');
                                        }
                                        lastCreateTime = item.createTime
                                        return (
                                            <Fragment key={index}>
                                                {
                                                    !isEqual
                                                        ?
                                                        <div className="time fl">{time || ''}</div>
                                                        :
                                                        null
                                                }
                                                {
                                                    item.fromId === 0
                                                        ?
                                                        <div className="item fl">
                                                            <div className="det-1">
                                                                <img src={logo} alt='' />
                                                                <span>在线客服_酷秀001</span>
                                                            </div>
                                                            <div className="det-2 fl">
                                                                <span className="arrow"></span>
                                                                {uncodeUtf16(item.message) || ''}
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="item-user fr">
                                                            <span className="fr">
                                                                <img src={formatUserAvatar(dataUser.avatarUrl)} onError={this.errorImgAvatar} />
                                                            </span>
                                                            <span className="det fr">
                                                                <span className="arrow"></span>
                                                                {uncodeUtf16(item.message) || ''}
                                                            </span>
                                                        </div>
                                                }
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        </SpringScrollbars>
                        <div className="btn-send">
                            <input maxLength={500} onKeyUp={e => this.handleKeyUpServiceMsg(e)} value={message} type="text" placeholder="请输入内容" onChange={e => this.handleChangeMessage(e)} />
                            <button type="button" className="send" onClick={e => this.sendServiceMsg(e)}>发送</button>
                        </div>
                    </div>
                )
            default:
                return null;
        }
    }

    render() {
        const { dotShow, searchList, searchListTotal, keywords, modalSearchShow, pageIndex, tipsShow, tipsContent, isLogin, userRankType, anchorRankType, dataUser, hotLiveTopList, hotLiveList, freshAnchorList, hotSearchList, anchorDayRankList, anchorWeekRankList, anchorMonthRankList, userDayRankList, userWeekRankList, userMonthRankList, drawerOpen, drawerType, drawerOpenOther, mainOpacity, drawerTypeOther, browserTipShow, payTipShow } = this.state
        drawer = this.renderDrawer(drawerType)
        drawerOther = this.renderDrawer(drawerTypeOther)
        let anchorRankList
        let userRankList
        switch (userRankType) {
            case 'DAY':
                userRankList = userDayRankList
                break;
            case 'WEEK':
                userRankList = userWeekRankList
                break;
            case 'MONTH':
                userRankList = userMonthRankList
                break;
            default:
                break;
        }
        switch (anchorRankType) {
            case 'DAY':
                anchorRankList = anchorDayRankList
                break;
            case 'WEEK':
                anchorRankList = anchorWeekRankList
                break;
            case 'MONTH':
                anchorRankList = anchorMonthRankList
                break;
            default:
                break;
        }
        return (
            <Fragment>
                <SpringScrollbars onScrollFrame={e => this.handleScrollFrame(e)} autoHeight autoWidth autoHide autoWidthMin={0} autoWidthMax='100vw' autoHeightMin={0} autoHeightMax='100vh' universal={true}>
                    {
                        // shortcutShow
                        //     ?
                        //     <div className="shortcut">
                        //         <span>
                        //             <a href="javascript:;" className="close" title="关闭" onClick={e => this.handleShortcutHide(e)}>关闭</a>
                        //         </span>
                        //         您经常访问 酷秀直播-演绎无限可能，试试添加到桌面，访问更方便！
                        //         <a href="javascript:;" className="content" onClick={e => this.handleShortcutModalShow(e)}>添加 酷秀直播-演绎无限可能 到桌面</a>
                        //     </div>
                        //     :
                        //     null
                    }
                    <div className="header" style={{ opacity: mainOpacity }}>
                        <div className="nav">
                            <div className="logo fl">
                                <span className="db height100" onClick={e => this.handleGoIndex(e)}></span>
                            </div>
                            <div className="content fl clearfix pr">
                                <div className="search fl">
                                    <input type="search" onChange={e => this.handleChangeSearch(e)} value={keywords} className="search-content" placeholder="请输入用户昵称或用户ID" />
                                    <span style={{ visibility: keywords ? 'visible' : 'hidden' }} className="cancel fl" onClick={this.handleCancelSearch}><img src={close_circle} alt='' /></span>
                                    <span type="submit" className="submit" onClick={loginStatus ? this.fetchSearchList : this.guestFetchSearchList}></span>
                                    <Modal
                                        isOpen={modalSearchShow}
                                        onRequestClose={this.handleCancelSearch}
                                        shouldFocusAfterRender={false}
                                        shouldReturnFocusAfterClose={false}
                                        ariaHideApp={false}
                                        className='modal-search'
                                        overlayClassName="overlay-1"
                                    >
                                        <div className="content-box">
                                            <div className="title">
                                                <span className="fl">共&nbsp;<em>{searchListTotal.length || 0}</em>&nbsp;个搜索结果</span>
                                                <span className="fr"><img onClick={this.handleCancelSearch} src={close_circle} alt='' /></span>
                                            </div>
                                            <ul className="content">
                                                {
                                                    searchList.map((item, index) => {
                                                        return (
                                                            item.status === 1
                                                                ?
                                                                <li key={index}>
                                                                    <a target="_blank" href={!isPreEnv ? `/live?anchorId=${item.userId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.userId}&channel=${channel}`} className="db height100">
                                                                        <span onClick={e => this.handleGoLive(e, item)}>
                                                                            <div className="img fl pr">
                                                                                <img src={formatUserAvatar(item.avatarUrl)} onError={this.errorImgAvatar} />
                                                                                <span className="surface-box type2"></span>
                                                                                <span className="surface type2 fr">
                                                                                    <span className="surface1 surface-detail fl"></span>
                                                                                    <span className="surface2 surface-detail fl"></span>
                                                                                    <span className="surface3 surface-detail fl"></span>
                                                                                </span>
                                                                            </div>
                                                                            <div className="info fl">
                                                                                <p className="clearfix">
                                                                                    <span className="name fl txt-cut">{item.nickName || ''}</span>
                                                                                </p>
                                                                                <p className="clearfix">
                                                                                    <span className="level sex fl">
                                                                                        <img src={item.sex === 1 ? `${urlCdnKuxiu}/icon_man.png` : `${urlCdnKuxiu}/icon_woman.png`} alt='' />
                                                                                    </span>
                                                                                    <span className='level fl'>
                                                                                        <img src={`${urlCdnLvUser}/user${item.userLevel || 0}.png`} alt='' />
                                                                                    </span>
                                                                                    {
                                                                                        item.isAnchor === 1
                                                                                            ?
                                                                                            <span className='level fl'>
                                                                                                <img src={`${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`} alt='' />
                                                                                            </span>
                                                                                            :
                                                                                            null
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                :
                                                                <li key={index}>
                                                                    <span onClick={e => this.handleShowTargetUserInfo(e, item)}>
                                                                        <div className="img fl pr">
                                                                            <img src={formatUserAvatar(item.avatarUrl)} onError={this.errorImgAvatar} />
                                                                        </div>
                                                                        <div className="info fl">
                                                                            <p className="clearfix">
                                                                                <span className="name fl txt-cut">{item.nickName || ''}</span>
                                                                            </p>
                                                                            <p className="clearfix">
                                                                                <span className="level sex fl">
                                                                                    <img src={item.sex === 1 ? `${urlCdnKuxiu}/icon_man.png` : `${urlCdnKuxiu}/icon_woman.png`} alt='' />
                                                                                </span>
                                                                                <span className='level fl'>
                                                                                    <img src={`${urlCdnLvUser}/user${item.userLevel || 0}.png`} alt='' />
                                                                                </span>
                                                                                {
                                                                                    item.isAnchor === 1
                                                                                        ?
                                                                                        <span className='level fl'>
                                                                                            <img src={`${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`} alt='' />
                                                                                        </span>
                                                                                        :
                                                                                        null
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </span>
                                                                    {
                                                                        item.status === 3
                                                                            ?
                                                                            <button type='button' className="focus-btn" onClick={e => this.addAttentionForSearch(e, item.userId || 0, index, this.updateSearchResult)}>
                                                                                关注
                                                                            </button>
                                                                            :
                                                                            null
                                                                    }
                                                                </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <div className="page">
                                                {
                                                    searchListTotal.length > 10
                                                        ?
                                                        <Fragment>
                                                            <span onClick={e => this.handleChangeSearchIndex(e, 0)} className={pageIndex === 0 ? "on" : null}>1</span>
                                                            <span onClick={e => this.handleChangeSearchIndex(e, 1)} className={pageIndex === 1 ? "on" : null}>2</span>
                                                            <span onClick={e => this.handleChangeSearchIndex(e, pageIndex === 0 ? 1 : 0)}>{pageIndex === 0 ? '下一页' : '上一页'}</span>
                                                        </Fragment>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                                <div className="download fl tr pr">
                                    <i className="iconfont icon-qrcode"></i>
                                    <span>下载</span>
                                    <div className="download-box pa">
                                        <div className="download-qrcode fl">
                                            <img src={qrcode} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="nav-btn fl tr pr" onClick={this.handleGoRecharge}>
                                    <span className="btn">
                                        <a target="_blank" href={!isPreEnv ? `/pay-start?channel=${channel}` : `/web/kuxiu/pay-start?channel=${channel}`}>
                                            <i className="iconfont icon-recharge mr10"></i>充值
                                        </a>
                                    </span>
                                </div>
                                <div className={drawerType === 'focusList' ? "nav-btn select fl tr pr" : "nav-btn fl tr pr"} onClick={e => this.handleShowFocusList(e)}>
                                    <i className="iconfont icon-focus-default"></i>
                                    <span className="btn">关注</span>
                                </div>
                                <div className={drawerType === 'service' ? "nav-btn select fl tr pr" : "nav-btn fl tr pr"} onClick={e => this.handleShowService(e)}>
                                    <i className="iconfont icon-service"></i>
                                    <span className="btn">客服
                                    {
                                            dotShow
                                                ?
                                                <span className="red-dot"></span>
                                                :
                                                null
                                        }
                                    </span>
                                </div>
                                {
                                    isLogin
                                        ?
                                        <div className="login-user fl pr db" onClick={e => this.handleShowPersonal(e)}>
                                            <div className="avatar fl">
                                                <img src={formatUserAvatar(dataUser.avatarUrl)} onError={this.errorImgAvatar} />
                                            </div>
                                            <div className={drawerType === 'personal' ? "name select tr fl txt-cut" : "name tr fl txt-cut"}>{dataUser.nickName || ''}</div>
                                        </div>
                                        :
                                        <div className={drawerType === 'login' ? "nav-btn select fl tr pr" : "nav-btn fl tr pr"} onClick={e => this.handleDrawerLoginOpen(e)}>
                                            <span className="btn">登录</span>&nbsp;/&nbsp;
                                            <span>注册</span>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="index" style={{ opacity: mainOpacity }}>
                        <div className="main">
                            <div className="main-box">
                                <div className="main-left main-width1 fl">
                                    <div className="top-hot">
                                        <ul>
                                            {
                                                hotLiveTopList.map((item, index) => {
                                                    return (
                                                        index === 0
                                                            ?
                                                            <li className="live-box top fl pr" key={index} onClick={e => this.handleGoLive(e, item)}>
                                                                <a target="_blank" className="db height100" href={!isPreEnv ? `/live?anchorId=${item.anchorId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.anchorId}&channel=${channel}`}>
                                                                    <img className="live-img-box" src={formatLiveCover(item.livingImg)} onError={this.errorImgCover} />
                                                                    <div className="live-state pa">
                                                                        <i className="iconfont icon-dot dot"></i>
                                                                        <span>直播中</span>
                                                                    </div>
                                                                    <div className="mark pa">
                                                                        <div className="username clearfix">
                                                                            <span className="distance fr">
                                                                                <span className="person-box">
                                                                                    <img src={person_white} alt='' />
                                                                                </span>
                                                                                {item.audienceNum || 0}
                                                                            </span>
                                                                            <span className="name fl">
                                                                                <span className="txt-cut fl aa">{item.nickname || ''}</span>
                                                                            </span>
                                                                        </div>
                                                                        <div className="title-box">
                                                                            <span className="title fl txt-cut">{item.slogan || ''}</span>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            :
                                                            <li className="live-box fl pr" key={index} onClick={e => this.handleGoLive(e, item)}>
                                                                <a target="_blank" className="db height100" href={!isPreEnv ? `/live?anchorId=${item.anchorId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.anchorId}&channel=${channel}`}>
                                                                    <img className="live-img-box" src={formatLiveCover(item.livingImg)} onError={this.errorImgCover} />
                                                                    <div className="live-state pa">
                                                                        <i className="iconfont icon-dot dot"></i>
                                                                        <span>直播中</span>
                                                                    </div>
                                                                    <div className="live-hover pa dn">
                                                                        <span>
                                                                            <div className="head">
                                                                                <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} />
                                                                            </div>
                                                                            <div className="nickname txt-cut tc">{item.nickname || ''}</div>
                                                                            <div className="address tc">
                                                                                <span>
                                                                                    {item.distance.replace('M', 'm') || ''}
                                                                                    &nbsp;<em></em>&nbsp;
                                                                                        <span className="person-box">
                                                                                        <img src={person_white} alt='' />
                                                                                    </span>
                                                                                    {item.audienceNum || 0}
                                                                                </span>
                                                                            </div>
                                                                            <div className="title txt-cut tc">{item.slogan || ''}</div>
                                                                        </span>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="fresh">
                                        <div className="title">
                                            <span>
                                                <img src={fresh} alt='' />
                                            </span>
                                            <span>新人推荐</span>
                                        </div>
                                        <ul>
                                            {
                                                freshAnchorList.map((item, index) => {
                                                    return (
                                                        <li className="fresh-box fl" key={index} onClick={e => this.handleGoLive(e, item)}>
                                                            <a target="_blank" href={!isPreEnv ? `/live?anchorId=${item.anchorId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.anchorId}&channel=${channel}`} className="db height100">
                                                                <div className="img-box pr">
                                                                    <img src={formatLiveCover(item.livingImg)} onError={this.errorImgCover} />
                                                                    {
                                                                        item.status === 1
                                                                            ?
                                                                            <div className="live-state pa">
                                                                                <i className="iconfont icon-dot dot"></i>
                                                                                <span>直播中</span>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                </div>
                                                                <div className="msg">
                                                                    <p className="txt-cut clearfix">{item.nickname || ''}</p>
                                                                    <p className="txt-cut">
                                                                        {item.distance.replace('M', 'm') || ''}
                                                                        &nbsp;<em></em>&nbsp;
                                                                        <span className="person-box">
                                                                            <img src={person_gray} alt='' />
                                                                        </span>
                                                                        {item.audienceNum || 0}
                                                                    </p>
                                                                    <p className="live-title txt-cut">{item.slogan || ''}</p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="rank-list fl">
                                    <div className="title">
                                        <p className={anchorRankType === 'MONTH' ? "fr click_c month" : "fr month"} onClick={e => this.handleChangeAnchorRank(e, 'MONTH')}>
                                            <span>月</span>
                                        </p>
                                        <p className="fr line">|</p>
                                        <p className={anchorRankType === 'WEEK' ? "fr click_c" : "fr"} onClick={e => this.handleChangeAnchorRank(e, 'WEEK')}>
                                            <span>周</span>
                                        </p>
                                        <p className="fr line">|</p>
                                        <p className={anchorRankType === 'DAY' ? "fr click_c" : "fr"} onClick={e => this.handleChangeAnchorRank(e, 'DAY')}>
                                            <span>日</span>
                                        </p>
                                        <img src={sun_rank} alt='' />阳光榜
                                    </div>
                                    <ul className="list">
                                        {
                                            anchorRankList.length > 0
                                                ?
                                                anchorRankList.map((item, index) => {
                                                    let img
                                                    let className
                                                    switch (index) {
                                                        case 0:
                                                            img = first
                                                            break
                                                        case 1:
                                                            img = second
                                                            break
                                                        case 2:
                                                            img = third
                                                            break
                                                        default:
                                                            if (index >= 9) {
                                                                className = 'medal fl type2'
                                                            } else {
                                                                className = 'medal fl type1'
                                                            }
                                                            break
                                                    }
                                                    return (
                                                        item.status === 1
                                                            ?
                                                            <li key={index} onClick={e => this.handleGoLive(e, item)}>
                                                                <a target="_blank" href={!isPreEnv ? `/live?anchorId=${item.anchorId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.anchorId}&channel=${channel}`} className="db height100">
                                                                    {
                                                                        index === 0 || index === 1 || index === 2
                                                                            ?
                                                                            <div className="img-box fl"><img className="link fl" src={img} alt='' /></div>
                                                                            :
                                                                            <div className={className}>{index + 1}</div>
                                                                    }
                                                                    <div className="detail fl">
                                                                        <div className="img fl pr">
                                                                            <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} />
                                                                            <span className="surface-box type1"></span>
                                                                            <span className="surface type1 fr">
                                                                                <span className="surface1 surface-detail fl"></span>
                                                                                <span className="surface2 surface-detail fl"></span>
                                                                                <span className="surface3 surface-detail fl"></span>
                                                                            </span>
                                                                        </div>
                                                                        <div className="info fl">
                                                                            <p className="p1 clearfix">
                                                                                <span className="name fl txt-cut">{item.nickName || ''}</span>
                                                                                <span className='level fl'>
                                                                                    <img src={`${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`} alt='' />
                                                                                </span>
                                                                            </p>
                                                                            <p className="p2">
                                                                                <span>
                                                                                    <img src={sun} alt='' />
                                                                                </span>{item.totalSunlight || 0}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            :
                                                            <li key={index} onClick={e => this.handleShowTargetUserInfo(e, item)}>
                                                                {
                                                                    index === 0 || index === 1 || index === 2
                                                                        ?
                                                                        <div className="img-box"><img className="fl" src={img} alt='' /></div>
                                                                        :
                                                                        <div className={className}>{index + 1}</div>
                                                                }
                                                                <div className="detail fl">
                                                                    <div className="img fl pr">
                                                                        <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} />
                                                                    </div>
                                                                    <div className="info fl">
                                                                        <p className="p1 clearfix">
                                                                            <span className="name fl txt-cut">{item.nickName || ''}</span>
                                                                            <span className='level fl'>
                                                                                <img src={`${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`} alt='' />
                                                                            </span>
                                                                        </p>
                                                                        <p className="p2">
                                                                            <span>
                                                                                <img src={sun} alt='' />
                                                                            </span>{item.totalSunlight || 0}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                    )
                                                })
                                                :
                                                <Fragment>
                                                    <div className="empty-box">
                                                        <img src={rank_empty} alt='' />
                                                    </div>
                                                    <div className="empty-content">
                                                        还没有人占领榜单，赶紧开播成为榜一吧！
                                                    </div>
                                                </Fragment>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="main-second">
                                <div className="section-left main-width1 fl">
                                    {
                                        hotSearchList.length > 0
                                        &&
                                        <div className="recommend">
                                            <div className="title">
                                                <span>
                                                    <img src={focus} alt='' />
                                                </span>
                                                <span>优质推荐</span>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    {
                                                        hotSearchList.map((item, index) => {
                                                            return (
                                                                <li key={index} className="content-list fl" onClick={e => this.handleGoLive(e, item)}>
                                                                    <a target="_blank" href={!isPreEnv ? `/live?anchorId=${item.anchorId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.anchorId}&channel=${channel}`} className="db height100">
                                                                        <div className="box-img pr">
                                                                            <LazyLoad overflow throttle={100} height={160}>
                                                                                <img src={formatLiveCover(item.livingImg)} onError={this.errorImgCover} />
                                                                            </LazyLoad>
                                                                            <div className="live-state pa">
                                                                                <i className="iconfont icon-dot dot"></i>
                                                                                <span>直播中</span>
                                                                            </div>
                                                                            <div className="mark pa">
                                                                                <span className="mark-live pa"></span>
                                                                                <p className="txt-cut">{item.slogan || ''}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="box-msg">
                                                                            <div className="msg-left fl txt-cut">
                                                                                {item.nickName || ''}
                                                                            </div>
                                                                            <div className="msg-right fr txt-cut">
                                                                                <span className="person-box-search">
                                                                                    <img className="search-img" src={person_gray} alt='' />
                                                                                </span>
                                                                                {item.audienceSize || 0}
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="rank-list second fl">
                                    <div className="title">
                                        <p className={userRankType === 'MONTH' ? "fr click_c month" : "fr month"} onClick={e => this.handleChangeUserRank(e, 'MONTH')}>
                                            <span>&nbsp;&nbsp;月&nbsp;&nbsp;</span>
                                        </p>
                                        <p className="fr line">|</p>
                                        <p className={userRankType === 'WEEK' ? "fr click_c" : "fr"} onClick={e => this.handleChangeUserRank(e, 'WEEK')}>
                                            <span>周</span>
                                        </p>
                                        <p className="fr line">|</p>
                                        <p className={userRankType === 'DAY' ? "fr click_c" : "fr"} onClick={e => this.handleChangeUserRank(e, 'DAY')}>
                                            <span>日</span>
                                        </p>
                                        <img src={devote_rank} alt='' />贡献榜
                                    </div>
                                    <ul className="list">
                                        {
                                            userRankList.length > 0
                                                ?
                                                userRankList.map((item, index) => {
                                                    let img
                                                    let className
                                                    switch (index) {
                                                        case 0:
                                                            img = first
                                                            break
                                                        case 1:
                                                            img = second
                                                            break
                                                        case 2:
                                                            img = third
                                                            break
                                                        default:
                                                            if (index >= 9) {
                                                                className = 'medal fl type2'
                                                            } else {
                                                                className = 'medal fl type1'
                                                            }
                                                            break
                                                    }
                                                    return (
                                                        item.status === 1
                                                            ?
                                                            <li key={index} onClick={e => this.handleGoLive(e, item)}>
                                                                <a target="_blank" href={!isPreEnv ? `/live?anchorId=${item.userId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.userId}&channel=${channel}`} className="db height100">
                                                                    {
                                                                        index === 0 || index === 1 || index === 2
                                                                            ?
                                                                            <div className="img-box"><img className="fl" src={img} alt='' /></div>
                                                                            :
                                                                            <div className={className}>{index + 1}</div>
                                                                    }
                                                                    <div className="detail fl">
                                                                        <div className="img fl pr">
                                                                            <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} />
                                                                            <span className="surface-box type1"></span>
                                                                            <span className="surface type1 fr">
                                                                                <span className="surface1 surface-detail fl"></span>
                                                                                <span className="surface2 surface-detail fl"></span>
                                                                                <span className="surface3 surface-detail fl"></span>
                                                                            </span>
                                                                        </div>
                                                                        <div className="info fl">
                                                                            <p className="p1 clearfix">
                                                                                <span className="name fl txt-cut">{item.nickName || ''}</span>
                                                                                <span className='level fl'>
                                                                                    <img src={`${urlCdnLvUser}/user${item.userLevel || 0}.png`} alt='' />
                                                                                </span>
                                                                            </p>
                                                                            <p className="p2">
                                                                                <span>
                                                                                    <img src={coin} alt='' />
                                                                                </span>{item.totalKucoin || 0}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            :
                                                            <li key={index} onClick={e => this.handleShowTargetUserInfo(e, item)}>
                                                                {
                                                                    index === 0 || index === 1 || index === 2
                                                                        ?
                                                                        <div className="img-box"><img className="fl" src={img} alt='' /></div>
                                                                        :
                                                                        <div className={className}>{index + 1}</div>
                                                                }
                                                                <div className="detail fl">
                                                                    <div className="img fl pr">
                                                                        <LazyLoad overflow throttle={100} height={48}>
                                                                            <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} />
                                                                        </LazyLoad>
                                                                    </div>
                                                                    <div className="info fl">
                                                                        <p className="p1 clearfix">
                                                                            <span className="name fl txt-cut">{item.nickName || ''}</span>
                                                                            <span className='level fl'>
                                                                                <img src={`${urlCdnLvUser}/user${item.userLevel || 0}.png`} alt='' />
                                                                            </span>
                                                                        </p>
                                                                        <p className="p2">
                                                                            <span>
                                                                                <img src={coin} alt='' />
                                                                            </span>{item.totalKucoin || 0}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                    )
                                                })
                                                :
                                                <Fragment>
                                                    <div className="empty-box">
                                                        <img src={rank_empty} alt='' />
                                                    </div>
                                                    <div className="empty-content">
                                                        还没有人占领榜单，赶紧打赏小主成为榜一吧！
                                                    </div>
                                                </Fragment>

                                        }
                                    </ul>
                                </div>
                            </div>
                            {
                                hotLiveList.length > 0
                                &&
                                <div className="hot-list main-width2">
                                    <div className="title">
                                        <span>
                                            <img src={hot} alt='' />
                                        </span>
                                        <span>热门列表</span>
                                    </div>
                                    <div className="content clearfix">
                                        <ul>
                                            {
                                                hotLiveList.map((item, index) => {
                                                    return (
                                                        <li key={index} className="content-list fl" onClick={e => this.handleGoLive(e, item)}>
                                                            <a target="_blank" href={!isPreEnv ? `/live?anchorId=${item.anchorId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${item.anchorId}&channel=${channel}`} className="db height100">
                                                                <div className="box-img pr">
                                                                    <LazyLoad overflow throttle={100} height={160}>
                                                                        <img src={formatLiveCover(item.livingImg)} onError={this.errorImgCover} />
                                                                    </LazyLoad>
                                                                    <div className="live-state pa">
                                                                        <i className="iconfont icon-dot dot"></i>
                                                                        <span>直播中</span>
                                                                    </div>
                                                                    <div className="mark pa">
                                                                        <span className="live-mark pa"></span>
                                                                        <p className="txt-cut tc">{item.slogan || ''}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="box-msg">
                                                                    <div className="msg-left fl txt-cut">
                                                                        {item.nickname || ''}
                                                                    </div>
                                                                    <div className="msg-right fr txt-cut">
                                                                        <span className="person-box">
                                                                            <img src={person_gray} alt='' />
                                                                        </span>
                                                                        {item.audienceNum || 0}
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <Footer type='type1' host={host} statisticsUrl={statisticsUrl} />
                </SpringScrollbars>
                <Drawer
                    open={drawerOpen}
                    onMaskClick={this.handleDrawerClose}
                    handler={false}
                    level={null}
                    placement='right'
                    width={drawerType === 'service' ? '440px' : '375px'}
                    style={{ top: '70px' }}
                >
                    {
                        drawer
                    }
                    <div className="tips-warning type1" style={{ 'display': (tipsShow && (drawerOpen || drawerOpenOther) ? 'block' : 'none') }}>
                        <p dangerouslySetInnerHTML={{ __html: tipsContent || '' }}></p>
                    </div>
                </Drawer>
                <Drawer
                    open={drawerOpenOther}
                    onMaskClick={this.handleDrawerOtherClose}
                    handler={false}
                    level={null}
                    placement='right'
                    width={drawerTypeOther === 'qq' ? '434px' : '375px'}
                    style={{ top: '70px', zIndex: 10000 }}
                >
                    {
                        drawerOther
                    }
                </Drawer>
                <Modal
                    isOpen={browserTipShow}
                    onRequestClose={this.handleBrowserTipHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-browser zoom-appear'
                    overlayClassName="overlay"
                >
                    <BrowserTip onCloseModal={this.handleBrowserTipHide} />
                </Modal>
                <Modal
                    isOpen={payTipShow}
                    onRequestClose={this.handlePayTipHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-pay zoom-appear'
                    overlayClassName="overlay"
                >
                    <PayTip onCloseModal={this.handlePayTipHide} />
                </Modal>
                {
                    // <Modal
                    //     isOpen={shortcutModalShow}
                    //     onRequestClose={this.handleShortcutModalHide}
                    //     shouldFocusAfterRender={false}
                    //     shouldReturnFocusAfterClose={false}
                    //     ariaHideApp={false}
                    //     className='modal-shortcut zoom-appear'
                    //     overlayClassName="overlay"
                    // >
                    //     <div className='title'>添加桌面快捷</div>
                    //     <div className="right-btn close" onClick={this.handleShortcutModalHide}></div>
                    //     <div className='content'>1、点击<a href={isPreEnv ? '/web/kuxiu/酷秀直播.url' : '/酷秀直播.url'} download onClick={this.handleDownloadShortcut}>下载桌面快捷</a>，下载完成后，可移动文件到系统桌面</div>
                    //     <div className='content'>2、点击<a href={isPreEnv ? '/web/kuxiu/favicon.ico' : '/favicon.ico'} download>下载ICO图标</a>，下载完成后，右击桌面快捷文件->属性->更改图标，选择已下载的ICO图标即可</div>
                    //     <div className='bottom-box'>
                    //         <button type='button' className='bottom' onClick={this.handleShortcutModalHide}>确定</button>
                    //     </div>
                    // </Modal>
                }
                <div className="tips-warning" style={{ 'display': (tipsShow && !drawerOpen && !drawerOpenOther ? 'block' : 'none') }}>
                    <p dangerouslySetInnerHTML={{ __html: tipsContent || '' }}></p>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ rank, attention, live, login, mobile, search, service, user, asset, room }) => ({ rank, attention, live, login, mobile, search, service, user, asset, room })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRankList: bindActionCreators(fetchUserRankList, dispatch),
        guestFetchUserRankList: bindActionCreators(guestFetchUserRankList, dispatch),
        fetchAnchorRankList: bindActionCreators(fetchAnchorRankList, dispatch),
        guestFetchAnchorRankList: bindActionCreators(guestFetchAnchorRankList, dispatch),
        fetchAttentionList: bindActionCreators(fetchAttentionList, dispatch),
        fetchLiveAttentionList: bindActionCreators(fetchLiveAttentionList, dispatch),
        fetchHotLiveList: bindActionCreators(fetchHotLiveList, dispatch),
        guestFetchHotLiveList: bindActionCreators(guestFetchHotLiveList, dispatch),
        fetchHotSearchList: bindActionCreators(fetchHotSearchList, dispatch),
        guestFetchHotSearchList: bindActionCreators(guestFetchHotSearchList, dispatch),
        fetchFreshAnchorList: bindActionCreators(fetchFreshAnchorList, dispatch),
        guestFetchFreshAnchorList: bindActionCreators(guestFetchFreshAnchorList, dispatch),
        login: bindActionCreators(login, dispatch),
        register: bindActionCreators(register, dispatch),
        checkMobile: bindActionCreators(checkMobile, dispatch),
        resetPassword: bindActionCreators(resetPassword, dispatch),
        sendVerificationCode: bindActionCreators(sendVerificationCode, dispatch),
        loginByToken: bindActionCreators(loginByToken, dispatch),
        fetchSearchList: bindActionCreators(fetchSearchList, dispatch),
        guestFetchSearchList: bindActionCreators(guestFetchSearchList, dispatch),
        fetchServiceList: bindActionCreators(fetchServiceList, dispatch),
        sendServiceMsg: bindActionCreators(sendServiceMsg, dispatch),
        fetchAsset: bindActionCreators(fetchAsset, dispatch),
        fetchUserInfo: bindActionCreators(fetchUserInfo, dispatch),
        fetchTargetUserInfo: bindActionCreators(fetchTargetUserInfo, dispatch),
        fetchImageSign: bindActionCreators(fetchImageSign, dispatch),
        updateUserAvatar: bindActionCreators(updateUserAvatar, dispatch),
        guestFetchTargetUserInfo: bindActionCreators(guestFetchTargetUserInfo, dispatch),
        addAttention: bindActionCreators(addAttention, dispatch),
        cancelAttention: bindActionCreators(cancelAttention, dispatch),
        fetchImSig: bindActionCreators(fetchImSig, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index))