/* eslint-disable react/jsx-no-target-blank */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import '../../styles/footer.scss'

const wen = '//img.17kuxiu.com/web/kx-site/wen.png';
const gongan = '//img.17kuxiu.com/web/kx-site/gongan.png'

class Footer extends Component {
    static propTypes = {
        type: PropTypes.string,
        display: PropTypes.string,
    };

    static defaultProps = {
        type: 'type1',
        display: 'block',
    };

    render() {
        const { type, display, host, statisticsUrl } = this.props
        let statistics = statisticsUrl && statisticsUrl.find(item => item.url === host);
        if (!statistics) {
            statistics = statisticsUrl && statisticsUrl[0]
        }
        return (
            <div className={`footer ${type}`} style={{ display }}>
                违法和不良信息举报电话：021-68883887（7*24小时）
                <br />
                <a className="link" target="_new" href="http://report.12377.cn:13225/toreportinputNormal_anis.do">网上有害信息举报专区</a>
                <Fragment>
                    <a className="baidu-box" href={statistics && statistics.baiduTongji} target="_blank"><img border="0" src="//hmcdn.baidu.com/static/hmt/icon/21.gif" width="20" height="20" /></a>
                    <span className="cnzz-box" id={statistics && statistics.zhanzhangId}><a href={statistics && statistics.zhanzhangWebsite} target="_blank" title="站长统计"><img border="0" hspace="0" vspace="0" src="//icon.cnzz.com/img/pic.gif" /></a></span>
                </Fragment>
                <br />
                {host} 2018-2019 © All Rights Reserved.&nbsp;&nbsp;&nbsp;&nbsp;
                <a className="link" target="_new" href="//img.17kuxiu.com/web/kx-site/yingyeshui.png">营业执照：91320585MA1WAX6K4G</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a className="link" target="_new" href="//img.17kuxiu.com/web/kx-site/wangwenshui.png"><img className="icon" src={wen} alt='' />网络文化经营许可证：苏网文（2018）8996-171号</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a className="link" target="_new" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32058502010395"><img className="icon gongan" src={gongan} alt='' />苏公网安备：32058502010395号</a>
                <br />
                酷秀客服电话：021-68883887&nbsp;苏ICP备18045135号-1
            </div>
        )
    }
}

export default Footer