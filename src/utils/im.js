let curPlayAudio = null

export const convertTextMsgToHtml = (content) => {
    return content.getText()
}

export const convertFaceMsgToHtml = (content) => {
    let faceUrl = null
    const data = content.getData()
    const index = webim.EmotionDataIndexs[data]
    const emotion = webim.Emotions[index]
    if (emotion && emotion[1]) {
        faceUrl = emotion[1]
    }
    if (faceUrl) {
        return `<img src='${faceUrl}'/>`
    }
    return data
}

export const convertImageMsgToHtml = (content) => {
    const smallImage = content.getImage(webim.IMAGE_TYPE.SMALL)
    let bigImage = content.getImage(webim.IMAGE_TYPE.LARGE)
    let oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN)
    if (!bigImage) {
        bigImage = smallImage
    }
    if (!oriImage) {
        oriImage = smallImage
    }
    return `<img src='${smallImage.getUrl()}#${bigImage.getUrl()}#${oriImage.getUrl()}' style='CURSOR: hand' id='${content.getImageId()}' bigImgUrl='${bigImage.getUrl()}' onclick='imageClick(this)' />`
}

export const convertSoundMsgToHtml = (content) => {
    // const second = content.getSecond()
    const downUrl = content.getDownUrl()
    if (webim.BROWSER_INFO.type === 'ie' && parseInt(webim.BROWSER_INFO.ver, 10) <= 8) {
        return `[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:${downUrl}`
    }
    return `<audio src="${downUrl}" controls="controls" onplay="this.onChangePlayAudio(this)" preload="none"></audio>`
}

export const convertFileMsgToHtml = (content) => {
    const fileSize = Math.round(content.getSize() / 1024)
    return `<a href="${content.getDownUrl()}" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;${content.getName()}(${fileSize}KB)</i></a>`
}

export const convertCustomMsgToHtml = (content) => {
    const data = content.getData()
    // const desc = content.getDesc()
    // const ext = content.getExt()
    return `${data}`
}

export const convertMsgToHtml = (msg) => {
    let html = ""
    let elem
    let type
    let content
    const elems = msg.getElems()
    for (const i in elems) {
        elem = elems[i]
        type = elem.getType()
        content = elem.getContent()
        switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
                html += convertTextMsgToHtml(content)
                break
            // case webim.MSG_ELEMENT_TYPE.FACE:
            //     html += convertFaceMsgToHtml(content)
            //     break
            case webim.MSG_ELEMENT_TYPE.IMAGE:
                html += convertImageMsgToHtml(content)
                break
            case webim.MSG_ELEMENT_TYPE.SOUND:
                html += convertSoundMsgToHtml(content)
                break
            case webim.MSG_ELEMENT_TYPE.FILE:
                html += convertFileMsgToHtml(content)
                break
            case webim.MSG_ELEMENT_TYPE.CUSTOM:
                html += convertCustomMsgToHtml(content)
                break
            case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                html += ''
                break
            default:
                // webim.Log.error('未知消息元素类型: elemType=' + type)
                break
        }
    }
    return webim.Tool.formatHtml2Text(html)
}

export const handleMsg = (msg) => {
    let fromAccount
    let fromAccountNick
    let contentHtml
    fromAccount = msg.getFromAccount()
    if (!fromAccount) {
        fromAccount = ''
    }
    fromAccountNick = msg.getFromAccountNick()
    if (!fromAccountNick) {
        fromAccountNick = fromAccount
    }
    const sessType = msg.getSession().type()
    const subType = msg.getSubType()
    switch (sessType) {
        case webim.SESSION_TYPE.C2C:
            switch (subType) {
                case webim.C2C_MSG_SUB_TYPE.COMMON:
                    contentHtml = JSON.parse(convertMsgToHtml(msg))
                    // webim.Log.warn('receive a new c2c msg: fromAccountNick=' + fromAccountNick + ", content=" + contentHtml)
                    const opts = {
                        'To_Account': fromAccount,
                        'LastedMsgTime': msg.getTime(),
                    }
                    webim.c2CMsgReaded(opts)
                    break
                default:
                    break
            }
            break
        case webim.SESSION_TYPE.GROUP:
            const html = convertMsgToHtml(msg)
            contentHtml = html ? JSON.parse(html) : ''
            break
        default:
            break
    }
    return contentHtml
}

export const onChangePlayAudio = (obj) => {
    if (curPlayAudio) {
        if (curPlayAudio !== obj) {
            curPlayAudio.currentTime = 0
            curPlayAudio.pause()
            curPlayAudio = obj
        }
    } else {
        curPlayAudio = obj
    }
}

export const checkMsg = (msgToSend, selType) => {
    const msgLen = webim.Tool.getStrBytes(msgToSend)
    if (msgToSend.length < 1) {
        return false
    }
    let maxLen
    // let errInfo
    if (selType === webim.SESSION_TYPE.GROUP) {
        maxLen = webim.MSG_MAX_LENGTH.GROUP
        // errInfo = `消息长度超出限制(最多${Math.round(maxLen / 3)}汉字)`
    } else {
        maxLen = webim.MSG_MAX_LENGTH.C2C
        // errInfo = `消息长度超出限制(最多${Math.round(maxLen / 3)}汉字)`
    }
    if (msgLen > maxLen) {
        // alert(errInfo)
        return false
    }
    return true
}

export const sendMsg = (message, selSess, selType, userId, nickname, userLevel, anchorLevel, roomManage, anchorId, guardType, avatar, medal) => {
    const isSend = true
    const seq = -1
    const random = Math.round(Math.random() * 4294967296)
    const msgTime = Math.round(new Date().getTime() / 1000)
    let subType
    if (selType === webim.SESSION_TYPE.GROUP) {
        subType = webim.GROUP_MSG_SUB_TYPE.COMMON
    } else {
        subType = webim.C2C_MSG_SUB_TYPE.COMMON
    }
    const msg = new webim.Msg(selSess, isSend, seq, random, msgTime, userId, subType, nickname)
    // const expr = /\[[^[\]]{1,3}\]/mg
    // const emotions = msgToSend.match(expr)
    let text_obj
    // let face_obj let tmsg let emotionIndex let emotion let restMsgIndex
    // if (emotions && emotions.length >= 1) {
    //     for (let i = 0 i < emotions.length i++) {
    //         tmsg = msgToSend.substring(0, msgToSend.indexOf(emotions[i]))
    //         if (tmsg) {
    //             text_obj = new webim.Msg.Elem.Text(tmsg)
    //             msg.addText(text_obj)
    //         }
    //         emotionIndex = webim.EmotionDataIndexs[emotions[i]]
    //         emotion = webim.Emotions[emotionIndex]
    //         if (emotion) {
    //             face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i])
    //             msg.addFace(face_obj)
    //         } else {
    //             text_obj = new webim.Msg.Elem.Text(emotions[i])
    //             msg.addText(text_obj)
    //         }
    //         restMsgIndex = msgToSend.indexOf(emotions[i]) + emotions[i].length
    //         msgToSend = msgToSend.substring(restMsgIndex)
    //     }
    // }
    if (message) {
        const data = {
            roomManage,
            guardType,
            message,
            anchorLevel,
            nickname,
            userId,
            userLevel,
            avatar,
            medal
        }
        const msgJson = {
            groupId: anchorId,
            retCode: 10,
            data,
        }
        text_obj = new webim.Msg.Elem.Text(JSON.stringify(msgJson))
        msg.addText(text_obj)
    }
    return msg
}