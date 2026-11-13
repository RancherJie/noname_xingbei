# 十周年语音包

这是一个不修改游戏核心文件的独立技能语音扩展。

## 技能语音左右声道

默认开启空间声道：以本客户端角色为听音中心，按照发声角色当前在牌桌画面中的左右位置调整语音方向。自己的语音保持居中，正对面的角色也保持居中，其他位置最大偏移限制为 65%，避免单侧声道过强。

该功能只处理本语音包的音频，不影响游戏背景音乐与其他扩展。浏览器内核不支持 Web Audio、无法确认发声角色或界面尚未完成布局时，会自动使用中央声道。可在扩展设置中关闭“技能语音左右声道”。

## 全角色行动语音预留

语音包已为所有当前及未来角色统一预留【购买】【合成】【提炼】语音槽位。角色执行对应行动时，会按角色 ID 尝试播放以下文件；文件不存在时静默跳过，不影响行动结算，也不会显示技能提示：

- 购买：`audio/action/<角色ID>/gouMai.mp3`
- 合成：`audio/action/<角色ID>/heCheng.mp3`
- 提炼：`audio/action/<角色ID>/tiLian.mp3`

例如李逍遥的三个槽位为`audio/action/liXiaoYao/gouMai.mp3`、`heCheng.mp3`与`tiLian.mp3`。新增音频用于发布时，还需将实际文件路径登记到扩展的`files.audio`资源清单。

## 当前收录

### 风之剑圣

- 【风怒追击】：`audio/skill/fengZhiJianSheng/fengNuZhuiJi.mp3`
- 【圣剑】：`audio/skill/fengZhiJianSheng/shengJian.mp3`
- 【烈风技】：`audio/skill/fengZhiJianSheng/lieFengJi.mp3`
- 【疾风技】：`audio/skill/fengZhiJianSheng/jiFengJi.mp3`
- 【剑影】：`audio/skill/fengZhiJianSheng/jianYing.mp3`

### 狂战士

- 【狂化】：`audio/skill/kuangZhanShi/kuangHua.mp3`
- 【血影狂刀】：`audio/skill/kuangZhanShi/xueYingKuangDao.mp3`
- 【血腥咆哮】：`audio/skill/kuangZhanShi/xueXingPaoXiao.mp3`
- 【撕裂】：`audio/skill/kuangZhanShi/siLie.mp3`

### 神箭手

- 【闪电箭】：`audio/skill/shenJianShou/shanDianJian.mp3`
- 【贯穿射击】：`audio/skill/shenJianShou/guanChuanSheJi.mp3`
- 【闪光陷阱】：`audio/skill/shenJianShou/shanGuangXianJing.mp3`
- 【精准射击】：`audio/skill/shenJianShou/jingZhunSheJi.mp3`
- 【狙击】：`audio/skill/shenJianShou/juJi.mp3`

### EX魔弓

- 【神风矢】：`audio/skill/moGongEX/shenFengShi.mp3`
- 【疾风追射】：`audio/skill/moGongEX/jiFengZhuiShe.mp3`
- 【闪光陷阱】：`audio/skill/moGongEX/shanGuangXianJing.mp3`
- 【精准射击】：`audio/skill/moGongEX/jingZhunSheJi.mp3`
- 【狙击】：`audio/skill/moGongEX/juJi.mp3`

### 封印师

- 【法术激荡】：`audio/skill/fengYinShi/faShuJiDang.mp3`
- 【地之封印】：`audio/skill/fengYinShi/diZhiFengYin.mp3`
- 【水之封印】：`audio/skill/fengYinShi/shuiZhiFengYin.mp3`
- 【火之封印】：`audio/skill/fengYinShi/huoZhiFengYin.mp3`
- 【风之封印】：`audio/skill/fengYinShi/fengZhiFengYin.mp3`
- 【雷之封印】：`audio/skill/fengYinShi/leiZhiFengYin.mp3`
- 【五系束缚】：`audio/skill/fengYinShi/wuXiShuFu.mp3`
- 【封印破碎】：`audio/skill/fengYinShi/fengYinPoSui.mp3`

### 暗杀者

- 【反噬】：`audio/skill/anShaZhe/fanShi.mp3`
- 【水影】：`audio/skill/anShaZhe/shuiYing.mp3`
- 【潜行】：`audio/skill/anShaZhe/qianXing.mp3`

### 圣女

- 【冰霜祷言】：`audio/skill/shengNv/bingShuangDaoYan.mp3`
- 【治疗术】：`audio/skill/shengNv/zhiLiaoShu.mp3`
- 【治愈之光】：`audio/skill/shengNv/zhiYuZhiGuang.mp3`
- 【怜悯】：`audio/skill/shengNv/lianMin.mp3`
- 【圣疗】：`audio/skill/shengNv/shengLiao.mp3`

### 守护天使

- 【风之洁净】：`audio/skill/tianShi/fengZhiJieJing.mp3`
- 【天使祝福】：`audio/skill/tianShi/tianShiZhuFu.mp3`
- 【天使羁绊】：`audio/skill/tianShi/tianShiJiBan.mp3`
- 【天使之墙】：`audio/skill/tianShi/tianShiZhiQiang.mp3`
- 【天使之歌】：`audio/skill/tianShi/tianShiZhiGe.mp3`
- 【神之庇护】：`audio/skill/tianShi/shenZhiBiHu.mp3`

### 魔法少女

- 【魔爆冲击】：`audio/skill/moFaShaoNv/moBaoChongJi.mp3`
- 【魔弹掌握】：`audio/skill/moFaShaoNv/moDanZhangWo.mp3`
- 【魔弹融合】：`audio/skill/moFaShaoNv/moDanRongHe.mp3`
- 【毁灭风暴】：`audio/skill/moFaShaoNv/huiMieFengBao.mp3`

### 魔剑士

- 【修罗连斩】：`audio/skill/moJianShi/xiuLuoLianZhan.mp3`
- 【暗影凝聚】：`audio/skill/moJianShi/anYingNingJu.mp3`
- 【暗影之力】：`audio/skill/moJianShi/anYingZhiLi.mp3`
- 【暗影抗拒】：`audio/skill/moJianShi/anYingKangJu.mp3`
- 【暗影流星】：`audio/skill/moJianShi/anYingLiuXing.mp3`
- 【黄泉震颤】：`audio/skill/moJianShi/huangQuanZhengChan.mp3`

### 圣枪骑士

- 【神圣信仰】：`audio/skill/shengQiangQiShi/shenShengXinYang.mp3`
- 【辉耀】：`audio/skill/shengQiangQiShi/huiYao.mp3`
- 【惩戒】：`audio/skill/shengQiangQiShi/chengJie.mp3`
- 【圣击】：`audio/skill/shengQiangQiShi/shengJi.mp3`
- 【天枪】：`audio/skill/shengQiangQiShi/tianQiang.mp3`
- 【地枪】：`audio/skill/shengQiangQiShi/diQiang.mp3`
- 【圣光祈愈】：`audio/skill/shengQiangQiShi/shengGuangQiYu.mp3`

### 元素师

- 【元素吸收】：`audio/skill/yuanSuShi/yuanSuXiShou.mp3`
- 【元素点燃】：`audio/skill/yuanSuShi/yuanSuDianRan.mp3`
- 【陨石】：`audio/skill/yuanSuShi/yunShi.mp3`
- 【冰冻】：`audio/skill/yuanSuShi/bingDong.mp3`
- 【火球】：`audio/skill/yuanSuShi/huoQou.mp3`
- 【风刃】：`audio/skill/yuanSuShi/fengRen.mp3`
- 【雷击】：`audio/skill/yuanSuShi/leiJi.mp3`
- 【月光】：`audio/skill/yuanSuShi/yueGuang.mp3`

### 冒险家

- 【欺诈】：`audio/skill/maoXianJia/qiZha.mp3`
- 【强运】：`audio/skill/maoXianJia/qiangYun.mp3`
- 【地下法则】：`audio/skill/maoXianJia/diXiaFaZe.mp3`
- 【冒险者天堂】：`audio/skill/maoXianJia/maoXianJiaTianTang.mp3`
- 【偷天换日】：`audio/skill/maoXianJia/touTianHuanRi.mp3`

### 瘟疫法师

- 【不朽】：`audio/skill/wenYiFaShi/buXiu.mp3`
- 【圣渎】：`audio/skill/wenYiFaShi/shengDu.mp3`
- 【瘟疫】：`audio/skill/wenYiFaShi/wenYi.mp3`
- 【死亡之触】：`audio/skill/wenYiFaShi/siWangZhiChu.mp3`
- 【剧毒新星】：`audio/skill/wenYiFaShi/juDuXinXing.mp3`

### 仲裁者

- 【仲裁法则】：`audio/skill/zhongCaiZhe/zhongCaiFaZe.mp3`
- 【仪式中断】：`audio/skill/zhongCaiZhe/yiShiZhongDuan.mp3`
- 【末日审判】：`audio/skill/zhongCaiZhe/moRiShenPan.mp3`
- 【审判浪潮】：`audio/skill/zhongCaiZhe/shenPanLangChao.mp3`
- 【仲裁仪式】：`audio/skill/zhongCaiZhe/zhongCaiYiShi.mp3`
- 【判决天平】：`audio/skill/zhongCaiZhe/panJueTianPing.mp3`

### 神官

- 【神圣启示】：`audio/skill/shenGuan/shenShengQiShi.mp3`
- 【神圣祈福】：`audio/skill/shenGuan/shenShengQiFu.mp3`
- 【水之神力】：`audio/skill/shenGuan/shuiZhiShenLi.mp3`
- 【圣使守护】：`audio/skill/shenGuan/shengShiShouHu.mp3`
- 【神圣契约】：`audio/skill/shenGuan/shenShengQiYue.mp3`
- 【神圣领域】：`audio/skill/shenGuan/shenShengLingYu.mp3`

### 祈祷师

- 【光辉信仰】：`audio/skill/qiDaoShi/guangHuiXinYang.mp3`
- 【黑暗诅咒】：`audio/skill/qiDaoShi/heiAnZuZhou.mp3`
- 【威力赐福】：`audio/skill/qiDaoShi/weiLiCiFu.mp3`
- 【迅捷赐福】：`audio/skill/qiDaoShi/xunJieCiFu.mp3`
- 【祈祷】：`audio/skill/qiDaoShi/qiDao.mp3`
- 【法力潮汐】：`audio/skill/qiDaoShi/faLiChaoXi.mp3`

### 贤者

- 【智慧法典】：`audio/skill/xianZhe/zhiHuiFaDian.mp3`
- 【法术反弹】：`audio/skill/xianZhe/faShuFanTan.mp3`
- 【魔道法典】：`audio/skill/xianZhe/moDaoFaDian.mp3`
- 【圣洁法典】：`audio/skill/xianZhe/shengJieFaDian.mp3`

### 灵符师

- 【灵符－雷鸣】：`audio/skill/lingFuShi/lingFu_leiMing.mp3`
- 【灵符－风行】：`audio/skill/lingFuShi/lingFu_fengXing.mp3`
- 【念咒】：`audio/skill/lingFuShi/nianZhou.mp3`
- 【百鬼夜行】：`audio/skill/lingFuShi/baiGuiYeXing.mp3`
- 【灵力崩解】：`audio/skill/lingFuShi/lingLiBengJie.mp3`

### 格斗家

- 【念气立场】：`audio/skill/geDouJia/nianQiLiChang.mp3`
- 【蓄力一击】：`audio/skill/geDouJia/xuLiYiji.mp3`
- 【念弹】：`audio/skill/geDouJia/nianDan.mp3`
- 【百式幻龙拳】：`audio/skill/geDouJia/baiShiHuanLongQuan.mp3`
- 【气绝崩击】：`audio/skill/geDouJia/qiJueBengJi.mp3`
- 【斗神天驱】：`audio/skill/geDouJia/douShenTianQu.mp3`

### 剑帝

- 【剑魂守护】：`audio/skill/jianDi/jianHunShouHu.mp3`
- 【佯攻】：`audio/skill/jianDi/yangGong.mp3`
- 【剑气斩】：`audio/skill/jianDi/jianQiZhan.mp3`
- 【天使之魂】：`audio/skill/jianDi/tianShiZhiHun.mp3`
- 【恶魔之魂】：`audio/skill/jianDi/eMoZhiHun.mp3`
- 【不屈意志】：`audio/skill/jianDi/buQuYiZhi.mp3`

### 灵魂术士

- 【灵魂吞噬】：`audio/skill/lingHunShuShi/lingHunTunShi.mp3`
- 【灵魂召还】：`audio/skill/lingHunShuShi/lingHunZhaoHuan.mp3`
- 【灵魂转换】：`audio/skill/lingHunShuShi/lingHunZhuanHuan.mp3`
- 【灵魂镜像】：`audio/skill/lingHunShuShi/lingHunJingXiang.mp3`
- 【灵魂震爆】：`audio/skill/lingHunShuShi/lingHunZhenBao.mp3`
- 【灵魂赋予】：`audio/skill/lingHunShuShi/lingHunFuYu.mp3`
- 【灵魂链接】：`audio/skill/lingHunShuShi/lingHunLianJie.mp3`
- 【灵魂增幅】：`audio/skill/lingHunShuShi/lingHunZengFu.mp3`

### 蝶舞者

- 【生命之火】：`audio/skill/dieWuZhe/shengMingZhiHuo.mp3`
- 【舞动】：`audio/skill/dieWuZhe/wuDong.mp3`
- 【毒粉】：`audio/skill/dieWuZhe/duFen.mp3`
- 【朝圣】：`audio/skill/dieWuZhe/chaoSheng.mp3`
- 【镜花水月】：`audio/skill/dieWuZhe/jingHuaShuiYue.mp3`
- 【凋零】：`audio/skill/dieWuZhe/diaoLing.mp3`
- 【蛹化】：`audio/skill/dieWuZhe/yongHua.mp3`
- 【倒逆之蝶】：`audio/skill/dieWuZhe/daoNiZhiDie.mp3`

### 勇者

- 【勇者之心】：`audio/skill/yongZhe/yongZheZhiXin.mp3`
- 【怒吼】：`audio/skill/yongZhe/nuHou.mp3`
- 【精疲力竭】：`audio/skill/yongZhe/jinPiLiJin.mp3`
- 【明镜止水】：`audio/skill/yongZhe/mingJingZhiShui.mp3`
- 【挑衅】：`audio/skill/yongZhe/tiaoXin.mp3`
- 【禁断之力】：`audio/skill/yongZhe/jinDuanZhiLi.mp3`
- 【死斗】：`audio/skill/yongZhe/siDou.mp3`

### 血之巫女

- 【血之哀伤】：`audio/skill/xueZhiWuNv/xueZhiAiShang.mp3`
- 【流血】：`audio/skill/xueZhiWuNv/liuXue.mp3`
- 【逆流】：`audio/skill/xueZhiWuNv/niLiu.mp3`
- 【血之悲鸣】：`audio/skill/xueZhiWuNv/xueZhiBeiMing.mp3`
- 【同生共死】：`audio/skill/xueZhiWuNv/tongShengGongSi.mp3`
- 【血之诅咒】：`audio/skill/xueZhiWuNv/xueZhiZuZhou.mp3`

### 女武神

- 【神圣追击】：`audio/skill/nvWuShen/shenShengZhuiJi.mp3`
- 【秩序之印】：`audio/skill/nvWuShen/zhiXuZhiYin.mp3`
- 【和平行者】：`audio/skill/nvWuShen/hePingXingZhe.mp3`
- 【军神威光】：`audio/skill/nvWuShen/junShenWeiGuang.mp3`
- 【英灵召唤】：`audio/skill/nvWuShen/yingLingZhaoHuan.mp3`

### 魔弓

- 【魔贯冲击】：`audio/skill/moGong/moGuanChongJi.mp3`
- 【雷光散射】：`audio/skill/moGong/leiGuangSanShe.mp3`
- 【多重射击】：`audio/skill/moGong/duoChongSheJi.mp3`
- 【充能】：`audio/skill/moGong/chongNeng.mp3`
- 【魔眼】：`audio/skill/moGong/moYan.mp3`

### 红莲骑士

- 【腥红圣约】：`audio/skill/hongLianQiShi/xingHongShengYue.mp3`
- 【猩红信仰】：`audio/skill/hongLianQiShi/xingHongXinYang.mp3`
- 【血腥祷言】：`audio/skill/hongLianQiShi/xueXingDaoYan.mp3`
- 【杀戮盛宴】：`audio/skill/hongLianQiShi/shaLuShengYan.mp3`
- 【热血沸腾】：`audio/skill/hongLianQiShi/reXueFeiTeng.mp3`
- 【戒骄戒躁】：`audio/skill/hongLianQiShi/jieJiaoJieZao.mp3`
- 【猩红十字】：`audio/skill/hongLianQiShi/xingHongShiZi.mp3`

### 英灵人形

- 【战纹掌握】：`audio/skill/yingLingRenXing/zhanWenZhangWo.mp3`
- 【怒火压制】：`audio/skill/yingLingRenXing/nuHuoYaZhi.mp3`
- 【战纹碎击】：`audio/skill/yingLingRenXing/zhanWenSuiJi.mp3`
- 【魔纹融合】：`audio/skill/yingLingRenXing/moWenRongHe.mp3`
- 【符文改造】：`audio/skill/yingLingRenXing/fuWenGaiZao.mp3`
- 【双重回响】：`audio/skill/yingLingRenXing/shuangChongHuiXiang.mp3`

### 魔枪

- 【暗之解放】：`audio/skill/moQiang/anZhiJieFang.mp3`
- 【幻影星辰】：`audio/skill/moQiang/huanYingXingChen.mp3`
- 【黑暗束缚】：`audio/skill/moQiang/heiAnShuFu.mp3`
- 【暗之障壁】：`audio/skill/moQiang/anZhiZhangBi.mp3`
- 【充盈】：`audio/skill/moQiang/chongYing.mp3`
- 【漆黑之枪】：`audio/skill/moQiang/qiHeiZhiQiang.mp3`

### 吟游诗人

- 【沉沦协奏曲】：`audio/skill/yinYouShiRen/chenLunXieZouQu.mp3`
- 【不谐和弦】：`audio/skill/yinYouShiRen/buXieHeXian.mp3`
- 【禁忌诗篇】：`audio/skill/yinYouShiRen/jinJiShiPian.mp3`
- 【永恒乐章】：`audio/skill/yinYouShiRen/yongHengYueZhang.mp3`
- 【激昂狂想曲】：`audio/skill/yinYouShiRen/jiAngKuangXiangQu.mp3`
- 【胜利交响诗】：`audio/skill/yinYouShiRen/shengLiJiaoXiangShi.mp3`
- 【希望赋格曲】：`audio/skill/yinYouShiRen/xiWangFuGeQu.mp3`

### 苍炎魔女

- 【苍炎法典】：`audio/skill/cangYanMoNv/cangYanFaDian.mp3`
- 【天火断空】：`audio/skill/cangYanMoNv/tianHuoDuanKong.mp3`
- 【魔女之怒】：`audio/skill/cangYanMoNv/moNvZhiNu.mp3`
- 【替身玩偶】：`audio/skill/cangYanMoNv/tiShenWanOu.mp3`
- 【永生银时计】：`audio/skill/cangYanMoNv/yongShengYinShiJi.mp3`
- 【痛苦链接】：`audio/skill/cangYanMoNv/tongKuLianJie.mp3`
- 【魔能反转】：`audio/skill/cangYanMoNv/moNengFanZhuan.mp3`

### 精灵射手

- 【元素射击】：`audio/skill/jingLingSheShou/yuanSuSheJi.mp3`
- 【动物伙伴】：`audio/skill/jingLingSheShou/dongWuHuoBan.mp3`
- 【精灵秘仪】：`audio/skill/jingLingSheShou/jingLingMiYi.mp3`
- 【宠物强化】：`audio/skill/jingLingSheShou/chongWuQiangHua.mp3`

### 血色剑灵

- 【血色荆棘】：`audio/skill/xueSeJianLing/xueSeJingJi.mp3`
- 【赤色一闪】：`audio/skill/xueSeJianLing/chiSeYiShan.mp3`
- 【血染蔷薇】：`audio/skill/xueSeJianLing/xueRanQiangWei.mp3`
- 【血气屏障】：`audio/skill/xueSeJianLing/xueQiPingZhang.mp3`
- 【血蔷薇庭院】：`audio/skill/xueSeJianLing/xueQiangWeiTingYuan.mp3`
- 【散华轮舞】：`audio/skill/xueSeJianLing/sanHuaLunWu.mp3`

### 阴阳师（轮＆环）

- 【式神降临】：`audio/skill/yinYangShi/shiShenJiangLin.mp3`
- 【阴阳转换】：`audio/skill/yinYangShi/yinYangZhanHuan.mp3`
- 【式神转换】：`audio/skill/yinYangShi/shiShenZhuanHuan.mp3`
- 【黑暗祭礼】：`audio/skill/yinYangShi/heiAnJiLi.mp3`
- 【式神咒束】：`audio/skill/yinYangShi/shiShenZhouShu.mp3`
- 【生命结界】：`audio/skill/yinYangShi/shengMingJieJie.mp3`

### 月之女神

- 【新月庇护】：`audio/skill/yueZhiNvShen/xinYueBiHu.mp3`
- 【暗月诅咒】：`audio/skill/yueZhiNvShen/anYueZuZhou.mp3`
- 【美杜莎之眼】：`audio/skill/yueZhiNvShen/meiDuShaZhiYan.mp3`
- 【月之轮回】：`audio/skill/yueZhiNvShen/yueZhiLunHui.mp3`
- 【月渎】：`audio/skill/yueZhiNvShen/yueDu.mp3`
- 【暗月斩】：`audio/skill/yueZhiNvShen/anYueZhan.mp3`
- 【苍白之月】：`audio/skill/yueZhiNvShen/cangBaiZhiYue.mp3`

### 兽灵武士

- 【武者残心】：`audio/skill/shouLingWuShi/wuZheCanXin.mp3`
- 【一击无念】：`audio/skill/shouLingWuShi/yiJiWuNian.mp3`
- 【兽魂意念】：`audio/skill/shouLingWuShi/shouHunYiNian.mp3`
- 【兽魂警戒】：`audio/skill/shouLingWuShi/shouHunJingJie.mp3`
- 【兽反】：`audio/skill/shouLingWuShi/shouFan.mp3`
- 【御魂流居合形态】：`audio/skill/shouLingWuShi/yuHunLiuJuHeShi.mp3`
- 【逆反居合斩】：`audio/skill/shouLingWuShi/niFanJuHeZhan.mp3`
- 【脱离居合形态】：`audio/skill/shouLingWuShi/tuoLiJuHeXingTai.mp3`（两个脱离触发共用）

### 圣殿骑士

- 【神选者】：`audio/skill/shengDianQiShi/shenXuanZhe.mp3`
- 【神威】：`audio/skill/shengDianQiShi/shenWei.mp3`
- 【圣裁】：`audio/skill/shengDianQiShi/shengCai.mp3`
- 【圣愈】：`audio/skill/shengDianQiShi/shengYu.mp3`
- 【神之子】：`audio/skill/shengDianQiShi/shenZhiZi.mp3`
- 【神临圣启】：`audio/skill/shengDianQiShi/shenLinShengQi.mp3`
- 【圣炎祈愿】：`audio/skill/shengDianQiShi/shengYanQiYuan.mp3`

### 圣庭检察士

- 【狂信徒】：`audio/skill/shengTingJianChaShi/kuangXinTu.mp3`
- 【裁决论定】：`audio/skill/shengTingJianChaShi/caiJueLunDing.mp3`
- 【恩典神授】：`audio/skill/shengTingJianChaShi/enDianShenShou.mp3`
- 【净化之术】：`audio/skill/shengTingJianChaShi/jingHuaZhiShu.mp3`
- 【庇护领域】：`audio/skill/shengTingJianChaShi/biHuLingYu.mp3`
- 【裁决者】：`audio/skill/shengTingJianChaShi/caiJueZhe.mp3`
- 【神圣鞭策】：`audio/skill/shengTingJianChaShi/shenShengBianCe.mp3`

### 圣弓

- 【天之弓】：`audio/skill/shengGong/tianZhiGong.mp3`
- 【圣屑飓暴】：`audio/skill/shengGong/shengXieJuBao.mp3`
- 【圣煌降临】：`audio/skill/shengGong/shengHuangJiangLin.mp3`
- 【圣光爆裂】：`audio/skill/shengGong/shengGuangBaoLie.mp3`
- 【流星圣弹】：`audio/skill/shengGong/liuXingShengDan.mp3`
- 【圣煌辉光炮】：`audio/skill/shengGong/shengHuangHuiGuangPao.mp3`
- 【自动填充】：`audio/skill/shengGong/ziDongTianChong.mp3`

### 原初之弓

- 【天之弓】：`audio/skill/yuanChuZhiGong/tianZhiGong.mp3`
- 【圣屑飓暴】：`audio/skill/yuanChuZhiGong/shengXieJuBao.mp3`
- 【圣煌降临】：`audio/skill/yuanChuZhiGong/shengHuangJiangLin.mp3`
- 【圣光爆裂】：`audio/skill/yuanChuZhiGong/shengGuangBaoLie.mp3`
- 【流星圣弹】：`audio/skill/yuanChuZhiGong/liuXingShengDan.mp3`（通过`audioname2`按角色分流）
- 【圣煌辉光炮】：`audio/skill/yuanChuZhiGong/shengHuangHuiGuangPao.mp3`
- 【圣煌余辉】：`audio/skill/yuanChuZhiGong/shengHuangYuHui.mp3`
- 【自动填充】：`audio/skill/yuanChuZhiGong/ziDongTianChong.mp3`

### 星坠女巫

- 【命定之理】：`audio/skill/xingZhuiNvWu/mingDingZhiLi.mp3`
- 【星环】：`audio/skill/xingZhuiNvWu/xingHuan.mp3`
- 【星刻】：`audio/skill/xingZhuiNvWu/xingKe.mp3`
- 【群星启示】：`audio/skill/xingZhuiNvWu/qunXingQiShi.mp3`
- 【黄金律】：`audio/skill/xingZhuiNvWu/huangJinLv.mp3`
- 【繁星】：`audio/skill/xingZhuiNvWu/fanXing.mp3`
- 【影月】：`audio/skill/xingZhuiNvWu/yingYue.mp3`
- 【蚀日】：`audio/skill/xingZhuiNvWu/shiRi.mp3`
- 【创刻律动】：`audio/skill/xingZhuiNvWu/chuangKeLvDong.mp3`

### 战斗法师

- 【符文置换】：`audio/skill/zhanDouFaShi/fuWenZhiHuan.mp3`
- 【附魔打击】：`audio/skill/zhanDouFaShi/fuMoDaJi.mp3`
- 【熵变】：`audio/skill/zhanDouFaShi/shangBian.mp3`
- 【魔力熵增】：`audio/skill/zhanDouFaShi/moLiShangZeng.mp3`

### 猎巫人

- 【转换】：`audio/skill/lieWuRen/zhuanHuan.mp3`
- 【狩魔刺】：`audio/skill/lieWuRen/shouMoCi.mp3`
- 【法术剥离】：`audio/skill/lieWuRen/faShuBoLi.mp3`
- 【灌银毒刃】：`audio/skill/lieWuRen/guanYinDuRen.mp3`
- 【偷袭】：`audio/skill/lieWuRen/touXi.mp3`
- 【魔力瓶达到上限】：`audio/skill/lieWuRen/moLiPingFull.mp3`（【魔力瓶】在`addGaiPaiAfter`时达到4张后播放）

### 女仆长

- 【影之穴】：`audio/skill/nvPuZhang/yingZhiXue.mp3`
- 【秘术·摹影】：`audio/skill/nvPuZhang/miShuMuYing.mp3`
- 【瞬·影·杀】：`audio/skill/nvPuZhang/shun.mp3`
- 【影缝】：`audio/skill/nvPuZhang/yingFeng.mp3`
- 【侍奉之道】：`audio/skill/nvPuZhang/shiFengZhiDao.mp3`
- 【禁术·影牢】：`audio/skill/nvPuZhang/jinShu.mp3`
- 【真·摹影】：`audio/skill/nvPuZhang/zhen.mp3`
- 【风止】：`audio/skill/nvPuZhang/fengXueX_fengZhi.mp3`

### 矜贵之女

- 【高岭之花】：`audio/skill/jinGuiZhiNv/gaoLingZhiHua.mp3`
- 【魔法入门】：`audio/skill/jinGuiZhiNv/moFaRuMen.mp3`
- 【Magic!】：`audio/skill/jinGuiZhiNv/Magic.mp3`
- 【Magic!】未触发效果：`audio/skill/jinGuiZhiNv/MagicFail.mp3`
- 【强予愿行】：`audio/skill/jinGuiZhiNv/qiangYuYuanXing.mp3`
- 【友情羁绊】：`audio/skill/jinGuiZhiNv/youQingJiBan.mp3`

### 染污者

- 【神弃之裔】：`audio/skill/ranWuZhe/shenQiZhiYi.mp3`（绑定游戏开始时实际结算的`shenQiZhiYi_kaiShi`子技能）
- 【戾如泉涌】：`audio/skill/ranWuZhe/liRuQuanYong.mp3`
- 【狂戾之心】：`audio/skill/ranWuZhe/kuangLiZhiXin.mp3`
- 【狂戾之体】：`audio/skill/ranWuZhe/kuangLiZhiTi.mp3`
- 【神智污染】：`audio/skill/ranWuZhe/shenZhiWuRan.mp3`
- 【扭曲之爱】：`audio/skill/ranWuZhe/niuQuZhiAi.mp3`

### 噬神者

- 【御刃】：`audio/skill/shiShenZhe/yuRen.mp3`
- 【侵刻】：`audio/skill/shiShenZhe/qinKe.mp3`
- 【噬灭】：`audio/skill/shiShenZhe/shiMie.mp3`
- 【殇灭】：`audio/skill/shiShenZhe/shangMie.mp3`
- 【渗蚀】：`audio/skill/shiShenZhe/shenShi.mp3`
- 【同调】：`audio/skill/shiShenZhe/tongDiao.mp3`
- 【共振】：`audio/skill/shiShenZhe/gongZhen.mp3`
- 【诸神终焉】：`audio/skill/shiShenZhe/zhuShenZhongYan.mp3`

### 结界师

- 【结界仪式】：`audio/skill/jieJieShi/jieJieYiShi.mp3`
- 【荒神之力】：`audio/skill/jieJieShi/huangShenZhiLi.mp3`
- 【荒神祭仪】：`audio/skill/jieJieShi/huangShenJiYi.mp3`
- 【禁魔境】：`audio/skill/jieJieShi/jinMoJing.mp3`
- 【琉璃境】：`audio/skill/jieJieShi/liuLiJing.mp3`
- 【灭界破散】：`audio/skill/jieJieShi/jueJieX_zero.mp3`
- 【白二羯磨】：`audio/skill/jieJieShi/jueJieX_attack.mp3`
- 【虚空境】：`audio/skill/jieJieShi/jueJieX_wuFa.mp3`
- 【伏魔境】：`audio/skill/jieJieShi/fuMoJing.mp3`

### 神秘学者

- 【言灵术】：`audio/skill/shenMiXueZhe/yanLingShu.mp3`
- 【守护灵】：`audio/skill/shenMiXueZhe/shouHuLing.mp3`
- 【真言术】：`audio/skill/shenMiXueZhe/zhenYanShu.mp3`
- 【禁忌秘法】：`audio/skill/shenMiXueZhe/jinJiMiFa.mp3`
- 【妖精秘术】：`audio/skill/shenMiXueZhe/yaoJingMiShu.mp3`
- 【真言压制】：`audio/skill/shenMiXueZhe/zhenYanYaZhi.mp3`

### 记录者

- 【传说之地】：`audio/skill/jiLuZhe/chuanShuoZhiDi.mp3`
- 【知行合一】：`audio/skill/jiLuZhe/zhiXingHeYi.mp3`
- 【稽古识典】：`audio/skill/jiLuZhe/jiGuShiDian.mp3`
- 【遗迹论破】：`audio/skill/jiLuZhe/yiJiLunPo.mp3`
- 【选淬精炼】：`audio/skill/jiLuZhe/xuanCuiJingLian.mp3`
- 【秘境万象】：`audio/skill/jiLuZhe/miJingWanXiang.mp3`
- 【以史为镜】：`audio/skill/jiLuZhe/shiShuX_yiShiWeiJing.mp3`
- 【引稽编鉴】：`audio/skill/jiLuZhe/shiShuX_yinJiBianJian.mp3`
- 【古今互鉴】：`audio/skill/jiLuZhe/guJinHuzheng.mp3`

### 传教士

- 【神的门徒】：`audio/skill/chuanJiaoShi/shenDeMenTu.mp3`
- 【信仰之路】：`audio/skill/chuanJiaoShi/xinYangZhiLu.mp3`
- 【传道】：`audio/skill/chuanJiaoShi/chuanDao.mp3`
- 【启示】：`audio/skill/chuanJiaoShi/qiShi.mp3`
- 【事奉】：`audio/skill/chuanJiaoShi/shiFeng.mp3`
- 【告解式】：`audio/skill/chuanJiaoShi/luBiaoX.mp3`
- 【属灵恩赐】：`audio/skill/chuanJiaoShi/shuLingEnCi.mp3`
- 【弥撒】：`audio/skill/chuanJiaoShi/miSa.mp3`

### 异教徒

- 【异端邪说】：`audio/skill/yiJiaoTu/yiDuanXieShuo.mp3`
- 【审判】：`audio/skill/yiJiaoTu/shenPanYJT.mp3`
- 【献祭】：`audio/skill/yiJiaoTu/xianJi.mp3`
- 【末日预言】：`audio/skill/yiJiaoTu/moRiYuYan.mp3`（绑定预言耗尽并翻面时结算的`yuYan_zero`子技能）
- 【天雷劫火】：`audio/skill/yiJiaoTu/yuYan_tianLeiJieHuo.mp3`
- 【地裂波涛】：`audio/skill/yiJiaoTu/yuYan_diLieBoTao.mp3`
- 【灾殃止息】：`audio/skill/yiJiaoTu/yuYan_caiYangZhiXi.mp3`
- 【放逐】：`audio/skill/yiJiaoTu/fangZhu.mp3`
- 【贪婪】：`audio/skill/yiJiaoTu/tanLan.mp3`

### 爆食少女

- 【甜点冲击】：`audio/skill/baoShiShaoNv/tianDianChongJi.mp3`
- 【食欲的黑洞】：`audio/skill/baoShiShaoNv/shiYuDeHeiDong.mp3`
- 【美味融合】：`audio/skill/baoShiShaoNv/meiWeiRongHe.mp3`
- 【三秒原则】：`audio/skill/baoShiShaoNv/sanMiaoYuanZe.mp3`
- 【美食风暴】：`audio/skill/baoShiShaoNv/meiShiFengBao.mp3`

### 剑之魔女

- 【技之剑意】：`audio/skill/jianZhiMoNv/jiZhiJianYi.mp3`
- 【臆想剑】：`audio/skill/jianZhiMoNv/yiXiangJian.mp3`
- 【臆想剑】夺取攻击牌：`audio/skill/jianZhiMoNv/yiXiangJian_gain.mp3`
- 【臆想剑】触发法术伤害：`audio/skill/jianZhiMoNv/yiXiangJian_faShu.mp3`
- 【梦想剑】第一次强化：`audio/skill/jianZhiMoNv/mengXiangJian_first.mp3`
- 【梦想剑】第二次强化：`audio/skill/jianZhiMoNv/mengXiangJian_second.mp3`
- 【梦想剑】第四次强化：`audio/skill/jianZhiMoNv/mengXiangJian_fourth.mp3`
- 【剑影·断念】：`audio/skill/jianZhiMoNv/jianYingDuanNian.mp3`

### 萝莉番长

- 【喧哗上等】：`audio/skill/luoLiFanZhang/xuanHuaShangDeng.mp3`
- 【夜露死苦】：`audio/skill/luoLiFanZhang/yeLuSiKu.mp3`
- 【血影狂刀】：`audio/skill/luoLiFanZhang/yeLuSiKu_xueYingKuangDao.mp3`
- 【血腥咆哮】：`audio/skill/luoLiFanZhang/yeLuSiKu_xueXingPaoXiao.mp3`
- 【爱死天流】：`audio/skill/luoLiFanZhang/aiSiTianLiu.mp3`
- 【灭茶苦茶】：`audio/skill/luoLiFanZhang/mieChaKuCha.mp3`

### 红衣主教

- 【圣约银契】：`audio/skill/hongYiZhuJiao/shengYueYinQi.mp3`
- 【驱魔式】：`audio/skill/hongYiZhuJiao/quMoShi.mp3`
- 【祷告式】：`audio/skill/hongYiZhuJiao/daoGaoShi.mp3`
- 【权能逆位】：`audio/skill/hongYiZhuJiao/quanNengNiWei.mp3`
- 【神宣祷言】：`audio/skill/hongYiZhuJiao/shenXuanDaoYan.mp3`
- 【圣典】：`audio/skill/hongYiZhuJiao/shengDian.mp3`

### 铸律者

- 【神律封锁】：`audio/skill/zhuLvZhe/shenLvFengSuo.mp3`
- 【圣血之击】：`audio/skill/zhuLvZhe/shengXueZhiJi.mp3`
- 【王车易位】：`audio/skill/zhuLvZhe/wangCheYiWei.mp3`
- 【罪断豁免】：`audio/skill/zhuLvZhe/zuiDuanHuoMian.mp3`
- 【圣银颂恩】：`audio/skill/zhuLvZhe/shengYinSongEn.mp3`
- 【圣律威压】：`audio/skill/zhuLvZhe/shengLvWeiYa.mp3`
- 【神言咏赞】：`audio/skill/zhuLvZhe/shenYanYongZan.mp3`
- 【信仰重铸】：`audio/skill/zhuLvZhe/xinYangChongZhu.mp3`

### 游击士

- 【精灵赠礼】：`audio/skill/youJiShi/jingLingZengLi.mp3`
- 【元素射击】：`audio/skill/youJiShi/yuanSuSheJi.mp3`
- 【火之弹】：`audio/skill/youJiShi/yuanSuSheJi_huo.mp3`
- 【水之弹】：`audio/skill/youJiShi/yuanSuSheJi_shui.mp3`
- 【风之弹】：`audio/skill/youJiShi/yuanSuSheJi_feng.mp3`
- 【雷之弹】：`audio/skill/youJiShi/yuanSuSheJi_lei.mp3`
- 【地之弹】：`audio/skill/youJiShi/yuanSuSheJi_di.mp3`
- 【二重剑影】：`audio/skill/youJiShi/erChongJianYing.mp3`
- 【附魔之术】：`audio/skill/youJiShi/fuMoZhiShu.mp3`
- 【精灵的剑舞】：`audio/skill/youJiShi/jingLingDeJianWu.mp3`

### 节日魔导

- 【魔弹掌握】：`audio/skill/jieRiMoDao/moDanZhangWo.mp3`
- 【魔弹融合】：`audio/skill/jieRiMoDao/moDanRongHe.mp3`
- 【魔爆冲击】：`audio/skill/jieRiMoDao/jiRi_moBaoChongJie.mp3`
- 【法力护盾】：`audio/skill/jieRiMoDao/faLiHuDun.mp3`
- 【毁灭风暴】：`audio/skill/jieRiMoDao/huiMieFengBao.mp3`

### 贪婪少女

- 【贪欲黑洞】：`audio/skill/tanLanShaoNv/tanYuHeiDong.mp3`
- 【殓金魔法】：`audio/skill/tanLanShaoNv/lianJinMoFa.mp3`
- 【炼金术】：`audio/skill/tanLanShaoNv/lianJinShu.mp3`
- 【亡女的金库】：`audio/skill/tanLanShaoNv/wangNvJinKu.mp3`
- 【亡女的金库】额外投入星石：`audio/skill/tanLanShaoNv/wangNvJinKu_invest.mp3`
- 【亡女的金库】成功转移士气：`audio/skill/tanLanShaoNv/wangNvJinKu_morale.mp3`

### 见习制片

- 【元子吸收】：`audio/skill/jianXiZhiPian/yuanZiXiShou.mp3`
- 【元子重塑】：`audio/skill/jianXiZhiPian/yuanZiChongSu.mp3`
- 【元素学徒】：`audio/skill/jianXiZhiPian/yuanSuXueTu.mp3`
- 【冰冻】：`audio/skill/jianXiZhiPian/bingDong.mp3`
- 【陨石】：`audio/skill/jianXiZhiPian/yunShi.mp3`
- 【火球】：`audio/skill/jianXiZhiPian/huoQou.mp3`
- 【风刃】：`audio/skill/jianXiZhiPian/fengRen.mp3`
- 【雷击】：`audio/skill/jianXiZhiPian/leiJi.mp3`
- 【雷击变异】：`audio/skill/jianXiZhiPian/leiJiBianYi.mp3`
- 【月陨】：`audio/skill/jianXiZhiPian/yueYun.mp3`

### 咒符师

- 【咒符·火璃】：`audio/skill/zhouFuShi/zhouFuHuoLi.mp3`
- 【咒符·冻天】：`audio/skill/zhouFuShi/zhouFuDongTian.mp3`
- 【念咒】：`audio/skill/zhouFuShi/zhouFu_nianZhou.mp3`
- 【魑魅魍魉】：`audio/skill/zhouFuShi/chiMeiWangLiang.mp3`
- 【咒力重塑】：`audio/skill/zhouFuShi/zhouLiChongSu.mp3`

### 怠惰少女

- 【别烦我……】：`audio/skill/daiDuoShaoNv/bieFanWo.mp3`
- 【让我躺平】：`audio/skill/daiDuoShaoNv/rangWoTangPing.mp3`
- 【想用魔弹】：`audio/skill/daiDuoShaoNv/xiangYongMoDan.mp3`
- 【不想提炼】：`audio/skill/daiDuoShaoNv/buXiangTiLian.mp3`
- 【再睡一下】：`audio/skill/daiDuoShaoNv/zaiShuiYiXia.mp3`
- 【再睡一下】治疗溢出：`audio/skill/daiDuoShaoNv/zaiShuiYiXia_overflow.mp3`

### 剑之子

- 【倾慕】：`audio/skill/jianZhiZi/qingMu.mp3`
- 【倾慕】获得剑之魔女技能：`audio/skill/jianZhiZi/qingMu_gain.mp3`
- 【风之剑】：`audio/skill/jianZhiZi/fengZhiJian.mp3`
- 【剑守誓言】：`audio/skill/jianZhiZi/jianShouShiYan.mp3`
- 【剑守誓言】开始检定：`audio/skill/jianZhiZi/jianShouShiYan_check.mp3`
- 【剑守誓言】觉醒：`audio/skill/jianZhiZi/jianShouShiYan_awaken.mp3`
- 【剑残影】：`audio/skill/jianZhiZi/jianCanYing.mp3`
- 【剑残影】追击：`audio/skill/jianZhiZi/jianCanYing_followup.mp3`

扩展通常直接为本体技能 ID 配置语音路径，沿用本体技能发动时的标准播放流程；猎巫人的满【魔力瓶】台词使用一个无效果的语音监听，在数量达到4张时播放；矜贵之女【Magic!】通过本次【魔法入门】事件数据，在技能实际发动时区分“触发效果”与“未触发任何效果”台词；染污者【神弃之裔】绑定游戏开始时实际结算的子技能，避免治疗封锁等高频子效果反复播放同一句。扩展已声明`connect: true`，使联机模式正常执行技能语音绑定与自定义语音监听；联机双方仍需安装相同版本的扩展资源。
