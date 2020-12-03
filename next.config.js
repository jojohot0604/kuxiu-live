const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withSourceMaps = require('@zeit/next-source-maps')

const dev = process.env.NODE_ENV === 'development'
const prd = process.env.NODE_ENV === 'production'

if (dev) {
    module.exports = withSass(withCSS(withSourceMaps({
        webpack: cfg => {
            const originalEntry = cfg.entry
            cfg.entry = async () => {
                const entries = await originalEntry()
                if (entries['main.js'] && !entries['main.js'].includes('babel-polyfill')) {
                    entries['main.js'].unshift('babel-polyfill')
                }
                return entries
            }
            return cfg
        },
    })))
} else if (prd) {
    module.exports = withSass(withCSS({
        useFileSystemPublicRoutes: false,
        // assetPrefix: '/web/kuxiu', // 测试
        assetPrefix: '//img.17kuxiu.com/web/live/kuxiu/pre', // 预发
        // assetPrefix: '//img.17kuxiu.com/web/live/kuxiu/prd', // 生产
        webpack: cfg => {
            const originalEntry = cfg.entry
            cfg.entry = async () => {
                const entries = await originalEntry()
                if (entries['main.js'] && !entries['main.js'].includes('babel-polyfill')) {
                    entries['main.js'].unshift('babel-polyfill')
                }
                return entries
            }
            return cfg
        },
        exportPathMap: () => ({
            '/': { page: '/index' },
            '/index': { page: '/index' },
            '/live': { page: '/live' },
            '/pay-start': { page: '/pay-start' },
            '/pay-process': { page: '/pay-process' },
            '/pay-result': { page: '/pay-result' },
            '/third-login': { page: '/third-login' },
        })
    }))
}