const express = require('express')
const next = require('next')
const compression = require('compression')
const LRUCache = require('lru-cache')

const port = parseInt(process.env.PORT, 10) || 80
const dev = process.env.NODE_ENV === 'development'
const app = next({
    dir: '.',
    dev,
})
const handle = app.getRequestHandler()
const ssrCache = new LRUCache({
    max: 100,
    maxAge: 24 * 60 * 60
})
const devProxy = {
    '/api_pre': {
        target: 'http://pre.17kuxiu.com/',
        pathRewrite: { '^/api_pre': '/' },
        changeOrigin: true
    },
    '/api_prd': {
        target: 'https://api.17kuxiu.com/',
        pathRewrite: { '^/api_prd': '/' },
        changeOrigin: true
    }
}

function getCacheKey(req) {
    return `${req.url}`
}

async function renderAndCache(req, res, pagePath, queryParams) {
    const key = getCacheKey(req)
    if (ssrCache.has(key)) {
        res.setHeader('x-cache', 'HIT')
        res.send(ssrCache.get(key))
        return
    }
    try {
        const html = await app.renderToHTML(req, res, pagePath, queryParams)
        if (res.statusCode !== 200) {
            res.send(html)
            return
        }
        ssrCache.set(key, html)
        res.setHeader('x-cache', 'MISS')
        res.send(html)
    } catch (err) {
        app.renderError(err, req, res, pagePath, queryParams)
    }
}

app.prepare()
    .then(() => {
        const server = express()

        // server.get('/service-worker.js', (req, res) => {
        //     app.serveStatic(req, res, './.next/service-worker.js')
        // })

        // const serviceWorkers = [
        //     {
        //         filename: 'service-worker.js',
        //         path: dev ? './.next/service-worker.js' : '/web/kuxiu/service-worker.js'
        //     },
        // ]

        // serviceWorkers.forEach(({ filename, path }) => {
        //     server.get(`/${filename}`, (req, res) => {
        //         app.serveStatic(req, res, path)
        //     })
        // })

        if (!dev) {
            server.use(compression())
        }

        if (dev && devProxy) {
            const proxyMiddleware = require('http-proxy-middleware')
            Object.keys(devProxy).forEach((context) => {
                server.use(proxyMiddleware(context, devProxy[context]))
            })
        }

        server.get('/', (req, res) => {
            renderAndCache(req, res, '/index')
        })

        server.get('/index', (req, res) => {
            renderAndCache(req, res, '/index')
        })

        server.get('/live/:anchorId', (req, res) => {
            renderAndCache(req, res, '/live', {
                anchorId: req.params.anchorId,
            })
        })

        server.get('/pay-start', (req, res) => {
            renderAndCache(req, res, '/pay-start')
        })

        server.get('/pay-process', (req, res) => {
            renderAndCache(req, res, '/pay-process')
        })

        server.get('/pay-result', (req, res) => {
            renderAndCache(req, res, '/pay-result')
        })

        server.get('/third-login/:source/:code/:anchorId', (req, res) => {
            renderAndCache(req, res, '/third-login', {
                source: req.params.source,
                code: req.params.code,
                anchorId: req.params.anchorId
            })
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        /* eslint-disable */
        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
