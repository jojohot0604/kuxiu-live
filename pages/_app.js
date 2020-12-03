import React from 'react'
import { Provider } from "react-redux"
import App, { Container } from "next/app"
import withRedux from "next-redux-wrapper"
import Layout from '../src/layout/BasicLayout'
import { initStore } from '../src/redux/store'

let keywords = '酷秀直播,演绎无限可能,直播,手机直播,美女直播,酷秀,最新直播,现场直播,才艺直播,生活直播'
let description = '酷秀直播，一个聚集超高颜值明星大咖、美女帅哥、热门网红、校花校草、逗比萌妹的手机直播社交平台，这里有明星发布会、花边新闻、才艺展示、生活趣闻、聊天互动、唱歌跳舞等等海量内容。酷秀直播，演绎无限可能。'
let title = '酷秀直播 - 演绎无限可能 - 高颜值的直播App'

export default withRedux(initStore)(class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        return {
            pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
        }
    }

    matchDocumentHeader = (pathname) => {
        switch (pathname) {
            case '/live':
                const live_keywords = typeof window !== 'undefined' && window.localStorage.getItem('kx_live_keywords')
                if (live_keywords) {
                    keywords = live_keywords
                }
                const live_description = typeof window !== 'undefined' && window.localStorage.getItem('kx_live_description')
                if (live_description) {
                    description = live_description
                }
                const live_title = typeof window !== 'undefined' && window.localStorage.getItem('kx_live_title')
                if (live_title) {
                    title = live_title
                }
                break;
            case '/pay-start':
            case '/pay-process':
            case '/pay-result':
                title = '酷秀充值'
                keywords = ''
                description = ''
                break;
            default:
                keywords = '酷秀直播,演绎无限可能,直播,手机直播,美女直播,酷秀,最新直播,现场直播,才艺直播,生活直播'
                description = '酷秀直播，一个聚集超高颜值明星大咖、美女帅哥、热门网红、校花校草、逗比萌妹的手机直播社交平台，这里有明星发布会、花边新闻、才艺展示、生活趣闻、聊天互动、唱歌跳舞等等海量内容。酷秀直播，演绎无限可能。'
                title = '酷秀直播 - 演绎无限可能 - 高颜值的直播App'
                break;
        }
    }

    render() {
        const { Component, pageProps, store, router } = this.props
        this.matchDocumentHeader(router.pathname)
        return (
            <Container>
                <Provider store={store}>
                    <Layout pathName={router.pathname} title={title} description={description} keywords={keywords}>
                        <Component {...pageProps} query={router.query} />
                    </Layout>
                </Provider>
            </Container>
        )
    }
})
