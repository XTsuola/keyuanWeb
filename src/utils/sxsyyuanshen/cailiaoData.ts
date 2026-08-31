/**
 * 原神怪物材料
 * type: 1.普通怪、2.精英怪
 * quality: white 白色 / green 绿色 / blue 蓝色 / purple 紫色
 * 普通怪材料：白绿蓝；精英怪材料：绿蓝紫
 */
export type CailiaoType = 1 | 2;
export type CailiaoQuality = "white" | "green" | "blue" | "purple";

export interface CailiaoEnemy {
    id: number;
    type: CailiaoType;
    typeName: string;
    name: string;
    units: string[];
}

export interface CailiaoItem {
    id: number;
    enemyId: number;
    enemyName: string;
    type: CailiaoType;
    typeName: string;
    name: string;
    quality: CailiaoQuality;
    qualityName: string;
    info: string;
}

export const cailiaoTypes = [
    { id: 1 as CailiaoType, name: "普通怪", color: "#8c8c8c" },
    { id: 2 as CailiaoType, name: "精英怪", color: "#722ed1" },
];

export const cailiaoQualities: { id: CailiaoQuality; name: string; color: string }[] = [
    { id: "white", name: "白色", color: "#8c8c8c" },
    { id: "green", name: "绿色", color: "#52c41a" },
    { id: "blue", name: "蓝色", color: "#1677ff" },
    { id: "purple", name: "紫色", color: "#722ed1" },
];

export const cailiaoEnemies: CailiaoEnemy[] = [
    {
        "id": 1,
        "type": 1,
        "typeName": "普通怪",
        "name": "丘丘人",
        "units": [
            "丘丘人",
            "打手丘丘人",
            "岩盾丘丘人",
            "木盾丘丘人",
            "冰盾丘丘人",
            "冲锋丘丘人",
            "爆弹丘丘人",
            "雷弹丘丘人",
            "冰淡丘丘人",
            "射手丘丘人",
            "雷箭丘丘人",
            "火箭丘丘人",
            "冰箭丘丘人",
            "风丘丘萨满",
            "岩丘丘萨满",
            "雷丘丘萨满",
            "草丘丘萨满",
            "水丘丘萨满",
            "冰丘丘萨满",
            "岩盾丘丘暴徒",
            "雷斧丘丘暴徒",
            "木盾丘丘暴徒",
            "火斧丘丘暴徒",
            "冰盾丘丘暴徒",
            "丘丘岩盔王",
            "丘丘雷兜王",
            "丘丘霜铠王"
        ]
    },
    {
        "id": 2,
        "type": 1,
        "typeName": "普通怪",
        "name": "射箭丘丘人",
        "units": [
            "射手丘丘人",
            "雷箭丘丘人",
            "火箭丘丘人",
            "冰箭丘丘人"
        ]
    },
    {
        "id": 3,
        "type": 1,
        "typeName": "普通怪",
        "name": "丘丘萨满",
        "units": [
            "风丘丘萨满",
            "岩丘丘萨满",
            "雷丘丘萨满",
            "草丘丘萨满",
            "水丘丘萨满",
            "冰丘丘萨满"
        ]
    },
    {
        "id": 4,
        "type": 1,
        "typeName": "普通怪",
        "name": "盗宝团",
        "units": [
            "盗宝团·杂工",
            "盗宝团·斥候",
            "盗宝团·粉碎者",
            "盗宝团·拳术家",
            "盗宝团·掘墓者",
            "盗宝团·神射手",
            "盗宝团·海上男儿",
            "盗宝团·雷之药剂师",
            "盗宝团·水之药剂师",
            "盗宝团·火之药剂师",
            "盗宝团·冰之药剂师"
        ]
    },
    {
        "id": 5,
        "type": 1,
        "typeName": "普通怪",
        "name": "史莱姆",
        "units": [
            "风史莱姆",
            "岩史莱姆",
            "雷史莱姆",
            "草史莱姆",
            "水史莱姆",
            "火史莱姆",
            "冰史莱姆"
        ]
    },
    {
        "id": 6,
        "type": 1,
        "typeName": "普通怪",
        "name": "愚人众先遣队",
        "units": [
            "愚人众先遣队·风拳前锋军",
            "愚人众先遣队·岩使游击兵",
            "愚人众先遣队·雷锤前锋军",
            "愚人众先遣队·水铳重卫士",
            "愚人众先遣队·火铳游击兵",
            "愚人众先遣队·冰铳重卫士"
        ]
    },
    {
        "id": 7,
        "type": 1,
        "typeName": "普通怪",
        "name": "骗骗花",
        "units": [
            "电气骗骗花",
            "炽热骗骗花",
            "冰霜骗骗花"
        ]
    },
    {
        "id": 8,
        "type": 1,
        "typeName": "普通怪",
        "name": "稻妻武士",
        "units": [
            "野伏·阵刀番",
            "野伏·机巧番",
            "野伏·火付番",
            "海乱鬼·雷腾",
            "海乱鬼·炎威"
        ]
    },
    {
        "id": 9,
        "type": 1,
        "typeName": "普通怪",
        "name": "飘浮灵",
        "units": [
            "风飘浮灵",
            "岩飘浮灵",
            "雷飘浮灵",
            "草飘浮灵",
            "水飘浮灵",
            "火飘浮灵",
            "冰飘浮灵"
        ]
    },
    {
        "id": 10,
        "type": 1,
        "typeName": "普通怪",
        "name": "蕈兽",
        "units": [
            "伸缩风蕈兽",
            "伸缩岩蕈兽",
            "伸缩雷蕈兽",
            "伸缩火蕈兽",
            "浮游风蕈兽",
            "浮游草蕈兽",
            "浮游水蕈兽",
            "旋转雷蕈兽",
            "旋转火蕈兽",
            "旋转冰蕈兽",
            "陆行岩本真蕈",
            "有翼草本真蕈",
            "有翼冰本真蕈"
        ]
    },
    {
        "id": 11,
        "type": 1,
        "typeName": "普通怪",
        "name": "镀金旅团",
        "units": [
            "镀金旅团·破阵者",
            "镀金旅团·刀舞者",
            "镀金旅团·阵前斧手",
            "镀金旅团·鸦喙戟手",
            "镀金旅团·机弩兵",
            "镀金旅团·白日鸣雷",
            "镀金旅团·沙中净水",
            "镀金旅团·炽阳凝冰",
            "镀金旅团·灵风猎手",
            "镀金旅团·魔岩役使",
            "镀金旅团·叶轮舞者",
            "镀金旅团·炽沙叙事人"
        ]
    },
    {
        "id": 12,
        "type": 1,
        "typeName": "普通怪",
        "name": "原海异种",
        "units": [
            "重甲蟹",
            "猎刀鳐",
            "泡泡海马",
            "天使海兔",
            "膨膨兽",
            "帽子水母",
            "球球章鱼",
            "坚盾重甲蟹",
            "泡泡雄海马",
            "大天使海兔"
        ]
    },
    {
        "id": 13,
        "type": 1,
        "typeName": "普通怪",
        "name": "发条机关",
        "units": [
            "机关·算力增幅器",
            "机关·区域警戒型",
            "机关·灵活采集型",
            "机关·侦察记录型",
            "机关·地质勘探型",
            "机关·水下勘测型",
            "机关·水下巡游型",
            "机关·深海攻击型",
            "歼灭特化型机关",
            "压制特化型机关",
            "攻坚特化型机关",
            "建造特化型机关"
        ]
    },
    {
        "id": 14,
        "type": 1,
        "typeName": "普通怪",
        "name": "纳塔勇士/龙武士",
        "units": [
            "结羽勇士·驭空客",
            "结羽勇士·削羽人",
            "结羽勇士·腾空士",
            "铸砂勇士·投矛手",
            "铸砂勇士·碎盾手",
            "铸砂勇士·叩问人",
            "蛮横勇士·冲撞手",
            "蛮横勇士·抓扑人",
            "蛮横勇士·摔跤客",
            "疾迅勇士·引索者",
            "疾迅勇士·荡风斥候",
            "疾迅勇士·重刃讯使",
            "流刃勇士·投叉猎手",
            "流刃勇士·锯脂者",
            "流刃勇士·游击人",
            "灵觉勇士·执意师",
            "灵觉勇士·控念师",
            "灵觉勇士·冥思者",
            "绒翼龙武士·膛星之锤",
            "绒翼龙武士·长空明焰",
            "嵴锋龙武士·破岩锐刃",
            "嵴锋龙武士·碎晶打者",
            "突角龙武士·追缉灵光",
            "突角龙武士·破空轰动",
            "匿叶龙武士·流火鸣空",
            "匿叶龙武士·旋锯飞叶",
            "鳍游龙武士·穿浪之梭",
            "鳍游龙武士·裂礁之涛",
            "暝视龙武士·冰晶炮手",
            "暝视龙武士·寒涌持者"
        ]
    },
    {
        "id": 15,
        "type": 1,
        "typeName": "普通怪",
        "name": "纳塔龙众",
        "units": [
            "幼绒翼龙",
            "幼嵴锋龙",
            "幼突角龙",
            "幼匿叶龙",
            "幼鳍游龙",
            "幼暝视龙",
            "绒翼龙",
            "嵴锋龙",
            "突角龙",
            "匿叶龙",
            "鳍游龙",
            "暝视龙"
        ]
    },
    {
        "id": 16,
        "type": 1,
        "typeName": "普通怪",
        "name": "愚人众特辖队",
        "units": [
            "愚人众特辖队·支援兵",
            "愚人众特辖队·先锋士",
            "愚人众特辖队·线列军",
            "愚人众特辖队·掷弹兵",
            "愚人众特辖队·榴铳手",
            "愚人众特辖队·疗愈师",
            "愚人众特辖队·雷霰近卫军",
            "愚人众特辖队·火刃突击队",
            "愚人众特辖队·冰雹重炮手"
        ]
    },
    {
        "id": 17,
        "type": 1,
        "typeName": "普通怪",
        "name": "巡陆艇",
        "units": [
            "巡陆艇·近战斥候型",
            "巡陆艇·近战攻坚型",
            "巡陆艇·强侦斥候型",
            "巡陆艇·强侦攻坚型",
            "巡陆艇·强侦地效型",
            "巡陆艇·尖端全能斥候型",
            "巡陆艇·尖端全能攻坚型",
            "巡陆艇·尖端火力地效型"
        ]
    },
    {
        "id": 18,
        "type": 1,
        "typeName": "普通怪",
        "name": "嵌合兽",
        "units": [
            "嵌合角熊",
            "嵌合鏊甲兽",
            "嵌合翼象兽",
            "嵌合梭地兽"
        ]
    },
    {
        "id": 19,
        "type": 1,
        "typeName": "普通怪",
        "name": "至冬妖精",
        "units": [
            "凝冰戍卫",
            "凝冰秘法师",
            "持戟羽骑士",
            "舞空羽骑士",
            "苍遒的木灵长",
            "幼嫩的分节树",
            "牙兽狂徒",
            "嗥狼追猎者",
            "狮獒护卫",
            "渠道联络人",
            "长耳强袭者",
            "兽怪瞄击者",
            "兽怪敲打者",
            "兽怪投掷者",
            "兽怪捷掠者"
        ]
    },
    {
        "id": 20,
        "type": 2,
        "typeName": "精英怪",
        "name": "丘丘精英",
        "units": [
            "岩盾丘丘暴徒",
            "雷斧丘丘暴徒",
            "木盾丘丘暴徒",
            "火斧丘丘暴徒",
            "冰盾丘丘暴徒",
            "丘丘岩盔王",
            "丘丘雷兜王",
            "丘丘霜铠王"
        ]
    },
    {
        "id": 21,
        "type": 2,
        "typeName": "精英怪",
        "name": "深渊法师",
        "units": [
            "雷深渊法师",
            "水深渊法师",
            "火深渊法师",
            "冰深渊法师",
            "深渊咏者·紫电",
            "深渊使徒·激流",
            "深渊咏者·渊火",
            "深渊使徒·霜落"
        ]
    },
    {
        "id": 22,
        "type": 2,
        "typeName": "精英怪",
        "name": "愚人众·萤术士",
        "units": [
            "愚人众·雷萤术士",
            "愚人众·冰萤术士"
        ]
    },
    {
        "id": 23,
        "type": 2,
        "typeName": "精英怪",
        "name": "遗迹守卫",
        "units": [
            "遗迹守卫",
            "遗迹猎者",
            "遗迹重机"
        ]
    },
    {
        "id": 24,
        "type": 2,
        "typeName": "精英怪",
        "name": "愚人众·债务处理人",
        "units": [
            "愚人众·火之债务处理人"
        ]
    },
    {
        "id": 25,
        "type": 2,
        "typeName": "精英怪",
        "name": "龙蜥",
        "units": [
            "幼岩龙蜥",
            "岩龙蜥",
            "深海龙蜥·原种",
            "深海龙蜥·吞雷",
            "深海龙蜥·啮冰"
        ]
    },
    {
        "id": 26,
        "type": 2,
        "typeName": "精英怪",
        "name": "愚人众·仕女",
        "units": [
            "愚人众·藏镜仕女"
        ]
    },
    {
        "id": 27,
        "type": 2,
        "typeName": "精英怪",
        "name": "遗迹机关",
        "units": [
            "遗迹歼击者",
            "遗迹巡弋者",
            "遗迹防卫者",
            "遗迹侦察者"
        ]
    },
    {
        "id": 28,
        "type": 2,
        "typeName": "精英怪",
        "name": "兽境猎犬",
        "units": [
            "嗜岩·兽境幼兽",
            "嗜雷·兽境幼兽",
            "嗜岩·兽境猎犬",
            "嗜雷·兽境猎犬"
        ]
    },
    {
        "id": 29,
        "type": 2,
        "typeName": "精英怪",
        "name": "黯色空壳",
        "units": [
            "黯色空壳·破阵",
            "黯色空壳·旗令",
            "黯色空壳·近卫",
            "黑蛇骑士·斩风之剑",
            "黑蛇骑士·摧岩之钺",
            "深渊咏者·紫电",
            "深渊使徒·激流",
            "深渊咏者·渊火",
            "深渊使徒·霜落"
        ]
    },
    {
        "id": 30,
        "type": 2,
        "typeName": "精英怪",
        "name": "遗迹龙兽",
        "units": [
            "遗迹龙兽·地巡",
            "遗迹龙兽·空巡"
        ]
    },
    {
        "id": 31,
        "type": 2,
        "typeName": "精英怪",
        "name": "元能构装体",
        "units": [
            "元能构装体·勘探机",
            "元能构装体·力场发生器",
            "元能构装体·重塑仪"
        ]
    },
    {
        "id": 32,
        "type": 2,
        "typeName": "精英怪",
        "name": "圣骸兽",
        "units": [
            "圣骸飞蛇",
            "圣骸毒蝎",
            "圣骸牙兽",
            "圣骸角鳄",
            "圣骸赤鹫"
        ]
    },
    {
        "id": 33,
        "type": 2,
        "typeName": "精英怪",
        "name": "丘丘游侠",
        "units": [
            "丘丘风行游侠",
            "丘丘水行游侠"
        ]
    },
    {
        "id": 34,
        "type": 2,
        "typeName": "精英怪",
        "name": "隙境原体",
        "units": [
            "碎石隙境原体",
            "狂蔓隙境原体",
            "大型碎石隙境原体",
            "大型狂蔓隙境原体"
        ]
    },
    {
        "id": 35,
        "type": 2,
        "typeName": "精英怪",
        "name": "浊水幻灵",
        "units": [
            "浊水喷吐幻灵",
            "浊水粉碎幻灵"
        ]
    },
    {
        "id": 36,
        "type": 2,
        "typeName": "精英怪",
        "name": "愚人众·役人",
        "units": [
            "愚人众·风役人",
            "愚人众·霜役人"
        ]
    },
    {
        "id": 37,
        "type": 2,
        "typeName": "精英怪",
        "name": "玄文兽",
        "units": [
            "玄文兽"
        ]
    },
    {
        "id": 38,
        "type": 2,
        "typeName": "精英怪",
        "name": "魔像禁卫",
        "units": [
            "魔像禁卫"
        ]
    },
    {
        "id": 39,
        "type": 2,
        "typeName": "精英怪",
        "name": "熔岩游像",
        "units": [
            "熔岩游像·蚀土者",
            "熔岩游像·流燃体"
        ]
    },
    {
        "id": 40,
        "type": 2,
        "typeName": "精英怪",
        "name": "大灵显化身",
        "units": [
            "窟岩·大灵显化身",
            "雳震·大灵显化身",
            "疾叶·大灵显化身",
            "溯流·大灵显化身",
            "焚燃·大灵显化身",
            "凛冽·大灵显化身"
        ]
    },
    {
        "id": 41,
        "type": 2,
        "typeName": "精英怪",
        "name": "秘源机兵",
        "units": [
            "秘源机兵·巡捕械"
        ]
    },
    {
        "id": 42,
        "type": 2,
        "typeName": "精英怪",
        "name": "深邃拟覆叶",
        "units": [
            "深邃拟覆叶"
        ]
    },
    {
        "id": 43,
        "type": 2,
        "typeName": "精英怪",
        "name": "炉壳山鼬",
        "units": [
            "炉壳山鼬"
        ]
    },
    {
        "id": 44,
        "type": 2,
        "typeName": "精英怪",
        "name": "狂猎",
        "units": [
            "荒野幽徒",
            "荒野狂战士"
        ]
    },
    {
        "id": 45,
        "type": 2,
        "typeName": "精英怪",
        "name": "霜夜灵嗣",
        "units": [
            "驰岚·霜夜灵嗣",
            "金礞·霜夜灵嗣",
            "辉电·霜夜灵嗣",
            "蔓结·霜夜灵嗣",
            "涌流·霜夜灵嗣",
            "灼烜·霜夜灵嗣",
            "凌晶·霜夜灵嗣"
        ]
    },
    {
        "id": 46,
        "type": 2,
        "typeName": "精英怪",
        "name": "蕴光兽",
        "units": [
            "蕴光璇蛸",
            "蕴光奇羊",
            "蕴光刃犀",
            "蕴光凛狼"
        ]
    },
    {
        "id": 47,
        "type": 2,
        "typeName": "精英怪",
        "name": "深黯钓客",
        "units": [
            "深黯钓客"
        ]
    },
    {
        "id": 48,
        "type": 2,
        "typeName": "精英怪",
        "name": "辖域守护者",
        "units": [
            "辖域守护者"
        ]
    },
    {
        "id": 49,
        "type": 2,
        "typeName": "精英怪",
        "name": "秘源统辖阵列",
        "units": [
            "先驱秘源统辖阵列"
        ]
    },
    {
        "id": 50,
        "type": 2,
        "typeName": "精英怪",
        "name": "树妖",
        "units": [
            "苍遒的木灵长",
            "幼嫩的分节树"
        ]
    },
    {
        "id": 51,
        "type": 2,
        "typeName": "精英怪",
        "name": "兽怪",
        "units": [
            "牙兽狂徒",
            "嗥狼追猎者",
            "狮獒护卫",
            "渠道联络人",
            "长耳强袭者",
            "兽怪瞄击者",
            "兽怪敲打者",
            "兽怪投掷者",
            "兽怪捷掠者"
        ]
    }
];

export const cailiaoList: CailiaoItem[] = [
    {
        "id": 1,
        "enemyId": 1,
        "enemyName": "丘丘人",
        "type": 1,
        "typeName": "普通怪",
        "name": "破损的面具",
        "quality": "white",
        "qualityName": "白色",
        "info": "破碎的骨质面具，曾经属于某个丘丘人。破损的部分比完整的部分更多，已经失去了假面应有的功能。"
    },
    {
        "id": 2,
        "enemyId": 1,
        "enemyName": "丘丘人",
        "type": 1,
        "typeName": "普通怪",
        "name": "污秽的面具",
        "quality": "green",
        "qualityName": "绿色",
        "info": "沾满难以辨认的污渍，散发者2微妙气味的骨质面具。即使这样也要戴在脸上，这就是丘丘人的执着。"
    },
    {
        "id": 3,
        "enemyId": 1,
        "enemyName": "丘丘人",
        "type": 1,
        "typeName": "普通怪",
        "name": "不详的面具",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "光亮的骨质面具，上面涂绘着意在恐吓敌人的油彩。丘丘人对面具的执着缘起为何，至今无人能解。一说认为是不愿看见自己在水中的倒影。"
    },
    {
        "id": 4,
        "enemyId": 2,
        "enemyName": "射箭丘丘人",
        "type": 1,
        "typeName": "普通怪",
        "name": "牢固的箭簇",
        "quality": "white",
        "qualityName": "白色",
        "info": "做工粗糙的箭簇。即使如此，也不容小觑：弩是危险的武器，即使贵为骑士，也可能被从后方来的弩矢击倒。"
    },
    {
        "id": 5,
        "enemyId": 2,
        "enemyName": "射箭丘丘人",
        "type": 1,
        "typeName": "普通怪",
        "name": "锐利的箭簇",
        "quality": "green",
        "qualityName": "绿色",
        "info": "做工精良的箭簇。锐利的尖端或许能像投石入水一样轻易穿透敌人的甲胄，没入猎物的体内。"
    },
    {
        "id": 6,
        "enemyId": 2,
        "enemyName": "射箭丘丘人",
        "type": 1,
        "typeName": "普通怪",
        "name": "历战的箭簇",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "老旧的、沾染了干涸血迹的箭簇。箭头在反复的使用中已经失去了应有的锐利，根本不能作为武器使用。但它也代表着猎手的骄傲，是它们的护身符与奖章。"
    },
    {
        "id": 7,
        "enemyId": 3,
        "enemyName": "丘丘萨满",
        "type": 1,
        "typeName": "普通怪",
        "name": "导能绘卷",
        "quality": "white",
        "qualityName": "白色",
        "info": "大抵是某种关于魔法的绘卷残篇。隐隐地散发着某种异样的、不详的温暖。"
    },
    {
        "id": 8,
        "enemyId": 3,
        "enemyName": "丘丘萨满",
        "type": 1,
        "typeName": "普通怪",
        "name": "封魔绘卷",
        "quality": "green",
        "qualityName": "绿色",
        "info": "模糊地绘制了难解形象的古书断章。通过模仿其中的人物形象，一些魔物能小小地再现魔法的奇迹。"
    },
    {
        "id": 9,
        "enemyId": 3,
        "enemyName": "丘丘萨满",
        "type": 1,
        "typeName": "普通怪",
        "name": "禁咒绘卷",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "绘制着古代形象的古书抄本。鲜有人能解读它的含义；据说最终理解了其中真意的学者最终都陷入了癫狂。"
    },
    {
        "id": 10,
        "enemyId": 4,
        "enemyName": "盗宝团",
        "type": 1,
        "typeName": "普通怪",
        "name": "寻宝鸦印",
        "quality": "white",
        "qualityName": "白色",
        "info": "骄傲地标识着盗宝团身份的印记，描绘着他们对宝藏永无止境的追求。话虽如此，盗贼的身份真的需要骄傲地展示吗...？"
    },
    {
        "id": 11,
        "enemyId": 4,
        "enemyName": "盗宝团",
        "type": 1,
        "typeName": "普通怪",
        "name": "藏银鸦印",
        "quality": "green",
        "qualityName": "绿色",
        "info": "盗宝团的成员用于互相辨识的乌鸦纹章。盗宝团不问出身，无论何者，只要怀着贪求宝藏的心，有铤而走险的胆识，都可以成为【优秀】的成员。"
    },
    {
        "id": 12,
        "enemyId": 4,
        "enemyName": "盗宝团",
        "type": 1,
        "typeName": "普通怪",
        "name": "攫金鸦印",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "象征着盗宝团唯一的原则与傲骨的徽印。只要广袤的大地上、幽邃的深渊里、未知的海洋中仍有待发掘的秘宝，那么手段不论地征服宝藏的盗宝之魂，就永远不会熄灭。"
    },
    {
        "id": 13,
        "enemyId": 5,
        "enemyName": "史莱姆",
        "type": 1,
        "typeName": "普通怪",
        "name": "史莱姆凝液",
        "quality": "white",
        "qualityName": "白色",
        "info": "覆于史莱姆体表的浓稠流体，各地元素工坊中最常见的原料。"
    },
    {
        "id": 14,
        "enemyId": 5,
        "enemyName": "史莱姆",
        "type": 1,
        "typeName": "普通怪",
        "name": "史莱姆清",
        "quality": "green",
        "qualityName": "绿色",
        "info": "略加提纯的史莱姆分泌物，对皮肤有害，请务必避免不加防护措施的接触。"
    },
    {
        "id": 15,
        "enemyId": 5,
        "enemyName": "史莱姆",
        "type": 1,
        "typeName": "普通怪",
        "name": "史莱姆原浆",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "浓缩的史莱姆原浆，静置时会自主进行不规则运动。"
    },
    {
        "id": 16,
        "enemyId": 6,
        "enemyName": "愚人众先遣队",
        "type": 1,
        "typeName": "普通怪",
        "name": "新兵的徽记",
        "quality": "white",
        "qualityName": "白色",
        "info": "标识着新兵身份的徽记。不知曾经带着它的人，是怀着何种心情加入愚人众的战争机器的呢。"
    },
    {
        "id": 17,
        "enemyId": 6,
        "enemyName": "愚人众先遣队",
        "type": 1,
        "typeName": "普通怪",
        "name": "士官的徽记",
        "quality": "green",
        "qualityName": "绿色",
        "info": "标识着士官身份的徽记，有着区分一般士兵的奇异造型。其中或许蕴含着复杂的情绪吧。"
    },
    {
        "id": 18,
        "enemyId": 6,
        "enemyName": "愚人众先遣队",
        "type": 1,
        "typeName": "普通怪",
        "name": "尉官的徽记",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "标识着尉官身份的徽记。愚人众拥有庞大的军队，能在其中担任尉官着，想必是有过人之处吧。"
    },
    {
        "id": 19,
        "enemyId": 7,
        "enemyName": "骗骗花",
        "type": 1,
        "typeName": "普通怪",
        "name": "骗骗花蜜",
        "quality": "white",
        "qualityName": "白色",
        "info": "从花蕊中提取出的花蜜，其中含有少量元素。尝起来和甜甜花的味道有些微妙地相似。"
    },
    {
        "id": 20,
        "enemyId": 7,
        "enemyName": "骗骗花",
        "type": 1,
        "typeName": "普通怪",
        "name": "微光花蜜",
        "quality": "green",
        "qualityName": "绿色",
        "info": "元素纯度较高的花蜜。学界一般认为骗骗花是元素植物的高级生命形态，但始终无法解明它的掠食习性。"
    },
    {
        "id": 21,
        "enemyId": 7,
        "enemyName": "骗骗花",
        "type": 1,
        "typeName": "普通怪",
        "name": "原素花蜜",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "饱含能量的黏稠蜜汁。骗骗花欺瞒猎物是为了狩猎，而狩猎进食或许是为了进化成某种更强大、更纯粹的姿态吧..."
    },
    {
        "id": 22,
        "enemyId": 8,
        "enemyName": "稻妻武士",
        "type": 1,
        "typeName": "普通怪",
        "name": "破旧的刀镡",
        "quality": "white",
        "qualityName": "白色",
        "info": "装配在稻妻刀剑上的护具，见证过许多战斗。对剑术纯熟者而言，镡可以在实战中阻挡对手的刀刃；而对于新手剑士，镡是保护自己右手的关键。"
    },
    {
        "id": 23,
        "enemyId": 8,
        "enemyName": "稻妻武士",
        "type": 1,
        "typeName": "普通怪",
        "name": "影打刀镡",
        "quality": "green",
        "qualityName": "绿色",
        "info": "装配在优秀刀剑上的护具。稻妻有悠久的刀剑锻冶传统。匠人锻造一把刀时，常常会制造数柄样品，从中甄选。其中最为优秀的作品是为【真打】，而其余的则被称为【影打】。"
    },
    {
        "id": 24,
        "enemyId": 8,
        "enemyName": "稻妻武士",
        "type": 1,
        "typeName": "普通怪",
        "name": "名刀镡",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "装配在名刀上的华美护具。有人坚信刀剑有灵魂、有生命，这也是为什么人们会为刀起名。爱护刀的人，也会得到刀的赏识。但与刀剑成为挚友、甚至爱人的人，须知这份情义是由杀伐浇灌的。常常浴血、与刀共舞之人，他们的热血最终总会被薄情的钢铁冷却。"
    },
    {
        "id": 25,
        "enemyId": 9,
        "enemyName": "飘浮灵",
        "type": 1,
        "typeName": "普通怪",
        "name": "浮游干核",
        "quality": "white",
        "qualityName": "白色",
        "info": "能让飘浮灵浮游的能量核，其中含有些微的元素。大部分的能量似乎已经逸散了。"
    },
    {
        "id": 26,
        "enemyId": 9,
        "enemyName": "飘浮灵",
        "type": 1,
        "typeName": "普通怪",
        "name": "浮游幽核",
        "quality": "green",
        "qualityName": "绿色",
        "info": "能让飘浮灵浮游的能量核。这种元素生物似乎有奇异的习性，会周期性大量涌现、消失。"
    },
    {
        "id": 27,
        "enemyId": 9,
        "enemyName": "飘浮灵",
        "type": 1,
        "typeName": "普通怪",
        "name": "浮游晶化核",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "击败飘浮灵后有时能发现的完整的能量核。在热衷于给任何事物都分个高下的人当中，经常发生这样的争论：飘浮灵和风史莱姆的浮力，究竟孰高孰低。"
    },
    {
        "id": 28,
        "enemyId": 10,
        "enemyName": "蕈兽",
        "type": 1,
        "typeName": "普通怪",
        "name": "蕈兽孢子",
        "quality": "white",
        "qualityName": "白色",
        "info": "蕈兽留下的零星孢子粉末，闪烁着点点微光。仿佛只需一个喷嚏，便会被吹散得无影无踪。"
    },
    {
        "id": 29,
        "enemyId": 10,
        "enemyName": "蕈兽",
        "type": 1,
        "typeName": "普通怪",
        "name": "荧光孢粉",
        "quality": "green",
        "qualityName": "绿色",
        "info": "小小包散发着荧光的蕈兽孢子粉末，在雨林之国是一剂常见的药材，往往被商人用纸包封装起来贩卖。"
    },
    {
        "id": 30,
        "enemyId": 10,
        "enemyName": "蕈兽",
        "type": 1,
        "typeName": "普通怪",
        "name": "失活菌核",
        "quality": "green",
        "qualityName": "绿色",
        "info": "蕈兽的部分身体组织，在外界元素的剧烈刺激下才会形成。手感很好，适合用来解压，单容易造成蕈兽大量孳生，所以不宜商用。"
    },
    {
        "id": 31,
        "enemyId": 10,
        "enemyName": "蕈兽",
        "type": 1,
        "typeName": "普通怪",
        "name": "孢囊晶尘",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "从完整的孢子囊中精心收集的大团孢子粉末，想必在合适的环境条件下，将会孕育出一个颇有规模的蕈兽群落吧..."
    },
    {
        "id": 32,
        "enemyId": 10,
        "enemyName": "蕈兽",
        "type": 1,
        "typeName": "普通怪",
        "name": "休眠菌核",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "蕈兽的部分身体组织，在外界元素的剧烈刺激下才会形成。生论派的学者们曾对蕈兽究竟属于植物还是动物展开过旷日持久的论战。最后两派达成和解，将蕈兽单列在动植物之外，并不再讨论。"
    },
    {
        "id": 33,
        "enemyId": 10,
        "enemyName": "蕈兽",
        "type": 1,
        "typeName": "普通怪",
        "name": "茁壮菌核",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "蕈兽的部分身体组织，在外界元素的剧烈刺激下才会形成。一般认为，蕈兽之所以演化出移动能力，是为了将孢子散布在更为广泛的天地中。曾有诗人称，在蕈兽共同的梦中，孢子覆盖了山岳与海洋，世界无比宁静。蕈兽演化成游鱼、走兽、飞禽、人与神，依赖雨水、土地与回归土地的同伴而生。"
    },
    {
        "id": 34,
        "enemyId": 11,
        "enemyName": "镀金旅团",
        "type": 1,
        "typeName": "普通怪",
        "name": "褪色红绸",
        "quality": "white",
        "qualityName": "白色",
        "info": "用以遮盖眼睛的红色绸缎，略有残破。镀金旅团当中常有人以织物遮蔽双眼，而这种举动的肇始早已失落在时之沙海中。"
    },
    {
        "id": 35,
        "enemyId": 11,
        "enemyName": "镀金旅团",
        "type": 1,
        "typeName": "普通怪",
        "name": "镶边红绸",
        "quality": "green",
        "qualityName": "绿色",
        "info": "镶有简单装饰的红色绸缎。老练的战士上能够从对手眼神中的破绽，找到先机。镀金旅团早已失去了可效忠的主，能够相信的只有自己。据说，他们坚信万物皆会背叛，连自己的双眼也不例外。"
    },
    {
        "id": 36,
        "enemyId": 11,
        "enemyName": "镀金旅团",
        "type": 1,
        "typeName": "普通怪",
        "name": "织金红绸",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "以金丝织成纹路的红色绸缎。在日光之下如同镀金的沙漠当中出生的遗民，偶尔会唱起含义已被遗忘的歌谣，赞美平等照耀大地的烈日，痛惜黄昏之末的余晖。在歌谣的终章反复出现的陌生词汇，据说是古老神明的名讳。据说，沙漠之王尚在时，子民们不敢直视太阳般的光辉，因而遮住了自己的双目。"
    },
    {
        "id": 37,
        "enemyId": 12,
        "enemyName": "原海异种",
        "type": 1,
        "typeName": "普通怪",
        "name": "异海凝珠",
        "quality": "white",
        "qualityName": "白色",
        "info": "击败原海异种后，从其体内取得的细小晶体。原海异种依托枫丹的「海」而生，推测是因为水中奇异的能量而形成独特形态的生命体。"
    },
    {
        "id": 38,
        "enemyId": 12,
        "enemyName": "原海异种",
        "type": 1,
        "typeName": "普通怪",
        "name": "异海之块",
        "quality": "green",
        "qualityName": "绿色",
        "info": "击败原海异种后，从其体内取得的结晶体。散发着些微神秘的能量。尽管传说在航道与人迹所不及的远海中存在着伟大的生命，但寻常的海洋不过乏善可陈，生命力远远不及枫丹的「海」。也因此诞生在枫丹的生命，以及生命之外的物质当中往往蕴含着奇异的能量。"
    },
    {
        "id": 39,
        "enemyId": 12,
        "enemyName": "原海异种",
        "type": 1,
        "typeName": "普通怪",
        "name": "异色结晶石",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "击败原海异种后，从其体内取得的大颗结晶。其中蕴含着神秘的能量。尽管是万水之源，但枫丹之水流向异国之后却失去了其独特的性质。也因此有推论称赋予枫丹海特性的不是水本身，而是海原之下的某种物质。据说如今已经毁灭的自然哲学学院当中曾经有人对其进行过详尽的研究。"
    },
    {
        "id": 40,
        "enemyId": 13,
        "enemyName": "发条机关",
        "type": 1,
        "typeName": "普通怪",
        "name": "啮合齿轮",
        "quality": "white",
        "qualityName": "白色",
        "info": "发条机关的齿轮。是传动所需的重要零件。一旦缺失，对应模块的功能便无法运作。"
    },
    {
        "id": 41,
        "enemyId": 13,
        "enemyName": "发条机关",
        "type": 1,
        "typeName": "普通怪",
        "name": "机关正齿轮",
        "quality": "green",
        "qualityName": "绿色",
        "info": "发条机关的齿轮。尽管发条机关在运动学上经历了许多突破，但动力学上迄今未能突破四百多年前「奇械公」阿兰·吉约丹的成就。事实上「发条机关」的名字承袭的是在他的时代之前，通过发条势能驱动的古老机关。"
    },
    {
        "id": 42,
        "enemyId": 13,
        "enemyName": "发条机关",
        "type": 1,
        "typeName": "普通怪",
        "name": "奇械机芯齿轮",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "发条机关的齿轮。加工精度与材料学的进步是枫丹发条机关进步的关键。在先进设备的支持下，任何工程师都有制造出超越「奇械公」阿兰·吉约丹时代机械的可能。但如今枫丹最先进的发条机械生产者是梅洛彼得堡。究其原因，「工坊」的实力永远、永远不可能与「工厂」抗衡。"
    },
    {
        "id": 43,
        "enemyId": 14,
        "enemyName": "纳塔勇士/龙武士",
        "type": 1,
        "typeName": "普通怪",
        "name": "卫从的木哨",
        "quality": "white",
        "qualityName": "白色",
        "info": "纳塔部族卫从的象征。战士并非一开始就是战士，得先跟从真正的战士们学习战斗的技巧，这就是部族中「卫从」这一见习职位的由来。"
    },
    {
        "id": 44,
        "enemyId": 14,
        "enemyName": "纳塔勇士/龙武士",
        "type": 1,
        "typeName": "普通怪",
        "name": "战士的铁哨",
        "quality": "green",
        "qualityName": "绿色",
        "info": "纳塔部族战士的象征。正是成为部族战士后能够拥有的铁哨。在部族周围巡游，一旦出现危险就用哨声互相通知呼应。这就是部族中「战士」需要履行的职责。"
    },
    {
        "id": 45,
        "enemyId": 14,
        "enemyName": "纳塔勇士/龙武士",
        "type": 1,
        "typeName": "普通怪",
        "name": "龙冠武士的金哨",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "纳塔部族中，获授龙冠的强大武士的象征。只有为部族争取到了足够的荣誉，其勇武得到承认之后，才会得到的金哨。但此时其装饰的意义已经高过实际使用的意义，因为头戴龙冠的武士可以独自解决大部分的危机。"
    },
    {
        "id": 46,
        "enemyId": 15,
        "enemyName": "纳塔龙众",
        "type": 1,
        "typeName": "普通怪",
        "name": "稚嫩的尖齿",
        "quality": "white",
        "qualityName": "白色",
        "info": "纳塔龙众脱落的牙。尚显稚嫩的牙齿，如果有从牙齿判断主人年龄的方式的话，获悉就能看出这枚牙齿的主人并未在世上经历太久的岁月。"
    },
    {
        "id": 47,
        "enemyId": 15,
        "enemyName": "纳塔龙众",
        "type": 1,
        "typeName": "普通怪",
        "name": "老练的坚齿",
        "quality": "green",
        "qualityName": "绿色",
        "info": "纳塔龙众脱落的坚牙。其上的磨损见证了其主人曾经历的生活与战斗，拥有这等牙齿的龙，想必在纳塔的诸多龙众中，也能被称为了不起的战士吧。"
    },
    {
        "id": 48,
        "enemyId": 15,
        "enemyName": "纳塔龙众",
        "type": 1,
        "typeName": "普通怪",
        "name": "横行霸者的利齿",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "纳塔的强龙脱落的尖锐利齿。旁生的锯状结构与其狰狞的形态，可窥见其主人在战斗中的蛮勇。拥有这等牙齿的龙，想必在纳塔诸多龙众中，可称得上是横行无忌的霸者了吧。"
    },
    {
        "id": 49,
        "enemyId": 16,
        "enemyName": "愚人众特辖队",
        "type": 1,
        "typeName": "普通怪",
        "name": "磨损的执凭",
        "quality": "white",
        "qualityName": "白色",
        "info": "配发给愚人众特辖队的执凭。不知持有它的人，怀抱了怎样的决意加入这支队伍。"
    },
    {
        "id": 50,
        "enemyId": 16,
        "enemyName": "愚人众特辖队",
        "type": 1,
        "typeName": "普通怪",
        "name": "精致的执凭",
        "quality": "green",
        "qualityName": "绿色",
        "info": "配发给愚人众特辖队的执凭。精致造型的背后，或许也有执凭的主人为了晋升所付出的代价吧。"
    },
    {
        "id": 51,
        "enemyId": 16,
        "enemyName": "愚人众特辖队",
        "type": 1,
        "typeName": "普通怪",
        "name": "霜镌的执凭",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "配发给愚人众特辖队的执凭。镶嵌着霜色晶石的执凭是荣耀的象征，想必执有凭证者已在过去的行动中证明了自己的忠诚与价值。"
    },
    {
        "id": 52,
        "enemyId": 17,
        "enemyName": "巡陆艇",
        "type": 1,
        "typeName": "普通怪",
        "name": "毁损机轴",
        "quality": "white",
        "qualityName": "白色",
        "info": "在战斗中损毁的巡陆艇机轴。即便是精密的工艺也难以胜过高强度的磨耗，正如无论何等宏伟的理想也难以挽回因他人理想而枉死之人的性命。况且量产的机关称不上精密，量产的理想也难称是理想。"
    },
    {
        "id": 53,
        "enemyId": 17,
        "enemyName": "巡陆艇",
        "type": 1,
        "typeName": "普通怪",
        "name": "加固机轴",
        "quality": "green",
        "qualityName": "绿色",
        "info": "经过加固处理的巡陆艇机轴。无数的损毁报告才换来这微不足道的改良。从某种意义上来说，帝国军械宫的行政体制也许比它所制造的机械本身还要复杂数十倍，毕竟即便是最先进的巡陆艇，也不需要消耗数月甚至数年的时间来制造。"
    },
    {
        "id": 54,
        "enemyId": 17,
        "enemyName": "巡陆艇",
        "type": 1,
        "typeName": "普通怪",
        "name": "精制机轴",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "由设计局精制的巡陆艇机轴。在北国的工程师规划的图纸上，这不起眼的小东西曾经是象征着荣耀与技术进步的完美杰作，无数世代智慧的成果凝结在这小小的金属元件之中。于是它就这样散落在冰冷的泥土中，等待下一次的回收。"
    },
    {
        "id": 55,
        "enemyId": 18,
        "enemyName": "嵌合兽",
        "type": 1,
        "typeName": "普通怪",
        "name": "嵌合种",
        "quality": "white",
        "qualityName": "白色",
        "info": "异种合成魔兽体内的核心。合成魔兽生长于体内的最简单的核心。即便是最简单的核心，也蕴藏着一切合成造物生长的规划。"
    },
    {
        "id": 56,
        "enemyId": 18,
        "enemyName": "嵌合兽",
        "type": 1,
        "typeName": "普通怪",
        "name": "并生嵌合胞",
        "quality": "green",
        "qualityName": "绿色",
        "info": "异种合成魔兽体内的核心。合成魔兽体内相对复杂的核心，并生的核心意味着将要驱动两种生命的循环，以此构成同一个生物。"
    },
    {
        "id": 57,
        "enemyId": 18,
        "enemyName": "嵌合兽",
        "type": 1,
        "typeName": "普通怪",
        "name": "源生嵌合体",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "异种合成魔兽体内的核心。合成魔兽体内可承受的最为复杂的核心，已是受人工规划却完美的生命之种。将之制造而出的人，或许已理解生命本身被塑造的方式了吧。"
    },
    {
        "id": 58,
        "enemyId": 19,
        "enemyName": "至冬妖精",
        "type": 1,
        "typeName": "普通怪",
        "name": "幻造萤屑",
        "quality": "white",
        "qualityName": "白色",
        "info": "至冬妖精在战斗后的残留。生长在妖精身躯表面的晶片的碎屑，在掉落下来时失去了颜色，就犹如虫蛾的鳞屑一般。"
    },
    {
        "id": 59,
        "enemyId": 19,
        "enemyName": "至冬妖精",
        "type": 1,
        "typeName": "普通怪",
        "name": "幻造裂晶",
        "quality": "green",
        "qualityName": "绿色",
        "info": "至冬妖精在战斗后的残留。生长在妖精身躯表面的晶片的碎块，虽然已经空空如也，但是也能够感受到其中曾蕴含的独特力量。"
    },
    {
        "id": 60,
        "enemyId": 19,
        "enemyName": "至冬妖精",
        "type": 1,
        "typeName": "普通怪",
        "name": "幻造晶鳞石",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "至冬妖精在战斗后的残留。生长在妖精身躯表面的晶片，据说体表拥有更多晶片的妖精，便能驱使更多的力量。但没人知道力量究竟是蕴藏在他们身躯之中，只是借由晶块发散，还是晶块才是那些力量的载体。"
    },
    {
        "id": 61,
        "enemyId": 20,
        "enemyName": "丘丘精英",
        "type": 2,
        "typeName": "精英怪",
        "name": "沉重号角",
        "quality": "green",
        "qualityName": "绿色",
        "info": "粗砺的号角，是丘丘人用来警告同伴的道具。现在散布在号角上的战损使其失去了发声的功能。"
    },
    {
        "id": 62,
        "enemyId": 20,
        "enemyName": "丘丘精英",
        "type": 2,
        "typeName": "精英怪",
        "name": "黑铜号角",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "金属制的魔物号角。通常只能从格外强壮的丘丘人身上获得，因为鸣响号角是需要气力的事情。"
    },
    {
        "id": 63,
        "enemyId": 20,
        "enemyName": "丘丘精英",
        "type": 2,
        "typeName": "精英怪",
        "name": "黑金号角",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "隐隐反射着不祥光芒的金属号角，饰有材质不明的黑晶。几乎没有使用过，推测是丘丘人重要的仪式器具。"
    },
    {
        "id": 64,
        "enemyId": 21,
        "enemyName": "深渊法师",
        "type": 2,
        "typeName": "精英怪",
        "name": "地脉的旧枝",
        "quality": "green",
        "qualityName": "绿色",
        "info": "来自深邃地底的脆弱枯枝。即使饱经岁月，也能从斑驳的树皮下，看出尚未散尽的力量。"
    },
    {
        "id": 65,
        "enemyId": 21,
        "enemyName": "深渊法师",
        "type": 2,
        "typeName": "精英怪",
        "name": "地脉的枯叶",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "来自深邃地底的植物枝条。即使远离它的主人，其中也残留着低沉脉动的力量。"
    },
    {
        "id": 66,
        "enemyId": 21,
        "enemyName": "深渊法师",
        "type": 2,
        "typeName": "精英怪",
        "name": "地脉的新芽",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "据说有一株巨木曾经贯彻了世界的各处；据说这枝是它的一部分。仿佛从未被人折下带到遥远的地表，仍然充满了勃发的生机，长出了新叶。"
    },
    {
        "id": 67,
        "enemyId": 22,
        "enemyName": "愚人众·萤术士",
        "type": 2,
        "typeName": "精英怪",
        "name": "雾虚花粉",
        "quality": "green",
        "qualityName": "绿色",
        "info": "雾虚草在密闭空间中会产生的奇妙孢子，是飞萤喜好的事物。"
    },
    {
        "id": 68,
        "enemyId": 22,
        "enemyName": "愚人众·萤术士",
        "type": 2,
        "typeName": "精英怪",
        "name": "雾虚草囊",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "保存完好的雾虚草，有的人会利用飞萤对雾虚草的喜好，来控制它们。"
    },
    {
        "id": 69,
        "enemyId": 22,
        "enemyName": "愚人众·萤术士",
        "type": 2,
        "typeName": "精英怪",
        "name": "雾虚灯芯",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "将本就罕见的雾虚草集结成的束，会散发出幽晦的冥光；提着这种灯的人，则会召来飞萤与不幸。"
    },
    {
        "id": 70,
        "enemyId": 23,
        "enemyName": "遗迹守卫",
        "type": 2,
        "typeName": "精英怪",
        "name": "混沌装置",
        "quality": "green",
        "qualityName": "绿色",
        "info": "来自不再活动的古代遗迹构装体。曾经是维系它身躯的某个部位，有着精妙的工学美感。"
    },
    {
        "id": 71,
        "enemyId": 23,
        "enemyName": "遗迹守卫",
        "type": 2,
        "typeName": "精英怪",
        "name": "混沌回路",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "来自不再活动的古代遗迹构装体。曾经是驱使它行动的逻辑回路。其中蕴含的伟大技术，如今已经无人可解。"
    },
    {
        "id": 72,
        "enemyId": 23,
        "enemyName": "遗迹守卫",
        "type": 2,
        "typeName": "精英怪",
        "name": "混沌炉心",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "来自不再活动的古代遗迹构装体。曾经是驱动它活动的能源之心。若能理解、重构这样的神秘技术，或许能改变这个世界也说不定。"
    },
    {
        "id": 73,
        "enemyId": 24,
        "enemyName": "愚人众·债务处理人",
        "type": 2,
        "typeName": "精英怪",
        "name": "猎兵祭刀",
        "quality": "green",
        "qualityName": "绿色",
        "info": "某种锋利的合金武具。即便失去了原本的主人仍反射着令人不安的寒光。"
    },
    {
        "id": 74,
        "enemyId": 24,
        "enemyName": "愚人众·债务处理人",
        "type": 2,
        "typeName": "精英怪",
        "name": "特工祭刀",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "利用至冬国优越的技术制造的异形兵器，曾经属于某位资深特工。一般人不经训练，根本无法使用这种奇怪的武具。"
    },
    {
        "id": 75,
        "enemyId": 24,
        "enemyName": "愚人众·债务处理人",
        "type": 2,
        "typeName": "精英怪",
        "name": "督察长祭刀",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "在故主手中，曾处理过许多【债务】的凶恶武具。世上无人背后长眼，而这种兵器与相关的武艺则是针对这种弱点设计的。"
    },
    {
        "id": 76,
        "enemyId": 25,
        "enemyName": "龙蜥",
        "type": 2,
        "typeName": "精英怪",
        "name": "脆弱的骨片",
        "quality": "green",
        "qualityName": "绿色",
        "info": "从幼岩龙蜥身上找到的某种骨片。尽管十分脆弱，其中苏沪蕴含着某种难以言喻的力量。"
    },
    {
        "id": 77,
        "enemyId": 25,
        "enemyName": "龙蜥",
        "type": 2,
        "typeName": "精英怪",
        "name": "结实的骨片",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "出于某种理由，幼龙蜥十分珍惜的某种生物骨片。看上去有一定的年头，即使这种不通人言的龙兽，似乎对这种残骸也拥有某种特殊的憧憬。"
    },
    {
        "id": 78,
        "enemyId": 25,
        "enemyName": "龙蜥",
        "type": 2,
        "typeName": "精英怪",
        "name": "石化的骨片",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "击败幼龙蜥后有时能找到的石化骨片。幼龙蜥都梦想着成长为真正的龙。会把古老的化石认作是龙之骨而加以珍惜，或许是因为希冀着龙的永恒与强大吧。"
    },
    {
        "id": 79,
        "enemyId": 26,
        "enemyName": "愚人众·仕女",
        "type": 2,
        "typeName": "精英怪",
        "name": "黯淡棱镜",
        "quality": "green",
        "qualityName": "绿色",
        "info": "原本是能偏转光线的棱镜，在流水般的年岁中渐渐变得黯淡。"
    },
    {
        "id": 80,
        "enemyId": 26,
        "enemyName": "愚人众·仕女",
        "type": 2,
        "typeName": "精英怪",
        "name": "水晶棱镜",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "能够偏转光线的棱镜。利用这种棱镜，可以制造虚幻的影像。从某种意义而言，也因此有着操纵人心的力量。"
    },
    {
        "id": 81,
        "enemyId": 26,
        "enemyName": "愚人众·仕女",
        "type": 2,
        "typeName": "精英怪",
        "name": "偏光棱镜",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "能够偏转光线的棱镜。在黑暗中，棱镜可以将细微的光明散布到更大的范围里。这种棱镜对于内心常常被黑暗笼罩的人，有着令他们稍稍安心的力量。"
    },
    {
        "id": 82,
        "enemyId": 27,
        "enemyName": "遗迹机关",
        "type": 2,
        "typeName": "精英怪",
        "name": "混沌机关",
        "quality": "green",
        "qualityName": "绿色",
        "info": "来自不再活动的古代遗迹机关。似乎是拟生机关的动力来源。"
    },
    {
        "id": 83,
        "enemyId": 27,
        "enemyName": "遗迹机关",
        "type": 2,
        "typeName": "精英怪",
        "name": "混沌枢纽",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "来自不再活动的古代遗迹机关。在无法维持机关构装体的结构性之后，其中蕴含的伟大技术与未知力量也失去意义了吧。"
    },
    {
        "id": 84,
        "enemyId": 27,
        "enemyName": "遗迹机关",
        "type": 2,
        "typeName": "精英怪",
        "name": "混沌真眼",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "来自不再活动的古代遗迹机关。这类机关的【遗迹】之名源自它们热衷的活动区域。单遗迹机关本身与它们所寄居的残垣断壁之间却没有多少共同之处。在遥远的过去，遗迹曾经属于伟大的、几乎可以触碰天空穹顶的文明，而【遗迹】则在大地的深处蓄势待发，等待着踏平一切国度的指令下达。"
    },
    {
        "id": 85,
        "enemyId": 28,
        "enemyName": "兽境猎犬",
        "type": 2,
        "typeName": "精英怪",
        "name": "隐兽指爪",
        "quality": "green",
        "qualityName": "绿色",
        "info": "兽境群狼的残留身体组织。按照常理来说，这种与此世不容的事物不应在这种一场造物被驱逐后，残留于世才对。"
    },
    {
        "id": 86,
        "enemyId": 28,
        "enemyName": "兽境猎犬",
        "type": 2,
        "typeName": "精英怪",
        "name": "隐兽利爪",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "兽境群狼的身体组织。虽然奇妙，但是和大杰作【腐殖层】杜林相比，【淋溶层】猎犬不值一提。"
    },
    {
        "id": 87,
        "enemyId": 28,
        "enemyName": "兽境猎犬",
        "type": 2,
        "typeName": "精英怪",
        "name": "隐兽鬼抓",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "守军群狼的利爪。世之奇珍，但是和最高杰作【白垩层】相比，只是寻常之物罢了。"
    },
    {
        "id": 88,
        "enemyId": 29,
        "enemyName": "黯色空壳",
        "type": 2,
        "typeName": "精英怪",
        "name": "晦暗刻像",
        "quality": "green",
        "qualityName": "绿色",
        "info": "刻画着某人形象的小雕像。即使经过了长久的岁月，也没有受到任何损伤。似乎被原本的主人如同圣象一般呵护着。"
    },
    {
        "id": 89,
        "enemyId": 29,
        "enemyName": "黯色空壳",
        "type": 2,
        "typeName": "精英怪",
        "name": "夤夜刻像",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "刻画着某人形象的独目偶像。握在手中时似乎能感受到其中散发的丝丝暖意，就像挚友的臂膀那般。或许能给予明白雕像背后个中含义的人持续前进的勇气吧。"
    },
    {
        "id": 90,
        "enemyId": 29,
        "enemyName": "黯色空壳",
        "type": 2,
        "typeName": "精英怪",
        "name": "幽邃刻像",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "微微散发着不详的能量的独目刻像，是以何种材质制成则完全不可知。凝视着这尊偶像时，似乎能听见令人心情宁静的奇妙低语...【看吧，我孩子。天之座下的万物终将在动荡中消亡。永远宁静的漆黑深空会包容一切。】"
    },
    {
        "id": 91,
        "enemyId": 30,
        "enemyName": "遗迹龙兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "混沌容器",
        "quality": "green",
        "qualityName": "绿色",
        "info": "来自不再活动的古代遗迹龙兽。遗迹龙兽可以吸收外界的元素能量，并储存在【颈部】的构件中。"
    },
    {
        "id": 92,
        "enemyId": 30,
        "enemyName": "遗迹龙兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "混沌模块",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "来自不再活动的古代遗迹龙兽。【龙】是最为原始、古老的顶级元素受肉之形态，直到它们被击溃、被征服，抑或是被同化。"
    },
    {
        "id": 93,
        "enemyId": 30,
        "enemyName": "遗迹龙兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "混沌锚栓",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "来自不再活动的古代遗迹龙兽。已经失落的古国之中，曾有一派醉心于拟生之原理。无论是无相的纯粹秩序元素，或是龙的亘古原始力量，都应当加以拟造、改良，最终达到超越。如此便能以更为优越的无垢之身，取代终将朽败、终将破碎的秩序。"
    },
    {
        "id": 94,
        "enemyId": 31,
        "enemyName": "元能构装体",
        "type": 2,
        "typeName": "精英怪",
        "name": "破缺棱晶",
        "quality": "green",
        "qualityName": "绿色",
        "info": "打倒元能构装体后获得的破碎零件。这些造型特异的机械是沙漠遗迹永恒的守护者，具有足以凿穿岩山，重塑巨石的力量。驱动这些机械运作的原理与地上、地下许多神秘的机关相似。"
    },
    {
        "id": 95,
        "enemyId": 31,
        "enemyName": "元能构装体",
        "type": 2,
        "typeName": "精英怪",
        "name": "混浊棱晶",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "打倒元能构装体后获得的老旧零件。据说这些机械与同样来自沙海深处的【遗迹机关】不同，并不是作为歼灭与征服的使者被制造出来的。"
    },
    {
        "id": 96,
        "enemyId": 31,
        "enemyName": "元能构装体",
        "type": 2,
        "typeName": "精英怪",
        "name": "辉光棱晶",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "打倒元能构装体后获得的精巧零件。荒漠的王曾经做过一个梦，也做出过许多许诺。在荒漠的传说中，这些机械的造物原本是践行诺言的道具，如今也只有它们的机械记忆体中刻写着无人记得的梦与承诺吧。"
    },
    {
        "id": 97,
        "enemyId": 32,
        "enemyName": "圣骸兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "残毁的横脊",
        "quality": "green",
        "qualityName": "绿色",
        "info": "圣骸兽脊背上残毁的骨壳。昔日遍布四方之土的灾厄之证，如今唯有在人迹罕至之处方能寻得踪影。"
    },
    {
        "id": 98,
        "enemyId": 32,
        "enemyName": "圣骸兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "密固的横脊",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "圣骸兽脊背上坚实的骨壳。噬啮殒落的伟大生灵之躯骸，并藉此升衍的灾兽之骨。纵然窃得昔日权能的片影，兽群终究无法逃过与诸神相同的终局。"
    },
    {
        "id": 99,
        "enemyId": 32,
        "enemyName": "圣骸兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "锲纹的横脊",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "圣骸兽脊背上铭镌着古老徽记的骨壳。琅霜般净固的骨壳上，依稀萦绕着遥世的遗恨。终有一日，兽骨会在时之风中散作白灰，而那旧日倾殒的高贵者，最终也会迎来安眠之日吧..."
    },
    {
        "id": 100,
        "enemyId": 33,
        "enemyName": "丘丘游侠",
        "type": 2,
        "typeName": "精英怪",
        "name": "来自何处的待放之花",
        "quality": "green",
        "qualityName": "绿色",
        "info": "丘丘游侠曾珍视的野花。在开放前就被摘下了。它在荒野的巡礼中并不携带任何多余的物品，除了这朵未开之花。"
    },
    {
        "id": 101,
        "enemyId": 33,
        "enemyName": "丘丘游侠",
        "type": 2,
        "typeName": "精英怪",
        "name": "何人所珍藏之花",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "丘丘游侠曾珍视的野花，并不具有什么特别之处。花朵在许多文明当中都是表达心意的赠礼或谢礼。即使失去了文化的经纬，或许这种含义也并未折损吧。"
    },
    {
        "id": 102,
        "enemyId": 33,
        "enemyName": "丘丘游侠",
        "type": 2,
        "typeName": "精英怪",
        "name": "漫游者的盛放之花",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "丘丘游侠曾珍视的盛放野花，并不具有什么特别之处。永恒的异乡人从不索要酬劳，所行所为最终理应开花结果...常说自己的语言即是故乡所在，然而丘丘人是缺乏记忆与文字的魔物种族。对于这些流浪者而言，唯一的赞许就只有获赠的花朵上些许的香气了吧。"
    },
    {
        "id": 103,
        "enemyId": 34,
        "enemyName": "隙境原体",
        "type": 2,
        "typeName": "精英怪",
        "name": "隙间之核",
        "quality": "green",
        "qualityName": "绿色",
        "info": "隙境原体留下的碎屑。与地上任何生命形式都不具备相似之处。"
    },
    {
        "id": 104,
        "enemyId": 34,
        "enemyName": "隙境原体",
        "type": 2,
        "typeName": "精英怪",
        "name": "外世突触",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "隙境原体留下的碎屑。这种异形生命体的根源是厄里那斯，活动范围也以厄里那斯为主。"
    },
    {
        "id": 105,
        "enemyId": 34,
        "enemyName": "隙境原体",
        "type": 2,
        "typeName": "精英怪",
        "name": "异界生命核",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "隙境原体留下的核心。这种生命体并没有彻底消灭的手段，即使只剩下核心也会在翌日，或是数十年后再度复生。所幸似乎没有很强的攻击性与智性，所以枫丹人对其他大多采取的是敬而远之的态度。据与【护国的白骑士】同行的逐影猎人的记述，在厄里那斯的惨烈战斗结束后，曾经出现了大量的隙境原体。这些隙境原体并没有对他们采取任何攻击行为。"
    },
    {
        "id": 106,
        "enemyId": 35,
        "enemyName": "浊水幻灵",
        "type": 2,
        "typeName": "精英怪",
        "name": "浊水的一滴",
        "quality": "green",
        "qualityName": "绿色",
        "info": "击败浊水幻灵后，取得的一小滴水。其中的生命力似乎尚未完全消散。"
    },
    {
        "id": 107,
        "enemyId": 35,
        "enemyName": "浊水幻灵",
        "type": 2,
        "typeName": "精英怪",
        "name": "浊水的一掬",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "击败浊水幻灵后，取得的一小滴水。其中的生命力似乎尚未完全消散。过去的纯水精灵如今在枫丹已经绝迹，从水中升起的只有这些不具备优美形态的奇异元素生命体。"
    },
    {
        "id": 108,
        "enemyId": 35,
        "enemyName": "浊水幻灵",
        "type": 2,
        "typeName": "精英怪",
        "name": "初生的浊水幻灵",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "击败浊水幻灵后，即使再度升起的新生命体，被装在了禁锢的瓶中。水中所蕴含着的生命是无形的，而无形的生命也寄于水中，借由水之形诞生。枫丹古代的诗人与哲学家相信（或是希望），在时间开始之前的过去与时间结束后的未来，无数的生命在水中相遇，不再需要形体、语言与接触。一切不再诞生，也不再死亡。而水的世界则是一切生命的肢体延伸。这是世界最原始亦即最终极的形态，也是已经错过或是尚未到来的黄金时代。"
    },
    {
        "id": 109,
        "enemyId": 36,
        "enemyName": "愚人众·役人",
        "type": 2,
        "typeName": "精英怪",
        "name": "老旧的役人怀表",
        "quality": "green",
        "qualityName": "绿色",
        "info": "猎壳上徽记的磨损与氧化褪色忠实地记录着身为执行者，所度过的时日。"
    },
    {
        "id": 110,
        "enemyId": 36,
        "enemyName": "愚人众·役人",
        "type": 2,
        "typeName": "精英怪",
        "name": "役人的制式怀表",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "怀表把头的位置设计并不合理，外壳过多的棱角也容易将衣物磨破，所以总有人会将其中的机芯装配在更加朴实、缺乏特征性的套壳中使用。"
    },
    {
        "id": 111,
        "enemyId": 36,
        "enemyName": "愚人众·役人",
        "type": 2,
        "typeName": "精英怪",
        "name": "役人的时时刻刻",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "装载着【邪眼】的饰物，是愚人众役人元素力量的来源。但即使将之取下，役者仍然有着远超常人的身体素质，这些都来自漫长岁月的训练与实战经验；而她们往往清楚，自己的过去、现在与未来已经奉献给了愚人众的理想国，驱使邪眼的力量所带来的折损因此也不值一提。"
    },
    {
        "id": 112,
        "enemyId": 37,
        "enemyName": "玄文兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "羽状鳍翅",
        "quality": "green",
        "qualityName": "绿色",
        "info": "击败玄文兽后，从其背上取得的鳍翅残片。尽管不具备长距离飞行的能力，这些如同鸟羽一般的鳍翅依然能让玄文兽在驰逐猎物时更为迅疾。"
    },
    {
        "id": 113,
        "enemyId": 37,
        "enemyName": "玄文兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "月色鳍翅",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "击败玄文兽后，从其背上取得的鳍翅。其上隐隐折射着如月色般温润的幽光，不知为何给人一种宁谧感。所谓【玉魄流虚白，玄文照影明】，无论时岁如何流转，行走于山林的野兽总会缅念尚未陨落的月色，正如它们深藏在影与晚风中的秘密那般。"
    },
    {
        "id": 114,
        "enemyId": 37,
        "enemyName": "玄文兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "渊光鳍翅",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "击败玄文兽后，从其背上取得的华美鳍翅。其上折射着幽邃的微光，能隐隐感受到仙力的痕迹。更深夜静之时，即便是凶暴的野兽亦会短暂沉入宁谧的安眠，追忆【梦】尚不独属于人的年岁。然而曾经创造许多美梦的主人早已不复，昔时的梦亦如沉入渊底的幽光，再也难觅其踪。"
    },
    {
        "id": 115,
        "enemyId": 38,
        "enemyName": "魔像禁卫",
        "type": 2,
        "typeName": "精英怪",
        "name": "残毁的剑柄",
        "quality": "green",
        "qualityName": "绿色",
        "info": "自古老雕像上取得的石制剑柄。在海水的冲刷下已彻底残毁，失去了曾经的光泽。"
    },
    {
        "id": 116,
        "enemyId": 38,
        "enemyName": "魔像禁卫",
        "type": 2,
        "typeName": "精英怪",
        "name": "裂断的剑柄",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "自古老雕像上取得的石制剑柄。剑柄上的断口与刻痕似乎记录了其主人曾经历过的残酷战斗。"
    },
    {
        "id": 117,
        "enemyId": 38,
        "enemyName": "魔像禁卫",
        "type": 2,
        "typeName": "精英怪",
        "name": "未熄的剑柄",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "自古老雕像上取得的石制剑柄。或许是因为刚刚离开其主人的缘故，剑柄中的火光还尚未熄灭。"
    },
    {
        "id": 118,
        "enemyId": 39,
        "enemyName": "熔岩游像",
        "type": 2,
        "typeName": "精英怪",
        "name": "聚燃的石块",
        "quality": "green",
        "qualityName": "绿色",
        "info": "击败熔岩游像之后，从其体内取得的碎块。即使已经破碎到了这个程度，其中的燃烧也并没有停止，或许是因为燃素所具备的超常活力所致。"
    },
    {
        "id": 119,
        "enemyId": 39,
        "enemyName": "熔岩游像",
        "type": 2,
        "typeName": "精英怪",
        "name": "聚燃的命种",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "击败熔岩游像之后，从其体内取得的聚燃堆。散发着些微的热量。到了这种规模的石堆，已经很难阻止其不断燃烧下去了。据说，这就是某种生命初始的形态。"
    },
    {
        "id": 120,
        "enemyId": 39,
        "enemyName": "熔岩游像",
        "type": 2,
        "typeName": "精英怪",
        "name": "聚燃的游像眼",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "击败熔岩游像之后，从其体内取得的核心。散发着相当的热量。据说只要形成这样的核心，放置不管就会形成新的熔岩游像。古老的文明一度认为生命的所有形式来源于火的燃烧，认为灵魂与智慧的起源即是聚燃的火种。熔岩游像这一生命体或许印证了这样的说法，又或者，是那样的理论使它诞生在了纳塔的大地上..."
    },
    {
        "id": 121,
        "enemyId": 40,
        "enemyName": "大灵显化身",
        "type": 2,
        "typeName": "精英怪",
        "name": "意志破碎的残片",
        "quality": "green",
        "qualityName": "绿色",
        "info": "大灵显化身寄宿的残片。破碎的石偶断片，其承载的【大灵】意志与力量也十分有限。"
    },
    {
        "id": 122,
        "enemyId": 40,
        "enemyName": "大灵显化身",
        "type": 2,
        "typeName": "精英怪",
        "name": "意志明晰的寄偶",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "大灵显化身寄宿的玉偶。能够隐约看到形制的玉偶雕像，能够承载更多【大灵】的意志与力量。"
    },
    {
        "id": 123,
        "enemyId": 40,
        "enemyName": "大灵显化身",
        "type": 2,
        "typeName": "精英怪",
        "name": "意志巡游的符像",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "大灵显化身寄宿的黑曜石符像。环绕黑曜石的玉偶雕像，据说从前的人经常用这样的雕像，尝试与夜神国度中的【大灵】进行沟通，或许这也是【大灵】能够凭依在其上，并显化出形体的缘由吧。"
    },
    {
        "id": 124,
        "enemyId": 41,
        "enemyName": "秘源机兵",
        "type": 2,
        "typeName": "精英怪",
        "name": "秘源轴",
        "quality": "green",
        "qualityName": "绿色",
        "info": "来自不再活动的秘源机兵。看上去只是两个机关之间的承接结构。"
    },
    {
        "id": 125,
        "enemyId": 41,
        "enemyName": "秘源机兵",
        "type": 2,
        "typeName": "精英怪",
        "name": "秘源机鞘",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "来自不再活动的秘源机兵。看上去是承载秘源机械体运作的机关，但其核心之处空空如也。"
    },
    {
        "id": 126,
        "enemyId": 41,
        "enemyName": "秘源机兵",
        "type": 2,
        "typeName": "精英怪",
        "name": "秘源真芯",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "来自不再活动的秘源机兵。看上去是完整的驱动秘源机械体运作的核心，似乎是作为通用的组件而被制造出来的奇特装置。传说古老文明的伟大住民辉用金纹创生的智慧勾勒奇异机械体运作的蓝图，或许这核心也是其中之一吧。"
    },
    {
        "id": 127,
        "enemyId": 42,
        "enemyName": "深邃拟覆叶",
        "type": 2,
        "typeName": "精英怪",
        "name": "折光的胚芽",
        "quality": "green",
        "qualityName": "绿色",
        "info": "名为深邃拟覆叶的魔物在被击败后所掉落的芽叶。据说这种魔物自黑潮之中诞生时，最先生长而出的，就是这样能使元素的力量偏转的嫩芽。"
    },
    {
        "id": 128,
        "enemyId": 42,
        "enemyName": "深邃拟覆叶",
        "type": 2,
        "typeName": "精英怪",
        "name": "惑光的阔叶",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "名为深邃拟覆叶的魔物在被击败后所掉落的箭形叶片。在侵蚀地脉并抽取其中的记忆后，魔物所生长出的承载自身解析出信息的载体。魔物能够拟态复现何种形态，或许与这些具有复杂纹路的枝叶息息相关。"
    },
    {
        "id": 129,
        "enemyId": 42,
        "enemyName": "深邃拟覆叶",
        "type": 2,
        "typeName": "精英怪",
        "name": "迷光的蜷叶之心",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "名为深邃拟覆叶的魔物在被击败后所残余，由蜷缩在一起的叶片构成的核心。即使已如生机尽失般黯淡下去，但是仍能感受到其中隐约鼓动的不祥之力。时常有人感到困惑，当此种魔物被消灭时，它从大地之中汲取的那些记忆都去往了何处？或许这枚核心提供了这一问题的答案。"
    },
    {
        "id": 130,
        "enemyId": 43,
        "enemyName": "炉壳山鼬",
        "type": 2,
        "typeName": "精英怪",
        "name": "冷裂壳块",
        "quality": "green",
        "qualityName": "绿色",
        "info": "击败炉壳山鼬后，从其背上取得的背壳的残片。一度燃烧，但此时已经冷却的背壳的裂块，已经失去其中蕴藏的如火的光彩。"
    },
    {
        "id": 131,
        "enemyId": 43,
        "enemyName": "炉壳山鼬",
        "type": 2,
        "typeName": "精英怪",
        "name": "蕴热的背壳",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "击败炉壳山鼬后，从其背上取得的背壳的部分结构。炉壳山鼬会在贝壳之后蕴积进食所得的燃素，以备不时之需，燃火的鼬兽在圣山中腾跃时的一抹焰色，或许是长久以来都未曾被人窥得的风景吧。"
    },
    {
        "id": 132,
        "enemyId": 43,
        "enemyName": "炉壳山鼬",
        "type": 2,
        "typeName": "精英怪",
        "name": "明燃的棱状壳",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "击败炉壳山鼬后，从其背上取得的完整的背壳碎块。据说在一个种群之中，地位越高的炉壳山鼬，其背后蕴藏的燃素会更多，而地位越低越弱的个体，背后蕴藏的燃素越少。形成这个现象的原因也许很好解释：地位越高的炉壳山鼬，需要运用到背后积蓄的燃素的机会或许永远没有地位低的个体那样多吧。"
    },
    {
        "id": 133,
        "enemyId": 44,
        "enemyName": "狂猎",
        "type": 2,
        "typeName": "精英怪",
        "name": "幽雾化形",
        "quality": "green",
        "qualityName": "绿色",
        "info": "在狂猎迷雾中寻得的碎块。如同雪花一般，是由来自异界的漆黑力量显化凝结而成的。"
    },
    {
        "id": 134,
        "enemyId": 44,
        "enemyName": "狂猎",
        "type": 2,
        "typeName": "精英怪",
        "name": "幽雾片甲",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "在狂猎迷雾中寻得的甲片。曾是狂猎魔物所着盔甲的一部分，不知为何没有随着迷雾一同消失。"
    },
    {
        "id": 135,
        "enemyId": 44,
        "enemyName": "狂猎",
        "type": 2,
        "typeName": "精英怪",
        "name": "幽雾兜盔",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "在狂猎的迷雾中寻得的兜鍪。或许是因为来自异界的不洁存在汲取了地脉中古老的记忆，造型与失落古国的遗物颇为相似。"
    },
    {
        "id": 136,
        "enemyId": 45,
        "enemyName": "霜夜灵嗣",
        "type": 2,
        "typeName": "精英怪",
        "name": "霜夜的残照",
        "quality": "green",
        "qualityName": "绿色",
        "info": "击败霜夜灵嗣后，从其角冠上取得的残片。传说在遥远的过去，这些高贵的生灵亦是黄金之城的侍仆，辉映于其瞳中的乃是至圣至耀的天光。如今那缕残光早已熄灭，而失却了旧主的灵嗣依然漫行于月下的霜夜，守望无人铭记的誓言。"
    },
    {
        "id": 137,
        "enemyId": 45,
        "enemyName": "霜夜灵嗣",
        "type": 2,
        "typeName": "精英怪",
        "name": "霜夜的柔辉",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "击败霜夜灵嗣后，从其角冠上取得的碎块。在霜月之子最古老的口头传承祷歌中，这些高贵生灵的辉光曾被终北的哲人称作神使无垢的垂怜。尽管垂怜最终末能阻止黄金城的覆灭，也未能让她的后裔免于流离于荒野的命运，但那柔辉依然流淌在角冠上，等待着也许不会再度降临的梦。"
    },
    {
        "id": 138,
        "enemyId": 45,
        "enemyName": "霜夜灵嗣",
        "type": 2,
        "typeName": "精英怪",
        "name": "霜夜的煌荣",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "击败霜夜灵嗣后，从其角冠上取得的骨甲。其上萦缠着如月光般柔润的温存，即便是在寒夜最深之时亦不会消退。从某种意义上来说，与霜月之子一样，这是这些高贵的生灵最后的坚守。它们侍奉的旧主已经殒入尘埃，它们的梦中却依然辉耀着金色的煌荣。"
    },
    {
        "id": 139,
        "enemyId": 46,
        "enemyName": "蕴光兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "失光块骨",
        "quality": "green",
        "qualityName": "绿色",
        "info": "自蕴光的魔兽体表，取下的黯淡骨块。浸润古老月之力的魔兽生长出来的外骨的碎块，已经失去其中蕴藏的隐秘与一度显曜的光亮。"
    },
    {
        "id": 140,
        "enemyId": 46,
        "enemyName": "蕴光兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "稀光遗骼",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "自蕴光的魔兽体表，取下的散发微光的骨块。仍然残留一部分古老月之力的外骨遗骸，在其中能看到因月之力浸润已久，即使已脱离了本体许久仍无法褪去的深邃颜色。"
    },
    {
        "id": 141,
        "enemyId": 46,
        "enemyName": "蕴光兽",
        "type": 2,
        "typeName": "精英怪",
        "name": "繁光躯外骸",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "自蕴光的魔兽体表，取下的散发着清凉光芒的巨大骨块。曾受古老月之力恩赐的魔兽，能够通过这种的漫长岁月中浸入深髓中的光亮，操纵生长而出的外骨，对它们来说，即使并未完全在生理结构上连接，但浮于体表的外骨仍然是可随心念驱使的身躯的一部分吧。"
    },
    {
        "id": 142,
        "enemyId": 47,
        "enemyName": "深黯钓客",
        "type": 2,
        "typeName": "精英怪",
        "name": "深黯的裂眼",
        "quality": "green",
        "qualityName": "绿色",
        "info": "自异界侵入的钓客，在形体消散后留下的残屑。表壳破碎后，寄宿在其中的恶意也随之消泯。"
    },
    {
        "id": 143,
        "enemyId": 47,
        "enemyName": "深黯钓客",
        "type": 2,
        "typeName": "精英怪",
        "name": "深黯的怪核",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "自异界侵入的钓客，在形体消散后留下的残屑。机能已然停止的核心，与地上任何生物的器官组织都没有相似之处。"
    },
    {
        "id": 144,
        "enemyId": 47,
        "enemyName": "深黯钓客",
        "type": 2,
        "typeName": "精英怪",
        "name": "深黯的钩喙",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "自异界侵入的钓客，在形体消散后留下的残屑。形如禽类的钩喙，乃是天外的捕食者们用于储存所攫获生物质的容器。"
    },
    {
        "id": 145,
        "enemyId": 48,
        "enemyName": "辖域守护者",
        "type": 2,
        "typeName": "精英怪",
        "name": "失色的焰剑",
        "quality": "green",
        "qualityName": "绿色",
        "info": "辖域守护者所持的焰剑熄灭后遗留下的剑柄。发火焰的宝剑是守护的象征，依仗【空】之权柄，封锁了永恒域须臾的边界。"
    },
    {
        "id": 146,
        "enemyId": 48,
        "enemyName": "辖域守护者",
        "type": 2,
        "typeName": "精英怪",
        "name": "残失的焰剑",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "辖域守护者所持的焰剑熄灭后遗留下的剑柄。发火焰的宝剑是守护的象征，依仗【空】之权柄，封锁了逾越与亵渎的道路。"
    },
    {
        "id": 147,
        "enemyId": 48,
        "enemyName": "辖域守护者",
        "type": 2,
        "typeName": "精英怪",
        "name": "宝饰的焰剑",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "辖域守护者所持的焰剑熄灭后遗留下的剑柄。发火焰的宝剑是守护的象征，依仗【空】之权柄，宣告了绝对且无谬的神意。"
    },
    {
        "id": 148,
        "enemyId": 49,
        "enemyName": "秘源统辖阵列",
        "type": 2,
        "typeName": "精英怪",
        "name": "残损的月铁",
        "quality": "green",
        "qualityName": "绿色",
        "info": "击败游荡于月面的古老机关后，自其内部取得的残片。似乎与提瓦特常见的金属有所不同。各国失落的古老民话中，往往有着英雄将空月赐予的【神铁】锻为无坚不摧的兵刃，战胜仇敌或魔怪的传说。"
    },
    {
        "id": 149,
        "enemyId": 49,
        "enemyName": "秘源统辖阵列",
        "type": 2,
        "typeName": "精英怪",
        "name": "空竭的月铁",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "击败游荡于月面的古老机关后，自其内部取得的构件。似乎与提瓦特常见的金属有所不同。各国失落的古老民话中，往往有着英雄将空月赐予的【神铁】锻为无坚不摧的兵刃，战胜仇敌或魔怪的传说。只是自空月失坠的金属并非神赐——即便是高居月上的神明，也早在那之前殒落。"
    },
    {
        "id": 150,
        "enemyId": 49,
        "enemyName": "秘源统辖阵列",
        "type": 2,
        "typeName": "精英怪",
        "name": "无秽的月铁",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "击败游荡于月面的古老机关后，自其内部取得的核心。似乎与提瓦特常见的金属有所不同。未曾沾染地上污秽之物，弃绝七灾八苦的永恒之物，曾一度渴慕向无尽深空歌唱之物——在一切演算的结末，留在月宫中，不过只有无用的冷铁而已。"
    },
    {
        "id": 151,
        "enemyId": 50,
        "enemyName": "树妖",
        "type": 2,
        "typeName": "精英怪",
        "name": "灵生空根",
        "quality": "green",
        "qualityName": "绿色",
        "info": "树妖在回归沉寂前掉落的枝节。没有生长出太多的晶石的枝节，力量微弱的枝节，散发着微弱的荧光。"
    },
    {
        "id": 152,
        "enemyId": 50,
        "enemyName": "树妖",
        "type": 2,
        "typeName": "精英怪",
        "name": "灵生分蘖节",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "树妖在回归沉寂前掉落的枝节。生长出一定晶石的枝节，沉甸甸的，能从中感受到离开树妖的主体后尚未消失的生命力。"
    },
    {
        "id": 153,
        "enemyId": 50,
        "enemyName": "树妖",
        "type": 2,
        "typeName": "精英怪",
        "name": "灵生盘枝心",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "树妖在回归沉寂前掉落的枝节。完整生长出晶石核心的枝节，其中蕴含着不会轻易消失的生命力。如果现在将之埋在土地之中，恐怕很快就能生长出新的树妖吧。"
    },
    {
        "id": 154,
        "enemyId": 51,
        "enemyName": "兽怪",
        "type": 2,
        "typeName": "精英怪",
        "name": "沉积残片",
        "quality": "green",
        "qualityName": "绿色",
        "info": "力量强大的兽怪形成的残积物。刚开始在体内器官或骨骼上附着的残积物，随着力量的增长，或许会完整覆盖某一片躯体或某一个器官吧。"
    },
    {
        "id": 155,
        "enemyId": 51,
        "enemyName": "兽怪",
        "type": 2,
        "typeName": "精英怪",
        "name": "沉积结块",
        "quality": "blue",
        "qualityName": "蓝色",
        "info": "力量强大的兽怪形成的残积物。经附着体内器官或骨骼许久的残积物。这些残积物在被取出后，将被视为力量的象征，会被该族群的后裔好好保存。"
    },
    {
        "id": 156,
        "enemyId": 51,
        "enemyName": "兽怪",
        "type": 2,
        "typeName": "精英怪",
        "name": "沉积增生物",
        "quality": "purple",
        "qualityName": "紫色",
        "info": "力量强大的兽怪形成的残积物。完整附看器官或骨骼的残积物，甚至可以说在力量循环的节点增生了新的骨骼或器官。唯有寿数漫长而修行不意的粤怪能在体内形成这样的增生物。"
    }
];
