/* eslint-disable no-useless-escape */
import CryptoJS from 'crypto-js'
import _ from 'lodash'
import uuid from 'uuid/v1'
import baseUrl from './const'

// const regMsg = /^@\S+\s.+$/
const urlCdnLvUser = baseUrl.cdnLvUser
const urlCdnLvAnchor = baseUrl.cdnLvAnchor
const urlCdnKuxiu = baseUrl.cdnKuxiu
const default_avatar = '//img.17kuxiu.com/avatar/default_avatar.png'
const default_cover = '//img.17kuxiu.com/livingImg/defult_liveimg.png'
const managerImg = `${urlCdnKuxiu}/manager.png`
const guardImg1 = `${urlCdnKuxiu}/icon_guard_1.png`
const guardImg2 = `${urlCdnKuxiu}/icon_guard_2.png`
const guardImg3 = `${urlCdnKuxiu}/icon_guard_3.png`
const key = CryptoJS.enc.Utf8.parse("A3B1C5D7E9F0B4D2");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('C9D8A7B5F4A2C3D6');   //十六位十六进制数作为密钥偏移量
const creg = /[\u4e00-\u9fa5]/g;

export const aesEncrypt = (word) => {
    if (!word) {
        return word
    }
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}

export const formatSvgaNickName = (value) => {
    // eslint-disable-next-line no-control-regex
    // var re = /[^/u4e00-/u9fa5]/;
    const tansfer = value.replace(creg, 'aa')
    if (tansfer.length > 10) {
        let length = 0
        let retVal = ''
        let idx = 0
        let temp
        let result
        while (length < 10) {
            temp = value.slice(idx, idx + 1)
            result = /[\u4e00-\u9fa5]/g.test(temp)
            if (result) {
                length += 2
            } else {
                length += 1
            }
            retVal += temp
            idx++
        }
        return retVal
    } else {
        return value
    }
}

export const aesDecrypt = (word) => {
    if (!word) {
        return word
    }
    const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

export const fetchImei = () => {
    let imei = window.localStorage.getItem("kx_live_imei") || ''
    if (!imei) {
        const value = uuid()
        imei = _.replace(value, /-/g, '')
        window.localStorage.setItem("kx_live_imei", imei)
    }
    return imei
}

export const utf16toEntities = (str) => {
    const patt = /[\ud800-\udbff][\udc00-\udfff]/g;
    str = str.replace(patt, function (char) {
        let H; let L; let code;
        if (char.length === 2) {
            H = char.charCodeAt(0);
            L = char.charCodeAt(1);
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
            return `&#${code};`;
        } else {
            return char;
        }
    });
    return str;
}

export const uncodeUtf16 = (str) => {
    const reg = /\&#.*?;/g;
    const result = str.replace(reg, function (char) {
        let H; let L; let code;
        if (char.length === 9) {
            code = parseInt(char.match(/[0-9]+/g));
            H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
            L = (code - 0x10000) % 0x400 + 0xDC00;
            return unescape(`%u${H.toString(16)}%u${L.toString(16)}`);
        } else {
            return char;
        }
    });
    return result;
}

export const customCookie = {
    setCookie(name, value, time) {
        const isPreEnv = window.location.host.indexOf('pre') !== -1 || window.location.host.indexOf('dev') !== -1
        const cookiePath = isPreEnv ? '/web/kuxiu' : '/'
        const strsec = this.getsec(time)
        const exp = new Date()
        exp.setTime(exp.getTime() + strsec * 1)
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp.toGMTString()};path=${cookiePath}`;
    },
    getsec(str) {
        const str1 = str.substring(1, str.length) * 1
        const str2 = str.substring(0, 1)
        if (str2 === "s") {
            return str1 * 1000
        }
        if (str2 === "h") {
            return str1 * 60 * 60 * 1000
        }
        if (str2 === "d") {
            return str1 * 24 * 60 * 60 * 1000
        }
    },
    /* eslint-disable */
    getCookie(name) {
        let arr
        const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
        if (document.cookie.match(reg)) {
            arr = document.cookie.match(reg)
            return decodeURIComponent(arr[2])
        }
        return null
    },
    delCookie(name) {
        const isPreEnv = window.location.host.indexOf('pre') !== -1 || window.location.host.indexOf('dev') !== -1
        const cookiePath = isPreEnv ? '/web/kuxiu' : '/'
        const exp = new Date()
        exp.setTime(exp.getTime() - 10000)
        const cval = this.getCookie(name)
        if (cval != null)
            document.cookie = `${name}=${cval};expires=${exp.toGMTString()};path=${cookiePath}`
    },
}

export const is3rdAvatar = (src) => {
    return src.indexOf('thirdwx.qlogo.cn') !== -1 || src.indexOf('thirdqq.qlogo.cn') !== -1
}

export const replaceCrossImgUrl = (src) => {
    return src.indexOf('thirdqq.qlogo.cn') !== -1 ? src.replace('http://thirdqq.qlogo.cn', 'http://pre.17kuxiu.com/qqqlogo') : src.replace('http://thirdwx.qlogo.cn', 'http://pre.17kuxiu.com/wxqlogo')
}

export const imageToCanvas = (src, uploadImg) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvasToDataURL(canvas, uploadImg);
    };
}

export const dataURLToBlob = (dataUrl, uploadImg) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    const imgBlob = new Blob([u8arr], { type: mime });
    if (imgBlob) {
        uploadImg(imgBlob)
    }
}

export const canvasToDataURL = (canvas, uploadImg) => {
    const value = canvas.toDataURL('image/png', 1);
    dataURLToBlob(value, uploadImg)
}

export const formatAnimationUrl = (value, isHttps) => {
    if (value.indexOf('kuxiu-1257191655.cos.ap-shanghai.myqcloud.com') !== -1) {
        value = value.replace('kuxiu-1257191655.cos.ap-shanghai.myqcloud.com', 'img.17kuxiu.com')
    }
    if (isHttps && value.indexOf('http:' !== -1)) {
        return value.replace('http:', 'https:')
    } else {
        return value
    }
}

const arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };

export const escapeHtml = (text) => {
    return text.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (t) { return arrEntities[t]; });
}

export const fetchTime = () => {
    let time = window.localStorage.getItem("kx_live_time") || ''
    let timeTmp
    if (!time) {
        time = _.now()
        window.localStorage.setItem("kx_live_time", time)
        return time
    } else {
        const timeTemp = _.now()
        if (time === _.toString(timeTemp)) {
            timeTmp = timeTemp + _.random(1, 1000000)
            return timeTmp
        }
        window.localStorage.setItem("kx_live_time", _.toString(timeTemp))
        return timeTemp
    }
}

export const fetchDataLength = (data) => {
    let intLength = 0
    for (let i = 0; i < data.length; i++) {
        if ((data.charCodeAt(i) < 0) || (data.charCodeAt(i) > 255))
            intLength += 1.73
        else
            intLength += 1
    }
    return intLength
}

export const formatLiveCover = (value) => {
    if (!value) {
        return default_cover
    } else if ((value.indexOf('img.17kuxiu.com') !== -1 || value.indexOf('kuxiu-1257191655.cos.ap-shanghai.myqcloud.com') !== -1) && value.indexOf('_cover') === -1) {
        return _.padEnd(value, value.length + 6, '_cover')
    } else {
        return value
    }
}

export const formatUserAvatar = (value) => {
    if (!value) {
        return default_avatar
    } else if ((value.indexOf('img.17kuxiu.com') !== -1 || value.indexOf('kuxiu-1257191655.cos.ap-shanghai.myqcloud.com') !== -1) && value.indexOf('_avatar') === -1) {
        return _.padEnd(value, value.length + 7, '_avatar')
    } else {
        return value
    }
}

export const isAccountLogin = () => {
    const userId = customCookie.getCookie("kx_live_userId")
    const accessToken = customCookie.getCookie("kx_live_token")
    return userId && accessToken
}

export const isAccountExpire = (code) => {
    if (code) {
        if (code === -100007 || code === -100009 || code === -100004 || code === -100005) {
            return true
        }
        return false
    } else {
        const userId = customCookie.getCookie("kx_live_userId")
        const accessToken = customCookie.getCookie("kx_live_token")
        if (!userId || !accessToken) {
            return true
        }
        return false
    }
}

export const initRequestHeaders = () => {
    const userId = customCookie.getCookie("kx_live_userId")
    const accessToken = customCookie.getCookie("kx_live_token")
    const imei = fetchImei()
    const timestamp = fetchTime()
    const headers = {
        timestamp,
        'requestId': CryptoJS.MD5(`web${imei}${userId || ''}${timestamp}792f28d6ff1f34ec702c08626d454b39`).toString(),
        'version': '1.0.0',
        'accessToken': accessToken || '',
        imei,
        'os': 'web',
        'mobileModel': 'web',
        'loginType': 2,
    }
    return headers
}

export const initWhiteListRequestHeaders = (userId, mobileModel = 'web') => {
    const imei = fetchImei()
    const timestamp = fetchTime()
    const headers = {
        timestamp,
        'requestId': CryptoJS.MD5(`web${imei}${timestamp}792f28d6ff1f34ec702c08626d454b39`).toString(),
        'version': '1.0.0',
        imei,
        'os': 'web',
        mobileModel,
        'loginType': 2,
    }
    if (userId) {
        headers.userId = userId
    }
    return headers
}

export const encodeUnicode = (str) => {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

export const existSensitiveWord = (word, msgSend) => {
    let exist = true
    for (let j = 0; j < word.length; j++) {
        if (msgSend.indexOf(word[j]) === -1) {
            exist = false
            break;
        }
    }
    return exist
}

export const replaceSensitiveWord = (word, msgSend) => {
    let idx = 0;
    let arr = word.split('');
    let len = arr.length
    let chat = ''
    let indexArr = []
    for (let i = 0; i < word.length; i++) {
        chat += '*'
    }
    msgSend = msgSend.replace(word, chat)
    for (let j = 0; j < msgSend.length; j++) {
        if (msgSend[j] === arr[idx]) {
            if (idx === len - 1) {
                indexArr.push(j.toString())
                for (let z = 0; z < indexArr.length; z++) {
                    msgSend = msgSend.replace(msgSend[_.parseInt(indexArr[z])], '*')
                }
                idx = 0
                indexArr = []
            } else {
                idx += 1
                indexArr.push(j.toString())
            }
        }
    }
    return msgSend
}

export const matchUserLv = (userLv) => {
    if (userLv < 60) {
        return `${_.toString(userLv)}级`;
    } else {
        let text = ''
        const userLevel = userLv.toString();
        const length = userLevel.length;
        const title = userLevel.slice(0, length - 1)
        const lv = userLevel.slice(length - 1)
        switch (title) {
            case '6':
                text = '国公'
                break;
            case '7':
                text = '郡王'
                break;
            case '8':
                text = '亲王'
                break;
            case '9':
                text = '诸侯'
                break;
            case '10':
                text = '国王'
                break;
            case '11':
                text = '帝王'
                break;
            case '12':
                text = '满级'
                break;
            default:
                break;
        }
        return lv !== '0' ? `${text}${lv}` : `${text}`
    }
}

export const replaceSensitiveWordVersion2 = (word, msgSend) => {
    let idx = 0;
    let arr = word.split('');
    let len = arr.length
    let chat = ''
    let indexArr = []
    let value = ''
    let omit = ''
    for (let i = 0; i < word.length; i++) {
        chat += '*'
    }
    msgSend = msgSend.replace(word, chat)
    for (let j = 0; j < msgSend.length; j++) {
        if (msgSend[j] === arr[idx]) {
            if (idx === len - 1) {
                indexArr.push(j.toString())
                if (indexArr.length > 1) {
                    value = msgSend.substring(_.parseInt(indexArr[0]), _.parseInt(indexArr[1]) + 1)
                    for (let i = _.parseInt(indexArr[0]); i < _.parseInt(indexArr[1]); i++) {
                        omit += '*'
                    }
                    msgSend = msgSend.replace(value, omit)
                } else {
                    msgSend = msgSend.replace(msgSend[_.parseInt(indexArr[0])], '*')
                }
                idx = 0
                indexArr = []
                value = ''
                omit = ''
            } else if (idx === 0) {
                idx += 1
                indexArr.push(j.toString())
            } else {
                idx += 1
            }
        }
    }
    return msgSend
}

export const isEmpty = (value) => {
    return value.replace(/\s/g, "") === ""
}

export const isMobile = (value, areaCode) => {
    return areaCode === '86' ? /^(1[3,4,5,6,7,8,9])\d{9}$/.test(value) : /^\d*$/.test(value)
}

export const isVerCode = (value) => {
    return /^\d{6}$/.test(value) || /^\d{4}$/.test(value)
}

export const isUserId = (value) => {
    return /^\d+$/.test(_.parseInt(value))
}

export const isPassword = (value) => {
    return /^[A-Za-z0-9]+$/.test(value) && value.length >= 6 && value.length <= 18
}

export const isRespSuccess = (resp) => {
    return resp.retCode === 200
}

export const isArray = (data) => {
    return _.isArray(data) && data.length >= 0
}

export const isObject = (data) => {
    return _.isObject(data)
}

export const isPositiveZero = (data) => {
    return _.isNumber(data) && data >= 0
}

export const fetchUrlParams = (name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) {
        return decodeURIComponent(r[2])
    }
    return null
}

export const formatAmount = (value) => {
    const reg = /(?=(\B)(\d{3})+$)/g;
    return value.toString().replace(reg, ',')
}

export const sortBy = (attr, rev) => {
    if (rev === undefined) {
        rev = 1
    } else {
        rev = (rev) ? 1 : -1
    }
    return function (a, b) {
        a = a[attr]
        b = b[attr]
        if (a < b) {
            return rev * -1
        }
        if (a > b) {
            return rev * 1
        }
        return 0
    }
}

export const asyncLoadScripts = (scripts, callback = null) => {
    let ok = 0;
    for (let i = 0; i < scripts.length; i++) {
        asyncLoadScript(scripts[i], function () {
            ok++;
            if (ok === scripts.length) {
                callback && callback();
            }
        })
    }
}

export const asyncLoadScript = (url, callback = null) => {
    const old_script = document.getElementById(url);
    if (old_script) {
        if (old_script.ready) {
            callback && callback();
            return;
        }
        else {
            document.body.removeChild(old_script);
        }
    }
    const script = document.createElement('script');
    script.id = url;
    script.src = url;
    script.onload = script.onreadystatechange = function () {
        if (script.ready) {
            return false;
        }
        if (!script.readyState || script.readyState === "loaded" || script.readyState === 'complete') {
            script.ready = true;
            callback && callback();
        }
    };
    document.body.appendChild(script);
}

export const preloadImages = (arr) => {
    const newImages = []
    for (let i = 0; i < arr.length; i++) {
        newImages[i] = new Image()
        newImages[i].src = arr[i]
    }
}

export const convertToTenThousand = (val) => {
    let temp
    if (val > 0 && val <= 9999) {
        temp = val
    } else if (val > 9999 && val < 1000000) {
        temp = `${_.round(val / 10000, 1)}万`
    } else if (val >= 1000000) {
        temp = `${_.parseInt(val / 10000)}万`
    }
    //     else if (val > 10000000) {
    //     temp = `${_.parseInt(val / 10000000)}千万`
    // }
    return temp
}

export const convertToTenThousand1 = (val) => {
    let temp
    if (val >= 0 && val <= 9999) {
        temp = val
    } else if (val > 9999 && val <= 1000000) {
        temp = `${(val % 10000 == 0) ? val / 10000 : (val / 10000).toFixed(1)}万`
    } else if (val >= 1000000 && val < 10000000) {
        temp = `${(val / 10000).toFixed(0)}万`
    } else if (val >= 10000000 && val <= 1000000000) {
        temp = `${(val / 10000000).toFixed(1)}千万`
    } else if (val > 1000000000) {
        temp = `${(val / 10000000).toFixed(0)}千万`
    }
    return temp
}

export const convertToTenThousand2 = (val) => {
    let temp
    if (val >= 0 && val <= 9999) {
        temp = val
    } else if (val > 9999 && val <= 1000000) {
        temp = `${(val % 10000 == 0) ? val / 10000 : (val / 10000).toFixed(2)}万`
    } else if (val >= 1000000 && val < 10000000) {
        temp = `${_.parseInt(val / 10000)}万`
    } else if (val >= 10000000 && val <= 1000000000) {
        temp = `${(val / 10000000).toFixed(2)}千万`
    } else if (val > 1000000000) {
        temp = `${_.parseInt(val / 10000000)}千万`
    }
    return temp
}

export const fetchBrowserVersion = () => {
    const userAgent = navigator.userAgent
    const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1
    const isEdge = userAgent.indexOf("Edge") > -1 && !isIE
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1
    const isWechat = userAgent.toLowerCase().match(/MicroMessenger/i) === 'micromessenger'
    // const isWebKit = userAgent.indexOf("AppleWebKit") > -1
    const isQq = userAgent.match(/QQ/i) == "qq"
    const isIos = /(iPhone|iPad|iPod|iOS)/i.test(userAgent);
    const isAndroid = /(Android)/i.test(userAgent);
    let res
    if (!isWechat && !isIos && !isQq && !isAndroid) {
        if (isIE) {
            const reIE = new RegExp("MSIE (\\d+\\.\\d+)")
            reIE.test(userAgent)
            const fIEVersion = parseFloat(RegExp["$1"])
            if (fIEVersion === 7) {
                res = 7
            } else if (fIEVersion === 8) {
                res = 8
            } else if (fIEVersion === 9) {
                res = 9
            } else if (fIEVersion === 10) {
                res = 10
            } else {
                res = 6 //IE版本<=7
            }
        } else if (isEdge) {
            res = 'edge' //edge
        } else if (isIE11) {
            res = 11 //IE11  
        } else if (userAgent.indexOf("Firefox") >= 0) {
            res = 'firefox'
        } else if (userAgent.indexOf("Chrome") >= 0) {
            res = 'chrome'
        } else if (userAgent.indexOf("Opera") >= 0) {
            res = 'opera'
        } else if (userAgent.indexOf("Safari") >= 0) {
            res = 'safari'
        } else if (userAgent.indexOf("Netscape") >= 0) {
            res = 'netscape'
        } else {
            res = -1 //不是ie浏览器
        }
    } else {
        res = 'h5'
    }
    return res
}

export const CheckFlashPlayer = () => {
    const isEnable = swfobject.hasFlashPlayerVersion("20")
    return isEnable;
}

export const GetFlashPlayerVersion = () => {
    const version = swfobject.getFlashPlayerVersion()
    if (document.getElementById && version["major"] > 0) {
        if (version['major'] <= 20) {
            return false
        }
    } else {
        return false
    }
    return true
}

export const returnKeywords = (nickName, slogan) => {
    if (slogan) {
        return `${slogan},${nickName},酷秀直播,演绎无限可能`
    } else {
        return `${nickName},酷秀直播,演绎无限可能`
    }
}

export const returnTitle = (nickName, slogan, anchorId) => {
    if (slogan) {
        return `${nickName}正在直播《${slogan}》, ta的酷秀ID:${anchorId}, 快来关注吧 - 酷秀直播,演绎无限可能`
    } else {
        return `${nickName}正在直播, ta的酷秀ID:${anchorId}, 快来关注吧 - 酷秀直播,演绎无限可能`
    }
}

export const returnDescription = (nickName, slogan) => {
    if (slogan) {
        return `【${nickName}】在酷秀直播“${slogan}”，与Ta进行零距离的互动交流。大家都玩的很开心！`
    } else {
        return `【${nickName}】在酷秀直播，与Ta进行零距离的互动交流。大家都玩的很开心！`
    }
}

export const initGuardTypeImg = (type) => {
    if (type === 1) {
        return guardImg1
    } else if (type === 2) {
        return guardImg2
    } else if (type === 3) {
        return guardImg3
    } else {
        return guardImg3
    }
}

export const initImgProtocal = (isHttps, value) => {
    if (!value) {
        return ''
    }
    if (isHttps) {
        if (value.indexOf('https') !== -1) {
            return value
        } else {
            return value.replace('http', 'https')
        }
    } else {
        if (value.indexOf('http') !== -1) {
            return value
        } else {
            return value.replace('https', 'http')
        }
    }
}

export const initMedalImg = (value, medalList) => {
    const medal = medalList.filter(item => item.id === value)
    return medal.length > 0 ? medal[0].iconUrl : ''
}

export const fetchHlsUrl = (url) => {
    return url.replace('rtmp', 'http') + '.m3u8'
}

export const fetchFlvUrl = (isHttps, url) => {
    return isHttps ? (url.replace('rtmp', 'https') + '.flv') : (url.replace('rtmp', 'http') + '.flv')
}

// let options;
// let isPause = false
// let playTimes
// let retryTimes
// let player
// let timeUpdate

export const transferSendMsg = (text) => {
    let value = text
    while (value.indexOf('[BAD]') >= 0) {
        value = _.replace(value, '[BAD]', 'x')
    }
    while (value.indexOf('[BINGO]') >= 0) {
        value = value.replace('[BINGO]', 'x')
    }
    while (value.indexOf('[GOOD]') >= 0) {
        value = value.replace('[GOOD]', 'x')
    }
    while (value.indexOf('[NO]') >= 0) {
        value = value.replace('[NO]', 'x')
    }
    while (value.indexOf('[OK]') >= 0) {
        value = value.replace('[OK]', 'x')
    }
    while (value.indexOf('[ROCK]') >= 0) {
        value = value.replace('[ROCK]', 'x')
    }
    while (value.indexOf('[白眼]') >= 0) {
        value = value.replace('[白眼]', 'x')
    }
    while (value.indexOf('[抱抱]') >= 0) {
        value = value.replace('[抱抱]', 'x')
    }
    while (value.indexOf('[悲剧]') >= 0) {
        value = value.replace('[悲剧]', 'x')
    }
    while (value.indexOf('[比心]') >= 0) {
        value = value.replace('[比心]', 'x')
    }
    while (value.indexOf('[鄙视]') >= 0) {
        value = value.replace('[鄙视]', 'x')
    }
    while (value.indexOf('[闭嘴]') >= 0) {
        value = value.replace('[闭嘴]', 'x')
    }
    while (value.indexOf('[不开心]') >= 0) {
        value = value.replace('[不开心]', 'x')
    }
    while (value.indexOf('[财迷]') >= 0) {
        value = value.replace('[财迷]', 'x')
    }
    while (value.indexOf('[打脸]') >= 0) {
        value = value.replace('[打脸]', 'x')
    }
    while (value.indexOf('[大便]') >= 0) {
        value = value.replace('[大便]', 'x')
    }
    while (value.indexOf('[蛋糕]') >= 0) {
        value = value.replace('[蛋糕]', 'x')
    }
    while (value.indexOf('[得意]') >= 0) {
        value = value.replace('[得意]', 'x')
    }
    while (value.indexOf('[饿]') >= 0) {
        value = value.replace('[饿]', 'x')
    }
    while (value.indexOf('[飞吻]') >= 0) {
        value = value.replace('[飞吻]', 'x')
    }
    while (value.indexOf('[肥皂]') >= 0) {
        value = value.replace('[肥皂]', 'x')
    }
    while (value.indexOf('[愤怒]') >= 0) {
        value = value.replace('[愤怒]', 'x')
    }
    while (value.indexOf('[扶眼镜]') >= 0) {
        value = value.replace('[扶眼镜]', 'x')
    }
    while (value.indexOf('[尴尬]') >= 0) {
        value = value.replace('[尴尬]', 'x')
    }
    while (value.indexOf('[干杯]') >= 0) {
        value = value.replace('[干杯]', 'x')
    }
    while (value.indexOf('[勾引]') >= 0) {
        value = value.replace('[勾引]', 'x')
    }
    while (value.indexOf('[狗]') >= 0) {
        value = value.replace('[狗]', 'x')
    }
    while (value.indexOf('[鼓掌]') >= 0) {
        value = value.replace('[鼓掌]', 'x')
    }
    while (value.indexOf('[鬼脸]') >= 0) {
        value = value.replace('[鬼脸]', 'x')
    }
    while (value.indexOf('[哈哈]') >= 0) {
        value = value.replace('[哈哈]', 'x')
    }
    while (value.indexOf('[害羞]') >= 0) {
        value = value.replace('[害羞]', 'x')
    }
    while (value.indexOf('[汗]') >= 0) {
        value = value.replace('[汗]', 'x')
    }
    while (value.indexOf('[花]') >= 0) {
        value = value.replace('[花]', 'x')
    }
    while (value.indexOf('[花心]') >= 0) {
        value = value.replace('[花心]', 'x')
    }
    while (value.indexOf('[滑稽]') >= 0) {
        value = value.replace('[滑稽]', 'x')
    }
    while (value.indexOf('[坏笑]') >= 0) {
        value = value.replace('[坏笑]', 'x')
    }
    while (value.indexOf('[机智]') >= 0) {
        value = value.replace('[机智]', 'x')
    }
    while (value.indexOf('[加x]') >= 0) {
        value = value.replace('[加x]', 'x')
    }
    while (value.indexOf('[加油]') >= 0) {
        value = value.replace('[加油]', 'x')
    }
    while (value.indexOf('[剪刀手]') >= 0) {
        value = value.replace('[剪刀手]', 'x')
    }
    while (value.indexOf('[惊恐]') >= 0) {
        value = value.replace('[惊恐]', 'x')
    }
    while (value.indexOf('[惊讶]') >= 0) {
        value = value.replace('[惊讶]', 'x')
    }
    while (value.indexOf('[囧]') >= 0) {
        value = value.replace('[囧]', 'x')
    }
    while (value.indexOf('[举个例子]') >= 0) {
        value = value.replace('[举个例子]', 'x')
    }
    while (value.indexOf('[瞌睡]') >= 0) {
        value = value.replace('[瞌睡]', 'x')
    }
    while (value.indexOf('[可怜]') >= 0) {
        value = value.replace('[可怜]', 'x')
    }
    while (value.indexOf('[哭笑]') >= 0) {
        value = value.replace('[哭笑]', 'x')
    }
    while (value.indexOf('[酷]') >= 0) {
        value = value.replace('[酷]', 'x')
    }
    while (value.indexOf('[拉勾]') >= 0) {
        value = value.replace('[拉勾]', 'x')
    }
    while (value.indexOf('[雷焦]') >= 0) {
        value = value.replace('[雷焦]', '')
    }
    while (value.indexOf('[泪]') >= 0) {
        value = value.replace('[泪]', 'x')
    }
    while (value.indexOf('[冷]') >= 0) {
        value = value.replace('[冷]', 'x')
    }
    while (value.indexOf('[礼物]') >= 0) {
        value = value.replace('[礼物]', 'x')
    }
    while (value.indexOf('[流鼻血]') >= 0) {
        value = value.replace('[流鼻血]', 'x')
    }
    while (value.indexOf('[猫]') >= 0) {
        value = value.replace('[猫]', 'x')
    }
    while (value.indexOf('[摸头]') >= 0) {
        value = value.replace('[摸头]', 'x')
    }
    while (value.indexOf('[目瞪口呆]') >= 0) {
        value = value.replace('[目瞪口呆]', 'x')
    }
    while (value.indexOf('[凝视]') >= 0) {
        value = value.replace('[凝视]', 'x')
    }
    while (value.indexOf('[呕吐]') >= 0) {
        value = value.replace('[呕吐]', 'x')
    }
    while (value.indexOf('[咆哮]') >= 0) {
        value = value.replace('[咆哮]', 'x')
    }
    while (value.indexOf('[喷]') >= 0) {
        value = value.replace('[喷]', 'x')
    }
    while (value.indexOf('[屁股]') >= 0) {
        value = value.replace('[屁股]', 'x')
    }
    while (value.indexOf('[生病]') >= 0) {
        value = value.replace('[生病]', 'x')
    }
    while (value.indexOf('[衰]') >= 0) {
        value = value.replace('[衰]', 'x')
    }
    while (value.indexOf('[思考]') >= 0) {
        value = value.replace('[思考]', 'x')
    }
    while (value.indexOf('[摊手]') >= 0) {
        value = value.replace('[摊手]', 'x')
    }
    while (value.indexOf('[舔屏]') >= 0) {
        value = value.replace('[舔屏]', 'x')
    }
    while (value.indexOf('[偷笑]') >= 0) {
        value = value.replace('[偷笑]', 'x')
    }
    while (value.indexOf('[吐舌头]') >= 0) {
        value = value.replace('[吐舌头]', 'x')
    }
    while (value.indexOf('[挖鼻孔]') >= 0) {
        value = value.replace('[挖鼻孔]', 'x')
    }
    while (value.indexOf('[晚安]') >= 0) {
        value = value.replace('[晚安]', 'x')
    }
    while (value.indexOf('[微笑]') >= 0) {
        value = value.replace('[微笑]', 'x')
    }
    while (value.indexOf('[围观]') >= 0) {
        value = value.replace('[围观]', 'x')
    }
    while (value.indexOf('[委屈]') >= 0) {
        value = value.replace('[委屈]', 'x')
    }
    while (value.indexOf('[握手]') >= 0) {
        value = value.replace('[握手]', 'x')
    }
    while (value.indexOf('[污]') >= 0) {
        value = value.replace('[污]', 'x')
    }
    while (value.indexOf('[无聊]') >= 0) {
        value = value.replace('[无聊]', 'x')
    }
    while (value.indexOf('[捂脸]') >= 0) {
        value = value.replace('[捂脸]', 'x')
    }
    while (value.indexOf('[嘻嘻]') >= 0) {
        value = value.replace('[嘻嘻]', 'x')
    }
    while (value.indexOf('[斜眼]') >= 0) {
        value = value.replace('[斜眼]', 'x')
    }
    while (value.indexOf('[心]') >= 0) {
        value = value.replace('[心]', 'x')
    }
    while (value.indexOf('[心碎]') >= 0) {
        value = value.replace('[心碎]', 'x')
    }
    while (value.indexOf('[仰慕]') >= 0) {
        value = value.replace('[仰慕]', 'x')
    }
    while (value.indexOf('[疑问]') >= 0) {
        value = value.replace('[疑问]', 'x')
    }
    while (value.indexOf('[右哼哼]') >= 0) {
        value = value.replace('[右哼哼]', 'x')
    }
    while (value.indexOf('[晕]') >= 0) {
        value = value.replace('[晕]', 'x')
    }
    while (value.indexOf('[砸死你]') >= 0) {
        value = value.replace('[砸死你]', 'x')
    }
    while (value.indexOf('[再见]') >= 0) {
        value = value.replace('[再见]', 'x')
    }
    while (value.indexOf('[猪鼻子]') >= 0) {
        value = value.replace('[猪鼻子]', 'x')
    }
    while (value.indexOf('[抓狂]') >= 0) {
        value = value.replace('[抓狂]', 'x')
    }
    while (value.indexOf('[左哼哼]') >= 0) {
        value = value.replace('[左哼哼]', 'x')
    }
    return value
}

export const transferSendMsgForDanmu = (text) => {
    let value = text
    let len = 0
    while (value.indexOf('[BAD]') >= 0) {
        value = _.replace(value, '[BAD]', '')
        len += 2.17
    }
    while (value.indexOf('[BINGO]') >= 0) {
        value = value.replace('[BINGO]', '')
        len += 2.17
    }
    while (value.indexOf('[GOOD]') >= 0) {
        value = value.replace('[GOOD]', '')
        len += 2.17
    }
    while (value.indexOf('[NO]') >= 0) {
        value = value.replace('[NO]', '')
        len += 2.17
    }
    while (value.indexOf('[OK]') >= 0) {
        value = value.replace('[OK]', '')
        len += 2.17
    }
    while (value.indexOf('[ROCK]') >= 0) {
        value = value.replace('[ROCK]', '')
        len += 2.17
    }
    while (value.indexOf('[白眼]') >= 0) {
        value = value.replace('[白眼]', '')
        len += 2.17
    }
    while (value.indexOf('[抱抱]') >= 0) {
        value = value.replace('[抱抱]', '')
        len += 2.17
    }
    while (value.indexOf('[悲剧]') >= 0) {
        value = value.replace('[悲剧]', '')
        len += 2.17
    }
    while (value.indexOf('[比心]') >= 0) {
        value = value.replace('[比心]', '')
        len += 2.17
    }
    while (value.indexOf('[鄙视]') >= 0) {
        value = value.replace('[鄙视]', '')
        len += 2.17
    }
    while (value.indexOf('[闭嘴]') >= 0) {
        value = value.replace('[闭嘴]', '')
        len += 2.17
    }
    while (value.indexOf('[不开心]') >= 0) {
        value = value.replace('[不开心]', '')
        len += 2.17
    }
    while (value.indexOf('[财迷]') >= 0) {
        value = value.replace('[财迷]', '')
        len += 2.17
    }
    while (value.indexOf('[打脸]') >= 0) {
        value = value.replace('[打脸]', '')
        len += 2.17
    }
    while (value.indexOf('[大便]') >= 0) {
        value = value.replace('[大便]', '')
        len += 2.17
    }
    while (value.indexOf('[蛋糕]') >= 0) {
        value = value.replace('[蛋糕]', '')
        len += 2.17
    }
    while (value.indexOf('[得意]') >= 0) {
        value = value.replace('[得意]', '')
        len += 2.17
    }
    while (value.indexOf('[饿]') >= 0) {
        value = value.replace('[饿]', '')
        len += 2.17
    }
    while (value.indexOf('[飞吻]') >= 0) {
        value = value.replace('[飞吻]', '')
        len += 2.17
    }
    while (value.indexOf('[肥皂]') >= 0) {
        value = value.replace('[肥皂]', '')
        len += 2.17
    }
    while (value.indexOf('[愤怒]') >= 0) {
        value = value.replace('[愤怒]', '')
        len += 2.17
    }
    while (value.indexOf('[扶眼镜]') >= 0) {
        value = value.replace('[扶眼镜]', '')
        len += 2.17
    }
    while (value.indexOf('[尴尬]') >= 0) {
        value = value.replace('[尴尬]', '')
        len += 2.17
    }
    while (value.indexOf('[干杯]') >= 0) {
        value = value.replace('[干杯]', '')
        len += 2.17
    }
    while (value.indexOf('[勾引]') >= 0) {
        value = value.replace('[勾引]', '')
        len += 2.17
    }
    while (value.indexOf('[狗]') >= 0) {
        value = value.replace('[狗]', '')
        len += 2.17
    }
    while (value.indexOf('[鼓掌]') >= 0) {
        value = value.replace('[鼓掌]', '')
        len += 2.17
    }
    while (value.indexOf('[鬼脸]') >= 0) {
        value = value.replace('[鬼脸]', '')
        len += 2.17
    }
    while (value.indexOf('[哈哈]') >= 0) {
        value = value.replace('[哈哈]', '')
        len += 2.17
    }
    while (value.indexOf('[害羞]') >= 0) {
        value = value.replace('[害羞]', '')
        len += 2.17
    }
    while (value.indexOf('[汗]') >= 0) {
        value = value.replace('[汗]', '')
        len += 2.17
    }
    while (value.indexOf('[花]') >= 0) {
        value = value.replace('[花]', '')
        len += 2.17
    }
    while (value.indexOf('[花心]') >= 0) {
        value = value.replace('[花心]', '')
        len += 2.17
    }
    while (value.indexOf('[滑稽]') >= 0) {
        value = value.replace('[滑稽]', '')
        len += 2.17
    }
    while (value.indexOf('[坏笑]') >= 0) {
        value = value.replace('[坏笑]', '')
        len += 2.17
    }
    while (value.indexOf('[机智]') >= 0) {
        value = value.replace('[机智]', '')
        len += 2.17
    }
    while (value.indexOf('[加]') >= 0) {
        value = value.replace('[加]', '')
        len += 2.17
    }
    while (value.indexOf('[加油]') >= 0) {
        value = value.replace('[加油]', '')
        len += 2.17
    }
    while (value.indexOf('[剪刀手]') >= 0) {
        value = value.replace('[剪刀手]', '')
        len += 2.17
    }
    while (value.indexOf('[惊恐]') >= 0) {
        value = value.replace('[惊恐]', '')
        len += 2.17
    }
    while (value.indexOf('[惊讶]') >= 0) {
        value = value.replace('[惊讶]', '')
        len += 2.17
    }
    while (value.indexOf('[囧]') >= 0) {
        value = value.replace('[囧]', '')
        len += 2.17
    }
    while (value.indexOf('[举个例子]') >= 0) {
        value = value.replace('[举个例子]', '')
        len += 2.17
    }
    while (value.indexOf('[瞌睡]') >= 0) {
        value = value.replace('[瞌睡]', '')
        len += 2.17
    }
    while (value.indexOf('[可怜]') >= 0) {
        value = value.replace('[可怜]', '')
        len += 2.17
    }
    while (value.indexOf('[哭笑]') >= 0) {
        value = value.replace('[哭笑]', '')
        len += 2.17
    }
    while (value.indexOf('[酷]') >= 0) {
        value = value.replace('[酷]', '')
        len += 2.17
    }
    while (value.indexOf('[拉勾]') >= 0) {
        value = value.replace('[拉勾]', '')
        len += 2.17
    }
    while (value.indexOf('[雷焦]') >= 0) {
        value = value.replace('[雷焦]', '')
        len += 2.17
    }
    while (value.indexOf('[泪]') >= 0) {
        value = value.replace('[泪]', '')
        len += 2.17
    }
    while (value.indexOf('[冷]') >= 0) {
        value = value.replace('[冷]', '')
        len += 2.17
    }
    while (value.indexOf('[礼物]') >= 0) {
        value = value.replace('[礼物]', '')
        len += 2.17
    }
    while (value.indexOf('[流鼻血]') >= 0) {
        value = value.replace('[流鼻血]', '')
        len += 2.17
    }
    while (value.indexOf('[猫]') >= 0) {
        value = value.replace('[猫]', '')
        len += 2.17
    }
    while (value.indexOf('[摸头]') >= 0) {
        value = value.replace('[摸头]', '')
        len += 2.17
    }
    while (value.indexOf('[目瞪口呆]') >= 0) {
        value = value.replace('[目瞪口呆]', '')
        len += 2.17
    }
    while (value.indexOf('[凝视]') >= 0) {
        value = value.replace('[凝视]', '')
        len += 2.17
    }
    while (value.indexOf('[呕吐]') >= 0) {
        value = value.replace('[呕吐]', '')
        len += 2.17
    }
    while (value.indexOf('[咆哮]') >= 0) {
        value = value.replace('[咆哮]', '')
        len += 2.17
    }
    while (value.indexOf('[喷]') >= 0) {
        value = value.replace('[喷]', '')
        len += 2.17
    }
    while (value.indexOf('[屁股]') >= 0) {
        value = value.replace('[屁股]', '')
        len += 2.17
    }
    while (value.indexOf('[生病]') >= 0) {
        value = value.replace('[生病]', '')
        len += 2.17
    }
    while (value.indexOf('[衰]') >= 0) {
        value = value.replace('[衰]', '')
        len += 2.17
    }
    while (value.indexOf('[思考]') >= 0) {
        value = value.replace('[思考]', '')
        len += 2.17
    }
    while (value.indexOf('[摊手]') >= 0) {
        value = value.replace('[摊手]', '')
        len += 2.17
    }
    while (value.indexOf('[舔屏]') >= 0) {
        value = value.replace('[舔屏]', '')
        len += 2.17
    }
    while (value.indexOf('[偷笑]') >= 0) {
        value = value.replace('[偷笑]', '')
        len += 2.17
    }
    while (value.indexOf('[吐舌头]') >= 0) {
        value = value.replace('[吐舌头]', '')
        len += 2.17
    }
    while (value.indexOf('[挖鼻孔]') >= 0) {
        value = value.replace('[挖鼻孔]', '')
        len += 2.17
    }
    while (value.indexOf('[晚安]') >= 0) {
        value = value.replace('[晚安]', '')
        len += 2.17
    }
    while (value.indexOf('[微笑]') >= 0) {
        value = value.replace('[微笑]', '')
        len += 2.17
    }
    while (value.indexOf('[围观]') >= 0) {
        value = value.replace('[围观]', '')
        len += 2.17
    }
    while (value.indexOf('[委屈]') >= 0) {
        value = value.replace('[委屈]', '')
        len += 2.17
    }
    while (value.indexOf('[握手]') >= 0) {
        value = value.replace('[握手]', '')
        len += 2.17
    }
    while (value.indexOf('[污]') >= 0) {
        value = value.replace('[污]', '')
        len += 2.17
    }
    while (value.indexOf('[无聊]') >= 0) {
        value = value.replace('[无聊]', '')
        len += 2.17
    }
    while (value.indexOf('[捂脸]') >= 0) {
        value = value.replace('[捂脸]', '')
        len += 2.17
    }
    while (value.indexOf('[嘻嘻]') >= 0) {
        value = value.replace('[嘻嘻]', '')
        len += 2.17
    }
    while (value.indexOf('[斜眼]') >= 0) {
        value = value.replace('[斜眼]', '')
        len += 2.17
    }
    while (value.indexOf('[心]') >= 0) {
        value = value.replace('[心]', '')
        len += 2.17
    }
    while (value.indexOf('[心碎]') >= 0) {
        value = value.replace('[心碎]', '')
        len += 2.17
    }
    while (value.indexOf('[仰慕]') >= 0) {
        value = value.replace('[仰慕]', '')
        len += 2.17
    }
    while (value.indexOf('[疑问]') >= 0) {
        value = value.replace('[疑问]', '')
        len += 2.17
    }
    while (value.indexOf('[右哼哼]') >= 0) {
        value = value.replace('[右哼哼]', '')
        len += 2.17
    }
    while (value.indexOf('[晕]') >= 0) {
        value = value.replace('[晕]', '')
        len += 2.17
    }
    while (value.indexOf('[砸死你]') >= 0) {
        value = value.replace('[砸死你]', '')
        len += 2.17
    }
    while (value.indexOf('[再见]') >= 0) {
        value = value.replace('[再见]', '')
        len += 2.17
    }
    while (value.indexOf('[猪鼻子]') >= 0) {
        value = value.replace('[猪鼻子]', '')
        len += 2.17
    }
    while (value.indexOf('[抓狂]') >= 0) {
        value = value.replace('[抓狂]', '')
        len += 2.17
    }
    while (value.indexOf('[左哼哼]') >= 0) {
        value = value.replace('[左哼哼]', '')
        len += 2.17
    }
    return [value, len]
}

export const checkSendMsg = (text, len) => {
    const value = transferSendMsg(text)
    return value.length <= len
}

export const matchEmotionImg = (text) => {
    let value = text
    while (value.indexOf('[BAD]') >= 0) {
        value = value.replace('[BAD]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/BAD.png /></span>')
    }
    while (value.indexOf('[BINGO]') >= 0) {
        value = value.replace('[BINGO]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/BINGO.png /></span>')
    }
    while (value.indexOf('[GOOD]') >= 0) {
        value = value.replace('[GOOD]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/GOOD.png /></span>')
    }
    while (value.indexOf('[NO]') >= 0) {
        value = value.replace('[NO]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/NO.png /></span>')
    }
    while (value.indexOf('[OK]') >= 0) {
        value = value.replace('[OK]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/OK.png /></span>')
    }
    while (value.indexOf('[ROCK]') >= 0) {
        value = value.replace('[ROCK]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/ROCK.png /></span>')
    }
    while (value.indexOf('[白眼]') >= 0) {
        value = value.replace('[白眼]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/白眼.png /></span>')
    }
    while (value.indexOf('[抱抱]') >= 0) {
        value = value.replace('[抱抱]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/抱抱.png /></span>')
    }
    while (value.indexOf('[悲剧]') >= 0) {
        value = value.replace('[悲剧]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/悲剧.png /></span>')
    }
    while (value.indexOf('[比心]') >= 0) {
        value = value.replace('[比心]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/比心.png /></span>')
    }
    while (value.indexOf('[鄙视]') >= 0) {
        value = value.replace('[鄙视]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/鄙视.png /></span>')
    }
    while (value.indexOf('[闭嘴]') >= 0) {
        value = value.replace('[闭嘴]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/闭嘴.png /></span>')
    }
    while (value.indexOf('[不开心]') >= 0) {
        value = value.replace('[不开心]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/不开心.png /></span>')
    }
    while (value.indexOf('[财迷]') >= 0) {
        value = value.replace('[财迷]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/财迷.png /></span>')
    }
    while (value.indexOf('[打脸]') >= 0) {
        value = value.replace('[打脸]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/打脸.png /></span>')
    }
    while (value.indexOf('[大便]') >= 0) {
        value = value.replace('[大便]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/大便.png /></span>')
    }
    while (value.indexOf('[蛋糕]') >= 0) {
        value = value.replace('[蛋糕]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/蛋糕.png /></span>')
    }
    while (value.indexOf('[得意]') >= 0) {
        value = value.replace('[得意]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/得意.png /></span>')
    }
    while (value.indexOf('[饿]') >= 0) {
        value = value.replace('[饿]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/饿.png /></span>')
    }
    while (value.indexOf('[飞吻]') >= 0) {
        value = value.replace('[飞吻]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/飞吻.png /></span>')
    }
    while (value.indexOf('[肥皂]') >= 0) {
        value = value.replace('[肥皂]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/肥皂.png /></span>')
    }
    while (value.indexOf('[愤怒]') >= 0) {
        value = value.replace('[愤怒]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/愤怒.png /></span>')
    }
    while (value.indexOf('[扶眼镜]') >= 0) {
        value = value.replace('[扶眼镜]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/扶眼镜.png /></span>')
    }
    while (value.indexOf('[尴尬]') >= 0) {
        value = value.replace('[尴尬]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/尴尬.png /></span>')
    }
    while (value.indexOf('[干杯]') >= 0) {
        value = value.replace('[干杯]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/干杯.png /></span>')
    }
    while (value.indexOf('[勾引]') >= 0) {
        value = value.replace('[勾引]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/勾引.png /></span>')
    }
    while (value.indexOf('[狗]') >= 0) {
        value = value.replace('[狗]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/狗.png /></span>')
    }
    while (value.indexOf('[鼓掌]') >= 0) {
        value = value.replace('[鼓掌]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/鼓掌.png /></span>')
    }
    while (value.indexOf('[鬼脸]') >= 0) {
        value = value.replace('[鬼脸]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/鬼脸.png /></span>')
    }
    while (value.indexOf('[哈哈]') >= 0) {
        value = value.replace('[哈哈]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/哈哈.png /></span>')
    }
    while (value.indexOf('[害羞]') >= 0) {
        value = value.replace('[害羞]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/害羞.png /></span>')
    }
    while (value.indexOf('[汗]') >= 0) {
        value = value.replace('[汗]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/汗.png /></span>')
    }
    while (value.indexOf('[花]') >= 0) {
        value = value.replace('[花]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/花.png /></span>')
    }
    while (value.indexOf('[花心]') >= 0) {
        value = value.replace('[花心]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/花心.png /></span>')
    }
    while (value.indexOf('[滑稽]') >= 0) {
        value = value.replace('[滑稽]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/滑稽.png /></span>')
    }
    while (value.indexOf('[坏笑]') >= 0) {
        value = value.replace('[坏笑]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/坏笑.png /></span>')
    }
    while (value.indexOf('[机智]') >= 0) {
        value = value.replace('[机智]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/机智.png /></span>')
    }
    while (value.indexOf('[加一]') >= 0) {
        value = value.replace('[加一]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/加一.png /></span>')
    }
    while (value.indexOf('[加油]') >= 0) {
        value = value.replace('[加油]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/加油.png /></span>')
    }
    while (value.indexOf('[剪刀手]') >= 0) {
        value = value.replace('[剪刀手]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/剪刀手.png /></span>')
    }
    while (value.indexOf('[惊恐]') >= 0) {
        value = value.replace('[惊恐]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/惊恐.png /></span>')
    }
    while (value.indexOf('[惊讶]') >= 0) {
        value = value.replace('[惊讶]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/惊讶.png /></span>')
    }
    while (value.indexOf('[囧]') >= 0) {
        value = value.replace('[囧]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/囧.png /></span>')
    }
    while (value.indexOf('[举个例子]') >= 0) {
        value = value.replace('[举个例子]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/举个例子.png /></span>')
    }
    while (value.indexOf('[瞌睡]') >= 0) {
        value = value.replace('[瞌睡]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/瞌睡.png /></span>')
    }
    while (value.indexOf('[可怜]') >= 0) {
        value = value.replace('[可怜]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/可怜.png /></span>')
    }
    while (value.indexOf('[哭笑]') >= 0) {
        value = value.replace('[哭笑]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/哭笑.png /></span>')
    }
    while (value.indexOf('[酷]') >= 0) {
        value = value.replace('[酷]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/酷.png /></span>')
    }
    while (value.indexOf('[拉勾]') >= 0) {
        value = value.replace('[拉勾]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/拉勾.png /></span>')
    }
    while (value.indexOf('[雷焦]') >= 0) {
        value = value.replace('[雷焦]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/雷焦.png /></span>')
    }
    while (value.indexOf('[泪]') >= 0) {
        value = value.replace('[泪]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/泪.png /></span>')
    }
    while (value.indexOf('[冷]') >= 0) {
        value = value.replace('[冷]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/冷.png /></span>')
    }
    while (value.indexOf('[礼物]') >= 0) {
        value = value.replace('[礼物]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/礼物.png /></span>')
    }
    while (value.indexOf('[流鼻血]') >= 0) {
        value = value.replace('[流鼻血]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/流鼻血.png /></span>')
    }
    while (value.indexOf('[猫]') >= 0) {
        value = value.replace('[猫]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/猫.png /></span>')
    }
    while (value.indexOf('[摸头]') >= 0) {
        value = value.replace('[摸头]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/摸头.png /></span>')
    }
    while (value.indexOf('[目瞪口呆]') >= 0) {
        value = value.replace('[目瞪口呆]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/目瞪口呆.png /></span>')
    }
    while (value.indexOf('[凝视]') >= 0) {
        value = value.replace('[凝视]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/凝视.png /></span>')
    }
    while (value.indexOf('[呕吐]') >= 0) {
        value = value.replace('[呕吐]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/呕吐.png /></span>')
    }
    while (value.indexOf('[咆哮]') >= 0) {
        value = value.replace('[咆哮]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/咆哮.png /></span>')
    }
    while (value.indexOf('[喷]') >= 0) {
        value = value.replace('[喷]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/喷.png /></span>')
    }
    while (value.indexOf('[屁股]') >= 0) {
        value = value.replace('[屁股]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/屁股.png /></span>')
    }
    while (value.indexOf('[生病]') >= 0) {
        value = value.replace('[生病]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/生病.png /></span>')
    }
    while (value.indexOf('[衰]') >= 0) {
        value = value.replace('[衰]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/衰.png /></span>')
    }
    while (value.indexOf('[思考]') >= 0) {
        value = value.replace('[思考]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/思考.png /></span>')
    }
    while (value.indexOf('[摊手]') >= 0) {
        value = value.replace('[摊手]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/摊手.png /></span>')
    }
    while (value.indexOf('[舔屏]') >= 0) {
        value = value.replace('[舔屏]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/舔屏.png /></span>')
    }
    while (value.indexOf('[偷笑]') >= 0) {
        value = value.replace('[偷笑]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/偷笑.png /></span>')
    }
    while (value.indexOf('[吐舌头]') >= 0) {
        value = value.replace('[吐舌头]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/吐舌头.png /></span>')
    }
    while (value.indexOf('[挖鼻孔]') >= 0) {
        value = value.replace('[挖鼻孔]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/挖鼻孔.png /></span>')
    }
    while (value.indexOf('[晚安]') >= 0) {
        value = value.replace('[晚安]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/晚安.png /></span>')
    }
    while (value.indexOf('[微笑]') >= 0) {
        value = value.replace('[微笑]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/微笑.png /></span>')
    }
    while (value.indexOf('[围观]') >= 0) {
        value = value.replace('[围观]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/围观.png /></span>')
    }
    while (value.indexOf('[委屈]') >= 0) {
        value = value.replace('[委屈]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/委屈.png /></span>')
    }
    while (value.indexOf('[握手]') >= 0) {
        value = value.replace('[握手]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/握手.png /></span>')
    }
    while (value.indexOf('[污]') >= 0) {
        value = value.replace('[污]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/污.png /></span>')
    }
    while (value.indexOf('[无聊]') >= 0) {
        value = value.replace('[无聊]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/无聊.png /></span>')
    }
    while (value.indexOf('[捂脸]') >= 0) {
        value = value.replace('[捂脸]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/捂脸.png /></span>')
    }
    while (value.indexOf('[嘻嘻]') >= 0) {
        value = value.replace('[嘻嘻]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/嘻嘻.png /></span>')
    }
    while (value.indexOf('[斜眼]') >= 0) {
        value = value.replace('[斜眼]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/斜眼.png /></span>')
    }
    while (value.indexOf('[心]') >= 0) {
        value = value.replace('[心]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/心.png /></span>')
    }
    while (value.indexOf('[心碎]') >= 0) {
        value = value.replace('[心碎]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/心碎.png /></span>')
    }
    while (value.indexOf('[仰慕]') >= 0) {
        value = value.replace('[仰慕]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/仰慕.png /></span>')
    }
    while (value.indexOf('[疑问]') >= 0) {
        value = value.replace('[疑问]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/疑问.png /></span>')
    }
    while (value.indexOf('[右哼哼]') >= 0) {
        value = value.replace('[右哼哼]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/右哼哼.png /></span>')
    }
    while (value.indexOf('[晕]') >= 0) {
        value = value.replace('[晕]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/晕.png /></span>')
    }
    while (value.indexOf('[砸死你]') >= 0) {
        value = value.replace('[砸死你]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/砸死你.png /></span>')
    }
    while (value.indexOf('[再见]') >= 0) {
        value = value.replace('[再见]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/再见.png /></span>')
    }
    while (value.indexOf('[猪鼻子]') >= 0) {
        value = value.replace('[猪鼻子]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/猪鼻子.png /></span>')
    }
    while (value.indexOf('[抓狂]') >= 0) {
        value = value.replace('[抓狂]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/抓狂.png /></span>')
    }
    while (value.indexOf('[左哼哼]') >= 0) {
        value = value.replace('[左哼哼]', '<span class="live-chat-emotion"><img src=//img.17kuxiu.com/web/live/img/emotion/左哼哼.png /></span>')
    }
    return value
}

export const displayMsgItem = (item, index, anchorId, anchorNickName, fetchTargetUserInfo, userId, anchorLevel, anchorAvatar, medalList, isHttps) => {
    let msg
    let msg1st
    let msg2st
    let idx
    let isAnchor
    let manager
    let guard
    let imgUrl
    let tempMsg
    let medal
    switch (item.msgType) {
        case -1:
            const familyContact = typeof window !== "undefined" ? (window.localStorage.getItem('kx_live_family') || '') : ''
            msg = (
                <div className="msg" key={index}>
                    <div className="info type1">
                        <div className="content system">{'直播提示：酷秀倡导绿色文明直播，封面和直播内容涉及政治、色情、暴力、吸烟、赌博等违法不良信息将被封停账号。文明直播，从我做起。【网警24小时在线巡查】'}</div>
                        <div className="content system">{familyContact}</div>
                    </div>
                </div>
            )
            break
        case 0:
            if (item.message && item.userId && item.nickname) {
                isAnchor = _.parseInt(item.userId) === anchorId
                imgUrl = !isAnchor ? `${urlCdnLvUser}/user${item.userLevel || 0}.png` : `${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`
                manager = (
                    item.roomManage === 1
                        ?
                        <span className="level manager">
                            <img src={managerImg} alt='' />
                        </span>
                        :
                        null
                )
                guard = (
                    item.guardType > 0
                        ?
                        <span className={item.guardType > 2 ? "level guard-2" : "level guard-1"}>
                            <img src={initGuardTypeImg(item.guardType)} alt='' />
                        </span>
                        :
                        null
                )
                medal = (
                    item.medal > 0
                        ?
                        <span className="level">
                            <img className="level-img" src={initMedalImg(item.medal, medalList)} alt='' />
                        </span>
                        :
                        null
                )
                tempMsg = matchEmotionImg(escapeHtml(item.message))
                msg = (
                    <div className="msg" key={index} onClick={e => fetchTargetUserInfo(e, item.userId, false)}>
                        <div className="avatar">
                            <img src={formatUserAvatar(item.avatar)} alt="" />
                        </div>
                        <div className="info">
                            <div className="clearfix">
                                <span className="level"><img className="level-img" src={imgUrl} alt='' /></span>
                                {medal}{manager}{guard}
                                <span className={isAnchor ? "nickname anchor" : "nickname user"}>{item.nickname || ''}</span>
                            </div>
                            <div className={item.type === 1 ? "content system" : "content"} dangerouslySetInnerHTML={{ __html: tempMsg || '' }}></div>
                        </div>
                    </div>
                )
            } else {
                msg = null
            }
            break
        case 5:
            if (item.userId && item.nickname) {
                isAnchor = item.userId === anchorId
                imgUrl = !isAnchor ? `${urlCdnLvUser}/user${item.userLevel || 0}.png` : `${urlCdnLvUser}/anchor${anchorLevel || 0}.png`
                manager = (
                    item.roomManage === 1
                        ?
                        <span className="level manager">
                            <img src={managerImg} alt='' />
                        </span>
                        :
                        null
                )
                guard = (
                    item.guardType > 0
                        ?
                        <span className={item.guardType > 2 ? "level guard-2" : "level guard-1"}>
                            <img src={initGuardTypeImg(item.guardType)} alt='' />
                        </span>
                        :
                        null
                )
                const follow = (
                    item.userId === userId
                        ?
                        <div className="msg" onClick={e => fetchTargetUserInfo(e, anchorId, true)}>
                            <div className="avatar">
                                <img src={formatUserAvatar(anchorAvatar)} alt="" />
                            </div>
                            <div className="info">
                                <div className="clearfix">
                                    <span className="nickname anchor">{anchorNickName || ''}&nbsp;</span>
                                </div>
                                <div className="content system">悄悄对你说：感谢亲的关注，么么哒！</div>
                            </div>
                        </div>
                        :
                        null
                )
                msg = (
                    item.follow === 1
                        ?
                        <div key={index}>
                            <div className="msg" onClick={e => fetchTargetUserInfo(e, item.userId, false)}>
                                <div className="avatar">
                                    <img src={formatUserAvatar(item.avatar)} alt="" />
                                </div>
                                <div className="info">
                                    <div className="clearfix">
                                        <span className="level"><img className="level-img" src={imgUrl} alt='' /></span>
                                        {manager}{guard}
                                        <span className="nickname user">{item.nickname || ''}</span>
                                    </div>
                                    <div className="content system">关注了主播</div>
                                </div>
                            </div>
                            {follow}
                        </div>
                        :
                        null
                )
            } else {
                msg = null
            }
            break
        case 6:
            if (item.type === 1) {
                msg = (
                    item.anchorLevel
                        ?
                        <div className="msg type1" key={index} onClick={e => fetchTargetUserInfo(e, anchorId, true)}>
                            <div className="info type2">
                                <div className="content system">系统提示：感谢大家支持，
                                    主播&nbsp;升到了LV{item.anchorLevel}
                                </div>
                            </div>
                        </div>
                        :
                        null
                )
            } else {
                msg = (
                    item.nickname && item.userLevel && item.userId
                        ?
                        <div className="msg type1" key={index} onClick={e => fetchTargetUserInfo(e, item.userId, false)}>
                            <div className="info type2">
                                <div className="content system">系统提示：
                                    <span className="user">{item.nickname || ''}</span>&nbsp;升到了LV{item.userLevel}
                                </div>
                            </div>
                        </div>
                        :
                        null
                )
            }
            break
        case 7:
            msg = (
                item.nickname && item.userId
                    ?
                    <div className="msg type1" key={index}>
                        <div className="info type2">
                            <div className="content user">
                                <span className="system">系统提示：</span>
                                <span onClick={e => fetchTargetUserInfo(e, item.userId, false)}>{item.nickname || ''}</span>&nbsp;
                                <span className="system">被</span>&nbsp;
                                {
                                    item.operatorId === anchorId
                                        ?
                                        <span className="anchor" onClick={e => fetchTargetUserInfo(e, item.operatorId, true)}>{item.operatorNickname || ''}</span>
                                        :
                                        <span className="user" onClick={e => fetchTargetUserInfo(e, item.operatorId, false)}>{item.operatorNickname || ''}</span>

                                }&nbsp;
                                <span className="system">{item.type === 1 ? '禁言' : '解除禁言'}</span>
                            </div>
                        </div>
                    </div>
                    :
                    null
            )
            break
        case 8:
            msg = (
                item.nickname && item.userId
                    ?
                    <div className="msg type1" key={index}>
                        <div className="info type2">
                            <div className="content user">
                                <span className="system">系统提示：</span>
                                <span onClick={e => fetchTargetUserInfo(e, item.userId, false)}>{item.nickname || ''}</span>&nbsp;
                                <span className="system">被</span>&nbsp;
                                <span className="anchor" onClick={e => fetchTargetUserInfo(e, anchorId, true)}>{anchorNickName || ''}</span>&nbsp;
                                <span className="system">{item.type === 1 ? '设置为管理员' : '解除管理员权限'}</span>
                            </div>
                        </div>
                    </div>
                    :
                    null
            )
            break
        case 9:
            msg = (
                item.nickname && item.userId
                    ?
                    <div className="msg type1" key={index}>
                        <div className="info type2">
                            <div className="content user">
                                <span className="system">系统提示：</span>
                                <span onClick={e => fetchTargetUserInfo(e, item.userId, false)}>{item.nickname || ''}</span>&nbsp;
                                <span className="system">被</span>&nbsp;
                                {
                                    item.operatorId === anchorId
                                        ?
                                        <span className="anchor" onClick={e => fetchTargetUserInfo(e, item.operatorId, true)}>{item.operatorNickname || ''}</span>
                                        :
                                        <span className="user" onClick={e => fetchTargetUserInfo(e, item.operatorId, false)}>{item.operatorNickname || ''}</span>
                                }&nbsp;
                                <span className="system">踢出了房间</span>
                            </div>
                        </div>
                    </div>
                    :
                    null
            )
            break
        case 10:
            msg = (
                item.guardName && item.guardType > 0 && item.nickname
                    ?
                    <div className="msg type1" key={index}>
                        <div className="info type2">
                            <div className="content system">
                                <span className="system">系统提示：</span>
                                <span className="user" onClick={e => fetchTargetUserInfo(e, item.userId, false)}>{item.nickname || ''}</span>&nbsp;
                                <span className="system">购买了&nbsp;{item.guardName}</span>
                            </div>
                        </div>
                    </div>
                    :
                    null
            )
            break
        case 11:
            if (item.message && item.userId && item.nickname) {
                isAnchor = item.userId === anchorId
                imgUrl = !isAnchor ? `${urlCdnLvUser}/user${item.userLevel || 0}.png` : `${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`
                manager = (
                    item.roomManage === 1
                        ?
                        <span className="level manager">
                            <img src={managerImg} alt='' />
                        </span>
                        :
                        null
                )
                guard = (
                    item.guardType > 0
                        ?
                        <span className={item.guardType > 2 ? "level guard-2" : "level guard-1"}>
                            <img src={initGuardTypeImg(item.guardType)} alt='' />
                        </span>
                        :
                        null
                )
                medal = (
                    item.medal > 0
                        ?
                        <span className="level">
                            <img className="level-img" src={initMedalImg(item.medal, medalList)} alt='' />
                        </span>
                        :
                        null
                )
                tempMsg = matchEmotionImg(escapeHtml(item.message))
                msg = (
                    <div className="msg" key={index} onClick={e => fetchTargetUserInfo(e, item.userId, false)}>
                        <div className="avatar">
                            <img src={formatUserAvatar(item.avatar)} alt="" />
                        </div>
                        <div className="info">
                            <div className="clearfix">
                                <span className="level"><img className="level-img" src={imgUrl} alt='' /></span>
                                {medal}{manager}{guard}
                                <span className="nickname user">{item.nickname || ''}</span>
                            </div>
                            <div className="content tanmu" dangerouslySetInnerHTML={{ __html: tempMsg || '' }}></div>
                        </div>
                    </div>
                )
            } else {
                msg = null
            }
            break
        case 12:
            if (item.userId && item.nickname && item.count && item.iconUrl) {
                isAnchor = item.userId === anchorId
                imgUrl = !isAnchor ? `${urlCdnLvUser}/user${item.userLevel || 0}.png` : `${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`
                manager = (
                    item.roomManage === 1
                        ?
                        <span className="level manager">
                            <img src={managerImg} alt='' />
                        </span>
                        :
                        null
                )
                guard = (
                    item.guardType > 0
                        ?
                        <span className={item.guardType > 2 ? "level guard-2" : "level guard-1"}>
                            <img src={initGuardTypeImg(item.guardType)} alt='' />
                        </span>
                        :
                        null
                )
                medal = (
                    item.medal > 0
                        ?
                        <span className="level">
                            <img className="level-img" src={initMedalImg(item.medal, medalList)} alt='' />
                        </span>
                        :
                        null
                )
                msg = (
                    <div className="msg" key={index} onClick={e => fetchTargetUserInfo(e, item.userId, false)}>
                        <div className="avatar">
                            <img src={formatUserAvatar(item.avatar)} alt="" />
                        </div>
                        <div className="info">
                            <div className="clearfix">
                                <span className="level"><img className="level-img" src={imgUrl} alt='' /></span>
                                {medal}{manager}{guard}
                                <span className="nickname user">{item.nickname || ''}</span>
                            </div>
                            <div className="content system">
                                {`送了${item.count}个${item.giftType === 3 ? '守护礼物 ' : ''}${item.giftName}`}
                                <img src={item.iconUrl} alt='' />
                            </div>
                        </div>
                    </div>
                )
            } else {
                msg = null
            }
            break
        case 13:
            if (item.userId && item.nickname) {
                isAnchor = item.userId === anchorId
                imgUrl = !isAnchor ? `${urlCdnLvUser}/user${item.userLevel || 0}.png` : `${urlCdnLvAnchor}/anchor${item.anchorLevel || 0}.png`
                manager = (
                    item.roomManage === 1
                        ?
                        <span className="level manager">
                            <img src={managerImg} alt='' />
                        </span>
                        :
                        null
                )
                guard = (
                    item.guardType > 0
                        ?
                        <span className={item.guardType > 2 ? "level guard-2" : "level guard-1"}>
                            <img src={initGuardTypeImg(item.guardType)} alt='' />
                        </span>
                        :
                        null
                )
                medal = (
                    item.medal > 0
                        ?
                        <span className="level">
                            <img className="level-img" src={initMedalImg(item.medal, medalList)} alt='' />
                        </span>
                        :
                        null
                )
                msg = (
                    <div className="msg type1" key={index} onClick={e => fetchTargetUserInfo(e, item.userId, false)}>
                        <div className="info type2">
                            <div className="clearfix">
                                <span className="level"><img className="level-img" src={imgUrl} alt='' /></span>
                                {medal}{manager}{guard}
                                <span className="nickname user">{item.nickname || ''}</span>
                                <span className="nickname system">进入了直播间</span>
                            </div>
                        </div>
                    </div>
                )
            } else {
                msg = null
            }
            break
        case 14:
            if (item.message && item.type && item.type === 1) {
                msg = (
                    <div className="msg type1" key={index}>
                        <div className="info type2">
                            <div className="content system">
                                系统提示：{item.message}
                            </div>
                        </div>
                    </div>
                )
            } else {
                msg = null
            }
            break
        case 15:
            if (item.mvpNickName) {
                msg = (
                    <div className="msg type1" key={index} onClick={e => fetchTargetUserInfo(e, item.mvpUserId, false)}>
                        <div className="info type2">
                            <div className="content system">
                                系统提示：恭喜 <span className="content user">{item.mvpNickName}</span> 获得本场MVP，快来围观吧！
                            </div>
                        </div>
                    </div>
                )
            } else {
                msg = null
            }
            break
        case 16:
            if (anchorNickName) {
                msg = (
                    <div className="msg type1" key={index} onClick={e => fetchTargetUserInfo(e, anchorId, true)}>
                        <div className="info type2">
                            <div className="content system">
                                系统提示：在各位宝宝的支持下，我们的主播 <span className="content anchor">{anchorNickName}</span> PK获得胜利啦～欢呼庆祝下！
                            </div>
                        </div>
                    </div>
                )
            } else {
                msg = null
            }
            break
        case 17:
            if (anchorNickName) {
                msg = (
                    <div className="msg type1" key={index} onClick={e => fetchTargetUserInfo(e, anchorId, true)}>
                        <div className="info type2">
                            <div className="content system">
                                系统提示：很遗憾，我们的主播 <span className="content anchor">{anchorNickName}</span> PK失利～我们一起安慰下主播吧
                            </div>
                        </div>
                    </div>
                )
            } else {
                msg = null
            }
            break
        default:
            break
    }
    return msg
}

export const isLiving = (roomIdentity, msgIdentity) => {
    if (!roomIdentity || !msgIdentity) {
        return true
    }
    return roomIdentity === msgIdentity
}