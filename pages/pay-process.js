/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import QRCode from 'qrcode.react'
import { fetchUserNickName } from '../src/redux/actions/user'
import { fetchPaymentOrder } from '../src/redux/actions/asset'
import Modal from '../src/components/Modal'
import Footer from '../src/components/Footer'
import '../src/styles/header.scss'
import '../src/styles/pay-process.scss'
import baseUrl from '../src/utils/const'
import { formatAmount, fetchBrowserVersion, fetchUrlParams, asyncLoadScripts, formatUserAvatar } from '../src/utils'

const urlCdnLive = baseUrl.cdnLive
const scan = `${urlCdnLive}/scan.png`
const alipay_small = `${urlCdnLive}/alipay-small.png`
const wechat = `${urlCdnLive}/wechat-pay.png`
const wechat_small = `${urlCdnLive}/wechat-small.png`
const amountbig = `${urlCdnLive}/amount-big.png`
const fail = `${urlCdnLive}/fail.png`
const success = `${urlCdnLive}/success.png`
// const errMsg = '网络异常，请稍后再试'
let isPreEnv = false
let order;
let channel = 'web'
let host

class PayProcess extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.timerQuery = null
    }

    state = {
        tipsShow: false,
        tipsContent: '',
        userId: '',
        nickName: '',
        avatarUrl: '',
        amount: 0,
        kuCoin: 0,
        mainOpacity: 0,
        payType: '',
        unipayShow: false,
        payUrl: '',
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

    emptySessionStorage = () => {
        window.sessionStorage.removeItem('kx_pay_uid')
        window.sessionStorage.removeItem('kx_pay_amt')
        window.sessionStorage.removeItem('kx_pay_way')
        window.sessionStorage.removeItem('kx_pay_order')
        window.sessionStorage.removeItem('kx_pay_url')
    }

    skipToPayResult = (e) => {
        e && e.preventDefault()
        const { amount, payType } = this.state
        window.sessionStorage.setItem('kx_pay_amt', amount)
        window.sessionStorage.setItem('kx_pay_result', 'success')
        window.sessionStorage.setItem('kx_pay_way', payType)
        window.sessionStorage.removeItem('kx_pay_uid')
        window.sessionStorage.removeItem('kx_pay_order')
        window.sessionStorage.removeItem('kx_pay_url')
        window.location.href = !isPreEnv ? `/pay-result?channel=${channel}` : `/web/kuxiu/pay-result?channel=${channel}`
    }

    fetchPaymentOrder = () => {
        const { fetchPaymentOrder } = this.props
        fetchPaymentOrder({
            orderId: order
        }).then(resp => {
            if (resp) {
                if (resp.fpo_succ) {
                    if (resp.fpo_data.payStatus === 'success') {
                        clearInterval(this.timerQuery)
                        this.timerQuery = null
                        this.skipToPayResult(null)
                    }
                } else if (resp.fpo_msg) {
                    // this.handleErrMsg(resp.fpo_msg)
                } else {
                    // this.handleErrMsg(errMsg)
                }
            }
        })
    }

    fetchUserNickName = () => {
        const { fetchUserNickName } = this.props
        const { userId } = this.state
        const formData = new FormData();
        formData.append("targetUserId", userId);
        fetchUserNickName(formData).then(resp => {
            if (resp) {
                if (resp.funn_succ) {
                    this.setState({
                        nickName: resp.funn_data.nickName || '',
                        avatarUrl: resp.funn_data.avatarUrl || '',
                    })
                } else if (resp.funn_msg) {
                    // this.handleErrMsg(resp.funn_msg)
                } else {
                    // this.handleErrMsg(errMsg)
                }
            }
        })
    }

    skipToPayStart = (e) => {
        e && e.preventDefault()
        this.emptySessionStorage()
        window.location.href = !isPreEnv ? `/pay-start?channel=${channel}` : `/web/kuxiu/pay-start?channel=${channel}`
    }

    skipToIndex = (e) => {
        e && e.preventDefault()
        this.emptySessionStorage()
        window.location.href = !isPreEnv ? `/?channel=${channel}` : `/web/kuxiu?channel=${channel}`
    }

    handleUnipayConfirmHide = (e) => {
        e && e.preventDefault()
        this.setState({
            unipayShow: false
        })
    }

    componentWillUnmount() {
        this.timerQuery && clearInterval(this.timerQuery);
    }

    componentDidMount() {
        host = window.location.host
        isPreEnv = window.location.host.indexOf('pre') !== -1 || window.location.host.indexOf('dev') !== -1
        const protocol = window.location.protocol
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
        setTimeout(() => {
            this.setState({
                mainOpacity: 1
            })
        }, 100);
        // if (version >= 6 && version <= 11) {
        //     browser = 'ie'
        // } else if (version !== -1) {
        //     browser = version
        // }
        // if (browser !== 'ie' && document.referrer.indexOf('pay-start') === -1 && document.referrer.indexOf('pay-process') === -1) {
        //     this.skipToPayStart(null)
        //     return;
        // }
        if (version >= 6 && version <= 11 && navigator.userAgent.indexOf("SE 2.X MetaSr 1.0") > -1) {
            this.setState({
                isSougouIE: true
            })
        }
        // preloadImages([
        //     scan,
        //     alipay_small,
        //     wechat_small,
        // ])
        const payUrl = window.sessionStorage.getItem('kx_pay_url') || ''
        const userId = window.sessionStorage.getItem('kx_pay_uid') || ''
        const amount = window.sessionStorage.getItem('kx_pay_amt') || 0
        const payType = window.sessionStorage.getItem('kx_pay_way') || ''
        order = window.sessionStorage.getItem('kx_pay_order') || ''
        if (!payUrl || !userId || !amount || !payType || !order) {
            this.handleErrMsg('支付链接已失效，请重新操作')
            setTimeout(() => {
                this.skipToPayStart(null)
            }, 2200)
            return
        }
        this.setState({
            userId
        }, () => {
            this.fetchUserNickName()
        })
        this.setState({
            payUrl,
            amount,
            kuCoin: formatAmount(amount * 100),
            payType,
        })
        // const { router } = this.props
        // router.prefetch('/')
        // router.prefetch('/pay-start')
        // router.prefetch('/pay-result')
        setTimeout(() => {
            this.fetchPaymentOrder()
            this.timerQuery = setInterval(() => {
                this.fetchPaymentOrder()
            }, 5000);
        }, 5000);
        document.body.style.backgroundColor = '#fff'
        let statistics = statisticsUrlArray && statisticsUrlArray.find(item => item.url === host);
        if (!statistics) {
            statistics = statisticsUrlArray && statisticsUrlArray[0]
        }
        if (statistics) {
            asyncLoadScripts([statistics.baiduHm, statistics.zhanzhangCore, statistics.zhanzhangStat])
        }
    }

    render() {
        const { isSougouIE, mainOpacity, payUrl, unipayShow, tipsShow, tipsContent, payType, userId, nickName, avatarUrl, amount, kuCoin } = this.state;
        let payTab = null;
        switch (payType) {
            case 'alipay':
                payTab = <div className="pay-list-name">支付宝</div>
                break;
            case 'wechat':
                payTab = <div className="pay-list-name">微信支付</div>
                break;
            case 'unionpay':
                payTab = <div className="pay-list-name">网银支付<img src={amountbig} alt='' /></div>
                break;
            default:
                break;
        }
        return (
            <span style={{ backgroundColor: '#fff', width: '100%', height: '100%', display: 'block' }}>
                <div className="header">
                    <div className="nav">
                        <div className="logo fl" onClick={e => this.skipToIndex(e)}>
                            <a className="db height100" href='javascript:;'></a>
                        </div>
                        <div className="fl clearfix pr">
                            <div className="nav-btn pay fl tr pr">
                                <span className="btn" onClick={e => this.skipToPayStart(e)}>
                                    <a className="pay" href='javascript:;'>收银台</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pay-process" style={{ opacity: mainOpacity }}>
                    <div className="content-title cf">
                        <div className="account-box cf">
                            <div className="account-box-head fl">
                                <img src={formatUserAvatar(avatarUrl)} alt='' />
                            </div>
                            <div className="account-box-info fl">
                                <p className="account-box-name fl txt-cut">{nickName || ''}</p>
                                <p className="fl">（ID：<span>{userId || ''}</span>）</p>
                            </div>
                        </div>
                        <div className="pay-amount">支付金额：<span>{amount || 0}</span>&nbsp;元</div>
                        <div className="commodity-name">商品名称：{kuCoin || 0}&nbsp;酷币</div>
                        <div className="transaction-type">交易类型：充值</div>
                        <div className="change-order" onClick={e => this.skipToPayStart(e)}>修改订单</div>
                    </div>
                    <div className="people-info">
                        <ul className="pay-list cf">
                            <li>
                                {payTab}
                            </li>
                        </ul>
                    </div>
                    <div className="change-pay-content">
                        <div className="pay-detail" style={{ display: payType === 'alipay' ? 'block' : 'none' }}>
                            <div className="pay-title fl">
                                <div className="qrcode-content">
                                    {
                                        isSougouIE
                                            ?
                                            <QRCode bgColor="#fff" fgColor="#000" level="L" includeMargin={false} renderAs="canvas" value={payUrl} size={168} />
                                            // <iframe title='支付宝支付' scrolling="no" name="_blank" id="_blank" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={payUrl} style={{ width: '168px', height: "168px" }}></iframe>
                                            :
                                            <iframe title='支付宝支付' scrolling="no" name="_blank" id="_blank" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={payUrl} style={{ width: '168px', height: "168px" }}></iframe>
                                    }
                                </div>
                                <div className="qrcode-desc">
                                    <img src={scan} className="scan" alt='' />
                                    <div className="pay-text">打开手机支付宝<br />扫码二维码付款</div>
                                </div>
                            </div>
                            <div className="pay-content-big">
                                <img src={alipay_small} alt='' />
                            </div>
                        </div>
                        <div className="pay-detail" style={{ display: payType === 'wechat' ? 'block' : 'none' }}>
                            <div className="pay-title fl">
                                <div className="qrcode-content">
                                    <QRCode bgColor="#fff" fgColor="#000" level="L" includeMargin={false} renderAs="canvas" value={payUrl} size={168} />
                                    <img src={wechat} className="logo" alt='' />
                                </div>
                                <div className="qrcode-desc">
                                    <img src={scan} className="scan" alt='' />
                                    <div className="pay-text">打开微信支付<br />扫码二维码付款</div>
                                </div>
                            </div>
                            <div className="pay-content-big">
                                <img src={wechat_small} alt='' />
                            </div>
                        </div>
                        <div className="pay-unipay" style={{ display: payType === 'unionpay' ? 'block' : 'none' }}>
                            <iframe title='银联支付' scrolling="yes" name="_blank" id="_blank" onLoad="this.className=''" allowTransparency="true" className="" frameBorder="0" src={payUrl} style={{ width: '100%', height: "920px" }}></iframe>
                        </div>
                        <div className="wechat-bottom">
                            如果充值遇到问题，请联系微信公众号在线客服：<em>酷秀直播（kuxiuzhibo）</em>
                        </div>
                    </div>
                </div>
                <Footer type='type3' display={mainOpacity === 1 ? 'block' : 'none'} host={host} />
                <div className="tips-warning" style={{ 'display': (tipsShow ? 'block' : 'none') }}>
                    <p>{tipsContent}</p>
                </div>
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
                                <div className="return-detail">您可以返回&nbsp;<a onClick={e => this.skipToPayResult(e)} href='javascript:;'>我的账户</a></div>
                                <div className="return-detail right">查看&nbsp;<a onClick={e => this.skipToPayResult(e)} href='javascript:;'>充值记录</a></div>
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
            </span>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserNickName: bindActionCreators(fetchUserNickName, dispatch),
        fetchPaymentOrder: bindActionCreators(fetchPaymentOrder, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayProcess)