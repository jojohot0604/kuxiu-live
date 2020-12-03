const baseUrl = {
    pre: "/api_pre",
    prd: "/api_prd",
    cdnLvUser: '//img.17kuxiu.com/web/live/kuxiu/img/userLv',
    cdnLvAnchor: '//img.17kuxiu.com/level/icon/anchor',
    cdnEmotion: '//img.17kuxiu.com/web/kx1.0/emotion',
    cdnLive: '//img.17kuxiu.com/web/live/kuxiu/img',
    cdnGift: '//img.17kuxiu.com/gift/title',
    cdnKuxiu: '//img.17kuxiu.com/web/live/img',
    cdnBank: '//img.17kuxiu.com/web/live/img/bank',
    cdnSite: '//img.17kuxiu.com/web/kx-site',
}

export const emotionArray = [
    `${baseUrl.cdnEmotion}/哭笑.png`,
    `${baseUrl.cdnEmotion}/微笑.png`,
    `${baseUrl.cdnEmotion}/哈哈.png`,
    `${baseUrl.cdnEmotion}/嘻嘻.png`,
    `${baseUrl.cdnEmotion}/偷笑.png`,
    `${baseUrl.cdnEmotion}/得意.png`,
    `${baseUrl.cdnEmotion}/滑稽.png`,
    `${baseUrl.cdnEmotion}/飞吻.png`,
    `${baseUrl.cdnEmotion}/打脸.png`,
    `${baseUrl.cdnEmotion}/挖鼻孔.png`,
    `${baseUrl.cdnEmotion}/摊手.png`,
    `${baseUrl.cdnEmotion}/无聊.png`,
    `${baseUrl.cdnEmotion}/BINGO.png`,
    `${baseUrl.cdnEmotion}/疑问.png`,
    `${baseUrl.cdnEmotion}/委屈.png`,
    `${baseUrl.cdnEmotion}/害羞.png`,
    `${baseUrl.cdnEmotion}/汗.png`,
    `${baseUrl.cdnEmotion}/冷.png`,
    `${baseUrl.cdnEmotion}/斜眼.png`,
    `${baseUrl.cdnEmotion}/尴尬.png`,
    `${baseUrl.cdnEmotion}/鼓掌.png`,
    `${baseUrl.cdnEmotion}/机智.png`,
    `${baseUrl.cdnEmotion}/污.png`,
    `${baseUrl.cdnEmotion}/捂脸.png`,
    `${baseUrl.cdnEmotion}/扶眼镜.png`,
    `${baseUrl.cdnEmotion}/惊恐.png`,
    `${baseUrl.cdnEmotion}/咆哮.png`,
    `${baseUrl.cdnEmotion}/泪.png`,
    `${baseUrl.cdnEmotion}/可怜.png`,
    `${baseUrl.cdnEmotion}/思考.png`,
    `${baseUrl.cdnEmotion}/仰慕.png`,
    `${baseUrl.cdnEmotion}/酷.png`,
    `${baseUrl.cdnEmotion}/流鼻血.png`,
    `${baseUrl.cdnEmotion}/吐舌头.png`,
    `${baseUrl.cdnEmotion}/愤怒.png`,
    `${baseUrl.cdnEmotion}/NO.png`,
    `${baseUrl.cdnEmotion}/鄙视.png`,
    `${baseUrl.cdnEmotion}/喷.png`,
    `${baseUrl.cdnEmotion}/生病.png`,
    `${baseUrl.cdnEmotion}/鬼脸.png`,
    `${baseUrl.cdnEmotion}/悲剧.png`,
    `${baseUrl.cdnEmotion}/摸头.png`,
    `${baseUrl.cdnEmotion}/抓狂.png`,
    `${baseUrl.cdnEmotion}/凝视.png`,
    `${baseUrl.cdnEmotion}/花心.png`,
    `${baseUrl.cdnEmotion}/再见.png`,
    `${baseUrl.cdnEmotion}/目瞪口呆.png`,
    `${baseUrl.cdnEmotion}/呕吐.png`,
    `${baseUrl.cdnEmotion}/闭嘴.png`,
    `${baseUrl.cdnEmotion}/晕.png`,
    `${baseUrl.cdnEmotion}/瞌睡.png`,
    `${baseUrl.cdnEmotion}/衰.png`,
    `${baseUrl.cdnEmotion}/饿.png`,
    `${baseUrl.cdnEmotion}/加油.png`,
    `${baseUrl.cdnEmotion}/财迷.png`,
    `${baseUrl.cdnEmotion}/剪刀手.png`,
    `${baseUrl.cdnEmotion}/坏笑.png`,
    `${baseUrl.cdnEmotion}/不开心.png`,
    `${baseUrl.cdnEmotion}/惊讶.png`,
    `${baseUrl.cdnEmotion}/舔屏.png`,
    `${baseUrl.cdnEmotion}/砸死你.png`,
    `${baseUrl.cdnEmotion}/白眼.png`,
    `${baseUrl.cdnEmotion}/囧.png`,
    `${baseUrl.cdnEmotion}/左哼哼.png`,
    `${baseUrl.cdnEmotion}/右哼哼.png`,
    `${baseUrl.cdnEmotion}/屁股.png`,
    `${baseUrl.cdnEmotion}/雷焦.png`,
    `${baseUrl.cdnEmotion}/GOOD.png`,
    `${baseUrl.cdnEmotion}/BAD.png`,
    `${baseUrl.cdnEmotion}/OK.png`,
    `${baseUrl.cdnEmotion}/ROCK.png`,
    `${baseUrl.cdnEmotion}/握手.png`,
    `${baseUrl.cdnEmotion}/举个例子.png`,
    `${baseUrl.cdnEmotion}/比心.png`,
    `${baseUrl.cdnEmotion}/勾引.png`,
    `${baseUrl.cdnEmotion}/加一.png`,
    `${baseUrl.cdnEmotion}/拉勾.png`,
    `${baseUrl.cdnEmotion}/抱抱.png`,
    `${baseUrl.cdnEmotion}/围观.png`,
    `${baseUrl.cdnEmotion}/花.png`,
    `${baseUrl.cdnEmotion}/大便.png`,
    `${baseUrl.cdnEmotion}/蛋糕.png`,
    `${baseUrl.cdnEmotion}/晚安.png`,
    `${baseUrl.cdnEmotion}/礼物.png`,
    `${baseUrl.cdnEmotion}/心.png`,
    `${baseUrl.cdnEmotion}/心碎.png`,
    `${baseUrl.cdnEmotion}/肥皂.png`,
    `${baseUrl.cdnEmotion}/猪鼻子.png`,
    `${baseUrl.cdnEmotion}/干杯.png`,
    `${baseUrl.cdnEmotion}/狗.png`,
    `${baseUrl.cdnEmotion}/猫.png`
]

export const areaCodeArray = [
    {
        name: '常用国家/地区', value: [
            { name: '中国', value: '86' },
            { name: '中国香港', value: '852' },
            { name: '中国澳门', value: '853' },
            { name: '中国台湾', value: '886' },
            { name: '马来西亚', value: '60' },
            { name: '新加坡', value: '65' },
            { name: '韩国', value: '82' },
            { name: '日本', value: '81' },
            { name: '越南', value: '84' },
            { name: '柬埔寨', value: '855' },
            { name: '老挝', value: '856' },
            { name: '泰国', value: '66' },
            { name: '缅甸', value: '95' },
            { name: '印度', value: '91' }
        ]
    },
    {
        name: 'A', value: [
            {
                'name': '阿布哈兹',
                'value': '7'
            }, {
                'name': '阿尔巴尼亚',
                'value': '355'
            }, {
                'name': '阿尔及利亚',
                'value': '213'
            }, {
                'name': '阿富汗',
                'value': '93'
            }, {
                'name': '阿根廷',
                'value': '54'
            }, {
                'name': '爱尔兰',
                'value': '353'
            }, {
                'name': '埃及',
                'value': '20'
            }, {
                'name': '埃塞俄比亚',
                'value': '251'
            }, {
                'name': '爱沙尼亚',
                'value': '372'
            }, {
                'name': '阿拉伯联合酋长国',
                'value': '971'
            }, {
                'name': '阿鲁巴',
                'value': '297'
            }, {
                'name': '阿曼',
                'value': '968'
            }, {
                'name': '安道尔共和国',
                'value': '376'
            }, {
                'name': '安哥拉',
                'value': '244'
            }, {
                'name': '安圭拉岛',
                'value': '1264'
            }, {
                'name': '安提瓜和巴布达',
                'value': '1268'
            }, {
                'name': '澳大利亚',
                'value': '61'
            }, {
                'name': '奥地利',
                'value': '43'
            }, {
                'name': '阿塞拜疆',
                'value': '994'
            }
        ]
    },
    {
        name: 'B', value: [
            {
                'name': '秘鲁',
                'value': '51'
            }, {
                'name': '巴巴多斯',
                'value': '1246'
            }, {
                'name': '巴布亚新几内亚',
                'value': '675'
            }, {
                'name': '巴哈马',
                'value': '1242'
            }, {
                'name': '白俄罗斯',
                'value': '375'
            }, {
                'name': '百慕大',
                'value': '1441'
            }, {
                'name': '巴基斯坦',
                'value': '92'
            }, {
                'name': '巴拉圭',
                'value': '595'
            }, {
                'name': '巴勒斯坦',
                'value': '970'
            }, {
                'name': '巴林',
                'value': '973'
            }, {
                'name': '巴拿马',
                'value': '507'
            }, {
                'name': '保加利亚',
                'value': '359'
            }, {
                'name': '巴西',
                'value': '55'
            }, {
                'name': '北马里亚纳群岛',
                'value': '1670'
            }, {
                'name': '贝宁',
                'value': '229'
            }, {
                'name': '比利时',
                'value': '32'
            }, {
                'name': '冰岛',
                'value': '354'
            }, {
                'name': '博茨瓦纳',
                'value': '267'
            }, {
                'name': '波多黎各',
                'value': '1787'
            }, {
                'name': '波兰',
                'value': '48'
            }, {
                'name': '帛琉',
                'value': '680'
            }, {
                'name': '玻利维亚',
                'value': '591'
            }, {
                'name': '伯利兹城',
                'value': '501'
            }, {
                'name': '波斯尼亚和黑塞哥维那',
                'value': '387'
            }, {
                'name': '不丹',
                'value': '975'
            }, {
                'name': '布基纳法索',
                'value': '226'
            }, {
                'name': '布隆迪',
                'value': '257'
            }
        ]
    },
    {
        name: 'C', value: [
            {
                'name': '朝鲜',
                'value': '850'
            }, {
                'name': '赤道几内亚',
                'value': '240'
            }
        ]
    },
    {
        name: 'D', value: [
            {
                'name': '丹麦',
                'value': '45'
            }, {
                'name': '德国',
                'value': '49'
            }, {
                'name': '东帝汶',
                'value': '670'
            }, {
                'name': '多哥',
                'value': '228'
            }, {
                'name': '多米尼克国',
                'value': '1767'
            }
        ]
    },
    {
        name: 'E', value: [
            {
                'name': '厄瓜多尔',
                'value': '593'
            }, {
                'name': '厄立特里亚国',
                'value': '291'
            }, {
                'name': '俄罗斯联邦',
                'value': '7'
            }
        ]
    },
    {
        name: 'F', value: [
            {
                'name': '法国',
                'value': '33'
            }, {
                'name': '法国大都会',
                'value': '33'
            }, {
                'name': '法罗群岛',
                'value': '298'
            }, {
                'name': '法属玻里尼西亚',
                'value': '689'
            }, {
                'name': '法属圭亚那',
                'value': '594'
            }, {
                'name': '菲律宾共和国',
                'value': '63'
            }, {
                'name': '芬兰',
                'value': '358'
            }, {
                'name': '佛得角',
                'value': '238'
            }, {
                'name': '福克兰群岛',
                'value': '500'
            }, {
                'name': '梵蒂冈(罗马教廷)',
                'value': '39'
            }, {
                'name': '斐济',
                'value': '679'
            }
        ]
    },
    {
        name: 'G', value: [
            {
                'name': '冈比亚',
                'value': '220'
            }, {
                'name': '刚果',
                'value': '242'
            }, {
                'name': '刚果民主共和国',
                'value': '243'
            }, {
                'name': '格陵兰',
                'value': '45'
            }, {
                'name': '格林纳达',
                'value': '1473'
            }, {
                'name': '格鲁吉亚',
                'value': '995'
            }, {
                'name': '哥伦比亚',
                'value': '57'
            }, {
                'name': '哥斯达黎加',
                'value': '506'
            }, {
                'name': '瓜德罗普岛',
                'value': '590'
            }, {
                'name': '关岛',
                'value': '1671'
            }, {
                'name': '古巴',
                'value': '53'
            }, {
                'name': '圭亚那',
                'value': '592'
            }
        ]
    },
    {
        name: 'H', value: [
            {
                'name': '海地',
                'value': '509'
            }, {
                'name': '韩国',
                'value': '82'
            }, {
                'name': '哈萨克',
                'value': '7'
            }, {
                'name': '黑山共和国',
                'value': '382'
            }, {
                'name': '荷兰',
                'value': '31'
            }, {
                'name': '荷兰安的列斯群岛',
                'value': '599'
            }, {
                'name': '洪都拉斯',
                'value': '504'
            }
        ]
    },
    {
        name: 'J', value: [
            {
                'name': '加纳',
                'value': '233'
            }, {
                'name': '加拿大',
                'value': '1'
            }, {
                'name': '柬埔寨',
                'value': '855'
            }, {
                'name': '加蓬',
                'value': '241'
            }, {
                'name': '吉布提',
                'value': '253'
            }, {
                'name': '捷克',
                'value': '420'
            }, {
                'name': '吉尔吉斯',
                'value': '996'
            }, {
                'name': '津巴布韦',
                'value': '263'
            }, {
                'name': '几内亚',
                'value': '224'
            }, {
                'name': '几内亚比绍',
                'value': '245'
            }
        ]
    },
    {
        name: 'K', value: [
            {
                'name': '开曼群岛',
                'value': '1345'
            }, {
                'name': '喀麦隆',
                'value': '237'
            }, {
                'name': '卡塔尔',
                'value': '974'
            }, {
                'name': '科科斯群岛',
                'value': '61'
            }, {
                'name': '克罗地亚',
                'value': '385'
            }, {
                'name': '科摩罗',
                'value': '269'
            }, {
                'name': '肯尼亚',
                'value': '254'
            }, {
                'name': '科特迪瓦',
                'value': '225'
            }, {
                'name': '科威特',
                'value': '965'
            }, {
                'name': '库克群岛',
                'value': '682'
            }
        ]
    },
    {
        name: 'L', value: [
            {
                'name': '莱索托',
                'value': '266'
            }, {
                'name': '老挝',
                'value': '856'
            }, {
                'name': '拉脱维亚',
                'value': '371'
            }, {
                'name': '黎巴嫩',
                'value': '961'
            }, {
                'name': '利比里亚',
                'value': '231'
            }, {
                'name': '利比亚',
                'value': '218'
            }, {
                'name': '列支敦士登',
                'value': '423'
            }, {
                'name': '立陶宛',
                'value': '370'
            }, {
                'name': '留尼汪岛',
                'value': '262'
            }, {
                'name': '罗马尼亚',
                'value': '40'
            }, {
                'name': '卢森堡',
                'value': '352'
            }, {
                'name': '卢旺达',
                'value': '250'
            }
        ]
    },
    {
        name: 'M', value: [
            {
                'name': '马达加斯加',
                'value': '261'
            }, {
                'name': '马尔代夫',
                'value': '960'
            }, {
                'name': '马尔他',
                'value': '356'
            }, {
                'name': '马来西亚',
                'value': '60'
            }, {
                'name': '马拉维',
                'value': '265'
            }, {
                'name': '马里',
                'value': '223'
            }, {
                'name': '毛里求斯',
                'value': '230'
            }, {
                'name': '毛里塔尼亚',
                'value': '222'
            }, {
                'name': '马其顿',
                'value': '389'
            }, {
                'name': '马绍尔群岛',
                'value': '692'
            }, {
                'name': '马提尼克岛',
                'value': '596'
            }, {
                'name': '马约特',
                'value': '262'
            }, {
                'name': '美国',
                'value': '1'
            }, {
                'name': '美属萨摩亚',
                'value': '685'
            }, {
                'name': '孟加拉国',
                'value': '880'
            }, {
                'name': '蒙特塞拉特',
                'value': '1664'
            }, {
                'name': '缅甸',
                'value': '95'
            }, {
                'name': '密克罗尼西亚',
                'value': '691'
            }, {
                'name': '摩尔多瓦',
                'value': '373'
            }, {
                'name': '摩洛哥',
                'value': '212'
            }, {
                'name': '摩纳哥',
                'value': '377'
            }, {
                'name': '莫桑比克',
                'value': '258'
            }, {
                'name': '墨西哥',
                'value': '52'
            }
        ]
    },
    {
        name: 'N', value: [
            {
                'name': '那米比亚',
                'value': '264'
            }, {
                'name': '南奥赛梯',
                'value': '7'
            }, {
                'name': '南非',
                'value': '27'
            }, {
                'name': '南斯拉夫',
                'value': '381'
            }, {
                'name': '南苏丹共和国',
                'value': '211'
            }, {
                'name': '尼泊尔',
                'value': '977'
            }, {
                'name': '尼加拉瓜',
                'value': '505'
            }, {
                'name': '尼日尔',
                'value': '227'
            }, {
                'name': '尼日利亚',
                'value': '234'
            }, {
                'name': '诺福克岛',
                'value': '6723'
            }, {
                'name': '瑙鲁',
                'value': '674'
            }, {
                'name': '挪威',
                'value': '47'
            }
        ]
    },
    {
        name: 'P', value: [
            {
                'name': '皮特凯恩岛',
                'value': '64'
            }, {
                'name': '葡萄牙',
                'value': '351'
            }
        ]
    },
    {
        name: 'R', value: [
            {
                'name': '日本',
                'value': '81'
            }, {
                'name': '瑞典',
                'value': '46'
            }, {
                'name': '瑞士',
                'value': '41'
            }
        ]
    },
    {
        name: 'S', value: [
            {
                'name': '萨尔瓦多',
                'value': '503'
            }, {
                'name': '塞尔维亚共和国',
                'value': '381'
            }, {
                'name': '塞拉利昂',
                'value': '232'
            }, {
                'name': '塞内加尔',
                'value': '221'
            }, {
                'name': '塞浦路斯',
                'value': '357'
            }, {
                'name': '塞舌尔',
                'value': '248'
            }, {
                'name': '萨摩亚',
                'value': '684'
            }, {
                'name': '沙特阿拉伯',
                'value': '966'
            }, {
                'name': '圣多美和普林西比',
                'value': '239'
            }, {
                'name': '圣基茨和尼维斯',
                'value': '1869'
            }, {
                'name': '圣卢西亚岛',
                'value': '1758'
            }, {
                'name': '圣马丁岛',
                'value': '590'
            }, {
                'name': '圣马力诺共和国',
                'value': '378'
            }, {
                'name': '圣文森特和格林纳丁斯',
                'value': '1784'
            }, {
                'name': '圣延岛',
                'value': '61'
            }, {
                'name': '斯里兰卡',
                'value': '94'
            }, {
                'name': '斯洛伐克（斯洛伐克人的共和国）',
                'value': '421'
            }, {
                'name': '斯洛文尼亚',
                'value': '386'
            }, {
                'name': '斯威士兰',
                'value': '268'
            }, {
                'name': '苏丹',
                'value': '249'
            }, {
                'name': '苏里南',
                'value': '597'
            }, {
                'name': '索罗门群岛',
                'value': '677'
            }, {
                'name': '索马里',
                'value': '252'
            }
        ]
    },
    {
        name: 'T', value: [
            {
                'name': '泰国',
                'value': '66'
            }, {
                'name': '塔吉克',
                'value': '992'
            }, {
                'name': '汤加',
                'value': '676'
            }, {
                'name': '坦桑尼亚',
                'value': '255'
            }, {
                'name': '特立尼达和多巴哥',
                'value': '1868'
            }, {
                'name': '土耳其',
                'value': '90'
            }, {
                'name': '土克斯及开科斯群岛',
                'value': '1809'
            }, {
                'name': '土库曼',
                'value': '993'
            }, {
                'name': '突尼斯',
                'value': '216'
            }, {
                'name': '托克劳',
                'value': '690'
            }, {
                'name': '图瓦卢',
                'value': '688'
            }
        ]
    },
    {
        name: 'W', value: [
            {
                'name': '外蒙古',
                'value': '976'
            }, {
                'name': '瓦努阿图',
                'value': '678'
            }, {
                'name': '危地马拉',
                'value': '502'
            }, {
                'name': '维尔京群岛(美国)',
                'value': '1340'
            }, {
                'name': '委内瑞拉',
                'value': '58'
            }, {
                'name': '文莱达鲁萨兰国',
                'value': '673'
            }, {
                'name': '沃利斯和富图纳群岛',
                'value': '681'
            }, {
                'name': '乌干达',
                'value': '256'
            }, {
                'name': '乌克兰',
                'value': '380'
            }, {
                'name': '乌拉圭',
                'value': '598'
            }, {
                'name': '乌兹别克斯坦',
                'value': '998'
            }
        ]
    },
    {
        name: 'X', value: [
            {
                'name': '西班牙',
                'value': '34'
            }, {
                'name': '希腊',
                'value': '30'
            }, {
                'name': '新加坡',
                'value': '65'
            }, {
                'name': '新喀里多尼亚',
                'value': '687'
            }, {
                'name': '新西兰',
                'value': '64'
            }, {
                'name': '匈牙利',
                'value': '36'
            }, {
                'name': '西撒哈拉',
                'value': '685'
            }, {
                'name': '叙利亚',
                'value': '963'
            }
        ]
    },
    {
        name: 'Y', value: [
            {
                'name': '牙买加',
                'value': '1876'
            }, {
                'name': '亚美尼亚',
                'value': '374'
            }, {
                'name': '也门',
                'value': '967'
            }, {
                'name': '意大利',
                'value': '39'
            }, {
                'name': '伊拉克',
                'value': '964'
            }, {
                'name': '伊朗（伊斯兰共和国）',
                'value': '98'
            }, {
                'name': '印度',
                'value': '91'
            }, {
                'name': '印度尼西亚',
                'value': '62'
            }, {
                'name': '英国',
                'value': '44'
            }, {
                'name': '英属印度洋领地',
                'value': '246'
            }, {
                'name': '以色列',
                'value': '972'
            }, {
                'name': '约旦',
                'value': '962'
            }, {
                'name': '越南',
                'value': '84'
            }
        ]
    },
    {
        name: 'Z', value: [
            {
                'name': '赞比亚',
                'value': '260'
            }, {
                'name': '泽西岛',
                'value': '44'
            }, {
                'name': '乍得',
                'value': '235'
            }, {
                'name': '直布罗陀',
                'value': '350'
            }, {
                'name': '智利',
                'value': '56'
            }, {
                'name': '中非共和国',
                'value': '236'
            }, {
                'name': '中国',
                'value': '86'
            }, {
                'name': '中国澳门',
                'value': '853'
            }, {
                'name': '中国台湾',
                'value': '886'
            }, {
                'name': '中国香港',
                'value': '852'
            }
        ]
    },
]

export const userLvArray = [
    0,
    1000,
    10000,
    30000,
    60000,
    100000,
    200000,
    300000,
    500000,
    700000,
    1000000,
    1500000,
    2000000,
    2500000,
    3000000,
    4000000,
    5000000,
    6000000,
    7000000,
    8000000,
    10000000,
    12000000,
    14000000,
    17000000,
    21000000,
    25000000,
    30000000,
    35000000,
    40000000,
    45000000,
    50000000,
    56000000,
    62000000,
    68000000,
    74000000,
    80000000,
    86000000,
    92000000,
    98000000,
    104000000,
    110000000,
    117000000,
    124000000,
    131000000,
    138000000,
    145000000,
    152000000,
    159000000,
    166000000,
    173000000,
    180000000,
    188000000,
    196000000,
    204000000,
    212000000,
    220000000,
    228000000,
    236000000,
    244000000,
    252000000,
    260000000,
    269000000,
    278000000,
    287000000,
    296000000,
    305000000,
    314000000,
    323000000,
    332000000,
    341000000,
    350000000,
    360000000,
    370000000,
    380000000,
    390000000,
    400000000,
    410000000,
    420000000,
    430000000,
    440000000,
    450000000,
    470000000,
    490000000,
    510000000,
    530000000,
    550000000,
    570000000,
    590000000,
    610000000,
    630000000,
    650000000,
    680000000,
    710000000,
    740000000,
    770000000,
    800000000,
    830000000,
    865000000,
    905000000,
    950000000,
    1000000000,
    1055000000,
    1115000000,
    1180000000,
    1250000000,
    1325000000,
    1405000000,
    1490000000,
    1580000000,
    1675000000,
    1775000000,
    1880000000,
    1990000000,
    2105000000,
    2225000000,
    2350000000,
    2480000000,
    2615000000,
    2755000000,
    2900000000,
    3050000000
]

export const anchorLvArray = [
    0,
    4000,
    40000,
    120000,
    240000,
    400000,
    800000,
    1200000,
    2000000,
    2800000,
    4000000,
    6000000,
    8000000,
    10000000,
    12000000,
    16000000,
    20000000,
    24000000,
    28000000,
    32000000,
    40000000,
    48000000,
    56000000,
    68000000,
    84000000,
    100000000,
    120000000,
    140000000,
    160000000,
    180000000,
    200000000,
    224000000,
    248000000,
    272000000,
    296000000,
    320000000,
    344000000,
    368000000,
    392000000,
    416000000,
    440000000,
    468000000,
    496000000,
    524000000,
    552000000,
    580000000,
    608000000,
    636000000,
    664000000,
    692000000,
    720000000,
    752000000,
    784000000,
    816000000,
    848000000,
    880000000,
    912000000,
    944000000,
    976000000,
    1008000000,
    1040000000,
    1076000000,
    1112000000,
    1148000000,
    1184000000,
    1220000000,
    1256000000,
    1292000000,
    1328000000,
    1364000000,
    1400000000,
    1440000000,
    1480000000,
    1520000000,
    1560000000,
    1600000000,
    1640000000,
    1680000000,
    1720000000,
    1760000000,
    1800000000,
    1880000000,
    1960000000,
    2040000000,
    2120000000,
    2200000000,
    2280000000,
    2360000000,
    2440000000,
    2520000000,
    2600000000,
    2720000000,
    2840000000,
    2960000000,
    3080000000,
    3200000000,
    3320000000,
    3460000000,
    3620000000,
    3800000000,
    4000000000,
    4220000000,
    4460000000,
    4720000000,
    5000000000,
    5300000000,
    5620000000,
    5960000000,
    6320000000,
    6700000000,
    7100000000,
    7520000000,
    7960000000,
    8420000000,
    8900000000,
    9400000000,
    9920000000,
    10460000000,
    11020000000,
    11600000000,
    12200000000
]

export default baseUrl