/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import uuid from 'uuid/v1'
import moment from 'moment'
import CryptoJS from 'crypto-js'
// import moment from 'moment'
import SpringScrollbars from '../src/components/SpringScrollbars'
import ColoredScrollbars from '../src/components/SpringScrollbars/ColoredScrollbars'
import LazyLoad from '../src/components/LazyLoad'
import Drawer from '../src/components/Drawer'
import Modal from '../src/components/Modal'
import Circle from '../src/components/Circle'
import { fetchGiftList, guestFetchGiftList, fetchSpecialGiftList, guestFetchSpecialGiftList, sendGift } from '../src/redux/actions/gift'
import { fetchUserInfo, fetchTargetUserInfo, guestFetchTargetUserInfo, fetchRoomUserStatus, guestFetchRoomUserStatus, fetchItemConfigList, guestFetchItemConfigList, updateUserAvatar } from '../src/redux/actions/user'
import { sendBarrage, enterRoom, guestEnterRoom, exitRoom, fetchAudienceList, guestFetchAudienceList, fetchManagerList, guestFetchManagerList, fetchGuardList, guestFetchGuardList, userReport, querySystemConfig, guestQuerySystemConfig, fetchImSig, guestFetchImSig, fetchLiveUrl, guestFetchLiveUrl, fetchSensitiveWords, enterRoomNew } from '../src/redux/actions/room'
import { fetchAsset } from '../src/redux/actions/asset'
import { addAttention, cancelAttention } from '../src/redux/actions/attention'
import { buyGuard } from '../src/redux/actions/guard'
import { fetchRandomLiveList, guestFetchRandomLiveList, fetchImageSign } from '../src/redux/actions/live'
import { sendVerificationCode, bindMobile } from '../src/redux/actions/mobile'
import { login, register, checkMobile, resetPassword, loginByThird, fetchWechatOpenId, fetchQqOpenId, loginByToken } from '../src/redux/actions/login'
import { convertToTenThousand1, convertToTenThousand2, displayMsgItem, isLiving, matchEmotionImg, initGuardTypeImg, checkSendMsg, transferSendMsgForDanmu, returnKeywords, returnTitle, returnDescription, isPassword, isAccountExpire, formatAnimationUrl, fetchDataLength, isEmpty, isMobile, isVerCode, fetchBrowserVersion, fetchUrlParams, customCookie, imageToCanvas, is3rdAvatar, replaceCrossImgUrl, asyncLoadScripts, replaceSensitiveWordVersion2, existSensitiveWord, formatLiveCover, formatUserAvatar, preloadImages, aesEncrypt, aesDecrypt, formatSvgaNickName, matchUserLv, initImgProtocal, fetchFlvUrl, fetchHlsUrl, CheckFlashPlayer, initMedalImg } from '../src/utils'
import BrowserTip from '../src/components/BrowserTip'
import PayTip from '../src/components/PayTip'
import FirefoxTip from '../src/components/FirefoxTip'
import { handleMsg, checkMsg, sendMsg } from '../src/utils/im'
import baseUrl, { emotionArray, areaCodeArray } from '../src/utils/const'
import '../src/styles/live.scss'
import '../src/styles/login.scss'
import '../src/styles/focus.scss'
import '../src/styles/area-code.scss'

let options;
const dom = 'live-container'
let isPause = false
let playTimes
let retryTimes
let player
let timeUpdate
let isPkProcess = false
const urlCdnLive = baseUrl.cdnLive
const urlCdnKuxiu = baseUrl.cdnKuxiu
const urlCdnLvUser = baseUrl.cdnLvUser
const urlCdnLvAnchor = baseUrl.cdnLvAnchor
const urlCdnEmotion = baseUrl.cdnEmotion
// const urlCdnGift = baseUrl.cdnGift
const logo = `${urlCdnLive}/logo.png`
const horn = `${urlCdnKuxiu}/horn.png`
const multiple = `${urlCdnLive}/gift-effect-x.png`
const managerImg = `${urlCdnKuxiu}/manager.png`
const emotionImg = `${urlCdnKuxiu}/icon_emotion.png`
const worldBgImg1 = `${urlCdnKuxiu}/world_bg1.png`
const worldBgImg2 = `${urlCdnKuxiu}/world_bg2.png`
const worldBgImg3 = `${urlCdnKuxiu}/world_bg3.png`
const worldBgImg4 = `${urlCdnKuxiu}/world_bg4.png`
const worldBgImg5 = `${urlCdnKuxiu}/world_bg5.png`
const worldBgImg6 = `${urlCdnKuxiu}/world_bg6.png`
const default_avatar = '//img.17kuxiu.com/avatar/default_avatar.png'
const default_cover = '//img.17kuxiu.com/livingImg/defult_liveimg.png'
const qrcode = `${urlCdnLive}/qrcode.png`
const focus = `${urlCdnLive}/focus.png`
const wechat = `${urlCdnLive}/wechat.png`
const qq = `${urlCdnLive}/qq.png`
const fans = `${urlCdnLive}/fans.png`
const clean = `${urlCdnLive}/clean.png`
const alert = `${urlCdnLive}/alert.png`
const jinchangtequan = `${urlCdnLive}/jinchangtequan.png`
const shenfentequan = `${urlCdnLive}/shenfentequan.png`
const zhuanshuliwu = `${urlCdnLive}/zhuanshuliwu.png`
const zunguiquanxian = `${urlCdnLive}/zunguiquanxian.png`
const guard_enter = `${urlCdnLive}/guard-enter.png`
const guard_gift = `${urlCdnLive}/guard-gift.png`
const guard_id = `${urlCdnLive}/guard-id.png`
const guard_privilege = `${urlCdnLive}/guard-privilege.png`
const guard_privilege_disable = `${urlCdnLive}/guard-privilege-disable.png`
const guard_effect = `${urlCdnLive}/guard-effect.png`
const app_down_guide = `${urlCdnLive}/app-down-guide.png`
const mobile_shake = `${urlCdnLive}/mobile-shake.gif`
const man = `${urlCdnKuxiu}/icon_man.png`;
const woman = `${urlCdnKuxiu}/icon_woman.png`;
const gift_h = `${urlCdnKuxiu}/gift-h-new.png`;
// const gift_g = `${urlCdnLive}/gift-g.png`;
const eye = `${urlCdnKuxiu}/icon_eye.png`
const eye_open = `${urlCdnKuxiu}/icon_eyeopen.png`
let comboId
let seq
let seqBig
let host
let channel = 'web'
let visibilityChange = 'visibilitychange'
let pageVisible = true
let cover
let playUrl
let playUrlValid = true
let errTimes = 1
let effectUserAvatar
let effectUserNickName
let effectAnchorAvatar
let effectAnchorNickName
let sensitiveWordList = []
let wordDigest = ''
let giftComboId1 = 0
let giftComboId2 = 0
let giftComboId3 = 0
let isEnableSend = true
let refreshCount = 0
let medalListVersion = 1;
let medalList = []
const timePk = 3000

// const sdkAppID = 1400131192 // prd
// const accountType = 36630 // prd
// const sdkAppID = 1400142184 // pre
// const accountType = 36862 // pre

let giftAddUp1 = 0;
let giftAddUp2 = 0;
let giftAddUp3 = 0;
let tempDanmu
let danmuStorage
let existDanmuStorage = false
let effectGiftOver = true
let userId
let anchorId
let nickName
let userLv
let anchorLv
let userSig
let selToID
let selType
let selSess = null
let selSessHeadUrl
let loginInfo
const timeFlash = 40
const timeStar = 30
const timerRunwayInterval = 1000
const timerBarrageInterval = 1000
const timerEnterMsgInterval = 1000
const timerGiftEffectInterval = 1000
const timerGiftMsgInterval = 200
const timeShake = 2600
const runwayMsgQueue = []
let runwayMsgQueueLoopTimes = 0
const runwayMsgThroughQueue = []
let runwayMsgThroughQueueLoopTimes = 0
const barrageMsgQueue = []
let barrageMsgQueueLoopTimes = 0
const enterMsgQueue = []
let enterMsgQueueLoopTimes = 0
const giftEffectQueue = []
let giftEffectQueueLoopTimes = 0
const giftMsgQueue = []
let giftMsgQueueLoopTimes = 0
const timerShowMsg = 100
const timeRunway = 8900
const timeRunwayThrough = 8900
const timeTanmu = 8900
const cleanRight = '36px'
const timeLeft = '36px'
const cleanRightWorld = '102px'
const changeRight = '174px'
const cleanBottom = '5.5px'
const cleanChangeBottom = '6.5px'
const bottomMax = '-120px'
const broadcastRoomId = 110110
const errMsg = '网络异常，请稍后再试'
let browser
let dataRunwayMsgLoop
const giftMove = '310'
let moveEnable = true;
const timeOut = 3050;
const valueIncrement = 0.0333;
const valueTimer = 100;
let kickOut = false;
let loginStatus = true
let dataPlay = null
let isPreEnv = false
let isHttps = false
let protocol
let pkOverObject = {}

class Live extends Component {
    constructor(props) {
        super(props)
        this.timerRunway = null
        this.timerRunwayThrough = null
        this.timerTanmu = null
        this.timerGift = null
        this.timerEnter = null
        this.timerGiftEffect = null
        this.timerCountDown = null
        this.timerValue = null;
        this.timerText = null;
        this.timerLogin = null;
        this.timerLive = null;
        this.timerMobile = null;
        this.timerGuideApp = null;
        this.timerFlash = null;
        this.timerStar1 = null;
        this.timerStar2 = null;
        this.timerStar3 = null;
        this.timerFlv = null;
        this.timerPk = null;
        this.timerPlayer = null;
        this.timerPkDelay = null;
        this.inputRef = React.createRef();
        this.scrollbarRef = React.createRef();
        this.handleShowGuideTip = _.throttle(() => {
            this.handleShowAppTipType2()
        }, 3100)
        this.handleChangeTabList = _.throttle((e, type) => {
            this.changeTabList(e, type)
        }, 510)
    }

    state = {
        audienceList: [],
        managerList: [],
        guardList: [],
        tanmuChecked: false,
        guardType: 1,
        fee: 58800,
        downloadDisp: 'none',
        msgToSend: '',
        dataRoom: {},
        giftListUp: [],
        guardGiftListDown: [],
        guardGiftListUp: [],
        guardResult: false,
        giftListDown: [],
        dataUser: {},
        dataRunwayMsg: null,
        dataRunwayMsgThrough: null,
        dataChatMsg: {},
        audience: 0,
        kuCoin: 0,
        mobileShowType: 'shake',
        chatMsgList: [
            {
                msgType: -1,
            },
        ],
        effectGiftDisplay: false,
        maskFlashDisplay: false,
        maskTextDisplay: false,
        maskFlvDisplay: false,
        maskPauseDisplay: false,
        maskContent: '',
        cleanDisplay: true,
        cleanWorldDisplay: true,
        enterShow1: false,
        enterClass1: 'live-enter',
        enterLvText1: '',
        enterNickname1: '',
        enterManager1: 0,
        enterDriver1: '',
        enterGuard1: 0,
        enterMedalImg1: '',
        enterShow2: false,
        enterClass2: 'live-enter',
        enterLvText2: '',
        enterNickname2: '',
        enterManager2: 0,
        enterDriver2: '',
        enterGuard2: 0,
        enterMedalImg2: '',
        enterShow3: false,
        enterClass3: 'live-enter',
        enterLvText3: '',
        enterNickname3: '',
        enterManager3: 0,
        enterDriver3: '',
        enterGuard3: 0,
        enterMedalImg3: '',
        giftClass1: 'gift-effect-float',
        giftShow1: false,
        giftAvatar1: '',
        giftNickname1: '',
        giftCount1: 1,
        giftName1: '',
        giftStar1: '',
        giftBottom1: '100px',
        giftTranslate1: '0px',
        giftIconUrl1: '',
        giftMultipleClass1: 'gift-multiple',
        giftNumberClass1: 'gift-number',
        giftComboCount1: 0,
        giftClass2: 'gift-effect-float',
        giftShow2: false,
        giftAvatar2: '',
        giftNickname2: '',
        giftCount2: 1,
        giftName2: '',
        giftStar2: '',
        giftBottom2: '100px',
        giftTranslate2: '0px',
        giftIconUrl2: '',
        giftMultipleClass2: 'gift-multiple',
        giftNumberClass2: 'gift-number',
        giftComboCount2: 0,
        giftClass3: 'gift-effect-float',
        giftShow3: false,
        giftAvatar3: '',
        giftNickname3: '',
        giftCount3: 1,
        giftName3: '',
        giftStar3: '',
        giftBottom3: '100px',
        giftTranslate3: '0px',
        giftIconUrl3: '',
        giftMultipleClass3: 'gift-multiple',
        giftNumberClass3: 'gift-number',
        giftComboCount3: 0,
        tipsShow: false,
        tipsContent: '',
        cleanStatus: false,
        cleanWorldStatus: false,
        opacityGiftEffect: 1,
        opacityGiftMsg: 1,
        installFlash: false,
        tanmuType: 0,
        loginShow: false,
        mobile: '',
        passwordType: 'password',
        code: '',
        password: '',
        countDown: 60,
        tabListType: 'audience',
        loginGuideShow: false,
        isLogin: true,
        giftBaseType: 'gift',
        randomList: [],
        randomListOver: [],
        loginType: 'login',
        drawerOpen: false,
        bindShow: false,
        sendBtnEnable: true,
        areaCode: '86',
        reportType: '',
        reportShow: false,
        reportResultShow: false,
        guardGuideShow: false,
        guardShow: false,
        targetShow: false,
        wechatShow: false,
        qqShow: false,
        areaCodeShow: false,
        areaCodeType: 0,
        placeHolder: '快和主播聊聊天吧~',
        emotionShow: false,
        guardRuleShow: false,
        tanmuSelectShow: false,
        tabStyle: '0',
        arrowLeftClass1: 'btn left left-disable',
        arrowRightClass1: 'btn right',
        giftIndex1: 0,
        giftIndex1Max: 0,
        giftMoveStyle1: '0',
        arrowLeftClass2: 'btn left left-disable',
        arrowRightClass2: 'btn right right-disable',
        giftIndex2: 0,
        giftIndex2Max: 0,
        giftMoveStyle2: '0',
        giftBoxClassUp: 'desc-box up pos-1',
        iconUrlUp: '',
        giftNameUp: '',
        giftPriceUp: '',
        giftBoxStyleUp: 'none',
        giftBoxClassDown: 'desc-box down pos-1',
        iconUrlDown: '',
        giftNameDown: '',
        giftPriceDown: '',
        giftBoxStyleDown: 'none',
        giftId: -1,
        giftNumArray: [],
        giftNumIndex: 0,
        giftType: -1,
        giftPrice: 0,
        giftTitle: 0,
        value: 0,
        show: false,
        time: 3,
        circleWrapper: 'circle-box',
        giftSelectShow: false,
        live: 0,
        browserTipShow: false,
        payTipShow: false,
        firefoxTipShow: false,
        mainOpacity: 0,
        worldTanmuShow: true,
        paymentTipShow: false,
        guideDisp: 'none',
        minute: 0,
        second: 0,
        tipsClass: 'tips-warning type3',
        flashSrc: '',
        guardEffectShow: false,
        guardEffectName: '',
        guardEffectUserName: '',
        guardEffectAvatar: '',
        guardEffectClass: 'modal-guard-effect popIn',
    }

    // 绑定手机号
    bindMobile = (e) => {
        e && e.preventDefault()
        const { bindMobile } = this.props
        const { mobile, code, areaCode } = this.state
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
        bindMobile({
            mobile: _.parseInt(mobile),
            code,
            password: CryptoJS.MD5('123123').toString().toUpperCase(),
            type: 0,
            areaCode,
        }).then(resp => {
            if (resp) {
                if (resp.bm_succ) {
                    const { dataUser } = this.state
                    let data = _.assign({}, dataUser)
                    data = {
                        ...data,
                        mobile,
                    }
                    this.setState({
                        bindShow: false,
                        mobile: '',
                        passwordType: 'password',
                        code: '',
                        areaCode: '86',
                        dataUser: data,
                    })
                } else if (resp.bm_msg) {
                    this.handleErrMsg(resp.bm_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 改变手机号
    handleChangeMobile = (value) => {
        const mobile = value.replace(/\D/g, '')
        this.setState({
            mobile
        })
    }

    // 火狐提示开启flash操作步骤
    handleFirefoxTip = (installFlash) => {
        this.setState({
            firefoxTipShow: true,
            installFlash
        }, () => {
            const { firefoxTipShow } = this.state
            if (installFlash && firefoxTipShow) {
                setTimeout(() => {
                    this.setState({
                        firefoxTipShow: false
                    })
                }, 10000);
            }
        })
    }

    // 切换守护类型
    handleChangeGuardType = (e, type) => {
        e && e.preventDefault()
        const { guardType } = this.state;
        if (guardType === type) {
            return;
        }
        switch (type) {
            case 1:
                this.setState({
                    guardType: 1,
                    fee: 58800
                })
                break;
            case 2:
                this.setState({
                    guardType: 2,
                    fee: 288800
                })
                break;
            case 3:
                this.setState({
                    guardType: 3,
                    fee: 588800
                })
                break;
            default:
                break;
        }
    }

    // 购买守护
    buyGuard = (e) => {
        e && e.preventDefault()
        if (!anchorId) {
            return
        }
        const { buyGuard } = this.props
        const { fee, guardType, kuCoin } = this.state
        if (kuCoin < fee) {
            this.setState({
                paymentTipShow: true
            })
            return
        }
        buyGuard({
            anchorId,
            guardType,
            fee,
        }).then(resp => {
            if (resp) {
                if (resp.bg_code) {
                    const result = isAccountExpire(resp.bg_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        return
                    }
                }
                if (resp.bg_succ) {
                    this.handleGuardHide()
                    this.handleGuardResultShow(null)
                    const { dataRoom } = this.state
                    let data = _.assign({}, dataRoom);
                    data = {
                        ...data,
                        guardType: resp.bg_data.guardType,
                        dueTime: resp.bg_data.dueTime,
                    }
                    this.setState({
                        dataRoom: data,
                    })
                    if (_.parseInt(resp.bg_data.balance) >= 0) {
                        this.setState({
                            kuCoin: _.parseInt(resp.bg_data.balance)
                        })
                    }
                } else if (resp.bg_msg) {
                    this.handleErrMsg(resp.bg_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
            }
        })
    }

    // 播放器错误提示显示
    handleLiveTip = (type, text, value = 1) => {
        const { maskTextDisplay, maskFlashDisplay } = this.state
        if (maskTextDisplay || maskFlashDisplay) {
            return
        }
        this.setState({
            live: value
        })
        if (type === 1) {
            document.querySelector("#live-container").innerHTML = ''
        }
        switch (type) {
            case 0:
                this.setState({
                    maskFlashDisplay: true,
                    maskTextDisplay: false,
                    maskContent: '',
                    cleanDisplay: false,
                    cleanWorldDisplay: false,
                }, () => {
                    setTimeout(() => {
                        const { maskFlvDisplay } = this.state
                        if (!maskFlvDisplay) {
                            this.setState({
                                maskFlvDisplay: true
                            })
                        }
                    }, 10000);
                })
                break
            case 1:
                this.setState({
                    maskFlashDisplay: false,
                    maskTextDisplay: true,
                    maskContent: text === 'accessToken验证失败' ? '' : text,
                    cleanDisplay: false,
                    cleanWorldDisplay: false,
                    maskFlvDisplay: false,
                    maskPauseDisplay: false,
                })
                break
            default:
                this.setState({
                    maskFlashDisplay: false,
                    maskTextDisplay: false,
                    maskContent: '',
                    cleanDisplay: true,
                    cleanWorldDisplay: true,
                    maskFlvDisplay: false,
                    maskPauseDisplay: false,
                })
                break
        }
        if (value === 0) {
            if (loginStatus) {
                this.fetchRandomLiveList(null, 20, 0)
            } else {
                this.guestFetchRandomLiveList(null, 20, 0)
            }
        }
    }

    // 弹幕类型切换
    handleChangeTanmuChecked = () => {
        const { tanmuChecked, tanmuType, dataRoom } = this.state
        const content = tanmuType === 0 ? `普通弹幕${dataRoom.barragePrice || 10}酷币/条` : `世界喊话${dataRoom.barrageWorldPrice || 300}酷币/条`
        this.setState({
            tanmuChecked: !tanmuChecked,
            tanmuSelectShow: !tanmuChecked,
            placeHolder: tanmuChecked ? '快和主播聊聊天吧~' : content
        })
    }

    // 世界喊话开关切换
    handleCleanWorld = (e, value) => {
        e && e.preventDefault()
        this.setState({
            cleanWorldStatus: value
        })
        if (value) {
            this.handleErrMsg('关闭世界喊话成功，您会看不到世界喊话')
        } else {
            this.handleErrMsg('显示世界喊话成功，您会看到世界喊话')
        }
        if (loginStatus) {
            if (!existDanmuStorage) {
                window.localStorage.setItem('kx_live_danmu_visible_world', value ? `${userId}|1` : `${userId}|0`)
            } else if (tempDanmu) {
                window.localStorage.setItem('kx_live_danmu_visible_world', value ? danmuStorage.replace(tempDanmu, `${userId}|1`) : danmuStorage.replace(tempDanmu, `${userId}|0`))
            } else {
                window.localStorage.setItem('kx_live_danmu_visible_world', value ? `${danmuStorage},${userId}|1` : `${userId}|0`)
            }
        }
    }

    // 清屏开关切换
    handleClean = (e, value) => {
        e && e.preventDefault();
        if (value) {
            this.setState({
                opacityGiftEffect: 0,
                opacityGiftMsg: 0
            })
        } else {
            this.setState({
                opacityGiftEffect: 1,
                opacityGiftMsg: 1
            })
        }
        if (value) {
            this.handleErrMsg('关闭礼物特效成功，您会看不到礼物特效')
        } else {
            this.handleErrMsg('显示礼物特效成功，精彩的礼物特效等您鉴赏')
        }
        this.setState({
            cleanStatus: value
        });
    };

    // 改变输入框内容
    handleChangeMsg = (e) => {
        e && e.preventDefault()
        this.setState({
            msgToSend: e.target.value
        })
    }

    // 输入框回车键
    handleKeyUpMsg = (e) => {
        if (e && e.keyCode === 13) {
            this.handleSendMsg(e)
        }
    }

    // app下载提示显示
    handleShowAppTip = (e) => {
        e && e.preventDefault()
        this.handleErrMsg('暂不支持PC端查看<br />请下载酷秀直播APP查看')
    }

    // app下载提示显示
    handleShowAppTipType2 = () => {
        this.setState({
            guideDisp: 'block'
        }, () => {
            this.timerGuideApp = setTimeout(() => {
                this.setState({
                    guideDisp: 'none'
                })
            }, 3000);
        })
        this.handleErrMsgType2('暂不支持PC端查看，请下载酷秀直播APP查看', 'tips-warning type2')
    }

    // 发送聊天消息
    handleSendMsg = (e) => {
        e && e.preventDefault()
        const { dataRoom, tanmuType, dataUser, maskTextDisplay, live } = this.state
        if (!loginStatus) {
            this.handleLoginShow(e, 'login')
            return
        }
        if (dataUser && !dataUser.mobile) {
            this.setState({
                bindShow: true,
            })
            return
        }
        if (maskTextDisplay && live === 0) {
            this.handleErrMsg('亲，直播已结束，请稍后再试试吧')
            return
        }
        if (dataRoom.banned === 1) {
            this.handleErrMsg('你已被禁言，暂时发不了消息')
            return
        }
        if (kickOut) {
            return
        }
        if (!isEnableSend) {
            this.handleErrMsg('亲，进入直播聊天室有延迟，请重新发送试试')
            return
        }
        const { msgToSend, tanmuChecked, kuCoin } = this.state
        let message = _.trim(msgToSend)
        const result = checkMsg(message, selType)
        if (!result) {
            return
        }
        if (tanmuChecked) {
            if (tanmuType === 0) {
                if (kuCoin < dataRoom.barragePrice) {
                    this.setState({
                        paymentTipShow: true
                    })
                    return
                }
            } else {
                if (kuCoin < dataRoom.barrageWorldPrice) {
                    this.setState({
                        paymentTipShow: true
                    })
                    return
                }
                if (dataUser.userLevel < 5) {
                    this.handleErrMsg('用户等级达到5级才能喊话哟~')
                    return
                }
            }
            if (!checkSendMsg(message, 20)) {
                this.handleErrMsg('弹幕已超过最大长度限制, 最多20个字')
                return
            }
            this.sendBarrage()
        } else {
            if (!checkSendMsg(message, 140)) {
                this.handleErrMsg('消息已超过最大长度限制, 最多140个字')
                return
            }
            if (!anchorId) {
                this.handleErrMsg('亲，发送消息失败，请换个直播间试试')
                return
            }
            if (!selSess) {
                selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000))
            }
            nickName = dataUser.nickName || ''
            userLv = dataUser.userLevel || 0
            anchorLv = dataUser.anchorLevel || 0
            for (let i = 0; i < sensitiveWordList.length; i++) {
                message = replaceSensitiveWordVersion2(sensitiveWordList[i], message)
                nickName = replaceSensitiveWordVersion2(sensitiveWordList[i], nickName)
                // while (existSensitiveWord(sensitiveWordList[i], message)) {
                //     message = replaceSensitiveWordVersion2(sensitiveWordList[i], message)
                // }
                // while (existSensitiveWord(sensitiveWordList[i], nickName)) {
                //     nickName = replaceSensitiveWordVersion2(sensitiveWordList[i], nickName)
                // }
            }
            const msg = sendMsg(message, selSess, selType, userId, nickName, userLv, anchorLv, dataRoom.manager, anchorId, dataRoom.guardType, dataUser.avatarUrl, dataRoom.medal)
            webim.sendMsg(msg,
                () => {
                    this.setState({
                        msgToSend: '',
                    })
                },
                (e) => {
                    if (e.ErrorCode === 10007) {
                        this.handleErrMsg(`亲，进入直播聊天室有延迟，重新发送试试`)
                    } else if (e.ErrorCode === -5) {
                        this.handleErrMsg(`亲，进入直播聊天室有延迟，重新发送试试`)
                    } else if (e.ErrorCode === 80001) {
                        this.handleErrMsg(`亲，您发送的消息或昵称带有敏感信息，请去修改昵称或重新发送`)
                        // const msgObject = {
                        //     anchorLevel: anchorLv,
                        //     guardType: dataRoom.guardType,
                        //     manager: dataRoom.manager,
                        //     message: msgToSend,
                        //     nickname: nickName,
                        //     roomManage: dataRoom.manager,
                        //     userId,
                        //     avatar: dataUser.avatarUrl,
                        //     userLevel: userLv,
                        //     anchor: dataUser.avatarUrl,
                        // }
                        // this.setState({
                        //     dataChatMsg: msgObject || {},
                        // }, () => this.showMsg(0))
                    } else {
                        this.handleErrMsg(e.ErrorCode ? `亲，消息发送失败，请刷新页面试试 ${e.ErrorCode.toString()}` : `亲，消息发送失败，请刷新页面试试`)
                    }
                })
        }
    }

    // 礼物特效
    fetchGiftEffect = () => {
        if (!effectGiftOver) {
            return
        }
        if (giftEffectQueue.length === 0) {
            giftEffectQueueLoopTimes++
            if (giftEffectQueueLoopTimes >= 5 && this.timerGiftEffect) {
                clearInterval(this.timerGiftEffect)
                this.timerGiftEffect = null
            }
            this.setState({
                effectGiftDisplay: false,
            })
            return
        }
        giftEffectQueueLoopTimes = 0
        const _this = this
        const giftEffect = giftEffectQueue.shift()
        const { effectGiftDisplay } = this.state
        this.parserGift.load(giftEffect, (videoItem) => {
            if (effectGiftDisplay) {
                _this.playerGift.setVideoItem(videoItem)
                _this.playerGift.setImage(effectUserAvatar, 'user_icon')
                _this.playerGift.setImage(effectAnchorAvatar, 'anchor_icon')
                _this.playerGift.setText({
                    text: effectUserNickName,
                    size: "16px",
                    color: "#472328",
                    offset: { x: 0.0, y: 0.0 }
                }, 'user_nickname')
                _this.playerGift.setText({
                    text: effectAnchorNickName,
                    size: "16px",
                    color: "#472328",
                    offset: { x: 0.0, y: 0.0 }
                }, 'anchor_nickname')
                _this.playerGift.startAnimation()
                effectGiftOver = false
            } else {
                _this.setState({
                    effectGiftDisplay: 'block',
                }, () => {
                    _this.playerGift.setVideoItem(videoItem)
                    _this.playerGift.setImage(effectUserAvatar, 'user_icon')
                    _this.playerGift.setImage(effectAnchorAvatar, 'anchor_icon')
                    _this.playerGift.setText({
                        text: effectUserNickName,
                        size: "16px",
                        color: "#472328",
                        offset: { x: 0.0, y: 0.0 }
                    }, 'user_nickname')
                    _this.playerGift.setText({
                        text: effectAnchorNickName,
                        size: "16px",
                        color: "#472328",
                        offset: { x: 0.0, y: 0.0 }
                    }, 'anchor_nickname')
                    _this.playerGift.startAnimation()
                    effectGiftOver = false
                })
            }
        })
        this.playerGift.onFinished(() => {
            effectGiftOver = true
        })
    }

    // 初始化礼物特效队列
    initGiftEffectQueue = () => {
        const _this = this
        _this.fetchGiftEffect()
        if (!this.timerGiftEffect) {
            this.timerGiftEffect = setInterval(() => {
                _this.fetchGiftEffect()
            }, timerGiftEffectInterval)
        }
    }

    // 跑道消息
    fetchRunwayMsg = () => {
        const { dataRunwayMsg } = this.state
        if (dataRunwayMsg) {
            return
        }
        if (runwayMsgQueue.length === 0) {
            // if (dataRunwayMsgLoop) {
            //     this.setState({
            //         dataRunwayMsg: dataRunwayMsgLoop,
            //     }, () => {
            //         setTimeout(() => {
            //             this.setState({
            //                 dataRunwayMsg: null,
            //             })
            //         }, timeRunway)
            //     })
            //     return
            // } else {
            //     runwayMsgQueueLoopTimes++
            //     if (runwayMsgQueueLoopTimes >= 5 && this.timerRunway) {
            //         clearInterval(this.timerRunway)
            //         this.timerRunway = null
            //     }
            //     return
            // }
            runwayMsgQueueLoopTimes++
            if (runwayMsgQueueLoopTimes >= 5 && this.timerRunway) {
                clearInterval(this.timerRunway)
                this.timerRunway = null
            }
            return
        }
        runwayMsgQueueLoopTimes = 0
        const runwayMsg = runwayMsgQueue.shift()
        if (runwayMsg) {
            this.setState({
                dataRunwayMsg: runwayMsg,
            }, () => {
                setTimeout(() => {
                    this.setState({
                        dataRunwayMsg: null,
                    })
                }, timeRunway)
            })
            // if (runwayMsg.sysMsg && runwayMsg.sysMsg.indexOf('最新消息：') !== -1) {
            //     this.setState({
            //         dataRunwayMsg: runwayMsg,
            //     }, () => {
            //         setTimeout(() => {
            //             this.setState({
            //                 dataRunwayMsg: null,
            //             })
            //         }, timeRunway)
            //     })
            //     const runwayMsgTemp = { ...runwayMsg }
            //     const msg = runwayMsgTemp.sysMsg
            //     runwayMsgTemp.sysMsg = msg.replace('最新消息：', '')
            //     dataRunwayMsgLoop = runwayMsgTemp
            // } else {
            //     this.setState({
            //         dataRunwayMsg: runwayMsg,
            //     }, () => {
            //         setTimeout(() => {
            //             this.setState({
            //                 dataRunwayMsg: null,
            //             })
            //         }, timeRunway)
            //     })
            // }
        }
    }

    // 初始化跑道消息队列
    initRunwayMsgQueue = () => {
        const _this = this
        _this.fetchRunwayMsg()
        if (!this.timerRunway) {
            this.timerRunway = setInterval(() => {
                _this.fetchRunwayMsg()
            }, timerRunwayInterval)
        }
    }

    // 大跑道消息
    fetchRunwayThroughMsg = () => {
        const { dataRunwayMsgThrough } = this.state
        if (dataRunwayMsgThrough) {
            return
        }
        if (runwayMsgThroughQueue.length === 0) {
            runwayMsgThroughQueueLoopTimes++
            if (runwayMsgThroughQueueLoopTimes >= 5 && this.timerRunwayThrough) {
                clearInterval(this.timerRunwayThrough)
                this.timerRunwayThrough = null
            }
            return
        }
        runwayMsgThroughQueueLoopTimes = 0
        const runwayMsgThrough = runwayMsgThroughQueue.shift()
        if (runwayMsgThrough) {
            this.setState({
                dataRunwayMsgThrough: runwayMsgThrough,
            }, () => {
                let index = 0
                if (runwayMsgThrough.globalFlag === 1) {
                    this.setState({
                        flashSrc: `${urlCdnLive}/bg-flash-frames/through_runway_0.png`
                    })
                    this.timerFlash = setInterval(() => {
                        index = index === 18 ? 0 : index + 1
                        this.setState({
                            flashSrc: `${urlCdnLive}/bg-flash-frames/through_runway_${index}.png`
                        })
                    }, timeFlash)
                    setTimeout(() => {
                        this.setState({
                            dataRunwayMsgThrough: null,
                        })
                        this.timerFlash && clearInterval(this.timerFlash)
                        this.timerFlash = null
                    }, timeRunwayThrough)
                } else if (runwayMsgThrough.isUpRunwayBig === 1) {
                    this.setState({
                        flashSrc: `${urlCdnLive}/bg-flash-turntable/turntable_runway_0.png`
                    })
                    this.timerFlash = setInterval(() => {
                        index = index === 18 ? 0 : index + 1
                        this.setState({
                            flashSrc: `${urlCdnLive}/bg-flash-turntable/turntable_runway_${index}.png`
                        })
                    }, timeFlash)
                    setTimeout(() => {
                        this.setState({
                            dataRunwayMsgThrough: null,
                        })
                        this.timerFlash && clearInterval(this.timerFlash)
                        this.timerFlash = null
                    }, timeRunwayThrough)
                }
            })
        }
    }

    // 初始化大跑道消息队列
    initRunwayThroughMsgQueue = () => {
        const _this = this
        _this.fetchRunwayThroughMsg()
        if (!this.timerRunwayThrough) {
            this.timerRunwayThrough = setInterval(() => {
                _this.fetchRunwayThroughMsg()
            }, timerRunwayInterval)
        }
    }

    // 选择用户表情
    handleChangeEmotion = (e, imgSrc) => {
        e && e.preventDefault()
        const { msgToSend } = this.state
        const value = imgSrc.replace(`${urlCdnEmotion}/`, '').replace('.png', '')
        this.setState({
            msgToSend: `${msgToSend}[${value}]`,
        }, () => {
            this.inputRef.current.focus();
        })
    }

    // 世界喊话内容长度优化
    fetchWorldImgType = (msg) => {
        const content = transferSendMsgForDanmu(msg)
        const len1 = fetchDataLength(content[0])
        const len = _.round(content[1] + len1, 2)
        if (len <= 7.23) {
            return worldBgImg1
        } else if (len > 7.23 && len <= 14.46) {
            return worldBgImg2
        } else if (len > 14.46 && len <= 21.69) {
            return worldBgImg3
        } else if (len > 21.69 && len <= 28.92) {
            return worldBgImg4
        } else if (len > 28.92 && len <= 36.15) {
            return worldBgImg5
        } else {
            return worldBgImg6
        }
    }

    // 弹幕
    fetchTanmuMsg = () => {
        if (barrageMsgQueue.length === 0) {
            barrageMsgQueueLoopTimes++
            if (barrageMsgQueueLoopTimes >= 5 && this.timerTanmu) {
                clearInterval(this.timerTanmu)
                this.timerTanmu = null
            }
            return
        }
        barrageMsgQueueLoopTimes = 0
        const domBarrageContainer = document.querySelector('#barrage-container')
        const len = domBarrageContainer.children.length
        if (len > 10) {
            return
        }
        const tanmuMsg = barrageMsgQueue.shift()
        if (tanmuMsg) {
            const msg = matchEmotionImg(tanmuMsg.message || '')
            const domBarrage = document.createElement("div")
            domBarrage.className = tanmuMsg.barrageType === 0 ? "barrage-float normal danmu" : "barrage-float world danmu-world"
            domBarrage.style.top = `${_.toString(_.random(0, 9) * 50 + 70)}px`
            domBarrage.innerHTML = tanmuMsg.barrageType === 0
                ?
                `<span class="live-avatar live-avatar-size-default live-avatar-shape-circle live-avatar-type-image avatar normal"><img class="live-avatar-image" src=${formatUserAvatar(tanmuMsg.avatar)} onerror="javascript:this.src=${default_avatar};" /></span><div class="normal"><p class="content">${tanmuMsg.nickname || ''}</p><p class="content">${msg}</p></div>`
                :
                `<span class="barrage-bg"><img src=${this.fetchWorldImgType(tanmuMsg.message || '')} alt="" /></span><span class="live-avatar live-avatar-size-default live-avatar-shape-circle live-avatar-type-image avatar"><img class="live-avatar-image" src=${formatUserAvatar(tanmuMsg.avatar)} onerror="javascript:this.src=${default_avatar};" /></span><span class="horn"><img src=${horn} alt='' /></span><div class="world"><p class="content-world">${tanmuMsg.nickname || ''}</p><p class="content-world"><span class="inner">世界: ${msg}</span></p></div>`
            domBarrageContainer.appendChild(domBarrage)
            setTimeout(() => {
                domBarrageContainer.removeChild(domBarrage)
            }, timeTanmu)
        }
    }

    // 初始化弹幕队列
    initTanmuMsgQueue = () => {
        const _this = this
        _this.fetchTanmuMsg()
        if (!this.timerTanmu) {
            this.timerTanmu = setInterval(() => {
                _this.fetchTanmuMsg()
            }, timerBarrageInterval)
        }
    }

    // 礼物消息
    initGiftMsgType = (giftShow1, giftShow2, giftShow3, giftComboId) => {
        if (giftShow1 && giftComboId1 === giftComboId) {
            return 1
        } if (giftShow2 && giftComboId2 === giftComboId) {
            return 2
        } if (giftShow3 && giftComboId3 === giftComboId) {
            return 3
        } if (!giftShow1) {
            return 4
        } if (!giftShow2 && giftShow1) {
            return 5
        } if (!giftShow3 && giftShow1 && giftShow2) {
            return 6
        }
        return 0
    }

    // 大礼物背景特效
    giftStarEffect = (position) => {
        if (position === 1) {
            if (!this.timerStar1) {
                let index1 = 1
                this.setState({
                    giftStar1: `${urlCdnLive}/gift-effect/star-effect-${index1}.png`
                })
                this.timerStar1 = setInterval(() => {
                    index1++
                    this.setState({
                        giftStar1: `${urlCdnLive}/gift-effect/star-effect-${index1}.png`
                    }, () => {
                        if (index1 === 13) {
                            clearInterval(this.timerStar1)
                            this.timerStar1 = null
                        }
                    })
                }, timeStar)
            }
        } else if (position === 2) {
            if (!this.timerStar2) {
                let index2 = 1
                this.setState({
                    giftStar2: `${urlCdnLive}/gift-effect/star-effect-${index2}.png`
                })
                this.timerStar2 = setInterval(() => {
                    index2++
                    this.setState({
                        giftStar2: `${urlCdnLive}/gift-effect/star-effect-${index2}.png`
                    }, () => {
                        if (index2 === 13) {
                            clearInterval(this.timerStar2)
                            this.timerStar2 = null
                        }
                    })
                }, timeStar)
            }
        } else if (position === 3) {
            if (!this.timerStar3) {
                let index3 = 1
                this.setState({
                    giftStar3: `${urlCdnLive}/gift-effect/star-effect-${index3}.png`
                })
                this.timerStar3 = setInterval(() => {
                    index3++
                    this.setState({
                        giftStar3: `${urlCdnLive}/gift-effect/star-effect-${index3}.png`
                    }, () => {
                        if (index3 === 13) {
                            clearInterval(this.timerStar3)
                            this.timerStar3 = null
                        }
                    })
                }, timeStar)
            }
        }
    }

    // 礼物显示动画及累加
    fetchGiftMsg = () => {
        if (giftMsgQueue.length === 0) {
            giftMsgQueueLoopTimes++
            if (giftMsgQueueLoopTimes >= 25 && this.timerGift) {
                clearInterval(this.timerGift)
                this.timerGift = null
            }
            return
        }
        giftMsgQueueLoopTimes = 0
        const classGift = 'gift-effect-float'
        const classGiftStart = 'gift-effect-float giftAnimateStart'
        const classGiftEnd = 'gift-effect-float giftAnimateEnd'
        const classGiftMultipleAnimate = 'gift-multiple scaleMultiAnimate'
        const classGiftMultiple = 'gift-multiple'
        const classGiftNumberAnimate = 'gift-number scaleNumberAnimate'
        const classGiftNumber = 'gift-number'
        let type
        let count
        const giftMsg = giftMsgQueue[0]
        if (giftMsg && giftMsg.userId && giftMsg.giftId && giftMsg.count) {
            const { giftShow1, giftShow2, giftShow3 } = this.state
            type = this.initGiftMsgType(giftShow1, giftShow2, giftShow3, giftMsg.comboId)
            if (type === 1) {
                // const { giftClass1 } = this.state
                // if (giftClass1 === classGiftStart || giftClass1 === classGiftEnd) {
                //     return
                // }
                const { giftComboCount1, giftMultipleClass1, giftNumberClass1 } = this.state
                if (giftMultipleClass1 === classGiftMultipleAnimate || giftNumberClass1 === classGiftNumberAnimate) {
                    return
                }
                this.timerGiftMsg1 && clearTimeout(this.timerGiftMsg1)
                this.timerGiftMsg1 = null
                this.timerGiftMsg2 && clearTimeout(this.timerGiftMsg2)
                this.timerGiftMsg2 = null
                count = giftComboCount1
                this.setState({
                    giftComboCount1: count + 1,
                    giftMultipleClass1: classGiftMultipleAnimate,
                    giftNumberClass1: classGiftNumberAnimate,
                }, () => {
                    this.giftStarEffect(1)
                    giftAddUp1 += 1
                    setTimeout(() => {
                        this.setState({
                            giftMultipleClass1: classGiftMultiple,
                            giftNumberClass1: classGiftNumber,
                        })
                    }, 100)
                    this.timerGiftMsg1 = setTimeout(() => {
                        this.setState({
                            giftClass1: classGiftEnd,
                        })
                    }, 3100)
                    this.timerGiftMsg2 = setTimeout(() => {
                        this.setState({
                            giftShow1: false,
                        }, () => {
                            this.setState({
                                giftTranslate1: '0px',
                            })
                            giftMsg.count *= giftAddUp1
                            giftAddUp1 = 0
                            this.timerStar1 && clearInterval(this.timerStar1)
                            this.timerStar1 = null
                            this.setState({
                                dataChatMsg: giftMsg,
                            }, () => this.showMsg(12))
                        })
                    }, 3200)
                })
                giftMsgQueue.shift()
            } else if (type === 2) {
                // const { giftClass2 } = this.state
                // if (giftClass2 === classGiftStart || giftClass2 === classGiftEnd) {
                //     return
                // }
                const { giftComboCount2, giftMultipleClass2, giftNumberClass2 } = this.state
                if (giftMultipleClass2 === classGiftMultipleAnimate || giftNumberClass2 === classGiftNumberAnimate) {
                    return
                }
                this.timerGiftMsg3 && clearTimeout(this.timerGiftMsg3)
                this.timerGiftMsg3 = null
                this.timerGiftMsg4 && clearTimeout(this.timerGiftMsg4)
                this.timerGiftMsg4 = null
                count = giftComboCount2
                this.setState({
                    giftComboCount2: count + 1,
                    giftMultipleClass2: classGiftMultipleAnimate,
                    giftNumberClass2: classGiftNumberAnimate,
                }, () => {
                    this.giftStarEffect(2)
                    giftAddUp2 += 1
                    setTimeout(() => {
                        this.setState({
                            giftMultipleClass2: classGiftMultiple,
                            giftNumberClass2: classGiftNumber,
                        })
                    }, 100)
                    this.timerGiftMsg3 = setTimeout(() => {
                        this.setState({
                            giftClass2: classGiftEnd,
                        })
                    }, 3100)
                    this.timerGiftMsg4 = setTimeout(() => {
                        this.setState({
                            giftShow2: false,
                        }, () => {
                            this.setState({
                                giftTranslate2: '0px',
                            })
                            giftMsg.count *= giftAddUp2
                            giftAddUp2 = 0
                            this.setState({
                                dataChatMsg: giftMsg,
                            }, () => this.showMsg(12))
                        })
                    }, 3200)
                })
                giftMsgQueue.shift()
            } else if (type === 3) {
                // const { giftClass3 } = this.state
                // if (giftClass3 === classGiftStart || giftClass3 === classGiftEnd) {
                //     return
                // }
                const { giftComboCount3, giftMultipleClass3, giftNumberClass3 } = this.state
                if (giftMultipleClass3 === classGiftMultipleAnimate || giftNumberClass3 === classGiftNumberAnimate) {
                    return
                }
                this.timerGiftMsg5 && clearTimeout(this.timerGiftMsg5)
                this.timerGiftMsg5 = null
                this.timerGiftMsg6 && clearTimeout(this.timerGiftMsg6)
                this.timerGiftMsg6 = null
                count = giftComboCount3
                this.setState({
                    giftComboCount3: count + 1,
                    giftMultipleClass3: classGiftMultipleAnimate,
                    giftNumberClass3: classGiftNumberAnimate,
                }, () => {
                    this.giftStarEffect(3)
                    giftAddUp3 += 1
                    setTimeout(() => {
                        this.setState({
                            giftMultipleClass3: classGiftMultiple,
                            giftNumberClass3: classGiftNumber,
                        })
                    }, 100)
                    this.timerGiftMsg5 = setTimeout(() => {
                        this.setState({
                            giftClass3: classGiftEnd,
                        })
                    }, 3100)
                    this.timerGiftMsg6 = setTimeout(() => {
                        this.setState({
                            giftShow3: false,
                        }, () => {
                            this.setState({
                                giftTranslate3: '0px',
                            })
                            giftMsg.count *= giftAddUp3
                            giftAddUp3 = 0
                            this.setState({
                                dataChatMsg: giftMsg,
                            }, () => this.showMsg(12))
                        })
                    }, 3200)
                })
                giftMsgQueue.shift()
            } else if (type === 4) {
                giftComboId1 = giftMsg.comboId
                this.setState({
                    giftClass1: classGiftStart,
                    giftShow1: true,
                    giftAvatar1: formatUserAvatar(giftMsg.avatar),
                    giftNickname1: giftMsg.nickname || '',
                    giftCount1: giftMsg.count || 1,
                    giftName1: giftMsg.giftName || '',
                    giftIconUrl1: giftMsg.iconUrl || '',
                    giftMultipleClass1: classGiftMultiple,
                    giftNumberClass1: classGiftNumber,
                    giftComboCount1: 1,
                }, () => {
                    this.giftStarEffect(1)
                    giftAddUp1 += 1;
                    if (giftShow2) {
                        const { giftTranslate2 } = this.state
                        if (giftTranslate2 !== bottomMax) {
                            this.setState({
                                giftTranslate2: '-60px',
                            })
                        }
                    }
                    if (giftShow3) {
                        const { giftTranslate3 } = this.state
                        if (giftTranslate3 !== bottomMax) {
                            this.setState({
                                giftTranslate3: '-120px',
                            })
                        }
                    }
                    setTimeout(() => {
                        this.setState({
                            giftClass1: classGift,
                        })
                    }, 400)
                    this.timerGiftMsg1 = setTimeout(() => {
                        this.setState({
                            giftClass1: classGiftEnd,
                        })
                    }, 3400)
                    this.timerGiftMsg2 = setTimeout(() => {
                        this.setState({
                            giftShow1: false,
                        }, () => {
                            this.setState({
                                giftTranslate1: '0px',
                            })
                            giftAddUp1 = 0
                            this.setState({
                                dataChatMsg: giftMsg,
                            }, () => this.showMsg(12))
                        })
                    }, 3500)
                })
                giftMsgQueue.shift()
            } else if (type === 5) {
                giftComboId2 = giftMsg.comboId
                this.setState({
                    giftClass2: classGiftStart,
                    giftShow2: true,
                    giftAvatar2: formatUserAvatar(giftMsg.avatar),
                    giftNickname2: giftMsg.nickname || '',
                    giftCount2: giftMsg.count || 1,
                    giftName2: giftMsg.giftName || '',
                    giftIconUrl2: giftMsg.iconUrl || '',
                    giftMultipleClass2: classGiftMultiple,
                    giftNumberClass2: classGiftNumber,
                    giftComboCount2: 1,
                }, () => {
                    this.giftStarEffect(2)
                    giftAddUp2 += 1;
                    if (giftShow1) {
                        const { giftTranslate1 } = this.state
                        if (giftTranslate1 !== bottomMax) {
                            this.setState({
                                giftTranslate1: '-60px',
                            })
                        }
                    }
                    if (giftShow3) {
                        const { giftTranslate3 } = this.state
                        if (giftTranslate3 !== bottomMax) {
                            this.setState({
                                giftTranslate3: '-120px',
                            })
                        }
                    }
                    setTimeout(() => {
                        this.setState({
                            giftClass2: classGift,
                        })
                    }, 400)
                    this.timerGiftMsg3 = setTimeout(() => {
                        this.setState({
                            giftClass2: classGiftEnd,
                        })
                    }, 3400)
                    this.timerGiftMsg4 = setTimeout(() => {
                        this.setState({
                            giftShow2: false,
                        }, () => {
                            this.setState({
                                giftTranslate2: '0px',
                            })
                            giftAddUp2 = 0
                            this.setState({
                                dataChatMsg: giftMsg,
                            }, () => this.showMsg(12))
                        })
                    }, 3500)
                })
                giftMsgQueue.shift()
            } else if (type === 6) {
                giftComboId3 = giftMsg.comboId
                this.setState({
                    giftClass3: classGiftStart,
                    giftShow3: true,
                    giftAvatar3: formatUserAvatar(giftMsg.avatar),
                    giftNickname3: giftMsg.nickname || '',
                    giftCount3: giftMsg.count || 1,
                    giftName3: giftMsg.giftName || '',
                    giftIconUrl3: giftMsg.iconUrl || '',
                    giftMultipleClass3: classGiftMultiple,
                    giftNumberClass3: classGiftNumber,
                    giftComboCount3: 1,
                }, () => {
                    this.giftStarEffect(3)
                    giftAddUp3 += 1;
                    if (giftShow1) {
                        const { giftTranslate1 } = this.state
                        if (giftTranslate1 !== bottomMax) {
                            this.setState({
                                giftTranslate1: '-60px',
                            })
                        }
                    }
                    if (giftShow2) {
                        const { giftTranslate2 } = this.state
                        if (giftTranslate2 !== bottomMax) {
                            this.setState({
                                giftTranslate2: '-120px',
                            })
                        }
                    }
                    setTimeout(() => {
                        this.setState({
                            giftClass3: classGift,
                        })
                    }, 400)
                    this.timerGiftMsg5 = setTimeout(() => {
                        this.setState({
                            giftClass3: classGiftEnd,
                        })
                    }, 3400)
                    this.timerGiftMsg6 = setTimeout(() => {
                        this.setState({
                            giftShow3: false,
                        }, () => {
                            this.setState({
                                giftTranslate3: '0px',
                            })
                            giftAddUp3 = 0
                            this.setState({
                                dataChatMsg: giftMsg,
                            }, () => this.showMsg(12))
                        })
                    }, 3500)
                })
                giftMsgQueue.shift()
            } else {
                const giftMessage = giftMsgQueue.shift()
                giftMsgQueue.push(giftMessage)
            }
        }
    }

    // 初始化礼物队列
    initGiftMsgQueue = () => {
        const _this = this
        _this.fetchGiftMsg()
        if (!this.timerGift) {
            this.timerGift = setInterval(() => {
                _this.fetchGiftMsg()
            }, timerGiftMsgInterval)
        }
    }

    // 引导下载显示
    handleDownloadShow = (e) => {
        e && e.preventDefault()
        this.setState({
            downloadDisp: 'block',
            guideDisp: 'none'
        })
        clearTimeout(this.timerGuideApp)
        this.timerGuideApp = null
    }

    // 引导下载隐藏
    handleDownloadHide = (e) => {
        e && e.preventDefault()
        this.setState({
            downloadDisp: 'none'
        })
    }

    // 入场消息
    fetchEnterMsg = () => {
        if (enterMsgQueue.length === 0) {
            enterMsgQueueLoopTimes++
            if (enterMsgQueueLoopTimes >= 5 && this.timerEnter) {
                clearInterval(this.timerEnter)
                this.timerEnter = null
            }
            return
        }
        enterMsgQueueLoopTimes = 0
        const { enterShow1, enterShow2, enterShow3 } = this.state
        if (enterShow1 && enterShow2 && enterShow3) {
            return
        }
        const enterMsg = enterMsgQueue.shift()
        if (enterMsg) {
            const isAnchor = enterMsg.userId === anchorId
            const level = !isAnchor ? enterMsg.userLevel || 0 : enterMsg.anchorLevel || 0
            const classEnterAnimate = "live-enter fadeEnter"
            const classEnter = "live-enter"
            if (!enterShow1) {
                this.setState({
                    enterShow1: true,
                    enterClass1: classEnterAnimate,
                    enterLvText1: matchUserLv(level),
                    enterNickname1: enterMsg.nickname || '',
                    enterManager1: enterMsg.roomManage || 0,
                    enterDriver1: enterMsg.showCardFlag === 0 ? (enterMsg.carName || '') : '',
                    enterGuard1: enterMsg.guardType,
                    enterMedalImg1: enterMsg.medal > 0 ? initMedalImg(enterMsg.medal, medalList) : '',
                })
                setTimeout(() => {
                    this.setState({
                        enterShow1: false,
                        enterClass1: classEnter,
                    })
                }, 4100)
            } else if (!enterShow2) {
                this.setState({
                    enterShow2: true,
                    enterClass2: classEnterAnimate,
                    enterLvText2: matchUserLv(level),
                    enterNickname2: enterMsg.nickname || '',
                    enterManager2: enterMsg.roomManage || 0,
                    enterDriver2: enterMsg.showCardFlag === 0 ? (enterMsg.carName || '') : '',
                    enterGuard2: enterMsg.guardType,
                    enterMedalImg2: enterMsg.medal > 0 ? initMedalImg(enterMsg.medal, medalList) : '',
                })
                setTimeout(() => {
                    this.setState({
                        enterShow2: false,
                        enterClass2: classEnter,
                    })
                }, 4100)
            } else if (!enterShow3) {
                this.setState({
                    enterShow3: true,
                    enterClass3: classEnterAnimate,
                    enterLvText3: matchUserLv(level),
                    enterNickname3: enterMsg.nickname || '',
                    enterManager3: enterMsg.roomManage || 0,
                    enterDriver3: enterMsg.showCardFlag === 0 ? (enterMsg.carName || '') : '',
                    enterGuard3: enterMsg.guardType,
                    enterMedalImg3: enterMsg.medal > 0 ? initMedalImg(enterMsg.medal, medalList) : '',
                })
                setTimeout(() => {
                    this.setState({
                        enterShow3: false,
                        enterClass3: classEnter,
                    })
                }, 4100)
            }
        }
    }

    // 初始话入场队列
    initEnterMsgQueue = () => {
        const _this = this
        _this.fetchEnterMsg()
        if (!this.timerEnter) {
            this.timerEnter = setInterval(() => {
                _this.fetchEnterMsg()
            }, timerEnterMsgInterval)
        }
    }

    // 登出
    logout = (e) => {
        e && e.preventDefault()
        this.setState({
            drawerOpen: false
        })
        this.exitRoom('logout', anchorId)
    }

    // 跳转至首页
    handleGoIndex = (e) => {
        e && e.preventDefault()
        this.exitRoom('index', anchorId)
    }

    // 获取推荐直播列表
    handleChangeLiveRoom = () => {
        if (loginStatus) {
            this.fetchRandomLiveList(null, 20, 2)
        } else {
            this.guestFetchRandomLiveList(null, 20, 2)
        }
    }

    // 退出直播间
    exitRoom = (type, roomId, targetAnchorId = null) => {
        if (loginStatus) {
            const { exitRoom } = this.props
            exitRoom({
                roomId,
            }).then(resp => {
                if (resp) {
                    if (resp.exr_code) {
                        const result = isAccountExpire(resp.exr_code)
                        if (result) {
                            this.initLogoutStatus(false, this.initVisitorStatus)
                            return
                        }
                    }
                    if (resp.exr_succ) {
                        selSess = null
                        if (type === 'logout' || type === 'exit' || type === 'expire' || type === 'index') {
                            this.logoutRoom(roomId, type)
                        } else if (type === 'switchAnchor') {
                            this.logoutRoom(roomId, type, targetAnchorId)
                        } else {
                            this.logoutPreviousRoom(roomId)
                        }
                    } else if (resp.exr_msg) {
                        this.handleErrMsg(resp.exr_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                } else {
                    this.initLogoutStatus(false, this.initVisitorStatus)
                }
            })
        } else {
            selSess = null
            if (type === 'login' || type === 'register' || type === 'exit' || type === 'index') {
                this.logoutRoom(roomId, type)
            } else if (type === 'switchAnchor') {
                this.logoutRoom(roomId, type, targetAnchorId)
            }
        }
    }

    // 跳转至充值页面
    handleGoRecharge = () => {
        this.setState({
            drawerOpen: false
        }, () => {
            this.handlePayTipShow();
        })
    }

    // 登出im未退出的房间
    logoutPreviousRoom = (roomId) => {
        const options = {
            'GroupId': roomId.toString(),
        }
        webim.quitGroup(
            options,
            () => { },
            () => { }
        )
    }

    // 进入直播间初始化
    initLiveRoom = (type, targetAnchorId = null) => {
        if (type === 'logout' || type === 'expire') {
            this.initLogoutStatus(false, this.initVisitorStatus)
        } else if (type === 'login') {
            this.setState({
                isLogin: true
            })
            loginStatus = true
            // window.location.reload(true)
            this.fetchImSig(false)
        } else if (type === 'register') {
            this.setState({
                isLogin: true
            })
            loginStatus = true
            // window.location.reload(true)
            this.fetchImSigForRegister()
        } else if (type === 'switchAnchor' && targetAnchorId) {
            window.location.href = !isPreEnv ? `/live?anchorId=${targetAnchorId}&channel=${channel}` : `/web/kuxiu/live?anchorId=${targetAnchorId}&channel=${channel}`
        } else if (type === 'index') {
            window.location.href = !isPreEnv ? `/?channel=${channel}` : `/web/kuxiu?channel=${channel}`
        }
    }

    // 登录房间
    logoutRoom = (roomId, type, targetAnchorId = null) => {
        const options = {
            'GroupId': roomId.toString(),
        }
        const optionsBroadcast = {
            'GroupId': broadcastRoomId.toString(),
        }
        const _this = this;
        if (type === 'switchAnchor') {
            webim.quitGroup(
                options,
                () => {
                    _this.initLiveRoom(type, targetAnchorId)
                },
                () => {
                    _this.initLiveRoom(type, targetAnchorId)
                }
            )

        } else if (type === 'index' || type === 'exit') {
            webim.quitBigGroup(
                optionsBroadcast,
                () => { },
                () => { }
            )
            webim.quitGroup(
                options,
                () => {
                    webim.logout(
                        () => {
                            _this.initLiveRoom(type, targetAnchorId)
                        },
                        () => {
                            _this.initLiveRoom(type, targetAnchorId)
                        },
                    )
                },
                () => {
                    webim.logout(
                        () => {
                            _this.initLiveRoom(type, targetAnchorId)
                        },
                        () => {
                            _this.initLiveRoom(type, targetAnchorId)
                        },
                    )
                }
            )
        } else {
            isEnableSend = false
            webim.quitBigGroup(
                optionsBroadcast,
                () => { },
                () => { }
            )
            webim.quitGroup(
                options,
                () => {
                    webim.logout(
                        () => {
                            _this.initLiveRoom(type, targetAnchorId)
                        },
                        () => {
                            _this.initLiveRoom(type, targetAnchorId)
                        },
                    )
                },
                () => {
                    webim.logout(
                        () => {
                            _this.initLiveRoom(type, targetAnchorId)
                        },
                        () => {
                            _this.initLiveRoom(type, targetAnchorId)
                        },
                    )
                }
            )
            // _this.initLiveRoom(type, targetAnchorId)
        }
    }

    // 购买守护结果隐藏
    handleGuardResultHide = (e) => {
        e && e.preventDefault()
        this.setState({
            guardResult: false
        })
    }

    // 支付提示隐藏
    handlePaymentTipHide = () => {
        this.setState({
            paymentTipShow: false
        })
    }

    // 支付提示跳转隐藏
    handlePaymentTipHideSkip = () => {
        this.handleGoRecharge()
        this.setState({
            paymentTipShow: false
        })
    }

    // 购买守护结果显示
    handleGuardResultShow = (e) => {
        e && e.preventDefault()
        this.setState({
            guardResult: true
        })
    }

    // 错误提示 toast
    handleErrMsgType2 = (text, className = 'tips-warning type3') => {
        const { tipsShow } = this.state
        if (!tipsShow && text) {
            if (text === 'accessToken验证失败') {
                text = '飞到外太空啦，请重新登录'
            }
            this.setState({
                tipsShow: true,
                tipsContent: text,
                tipsClass: className
            }, () => {
                setTimeout(() => {
                    this.setState({
                        tipsShow: false,
                        tipsClass: 'tips-warning type3',
                        tipsContent: '',
                    })
                }, 2900)
            })
        }
    }

    // 错误提示 toast
    handleErrMsg = (text, className = 'tips-warning type3') => {
        const { tipsShow } = this.state
        if (!tipsShow && text) {
            if (text === 'accessToken验证失败') {
                text = '飞到外太空啦，请重新登录'
            }
            this.setState({
                tipsShow: true,
                tipsContent: text,
                tipsClass: className
            }, () => {
                setTimeout(() => {
                    this.setState({
                        tipsShow: false,
                        tipsClass: 'tips-warning type3',
                        tipsContent: '',
                    })
                }, 1900)
            })
        }
    }

    // 直播时间计时
    LiveTimeCountDown = () => {
        const { minute, second } = this.state
        let sec = second;
        let min = minute;
        sec++
        if (sec >= 60) {
            sec = 0;
            min++
        }
        this.setState({
            minute: min,
            second: sec,
        })
    }

    // 守护特效不展示
    handleGuardEffectHide = () => {
        this.setState({
            guardEffectClass: 'modal-guard-effect zoom-disappear'
        }, () => {
            setTimeout(() => {
                this.setState({
                    guardEffectShow: false
                })
            }, 500);
        })
    }

    // im登录房间
    loginRoom = (isInit) => {
        isEnableSend = false
        const _this = this
        const { dataUser } = this.state
        selType = webim.SESSION_TYPE.GROUP
        selToID = anchorId
        selSessHeadUrl = dataUser.avatarUrl || default_avatar
        if (!userId || !userSig) {
            return;
        }
        loginInfo = {
            'sdkAppID': (host.indexOf('pre') !== -1 || host.indexOf('dev') !== -1 || host.indexOf('localhost') !== -1) ? 1400142184 : 1400131192,
            'appIDAt3rd': (host.indexOf('pre') !== -1 || host.indexOf('dev') !== -1 || host.indexOf('localhost') !== -1) ? 1400142184 : 1400131192,
            'accountType': (host.indexOf('pre') !== -1 || host.indexOf('dev') !== -1 || host.indexOf('localhost') !== -1) ? 36862 : 36630,
            'identifier': userId,
            'userSig': userSig,
            'identifierNick': dataUser.nickName || '',
            'headurl': selSessHeadUrl,
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
                if (seq && seq === item.seq) {
                    return
                }
                seq = item.seq
                const msg = handleMsg(item)
                if (msg) {
                    _this.handleImMsg(msg)
                }
            }
        }
        const onBigGroupMsgNotify = function (newMsgList) {
            for (const item of newMsgList) {
                if (seqBig && seqBig === item.seq) {
                    return
                }
                seqBig = item.seq
                const msg = handleMsg(item)
                if (msg) {
                    _this.handleImMsg(msg)
                }
            }
        }
        const listeners = {
            onConnNotify,
            jsonpCallback,
            onBigGroupMsgNotify,
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
                _this.applyJoinGroup()
                _this.applyJoinBroadcastGroup()
            },
            (e) => {
                if (e.ErrorCode === 70003 || e.ErrorCode === 70001 || e.ErrorCode === 70002 || e.ErrorCode === 70005 || e.ErrorCode === 70009 || e.ErrorCode === 70013 || e.ErrorCode === 70014 || e.ErrorCode === 70052) {
                    if (errTimes < 6) {
                        loginStatus ? _this.fetchImSig(isInit) : _this.guestFetchImSig(isInit)
                        errTimes++
                    }
                } else {
                    errTimes = 1
                    _this.applyJoinGroup()
                    _this.applyJoinBroadcastGroup()
                }
            },
        )
    }

    // 加入广播大群
    applyJoinBroadcastGroup = () => {
        const options = {
            'GroupId': broadcastRoomId.toString()
        }
        webim.applyJoinBigGroup(
            options,
            () => { },
            () => { }
        )
    }

    // 加入房间
    applyJoinGroup = () => {
        if (!anchorId) {
            return
        }
        const options = {
            'GroupId': anchorId.toString()
        }
        webim.applyJoinGroup(
            options,
            (e) => {
                isEnableSend = true
            },
            (e) => {
                isEnableSend = true
            }
        )
    }

    // 进入直播间
    enterRoom = (isInit, callback = null) => {
        if (!anchorId) {
            return
        }
        if (!isInit) {
            const { enterRoomNew } = this.props
            enterRoomNew({
                'roomId': anchorId,
            }).then(resp => {
                if (resp) {
                    if (resp.ern_code) {
                        const result = isAccountExpire(resp.ern_code)
                        if (result) {
                            this.initLogoutStatus(false, this.initVisitorStatus)
                            return
                        }
                    }
                    if (resp.ern_succ) {
                        this.setState({
                            dataRoom: resp.ern_data || {},
                        })
                        effectAnchorAvatar = formatUserAvatar(resp.ern_data.anchorAvatar)
                        if (resp.ern_data.openStatus === 1) {
                            this.handleLiveTip(1, '直播已经结束', 0);
                            return;
                        }
                        callback && callback(isInit)
                        if (resp.ern_data.guardType === 0) {
                            this.initGuardGuide()
                        }
                    } else {
                        if (resp.ern_msg) {
                            this.handleLiveTip(1, resp.ern_msg, 0)
                        } else {
                            this.handleLiveTip(1, errMsg, 0)
                        }
                        kickOut = true
                    }
                } else {
                    this.initLogoutStatus(false, this.initVisitorStatus)
                }
            })
        } else {
            const { enterRoom } = this.props
            enterRoom({
                'roomId': anchorId,
            }).then(resp => {
                if (resp) {
                    if (resp.er_code) {
                        const result = isAccountExpire(resp.er_code)
                        if (result) {
                            this.initLogoutStatus(false, this.initVisitorStatus)
                            return
                        }
                    }
                    if (resp.er_succ) {
                        this.setState({
                            dataRoom: resp.er_data || {},
                        })
                        effectAnchorAvatar = formatUserAvatar(resp.er_data.anchorAvatar)
                        if (resp.er_data.openStatus === 1) {
                            this.handleLiveTip(1, '直播已经结束', 0);
                            return;
                        }
                        callback && callback(isInit)
                        if (resp.er_data.guardType === 0) {
                            this.initGuardGuide()
                        }
                    } else {
                        if (resp.er_msg) {
                            this.handleLiveTip(1, resp.er_msg, 0)
                        } else {
                            this.handleLiveTip(1, errMsg, 0)
                        }
                        kickOut = true
                    }
                } else {
                    this.initLogoutStatus(false, this.initVisitorStatus)
                }
            })
        }
    }

    // 游客进入直播间
    guestEnterRoom = (isInit, callback = null) => {
        if (!anchorId) {
            return
        }
        const { guestEnterRoom } = this.props
        guestEnterRoom({
            'roomId': anchorId,
        }).then(resp => {
            if (resp) {
                if (resp.ger_succ) {
                    this.setState({
                        dataRoom: resp.ger_data || {},
                    })
                    effectAnchorAvatar = formatUserAvatar(resp.ger_data.anchorAvatar)
                    if (resp.ger_data.openStatus === 1) {
                        this.handleLiveTip(1, '直播已经结束', 0);
                        return;
                    }
                    callback && callback(isInit)
                }
            }
        })
    }

    // 赠送礼物
    sendGift = (giftId, giftCount, giftType) => {
        if (giftId === -1 || !giftCount || giftType === -1) return
        if (!isEnableSend) {
            this.handleErrMsg(`亲，进入直播聊天室有延迟，请重新赠送试试`)
            return
        }
        const { sendGift } = this.props
        sendGift({
            giftId,
            giftCount,
            anchorUid: anchorId,
            giftType,
            comboId,
        }).then(resp => {
            if (resp) {
                if (resp.sg_code) {
                    const result = isAccountExpire(resp.sg_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        return
                    }
                }
                if (resp.sg_succ && _.parseInt(resp.sg_value) >= 0) {
                    this.setState({
                        kuCoin: _.parseInt(resp.sg_value),
                    })
                } else if (resp.sg_msg) {
                    this.handleErrMsg(resp.sg_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
            }
        })
    }

    // 添加关注
    addAttention = (e, targetUserId, type) => {
        e && e.preventDefault();
        if (!targetUserId || !anchorId) {
            return;
        }
        if (targetUserId === userId) {
            this.handleErrMsg('不能关注自己')
            return
        }
        if (!loginStatus) {
            this.setState({
                targetShow: false,
            })
            this.handleLoginShow(e, 'login')
            return;
        }
        const { addAttention } = this.props
        addAttention({
            targetUserId,
            anchorUserId: anchorId,
        }).then(resp => {
            if (resp) {
                if (resp.aa_code) {
                    const result = isAccountExpire(resp.aa_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        return
                    }
                }
                if (resp.aa_succ) {
                    if (type === 1) {
                        this.handleErrMsg('关注成功')
                        const { dataRoom } = this.state
                        const data = _.assign({}, dataRoom)
                        data.follow = 1
                        this.setState({
                            dataRoom: data,
                        })
                    } else {
                        this.handleErrMsg('关注成功')
                        const { dataTarget } = this.state
                        const data = _.assign({}, dataTarget)
                        data.isAttention = 1
                        this.setState({
                            dataTarget: data,
                        })
                    }
                } else if (resp.aa_msg) {
                    this.handleErrMsg(resp.aa_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
            }
        })
    }

    // 取消关注
    cancelAttention = (e, targetUserId, type) => {
        e && e.preventDefault();
        if (!targetUserId) {
            return;
        }
        if (!loginStatus) {
            if (type === 0) {
                this.setState({
                    targetShow: false,
                })
            }
            this.handleLoginShow(e, 'login')
            return;
        }
        const { cancelAttention } = this.props
        cancelAttention({
            targetUserId,
        }).then(resp => {
            if (resp) {
                if (resp.ca_code) {
                    const result = isAccountExpire(resp.ca_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        return
                    }
                }
                if (resp.ca_succ) {
                    if (type === 1) {
                        this.handleErrMsg('取消关注成功')
                        const { dataRoom } = this.state
                        const data = _.assign({}, dataRoom)
                        data.follow = 0
                        this.setState({
                            dataRoom: data,
                        })
                    } else {
                        this.handleErrMsg('取消关注成功')
                        const { dataTarget } = this.state
                        const data = _.assign({}, dataTarget)
                        data.isAttention = 0
                        this.setState({
                            dataTarget: data,
                        })
                    }
                } else if (resp.ca_msg) {
                    this.handleErrMsg(resp.ca_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
            }
        })
    }

    // 发送弹幕
    sendBarrage = () => {
        const { sendBarrage } = this.props
        const { msgToSend, tanmuType } = this.state
        let message = _.trim(msgToSend)
        for (let i = 0; i < sensitiveWordList.length; i++) {
            message = replaceSensitiveWordVersion2(sensitiveWordList[i], message)
            while (existSensitiveWord(sensitiveWordList[i], message)) {
                message = replaceSensitiveWordVersion2(sensitiveWordList[i], message)
            }
        }
        sendBarrage({
            roomId: anchorId,
            barrageMsg: message,
            type: tanmuType,
        }).then(resp => {
            if (resp) {
                if (resp.sb_code) {
                    const result = isAccountExpire(resp.sb_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        return
                    }
                }
                if (resp.sb_succ && _.parseInt(resp.sb_value) >= 0) {
                    this.setState({
                        kuCoin: _.parseInt(resp.sb_value),
                        msgToSend: '',
                    })
                } else if (resp.sb_msg) {
                    this.handleErrMsg(resp.sb_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
            }
        })
    }

    // 获取观众列表
    fetchAudienceList = (callback = null) => {
        if (!anchorId) {
            return
        }
        const { fetchAudienceList } = this.props
        fetchAudienceList({
            anchorId
        }).then(resp => {
            if (resp) {
                if (resp.fal_code) {
                    const result = isAccountExpire(resp.fal_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        setTimeout(() => {
                            this.guestFetchAudienceList(callback)
                        }, 500);
                        return
                    }
                }
                if (resp.fal_succ) {
                    this.setState({
                        audienceList: resp.fal_list || [],
                        audience: resp.fal_value || 0,
                    })
                    callback && callback()
                } else if (resp.fal_msg) {
                    this.handleErrMsg(resp.fal_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
                setTimeout(() => {
                    this.guestFetchAudienceList(callback)
                }, 500);
            }
        })
    }

    // 游客获取观众列表
    guestFetchAudienceList = (callback = null) => {
        if (!anchorId) {
            return
        }
        const { guestFetchAudienceList } = this.props
        guestFetchAudienceList({
            anchorId
        }).then(resp => {
            if (resp) {
                if (resp.gfal_succ) {
                    this.setState({
                        audienceList: resp.gfal_list || [],
                        audience: resp.gfal_value || 0,
                    })
                    callback && callback()
                } else if (resp.gfal_msg) {
                    this.handleErrMsg(resp.gfal_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 获取守护列表
    fetchGuardList = (callback = null) => {
        if (!anchorId) {
            return
        }
        const { fetchGuardList } = this.props
        fetchGuardList({
            userId: anchorId,
            type: 1,
        }).then(resp => {
            if (resp) {
                if (resp.fgl_code) {
                    const result = isAccountExpire(resp.fgl_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        setTimeout(() => {
                            this.guestFetchGuardList(callback)
                        }, 500);
                        return
                    }
                }
                if (resp.fgl_succ) {
                    this.setState({
                        guardList: resp.fgl_list || [],
                    })
                    callback && callback()
                } else if (resp.fgl_msg) {
                    this.handleErrMsg(resp.fgl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
                setTimeout(() => {
                    this.guestFetchGuardList(callback)
                }, 500);
            }
        })
    }

    // 游客获取守护列表
    guestFetchGuardList = (callback = null) => {
        if (!anchorId) {
            return
        }
        const { guestFetchGuardList } = this.props
        guestFetchGuardList({
            userId: anchorId,
            type: 1,
        }).then(resp => {
            if (resp) {
                if (resp.gfgl_succ) {
                    this.setState({
                        guardList: resp.gfgl_list || [],
                    })
                    callback && callback()
                } else if (resp.gfgl_msg) {
                    this.handleErrMsg(resp.gfgl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 获取房间管理员列表
    fetchManagerList = (callback = null) => {
        if (!anchorId) {
            return
        }
        const { fetchManagerList } = this.props
        fetchManagerList({
            anchorId,
        }).then(resp => {
            if (resp) {
                if (resp.fml_code) {
                    const result = isAccountExpire(resp.fml_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        setTimeout(() => {
                            this.guestFetchManagerList(callback)
                        }, 500);
                        return
                    }
                }
                if (resp.fml_succ) {
                    this.setState({
                        managerList: resp.fml_list || [],
                    })
                    callback && callback()
                } else if (resp.fml_msg) {
                    this.handleErrMsg(resp.fml_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
                setTimeout(() => {
                    this.guestFetchManagerList(callback)
                }, 500);
            }
        })
    }

    // 头像加载错误优化
    errorImgAvatar = () => {
        // eslint-disable-next-line no-restricted-globals
        const img = event.srcElement;
        img.src = default_avatar;
        img.onerror = null;
    }

    // 封面加载错误优化
    errorImgCover = () => {
        // eslint-disable-next-line no-restricted-globals
        const img = event.srcElement;
        img.src = default_cover;
        img.onerror = null;
    }

    // 游客获取管理员列表
    guestFetchManagerList = (callback = null) => {
        if (!anchorId) {
            return
        }
        const { guestFetchManagerList } = this.props
        guestFetchManagerList({
            anchorId,
        }).then(resp => {
            if (resp) {
                if (resp.gfml_succ) {
                    this.setState({
                        managerList: resp.gfml_list || [],
                    })
                    callback && callback()
                } else if (resp.gfml_msg) {
                    this.handleErrMsg(resp.gfml_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 上传图片
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
                                this.exitRoom('expire', anchorId)
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
                        this.exitRoom('expire', anchorId)
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

    // 更新用户头像
    updateUserAvatar = (avatar) => {
        const { updateUserAvatar } = this.props
        updateUserAvatar({
            photoUrl: avatar,
        }).then(resp => {
            if (resp) {
                if (resp.uua_code) {
                    const result = isAccountExpire(resp.uua_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
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
                this.exitRoom('expire', anchorId)
            }
        })
    }

    // 获取推荐主播列表
    fetchRandomLiveList = (e, num, type) => {
        e && e.preventDefault();
        const { fetchRandomLiveList } = this.props
        let list
        let index
        fetchRandomLiveList({
            num,
        }).then(resp => {
            if (resp) {
                if (resp.frll_code) {
                    const result = isAccountExpire(resp.frll_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        setTimeout(() => {
                            this.guestFetchRandomLiveList(e, num, type)
                        }, 500);
                        return
                    }
                }
                if (resp.frll_succ) {
                    if (type === 1) {
                        list = resp.frll_list.filter(item => _.parseInt(item.anchorId) !== _.parseInt(anchorId)) || []
                        if (list.length > 3) {
                            index = _.random(0, list.length - 3);
                            this.setState({
                                randomList: _.slice(list, index, index + 3) || [],
                            })
                        } else {
                            this.setState({
                                randomList: _.slice(list, 0, 3) || [],
                            })
                        }
                    } else if (type === 0) {
                        list = resp.frll_list.filter(item => _.parseInt(item.anchorId) !== _.parseInt(anchorId)) || []
                        if (list.length > 4) {
                            index = _.random(0, list.length - 4);
                            this.setState({
                                randomListOver: _.slice(list, index, index + 4) || [],
                            })
                        } else {
                            this.setState({
                                randomListOver: _.slice(list, 0, 4) || [],
                            })
                        }
                    } else if (type === 2) {
                        list = resp.frll_list.filter(item => _.parseInt(item.anchorId) !== _.parseInt(anchorId)) || []
                        if (list.length === 0) {
                            return
                        } else {
                            index = _.random(0, list.length - 1);
                            this.handleGoLive(null, list[index])
                        }
                    }
                } else if (resp.frll_msg) {
                    this.handleErrMsg(resp.frll_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
                setTimeout(() => {
                    this.guestFetchRandomLiveList(e, num, type)
                }, 500);
            }
        })
    }

    // 游客获取推荐主播列表
    guestFetchRandomLiveList = (e, num, type, callback = null) => {
        e && e.preventDefault();
        const { guestFetchRandomLiveList } = this.props
        let list
        let index
        guestFetchRandomLiveList({
            num,
        }).then(resp => {
            if (resp) {
                if (resp.gfrll_succ) {
                    if (type === 1) {
                        list = resp.gfrll_list.filter(item => _.parseInt(item.anchorId) !== _.parseInt(anchorId)) || []
                        if (list.length > 3) {
                            index = _.random(0, list.length - 3);
                            this.setState({
                                randomList: _.slice(list, index, index + 3) || [],
                            })
                        } else {
                            this.setState({
                                randomList: _.slice(list, 0, 3) || [],
                            })
                        }
                        callback && callback()
                    } else if (type === 0) {
                        list = resp.gfrll_list.filter(item => _.parseInt(item.anchorId) !== _.parseInt(anchorId)) || []
                        if (list.length > 4) {
                            index = _.random(0, list.length - 4);
                            this.setState({
                                randomListOver: _.slice(list, index, index + 4) || [],
                            })
                        } else {
                            this.setState({
                                randomListOver: _.slice(list, 0, 4) || [],
                            })
                        }
                        callback && callback()
                    } else if (type === 2) {
                        list = resp.gfrll_list.filter(item => _.parseInt(item.anchorId) !== _.parseInt(anchorId)) || []
                        if (list.length === 0) {
                            return
                        } else {
                            index = _.random(0, list.length - 1);
                            this.handleGoLive(null, list[index])
                        }
                        callback && callback()
                    }
                } else if (resp.gfrll_msg) {
                    this.handleErrMsg(resp.gfrll_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 切换flv格式播放器
    switchFlvLivePlayer = (e) => {
        e && e.preventDefault()
        this.setState({
            maskFlashDisplay: false,
            maskTextDisplay: false,
            maskContent: '',
            cleanDisplay: true,
            cleanWorldDisplay: true,
            maskFlvDisplay: false,
            maskPauseDisplay: false,
            live: 1,
        })
        this.transferFlvLivePlayer();
    }

    // 初始化登出状态
    initLogoutStatus = (isInit, callback = null) => {
        if (loginStatus) {
            customCookie.delCookie('kx_live_userId')
            customCookie.delCookie('kx_live_token')
            window.localStorage.removeItem('kx_live_login')
            userId = 0
            this.setState({
                isLogin: false,
                kuCoin: 0,
            })
            loginStatus = false
        }
        callback && callback(isInit)
    }

    // 初始化flv快进方式
    initFlvSkip = () => {
        if (!this.timerFlv) {
            this.timerFlv = setInterval(() => {
                const player = document.querySelector('video')
                const time = player.currentTime
                player.currentTime = time + 0.1
            }, 5000);
        }
    }

    // 清除flv快进方式
    clearFlvSkip = () => {
        clearInterval(this.timerFlv)
        this.timerFlv = null
    }

    // 获取直播地址
    fetchLiveUrl = () => {
        const { fetchLiveUrl } = this.props;
        fetchLiveUrl({
            anchorId
        }).then(resp => {
            if (resp) {
                if (resp.flu_code) {
                    const result = isAccountExpire(resp.flu_code)
                    if (result) {
                        this.initLogoutStatus(false, this.initVisitorStatus)
                        setTimeout(() => {
                            this.guestFetchLiveUrl()
                        }, 500);
                        return
                    }
                }
                if (resp.flu_succ) {
                    dataPlay = resp.flu_data || {};
                    this.initLivePlayer();
                } else {
                    if (resp.flu_code === -400012) {
                        this.handleLiveTip(1, '直播已经结束', 0);
                    } else if (resp.flu_msg) {
                        this.handleLiveTip(1, resp.flu_msg, 0);
                    }
                }
            } else {
                this.initLogoutStatus(false, this.initVisitorStatus)
                setTimeout(() => {
                    this.guestFetchLiveUrl()
                }, 500);
            }
        });
    }

    // 游客获取直播地址
    guestFetchLiveUrl = () => {
        const { guestFetchLiveUrl } = this.props;
        guestFetchLiveUrl({
            anchorId
        }).then(resp => {
            if (resp) {
                if (resp.gflu_succ) {
                    dataPlay = resp.gflu_data || {};
                    this.initLivePlayer();
                } else {
                    if (resp.gflu_code === -400012) {
                        this.handleLiveTip(1, '直播已经结束', 0);
                    } else if (resp.gflu_msg) {
                        this.handleLiveTip(1, resp.gflu_msg, 0);
                    }
                }
            }
        });
    }

    // token第三方登录
    loginByToken = () => {
        const { loginByToken } = this.props
        loginByToken().then(resp => {
            if (resp) {
                if (resp.lbto_succ) {
                    if (resp.lbto_data.userId && resp.lbto_data.accessToken) {
                        // !window.sessionStorage.getItem('kx_live_slient_login') && window.sessionStorage.setItem('kx_live_slient_login', '1')
                        customCookie.setCookie("kx_live_token", resp.lbto_data.accessToken, "d6");
                        customCookie.setCookie("kx_live_userId", resp.lbto_data.userId, "d6");
                        userId = _.parseInt(resp.lbto_data.userId)
                    }
                } else if (resp.lbto_msg) {
                    // this.handleErrMsg(resp.l_msg)
                } else {
                    // this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 获取sig
    fetchImSig = (isInit) => {
        const { fetchImSig } = this.props
        fetchImSig().then(resp => {
            if (resp) {
                if (isInit && resp.fis_code) {
                    const result = isAccountExpire(resp.fis_code)
                    if (result) {
                        this.initLogoutStatus(isInit, this.initVisitorStatus)
                        return
                    }
                }
                if (resp.fis_succ && resp.fis_value) {
                    userSig = resp.fis_value
                    customCookie.setCookie(`kx_live_sig_${userId.toString()}`, userSig, "d6");
                    this.enterRoom(isInit, this.loginRoom)
                    // this.loginRoom(isInit)
                    if (!isInit) {
                        this.initPageUpdate(false)
                    }
                } else if (resp.fis_msg) {
                    this.handleErrMsg(resp.fis_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(isInit, this.initVisitorStatus)
            }
        })
    }

    // 注册新用户获取sig
    fetchImSigForRegister = () => {
        const { fetchImSig } = this.props
        fetchImSig().then(resp => {
            if (resp) {
                if (resp.fis_code) {
                    const result = isAccountExpire(resp.fis_code)
                    if (result) {
                        this.initLogoutStatus(false, this.initVisitorStatus)
                        return
                    }
                }
                if (resp.fis_succ && resp.fis_value) {
                    userSig = resp.fis_value
                    customCookie.setCookie(`kx_live_sig_${userId.toString()}`, userSig, "d6");
                    this.enterRoom(false, this.loginRoom)
                    // this.loginRoom(false)
                    this.initPageUpdate(true)
                } else if (resp.fis_msg) {
                    this.handleErrMsg(resp.fis_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(false, this.initVisitorStatus)
            }
        })
    }

    // 游客获取sig
    guestFetchImSig = (isInit) => {
        const { guestFetchImSig } = this.props
        guestFetchImSig().then(resp => {
            if (resp) {
                if (resp.gfis_succ) {
                    if (resp.gfis_data.userSig && resp.gfis_data.identifier) {
                        userSig = resp.gfis_data.userSig
                        userId = resp.gfis_data.identifier
                        customCookie.setCookie("kx_live_visitor_sig", `${userId}|${userSig}`, "d6");
                        this.guestEnterRoom(isInit, this.loginRoom)
                        // this.loginRoom(isInit)
                    }
                } else if (resp.gfis_msg) {
                    this.handleErrMsg(resp.gfis_msg)
                } else {
                    this.handleErrMsg(errMsg)
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
                        window.localStorage.setItem("kx_live_login", '1')
                        // !window.sessionStorage.getItem('kx_live_slient_login') && window.sessionStorage.setItem('kx_live_slient_login', '1')
                        // window.location.reload(true)
                        this.handleLoginHide(null)
                        userId = _.parseInt(resp.l_data.userId) || 0
                        this.exitRoom('login', anchorId)
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
                        window.localStorage.setItem("kx_live_login", '1')
                        // !window.sessionStorage.getItem('kx_live_slient_login') && window.sessionStorage.setItem('kx_live_slient_login', '1')
                        // window.location.reload(true)
                        this.handleLoginHide(null)
                        userId = _.parseInt(resp.r_data.userId) || 0
                        this.exitRoom('register', anchorId)
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

    // 礼物数量连乘显示
    handleGiftNumberShow = (e) => {
        e && e.preventDefault();
        const { show } = this.state
        if (show) {
            this.timerValue && clearInterval(this.timerValue);
            this.timerValue = null;
            this.timerText && clearInterval(this.timerText);
            this.timerText = null;
            this.timerTime && clearTimeout(this.timerTime);
            this.timerTime = null;
            this.setState({
                value: 0,
                time: 3,
                show: false
            });
        }
        this.setState({
            giftSelectShow: true
        })
        window.addEventListener('click', this.onClickGiftNumItem, true);
    }

    // 选择礼物送礼数量
    handleSelectGiftNumber = (e, index) => {
        e && e.preventDefault();
        this.setState({
            giftNumIndex: index,
            giftSelectShow: false
        })
        window.removeEventListener('click', this.onClickGiftNumItem, true);
    }

    // 表情窗口关闭
    onClickMaskEmotion = (e) => {
        const { emotionShow } = this.state;
        if (!emotionShow) {
            return;
        }
        const { target } = e;
        if (target.className !== 'emotion-item-click' && target.parentNode.className !== 'emotion-item-click' && target.parentNode.className !== 'emotion-image' && target.className !== 'emotion-image') {
            this.setState({
                emotionShow: false
            })
            window.removeEventListener('click', this.onClickMaskEmotion, true);
        }
    };

    // 礼物数量选择
    onClickGiftNumItem = (e) => {
        const { giftSelectShow } = this.state;
        if (!giftSelectShow) {
            return;
        }
        const { target } = e;
        if (target.className !== 'num-item') {
            this.setState({
                giftSelectShow: false
            })
            window.removeEventListener('click', this.onClickGiftNumItem, true);
        }
    };

    // 发送验证码
    sendVerificationCode = (e, type) => {
        e && e.preventDefault()
        const { sendBtnEnable } = this.state
        if (!sendBtnEnable) {
            return
        }
        const { sendVerificationCode } = this.props
        const { mobile, areaCode } = this.state
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

    // 获取用户资产
    fetchAsset = () => {
        const { fetchAsset } = this.props
        fetchAsset().then(resp => {
            if (resp) {
                if (resp.fa_code) {
                    const result = isAccountExpire(resp.fa_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
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
                this.exitRoom('expire', anchorId)
            }
        })
    }

    // 获取勋章
    fetchItemConfigList = () => {
        const { fetchItemConfigList } = this.props
        medalListVersion = window.localStorage.getItem('kx_live_medal_list_version') || 1
        const list = window.localStorage.getItem('kx_live_medal_list')
        if (list && list.length > 0)
            medalList = JSON.parse(aesDecrypt(list)) || []
        if (medalList.length === 0 && medalListVersion) {
            medalListVersion = 1
        }
        fetchItemConfigList({
            configVersion: medalListVersion,
            itemType: 4,
            forceGet: 0,
        }).then(resp => {
            if (resp) {
                if (resp.ficl_code) {
                    const result = isAccountExpire(resp.ficl_code)
                    if (result) {
                        this.initLogoutStatus(false, this.initVisitorStatus)
                        setTimeout(() => {
                            this.guestFetchItemConfigList()
                        }, 500);
                        return
                    }
                }
                if (resp.ficl_succ) {
                    if (resp.ficl_list && resp.ficl_list.length > 0) {
                        medalListVersion = resp.ficl_value
                        window.localStorage.setItem('kx_live_medal_list_version', medalListVersion)
                        medalList = resp.ficl_list.filter(item => item.type === 4);
                        window.localStorage.setItem('kx_live_medal_list', aesEncrypt(JSON.stringify(medalList)))
                    }
                } else if (resp.ficl_msg) {
                    this.handleErrMsg(resp.ficl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(false, this.initVisitorStatus)
            }
        })
    }

    // 游客获取勋章
    guestFetchItemConfigList = () => {
        const { guestFetchItemConfigList } = this.props
        medalListVersion = window.localStorage.getItem('kx_live_medal_list_version') || 1
        const list = window.localStorage.getItem('kx_live_medal_list')
        if (list && list.length > 0)
            medalList = JSON.parse(aesDecrypt(list)) || []
        if (medalList.length === 0 && medalListVersion) {
            medalListVersion = 1
        }
        guestFetchItemConfigList({
            configVersion: medalListVersion,
            itemType: 4,
            forceGet: 0,
        }).then(resp => {
            if (resp) {
                if (resp.gficl_succ) {
                    if (resp.gficl_list && resp.gficl_list.length > 0) {
                        medalListVersion = resp.gficl_value
                        window.localStorage.setItem('kx_live_medal_list_version', medalListVersion)
                        medalList = resp.gficl_list.filter(item => item.type === 4);
                        window.localStorage.setItem('kx_live_medal_list', aesEncrypt(JSON.stringify(medalList)))
                    }
                } else if (resp.gficl_msg) {
                    this.handleErrMsg(resp.gficl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 表情包显示
    handleEmotionShow = (e) => {
        e && e.preventDefault()
        this.setState({
            emotionShow: true
        })
        window.addEventListener('click', this.onClickMaskEmotion, true);
    }

    // 优化处理im消息
    handleImMsg = (object) => {
        if (!object || !object.retCode || !anchorId) return
        const { fetchTargetUserInfo, guestFetchTargetUserInfo } = this.props
        const { dataRoom, dataUser, cleanWorldStatus } = this.state
        const groupId = _.parseInt(object.groupId)
        if (groupId !== 0 && groupId !== 110110 && groupId !== anchorId) {
            this.exitRoom('', groupId)
            return
        }
        if (object.retCode !== 10) {
            if (!isLiving(dataRoom.openIdentify, object.openIdentify)) {
                return
            }
        }
        let data
        switch (object.retCode) {
            case 10:
                this.setState({
                    dataChatMsg: object.data,
                }, () => this.showMsg(0))
                break
            case 100:
                if (pageVisible) {
                    if (loginStatus) {
                        const result = isAccountExpire('')
                        if (result) {
                            this.exitRoom('expire', anchorId)
                        } else {
                            this.fetchAudienceList(null)
                        }
                    } else {
                        this.guestFetchAudienceList(null)
                    }
                }
                break
            case 101:
                if (object.data) {
                    data = _.assign({}, dataRoom)
                    data = {
                        ...data,
                        dayRank: object.data.dayRank,
                    }
                    if (object.data.starLight > data.starlight) {
                        data = {
                            ...data,
                            starlight: object.data.starLight,
                        }
                    }
                    if (object.data.sunLight > data.sunlight) {
                        data = {
                            ...data,
                            sunlight: object.data.sunLight,
                        }
                    }
                    this.setState({
                        dataRoom: data,
                    })
                }
                break
            case 102:
                if (object.data && object.data === userId) {
                    this.fetchAsset()
                }
                break
            case 103:
                if (object.data) {
                    data = _.assign({}, dataRoom)
                    data = {
                        ...data,
                        dayRank: object.data.dayRank,
                        starlight: object.data.starLight,
                        sunlight: object.data.sunLight,
                    }
                    this.setState({
                        dataRoom: data,
                    })
                }
                break
            case 104:
                this.handleLiveTip(1, '直播已经结束', 0);
                break
            case 106:
                if (object.data && object.data.type) {
                    if (object.data.message) {
                        this.handleErrMsg(object.data.message)
                    }
                    if (object.data.type === 3) {
                        this.logout(null)
                    }
                }
                break
            case 107:
                if (object.data) {
                    this.setState({
                        dataChatMsg: object.data,
                    }, () => this.showMsg(10))
                    this.setState({
                        guardEffectName: object.data.guardName,
                        guardEffectUserName: object.data.nickname,
                        guardEffectAvatar: object.data.avatar,
                    }, () => {
                        this.setState({
                            guardEffectClass: 'modal-guard-effect popIn',
                            guardEffectShow: true,
                            guardResult: false
                        }, () => {
                            setTimeout(() => {
                                const { guardEffectShow } = this.state
                                if (guardEffectShow) {
                                    this.setState({
                                        guardEffectClass: 'modal-guard-effect zoom-disappear',
                                    }, () => {
                                        setTimeout(() => {
                                            this.setState({
                                                guardEffectShow: false
                                            })
                                        }, 1500);
                                    })
                                }
                            }, 6000);
                        })
                    })
                }
                break
            case 108:
                if (object.data) {
                    data = _.assign({}, dataRoom)
                    if (object.data.anchorNextEx > data.anchorNextEx || object.data.anchorEx > data.anchorEx) {
                        if (object.data.anchorNextEx > data.anchorNextEx) {
                            data = {
                                ...data,
                                anchorNextEx: object.data.anchorNextEx,
                            }
                        }
                        if (object.data.anchorEx > data.anchorEx) {
                            data = {
                                ...data,
                                anchorEx: object.data.anchorEx,
                            }
                        }
                        this.setState({
                            dataRoom: data,
                        })
                    }
                }
                break
            case 109:
                if (object.data) {
                    if (object.data.globalFlag === 0) {
                        this.initRunwayMsgQueue()
                        runwayMsgQueue.push(object.data)
                    } else if (object.data.globalFlag === 1) {
                        this.initRunwayThroughMsgQueue()
                        runwayMsgThroughQueue.push(object.data)
                    }
                }
                break
            case 110:
                if (object.data) {
                    if (object.data.barrageType === 0 || (object.data.barrageType === 1 && !cleanWorldStatus)) {
                        this.initTanmuMsgQueue()
                        barrageMsgQueue.push(object.data)
                    }
                    if (object.data.barrageType === 0 || (object.data.barrageType === 1 && object.data.ownRoomId === anchorId)) {
                        this.setState({
                            dataChatMsg: object.data,
                        }, () => this.showMsg(11))
                    }
                }
                break
            case 111:
                if (object.data && object.data.dstUId === anchorId) {
                    this.setState({
                        dataChatMsg: object.data,
                    }, () => this.showMsg(5))
                }
                break
            case 112:
                if (object.data) {
                    this.initGiftMsgQueue()
                    giftMsgQueue.push(object.data)
                    if (host.indexOf('17kuxiu.com') !== -1) {
                        if (object.data.animationUrl) {
                            this.initGiftEffectQueue()
                            effectUserAvatar = formatUserAvatar(object.data.avatar)
                            effectUserNickName = formatSvgaNickName(object.data.nickname || '')
                            effectAnchorNickName = formatSvgaNickName(object.data.anchorNickName || '')
                            const url = formatAnimationUrl(object.data.animationUrl, isHttps)
                            giftEffectQueue.push(url)
                        }
                    }
                    // if (object.data.giftType !== 1) {
                    //     this.setState({
                    //         dataChatMsg: object.data,
                    //     }, () => this.showMsg(12))
                    // }
                    data = _.assign({}, dataRoom)
                    if (object.data.anchorLevel > data.anchorLevel || object.data.anchorExp > data.anchorEx || object.data.anchorNextLevelExp > data.anchorNextEx) {
                        if (object.data.anchorLevel > data.anchorLevel) {
                            data = {
                                ...data,
                                anchorLevel: object.data.anchorLevel,
                            }
                        }
                        if (object.data.anchorExp > data.anchorEx) {
                            data = {
                                ...data,
                                anchorEx: object.data.anchorExp,
                            }
                        }
                        if (object.data.anchorNextLevelExp > data.anchorNextEx) {
                            data = {
                                ...data,
                                anchorNextEx: object.data.anchorNextLevelExp,
                            }
                        }
                        this.setState({
                            dataRoom: data,
                        })
                    }
                }
                break
            case 113:
                if (object.data && object.data.type === 0) {
                    if (userId === object.data.userId) {
                        data = _.assign({}, dataUser)
                        if (object.data.userLevel >= data.userLevel) {
                            data = {
                                ...data,
                                userLevel: object.data.userLevel,
                            }
                            this.setState({
                                dataUser: data,
                            })
                            this.setState({
                                dataChatMsg: object.data,
                            }, () => this.showMsg(6))
                        }
                    } else {
                        if (loginStatus) {
                            fetchTargetUserInfo({
                                targetUserId: object.data.userId
                            }).then(resp => {
                                if (resp) {
                                    if (resp.ftui_code) {
                                        const result = isAccountExpire(resp.ftui_code)
                                        if (result) {
                                            this.exitRoom('expire', anchorId)
                                            setTimeout(() => {
                                                guestFetchTargetUserInfo({
                                                    targetUserId: object.data.userId
                                                }).then(res => {
                                                    if (res && res.gftui_succ) {
                                                        const dataUser = res.gftui_data || {}
                                                        if (dataUser && object.data.userLevel >= dataUser.userLevel) {
                                                            this.setState({
                                                                dataChatMsg: object.data || {}
                                                            }, () => this.showMsg(6))
                                                        }
                                                    }
                                                })
                                            }, 500);
                                            return
                                        }
                                    }
                                    if (resp.ftui_succ) {
                                        const dataUser = resp.ftui_data || {}
                                        if (dataUser && object.data.userLevel >= dataUser.userLevel) {
                                            this.setState({
                                                dataChatMsg: object.data || {}
                                            }, () => this.showMsg(6))
                                        }
                                    }
                                } else {
                                    this.exitRoom('expire', anchorId)
                                    setTimeout(() => {
                                        guestFetchTargetUserInfo({
                                            targetUserId: object.data.userId
                                        }).then(res => {
                                            if (res && res.gftui_succ) {
                                                const dataUser = res.gftui_data || {}
                                                if (dataUser && object.data.userLevel >= dataUser.userLevel) {
                                                    this.setState({
                                                        dataChatMsg: object.data || {}
                                                    }, () => this.showMsg(6))
                                                }
                                            }
                                        })
                                    }, 500);
                                }
                            })
                        } else {
                            guestFetchTargetUserInfo({
                                targetUserId: object.data.userId
                            }).then(resp => {
                                if (resp && resp.gftui_succ) {
                                    const dataUser = resp.gftui_data || {}
                                    if (dataUser && object.data.userLevel >= dataUser.userLevel) {
                                        this.setState({
                                            dataChatMsg: object.data || {}
                                        }, () => this.showMsg(6))
                                    }
                                }
                            })
                        }
                    }
                } else if (object.data && object.data.type === 1) {
                    data = _.assign({}, dataRoom)
                    if (object.data.anchorLevel >= data.anchorLevel) {
                        data = {
                            ...data,
                            anchorLevel: object.data.anchorLevel,
                        }
                        this.setState({
                            dataRoom: data,
                        })
                        this.setState({
                            dataChatMsg: object.data,
                        }, () => this.showMsg(6))
                    }
                }
                break
            case 114:
                if (object.data && object.data.type) {
                    this.initRunwayMsgQueue()
                    const type = object.data.type
                    let msg = '最新消息：'
                    switch (type) {
                        case 3:
                            const text = object.data.showText
                            if (text.length > 0) {
                                for (let i = 0; i < text.length; i++) {
                                    msg += text[i]
                                }
                                object.data.sysMsg = msg
                            }
                            break
                        default:
                            break
                    }
                    runwayMsgQueue.push(object.data)
                }
                break
            case 117:
                if (userId === object.data.userId) {
                    data = _.assign({}, dataRoom)
                    data = {
                        ...data,
                        banned: object.data.type,
                    }
                    this.setState({
                        dataRoom: data,
                    })
                }
                this.setState({
                    dataChatMsg: object.data,
                }, () => this.showMsg(7))
                break
            case 118:
                if (userId === object.data.userId) {
                    data = _.assign({}, dataRoom)
                    data = {
                        ...data,
                        manager: object.data.type,
                    }
                    this.setState({
                        dataRoom: data,
                    })
                }
                this.setState({
                    dataChatMsg: object.data,
                }, () => this.showMsg(8))
                break
            case 119:
                if (object.data) {
                    if (object.data.userId === userId) {
                        kickOut = true
                        this.handleLiveTip(1, `${object.data.operatorNickname || '管理员'}已将你踢出房间，请文明发言`, 0)
                    }
                    this.setState({
                        dataChatMsg: object.data,
                    }, () => this.showMsg(9))
                }
                break
            case 121:
                if (object.data) {
                    if ((object.data.userLevel && object.data.userLevel >= 10) || object.data.guardType > 0 || object.data.carName) {
                        this.initEnterMsgQueue()
                        enterMsgQueue.push(object.data)
                    }
                    this.setState({
                        dataChatMsg: object.data,
                    }, () => this.showMsg(13))
                    if (object.data.carUrl && object.data.showCardFlag === 0 && object.data.userId) {
                        this.initGiftEffectQueue()
                        const url = formatAnimationUrl(object.data.carUrl, isHttps)
                        giftEffectQueue.push(url)
                    }
                }
                break
            case 127:
                if (object.data) {
                    this.initRunwayMsgQueue()
                    runwayMsgQueue.push(object.data)
                }
                break
            case 129:
                if (object.data) {
                    if (object.data.anchorId === anchorId || object.data.byPKAnchorId === anchorId) {
                        if (!this.timerPk) {
                            this.initPlayerPkStart()
                        } else {
                            setTimeout(() => {
                                this.initPlayerPkStart()
                            }, 3000);
                        }
                    }
                }
                break
            case 131:
                if (object.data) {
                    if (object.data.loserId === anchorId || object.data.winnerId === anchorId) {
                        if (_.isEqual(pkOverObject, object.data)) {
                            pkOverObject = {}
                            return;
                        }
                        pkOverObject = object.data
                        if (!this.timerPk) {
                            this.initPlayerPkOver()
                            if (object.data.type === 3) {
                                this.timerPkDelay = setTimeout(() => {
                                    player && player.load(dataPlay ? initImgProtocal(isHttps, dataPlay.urlPlayFlv) : fetchFlvUrl(isHttps, playUrl))
                                }, 180000);
                            }
                        } else {
                            setTimeout(() => {
                                this.initPlayerPkOver()
                                if (object.data.type === 3) {
                                    this.timerPkDelay = setTimeout(() => {
                                        player && player.load(dataPlay ? initImgProtocal(isHttps, dataPlay.urlPlayFlv) : fetchFlvUrl(isHttps, playUrl))
                                    }, 180000);
                                }
                            }, 3000);
                        }
                        if (object.data.type === 2 || object.data.type === 3) {
                            if (object.data.mvpUserId) {
                                this.setState({
                                    dataChatMsg: object.data,
                                }, () => this.showMsg(15))
                            }
                            if (object.data.winnerId === anchorId) {
                                this.setState({
                                    dataChatMsg: object.data,
                                }, () => this.showMsg(16))
                            }
                            else if (object.data.loserId === anchorId) {
                                this.setState({
                                    dataChatMsg: object.data,
                                }, () => this.showMsg(17))
                            }
                        }
                    }
                }
                break
            case 136:
                if (object.data) {
                    if (object.data.isUpRunwayBig === 1) {
                        this.initRunwayThroughMsgQueue()
                        runwayMsgThroughQueue.push(object.data)
                    } else {
                        this.initRunwayMsgQueue()
                        runwayMsgQueue.push(object.data)
                    }
                }
                break
            case 137:
                if (object.data && object.data.userId === userId) {
                    this.fetchUserInfo(null)
                }
                break
            default:
                break
        }
    }

    // pk开始播放器优化
    initPlayerPkStart = () => {
        refreshCount = 0
        isPkProcess = true
        this.timerPk = setInterval(() => {
            if (refreshCount === 0) {
                player && player.load(dataPlay ? initImgProtocal(isHttps, dataPlay.urlPlayFlv) : fetchFlvUrl(isHttps, playUrl))
                // const video = document.querySelector('video')
                // if (video && video.currentTime && video.currentTime > 0) {
                //     const time = video.currentTime
                //     video.currentTime = time + 0.01
                // }
            } else {
                const video = document.querySelector('video')
                if (video && video.currentTime && video.currentTime > 0) {
                    const time = video.currentTime
                    video.currentTime = time + 0.01
                }
            }
            refreshCount++
            setTimeout(() => {
                const video = document.querySelector('video')
                if (video && video.videoHeight === 944) {
                    clearInterval(this.timerPk)
                    this.timerPk = null
                    clearTimeout(this.timerPkDelay)
                    this.timerPkDelay = null
                    isPkProcess = false
                }
            }, 2000);
        }, timePk);
        setTimeout(() => {
            const video = document.querySelector('video')
            if (video && video.videoHeight === 944) {
                clearInterval(this.timerPk)
                this.timerPk = null
                clearTimeout(this.timerPkDelay)
                this.timerPkDelay = null
                isPkProcess = false
            }
        }, 2000);
    }

    // 切换flv格式播放
    transferFlvLivePlayer = () => {
        // player && player.destroy()
        playTimes = 0
        retryTimes = 0
        timeUpdate = ''
        const _this = this
        options = {
            flv: dataPlay ? initImgProtocal(isHttps, dataPlay.urlPlayFlv) : fetchFlvUrl(isHttps, playUrl),
            width: '100%',
            height: '97.8vh',
            volume: 0.8,
            live: true,
            autoplay: true,
            // coverpic: { "style": "cover", "src": cover },
            controls: 'default',
            flash: false,
            h5_flv: true,
            listener(msg) {
                // console.log(msg.type)
                if (msg.type === 'play') {
                    if (playTimes === 0) {
                        playTimes++
                        _this.playInit()
                        // setTimeout(() => {
                        //     playInit()
                        // }, 50);
                    }
                    if (isPause) {
                        player && player.load(dataPlay ? initImgProtocal(isHttps, dataPlay.urlPlayFlv) : fetchFlvUrl(isHttps, playUrl))
                    }
                    isPause = false
                    _this.playStart()
                    // initFlvSkip()
                } else if (msg.type === 'timeupdate') {
                    console.log(isPkProcess)
                    console.log(isPause)
                    if (isPkProcess && !isPause) {
                        timeUpdate = moment();
                        if (!_this.timerPlayer) {
                            _this.timerPlayer = setTimeout(() => {
                                const time = moment();
                                console.log(time.diff(timeUpdate, 'second'))
                                if (time.diff(timeUpdate, 'second') > 3) {
                                    isPause = true
                                    _this.playPause()
                                    _this.playAutoPause()
                                }
                                clearTimeout(_this.timerPlayer)
                                _this.timerPlayer = null
                            }, 3000);
                        }
                    }
                    // timeUpdate++
                    // if (playTimes === 3) {
                    //     playInit()
                    // } else if (playTimes < 3) {
                    //     playTimes++
                    // }
                    // if (playTimes === 0) {
                    //     playTimes++
                    //     playInit()
                    //     // setTimeout(() => {
                    //     //     playInit()
                    //     // }, 50);
                    // }
                } else if (msg.type === 'pause') {
                    // clearFlvSkip()
                    isPause = true
                    _this.playPause()
                } else if (msg.type === 'ended') {
                    // clearFlvSkip()
                    _this.playPause()
                } else if (msg.type === 'error') {
                    switch (_.parseInt(msg.code) || (msg.detail && _.parseInt(msg.detail.code))) {
                        case 1:
                        case 2:
                        case 1001:
                            if (retryTimes < 5) {
                                setTimeout(() => {
                                    player && player.load(dataPlay ? initImgProtocal(isHttps, dataPlay.urlPlayFlv) : fetchFlvUrl(isHttps, playUrl))
                                    retryTimes++
                                }, 1000);
                            } else {
                                // clearFlvSkip()
                                player && player.destroy()
                                _this.handleLiveTip(1, '直播地址已失效', 0)
                            }
                            // player && player.destroy()
                            // this.handleLiveTip(1, '直播地址已失效', 0)
                            break
                        case 3:
                            // clearFlvSkip()
                            player && player.destroy()
                            _this.handleLiveTip(1, '视频解码错误', 0)
                            break
                        case 4:
                            // clearFlvSkip()
                            player && player.destroy()
                            _this.handleLiveTip(1, '当前系统环境不支持播放该视频格式', 0)
                            break
                        case 5:
                            _this.handleLiveTip(0, '', 1)
                            break
                        case 10:
                            // clearFlvSkip()
                            player && player.destroy()
                            _this.handleLiveTip(1, '请勿在file协议下使用播放器，可能会导致视频无法播放', 0)
                            break
                        case 11:
                            // clearFlvSkip()
                            player && player.destroy()
                            _this.handleLiveTip(1, '使用参数有误，需检查播放器调用程序', 0)
                            break
                        case 12:
                            // clearFlvSkip()
                            player && player.destroy()
                            _this.handleLiveTip(1, '未传入视频播放地址', 0)
                            break
                        case 13:
                            // clearFlvSkip()
                            player && player.destroy()
                            _this.handleLiveTip(1, '直播已经结束', 0);
                            break
                        case 1002:
                        case 2032:
                            // clearFlvSkip()
                            player && player.destroy()
                            _this.handleLiveTip(1, '获取视频失败，请检查播放链接是否有效', 0)
                            break
                        case 2048:
                            // clearFlvSkip()
                            player && player.destroy()
                            _this.handleLiveTip(1, '无法加载视频文件，跨域访问被拒绝', 0)
                            break
                        default:
                            break
                    }
                }
            }
        }
        player = new TcPlayer(dom, options)
        window.tcplayer = player
        setTimeout(() => {
            if (playTimes === 0) {
                this.playAutoPause()
            }
        }, 5000);
    }

    // 初始化播放器
    initLivePlayer = () => {
        // player && player.destroy()
        playTimes = 0
        retryTimes = 0
        timeUpdate = ''
        if (browser !== 'ie') {
            this.transferFlvLivePlayer()
            return;
        }
        const installFlash = CheckFlashPlayer();
        if (!installFlash) {
            this.handleLiveTip(0, '', 1)
            return
        }
        const _this = this
        // if (browser === 'firefox' || browser === 'safari') {
        // switchFlvLivePlayer(dom, data, playUrl, handleLiveTip, browser, playStart, playPause, playInit, initFlvSkip, clearFlvSkip, isHttps)
        // return;
        // }
        if (browser === 'h5') {
            options = {
                m3u8: dataPlay ? dataPlay.urlPlayHls : fetchHlsUrl(playUrl),
                width: '100%',
                height: '97.8vh',
                volume: 0.8,
                live: true,
                autoplay: true,
                // coverpic: { "style": "cover", "src": cover },
                controls: 'none',
                x5_player: true,
                x5_type: 'true',
                x5_fullscreen: 'false',
                x5_orientation: 1,
                listener(msg) {
                    if (msg.type === 'play') {
                        // if (playTimes === 3) {
                        //     playInit()
                        // } else if (playTimes < 3) {
                        //     playTimes++
                        // }
                        if (playTimes === 0) {
                            playTimes++
                            _this.playInit()
                        }
                        if (isPause) {
                            player && player.load(dataPlay ? dataPlay.urlPlayHls : fetchHlsUrl(playUrl))
                        }
                        isPause = false
                        // playStart()
                    } else if (msg.type === 'pause') {
                        isPause = true
                    } else if (msg.type === 'error') {
                        switch (_.parseInt(msg.code) || (msg.detail && _.parseInt(msg.detail.code))) {
                            case 1:
                            case 2:
                            case 1001:
                                if (retryTimes < 5) {
                                    setTimeout(() => {
                                        player && player.load(dataPlay ? dataPlay.urlPlayHls : fetchHlsUrl(playUrl))
                                        retryTimes++
                                    }, 1000);
                                } else {
                                    player && player.destroy()
                                    _this.handleLiveTip(1, '直播地址已失效', 0)
                                }
                                break
                            case 3:
                                player && player.destroy()
                                _this.handleLiveTip(1, '视频解码错误', 0)
                                break
                            case 4:
                                player && player.destroy()
                                _this.handleLiveTip(1, '当前系统环境不支持播放该视频格式', 0)
                                break
                            case 5:
                                player && player.destroy()
                                _this.handleLiveTip(1, '当前系统环境不支持播放该视频格式', 0)
                                break
                            case 10:
                                player && player.destroy()
                                _this.handleLiveTip(1, '请勿在file协议下使用播放器，可能会导致视频无法播放', 0)
                                break
                            case 11:
                                player && player.destroy()
                                _this.handleLiveTip(1, '使用参数有误，需检查播放器调用程序', 0)
                                break
                            case 12:
                                player && player.destroy()
                                _this.handleLiveTip(1, '未传入视频播放地址', 0)
                                break
                            case 13:
                                player && player.destroy()
                                _this.handleLiveTip(1, '直播已经结束', 0);
                                break
                            case 1002:
                            case 2032:
                                player && player.destroy()
                                _this.handleLiveTip(1, '获取视频失败，请检查播放链接是否有效', 0)
                                break
                            case 2048:
                                player && player.destroy()
                                _this.handleLiveTip(1, '无法加载视频文件，跨域访问被拒绝', 0)
                                break
                            default:
                                break
                        }
                    }
                }
            }
        } else {
            options = {
                rtmp: dataPlay ? dataPlay.urlPlayRtmp : playUrl,
                width: '100%',
                height: '97.8vh',
                volume: 0.8,
                live: true,
                autoplay: true,
                // coverpic: { "style": "cover", "src": cover },
                controls: 'default',
                flash: true,
                listener(msg) {
                    if (msg.type === 'play') {
                        // if (playTimes === 0) {
                        //     playTimes++
                        //     playInit()
                        //     setTimeout(() => {
                        //         playInit()
                        //     }, 450);
                        // }
                        if (isPause) {
                            player && player.load(dataPlay ? dataPlay.urlPlayRtmp : playUrl)
                        }
                        isPause = false
                        _this.playStart()
                    } else if (msg.type === 'timeupdate') {
                        // if (playTimes === 3) {
                        //     playInit()
                        // } else if (playTimes < 3) {
                        //     playTimes++
                        // }
                        if (playTimes === 0) {
                            playTimes++
                            setTimeout(() => {
                                _this.playInit()
                            }, 350);
                        }
                        if (isPkProcess && !isPause) {
                            timeUpdate = moment();
                            if (!_this.timerPlayer) {
                                _this.timerPlayer = setTimeout(() => {
                                    const time = moment();
                                    if (time.diff(timeUpdate, 'second') > 3) {
                                        isPause = true
                                        _this.playPause()
                                        _this.playAutoPause()
                                    }
                                    clearTimeout(_this.timerPlayer)
                                    _this.timerPlayer = null
                                }, 3000);
                            }
                        }
                    } else if (msg.type === 'pause') {
                        isPause = true
                        _this.playPause()
                    } else if (msg.type === 'ended') {
                        _this.playPause()
                    } else if (msg.type === 'error') {
                        _this.playPause()
                        switch (_.parseInt(msg.code) || (msg.detail && _.parseInt(msg.detail.code))) {
                            case 1:
                            case 2:
                            case 1001:
                                if (retryTimes < 5) {
                                    setTimeout(() => {
                                        player && player.load(dataPlay ? dataPlay.urlPlayRtmp : playUrl)
                                        retryTimes++
                                    }, 1000);
                                } else {
                                    // clearFlvSkip()
                                    player && player.destroy()
                                    _this.handleLiveTip(1, '直播地址已失效', 0)
                                }
                                break
                            case 3:
                                player && player.destroy()
                                _this.handleLiveTip(1, '视频解码错误', 0)
                                break
                            case 4:
                                player && player.destroy()
                                _this.handleLiveTip(1, '当前系统环境不支持播放该视频格式', 0)
                                break
                            case 5:
                                _this.handleLiveTip(0, '', 1)
                                break
                            case 10:
                                player && player.destroy()
                                _this.handleLiveTip(1, '请勿在file协议下使用播放器，可能会导致视频无法播放', 0)
                                break
                            case 11:
                                player && player.destroy()
                                _this.handleLiveTip(1, '使用参数有误，需检查播放器调用程序', 0)
                                break
                            case 12:
                                player && player.destroy()
                                _this.handleLiveTip(1, '未传入视频播放地址', 0)
                                break
                            case 13:
                                player && player.destroy()
                                _this.handleLiveTip(1, '直播已经结束', 0);
                                break
                            case 1002:
                            case 2032:
                                player && player.destroy()
                                _this.handleLiveTip(1, '获取视频失败，请检查播放链接是否有效', 0)
                                break
                            case 2048:
                                player && player.destroy()
                                _this.handleLiveTip(1, '无法加载视频文件，跨域访问被拒绝', 0)
                                break
                            default:
                                break
                        }
                    }
                }
            }
        }
        player = new TcPlayer(dom, options)
        window.tcplayer = player
        setTimeout(() => {
            if (playTimes === 0) {
                // player && player.play()
                // playTimes++
                // playInit()
                this.playAutoPause()
            }
        }, 5000);
    }

    // pk结束播放器优化
    initPlayerPkOver = () => {
        refreshCount = 0
        isPkProcess = true
        this.timerPk = setInterval(() => {
            if (refreshCount === 0) {
                player && player.load(dataPlay ? initImgProtocal(isHttps, dataPlay.urlPlayFlv) : fetchFlvUrl(isHttps, playUrl))
                // const video = document.querySelector('video')
                // if (video && video.currentTime && video.currentTime > 0) {
                //     const time = video.currentTime
                //     video.currentTime = time + 0.01
                // }
            } else {
                const video = document.querySelector('video')
                if (video && video.currentTime && video.currentTime > 0) {
                    const time = video.currentTime
                    video.currentTime = time + 0.02
                }
            }
            refreshCount++;
            setTimeout(() => {
                const video = document.querySelector('video')
                if (video && video.videoHeight === 960) {
                    clearInterval(this.timerPk)
                    this.timerPk = null
                    isPkProcess = false
                }
            }, 2000);
        }, timePk);
        setTimeout(() => {
            const video = document.querySelector('video')
            if (video && video.videoHeight === 960) {
                clearInterval(this.timerPk)
                this.timerPk = null
                isPkProcess = false
            }
        }, 2000);
    }

    // 获取守护礼物列表
    fetchSpecialGiftList = () => {
        const { fetchSpecialGiftList } = this.props
        fetchSpecialGiftList().then(resp => {
            if (resp) {
                if (resp.fsgl_code) {
                    const result = isAccountExpire(resp.fsgl_code)
                    if (result) {
                        this.initLogoutStatus(false, this.initVisitorStatus)
                        setTimeout(() => {
                            this.guestFetchSpecialGiftList()
                        }, 500);
                        return
                    }
                }
                if (resp.fsgl_succ) {
                    const guardGiftListUp = [];
                    const guardGiftListDown = [];
                    let giftIndex2Max;
                    const len = resp.fsgl_list.length;
                    if (len !== 0) {
                        giftIndex2Max = _.parseInt((len - 1) / 10)
                    } else {
                        giftIndex2Max = 0;
                    }
                    (resp.fsgl_list || []).map((item, index) => {
                        if (index % 10 === 0 || index % 10 === 1 || index % 10 === 2 || index % 10 === 3 || index % 10 === 4) {
                            guardGiftListUp.push(item)
                        } else {
                            guardGiftListDown.push(item)
                        }
                    })
                    this.setState({
                        guardGiftListUp,
                        guardGiftListDown,
                        giftIndex2Max,
                    })
                } else if (resp.fsgl_msg) {
                    this.handleErrMsg(resp.fsgl_msg);
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(false, this.initVisitorStatus)
                setTimeout(() => {
                    this.guestFetchSpecialGiftList()
                }, 500);
            }
        });
    }

    // 游客获取守护礼物列表
    guestFetchSpecialGiftList = () => {
        const { guestFetchSpecialGiftList } = this.props
        guestFetchSpecialGiftList().then(resp => {
            if (resp) {
                if (resp.gfsgl_succ) {
                    const guardGiftListUp = [];
                    const guardGiftListDown = [];
                    let giftIndex2Max;
                    const len = resp.gfsgl_list.length;
                    if (len !== 0) {
                        giftIndex2Max = _.parseInt((len - 1) / 10)
                    } else {
                        giftIndex2Max = 0;
                    }
                    (resp.gfsgl_list || []).map((item, index) => {
                        if (index % 10 === 0 || index % 10 === 1 || index % 10 === 2 || index % 10 === 3 || index % 10 === 4) {
                            guardGiftListUp.push(item)
                        } else {
                            guardGiftListDown.push(item)
                        }
                    })
                    this.setState({
                        guardGiftListUp,
                        guardGiftListDown,
                        giftIndex2Max,
                    })
                } else if (resp.gfsgl_msg) {
                    this.handleErrMsg(resp.gfsgl_msg);
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        });
    }

    // 获取礼物列表
    fetchGiftList = () => {
        const { fetchGiftList } = this.props
        fetchGiftList().then(resp => {
            if (resp) {
                if (resp.fgl_code) {
                    const result = isAccountExpire(resp.fgl_code)
                    if (result) {
                        this.initLogoutStatus(false, this.initVisitorStatus)
                        setTimeout(() => {
                            this.guestFetchGiftList()
                        }, 500);
                        return
                    }
                }
                if (resp.fgl_succ) {
                    const giftListUp = [];
                    const giftListDown = [];
                    let giftIndex1Max;
                    const len = resp.fgl_list.length;
                    if (len !== 0) {
                        giftIndex1Max = _.parseInt((len - 1) / 10)
                    } else {
                        giftIndex1Max = 0;
                    }
                    (resp.fgl_list || []).map((item, index) => {
                        if (index % 10 === 0 || index % 10 === 1 || index % 10 === 2 || index % 10 === 3 || index % 10 === 4) {
                            giftListUp.push(item)
                        } else {
                            giftListDown.push(item)
                        }
                    })
                    this.setState({
                        giftListUp,
                        giftListDown,
                        giftIndex1Max,
                    })
                } else if (resp.fgl_msg) {
                    this.handleErrMsg(resp.fgl_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.initLogoutStatus(false, this.initVisitorStatus)
                setTimeout(() => {
                    this.guestFetchGiftList()
                }, 500);
            }
        })
    }

    // 游客获取礼物列表
    guestFetchGiftList = () => {
        const { guestFetchGiftList } = this.props
        guestFetchGiftList().then(resp => {
            if (resp) {
                if (resp.gfgl_succ) {
                    const giftListUp = [];
                    const giftListDown = [];
                    let giftIndex1Max;
                    const len = resp.gfgl_list.length;
                    if (len !== 0) {
                        giftIndex1Max = _.parseInt((len - 1) / 10)
                    } else {
                        giftIndex1Max = 0;
                    }
                    (resp.gfgl_list || []).map((item, index) => {
                        if (index % 10 === 0 || index % 10 === 1 || index % 10 === 2 || index % 10 === 3 || index % 10 === 4) {
                            giftListUp.push(item)
                        } else {
                            giftListDown.push(item)
                        }
                    })
                    this.setState({
                        giftListUp,
                        giftListDown,
                        giftIndex1Max,
                    })
                } else if (resp.gfgl_msg) {
                    this.handleErrMsg(resp.gfgl_msg)
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
                        this.initLogoutStatus(false, this.initVisitorStatus)
                        return
                    }
                }
                if (resp.fui_succ) {
                    this.setState({
                        dataUser: resp.fui_data || {},
                    }, () => {
                        callback && callback();
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
                this.initLogoutStatus(false, this.initVisitorStatus)
            }
        })
    }

    // 切换输入框类型
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

    // 查询世界弹幕开关状态
    querySystemConfig = (type) => {
        const { querySystemConfig } = this.props
        if (type === 'family') {
            querySystemConfig({
                type: 3,
                code: 'notice_contact',
            }).then(resp => {
                if (resp) {
                    if (resp.qsc_code) {
                        const result = isAccountExpire(resp.qsc_code)
                        if (result) {
                            this.initLogoutStatus(false, this.initVisitorStatus)
                            setTimeout(() => {
                                this.guestQuerySystemConfig(type)
                            }, 500);
                            return
                        }
                    }
                    if (resp.qsc_succ && resp.qsc_data && resp.qsc_data.paramValue) {
                        window.localStorage.setItem('kx_live_family', resp.qsc_data.paramValue)
                    } else if (resp.qsc_msg) {
                        this.handleErrMsg(resp.qsc_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                } else {
                    this.initLogoutStatus(false, this.initVisitorStatus)
                    setTimeout(() => {
                        this.guestQuerySystemConfig(type)
                    }, 500);
                }
            })
        } else if (type === 'tanmu') {
            querySystemConfig({
                type: 2,
                code: 'world_barrage_switch'
            }).then(resp => {
                if (resp) {
                    if (resp.qsc_code) {
                        const result = isAccountExpire(resp.qsc_code)
                        if (result) {
                            this.initLogoutStatus(false, this.initVisitorStatus)
                            setTimeout(() => {
                                this.guestQuerySystemConfig(type)
                            }, 500);
                            return
                        }
                    }
                    if (resp.qsc_succ && resp.qsc_data) {
                        if (resp.qsc_data.paramValue === 'on') {
                            this.setState({
                                worldTanmuShow: true,
                            })
                        } else if (resp.qsc_data.paramValue === 'off') {
                            this.setState({
                                worldTanmuShow: false,
                            })
                        }
                    } else if (resp.qsc_msg) {
                        this.handleErrMsg(resp.qsc_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                } else {
                    this.initLogoutStatus(false, this.initVisitorStatus)
                    setTimeout(() => {
                        this.guestQuerySystemConfig(type)
                    }, 500);
                }
            })
        }
    }

    // 游客查询世界弹幕开关状态
    guestQuerySystemConfig = (type) => {
        const { guestQuerySystemConfig } = this.props
        if (type === 'family') {
            guestQuerySystemConfig({
                type: 3,
                code: 'notice_contact',
            }).then(resp => {
                if (resp) {
                    if (resp.gqsc_succ && resp.gqsc_data && resp.gqsc_data.paramValue) {
                        window.localStorage.setItem('kx_live_family', resp.gqsc_data.paramValue)
                    } else if (resp.gqsc_msg) {
                        this.handleErrMsg(resp.gqsc_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                }
            })
        } else if (type === 'tanmu') {
            guestQuerySystemConfig({
                type: 2,
                code: 'world_barrage_switch'
            }).then(resp => {
                if (resp) {
                    if (resp.gqsc_succ && resp.gqsc_data) {
                        if (resp.gqsc_data.paramValue === 'on') {
                            this.setState({
                                worldTanmuShow: true,
                            })
                        } else if (resp.gqsc_data.paramValue === 'off') {
                            this.setState({
                                worldTanmuShow: false,
                            })
                        }
                    } else if (resp.gqsc_msg) {
                        this.handleErrMsg(resp.gqsc_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                }
            })
        }
    }

    // 切换观众列表类型
    changeTabList = (e, type) => {
        e && e.preventDefault()
        const { tabListType } = this.state;
        if (tabListType === type) {
            return;
        }
        if (type === 'audience') {
            this.setState({
                tabStyle: '0'
            })
            if (loginStatus) {
                this.fetchAudienceList()
            } else {
                this.guestFetchAudienceList()
            }
        } else if (type === 'guard') {
            this.setState({
                tabStyle: '100%'
            })
            if (loginStatus) {
                this.fetchGuardList();
            } else {
                this.guestFetchGuardList();
            }
        } else if (type === 'manager') {
            this.setState({
                tabStyle: '200%'
            })
            if (loginStatus) {
                this.fetchManagerList();
            } else {
                this.guestFetchManagerList();
            }
        }
        this.setState({
            tabListType: type,
        })
    }

    // 举报
    userReport = (e, callback = null) => {
        e && e.preventDefault();
        if (!anchorId) {
            return
        }
        const { reportType } = this.state
        if (!reportType) {
            this.handleErrMsg('请选择举报类型')
            return;
        }
        const { userReport } = this.props
        userReport({
            dstUid: anchorId,
            type: _.parseInt(reportType),
        }).then(resp => {
            if (resp) {
                if (resp.ur_code) {
                    const result = isAccountExpire(resp.ur_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        return
                    }
                }
                if (resp.ur_succ) {
                    callback && callback(e);
                } else if (resp.ur_msg) {
                    this.handleErrMsg(resp.ur_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
            }
        })
    }

    // 礼物类型tab切换
    handleChangeGiftTabType = (e, type) => {
        e && e.preventDefault()
        const { giftBaseType } = this.state;
        if (giftBaseType === type) {
            return;
        }
        this.setState({
            giftBaseType: type,
            giftId: -1,
            giftNumArray: [],
            giftNumIndex: 0,
            giftType: -1,
            giftPrice: 0,
            giftTitle: 0,
        })
        if (giftBaseType === 'gift') {
            this.setState({
                arrowLeftClass1: 'btn left left-disable',
                arrowRightClass1: 'btn right',
                giftIndex1: 0,
                giftMoveStyle1: '0',
            })
        } else {
            this.setState({
                arrowLeftClass2: 'btn left left-disable',
                arrowRightClass2: 'btn right right-disable',
                giftIndex2: 0,
                giftMoveStyle2: '0',
            })
        }
        this.initCountDown();
    }

    // 过滤敏感词
    fetchSensitiveWords = () => {
        const { fetchSensitiveWords } = this.props
        wordDigest = window.localStorage.getItem('kx_live_word_digest') || ''
        const list = window.localStorage.getItem('kx_live_word_list')
        if (list)
            sensitiveWordList = aesDecrypt(list).split(',') || []
        if (sensitiveWordList.length === 0 && wordDigest) {
            wordDigest = ''
        }
        fetchSensitiveWords({
            wordDigest,
        }).then(resp => {
            if (resp) {
                if (resp.fsw_code) {
                    const result = isAccountExpire(resp.fsw_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        return
                    }
                }
                if (resp.fsw_succ) {
                    wordDigest = resp.fsw_value
                    window.localStorage.setItem('kx_live_word_digest', wordDigest)
                    if (resp.fsw_list && resp.fsw_list.length > 0) {
                        sensitiveWordList = resp.fsw_list
                        window.localStorage.setItem('kx_live_word_list', aesEncrypt(sensitiveWordList.join(',')))
                    }
                } else if (resp.fsw_msg) {
                    this.handleErrMsg(resp.fsw_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
            }
        })
    }

    // 发消息增加@
    handleChangeAtMsg = (e, value, uid) => {
        e && e.preventDefault()
        if (!value) {
            return;
        }
        if (uid === userId) {
            this.handleErrMsg('不能@自己')
            return;
        }
        if (!loginStatus) {
            this.setState({
                loginShow: true,
                targetShow: false
            })
            return;
        }
        this.setState({
            msgToSend: `@${value} `,
            targetShow: false
        }, () => {
            this.inputRef.current.focus();
        })
    };

    // 页面初始化
    initPage = (isInit) => {
        if (loginStatus) {
            if (isInit) {
                if (playUrlValid) {
                    this.initLivePlayer();
                } else {
                    this.fetchLiveUrl()
                }
            }
            this.fetchAudienceList()
            this.fetchGiftList()
            this.fetchSpecialGiftList()
            this.querySystemConfig('family')
            this.querySystemConfig('tanmu')
            this.fetchSensitiveWords()
            this.fetchAsset()
            this.fetchUserInfo(this.initDanmuStatus)
            this.fetchItemConfigList()
        } else {
            if (isInit) {
                if (playUrlValid) {
                    this.initLivePlayer();
                } else {
                    this.guestFetchLiveUrl()
                }
            }
            this.guestFetchAudienceList()
            this.guestFetchGiftList()
            this.guestFetchSpecialGiftList()
            this.guestQuerySystemConfig('family')
            this.guestQuerySystemConfig('tanmu')
            this.guestFetchItemConfigList()
        }
        // this.initRunwayMsgQueue()
        // this.initRunwayThroughMsgQueue()
        // this.initTanmuMsgQueue()
        // this.initGiftMsgQueue()
        // this.initEnterMsgQueue()
        // this.initGiftEffectQueue()
        this.playerGift = new SVGA.Player('#gift-effect')
        this.parserGift = new SVGA.Parser('#gift-effect')
        this.playerGift.loops = 1
        this.playerGift.clearsAfterStop = true
        this.playerGift.setContentMode('AspectFill')
        this.playerGift.setClipsToBounds(true)
    }

    // 初始化弹幕状态
    initDanmuStatus = () => {
        const worldDanmuVisible = window.localStorage.getItem('kx_live_danmu_visible_world')
        if (worldDanmuVisible !== null) {
            const { dataUser } = this.state;
            if (!dataUser || !dataUser.userId) {
                return;
            }
            existDanmuStorage = true
            danmuStorage = worldDanmuVisible
            if (worldDanmuVisible.indexOf(dataUser.userId.toString()) >= 0) {
                const danmuArray = worldDanmuVisible.split(',')
                const len = danmuArray.length
                for (let i = 0; i < len; i += 1) {
                    if (danmuArray[i].indexOf(dataUser.userId.toString()) >= 0) {
                        tempDanmu = danmuArray[i]
                        this.setState({
                            cleanWorldStatus: danmuArray[i].split('|')[1] === '1',
                        })
                        break
                    }
                }
            }
        }
    }

    // 页面定时任务
    initPageUpdate = (isRegister) => {
        if (isRegister) {
            setTimeout(() => {
                this.fetchAsset()
            }, 5000);
        } else {
            this.fetchAsset()
        }
        this.fetchUserInfo(this.initDanmuStatus)
        this.fetchSensitiveWords()
    }

    // 初始化成游客状态
    initVisitorStatus = (isInit) => {
        const sigStore = customCookie.getCookie('kx_live_visitor_sig')
        if (!sigStore) {
            this.guestFetchImSig(isInit)
        } else {
            const value = sigStore.split('|')
            userSig = value[1];
            userId = value[0]
            this.guestEnterRoom(isInit, this.loginRoom)
            // this.loginRoom(isInit)
        }
    }

    // 播放地址是否有效
    isPlayUrlValid = () => {
        if (playUrl && anchorId !== 0 && playUrl.indexOf(_.toString(anchorId)) !== -1) {
            return true
        } else {
            return false
        }
    }

    // 预初始化页面
    preInitPage = () => {
        const result = isAccountExpire('')
        if (result) {
            customCookie.delCookie('kx_live_userId')
            customCookie.delCookie('kx_live_token')
            window.localStorage.removeItem('kx_live_login')
            userId = 0
            this.setState({
                isLogin: false,
                kuCoin: 0,
            })
            loginStatus = false
        } else {
            userId = _.parseInt(customCookie.getCookie("kx_live_userId")) || 0
            this.setState({
                isLogin: true,
            })
            loginStatus = true
        }
        if (loginStatus) {
            const sig = customCookie.getCookie(`kx_live_sig_${userId.toString()}`)
            if (!sig) {
                this.fetchImSig(true)
            } else {
                userSig = sig;
                this.enterRoom(true, this.loginRoom)
                // this.loginRoom(true)
                this.initPage(true)
            }
            // setTimeout(() => {
            //     const slientLogin = window.sessionStorage.getItem('kx_live_slient_login') || ''
            //     if (!slientLogin) {
            //         this.loginByToken()
            //     }
            // }, 4000);
        } else {
            this.initVisitorStatus(true)
            this.initPage(true)
        }
        if (result) {
            setTimeout(() => {
                const { loginShow, loginGuideShow, live } = this.state;
                if (!loginStatus && !loginGuideShow && !loginShow && live === 1) {
                    this.guestFetchRandomLiveList(null, 20, 1, () => {
                        this.setState({
                            loginGuideShow: true
                        })
                    });
                    if (!this.timerLogin) {
                        this.timerLogin = setInterval(() => {
                            const { loginShow, loginGuideShow, live } = this.state;
                            if (!loginStatus && loginGuideShow && !loginShow && live === 1) {
                                if (pageVisible) {
                                    this.guestFetchRandomLiveList(null, 20, 1);
                                }
                            } else {
                                clearInterval(this.timerLogin)
                                this.timerLogin = null
                            }
                        }, 60000);
                    }
                }
            }, 60000);
        }
    }

    // 初始化守护引导
    initGuardGuide = () => {
        setTimeout(() => {
            const { guardShow, guardGuideShow, live, dataRoom } = this.state;
            if (dataRoom.guardType === 0 && loginStatus && !guardGuideShow && !guardShow && live === 1) {
                this.setState({
                    guardGuideShow: true,
                })
            }
        }, 60000);
    }

    // 守护引导隐藏
    handleGuardGuideHide = () => {
        this.setState({
            guardGuideShow: false
        })
    }

    // 守护隐藏
    handleGuardHide = () => {
        this.setState({
            guardShow: false,
            guardType: 1,
            fee: 58800
        })
    }

    // 守护窗口显示
    handleGuardShow = (e) => {
        e && e.preventDefault()
        if (!loginStatus) {
            this.setState({
                loginShow: true
            })
            return
        }
        const { dataRoom } = this.state;
        if (dataRoom.guardType > 0) {
            this.setState({
                guardType: dataRoom.guardType
            })
            switch (dataRoom.guardType) {
                case 1:
                    this.setState({
                        fee: 58800
                    })
                    break;
                case 2:
                    this.setState({
                        fee: 288800
                    })
                    break;
                case 3:
                    this.setState({
                        fee: 588800
                    })
                    break;
                default:
                    break;
            }
        }
        this.setState({
            guardShow: true,
            guardGuideShow: false
        })
    }

    componentDidMount() {
        host = window.location.host
        protocol = window.location.protocol
        isPreEnv = window.location.host.indexOf('pre') !== -1 || window.location.host.indexOf('dev') !== -1
        const version = fetchBrowserVersion()
        channel = fetchUrlParams('channel') || 'web'
        if (version === 'h5') {
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
        isHttps = window.location.protocol === 'https:'
        // if (isHttps) {
        //     window.location.href = window.location.href.replace('https', 'http')
        //     return;
        // }
        setTimeout(() => {
            this.setState({
                mainOpacity: 1
            })
        }, 150);
        const token = fetchUrlParams('token')
        const uid = fetchUrlParams('userId')
        anchorId = _.parseInt(fetchUrlParams('anchorId')) || 0
        if (token && uid) {
            customCookie.setCookie("kx_live_token", token, "d6");
            customCookie.setCookie("kx_live_userId", uid, "d6");
            window.localStorage.setItem('kx_live_login', '1')
            const state = { title: '', url: window.location.href };
            // eslint-disable-next-line no-restricted-globals
            history.pushState(state, '', `?anchorId=${anchorId.toString()}&channel=${channel}`);
        }
        if (!anchorId) {
            return
        }
        if (version >= 6 && version <= 11) {
            browser = 'ie'
            // if (version >= 6 && version <= 9) {
            //     this.handleBrowserTipShow()
            //     window.location.href=`http://support.dmeng.net/upgrade-your-browser.html?referrer=${encodeURIComponent(window.location.href)}`;
            //     return
            // }
        } else if (version !== -1) {
            browser = version
        }
        cover = window.localStorage.getItem("kx_live_cover") || default_cover
        playUrl = aesDecrypt(window.localStorage.getItem("kx_live_playUrl")) || ''
        playUrlValid = this.isPlayUrlValid()
        window.localStorage.removeItem('kx_live_room')
        window.localStorage.setItem('kx_live_room', anchorId.toString())
        this.preInitPage()
        // setTimeout(() => {
        //     if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Presto") != -1) {
        //         window.location.replace("about:blank");
        //     } else {
        //         window.opener = null;
        //         window.open("", "_self");
        //         window.close();
        //     }
        // }, 3000);
        setTimeout(() => {
            preloadImages([
                `${urlCdnLive}/bg-flash-frames/through_runway_0.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_1.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_2.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_3.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_4.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_5.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_6.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_7.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_8.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_9.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_10.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_11.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_12.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_13.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_14.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_15.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_16.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_17.png`,
                `${urlCdnLive}/bg-flash-frames/through_runway_18.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_0.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_1.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_2.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_3.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_4.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_5.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_6.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_7.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_8.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_9.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_10.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_11.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_12.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_13.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_14.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_15.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_16.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_17.png`,
                `${urlCdnLive}/bg-flash-turntable/turntable_runway_18.png`,
                `${urlCdnLive}/gift-effect/star-effect-1.png`,
                `${urlCdnLive}/gift-effect/star-effect-2.png`,
                `${urlCdnLive}/gift-effect/star-effect-3.png`,
                `${urlCdnLive}/gift-effect/star-effect-4.png`,
                `${urlCdnLive}/gift-effect/star-effect-5.png`,
                `${urlCdnLive}/gift-effect/star-effect-6.png`,
                `${urlCdnLive}/gift-effect/star-effect-7.png`,
                `${urlCdnLive}/gift-effect/star-effect-8.png`,
                `${urlCdnLive}/gift-effect/star-effect-9.png`,
                `${urlCdnLive}/gift-effect/star-effect-10.png`,
                `${urlCdnLive}/gift-effect/star-effect-11.png`,
                `${urlCdnLive}/gift-effect/star-effect-12.png`,
                `${urlCdnLive}/gift-effect/star-effect-13.png`,
                `${urlCdnKuxiu}/X.png`,
                `${urlCdnKuxiu}/0.png`,
                `${urlCdnKuxiu}/1.png`,
                `${urlCdnKuxiu}/2.png`,
                `${urlCdnKuxiu}/3.png`,
                `${urlCdnKuxiu}/4.png`,
                `${urlCdnKuxiu}/5.png`,
                `${urlCdnKuxiu}/6.png`,
                `${urlCdnKuxiu}/7.png`,
                `${urlCdnKuxiu}/8.png`,
                `${urlCdnKuxiu}/9.png`,
                `${urlCdnLive}/guard-header-year.png`,
            ]);
        }, 3000);

        // preloadImages([
        //     logo,
        //     horn,
        //     multiple,
        //     managerImg,
        //     emotionImg,
        //     worldBgImg1,
        //     worldBgImg2,
        //     worldBgImg3,
        //     worldBgImg4,
        //     worldBgImg5,
        //     worldBgImg6,
        //     default_avatar,
        //     qrcode,
        //     focus,
        //     wechat,
        //     qq,
        //     fans,
        //     clean,
        //     alert,
        //     guard_enter,
        //     guard_gift,
        //     guard_id,
        //     guard_privilege,
        //     guard_privilege_disable,
        //     man,
        //     woman,
        //     gift_l,
        //     gift_h,
        //     gift_d,
        //     gift_g,
        //     jinchangtequan,
        //     shenfentequan,
        //     zhuanshuliwu,
        //     zunguiquanxian,
        // ])
        if (browser === 'firefox') {
            this.setState({
                circleWrapper: 'circle-box firefox'
            })
        }
        if (!this.timerShake) {
            this.timerShake = setInterval(() => {
                if (pageVisible) {
                    const { mobileShowType } = this.state
                    this.setState({
                        mobileShowType: mobileShowType === 'shake' ? 'static' : 'shake'
                    })
                }
            }, timeShake)
        }
        // const { router } = this.props
        // router.prefetch('/')
        // router.prefetch('/pay-start')
        let statistics = statisticsUrlArray && statisticsUrlArray.find(item => item.url === host);
        if (!statistics) {
            statistics = statisticsUrlArray && statisticsUrlArray[0]
        }
        if (statistics) {
            asyncLoadScripts([statistics.baiduHm, statistics.zhanzhangCore, statistics.zhanzhangStat])
        }
        window.addEventListener('beforeunload', this.onBeforeUnload, true);
        window.addEventListener('popstate', this.onPopState, true);
        if (typeof document.hidden !== "undefined") {
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            visibilityChange = "webkitvisibilitychange";
        }
        window.addEventListener(visibilityChange, this.onWindowVisibilityChange, true);
        setTimeout(() => {
            window.addEventListener('storage', this.onWindowStorage, true)
        }, 1000);
    }

    // 刷新监听
    onBeforeUnload = () => {
        this.exitRoom('exit', anchorId)
        // window.localStorage.removeItem('kx_live_room')
    }

    // 回退监听
    onPopState = () => {
        this.exitRoom('exit', anchorId)
        // window.localStorage.removeItem('kx_live_room')
    }

    // 播放器播放初始化
    playInit = () => {
        this.setState({
            live: 1,
        })
        const { maskPauseDisplay } = this.state
        if (maskPauseDisplay) {
            this.setState({
                maskPauseDisplay: false,
            })
        }
    }

    // 播放器开始
    playStart = () => {
        const _this = this
        if (!this.timerLive) {
            this.timerLive = setInterval(() => {
                _this.LiveTimeCountDown()
            }, 1000)
        }
        player && player.play()
    }

    // 播放器自动暂停
    playAutoPause = () => {
        const { maskPauseDisplay } = this.state
        if (!maskPauseDisplay) {
            this.setState({
                maskPauseDisplay: true
            })
        }
    }

    // 播放器自动开始
    playAutoStart = (e) => {
        e && e.preventDefault()
        player && player.play()
    }

    // 播放暂停
    playPause = () => {
        if (this.timerLive) {
            clearInterval(this.timerLive)
            this.timerLive = null
        }
    }

    // 缓存读写监听
    onWindowStorage = (e) => {
        if (e && e.key === 'kx_live_login') {
            if (!e.newValue && e.oldValue && loginStatus) {
                this.initLogoutStatus(false, this.initVisitorStatus)
            } else if (e.newValue && !e.oldValue && !loginStatus) {
                this.setState({
                    mobile: '',
                    password: '',
                    code: '',
                    loginType: 'login',
                    areaCode: '86',
                    passwordType: 'password',
                    qqShow: false,
                    wechatShow: false,
                    loginShow: false
                })
                userId = _.parseInt(customCookie.getCookie("kx_live_userId")) || 0
                // !window.sessionStorage.getItem('kx_live_slient_login') && window.sessionStorage.setItem('kx_live_slient_login', '1')
                this.exitRoom('login', anchorId)
            }
        } else if (e.key === 'kx_live_room') {
            if (browser === 'firefox' || browser === 'chrome') {
                window.location.href = 'about:blank';
                window.close();
            } else {
                window.opener = null;
                window.open('', '_self', '');
                window.close();
            }
        }
        // } else if (e.key === 'kx_live_qq_login_status') {
        //     if (e.newValue && !e.oldValue && !loginStatus) {
        //         window.localStorage.removeItem('kx_live_qq_login_status')
        //         userId = _.parseInt(window.localStorage.getItem("kx_live_userId")) || 0
        //         this.exitRoom('login', anchorId)
        //     }
        // }
    }

    componentWillUnmount() {
        this.timerValue && clearInterval(this.timerValue);
        this.timerText && clearInterval(this.timerText);
        this.timerRunway && clearInterval(this.timerRunway);
        this.timerRunwayThrough && clearInterval(this.timerRunwayThrough);
        this.timerTanmu && clearInterval(this.timerTanmu);
        this.timerGift && clearInterval(this.timerGift);
        this.timerEnter && clearInterval(this.timerEnter);
        this.timerGiftEffect && clearInterval(this.timerGiftEffect);
        this.timerCountDown && clearInterval(this.timerCountDown);
        this.timerFlash && clearInterval(this.timerFlash);
        this.timerStar1 && clearInterval(this.timerStar1);
        this.timerStar2 && clearInterval(this.timerStar2);
        this.timerStar3 && clearInterval(this.timerStar3);
        this.timerLogin && clearInterval(this.timerLogin);
        this.timerLive && clearInterval(this.timerLive);
        this.timerMobile && clearInterval(this.timerMobile);
        this.timerFlv && clearInterval(this.timerFlv);
        this.timerPk && clearInterval(this.timerPk);
        this.timerPlayer && clearTimeout(this.timerPlayer);
        this.timerPkDelay && clearTimeout(this.timerPkDelay);
        window.removeEventListener('click', this.onClickMaskEmotion, true)
        window.removeEventListener('click', this.onClickGiftNumItem, true)
        window.removeEventListener('beforeunload', this.onBeforeUnload, true);
        window.removeEventListener('popstate', this.onPopState, true);
        window.removeEventListener('storage', this.onWindowStorage, true);
        window.removeEventListener(visibilityChange, this.onWindowVisibilityChange, true)
    }

    // 切换弹幕类型
    handleChangeTanmuType = (e, value) => {
        e && e.preventDefault()
        const { tanmuType, dataRoom } = this.state
        if (tanmuType === value) {
            return
        }
        this.setState({
            tanmuType: value,
            placeHolder: value === 0 ? `普通弹幕${dataRoom.barragePrice || 10}酷币/条` : `世界喊话${dataRoom.barrageWorldPrice || 300}酷币/条`
        })
    }

    // 目标用户窗口隐藏
    handleTargetUserHide = () => {
        this.setState({
            targetShow: false,
            dataTarget: {},
        })
    }

    // 游客获取用户信息
    guestFetchTargetUserInfo = (e, targetUserId, isAnchor) => {
        e && e.preventDefault()
        const { guestFetchTargetUserInfo, guestFetchRoomUserStatus } = this.props
        guestFetchTargetUserInfo({
            targetUserId
        }).then(resp => {
            if (resp) {
                if (resp.gftui_succ) {
                    let data = _.assign({}, resp.gftui_data)
                    if (!isAnchor) {
                        guestFetchRoomUserStatus({
                            roomId: anchorId,
                            targetUserId
                        }).then(res => {
                            if (res) {
                                if (res.gfrus_succ) {
                                    data = {
                                        ...data,
                                        manager: res.gfrus_data.manager || 0,
                                        guardType: res.gfrus_data.guardType || 0,
                                    }
                                    this.setState({
                                        dataTarget: data,
                                    }, () => {
                                        this.setState({
                                            targetShow: true,
                                        })
                                    })
                                } else if (res.gfrus_msg) {
                                    this.handleErrMsg(res.gfrus_msg)
                                } else {
                                    this.handleErrMsg(errMsg)
                                }
                            }
                        })
                    } else {
                        this.setState({
                            dataTarget: data,
                        }, () => {
                            this.setState({
                                targetShow: true,
                            })
                        })
                    }
                } else if (resp.gftui_msg) {
                    this.handleErrMsg(resp.gftui_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    // 获取用户信息
    fetchTargetUserInfo = (e, targetUserId, isAnchor) => {
        e && e.preventDefault()
        const { fetchTargetUserInfo, fetchRoomUserStatus } = this.props
        fetchTargetUserInfo({
            targetUserId
        }).then(resp => {
            if (resp) {
                if (resp.ftui_code) {
                    const result = isAccountExpire(resp.ftui_code)
                    if (result) {
                        this.exitRoom('expire', anchorId)
                        setTimeout(() => {
                            this.guestFetchTargetUserInfo(e, targetUserId, isAnchor)
                        }, 500);
                        return
                    }
                }
                if (resp.ftui_succ) {
                    let data = _.assign({}, resp.ftui_data)
                    if (!isAnchor) {
                        fetchRoomUserStatus({
                            roomId: anchorId,
                            targetUserId
                        }).then(res => {
                            if (res) {
                                if (res.frus_succ) {
                                    data = {
                                        ...data,
                                        manager: res.frus_data.manager || 0,
                                        guardType: res.frus_data.guardType || 0,
                                    }
                                    this.setState({
                                        dataTarget: data,
                                    }, () => {
                                        this.setState({
                                            targetShow: true,
                                        })
                                    })
                                } else if (res.frus_msg) {
                                    this.handleErrMsg(res.frus_msg)
                                } else {
                                    this.handleErrMsg(errMsg)
                                }
                            }
                        })
                    } else {
                        this.setState({
                            dataTarget: data,
                        }, () => {
                            this.setState({
                                targetShow: true,
                            })
                        })
                    }
                } else if (resp.ftui_msg) {
                    this.handleErrMsg(resp.ftui_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            } else {
                this.exitRoom('expire', anchorId)
                setTimeout(() => {
                    this.guestFetchTargetUserInfo(e, targetUserId, isAnchor)
                }, 500);
            }
        })
    }

    // 展示消息
    displayMsg = (chatMsgList) => {
        const { dataRoom } = this.state
        const anchorNikeName = dataRoom.anchorNikeName || ''
        const chatList = chatMsgList.map((item, index) => {
            return (
                displayMsgItem(item, index, anchorId, anchorNikeName, loginStatus ? this.fetchTargetUserInfo : this.guestFetchTargetUserInfo, userId, dataRoom.anchorLevel, dataRoom.anchorAvatar, medalList, isHttps)
            )
        })
        return chatList
    }

    // 礼物连乘数量格式化
    displayNumber1 = (number, className) => {
        const numberArray = _.split(_.toString(number), '')
        const numberList = numberArray.map((item, index) => {
            return (
                <span className={className} key={index}><img src={`${urlCdnLive}/gift-effect-${item}.png`} alt='' /></span>
            )
        })
        return numberList
    }

    // 礼物连乘数量格式化
    displayNumber2 = (number, className) => {
        const numberArray = _.split(_.toString(number), '')
        const numberList = numberArray.map((item, index) => {
            return (
                <span className={className} key={index}><img src={`${urlCdnLive}/gift-effect-${item}.png`} alt='' /></span>
            )
        })
        return numberList
    }

    // 礼物连乘数量格式化
    displayNumber3 = (number, className) => {
        const numberArray = _.split(_.toString(number), '')
        const numberList = numberArray.map((item, index) => {
            return (
                <span className={className} key={index}><img src={`${urlCdnLive}/gift-effect-${item}.png`} alt='' /></span>
            )
        })
        return numberList
    }

    // 个人信息抽屉打开
    handleDrawerPersonalOpen = (e) => {
        e && e.preventDefault()
        if (!loginStatus) {
            this.setState({
                loginShow: true
            })
            return;
        }
        this.fetchUserInfo(() => {
            this.setState({
                drawerOpen: true,
            })
        })
        this.fetchAsset();
    }

    // 改变登录状态
    handleChangeLogin = (e) => {
        e && e.preventDefault()
        this.setState({
            loginType: 'login',
        })
    }

    // 改变注册状态
    handleChangeRegister = (e) => {
        e && e.preventDefault()
        this.setState({
            code: '',
            loginType: 'register',
        })
    }

    // 改变重置密码状态
    handleChangeResetPassword = (e) => {
        e && e.preventDefault()
        this.setState({
            code: '',
            loginType: 'resetPassword',
        })
    }

    // 登录引导关闭
    handleLoginGuideHide = (e) => {
        e && e.preventDefault()
        this.setState({
            loginGuideShow: false,
        })
    }

    // 登录显示
    handleLoginShow = (e, loginType) => {
        e && e.preventDefault();
        this.setState({
            loginGuideShow: false,
            guardGuideShow: false,
            loginShow: true,
            loginType,
        })
    }

    // 微信登录显示
    handleWechatShow = (e) => {
        e && e.preventDefault()
        this.setState({
            wechatShow: true
        }, () => {
            _hmt.push(['_trackEvent', 'PC登录', '微信登录']);
        })
    }
    
    // 微信登录隐藏
    handleWechatHide = (e) => {
        e && e.preventDefault()
        this.setState({
            wechatShow: false
        })
    }

    // qq登录显示
    handleQqShow = (e) => {
        e && e.preventDefault()
        this.setState({
            qqShow: true
        }, () => {
            _hmt.push(['_trackEvent', 'PC登录', 'QQ登录']);
        })
    }

    // qq登录隐藏
    handleQqHide = (e) => {
        e && e.preventDefault()
        this.setState({
            qqShow: false
        })
    }

    // 守护规则显示
    handleGuardRuleShow = () => {
        this.setState({
            guardRuleShow: true
        })
    }

    // 守护规则隐藏
    handleGuardRuleHide = () => {
        this.setState({
            guardRuleShow: false
        })
    }

    // 绑定手机隐藏
    handleBindHide = (e) => {
        e && e.preventDefault()
        this.setState({
            mobile: '',
            code: '',
            passwordType: 'password',
            bindShow: false,
            areaCode: '86'
        })
    }

    // 抽屉隐藏
    handleDrawerClose = (e) => {
        e && e.preventDefault()
        this.setState({
            drawerOpen: false,
        })
        const { tipsShow } = this.state
        if (tipsShow) {
            this.setState({
                tipsShow: false,
                tipsClass: 'tips-warning type3',
                tipsContent: '',
            })
        }
    }

    // 选择区号显示
    handleSelectAreaCode = (e, item) => {
        e && e.preventDefault()
        const { mobile, areaCodeType } = this.state
        if (item.value === '86' && mobile.length > 11) {
            this.setState({
                mobile: mobile.slice(0, 11)
            })
        }
        this.setState({
            areaCode: item.value,
        }, () => {
            if (areaCodeType === 0) {
                this.setState({
                    areaCodeShow: false,
                    loginShow: true,
                })
            } else {
                this.setState({
                    areaCodeShow: false,
                    bindShow: true,
                })
            }
        })
    }

    // 区号显示
    handleAreaCodeShow = (e, areaCodeType) => {
        e && e.preventDefault()
        if (areaCodeType === 0) {
            this.setState({
                areaCodeShow: true,
                loginShow: false,
                areaCodeType,
            })
        } else {
            this.setState({
                areaCodeShow: true,
                bindShow: false,
                areaCodeType,
            })
        }
    }

    // 区号隐藏
    handleAreaCodeHide = (e) => {
        e && e.preventDefault()
        const { areaCodeType } = this.state
        if (areaCodeType === 0) {
            this.setState({
                areaCodeShow: false,
                loginShow: true,
            })
        } else {
            this.setState({
                areaCodeShow: false,
                bindShow: true,
            })
        }
    }

    // 礼物说明移开
    handleLeaveGiftUp = (e) => {
        e && e.preventDefault();
        this.setState({
            giftBoxStyleUp: 'none',
            giftBoxClassUp: 'desc-box'
        })
    }

    // 礼物说明移入
    handleEnterGiftUp = (e, item, index) => {
        e && e.preventDefault();
        if (index % 5 === 1) {
            this.setState({
                iconUrlUp: item.iconUrl || '',
                giftNameUp: item.giftName,
                giftPriceUp: item.giftPrice,
                giftBoxClassUp: 'desc-box up pos-1',
            }, () => {
                this.setState({
                    giftBoxStyleUp: 'block',
                })
            })
        } else if (index % 5 === 2) {
            this.setState({
                iconUrlUp: item.iconUrl || '',
                giftNameUp: item.giftName,
                giftPriceUp: item.giftPrice,
                giftBoxClassUp: 'desc-box up pos-2',
            }, () => {
                this.setState({
                    giftBoxStyleUp: 'block',
                })
            })
        } else if (index % 5 === 3) {
            this.setState({
                iconUrlUp: item.iconUrl || '',
                giftNameUp: item.giftName,
                giftPriceUp: item.giftPrice,
                giftBoxClassUp: 'desc-box up pos-3',
            }, () => {
                this.setState({
                    giftBoxStyleUp: 'block',
                })
            })
        } else if (index % 5 === 4) {
            this.setState({
                iconUrlUp: item.iconUrl || '',
                giftNameUp: item.giftName,
                giftPriceUp: item.giftPrice,
                giftBoxClassUp: 'desc-box up pos-4',
            }, () => {
                this.setState({
                    giftBoxStyleUp: 'block',
                })
            })
        } else if (index % 5 === 0) {
            this.setState({
                iconUrlUp: item.iconUrl || '',
                giftNameUp: item.giftName,
                giftPriceUp: item.giftPrice,
                giftBoxClassUp: 'desc-box up pos-5',
            }, () => {
                this.setState({
                    giftBoxStyleUp: 'block',
                })
            })
        }
    }

    // 礼物说明移开
    handleLeaveGiftDown = (e) => {
        e && e.preventDefault();
        this.setState({
            giftBoxStyleDown: 'none',
            giftBoxClassDown: 'desc-box'
        })
    }   

    // 礼物说明移入
    handleEnterGiftDown = (e, item, index) => {
        e && e.preventDefault();
        if (index % 5 === 1) {
            this.setState({
                iconUrlDown: item.iconUrl || '',
                giftNameDown: item.giftName,
                giftPriceDown: item.giftPrice,
                giftBoxClassDown: 'desc-box down pos-1',
            }, () => {
                this.setState({
                    giftBoxStyleDown: 'block',
                })
            })
        } else if (index % 5 === 2) {
            this.setState({
                iconUrlDown: item.iconUrl || '',
                giftNameDown: item.giftName,
                giftPriceDown: item.giftPrice,
                giftBoxClassDown: 'desc-box down pos-2',
            }, () => {
                this.setState({
                    giftBoxStyleDown: 'block',
                })
            })
        } else if (index % 5 === 3) {
            this.setState({
                iconUrlDown: item.iconUrl || '',
                giftNameDown: item.giftName,
                giftPriceDown: item.giftPrice,
                giftBoxClassDown: 'desc-box down pos-3',
            }, () => {
                this.setState({
                    giftBoxStyleDown: 'block',
                })
            })
        } else if (index % 5 === 4) {
            this.setState({
                iconUrlDown: item.iconUrl || '',
                giftNameDown: item.giftName,
                giftPriceDown: item.giftPrice,
                giftBoxClassDown: 'desc-box down pos-4',
            }, () => {
                this.setState({
                    giftBoxStyleDown: 'block',
                })
            })
        } else if (index % 5 === 0) {
            this.setState({
                iconUrlDown: item.iconUrl || '',
                giftNameDown: item.giftName,
                giftPriceDown: item.giftPrice,
                giftBoxClassDown: 'desc-box down pos-5',
            }, () => {
                this.setState({
                    giftBoxStyleDown: 'block',
                })
            })
        }
    }
    
    // 页面切换后台
    onWindowVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            pageVisible = false
        } else if (document.visibilityState === 'visible') {
            pageVisible = true
        }
    }

    // 切换直播间
    handleGoLive = (e, item) => {
        // e && e.preventDefault()
        if (e) {
            e.cancelBubble = true;
            e.stopPropagation();
        }
        if (anchorId === item.anchorId) {
            return
        }
        this.exitRoom('switchAnchor', anchorId, item.anchorId)
        const title = returnTitle(item.nickname || item.anchorNickName || '', item.slogan || '', item.anchorId)
        const description = returnDescription(item.nickname || item.anchorNickName || '', item.slogan || '')
        const keywords = returnKeywords(item.nickname || item.anchorNickName || '', item.slogan || '')
        window.localStorage.setItem('kx_live_title', title)
        window.localStorage.setItem('kx_live_description', description)
        window.localStorage.setItem('kx_live_keywords', keywords)
        window.localStorage.setItem('kx_live_playUrl', aesEncrypt(item.urlPlayRtmp) || '')
        window.localStorage.setItem('kx_live_cover', item.livingImg || item.avatar || '')
    }

    // 输入验证码
    handleChangeCode = (e) => {
        this.setState({
            code: e && e.target.value.replace(/\s/g, ""),
        })
    }

    // 改变举报类型
    handleChangeReport = (e, value) => {
        e.preventDefault()
        this.setState({
            reportType: value
        })
    }

    // 输入手机号
    handleChangeMobile = (e) => {
        this.setState({
            mobile: e && e.target.value.replace(/\s/g, ""),
        })
    }

    // 输入密码
    handleChangePassword = (e) => {
        this.setState({
            password: e && e.target.value.replace(/\s/g, ""),
        })
    }

    // 用户举报显示
    handleReportShow = (e) => {
        e && e.preventDefault();
        if (!loginStatus) {
            this.handleLoginShow(e, 'login');
            return;
        }
        this.setState({
            reportShow: true
        })
    }

    // 用户举报隐藏
    handleReportHide = (e) => {
        e && e.preventDefault();
        this.setState({
            reportShow: false,
            reportType: ''
        })
    }

    // 举报结果隐藏
    handleReportResultHide = (e) => {
        e && e.preventDefault();
        this.setState({
            reportResultShow: false,
        })
    }

    // 举报结果显示
    handleReportResultShow = (e) => {
        e.preventDefault();
        this.setState({
            reportShow: false,
            reportResultShow: true,
            reportType: ''
        })
    }

    // 登录隐藏
    handleLoginHide = (e) => {
        e && e.preventDefault();
        this.setState({
            loginShow: false,
            loginType: 'login',
            mobile: '',
            passwordType: 'password',
            password: '',
            code: '',
            areaCode: '86'
        })
    }

    // 切换礼物列表页码
    handleMoveGiftList = (e, type) => {
        e && e.preventDefault()
        const { giftIndex1, giftIndex1Max } = this.state
        if (!moveEnable) {
            return;
        }
        if (type === 'left') {
            if (giftIndex1 === 0) {
                return;
            }
            moveEnable = false;
            if (giftIndex1 === 1) {
                this.setState({
                    arrowLeftClass1: 'btn left left-disable',
                })
            }
            if (giftIndex1 === giftIndex1Max) {
                this.setState({
                    arrowRightClass1: 'btn right',
                })
            }
            this.setState({
                giftIndex1: giftIndex1 - 1,
                giftMoveStyle1: `-${giftMove * (giftIndex1 - 1)}px`
            }, () => {
                setTimeout(() => {
                    moveEnable = true
                }, 700);
            })
        } else {
            if (giftIndex1 === giftIndex1Max) {
                return;
            }
            if (giftIndex1 === 0) {
                this.setState({
                    arrowLeftClass1: 'btn left',
                })
            }
            if (giftIndex1 === giftIndex1Max - 1) {
                this.setState({
                    arrowRightClass1: 'btn right right-disable',
                })
            }
            this.setState({
                giftIndex1: giftIndex1 + 1,
                giftMoveStyle1: `-${giftMove * (giftIndex1 + 1)}px`
            }, () => {
                setTimeout(() => {
                    moveEnable = true
                }, 700);
            })
        }
    }

    // 切换守护礼物列表页码
    handleMoveGuardGiftList = (e, type) => {
        e && e.preventDefault()
        const { giftIndex2, giftIndex2Max } = this.state
        if (!moveEnable) {
            return;
        }
        if (type === 'left') {
            if (giftIndex2 === 0) {
                return;
            }
            moveEnable = false;
            if (giftIndex2 === 1) {
                this.setState({
                    arrowLeftClass2: 'btn left left-disable',
                })
            }
            if (giftIndex2 === giftIndex2Max) {
                this.setState({
                    arrowRightClass2: 'btn right',
                })
            }
            this.setState({
                giftIndex2: giftIndex2 - 1,
                giftMoveStyle2: `-${giftMove * (giftIndex2 - 1)}px`
            }, () => {
                setTimeout(() => {
                    moveEnable = true
                }, 700);
            })
        } else {
            if (giftIndex2 === giftIndex2Max) {
                return;
            }
            if (giftIndex2Max === 0) {
                this.setState({
                    arrowLeftClass2: 'btn left',
                })
            }
            if (giftIndex2 === giftIndex2Max - 1) {
                this.setState({
                    arrowRightClass2: 'btn right right-disable',
                })
            }
            this.setState({
                giftIndex2: giftIndex2 + 1,
                giftMoveStyle2: `-${giftMove * (giftIndex2 + 1)}px`
            }, () => {
                setTimeout(() => {
                    moveEnable = true
                }, 700);
            })
        }
    }

    // 聊天滚动到最底部
    handleScrollTopPosition = () => {
        if (this.scrollbarRef && this.scrollbarRef.current && this.scrollbarRef.current.props && this.scrollbarRef.current.props.children) {
            this.scrollbarRef.current.scrollToBottom();
        }
    }
    
    // 消息显示格式化
    showMsg = (type) => {
        const { dataChatMsg, chatMsgList } = this.state;
        const _this = this;
        let data = _.assign({}, dataChatMsg);
        data = {
            ...data,
            msgType: type
        }
        this.setState({
            chatMsgList: [...chatMsgList, data]
        }, () => {
            setTimeout(() => {
                _this.handleScrollTopPosition();
            }, timerShowMsg);
        })
    }

    // 选择礼物ui初始化
    handleSelectGift = (e, item) => {
        e && e.preventDefault();
        const { giftId, show } = this.state;
        if (show) {
            this.timerValue && clearInterval(this.timerValue);
            this.timerValue = null;
            this.timerText && clearInterval(this.timerText);
            this.timerText = null;
            this.timerTime && clearTimeout(this.timerTime);
            this.timerTime = null;
            this.setState({
                value: 0,
                time: 3,
                show: false
            });
        }
        if (giftId === item.giftId) {
            this.setState({
                giftId: -1,
                giftNumArray: [],
                giftNumIndex: 0,
                giftType: -1,
                giftPrice: 0,
                giftTitle: 0,
            });
        } else {
            const array = _.split(item.giftNum, ',') || [];
            this.setState({
                giftId: item.giftId,
                giftNumArray: array,
                giftNumIndex: array.length === 0 ? 0 : array.length - 1,
                giftType: item.giftType,
                giftPrice: item.giftPrice,
                giftTitle: item.giftTitle
            });
        }
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

    handleFirefoxTipHide = () => {
        this.setState({
            firefoxTipShow: false
        })
    }

    // 初始化计数
    handleCountDown = () => {
        this.timerTime = setTimeout(() => {
            this.initCountDown();
        }, timeOut);
    }

    // 连乘计数初始化
    initCountDown = () => {
        this.setState({
            show: false,
            value: 0,
            time: 3
        }, () => {
            this.timerValue && clearInterval(this.timerValue);
            this.timerValue = null;
            this.timerText && clearInterval(this.timerText);
            this.timerText = null;
            this.timerTime && clearTimeout(this.timerTime);
            this.timerTime = null;
        });
    }

    // 赠送礼物
    handleSendGift = (e) => {
        e && e.preventDefault();
        const { giftId, giftNumArray, maskTextDisplay, giftNumIndex, giftType, show, giftPrice, giftTitle, giftBaseType, dataRoom, kuCoin, live, dataUser } = this.state;
        if (!loginStatus) {
            this.handleLoginShow(e, 'login')
            return
        }
        if (dataUser && !dataUser.mobile) {
            this.setState({
                bindShow: true,
            })
            return
        }
        if (maskTextDisplay && live === 0) {
            this.handleErrMsg('亲，直播已结束，请稍后再试试吧');
            return;
        }
        if (kickOut) {
            return;
        }
        if (giftId === -1 || giftNumArray.length === 0 || giftPrice <= 0 || giftType === -1) {
            return;
        }
        if (giftBaseType === 'guard' && giftType === 3 && dataRoom.guardType <= 0) {
            this.setState({
                guardShow: true
            })
            return;
        }
        if (giftBaseType === 'guard' && giftType === 10 && giftTitle >= 6) {
            if (giftTitle === 6 && dataUser.userLevel < 60) {
                this.handleErrMsg('只有达到国公才可以赠送');
                return;
            } else if (giftTitle === 7 && dataUser.userLevel < 70) {
                this.handleErrMsg('只有达到郡王才可以赠送');
                return;
            } else if (giftTitle === 8 && dataUser.userLevel < 80) {
                this.handleErrMsg('只有达到亲王才可以赠送');
                return;
            } else if (giftTitle === 9 && dataUser.userLevel < 90) {
                this.handleErrMsg('只有达到诸侯才可以赠送');
                return;
            } else if (giftTitle === 10 && dataUser.userLevel < 100) {
                this.handleErrMsg('只有达到国王才可以赠送');
                return;
            } else if (giftTitle === 11 && dataUser.userLevel < 110) {
                this.handleErrMsg('只有达到帝王才可以赠送');
                return;
            }
        }
        if (kuCoin <= 0) {
            this.setState({
                paymentTipShow: true
            })
            return;
        }
        if (kuCoin < giftPrice * _.parseInt(giftNumArray[giftNumIndex])) {
            this.setState({
                paymentTipShow: true
            })
            return;
        }
        if (!show) {
            comboId = uuid()
            this.setState({
                show: true
            }, () => {
                this.timerValue = setInterval(() => {
                    const { value } = this.state;
                    this.setState({
                        value: value < 1 ? value + valueIncrement : 1
                    })
                }, valueTimer);
                this.timerText = setInterval(() => {
                    const { time } = this.state;
                    this.setState({
                        time: time > 0 ? _.round(time - 0.1, 1) : 0
                    })
                }, 100);
                this.handleCountDown();
            })
        } else if (show) {
            const { circleWrapper } = this.state;
            this.timerTime && clearTimeout(this.timerTime);
            this.setState({
                value: 0,
                time: 3,
            }, () => {
                this.handleCountDown();
            })
            if (circleWrapper === 'circle-box' || circleWrapper === 'circle-box firefox') {
                this.setState({
                    circleWrapper: browser === 'firefox' ? 'circle-box firefox scale' : 'circle-box scale'
                });
                setTimeout(() => {
                    this.setState({
                        circleWrapper: browser === 'firefox' ? 'circle-box firefox' : 'circle-box'
                    });
                }, 250);
            }
        } else {
            comboId = uuid()
        }
        this.sendGift(giftId, giftNumArray[giftNumIndex], giftType)
    }

    // 礼物连乘数量格式化
    fetchGiftText = (value) => {
        switch (value) {
            case '1':
                return '1 (唯一)';
            case '10':
                return '10 (十全十美)';
            case '99':
                return '99 (天长地久)';
            case '188':
                return '188 (要抱抱)';
            case '520':
                return '520 (我爱你)';
            case '1314':
                return '1314 (一生一世)';
            default:
                return ''
        }
    }

    render() {
        const {
            effectGiftDisplay,
            opacityGiftEffect,
            dataRunwayMsg,
            maskFlashDisplay,
            maskTextDisplay,
            maskFlvDisplay,
            maskPauseDisplay,
            arrowLeftClass1,
            arrowRightClass1,
            giftMoveStyle1,
            giftBoxClassUp,
            giftBoxStyleUp,
            iconUrlUp,
            giftNameUp,
            giftPriceUp,
            giftBoxClassDown,
            giftBoxStyleDown,
            iconUrlDown,
            giftNameDown,
            giftPriceDown,
            arrowLeftClass2,
            arrowRightClass2,
            giftMoveStyle2,
            tabStyle,
            tanmuChecked,
            tanmuSelectShow,
            tanmuType,
            guardType,
            guardRuleShow,
            emotionShow,
            msgToSend,
            chatMsgList,
            placeHolder,
            areaCodeType,
            tipsShow,
            tipsContent,
            areaCode,
            areaCodeShow,
            wechatShow,
            qqShow,
            loginType,
            countDown,
            mobile,
            code,
            password,
            sendBtnEnable,
            dataTarget,
            isLogin,
            audience,
            reportShow,
            guardGuideShow,
            guardShow,
            targetShow,
            cleanWorldStatus,
            cleanStatus,
            cleanWorldDisplay,
            cleanDisplay,
            bindShow,
            reportResultShow,
            reportType,
            drawerOpen,
            kuCoin,
            randomList,
            maskContent,
            randomListOver,
            giftBaseType,
            dataUser,
            dataRoom,
            tabListType,
            audienceList,
            guardList,
            managerList,
            loginGuideShow,
            loginShow,
            giftListUp,
            giftListDown,
            guardGiftListUp,
            guardGiftListDown,
            giftId,
            giftNumArray,
            giftNumIndex,
            giftSelectShow,
            show,
            time,
            value,
            circleWrapper,
            opacityGiftMsg,
            giftClass1,
            giftShow1,
            giftBottom1,
            giftTranslate1,
            giftAvatar1,
            giftComboCount1,
            giftNickname1,
            giftCount1,
            giftName1,
            giftStar1,
            giftIconUrl1,
            giftMultipleClass1,
            giftNumberClass1,
            giftClass2,
            giftShow2,
            giftBottom2,
            giftTranslate2,
            giftAvatar2,
            giftComboCount2,
            giftNickname2,
            giftCount2,
            giftName2,
            giftStar2,
            giftIconUrl2,
            giftMultipleClass2,
            giftNumberClass2,
            giftClass3,
            giftShow3,
            giftBottom3,
            giftTranslate3,
            giftAvatar3,
            giftComboCount3,
            giftNickname3,
            giftCount3,
            giftName3,
            giftStar3,
            giftIconUrl3,
            giftMultipleClass3,
            giftNumberClass3,
            enterShow1,
            enterClass1,
            enterLvText1,
            enterNickname1,
            enterManager1,
            enterDriver1,
            enterGuard1,
            enterMedalImg1,
            enterShow2,
            enterClass2,
            enterLvText2,
            enterNickname2,
            enterManager2,
            enterDriver2,
            enterGuard2,
            enterMedalImg2,
            enterShow3,
            enterClass3,
            enterLvText3,
            enterNickname3,
            enterManager3,
            enterDriver3,
            enterGuard3,
            enterMedalImg3,
            live,
            browserTipShow,
            payTipShow,
            firefoxTipShow,
            installFlash,
            mainOpacity,
            guardResult,
            worldTanmuShow,
            paymentTipShow,
            minute,
            second,
            tipsClass,
            passwordType,
            mobileShowType,
            downloadDisp,
            guideDisp,
            dataRunwayMsgThrough,
            flashSrc,
            guardEffectShow,
            guardEffectName,
            guardEffectUserName,
            guardEffectAvatar,
            guardEffectClass,
        } = this.state;
        let loginText = null;
        let btn = null;
        let iframe = null;
        let redirect = null;
        let guardText;
        let focusBtn = null;
        const sec = _.padStart(second.toString(), 2, '0');
        const min = _.padStart(minute.toString(), 2, '0');
        let lvText = null
        if (dataRoom) {
            if (dataRoom.anchorNextEx - dataRoom.anchorEx <= 0) {
                lvText = '已满级'
            } else {
                const exp = convertToTenThousand2(dataRoom.anchorNextEx - dataRoom.anchorEx) || 0
                lvText = `需要${exp}升级`
            }
        }
        if (dataTarget) {
            if (dataTarget.userId === anchorId) {
                if (!dataRoom || dataRoom.follow === undefined || dataRoom.follow === 0) {
                    focusBtn = <button className="btn" type='button' onClick={e => this.addAttention(e, dataTarget.userId, 1)}>+关注</button>
                } else {
                    focusBtn = <button className="btn" type='button' onClick={e => this.cancelAttention(e, dataTarget.userId, 1)}>取消关注</button>
                }
            } else {
                if (dataTarget.isAttention === 0) {
                    focusBtn = <button className="btn" type='button' onClick={e => this.addAttention(e, dataTarget.userId, 0)}>+关注</button>
                } else {
                    focusBtn = <button className="btn" type='button' onClick={e => this.cancelAttention(e, dataTarget.userId, 0)}>取消关注</button>
                }
            }
        }
        switch (dataRoom.guardType) {
            case 2:
                guardText = '半年守护'
                break;
            case 3:
                guardText = '全年守护'
                break;
            default:
                guardText = '月守护'
                break;
        }
        if (wechatShow) {
            if (!isPreEnv) {
                redirect = encodeURIComponent(`${protocol}//www.17kuxiu.com/third-login?source=wechat&anchorId=${anchorId}&channel=${channel}&fromHost=${host}`)
                iframe = <iframe title='微信登录' scrolling="no" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={`https://open.weixin.qq.com/connect/qrconnect?appid=wxfab5ae6702b51286&redirect_uri=${redirect}&scope=snsapi_login`} style={{ width: '400px', height: "100%", paddingTop: "16px" }}></iframe>
            } else {
                redirect = encodeURIComponent(`${protocol}//pre.17kuxiu.com/web/kuxiu/third-login?source=wechat&anchorId=${anchorId}&channel=${channel}&fromHost=${host}`)
                iframe = <iframe title='微信登录' scrolling="no" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={`https://open.weixin.qq.com/connect/qrconnect?appid=wx54c074f879c18f2b&redirect_uri=${redirect}&scope=snsapi_login`} style={{ width: '400px', height: "100%", paddingTop: "16px" }}></iframe>
            }
        }
        if (qqShow) {
            if (!isPreEnv) {
                redirect = encodeURIComponent(`${protocol}//www.17kuxiu.com/third-login?source=qq&channel=${channel}&fromHost=${host}&anchorId=${anchorId}`)
            } else {
                redirect = encodeURIComponent(`${protocol}//pre.17kuxiu.com/web/kuxiu/third-login?source=qq&channel=${channel}&fromHost=${host}`)
            }
            iframe = <iframe title='QQ登录' scrolling="no" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={`https://graph.qq.com/oauth2.0/show?display=pc&which=Login&display=pc&response_type=code&client_id=101508256&redirect_uri=${redirect}&scope=get_user_info`} style={{ width: '434px', height: "100%" }}></iframe>
        }
        if (loginShow) {
            switch (loginType) {
                case 'login':
                    loginText = '登录'
                    btn = <button type='button' className={mobile && password ? 'active' : 'inactive'} onClick={e => this.login(e)}>{loginText}</button>
                    break
                case 'register':
                    loginText = '注册'
                    btn = <button type='button' className={mobile && password && code ? 'active' : 'inactive'} onClick={e => this.register(e)}>{loginText}</button>
                    break
                case 'resetPassword':
                    loginText = '重置密码'
                    btn = <button type='button' className={mobile && password && code ? 'active' : 'inactive'} onClick={e => this.resetPassword(e)}>{loginText}</button>
                    break
                default:
                    break
            }
        }
        const chatList = this.displayMsg(chatMsgList);
        return (
            <Fragment>
                <div className="live">
                    <div className="left-bar" style={{ opacity: mainOpacity }}>
                        <div className="icon" onClick={e => this.handleGoIndex(e)}>
                            <img src={logo} alt='' />
                        </div>
                        <div className="avatar" onClick={e => this.handleDrawerPersonalOpen(e)}>
                            <img src={isLogin ? formatUserAvatar(dataUser.avatarUrl) : default_avatar} onError={this.errorImgAvatar} />
                        </div>
                        <div>
                            <div onClick={this.handlePayTipShow}>
                                <a target="_blank" href={!isPreEnv ? `/pay-start?channel=${channel}` : `/web/kuxiu/pay-start?channel=${channel}`} className="recharge">
                                    <div>充值</div>
                                </a>
                            </div>
                            {
                                !isLogin
                                    ?
                                    <Fragment>
                                        <span className="href" onClick={e => this.handleLoginShow(e, 'login')}>
                                            <div>登录<span>登录</span></div>
                                        </span>
                                        <span className="href" onClick={e => this.handleLoginShow(e, 'register')}>
                                            <div>注册<span>注册</span></div>
                                        </span>
                                    </Fragment>
                                    :
                                    null
                            }
                            {
                                isLogin
                                    ?
                                    <a href="javascript:;" className="href" onClick={e => this.handleGoIndex(e)}>
                                        <div>首页<span className="type1"><i className="iconfont icon-home"></i></span></div>
                                    </a>
                                    :
                                    <a href="javascript:;" className="href" onClick={e => this.handleGoIndex(e)}>
                                        <div>首页<span>首页</span></div>
                                    </a>
                            }
                        </div>
                        <div className="bottom">
                            <div className="report">
                                <div onClick={e => this.handleReportShow(e)}>
                                    <i className="iconfont icon-alert"></i>
                                    <span className="inner">举报</span>
                                </div>
                                <div className="report-box" style={{ display: reportShow ? 'block' : 'none' }}>
                                    <div className="content">
                                        <div className="title">
                                            举报此主播
                                        </div>
                                        <div className="right-btn close" onClick={e => this.handleReportHide(e)}></div>
                                        <ul>
                                            <li className={reportType === '1' ? 'select' : ''} onClick={e => this.handleChangeReport(e, '1')}>
                                                <input readOnly checked={reportType === '1' ? 'checked' : ''} type="radio" name="radio" value="1" />
                                                <label htmlFor="radio">政治谣言</label>
                                            </li>
                                            <li className={reportType === '2' ? 'select' : ''} onClick={e => this.handleChangeReport(e, '2')}>
                                                <input readOnly checked={reportType === '2' ? 'checked' : ''} type="radio" name="radio" value="2" />
                                                <label htmlFor="radio">色情低俗</label>
                                            </li>
                                            <li className={reportType === '3' ? 'select' : ''} onClick={e => this.handleChangeReport(e, '3')}>
                                                <input readOnly checked={reportType === '3' ? 'checked' : ''} type="radio" name="radio" value="3" />
                                                <label htmlFor="radio">侮辱谩骂</label>
                                            </li>
                                            <li className={reportType === '4' ? 'select' : ''} onClick={e => this.handleChangeReport(e, '4')}>
                                                <input readOnly checked={reportType === '4' ? 'checked' : ''} type="radio" name="radio" value="4" />
                                                <label htmlFor="radio">垃圾广告</label>
                                            </li>
                                            <li className={reportType === '5' ? 'select' : ''} onClick={e => this.handleChangeReport(e, '5')}>
                                                <input readOnly checked={reportType === '5' ? 'checked' : ''} type="radio" name="radio" value="5" />
                                                <label htmlFor="radio">违法行为</label>
                                            </li>
                                        </ul>
                                        <div className="btn-footer">
                                            <button type='button' className="btn-submit" onClick={e => this.userReport(e, this.handleReportResultShow)}>确定举报</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="report-result" style={{ display: reportResultShow ? 'block' : 'none' }}>
                                    <div className="content">
                                        <div className="title">
                                            举报成功
                                        </div>
                                        <div className="right-btn close" onClick={e => this.handleReportResultHide(e)}></div>
                                        <div className="detail">我们已收到您的举报，将尽快处理！</div>
                                        <div className="btn-footer">
                                            <button type='button' className="btn-submit" onClick={e => this.handleReportResultHide(e)}>我知道了</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="download" onMouseOver={e => this.handleDownloadShow(e)} onMouseOut={e => this.handleDownloadHide(e)}>
                                <div>
                                    {
                                        mobileShowType === 'static'
                                            ?
                                            <i className="iconfont icon-mobile"></i>
                                            :
                                            <img className="mobile-img" src={mobile_shake} alt='' />
                                    }
                                    <span className='inner type1'>
                                        <img src={qrcode} alt="" />
                                        <span className='inner type2'>下载APP</span>
                                    </span>
                                </div>
                                <div className="download-box" style={{ display: downloadDisp }}>
                                    <div className="content">
                                        <div className="download-ecode">
                                            <img src={qrcode} alt="" />
                                        </div>
                                        <div className="detail first">扫码下载酷秀APP</div>
                                        <div className="detail">随时随地看直播</div>
                                    </div>
                                </div>
                                <div className="guide-box" style={{ display: guideDisp }}>
                                    <img src={app_down_guide} alt='' />
                                    <span className="inner-text">点此下载APP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="live-box" style={{ opacity: mainOpacity }}>
                        <div className="live-left">
                            <div className="anchor clearfix pr">
                                <div className="avatar">
                                    <span onClick={e => (loginStatus ? this.fetchTargetUserInfo(e, anchorId, true) : this.guestFetchTargetUserInfo(e, anchorId, true))}>
                                        <img src={formatUserAvatar(dataRoom.anchorAvatar)} onError={this.errorImgAvatar} />
                                    </span>
                                </div>
                                <div className="info">
                                    <div className="nickname txt-cut" onClick={e => (loginStatus ? this.fetchTargetUserInfo(e, anchorId, true) : this.guestFetchTargetUserInfo(e, anchorId, true))}>{dataRoom.anchorNikeName || '主播'}</div>
                                    <div className="detail">
                                        <span className='level'>
                                            <img src={`${urlCdnLvAnchor}/anchor${dataRoom.anchorLevel || 0}.png`} alt='' />
                                        </span>
                                        <span className="exp">{lvText}</span>
                                    </div>
                                </div>
                                {
                                    dataRoom.follow === 1
                                        ?
                                        dataRoom.guardType === 0
                                            ?
                                            <div className="guard" onClick={e => this.handleGuardShow(e)}>+守护</div>
                                            :
                                            null
                                        :
                                        <div className="follow" onClick={e => this.addAttention(e, anchorId, 1)}>+关注</div>
                                }
                            </div>
                            <div className="anchor-rank clearfix" onClick={this.handleShowGuideTip}>
                                <div>
                                    <span className="rank day">日榜</span><span className="content">{dataRoom.dayRank > 200 ? '200+' : (dataRoom.dayRank || '未上榜')}</span>
                                </div>
                                <div>
                                    <span className="rank sun">阳光</span><span className="content">{convertToTenThousand2(dataRoom.sunlight) || 0}</span>
                                </div>
                                <div>
                                    <span className="rank star">星光</span><span className="content">{convertToTenThousand2(dataRoom.starlight) || 0}</span>
                                </div>
                                <div className={tipsClass} style={{ 'display': (tipsShow && !drawerOpen && tipsClass === 'tips-warning type2' ? 'block' : 'none') }}>
                                    <p className="type1" dangerouslySetInnerHTML={{ __html: tipsContent || '' }}></p>
                                </div>
                            </div>
                            <div className="room-list" style={{ height: tabListType === 'guard' ? 'calc(100% - 188px)' : 'calc(100% - 128px)' }}>
                                <ul className="title">
                                    <li onClick={e => this.handleChangeTabList(e, 'audience')}>观众</li>
                                    <li onClick={e => this.handleChangeTabList(e, 'guard')}>守护</li>
                                    <li onClick={e => this.handleChangeTabList(e, 'manager')}>管理</li>
                                    <div style={{ transform: `translateX(${tabStyle})` }} className="slider"></div>
                                </ul>
                                <div className="content">
                                    <ColoredScrollbars style={{ height: '100%', width: '100%' }} universal={true}>
                                        <ul className="rank-list" style={{ display: tabListType === 'audience' ? 'block' : 'none' }}>
                                            {
                                                audienceList.map((item, index) => {
                                                    let className
                                                    let rewardClass = 'level-left reward'
                                                    switch (index) {
                                                        case 0:
                                                            className = 'top top1'
                                                            rewardClass += ' first'
                                                            break
                                                        case 1:
                                                            className = 'top top2'
                                                            rewardClass += ' second'
                                                            break
                                                        case 2:
                                                            className = 'top top3'
                                                            rewardClass += ' third'
                                                            break
                                                        default:
                                                            break
                                                    }
                                                    return (
                                                        <li className={className} key={index} onClick={e => (loginStatus ? this.fetchTargetUserInfo(e, item.uid, false) : this.guestFetchTargetUserInfo(e, item.uid, false))}>
                                                            <div className={index <= 2 ? "medal" : "order"}>{index > 2 ? index + 1 : ''}</div>
                                                            <div className="img-box">
                                                                <LazyLoad overflow throttle={100} height={28}>
                                                                    <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} />
                                                                </LazyLoad>
                                                            </div>
                                                            <div className="nickname">
                                                                {
                                                                    // item.manager === 1
                                                                    //     ?
                                                                    //     <span className="level-left manager">
                                                                    //         <span className="level manager">
                                                                    //             <img src={managerImg} alt='' />
                                                                    //         </span>
                                                                    //     </span>
                                                                    //     :
                                                                    //     null
                                                                }
                                                                {
                                                                    // item.guardType > 0
                                                                    //     ?
                                                                    //     <span className={item.guardType > 2 ? "level-left guard-2" : "level-left guard-1"}>
                                                                    //         <span className={item.guardType > 2 ? "level guard-2" : "level guard-1"}>
                                                                    //             <img src={initGuardTypeImg(item.guardType)} alt='' />
                                                                    //         </span>
                                                                    //     </span>
                                                                    //     :
                                                                    //     null
                                                                }
                                                                <span className="level-left sex">
                                                                    <span className="level sex">
                                                                        <img src={item.sex === 1 ? man : woman} alt='' />
                                                                    </span>
                                                                </span>
                                                                <span className='level-left level'>
                                                                    <span className='level'>
                                                                        <img className="level-img" src={`${urlCdnLvUser}/user${item.userLevel || 0}.png`} alt='' />
                                                                    </span>
                                                                </span>
                                                                {
                                                                    item.identityType === 1
                                                                        ?
                                                                        <span className='level-left level'>
                                                                            <span className='level'>
                                                                                <img className="level-img" src={`${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`} alt='' />
                                                                            </span>
                                                                        </span>
                                                                        :
                                                                        null
                                                                }
                                                                <span className="level-left nickname txt-cut">{item.nickname || ''}</span>
                                                                {
                                                                    item.rewardKucoin > 0
                                                                        ?
                                                                        <span className={rewardClass}>{convertToTenThousand1(item.rewardKucoin)}</span>
                                                                        :
                                                                        null
                                                                }
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <ul className="rank-list" style={{ display: tabListType === 'guard' ? 'block' : 'none' }}>
                                            {
                                                guardList.map((item, index) => {
                                                    let className
                                                    switch (index) {
                                                        case 0:
                                                            className = 'top top1'
                                                            break
                                                        case 1:
                                                            className = 'top top2'
                                                            break
                                                        case 2:
                                                            className = 'top top3'
                                                            break
                                                        default:
                                                            break
                                                    }
                                                    return (
                                                        <li className={className} key={index} onClick={e => (loginStatus ? this.fetchTargetUserInfo(e, item.uid, false) : this.guestFetchTargetUserInfo(e, item.uid, false))}>
                                                            <div className={index <= 2 ? "medal" : "order"}>{index > 2 ? index + 1 : ''}</div>
                                                            <div className="img-box">
                                                                <LazyLoad overflow throttle={200} height={28}>
                                                                    <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} />
                                                                </LazyLoad>
                                                            </div>
                                                            <div className="nickname">
                                                                {
                                                                    item.guardType > 0
                                                                        ?
                                                                        <span className={item.guardType > 2 ? "level-left guard-2" : "level-left guard-1"}>
                                                                            <span className={item.guardType > 2 ? "level guard-2" : "level guard-1"}>
                                                                                <img src={initGuardTypeImg(item.guardType)} alt='' />
                                                                            </span>
                                                                        </span>
                                                                        :
                                                                        null
                                                                }
                                                                <span className="level-left sex">
                                                                    <span className="level sex">
                                                                        <img src={item.sex === 1 ? man : woman} alt='' />
                                                                    </span>
                                                                </span>
                                                                <span className='level-left level'>
                                                                    <span className='level'>
                                                                        <img className="level-img" src={`${urlCdnLvUser}/user${item.userLevel || 0}.png`} alt='' />
                                                                    </span>
                                                                </span>
                                                                {
                                                                    item.identityType === 1
                                                                        ?
                                                                        <span className='level-left level'>
                                                                            <span className='level'>
                                                                                <img className="level-img" src={`${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`} alt='' />
                                                                            </span>
                                                                        </span>
                                                                        :
                                                                        null
                                                                }
                                                                <span className="level-left nickname txt-cut guard">{item.nickname || ''}</span>
                                                                {
                                                                    item.guardValue > 0
                                                                        ?
                                                                        <span className="level-left type2">{convertToTenThousand2(item.guardValue)}</span>
                                                                        :
                                                                        null
                                                                }
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <ul className="rank-list" style={{ display: tabListType === 'manager' ? 'block' : 'none' }}>
                                            {
                                                managerList.map((item, index) => {
                                                    let className
                                                    switch (index) {
                                                        case 0:
                                                            className = 'top top1'
                                                            break
                                                        case 1:
                                                            className = 'top top2'
                                                            break
                                                        case 2:
                                                            className = 'top top3'
                                                            break
                                                        default:
                                                            break
                                                    }
                                                    return (
                                                        <li className={className} key={index} onClick={e => (loginStatus ? this.fetchTargetUserInfo(e, item.uid, false) : this.guestFetchTargetUserInfo(e, item.uid, false))}>
                                                            <div className="img-box">
                                                                <LazyLoad overflow throttle={200} height={28}>
                                                                    <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} />
                                                                </LazyLoad>
                                                            </div>
                                                            <div className="nickname">
                                                                <span className="level-left manager">
                                                                    <span className="level manager">
                                                                        <img src={managerImg} alt='' />
                                                                    </span>
                                                                </span>
                                                                <span className="level-left sex">
                                                                    <span className="level sex">
                                                                        <img src={item.sex === 1 ? man : woman} alt='' />
                                                                    </span>
                                                                </span>
                                                                <span className='level-left level'>
                                                                    <span className='level'>
                                                                        <img className="level-img" src={`${urlCdnLvUser}/user${item.userLevel || 0}.png`} alt='' />
                                                                    </span>
                                                                </span>
                                                                {
                                                                    item.identityType === 1
                                                                        ?
                                                                        <span className='level-left level'>
                                                                            <span className='level'>
                                                                                <img className="level-img" src={`${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`} alt='' />
                                                                            </span>
                                                                        </span>
                                                                        :
                                                                        null
                                                                }
                                                                <span className="level-left nickname txt-cut guard">{item.nickname || ''}</span>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </ColoredScrollbars>
                                </div>
                            </div>
                            {
                                dataRoom.guardType > 0
                                    ?
                                    <div className="continue-guard clearfix pr">
                                        <div className="info">
                                            <div className="title txt-cut">您当前开通的是：</div>
                                            <div className="detail">
                                                {guardText}
                                                <span className="due-time">
                                                    （{dataRoom.dueTime && dataRoom.dueTime.replace('/', '-').replace('/', '-')}到期）
                                                </span>
                                            </div>
                                        </div>
                                        <div className="continue" onClick={e => this.handleGuardShow(e)}>继续开通守护</div>
                                    </div>
                                    :
                                    <div className="continue-guard clearfix pr">
                                        <div className="info type1">
                                            <div className="title txt-cut">开通真爱守护，尽享守护特权~</div>
                                        </div>
                                        <div className="continue" onClick={e => this.handleGuardShow(e)}>我要开通守护</div>
                                    </div>
                            }
                        </div>
                        <div className="live-content">
                            <div className="register-guide" style={{ display: loginGuideShow ? 'block' : 'none' }}>
                                <div className="right-btn close" onClick={e => this.handleLoginGuideHide(e)}></div>
                                <div className="title">酷秀直播美女帅哥等你来撩～</div>
                                <div className="btn">
                                    <div className="inner login-btn" onClick={e => this.handleLoginShow(e, 'login')}>登录</div>
                                    <div className="inner register-btn" onClick={e => this.handleLoginShow(e, 'register')}>注册</div>
                                </div>
                                <div className="info">
                                    <span className="fl">正在直播</span>
                                    <button type='button' className="fr" onClick={e => (loginStatus ? this.fetchRandomLiveList(e, 20, 1) : this.guestFetchRandomLiveList(e, 20, 1))}>换一批</button>
                                </div>
                                <ul className="anchor">
                                    {
                                        randomList.map((item, index) => {
                                            return (
                                                <li key={index} onClick={e => this.handleGoLive(e, item)}>
                                                    <img src={formatLiveCover(item.livingImg)} onError={this.errorImgCover} />
                                                    <div className="item">
                                                        <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} className="avatar" />
                                                        <div className="txt-cut">{item.nickname || ''}</div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="login type1" style={{ display: loginShow ? 'block' : 'none' }}>
                                <div className="title type1">
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
                                <div className="right-btn close" onClick={e => this.handleLoginHide(e)}></div>
                                <div className="content">
                                    <div className="input">
                                        <span onClick={e => this.handleAreaCodeShow(e, 0)}>{`+${areaCode}`}
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
                                                        <button type='button' className={sendBtnEnable ? "code type1" : "code type1 done"} onClick={e => this.checkMobile(e, 1, this.sendVerificationCode)}>{sendBtnEnable ? '获取验证码' : `重新发送${countDown}s`}</button>
                                                        :
                                                        <button type='button' className={sendBtnEnable ? "code type1" : "code type1 done"} onClick={e => this.sendVerificationCode(e, 3)}>{sendBtnEnable ? '获取验证码' : `重新发送${countDown}s`}</button>
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
                                    <div className="third-login-title type1">其他登录方式</div>
                                    <div className="third-login type1">
                                        <span className="span-1">
                                            <img src={wechat} onClick={e => this.handleWechatShow(e)} alt='' />
                                        </span>
                                        <span className="span-1">
                                            <img src={qq} onClick={e => this.handleQqShow(e)} alt='' />
                                        </span>
                                    </div>
                                    <div className="third-login second">
                                        <span className="span-2">微信登录</span>
                                        <span className="span-2">QQ登录</span>
                                    </div>
                                </div>
                            </div>
                            <div className={areaCodeType === 0 ? 'area-code type1' : 'area-code type2'} style={{ display: areaCodeShow ? 'block' : 'none' }}>
                                <div className="title type1">选择国家地区</div>
                                <div className="right-btn close" onClick={e => this.handleAreaCodeHide(e)}></div>
                                <SpringScrollbars style={{ height: areaCodeType === 0 ? '388px' : '238px', width: '100%' }} universal={true}>
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
                            <div className="login type2" style={{ display: bindShow ? 'block' : 'none' }}>
                                <div className="title type2">
                                    根据国家法律法规，需要您完善手机号～
                                </div>
                                <div className="right-btn close" onClick={e => this.handleBindHide(e)}></div>
                                <div className="content">
                                    <div className="input">
                                        <span onClick={e => this.handleAreaCodeShow(e, 1)}>{`+${areaCode}`}
                                            <i className="iconfont icon-arrow-down"></i>
                                        </span>
                                        <input autoComplete="off" value={mobile} onChange={this.handleChangeMobile} type="text" maxLength='11' placeholder="输入手机号" />
                                    </div>
                                    <div className="half-input">
                                        <input maxLength={6} autoComplete="off" value={code} type="text" placeholder="输入验证码" onChange={this.handleChangeCode} />
                                        <button type='button' className={sendBtnEnable ? "code type1" : "code type1 done"} onClick={e => this.sendVerificationCode(e, 4)}>{sendBtnEnable ? '获取验证码' : `重新发送${countDown}s`}</button>
                                    </div>
                                    <button type='button' className={mobile && code ? 'active' : 'inactive'} onClick={e => this.bindMobile(e)}>完善</button>
                                </div>
                            </div>
                            <div className="buy-guard" style={{ display: guardShow ? 'block' : 'none' }}>
                                <div className={guardType === 1 || guardType === 2 ? 'title type1' : 'title type2'}>
                                    <span onClick={e => this.handleChangeGuardType(e, 1)} className={guardType === 1 ? null : "noselect"}>
                                        <p>月守护</p>
                                        <p className="coin">58800酷币</p>
                                        {
                                            dataRoom.guardType === 1
                                                ?
                                                <p className="dueTime">{dataRoom.dueTime.replace('/', '-').replace('/', '-')}到期</p>
                                                :
                                                <p>&nbsp;</p>
                                        }
                                    </span>
                                    <span onClick={e => this.handleChangeGuardType(e, 2)} className={guardType === 2 ? null : "noselect"}>
                                        <p>半年守护</p>
                                        <p className="coin">288800酷币</p>
                                        {
                                            dataRoom.guardType === 2
                                                ?
                                                <p className="dueTime">{dataRoom.dueTime.replace('/', '-').replace('/', '-')}到期</p>
                                                :
                                                <p>&nbsp;</p>
                                        }
                                    </span>
                                    <span onClick={e => this.handleChangeGuardType(e, 3)} className={guardType === 3 ? null : "noselect"}>
                                        <p>全年守护</p>
                                        <p className="coin">588800酷币</p>
                                        {
                                            dataRoom.guardType === 3
                                                ?
                                                <p className="dueTime">{dataRoom.dueTime.replace('/', '-').replace('/', '-')}到期</p>
                                                :
                                                <p>&nbsp;</p>
                                        }
                                    </span>
                                </div>
                                <div className="right-btn close" onClick={this.handleGuardHide}></div>
                                <div className="left-btn help" onClick={this.handleGuardRuleShow}></div>
                                <div className={`content type${guardType}`}>成为Ta的守护，享受独一无二的特权</div>
                                <div className="detail">
                                    <span>
                                        <p><img className='identity' src={guard_id} alt='' /></p>
                                        <p>身份标识</p>
                                        <div className="guard-tip-box type1">
                                            <div className="img-box">
                                                <img src={shenfentequan} alt='' />
                                            </div>
                                        </div>
                                    </span>
                                    <span>
                                        <p><img className='identity' src={guard_enter} alt='' /></p>
                                        <p>进场特效</p>
                                        <div className="guard-tip-box type2">
                                            <div className="img-box">
                                                <img src={jinchangtequan} alt='' />
                                            </div>
                                        </div>
                                    </span>
                                    <span>
                                        <p><img className='identity' src={guard_gift} alt='' /></p>
                                        <p>专属礼物</p>
                                        <div className="guard-tip-box type3">
                                            <div className="img-box">
                                                <img src={zhuanshuliwu} alt='' />
                                            </div>
                                        </div>
                                    </span>
                                    <span>
                                        <p><img className='identity' src={guardType === 1 || guardType === 2 ? guard_privilege_disable : guard_privilege} alt='' /></p>
                                        <p>尊贵特权</p>
                                        <div className="guard-tip-box type4">
                                            <div className="img-box">
                                                <img src={zunguiquanxian} alt='' />
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="bottom-box">
                                    <span className="coin fl">我的酷币:&nbsp;{kuCoin || 0}</span>
                                    <span className="open fr" onClick={e => this.buyGuard(e)}></span>
                                </div>
                            </div>
                            {
                                <div className="live-video">
                                    <div id='live-container'></div>
                                    <div id="barrage-container"></div>
                                    <img style={{ 'display': maskTextDisplay || maskFlashDisplay || maskPauseDisplay || live === 0 ? 'block' : 'none' }} src={formatLiveCover(cover)} onError={this.errorImgCover} className="blur" />
                                    <div className="random-list" style={{ 'display': maskTextDisplay || maskFlashDisplay || maskPauseDisplay ? 'block' : 'none' }}>
                                        <div className="content">
                                            <div className="title" style={{ 'display': maskTextDisplay && maskContent ? 'block' : 'none' }}>{maskTextDisplay ? maskContent : ''}</div>
                                            <div className="title type1" style={{ 'display': maskFlashDisplay ? 'block' : 'none' }}>您需要安装Flash Player才能收看酷秀的精彩直播哦
                                                <br />
                                                请您
                                                <a className="download" rel="noopener noreferrer" target="_blank" href="https://get.adobe.com/cn/flashplayer">安装</a>后刷新本页面
                                                {
                                                    maskFlvDisplay
                                                        ?
                                                        <Fragment>
                                                            <br />
                                                            若您安装Flash后仍旧无法观看，请点击<a href="javascript:;" className="download" onClick={e => this.switchFlvLivePlayer(e)}>切换视频格式</a>试试
                                                        </Fragment>
                                                        :
                                                        null
                                                }
                                            </div>
                                            <div className="title type1" style={{ 'display': maskPauseDisplay ? 'block' : 'none' }}>您的浏览器不支持视频自动播放
                                                <br />
                                                <button type="button" className="play" onClick={e => this.playAutoStart(e)}>点击播放</button>
                                            </div>
                                            <div className="item-box">
                                                <ul>
                                                    {
                                                        randomListOver.map((item, index) => {
                                                            return (
                                                                <li key={index} className="item" onClick={e => this.handleGoLive(e, item)}>
                                                                    <img src={formatLiveCover(item.livingImg)} onError={this.errorImgCover} />
                                                                    <div className="item-hover">
                                                                        <img src={formatUserAvatar(item.avatar)} onError={this.errorImgAvatar} className="avatar-hover" />
                                                                        <div>{item.nickname || ''}</div>
                                                                    </div>
                                                                    <div className="nickname-box">
                                                                        <span className="nickname txt-cut fl">{item.nickname || ''}</span>
                                                                        <span className="level fr"><img src={`${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`} alt='' /></span>
                                                                    </div>
                                                                    <div className="id">ID:&nbsp;{item.anchorId || ''}</div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={this.handleChangeLiveRoom} className='live-btn-change' style={{ 'display': browser !== 'h5' && live === 1 && !maskFlashDisplay && !maskTextDisplay ? 'block' : 'none', 'right': changeRight, 'bottom': cleanChangeBottom }}>换一换</div>
                                    <div className='live-btn-clean time' style={{ 'display': browser !== 'h5' && live === 1 && !maskFlashDisplay && !maskTextDisplay ? 'block' : 'none', 'left': timeLeft, 'bottom': cleanBottom }}>{`${min}:${sec}`}</div>
                                    <div onClick={e => this.handleCleanWorld(e, !cleanWorldStatus)} className={cleanWorldStatus ? 'live-btn-clean hide' : 'live-btn-clean showWorld'} style={{ 'display': cleanWorldDisplay && browser !== 'h5' && live === 1 ? 'block' : 'none', 'right': cleanRightWorld, 'bottom': cleanBottom }}>世界喊话</div>
                                    <div onClick={e => this.handleClean(e, !cleanStatus)} className={cleanStatus ? 'live-btn-clean hide' : 'live-btn-clean show'} icon="clean" style={{ 'display': cleanDisplay && browser !== 'h5' && live === 1 ? 'block' : 'none', 'right': cleanRight, 'bottom': cleanBottom }}>
                                        <span className="img-box">
                                            <img src={clean} alt='' />
                                        </span>清屏
                                    </div>
                                    <div className="id-float">
                                        <span>酷秀ID:&nbsp;{anchorId}</span>
                                    </div>
                                    <div className="audience-float">
                                        <span>{audience || 0}人在看</span>
                                    </div>
                                    <div style={{ opacity: dataRunwayMsg || dataRunwayMsgLoop ? 1 : 0 }} className="gift-float">
                                        <img className="horn" src={horn} alt='' />
                                        <span className="runway">
                                            {
                                                dataRunwayMsg &&
                                                (
                                                    dataRunwayMsg.sysMsg
                                                        ?
                                                        <span className="runwayAnimate">{dataRunwayMsg.sysMsg || ''}</span>
                                                        :
                                                        dataRunwayMsg.gameId >= 0
                                                            ?
                                                            (
                                                                dataRunwayMsg.gameId === 4
                                                                    ?
                                                                    (
                                                                        dataRunwayMsg.isUpRunwayBig === 0 &&
                                                                        <span className="runwayAnimate">
                                                                            恭喜{dataRunwayMsg.userNickName || ''}
                                                                            在{dataRunwayMsg.gameName || ''}抽中
                                                                            {dataRunwayMsg.rewardRate || ''}倍，获得
                                                                            {dataRunwayMsg.count.toString() || ''}幸运星
                                                                            <img className="img-gift" src={dataRunwayMsg.iconUrl || ''} alt='' />
                                                                        </span>
                                                                    )
                                                                    :
                                                                    (
                                                                        dataRunwayMsg.isUpRunwayBig === 0 &&
                                                                        <span className="runwayAnimate">
                                                                            恭喜{dataRunwayMsg.userNickName || ''}
                                                                            在{dataRunwayMsg.gameName || ''}中获得
                                                                        {dataRunwayMsg.giftName || ''}
                                                                            <img className="img-gift" src={dataRunwayMsg.iconUrl || ''} alt='' />
                                                                            X
                                                                        {dataRunwayMsg.count.toString() || ''}
                                                                        </span>
                                                                    )
                                                            )
                                                            :
                                                            <span className="runwayAnimate">
                                                                {dataRunwayMsg.userNickName || ''}
                                                                送给
                                                                {dataRunwayMsg.anchorNickName || ''}
                                                                {dataRunwayMsg.count.toString() || ''}
                                                                个
                                                                {dataRunwayMsg.giftName || ''}
                                                                <img className="img-gift" src={dataRunwayMsg.iconUrl || ''} alt='' />
                                                            </span>
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div style={{ opacity: dataRunwayMsgThrough ? 1 : 0 }} className="gift-float second">
                                        <img className="bg" src={flashSrc} alt='' />
                                        {
                                            dataRunwayMsgThrough && dataRunwayMsgThrough.globalFlag === 1 &&
                                            (
                                                <span onClick={e => this.handleGoLive(e, dataRunwayMsgThrough)} className="runway second">
                                                    <span className={dataRunwayMsgThrough ? "second runwayAnimateThrough" : "second"}>
                                                        <em>{dataRunwayMsgThrough.userNickName || ''}</em>
                                                        在
                                                        <em>{dataRunwayMsgThrough.anchorNickName || ''}</em>
                                                        房间赠送了
                                                        {dataRunwayMsgThrough.giftName || ''}
                                                        <img className="img-gift second" src={dataRunwayMsgThrough.iconUrl || ''} alt='' />
                                                        X
                                                        {dataRunwayMsgThrough.count.toString() || ''}
                                                    </span>
                                                </span>
                                            )
                                        }
                                        {
                                            dataRunwayMsgThrough && dataRunwayMsgThrough.isUpRunwayBig === 1 &&
                                            (
                                                dataRunwayMsgThrough.gameId === 4
                                                    ?
                                                    <span className="runway turntable second">
                                                        <span className={dataRunwayMsgThrough ? "second runwayAnimateThrough" : "second"}>
                                                            恭喜：
                                                        <em className="turntable">{dataRunwayMsgThrough.userNickName || ''}</em>
                                                            在
                                                        {dataRunwayMsgThrough.gameName || ''}
                                                            抽中
                                                        {dataRunwayMsgThrough.rewardRate || ''}倍，获得
                                                        {dataRunwayMsgThrough.count.toString() || ''}幸运星
                                                        <img className="img-gift second" src={dataRunwayMsgThrough.iconUrl || ''} alt='' />
                                                        </span>
                                                    </span>
                                                    :
                                                    <span className="runway turntable second">
                                                        <span className={dataRunwayMsgThrough ? "second runwayAnimateThrough" : "second"}>
                                                            恭喜：
                                                        <em className="turntable">{dataRunwayMsgThrough.userNickName || ''}</em>
                                                            在
                                                        {dataRunwayMsgThrough.gameName || ''}
                                                            中获得
                                                        <em className="turntable">{dataRunwayMsgThrough.giftName || ''}</em>
                                                            <img className="img-gift second" src={dataRunwayMsgThrough.iconUrl || ''} alt='' />
                                                            X
                                                        {dataRunwayMsgThrough.count.toString() || ''}
                                                        </span>
                                                    </span>
                                            )
                                        }
                                    </div>
                                    <div id="gift-effect" className="gift-effect" style={{ 'display': effectGiftDisplay ? 'block' : 'none', 'opacity': opacityGiftEffect }}></div>
                                    <div style={{ 'opacity': opacityGiftMsg }}>
                                        <div className={giftClass1} style={{ 'display': giftShow1 ? '' : 'none', transform: `translateY(${giftTranslate1})`, 'bottom': giftBottom1 }}>
                                            <span className="live-avatar live-avatar-size-default live-avatar-shape-circle live-avatar-type-image avatar">
                                                <img className="live-avatar-image" src={formatUserAvatar(giftAvatar1)} onError={this.errorImgAvatar} />
                                            </span>
                                            <div className="gift-container">
                                                <p>{giftNickname1}</p>
                                                <p>送了<img className="count" src={`${urlCdnLive}/gift-amount-${giftCount1.toString()}.png`} alt='' />个&nbsp;
                                                    <span>{giftName1}</span>
                                                </p>
                                            </div>
                                            <span className="gift-image-container">
                                                <div className="gift-image-wrapper">
                                                    <img className="gift-image" src={giftIconUrl1 || ''} alt='' />
                                                </div>
                                                <span className="gift-wrapper">
                                                    <span className={giftMultipleClass1}>
                                                        <img src={multiple} alt='' />
                                                    </span>
                                                    {this.displayNumber1(giftComboCount1, giftNumberClass1)}
                                                    {
                                                        giftStar1 &&
                                                        <span className='star-container'>
                                                            <img src={giftStar1} alt='' />
                                                        </span>
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                        <div className={giftClass2} style={{ 'display': giftShow2 ? '' : 'none', transform: `translateY(${giftTranslate2})`, 'bottom': giftBottom2 }}>
                                            <span className="live-avatar live-avatar-size-default live-avatar-shape-circle live-avatar-type-image avatar">
                                                <img className="live-avatar-image" src={formatUserAvatar(giftAvatar2)} onError={this.errorImgAvatar} />
                                            </span>
                                            <div className="gift-container">
                                                <p>{giftNickname2}</p>
                                                <p>送了<img className="count" src={`${urlCdnLive}/gift-amount-${giftCount2.toString()}.png`} alt='' />个&nbsp;
                                                    <span>{giftName2}</span>
                                                </p>
                                            </div>
                                            <span className="gift-image-container">
                                                <div className="gift-image-wrapper">
                                                    <img className="gift-image" src={giftIconUrl2 || ''} alt='' />
                                                </div>
                                                <span className="gift-wrapper">
                                                    <span className={giftMultipleClass2}>
                                                        <img src={multiple} alt='' />
                                                    </span>
                                                    {this.displayNumber2(giftComboCount2, giftNumberClass2)}
                                                    {
                                                        giftStar2 &&
                                                        <span className='star-container'>
                                                            <img src={giftStar2} alt='' />
                                                        </span>
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                        <div className={giftClass3} style={{ 'display': giftShow3 ? '' : 'none', transform: `translateY(${giftTranslate3})`, 'bottom': giftBottom3 }}>
                                            <span className="live-avatar live-avatar-size-default live-avatar-shape-circle live-avatar-type-image avatar">
                                                <img className="live-avatar-image" src={formatUserAvatar(giftAvatar3)} onError={this.errorImgAvatar} />
                                            </span>
                                            <div className="gift-container">
                                                <p>{giftNickname3}</p>
                                                <p>送了<img className="count" src={`${urlCdnLive}/gift-amount-${giftCount3.toString()}.png`} alt='' />个&nbsp;
                                                    <span>{giftName3}</span>
                                                </p>
                                            </div>
                                            <span className="gift-image-container">
                                                <div className="gift-image-wrapper">
                                                    <img className="gift-image" src={giftIconUrl3 || ''} alt='' />
                                                </div>
                                                <span className="gift-wrapper">
                                                    <span className={giftMultipleClass3}>
                                                        <img src={multiple} alt='' />
                                                    </span>
                                                    {this.displayNumber3(giftComboCount3, giftNumberClass3)}
                                                    {
                                                        giftStar3 &&
                                                        <span className='star-container'>
                                                            <img src={giftStar3} alt='' />
                                                        </span>
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="live-right">
                            <div className="msglist">
                                <ColoredScrollbars style={{ height: '99%', width: '100%' }} universal={true} ref={this.scrollbarRef}>
                                    {chatList}
                                </ColoredScrollbars>
                                <div style={{ 'display': enterShow1 ? 'block' : 'none', 'top': '90%' }} className={enterClass1}>
                                    <div>
                                        {
                                            enterMedalImg1
                                                ?
                                                <span className="medal"><img className="medal" src={enterMedalImg1} alt='' /></span>
                                                :
                                                <span className="lv">{enterLvText1}</span>
                                        }
                                        {
                                            enterManager1 === 1 && <span><img className='small' src={managerImg} alt='' /></span>
                                        }
                                        {
                                            enterGuard1 > 0 && <span><img className={enterGuard1 > 2 ? 'middle' : 'small'} src={initGuardTypeImg(enterGuard1)} alt='' /></span>
                                        }
                                        <span className="content"><span className="nickName">{enterNickname1}</span>{enterDriver1 ? `开着${enterDriver1}炫酷登场了！` : (enterGuard1 > 0 ? '进场啦！' : '来捧场啦!')}</span>
                                    </div>
                                </div>
                                <div style={{ 'display': enterShow2 ? 'block' : 'none', 'top': '78%' }} className={enterClass2}>
                                    <div>
                                        {
                                            enterMedalImg2
                                                ?
                                                <span className="medal"><img className="medal" src={enterMedalImg2} alt='' /></span>
                                                :
                                                <span className="lv">{enterLvText2}</span>
                                        }
                                        {
                                            enterManager2 === 1 && <span><img className='small' src={managerImg} alt='' /></span>
                                        }
                                        {
                                            enterGuard2 > 0 && <span><img className={enterGuard2 > 2 ? 'middle' : 'small'} src={initGuardTypeImg(enterGuard2)} alt='' /></span>
                                        }
                                        <span className="content"><span className="nickName">{enterNickname2}</span>{enterDriver2 ? `开着${enterDriver2}炫酷登场了！` : (enterGuard2 > 0 ? '进场啦！' : '来捧场啦!')}</span>
                                    </div>
                                </div>
                                <div style={{ 'display': enterShow3 ? 'block' : 'none', 'top': '66%' }} className={enterClass3}>
                                    <div>
                                        {
                                            enterMedalImg3
                                                ?
                                                <span className="medal"><img className="medal" src={enterMedalImg3} alt='' /></span>
                                                :
                                                <span className="lv">{enterLvText3}</span>
                                        }
                                        {
                                            enterManager3 === 1 && <span><img className='small' src={managerImg} alt='' /></span>
                                        }
                                        {
                                            enterGuard3 > 0 && <span><img className={enterGuard3 > 2 ? 'middle' : 'small'} src={initGuardTypeImg(enterGuard3)} alt='' /></span>
                                        }
                                        <span className="content"><span className="nickName">{enterNickname3}</span>{enterDriver3 ? `开着${enterDriver3}炫酷登场了！` : (enterGuard3 > 0 ? '进场啦！' : '来捧场啦!')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="msg-send">
                                <div className="switch-wrap">
                                    <input name="switch" type="checkbox" checked={tanmuChecked} />
                                    <label htmlFor="switch" onClick={this.handleChangeTanmuChecked}>
                                        <span className="move">
                                            <span>
                                                <em>弹</em>
                                            </span>
                                        </span>
                                    </label>
                                    <div className="danmu-box" style={{ display: tanmuSelectShow && worldTanmuShow ? 'block' : 'none' }}>
                                        <div className="btn-box">
                                            <button type='button' className={tanmuType === 0 ? "btn-tanmu select" : "btn-tanmu"} onClick={e => this.handleChangeTanmuType(e, 0)}>普通弹幕</button>
                                            <button type='button' className={tanmuType === 1 ? "btn-tanmu select" : "btn-tanmu"} onClick={e => this.handleChangeTanmuType(e, 1)}>世界喊话</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="input">
                                    <input ref={this.inputRef} type="text" onKeyUp={e => this.handleKeyUpMsg(e)} onChange={e => this.handleChangeMsg(e)} value={msgToSend} className="text" placeholder={placeHolder} />
                                </div>
                                <div className="emotion-wrapper" onClick={e => this.handleEmotionShow(e)}>
                                    <span className="emotion">
                                        <img src={emotionImg} alt='' />
                                    </span>
                                </div>
                                <div className="emotion-item-click" style={{ display: emotionShow ? 'block' : 'none' }}>
                                    <span className="arrow-top"></span>
                                    <SpringScrollbars style={{ height: 140, width: 248 }} universal={true}>
                                        {
                                            emotionArray.map((item, index) => {
                                                return (
                                                    <span key={index} className="emotion-image">
                                                        <img src={item || ''} alt="" onClick={e => this.handleChangeEmotion(e, item)} />
                                                    </span>
                                                );
                                            })
                                        }
                                    </SpringScrollbars>
                                </div>
                                <button type="button" className="send" onClick={e => this.handleSendMsg(e)}>发送</button>
                            </div>
                            <div className="gift-box">
                                <div className="gift-btn">
                                    <div className={giftBaseType === 'gift' ? "move-box" : "move-box move"}></div>
                                    <div className="tab-box">
                                        <p className={giftBaseType === 'gift' ? "tab on" : 'tab'} onClick={e => this.handleChangeGiftTabType(e, 'gift')}>礼物</p>
                                        <p className={giftBaseType === 'guard' ? "tab on" : 'tab'} onClick={e => this.handleChangeGiftTabType(e, 'guard')}>专属</p>
                                    </div>
                                </div>
                                <div className="gift-window" style={{ display: giftBaseType === 'gift' ? 'block' : 'none' }}>
                                    <div onClick={e => this.handleMoveGiftList(e, 'left')} className={arrowLeftClass1}></div>
                                    <div className="gift-list">
                                        <div className="gift-move" style={{ transform: `translateX(${giftMoveStyle1})` }}>
                                            <div className="gift-outer">
                                                <div className="gift-inner">
                                                    {
                                                        giftListUp.map((item, index) => {
                                                            let tag
                                                            if (item.giftType === 0) {
                                                                if (item.giftTitle) {
                                                                    tag = <img className="tag-d" src={`${item.giftTitleUrl}`} alt="" />
                                                                } else {
                                                                    tag = null;
                                                                }
                                                            } else if (item.giftType === 2) {
                                                                tag = <img className="tag-h" src={gift_h} alt="" />
                                                            } else {
                                                                tag = null;
                                                            }
                                                            const tempIndex = index + 1;
                                                            return (
                                                                <span onClick={e => this.handleSelectGift(e, item)} onMouseLeave={e => this.handleLeaveGiftUp(e)} onMouseEnter={e => this.handleEnterGiftUp(e, item, tempIndex)} className={item.giftId === giftId ? "gift-content select" : "gift-content"} key={tempIndex}>
                                                                    <img className="img" src={initImgProtocal(isHttps, item.iconUrl || '')} alt="" />
                                                                    {tag}
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className="gift-inner">
                                                    {
                                                        giftListDown.map((item, index) => {
                                                            let tag
                                                            if (item.giftType === 0) {
                                                                if (item.giftTitle) {
                                                                    tag = <img className="tag-d" src={`${item.giftTitleUrl}`} alt="" />
                                                                } else {
                                                                    tag = null;
                                                                }
                                                            } else if (item.giftType === 2) {
                                                                tag = <img className="tag-h" src={gift_h} alt="" />
                                                            } else {
                                                                tag = null;
                                                            }
                                                            const tempIndex = index + 1;
                                                            return (
                                                                <span onClick={e => this.handleSelectGift(e, item)} onMouseLeave={e => this.handleLeaveGiftDown(e)} onMouseEnter={e => this.handleEnterGiftDown(e, item, tempIndex)} key={tempIndex} className={item.giftId === giftId ? "gift-content select" : "gift-content"}>
                                                                    <img className="img" src={initImgProtocal(isHttps, item.iconUrl || '')} alt="" />
                                                                    {tag}
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={e => this.handleMoveGiftList(e, 'right')} className={arrowRightClass1}></div>
                                </div>
                                <div className="gift-window" style={{ display: giftBaseType === 'guard' ? 'block' : 'none' }}>
                                    <div onClick={e => this.handleMoveGuardGiftList(e, 'left')} className={arrowLeftClass2}></div>
                                    <div className="gift-list">
                                        <div className="gift-move" style={{ transform: `translateX(${giftMoveStyle2})` }}>
                                            <div className="gift-outer">
                                                <div className="gift-inner">
                                                    {
                                                        guardGiftListUp.map((item, index) => {
                                                            const tempIndex = index + 1;
                                                            return (
                                                                <span onClick={e => this.handleSelectGift(e, item)} onMouseLeave={e => this.handleLeaveGiftUp(e)} onMouseEnter={e => this.handleEnterGiftUp(e, item, tempIndex)} className={item.giftId === giftId ? "gift-content select" : "gift-content"} key={tempIndex}>
                                                                    <img className="img" src={initImgProtocal(isHttps, item.iconUrl || '')} alt="" />
                                                                    <img className="tag-l" src={item.giftTitleUrl || ''} alt="" />
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className="gift-inner">
                                                    {
                                                        guardGiftListDown.map((item, index) => {
                                                            const tempIndex = index + 1;
                                                            return (
                                                                <span onClick={e => this.handleSelectGift(e, item)} onMouseLeave={e => this.handleLeaveGiftDown(e)} onMouseEnter={e => this.handleEnterGiftDown(e, item, tempIndex)} key={tempIndex} className={item.giftId === giftId ? "gift-content select" : "gift-content"}>
                                                                    <img className="img" src={initImgProtocal(isHttps, item.iconUrl || '')} alt="" />
                                                                    <img className="tag-l" src={item.giftTitleUrl || ''} alt="" />
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={e => this.handleMoveGuardGiftList(e, 'right')} className={arrowRightClass2}></div>
                                </div>
                                <div className={giftBoxClassUp} style={{ display: giftBoxStyleUp }}>
                                    <span className="arrow-up"></span>
                                    <span className="gift-img">
                                        <img src={iconUrlUp || ''} alt="" />
                                    </span>
                                    <span className="info">
                                        <div className="name txt-cut">{giftNameUp || ''}</div>
                                        <div className="price txt-cut">{giftPriceUp || ''}</div>
                                    </span>
                                </div>
                                <div className={giftBoxClassDown} style={{ display: giftBoxStyleDown }}>
                                    <span className="arrow-down"></span>
                                    <span className="gift-img">
                                        <img src={iconUrlDown || ''} alt="" />
                                    </span>
                                    <span className="info">
                                        <div className="name txt-cut">{giftNameDown || ''}</div>
                                        <div className="price txt-cut">{giftPriceDown || ''}</div>
                                    </span>
                                </div>
                                <div className="gift-form">
                                    <div>酷币:&nbsp;{kuCoin || 0}</div>
                                    <div onClick={this.handlePayTipShow}>
                                        <a href={!isPreEnv ? `/pay-start?channel=${channel}` : `/web/kuxiu/pay-start?channel=${channel}`} target="_blank" className="recharge">充值</a>
                                    </div>
                                    <div className="form">
                                        <span>数量</span>
                                        <button type='button' className="text" onClick={e => this.handleGiftNumberShow(e)}>{giftNumArray.length > 0 ? `${giftNumArray[giftNumIndex]} >` : ''}</button>
                                        <button type='button' className="btn" onClick={e => this.handleSendGift(e)}>赠送</button>
                                        <div onClick={e => this.handleSendGift(e)} className={circleWrapper} style={{ 'display': show ? 'block' : 'none' }}>
                                            <img className="combo" src='http://img.17kuxiu.com/web/live/kuxiu/img/gift-combo.png' alt='' />
                                            <Circle
                                                current={value}
                                                size={60}
                                                startPoint={0}
                                                radius={27}
                                                linecap="round"
                                                time={0.1}
                                                progressColor='#fff989'
                                                bottomColor='transparent'
                                                progressFillColor='rgba(0, 0, 0, 0)'
                                                bottomFillColor='rgba(0, 0, 0, 0)'
                                                gradientDirection="horizontal"
                                                showText={true}
                                                text={time}
                                                strokeWidth={4}
                                                textStyle={{ size: 14, color: "#fff", type: 3 }}
                                            />
                                        </div>
                                        <div className="continue-box" style={{ display: giftSelectShow ? 'block' : 'none' }}>
                                            <ul>
                                                {
                                                    giftNumArray.map((item, index) => {
                                                        const text = this.fetchGiftText(item)
                                                        if (text)
                                                            return <li className="num-item" onClick={e => this.handleSelectGiftNumber(e, index)} key={index}>{text}</li>;
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Drawer
                    open={drawerOpen}
                    onMaskClick={this.handleDrawerClose}
                    handler={false}
                    level={null}
                    placement='left'
                    width='375px'
                >
                    {
                        dataUser &&
                        <div className="focus type1">
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
                                        <span className="level fl">
                                            <img src={`${urlCdnLvUser}/user${dataUser.userLevel || 0}.png`} alt='' />
                                        </span>
                                        {
                                            dataUser.isAnchor === 1
                                                ?
                                                <span className="level fl">
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
                            <div className="btn-focus type1">
                                <button type='button' className="logout" onClick={e => this.logout(e)}>退出登录</button>
                                <button type="button" className="close type1" onClick={e => this.handleDrawerClose(e)}>收起</button>
                            </div>
                        </div>
                    }
                    <div className="tips-warning type1" style={{ 'display': (tipsShow && drawerOpen && tipsClass === 'tips-warning type3' ? 'block' : 'none') }}>
                        <p dangerouslySetInnerHTML={{ __html: tipsContent || '' }}></p>
                    </div>
                </Drawer>
                <Modal
                    isOpen={qqShow}
                    onRequestClose={this.handleQqHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-qq zoom-appear-delay'
                    overlayClassName="overlay"
                >
                    {iframe}
                </Modal>
                <Modal
                    isOpen={wechatShow}
                    onRequestClose={this.handleWechatHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-wechat zoom-appear-delay'
                    overlayClassName="overlay"
                >
                    {iframe}
                </Modal>
                <Modal
                    isOpen={guardResult}
                    onRequestClose={this.handleGuardResultHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-guard-result zoom-appear'
                    overlayClassName="overlay-1"
                >
                    <div className='title'>开通成功</div>
                    <div className='bottom-box'>
                        <button type='button' className='bottom' onClick={e => this.handleGuardResultHide(e)}>确定</button>
                    </div>
                </Modal>
                <Modal
                    isOpen={paymentTipShow}
                    onRequestClose={this.handlePaymentTipHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-payment-tip zoom-appear'
                    overlayClassName="overlay-1"
                >
                    <div className='title'>信息</div>
                    <div className="right-btn close" onClick={this.handlePaymentTipHide}></div>
                    <div className='content'>余额不足，是否去充值</div>
                    <div className='bottom-box'>
                        <a target="_blank" href={!isPreEnv ? `/pay-start?channel=${channel}` : `/web/kuxiu/pay-start?channel=${channel}`} className='bottom' onClick={this.handlePaymentTipHideSkip}>确定</a>
                    </div>
                </Modal>
                <Modal
                    isOpen={guardGuideShow}
                    onRequestClose={this.handleGuardGuideHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-guard-guide zoom-appear'
                    overlayClassName="overlay-1"
                >
                    <div className='title'><img src={alert} alt='' /></div>
                    <div className="right-btn close" onClick={this.handleGuardGuideHide}></div>
                    <div className='content type1'>{dataRoom.anchorNikeName || '主播'}&nbsp;@&nbsp;了你</div>
                    <div className='content type2'>主播邀请你加入真爱守护团<br />为Ta加油</div>
                    <div className='bottom-box'>
                        <button type='button' className='bottom' onClick={e => this.handleGuardShow(e)}>开通真爱守护</button>
                    </div>
                </Modal>
                <Modal
                    isOpen={targetShow}
                    onRequestClose={this.handleTargetUserHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-target zoom-appear'
                    overlayClassName="overlay"
                >
                    {
                        dataTarget
                        &&
                        <Fragment>
                            <div className='title'><img src={formatUserAvatar(dataTarget.avatarUrl)} onError={this.errorImgAvatar} /></div>
                            <div className="right-btn close" onClick={this.handleTargetUserHide}></div>
                            <div className='content'>{dataTarget.nickName || ''}</div>
                            <div className="level-box">
                                {
                                    dataTarget.manager && dataTarget.manager === 1
                                        ?
                                        <span className="level manager">
                                            <img src={managerImg} alt='' />
                                        </span>
                                        :
                                        null
                                }
                                {
                                    dataTarget.guardType && dataTarget.guardType > 0
                                        ?
                                        <span className={dataTarget.guardType > 2 ? "level guard-2" : "level guard-1"}>
                                            <img src={initGuardTypeImg(dataTarget.guardType)} alt='' />
                                        </span>
                                        :
                                        null
                                }
                                <span className="level sex">
                                    <img src={dataTarget.sex === 1 ? man : woman} alt='' />
                                </span>
                                <span className='level'>
                                    <img className="level-img" src={`${urlCdnLvUser}/user${dataTarget.userLevel || 0}.png`} alt='' />
                                </span>
                                {
                                    dataTarget.isAnchor === 1
                                        ?
                                        <span className='level'>
                                            <img className="level-img" src={`${urlCdnLvAnchor}/anchor${dataTarget.anchorLevel || 0}.png`} alt='' />
                                        </span>
                                        :
                                        null
                                }
                                {
                                    dataTarget.medal && dataTarget.medal > 0
                                        ?
                                        <span className='level'>
                                            <img className="level-img" src={initMedalImg(dataTarget.medal, medalList)} alt='' />
                                        </span>
                                        :
                                        null
                                }
                            </div>
                            <div className="id">酷秀号:&nbsp;{dataTarget.userId || ''}</div>
                            <div className='content type1'>{dataTarget.signName || ''}</div>
                            <div className="detail">
                                <span>
                                    <p>{dataTarget.attentionCount || 0}</p>
                                    <p>关注</p>
                                </span>
                                <span>
                                    <p>{dataTarget.fansCount || 0}</p>
                                    <p>粉丝</p>
                                </span>
                                <span>
                                    <p>{convertToTenThousand2(dataTarget.starLight) || 0}</p>
                                    <p>星光</p>
                                </span>
                                <span>
                                    <p>{convertToTenThousand2(dataTarget.donation) || 0}</p>
                                    <p>送礼</p>
                                </span>
                            </div>
                            <div className="bottom-box">
                                {focusBtn}
                                <button className="btn" type='button' onClick={e => this.handleChangeAtMsg(e, dataTarget.nickName, dataTarget.userId)}>@Ta</button>
                            </div>
                        </Fragment>
                    }
                </Modal>
                <Modal
                    isOpen={guardRuleShow}
                    onRequestClose={this.handleGuardRuleHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-guard-rule zoom-appear-delay'
                    overlayClassName="overlay"
                >
                    {
                        <iframe title='守护规则' scrolling="yes" name="_blank" id="_blank" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={isPreEnv ? '//pre.17kuxiu.com/uc/m/xieyi/guard-rule.html' : '//www.17kuxiu.com/h5/xieyi/guard-rule.html'} style={{ width: '100%', height: "100%" }}></iframe>
                    }
                </Modal>
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
                    isOpen={guardEffectShow}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className={guardEffectClass}
                    overlayClassName="overlay-1"
                >
                    <div className='content'><img src={guard_effect} alt='' /></div>
                    <div className='avatar'><img src={guardEffectAvatar} alt='' /></div>
                    <div className='nickname-box'><span className='nickname txt-cut'>{guardEffectUserName}</span></div>
                    <div className='guardname-box'><span className='guardname'>{guardEffectName}</span></div>
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
                <Modal
                    isOpen={firefoxTipShow}
                    onRequestClose={this.handleFirefoxTipHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-firefox zoom-appear'
                    overlayClassName="overlay"
                >
                    <FirefoxTip onCloseModal={this.handleFirefoxTipHide} installFlash={installFlash} />
                </Modal>
                <div className={tipsClass} style={{ 'display': (tipsShow && !drawerOpen && tipsClass === 'tips-warning type3' ? 'block' : 'none') }}>
                    <p dangerouslySetInnerHTML={{ __html: tipsContent || '' }}></p>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ login, asset, attention, gift, guard, live, mobile, room, user }) => ({ login, asset, attention, gift, guard, live, mobile, room, user })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGiftList: bindActionCreators(fetchGiftList, dispatch),
        guestFetchGiftList: bindActionCreators(guestFetchGiftList, dispatch),
        fetchSpecialGiftList: bindActionCreators(fetchSpecialGiftList, dispatch),
        guestFetchSpecialGiftList: bindActionCreators(guestFetchSpecialGiftList, dispatch),
        sendGift: bindActionCreators(sendGift, dispatch),
        fetchUserInfo: bindActionCreators(fetchUserInfo, dispatch),
        fetchTargetUserInfo: bindActionCreators(fetchTargetUserInfo, dispatch),
        fetchSensitiveWords: bindActionCreators(fetchSensitiveWords, dispatch),
        guestFetchTargetUserInfo: bindActionCreators(guestFetchTargetUserInfo, dispatch),
        sendBarrage: bindActionCreators(sendBarrage, dispatch),
        enterRoom: bindActionCreators(enterRoom, dispatch),
        enterRoomNew: bindActionCreators(enterRoomNew, dispatch),
        guestEnterRoom: bindActionCreators(guestEnterRoom, dispatch),
        exitRoom: bindActionCreators(exitRoom, dispatch),
        fetchImSig: bindActionCreators(fetchImSig, dispatch),
        guestFetchImSig: bindActionCreators(guestFetchImSig, dispatch),
        fetchAudienceList: bindActionCreators(fetchAudienceList, dispatch),
        guestFetchAudienceList: bindActionCreators(guestFetchAudienceList, dispatch),
        fetchManagerList: bindActionCreators(fetchManagerList, dispatch),
        guestFetchManagerList: bindActionCreators(guestFetchManagerList, dispatch),
        fetchGuardList: bindActionCreators(fetchGuardList, dispatch),
        guestFetchGuardList: bindActionCreators(guestFetchGuardList, dispatch),
        fetchAsset: bindActionCreators(fetchAsset, dispatch),
        fetchRoomUserStatus: bindActionCreators(fetchRoomUserStatus, dispatch),
        guestFetchRoomUserStatus: bindActionCreators(guestFetchRoomUserStatus, dispatch),
        querySystemConfig: bindActionCreators(querySystemConfig, dispatch),
        guestQuerySystemConfig: bindActionCreators(guestQuerySystemConfig, dispatch),
        sendVerificationCode: bindActionCreators(sendVerificationCode, dispatch),
        bindMobile: bindActionCreators(bindMobile, dispatch),
        buyGuard: bindActionCreators(buyGuard, dispatch),
        loginByToken: bindActionCreators(loginByToken, dispatch),
        fetchRandomLiveList: bindActionCreators(fetchRandomLiveList, dispatch),
        guestFetchRandomLiveList: bindActionCreators(guestFetchRandomLiveList, dispatch),
        updateUserAvatar: bindActionCreators(updateUserAvatar, dispatch),
        userReport: bindActionCreators(userReport, dispatch),
        login: bindActionCreators(login, dispatch),
        register: bindActionCreators(register, dispatch),
        checkMobile: bindActionCreators(checkMobile, dispatch),
        resetPassword: bindActionCreators(resetPassword, dispatch),
        fetchQqOpenId: bindActionCreators(fetchQqOpenId, dispatch),
        fetchWechatOpenId: bindActionCreators(fetchWechatOpenId, dispatch),
        loginByThird: bindActionCreators(loginByThird, dispatch),
        addAttention: bindActionCreators(addAttention, dispatch),
        cancelAttention: bindActionCreators(cancelAttention, dispatch),
        fetchLiveUrl: bindActionCreators(fetchLiveUrl, dispatch),
        guestFetchLiveUrl: bindActionCreators(guestFetchLiveUrl, dispatch),
        fetchItemConfigList: bindActionCreators(fetchItemConfigList, dispatch),
        fetchImageSign: bindActionCreators(fetchImageSign, dispatch),
        guestFetchItemConfigList: bindActionCreators(guestFetchItemConfigList, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Live)