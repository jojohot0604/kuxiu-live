import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import baseUrl from '../../utils/const'
// import { preloadImages } from '../../utils'
import './index.scss';

const urlCdnKuxiu = baseUrl.cdnKuxiu;
const step1 = `${urlCdnKuxiu}/step1.png`;
const step2 = `${urlCdnKuxiu}/step2.png`;
const step3 = `${urlCdnKuxiu}/step3.png`;
const open_flash = `${urlCdnKuxiu}/open_flash.png`;

class FirefoxTip extends Component {
    static propTypes = {
        installFlash: PropTypes.bool,
        onCloseModal: PropTypes.func,
    };

    static defaultProps = {
        installFlash: true,
        onCloseModal: a => a,
    };

    componentWillMount() {
        // preloadImages([
        //     step1,
        //     step2,
        //     step3,
        //     open_flash,
        // ])
    }

    handleCloseModal = (e) => {
        e.preventDefault();
        const { onCloseModal } = this.props;
        onCloseModal && onCloseModal();
    }

    render() {
        const { installFlash } = this.props;
        return (
            <div className="firefox-tip">
            <div className="right-btn close" onClick={e => this.handleCloseModal(e)}></div>
            <div className="text-title first">{installFlash ? '火狐浏览器需手动设置运行Flash' : '火狐浏览器需手动启用Flash，请参照以下步骤操作'}</div>
                {
                    installFlash
                        ?
                        <div className="text-title"><img src={open_flash} alt='' /></div>
                        :
                        <Fragment>
                            <div className="text-title border-top">
                                <p className="text-container">
                                    <span className="text color1">第1步：菜单栏点击“<span className="text color2">更多</span>”按钮</span>
                                </p>
                                <img src={step1} alt='' />
                            </div>
                            <div className="text-title border-top">
                                <p className="text-container">
                                    <span className="text color1">第2步：下拉菜单中点击“<span className="text color2">附加组件</span>”按钮</span>
                                </p>
                                <img src={step2} alt='' />
                            </div>
                            <div className="text-title border-top">
                                <p className="text-container">
                                    <span className="text color1">第3步：将<span className="text color2">Shockwave Flash</span>设置为“<span className="text color2">总是激活</span>”即可</span>
                                </p>
                                <img src={step3} alt='' />
                            </div>
                            <div className="text-title border-top">
                                <p className="text-container">
                                    <span className="text color1">第4步：刷新页面</span>
                                </p>
                            </div>
                        </Fragment>
                }
            </div>
        )
    }
}

export default FirefoxTip;