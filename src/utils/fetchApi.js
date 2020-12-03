import axios from 'axios'
import baseUrl from './const'

const dev = process.env.NODE_ENV === 'development'
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'loginType': 2,
    'mobileModel': 'web',
    'os': 'web',
    'X-Requested-With': 'XMLHttpRequest'
}

const initBaseUrl = () => {
    if (dev) {
        return baseUrl.pre
    }
    if (typeof window !== 'undefined') {
        if (window.location.host.indexOf('dev') !== -1 || window.location.host.indexOf('pre') !== -1) {
            return 'https://pre.17kuxiu.com/'
        } else {
            return 'https://api.17kuxiu.com/'
        }
    } else {
        return '/'
    }
}

const fetchApi = axios.create({
    baseURL: initBaseUrl(),
    timeout: 10000,
    headers
})

fetchApi.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

fetchApi.interceptors.response.use((response) => {
    return response
}, (err) => {
    return err.response
})

export default fetchApi