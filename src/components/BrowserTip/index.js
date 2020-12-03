import React, { Component } from 'react'
import PropTypes from 'prop-types';
import baseUrl from '../../utils/const'
import './index.scss'

const urlCdnKuxiu = baseUrl.cdnKuxiu
const urlCdnLive = baseUrl.cdnLive
const chrome = `${urlCdnKuxiu}/chrome.png`
const firefox = `${urlCdnKuxiu}/firefox.png`
const qrcode = `${urlCdnLive}/qrcode.png`

class BrowserTip extends Component {
    static propTypes = {
        onCloseModal: PropTypes.func,
    };

    static defaultProps = {
        onCloseModal: a => a,
    };

    handleCloseModal = (e) => {
        e.preventDefault();
        const { onCloseModal } = this.props;
        onCloseModal && onCloseModal();
    }

    render() {
        return (
            <div className="browser-tip">
                <div className="right-btn close" onClick={e => this.handleCloseModal(e)}></div>
                <span className="wrapper-left">
                    <div className="text-title">您当前浏览器版本过低</div>
                    <div className="text-content">存在安全风险，建议您升级浏览器</div>
                    <div className="card-browser mt20">
                        <a className="link-browser" rel="noopener noreferrer" target="_blank" href="https://www.google.cn/chrome/">
                            <span className="fl">
                                <img src={chrome} alt='' />
                            </span>
                            <span className="content-browser">
                                <div className="text-title-browser">Chrome</div>
                                <div className="text-content">下载谷歌浏览器</div>
                            </span>
                        </a>

                    </div>
                    <div className="card-browser">
                        <a className="link-browser" rel="noopener noreferrer" target="_blank" href="https://www.firefox.com.cn/download/">
                            <span className="fl">
                                <img src={firefox} alt='' />
                            </span>
                            <span className="content-browser">
                                <div className="text-title-browser">Firefox</div>
                                <div className="text-content">下载火狐浏览器</div>
                            </span>
                        </a>
                    </div>
                </span>
                <span className="wrapper-right">
                    <div className="text-title">下载酷秀APP</div>
                    <div className="text-content">随时随地看直播</div>
                    <div className="wrapper-qrcode">
                        <img className="qrcode" src={qrcode} alt='' />
                    </div>
                </span>
            </div>
        )
    }
}

export default BrowserTip