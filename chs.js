/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'English': '英文',
    'Close': '关闭',
    'Day': '天',
    'Confirm reset': '确认重置',
    'Emeril': '艾默瑞',
    'General': '常规',
    'General options': '常规选项',
    'GALAXY NUMBER': '星系的数量',
    'Contact': '联系',
    'Theme': '主题',
    'Reset': '重置',
    'Upgrade': '升级',
    'Threat level': '威胁等级',
    'Next': '下一条',
    'Previous': '上一条',
    'All': '全部',
    'Build': '建造',
    'Blue & White': '蓝 & 白',
    'Bumbleblee': '大黄蜂',
    'Import': '导入',
    'Export': '导出',
    'Language': '语言',
    'Language selection': '选择语言',
    'Type': '类型',
    'Travel to another location actually cost 25.0% of power': '前往另一位置实际花费25.0％的能量',
    'to travel to another galaxy.': '旅行到另一个星系。',
    'Use background': '使用背景',
    'White': '白色',
    'Yes': '确定',
    'You can also reset your save to start a new game.': '您还可以重置存档，以开始新游戏。',
    'You must reach reach': '您必须达到',
    'Statistics': '统计',
    'Disable market confirmations': '禁用市场确认',
    'Here you can export your save to another navigator or computer.': '您可以在这里将存档导出到另一个浏览器或计算机。',
    'Français': '法语',
    'Market confirmation': '市场确认',
    'Theme selection menu': '主题选择菜单',
    'No': '取消',
    'Save': '存档',
    'Purple space': '紫色空间',
    'Original v': '原始 v',
    'Do you really want to reset all your stats ?': '您真的要重置所有统计信息吗？',
    'Save exported': '存档已导出',
    'The save is now copied in your clipboard.': '存档已复制到剪贴板中。',
    'The drone extract': '无人机提取',
    'There is a black hole here. It seems to be able to absorb everything, including my past, is it time to start all over again?': '这里有一个黑洞。 它似乎能够吸收一切，包括我的过去，是时候重新开始了吗？',
    'You did': '你造成了',
    'neutral': '中性',
    'damage to the hull !': '伤害对于船体！',
    'damage to the pirate ship.': '伤害对于海盗船。',
    'every 20 seconds.': '每20秒。',
    'You lose this fight !': '你输了！',
    'The pirate weapon does': '海盗武器',
    'The ennemy took all your ressources and': '敌人夺走了你所有的资源和',
    'isotope': '同位素',
    'You found': '你找到了',
    'You won the fight !': '您胜利了！',
    'and': '和',
    'REQUIREMENTS': '要求',
    'Have': '拥有',
    'Gaia': '盖亚',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

    //原样
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    " ": "",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "\n                 ": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?[A-Za-z%]{0,2}(\s.C)?\s*$/, //12.34K,23.4 °C
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\d+(\.\d+)?[A-Za-z]{0,2}.?\(?([+\-]?(\d+(\.\d+)?[A-Za-z]{0,2})?)?$/, //12.34M (+34.34K
    /^(\d+(\.\d+)?[A-Za-z]{0,2}\/s)?.?\(?([+\-]?\d+(\.\d+)?[A-Za-z]{0,2})?\/s\stot$/, //2.74M/s (112.4K/s tot
    /^\d+(\.\d+)?(e[+\-]?\d+)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?$/, //2.177e+6 (+4.01+4
    /^(\d+(\.\d+)?(e[+\-]?\d+)?\/s)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?\/s\stot$/, //2.177e+6/s (+4.01+4/s tot
];
var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^(.+) \(Require$/, '$1 \(要求'],
    [/^(.+) EP$/, '$1 EP'],
    [/^Your actual maximum destination is (.+)$/, '您的实际最远的目的地是 $1'],
    [/^Dark blue \&\n(.+)Grey$/, '深蓝 \&$1 灰色'],
    [/^(.+) power.$/, '$1 能量。'],
    [/^Guide - (.+)$/, '指南 - $1'],
    [/^Here you can export your save to another navigator or computer.(.+)$/, '在这里，您可以将存档导出到另一个浏览器或计算机。'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);