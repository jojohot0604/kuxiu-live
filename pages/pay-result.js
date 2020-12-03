/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUserNickName } from '../src/redux/actions/user'
import { fetchPaymentOrder } from '../src/redux/actions/asset'
import Footer from '../src/components/Footer'
import '../src/styles/header.scss'
import '../src/styles/pay-result.scss'
import baseUrl from '../src/utils/const'
import { formatAmount, fetchUrlParams, asyncLoadScripts, fetchBrowserVersion } from '../src/utils'

const urlCdnLive = baseUrl.cdnLive
const success_result = `${urlCdnLive}/success-result.png`
const fail_result = `${urlCdnLive}/fail-result.png`
const process_result = `${urlCdnLive}/process-result.png`
// const errMsg = '网络异常，请稍后再试'
let isPreEnv = false
let imgUrl;
let payWay = '';
let payText
let payTextOther
let btnText
let channel = 'web'
let host
// let browser

class PayResult extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    state = {
        tipsShow: false,
        tipsContent: '',
        amount: 0,
        kuCoin: 0,
        mainOpacity: 0,
        result: '',
        payType: '',
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

    skipToPayStart = (e) => {
        e && e.preventDefault()
        this.emptySessionStorage()
        window.location.href = !isPreEnv ? `/pay-start?channel=${channel}` : `/web/kuxiu/pay-start?channel=${channel}`
    }

    emptySessionStorage = () => {
        window.sessionStorage.removeItem('kx_pay_amt')
        window.sessionStorage.removeItem('kx_pay_result')
        window.sessionStorage.removeItem('kx_pay_way')
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

    fetchPaymentOrder = (order) => {
        const { fetchPaymentOrder } = this.props
        fetchPaymentOrder({
            orderId: order
        }).then(resp => {
            if (resp) {
                if (resp.fpo_succ) {
                    if (resp.fpo_data.payStatus === 'success') {
                        this.setState({
                            result: 'success'
                        })
                    } else {
                        this.setState({
                            result: 'fail'
                        })
                    }
                } else if (resp.fpo_msg) {
                    // this.handleErrMsg(resp.fpo_msg)
                } else {
                    // this.handleErrMsg(errMsg)
                }
            }
        })
    }

    componentDidMount() {
        host = window.location.host
        isPreEnv = window.location.host.indexOf('pre') !== -1 || window.location.host.indexOf('dev') !== -1
        const protocol = window.location.protocol
        const browser = fetchBrowserVersion()
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
        }, 100);
        // const version = fetchBrowserVersion()
        // if (version >= 6 && version <= 11) {
        //     browser = 'ie'
        // } else if (version !== -1) {
        //     browser = version
        // }
        // if (browser !== 'ie' && document.referrer.indexOf('pay-process') === -1 && document.referrer.indexOf('pay-result') === -1 && document.referrer.indexOf('pay-start') === -1 ) {
        //     this.skipToPayStart(null)
        //     return;
        // }
        // preloadImages([
        //     success_result,
        //     fail_result,
        //     process_result,
        // ])
        const amount = window.sessionStorage.getItem('kx_pay_amt') || 0
        const result = window.sessionStorage.getItem('kx_pay_result') || ''
        const payType = window.sessionStorage.getItem('kx_pay_way') || ''
        const orderNo = window.sessionStorage.getItem('kx_pay_order') || ''
        if (!amount || !result || !payType) {
            this.skipToPayStart(null)
            return
        }
        if (result === 'unknown' && !orderNo) {
            this.skipToPayStart(null)
            return
        }
        if (result === 'unknown') {
            this.fetchPaymentOrder(orderNo)
            this.setState({
                amount,
                kuCoin: formatAmount(amount * 100),
                payType,
            })
        } else {
            this.setState({
                amount,
                result,
                kuCoin: formatAmount(amount * 100),
                payType,
            })
        }
        switch (payType) {
            case 'alipay':
                _hmt.push(['_trackEvent', 'PC支付结果', '支付宝', amount.toString()]);
                break;
            case 'wechat':
                _hmt.push(['_trackEvent', 'PC支付结果', '微信支付', amount.toString()]);
                break;
            case 'unionpay':
                _hmt.push(['_trackEvent', 'PC支付结果', '网银支付', amount.toString()]);
                break;
            default:
                break;
        }
        let statistics = statisticsUrlArray && statisticsUrlArray.find(item => item.url === host);
        if (!statistics) {
            statistics = statisticsUrlArray && statisticsUrlArray[0]
        }
        if (statistics) {
            asyncLoadScripts([statistics.baiduHm, statistics.zhanzhangCore, statistics.zhanzhangStat])
        }
        // const { router } = this.props
        // router.prefetch('/')
        // router.prefetch('/pay-start')
    }

    render() {
        const { payType, mainOpacity, result, tipsShow, tipsContent, amount, kuCoin } = this.state;
        switch (payType) {
            case 'alipay':
                payWay = '支付宝'
                break;
            case 'wechat':
                payWay = '微信支付'
                break;
            case 'unionpay':
                payWay = '网银支付'
                break;
            default:
                break;
        }
        switch (result) {
            case 'success':
                imgUrl = success_result
                payText = '付款成功'
                btnText = '继续充值'
                break;
            case 'fail':
                imgUrl = fail_result
                payText = '付款失败'
                btnText = '返回支付充值'
                break;
            case 'process':
                imgUrl = process_result
                payText = '订单系统收款会略有延迟，'
                payTextOther = '支付成功后可点击支付成功查看结果。'
                btnText = '支付成功'
                break;
            default:
                break;
        }
        return (
            <span style={{ backgroundColor: '#f5f5f5', width: '100%', height: '100vh', display: 'block' }}>
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
                <div className="pay-result" style={{ opacity: mainOpacity }}>
                    <div className="content-title cf">
                        <div className="pay-amount">支付金额：<span>{amount || 0}</span>&nbsp;元</div>
                        <div className="commodity-name">商品名称：{kuCoin || 0}&nbsp;酷币</div>
                        <div className="transaction-type">交易类型：充值</div>
                    </div>
                    <div className="change-pay-content">
                        <div className="pay-img-box">
                            <img src={imgUrl} alt='' />
                        </div>
                        <div className="pay-info">
                            {payText}<br />{payTextOther}
                        </div>
                        <div className="pay-type">支付方式：{payWay}</div>
                        <div className="pay-btn-box">
                            {
                                result === 'process'
                                    ?
                                    <a className="pay-btn problem" onClick={e => this.skipToPayStart(e)} href='javascript:;'>支付遇到问题</a>
                                    :
                                    null
                            }
                            <a className="pay-btn" onClick={e => this.skipToPayStart(e)} href='javascript:;'>{btnText}</a>
                        </div>
                        <div className="wechat-bottom">
                            如果充值遇到问题，请联系客服电话：<em>021-68883887</em>
                        </div>
                    </div>
                </div>
                <Footer type='type3' display={mainOpacity === 1 ? 'block' : 'none'} host={host} />
                <div className="tips-warning" style={{ 'display': (tipsShow ? 'block' : 'none') }}>
                    <p>{tipsContent}</p>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PayResult)