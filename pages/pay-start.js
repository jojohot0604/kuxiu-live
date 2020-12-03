/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { fetchUserNickName } from '../src/redux/actions/user'
import { payment, fetchPaymentOrder } from '../src/redux/actions/asset'
import Modal from '../src/components/Modal'
import Footer from '../src/components/Footer'
import BrowserTip from '../src/components/BrowserTip'
import '../src/styles/pay-start.scss'
import '../src/styles/header.scss'
import baseUrl from '../src/utils/const'
import { isUserId, isEmpty, formatAmount, fetchBrowserVersion, fetchUrlParams, asyncLoadScripts, formatUserAvatar } from '../src/utils'

const urlCdnLive = baseUrl.cdnLive
const icon_click = `${urlCdnLive}/click.png`
const alipay = `${urlCdnLive}/alipay.png`
const wechat = `${urlCdnLive}/wechat-square.png`
const unipay = `${urlCdnLive}/unipay.png`
const amountbig = `${urlCdnLive}/amount-big.png`
const success = `${urlCdnLive}/success.png`
const fail = `${urlCdnLive}/fail.png`
const errMsg = '网络异常，请稍后再试'
let payUserId
let isPreEnv = false
let type;
let orderNo = ''
let url
let channel = 'web'
let host

class PayStart extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.timerQuery = null
    }

    state = {
        tipsShow: false,
        tipsContent: '',
        isLogin: false,
        userId: '',
        nickName: '',
        avatarUrl: '',
        payUserIdArray: [],
        isFocus: false,
        zIndex: 0,
        selectIndex: 0,
        selectPayIndex: 0,
        amount: 10,
        amountVisible: false,
        payConfirmShow: false,
        mainOpacity: 0,
        unipayShow: false,
        href: 'javascript:;',
        browserTipShow: false,
        isSougouIE: false
    }

    handleErrMsg = (text) => {
        const { tipsShow } = this.state
        if (!tipsShow && text) {
            if (text === 'accessToken验证失败') {
                text = '飞到外太空啦，请重新登录！'
            }
            this.setState({
                tipsShow: true,
                tipsContent: text,
            }, () => {
                setTimeout(() => {
                    this.setState({
                        tipsShow: false,
                        tipsContent: '',
                    })
                }, 2100)
            })
        }
    }

    handleSavePayUserId = () => {
        const { userId } = this.state
        if (!payUserId) {
            window.localStorage.setItem('kx_live_pay_userId', `${userId}`)
            payUserId = `${userId}`
        } else if (payUserId.indexOf(userId) === -1) {
            window.localStorage.setItem('kx_live_pay_userId', `${payUserId},${userId}`)
            payUserId = `${payUserId},${userId}`
        }
        const userIdArray = payUserId.split(',')
        this.setState({
            payUserIdArray: userIdArray
        })
    }

    handlePayConfirmHide = (e) => {
        e && e.preventDefault()
        this.setState({
            payConfirmShow: false
        })
        const { selectPayIndex } = this.state
        if (selectPayIndex === 2) {
            url = ''
            orderNo = ''
            setState({
                href: 'javascript:;'
            })
        }
    }

    handleBrowserTipShow = () => {
        this.setState({
            browserTipShow: true
        })
    }

    handleBrowserTipHide = () => {
        this.setState({
            browserTipShow: false
        })
    }

    handlePayConfirmShow = (e) => {
        e && e.preventDefault()
        const { amount, isLogin, userId, selectPayIndex, isSougouIE } = this.state
        if (isSougouIE && selectPayIndex === 2) {
            this.handleErrMsg(`搜狗浏览器兼容模式不支持网银支付, <br/>请切换到高速模式再试`)
            return
        }
        if (!isLogin) {
            if (userId) {
                this.handleErrMsg('请先确认输入的账号ID')
                return
            } else {
                this.handleErrMsg('请输入用户ID')
                return
            }
        }
        if (isEmpty(amount.toString()) || _.parseInt(amount) <= 0) {
            this.handleErrMsg('请输入充值金额')
            return
        }
        this.setState({
            payConfirmShow: true
        }, () => {
            if (selectPayIndex === 2) {
                this.paymentForUnipay()
            }
        })
    }

    fetchPaymentOrder = (order) => {
        const { fetchPaymentOrder } = this.props
        fetchPaymentOrder({
            orderId: order
        }).then(resp => {
            if (resp) {
                if (resp.fpo_succ) {
                    if (resp.fpo_data.payStatus === 'success') {
                        clearInterval(this.timerQuery)
                        this.timerQuery = null
                        this.skipToPayResult(e, 'success')
                    }
                } else if (resp.fpo_msg) {
                    // this.handleErrMsg(resp.fpo_msg)
                } else {
                    // this.handleErrMsg(errMsg)
                }
            }
        })
    }

    skipToPayResult = (e, result) => {
        e && e.preventDefault()
        const { amount } = this.state
        window.sessionStorage.setItem('kx_pay_amt', amount)
        window.sessionStorage.setItem('kx_pay_result', result)
        window.sessionStorage.setItem('kx_pay_way', type)
        window.sessionStorage.setItem('kx_pay_order', orderNo)
        window.location.href = !isPreEnv ? `/pay-result?channel=${channel}` : `/web/kuxiu/pay-result?channel=${channel}`
    }

    skipToPayStart = (e) => {
        e && e.preventDefault()
        window.location.href = !isPreEnv ? `/pay-start?channel=${channel}` : `/web/kuxiu/pay-start?channel=${channel}`
    }

    paymentForUnipay = () => {
        const { payment } = this.props
        const { amount, userId } = this.state
        const formData = new FormData();
        formData.append("amount", amount);
        const type = 'unionpay'
        payment(userId, type, formData).then(resp => {
            if (resp) {
                if (resp.p_succ) {
                    const isSucc = resp.p_data.jumpUrl && resp.p_data.kuxiuOrderId
                    if (!isSucc) {
                        this.handleErrMsg('支付地址已失效，请重新操作')
                        return
                    }
                    url = resp.p_data.jumpUrl
                    orderNo = resp.p_data.kuxiuOrderId
                    _hmt.push(['_trackEvent', 'PC支付订单', '网银支付', amount.toString()]);
                    this.setState({
                        href: url
                    })
                } else if (resp.p_msg) {
                    this.handleErrMsg(resp.p_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    payment = () => {
        const { payment } = this.props
        const { amount, userId, selectPayIndex } = this.state
        const formData = new FormData();
        formData.append("amount", amount);
        let type;
        switch (selectPayIndex) {
            case 0:
                type = 'alipay'
                break;
            case 1:
                type = 'wechat'
                break;
            case 2:
                type = 'unionpay'
                break;
            default:
                type = ''
        }
        if (type === 'unionpay') {
            setTimeout(() => {
                this.fetchPaymentOrder(orderNo)
                this.timerQuery = setInterval(() => {
                    this.fetchPaymentOrder(orderNo)
                }, 5000);
            }, 5000);
            this.setState({
                unipayShow: true,
                payConfirmShow: false,
            })
        } else if (type === 'alipay' || type === 'wechat') {
            payment(userId, type, formData).then(resp => {
                if (resp) {
                    if (resp.p_succ) {
                        let isSucc;
                        switch (type) {
                            case 'alipay':
                                isSucc = resp.p_data.jumpUrl && resp.p_data.kuxiuOrderId
                                break;
                            case 'wechat':
                                isSucc = resp.p_data.code_url && resp.p_data.kuxiuOrderId
                                break;
                            default:
                        }
                        if (!isSucc) {
                            this.handleErrMsg('支付地址已失效，请重新操作')
                            return
                        }
                        switch (type) {
                            case 'alipay':
                                url = resp.p_data.jumpUrl
                                orderNo = resp.p_data.kuxiuOrderId
                                _hmt.push(['_trackEvent', 'PC支付订单', '支付宝', amount.toString()]);
                                break;
                            case 'wechat':
                                url = resp.p_data.code_url
                                orderNo = resp.p_data.kuxiuOrderId
                                _hmt.push(['_trackEvent', 'PC支付订单', '微信支付', amount.toString()]);
                                break;
                            default:
                        }
                        if (type !== 'unionpay') {
                            window.sessionStorage.setItem('kx_pay_way', type)
                            window.sessionStorage.setItem('kx_pay_url', url)
                            window.sessionStorage.setItem('kx_pay_order', orderNo)
                            window.sessionStorage.setItem('kx_pay_uid', userId)
                            window.sessionStorage.setItem('kx_pay_amt', amount)
                        }
                        window.location.href = !isPreEnv ? `/pay-process?channel=${channel}` : `/web/kuxiu/pay-process?channel=${channel}`
                    } else if (resp.p_msg) {
                        this.handleErrMsg(resp.p_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                }
            })
        }
    }

    fetchUserNickName = (e, showMsg = true) => {
        e && e.preventDefault();
        const { fetchUserNickName } = this.props
        const { userId } = this.state
        if (showMsg && isEmpty(userId)) {
            this.handleErrMsg('请输入用户ID')
            return
        }
        if (showMsg && !isUserId(userId)) {
            this.handleErrMsg('请输入正确的用户ID')
            return
        }
        // if (payUserIdArray.length >= 10) {
        //     this.handleErrMsg('充值账号最多可以保存10个，请删除一些账号')
        //     return
        // }
        const formData = new FormData();
        formData.append("targetUserId", userId);
        fetchUserNickName(formData).then(resp => {
            if (resp) {
                if (resp.funn_succ) {
                    this.setState({
                        isLogin: true,
                        nickName: resp.funn_data.nickName || '',
                        avatarUrl: resp.funn_data.avatarUrl || '',
                    })
                    this.handleSavePayUserId()
                } else if (showMsg && resp.funn_msg) {
                    this.handleErrMsg(resp.funn_msg)
                } else if (showMsg) {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    handleInputOnFocus = () => {
        this.setState({
            isFocus: true,
            zIndex: 99
        });
    }

    handleInputOnBlur = () => {
        this.setState({
            isFocus: false,
            zIndex: 0
        });
    }

    componentWillUnmount() {
        this.timerQuery && clearInterval(this.timerQuery);
    }

    transferUserId = (e) => {
        e && e.preventDefault()
        this.setState({
            isLogin: false,
            userId: '',
            nickName: '',
            avatarUrl: '',
        })
    }

    handleSelectPayWay = (e, index) => {
        e && e.preventDefault()
        const { selectPayIndex } = this.state
        if (selectPayIndex === index) {
            return;
        }
        this.setState({
            selectPayIndex: index,
        })
    }

    handleSelectAmount = (e, index, amount) => {
        e && e.preventDefault()
        const { selectIndex } = this.state
        if (selectIndex === index) {
            return;
        }
        this.setState({
            selectIndex: index,
            amount,
        })
        if (index === 5) {
            this.setState({
                amountVisible: true
            })
        } else {
            this.setState({
                amountVisible: false
            })
        }
    }

    componentDidMount() {
        host = window.location.host
        const version = fetchBrowserVersion()
        isPreEnv = window.location.host.indexOf('pre') !== -1 || window.location.host.indexOf('dev') !== -1
        const protocol = window.location.protocol
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
        setTimeout(() => {
            this.setState({
                mainOpacity: 1
            })
        }, 100);
        // if (version >= 6 && version <= 9) {
        //     this.handleBrowserTipShow()
        //     window.location.href=`http://support.dmeng.net/upgrade-your-browser.html?referrer=${encodeURIComponent(window.location.href)}`;
        //     return
        // }
        if (version >= 6 && version <= 11 && navigator.userAgent.indexOf("SE 2.X MetaSr 1.0") > -1) {
            this.setState({
                isSougouIE: true
            })
        }
        const userId = window.localStorage.getItem('kx_live_userId') || ''
        this.setState({
            userId
        }, () => {
            this.fetchUserNickName(null, false)
        })
        this.initPayUserId()
        let statistics = statisticsUrlArray && statisticsUrlArray.find(item => item.url === host);
        if (!statistics) {
            statistics = statisticsUrlArray && statisticsUrlArray[0]
        }
        if (statistics) {
            asyncLoadScripts([statistics.baiduHm, statistics.zhanzhangCore, statistics.zhanzhangStat])
        }
        // preloadImages([
        //     `${urlCdnLive}/arrow-down.png`,
        //     `${urlCdnLive}/delete.png`,
        //     `${urlCdnLive}/item-select.png`,
        //     `${urlCdnLive}/arrow-up.png`,
        //     icon_click,
        //     alipay,
        //     wechat,
        //     unipay,
        //     amountbig,
        //     success,
        //     fail
        // ])
        // const { router } = this.props
        // router.prefetch('/')
        // router.prefetch('/pay-process')
    }

    handleChangeUserId = (e, value = null) => {
        e && e.preventDefault()
        if (value) {
            this.setState({
                userId: value.replace(/\D/g, '')
            })
        } else {
            this.setState({
                userId: e.target.value.replace(/\D/g, '')
            })
        }
    }

    handleUnipayConfirmHide = (e) => {
        e && e.preventDefault()
        this.setState({
            unipayShow: false
        })
    }

    handleChangeAmount = (e) => {
        e && e.preventDefault()
        let value = e.target.value;
        if ((/^\d{0,5}$/).test(value)) {
            if (value > 10000) {
                value = 10000
            }
            this.setState({
                amount: value
            })
        }
    }

    handleDeleteUserId = (e, value) => {
        // e.preventDefault()
        e.cancelBubble = true;
        e.stopPropagation();
        const { payUserIdArray } = this.state
        if (payUserIdArray.length > 1) {
            payUserId = payUserId.indexOf(`${value},`) !== -1 ? payUserId.replace(`${value},`, '') : payUserId.replace(`,${value}`, '')
            const userIdArray = payUserId.split(',')
            this.setState({
                payUserIdArray: userIdArray
            })
            window.localStorage.setItem('kx_live_pay_userId', payUserId)
        } else {
            payUserId = payUserId.replace(`${value}`, '')
            this.setState({
                payUserIdArray: []
            })
            window.localStorage.removeItem('kx_live_pay_userId')
        }
    }

    initPayUserId = () => {
        payUserId = window.localStorage.getItem('kx_live_pay_userId')
        if (payUserId !== null) {
            const payUserIdArray = payUserId.split(',')
            this.setState({
                payUserIdArray
            })
        }
    }

    render() {
        const { href, isLogin, unipayShow, selectPayIndex, browserTipShow, mainOpacity, payConfirmShow, amountVisible, tipsShow, tipsContent, userId, nickName, avatarUrl, isFocus, zIndex, payUserIdArray, selectIndex, amount } = this.state
        const kuCoin = formatAmount(_.parseInt(amount) * 100)
        let payWay;
        switch (selectPayIndex) {
            case 0:
                payWay = '支付宝'
                break;
            case 1:
                payWay = '微信支付'
                break;
            case 2:
                payWay = '网银支付'
                break;
            default:
                break;
        }
        return (
            <Fragment>
                <div className="header">
                    <div className="nav">
                        <div className="logo fl">
                            <a className="db height100" href={!isPreEnv ? `/?channel=${channel}` : `/web/kuxiu?channel=${channel}`}></a>
                        </div>
                        <div className="fl clearfix pr">
                            <div className="nav-btn pay fl tr pr">
                                <span className="btn">
                                    <a className="pay" href={!isPreEnv ? `/pay-start?channel=${channel}` : `/web/kuxiu/pay-start?channel=${channel}`}>收银台</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pay-start" style={{ opacity: mainOpacity }}>
                    <div className="section-content">
                        <div className="people-info cf">
                            <ul className="pay-list cf">
                                <li>
                                    <div className="pay-list-name">酷币充值</div>
                                </li>
                            </ul>
                        </div>
                        <div className="top-up-content cf">
                            <div>
                                <div className="change-account-bt">充值账号</div>
                                {
                                    isLogin
                                        ?
                                        <div className="change-account-box cf">
                                            <div className="fl cf">
                                                <div className="account-box-head fl">
                                                    <img src={formatUserAvatar(avatarUrl)} alt='' />
                                                </div>
                                                <div className="account-box-info fl">
                                                    <p className="account-box-name fl txt-cut">{nickName || ''}</p>
                                                    <p className="fl">（ID：<span>{userId || ''}</span>）</p>
                                                </div>
                                            </div>
                                            <div className="account-box-r" onClick={e => this.transferUserId(e)}>切换账号</div>
                                        </div>
                                        :
                                        <div className="change-account-box cf">
                                            <input value={userId} onChange={e => this.handleChangeUserId(e)} type="text" onFocus={this.handleInputOnFocus} onBlur={this.handleInputOnBlur} className={isFocus ? "account-box-t up pr" : "account-box-t down pr"} placeholder="请输入酷秀直播ID" />
                                            <ul className="cache pa" style={{ opacity: isFocus ? 1 : 0, zIndex }}>
                                                {
                                                    payUserIdArray.length === 0
                                                        ?
                                                        <li className="item">没有充值记录</li>
                                                        :
                                                        payUserIdArray.map((value, index) => {
                                                            return (
                                                                <li className="item" key={index} onClick={e => this.handleChangeUserId(e, value)}>{value}
                                                                    <div className="delete" onClick={e => this.handleDeleteUserId(e, value)}></div>
                                                                </li>
                                                            )
                                                        })
                                                }
                                            </ul>
                                            <div className="account-box-r" onClick={e => this.fetchUserNickName(e)}>
                                                确认账号
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="top-up-num-name tl">充值数量</div>
                            <ul className="top-up-num-list cf">
                                <li onClick={e => this.handleSelectAmount(e, 0, 10)}>
                                    <div className={selectIndex === 0 ? "top-up-num-list-div select" : "top-up-num-list-div"}>
                                        <div className="list-money">1,000酷币</div>
                                        <div className="list-money-det">¥10</div>
                                    </div>
                                    <img src={icon_click} className="click-icon" alt='' style={{ display: selectIndex === 0 ? 'block' : 'none' }}></img>
                                </li>
                                <li onClick={e => this.handleSelectAmount(e, 1, 100)}>
                                    <div className={selectIndex === 1 ? "top-up-num-list-div select" : "top-up-num-list-div"}>
                                        <div className="list-money">10,000酷币</div>
                                        <div className="list-money-det">¥100</div>
                                    </div>
                                    <img src={icon_click} className="click-icon" alt='' style={{ display: selectIndex === 1 ? 'block' : 'none' }}></img>
                                </li>
                                <li onClick={e => this.handleSelectAmount(e, 2, 500)}>
                                    <div className={selectIndex === 2 ? "top-up-num-list-div select" : "top-up-num-list-div"}>
                                        <div className="list-money">50,000酷币</div>
                                        <div className="list-money-det">¥500</div>
                                    </div>
                                    <img src={icon_click} className="click-icon" alt='' style={{ display: selectIndex === 2 ? 'block' : 'none' }}></img>
                                </li>
                                <li onClick={e => this.handleSelectAmount(e, 3, 1000)}>
                                    <div className={selectIndex === 3 ? "top-up-num-list-div select" : "top-up-num-list-div"}>
                                        <div className="list-money">100,000酷币</div>
                                        <div className="list-money-det">¥1000</div>
                                    </div>
                                    <img src={icon_click} className="click-icon" alt='' style={{ display: selectIndex === 3 ? 'block' : 'none' }}></img>
                                </li>
                                <li onClick={e => this.handleSelectAmount(e, 4, 3000)}>
                                    <div className={selectIndex === 4 ? "top-up-num-list-div select" : "top-up-num-list-div"}>
                                        <div className="list-money">300,000酷币</div>
                                        <div className="list-money-det">¥3000</div>
                                    </div>
                                    <img src={icon_click} className="click-icon" alt='' style={{ display: selectIndex === 4 ? 'block' : 'none' }}></img>
                                </li>
                                <li onClick={e => this.handleSelectAmount(e, 5, 1)}>
                                    <div className={selectIndex === 5 ? "top-up-num-list-div select" : "top-up-num-list-div"}>
                                        <div className="list-money">自定义</div>
                                        <div className="list-money type1">充值金额</div>
                                    </div>
                                    <img src={icon_click} className="click-icon" alt='' style={{ display: selectIndex === 5 ? 'block' : 'none' }}></img>
                                </li>
                            </ul>
                            <div className="money-input cf fl" style={{ display: amountVisible ? 'block' : 'none' }}>
                                <div className="money-input-text">充值金额：</div>
                                <div className="input-info">
                                    <input onChange={e => this.handleChangeAmount(e)} value={amount} type="text" placeholder="请输入整数" maxLength="5" />
                                    <span className="yuan">元</span>
                                </div>
                            </div>
                            <div className="amount-payable cf fl">
                                <div className="amount-payable-text">应付金额：</div>
                                <div className="amount-payable-money">
                                    <span>{amount || 0}</span><em>元</em>
                                </div>
                            </div>
                            <div className="amount-way cf fl">
                                <div className="amount-way-text">充值方式</div>
                                <ul className="amount-way-list cf">
                                    <li onClick={e => this.handleSelectPayWay(e, 0)}>
                                        <div className={selectPayIndex === 0 ? "amount-way-list-div select" : "amount-way-list-div"}>
                                            <span className="amount-way-logo">
                                                <img src={alipay} alt='' />
                                            </span>
                                            <span className="amount-way-det">支付宝</span>
                                        </div>
                                        <img src={icon_click} className="click-icon" alt='' style={{ display: selectPayIndex === 0 ? 'block' : 'none' }}></img>
                                    </li>
                                    <li onClick={e => this.handleSelectPayWay(e, 1)}>
                                        <div className={selectPayIndex === 1 ? "amount-way-list-div select" : "amount-way-list-div"}>
                                            <span className="amount-way-logo">
                                                <img src={wechat} alt='' />
                                            </span>
                                            <span className="amount-way-det">微信支付</span>
                                        </div>
                                        <img src={icon_click} className="click-icon" alt='' style={{ display: selectPayIndex === 1 ? 'block' : 'none' }}></img>
                                    </li>
                                    <li onClick={e => this.handleSelectPayWay(e, 2)}>
                                        <div className={selectPayIndex === 2 ? "amount-way-list-div select" : "amount-way-list-div"}>
                                            <img className='amount-big' src={amountbig} alt='' />
                                            <span className="amount-way-logo">
                                                <img src={unipay} alt='' />
                                            </span>
                                            <span className="amount-way-det">网银支付</span>
                                        </div>
                                        <img src={icon_click} className="click-icon" alt='' style={{ display: selectPayIndex === 2 ? 'block' : 'none' }}></img>
                                    </li>
                                </ul>
                            </div>
                            <div className="pay-outer fl">
                                <button className="pay-btn" type="button" onClick={e => this.handlePayConfirmShow(e)}>立即支付</button>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer type='type2' display={mainOpacity === 1 ? 'block' : 'none'} host={host} />
                <div className="tips-warning" style={{ 'display': (tipsShow ? 'block' : 'none') }}>
                    <p dangerouslySetInnerHTML={{ __html: tipsContent || '' }}></p>
                </div>
                <Modal
                    isOpen={payConfirmShow}
                    onRequestClose={this.handlePayConfirmHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-pay-confirm zoom-appear'
                    overlayClassName="overlay"
                >
                    <div className="title">确认订单</div>
                    <div className="right-btn close" onClick={e => this.handlePayConfirmHide(e)}></div>
                    <div className="content">
                        <div className="order-info">
                            <div className="order-info-head"><img src={formatUserAvatar(avatarUrl)} alt='' /></div>
                            <div className="order-info-name txt-cut">
                                <div className="item">{nickName || ''}</div>
                                <div className="item">{userId || ''}</div>
                            </div>
                        </div>
                        <p className="order-count">商品名称:<span className="money">{kuCoin || 0}</span><span className="fr">酷币</span></p>
                        <p className="order-money">付款金额:<span className="money">{amount || 0}</span><span className="fr">元</span></p>
                        <p className="order-money">付款方式:<span className="money">{payWay || ''}</span></p>
                        <p className="order-warn">请务必确认好充值ID和付款金额，防止充错~</p>
                    </div>
                    <div className="bottom-btn">
                        <button type="button" className="left" onClick={e => this.handlePayConfirmHide(e)}>取消</button>
                        {
                            selectPayIndex === 2
                                ?
                                <a className="right" href={href} onClick={this.payment}>确认</a>
                                :
                                <a className="right" href='javascript:;' onClick={this.payment}>确认</a>
                        }
                    </div>
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
                    isOpen={unipayShow}
                    onRequestClose={this.handleUnipayConfirmHide}
                    shouldFocusAfterRender={false}
                    shouldReturnFocusAfterClose={false}
                    ariaHideApp={false}
                    className='modal-unipay-confirm zoom-appear'
                    overlayClassName="overlay"
                >
                    <div className="title">登录到网上银行支付</div>
                    <div className="right-btn close" onClick={e => this.handleUnipayConfirmHide(e)}></div>
                    <div className="info">请您在新打开的网上银行页面进行支付，支付完成前请勿关闭窗口</div>
                    <ul className="cf">
                        <li>
                            <div className="tc">
                                <img src={success} alt='' />
                                <div className="text">付款成功</div>
                            </div>
                            <div className="return">
                                <div className="return-detail">您可以返回&nbsp;<a onClick={e => this.skipToPayResult(e, 'unknown')} href='javascript:;'>我的账户</a></div>
                                <div className="return-detail right">查看&nbsp;<a onClick={e => this.skipToPayResult(e, 'unknown')} href='javascript:;'>充值记录</a></div>
                            </div>
                        </li>
                        <li>
                            <div className="tc">
                                <img src={fail} alt='' />
                                <div className="text">付款失败</div>
                            </div>
                            <div className="return">
                                <div className="return-detail">您可以&nbsp;<a onClick={e => this.skipToPayStart(e)} href='javascript:;'>重新充值</a></div>
                            </div>
                        </li>
                    </ul>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ user, asset }) => ({ user, asset })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserNickName: bindActionCreators(fetchUserNickName, dispatch),
        fetchPaymentOrder: bindActionCreators(fetchPaymentOrder, dispatch),
        payment: bindActionCreators(payment, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayStart)