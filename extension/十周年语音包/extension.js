game.import("extension", function (lib, game, ui, get, ai, _status) {
    "use strict";

    var extensionName = "十周年语音包";
    var skillAudio = {
        fengNuZhuiJi: "fengZhiJianSheng/fengNuZhuiJi.mp3",
        shengJian: "fengZhiJianSheng/shengJian.mp3",
        lieFengJi: "fengZhiJianSheng/lieFengJi.mp3",
        jiFengJi: "fengZhiJianSheng/jiFengJi.mp3",
        jianYing: "fengZhiJianSheng/jianYing.mp3",
        kuangHua: "kuangZhanShi/kuangHua.mp3",
        xueYingKuangDao: "kuangZhanShi/xueYingKuangDao.mp3",
        xueXingPaoXiao: "kuangZhanShi/xueXingPaoXiao.mp3",
        siLie: "kuangZhanShi/siLie.mp3",
        shanDianJian: "shenJianShou/shanDianJian.mp3",
        guanChuanSheJi: "shenJianShou/guanChuanSheJi.mp3",
        shanGuangXianJing: "shenJianShou/shanGuangXianJing.mp3",
        jingZhunSheJi: "shenJianShou/jingZhunSheJi.mp3",
        juJi: "shenJianShou/juJi.mp3",
        faShuJiDang: "fengYinShi/faShuJiDang.mp3",
        diZhiFengYin: "fengYinShi/diZhiFengYin.mp3",
        shuiZhiFengYin: "fengYinShi/shuiZhiFengYin.mp3",
        huoZhiFengYin: "fengYinShi/huoZhiFengYin.mp3",
        fengZhiFengYin: "fengYinShi/fengZhiFengYin.mp3",
        leiZhiFengYin: "fengYinShi/leiZhiFengYin.mp3",
        wuXiShuFu: "fengYinShi/wuXiShuFu.mp3",
        fengYinPoSui: "fengYinShi/fengYinPoSui.mp3",
        fanShi: "anShaZhe/fanShi.mp3",
        shuiYing: "anShaZhe/shuiYing.mp3",
        qianXing: "anShaZhe/qianXing.mp3",
        bingShuangDaoYan: "shengNv/bingShuangDaoYan.mp3",
        zhiLiaoShu: "shengNv/zhiLiaoShu.mp3",
        zhiYuZhiGuang: "shengNv/zhiYuZhiGuang.mp3",
        lianMin: "shengNv/lianMin.mp3",
        shengLiao: "shengNv/shengLiao.mp3",
        fengZhiJieJing: "tianShi/fengZhiJieJing.mp3",
        tianShiZhuFu: "tianShi/tianShiZhuFu.mp3",
        tianShiJiBan: "tianShi/tianShiJiBan.mp3",
        tianShiZhiQiang: "tianShi/tianShiZhiQiang.mp3",
        tianShiZhiGe: "tianShi/tianShiZhiGe.mp3",
        shenZhiBiHu: "tianShi/shenZhiBiHu.mp3",
        moBaoChongJi: "moFaShaoNv/moBaoChongJi.mp3",
        moDanZhangWo: "moFaShaoNv/moDanZhangWo.mp3",
        moDanRongHe: "moFaShaoNv/moDanRongHe.mp3",
        huiMieFengBao: "moFaShaoNv/huiMieFengBao.mp3",
        xiuLuoLianZhan: "moJianShi/xiuLuoLianZhan.mp3",
        anYingNingJu: "moJianShi/anYingNingJu.mp3",
        anYingZhiLi: "moJianShi/anYingZhiLi.mp3",
        anYingKangJu: "moJianShi/anYingKangJu.mp3",
        anYingLiuXing: "moJianShi/anYingLiuXing.mp3",
        huangQuanZhengChan: "moJianShi/huangQuanZhengChan.mp3",
        shenShengXinYang: "shengQiangQiShi/shenShengXinYang.mp3",
        huiYao: "shengQiangQiShi/huiYao.mp3",
        chengJie: "shengQiangQiShi/chengJie.mp3",
        shengJi: "shengQiangQiShi/shengJi.mp3",
        tianQiang: "shengQiangQiShi/tianQiang.mp3",
        diQiang: "shengQiangQiShi/diQiang.mp3",
        shengGuangQiYu: "shengQiangQiShi/shengGuangQiYu.mp3",
        yuanSuXiShou: "yuanSuShi/yuanSuXiShou.mp3",
        yuanSuDianRan: "yuanSuShi/yuanSuDianRan.mp3",
        yunShi: "yuanSuShi/yunShi.mp3",
        bingDong: "yuanSuShi/bingDong.mp3",
        huoQou: "yuanSuShi/huoQou.mp3",
        fengRen: "yuanSuShi/fengRen.mp3",
        leiJi: "yuanSuShi/leiJi.mp3",
        yueGuang: "yuanSuShi/yueGuang.mp3",
        qiZha: "maoXianJia/qiZha.mp3",
        qiangYun: "maoXianJia/qiangYun.mp3",
        diXiaFaZe: "maoXianJia/diXiaFaZe.mp3",
        maoXianJiaTianTang: "maoXianJia/maoXianJiaTianTang.mp3",
        touTianHuanRi: "maoXianJia/touTianHuanRi.mp3",
        buXiu: "wenYiFaShi/buXiu.mp3",
        shengDu: "wenYiFaShi/shengDu.mp3",
        wenYi: "wenYiFaShi/wenYi.mp3",
        siWangZhiChu: "wenYiFaShi/siWangZhiChu.mp3",
        juDuXinXing: "wenYiFaShi/juDuXinXing.mp3",
        zhongCaiFaZe: "zhongCaiZhe/zhongCaiFaZe.mp3",
        yiShiZhongDuan: "zhongCaiZhe/yiShiZhongDuan.mp3",
        moRiShenPan: "zhongCaiZhe/moRiShenPan.mp3",
        shenPanLangChao: "zhongCaiZhe/shenPanLangChao.mp3",
        zhongCaiYiShi: "zhongCaiZhe/zhongCaiYiShi.mp3",
        panJueTianPing: "zhongCaiZhe/panJueTianPing.mp3",
        shenShengQiShi: "shenGuan/shenShengQiShi.mp3",
        shenShengQiFu: "shenGuan/shenShengQiFu.mp3",
        shuiZhiShenLi: "shenGuan/shuiZhiShenLi.mp3",
        shengShiShouHu: "shenGuan/shengShiShouHu.mp3",
        shenShengQiYue: "shenGuan/shenShengQiYue.mp3",
        shenShengLingYu: "shenGuan/shenShengLingYu.mp3",
        guangHuiXinYang: "qiDaoShi/guangHuiXinYang.mp3",
        heiAnZuZhou: "qiDaoShi/heiAnZuZhou.mp3",
        weiLiCiFu: "qiDaoShi/weiLiCiFu.mp3",
        xunJieCiFu: "qiDaoShi/xunJieCiFu.mp3",
        qiDao: "qiDaoShi/qiDao.mp3",
        faLiChaoXi: "qiDaoShi/faLiChaoXi.mp3",
        zhiHuiFaDian: "xianZhe/zhiHuiFaDian.mp3",
        faShuFanTan: "xianZhe/faShuFanTan.mp3",
        moDaoFaDian: "xianZhe/moDaoFaDian.mp3",
        shengJieFaDian: "xianZhe/shengJieFaDian.mp3",
        lingFu_leiMing: "lingFuShi/lingFu_leiMing.mp3",
        lingFu_fengXing: "lingFuShi/lingFu_fengXing.mp3",
        nianZhou: "lingFuShi/nianZhou.mp3",
        baiGuiYeXing: "lingFuShi/baiGuiYeXing.mp3",
        lingLiBengJie: "lingFuShi/lingLiBengJie.mp3",
        jianHunShouHu: "jianDi/jianHunShouHu.mp3",
        yangGong: "jianDi/yangGong.mp3",
        jianQiZhan: "jianDi/jianQiZhan.mp3",
        tianShiZhiHun: "jianDi/tianShiZhiHun.mp3",
        eMoZhiHun: "jianDi/eMoZhiHun.mp3",
        buQuYiZhi: "jianDi/buQuYiZhi.mp3",
        yongZheZhiXin: "yongZhe/yongZheZhiXin.mp3",
        nuHou: "yongZhe/nuHou.mp3",
        jinPiLiJin: "yongZhe/jinPiLiJin.mp3",
        mingJingZhiShui: "yongZhe/mingJingZhiShui.mp3",
        tiaoXin: "yongZhe/tiaoXin.mp3",
        jinDuanZhiLi: "yongZhe/jinDuanZhiLi.mp3",
        siDou: "yongZhe/siDou.mp3",
        nianQiLiChang: "geDouJia/nianQiLiChang.mp3",
        xuLiYiji: "geDouJia/xuLiYiji.mp3",
        nianDan: "geDouJia/nianDan.mp3",
        baiShiHuanLongQuan: "geDouJia/baiShiHuanLongQuan.mp3",
        qiJueBengJi: "geDouJia/qiJueBengJi.mp3",
        douShenTianQu: "geDouJia/douShenTianQu.mp3",
        lingHunTunShi: "lingHunShuShi/lingHunTunShi.mp3",
        lingHunZhaoHuan: "lingHunShuShi/lingHunZhaoHuan.mp3",
        lingHunZhuanHuan: "lingHunShuShi/lingHunZhuanHuan.mp3",
        lingHunJingXiang: "lingHunShuShi/lingHunJingXiang.mp3",
        lingHunZhenBao: "lingHunShuShi/lingHunZhenBao.mp3",
        lingHunFuYu: "lingHunShuShi/lingHunFuYu.mp3",
        lingHunLianJie: "lingHunShuShi/lingHunLianJie.mp3",
        lingHunZengFu: "lingHunShuShi/lingHunZengFu.mp3",
        xueZhiAiShang: "xueZhiWuNv/xueZhiAiShang.mp3",
        liuXue: "xueZhiWuNv/liuXue.mp3",
        niLiu: "xueZhiWuNv/niLiu.mp3",
        xueZhiBeiMing: "xueZhiWuNv/xueZhiBeiMing.mp3",
        tongShengGongSi: "xueZhiWuNv/tongShengGongSi.mp3",
        xueZhiZuZhou: "xueZhiWuNv/xueZhiZuZhou.mp3",
        shengMingZhiHuo: "dieWuZhe/shengMingZhiHuo.mp3",
        wuDong: "dieWuZhe/wuDong.mp3",
        duFen: "dieWuZhe/duFen.mp3",
        chaoSheng: "dieWuZhe/chaoSheng.mp3",
        jingHuaShuiYue: "dieWuZhe/jingHuaShuiYue.mp3",
        diaoLing: "dieWuZhe/diaoLing.mp3",
        yongHua: "dieWuZhe/yongHua.mp3",
        daoNiZhiDie: "dieWuZhe/daoNiZhiDie.mp3",
        shenShengZhuiJi: "nvWuShen/shenShengZhuiJi.mp3",
        zhiXuZhiYin: "nvWuShen/zhiXuZhiYin.mp3",
        hePingXingZhe: "nvWuShen/hePingXingZhe.mp3",
        junShenWeiGuang: "nvWuShen/junShenWeiGuang.mp3",
        yingLingZhaoHuan: "nvWuShen/yingLingZhaoHuan.mp3",
        moGuanChongJi: "moGong/moGuanChongJi.mp3",
        leiGuangSanShe: "moGong/leiGuangSanShe.mp3",
        duoChongSheJi: "moGong/duoChongSheJi.mp3",
        chongNeng: "moGong/chongNeng.mp3",
        moYan: "moGong/moYan.mp3",
        xingHongShengYue: "hongLianQiShi/xingHongShengYue.mp3",
        xingHongXinYang: "hongLianQiShi/xingHongXinYang.mp3",
        xueXingDaoYan: "hongLianQiShi/xueXingDaoYan.mp3",
        shaLuShengYan: "hongLianQiShi/shaLuShengYan.mp3",
        reXueFeiTeng: "hongLianQiShi/reXueFeiTeng.mp3",
        jieJiaoJieZao: "hongLianQiShi/jieJiaoJieZao.mp3",
        xingHongShiZi: "hongLianQiShi/xingHongShiZi.mp3",
        zhanWenZhangWo: "yingLingRenXing/zhanWenZhangWo.mp3",
        nuHuoYaZhi: "yingLingRenXing/nuHuoYaZhi.mp3",
        zhanWenSuiJi: "yingLingRenXing/zhanWenSuiJi.mp3",
        moWenRongHe: "yingLingRenXing/moWenRongHe.mp3",
        fuWenGaiZao: "yingLingRenXing/fuWenGaiZao.mp3",
        shuangChongHuiXiang: "yingLingRenXing/shuangChongHuiXiang.mp3",
        anZhiJieFang: "moQiang/anZhiJieFang.mp3",
        huanYingXingChen: "moQiang/huanYingXingChen.mp3",
        heiAnShuFu: "moQiang/heiAnShuFu.mp3",
        anZhiZhangBi: "moQiang/anZhiZhangBi.mp3",
        chongYing: "moQiang/chongYing.mp3",
        qiHeiZhiQiang: "moQiang/qiHeiZhiQiang.mp3",
        chenLunXieZouQu: "yinYouShiRen/chenLunXieZouQu.mp3",
        buXieHeXian: "yinYouShiRen/buXieHeXian.mp3",
        jinJiShiPian: "yinYouShiRen/jinJiShiPian.mp3",
        yongHengYueZhang: "yinYouShiRen/yongHengYueZhang.mp3",
        yongHengYueZhang_jiAngKuangXiangQu: "yinYouShiRen/jiAngKuangXiangQu.mp3",
        yongHengYueZhang_shengLiJiaoXiangShi: "yinYouShiRen/shengLiJiaoXiangShi.mp3",
        xiWangFuGeQu: "yinYouShiRen/xiWangFuGeQu.mp3",
        cangYanFaDian: "cangYanMoNv/cangYanFaDian.mp3",
        tianHuoDuanKong: "cangYanMoNv/tianHuoDuanKong.mp3",
        moNvZhiNu: "cangYanMoNv/moNvZhiNu.mp3",
        tiShenWanOu: "cangYanMoNv/tiShenWanOu.mp3",
        yongShengYinShiJi: "cangYanMoNv/yongShengYinShiJi.mp3",
        tongKuLianJie: "cangYanMoNv/tongKuLianJie.mp3",
        moNengFanZhuan: "cangYanMoNv/moNengFanZhuan.mp3",
        yuanSuSheJi: "jingLingSheShou/yuanSuSheJi.mp3",
        dongWuHuoBan: "jingLingSheShou/dongWuHuoBan.mp3",
        jingLingMiYi: "jingLingSheShou/jingLingMiYi.mp3",
        chongWuQiangHua: "jingLingSheShou/chongWuQiangHua.mp3",
        xueSeJingJi: "xueSeJianLing/xueSeJingJi.mp3",
        chiSeYiShan: "xueSeJianLing/chiSeYiShan.mp3",
        xueRanQiangWei: "xueSeJianLing/xueRanQiangWei.mp3",
        xueQiPingZhang: "xueSeJianLing/xueQiPingZhang.mp3",
        xueQiangWeiTingYuan: "xueSeJianLing/xueQiangWeiTingYuan.mp3",
        sanHuaLunWu: "xueSeJianLing/sanHuaLunWu.mp3",
        shiShenJiangLin: "yinYangShi/shiShenJiangLin.mp3",
        yinYangZhanHuan: "yinYangShi/yinYangZhanHuan.mp3",
        shiShenZhuanHuan: "yinYangShi/shiShenZhuanHuan.mp3",
        heiAnJiLi: "yinYangShi/heiAnJiLi.mp3",
        shiShenZhouShu: "yinYangShi/shiShenZhouShu.mp3",
        shengMingJieJie: "yinYangShi/shengMingJieJie.mp3",
        xinYueBiHu: "yueZhiNvShen/xinYueBiHu.mp3",
        anYueZuZhou: "yueZhiNvShen/anYueZuZhou.mp3",
        meiDuShaZhiYan: "yueZhiNvShen/meiDuShaZhiYan.mp3",
        yueZhiLunHui: "yueZhiNvShen/yueZhiLunHui.mp3",
        yueDu: "yueZhiNvShen/yueDu.mp3",
        anYueZhan: "yueZhiNvShen/anYueZhan.mp3",
        cangBaiZhiYue: "yueZhiNvShen/cangBaiZhiYue.mp3",
        wuZheCanXin: "shouLingWuShi/wuZheCanXin.mp3",
        yiJiWuNian: "shouLingWuShi/yiJiWuNian.mp3",
        shouHunYiNian: "shouLingWuShi/shouHunYiNian.mp3",
        shouHunJingJie: "shouLingWuShi/shouHunJingJie.mp3",
        shouFan: "shouLingWuShi/shouFan.mp3",
        yuHunLiuJuHeShi: "shouLingWuShi/yuHunLiuJuHeShi.mp3",
        niFanJuHeZhan: "shouLingWuShi/niFanJuHeZhan.mp3",
        yuHunLiuJuHeXingTai_shangHaiTuoLi: "shouLingWuShi/tuoLiJuHeXingTai.mp3",
        yuHunLiuJuHeXingTai_shouHunTuoLi: "shouLingWuShi/tuoLiJuHeXingTai.mp3",
        shenXuanZhe: "shengDianQiShi/shenXuanZhe.mp3",
        shenWei: "shengDianQiShi/shenWei.mp3",
        shengCai: "shengDianQiShi/shengCai.mp3",
        shengYu: "shengDianQiShi/shengYu.mp3",
        shenZhiZi: "shengDianQiShi/shenZhiZi.mp3",
        shenLinShengQi: "shengDianQiShi/shenLinShengQi.mp3",
        shengYanQiYuan: "shengDianQiShi/shengYanQiYuan.mp3",
        shengYueYinQi: "hongYiZhuJiao/shengYueYinQi.mp3",
        quMoShi: "hongYiZhuJiao/quMoShi.mp3",
        daoGaoShi: "hongYiZhuJiao/daoGaoShi.mp3",
        quanNengNiWei: "hongYiZhuJiao/quanNengNiWei.mp3",
        shenXuanDaoYan: "hongYiZhuJiao/shenXuanDaoYan.mp3",
        shengDian: "hongYiZhuJiao/shengDian.mp3",
        shenLvFengSuo: "zhuLvZhe/shenLvFengSuo.mp3",
        shengXueZhiJi: "zhuLvZhe/shengXueZhiJi.mp3",
        wangCheYiWei: "zhuLvZhe/wangCheYiWei.mp3",
        zuiDuanHuoMian: "zhuLvZhe/zuiDuanHuoMian.mp3",
        shengYinSongEn: "zhuLvZhe/shengYinSongEn.mp3",
        wangQuanBaoZhuX_shengLvWeiYa: "zhuLvZhe/shengLvWeiYa.mp3",
        wangQuanBaoZhuX_shenYanYongZan1: "zhuLvZhe/shenYanYongZan.mp3",
        wangQuanBaoZhuX_shenYanYongZan2: "zhuLvZhe/shenYanYongZan.mp3",
        xinYangChongZhu: "zhuLvZhe/xinYangChongZhu.mp3",
        jingLingZengLi: "youJiShi/jingLingZengLi.mp3",
        "yuanSuSheJi*sora": "youJiShi/yuanSuSheJi.mp3",
        "yuanSuSheJi*sora_huo": "youJiShi/yuanSuSheJi_huo.mp3",
        "yuanSuSheJi*sora_shui": "youJiShi/yuanSuSheJi_shui.mp3",
        "yuanSuSheJi*sora_feng": "youJiShi/yuanSuSheJi_feng.mp3",
        "yuanSuSheJi*sora_lei": "youJiShi/yuanSuSheJi_lei.mp3",
        "yuanSuSheJi*sora_di": "youJiShi/yuanSuSheJi_di.mp3",
        erChongJianYing: "youJiShi/erChongJianYing.mp3",
        fuMoZhiShu: "youJiShi/fuMoZhiShu.mp3",
        jingLingDeJianWu: "youJiShi/jingLingDeJianWu.mp3",
        jiRi_moBaoChongJie: "jieRiMoDao/jiRi_moBaoChongJie.mp3",
        faLiHuDun: "jieRiMoDao/faLiHuDun.mp3",
        tanYuHeiDong: "tanLanShaoNv/tanYuHeiDong.mp3",
        lianJinMoFa: "tanLanShaoNv/lianJinMoFa.mp3",
        lianJinShu: "tanLanShaoNv/lianJinShu.mp3",
        wangNvJinKu: "tanLanShaoNv/wangNvJinKu.mp3",
        yuanZiXiShou: "jianXiZhiPian/yuanZiXiShou.mp3",
        yuanZiChongSu: "jianXiZhiPian/yuanZiChongSu.mp3",
        yuanSuXueTu: "jianXiZhiPian/yuanSuXueTu.mp3",
        yuanSuXueTu_bingDong: "jianXiZhiPian/bingDong.mp3",
        yuanSuXueTu_yunShi: "jianXiZhiPian/yunShi.mp3",
        yuanSuXueTu_huoQou: "jianXiZhiPian/huoQou.mp3",
        yuanSuXueTu_fengRen: "jianXiZhiPian/fengRen.mp3",
        yuanSuXueTu_leiJi: "jianXiZhiPian/leiJi.mp3",
        leiJiBianYi: "jianXiZhiPian/leiJiBianYi.mp3",
        yueYun: "jianXiZhiPian/yueYun.mp3",
        zhouFuHuoLi: "zhouFuShi/zhouFuHuoLi.mp3",
        zhouFuDongTian: "zhouFuShi/zhouFuDongTian.mp3",
        zhouFu_nianZhou: "zhouFuShi/zhouFu_nianZhou.mp3",
        chiMeiWangLiang: "zhouFuShi/chiMeiWangLiang.mp3",
        zhouLiChongSu: "zhouFuShi/zhouLiChongSu.mp3",
        bieFanWo: "daiDuoShaoNv/bieFanWo.mp3",
        rangWoTangPing: "daiDuoShaoNv/rangWoTangPing.mp3",
        xiangYongMoDan: "daiDuoShaoNv/xiangYongMoDan.mp3",
        buXiangTiLian: "daiDuoShaoNv/buXiangTiLian.mp3",
        zaiShuiYiXia: "daiDuoShaoNv/zaiShuiYiXia.mp3",
        qingMu: "jianZhiZi/qingMu.mp3",
        fengZhiJian: "jianZhiZi/fengZhiJian.mp3",
        jianShouShiYan: "jianZhiZi/jianShouShiYan_check.mp3",
        jianCanYing: "jianZhiZi/jianCanYing.mp3",
        kuangXinTu: "shengTingJianChaShi/kuangXinTu.mp3",
        caiJueLunDing: "shengTingJianChaShi/caiJueLunDing.mp3",
        enDianShenShou: "shengTingJianChaShi/enDianShenShou.mp3",
        jingHuaZhiShu: "shengTingJianChaShi/jingHuaZhiShu.mp3",
        biHuLingYu: "shengTingJianChaShi/biHuLingYu.mp3",
        caiJueZhe: "shengTingJianChaShi/caiJueZhe.mp3",
        shenShengBianCe: "shengTingJianChaShi/shenShengBianCe.mp3",
        tianZhiGong: "shengGong/tianZhiGong.mp3",
        shengXieJuBao: "shengGong/shengXieJuBao.mp3",
        shengHuangJiangLin: "shengGong/shengHuangJiangLin.mp3",
        shengGuangBaoLie: "shengGong/shengGuangBaoLie.mp3",
        liuXingShengDan: "shengGong/liuXingShengDan.mp3",
        shengHuangHuiGuangPao: "shengGong/shengHuangHuiGuangPao.mp3",
        ziDongTianChong: "shengGong/ziDongTianChong.mp3",
        yuanChu_tianZhiGong: "yuanChuZhiGong/tianZhiGong.mp3",
        yuanChu_shengXieJuBao: "yuanChuZhiGong/shengXieJuBao.mp3",
        yuanChu_shengHuangJiangLin: "yuanChuZhiGong/shengHuangJiangLin.mp3",
        yuanChu_shengGuangBaoLie: "yuanChuZhiGong/shengGuangBaoLie.mp3",
        yuanChu_shengHuangHuiGuangPao: "yuanChuZhiGong/shengHuangHuiGuangPao.mp3",
        yuanChu_shengHuangYuHui: "yuanChuZhiGong/shengHuangYuHui.mp3",
        yuanChu_ziDongTianChong: "yuanChuZhiGong/ziDongTianChong.mp3",
        mingDingZhiLi: "xingZhuiNvWu/mingDingZhiLi.mp3",
        xingHuan: "xingZhuiNvWu/xingHuan.mp3",
        xingKe: "xingZhuiNvWu/xingKe.mp3",
        qunXingQiShi: "xingZhuiNvWu/qunXingQiShi.mp3",
        huangJinLv: "xingZhuiNvWu/huangJinLv.mp3",
        fanXing: "xingZhuiNvWu/fanXing.mp3",
        yingYue: "xingZhuiNvWu/yingYue.mp3",
        shiRi: "xingZhuiNvWu/shiRi.mp3",
        chuangKeLvDong: "xingZhuiNvWu/chuangKeLvDong.mp3",
        fuWenZhiHuan: "zhanDouFaShi/fuWenZhiHuan.mp3",
        fuMoDaJi: "zhanDouFaShi/fuMoDaJi.mp3",
        shangBian: "zhanDouFaShi/shangBian.mp3",
        moLiShangZeng: "zhanDouFaShi/moLiShangZeng.mp3",
        zhuanHuan: "lieWuRen/zhuanHuan.mp3",
        shouMoCi: "lieWuRen/shouMoCi.mp3",
        faShuBoLi: "lieWuRen/faShuBoLi.mp3",
        guanYinDuRen: "lieWuRen/guanYinDuRen.mp3",
        touXi: "lieWuRen/touXi.mp3",
        gaoLingZhiHua: "jinGuiZhiNv/gaoLingZhiHua.mp3",
        moFaRuMen: "jinGuiZhiNv/moFaRuMen.mp3",
        qiangYuYuanXing: "jinGuiZhiNv/qiangYuYuanXing.mp3",
        youQingJiBan: "jinGuiZhiNv/youQingJiBan.mp3",
        shenQiZhiYi_kaiShi: "ranWuZhe/shenQiZhiYi.mp3",
        liRuQuanYong: "ranWuZhe/liRuQuanYong.mp3",
        kuangLiZhiXin: "ranWuZhe/kuangLiZhiXin.mp3",
        kuangLiZhiTi: "ranWuZhe/kuangLiZhiTi.mp3",
        shenZhiWuRan: "ranWuZhe/shenZhiWuRan.mp3",
        niuQuZhiAi: "ranWuZhe/niuQuZhiAi.mp3",
        yingZhiXue: "nvPuZhang/yingZhiXue.mp3",
        miShuMuYing: "nvPuZhang/miShuMuYing.mp3",
        shun: "nvPuZhang/shun.mp3",
        yingFeng: "nvPuZhang/yingFeng.mp3",
        shiFengZhiDao: "nvPuZhang/shiFengZhiDao.mp3",
        jinShu: "nvPuZhang/jinShu.mp3",
        zhen: "nvPuZhang/zhen.mp3",
        fengXueX_fengZhi: "nvPuZhang/fengXueX_fengZhi.mp3",
        yuRen: "shiShenZhe/yuRen.mp3",
        qinKe: "shiShenZhe/qinKe.mp3",
        shiMie: "shiShenZhe/shiMie.mp3",
        shangMie: "shiShenZhe/shangMie.mp3",
        shenShi: "shiShenZhe/shenShi.mp3",
        tongDiao: "shiShenZhe/tongDiao.mp3",
        gongZhen: "shiShenZhe/gongZhen.mp3",
        zhuShenZhongYan: "shiShenZhe/zhuShenZhongYan.mp3",
        jieJieYiShi: "jieJieShi/jieJieYiShi.mp3",
        huangShenZhiLi: "jieJieShi/huangShenZhiLi.mp3",
        huangShenJiYi: "jieJieShi/huangShenJiYi.mp3",
        jinMoJing: "jieJieShi/jinMoJing.mp3",
        liuLiJing: "jieJieShi/liuLiJing.mp3",
        jueJieX_zero: "jieJieShi/jueJieX_zero.mp3",
        jueJieX_attack: "jieJieShi/jueJieX_attack.mp3",
        jueJieX_wuFa: "jieJieShi/jueJieX_wuFa.mp3",
        fuMoJing: "jieJieShi/fuMoJing.mp3",
        yanLingShu: "shenMiXueZhe/yanLingShu.mp3",
        shouHuLing: "shenMiXueZhe/shouHuLing.mp3",
        zhenYanShu: "shenMiXueZhe/zhenYanShu.mp3",
        jinJiMiFa: "shenMiXueZhe/jinJiMiFa.mp3",
        yaoJingMiShu: "shenMiXueZhe/yaoJingMiShu.mp3",
        zhenYanYaZhi: "shenMiXueZhe/zhenYanYaZhi.mp3",
        chuanShuoZhiDi: "jiLuZhe/chuanShuoZhiDi.mp3",
        zhiXingHeYi: "jiLuZhe/zhiXingHeYi.mp3",
        jiGuShiDian: "jiLuZhe/jiGuShiDian.mp3",
        yiJiLunPo: "jiLuZhe/yiJiLunPo.mp3",
        xuanCuiJingLian: "jiLuZhe/xuanCuiJingLian.mp3",
        miJingWanXiang: "jiLuZhe/miJingWanXiang.mp3",
        shiShuX_yiShiWeiJing: "jiLuZhe/shiShuX_yiShiWeiJing.mp3",
        shiShuX_yinJiBianJian: "jiLuZhe/shiShuX_yinJiBianJian.mp3",
        guJinHuzheng: "jiLuZhe/guJinHuzheng.mp3",
        shenDeMenTu: "chuanJiaoShi/shenDeMenTu.mp3",
        xinYangZhiLu: "chuanJiaoShi/xinYangZhiLu.mp3",
        chuanDao: "chuanJiaoShi/chuanDao.mp3",
        qiShi: "chuanJiaoShi/qiShi.mp3",
        shiFeng: "chuanJiaoShi/shiFeng.mp3",
        luBiaoX: "chuanJiaoShi/luBiaoX.mp3",
        shuLingEnCi: "chuanJiaoShi/shuLingEnCi.mp3",
        miSa: "chuanJiaoShi/miSa.mp3",
        yiDuanXieShuo: "yiJiaoTu/yiDuanXieShuo.mp3",
        shenPanYJT: "yiJiaoTu/shenPanYJT.mp3",
        xianJi: "yiJiaoTu/xianJi.mp3",
        yuYan_zero: "yiJiaoTu/moRiYuYan.mp3",
        yuYan_tianLeiJieHuo: "yiJiaoTu/yuYan_tianLeiJieHuo.mp3",
        yuYan_diLieBoTao: "yiJiaoTu/yuYan_diLieBoTao.mp3",
        yuYan_caiYangZhiXi: "yiJiaoTu/yuYan_caiYangZhiXi.mp3",
        fangZhu: "yiJiaoTu/fangZhu.mp3",
        tanLan: "yiJiaoTu/tanLan.mp3",
        tianDianChongJi: "baoShiShaoNv/tianDianChongJi.mp3",
        shiYuDeHeiDong: "baoShiShaoNv/shiYuDeHeiDong.mp3",
        meiWeiRongHe: "baoShiShaoNv/meiWeiRongHe.mp3",
        sanMiaoYuanZe: "baoShiShaoNv/sanMiaoYuanZe.mp3",
        meiShiFengBao: "baoShiShaoNv/meiShiFengBao.mp3",
        jiZhiJianYi: "jianZhiMoNv/jiZhiJianYi.mp3",
        yiXiangJian: "jianZhiMoNv/yiXiangJian.mp3",
        jianYingDuanNian: "jianZhiMoNv/jianYingDuanNian.mp3",
        xuanHuaShangDeng: "luoLiFanZhang/xuanHuaShangDeng.mp3",
        yeLuSiKu: "luoLiFanZhang/yeLuSiKu.mp3",
        yeLuSiKu_xueYingKuangDao: "luoLiFanZhang/yeLuSiKu_xueYingKuangDao.mp3",
        yeLuSiKu_xueXingPaoXiao: "luoLiFanZhang/yeLuSiKu_xueXingPaoXiao.mp3",
        aiSiTianLiu: "luoLiFanZhang/aiSiTianLiu.mp3",
        mieChaKuCha: "luoLiFanZhang/mieChaKuCha.mp3",
        lingZhiZhiYi: "lingXiZhiChao/lingZhiZhiYi.mp3",
        xieLingTuiSan: "lingXiZhiChao/xieLingTuiSan.mp3",
        banXiangHunLing: "lingXiZhiChao/banXiangHunLing.mp3",
        boYongZhiLi: "lingXiZhiChao/boYongZhiLi.mp3",
        nuChaoHuangTao: "lingXiZhiChao/nuChaoHuangTao.mp3",
        haiShenYuWu: "lingXiZhiChao/haiShenYuWu.mp3",
        "tianShi?": "daoDanLuoLi/tianShi.mp3",
        panNiZhiQiang: "daoDanLuoLi/panNiZhiQiang.mp3",
        shenMiFuBi: "daoDanLuoLi/shenMiFuBi.mp3",
        "T-r-i-c-k-y!": "daoDanLuoLi/tricky.mp3",
        trickOrTreat: "daoDanLuoLi/trickOrTreat.mp3",
        suprise: "daoDanLuoLi/suprise.mp3",
        baSiKeZhiFa: "yueTuanShouXi/baSiKeZhiFa.mp3",
        moXingXuanLv: "yueTuanShouXi/moXingXuanLv.mp3",
        xinYueZhang: "yueTuanShouXi/xinYueZhang.mp3",
        baLieTaNiXiaoDiao: "yueTuanShouXi/baLieTaNiXiaoDiao.mp3",
        puLuoWangSiXieZouQu: "yueTuanShouXi/puLuoWangSiXieZouQu.mp3",
        naBuLeSiDuZou: "yueTuanShouXi/naBuLeSiDuZou.mp3",
        shenZhiTianPing: "shengZhongCaiZhe/shenZhiTianPing.mp3",
        shanEBiJi: "shengZhongCaiZhe/shanEBiJi.mp3",
        tianPingQingDao: "shengZhongCaiZhe/tianPingQingDao.mp3",
        shenZhiShenPan: "shengZhongCaiZhe/shenZhiShenPan.mp3",
        tianPing_fangZhi: "shengZhongCaiZhe/tianPing_fangZhi.mp3",
        tianPing_zuo: "shengZhongCaiZhe/tianPing_zuo.mp3",
        tianPing_you: "shengZhongCaiZhe/tianPing_you.mp3",
        tianZui: "shengZhongCaiZhe/tianZui.mp3",
        zuiChiBiDao: "shengZhongCaiZhe/zuiChiBiDao.mp3",
        cuYiXiuXin: "jiDuShaoNv/cuYiXiuXin.mp3",
        xuRongZhangWo: "jiDuShaoNv/xuRongZhangWo.mp3",
        xiangSiBing: "jiDuShaoNv/xiangSiBing.mp3",
        jiDuZhuiFang: "jiDuShaoNv/jiDuZhuiFang.mp3",
        shenFengShi: "moGongEX/shenFengShi.mp3",
        jiFengZhuiShe: "moGongEX/jiFengZhuiShe.mp3",
        shenDeDaiXing: "daZuiSiJiao/shenDeDaiXing.mp3",
        shenYiZhiYin: "daZuiSiJiao/shenYiZhiYin.mp3",
        xinYangZhiJia: "daZuiSiJiao/xinYangZhiJia.mp3",
        sheZui: "daZuiSiJiao/sheZui.mp3",
        shenYu: "daZuiSiJiao/shenYu.mp3",
        fuYin: "daZuiSiJiao/fuYin.mp3",
        daZuiLuBiaoX: "daZuiSiJiao/daZuiLuBiaoX.mp3",
        shuLingQuanBing: "daZuiSiJiao/shuLingQuanBing.mp3",
        shengCanLi: "daZuiSiJiao/shengCanLi.mp3",
        guShenJieLv: "guShenJiSi/guShenJieLv.mp3",
        niuQuLianJie: "guShenJiSi/niuQuLianJie.mp3",
        tianQi: "guShenJiSi/tianQi.mp3",
        moRiMengZhao: "guShenJiSi/moRiMengZhao.mp3",
        mengZhao_jiLeMengJing: "guShenJiSi/jiLeMengJing.mp3",
        mengZhao_hongLieLieHuo: "guShenJiSi/hongLieLieHuo.mp3",
        mengZhao_diDongNuTao: "guShenJiSi/diDongNuTao.mp3",
        mengZhao_mengJingPoSui: "guShenJiSi/mengJingPoSui.mp3",
        ruMeng: "guShenJiSi/ruMeng.mp3",
        zhiPei: "guShenJiSi/zhiPei.mp3",
    };

    var characterSkillAudio = {
        bingDong: {
            jianXiZhiPian: "ext:" + extensionName + "/audio/skill/jianXiZhiPian/bingDong.mp3"
        },
        yunShi: {
            jianXiZhiPian: "ext:" + extensionName + "/audio/skill/jianXiZhiPian/yunShi.mp3"
        },
        huoQou: {
            jianXiZhiPian: "ext:" + extensionName + "/audio/skill/jianXiZhiPian/huoQou.mp3"
        },
        fengRen: {
            jianXiZhiPian: "ext:" + extensionName + "/audio/skill/jianXiZhiPian/fengRen.mp3"
        },
        leiJi: {
            jianXiZhiPian: "ext:" + extensionName + "/audio/skill/jianXiZhiPian/leiJi.mp3"
        },
        juJi: {
            moGongEX: "ext:" + extensionName + "/audio/skill/moGongEX/juJi.mp3"
        },
        shanGuangXianJing: {
            moGongEX: "ext:" + extensionName + "/audio/skill/moGongEX/shanGuangXianJing.mp3"
        },
        jingZhunSheJi: {
            moGongEX: "ext:" + extensionName + "/audio/skill/moGongEX/jingZhunSheJi.mp3"
        },
        liuXingShengDan: {
            yuanChuZhiGong: "ext:" + extensionName + "/audio/skill/yuanChuZhiGong/liuXingShengDan.mp3"
        },
        moDanZhangWo: {
            jieRiMoDao: "ext:" + extensionName + "/audio/skill/jieRiMoDao/moDanZhangWo.mp3"
        },
        moDanRongHe: {
            jieRiMoDao: "ext:" + extensionName + "/audio/skill/jieRiMoDao/moDanRongHe.mp3"
        },
        huiMieFengBao: {
            jieRiMoDao: "ext:" + extensionName + "/audio/skill/jieRiMoDao/huiMieFengBao.mp3"
        }
    };

    function installSpatialAudio() {
        if (game._shiZhouNianSpatialAudioInstalled) return;
        game._shiZhouNianSpatialAudioInstalled = true;

        var AudioContextClass = window.AudioContext || window.webkitAudioContext;
        var getSpatialPan = function (speaker) {
            if (!speaker || !game.me || speaker === game.me) return 0;

            // 优先使用客户端实际牌桌位置；不同人数、布局和换位后方向仍与画面一致。
            if (speaker.getBoundingClientRect && ui.arena && ui.arena.getBoundingClientRect) {
                var speakerRect = speaker.getBoundingClientRect();
                var arenaRect = ui.arena.getBoundingClientRect();
                if (speakerRect.width && arenaRect.width) {
                    var speakerCenter = speakerRect.left + speakerRect.width / 2;
                    var arenaCenter = arenaRect.left + arenaRect.width / 2;
                    var visualPan = (speakerCenter - arenaCenter) / Math.max(arenaRect.width * 0.42, 1);
                    return Math.max(-0.65, Math.min(0.65, visualPan * 0.65));
                }
            }

            // 界面尚未完成布局时，按座次环形距离降级计算。
            var total = game.players ? game.players.length : 0;
            var speakerSeat = typeof speaker.getSeatNum === "function" ? speaker.getSeatNum() : 0;
            var localSeat = typeof game.me.getSeatNum === "function" ? game.me.getSeatNum() : 0;
            if (!total || !speakerSeat || !localSeat) return 0;
            var delta = (speakerSeat - localSeat + total) % total;
            if (delta > total / 2) delta -= total;
            if (Math.abs(delta) === total / 2) return 0;
            return Math.max(-0.65, Math.min(0.65, delta / Math.max(total / 2, 1) * 0.65));
        };

        var attachPanner = function (audio, speaker) {
            if (!audio || !AudioContextClass || !speaker) return;
            var pan = getSpatialPan(speaker);
            if (Math.abs(pan) < 0.01) return;

            var connect = function () {
                try {
                    var context = game._shiZhouNianAudioContext;
                    if (!context) {
                        context = new AudioContextClass();
                        game._shiZhouNianAudioContext = context;
                    }
                    var panner = typeof context.createStereoPanner === "function" ? context.createStereoPanner() : null;
                    if (!panner) return;
                    var source = context.createMediaElementSource(audio);
                    panner.pan.value = pan;
                    source.connect(panner);
                    panner.connect(context.destination);
                    audio._shiZhouNianSpatialNodes = [source, panner];
                    if (context.state === "suspended") context.resume().catch(function () {});
                } catch (error) {
                    // 不支持Web Audio、音频已被连接或上下文不可用时保持原始中央声道。
                }
            };
            if (audio.readyState >= 3) connect();
            else audio.addEventListener("canplay", connect, { once: true });
        };

        var oldPlayAudio = game.playAudio;
        game.playAudio = function () {
            var args = Array.prototype.slice.call(arguments);
            var options = args.length === 1 && args[0] && typeof args[0] === "object" ? args[0] : null;
            var path = options && options.path != null
                ? String(options.path)
                : args.filter(function (arg) {
                    return typeof arg === "string" || typeof arg === "number";
                }).join("/");
            var speaker = options && options.spatialPlayer
                ? options.spatialPlayer
                : game._shiZhouNianSpatialSpeaker;
            var audio = oldPlayAudio.apply(this, args);
            var enabled = lib.config["extension_" + extensionName + "_spatialAudio"] !== false;
            var isVoicePackAudio = path.indexOf("ext:" + extensionName + "/") === 0;
            if (enabled && isVoicePackAudio) attachPanner(audio, speaker);
            return audio;
        };
        game.playAudio._shiZhouNianSpatialAudioOriginal = oldPlayAudio;

        game._shiZhouNianSpatialTrySkillAudioOriginal = game.trySkillAudio;
        game.trySkillAudio = function (skill, player) {
            if (typeof game._shiZhouNianSpatialTrySkillAudioOriginal !== "function") return;
            var previous = game._shiZhouNianSpatialSpeaker;
            game._shiZhouNianSpatialSpeaker = player;
            try {
                return game._shiZhouNianSpatialTrySkillAudioOriginal.apply(this, arguments);
            } finally {
                game._shiZhouNianSpatialSpeaker = previous;
            }
        };
        game.trySkillAudio._shiZhouNianSpatialAudioOriginal = game._shiZhouNianSpatialTrySkillAudioOriginal;
    }

    function installSkillAudio() {
        installSpatialAudio();
        Object.keys(skillAudio).forEach(function (skill) {
            if (!lib.skill[skill]) return;
            lib.skill[skill].audio = "ext:" + extensionName + "/audio/skill/" + skillAudio[skill];
        });
        if (lib.skill.kuangHua) {
            lib.skill.kuangHua.logAudio = function (event) {
                var trigger = event && typeof event.getTrigger === "function" ? event.getTrigger() : null;
                var current = trigger;
                var card = null;
                for (var i = 0; current && i < 12; i++) {
                    if (current.card) {
                        card = current.card;
                        break;
                    }
                    current = typeof current.getParent === "function" ? current.getParent() : current.parent;
                }
                if (card && typeof card.hasDuYou === "function" &&
                    (card.hasDuYou("xueYingKuangDao") || card.hasDuYou("xueXingPaoXiao"))) {
                    return false;
                }
                return "ext:" + extensionName + "/audio/skill/kuangZhanShi/kuangHua.mp3";
            };
        }
        ["xueYingKuangDao", "xueXingPaoXiao"].forEach(function (skill) {
            if (!lib.skill[skill] || lib.skill[skill].shiZhouNianKuangHuaAudioWrapped) return;
            var oldContent = lib.skill[skill].content;
            lib.skill[skill].content = async function (event, trigger, player) {
                var current = trigger;
                for (var i = 0; current && i < 20; i++) {
                    current._shiZhouNianSuppressKuangHuaAudio = true;
                    current = typeof current.getParent === "function" ? current.getParent() : current.parent;
                }
                await oldContent.apply(this, arguments);
            };
            lib.skill[skill].shiZhouNianKuangHuaAudioWrapped = true;
        });
        if (!game.trySkillAudio._shiZhouNianKuangHuaAudioWrapped) {
            game._shiZhouNianKuangHuaTrySkillAudioOriginal = game.trySkillAudio;
            game.trySkillAudio = function (skill, player, directaudio, nobroadcast, skillInfo, args) {
                if (typeof game._shiZhouNianKuangHuaTrySkillAudioOriginal !== "function") return;
                if (skill === "kuangHua" && args && args[0]) {
                    var roots = [args[0]];
                    if (typeof args[0].getTrigger === "function") roots.push(args[0].getTrigger());
                    for (var r = 0; r < roots.length; r++) {
                        var current = roots[r];
                        for (var i = 0; current && i < 20; i++) {
                            if (current._shiZhouNianSuppressKuangHuaAudio) return;
                            current = typeof current.getParent === "function" ? current.getParent() : current.parent;
                        }
                    }
                }
                return game._shiZhouNianKuangHuaTrySkillAudioOriginal.apply(this, arguments);
            };
            game.trySkillAudio._shiZhouNianKuangHuaAudioWrapped = true;
            game.trySkillAudio._shiZhouNianKuangHuaAudioOriginal = game._shiZhouNianKuangHuaTrySkillAudioOriginal;
        }
        if (!game.trySkillAudio._shiZhouNianJianZhiZiInheritedAudioWrapped) {
            game._shiZhouNianJianZhiZiTrySkillAudioOriginal = game.trySkillAudio;
            game._shiZhouNianJianZhiZiWitchSkills = {
                jiZhiJianYi: true,
                yiXiangJian: true,
                mengXiangJian: true,
                jianYingDuanNian: true,
                shiZhouNian_yiXiangJianGainAudio: true,
                shiZhouNian_yiXiangJianFaShuAudio: true,
                shiZhouNian_mengXiangJianFirstAudio: true,
                shiZhouNian_mengXiangJianSecondAudio: true,
                shiZhouNian_mengXiangJianFourthAudio: true
            };
            game._shiZhouNianJianZhiZiSilentSkills = {
                fengNuZhuiJi: true,
                shengJian: true,
                lieFengJi: true,
                jiFengJi: true,
                jianYing: true
            };
            game.trySkillAudio = function (skill, player, directaudio, nobroadcast, skillInfo, args) {
                if (typeof game._shiZhouNianJianZhiZiTrySkillAudioOriginal !== "function") return;
                var isJianZhiZi = player && (
                    player.name === "jianZhiZi" ||
                    player.name1 === "jianZhiZi" ||
                    player.name2 === "jianZhiZi"
                );
                if (isJianZhiZi && game._shiZhouNianJianZhiZiWitchSkills && game._shiZhouNianJianZhiZiWitchSkills[skill]) {
                    return game._shiZhouNianJianZhiZiTrySkillAudioOriginal.call(
                        this,
                        "shiZhouNian_jianZhiZiQingMuInheritedAudio",
                        player,
                        directaudio,
                        nobroadcast,
                        {
                            audio: "ext:十周年语音包/audio/skill/jianZhiZi/qingMu_gain.mp3",
                            forceaudio: true
                        },
                        args
                    );
                }
                if (isJianZhiZi && game._shiZhouNianJianZhiZiSilentSkills && game._shiZhouNianJianZhiZiSilentSkills[skill]) return;
                return game._shiZhouNianJianZhiZiTrySkillAudioOriginal.apply(this, arguments);
            };
            game.trySkillAudio._shiZhouNianJianZhiZiInheritedAudioWrapped = true;
            game.trySkillAudio._shiZhouNianJianZhiZiInheritedAudioOriginal = game._shiZhouNianJianZhiZiTrySkillAudioOriginal;
            game.trySkillAudio._shiZhouNianKuangHuaAudioWrapped =
                game._shiZhouNianJianZhiZiTrySkillAudioOriginal._shiZhouNianKuangHuaAudioWrapped;
            game.trySkillAudio._shiZhouNianKuangHuaAudioOriginal =
                game._shiZhouNianJianZhiZiTrySkillAudioOriginal._shiZhouNianKuangHuaAudioOriginal;
        }
        Object.keys(characterSkillAudio).forEach(function (skill) {
            if (!lib.skill[skill]) return;
            if (!lib.skill[skill].audioname2) lib.skill[skill].audioname2 = {};
            Object.keys(characterSkillAudio[skill]).forEach(function (character) {
                lib.skill[skill].audioname2[character] = characterSkillAudio[skill][character];
            });
        });
        if (lib.skill.moLiPing) {
            var fullAudioSkill = "shiZhouNian_moLiPingFullAudio";
            lib.skill[fullAudioSkill] = {
                audio: "ext:" + extensionName + "/audio/skill/lieWuRen/moLiPingFull.mp3",
                trigger: { player: "addGaiPaiAfter" },
                forced: true,
                popup: false,
                charlotte: true,
                filter: function (event, player) {
                    return event.gaiPai === "moLiPing" && player.getGaiPai("moLiPing").length === 4;
                },
                content: function () {}
            };
            var group = lib.skill.moLiPing.group;
            if (!group) group = [];
            else if (typeof group === "string") group = [group];
            if (!group.includes(fullAudioSkill)) group.push(fullAudioSkill);
            lib.skill.moLiPing.group = group;
        }
        if (lib.skill.Magic) {
            lib.skill.Magic.audio = false;
            lib.skill.Magic.logAudio = function (event) {
                var trigger = event && typeof event.getTrigger === "function" ? event.getTrigger() : null;
                var noEffect = trigger && trigger.faShu === false && trigger.yong === 0 && trigger.shui === 0;
                var file = noEffect ? "MagicFail.mp3" : "Magic.mp3";
                return "ext:" + extensionName + "/audio/skill/jinGuiZhiNv/" + file;
            };
        }
        if (lib.skill.wangNvJinKu && !lib.skill.wangNvJinKu.shiZhouNianAudioWrapped) {
            var playTanLanAudio = function (file, speaker) {
                var path = "ext:" + extensionName + "/audio/skill/tanLanShaoNv/" + file;
                game.broadcastAll(function (audioPath, audioSpeaker) {
                    if (!lib.config.background_audio) return;
                    game.playAudio({
                        path: audioPath,
                        spatialPlayer: audioSpeaker,
                        addVideo: false,
                        onError: function () {}
                    });
                }, path, speaker);
            };
            var oldWangNvJinKuBefore = lib.skill.wangNvJinKu.contentBefore;
            lib.skill.wangNvJinKu.contentBefore = async function (event, trigger, player) {
                var beforeCount = get.zhanJi(player.side).length;
                await oldWangNvJinKuBefore.apply(this, arguments);
                if (get.zhanJi(player.side).length < beforeCount) {
                    playTanLanAudio("wangNvJinKu_invest.mp3", player);
                }
            };
            var oldWangNvJinKuAfter = lib.skill.wangNvJinKu.contentAfter;
            lib.skill.wangNvJinKu.contentAfter = async function (event, trigger, player) {
                var enemySide = !player.side;
                var beforeMorale = get.shiQi(enemySide);
                await oldWangNvJinKuAfter.apply(this, arguments);
                if (get.shiQi(enemySide) < beforeMorale) {
                    playTanLanAudio("wangNvJinKu_morale.mp3", player);
                }
            };
            lib.skill.wangNvJinKu.shiZhouNianAudioWrapped = true;
        }
        if (lib.skill.zaiShuiYiXia && !lib.skill.zaiShuiYiXia.shiZhouNianAudioWrapped) {
            var oldZaiShuiYiXiaContent = lib.skill.zaiShuiYiXia.content;
            lib.skill.zaiShuiYiXia.content = async function (event, trigger, player) {
                await oldZaiShuiYiXiaContent.apply(this, arguments);
                if (!event || !event.yiChu) return;
                var path = "ext:" + extensionName + "/audio/skill/daiDuoShaoNv/zaiShuiYiXia_overflow.mp3";
                game.broadcastAll(function (audioPath, audioSpeaker) {
                    if (!lib.config.background_audio) return;
                    game.playAudio({
                        path: audioPath,
                        spatialPlayer: audioSpeaker,
                        addVideo: false,
                        onError: function () {}
                    });
                }, path, player);
            };
            lib.skill.zaiShuiYiXia.shiZhouNianAudioWrapped = true;
        }
        var playJianZhiZiAudio = function (file, delay, speaker) {
            var path = "ext:" + extensionName + "/audio/skill/jianZhiZi/" + file;
            game.broadcastAll(function (audioPath, delayTime, audioSpeaker) {
                var play = function () {
                    if (!lib.config.background_audio) return;
                    game.playAudio({
                        path: audioPath,
                        spatialPlayer: audioSpeaker,
                        addVideo: false,
                        onError: function () {}
                    });
                };
                if (delayTime) setTimeout(play, delayTime);
                else play();
            }, path, delay || 0, speaker);
        };
        if (lib.skill.qingMu && !lib.skill.qingMu.shiZhouNianAudioWrapped) {
            var oldQingMuContent = lib.skill.qingMu.content;
            lib.skill.qingMu.content = async function (event, trigger, player) {
                await oldQingMuContent.apply(this, arguments);
                playJianZhiZiAudio("qingMu_gain.mp3", 3500, player);
            };
            lib.skill.qingMu.shiZhouNianAudioWrapped = true;
        }
        if (lib.skill.jianShouShiYan && !lib.skill.jianShouShiYan.shiZhouNianAudioWrapped) {
            var oathCondition = lib.skill.jianShouShiYan.subSkill && lib.skill.jianShouShiYan.subSkill.tiaoJian;
            if (oathCondition && typeof oathCondition.content === "function") {
                var oldOathConditionContent = oathCondition.content;
                oathCondition.content = async function (event, trigger, player) {
                    var phase = event.getParent("phase");
                    var hadOath = phase && phase.jianShouShiYan === true;
                    await oldOathConditionContent.apply(this, arguments);
                    if (!hadOath && phase && phase.jianShouShiYan === true) {
                        playJianZhiZiAudio("jianShouShiYan.mp3", 0, player);
                    }
                };
            }
            var oldJianShouShiYanContent = lib.skill.jianShouShiYan.content;
            lib.skill.jianShouShiYan.content = async function (event, trigger, player) {
                var oldName = player.name1;
                await oldJianShouShiYanContent.apply(this, arguments);
                if (oldName === "jianZhiZi" && player.name1 === "fengZhiJianSheng") {
                    playJianZhiZiAudio("jianShouShiYan_awaken.mp3", 0, player);
                }
            };
            lib.skill.jianShouShiYan.shiZhouNianAudioWrapped = true;
        }
        if (lib.skill.jianCanYing && !lib.skill.jianCanYing.shiZhouNianAudioWrapped) {
            var followupAudioSkill = "shiZhouNian_jianCanYingFollowupAudio";
            lib.skill[followupAudioSkill] = {
                trigger: { player: "gongJiShi" },
                forced: true,
                popup: false,
                charlotte: true,
                filter: function (event, player) {
                    return event.yingZhan !== true && event.target === player.storage.shiZhouNianJianCanYingTarget;
                },
                content: function (event, trigger, player) {
                    game.broadcastAll(function (audioSpeaker) {
                        if (!lib.config.background_audio) return;
                        game.playAudio({
                            path: "ext:十周年语音包/audio/skill/jianZhiZi/jianCanYing_followup.mp3",
                            spatialPlayer: audioSpeaker,
                            addVideo: false,
                            onError: function () {}
                        });
                    }, player);
                    delete player.storage.shiZhouNianJianCanYingTarget;
                    player.removeSkill("shiZhouNian_jianCanYingFollowupAudio");
                },
                onremove: function (player) {
                    delete player.storage.shiZhouNianJianCanYingTarget;
                }
            };
            var oldJianCanYingContent = lib.skill.jianCanYing.content;
            lib.skill.jianCanYing.content = async function (event, trigger, player) {
                await oldJianCanYingContent.apply(this, arguments);
                var actions = player.storage.extraXingDong;
                var action = actions && actions[actions.length - 1];
                if (action && action.xingDong === "gongJi" && action.target) {
                    player.storage.shiZhouNianJianCanYingTarget = action.target;
                    player.addSkill(followupAudioSkill);
                }
            };
            lib.skill.jianCanYing.shiZhouNianAudioWrapped = true;
        }
        if (lib.skill.yiXiangJian) {
            var findParentEvent = function (event, name) {
                var current = event;
                for (var i = 0; current && i < 16; i++) {
                    if (current.name === name) return current;
                    current = typeof current.getParent === "function" ? current.getParent() : current.parent;
                }
                return null;
            };
            var branchAudioSkills = {
                shiZhouNian_yiXiangJianGainAudio: {
                    audio: "ext:" + extensionName + "/audio/skill/jianZhiMoNv/yiXiangJian_gain.mp3",
                    trigger: { player: "gainAfter" },
                    filter: function (event, player) {
                        var parent = findParentEvent(event, "yiXiangJian");
                        return parent && parent.player === player && Array.isArray(event.cards) && event.cards.some(function (card) {
                            return get.type(card) === "gongJi";
                        });
                    }
                },
                shiZhouNian_yiXiangJianFaShuAudio: {
                    audio: "ext:" + extensionName + "/audio/skill/jianZhiMoNv/yiXiangJian_faShu.mp3",
                    trigger: { global: "loseAfter" },
                    filter: function (event, player) {
                        var parent = findParentEvent(event, "yiXiangJian");
                        return parent && parent.player === player && Array.isArray(event.cards) && event.cards.some(function (card) {
                            return get.type(card) === "faShu";
                        });
                    }
                }
            };
            Object.keys(branchAudioSkills).forEach(function (skill) {
                lib.skill[skill] = Object.assign({ forced: true, popup: false, charlotte: true, content: function () {} }, branchAudioSkills[skill]);
            });
            var yiXiangGroup = lib.skill.yiXiangJian.group;
            if (!yiXiangGroup) yiXiangGroup = [];
            else if (typeof yiXiangGroup === "string") yiXiangGroup = [yiXiangGroup];
            Object.keys(branchAudioSkills).forEach(function (skill) {
                if (!yiXiangGroup.includes(skill)) yiXiangGroup.push(skill);
            });
            lib.skill.yiXiangJian.group = yiXiangGroup;
        }
        if (lib.skill.mengXiangJian) {
            var dreamAudioSkills = {
                shiZhouNian_mengXiangJianFirstAudio: [1, "mengXiangJian_first.mp3"],
                shiZhouNian_mengXiangJianSecondAudio: [2, "mengXiangJian_second.mp3"],
                shiZhouNian_mengXiangJianFourthAudio: [4, "mengXiangJian_fourth.mp3"]
            };
            Object.keys(dreamAudioSkills).forEach(function (skill) {
                var config = dreamAudioSkills[skill];
                lib.skill[skill] = {
                    audio: "ext:" + extensionName + "/audio/skill/jianZhiMoNv/" + config[1],
                    trigger: { player: "gongJiAfter" },
                    forced: true,
                    popup: false,
                    charlotte: true,
                    filter: function (event, player) {
                        return event.yingZhan !== true && player.getStat("gongJi").zhuDong.length === config[0];
                    },
                    content: function () {}
                };
            });
            var dreamGroup = lib.skill.mengXiangJian.group;
            if (!dreamGroup) dreamGroup = [];
            else if (typeof dreamGroup === "string") dreamGroup = [dreamGroup];
            Object.keys(dreamAudioSkills).forEach(function (skill) {
                if (!dreamGroup.includes(skill)) dreamGroup.push(skill);
            });
            lib.skill.mengXiangJian.group = dreamGroup;
        }
        if (lib.skill.boYongZhiLi && !lib.skill.boYongZhiLi.shiZhouNianAudioWrapped) {
            var oldBoYongZhiLiContent = lib.skill.boYongZhiLi.content;
            lib.skill.boYongZhiLi.content = async function (event, trigger, player) {
                var beforeCount = player.countZhiShiWu("lingYong");
                await oldBoYongZhiLiContent.apply(this, arguments);
                var afterCount = player.countZhiShiWu("lingYong");
                if (afterCount <= beforeCount) return;
                var file = afterCount >= 4 ? "lingYong_full.mp3" : "lingYong_gain.mp3";
                var path = "ext:" + extensionName + "/audio/skill/lingXiZhiChao/" + file;
                game.broadcastAll(function (audioPath, audioSpeaker) {
                    if (!lib.config.background_audio) return;
                    game.playAudio({
                        path: audioPath,
                        spatialPlayer: audioSpeaker,
                        addVideo: false,
                        onError: function () {}
                    });
                }, path, player);
            };
            lib.skill.boYongZhiLi.shiZhouNianAudioWrapped = true;
        }
        var actionAudioSkill = "shiZhouNian_characterActionAudio";
        lib.skill[actionAudioSkill] = {
            trigger: { player: ["gouMai", "heCheng", "tiLian"] },
            forced: true,
            popup: false,
            charlotte: true,
            firstDo: true,
            content: function (event, trigger, player) {
                var actionFiles = {
                    gouMai: "gouMai.mp3",
                    heCheng: "heCheng.mp3",
                    tiLian: "tiLian.mp3"
                };
                // event.triggername 才是 event.trigger(...) 传入的自定义时机；
                // trigger.name 仍保留给直接同名事件作为兼容回退。
                var actionName = event.triggername || trigger.name;
                var file = actionFiles[actionName];
                if (!file) return;
                var character = player.name;
                if (!character || !lib.character[character]) {
                    character = player.name1 || player.name2;
                }
                if (!character) return;
                // 此 content 会由旧式 StepCompiler 重编译，不能引用扩展外层闭包变量。
                var path = "ext:十周年语音包/audio/action/" + character + "/" + file;
                game.broadcastAll(function (audioPath, audioSpeaker) {
                    if (!lib.config.background_audio) return;
                    game.playAudio({
                        path: audioPath,
                        spatialPlayer: audioSpeaker,
                        addVideo: false,
                        onError: function () {}
                    });
                }, path, player);
            }
        };
        game.addGlobalSkill(actionAudioSkill);
    }

    return {
        name: extensionName,
        version: "6.10",
        connect: true,
        editable: false,
        config: {
            spatialAudio: {
                name: "技能语音左右声道",
                init: true,
                intro: "以本客户端为听音中心，根据发声角色在牌桌上的左右位置调整声道；不支持时自动使用中央声道。"
            }
        },
        precontent: installSkillAudio,
        content: installSkillAudio,
        arenaReady: installSkillAudio,
        help: {
            "十周年语音包": "为十周年角色补充技能语音。当前已实装风之剑圣、狂战士、神箭手、封印师、暗杀者、圣女、守护天使、魔法少女、魔剑士、圣枪骑士、元素师、冒险家、瘟疫法师、仲裁者、神官、祈祷师、贤者、灵符师、格斗家、剑帝、灵魂术士、勇者、血之巫女、蝶舞者、女武神、魔弓、红莲骑士、英灵人形、魔枪、吟游诗人、苍炎魔女、精灵射手、血色剑灵、阴阳师、月之女神、兽灵武士、圣殿骑士、圣庭检察士、圣弓、原初之弓、星坠女巫、战斗法师、猎巫人、女仆长、矜贵之女、染污者、噬神者、结界师、大罪司教与古神祭祀的全部技能语音。"
        },
        package: {
            intro: "十周年角色技能语音扩展。当前收录风之剑圣、狂战士、神箭手、封印师、暗杀者、圣女、守护天使、魔法少女、魔剑士、圣枪骑士、元素师、冒险家、瘟疫法师、仲裁者、神官、祈祷师、贤者、灵符师、格斗家、剑帝、灵魂术士、勇者、血之巫女、蝶舞者、女武神、魔弓、红莲骑士、英灵人形、魔枪、吟游诗人、苍炎魔女、精灵射手、血色剑灵、阴阳师、月之女神、兽灵武士、圣殿骑士、圣庭检察士、圣弓、原初之弓、星坠女巫、战斗法师、猎巫人、女仆长、矜贵之女、染污者、噬神者、结界师、大罪司教与古神祭祀的全部技能语音。",
            author: "蒙牛 / Codex",
            diskURL: "",
            forumURL: "",
            version: "6.9"
        },
        files: {
            character: [],
            card: [],
            skill: [],
            audio: [
                "audio/skill/fengZhiJianSheng/fengNuZhuiJi.mp3",
                "audio/skill/fengZhiJianSheng/shengJian.mp3",
                "audio/skill/fengZhiJianSheng/lieFengJi.mp3",
                "audio/skill/fengZhiJianSheng/jiFengJi.mp3",
                "audio/skill/fengZhiJianSheng/jianYing.mp3",
                "audio/skill/kuangZhanShi/kuangHua.mp3",
                "audio/skill/kuangZhanShi/xueYingKuangDao.mp3",
                "audio/skill/kuangZhanShi/xueXingPaoXiao.mp3",
                "audio/skill/kuangZhanShi/siLie.mp3",
                "audio/skill/shenJianShou/shanDianJian.mp3",
                "audio/skill/shenJianShou/guanChuanSheJi.mp3",
                "audio/skill/shenJianShou/shanGuangXianJing.mp3",
                "audio/skill/shenJianShou/jingZhunSheJi.mp3",
                "audio/skill/shenJianShou/juJi.mp3",
                "audio/skill/fengYinShi/faShuJiDang.mp3",
                "audio/skill/fengYinShi/diZhiFengYin.mp3",
                "audio/skill/fengYinShi/shuiZhiFengYin.mp3",
                "audio/skill/fengYinShi/huoZhiFengYin.mp3",
                "audio/skill/fengYinShi/fengZhiFengYin.mp3",
                "audio/skill/fengYinShi/leiZhiFengYin.mp3",
                "audio/skill/fengYinShi/wuXiShuFu.mp3",
                "audio/skill/fengYinShi/fengYinPoSui.mp3",
                "audio/skill/anShaZhe/fanShi.mp3",
                "audio/skill/anShaZhe/shuiYing.mp3",
                "audio/skill/anShaZhe/qianXing.mp3",
                "audio/skill/shengNv/bingShuangDaoYan.mp3",
                "audio/skill/shengNv/zhiLiaoShu.mp3",
                "audio/skill/shengNv/zhiYuZhiGuang.mp3",
                "audio/skill/shengNv/lianMin.mp3",
                "audio/skill/shengNv/shengLiao.mp3",
                "audio/skill/tianShi/fengZhiJieJing.mp3",
                "audio/skill/tianShi/tianShiZhuFu.mp3",
                "audio/skill/tianShi/tianShiJiBan.mp3",
                "audio/skill/tianShi/tianShiZhiQiang.mp3",
                "audio/skill/tianShi/tianShiZhiGe.mp3",
                "audio/skill/tianShi/shenZhiBiHu.mp3",
                "audio/skill/moFaShaoNv/moBaoChongJi.mp3",
                "audio/skill/moFaShaoNv/moDanZhangWo.mp3",
                "audio/skill/moFaShaoNv/moDanRongHe.mp3",
                "audio/skill/moFaShaoNv/huiMieFengBao.mp3",
                "audio/skill/moJianShi/xiuLuoLianZhan.mp3",
                "audio/skill/moJianShi/anYingNingJu.mp3",
                "audio/skill/moJianShi/anYingZhiLi.mp3",
                "audio/skill/moJianShi/anYingKangJu.mp3",
                "audio/skill/moJianShi/anYingLiuXing.mp3",
                "audio/skill/moJianShi/huangQuanZhengChan.mp3",
                "audio/skill/shengQiangQiShi/shenShengXinYang.mp3",
                "audio/skill/shengQiangQiShi/huiYao.mp3",
                "audio/skill/shengQiangQiShi/chengJie.mp3",
                "audio/skill/shengQiangQiShi/shengJi.mp3",
                "audio/skill/shengQiangQiShi/tianQiang.mp3",
                "audio/skill/shengQiangQiShi/diQiang.mp3",
                "audio/skill/shengQiangQiShi/shengGuangQiYu.mp3",
                "audio/skill/yuanSuShi/yuanSuXiShou.mp3",
                "audio/skill/yuanSuShi/yuanSuDianRan.mp3",
                "audio/skill/yuanSuShi/yunShi.mp3",
                "audio/skill/yuanSuShi/bingDong.mp3",
                "audio/skill/yuanSuShi/huoQou.mp3",
                "audio/skill/yuanSuShi/fengRen.mp3",
                "audio/skill/yuanSuShi/leiJi.mp3",
                "audio/skill/yuanSuShi/yueGuang.mp3",
                "audio/skill/maoXianJia/qiZha.mp3",
                "audio/skill/maoXianJia/qiangYun.mp3",
                "audio/skill/maoXianJia/diXiaFaZe.mp3",
                "audio/skill/maoXianJia/maoXianJiaTianTang.mp3",
                "audio/skill/maoXianJia/touTianHuanRi.mp3",
                "audio/skill/wenYiFaShi/buXiu.mp3",
                "audio/skill/wenYiFaShi/shengDu.mp3",
                "audio/skill/wenYiFaShi/wenYi.mp3",
                "audio/skill/wenYiFaShi/siWangZhiChu.mp3",
                "audio/skill/wenYiFaShi/juDuXinXing.mp3",
                "audio/skill/zhongCaiZhe/zhongCaiFaZe.mp3",
                "audio/skill/zhongCaiZhe/yiShiZhongDuan.mp3",
                "audio/skill/zhongCaiZhe/moRiShenPan.mp3",
                "audio/skill/zhongCaiZhe/shenPanLangChao.mp3",
                "audio/skill/zhongCaiZhe/zhongCaiYiShi.mp3",
                "audio/skill/zhongCaiZhe/panJueTianPing.mp3",
                "audio/skill/shenGuan/shenShengQiShi.mp3",
                "audio/skill/shenGuan/shenShengQiFu.mp3",
                "audio/skill/shenGuan/shuiZhiShenLi.mp3",
                "audio/skill/shenGuan/shengShiShouHu.mp3",
                "audio/skill/shenGuan/shenShengQiYue.mp3",
                "audio/skill/shenGuan/shenShengLingYu.mp3",
                "audio/skill/qiDaoShi/guangHuiXinYang.mp3",
                "audio/skill/qiDaoShi/heiAnZuZhou.mp3",
                "audio/skill/qiDaoShi/weiLiCiFu.mp3",
                "audio/skill/qiDaoShi/xunJieCiFu.mp3",
                "audio/skill/qiDaoShi/qiDao.mp3",
                "audio/skill/qiDaoShi/faLiChaoXi.mp3",
                "audio/skill/xianZhe/zhiHuiFaDian.mp3",
                "audio/skill/xianZhe/faShuFanTan.mp3",
                "audio/skill/xianZhe/moDaoFaDian.mp3",
                "audio/skill/xianZhe/shengJieFaDian.mp3",
                "audio/skill/lingFuShi/lingFu_leiMing.mp3",
                "audio/skill/lingFuShi/lingFu_fengXing.mp3",
                "audio/skill/lingFuShi/nianZhou.mp3",
                "audio/skill/lingFuShi/baiGuiYeXing.mp3",
                "audio/skill/lingFuShi/lingLiBengJie.mp3",
                "audio/skill/jianDi/jianHunShouHu.mp3",
                "audio/skill/jianDi/yangGong.mp3",
                "audio/skill/jianDi/jianQiZhan.mp3",
                "audio/skill/jianDi/tianShiZhiHun.mp3",
                "audio/skill/jianDi/eMoZhiHun.mp3",
                "audio/skill/jianDi/buQuYiZhi.mp3",
                "audio/skill/yongZhe/yongZheZhiXin.mp3",
                "audio/skill/yongZhe/nuHou.mp3",
                "audio/skill/yongZhe/jinPiLiJin.mp3",
                "audio/skill/yongZhe/mingJingZhiShui.mp3",
                "audio/skill/yongZhe/tiaoXin.mp3",
                "audio/skill/yongZhe/jinDuanZhiLi.mp3",
                "audio/skill/yongZhe/siDou.mp3",
                "audio/skill/geDouJia/nianQiLiChang.mp3",
                "audio/skill/geDouJia/xuLiYiji.mp3",
                "audio/skill/geDouJia/nianDan.mp3",
                "audio/skill/geDouJia/baiShiHuanLongQuan.mp3",
                "audio/skill/geDouJia/qiJueBengJi.mp3",
                "audio/skill/geDouJia/douShenTianQu.mp3",
                "audio/skill/lingHunShuShi/lingHunTunShi.mp3",
                "audio/skill/lingHunShuShi/lingHunZhaoHuan.mp3",
                "audio/skill/lingHunShuShi/lingHunZhuanHuan.mp3",
                "audio/skill/lingHunShuShi/lingHunJingXiang.mp3",
                "audio/skill/lingHunShuShi/lingHunZhenBao.mp3",
                "audio/skill/lingHunShuShi/lingHunFuYu.mp3",
                "audio/skill/lingHunShuShi/lingHunLianJie.mp3",
                "audio/skill/lingHunShuShi/lingHunZengFu.mp3",
                "audio/skill/xueZhiWuNv/xueZhiAiShang.mp3",
                "audio/skill/xueZhiWuNv/liuXue.mp3",
                "audio/skill/xueZhiWuNv/niLiu.mp3",
                "audio/skill/xueZhiWuNv/xueZhiBeiMing.mp3",
                "audio/skill/xueZhiWuNv/tongShengGongSi.mp3",
                "audio/skill/xueZhiWuNv/xueZhiZuZhou.mp3",
                "audio/skill/dieWuZhe/shengMingZhiHuo.mp3",
                "audio/skill/dieWuZhe/wuDong.mp3",
                "audio/skill/dieWuZhe/duFen.mp3",
                "audio/skill/dieWuZhe/chaoSheng.mp3",
                "audio/skill/dieWuZhe/jingHuaShuiYue.mp3",
                "audio/skill/dieWuZhe/diaoLing.mp3",
                "audio/skill/dieWuZhe/yongHua.mp3",
                "audio/skill/dieWuZhe/daoNiZhiDie.mp3",
                "audio/skill/nvWuShen/shenShengZhuiJi.mp3",
                "audio/skill/nvWuShen/zhiXuZhiYin.mp3",
                "audio/skill/nvWuShen/hePingXingZhe.mp3",
                "audio/skill/nvWuShen/junShenWeiGuang.mp3",
                "audio/skill/nvWuShen/yingLingZhaoHuan.mp3",
                "audio/skill/moGong/moGuanChongJi.mp3",
                "audio/skill/moGong/leiGuangSanShe.mp3",
                "audio/skill/moGong/duoChongSheJi.mp3",
                "audio/skill/moGong/chongNeng.mp3",
                "audio/skill/moGong/moYan.mp3",
                "audio/skill/hongLianQiShi/xingHongShengYue.mp3",
                "audio/skill/hongLianQiShi/xingHongXinYang.mp3",
                "audio/skill/hongLianQiShi/xueXingDaoYan.mp3",
                "audio/skill/hongLianQiShi/shaLuShengYan.mp3",
                "audio/skill/hongLianQiShi/reXueFeiTeng.mp3",
                "audio/skill/hongLianQiShi/jieJiaoJieZao.mp3",
                "audio/skill/hongLianQiShi/xingHongShiZi.mp3",
                "audio/skill/yingLingRenXing/zhanWenZhangWo.mp3",
                "audio/skill/yingLingRenXing/nuHuoYaZhi.mp3",
                "audio/skill/yingLingRenXing/zhanWenSuiJi.mp3",
                "audio/skill/yingLingRenXing/moWenRongHe.mp3",
                "audio/skill/yingLingRenXing/fuWenGaiZao.mp3",
                "audio/skill/yingLingRenXing/shuangChongHuiXiang.mp3",
                "audio/skill/moQiang/anZhiJieFang.mp3",
                "audio/skill/moQiang/huanYingXingChen.mp3",
                "audio/skill/moQiang/heiAnShuFu.mp3",
                "audio/skill/moQiang/anZhiZhangBi.mp3",
                "audio/skill/moQiang/chongYing.mp3",
                "audio/skill/moQiang/qiHeiZhiQiang.mp3",
                "audio/skill/yinYouShiRen/chenLunXieZouQu.mp3",
                "audio/skill/yinYouShiRen/buXieHeXian.mp3",
                "audio/skill/yinYouShiRen/jinJiShiPian.mp3",
                "audio/skill/yinYouShiRen/yongHengYueZhang.mp3",
                "audio/skill/yinYouShiRen/jiAngKuangXiangQu.mp3",
                "audio/skill/yinYouShiRen/shengLiJiaoXiangShi.mp3",
                "audio/skill/yinYouShiRen/xiWangFuGeQu.mp3",
                "audio/skill/cangYanMoNv/cangYanFaDian.mp3",
                "audio/skill/cangYanMoNv/tianHuoDuanKong.mp3",
                "audio/skill/cangYanMoNv/moNvZhiNu.mp3",
                "audio/skill/cangYanMoNv/tiShenWanOu.mp3",
                "audio/skill/cangYanMoNv/yongShengYinShiJi.mp3",
                "audio/skill/cangYanMoNv/tongKuLianJie.mp3",
                "audio/skill/cangYanMoNv/moNengFanZhuan.mp3",
                "audio/skill/jingLingSheShou/yuanSuSheJi.mp3",
                "audio/skill/jingLingSheShou/dongWuHuoBan.mp3",
                "audio/skill/jingLingSheShou/jingLingMiYi.mp3",
                "audio/skill/jingLingSheShou/chongWuQiangHua.mp3",
                "audio/skill/xueSeJianLing/xueSeJingJi.mp3",
                "audio/skill/xueSeJianLing/chiSeYiShan.mp3",
                "audio/skill/xueSeJianLing/xueRanQiangWei.mp3",
                "audio/skill/xueSeJianLing/xueQiPingZhang.mp3",
                "audio/skill/xueSeJianLing/xueQiangWeiTingYuan.mp3",
                "audio/skill/xueSeJianLing/sanHuaLunWu.mp3",
                "audio/skill/yinYangShi/shiShenJiangLin.mp3",
                "audio/skill/yinYangShi/yinYangZhanHuan.mp3",
                "audio/skill/yinYangShi/shiShenZhuanHuan.mp3",
                "audio/skill/yinYangShi/heiAnJiLi.mp3",
                "audio/skill/yinYangShi/shiShenZhouShu.mp3",
                "audio/skill/yinYangShi/shengMingJieJie.mp3",
                "audio/skill/yueZhiNvShen/xinYueBiHu.mp3",
                "audio/skill/yueZhiNvShen/anYueZuZhou.mp3",
                "audio/skill/yueZhiNvShen/meiDuShaZhiYan.mp3",
                "audio/skill/yueZhiNvShen/yueZhiLunHui.mp3",
                "audio/skill/yueZhiNvShen/yueDu.mp3",
                "audio/skill/yueZhiNvShen/anYueZhan.mp3",
                "audio/skill/yueZhiNvShen/cangBaiZhiYue.mp3",
                "audio/skill/shouLingWuShi/wuZheCanXin.mp3",
                "audio/skill/shouLingWuShi/yiJiWuNian.mp3",
                "audio/skill/shouLingWuShi/shouHunYiNian.mp3",
                "audio/skill/shouLingWuShi/shouHunJingJie.mp3",
                "audio/skill/shouLingWuShi/shouFan.mp3",
                "audio/skill/shouLingWuShi/yuHunLiuJuHeShi.mp3",
                "audio/skill/shouLingWuShi/niFanJuHeZhan.mp3",
                "audio/skill/shouLingWuShi/tuoLiJuHeXingTai.mp3",
                "audio/skill/shengDianQiShi/shenXuanZhe.mp3",
                "audio/skill/shengDianQiShi/shenWei.mp3",
                "audio/skill/shengDianQiShi/shengCai.mp3",
                "audio/skill/shengDianQiShi/shengYu.mp3",
                "audio/skill/shengDianQiShi/shenZhiZi.mp3",
                "audio/skill/shengDianQiShi/shenLinShengQi.mp3",
                "audio/skill/shengDianQiShi/shengYanQiYuan.mp3",
                "audio/skill/hongYiZhuJiao/shengYueYinQi.mp3",
                "audio/skill/hongYiZhuJiao/quMoShi.mp3",
                "audio/skill/hongYiZhuJiao/daoGaoShi.mp3",
                "audio/skill/hongYiZhuJiao/quanNengNiWei.mp3",
                "audio/skill/hongYiZhuJiao/shenXuanDaoYan.mp3",
                "audio/skill/hongYiZhuJiao/shengDian.mp3",
                "audio/skill/zhuLvZhe/shenLvFengSuo.mp3",
                "audio/skill/zhuLvZhe/shengXueZhiJi.mp3",
                "audio/skill/zhuLvZhe/wangCheYiWei.mp3",
                "audio/skill/zhuLvZhe/zuiDuanHuoMian.mp3",
                "audio/skill/zhuLvZhe/shengYinSongEn.mp3",
                "audio/skill/zhuLvZhe/shengLvWeiYa.mp3",
                "audio/skill/zhuLvZhe/shenYanYongZan.mp3",
                "audio/skill/zhuLvZhe/xinYangChongZhu.mp3",
                "audio/skill/youJiShi/jingLingZengLi.mp3",
                "audio/skill/youJiShi/yuanSuSheJi.mp3",
                "audio/skill/youJiShi/yuanSuSheJi_huo.mp3",
                "audio/skill/youJiShi/yuanSuSheJi_shui.mp3",
                "audio/skill/youJiShi/yuanSuSheJi_feng.mp3",
                "audio/skill/youJiShi/yuanSuSheJi_lei.mp3",
                "audio/skill/youJiShi/yuanSuSheJi_di.mp3",
                "audio/skill/youJiShi/erChongJianYing.mp3",
                "audio/skill/youJiShi/fuMoZhiShu.mp3",
                "audio/skill/youJiShi/jingLingDeJianWu.mp3",
                "audio/skill/jieRiMoDao/moDanZhangWo.mp3",
                "audio/skill/jieRiMoDao/moDanRongHe.mp3",
                "audio/skill/jieRiMoDao/jiRi_moBaoChongJie.mp3",
                "audio/skill/jieRiMoDao/faLiHuDun.mp3",
                "audio/skill/jieRiMoDao/huiMieFengBao.mp3",
                "audio/skill/tanLanShaoNv/tanYuHeiDong.mp3",
                "audio/skill/tanLanShaoNv/lianJinMoFa.mp3",
                "audio/skill/tanLanShaoNv/lianJinShu.mp3",
                "audio/skill/tanLanShaoNv/wangNvJinKu.mp3",
                "audio/skill/tanLanShaoNv/wangNvJinKu_invest.mp3",
                "audio/skill/tanLanShaoNv/wangNvJinKu_morale.mp3",
                "audio/skill/jianXiZhiPian/yuanZiXiShou.mp3",
                "audio/skill/jianXiZhiPian/yuanZiChongSu.mp3",
                "audio/skill/jianXiZhiPian/yuanSuXueTu.mp3",
                "audio/skill/jianXiZhiPian/bingDong.mp3",
                "audio/skill/jianXiZhiPian/yunShi.mp3",
                "audio/skill/jianXiZhiPian/huoQou.mp3",
                "audio/skill/jianXiZhiPian/fengRen.mp3",
                "audio/skill/jianXiZhiPian/leiJi.mp3",
                "audio/skill/jianXiZhiPian/leiJiBianYi.mp3",
                "audio/skill/jianXiZhiPian/yueYun.mp3",
                "audio/skill/zhouFuShi/zhouFuHuoLi.mp3",
                "audio/skill/zhouFuShi/zhouFuDongTian.mp3",
                "audio/skill/zhouFuShi/zhouFu_nianZhou.mp3",
                "audio/skill/zhouFuShi/chiMeiWangLiang.mp3",
                "audio/skill/zhouFuShi/zhouLiChongSu.mp3",
                "audio/skill/daiDuoShaoNv/bieFanWo.mp3",
                "audio/skill/daiDuoShaoNv/rangWoTangPing.mp3",
                "audio/skill/daiDuoShaoNv/xiangYongMoDan.mp3",
                "audio/skill/daiDuoShaoNv/buXiangTiLian.mp3",
                "audio/skill/daiDuoShaoNv/zaiShuiYiXia.mp3",
                "audio/skill/daiDuoShaoNv/zaiShuiYiXia_overflow.mp3",
                "audio/skill/jianZhiZi/qingMu.mp3",
                "audio/skill/jianZhiZi/qingMu_gain.mp3",
                "audio/skill/jianZhiZi/fengZhiJian.mp3",
                "audio/skill/jianZhiZi/jianShouShiYan.mp3",
                "audio/skill/jianZhiZi/jianShouShiYan_check.mp3",
                "audio/skill/jianZhiZi/jianShouShiYan_awaken.mp3",
                "audio/skill/jianZhiZi/jianCanYing.mp3",
                "audio/skill/jianZhiZi/jianCanYing_followup.mp3",
                "audio/skill/shengTingJianChaShi/kuangXinTu.mp3",
                "audio/skill/shengTingJianChaShi/caiJueLunDing.mp3",
                "audio/skill/shengTingJianChaShi/enDianShenShou.mp3",
                "audio/skill/shengTingJianChaShi/jingHuaZhiShu.mp3",
                "audio/skill/shengTingJianChaShi/biHuLingYu.mp3",
                "audio/skill/shengTingJianChaShi/caiJueZhe.mp3",
                "audio/skill/shengTingJianChaShi/shenShengBianCe.mp3",
                "audio/skill/shengGong/tianZhiGong.mp3",
                "audio/skill/shengGong/shengXieJuBao.mp3",
                "audio/skill/shengGong/shengHuangJiangLin.mp3",
                "audio/skill/shengGong/shengGuangBaoLie.mp3",
                "audio/skill/shengGong/liuXingShengDan.mp3",
                "audio/skill/shengGong/shengHuangHuiGuangPao.mp3",
                "audio/skill/shengGong/ziDongTianChong.mp3",
                "audio/skill/yuanChuZhiGong/tianZhiGong.mp3",
                "audio/skill/yuanChuZhiGong/shengXieJuBao.mp3",
                "audio/skill/yuanChuZhiGong/shengHuangJiangLin.mp3",
                "audio/skill/yuanChuZhiGong/shengGuangBaoLie.mp3",
                "audio/skill/yuanChuZhiGong/liuXingShengDan.mp3",
                "audio/skill/yuanChuZhiGong/shengHuangHuiGuangPao.mp3",
                "audio/skill/yuanChuZhiGong/shengHuangYuHui.mp3",
                "audio/skill/yuanChuZhiGong/ziDongTianChong.mp3",
                "audio/skill/xingZhuiNvWu/mingDingZhiLi.mp3",
                "audio/skill/xingZhuiNvWu/xingHuan.mp3",
                "audio/skill/xingZhuiNvWu/xingKe.mp3",
                "audio/skill/xingZhuiNvWu/qunXingQiShi.mp3",
                "audio/skill/xingZhuiNvWu/huangJinLv.mp3",
                "audio/skill/xingZhuiNvWu/fanXing.mp3",
                "audio/skill/xingZhuiNvWu/yingYue.mp3",
                "audio/skill/xingZhuiNvWu/shiRi.mp3",
                "audio/skill/xingZhuiNvWu/chuangKeLvDong.mp3",
                "audio/skill/zhanDouFaShi/fuWenZhiHuan.mp3",
                "audio/skill/zhanDouFaShi/fuMoDaJi.mp3",
                "audio/skill/zhanDouFaShi/shangBian.mp3",
                "audio/skill/zhanDouFaShi/moLiShangZeng.mp3",
                "audio/skill/lieWuRen/zhuanHuan.mp3",
                "audio/skill/lieWuRen/shouMoCi.mp3",
                "audio/skill/lieWuRen/faShuBoLi.mp3",
                "audio/skill/lieWuRen/guanYinDuRen.mp3",
                "audio/skill/lieWuRen/touXi.mp3",
                "audio/skill/lieWuRen/moLiPingFull.mp3",
                "audio/skill/jinGuiZhiNv/gaoLingZhiHua.mp3",
                "audio/skill/jinGuiZhiNv/moFaRuMen.mp3",
                "audio/skill/jinGuiZhiNv/Magic.mp3",
                "audio/skill/jinGuiZhiNv/MagicFail.mp3",
                "audio/skill/jinGuiZhiNv/qiangYuYuanXing.mp3",
                "audio/skill/jinGuiZhiNv/youQingJiBan.mp3",
                "audio/skill/ranWuZhe/shenQiZhiYi.mp3",
                "audio/skill/ranWuZhe/liRuQuanYong.mp3",
                "audio/skill/ranWuZhe/kuangLiZhiXin.mp3",
                "audio/skill/ranWuZhe/kuangLiZhiTi.mp3",
                "audio/skill/ranWuZhe/shenZhiWuRan.mp3",
                "audio/skill/ranWuZhe/niuQuZhiAi.mp3",
                "audio/skill/nvPuZhang/yingZhiXue.mp3",
                "audio/skill/nvPuZhang/miShuMuYing.mp3",
                "audio/skill/nvPuZhang/shun.mp3",
                "audio/skill/nvPuZhang/yingFeng.mp3",
                "audio/skill/nvPuZhang/shiFengZhiDao.mp3",
                "audio/skill/nvPuZhang/jinShu.mp3",
                "audio/skill/nvPuZhang/zhen.mp3",
                "audio/skill/nvPuZhang/fengXueX_fengZhi.mp3",
                "audio/skill/shiShenZhe/yuRen.mp3",
                "audio/skill/shiShenZhe/qinKe.mp3",
                "audio/skill/shiShenZhe/shiMie.mp3",
                "audio/skill/shiShenZhe/shangMie.mp3",
                "audio/skill/shiShenZhe/shenShi.mp3",
                "audio/skill/shiShenZhe/tongDiao.mp3",
                "audio/skill/shiShenZhe/gongZhen.mp3",
                "audio/skill/shiShenZhe/zhuShenZhongYan.mp3",
                "audio/skill/jianZhiMoNv/jiZhiJianYi.mp3",
                "audio/skill/jianZhiMoNv/yiXiangJian.mp3",
                "audio/skill/jianZhiMoNv/yiXiangJian_gain.mp3",
                "audio/skill/jianZhiMoNv/yiXiangJian_faShu.mp3",
                "audio/skill/jianZhiMoNv/mengXiangJian_first.mp3",
                "audio/skill/jianZhiMoNv/mengXiangJian_second.mp3",
                "audio/skill/jianZhiMoNv/mengXiangJian_fourth.mp3",
                "audio/skill/jianZhiMoNv/jianYingDuanNian.mp3",
                "audio/skill/luoLiFanZhang/xuanHuaShangDeng.mp3",
                "audio/skill/luoLiFanZhang/yeLuSiKu.mp3",
                "audio/skill/luoLiFanZhang/yeLuSiKu_xueYingKuangDao.mp3",
                "audio/skill/luoLiFanZhang/yeLuSiKu_xueXingPaoXiao.mp3",
                "audio/skill/luoLiFanZhang/aiSiTianLiu.mp3",
                "audio/skill/luoLiFanZhang/mieChaKuCha.mp3",
                "audio/skill/lingXiZhiChao/lingZhiZhiYi.mp3",
                "audio/skill/lingXiZhiChao/xieLingTuiSan.mp3",
                "audio/skill/lingXiZhiChao/banXiangHunLing.mp3",
                "audio/skill/lingXiZhiChao/boYongZhiLi.mp3",
                "audio/skill/lingXiZhiChao/nuChaoHuangTao.mp3",
                "audio/skill/lingXiZhiChao/haiShenYuWu.mp3",
                "audio/skill/lingXiZhiChao/lingYong_gain.mp3",
                "audio/skill/lingXiZhiChao/lingYong_full.mp3",
                "audio/skill/daoDanLuoLi/tianShi.mp3",
                "audio/skill/daoDanLuoLi/panNiZhiQiang.mp3",
                "audio/skill/daoDanLuoLi/shenMiFuBi.mp3",
                "audio/skill/daoDanLuoLi/tricky.mp3",
                "audio/skill/daoDanLuoLi/trickOrTreat.mp3",
                "audio/skill/daoDanLuoLi/suprise.mp3",
                "audio/skill/yueTuanShouXi/baSiKeZhiFa.mp3",
                "audio/skill/yueTuanShouXi/moXingXuanLv.mp3",
                "audio/skill/yueTuanShouXi/xinYueZhang.mp3",
                "audio/skill/yueTuanShouXi/baLieTaNiXiaoDiao.mp3",
                "audio/skill/yueTuanShouXi/puLuoWangSiXieZouQu.mp3",
                "audio/skill/yueTuanShouXi/naBuLeSiDuZou.mp3",
                "audio/skill/shengZhongCaiZhe/shenZhiTianPing.mp3",
                "audio/skill/shengZhongCaiZhe/shanEBiJi.mp3",
                "audio/skill/shengZhongCaiZhe/tianPingQingDao.mp3",
                "audio/skill/shengZhongCaiZhe/shenZhiShenPan.mp3",
                "audio/skill/shengZhongCaiZhe/tianPing_fangZhi.mp3",
                "audio/skill/shengZhongCaiZhe/tianPing_zuo.mp3",
                "audio/skill/shengZhongCaiZhe/tianPing_you.mp3",
                "audio/skill/shengZhongCaiZhe/tianZui.mp3",
                "audio/skill/shengZhongCaiZhe/zuiChiBiDao.mp3",
                "audio/skill/jiDuShaoNv/cuYiXiuXin.mp3",
                "audio/skill/jiDuShaoNv/xuRongZhangWo.mp3",
                "audio/skill/jiDuShaoNv/xiangSiBing.mp3",
                "audio/skill/jiDuShaoNv/jiDuZhuiFang.mp3",
                "audio/skill/moGongEX/shenFengShi.mp3",
                "audio/skill/moGongEX/jiFengZhuiShe.mp3",
                "audio/skill/moGongEX/shanGuangXianJing.mp3",
                "audio/skill/moGongEX/jingZhunSheJi.mp3",
                "audio/skill/moGongEX/juJi.mp3",
                "audio/action/anShaZhe/gouMai.mp3",
                "audio/action/anShaZhe/heCheng.mp3",
                "audio/action/anShaZhe/tiLian.mp3",
                "audio/action/cangYanMoNv/gouMai.mp3",
                "audio/action/cangYanMoNv/heCheng.mp3",
                "audio/action/cangYanMoNv/tiLian.mp3",
                "audio/action/chuanJiaoShi/gouMai.mp3",
                "audio/action/chuanJiaoShi/heCheng.mp3",
                "audio/action/chuanJiaoShi/tiLian.mp3",
                "audio/action/daiDuoShaoNv/gouMai.mp3",
                "audio/action/daiDuoShaoNv/heCheng.mp3",
                "audio/action/daiDuoShaoNv/tiLian.mp3",
                "audio/action/daoDanLuoLi/gouMai.mp3",
                "audio/action/daoDanLuoLi/heCheng.mp3",
                "audio/action/daoDanLuoLi/tiLian.mp3",
                "audio/action/dieWuZhe/gouMai.mp3",
                "audio/action/dieWuZhe/heCheng.mp3",
                "audio/action/dieWuZhe/tiLian.mp3",
                "audio/action/fengYinShi/gouMai.mp3",
                "audio/action/fengYinShi/heCheng.mp3",
                "audio/action/fengYinShi/tiLian.mp3",
                "audio/action/fengZhiJianSheng/gouMai.mp3",
                "audio/action/fengZhiJianSheng/heCheng.mp3",
                "audio/action/fengZhiJianSheng/tiLian.mp3",
                "audio/action/geDouJia/gouMai.mp3",
                "audio/action/geDouJia/heCheng.mp3",
                "audio/action/geDouJia/tiLian.mp3",
                "audio/action/hongLianQiShi/gouMai.mp3",
                "audio/action/hongLianQiShi/heCheng.mp3",
                "audio/action/hongLianQiShi/tiLian.mp3",
                "audio/action/hongYiZhuJiao/gouMai.mp3",
                "audio/action/hongYiZhuJiao/heCheng.mp3",
                "audio/action/hongYiZhuJiao/tiLian.mp3",
                "audio/action/jianDi/gouMai.mp3",
                "audio/action/jianDi/heCheng.mp3",
                "audio/action/jianDi/tiLian.mp3",
                "audio/action/jianXiZhiPian/gouMai.mp3",
                "audio/action/jianXiZhiPian/heCheng.mp3",
                "audio/action/jianXiZhiPian/tiLian.mp3",
                "audio/action/jianZhiMoNv/gouMai.mp3",
                "audio/action/jianZhiMoNv/heCheng.mp3",
                "audio/action/jianZhiMoNv/tiLian.mp3",
                "audio/action/jianZhiZi/gouMai.mp3",
                "audio/action/jianZhiZi/heCheng.mp3",
                "audio/action/jianZhiZi/tiLian.mp3",
                "audio/action/jiDuShaoNv/gouMai.mp3",
                "audio/action/jiDuShaoNv/heCheng.mp3",
                "audio/action/jiDuShaoNv/tiLian.mp3",
                "audio/action/jieJieShi/gouMai.mp3",
                "audio/action/jieJieShi/heCheng.mp3",
                "audio/action/jieJieShi/tiLian.mp3",
                "audio/action/jieRiMoDao/gouMai.mp3",
                "audio/action/jieRiMoDao/heCheng.mp3",
                "audio/action/jieRiMoDao/tiLian.mp3",
                "audio/action/jiLuZhe/gouMai.mp3",
                "audio/action/jiLuZhe/heCheng.mp3",
                "audio/action/jiLuZhe/tiLian.mp3",
                "audio/action/jingLingSheShou/gouMai.mp3",
                "audio/action/jingLingSheShou/heCheng.mp3",
                "audio/action/jingLingSheShou/tiLian.mp3",
                "audio/action/jinGuiZhiNv/gouMai.mp3",
                "audio/action/jinGuiZhiNv/heCheng.mp3",
                "audio/action/jinGuiZhiNv/tiLian.mp3",
                "audio/action/kuangZhanShi/gouMai.mp3",
                "audio/action/kuangZhanShi/heCheng.mp3",
                "audio/action/kuangZhanShi/tiLian.mp3",
                "audio/action/lieWuRen/gouMai.mp3",
                "audio/action/lieWuRen/heCheng.mp3",
                "audio/action/lieWuRen/tiLian.mp3",
                "audio/action/lingFuShi/gouMai.mp3",
                "audio/action/lingFuShi/heCheng.mp3",
                "audio/action/lingFuShi/tiLian.mp3",
                "audio/action/lingHunShuShi/gouMai.mp3",
                "audio/action/lingHunShuShi/heCheng.mp3",
                "audio/action/lingHunShuShi/tiLian.mp3",
                "audio/action/lingXiZhiChao/gouMai.mp3",
                "audio/action/lingXiZhiChao/heCheng.mp3",
                "audio/action/lingXiZhiChao/tiLian.mp3",
                "audio/action/luoLiFanZhang/gouMai.mp3",
                "audio/action/luoLiFanZhang/heCheng.mp3",
                "audio/action/luoLiFanZhang/tiLian.mp3",
                "audio/action/maoXianJia/gouMai.mp3",
                "audio/action/maoXianJia/heCheng.mp3",
                "audio/action/maoXianJia/tiLian.mp3",
                "audio/action/moFaShaoNv/gouMai.mp3",
                "audio/action/moFaShaoNv/heCheng.mp3",
                "audio/action/moFaShaoNv/tiLian.mp3",
                "audio/action/moGong/gouMai.mp3",
                "audio/action/moGong/heCheng.mp3",
                "audio/action/moGong/tiLian.mp3",
                "audio/action/moGongEX/gouMai.mp3",
                "audio/action/moGongEX/heCheng.mp3",
                "audio/action/moGongEX/tiLian.mp3",
                "audio/action/moJianShi/gouMai.mp3",
                "audio/action/moJianShi/heCheng.mp3",
                "audio/action/moJianShi/tiLian.mp3",
                "audio/action/moQiang/gouMai.mp3",
                "audio/action/moQiang/heCheng.mp3",
                "audio/action/moQiang/tiLian.mp3",
                "audio/action/nong_baoShiShaoNv/gouMai.mp3",
                "audio/action/nong_baoShiShaoNv/heCheng.mp3",
                "audio/action/nong_baoShiShaoNv/tiLian.mp3",
                "audio/action/nvPuZhang/gouMai.mp3",
                "audio/action/nvPuZhang/heCheng.mp3",
                "audio/action/nvPuZhang/tiLian.mp3",
                "audio/action/nvWuShen/gouMai.mp3",
                "audio/action/nvWuShen/heCheng.mp3",
                "audio/action/nvWuShen/tiLian.mp3",
                "audio/action/qiDaoShi/gouMai.mp3",
                "audio/action/qiDaoShi/heCheng.mp3",
                "audio/action/qiDaoShi/tiLian.mp3",
                "audio/action/ranWuZhe/gouMai.mp3",
                "audio/action/ranWuZhe/heCheng.mp3",
                "audio/action/ranWuZhe/tiLian.mp3",
                "audio/action/sheng_zhongCaiZhe/gouMai.mp3",
                "audio/action/sheng_zhongCaiZhe/heCheng.mp3",
                "audio/action/sheng_zhongCaiZhe/tiLian.mp3",
                "audio/action/shengDianQiShi/gouMai.mp3",
                "audio/action/shengDianQiShi/heCheng.mp3",
                "audio/action/shengDianQiShi/tiLian.mp3",
                "audio/action/shengGong/gouMai.mp3",
                "audio/action/shengGong/heCheng.mp3",
                "audio/action/shengGong/tiLian.mp3",
                "audio/action/shengNv/gouMai.mp3",
                "audio/action/shengNv/heCheng.mp3",
                "audio/action/shengNv/tiLian.mp3",
                "audio/action/shengQiangQiShi/gouMai.mp3",
                "audio/action/shengQiangQiShi/heCheng.mp3",
                "audio/action/shengQiangQiShi/tiLian.mp3",
                "audio/action/shengTingJianChaShi/gouMai.mp3",
                "audio/action/shengTingJianChaShi/heCheng.mp3",
                "audio/action/shengTingJianChaShi/tiLian.mp3",
                "audio/action/shenGuan/gouMai.mp3",
                "audio/action/shenGuan/heCheng.mp3",
                "audio/action/shenGuan/tiLian.mp3",
                "audio/action/shenJianShou/gouMai.mp3",
                "audio/action/shenJianShou/heCheng.mp3",
                "audio/action/shenJianShou/tiLian.mp3",
                "audio/action/shenMiXueZhe/gouMai.mp3",
                "audio/action/shenMiXueZhe/heCheng.mp3",
                "audio/action/shenMiXueZhe/tiLian.mp3",
                "audio/action/shiShenZhe/gouMai.mp3",
                "audio/action/shiShenZhe/heCheng.mp3",
                "audio/action/shiShenZhe/tiLian.mp3",
                "audio/action/shouLingWuShi/gouMai.mp3",
                "audio/action/shouLingWuShi/heCheng.mp3",
                "audio/action/shouLingWuShi/tiLian.mp3",
                "audio/action/tanLanShaoNv/gouMai.mp3",
                "audio/action/tanLanShaoNv/heCheng.mp3",
                "audio/action/tanLanShaoNv/tiLian.mp3",
                "audio/action/tianShi/gouMai.mp3",
                "audio/action/tianShi/heCheng.mp3",
                "audio/action/tianShi/tiLian.mp3",
                "audio/action/wenYiFaShi/gouMai.mp3",
                "audio/action/wenYiFaShi/heCheng.mp3",
                "audio/action/wenYiFaShi/tiLian.mp3",
                "audio/action/xianZhe/gouMai.mp3",
                "audio/action/xianZhe/heCheng.mp3",
                "audio/action/xianZhe/tiLian.mp3",
                "audio/action/xingZhuiNvWu/gouMai.mp3",
                "audio/action/xingZhuiNvWu/heCheng.mp3",
                "audio/action/xingZhuiNvWu/tiLian.mp3",
                "audio/action/xueSeJianLing/gouMai.mp3",
                "audio/action/xueSeJianLing/heCheng.mp3",
                "audio/action/xueSeJianLing/tiLian.mp3",
                "audio/action/xueZhiWuNv/gouMai.mp3",
                "audio/action/xueZhiWuNv/heCheng.mp3",
                "audio/action/xueZhiWuNv/tiLian.mp3",
                "audio/action/yiJiaoTu/gouMai.mp3",
                "audio/action/yiJiaoTu/heCheng.mp3",
                "audio/action/yiJiaoTu/tiLian.mp3",
                "audio/action/yinYangShi/gouMai.mp3",
                "audio/action/yinYangShi/heCheng.mp3",
                "audio/action/yinYangShi/tiLian.mp3",
                "audio/action/yingLingRenXing/gouMai.mp3",
                "audio/action/yingLingRenXing/heCheng.mp3",
                "audio/action/yingLingRenXing/tiLian.mp3",
                "audio/action/yinYouShiRen/gouMai.mp3",
                "audio/action/yinYouShiRen/heCheng.mp3",
                "audio/action/yinYouShiRen/tiLian.mp3",
                "audio/action/yongZhe/gouMai.mp3",
                "audio/action/yongZhe/heCheng.mp3",
                "audio/action/yongZhe/tiLian.mp3",
                "audio/action/youJiShi/gouMai.mp3",
                "audio/action/youJiShi/heCheng.mp3",
                "audio/action/youJiShi/tiLian.mp3",
                "audio/action/yuanChuZhiGong/gouMai.mp3",
                "audio/action/yuanChuZhiGong/heCheng.mp3",
                "audio/action/yuanChuZhiGong/tiLian.mp3",
                "audio/action/yuanSuShi/gouMai.mp3",
                "audio/action/yuanSuShi/heCheng.mp3",
                "audio/action/yuanSuShi/tiLian.mp3",
                "audio/action/yueTuanShouXi/gouMai.mp3",
                "audio/action/yueTuanShouXi/heCheng.mp3",
                "audio/action/yueTuanShouXi/tiLian.mp3",
                "audio/action/yueZhiNvShen/gouMai.mp3",
                "audio/action/yueZhiNvShen/heCheng.mp3",
                "audio/action/yueZhiNvShen/tiLian.mp3",
                "audio/action/zhanDouFaShi/gouMai.mp3",
                "audio/action/zhanDouFaShi/heCheng.mp3",
                "audio/action/zhanDouFaShi/tiLian.mp3",
                "audio/action/zhongCaiZhe/gouMai.mp3",
                "audio/action/zhongCaiZhe/heCheng.mp3",
                "audio/action/zhongCaiZhe/tiLian.mp3",
                "audio/action/zhouFuShi/gouMai.mp3",
                "audio/action/zhouFuShi/heCheng.mp3",
                "audio/action/zhouFuShi/tiLian.mp3",
                "audio/action/zhuLvZhe/gouMai.mp3",
                "audio/action/zhuLvZhe/heCheng.mp3",
                "audio/action/zhuLvZhe/tiLian.mp3",
                "audio/skill/daZuiSiJiao/shenYiZhiYin.mp3",
                "audio/skill/daZuiSiJiao/daZuiLuBiaoX.mp3",
                "audio/skill/daZuiSiJiao/sheZui.mp3",
                "audio/skill/daZuiSiJiao/xinYangZhiJia.mp3",
                "audio/skill/daZuiSiJiao/fuYin.mp3",
                "audio/skill/daZuiSiJiao/shenYu.mp3",
                "audio/skill/daZuiSiJiao/shuLingQuanBing.mp3",
                "audio/skill/daZuiSiJiao/shenDeDaiXing.mp3",
                "audio/skill/daZuiSiJiao/shengCanLi.mp3",
                "audio/action/daZuiSiJiao/heCheng.mp3",
                "audio/action/daZuiSiJiao/gouMai.mp3",
                "audio/action/daZuiSiJiao/tiLian.mp3",
                "audio/skill/guShenJiSi/guShenJieLv.mp3",
                "audio/skill/guShenJiSi/niuQuLianJie.mp3",
                "audio/skill/guShenJiSi/tianQi.mp3",
                "audio/skill/guShenJiSi/moRiMengZhao.mp3",
                "audio/skill/guShenJiSi/jiLeMengJing.mp3",
                "audio/skill/guShenJiSi/hongLieLieHuo.mp3",
                "audio/skill/guShenJiSi/diDongNuTao.mp3",
                "audio/skill/guShenJiSi/mengJingPoSui.mp3",
                "audio/skill/guShenJiSi/ruMeng.mp3",
                "audio/skill/guShenJiSi/zhiPei.mp3",
                "audio/action/guShenJiSi/heCheng.mp3",
                "audio/action/guShenJiSi/tiLian.mp3",
                "audio/action/guShenJiSi/gouMai.mp3",
            ]
        }
    };
});
