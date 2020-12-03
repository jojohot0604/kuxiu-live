/* eslint-disable no-lonely-if */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUrlParams, customCookie } from '../src/utils'
import { fetchQqOpenId, fetchWechatOpenId, loginByThird } from '../src/redux/actions/login'

const errMsg = '网络异常，请稍后再试'
let openId
let avatarUrl
let isPreEnv = false
let host = 'www.17kuxiu.com'
let protocol = 'http:'
let channel = 'web'


class ThirdLogin extends Component {
    state = {
        tipsShow: false,
        tipsContent: '',
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

    loginByThird = (userLoginType, anchorId) => {
        const { loginByThird } = this.props
        loginByThird({
            openId,
            userLoginType,
            channel: 9,
            avatarUrl,
        }, channel).then(resp => {
            if (resp) {
                if (resp.lbt_succ) {
                    const token = resp.lbt_data.accessToken || ''
                    const userId = resp.lbt_data.userId || ''
                    if (isPreEnv || host === 'www.17kuxiu.com') {
                        if (token && userId) {
                            customCookie.setCookie("kx_live_token", token, "d6");
                            customCookie.setCookie("kx_live_userId", userId, "d6");
                            window.localStorage.setItem('kx_live_login', '1')
                        }
                    }
                    if (userLoginType === 1) {
                        if (!anchorId) {
                            if (isPreEnv) {
                                window.location.href = `/web/kuxiu?channel=${channel}`
                            } else {
                                window.location.href = host === 'www.17kuxiu.com' ? `${protocol}//${host}/?channel=${channel}` : `${protocol}//${host}/?channel=${channel}&token=${token}&userId=${userId}`
                            }
                        } else {
                            if (isPreEnv) {
                                window.location.href = `/web/kuxiu/live?anchorId=${anchorId}&channel=${channel}`
                            } else {
                                window.location.href = host === 'www.17kuxiu.com' ? `${protocol}//${host}/live?anchorId=${anchorId}&channel=${channel}` : `${protocol}//${host}/live?anchorId=${anchorId}&channel=${channel}&token=${token}&userId=${userId}`
                            }
                        }
                    } else {
                        // window.localStorage.setItem('kx_live_qq_login_status', 1)
                        if (!isPreEnv && host !== 'www.17kuxiu.com') {
                            if (!anchorId) {
                                window.parent.location.href = `${protocol}//${host}/?channel=${channel}&token=${token}&userId=${userId}`
                            } else {
                                window.parent.location.href = `${protocol}//${host}/live?anchorId=${anchorId}&channel=${channel}&token=${token}&userId=${userId}`
                            }
                        }
                    }
                } else if (resp.lbt_msg) {
                    this.handleErrMsg(resp.lbt_msg)
                } else {
                    this.handleErrMsg(errMsg)
                }
            }
        })
    }

    componentDidMount() {
        const source = fetchUrlParams("source") || ''
        const code = fetchUrlParams("code") || ''
        const anchorId = fetchUrlParams("anchorId") || ''
        channel = fetchUrlParams("channel") || 'web'
        host = fetchUrlParams("fromHost") || 'www.17kuxiu.com'
        isPreEnv = window.location.host.indexOf('pre') !== -1 || window.location.host.indexOf('dev') !== -1
        if (!source || !code) {
            window.location.href = !isPreEnv ? '/' : '/web/kuxiu'
            return
        }
        protocol = window.location.protocol
        const { fetchQqOpenId, fetchWechatOpenId } = this.props
        let redirectUri
        if (!isPreEnv) {
            redirectUri = `${protocol}//${host}/web/kuxiu/third-login`
        } else {
            redirectUri = `${protocol}//www.17kuxiu.com/third-login`
        }
        if (source === 'qq') {
            fetchQqOpenId({
                code,
                redirectUri,
            }).then(resp => {
                if (resp) {
                    if (resp.fqo_succ) {
                        openId = resp.fqo_data.openid || ''
                        avatarUrl = resp.fqo_data.headimgurl || ''
                        this.loginByThird(2, anchorId)
                    } else if (resp.fqo_msg) {
                        this.handleErrMsg(resp.fqo_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                }
            })
        } else if (source === 'wechat') {
            fetchWechatOpenId({
                code,
            }).then(resp => {
                if (resp) {
                    if (resp.fwo_succ) {
                        openId = resp.fwo_data.openid || ''
                        avatarUrl = resp.fwo_data.headimgurl || ''
                        this.loginByThird(1, anchorId)
                    } else if (resp.fwo_msg) {
                        this.handleErrMsg(resp.fwo_msg)
                    } else {
                        this.handleErrMsg(errMsg)
                    }
                }
            })
        }
    }

    render() {
        const { tipsShow, tipsContent } = this.state
        return (
            <div className="tips-warning" style={{ 'display': (tipsShow ? 'block' : 'none') }}>
                <p>{tipsContent}</p>
            </div>
        )
    }
}

const mapStateToProps = ({ login }) => ({ login })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQqOpenId: bindActionCreators(fetchQqOpenId, dispatch),
        fetchWechatOpenId: bindActionCreators(fetchWechatOpenId, dispatch),
        loginByThird: bindActionCreators(loginByThird, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdLogin)