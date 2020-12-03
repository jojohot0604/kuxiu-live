/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react'
import Head from 'next/head'
import { fetchBrowserVersion } from '../utils';
import '../styles/common.scss'

// let env
let browser

export default class Layout extends Component {
    componentDidMount() {
        browser = fetchBrowserVersion()
        if (browser >= 6 && browser <= 9) {
            // this.handleBrowserTipShow()
            window.location.href = `http://support.dmeng.net/upgrade-your-browser.html?referrer=${encodeURIComponent(window.location.href)}`;
            return
        }
        // console.log(window.location.host)
    }

    render() {
        const { children, title, keywords, description, pathName } = this.props

        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="content-type" content="text/html charset=utf-8" />
                    <meta name="applicable-device" content="pc" />
                    <meta name="renderer" content="webkit" />
                    <meta name="force-rendering" content="webkit" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
                    <meta name="Keywords" content={keywords} />
                    <meta name="Description" content={description} />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="format-detection" content="date=no" />
                    <meta name="format-detection" content="address=no" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                    <meta httpEquiv="x-dns-prefetch-control" content="on" />
                    <title>{title}</title>
                    <link rel="dns-prefetch" href="//www.17kuxiu.com" />
                    <link rel="dns-prefetch" href="//zhibo.17kuxiu.com" />
                    <link rel="dns-prefetch" href="//img.17kuxiu.com" />
                    <link rel="shortcut icon" href="//img.17kuxiu.com/web/live/kuxiu/img/favicon.ico" />
                </Head>
                {children}
                {
                    pathName !== '/third-login'
                        ?
                        <Fragment>
                            <script type="text/javascript" src="//img.17kuxiu.com/web/static/js/statistics.js" charSet="utf-8"></script>
                            <script type="text/javascript" src="//img.17kuxiu.com/web/static/js/baidu-live.js" charSet="utf-8"></script>
                        </Fragment>
                        :
                        null
                }
                {
                    pathName === '/third-login'
                        ?
                        <script type="text/javascript" src="//img.17kuxiu.com/web/static/js/wxLogin.js" charSet="utf-8"></script>
                        :
                        null
                }
                {
                    pathName === '/' || pathName === '/index' || pathName === '/live'
                        ?
                        <script type="text/javascript" src="//img.17kuxiu.com/web/static/js/cos-js-sdk-v5.js" charSet="utf-8"></script>
                        :
                        null
                }
                {
                    pathName === '/live'
                        ?
                        <Fragment>
                            <script type="text/javascript" src="//img.17kuxiu.com/web/static/js/swfobject-2.2.min.js" charSet="utf-8"></script>
                            <script type="text/javascript" src="//img.17kuxiu.com/web/static/js/webim.js" charSet="utf-8"></script>
                            <script type="text/javascript" src="//img.17kuxiu.com/web/static/js/json2.js" charSet="utf-8"></script>
                            <script type="text/javascript" src="//img.17kuxiu.com/web/static/js/player.min.js" charSet="utf-8"></script>
                            <script type="text/javascript" src="//img.17kuxiu.com/web/static/js/svga.custom.min.js" charSet="utf-8"></script>
                        </Fragment>
                        :
                        null
                }
                {
                    pathName === '/' || pathName === '/index'
                        ?
                        <Fragment>
                            <script type="text/javascript" src="//webapi.amap.com/maps?v=1.4.9&key=21b1ddcf0a01e10dd991fa8bc1125748" charSet="utf-8"></script>
                        </Fragment>
                        :
                        null
                }
            </div>
        )
    }
}