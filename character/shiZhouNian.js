'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shiZhouNian',
		connect:true,
        characterSort:{
            shiZhouNian:{
                "3星":['fengZhiJianSheng','kuangZhanShi','shenJianShou','fengYinShi','anShaZhe','shengNv','tianShi','moFaShaoNv'],
                "3.5星":['moJianShi','shengQiangQiShi','yuanSuShi','maoXianJia','wenYiFaShi','zhongCaiZhe','jingLingSheShou','nvWuShen'],
                "4星":['shenGuan','yingLingRenXing','yinYangShi','moGong','xianZhe','lingFuShi','cangYanMoNv','moQiang','xueSeJianLing','qiDaoShi','hongLianQiShi'],
                "4.5星":['lingHunShuShi','yongZhe','yinYouShiRen','geDouJia','shengGong','shouLingWuShi',"jianDi"],
                "5星":["yueZhiNvShen",'xueZhiWuNv','dieWuZhe'],
            }
        },
		character:{
			fengZhiJianSheng:['male','ji',3,['fengNuZhuiJi','shengJian','lieFengJi','jiFengJi','jianYing'],],
            kuangZhanShi:['male','xue',3,['kuangHua','xueYingKuangDao','xueXingPaoXiao','siLie'],],
            shenJianShou:['female','ji',3,['shanDianJian','guanChuanSheJi','shanGuangXianJing','jingZhunSheJi','juJi'],],
            fengYinShi:['female','huan',3,['faShuJiDang','diZhiFengYin','shuiZhiFengYin','huoZhiFengYin','fengZhiFengYin','leiZhiFengYin','wuXiShuFu','fengYinPoSui'],],
            anShaZhe:['male','ji',3,['fanShi','shuiYing','qianXing'],],
            shengNv:['female','sheng',3,['bingShuangDaoYan','zhiLiaoShu','zhiYuZhiGuang','lianMin','shengLiao'],],
            tianShi:['female','sheng',3,['fengZhiJieJing','tianShiZhuFu','tianShiJiBan','tianShiZhiQiang','tianShiZhiGe','shenZhiBiHu'],],
            moFaShaoNv:['female','yong',3,['moBaoChongJi','moDanZhangWo','moDanRongHe','huiMieFengBao'],],
            moJianShi:['female','huan','3/4',['xiuLuoLianZhan','anYingNingJu','anYingZhiLi','anYingKangJu','anYingLiuXing','huangQaunZhenChan'],],
            shengQiangQiShi:['female','sheng','3/4',['shenShengXinYang','huiYao','chengJie','shengJi','tianQiang','diQiang','shengGuangQiYu'],],
            yuanSuShi:['male','yong','3/4',['yuanSuXiShou','yuanSuDianRan','yunShi','bingDong','huoQou','fengRen','leiJi','yueGuang','yuanSu'],],
            maoXianJia:['female','huan','3/4',['qiZha','qiangYun','diXiaFaZe','maoXianJiaTianTang','touTianHuanRi'],],
            wenYiFaShi:['male','huan','3/4',['buXiu','shengDu','wenYi','siWangZhiChu','juDuXinXing'],],
            zhongCaiZhe:['female','xue','3/4',['zhongCaiFaZe','yiShiZhongDuan','moRiShenPan','shenPanLangChao','zhongCaiYiShi','panJueTianPing','shenPan'],],
            shenGuan:['female','sheng',4,['shenShengQiShi','shenShengQiFu','shuiZhiShenLi','shengShiShouHu','shenShengQiYue','shenShengLingYu'],],
            qiDaoShi:['female','yong',4,['guangHuiXinYang','heiAnZuZhou','weiLiCiFu','xunJieCiFu','qiDao','faLiChaoXi','qiDaoFuWen'],],
            xianZhe:['male','yong',4,['zhiHuiFaDian','faShuFanTan','moDaoFaDian','shengJieFaDian'],],
            lingFuShi:['female','yong',4,['lingFu_leiMing','lingFu_fengXing','nianZhou','baiGuiYeXing','lingLiBengJie','yaoLi'],],
            jianDi:['female','ji','4/5',['jianHunShouHu','yangGong','jianQiZhan','tianShiZhiHun','eMoZhiHun','buQuYiZhi','jianHun','jianQi'],],
            geDouJia:['female','ji','4/5',['nianQiLiChang','xuLiYiji','nianDan','baiShiHuanLongQuan','qiJueBengJi','douShenTianQu','douQi'],],
            yongZhe:['male','xue','4/5',['yongZheZhiXin','nuHou','jinPiLiJin','mingJingZhiShui','tiaoXin','jinDuanZhiLi','siDou','','nuQi','zhiXing'],],
            lingHunShuShi:['female','huan','4/5',["lingHunTunShi","lingHunZhaoHuan",'lingHunZhuanHuan',"lingHunJingXiang","lingHunZhenBao","lingHunFuYu","lingHunLianJie","lingHunZengFu","huangSeLingHun","lanSeLingHun"],],
            xueZhiWuNv:['female','xue',5,['xueZhiAiShang','liuXue','niLiu','xueZhiBeiMing','tongShengGongSi','xueZhiZuZhou'],],
            dieWuZhe:['female','yong',5,['shengMingZhiHuo','wuDong','duFen','chaoSheng','jingHuaShuiYue','diaoLing','yongHua','daoNiZhiDie','jian','DWZyong'],],
            nvWuShen:['female','sheng','3/4',['shenShengZhuiJi','zhiXuZhiYin','hePingXingZhe','junShenWeiGuan','yingLingZhaoHuan'],],
            moGong:['female','huan',4,['moGuanChongJi','leiGuangSanShe','duoChongSheJi','chongNeng','moYan','chongNengPai'],],
            hongLianQiShi:['female','xue',4,['xingHongShengYue','xingHongXinYang','xueXingDaoYan','shaLuShengYan','reXueFeiTeng','jieJiaoJieZao','xingHongShiZi','xueYin'],],
            yingLingRenXing:['female','yong',4,['zhanWenZhangWo','nuHuoYaZhi','zhanWenSuiJi','moWenRongHe','fuWenGaiZao','shuangChongHuiXiang','zhanWen','moWen'],],
            moQiang:['female','huan',4,['anZhiJieFang','huanYingXingChen','heiAnShuFu','anZhiZhangBi','chongYing','qiHeiZhiQiang'],],
            cangYanMoNv:['female','xue',4,['cangYanFaDian','tianHuoDianKong','moNvZhiNu','tiShenWanOu','yongShengYinShiJi','tongKuLianJie','moNengFanZhuan','chongSheng'],],
            yinYouShiRen:['male','huan','4/5',['chenLunXieZouQu','buXieHeXian','jinJiShiPian','jiAngKuangXiangQu','shengLiJiaoXiangShi','xiWangFuGeQu','lingGan'],],
            jingLingSheShou:['female','ji','3/4',['yuanSuSheJi','dongWuHuoBan','jingLingMiYi','chongWuQiangHua','zhuFu'],],
            yinYangShi:['female','huan',4,['shiShenJiangLin','yinYangZhanHuan','shiShenZhuanHuan','heiAnJiLi','shiShenZhouShu','shengMingJieJie','guiHuo'],],
            xueSeJianLing:['female','xue',4,['xueSeJingJi','chiSeYiShan','xueRanQiangWei','xueQiPingZhang','xueQiangWeiTingYuan','sanHuaLunWu','xianXue'],],
            yueZhiNvShen:['female','sheng',5,['xinYueBiHu','anYueZuZhou','meiDuShaZhiYan','yueZhiLunHui','yueDu','anYueZhan','cangBaiZhiYue','xinYue','shiHua','anYue'],],
            shouLingWuShi:['female','ji','4/5',['wuZheCanXin','yiJiWuNian','shouHunYiNian','shouHunJingJie','shouFan','yuHunLiuJuHeXingTai','niFanJuHeZhan','yuHunLiuJuHeShi','shouHun','canXin'],],
            shengGong:['female','sheng','4/5',['tianZhiGong','shengXieJuBao','shengHuangJiangLin','shengGuangBaoLie','liuXingShengDan','shengHuangHuiGuangPao','ziDongTianChong','xinYang','shengHuangHuiGuangPaoX'],],
		},

        characterIntro: {
			fengZhiJianSheng:"\u5c0f\u65f6\u5019\u88ab\u5251\u4e4b\u9b54\u5973\u6536\u517b\uff0c\u4f5c\u4e3a\u4ea6\u5e08\u4ea6\u957f\u7684\u5b58\u5728\u800c\u9010\u6e10\u5bf9\u5251\u4e4b\u9b54\u5973\u4ea7\u751f\u7231\u6155\u4e4b\u60c5\uff1b\u6700\u540e\u5374\u53ea\u542c\u95fb\u5230\u4e86\u5251\u4e4b\u9b54\u5973\u81ea\u6740\u7684\u6d88\u606f\u3002\u65e0\u6cd5\u63a5\u53d7\u8fd9\u4e2a\u6d88\u606f\u7684\u4ed6\u7ee7\u627f\u4e86\u5251\u4e4b\u9b54\u5973\u7684\u5723\u5251\uff0c\u968f\u540e\u524d\u5f80\u5251\u4e4b\u9b54\u5973\u751f\u524d\u6700\u540e\u4e00\u4e2a\u5730\u65b9\u63a2\u5bfb\u5251\u4e4b\u9b54\u5973\u81ea\u6740\u7684\u771f\u76f8\uff0c\u7136\u800c\u9664\u4e86\u6253\u542c\u5230\u6b64\u5730\u6709\u8fc7\u4e00\u6b21\u5927\u7206\u70b8\u522b\u65e0\u5176\u4ed6\u6d88\u606f\u3002\u5c31\u5728\u8fd9\u65f6\uff0c\u4ed6\u770b\u5230\u4e86\u4e00\u4e2a\u8eab\u7a7f\u94e0\u7532\uff0c\u624b\u62ff\u4e00\u628a\u5251\uff0c\u5934\u4e0a\u6234\u7740\u5c0f\u84dd\u82b1\u7684\u5973\u5b50\uff0c\u4f46\u662f\u8be5\u5973\u5b50\u4f3c\u4e4e\u5931\u53bb\u4e86\u8bb0\u5fc6\uff0c\u4e00\u8138\u7684\u8ff7\u832b~",
            kuangZhanShi:"\u72c2\u6218\u58eb\u66fe\u7ecf\u4ece\u5730\u4e0b\u9ed1\u5e02\u4e2d\u4f5c\u4e3a\u64c2\u4e3b\u800c\u83b7\u5f97\u81ea\u7531\u8d70\u51fa\uff0c\u88ab\u7ea2\u8863\u4e3b\u6559\u96c7\u4f63\u6210\u4e3a\u96c7\u4f63\u5175\uff0c\u5728\u96c7\u4f63\u7684\u8fc7\u7a0b\u4e2d\uff0c\u7ecf\u5386\u4e86\u975e\u5e38\u591a\u7684\u6218\u6597\u3002\u7136\u800c\u5728\u4e00\u6b21\u5931\u8d25\u7684\u6218\u6597\u540e\uff0c\u88ab\u65e0\u60c5\u7684\u629b\u5f03\uff0c\u8d70\u6295\u65e0\u8def\u7684\u4ed6\uff0c\u8003\u8651\u662f\u5426\u53c8\u8981\u91cd\u65b0\u56de\u5230\u5730\u4e0b\u9ed1\u5e02\uff0c\u8fc7\u7740\u6697\u65e0\u5929\u65e5\u9760\u7740\u51fb\u5012\u5bf9\u65b9\u800c\u6d3b\u4e0b\u53bb\u7684\u65e5\u5b50\uff0c\u6700\u540e\u4f9d\u7136\u4f5c\u4e3a\u4e86\u6597\u517d\u573a\u4e2d\u7684\u64c2\u4e3b\uff0c\u662f\u4f20\u8bf4\u4e2d\u4e00\u4ee3\u7684\u4e0d\u8d25\u795e\u8bdd",
            shenJianShou:"\u4e0e\u6cf0\u7f57\u838e\u662f\u8fdc\u4eb2\uff0c\u8be6\u89c1\u201c\u5f13\u795e\u4e00\u65cf\u7ec4\u7ec7\u67b6\u6784\u56fe\u201d\uff0c\u5728\u90e8\u843d\u88ab\u795e\u5723\u6559\u5ef7\u4e1c\u5f81\u65f6\u5e26\u9886\u65cf\u4eba\u524d\u5f80\u6ce2\u963f\u72c4\u897f\u4e9a\u5904\u907f\u96be",
            fengYinShi:"\u80f8\u53e3\u62e5\u6709\u4e00\u9762\u955c\u5b50\u4ee5\u53ca6\u6839\u89e6\u624b\u72b6\u7684\u9b54\u6cd5\u589e\u5e45\u88c5\u7f6e\uff0c\u80fd\u591f\u5e2e\u52a9\u5979\u66f4\u5feb\u7684\u65bd\u5c55\u5c01\u5370\u6cd5\u672f\uff1b\u80fd\u591f\u5c06\u5c01\u5370\u6cd5\u672f\u9644\u52a0\u5728\u7269\u4f53\u4e0a\uff0c\u56e0\u6b64\u5e2e\u52a9\u8fc7\u4e00\u4f4d\u4eba\u538b\u5236\u9b54\u529b\u66b4\u8d70\uff0c\u73b0\u5728\u8ddf\u7740\u8389\u8389\u5b89\u5a1c\u5728\u4e00\u8d77\u5192\u9669\u5c01\u5370\u5e08",
            anShaZhe:"\u4e3a\u4e86\u8ffd\u6740\u7ec4\u7ec7\u4e2d\u7684\u53db\u5fcd\u800c\u6765",
            shengNv:"\u4f5c\u4e3a\u727a\u7272\u54c1\u88ab\u5f3a\u5236\u8d4b\u4e88\u4eba\u5de5\u661f\u75d5\u4f5c\u4e3a\u795e\u4e4b\u5b50\uff1b\u88ab\u8d4b\u4e88\u7684\u7279\u6b8a\u80fd\u529b\u662f\u5feb\u901f\u6cbb\u7597\u3002\u96b6\u5c5e\u4e8e\u666e\u6d4e\u4f1a\u3002\u201c\u7ea2\u83b2\u4e4b\u52ab\u201d\u540e\uff0c\u795e\u4e4b\u5b50\u4f4d\u7f6e\u7a7a\u7f3a\uff0c\u795e\u5723\u6559\u5ef7\u4e0b\u4e00\u4e2a\u9644\u5c5e\u56fd\u7684\u56fd\u4e3b\u4e3a\u4e86\u81ea\u8eab\u56fd\u5bb6\u5229\u76ca\uff0c\u8ddf\u795e\u5723\u6559\u5ef7\u5185\u90e8\u67d0\u4e9b\u4eba\u4e00\u8d77\u5bc6\u8c0b\uff0c\u7136\u540e\u5728\u81ea\u5df1\u7684\u5973\u513f\u8eab\u4e0a\u5370\u4e0a\u4eba\u9020\u201c\u661f\u75d5\u201d\uff0c\u5ba3\u79f0\u5176\u5973\u513f\u4e3a\u65b0\u7684\u795e\u4e4b\u5b50\u3002\u827e\u4e3d\u5361\u7ecf\u5386\u4e86\u201c\u7ed1\u67b6\u6848\u201d\u88ab\u89e3\u6551\u540e\uff0c\u53d8\u5f97\u66f4\u52a0\u5723\u6bcd\u4e86\uff0c\u800c\u4e14\u6b64\u65f6\u661f\u75d5\u7684\u5370\u8bb0\u4e5f\u51fa\u73b0\u4e86",
            tianShi:"\u65e7\u65e5\u4e4b\u6c11\u6587\u660e\u7684\u4ea7\u7269\u3002\u65e7\u65e5\u4e4b\u6c11\u6587\u660e\u6bc1\u706d\u540e\uff0c\u627e\u5230\u4e86\u7406\u60f3\u4e61\u963f\u74e6\u9686\uff0c\u5c06\u65e7\u65e5\u4e4b\u6c11\u57fa\u56e0\u4e0e\u7cbe\u7075\u65cf\u6216\u5996\u7cbe\u65cf\u7ed3\u5408\u521b\u9020\u51fa\u65b0\u79cd\u65cf\u2014\u2014\u517d\u7075\u3002\u540e\u4e0e\u7cbe\u7075\u65cf\u3001\u5996\u7cbe\u65cf\u5927\u6218\u3002\u8fd9\u4e2a\u6ca1\u843d\u7684\u9ad8\u7b49\u79cd\u65cf\u4e3a\u4e86\u751f\u5b58\u4e0e\u795e\u5723\u6559\u5ef7\u5185\u90e8\u9ad8\u5c42\u8fdb\u884c\u79c1\u4e0b\u4ea4\u6613\uff0c\u7fbd\u65cf\u7531\u5f02\u6559\u5f92\u6210\u4e3a\u4e86\u795e\u5723\u6559\u5ef7\u6559\u4e49\u4e2d\u7684\u795e\u4e4b\u4f7f\u8005\u2014\u2014\u5929\u4f7f\u3002\u6559\u5ef7\u5219\u83b7\u5f97\u4e86\u7fbd\u65cf\u76f8\u5173\u7684\u4e00\u4e9b\u79d1\u6280\u4e0e\u5973\u6b66\u795e\u7c73\u6d85\u74e6\u7684\u4f20\u8bf4\u3002\u7531\u6b64\u542f\u52a8\u4e86\u201c\u5973\u6b66\u795e\u8ba1\u5212\u201d\u5929\u4f7f\u5c06\u5973\u6b66\u795e\u7684\u4f20\u8bf4\u4ea4\u4ed8\u4e0e\u795e\u5723\u6559\u5ef7\u7684\u53e6\u4e00\u4e2a\u539f\u56e0\u6b63\u662f\u56e0\u4e3a\u201c\u590d\u5174\u7fbd\u65cf\u6587\u660e\u201d\u8fd9\u4e2a\u51fa\u53d1\u70b9\u3002\u4e8e\u662f\u201c\u5973\u6b66\u795e\u8ba1\u5212\u201d\u56e0\u5e94\u800c\u751f\u3002\u6559\u5ef7\u5e0c\u671b\u5f97\u5230\u4f20\u8bf4\u4e2d\u7684\u795e\u529b\uff0c\u5929\u4f7f\u4eec\u4e5f\u5e0c\u671b\u901a\u8fc7\u201c\u5973\u6b66\u795e\u8ba1\u5212\u201d\u83b7\u5f97\u6587\u660e\u590d\u5174\u3002",
            moFaShaoNv:"\u539f\u672c\u662f\u5996\u7cbe\u56fd\u7684\u5c0f\u516c\u4e3b\uff0c\u5996\u7cbe\u4e3a\u4e86\u89e3\u51b3\u8352\u6f20\u5316\u7684\u73af\u5883\uff0c\u4f01\u56fe\u5229\u7528\u7fbd\u65cf\u7559\u4e0b\u7684\u79d1\u6280\u7ed3\u5408\u7cbe\u7075\u65cf\u7684\u79d8\u672f\u5408\u6210\u661f\u676f\uff0c\u4f46\u662f\u6700\u7ec8\u5931\u8d25\u5e76\u5bfc\u81f4\u5996\u7cbe\u56fd\u706d\u56fd\u3002\u4ec5\u59ae\u5a05\u548c\u90e8\u5206\u5996\u7cbe\u56fd\u7684\u5996\u7cbe\u5e26\u7740\u8bbe\u8ba1\u56fe\u9003\u79bb\u539f\u706d\u56fd\u7684\u533a\u57df\uff0c\u5979\u4eec\u7a7f\u8fc7\u4e86\u8352\u6f20\u5357\u4e0b\u6765\u5230\u795e\u5723\u6559\u5ef7\u7b49\u56fd\u5bb6\uff0c\u5bfc\u81f4\u8fd9\u4e9b\u56fd\u5bb6\u7684\u661f\u77f3\u5408\u6210\u6280\u672f\u5f97\u5230\u4e86\u53d1\u5c55\u4ee5\u53ca\u666e\u53ca\u3002\u662f\u5b66\u9662\u90fd\u5e02\u7684\u521b\u59cb\u4eba\u4e4b\u4e00\uff0c\u4f5c\u4e3a\u7cbe\u7075\u65cf\u51e0\u4e4e\u62e5\u6709\u8005\u6f2b\u957f\u7684\u751f\u547d\uff0c\u4f7f\u5f97\u770b\u8d77\u6765\u5979\u53ea\u662f\u4e2a\u5c0f\u5b69\u5b50\uff0c\u4f46\u5b9e\u9645\u5979\u7684\u5e74\u9f84\u5df2\u7ecf\u3002\u3002\u3002\u3002\uff08\u88ab\u9b54\u5f39\u6253\u98de~\uff09\u5996\u7cbe\u638c\u63e1\u7740\u4e00\u4e9b\u5947\u5947\u602a\u602a\u7684\u6cd5\u672f\uff0c\u5176\u4e2d\u59ae\u5a05\u5728\u65e0\u804a\u7684\u65f6\u5019\u5c31\u5bf9\u81ea\u5df1\u65bd\u5c55\u4e86\u4e00\u4e2a\u5c0f\u5c0f\u5b9e\u9a8c~ \u800c\u5979\u7684\u597d\u53cb\uff0c\u53e6\u4e00\u4e2a\u5927\u9646\u9003\u4ea1\u5230\u53e6\u4e00\u4e2a\u5927\u9646\uff0c\u5728\u90a3\u8fb9\u53d1\u5c55\u8d77\u6765\uff0c\u901a\u8fc7\u79d1\u6280\u80fd\u529b\u5236\u4f5c\u4e86\u9b54\u5bfc\u5668-\u4fe1\u6807\uff0c\u6765\u5230\u4e86\u59ae\u5a05\u73b0\u5728\u6240\u5728\u7684\u5927\u9646\uff0c\u5979\u4eec\u4e4b\u95f4\u4f1a\u53d1\u751f\u600e\u4e48\u6837\u7684\u6545\u4e8b\u5462\uff1f",
            moJianShi:"\u59d0\u59d0\u6210\u4e3a\u4eba\u5de5\u661f\u676f\u8005\uff0c\u4f46\u9b54\u529b\u4e0d\u65ad\u589e\u52a0\uff0c\u6700\u540e\u6ea2\u51fa\u7206\u70b8\u6b7b\u4ea1\uff1b\u6545\u63a5\u4efb\u59d0\u59d0\u6210\u4e3a\u4eba\u5de5\u661f\u676f\u8005\uff0c\u7ee7\u627f\u9b54\u5251\u58eb\u3002\u8eab\u4e0a\u7a7f\u7684\u662f\u7531\u81ea\u5df1\u6253\u9020\u80fd\u591f\u538b\u5236\u9b54\u529b\u7684\u9b54\u88c5\u94e0\u7532\u3002\u5931\u53bb\u8fc7\u4e00\u6bb5\u8bb0\u5fc6\uff0c\u4e3a\u6b64\u8ff7\u832b\u4e2d~\u3002\u540e\u6765\u9047\u89c1\u4e86\u4e24\u4f4d\u547d\u8fd0\u4e4b\u4eba~",
            shengQiangQiShi:"\u65af\u5361\u96f7\u7279\u540e\u8f88\uff0c\u76f8\u7231\u76f8\u6740\u8ffd\u6740\u65af\u5361\u96f7\u7279\uff0c\u5929\u7136\u9ed1\u3002\u539f\u672c\u662f\u56e0\u4e3a\u4ef0\u6155\u4f5c\u4e3a\u795e\u4e4b\u5b50\u7684\u65af\u5361\u96f7\u7279\u800c\u52a0\u5165\u6559\u5ef7\u7684\u60e9\u6212\u90e8\u961f\u3002\u4f46\u5723\u67aa\u8fd8\u5728\u60e9\u6212\u90e8\u961f\u8bad\u7ec3\u8425\u4e2d\u7684\u65f6\u5019\uff0c\u5374\u53d1\u751f\u4e86\u201c\u7ea2\u83b2\u4e4b\u52ab\u201d\u8fd9\u6837\u7684\u4e8b\u4ef6\u3002\u5bf9\u6b64\u65af\u5e87\u5c14\u5b8c\u5168\u4e0d\u6e05\u695a\u4ef0\u6155\u4e4b\u4eba\u4e3a\u4ec0\u4e48\u4f1a\u53d8\u6210\u4e00\u4e2a\u5815\u843d\u7684\u6559\u5ef7\u80cc\u53db\u8005\uff0c\u56e0\u6b64\u5979\u5e0c\u671b\u901a\u8fc7\u4eb2\u624b\u8ffd\u6355\u65af\u5361\u96f7\u7279\uff0c\u95ee\u6e05\u4e8b\u4ef6\u7f18\u7531\u3002\u4e8e\u662f\u5979\u52aa\u529b\u5730\u6210\u4e3a\u4e86\u65b0\u7684\u5723\u67aa\u9a91\u58eb\u56e2\u7684\u961f\u957f\uff0c\u5e76\u4e14\u4e00\u76f4\u5730\u8ffd\u5bfb\u7740\u90a3\u4f4d\u5979\u7684\u6614\u65e5\u7684\u4ef0\u6155\u4e4b\u4eba\u3002",
            yuanSuShi:`\u6536\u517b\u4e86\u6218\u6597\u6cd5\u5e08\uff08\u7269\u8bed\u7684\u6218\u6597\u6cd5\u5e08\uff09\uff0c\u4e0e\u5b89\u5a1c\u7684\u7236\u4eb2\u662f\u65e7\u53cb\uff0c\u6ce2\u963f\u72c4\u897f\u4e9a\u7684\u6069\u4eba\u3002\u5728\u4e0a\u53e4\u4e4b\u6218\u540e\uff0c\u5927\u9646\u53d8\u5f97\u56db\u5206\u4e94\u88c2\uff0c\u7cbe\u7075\u65cf\u4e5f\u4e0d\u518d\u957f\u751f\u4e14\u4e0d\u518d\u80fd\u968f\u610f\u7684\u4f7f\u7528\u9b54\u6cd5\uff0c\u4e5f\u5bfc\u81f4\u4e86\u65cf\u7fa4\u56db\u5206\u4e94\u88c2\uff0c\u7cbe\u7075\u4eba\u53e3\u6570\u91cf\u9510\u51cf\uff0c\u540c\u65f6\u8fd8\u6709\u88ab\u5974\u5f79\u6216\u88ab\u6293\u53bb\u7528\u4f5c\u5339\u914d\u51fa\u517d\u7075\u6216\u65b0\u4eba\u7c7b\u7684\u5b9e\u9a8c\u98ce\u9669\u3002
            \u4e8e\u662f\u7d22\u5c14\u65af\u9ed8\u9ed8\u5730\u6210\u7acb\u4e86\u4e00\u4e2a\u7ec4\u7ec7\uff0c\u76ee\u7684\u5c31\u662f\u4e3a\u4e86\u62ef\u6551\u90a3\u4e9b\u88ab\u5974\u5f79\u7684\u7cbe\u7075\u65cf\u4eba\u3002\u968f\u7740\u7ec4\u7ec7\u8d8a\u6765\u8d8a\u5e9e\u5927\uff0c\u5176\u4e2d\u4ed6\u7684\u670b\u53cb\u4e0e\u4ed6\u7684\u60f3\u6cd5\u4ea7\u751f\u4e86\u5206\u6b67\uff1a\u7d22\u5c14\u65af\u8ba4\u4e3a\u5e94\u8be5\u6448\u5f03\u79cd\u65cf\u4e4b\u95f4\u7684\u9694\u9602\uff0c\u5e94\u8be5\u8981\u8054\u5408\u4e00\u5207\u80fd\u8054\u5408\u7684\u529b\u91cf\uff0c\u5305\u62ec\u517d\u7075\u8fd8\u6709\u5f00\u660e\u7684\u65b0\u4eba\u7c7b\uff0c\u5efa\u7acb\u4e00\u4e2a\u79cd\u65cf\u5e73\u7b49\u7684\u4e16\u754c\uff1b\u800c\u4ed6\u7684\u670b\u53cb\u5219\u8ba4\u4e3a\u5e94\u8be5\u91cd\u65b0\u56de\u5230\u65e7\u65e5\u4e4b\u6c11\u672a\u6765\u5230\u963f\u74e6\u9686\u65f6\u90a3\u6837\u53ea\u6709\u7cbe\u7075\u7684\u4e16\u754c\uff0c\u5e94\u8be5\u56de\u5f52\u5230\u4e0a\u53e4\u65f6\u4ee3\uff0c\u7cbe\u7075\u8fd8\u80fd\u957f\u751f\u4e0d\u8001\uff0c\u8ddf\u81ea\u7136\u878d\u6d3d\u3002
            \u6709\u4e86\u5206\u6b67\u540e\uff0c\u6469\u64e6\u4e0e\u77db\u76fe\u5c31\u5f00\u59cb\u589e\u52a0\u4e86\uff0c\u4f46\u7d22\u5c14\u65af\u89c9\u5f97\u4e0d\u8bba\u4ec0\u4e48\u76ee\u6807\uff0c\u76ee\u524d\u5e94\u8be5\u4f18\u5148\u4fdd\u8bc1\u56e2\u7ed3\uff0c\u6551\u52a9\u88ab\u5974\u5f79\u7684\u7cbe\u7075\u662f\u4e00\u81f4\u7684\u3002\u4e8e\u662f\u5c31\u5e26\u9886\u4e00\u90e8\u5206\u7cbe\u7075\u65cf\uff0c\u53d1\u52a8\u4e86\u4e00\u6b21\u9769\u547d\uff0c\u6700\u540e\u60e8\u88ab\u9547\u538b
            \u9769\u547d\u7684\u5931\u8d25\u9020\u6210\u4e86\u539f\u672c\u53d1\u5c55\u8d77\u6765\u7684\u7ec4\u7ec7\u9677\u5165\u4e86\u5d29\u574f\u7684\u5730\u6b65\uff0c\u5185\u90e8\u5f00\u59cb\u51fa\u73b0\u6d3e\u7cfb\u6597\u4e89\uff0c\u5206\u88c2\u5df2\u7ecf\u65e0\u6cd5\u907f\u514d\uff0c\u8fd9\u4e2a\u65f6\u5019\u4ed6\u7684\u670b\u53cb\u4e5f\u56e0\u4e3a\u8fd9\u6b21\u7684\u9769\u547d\u800c\u5931\u660e\u4e86\u3002\u6574\u4e2a\u4eba\u9677\u5165\u4e86EMO\u72b6\u6001
            
            \u81ea\u4ece\u7d22\u5c14\u65af\u4e0e\u5176\u631a\u53cb\u76f8\u8bc6\u540e\uff0c\u7d22\u5c14\u65af\u5e0c\u671b\u805a\u96c6\u4e00\u7fa4\u5fd7\u5411\u76f8\u540c\u7684\u540c\u80de\u4e00\u8d77\u7ec4\u5efa\u7cbe\u7075\u89e3\u653e\u7ec4\u7ec7\uff0c\u4e8e\u662f\u631a\u53cb\u63a8\u8350\u4e86\u81ea\u5df1\u7684\u9752\u6885\u2014\u2014\u6885\u4e3d\u73ca\u5353\u3002
            \u6700\u521d\u65f6\u6885\u4e3d\u73ca\u5353\u8ddf\u7d22\u5c14\u65af\u5e76\u4e0d\u5f85\u89c1\uff0c\u7ecf\u5e38\u610f\u89c1\u4e0d\u5408\uff0c\u6885\u4e3d\u73ca\u5353\u5bf9\u7d22\u5c14\u65af\u7684\u521d\u5370\u8c61\u5e76\u6ca1\u6709\u592a\u5927\u7684\u597d\u611f\u3002
            \u7ec4\u7ec7\u521d\u671f\u56e0\u4e3a\u6ca1\u6709\u4ec0\u4e48\u5b9e\u9645\u6210\u679c\uff0c\u6240\u4ee5\u52a0\u5165\u7684\u4eba\u4e5f\u5f88\u5c11\uff0c\u4e0d\u8fc7\u5728\u7d22\u5c14\u65af\u7684\u52aa\u529b\u4e0b\uff0c\u9010\u6e10\u5730\u6885\u4e3d\u73ca\u5353\u5bf9\u7d22\u5c14\u65af\u7684\u5370\u8c61\u6539\u53d8\uff0c\u67d0\u6b21\u62ef\u6551\u7cbe\u7075\u884c\u52a8\u4e2d\u7d22\u5c14\u65af\u66f4\u662f\u8868\u73b0\u6d3b\u8dc3\uff0c\u5e76\u4e8e\u6885\u4e3d\u73ca\u5353\u9677\u5165\u9669\u5883\u65f6\u62ef\u6551\u4e86\u6885\u4e3d\u73ca\u5353\uff0c\u540c\u65f6\u9010\u6e10\u7684\u63a5\u89e6\u4ee5\u53ca\u89c6\u91ce\u7684\u5f00\u62d3\uff0c\u8ba9\u6885\u4e3d\u73ca\u5353\u9010\u6e10\u7231\u4e0a\u7d22\u5c14\u65af\u3002
            \u67d0\u65e5\u631a\u53cb\u6536\u5230\u4e86\u4e00\u4e2a\u8ddf\u4e0a\u53e4\u7cbe\u7075\u65cf\u76f8\u5173\u7684\u6d88\u606f\u2014\u2014\u7cbe\u7075\u516c\u4e3b\u88ab\u56f4\u56f0\u5728\u5317\u65b9\u7684\u67d0\u4e2a\u9886\u5730\u91cc\uff0c\u4e8e\u662f\u5e0c\u671b\u7ec4\u7ec7\u51fa\u53bb\u8425\u6551\u3002
            \u631a\u53cb\u5728\u8fd9\u6b21\u884c\u52a8\u91cc\u6551\u4e86\u7cbe\u7075\u516c\u4e3b\uff0c\u4f7f\u5f97\u7cbe\u7075\u516c\u4e3b\u8ff7\u4e0a\u4e86\u631a\u53cb\u3002\u7cbe\u7075\u516c\u4e3b\u66fe\u7ecf\u4e0e\u7d22\u5c14\u65af\u6709\u4e00\u9762\u4e4b\u7f18\uff0c\u800c\u5979\u5219\u662f\u7d22\u5c14\u65af\u5e74\u5c11\u65f6\u7684\u5fc3\u4e2d\u5973\u795e\uff0c\u5c31\u6b64\u7cbe\u7075\u516c\u4e3b\u591a\u6b21\u59d4\u6258\u7d22\u5c14\u65af\u642d\u7ebf\u53bb\u627e\u631a\u53cb\u3002`,
            maoXianJia:"\u56db\u5904\u6e38\u5386\uff0c\u5bfb\u627e\u7740\u8fdc\u53e4\u7684\u9057\u8ff9\u3002\u5728\u9047\u5230\u7075\u9b42\u672f\u58eb\u4e4b\u524d\uff0c\u662f\u5e1d\u56fd\u5317\u65b9\u90e8\u843d\u4e00\u4e2a\u504f\u4e1c\u53d1\u8fbe\u5730\u533a\u57ce\u5e02\u9886\u5bfc\u8005\u7684\u7ee7\u627f\u4eba\uff0c\u8be5\u57ce\u5e02\u56e0\u4e3a\u4ee5\u5b9e\u529b\u4e3a\u5c0a\u88ab\u79f0\u4e3a\u201c\u7f6a\u6076\u90fd\u5e02\u201d\uff0c\u91cc\u9762\u5145\u65a5\u7740\u5404\u79cd\u201c\u72af\u7f6a\u5408\u7406\u5316\u201d\u7b49\u3002\u201c\u7f6a\u6076\u90fd\u5e02\u201d\u5730\u7406\u4e0a\u79bb\u827e\u4e3d\u5361\u66fe\u7ecf\u7684\u56fd\u5bb6\u6709\u7740\u4e00\u9053\u5c71\u8109\u5206\u5272\uff0c\u56e0\u6b64\u201c\u7f6a\u6076\u90fd\u5e02\u201d\u7684\u201c\u7f6a\u6076\u201d\u6ca1\u6709\u5f25\u6563\u5f00\u6765\u3002\u7531\u4e8e\u5317\u65b9\u90e8\u843d\u9996\u9886\u53bb\u4e16\u5bfc\u81f4\u5176\u4e2d\u5185\u4e71\uff0c\u7f6a\u6076\u90fd\u5e02\u4e5f\u7f3a\u4e4f\u7ba1\u7406\u3002\u5192\u9669\u5bb6\u4e5f\u4e0d\u5f97\u4e0d\u79bb\u5f00\u8fd9\u5ea7\u90fd\u5e02\uff0c\u671f\u95f4\u7ecf\u5386\u4e86\u5f88\u591a\u4e8b\u60c5\uff0c\u4ee4\u5979\u83b7\u5f97\u4e86\u7075\u9b42\u672f\u58eb\u3001\u5c01\u5370\u5e08\u3001\u4ef2\u88c1\u8005\u7b49\u8bf8\u591a\u597d\u53cb\uff0c\u5979\u4eec\u5728\u5927\u9646\u5192\u9669\u7684\u5c0f\u961f\u65e0\u5f80\u4e0d\u5229~",
            wenYiFaShi:"\u96b6\u5c5e\u4e8e\u7075\u8c37\u9690\u4fee\u4f1a\uff1b\u88ab\u6559\u5ef7\u4ee5\u624b\u6bb5\u9547\u538b\u540e\u5f3a\u884c\u6536\u7f16\uff0c\u5bf9\u6b64\u9887\u6709\u5f02\u8a00\uff0c\u4e0d\u65ad\u7684\u5367\u85aa\u5c1d\u80c6\uff0c\u540e\u7ec8\u4e8e\u5728\u67d0\u4f4d\u89d2\u8272\u8eab\u4e0a\u627e\u5230\u4e86\u7a81\u7834\u53e3\uff0c\u544a\u8bc9\u5979\u6240\u6709\u4e8b\u60c5\u7684\u771f\u76f8\uff0c\u5bfc\u81f4\u4e86\u795e\u5723\u6559\u5ef7\u5de8\u5927\u5206\u88c2\u53d8\u6545\u7684\u201c\u7f6a\u9b41\u7978\u9996\u201d\uff0c\u540c\u65f6\u5c06\u7075\u8c37\u9690\u4fee\u4f1a\u8f6c\u5165\u4e86\u65b0\u6d3e\u522b",
            zhongCaiZhe:"\u662f\u5e1d\u56fd\u504f\u4e1c\u5357\u5730\u533a\u7684\u539f\u4f4f\u5c45\u6c11\uff0c\u5728\u63a2\u9669\u7684\u8fc7\u7a0b\u4e2d\uff0c\u9047\u5230\u4e86\u5192\u9669\u5bb6\u3001\u7075\u9b42\u672f\u58eb\u3001\u5c01\u5370\u5e08\u7b49\u7ec4\u6210\u7684\u961f\u4f0d\u3002\u5728\u7ecf\u5386\u4e86\u4e8b\u4ef6\u4e4b\u540e\uff0c\u4e0e\u7075\u9b42\u672f\u58eb\u4ea4\u597d\uff0c\u52a0\u5165\u4e86\u5979\u4eec\u7684\u63a2\u9669\u961f\u4f0d\uff0c\u4e00\u540c\u5bfb\u627e\u5927\u9646\u4e0a\u7684\u9057\u8ff9",
            shenGuan:"\u4e0e\u65af\u5361\u96f7\u7279\u6709\u5173\uff1b\u9886\u5bfc\u7740\u666e\u6d4e\u4f1a&\u6c34\u795e\u4fee\u9053\u4f1a&\u6e05\u6d01\u6d3e&\u6e05\u7075\u5b97\uff1b\u5728\u5251\u5e1d\u7edf\u4e00\u56fd\u5bb6\u7684\u884c\u52a8\u4e2d\uff0c\u4e0e\u5251\u5e1d\u8fbe\u6210\u534f\u8bae",
            qiDaoShi:"\u4e3b\u8981\u5c45\u4f4f\u5728\u4e1c\u65b9\u7687\u671d\u504f\u897f\u5357\u5730\u533a\uff0c\u8be5\u5730\u533a\u56db\u5b63\u5982\u590f\uff0c\u9177\u70ed\u6f6e\u6e7f\uff0c\u6545\u5e73\u65f6\u4e00\u822c\u559c\u6b22\u6e05\u51c9\u7740\u88c5\u3002\u8fd9\u6b21\u4e0e\u534e\u80e5\u4e00\u540c\u524d\u884c\uff0c\u5e0c\u671b\u53bb\u7687\u671d\u7684\u4e2d\u5fc3\u63a2\u5bfb\u201c\u672f\u201d\u7684\u771f\u6b63\u5965\u79d8",
            xianZhe:`\u5b66\u9662\u90fd\u5e02\u771f\u5b66\u9738\u4e4b\u4e00\uff0c\u65c1\u4eba\u773c\u91cc\u4e2d\u4e0e\u8389\u8389\u4e1d\u4e3a\u5929\u9020\u5730\u8d50\u7684\u4e00\u5bf9\uff0c\u5b9e\u9645\u5e76\u4e0d\u662f
            \u4e00\u4e2a\u7ee7\u627f\u4e86\u8d24\u8005\u79f0\u53f7\u7684\u52aa\u529b\u5929\u624d\uff0c\u5bb3\u6015\u53d7\u4f24\u4f46\u4e0d\u5f97\u4e0d\u53d7\u4f24\u7684\u80c6\u5c0f\u9b3c`,
            lingFuShi:"\u96b6\u5c5e\u4e8e\u4e1c\u65b9\u7687\u671d\uff0c\u4e0e\u9634\u9633\u5e08\u4e3a\u540c\u6e90\uff0c\u800c\u5e08\u95e8\u5219\u5728\u4e1c\u65b9\u7687\u671d\u4e00\u5904\u798f\u6cfd\u6d1e\u5929\u4e4b\u4e2d\uff0c\u8be6\u89c1\u201c\u9634\u9633\u5e08\u201d",
            jianDi:`\u5e1d\u56fd\u897f\u90e8\u4e00\u5757\u5730\u533a\u7684\u9886\u5bfc\u8005\u3002\u4f5c\u4e3a\u975e\u672c\u5730\u7684\u5916\u6765\u4eba\u5458\uff0c\u5251\u5e1d\u5c06\u8fd9\u4e9b\u7ec4\u7ec7\u805a\u62e2\u5728\u4e00\u8d77\u5e76\u5efa\u7acb\u8d77\u5c5e\u4e8e\u81ea\u5df1\u7684\u5c0f\u56fd\u5ea6\u8d39\u5c3d\u5468\u6298\uff0c\u65e0\u8bba\u662f\u6b66\u529b\u4e0a\u8fd8\u662f\u8111\u529b\u4e0a\uff0c\u4f60\u4e0d\u5f97\u4e0d\u4f69\u670d\u5979\u7684\u6218\u529b\u548c\u8c0b\u7565
            \u8be6\u89c1\u201c\u5e1d\u56fd\u897f\u90e8\u7684\u5386\u53f2\u201d`,
            geDouJia:`\u539f\u662f\u4e1c\u65b9\u7687\u671d\u6e38\u5386\u81f3\u897f\u65b9\u5e1d\u56fd\u7684\u4f7f\u8005\u56e2\u6210\u5458\u7684\u540e\u4ee3\uff0c\u5728\u5e1d\u56fd\u897f\u90e8\u5730\u533a\u5f00\u8bbe\u4e86\u4e00\u4e2a\u5c0f\u6b66\u9986\uff0c\u5411\u5f02\u4e61\u4eba\u5c55\u793a\u4e1c\u65b9\u795e\u79d8\u7684\u201c\u6c14\u201d
            \u8be6\u89c1\u201c\u5e1d\u56fd\u897f\u90e8\u7684\u5386\u53f2\u201d`,
            yongZhe:"\u4ece\u5c0f\u5728\u9694\u58c1\u6751\u6709\u4e00\u4e2a\u9752\u6885\u7af9\u9a6c\uff0c\u7136\u800c\u9752\u6885\u7af9\u9a6c\u5f88\u5c0f\u5c31\u88ab\u62d0\u5356\u8d70\u4e86\uff0c\u4e3a\u6b64\u800c\u5468\u6e38\u5404\u56fd\u5bfb\u627e\u5979\u7684\u7ebf\u7d22\u5e76\u9047\u5230\u4e86\u5f88\u591a\u4eba\u3002\u5076\u7136\u4e00\u4e2a\u673a\u4f1a\uff0c\u4ed6\u5728\u4e00\u4e2a\u6597\u517d\u573a\u770b\u5230\u4e86\u4e00\u4e2a\u5f88\u50cf\u5979\u7684\u80cc\u5f71\uff0c\u4e3a\u4e86\u786e\u5b9a\u662f\u4e0d\u662f\u5979\uff0c\u4ed6\u9690\u59d3\u57cb\u540d\u52a0\u5165\u4e86\u6597\u517d\u573a",
            lingHunShuShi:"\u66fe\u7ecf\u662f\u5b66\u9662\u90fd\u5e02\u7684\u7814\u7a76\u751f\u52a9\u6559\uff0c\u9010\u6e10\u5bf9\u751f\u547d\u8fd9\u4e00\u9879\u7981\u5fcc\u7684\u79d8\u672f\u4ea7\u751f\u4e86\u6d53\u539a\u7684\u5174\u8da3\u5e76\u4f5c\u4e3a\u81ea\u5df1\u7684\u7814\u7a76\u8bfe\u9898\u3002\u5728\u5b8c\u6210\u81ea\u5df1\u5f3a\u5927\u7684\u672f\u5f0f\u3010\u7075\u9b42\u94fe\u63a5\u3011\u540e\uff0c\u542c\u8bf4\u5317\u65b9\u57cb\u85cf\u7740\u53e4\u8001\u7684\u751f\u547d\u7981\u5fcc\u79d8\u672f\uff0c\u4e8e\u662f\u79bb\u5f00\u5b66\u9662\u90fd\u5e02\u524d\u5f80\u5927\u9646\u7684\u5317\u65b9\u8fdb\u884c\u63a2\u7d22\u3002\u5728\u63a2\u7d22\u7684\u671f\u95f4\u9047\u89c1\u4e86\u5192\u9669\u5bb6\uff0c\u5728\u7ecf\u5386\u4e86\u5f88\u591a\u4e8b\u60c5\u540e\u53cc\u65b9\u7ed3\u4e3a\u597d\u53cb\uff0c\u4e00\u540c\u6e38\u5386\uff0c\u7a7f\u8d8a\u5e1d\u56fd\uff0c\u7ed3\u8bc6\u4e86\u597d\u53cb\u5c01\u5370\u5e08\uff0c\u6700\u540e\u5728\u5e1d\u56fd\u5357\u4e0b\u90e8\u5206\u5b9a\u5c45\uff0c\u53c8\u9047\u5230\u4e86\u597d\u53cb\u4ef2\u88c1\u8005",
            xueZhiWuNv:`\u88ab\u505a\u6210\u4eba\u5f62\u5175\u5668\u6295\u5165\u81f3\u6218\u573a\uff0c\u5728\u6218\u573a\u4e0a\u7206\u53d1\uff0c\u968f\u540e\u88ab\u4e1c\u65b9\u7687\u671d\u6d3e\u51fa\u7684\u5927\u80fd\u9547\u538b\u66b4\u8d70\uff0c\u6700\u540e\u7591\u4f3c\u4e0e\u4e00\u540d\u4eba\u7c7b\u5c11\u5e74\u9690\u5c45\uff1b\u96b6\u5c5e\u4e8e\u7687\u671d\u4e1c\u65b9\u7684\u4e00\u4e2a\u5c0f\u56fd\u5bb6\uff0c\u8fd9\u4e2a\u5c0f\u56fd\u5bb6\u8fd8\u8981\u7ed9\u7687\u671d\u671d\u8d21\u3002
            \u5728\u5deb\u5973\u673a\u5173\u4e2d\u5c5e\u4e8e\u4e0a\u7ea7\u5deb\u5973\uff08\u8be6\u89c1\u201c\u5deb\u5973\u673a\u5173\u7ec4\u7ec7\u67b6\u6784\u56fe\u201d\uff09\uff0c\u4fee\u70bc\u7a0b\u5ea6\u6700\u9760\u8fd1\u5927\u5deb\u5973\uff0c\u4f46\u56e0\u4e3a\u5fc3\u4e2d\u4fdd\u6301\u7740\u5f53\u5e74\u7684\u4e00\u4e2a\u4eba\u7c7b\u5c11\u5e74\uff0c\u800c\u8fdf\u8fdf\u65e0\u6cd5\u8e0f\u5165\u6210\u4e3a\u5927\u5deb\u5973\u7684\u6700\u7ec8\u9636\u6bb5\u3002`,
            dieWuZhe:"\u4e3b\u8981\u5c45\u4f4f\u5728\u4e1c\u65b9\u7687\u671d\u504f\u897f\u5730\u533a\uff0c\u8be5\u5730\u533a\u5145\u6ee1\u4e86\u5f02\u57df\u98ce\u60c5\u3002\u8fd9\u6b21\u4e0e\u73d0\u73de\u4e00\u540c\u524d\u884c\uff0c\u5e0c\u671b\u53bb\u7687\u671d\u7684\u4e2d\u5fc3\u63a2\u5bfb\u201c\u672f\u201d\u7684\u771f\u6b63\u5965\u79d8",
            nvWuShen:"\u7fbd\u65cf\u5d07\u62dc\u7684\u6218\u6597\u795e\uff0c\u662f\u5c06\u8981\u6ca1\u843d\u7684\u7fbd\u65cf\u4fe1\u4ef0\u4e2d\u7684\u795e\u7075\u3002\u7531\u5723\u5149\u6559\u4f1a\u63a8\u52a8\uff0c\u7fbd\u65cf\u4e0e\u795e\u5723\u6559\u5ef7\u4e2d\u4e00\u4e9b\u6559\u6d3e\u5e0c\u671b\u5408\u4f5c\u4f7f\u5973\u6b66\u795e\u7c73\u6d85\u74e6\u518d\u73b0\u4e16\u95f4\u7edf\u4e00\u4e16\u754c\u5b97\u6559\uff0c\u8be5\u8ba1\u5212\u88ab\u79f0\u4e3a\u201c\u5973\u6b66\u795e\u8ba1\u5212\u201d",
            moGong:`\u4e0e\u5b89\u5a1c\u4e3a\u8fdc\u4eb2\uff0c\u5728\u5b89\u5a1c\u5e26\u7740\u90e8\u843d\u65cf\u4eba\u524d\u53bb\u5bfb\u627e\u6ce2\u963f\u72c4\u897f\u4e9a\u907f\u96be\u65f6\uff0c\u79bb\u5f00\u5b89\u5a1c\u53bb\u5bfb\u627e\u4e0d\u8fde\u7d2f\u65cf\u4eba\u800c\u5077\u5077\u51fa\u8d70\u7684\u7236\u4eb2\u3002
            \u6b64\u65f6\u6cf0\u7f57\u838e\u5df2\u7ecf\u901a\u8fc7\u7236\u4eb2\u7559\u4e0b\u7684\u9b54\u6cd5\u672f\u5f0f\u5b8c\u6210\u4e86\u5411\u9b54\u5f13\u8f6c\u53d8\u7684\u4e0b\u4e00\u4e2a\u9636\u6bb5\uff0c\u5728\u627e\u7236\u4eb2\u7684\u671f\u95f4\u9047\u5230\u4e86\u540c\u662f\u5728\u627e\u4eba\u7684\u83f2\u6b27\u5a1c`,
            hongLianQiShi:"\u8be6\u89c1\u201c\u7ea2\u83b2\u4e8b\u4ef6\u201d\uff1b\u88ab\u8d4b\u4e88\u7684\u7279\u6b8a\u80fd\u529b\u662f\u9738\u4f53\uff08\u4f24\u5bb3\u65e0\u6548\u5316\uff09\uff1b\u8ba4\u4e3a\u88ab\u8ffd\u6355\u662f\u81ea\u5df1\u6700\u597d\u7684\u8d4e\u7f6a\u9053\u8def",
            yingLingRenXing:"\u96f6\u662f\u5b8c\u5168\u7528\u673a\u68b0\u624b\u6bb5\u5236\u9020\u51fa\u6765\u7684\u4eba\u5f62\u673a\u68b0\u4f53\uff0c\u800c\u64cd\u4f5c\u5979\u7684\u5219\u662f\u5df2\u7ecf\u88ab\u79d8\u672f\u7ed1\u5b9a\u7684\u7075\u9b42",
            moQiang:`\u5973\u6b66\u795e\u8ba1\u5212\uff08\u9020\u795e\u8ba1\u5212\uff09\u7684\u5b9e\u9a8c\u4f53\uff0c\u4f46\u662f\u5931\u8d25\u540e\u7684\u4ea7\u7269
            \u81ea\u5c0f\u5c31\u662f\u5b64\u513f\u7684\u83f2\u6b27\u5a1c\u88ab\u4e00\u4e2a\u4eba\u8d29\u5b50\u6536\u7559\uff0c\u4eba\u8d29\u5b50\u7ed9\u5979\u8d77\u4e86\u4e2a\u540d\u5b57\u53eb\u83f2\u6b27\u5a1c\u3002\u7136\u800c\u7b49\u83f2\u6b27\u5a1c\u957f\u5927\u540e\uff0c\u90a3\u4e2a\u4eba\u8d29\u5b50\u5bf9\u5979\u5b9e\u65bd\u4e86\u4fb5\u72af\uff0c\u7136\u540e\u5c06\u5979\u5356\u7ed9\u4e86\u4e00\u4e2a\u795e\u79d8\u7ec4\u7ec7\u7684\u5b9e\u9a8c\u5ba4\u4f5c\u4e3a\u8bd5\u9a8c\u54c1\uff0c\u8fd9\u7a81\u7136\u5176\u6765\u7684\u4e8b\u4ef6\u8ba9\u83f2\u6b27\u5a1c\u7684\u4e09\u89c2\u5d29\u584c\uff0c\u53d8\u5f97\u4e0d\u4fe1\u4eba\u548c\u51b7\u9177\u3002
            \u6700\u540e\u4f5c\u4e3a\u5b9e\u9a8c\u5931\u8d25\u54c1\u88ab\u6254\u5230\u4e86\u795e\u79d8\u7ec4\u7ec7\u5b9e\u9a8c\u5ba4\u7684\u5e9f\u54c1\u5904\u7406\u573a\u81ea\u751f\u81ea\u706d\uff0c\u5904\u7406\u573a\u4e2d\u53ea\u6709\u5145\u6ee1\u8150\u81ed\u6c14\u5473\u7684\u5b9e\u4f53\u548c\u5b9e\u9a8c\u540e\u5f03\u7f6e\u7684\u661f\u77f3\u6b8b\u6e23\uff1b\u83f2\u6b27\u5a1c\u5728\u5176\u4e2d\u610f\u5916\u7684\u4e0e\u5e7b\u4e4b\u661f\u77f3\u5171\u751f\u5e76\u83b7\u5f97\u4e86\u5e7b\u4e4b\u661f\u77f3\u7684\u80fd\u529b\u3002\u6700\u7ec8\u5979\u901a\u8fc7\u8fd9\u4e2a\u80fd\u529b\u7834\u574f\u4e86\u795e\u79d8\u7ec4\u7ec7\u5b9e\u9a8c\u5ba4\u5e76\u9003\u79bb\u51fa\u53bb\uff0c\u76ee\u524d\u88ab\u8fd9\u4e2a\u795e\u79d8\u7ec4\u7ec7\u8ffd\u6355\u4e2d\u3002
            \u9003\u79bb\u51fa\u6765\u540e\u7684\u83f2\u6b27\u5a1c\u76ee\u524d\u6210\u4e3a\u4e86\u9b54\u88c5\u5c11\u5973\uff0c\u5230\u5904\u6d41\u6d6a\uff0c\u5bfb\u627e\u6614\u65e5\u90a3\u4e2a\u65e2\u662f\u6069\u4eba\u53c8\u662f\u4ec7\u4eba\uff0c\u540c\u65f6\u4e5f\u662f\u66fe\u7ecf\u6240\u7231\u4e4b\u4eba\uff0c\u4f46\u5c11\u5973\u5bf9\u8fd9\u884c\u4e3a\u5145\u6ee1\u8ff7\u60d8\u4e0e\u82e6\u607c\u3002\u4e8e\u662f\u88ab\u661f\u77f3\u6307\u5f15\u7740\u7684\u5979\u5f00\u59cb\u5bfb\u627e\u80fd\u89e3\u51b3\u81ea\u5df1\u4e00\u5207\u82e6\u607c\u7684\u661f\u676f\u3002
            \u6b63\u5f53\u6cf0\u7f57\u838e\u88ab\u9b54\u6cd5\u541e\u566c\uff0c\u8ff7\u5931\u4e8e\u4e16\u754c\u7684\u4e00\u89d2\u65f6\uff0c\u83f2\u6b27\u5a1c\u4e0e\u6cf0\u7f57\u838e\u76f8\u9047\u4e86\uff0c\u4f46\u6b64\u6b21\u7684\u76f8\u9047\u5e76\u975e\u5076\u7136\u3002\u88ab\u661f\u77f3\u6240\u7737\u604b\uff0c\u6240\u6307\u5f15\uff0c\u540c\u6837\u662f\u5931\u53bb\u81ea\u6211\u7684\u4e8c\u4eba\uff0c\u76f8\u4e92\u4f9d\u9760\uff0c\u5728\u5979\u4eec\u4e8c\u4eba\u7684\u672a\u6765\u524d\u65b9\u5219\u662f\u53e6\u4e00\u540d\u547d\u8fd0\u4e4b\u4eba\u3002`,
            cangYanMoNv:`\u5077\u770b\u4e86\u8bfa\u96f7\u6770\u7684\u8d24\u8005\u4e4b\u4e66\uff0c\u7ed3\u5408\u4e86\u81ea\u5df1\u6240\u5b66\uff0c\u5b8c\u6210\u4e86\u5c5e\u4e8e\u81ea\u5df1\u7684\u672f\u5f0f\uff1b\u5b66\u9662\u90fd\u5e02\u771f\u5b66\u9738\u4e4b\u4e00\uff0c\u65c1\u4eba\u773c\u91cc\u4e2d\u4e0e\u8bfa\u96f7\u6770\u4e3a\u5929\u9020\u5730\u8d50\u7684\u4e00\u5bf9\uff0c\u5b9e\u9645\u5e76\u4e0d\u662f
            \u4e00\u4e2a\u4e3a\u4e86\u7ee7\u627f\u7237\u7237\u9057\u4ea7\u7684\u5929\u624d\u5c11\u5973\uff0c\u4e3a\u4e86\u7ee7\u627f\u90a3\u4e2a\u5bb6\u65cf\u610f\u5fd7\u7684\u5c11\u5973\uff0c\u7ec8\u5c06\u8d70\u4e0a\u4e86\u4e0d\u62e9\u624b\u6bb5\u7684\u9053\u8def`,
            yinYouShiRen:`\u56db\u5904\u6e38\u5386\uff0c\u8046\u542c\u6545\u4e8b\uff0c\u5bfb\u627e\u7075\u611f\uff0c\u4ee5\u6b64\u6765\u5b8c\u6210\u81ea\u5df1\u7684\u8457\u4f5c\u300a\u6c38\u6052\u4e50\u7ae0\u300b\u3002\u5728\u6e38\u5386\u7684\u8fc7\u7a0b\u4e2d\uff0c\u4ed6\u78b0\u5230\u4e86\u4e00\u4e2a\u53ef\u7231\u7684\u5c0f\u7cbe\u7075\uff0c\u5e76\u5ea6\u8fc7\u4e86\u4e00\u6bb5\u6109\u5feb\u7684\u65f6\u5149
            \u5b9e\u9645\u662f\u4f5c\u4e3a\u7b2c\u4e00\u6279\u65e7\u65e5\u4e4b\u6c11\u548c\u539f\u59cb\u7cbe\u7075\u65cf\u901a\u8fc7\u57fa\u56e0\u6df7\u5408\u540e\u7684\u4ea7\u7269\uff0c\u867d\u7136\u56e0\u4e3a\u6df7\u5165\u4e86\u65e7\u65e5\u4e4b\u6c11\u7684\u57fa\u56e0\u800c\u88ab\u5224\u5b9a\u79cd\u65cf\u4e3a\u4eba\u7c7b\uff0c\u5b9e\u9645\u4e0a\u4f53\u5185\u7cbe\u7075\u65cf\u7684\u57fa\u56e0\u56e0\u4e3a\u7b2c\u4e00\u4ee3\u7684\u7f18\u6545\u5360\u6bd4\u8fd8\u662f\u975e\u5e38\u9ad8\u7684\u3002\u56e0\u6b64\u4ed6\u4e5f\u83b7\u5f97\u4e86\u51e0\u4e4e\u6c38\u6052\u7684\u751f\u547d\u3002\u6f2b\u957f\u7684\u751f\u547d\u5bf9\u4ed6\u6765\u8bf4\uff0c\u4e0d\u50cf\u662f\u6069\u8d50\uff0c\u53cd\u800c\u662f\u4e00\u79cd\u60e9\u7f5a\uff0c\u4e00\u79cd\u540d\u53eb\u201c\u6c38\u6052\u56da\u5f92\u201d\u7684\u60e9\u7f5a\u3002
            \u4e3a\u4e86\u4e86\u7ed3\u81ea\u8eab\uff0c\u6216\u8005\u8bf4\u6253\u53d1\u65f6\u95f4\uff0c\u4ed6\u6e38\u5386\u4e86\u8fd9\u5757\u5927\u9646\u7684\u5404\u4e2a\u5730\u65b9\uff0c\u751a\u81f3\u60f3\u8981\u95ef\u5165\u5927\u9646\u8fb9\u7f18\u7684\u865a\u65e0\u6df7\u6c8c\u6765\u5c1d\u8bd5\u795e\u9690\u8fdb\u884c\u89e3\u8131\uff0c\u4f46\u90fd\u6ca1\u6709\u6210\u529f\u3002\u56e0\u4e3a\u4ed6\u4e0d\u77e5\u9053\u7684\u662f\uff0c\u50cf\u4ed6\u8fd9\u6837\u7684\u7cbe\u7075\uff0c\u53ea\u6709\u901a\u8fc7\u732e\u796d\u624d\u80fd\u8ba9\u81ea\u5df1\u9b42\u5f52\u6545\u571f\uff0c\u7136\u800c\u4ed6\u73b0\u5728\u5e76\u6ca1\u6709\u627e\u5230\u4f1a\u8fd9\u79cd\u4eea\u5f0f\u7684\u4eba\uff0c\u4e5f\u4e0d\u77e5\u9053\u8fd9\u5757\u5927\u9646\u4e0a\u8fd8\u6709\u6ca1\u6709\u4f1a\u8fd9\u79cd\u4eea\u5f0f\u7684\u4eba\u3002\u76f4\u5230\u67d0\u4e2a\u5c0f\u7cbe\u7075\u7a7f\u8d8a\u8fc7\u6765\u65f6~`,
            jingLingSheShou:"\u5b89\u5a1c\u5e26\u9886\u65cf\u4eba\u524d\u5f80\u5979\u6240\u5728\u7684\u5730\u65b9\u82f1\u5409\u5229\u4e9a\u68ee\u6797\u907f\u96be\uff1b\u64c5\u957f\u9690\u533f\u4e8e\u4e1b\u6797\u4e4b\u4e2d\uff0c\u7a7f\u63d2\u4e8e\u6218\u573a\uff0c\u6839\u636e\u573a\u4e0a\u5c40\u52bf\uff0c\u7275\u5236\u654c\u4eba\uff0c\u7cbe\u51c6\u6253\u51fb\u5bf9\u624b\u4ee5\u53ca\u8ffd\u51fb\u6e83\u8d25\u4e4b\u654c\uff0c\u5979\u76f8\u4fe1\u79d8\u4eea\u7684\u795d\u798f\u529b\u91cf\u4ee5\u53ca\u68ee\u4e4b\u4f19\u4f34\u80fd\u4e3a\u5979\u5e26\u6765\u80dc\u5229\u7684\u51ef\u65cb",
            yinYangShi:`\u9634\u9633\u5e08\u901a\u8fc7\u9634\u9633\u672f\uff0c\u5c06\u81ea\u8eab\u7075\u9b42\u5206\u5272\u51fa2\u90e8\u5206\uff0c\u5206\u522b\u547d\u540d\u4e3a\u8f6e\u548c\u73af\uff1b\u5176\u4e2d\u4e00\u90e8\u5206\u5229\u7528\u51ed\u4f9d\u9644\u4f53\u7684\u65b9\u5f0f\u53d8\u6210\u53e6\u4e00\u90e8\u5206\u7684\u5f0f\u795e\u3002\u901a\u8fc7\u8fd9\u79cd\u65b9\u5f0f\u5c31\u53ef\u4ee5\u8fbe\u52302\u4e2a\u7075\u9b42\u540c\u65f6\u5b66\u4e60\u4e0d\u540c\u7684\u77e5\u8bc6\uff0c\u5e76\u57f9\u517b\u6210\u65b0\u7684\u7075\u9b42\u4e2a\u4f53\u548c\u5f62\u6210\u4e0d\u540c\u7684\u6027\u683c\u3002\u800c\u5f53\u5206\u5272\u7684\u7075\u9b42\u518d\u6b21\u5408\u5230\u4e00\u4f53\u65f6\uff0c\u9634\u9633\u5e08\u5c31\u80fd\u83b7\u5f97\u66f4\u591a\u66f4\u5f3a\u7684\u529b\u91cf\u3002\u76ee\u524d\u6b63\u52aa\u529b\u5c1d\u8bd5\u8ffd\u6c42\u5206\u5272\u62104\u4efd\u7075\u9b42\uff0c8\u4efd\u7075\u9b42\u7b49\u7b49\u3002
            \u9634\u9633\u5e08\u4e0e\u98ce\u97f3\u672c\u662f\u540c\u6e90\uff0c\u4f46\u5bf9\u672c\u6e90\u7684\u7406\u89e3\u65b9\u5f0f\u4e0d\u540c\uff0c\u5404\u81ea\u4ea6\u4f7f\u7528\u4e0d\u540c\u7684\u65b9\u5f0f\u8fdb\u884c\u4fee\u884c\uff1a\u9634\u9633\u5e08\u5728\u4e1c\u65b9\u5c9b\u56fd\u7ed3\u5408\u4e86\u5f53\u5730\u7684\u5fa1\u9b42\u672f\u3001\u51ed\u4f9d\u672f\u3001\u5492\u672f\u8fdb\u884c\u53d1\u5c55\uff1b\u800c\u98ce\u97f3\u5219\u5728\u4e1c\u65b9\u7fa4\u5c71\u4e2d\u4ee5\u4fee\u8eab\u3001\u517b\u795e\u3001\u7b26\u7b93\u8fdb\u884c\u53d1\u5c55\u3002\u67d0\u5929\u5979\u4eec\u5404\u81ea\u5f97\u5230\u5e08\u5085\u7684\u6388\u547d\uff0c\u524d\u5f80\u540c\u4e00\u4e2a\u5730\u65b9\u6267\u884c\u5de5\u4f5c\uff0c\u6b64\u523b\u547d\u8fd0\u5f15\u5bfc\u81f3\u6b64~
            \u7b97\u51fa\u4e1c\u65b9\u6709\u4e00\u573a\u80fd\u91cf\u5927\u66b4\u8d70\uff0c\u4f46\u611f\u89c9\u65e0\u6cd5\u4ee5\u4e00\u5df1\u4e4b\u529b\u9547\u538b\uff0c\u6545\u62a5\u544a\u5e08\u95e8\uff0c\u5f97\u5230\u4e86\u5e08\u95e8\u7684\u6388\u547d`,
            xueSeJianLing:`\u5e1d\u56fd\u897f\u90e8\u4e00\u5757\u5730\u533a\u7684\u539f\u4f4f\u6c11\uff0c\u5bf9\u4e8e\u67d0\u4f4d\u4eba\u58eb\u7684\u7edf\u4e00\u4e00\u76f4\u4e0d\u670d\u6c14\uff0c\u4e0e\u6b64\u6597\u4e89\u4e86\u8bb8\u4e45\uff0c\u6700\u540e\u88ab\u5176\u5251\u9053\u5b9e\u529b\u548c\u9886\u8896\u6c14\u8d28\u6240\u6298\u670d
            \u8be6\u89c1\u201c\u5e1d\u56fd\u897f\u90e8\u7684\u5386\u53f2\u201d`,
            yueZhiNvShen:`\u6708\u795e\u4fe1\u4ef0\u662f\u88ab\u6559\u5ef7\u56fd\u541e\u5e76\u540e\u878d\u5408\u5230\u6559\u5ef7\u4f53\u7cfb\u91cc\u7684\u5f02\u65cf\u795e\u4fe1\u4ef0\u3002\u6559\u5ef7\u4e3a\u4e86\u7ef4\u7cfb\u7edf\u6cbb\uff0c\u5c06\u6708\u795e\u7684\u795e\u6743\u5206\u62c6\u51fa\u6765\u53d8\u62103\u4efd\uff0c\u5206\u522b\u7531\u4e0d\u540c\u7684\u796d\u5e08\u7ee7\u627f\u3002
            \u81ea\u5c0f\u4f5c\u4e3a\u6708\u795e\u796d\u5e08\u7684\u7ee7\u627f\u8005\u4e4b\u4e00\u7684\u5c24\u745e\u827e\u8389\uff0c\u5f88\u65e9\u5c31\u89c9\u9192\u4e86\u5f3a\u5927\u7684\u795e\u529b\uff1b\u88ab\u62c6\u5206\u76843\u4efd\u795e\u6743\u9010\u6e10\u805a\u5408\u5230\u4e00\u8d77\uff0c\u8fd9\u4e5f\u8bb8\u662f\u547d\u8fd0\u7684\u65b0\u542f\u793a
            \u96b6\u5c5e\u4e8e\u6708\u795e\u4fee\u9053\u4f1a`,
            shouLingWuShi:`\u662f\u4f5c\u4e3a\u7d2b\u82d1\u7684\u5b88\u62a4\u59ec\u6b66\u58eb\uff0c\u540c\u65f6\u4e5f\u662f\u88ab\u56fd\u5bb6\u6307\u6d3e\u7528\u6765\u76d1\u89c6\u7d2b\u82d1\uff0c\u538b\u5236\u7d2b\u82d1\u66b4\u8d70\u7684\u5de5\u5177\u3002\u5fa1\u9b42\u6d41\u662f\u83d6\u84b2\u6240\u4fee\u7684\u5251\u9053\u6d41\u6d3e\uff0c\u4ee5\u6fc0\u53d1\u64cd\u7eb5\u4f53\u5185\u517d\u9b42\u6765\u63d0\u5347\u81ea\u8eab\u80fd\u529b\uff0c\u4ece\u800c\u538b\u5236\u654c\u4eba\u3002\u4f5c\u4e3a\u7d2b\u82d1\u7684\u4eb2\u5c5e\uff0c\u540c\u65f6\u4e5f\u80a9\u8d1f\u56fd\u5bb6\u5de5\u5177\u547d\u8fd0\u7684\u83d6\u84b2\uff0c\u4e0e\u7d2b\u82d1\u4e4b\u95f4\u7684\u5173\u7cfb\u5341\u5206\u5fae\u5999\u3002
            \u83d6\u84b2\u559c\u597d\u559d\u9152\u548c\u6ce1\u6fa1\uff0c\u8fd9\u662f\u5979\u8ba4\u4e3a\u6700\u65e0\u62d8\u65e0\u675f\u7684\u65f6\u95f4\u4e86\uff1b\u4e14\u5979\u8ba4\u4e3a\u8fd9\u4e2a\u65f6\u95f4\u6240\u6709\u4eba\u7684\u5173\u7cfb\u5e94\u8be5\u90fd\u653e\u4e0b\u6765\uff0c\u597d\u597d\u4eab\u53d7\u8fd9\u6bb5\u7f8e\u597d\u65f6\u5149
            \u83d6\u84b2\u5728\u62c5\u4efb\u59ec\u6b66\u58eb\u4e4b\u524d\uff0c\u66fe\u7ecf\u5728\u5fa1\u9b42\u6d41\u7684\u9053\u573a\u5185\u5b66\u4e60\uff0c\u5fa1\u9b42\u6d41\u987e\u540d\u601d\u4e49\uff0c\u5c31\u662f\u7edf\u5fa1\u4f53\u5185\u517d\u9b42\u3002\u83d6\u84b2\u5728\u9053\u573a\u4e2d\u5b66\u4f1a\u4e86\u6700\u7ec8\u5965\u4e49\uff0c\u4e8e\u662f\u79bb\u5f00\u9053\u573a\u6e38\u5386\u56db\u65b9\u3002\u5728\u6e38\u5386\u56db\u65b9\u7684\u4e00\u4e24\u5e74\u4e2d\uff0c\u5979\u6536\u5230\u4e86\u5927\u5e08\u5144\u7684\u6765\u4fe1\uff0c\u4fe1\u4e2d\u5219\u5199\u5230\u201c\u83d6\u84b2\u6e38\u5386\u56db\u65b9\u540e\uff0c\u5e08\u5085\u6536\u4e86\u4e00\u540d\u6709\u5929\u8d4b\u7684\u5173\u95e8\u5f1f\u5b50\uff0c\u5173\u95e8\u5f1f\u5b50\u4e0d\u8d1f\u4f17\u671b\uff0c\u5b66\u4f1a\u4e86\u5e08\u5085\u7684\u6700\u7ec8\u5965\u4e49\uff0c\u7136\u800c\u5979\u5374\u6700\u540e\u5f11\u5e08\uff0c\u7559\u4e0b\u4e86\u201c\u79d8\u6280\u5df2\u4f1a\u201d\u7684\u5b57\u6837\u540e\u6d88\u5931\u4e0d\u89c1\u3002\u201d\u3002\u4e8e\u662f\u83d6\u84b2\u4e3a\u4e86\u590d\u5174\u5fa1\u9b42\u6d41\uff0c\u540c\u65f6\u4e5f\u662f\u4e3a\u4e86\u66ff\u5e08\u5085\u62a5\u4ec7\uff0c\u5728\u8d76\u56de\u53bb\u7684\u8def\u4e0a\uff0c\u8c03\u67e5\u53d1\u73b0\u8be5\u5173\u95e8\u5f1f\u5b50\u53bb\u5deb\u5973\u673a\u5173\u62c5\u4efb\u4e86\u59ec\u6b66\u58eb\u3002\u4e8e\u662f\u5979\u8d76\u56de\u53bb\u9053\u573a\uff0c\u82b1\u4e86\u534a\u5e74\u65f6\u95f4\u5c06\u5fa1\u9b42\u6d41\u6700\u7ec8\u7684\u5965\u4e49\u4f20\u6388\u7ed9\u9053\u573a\u7684\u5e08\u5144\u5f1f\u540e\uff0c\u5367\u5e95\u5deb\u5973\u673a\u5173\u62c5\u4efb\u4e86\u59ec\u6b66\u58eb\uff0c\u7ed9\u5979\u5206\u914d\u7684\u5deb\u5973\u5219\u662f\u7d2b\u82d1\u3002
            \u5728\u62c5\u4efb\u59ec\u6b66\u58eb\u671f\u95f4\uff0c\u83d6\u84b2\u8c03\u67e5\u5173\u95e8\u5f1f\u5b50\u7684\u8e2a\u8ff9\uff0c\u4f46\u4e00\u76f4\u90fd\u6ca1\u6709\u6d88\u606f\u3002\u76f4\u5230\u5979\u5e26\u7740\u7d2b\u82d1\u53bb\u67d0\u5730\u201c\u7948\u798f\u201d\u65f6\uff0c\u53d1\u73b0\u5bf9\u65b9\u9635\u8425\u4e2d\u5c45\u7136\u4e5f\u51fa\u73b0\u4e86\u5deb\u5973\u7684\u5b58\u5728\u3002\u5deb\u5973\u673a\u5173\u5927\u6012\uff0c\u6000\u7591\u662f\u5185\u90e8\u6709\u4eba\u7a83\u53d6\u4e86\u673a\u5bc6\u6280\u672f\u6216\u8005\u6709\u59ec\u6b66\u58eb\u53db\u53d8\uff0c\u5e26\u8d70\u4e86\u4f8d\u5949\u5deb\u5973\u6216\u8005\u4e0b\u7ea7\u5deb\u5973\u3002\u7ec8\u4e8e\u5deb\u5973\u673a\u5173\u8c03\u67e5\u51fa\u4e86\u8fd9\u4e8b\u7684\u59cb\u4f5c\u4fd1\u8005\uff0c\u5c45\u7136\u5c31\u662f\u5173\u95e8\u5f1f\u5b50\u3002\u4e8e\u662f\u4e00\u573a\u5927\u6218\u4e0d\u53ef\u907f\u514d\u7684\u7206\u53d1\u4e86\uff0c\u5728\u6218\u6597\u8fc7\u7a0b\u4e2d\uff0c\u7d2b\u82d1\u758f\u4e8e\u770b\u7ba1\uff0c\u6700\u540e\u66b4\u8d70\u3002\u83d6\u84b2\u4ee5\u635f\u5931\u4e86\u4e00\u53ea\u624b\u7684\u4ee3\u4ef7\uff0c\u548c\u5176\u4ed6\u5927\u80fd\u9547\u538b\u4e86\u5979\u7684\u66b4\u8d70\u3002\u6218\u4e89\u7684\u6700\u540e\uff0c\u83d6\u84b2\u5728\u539f\u6218\u4e89\u9057\u5740\u9644\u8fd1\uff0c\u7acb\u4e86\u4e00\u5757\u65e0\u5b57\u7891\uff0c\u5728\u90a3\u8fb9\u5b64\u72ec\u7ec8\u8001\u3002`,
            shengGong:"\u5929\u4e4b\u4f7f\u5f92\uff0c\u4f46\u56e0\u4e3a\u662f\u4eba\u9020\u7684\u6545\u6ca1\u6709\u7fbd\u65cf\u7684\u7fc5\u8180\uff0c\u4e8e\u662f\u5236\u4f5c\u4e86\u4e00\u5bf9\u7fc5\u8180\uff08\u4e5f\u53ef\u4ee5\u4f5c\u4e3a\u6b66\u5668\u4f7f\u7528\uff09",
		},
		
		skill:{
            //风之剑圣
            fengNuZhuiJi:{
                usable:1,
                trigger:{player:"useCardAfter"},
                //priority:1,
                filter:function(event,player){
                    //if(event.selected) return false;
                    return get.is.gongJiXingDong(event);
                },
                content:function(player){
                    "step 0"
                    //trigger.selected=true;
                    trigger.getParent().insertAfter(function(){
                        var str='风怒追击：风系[攻击行动]';
                        var next=player.gongJi(function(card,player,event){
                            if(get.xiBie(card)!='feng') return false;
                            return lib.filter.cardEnabled(card,player,'forceEnable');
                        },str);
                        next.autodelay=true;
                    },{
                        player:player,
                    });
					
                },
                check:function(event,player){
                    var num=player.countCards('h',card=>get.xiBie(card)=='feng'&&get.type(card)=='gongJi');
                    return num>0
                },
                mod:{
                    aiOrder:function(player,item,num){
                        if(get.type(item)!='gongJi') return;
                        if(get.xiBie(item)=='feng') return num-=0.2;
                        else return;
                    },
                }
            },
            shengJian:{
                forced:true,
                trigger:{player:"useCardToPlayer"},
                group:['shengJian2','shengJian3','shengJian_draw_discard'],
                priority:1,
                filter:function(event,player){
                    if(get.type(event.card)=='gongJi'){
                        return player.storage.zhuDongGongJi==3;
                    }else{
                        return false
                    }
                },
                content:function(){
                    trigger.getParent().canYingZhan=false;
                    trigger.getParent().canShengGuang=false;
                    trigger.getParent().canShengDun=false;
                },
                subSkill:{
                    draw_discard:{
                        forced:true,
                        trigger:{player:'useCardEnd'},
                        filter:function(event,player){
                            if(event.card!=player.storage.shengJian) return false;
                            return true;
                        },
                        content:function(){
                            "step 0"
                            var list=[0,1,2,3];
                            player.chooseControl(list).set('prompt','圣剑：摸X张牌并弃置X张牌').set('ai',function(){
                                var player=_status.event.player;
                                var num=player.getHandcardLimit()-player.countCards('h');
                                if(num>3) num=3;
                                return num;
                            });
                            "step 1"
                            if(result.control==0){
                                event.finish();
                            }else{
                                event.number=result.control;
                            }
                            "step 2"
                            player.draw(event.number);
                            "step 3"
                            player.chooseToDiscard(event.number,true);
                        }
                    }
                },
            },
            shengJian2:{//圣剑记数
                forced:true,
                priority:2,
                trigger:{player:"useCardToPlayer"},
                filter:function(event,player){
                    if(event.getParent().yingZhan==true) return false;
                    if(get.type(event.card)=='gongJi'){
                        return true;
                    }else{
                        return false;
                    }
                },
                content:function(event,player){
                    if(typeof player.storage.zhuDongGongJi!='number'){
                        player.storage.zhuDongGongJi=1;
                    }else{
                        player.storage.zhuDongGongJi++;
                    }
                    if(player.storage.zhuDongGongJi==3){
                        player.storage.shengJian=trigger.card;
                    }
                    //game.log('圣剑记数',player.storage.zhuDongGongJi);//测试用
                }
            },
            shengJian3:{//圣剑重置记数
                forced:true,
                trigger:{player:"phaseEnd"},
                filter:function(){
                    return true;
                },
                content:function(event,player){
                    player.storage.zhuDongGongJi=0;
                }
            },
            lieFengJi:{
                trigger:{player:"useCardToPlayer"},
                filter:function(event,target){
                    if(event.card.hasNature('lieFengJi')){
                        return event.target.hasExpansions('_shengDun');
                    }
                    return false;
                },
                content:function(){
                    trigger.getParent().canShengDun=false;
                    trigger.getParent().canYingZhan=false;
                }
            },
            jiFengJi:{
                trigger:{player:"useCard"},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return event.card.hasNature('jiFengJi');
                },
                content:function(event,target){
                    player.storage.gongJi++;
                },
                mod:{
                    aiOrder:function(player,item,num){
                        if(get.type(item)!='gongJi') return;
                        if(item.hasNature('jiFengJi')){
                            return num+=0.7;
                        }else{
                            return;
                        }
                    },
                }
            },
            jianYing:{
                usable:1,
                trigger:{player:'useCardAfter'},
                //priority:0,
                filter:function(event,player){
                    //if(event.selected) return false;
                    return get.is.gongJiXingDong(event)&&player.canBiShaShuiJing();
                },
                content:function(player){
                    //trigger.selected=true;
                    player.removeBiShaShuiJing();
                    player.storage.gongJi++;
                },
                check:function(event,player){
                    return player.storage.zhuDongGongJi==2||(player.countCards('h',card=>get.type(card)=='gongJi')>2&&(player.countNengLiangAll()>=2&& player.storage.zhuDongGongJi==1));
                },
                ai:{
                    shuiJing:true,
                }
            },

            //狂战士
            kuangHua:{
                forced:true,
                trigger:{player:'useCardToTargeted'},
				filter:function(event){
					if(event.card&&get.type(event.card)=='gongJi'){
						return true;
					}
					return false;
				},
				firstDo:true,
				content:function(){
					trigger.getParent().baseDamage++;
                    if(player.countCards('h')>3){
                        trigger.getParent().baseDamage++;
                    }
				},
            },
            
            xueYingKuangDao:{
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return event.card.hasNature('xueYingKuangDao');
                },
                content:function(){
                    player.addTempSkill('xueYingKuangDao2',{player:['useCardBefore','phaseEnd']});
                }
            },
            xueYingKuangDao2:{
                forced:true,
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    return event.card.hasNature('xueYingKuangDao');
                },
                content:function(){
                    var target=trigger.target;
                    if(target.countCards('h')==2){
                        trigger.getParent().baseDamage++;//这样加伤，比较简单，注意时机必须是useCradTo
                        trigger.getParent().baseDamage++;
                    }else if(target.countCards('h')==3){
                        trigger.getParent().baseDamage++;
                    }
                }
            },
            xueXingPaoXiao:{
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return event.card.hasNature('xueXingPaoXiao');
                },
                content:function(){
                    player.addTempSkill('xueXingPaoXiao2',{player:['useCardBefore','phaseEnd']});
                }
            },
            xueXingPaoXiao2:{
                forced:true,
                trigger:{player:'useCardToPlayer'},
                filter:function(event,player){
                    return event.card.hasNature('xueXingPaoXiao');
                },
                content:function(){
                    var target=trigger.target;
                    if(target.zhiLiao==2){//三者合一为强制命中，注意触发时机
                        trigger.getParent().canYingZhan=false;
                        trigger.getParent().canShengGuang=false;
                        trigger.getParent().canShengDun=false;
                    }
                }
            },
            siLie:{
                trigger:{player:'useCardToTargeted'},
                lastDo:true,
                filter:function(event,player){
                    if(get.type(event.card)=='gongJi'){
                        return player.canBiShaBaoShi();
                    }else{
                        return false;
                    }
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    trigger.getParent().baseDamage++;
                    trigger.getParent().baseDamage++;
                },
                ai:{
                    baoShi:true,
                }
            },

            //圣女
            bingShuangDaoYan:{
                trigger:{player:'useCard'},
                filter:function(event){
                    return get.xiBie(event.card)=='shui'||get.name(event.card)=='shengGuang';
                },
                forced:true,
                content:function(){
                    'step 0'
                    var next=player.chooseTarget(true,'目标角色+1[治疗]').set('ai',function(target){
                        var player=_status.event.player;
						if(target.side==player.side) return get.zhiLiaoEffect(target,1);
                        return -1;
					});
                    'step 1'
					if(result.bool){
						var target=result.targets[0];
                        game.log(player,'选择了',target);
						player.line(target,'blue');
						target.changeZhiLiao();
					}
                },
            },
            zhiLiaoShu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('zhiLiaoShu');
				},
				position:'h',
				//viewAs:{name:'faShu',nature:'zhiLiaoShu'},
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('zhiLiaoShu');
                    });
				},
				prompt:'目标角色+2[治疗]。',
                filterTarget:true,
                selectTarget:1,
                discard:false,
                prepare:'useCard',
                content:function(){
                    target.changeZhiLiao(2);
                },
                ai: {
					result: {
						target:function(player,target){
                            return get.zhiLiaoEffect(target,2);
                        },
					},
					order: 3.5,
				},
            },
            zhiYuZhiGuang:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('zhiYuZhiGuang');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('zhiYuZhiGuang');
                    });
				},
				prompt:'指定最多3名角色各+1[治疗]。',
                filterTarget:true,
                selectTarget:[0,3],
                discard:false,
                prepare:'useCard',
                content:function(){
                    if(target){
                        target.changeZhiLiao(1);
                    }
                },
                ai: {
					result: {
						target:function(player,target){
                            return get.zhiLiaoEffect(target,1);
                        },
					},
					order: 3.5,
				},
            },
            lianMin:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    player.hengZhi();
                    player.addNengLiang('b');
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isLinked()) return 7
                    }
                },
                check:function(event,player){
                    return !player.isLinked();
                },
                ai:{
                    baoShi:true,
                }
            },
            shengLiao:{
                type:'faShu',
                usable:1,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                selectTarget:[1,3],
                filterTarget:true,
                contentBefore:function(){
                    player.removeBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    if(targets.length==1){
                        target.changeZhiLiao(3);
                        event.finish();
                    }else if(targets.length==3||player.storage.shengLiao==2){
                        target.changeZhiLiao(1);
                        event.finish();
                    }else if(player.storage.shengLiao==1){
                        target.changeZhiLiao(2);
                        event.finish();
                    }else{
                        var list=['1','2'];
                        var name=get.translation(target)
                        player.chooseControl(list).set('prompt',name+'获得1[治疗]或2[治疗]');
                    }
                    'step 1'
                    if(result.control=='1'){
                        target.changeZhiLiao(1);
                        player.storage.shengLiao=1;
                    }else if(result.control=='2'){
                        target.changeZhiLiao(2);
                        player.storage.shengLiao=2;
                    }
                },
                contentAfter:function(){
                    player.storage.shengLiao=0;
                    player.chooseToUse();
                },
                ai: {
                    shuiJing:true,
					result: {
						target:function(player,target){
                            return get.zhiLiaoEffect(target,1);
                        },
					},
					order: 5,
				},
            },

            //暗杀者
            fanShi:{
                trigger:{player:"damageEnd"},
                forced:true,
                filter:function(event){
                    return event.faShu!=true;
                },
                content:function(){
                    trigger.source.draw();
                }
            },
            shuiYing:{
                trigger:{player:'drawBefore'},
                filter:function(event,player){
                    return event.yuanYin!="teShuXingDong"&&player.countCards('h')>0;
                },
                direct:true,
                content:function(event,player){
                    'step 0'
                    var next=player.chooseToDiscard([1,Infinity],function(card){
                        return get.xiBie(card)=='shui';
                    });
                    next.set('prompt',get.prompt('shuiYing'));
                    next.set('prompt2',lib.translate.shuiYing_info);
                    next.ai=function(card){
						return 1;
					}
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.showCards(result.cards);
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(!player.isLinked()) event.finish();
                    'step 3'
                    var next=player.chooseToDiscard(1,'水影：选择要弃置的法术牌',function(card){
                        return get.type(card)=='faShu';
                    });
                    next.ai=function(card){
						return 1;
					}
                    'step 4'
                    if(result.bool){
                        player.showCards(result.cards);
                    }

                }
            },
            qianXing:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    var list=['是','否'];
                    player.chooseControl(list).set('prompt','潜行：是否摸一张牌').set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')+2<=player.getHandcardLimit()) return 0;
                        return 1;
                    });
                    'step 1'
                    if(result.control=='是'){
                        player.draw();
                    }
                    'step 2'
                    player.hengZhi();
                    'step 3'
                    var num=player.needsToDiscard();
                    if(num>0){
						player.chooseToDiscard(num,true).set('useCache',true).set('baoPai',true);
					}
                    'step 4'
                    player.addSkill('qianXing2');
                },
                mod:{
                    maxHandcardBase:function(player,num){
                        if(player.isLinked()) return num-1;
                    },
                    targetEnabled:function(card,player,target){
                        if(get.type(card)=='gongJi'&&target.isLinked()) return false;
                    }
                },
                group:'qianXing_chongZhi',
                subSkill:{
                    chongZhi:{
                        direct:true,
                        priority:3,
                        trigger:{player:'phaseUseBegin'},
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.removeSkill('qianXing2');
                        }
                    }
                },
                ai:{
                    baoShi:true,
                },
                check:function(event,player){
                    if(player.countNengLiangAll()<=1) return false;
                    return true;
                },
            },
            qianXing2:{
                group:['qianXing2_shangHai','qianXing2_wuFaYingZhan'],
                subSkill:{
                    shangHai:{
                        forced:true,
                        trigger:{player:"useCardToTargeted"},
                        filter:function(event,player){
                            if(event.getParent().yingZhan==true) return false;
                            return true;
                        },
                        content:function(){
                            var num=player.countMark('_tiLian_r')+player.countMark('_tiLian_b');
                            trigger.getParent().baseDamage+=num;
                        }
                    },
                    wuFaYingZhan:{
                        forced:true,
                        trigger:{player:'useCardToPlayer'},
                        filter:function(event,player){
                            if(event.getParent().yingZhan==true) return false;
                            if(get.type(event.card)=='gongJi') return true;
                        },
                        content:function(){
                            trigger.getParent().canYingZhan=false;
                        }
                    },
                    
                }
            },
            
            //封印师
            faShuJiDang:{
                trigger:{player:['useCardAfter','useSkillAfter']},
                filter:function(event,player){
                    //if(event.selected) return false;
                    return get.is.faShuXingDong(event);
                },
                content:function(){
                    //trigger.selected=true;
                    player.storage.gongJi++;
                }
            },
            diZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('diZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('diZhiFengYin');
                    })
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('diZhiFengYin_xiaoGuo')
                },
                prepare:'useCard',
                discard:false,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('diZhiFengYin_xiaoGuo')){
                        target.addSkill('diZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('diZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"地",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('diZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(player.hasZhiShiWu('jueJieX')) return false;

                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            
                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='di'){
                                    return true;
                                }
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('diZhiFengYin_xiaoGuo'));
                            player.removeSkill('diZhiFengYin_xiaoGuo')
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            shuiZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('shuiZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('shuiZhiFengYin');
                    });
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('shuiZhiFengYin_xiaoGuo')
                },
                prepare:'useCard',
                discard:false,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('shuiZhiFengYin_xiaoGuo')){
                        target.addSkill('shuiZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('shuiZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"水",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('shuiZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(player.hasZhiShiWu('jueJieX')) return false;

                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='shui'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('shuiZhiFengYin_xiaoGuo'));
                            player.removeSkill('shuiZhiFengYin_xiaoGuo')
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            huoZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('huoZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('huoZhiFengYin');
                    });
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('huoZhiFengYin_xiaoGuo')
                },
                prepare:'useCard',
                discard:false,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('huoZhiFengYin_xiaoGuo')){
                        target.addSkill('huoZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('huoZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"火",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('huoZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(player.hasZhiShiWu('jueJieX')) return false;

                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='huo'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('huoZhiFengYin_xiaoGuo'));
                            player.removeSkill('huoZhiFengYin_xiaoGuo')
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            fengZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('fengZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('fengZhiFengYin');
                    });
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('fengZhiFengYin_xiaoGuo')
                },
                prepare:'useCard',
                discard:false,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('fengZhiFengYin_xiaoGuo')){
                        target.addSkill('fengZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('fengZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"风",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('fengZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(player.hasZhiShiWu('jueJieX')) return false;

                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='feng'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('fengZhiFengYin_xiaoGuo'));
                            player.removeSkill('fengZhiFengYin_xiaoGuo')
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            leiZhiFengYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('leiZhiFengYin');
				},
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('leiZhiFengYin');
                    });
				},
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side&&!target.hasExpansions('leiZhiFengYin_xiaoGuo')
                },
                prepare:'useCard',
                discard:false,
                content:function(){
                    'step 0'
                    if(!target.hasSkill('leiZhiFengYin_xiaoGuo')){
                        target.addSkill('leiZhiFengYin_xiaoGuo');
                    }
                    'step 1'
                    target.storage.fengYin=player;
                    target.addToExpansion(cards,'gain2',player).gaintag.add('leiZhiFengYin_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"雷",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:['useCard1','showCardsEnd']},
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(!player.hasExpansions('leiZhiFengYin_xiaoGuo')){
                                return false
                            }
                            if(player.hasZhiShiWu('jueJieX')) return false;

                            if(event.name=='showCards'){
                                if(event.gaiPai==true) return false;
                            }
                            for(var card of event.cards){
                                if(event.name!='showCards'){
                                    if(card.original != "h") continue;
                                }
                                if(get.xiBie(card)=='lei'){
                                    return true;
                                };
                            }
                            return false;
                        },
                        content:function(player){
                            var next=player.damage(player.storage.fengYin,3);
                            next.faShu=true;
                            player.loseToDiscardpile(player.getExpansions('leiZhiFengYin_xiaoGuo'));
                            player.removeSkill('leiZhiFengYin_xiaoGuo')
                        }
                    },
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>3) return -3;
                            return -1;
                        }
                    }
                }
            },
            wuXiShuFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    return true;
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.addSkill('wuXiShuFu_xiaoGuo')
					target.addMark('wuXiShuFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        priority:2,
                        trigger:{player:'phaseUseBefore'},
                        forced:true,
                        markimage:'image/card/wuXiShuFu.png',
                        intro:{
                            content:'(将【五系束缚】放置于目标对手面前)该对手跳过其下个行动阶段。在其下个行动阶段开始前他可以选择摸(2+X)张牌来取消【五系束缚】的效果。X为场上封印的数量，X最高为2。无论效果是否发动，触发后移除此牌。',
                            nocount:true,
                        },
                        filter:function(event,player){
                            return player.hasMark('wuXiShuFu_xiaoGuo');
                        },
                        content:function(event,player){
                            'step 0'
                            event.x=0;
                            for(var p of game.players){
                                if(event.x>=2){
                                    event.x=2;
                                    break;
                                }
                                for(var xiaoGuo of game.jiChuXiaoGuo.fengYinShi){
                                    if(p.hasExpansions(xiaoGuo)){
                                        event.x++;
                                    }
                                }
                            }
                            var num;
                            num=2+event.x;

                            var list=[`摸2+${event.x}张牌`,'跳过行动阶段'];
                            if(player.hasExpansions('_xuRuo')){
                                list[0]=`摸2+3+${event.x}张牌`;
                                num+=3;
                            }
                            player.chooseControl().set('choiceList',list).set('prompt','五系束缚：选择一项').set('ai',function(){
                                var player=_status.event.player;
                                var num=_status.event.num;
                                if(player.countCards('h')+num>player.getHandcardLimit()){
                                    return 1;
                                }else{
                                    return 0;
                                }
                            }).set('num',num);
                            'step 1'
                            if(result.index==1){
                                player.addTempSkill('xuRuo_xiaoGuo');
                            }else if(result.index==0){
                                if(player.hasExpansions('_xuRuo')){
                                    player.draw(2+3+event.x);
                                }else{
                                    player.draw(2+event.x);
                                }
                               
                            }
                            player.removeMark('wuXiShuFu_xiaoGuo');
                            if(player.hasExpansions('_xuRuo')){
                                player.loseToDiscardpile(player.getExpansions('_xuRuo')); 
                            }
                            player.removeSkill('wuXiShuFu_xiaoGuo');
                        },
                    }
                },
                ai:{
                    shuiJing:true,
                    order:4,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')>4) return -3;
                            return -1;
                        }
                    }
                }
            },
            fengYinPoSui:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    for(var p of game.players){
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(p.hasExpansions(xiaoGuo)){
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                },
                filterTarget:function(card,player,target){
                    for(var xiaoGuoList in game.jiChuXiaoGuo){
                        for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                            if(target.hasExpansions(xiaoGuo)){
                                return true;
                            }
                        }
                    }
                },
                selectTarget:1,
                content:function(player,event){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    var list=[];
                    for(var xiaoGuoList in game.jiChuXiaoGuo){
                        for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                            if(target.hasExpansions(xiaoGuo)){
                                list.push(xiaoGuo);
                            }
                        }
                    }
                    player.chooseControl(list).set('prompt','选择要获得的基础效果').set('ai',function(){
                        var player=_status.event.player;
                        var target=_status.event.targetX;
                        var list=_status.event.listX;
                        if(target.side==player.side){
                            if(list.includes('_xuRuo')) return '_xuRuo';
                            for(var xiaoGuo of game.jiChuXiaoGuo['fengYinShi']){
                                if(list.includes(xiaoGuo)){
                                    return xiaoGuo;
                                }
                            }
                            if(list.includes('_zhongDu')&&!target.hasSkillTag('one_damage')) return '_zhongDu';
                            return 0;
                        }else{
                            if(list.includes('_shengDun')){
                                return '_shengDun';
                            }
                            for(var xiaoGuo of game.jiChuXiaoGuo['qiDaoShi']){
                                if(list.includes(xiaoGuo)){
                                    return xiaoGuo;
                                }
                            }
                            return 0;
                        }
                    }).set('targetX',target).set('listX',list);
                    'step 2'
                    if(result.control=='_zhongDu'){
                        player.chooseCardButton(target.getExpansions('_zhongDu'),true,'选择要获得的中毒')
                    }else{
                        game.log(player,'获得了',target.getExpansions(result.control));
                        player.gain(target.getExpansions(result.control));
                        if(!game.jiChuXiaoGuo.pai.includes(result.control)){
                            target.removeSkill(result.control);
                        }
                        event.finish();
                    }
                    'step 3'
                    var card=result.links[0];
                    var list=target.getExpansions('_zhongDu');
                    var index=list.indexOf(card);
                    target.storage.zhongDu.splice(index, 1);
                    game.log(player,'获得了',card);
                    player.gain(card);
                },
                ai:{
                    shuiJing:true,
                    order:3.5,
                    result:{
                        target:function(player,target){
                            var shiQi=get.shiQi(player.side);
                            if(shiQi<=5&&player.countEmptyCards<=0) return false; 

                            return get.jiChuXiaoGuoEffect(target);
                        }
                    }
                }
            },

            //天使
            fengZhiJieJing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.countCards('h',function(card){
                        return get.xiBie(card)=='feng';
                    })){
                        return false;
                    }
                    for(var p of game.players){
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(p.hasExpansions(xiaoGuo)){
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                },
                filterCard:function(card){
                    return get.xiBie(card)=='feng';
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    for(var xiaoGuoList in game.jiChuXiaoGuo){
                        for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                            if(target.hasExpansions(xiaoGuo)){
                                return true;
                            }
                        }
                    }
                },
                prepare:'showCards',
                content:function(){
                    'step 0'
                    var list=[];
                    for(var xiaoGuoList in game.jiChuXiaoGuo){
                        for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                            if(target.hasExpansions(xiaoGuo)){
                                list.push(xiaoGuo);
                            }
                        }
                    }
                    player.chooseControl(list).set('prompt','选择要移除的基础效果').set('ai',function(){
                        var player=_status.event.player;
                        var target=_status.event.targetX;
                        var list=_status.event.listX;
                        if(target.side==player.side){
                            if(list.includes('_xuRuo')) return '_xuRuo';
                            for(var xiaoGuo of game.jiChuXiaoGuo['fengYinShi']){
                                if(list.includes(xiaoGuo)){
                                    return xiaoGuo;
                                }
                            }
                            if(list.includes('_zhongDu')&&!target.hasSkillTag('one_damage')) return '_zhongDu';
                            return 0;
                        }else{
                            if(list.includes('_shengDun')){
                                return '_shengDun';
                            }
                            for(var xiaoGuo of game.jiChuXiaoGuo['qiDaoShi']){
                                if(list.includes(xiaoGuo)){
                                    return xiaoGuo;
                                }
                            }
                            return 0;
                        }
                    }).set('targetX',target).set('listX',list);
                    'step 1'
                    if(result.control=='_zhongDu'){
                        player.chooseCardButton(target.getExpansions('_zhongDu'),true,'选择要移除的中毒')
                    }else{
                        target.loseToDiscardpile(target.getExpansions(result.control));
                        if(!game.jiChuXiaoGuo.pai.includes(result.control)){
                            target.removeSkill(result.control);
                        }
                        event.trigger('yiChuJiChuXiaoGuo');
                        event.finish();
                    }
                    'step 2'
                    var card=result.links[0];
                    var list=target.getExpansions('_zhongDu');
                    var index=list.indexOf(card);
                    target.storage.zhongDu.splice(index, 1);
                    target.loseToDiscardpile(card);
                    event.trigger('yiChuJiChuXiaoGuo');
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.jiChuXiaoGuoEffect(target);
                        }
                    }
                }
            },
            tianShiZhuFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',function(card){
                        return get.xiBie(card)=='shui';
                    });
                },
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                selectCard:1,
                selectTarget:[1,2],
                filterTarget:true,
                prepare:'showCards',
                content:function(){
                    'step 0'
                    if(targets.length==1){
                        if(target.countCards('h')>=2){
                            target.chooseCard('交给守护天使2张牌',true,2);
                        }else if(target.countCards('h')==1){
                            target.chooseCard('交给守护天使1张牌',true,1);
                        }else if(target.countCards('h')==0){
                            event.finish();
                        }
                    }else if(targets.length==2){
                        if(target.countCards('h')>=1){
                            target.chooseCard('交给守护天使1张牌',true,1);
                        }else{
                            event.finish();
                        }
                    }
                    'step 1'
                    target.give(result.cards,player,'give');
                },
                ai:{
                    order:3,
                    result:{
                        target:function(player,target){
                            return 1;
                        },
                        player:0,
                    }
                }
            },
            tianShiJiBan:{
                group:['tianShiJiBan_1','tianShiJiBan_2'],
                subSkill:{
                    1:{
                        trigger:{player:'yiChuJiChuXiaoGuo'},
                        forced:true,
                        content:function(){
                            'step 0'
                            player.chooseTarget('天使羁绊：选择一名角色+1[治疗]',true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,1);
                            });
                            'step 1'
                            if(result.bool){
                                var target=result.targets[0];
                                game.log(player,'选择了',target);
                                player.line(target,'blue');
                                target.changeZhiLiao();
                            }
                        }
                    },
                    2:{
                        trigger:{player:'useCard'},
                        filter:function(event){
                            return event.card.name=='shengDun';
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            player.chooseTarget('天使羁绊：选择一名角色+1[治疗]',true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,1);
                            });
                            'step 1'
                            if(result.bool){
                                var target=result.targets[0];
                                game.log(player,'选择了',target);
                                player.line(target,'blue');
                                target.changeZhiLiao();
                            }
                        }
                    },
                }
            },
            tianShiZhiQiang:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('tianShiZhiQiang');
				},
				position:'h',
				viewAs:{name:'shengDun'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return card.hasNature('tianShiZhiQiang');
                    });
				},
                ai:{
                    order:4,
                }
            },
            tianShiZhiGe:{
                trigger:{player:'phaseBegin'},
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    for(var p of game.players){
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(p.hasExpansions(xiaoGuo)){
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseTarget(function(card,player,target){
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(target.hasExpansions(xiaoGuo)){
                                    return true;
                                }
                            }
                        }
                    });
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        if(target.side==player.side){
                            return get.jiChuXiaoGuoEffect(target);
                        }else{
                            return -get.jiChuXiaoGuoEffect(target);
                        }
                    });
                    next.set('prompt',get.prompt('tianShiZhiGe'));
                    next.set('prompt2',lib.translate.tianShiZhiGe_info);
                    'step 1'
                    if(result.bool){
                        var target=result.targets[0];
                        event.target=target;
                        player.logSkill(event.name,result.targets);
                        player.line(target,'blue');
                        player.removeBiShaShuiJing();

                        var list=[];
                        for(var xiaoGuoList in game.jiChuXiaoGuo){
                            for(var xiaoGuo of game.jiChuXiaoGuo[xiaoGuoList]){
                                if(target.hasExpansions(xiaoGuo)){
                                    list.push(xiaoGuo);
                                }
                            }
                        }
                        player.chooseControl(list).set('prompt','选择要移除的基础效果').set('ai',function(){
                            var player=_status.event.player;
                            var target=_status.event.targetX;
                            var list=_status.event.listX;
                            if(target.side==player.side){
                                if(list.includes('_xuRuo')) return '_xuRuo';
                                for(var xiaoGuo of game.jiChuXiaoGuo['fengYinShi']){
                                    if(list.includes(xiaoGuo)){
                                        return xiaoGuo;
                                    }
                                }
                                if(list.includes('_zhongDu')&&!target.hasSkillTag('one_damage')) return '_zhongDu';
                                return 0;
                            }else{
                                if(list.includes('_shengDun')){
                                    return '_shengDun';
                                }
                                for(var xiaoGuo of game.jiChuXiaoGuo['qiDaoShi']){
                                    if(list.includes(xiaoGuo)){
                                        return xiaoGuo;
                                    }
                                }
                                return 0;
                            }
                        }).set('targetX',target).set('listX',list);
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(result.control=='_zhongDu'){
                        player.chooseCardButton(target.getExpansions('_zhongDu'),true,'选择要移除的中毒')
                    }else{
                        target.loseToDiscardpile(target.getExpansions(result.control));
                        if(!game.jiChuXiaoGuo.pai.includes(result.control)){
                            target.removeSkill(result.control);
                        }
                        event.trigger('yiChuJiChuXiaoGuo');
                        event.finish();
                    }
                    'step 3'
                    var card=result.links[0];
                    var list=target.getExpansions('_zhongDu');
                    var index=list.indexOf(card);
                    target.storage.zhongDu.splice(index, 1);
                    target.loseToDiscardpile(card);
                    event.trigger('yiChuJiChuXiaoGuo');
                },
                ai:{
                    shuiJing:true,
                }
            },
            shenZhiBiHu:{
                trigger:{global:'changeShiQi2'},
                priority:1,
                filter:function(event,player){
                    if(event.side!=player.side){
                        return false;
                    }
                    if(!player.canBiShaShuiJing()){
                        return false;
                    }
                    if(event.yuanYin!="damage"){
                        return false;
                    }
                    if(event.faShu!=true){
                        return false;
                    }
                    if(event.num>=0){//只有小于0为士气降低
                        return false;
                    }
                    return true;
                },
                direct:true,
                content:function(player){
                    'step 0'
                    var list=[];
                    for(var i=0;i<player.countMark('_tiLian_r');i++){
                        list.push('宝石');
                    }
                    for(var i=0;i<player.countMark('_tiLian_b');i++){
                        list.push('水晶');
                    }
                    var next=player.chooseButton(['是否发动【神之庇护】'+lib.translate.shenZhiBiHu_info,[list,'tdnodes']]);
                    next.set('selectButton',[1,-trigger.num])
                    'step 1'
                    if(result.bool){
                        var num=result.links.length;
                        player.logSkill(event.name);
                        if(num>0){
                            trigger.num+=num;
                            for(var i=0;i<result.links.length;i++){
                                if(result.links[i]=='宝石'){
                                    player.removeMark('_tiLian_r');
                                }else if(result.links[i]=='水晶'){
                                    player.removeMark('_tiLian_b');
                                }
                            }
                        }  
                    }else{
                        event.finish();
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            
            //神箭手
            shanDianJian:{
                forced:true,
                trigger:{player:"useCardToPlayer"},
                filter:function(event){
                    if(get.xiBie(event.card)=='lei'&&get.type(event.card)=='gongJi'){
                        return true;
                    }
                    return false;
                },
                content:function(){
                    trigger.getParent().canYingZhan=false;
                }
            },
            guanChuanSheJi:{
                trigger:{source:"gongJiWeiMingZhong"},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(_status.connectMode) return true;
                    if(player.countCards('h',card=>get.type(card)=='faShu')>0){
                        return true;
                    }else{
                        return false;
                    }
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard(1,function(card){
                        return get.type(card)=='faShu';
                    });
                    next.set('prompt',get.prompt('guanChuanSheJi'));
                    next.set('prompt2',lib.translate.guanChuanSheJi_info);
                    next.set('ai',function(card){
                        return 6-get.value(card);
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,trigger.player);
                        player.showCards(result.cards);
                        var next=trigger.player.damage(2,player);
                        next.faShu=true;
                    }else{
                        event.finish();
                    }
                    
                    
                }
            },
            shanGuangXianJing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				filterCard:function(card){
                    return card.hasNature('shanGuangXianJing');
				},
                selectCard:1,
				position:'h',
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('shanGuangXianJing');
                    });
				},
                selectTarget:1,
                filterTarget:true,
                useCard:true,
                content:function(){
                    target.damageFaShu(2,player);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')+2>target.getHandcardLimit()) return -1;
                            return -0.1;
                        }
                    }
                }
            },
            jingZhunSheJi:{
                trigger:{player:'useCard'},
                filter:function(event,player){
                    return event.card.hasNature('jingZhunSheJi');
                },
                content:function(){
                    player.addTempSkill('jingZhunSheJi2',{player:['useCardBefore','phaseEnd']});
                },
                check:function(event,player){
                    return event.targets[0].countCards('h')>3;
                }
            },
            jingZhunSheJi2:{
                forced:true,
                trigger:{player:'useCardToPlayer'},
                content:function(){
                    trigger.getParent().canShengDun=false;
                    trigger.getParent().canShengGuang=false;
                    trigger.getParent().canYingZhan=false;
                    trigger.getParent().baseDamage--;
                },
            },
            juJi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    target.drawTo(5);
                    player.storage.gongJi++;
                },
                ai:{
                    shuiJing:true,
                    order:4,
                    result:{
                        target:function(player,target){
                            var num=target.countCards('h');
                            if(target.getHandcardLimit()<5) return -5;
                            if(num>=5) return 0;
                            return -0.1;
                        }
                    }
                }
            },
            
            //魔法少女
            moBaoChongJi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='faShu');
                },
                selectTarget:2,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                prepare:'showCards',
                contentBefore:function(){
                    player.changeZhanJi('r',1);
                },
                content:function(){
                    'step 0'
                    var name=get.translation(player);
                    target.chooseToDiscard(`弃置1张法术牌，否则${name}对你造成2点法术伤害③，${name}弃一张牌`,1,function(card){
                        return get.type(card)=='faShu';
                    }).set('ai',function(){
                        return 1;
                    })
                    'step 1'
                    if(result.bool){
                        target.showCards(result.cards);
                    }else{
                        var next=target.damage(2,player);
                        next.faShu=true;
                        if(player.countCards('h')>=1){
                            player.chooseToDiscard(1,true);
                        }
                    }
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            var chaZhi=target.getHandcardLimit()-target.countCards('h');
                            if(chaZhi<=1) return -2;
                            else return -0.1;
                        }
                    }
                }
            },
            moDanZhangWo:{
                trigger:{player:'useCardBefore'},
                forced:true,
                filter:function(event,player){
                    if(player.storage.moDan==true) return false;
                    if(get.name(event.card)!='moDan') return false;
                    var range_l=0,range_r=0;
                    var target=player;
                    while(target!=event.targets[0]){
                        target=target.getPrevious();
                        range_l++;
                    }
                    target=player;
                    while(target!=event.targets[0]){
                        target=target.getNext();
                        range_r++;
                    }
                    if(range_l==range_r){
                        if(player.side==player.getNext().side){
                            return false;
                        }else{
                            return true;
                        }
                    }
                    return range_l<range_r;
                },
                content:function(){
                    game.broadcastAll(function(){
                        game.moDan_shunShiZhen=true;
                    });
                },
                mod:{
                    playerEnabled:function(card,player,target){
                        if(player.storage.moDan==true) return;
                        if(get.name(card)=='moDan'){
                            var mubiao=player.getPrevious();
                            while(mubiao.side==player.side){
                                mubiao=mubiao.getPrevious();
                                while(mubiao.storage.moDan==true){
                                    mubiao=mubiao.getPrevious();
                                }
                            }
						    if(target==mubiao) return true;
                        }
                    }
                }
            },
            moDanRongHe:{
                enable:['chooseToUse','faShu','chooseToUse_qiTa'],
				filterCard:function(card){
                    return get.xiBie(card)=='di'||get.xiBie(card)=='huo';
				},
				position:'h',
				viewAs:{name:'moDan'},
				viewAsFilter:function(player){
                    return player.countCards('h',function(card){
                        return get.xiBie(card)=='di'||get.xiBie(card)=='huo';
                    });
				},
                ai:{
                    order:3.5,
                }
            },
            huiMieFengBao:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                selectTarget:2,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                contentBefore:function(){
                    player.removeBiShaBaoShi();
                },
                content:function(){
                    var next=target.damage(2,player);
                    next.faShu=true;
                },
                ai:{
                    baoShi:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,player,2);
                        }
                    }
                }
            },

            //女武神
            shenShengZhuiJi:{
                trigger:{player:['useCardAfter','useSkillAfter']},
                filter:function(event,player){
                    return player.zhiLiao>0&&(get.is.faShuXingDong(event)||get.is.gongJiXingDong(event));
                },
                content:function(){
                    player.changeZhiLiao(-1);
                    player.storage.gongJi++;
                }
            },
            zhiXuZhiYin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                content:function(){
                    'step 0'
                    player.draw(2);
                    'step 1'
                    player.changeZhiLiao(1);
                    player.addNengLiang('b');
                },
                ai:{
                    order:4,
                    result:{
                        player:function(player, target){
                            if(player.isLinked()) return -1;
                            if(player.countCards('h')+2>player.getHandcardLimit()) return -1;
                            else return 1;
                        },
                    }
                }
            },
            hePingXingZhe:{
                group:'hePingXingZhe_chongZhi',
                forced:true,
                trigger:{player:"yingLingZhaoHuan"},
                filter:function(event,player){
                    if(_status.currentPhase!=player) return false;
                    return !player.isLinked();
                },
                content:function(){
                    player.storage.yingLingXingTai=true;
                    player.hengZhi();
                },
                subSkill:{
                    chongZhi:{
                        forced:true,
                        trigger:{player:'useCardToPlayer'},
                        priority:99,
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            if(get.type(event.card)!= 'gongJi') return false;
                            if(event.getParent().yingZhan==true) return false;
                            return true;
                        },
                        content:function(){
                            player.chongZhi();
                            
                        }
                    }
                }
            },
            junShenWeiGuan:{
                forced:true,
                trigger:{player:'phaseBegin'},
                filter:function(event,player){
                    return player.isLinked();
                },
                content:function(){
                    'step 0'
                    var choiceList=['你+1[治疗]，[重置]脱离【英灵形态】','(移除我方【战绩区】X个星石，X<3)目标角色+X[治疗]'];
                    var choices=['选择一'];
                    if(player.side==true){
                        var list=game.hongZhanJi;
                    }else if(player.side==false){
                        var list=game.lanZhanJi;
                    }
                    if(list.length>=1){
                        choices.push('选项二');
                    }
                    player.chooseControl(choices).set('prompt','军光神威：选择一项').set('choiceList',choiceList);
                    'step 1'
                    if(result.index==0){
                        player.changeZhiLiao(1);
                        player.chongZhi();
                        event.finish();
                    }else if(result.index==1){
                        if(player.side==true){
                            var list=game.hongZhanJi;
                        }else{
                            var list=game.lanZhanJi;
                        }
                        var next=player.chooseButton([
                            '移除X个星石，X<3',
                            [list,'tdnodes'],
                        ]);
                        next.set('forced',true);
                        next.set('selectButton',[1,2]);
                    }
                    'step 2'
                    event.number=result.links.length;
                    var number=event.number;
                    for(var i=0;i<result.links.length;i++){
						if(result.links[i]=='宝石'){
							player.changeZhanJi('r',-1);
						}else if(result.links[i]=='水晶'){
							player.changeZhanJi('b',-1);
						}
					}
                    player.chooseTarget(1,true,'选择一个目标角色+'+number+'[治疗]').set('ai',function(target){
                        var player=_status.event.player;
                        var number=_status.event.number;
                        return get.zhiLiaoEffect2(target,player,number);
                    }).set('number',number);
                    'step 3'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'blue');
                    result.targets[0].changeZhiLiao(event.number);
                }
            },
            yingLingZhaoHuan:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    trigger.getParent().baseDamage+=1;
                    'step 2'
                    player.chooseCardTarget({
                        filterCard:function(card){
                            return get.type(card)=='faShu';
                        },
                        filterTarget:true,
                        prompt:"<span class='tiaoJian'>(若你额外弃置1张法术牌[展示])</span>目标角色+1[治疗]",
                        ai1(card) {
                            return 6- get.value(card);
                        },
                        ai2(target) {
                            return get.zhiLiaoEffect2(target,player,1);
                        },
                    });
                    'step 3'
                    if(result.bool){
                        player.discard(result.cards);
                        player.showCards(result.cards);
                        event.target=result.targets[0];
                    }else{
                        event.goto(5);
                    }
                    'step 4'
                    event.target.changeZhiLiao(1);
                    'step 5'
                    event.player=player;
                    event.trigger('yingLingZhaoHuan')
                },
                ai:{
                    shuiJing:true,

                }
            },

            //元素师
            yuanSuXiShou:{
                trigger:{source:'damageBegin0'},
                filter:function(event,player){
                    if(player.countMark('yuanSu')>=3) return false;
                    if(event.faShu!=true) return false;
                    if(event.yuanSuDianRan==true) return false;
                    return true;
                },
                content:function(){
                    player.addMark('yuanSu');
                }
            },
            yuanSuDianRan:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countMark('yuanSu')>=3
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeMark('yuanSu',3);
                    'step 1'
                    target.damage(2,player).set('faShu',true).set('yuanSuDianRan',true);
                    'step 2'
                    player.storage.faShu++;
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            yunShi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasNature('yunShi');
                    }else{
                        return get.xiBie(card)=='di'
                    }
                },
                discard:false,
                filterOk:function(){
                    return ui.selected.cards[0].hasNature('yunShi')
                },
                complexCard:true,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.showCards(cards[1]);
                    }
                },
				position:'h',
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('yunShi');
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.damageFaShu(event.num,player);
                    'step 2'
                    player.storage.faShu++;
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            bingDong:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasNature('bingDong');
                    }else{
                        return get.xiBie(card)=='shui'
                    }
                },
                filterOk:function(){
                    return ui.selected.cards[0].hasNature('bingDong');
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.showCards(cards[1]);
                    }
                },
				position:'h',
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('bingDong');
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.damageFaShu(event.num,player);
                    'step 2'
                    player.chooseTarget(1,'冰冻：选择1名角色+1[治疗]',true).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 3'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'blue');
                        result.targets[0].changeZhiLiao(1);
                    }
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            huoQou:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasNature('huoQou');
                    }else{
                        return get.xiBie(card)=='huo'
                    }
                },
                filterOk:function(){
                    if(ui.selected.cards[0].hasNature('huoQou')){
                        return true;
                    }else{
                        return false;
                    }
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.showCards(cards[1]);
                    }
                },
				position:'h',
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('huoQou');
                    });
				},
                content:function(){
                    'step 0'
                    event.num=2;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.damageFaShu(event.num,player);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            fengRen:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasNature('fengRen');
                    }else{
                        return get.xiBie(card)=='feng'
                    }
                },
                filterOk:function(){
                    return ui.selected.cards[0].hasNature('fengRen')
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.showCards(cards[1]);
                    }
                },
				position:'h',
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('fengRen');
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.damageFaShu(event.num,player);
                    'step 2'
                    player.storage.gongJi++;
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            leiJi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
				selectCard:[1,2],
                filterCard:function(card){
                    if(ui.selected.cards.length==0){
                        return card.hasNature('leiJi');
                    }else{
                        return get.xiBie(card)=='lei'
                    }
                },
                filterOk:function(){
                    return ui.selected.cards[0].hasNature('leiJi')
                },
                complexCard:true,
                discard:false,
                prepare:function(cards,player,targets){
                    if(cards.length==1){
                        player.useCard(cards);
                    }else{
                        player.useCard(cards[0]);
                        player.showCards(cards[1]);
                    }
                },
				position:'h',
                selectTarget:1,
                filterTarget:true,
				filter:function(event,player){
                    return player.countCards('h',function(card){
                        return card.hasNature('leiJi');
                    });
				},
                content:function(){
                    'step 0'
                    event.num=1;
                    if(cards.length==2){
                        event.num++;
                    }
                    'step 1'
                    target.damageFaShu(event.num,player);
                    'step 2'
                    player.changeZhanJi('r',1);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target);
                        }
                    }
                }
            },
            yueGuang:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                filterTarget:true,
                selectTarget:1,
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var num=player.countNengLiang('r')+player.countNengLiang('b')+1;
                    event.num=num;
                    'step 2'
                    var next=target.damage(event.num,player);
                    next.faShu=true;
                },
                ai:{
                    baoShi:true,
                    order:function(item,player){
                        return 3.4+(player.countNengLiangAll()-1)*0.1;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            yuanSu:{
                intro:{
                    name:'元素',
                    content:'mark',
                },
                markimage:'image/card/hong.png',
            },

            //月之女神
            xinYueBiHu:{
                trigger:{global:'changeShiQi2'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    if(event.side!=player.side) return false;
                    if(event.num>=0) return false;
                    if(event.yuanYin!='damage') return false;
                    if(!event.cards) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    var cards=trigger.cards;
                    if(cards){
                        player.addToExpansion('draw',trigger.cards,'log').gaintag.add('anYue');
                    }
                    'step 2'
                    trigger.cancel();
                }
            },
            anYueZuZhou:{
                trigger:{player:'yiChuAnYue'},
                forced:true,
                content:function(){
                    'step 0'
                    player.changeShiQi(-1);
                    'step 1'
                    if(player.getExpansions('anYue').length==0){
                        player.chongZhi();
                    }
                }
            },
            meiDuShaZhiYan:{
                trigger:{global:'useCard'},
                lastDo:true,
                filter:function(event,player){
                    if(event.player.side==player.side) return false;
                    if(get.type(event.card)!='gongJi') return false;
                    if(event.card.isCard!=true) return false;
                    if(event.targets.length<=0) return false;
                    var anYue=player.getExpansions('anYue');
                    if(_status.connectMode&&anYue.length>0) return true;
                    for(var i=0;i<anYue.length;i++){
                        if(get.xiBie(anYue[i])==get.xiBie(event.card)) return true;
                    }
                    return false;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('anYue');
                    var next=player.chooseCardButton(cards,'是否发动【美杜莎之眼】'+lib.translate.meiDuShaZhiYan_info);
                    next.set('filterButton',function(button){
                        return get.xiBie(button)==get.xiBie(_status.event.trigger_card);
                    });
                    next.set('trigger_card',trigger.card);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        var card=result.links[0];
                        event.card=card;
                        player.discard(card,'anYue');
                        player.showCards(card).set('gaiPai',true);
                        event.trigger('yiChuAnYue');
                    }else{
                        event.finish();
                    }
                    
                    'step 2'
                    player.changeZhiLiao(1);
                    if(player.countMark('shiHua')<3){
                        player.addMark('shiHua');
                    }
                    'step 3'
                    if(get.type(event.card)=='faShu'){
                        if(player.countCards('h')>0){
                            player.chooseToDiscard('h',true);
                        }
                    }else{
                        event.finish();
                    }
                    'step 4'
                    player.chooseTarget(1,'美杜莎之眼：目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 5'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'red');
                        result.targets[0].damage(1,player).set('faShu',true);
                    }
                }

            },
            yueZhiLunHui:{
                trigger:{player:'phaseEnd'},
                priority:1,
                filter:function(event,player){
                    return player.zhiLiao>0||player.getExpansions('anYue').length>0;
                },
                content:function(){
                    'step 0'
                    var choices=[];
                    var choiceList=['<span class="tiaoJian">(移除1个【暗月】)</span>目标角色+1[治疗]',"<span class='tiaoJian'>(移除你的1[治疗])</span>你+1<span class='hong'>【</span>新月<span class='hong'>】</span>"];
                    if(player.getExpansions('anYue').length>0){
                        choices.push('选项一');
                    }
                    if(player.zhiLiao>0){
                        choices.push("选项二");
                    }
                    player.chooseControl(choices).set('prompt',"月之轮回：选择以下一项发动").set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.zhiLiao>0) return "选项二";
                        if(player.getExpansions('anYue').length>0) return "选项一";
                    });
                    'step 1'
                    if(result.control=='选项一'){
                        event.goto(2);
                    }else if(result.control=="选项二"){
                        event.goto(6);
                    }
                    'step 2'
                    var anYue=player.getExpansions('anYue');
                    player.chooseCardButton(anYue,true,'移除1个【暗月】目标角色+1[治疗]');
                    'step 3'
                    var card=result.links[0];
                    event.card=card;
                    player.discard(card,'anYue');
                    event.trigger('yiChuAnYue');
                    'step 4'
                    player.chooseTarget(1,'目标角色+1[治疗]',true).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 5'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'blue');
                        result.targets[0].changeZhiLiao(1);
                    }
                    event.finish();
                    'step 6'
                    player.changeZhiLiao(-1);
                    if(player.countMark('xinYue')<2){
                        player.addMark('xinYue');
                    }
                    event.finish();
                }
            },
            yueDu:{
                usable:1,
                trigger:{source:'damageAfter'},
                filter:function(event,player){
                    return event.faShu==true&&player.zhiLiao>0;
                },
                content:function(){
                    'step 0'
                    player.changeZhiLiao(-1);
                    'step 1'
                    player.chooseTarget(1,true,'对目标对手造成1点法术伤害③',function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 2'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'red');
                        result.targets[0].damage(1,player).set('faShu',true);
                    }
                }
            },
            anYueZhan:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    return player.isLinked()&&player.canBiShaShuiJing()&&player.getExpansions('anYue').length>0&&get.type(event.card)=='gongJi';
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    var cards=player.getExpansions('anYue');
                    player.chooseCardButton(cards,true,'暗月斩：移除X个【暗月】(x<3)本次攻击伤害额外+X',[1,2]);
                    'step 2'
                    if(result.links.length>0){
                        event.num=result.links.length;
                        player.discard(result.links,'anYue');
                        event.trigger('yiChuAnYue');
                    }else{
                        event.finish();
                    }
                    'step 3'
                    trigger.getParent().baseDamage+=event.num;
                },
                ai:{
                    shuiJing:true,
                }
            },
            cangBaiZhiYue:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var choiceList=['<span class="tiaoJian">(移除3个【石化】)</span>你的下次主动攻击对手无法应战，额外+1[攻击行动]。你额外获得一个回合',"移除X点<span class='hong'>【</span>新月<span class='hong'>】</span>，你+1点<span class='lan'>【</span>石化<span class='lan'>】</span>，弃1张牌，对目标对手造成(X+1)点法术伤害③"];
                    var choices=['选项二']
                    if(player.countMark('shiHua')>=3){
                        choices.unshift('选项一');
                    }
                    player.chooseControl(choices).set('prompt','苍白之月：选择以下一项发动').set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countZhiShiWu('shiHua')>=3) return "选项一";
                        return "选项二";
                    });
                    'step 2'
                    if(result.control=='选项一'){
                        event.goto(3);
                    }else if(result.control=="选项二"){
                        event.goto(6);
                    }
                    'step 3'
                    player.removeMark('shiHua',3);
                    player.addSkill('cangBaiZhiYue1');
                    player.storage.gongJi++;
                    'step 4'
                    player.insertPhase();
                    'step 5'
                    event.finish();
                    
                    'step 6'
                    var list=[];
                    var num=player.countMark('xinYue');
                    for(var i=0;i<=num;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt',"移除X点<span class='hong'>【</span>新月<span class='hong'>】</span>，你+1点<span class='lan'>【</span>石化<span class='lan'>】</span>，弃1张牌，对目标对手造成(X+1)点法术伤害③").set('ai',function(){return _status.event.num;}).set('num',list.length-1);
					"step 7"
					var num=result.control;
                    event.num=num;
					if(num>0){
						player.removeMark('xinYue',num);
					}
                    player.addZhiShiWu('shiHua');
                    if(player.countCards('h')>0){
                        player.chooseToDiscard(1,'h',true);
                    }
                    'step 8'
                    player.chooseTarget(1,'对目标对手造成('+event.num+'+1)点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 9'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'red');
                        result.targets[0].damage(event.num+1,player).set('faShu',true);
                    }
                },
                ai:{
                    baoShi:true,
                    order:4,
                    result:{
                        player:1,
                    }
                }
            },
            cangBaiZhiYue1:{
                trigger:{player:'useCardToPlayer'},
                forced:true,
                filter:function(event,player){
                    return event.getParent().yingZhan!=true&&get.type(event.card)=="gongJi";
                },
                content:function(){
                    'step 0'
                    trigger.getParent().canYingZhan=false;
                    'step 1'
                    player.removeSkill('cangBaiZhiYue1');
                }
            },
            xinYue:{
                intro:{
                    name:'新月',
                    content:'mark',
                    max:2,
                },
                markimage:'image/card/hong.png',
            },
            shiHua:{
                intro:{
                    name:'石化',
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/lan.png',
            },
            anYue:{
                intro:{
                    name:'暗月',
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('anYue');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
            },

            //仲裁者
            zhongCaiFaZe:{
                trigger:{global:"phaseBefore"},
                forced:true,
                filter:function(event,player){
                    return game.phaseNumber==0
                },
                content:function(){
                    player.changeNengLiang('b',2);
                }
            },
            yiShiZhongDuan:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.qiDong==true) return false;
                    return player.isLinked();
                },
                content:function(){
                    player.chongZhi();
                    player.addZhanJi('r',1)
                }
            },
            moRiShenPan:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('shenPan')>0;
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    event.num=player.countZhiShiWu('shenPan');
                    'step 1'
                    player.removeZhiShiWu('shenPan',event.num);
                    target.damageFaShu(event.num,player);
                },
                group:'moRiShenPan_sheZhi',
                subSkill:{
                    sheZhi:{
                        trigger:{player:'phaseUseBegin'},
                        forced:true,
                        priority:4,
                        filter:function(event,player){
                            return player.countZhiShiWu('shenPan')>=get.info('shenPan').intro.max;
                        },
                        content:function(){
                            trigger.canTeShu=false;
                            player.addTempSkill('moRiShenPan_biXu',{player:'useSkill'});
                        }
                    },
                    biXu:{
                        init:function(player,skill){
                            player.addSkillBlocker(skill);
                        },
                        onremove:function(player,skill){
                            player.removeSkillBlocker(skill);
                        },
                        skillBlocker:function(skill,player){
                            var info=get.info(skill);
                            return skill!='moRiShenPan'&&info.type=='faShu';
                        },
                        mod:{
                            cardEnabled:function(card,player){
                                return false;
                            }
                        },

                    }
                },
                ai:{
					order:function(item,player){
						return 1.5+player.countZhiShiWu('shenPan');
					},
					result:{
						target:function(player,target){
							return get.damageEffect(target,player.countZhiShiWu('shenPan'));
						}
					},
				},
            },
            shenPanLangChao:{
                forced:true,
                trigger:{player:'damageEnd'},
                content:function(){
                    player.addZhiShiWu('shenPan',1);
                },
            },
            zhongCaiYiShi:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.qiDong==true) return false;
                    return player.canBiShaBaoShi()&&!player.isLinked();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    var num=player.needsToDiscard();
                    if(num>0){
						player.chooseToDiscard(num,true).set('useCache',true).set('baoPai',true);
					}
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isLinked()) return 5;
                    }
                },
                group:'zhongCaiYiShi_shenPan',
                subSkill:{
                    shenPan:{
                        trigger:{player:'phaseBegin'},
                        forced:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.addZhiShiWu('shenPan',1);
                        }
                    }
                },
                ai:{
                    baoShi:true,
                }
            },
            panJueTianPing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.addZhiShiWu('shenPan',1);
                    var list=['弃掉所有手牌','将你的手牌补到上限[强制]，我方【战绩区】+1[宝石]'];
                    player.chooseControl().set('prompt','判决天平：选择一项').set('choiceList',list).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')>3) return '选项一';
                        return '选项二';
                    });
                    'step 2'
                    if(result.control=='选项一'){
                        player.discard(player.getCards());
                    }
                    else if(result.control=='选项二'){
                        var num=player.getHandcardLimit();
                        player.drawTo(num);
                        player.addZhanJi('r',1);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.6,
                    result:{
                        player:1,
                    }
                }
            },
            shenPan:{
                intro:{
                    name:'审判',
                    content:'mark',
                    max:4,
                },
                markimage:'image/card/hong.png',
            },

            //冒险家
            qiZha:{
                type:'gongJi',
                enable:['chooseToUse','gongJi'],
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    var dict={};
                    var hs=player.getCards('h');
                    for(var i=0;i<hs.length;i++){
                        var type=get.xiBie(hs[i]);
                        if(!dict[type]) dict[type]=0;
                        dict[type]++;
                    }
                    for(var i in dict){
                        if(dict[i]>1){
                            return true;
                        }
                    }
                    return false;
                },
                selectCard:[2,3],
                prepare:'showCards',
                filterCard:function(card){
                    if(!ui.selected.cards.length){
                        return true;
                    }
                    var xiBie=get.xiBie(card);
                    if(get.xiBie(ui.selected.cards[0])!=xiBie){
                        return false;
                    }
                    return true;
                },
                complexCard:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    var cardx={name:'anMie'};
                    return player.canUse(cardx,target);
                },
                content:function(){
                    'step 0'
                    var length=cards.length;
                    var list=['shui','huo','feng','lei','di'];
                    if(length==2){
                        var next=player.chooseControl(list).set('prompt','选择攻击系别');
                    }else if(length==3){
                        event.goto(2);
                    }
                    'step 1'
                    var xiBie=result.control;
                    var name;
                    switch(xiBie){
                        case'shui':name='shuiLianZhan';break;
                        case 'huo':name='huoYanZhan';break;
                        case 'feng':name='fengShenZhan';break;
                        case 'lei':name='leiGuangZhan';break;
                        case 'di':name='diLieZhan';break;
                    }
                    var card={name:name,xiBie:xiBie};
                    player.useCard(card,target).set('action',true);
                    event.finish();
                    'step 2'
                    var card={name:'anMie',xiBie:'an'};
                    player.useCard(card,target).set('action',true);
                    event.finish();
                },
                ai:{
                    order:3.7,
                    result:{
                        target:-1,
                    }
                },
                check: function (card) {
					return 6 - get.value(card);
				},
            },
            qiangYun:{
                trigger:{player:'useSkill'},
                filter:function(event,player){
                    return event.skill=='qiZha';
                },
                forced:true,
                content:function(){
                    player.addNengLiang('b');
                }
            },
            diXiaFaZe:{
                trigger:{player:'gouMai'},
                forced:true,
                content:function(){
                    player.addZhanJi('r',2);
                    trigger.finish();
                }
            },
            maoXianJiaTianTang:{
                enable:'phaseUse',
                type:'teShu',
                filter:function(event,player){
                    if(event.getParent().canTeShu==false) return false;
                    var side=player.side
                    if(side==true){
                        if(game.hongZhanJi.length==0) return false;
                    }else if(side==false){
                        if(game.lanZhanJi.length==0) return false;
                    }
                    for(var i=0;i<game.players.length;i++){
                        if(side!=game.players[i].side) continue;
                        if(game.players[i].countNengLiangAll()<game.players[i].getNengLiangLimit()){
                            return true;
                        }
                    }
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return player.side==target.side&&target.countNengLiangAll()<target.getNengLiangLimit();
                },
                content:function(){
                    'step 0'
                    var num=target.getNengLiangLimit()-target.countNengLiangAll();
                    num=Math.min(num,2);
                    if(player.side==true){
                        var list=game.hongZhanJi;
                    }else if(player.side==false){
                        var list=game.lanZhanJi;
                    }
					var next=player.chooseButton([
                        '选择提炼的星石',
                        [list,'tdnodes'],
                    ]);
                    next.set('forced',true);
                    next.set('selectButton',[1,num]);
                    next.set('ai',function(button){
                        var player=_status.event.target;
						if(player.hasSkillTag('baoShi')&&!player.hasSkillTag('shuiJing')){
							if(button.link=='宝石') return 5;
							else return -1;
						}
						if(player.hasSkillTag('shuiJing')&&!player.hasSkillTag('baoShi')){
							if(button.link=='水晶') return 5;
							else return 2;
						}
						//既有水晶也有宝石
						return 2;
                    });
                    next.set('target',target);
                    'step 1'
                    for(var i=0;i<result.links.length;i++){
						if(result.links[i]=='宝石'){
							target.addMark('_tiLian_r');
							player.changeZhanJi('r',-1);
						}else if(result.links[i]=='水晶'){
							target.addMark('_tiLian_b');
							player.changeZhanJi('b',-1);
                        }
                    }
                    'step 2'
                    if(player.countNengLiangAll()>0){
                        if(player.canBiShaShuiJing()){
                            player.removeBiShaShuiJing();
                        }
                    }
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            if(!(target.hasSkillTag('baoShi')||target.hasSkillTag('shuiJing'))) return 0;
                            var list;
                            if(player.side==true){
                                list=game.hongZhanJi;
                            }else if(player.side==false){
                                list=game.lanZhanJi;
                            }
                            if(target.hasSkillTag('baoShi')&&!target.hasSkillTag('shuiJing')&&!list.includes('宝石')){
                                return 0;
                            }
							var num=target.getNengLiangLimit()-target.countNengLiangAll();
							if(num>=2) return 2;
							return 0;
                        },
                    }
                }
            },
            touTianHuanRi:{
                type:'faShu',
                usable:1,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('偷天换日','hidden');
                        var list=[['tou','将对方【战绩区】的1[宝石]转移到我方【战绩区】'],['huan','将我方【战绩区】的[水晶]全部转换为[宝石]']]
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='tou'){
                            if(player.side==true){
                                return game.lanZhanJi.includes('宝石');
                            }else if(player.side==false){
                                return game.hongZhanJi.includes('宝石');
                            }
                        }
                        if(link=='huan'){
                            return true;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='tou'){
                            var next=get.copy(lib.skill['touTianHuanRi_tou']);
                        }else if(links[0]=='huan'){
                            var next=get.copy(lib.skill['touTianHuanRi_huan']);
                        }
						return next;
					},
                    check:function(button){
                        var player=_status.event.player;
                        if(button.link=='huan'){
                            if(player.side==true){
                                return game.lanZhanJi.includes('水晶');
                            }else if(player.side==false){
                                return game.hongZhanJi.includes('水晶');
                            }
                        }
                        if(button.link=='tou'){
                            return Math.random()*3;
                        }
                    }
                },
                subSkill:{
                    tou:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            'step 1'
                            var side=player.side;
                            player.changeZhanJi('r',-1,!side)
                            player.addZhanJi('r',1);
                            'step 2'
                            player.storage.all++;
                        }
                    },
                    huan:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            if(player.side==true){
                                event.list=game.hongZhanJi.slice();
                            }else if(player.side==false){
                                event.list=game.lanZhanJi.slice();
                            }
                            'step 1'
                            event.xingShi=event.list.shift();
                            if(event.xingShi=='水晶'){
                                player.removeZhanJi('b',1);
                            }
                            'step 2'
                            if(event.xingShi=='水晶'){
                                player.addZhanJi('r',1);
                            }
                            if(event.list.length!=0){
                                event.goto(1);
                            }
                            'step 3'
                            player.storage.all++;
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        player:function(player){
                            if(player.side==true){
                                if(game.hongZhanJi.includes('水晶')||game.lanZhanJi.includes('宝石')) return 1;
                                else return 0;
                            }else{
                                if(game.lanZhanJi.includes('水晶')||game.hongZhanJi.includes('宝石')) return 1;
                                else return 0;
                            }
                        },
                    }
                }

            },
            
            //圣枪骑士
            shenShengXinYang:{
                mod:{
                    maxZhiLiao:function(player,num){
                        var side=player.side;
                        if(side==true){
                            if(game.hongXingBei>=game.lanXingBei) return num+1;
                        }else if(side==false){
                            if(game.lanXingBei>=game.hongXingBei) return num+1;
                        }
                    }
                }
            },
            huiYao:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='shui');
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                prepare:'showCards',
                selectTarget:-1,
                filterTarget:true,
                content:function(){
                    target.changeZhiLiao(1);
                },
                contentAfter:function(){
                    player.storage.gongJi++;
                },
                ai:{
                    order:3.6,
                    result:{
                        target:1,
                    }
                }
            },
            chengJie:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.countCards('h',card=>get.type(card)=='faShu')) return false;
                    var players=game.players;
                    for(var i=0;i<players.length;i++){
                        if(players[i]==player) continue;
                        if(players[i].zhiLiao) return true;
                    }
                    return false;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                prepare:'showCards',
                selectTarget:1,
				filterTarget:function(card,player,target){
                    if(target.zhiLiao<1) return false;
					return target!=player;
				},
                content:function(){
                    if(target.zhiLiao){
                        target.changeZhiLiao(-1);
                        player.changeZhiLiao(1);
                    } 
                },
                contentAfter:function(){
                    player.storage.gongJi++;
                },
                ai:{
                    order:3.8,
                    result:{
                        target:-1,
                        player:2,
                    }
                }
            },
            shengJi:{
                trigger:{player:'useCardToTargeted'},
                forced:true,
                filter:function(event,player){
                    return get.type(event.card)=="gongJi"&&event.getParent().shengJi!=false;
                },
                content:function(){
                    player.changeZhiLiao();
                }
            },
            tianQiang:{
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    return get.type(event.card)=="gongJi"&&event.yingZhan!=true&&player.storage.tianQiang!=false&&player.zhiLiao>=2;
                },
                content:function(){
                    'step 0'
                    trigger.shengJi=false;
                    player.changeZhiLiao(-2);
                    'step 1'
                    player.addSkill('tianQiang_x');
                },
                subSkill:{
                    x:{
                        trigger:{player:'useCardToPlayer'},
                        direct:true,
                        content:function(){
                            'step 0'
                            trigger.getParent().canYingZhan=false;
                            'step 1'
                            player.removeSkill('tianQiang_x')
                        }
                    },
                },
                check:function(event,player){
                    var num=Math.random();
                    return num>0.25;
                }
            },
            diQiang:{
                trigger:{player:'useCardToTargeted'},
                firstDo:true,
                filter:function(event,player){
                    if(player.zhiLiao<1) return false;
                    return get.type(event.card)=="gongJi"&&event.getParent().yingZhan!=true;
                },
                content:function(){
                    'step 0'
                    trigger.getParent().shengJi=false;
                    'step 1'
                    var list=[];
                    var num=4;
                    for(var i=1;i<=player.zhiLiao;i++){
                        if(i<=num){
                            list.push(i);
                        }
                    }
                    player.chooseControl(list).set('prompt','选择移除的[治疗]数量').set('ai',function(){
                        return _status.event.num;
                    }).set('num',list.length-1);
                    'step 2'
                    var zhiLiaonum=result.control;
					if(zhiLiaonum>0){
						trigger.getParent().baseDamage+=zhiLiaonum;
						player.changeZhiLiao(-zhiLiaonum);
					}
                },
                check:function(event,player){
                    return player.zhiLiao>=1;
                }
            },
            shengGuangQiYu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.changeZhiLiao(2,5);
                    player.storage.tianQiang=false;
                    'step 2'
                    player.storage.gongJi++;
                },
                group:'shengGuangQiYu_tianQiang',
                ai:{
                    baoShi:true,
                    order:4,
                    result:{
                        player:2.5,
                    }
                }
            },
            shengGuangQiYu_tianQiang:{
                trigger:{player:'phaseEnd'},
                forced:true,
                content:function(){
                    player.storage.tianQiang=true;
                }
            },

            //精灵射手
            yuanSuSheJi:{
                trigger:{player:'useCard1'},
                firstDo:true,
                priority:1,
                usable:1,
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)!='gongJi') return false;
                    if(get.xiBie(event.card)=='an') return false;
                    if(player.countCards('h')==0&&player.countCards('s',card=>card.hasGaintag('zhuFu'))==0) return false;
                    if(_status.connectMode) return true;
                    return player.countCards('h',card=>get.type(card)=='faShu')>0||player.getCards('s',card=>card.hasGaintag('zhuFu')).length>0;
                },
                direct:true,
                content:function(){
                    'step 0'
                    player.storage.yuanSuSheJi=trigger.card;
                    var str='弃置1张法术牌[展示]';
                    if(player.getCards('s',card=>card.hasGaintag('zhuFu')).length>0){
                        str+='或移除1个【祝福】'
                    }
                    var next=player.chooseCard('hs',function(card){
                        if(get.position(card)=='h'){
                            return get.type(card)=='faShu';
                        }else if(get.position(card)=='s'){
                            return card.hasGaintag('zhuFu');
                        }
                    });
                    next.set('prompt',get.prompt('yuanSuSheJi'));
                    next.set('prompt2',"弃1张法术牌[展示]或移除1个【祝福】,");
                    switch(get.xiBie(player.storage.yuanSuSheJi)){
                        case 'huo':
                            next.prompt2+='本次攻击伤害额外+1';
                            break;
                        case'shui':
                            next.prompt2+="<span class='tiaoJian'>(主动攻击命中时)</span>目标角色+1[治疗]";
                            break;
                        case 'feng':
                            next.prompt2+="<span class='tiaoJian'>([攻击行动]结束后)</span>额外+1[攻击行动]";
                            break;
                        case 'lei':
                            next.prompt2+="本次攻击无法应战";
                            break;
                        case 'di':
                            next.prompt2+="<span class='tiaoJian'>(主动攻击命中时②)</span>对目标角色造成1点法术伤害③";
                            break;
                    }
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        if(get.position(result.cards[0])=='h'){
                            var flag=true;
                        }    
                        if(flag){
                            player.discard(result.cards);
                            player.showCards(result.cards);
                        }else{
                            player.discard(result.cards,'zhuFu');
                        }
                        switch(get.xiBie(player.storage.yuanSuSheJi)){
                            case 'huo':
                                player.addTempSkill('yuanSuSheJi_huo');
                                break;
                            case'shui':
                                player.addTempSkill('yuanSuSheJi_shui');
                                break;
                            case 'feng':
                                player.addTempSkill('yuanSuSheJi_feng');
                                break;
                            case 'lei':
                                player.addTempSkill('yuanSuSheJi_lei');
                                break;
                            case 'di':
                                player.addTempSkill('yuanSuSheJi_di');
                                break;
                        }
                    }else{
                        event.finish();
                    }

                },
                subSkill:{
                    huo:{
                        trigger:{player:'useCard'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi;
                        },
                        content:function(){
                            trigger.baseDamage++;
                        }
                    },
                    shui:{
                        trigger:{player:'useCardToTargeted'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi&&event.getParent().yingZhan!=true;
                        },
                        content:function(){
                            'step 0'
                            player.chooseTarget('目标角色+1[治疗]',true).set('ai',function(target){
                                var player=_status.event.player;
                                return get.zhiLiaoEffect2(target,player,1);
                            });
                            'step 1'
                            game.log(player,'选择了',result.targets[0]);
                            player.line(result.targets[0],'blue');
                            result.targets[0].changeZhiLiao(1);
                        }
                    },
                    feng:{
                        trigger:{player:'useCardAfter'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi;
                        },
                        content:function(){
                            player.storage.gongJi++;
                        }
                    },
                    lei:{
                        trigger:{player:'useCardToPlayer'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi;
                        },
                        content:function(){
                            trigger.getParent().canYingZhan=false;
                        }
                    },
                    di:{
                        trigger:{player:'useCardToTargeted'},
                        direct:true,
                        filter:function(event,player){
                            return event.card==player.storage.yuanSuSheJi&&event.getParent().yingZhan!=true;
                        },
                        content:function(){
                            'step 0'
                            var next=player.chooseTarget('对目标角色造成1点法术伤害',true);
                            next.ai=function(target){
                                return target.side!=player.side;
                            }
                            'step 1'
                            game.log(player,'选择了',result.targets[0]);
                            player.line(result.targets[0],'red');
                            result.targets[0].damageFaShu(1,player);
                        }
                    }
                }

            },
            dongWuHuoBan:{
                trigger:{source:'damageAfter'},
                filter:function(event,player){
                    return _status.currentPhase==player;
                },
                content:function(){
                    'step 0'
                    event.trigger('dongWuHuoBan');
                    'step 1'
                    player.draw(1);
                    'step 2'
                    player.chooseToDiscard('h',true,1);
                },
                check:function(event,player){
                    var num=player.getHandcardLimit()-player.countCards('h');
                    return num>0;
                }
            },
            jingLingMiYi:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaBaoShi()&&!player.isLinked(); 
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    player.hengZhi();
                    'step 1'
                    var cards=get.cards(3);
                    player.loseToSpecial(cards,'zhuFu',player);
                    player.markSkill('zhuFu');
                },
                group:'jingLingMiYi_chongZhi',
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            var cards=player.getCards('s',function(card){
                                return card.hasGaintag('zhuFu');
                            }); 
                            if(cards.length>0){
                                return false;
                            }
                            return true;
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            player.unmarkSkill('zhuFu');
                            player.chooseTarget('对目标角色造成2点法术伤害',true).set('ai',function(target){
                                return -get.attitude(player, target)
                            });
                            'step 1'
                            game.log(player,'选择了',result.targets[0]);
                            player.line(result.targets[0],'red');
                            result.targets[0].damageFaShu(2,player); 
                        }
                    }
                },
                ai:{
                    baoShi:true,
                }
            },
            chongWuQiangHua:{
                trigger:{player:'dongWuHuoBan'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseTarget('目标角色摸1张牌[强制]，弃1张牌',true).set('ai',function(target){
                        var player=_status.event.player;
                        var num=target.countCards('h')-target.getHandcardLimit();
                        return target.side!=player.side&&num>=0;
                    });
                    'step 2'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'green');
                    result.targets[0].draw(1);
                    result.targets[0].chooseToDiscard('h',true,1);
                    'step 3'
                    trigger.finish();
                },
                check:function(event,player){
                    var target=game.filterPlayer(function(current){
                        var num=current.countCards('h')-current.getHandcardLimit();
                        return current.side!=player.side&&num>=0;
                    })
                    return target.length>0;
                }
            },
            zhuFu:{
                intro:{
                    mark:function(dialog,storage,player){
						var cards=player.getCards('s',function(card){
							return card.hasGaintag('zhuFu');
						});
                        if(!cards||!cards.length) return ;
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
					markcount:function(storage,player){
						var cards=player.getCards('s',function(card){
							return card.hasGaintag('zhuFu');
						});
                        return cards.length;
					},
                },
            },

            //瘟疫法师
            buXiu:{
                group:['buXiu_1','buXiu_2'],
                subSkill:{
                    1:{
                        trigger:{player:'useSkillEnd'},
                        filter:function(event,player){
                            if(event.skill=='siWangZhiChu_backup') return false;
                            if(get.info(event.skill).type!='faShu') return false;
                            return true;
                        },
                        content:function(){
                            player.changeZhiLiao(1);
                        }
                    },
                    2:{
                        trigger:{player:'useCardEnd'},
                        filter:function(event,player){
                            if(event.getParent().name!='chooseToUse'&&event.getParent().name!='faShu') return false;
                            if(get.type(event.card)!='faShu') return false;
                            return true;
                        },
                        content:function(){
                            player.changeZhiLiao(1);
                        }
                    }
                }
            },
            shengDu:{
                trigger:{player:'zhiLiao'},
                firstDo:true,
                filter:function(event,player){
                    return !event.faShu;
                },
                forced:true,
                content:function(){
                    trigger.cancel();
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+3;
                    }
                }
            },
            wenYi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='di');
                },
                prepare:'showCards',
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='di';
                },
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                content:function(){
                    target.damageFaShu(1,player);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:-0.5,
                    }
                }
            },
            siWangZhiChu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(player.zhiLiao<2) return false;
                    var dict={};
                    var hs=player.getCards('h');
                    for(var i=0;i<hs.length;i++){
                        var type=get.xiBie(hs[i]);
                        if(!dict[type]) dict[type]=0;
                        dict[type]++;
                    }
                    for(var i in dict){
                        if(dict[i]>1){
                            return true;
                        }
                    }
                    return false;
                },
                chooseButton:{
                    dialog:function(event,player){
						var dialog=ui.create.dialog('死亡之触：移除a点[治疗]','hidden');
                        var list=[];
                        for(var i=0;i<=player.zhiLiao;i++){
                            if(i<2) continue;
                            list.push(i);
                        }
						dialog.add([list,'tdnodes']);
						return dialog;
					},
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
                            selectTarget:1,
                            filterTarget:true,
                            selectCard:[2,Infinity],
                            prepare:'showCards',
                            filterCard:function(card){
                                if(!ui.selected.cards.length){
                                    return true;
                                }
                                var xiBie=get.xiBie(card);
                                if(get.xiBie(ui.selected.cards[0])!=xiBie){
                                    return false;
                                }
                                return true;
                            },
                            complexCard:true,
							content:function(){
								'step 0'
								event.links=lib.skill.siWangZhiChu_backup.links;
                                event.a=event.links[0];
                                event.b=cards.length;
                                player.changeZhiLiao(-event.a);
                                'step 1'
                                target.damageFaShu(event.a+event.b-3,player);
							},
                            ai:{
                                result:{
                                    target:function(player, target){
                                        return get.damageEffect(target,2);
                                    }
                                }
                            }
						}
					},
                    prompt:function(links,player){
						return '弃置b张同系牌[展示]至少2张，对目标角色造成(a+b-3)点伤害。';
					},
                    check: function (button) {
                        return button.link;
                    },
                },
                ai:{
                    order:function(item,player){
                        return 1.3+player.zhiLiao;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            juDuXinXing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                contentBefore:function(){
                    player.removeBiShaBaoShi();
                },
                content:function(){
                    target.damageFaShu(2,player);
                },
                contentAfter:function(){
                    player.changeZhiLiao(1);
                },
                ai:{
                    baoShi:true,
                    order:3.7,
                    result:{
                        target:function(player, target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            
            //魔剑士
            xiuLuoLianZhan:{
                usable:1,
                trigger:{player:"useCardAfter"},
                filter:function(event,player){
                    //if(event.selected) return false;
                    return get.is.gongJiXingDong(event);
                },
                content:function(player){
                    //trigger.selected=true;

                    trigger.getParent().insertAfter(function(){
                        var str='修罗连斩：火系[攻击行动]';
					    var next=player.gongJi('h',function(card,player,event){
                        if(get.xiBie(card)!='huo') return false;
                        return lib.filter.cardEnabled(card,player,'forceEnable');
					    },str);
                    },{
                        player:player,
                    });

					
                },
                mod:{
                    aiUseful(player, card, num) {
                        if (get.xiBie(card, player) === "huo"&&get.type(card) === "gongJi") {
                            return num + 1;
                        }
                    },
                }
            },
            anYingNingJu:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return !player.isLinked(); 
                },
                content:function(){
                    'step 0'
                    if(player.countCards('h')==0){
                        player.damage(1,player).set('faShu',true).set('diXiao',false);
                    }else{
                        player.damage(1,player).set('faShu',true);
                    }
                    'step 1'
                    player.hengZhi();                 
                },
                group:'anYingNingJu_chongZhi',
                subSkill:{
                    chongZhi:{
                        direct:true,
                        priority:3,
                        trigger:{player:'phaseUseBegin'},
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.chongZhi();
                        }
                    }
                }
            },
            anYingZhiLi:{
                forced:true,
                firstDo:true,
                trigger:{player:'useCardToTargeted'},
				filter:function(event,player){
                    if(!player.isLinked()) return false;
					if(event.card&&get.type(event.card)=='gongJi'){
						return true;
					}
					return false;
				},
				content:function(){
					trigger.getParent().baseDamage++;
				},
            },
            anYingKangJu:{
                mod:{
                    cardEnabled:function(card,player){
                        if(_status.currentPhase==player&&get.type(card)=='faShu'){
                            return false;
                        }
                    }
                }
            },
            anYingLiuXing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                selectTarget:1,
                filterTarget:true,
                filter:function(event,player){
                    if(!player.isLinked()) return false;
                    return player.countCards('h',card=>get.type(card)=='faShu')>=2;
                },
                prepare:'showCards',
                content:function(){
                    'step 0'
                    if(player.side==true){
                        var list=game.hongZhanJi;
                    }else{
                        var list=game.lanZhanJi;
                    }
                    var next=player.chooseButton([
                        '是否额外移除2个星石',
                        [list,'tdnodes'],
                    ]);
                    next.set('selectButton',[2,2]);
                    next.set('ai',function(button){
                        if(button.link=='水晶'){
                            return 5;
                        }else{
                            return 2;
                        }
                    });
                    'step 1'
                    target.damageFaShu(2,player);
                    if(result.bool){
                        event.list=result.links;
                    }else{
                        event.finish();
                    }
                    'step 2'
                    var xingShi=event.list.shift();
                    if(xingShi=='宝石'){
                        player.changeZhanJi('r',-1);
                    }else if(xingShi=='水晶'){
                        player.changeZhanJi('b',-1);
                    }
                    if(event.list.length>0) event.redo();
                    'step 3'
                    player.chongZhi();
                    'step 4'
                    player.addNengLiang('r');

                },
                ai:{
					damage:true,
					order:function(item,player){
                        return 1.5+player.countCards('h');
                    },
					result:{
						target:function(player,target){
							return get.damageEffect(target,2);
						}
					},
				},
            },
            huangQaunZhenChan:{
                usable:1,
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)!='gongJi') return false;
                    return true;
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    player.storage.huangQaunZhenChan=trigger.card;
                    trigger.canYingZhan=false;
                    player.addTempSkill('huangQaunZhenChan_mingZhong');

                },
                subSkill:{
                    mingZhong:{
                        trigger:{player:'useCardToTargeted'},
                        forced:true,
                        filter:function(event,player){
                            if(event.card!=player.storage.huangQaunZhenChan) return false;
                            return true;
                        },
                        content:function(){
                            var num=player.getHandcardLimit();
                            player.drawTo(num);
                            player.chooseToDiscard('h',true,2);
                        }
                    }
                },
                check:function(event,player){
                    var target=event.targets[0];
                    var minus=target.getHandcardLimit()-target.countCards('h');
                    var num=Math.random();
                    if(minus<2) return num>0.1;
                    else return num>0.5;
                },
                ai:{
                    baoShi:true,
                }
            },
            
            //血色剑灵
            xueSeJingJi:{
                trigger:{player:'useCardToTargeted'},
                forced:true,
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    return true;
                },
                content:function(){
                    player.addZhiShiWu('xianXue');
                }
            },
            chiSeYiShan:{
                trigger:{player:'useCardAfter'},
                filter:function(event,player){
                    //if(event.selected) return false;
                    if(player.countZhiShiWu('xianXue')<1) return false;
                    return get.is.gongJiXingDong(event);
                },
                content:function(){
                    //trigger.selected=true;
                    player.removeZhiShiWu('xianXue');
                    player.damageFaShu(2,player);
                    player.storage.gongJi++;
                },
                check:function(event,player){
                    if(player.side==true){
                        var shiQi=game.hongShiQi;
                    }else if(player.side==false){
                        var shiQi=game.lanShiQi;
                    }
                    return shiQi>5;
                }

            },
            xueRanQiangWei:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('xianXue')>=2;
                },
				selectTarget:1,
                filterTarget:true,
                contentBefore:function(){
                    player.removeZhiShiWu('xianXue',2);
                },
                content:function(){
                    'step 0'
                    player.chooseTarget('将我方角色[能量区]的1[水晶]翻面为[宝石]',true,function(card,player,target){
                        return player.side==target.side;
                    }).set('ai',function(target){
                        if(target.countNengLiang('b')>0) return 2;
                        else return 1;
                    });
                    target.changeZhiLiao(-2);
                    'step 1'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'green');
                        if(result.targets[0].countNengLiang('b')){
                            result.targets[0].removeNengLiang('b');
                            result.targets[0].addNengLiang('r');
                        }
                    }
                },
                contentAfter:function(){
                    'step 0'
                    if(player.hasMark('xueQiangWeiTingYuan')){
                        event.flag=true;
                        event.num=0;
                        event.targets=game.filterPlayer().sortBySeat(player);
                    }
                    'step 1'
                    if(event.flag){
                        if(event.num<event.targets.length){
                            event.targets[event.num].damageFaShu(1,player);
                            event.num++;
                            event.redo();
					    }
                    }
                },
                ai:{
                    order:function(item,player){
                        return 6-player.countCards('h');
                    },
                    result:{
                        target:-1,
                    }
                }
            },
            xueQiPingZhang:{
                trigger:{player:'damageBegin0'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    return player.countZhiShiWu('xianXue')>=1;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('xianXue');
                    trigger.num--;
                    'step 1'
                    player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    }).set('ai',function(target){
                        return -get.damageEffect(target,1);
                    })
                    'step 2'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'red');
                        result.targets[0].damageFaShu(1,player);
                    }
                }
            },
            xueQiangWeiTingYuan:{
                intro:{
                    content:"<span class='tiaoJian'>(此卡在场时)</span>所有角色的[治疗]无法用于抵御伤害；<span class='tiaoJian'>(血色剑灵的回合结束时)</span>移除此卡。",
                    nocount:true,
                },
                markimage:'image/card/xueQiangWeiTingYuan.png',
                trigger:{player:'phaseEnd'},
                forced:true,
                filter:function(event,player){
                    return player.hasMark('xueQiangWeiTingYuan');
                },
                content:function(){
                    player.removeZhiShiWu('xueQiangWeiTingYuan');
                }
            },
            sanHuaLunWu:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    var list=["[水晶]将【血蔷薇庭院】放置于场上，你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>","[宝石]将【血蔷薇庭院】放置于场上，无视你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>上限为你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>但你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>数最高为4，你弃到4张牌。"];
                    var choices=['选项一'];
                    if(player.canBiShaBaoShi()){
                        choices.push('选项二');
                    }
                    player.chooseControl(choices).set('choiceList',list).set('ai',function(){
                        var player=_status.event.player;
                        if(player.canBiShaBaoShi()) return '选项二';
                        return '选项一';
                    });
                    'step 1'
                    if(result.control=='选项一'){
                        player.removeBiShaShuiJing();
                        player.addZhiShiWu('xueQiangWeiTingYuan');
                        player.addZhiShiWu('xianXue',2);
                    }else if(result.control=='选项二'){
                        player.removeBiShaBaoShi();
                        player.addZhiShiWu('xueQiangWeiTingYuan');
                        player.addZhiShiWu('xianXue',2,4);
                        if(player.countCards('h')>4){
                            var num=player.countCards('h')-4;
                            player.chooseToDiscard('h',true,num);
                        }
                    }
                },
                check:function(event,player){
                    if(player.countZhiShiWu('xianXue')+2>=3&&!player.canBiShaBaoShi()) return false;
                    return true;
                },
                ai:{
                    baoShi:true,
                    shuiJing:true,
                }
            },
            xianXue:{
                intro:{
                    name:'鲜血',
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/hong.png',
            },

            //祈祷师
            guangHuiXinYang:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.isLinked()) return false;
                    if(!player.countZhiShiWu('qiDaoFuWen')>0) return false;
                    return true;
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return target.side==player.side;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('qiDaoFuWen');
                    'step 1'
                    if(player.countCards('h')>=2){
                        player.chooseToDiscard('h',true,2);
                    }else if(player.countCards('h')==1){
                        player.chooseToDiscard('h',true,1);
                    }
                    'step 2'
                    player.addZhanJi('r',1);
                    'step 3'
                    target.changeZhiLiao(1);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:1,
                        player:function(player){
                            if(player.countCards('h')>=4) return 2;
                            else return 1;
                        }
                    }
                }
            },
            heiAnZuZhou:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.isLinked()) return false;
                    if(!player.countZhiShiWu('qiDaoFuWen')>0) return false;
                    return true;
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('qiDaoFuWen');
                    'step 1'
                    target.damageFaShu(2,player);
                    'step 2'
                    player.damageFaShu(2,player);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        },
                        player:function(player){
                            if(player.countCards('h')+2-player.zhiLiao>=6) return -1;
                            else return 1;
                        }
                    }
                }
            },
            weiLiCiFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>card.hasNature('weiLiCiFu'))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return card.hasNature('weiLiCiFu');
                },
                useCard:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    if(target.hasExpansions('weiLiCiFu_xiaoGuo')) return false;
                    return target.side==player.side;
                },
                content:function(){
                    'step 0'
                    if(!target.hasSkill('weiLiCiFu_xiaoGuo')){
                        target.addSkill('weiLiCiFu_xiaoGuo');
                    }
                    'step 1'
                    target.addToExpansion(cards,'gain2',player).gaintag.add('weiLiCiFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"威",
                        intro:{
                            content:'expansion',
                        },
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            if(!get.is.gongJi(event.getParent())) return false;
                            if(player.hasZhiShiWu('jueJieX')) return false;

                            return player.hasExpansions('weiLiCiFu_xiaoGuo');
                        },
                        content:function(){
                            player.loseToDiscardpile(player.getExpansions('weiLiCiFu_xiaoGuo'));
                            trigger.getParent().baseDamage+=2;
                            player.removeSkill('weiLiCiFu_xiaoGuo');
                        }
                    }
                },
                ai:{
                    order:3.8,
                    result:{
                        target:1,
                    }
                }
            },
            xunJieCiFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>card.hasNature('xunJieCiFu'))>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return card.hasNature('xunJieCiFu');
                },
                useCard:true,
                selectTarget:1,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    if(target.hasExpansions('xunJieCiFu_xiaoGuo')) return false;
                    return target.side==player.side;
                },
                content:function(){
                    'step 0'
                    if(!target.hasSkill('xunJieCiFu_xiaoGuo')){
                        target.addSkill('xunJieCiFu_xiaoGuo');
                    }
                    'step 1'
                    target.addToExpansion(cards,'gain2',player).gaintag.add('xunJieCiFu_xiaoGuo');
                },
                subSkill:{
                    xiaoGuo:{
                        marktext:"迅",
                        intro:{
                            content:'expansion',
                        },
                        //priority:1,
                        trigger:{player:['useCardAfter','useSkillAfter']},
                        filter:function(event,player){
                            if(!player.hasExpansions('xunJieCiFu_xiaoGuo')) return false;
                            if(player.hasZhiShiWu('jueJieX')) return false;
                            
                            //if(event.selected) return false;

                            return get.is.zhuDongGongJi(event)||get.is.faShuXingDong(event);
                        },
                        content:function(){
                            //trigger.selected=true;
                            player.loseToDiscardpile(player.getExpansions('xunJieCiFu_xiaoGuo'));
                            player.storage.gongJi++;
                            player.removeSkill('xunJieCiFu_xiaoGuo');
                        }
                    }
                },
                ai:{
                    order:3.8,
                    result:{
                        target:1,
                    }
                }
            },
            qiDao:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    player.hengZhi();
                },
                group:'qiDao_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        forced:true,
                        trigger:{player:'useCard'},
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            if(get.type(event.card)!='gongJi') return false;
                            if(event.targets.length==0) return false;
                            if(event.yingZhan==true) return false;
                            return true;
                        },
                        content:function(){
                            player.addZhiShiWu('qiDaoFuWen',2);
                        }
                    }
                },
                ai:{
                    baoShi:true,
                }
            },
            faLiChaoXi:{
                trigger:{player:['useCardAfter','useSkillAfter']},
                usable:1,
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    return get.is.faShuXingDong(event);
                },
                content:function(){
                    player.removeBiShaShuiJing();
                    player.storage.faShu++;
                },
                ai:{
                    shuiJing:true,
                }
            },
            qiDaoFuWen:{
                intro:{
                    name:'祈祷符文',
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/hong.png',
            },

            //红莲骑士
            xingHongShengYue:{
                usable:1,
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    if(event.yingZhan==true) return false;
                    return true;
                },
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            xingHongXinYang:{
                trigger:{player:'zhiLiao'},
                firstDo:true,
                forced:true,
                filter:function(event,player){
                    return event.source!=player;
                },
                content:function(){
                    trigger.cancel();
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+2;
                    }
                }
            },
            xueXingDaoYan:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.zhiLiao>0;
                },
                content:function(){
                    'step 0'
                    var list=[];
                    for(var i=1;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','血腥祷言：移除X点[治疗]，对自己造成X点法术伤害');
                    'step 1'
                    player.changeZhiLiao(-result.control);
                    player.damageFaShu(result.control,player);
                    player.storage.xueXingDaoYan=result.control;
                    'step 2'
                    event.links=[player.storage.xueXingDaoYan];
                    if(event.links[0]>1){
                        var num=2;
                        var propmt='选择1~2个目标队友';
                    }else{
                        var num=1;
                        var prompt='选择1个目标队友';
                    }
                    player.chooseTarget(function(card,player,target){
                        if(target==player) return false;
                        return target.side==player.side;
                    },[1,num],true,prompt).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 3'
                    game.log(player,'选择了',result.targets);
                    player.line(result.targets,'blue');
                    if(result.targets.length==1){
                        result.targets[0].changeZhiLiao(event.links[0]);
                        event.goto(7);
                    }else{
                        result.targets.sortBySeat(player);
                        event.targets=result.targets;
                        event.target=event.targets[0];
                    }
                    'step 4'
                    var list=[];
                    for(var i=1;i<=event.links[0]-1;i++){
                        list.push(i);
                    }
                    var name=get.translation(event.target);
                    var str=name+'获得几点[治疗]';
                    player.chooseControl(list).set('prompt',str);
                    'step 5'
                    event.target.changeZhiLiao(result.control);
                    event.links[0]-=result.control;
                    'step 6'
                    event.target=event.targets[1];
                    event.target.changeZhiLiao(event.links[0]);
                    'step 7'
                    player.addZhiShiWu('xueYin');
                },
            },
            shaLuShengYan:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    if(event.yingZhan==true) return false;
                    return player.countZhiShiWu('xueYin')>0;
                },
                content:function(){
                    player.removeZhiShiWu('xueYin');
                    player.damageFaShu(4,player);
                    trigger.getParent().baseDamage+=2;
                }
            },
            reXueFeiTeng:{
                forced:true,
                trigger:{global:'changeShiQiEnd'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    if(event.getParent().player!=player) return false;
                    if(event.num>=0) return false;
                    if(event.yuanYin!='damage') return false;
                    return true;
                },
                content:function(){
                    player.hengZhi();
                },
                group:['reXueFeiTeng_xiaoGuo','reXueFeiTeng_chongZhi'],
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'damageBegin0'},
                        forced:true,
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            return true;
                        },
                        content:function(){
                            trigger.shiQiXiaJiang=false;
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.chongZhi();
                            player.changeZhiLiao(2);
                        }
                    }
                }
            },
            jieJiaoJieZao:{
                trigger:{player:['useCardAfter','useSkillAfter']},
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    if(!player.isLinked()) return false;

                    //if(event.selected) return false;
                    return get.is.gongJiXingDong(event)||get.is.faShuXingDong(event);
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chongZhi();
                    'step 2'
                    //trigger.selected=true;
                    player.storage.all++;
                },
                check:function(event,player){
                    var num=Math.random();
                    return num>0.2;
                },
                ai:{
                    shuiJing:true,
                }
                
            },
            xingHongShiZi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.canBiShaShuiJing()) return false;
                    if(player.countZhiShiWu('xueYin')<=0) return false;
                    if(player.countCards('h',card=>get.type(card)=='faShu')<2) return false;
                    return true;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                prepare:'showCards',
                selectTarget:1,
                filterTarget:true,
                contentBefore:function(){
                    player.removeBiShaShuiJing();
                    player.removeZhiShiWu('xueYin');
                },
                content:function(){
                    'step 0'
                    player.damageFaShu(4,player);
                    'step 1'
                    target.damageFaShu(3,player);
                },
                ai:{
                    shuiJing:true,
                    order:function(item,player){
                        var num=3.1;
                        if(player.isLinked()) num+=2;
                        return num;
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,3);
                        },
                        player:function(player){
                            if(player.isLinked()) return 0;
                            else return -1;
                        },
                    }
                }
            },
            xueYin:{
                intro:{
                    content:'mark',
                    max:2,
                },
                markimage:'image/card/hong.png',
            },

            //英灵人形
            zhanWenZhangWo:{
                trigger:{global:'phaseBefore'},
                forced:true,
                filter:function(event,player){
                    return game.phaseNumber==0;
                },
                content:function(){
                    player.addZhiShiWu('zhanWen',3);
                }
            },
            nuHuoYaZhi:{
                trigger:{source:'gongJiWeiMingZhong'},
                //priority:1,
                filter:function(event,player){
                    if(event.yingZhan==true) return false;
                    if(event.selected) return false;
                    return player.countZhiShiWu('zhanWen')>=1;
                },
                content:function(){
                    trigger.selected=true;
                    player.removeZhiShiWu('zhanWen');
                    player.addZhiShiWu('moWen'); 
                    //trigger.cancel();
                },
                check:function(event,player){
                    var num=Math.random();
                    return num>0.5;
                }
            },
            zhanWenSuiJi:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    if(get.type(event.card)!='gongJi') return false;
                    if(player.countZhiShiWu('zhanWen')<1) return false;
                    if(event.yingZhan==true) return false;
                    if(!player.countCards('h')>1) return false;
                    if(_status.connectMode) return true;
                    var cards=player.getCards('h');
                    var dict={};
                    for(var i=0;i<cards.length;i++){
                        var xiBie=get.xiBie(cards[i]);
                        dict[xiBie]=(dict[xiBie]||0)+1;
                    }
                    for(var xiBie in dict){
                        if(dict[xiBie]>1) return true;
                    }
                    return false;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard('h',[2,Infinity],function(card){
                        if(!ui.selected.cards.length) return true;
                        return get.xiBie(card)==get.xiBie(ui.selected.cards[0])
                    });
                    next.set('complexCard',true);
                    next.set('prompt',get.prompt('zhanWenSuiJi'));
                    next.set('prompt2',lib.translate.zhanWenSuiJi_info);
                    next.ai=function(card){
						return 1;
					}
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,trigger.target);
                        player.removeZhiShiWu('zhanWen');
                        player.addZhiShiWu('moWen');
                        player.showCards(result.cards);
                        event.num=result.cards.length-1;
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(player.isLinked()){
                        var list=[];
                        for(var i=0;i<=player.countZhiShiWu('zhanWen');i++){
                            list.push(i);
                        }
                        player.chooseControl(list).set('prompt','额外翻转战纹数量');
                    }else{
                        event.goto(4);
                    }
                    'step 3'
                    if(result.control){
                        player.removeZhiShiWu('zhanWen',result.control);
                        player.addZhiShiWu('moWen',result.control);
                        event.num+=result.control;
                    }
                    'step 4'
                    trigger.getParent().baseDamage+=event.num;
                }
            },
            moWenRongHe:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(player.countZhiShiWu('moWen')<1) return false;
                    if(event.yingZhan==true) return false;
                    if(!player.countCards('h')>1) return false;

                    if(event.selected) return false;

                    if(_status.connectMode) return true;
                    var cards=player.getCards('h');
                    var dict={};
                    for(var i=0;i<cards.length;i++){
                        var xiBie=get.xiBie(cards[i]);
                        dict[xiBie]=(dict[xiBie]||0)+1;
                    }
                    return Object.keys(dict).length>1;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard('h',[2,Infinity],function(card){
                        if(!ui.selected.cards.length) return true;
                        for(var i=0;i<ui.selected.cards.length;i++){
                            if(get.xiBie(ui.selected.cards[i])==get.xiBie(card)) return false;
                        }
                        return true;
                    });
                    next.set('complexCard',true);
                    next.set('prompt',get.prompt('moWenRongHe'));
                    next.set('prompt2',lib.translate.moWenRongHe_info);
                    next.ai=function(card){
						return 1;
					}
                    'step 1'
                    if(result.bool){
                        trigger.selected=true;
                        player.logSkill(event.name,trigger.player);
                        player.removeZhiShiWu('moWen');
                        player.addZhiShiWu('zhanWen');
                        player.showCards(result.cards);
                        event.num=result.cards.length-1;
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(player.isLinked()){
                        var list=[];
                        for(var i=0;i<=player.countZhiShiWu('moWen');i++){
                            list.push(i);
                        }
                        player.chooseControl(list).set('prompt','额外翻转魔纹数量');
                    }else{
                        event.goto(4);
                    }
                    'step 3'
                    if(result.control){
                        player.removeZhiShiWu('moWen',result.control);
                        player.addZhiShiWu('zhanWen',result.control);
                        event.num+=result.control;
                    }
                    'step 4'
                    trigger.player.damageFaShu(event.num,player);
                    trigger.cancel();
                }
            },
            fuWenGaiZao:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.hengZhi();
                    'step 2'
                    player.draw(1);
                    'step 3'
                    player.removeZhiShiWu('zhanWen',player.countZhiShiWu('zhanWen'));
                    player.removeZhiShiWu('moWen',player.countZhiShiWu('moWen'));
                    'step 4'
                    var list=[];
                    for(var i=0;i<=3;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','选择战纹数量').set('ai',function(){
                        var num=Math.random();
                        if(num>0.5) return 1;
                        else return 2;
                    });
                    'step 5'
                    if(result.control>0){
                        player.addZhiShiWu('zhanWen',result.control);
                    }
                    if(3-result.control>0){
                        player.addZhiShiWu('moWen',3-result.control);
                    }
                },
                group:['fuWenGaiZao_xiaoGuo','fuWenGaiZao_chongZhi'],
                subSkill:{
                    xiaoGuo:{
                        mod:{
                            maxHandcard:function(player,num){
                                if(player.isLinked()) return num+1;
                            }
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        priority:1,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            var num=player.needsToDiscard();
                            if(num>0){
                                player.chooseToDiscard(num,true).set('useCache',true).set('baoPai',true);
                            }
                        }
                    },
                },
                ai:{
                    baoShi:true,
                }
            },
            shuangChongHuiXiang:{
                usable:1,
                trigger:{source:'damageBegin0'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(trigger.num>3){
                        event.num=3;
                    }else{
                        event.num=trigger.num;
                    }
                    'step 2'
                    var str='对另一名目标角色造成'+event.num+'点法术伤害';
                    player.chooseTarget(str,true,function(card,player,target){
                        return target!=_status.event.trigger_player;
                    }).set('trigger_player',trigger.player).set('ai',function(target){
                        return -get.attitude(player, target);
                    });
                    'step 3'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'red');
                        var next=result.targets[0].damage(event.num,player);
                        next.set('faShu',true);
                        next.set('shiQiXiaJiang',false);
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            zhanWen:{
                marktext:'战',
                intro:{
                    name:'战纹',
                    content:'mark',
                },
                markimage:'image/card/zhanWen.png',
            },
            moWen:{
                marktext:'魔',
                intro:{
                    name:'魔纹',
                    content:'mark',
                },
                markimage:'image/card/moWen.png',
            },

            //神官
            shenShengQiShi:{
                trigger:{player:'useSkillEnd'},
                filter:function(event,player){
                    var info=get.info(event.skill);
                    return info.type=='teShu';
                },
                content:function(){
                    player.changeZhiLiao(1);
                }
            },
            shenShengQiFu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='faShu')>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                prepare:'showCards',
                content:function(){
                    player.changeZhiLiao(2);
                },
                ai:{
                    order:3.8,
                    result:{
                        player:2,
                    }
                }
            },
            shuiZhiShenLi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='shui')>=1;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='shui';
                },
                prepare:'showCards',
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side==player.side&&target!=player;
                },
                content:function(){
                    'step 0'
                    if(player.countCards('h')>0){
                        player.chooseCard('h','交给目标队友1张牌',true,1);
                    }
                    'step 1'
                    if(result.bool){
                        player.give(result.cards[0],target);
                    }
                    'step 2'
                    player.changeZhiLiao(1);
                    target.changeZhiLiao(1);
                },
                ai:{
                    order:3.5,
                    result:{
                        target:function(player,target){
                            if(target.countCards('h')+1<=target.getHandcardLimit()){
                                return 1.5;
                            }else{
                                return -1;
                            }
                        },
                        player:1,
                    }
                }
            },
            shengShiShouHu:{
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+4;
                    }
                },
                trigger:{player:'zhiLiao'},
                firstDo:true,
                forced:true,
                content:function(){
                    'step 0'
                    var num=trigger.getParent().num;
                    var list=[0,1];
                    player.chooseControl(list).set('prompt','使用的[治疗]数量，目前伤害量'+num).set('ai',function(){return _status.event.num;}).set('num',list.length-1);
                    'step 1'
                    var zhiLiaonum=result.control;
					if(zhiLiaonum>0){
						trigger.getParent().num-=zhiLiaonum;
						game.log(player,'的','[治疗]','抵挡了'+zhiLiaonum+'点伤害');
						player.changeZhiLiao(-zhiLiaonum).type='damage';
					}
                    'step 2'
                    trigger.cancel();
                }
                
            },
            shenShengQiYue:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&player.zhiLiao>0;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    var list=[];
                    for(var i=1;i<=player.zhiLiao;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','转移[治疗]数量').set('num',list.length-1).set('ai',function(){
                        return _status.event.num;
                    });
                    'step 1'
                    event.zhiLiaonum=result.control;
                    player.chooseTarget('目标队友+'+event.zhiLiaonum+'[治疗]',true,function(card,player,target){
                        return target.side==player.side&&target!=player;
                    }).set('ai',function(){
                        return Math.random();
                    });
                    'step 2'
                    var target=result.targets[0];
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'blue');
					if(event.zhiLiaonum>0){
						player.changeZhiLiao(-event.zhiLiaonum);
                        target.changeZhiLiao(event.zhiLiaonum,4).set('zhuanYi',true);
					}
                },
                ai:{
                    shuiJing:true,
                }
            },
            shenShengLingYu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.chooseToDiscard(2,true,'h');
                    'step 1'
                    var choiceList=["<span class='tiaoJian'>(移除你的1[治疗])</span>对目标角色造成2点法术伤害③","你+2[治疗]，目标队友+1[治疗]"];
                    var list=['选项二'];
                    if(player.zhiLiao>0){
                        list.unshift('选项一');
                    }
                    player.chooseControl(list).set('prompt','神圣领域').set('choiceList',choiceList);
                    'step 2'
                    if(result.control=='选项一'){
                        event.goto(3);
                    }else{
                        event.goto(5);
                    }
                    'step 3'
                    player.changeZhiLiao(-1);
                    player.chooseTarget('对目标角色造成2点法术伤害③',true).set('ai',function(target){
                        return -get.attitude(player, target);
                    });
                    'step 4'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'red');
                        result.targets[0].damageFaShu(2,player);
                        event.finish();
                    }
                    'step 5'
                    player.changeZhiLiao(2);
                    player.chooseTarget('目标队友+1[治疗]',true,function(card,player,target){
                        return target.side==player.side&&target!=player;
                    }).set('ai',function(target){
                        var player=_status.event.player;
                        return get.zhiLiaoEffect2(target,player,1);
                    });
                    'step 6'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'blue');
                        result.targets[0].changeZhiLiao(1);
                        event.finish(); 
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        player:1,
                    }
                }       
            },

            //阴阳师
            shiShenJiangLin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    var dict={};
                    var hs=player.getCards('h');
                    for(var i=0;i<hs.length;i++){
                        var type=get.mingGe(hs[i]);
                        if(!dict[type]) dict[type]=0;
                        dict[type]++;
                    }
                    for(var i in dict){
                        if(dict[i]>1){
                            return true;
                        }
                    }
                    return false;
                },
                prepare:'showCards',
                selectCard:2,
                filterCard:function(card,player){
                    if(ui.selected.cards.length==0) return true;
                    if(get.mingGe(card)==get.mingGe(ui.selected.cards[0])) return true;
                    return false;
                },
                complexCard:true,
                content:function(){
                    player.hengZhi();
                    player.addZhiShiWu('guiHuo');
                    player.storage.gongJi++;
                },
                ai:{
                    order:4,
                    result:{
                        player:1,
                    }
                }
            },
            yinYangZhanHuan:{
                enable:['chooseToUse_yingZhan'],
                filter:function(event,player){
                    if(event.canYingZhan==false||get.xiBie(event.trigger_card)=='an') return false;

                    var mingGe=get.mingGe(event.trigger_card);
                    return player.countCards('h',card=>get.mingGe(card)==mingGe&&get.type(card)=='gongJi')>0;
                },
                filterCard:function(card,player,event){
                    event=event||_status.event;
                    var mingGe=get.mingGe(event.trigger_card);
                    return get.mingGe(card)==mingGe&&get.type(card)=='gongJi';
                },
                position:'h',
                viewAs:function(cards,player){
                    var event=_status.event;
					return {name:get.name(event.trigger_card),xiBie:get.xiBie(event.trigger_card),isCard:true};
				},
                group:['yinYangZhanHuan_xiaoGuo'],
                ai:{
                    order:5,
                }
            },
            yinYangZhanHuan_xiaoGuo:{
                trigger:{player:'useCard1'},
                firstDo:true,
                direct:true,
                filter:function(event,player){
					if(event.skill!='yinYangZhanHuan') return false;
					return true;
				},
                content:function(){
                    'step 0'
                    player.addZhiShiWu('guiHuo');
                    game.setXiBie(trigger.card,get.xiBie(trigger.cards[0]));
                    'step 1'
                    event.player=player;
                    event.trigger('yinYangZhanHuan');
                    'step 2'
                    if(player.isLinked()){
                        player.chongZhi();
                    }else{
                        event.finish();
                    }
                    'step 3'
                    trigger.baseDamage=player.countZhiShiWu('guiHuo');
                }
            },
            shiShenZhuanHuan:{
                trigger:{player:'yinYangZhanHuan'},
                content:function(){
                    player.draw(1);
                    player.addZhiShiWu('guiHuo');
                },
                check:function(event,player){
                    if(player.countCards('h')+1<=player.getHandcardLimit()) return true;
                    return false;
                }
            },
            heiAnJiLi:{
                trigger:{player:'phaseEnd'},
                forced:true,
                priority:1,
                filter:function(event,player){
                    return player.countZhiShiWu('guiHuo')>=3;
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('guiHuo',player.countZhiShiWu('guiHuo'));
                    'step 1'
                    player.chooseTarget('对目标角色造成2点法术伤害③',true).set('ai',function(target){
                        return -get.attitude(player, target)
                    });
                    'step 2'
                    if(result.bool){
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'red');
                        result.targets[0].damageFaShu(2,player);
                    }
                }
            },
            shiShenZhouShu:{
                trigger:{global:'useCardToTarget'},
                filter:function(event,player){
                    if(player.countCards('h')==0) return false;
                    if(event.yingZhan==true) return false;
                    if(get.type(event.card)!='gongJi') return false;
                    if(get.xiBie(event.card)=='an') return false;
                    if(event.target.side!=player.side) return false;
                    if(event.target==player) return false;
                    if(event.getParent().canYingZhan==false) return false;
                    if(!player.isLinked()) return false;
                    if(player.side==true){
                        if(game.hongZhanJi.length<2) return false;
                        const count=game.hongZhanJi.filter(xingShi=>xingShi=='宝石');
                        if(count==0) return false;
                    }else if(player.side==false){
                        if(game.lanZhanJi.length<2) return false;
                        const count=game.lanZhanJi.filter(xingShi=>xingShi=='宝石');
                        if(count==0) return false;
                    }
                    return true;
                },
                direct:true,
                content:function(){
					'step 0'
					event.source=trigger.player;
					event.yingZhan=trigger.getParent().yingZhan;
                    event.storage=trigger.getParent().storage;
					var name=get.translation(event.source);
					var propmt=`受到${name}的`;
					if(event.yingZhan){
						propmt+='应战攻击，';
					}else{
						propmt+='主动攻击，';
					}
					propmt+=get.translation(get.name(trigger.card));
					var next=player.chooseToUse_yingZhan();
                    next.set('filterCard',function(card,player,event){
                        if(get.type(card)!='gongJi') return false;
                        if(card.name!='anMie'&&get.xiBie(card)!=get.xiBie(_status.event.trigger_card)) return false;
						return lib.filter.cardEnabled(card,player,'forceEnable');
					});
					next.set('filterTarget',function(card,player,target){
                        return target!=_status.event.trigger_player&&target.side!=player.side;
                        /*
						if(ui.selected.cards.length){
							if(get.type(ui.selected.cards[0])=='gongJi'){
								return target!=_status.event.trigger_player&&target.side!=player.side;
							}else{
								return false;
							}
						}*/
                    });
					next.set('trigger_card',trigger.card);
                    next.set('trigger_player',event.source);
                    next.set('yingZhan',true);
					next.set('canYingZhan',trigger.getParent().canYingZhan);
					next.set('canShengGuang',trigger.getParent().canShengGuang);
                    next.set('prompt',get.prompt('shiShenZhouShu')+propmt);
                    next.set('prompt2',lib.translate.shiShenZhouShu_info);
					'step 1'
                    if(result.bool){
                        trigger.getParent().targets.remove(trigger.target);
                        trigger.cancel();
                    }
                },
                group:'shiShenZhouShu_tiaoJian',
                subSkill:{
                    tiaoJian:{
                        trigger:{player:'useCardBefore'},
                        direct:true,
                        firstDo:true,
                        priority:10,
                        filter:function(event,player){
                            if(event.getParent(2).name!='shiShenZhouShu') return false;
                            return true;
                        },
                        firstDo:true,
                        content:function(){
                            'step 0'
                            player.logSkill(event.name);
                            if(player.side==true){
                                var list=game.hongZhanJi;
                            }else{
                                var list=game.lanZhanJi;
                            }
                            var next=player.chooseButton([
                                '移除1[宝石]1[水晶]',
                                [list,'tdnodes'],
                            ]);
                            next.set('forced',true);
                            next.set('selectButton',2);
                            next.set('filterOk',function(){
                                for(var i in ui.selected.buttons){
                                    if(ui.selected.buttons[i].link=='宝石') return true;
                                }
                            });
                            'step 1'
                            for(var i=0;i<result.links.length;i++){
                                if(result.links[i]=='宝石'){
                                    player.changeZhanJi('r',-1);
                                }else if(result.links[i]=='水晶'){
                                    player.changeZhanJi('b',-1);
                                }
                            }
                        }
                    }
                }
            },
            shengMingJieJie:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('生命结界','hidden');
                        var list=[['1',"目标队友+1[宝石]并+1[治疗]；然后对自己造成X点法术伤害③，X为你的<span class='hong'>【</span>鬼火<span class='hong'>】</span>数。(若X为3)本次法术伤害③不会造成我方士气下降"],['2',"<span class='tiaoJian'>(仅【式神形态】下，弃2张命格相同的手牌[展示])</span>[重置]脱离【式神形态】目标队友弃1张牌"]]
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='1'){
                            return true;
                        }
                        if(link=='2'){
                            if(!player.isLinked()) return false;
                            var dict={};
                            var hs=player.getCards('h');
                            for(var i=0;i<hs.length;i++){
                                var type=get.mingGe(hs[i]);
                                if(!dict[type]) dict[type]=0;
                                dict[type]++;
                            }
                            for(var i in dict){
                                if(dict[i]>1){
                                    return true;
                                }
                            }
                            return false;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='1'){
                            var next=get.copy(lib.skill['shengMingJieJie_1']);
                        }else if(links[0]=='2'){
                            var next=get.copy(lib.skill['shengMingJieJie_2']);
                        }
						return next;
					},
                    prompt:function(links,player){
                        if(links[0]=='1'){
                            return '目标队友+1[宝石]并+1[治疗]'
                        }else{
                            return '弃2张命格相同的手牌[展示]，目标队友弃1张牌'
                        }  
                    },
                    check:function(button){
                        return Math.random();
                    }
                },
                subSkill:{
                    1:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            player.addZhiShiWu('guiHuo');
                            target.addNengLiang('r');
                            target.changeZhiLiao(1);
                            'step 1'
                            var num=player.countZhiShiWu('guiHuo');
                            var next=player.damage(num,player);
                            next.set('faShu',true);
                            if(num==3){
                                next.set('shiQiXiaJiang',false);
                            }
                        },
                        ai:{
                            result:{
                                target:1
                            }
                        }
                    },
                    2:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        selectCard:2,
                        filterCard:function(card,player){
                            if(ui.selected.cards.length==0) return true;
                            if(get.mingGe(card)==get.mingGe(ui.selected.cards[0])) return true;
                            return false;
                        },
                        complexCard:true,
                        prepare:'showCards',
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            player.addZhiShiWu('guiHuo');
                            player.chongZhi();
                            'step 1'
                            target.chooseToDiscard(1,true);
                        },
                        ai:{
                            result:{
                                target:1
                            }
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            guiHuo:{
                intro:{
                    name:'鬼火',
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/hong.png',
            },

            //苍炎魔女
            cangYanFaDian:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='huo')>0;
                },
                filterCard:function(card,player){
                    return get.xiBie(card)=='huo';
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                prepare:'showCards',
                content:function(){
                    'step 0'
                    target.damageFaShu(2,player);
                    'step 1'
                    player.damageFaShu(2,player);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            tianHuoDianKong:{
                type:'faShu',
                priority:1,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(player.countZhiShiWu('chongSheng')<1&&!player.isLinked()) return false;
                    return player.countCards('h',card=>get.xiBie(card)=='huo')>1;
                },
                selectCard:2,
                filterCard:function(card,player){
                    return get.xiBie(card)=='huo';
                },
                selectTarget:1,
                filterTarget:true,
                prepare:'showCards',
                content:function(){
                    'step 0'
                    if(!player.isLinked()){
                        player.removeZhiShiWu('chongSheng');
                    }
                    event.num=3;
                    if(player.side==true){
                        var player_shiQi=game.hongShiQi;
                    }else{
                        var player_shiQi=game.lanShiQi;
                    }
                    if(target.side==true){
                        var target_shiQi=game.hongShiQi;
                    }else{
                        var target_shiQi=game.lanShiQi;
                    }
                    if(player_shiQi<target_shiQi){
                        event.num++;
                    }
                    'step 1'
                    target.damageFaShu(event.num,player);
                    'step 2'
                    player.damageFaShu(event.num,player);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,3);
                        }
                    }
                }
            },
            moNvZhiNu:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    return player.countCards('h')<4;
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.addSkill('moNvZhiNu_xiBie');
                    var list=[0,1,2];
                    if(player.countCards('h')==0){
                        list.remove(0);
                    }
                    player.chooseControl(list).set('prompt','魔女之怒：摸几张牌');
                    'step 1'
                    if(result.control>0){
                        player.draw(result.control);
                    }
                    'step 2'
                    player.qiPai();
                },
                mod:{
                    maxHandcard:function(player,num){
                        if(player.isLinked()){
                            return num+player.countZhiShiWu('chongSheng')-2;
                        }
                    },
                },
                group:'moNvZhiNu_chongZhi',
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseUseBefore'},
                        //lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            player.removeSkill('moNvZhiNu_xiBie');
                            'step 1'
                            player.qiPai();
                        }
                    },
                    xiBie:{
                        mod:{
                            xiBie:function(card,xiBie,owner){
                                if(get.type(card)!='gongJi') return;
                                if(xiBie=='an') return;
                                if(xiBie=='shui') return;
                                return 'huo';
                            }
                        }
                    }
                }
            },
            tiShenWanOu:{
                trigger:{player:'damageBegin0'},
                filter:function(event,player){
                    return get.is.gongJiShangHai(event)&&player.countCards('h')>0;
                },
                direct:true,
                content:function(){
                    'step 0'
                    player.chooseCardTarget({
                        filterCard:function(card){
                            return get.type(card)=='faShu';
                        },
                        selectCard:1,
                        filterTarget:function(card,player,target){
                            return target!=player&&target.side==player.side;
                        },
                        prompt:get.prompt('tiShenWanOu'),
                        prompt2:lib.translate.tiShenWanOu_info,
                        ai:function(target){
                            if(target.getHandcardLimit()-target.countCards('h')>=1){
                                return 1;
                            }else{
                                return 0;
                            }
                        }
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.discard(result.cards);
                        player.showCards(result.cards);
                        event.target=result.targets[0];
                    }else{
                        event.finish();
                    }
                    'step 2'
                    event.target.draw(1);
                }
            },
            yongShengYinShiJi:{
                forced:true,
                trigger:{player:'changeShiQiEnd'},
                filter:function(event,player){
                    if(event.player!=player) return false;
                    if(event.num>=0) return false;
                    if(event.faShu!=true) return false;
                    return true;
                },
                content:function(){
                    player.addZhiShiWu('chongSheng');
                }
            },
            tongKuLianJie:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return target.side!=player.side;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    target.damageFaShu(1,player);
                    'step 1'
                    player.damageFaShu(1,player);
                    'step 2'
                    if(player.countCards('h')>3){
                        player.chooseToDiscard(true,player.countCards('h')-3);
                    }
                },
                ai:{
                    shuiJing:true,
                    order:3.8,
                    result:{
                        target:-1,
                        player:1,
                    }
                }
            },
            moNengFanZhuan:{
                trigger:{player:'damageBegin0'},
                direct:true,
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(player.countCards('h')<2) return false;
                    return player.canBiShaShuiJing()&&player.countCards('h')>1;
                },
                content:function(){
                    'step 0'
                    player.chooseCardTarget({
                        selectCard:[2,Infinity],
                        filterCard:function(card){
                            return get.type(card)=='faShu'
                        },
                        filterTarget:function(card,player,target){
                            return target.side!=player.side;
                        },
                        prompt:get.prompt('moNengFanZhuan'),
                        prompt2:lib.translate.moNengFanZhuan_info,
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.removeBiShaShuiJing();
                        event.num=result.cards.length-1;
                        player.discard(result.cards);
                        player.showCards(result.cards);
                        event.target=result.targets[0];
                    }else{
                        event.finish();
                    }
                    'step 2'
                    event.target.damageFaShu(event.num,player);
                },
                ai:{
                    shuiJing:true,
                }
            },
            chongSheng:{
                intro:{
                    content:'mark',
                    name:'重生',
                    max:4,
                },
                markimage:'image/card/hong.png',

            },
            
            //贤者
            zhiHuiFaDian:{
                mod:{
                    maxNengLiang:function(player,num){
                        return num+1;
                    }
                },
                forced:true,
                trigger:{player:'damageEnd'},
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    return event.num>3;
                },
                content:function(){
                    'step 0'
                    player.addNengLiang('r',2);
                    'step 1'
                    if(player.countCards('h')>0){
                        player.chooseToDiscard('h',true);
                    }
                }
            },
            faShuFanTan:{
                trigger:{player:'damageEnd'},
                priority:1,
                filter:function(event,player){
                    if(event.faShu!=true) return false;
                    if(event.num!=1) return false;
                    if(!player.countCards('h')>1) return false;
                    return true;
                },
                direct:true,
                content:function(){
                   'step 0'
                    player.chooseCardTarget({
                        filterCard:function(card){
                            if(ui.selected.cards.length==0) return true;
                            if(get.xiBie(card)==get.xiBie(ui.selected.cards[0])) return true;
                            return false;
                        },
                        selectCard:[2,Infinity],
                        filterTarget:true,
                        complexCard:true,
                        prompt:get.prompt('faShuFanTan'),
                        prompt2:lib.translate.faShuFanTan_info,
                        ai1(card) {
                            return 6- get.value(card);
                        },
                        ai2:function(target){
							var player=_status.event.player;
							return target.side!=player.side;
						},
                    })
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.discard(result.cards);
                        player.showCards(result.cards);
                        event.num=result.cards.length;
                        event.target=result.targets[0];
                    }else{
                        event.finish();
                    }
                    'step 2'
                    event.target.damageFaShu(event.num-1,player);
                    'step 3'
                    player.damageFaShu(event.num,player);
                },
                ai:{
                    one_damage:true,
                }
            },
            moDaoFaDian:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return player.countYiXiPai()>1;
                },
                selectTarget:1,
                filterTarget:true,
                selectCard:[2,Infinity],
                filterCard:function(card,player){
                    if(!ui.selected.cards.length) return true;
                    for(var i=0;i<ui.selected.cards.length;i++){
                        if(get.xiBie(ui.selected.cards[i])==get.xiBie(card)) return false;
                    }
                    return true;
                },
                complexCard:true,
                prepare:'showCards',
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    target.damageFaShu(cards.length-1,player);
                    'step 1'
                    player.damageFaShu(cards.length-1,player);
                },
                ai:{
                    baoShi:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        },
                    }
                }
            },
            shengJieFaDian:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.canBiShaBaoShi()) return false;
                    return player.countYiXiPai()>2;
                },
                filterCard:function(card,player){
                    if(!ui.selected.cards.length) return true;
                    for(var i=0;i<ui.selected.cards.length;i++){
                        if(get.xiBie(ui.selected.cards[i])==get.xiBie(card)) return false;
                    }
                    return true;
                },
                selectCard:[3,Infinity],
                complexCard:true,
                prepare:'showCards',
                selectTarget:function(){
                    return [0,ui.selected.cards.length-2];
                },
                filterTarget:true,
                contentBefore:function(){
                    player.removeBiShaBaoShi();
                },
                content:function(){
                    if(target){
                        target.changeZhiLiao(2);
                    }
                },
                contentAfter:function(){
                    player.damageFaShu(cards.length-1,player);
                },
                ai:{
                    baoShi:true,
                    order:3.8,
                    result:{
                        target:function(player,target){
                            return get.zhiLiaoEffect(target,2);
                        },
                    }
                }
            },

            //魔弓
            moGuanChongJi:{
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    var cards=player.getExpansions('chongNengPai');
                    if(cards.length==0) return false;
                    if(!get.is.zhuDongGongJi(event)) return false;
                    if(event.getParent('phaseUse').moGuanChongJi==false) return false;
                    if(event.targets[0].countCards('h')>=event.targets[0].getHandcardLimit()) return false;
                    return true;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('chongNengPai');
                    var next=player.chooseCardButton(cards,'是否发动魔贯冲击，弃1张火系【充能】');
                    next.set('filterButton',function(button){
                        return get.xiBie(button)=='huo';
                    });
                    next.set('ai',function(button){
                        if(get.xiBie(button.link)=='huo') return 1;
                        return 0;
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,trigger.targets);
                        player.discard(result.links,'chongNengPai');
                        player.showGaiPai(result.links);
                        if(typeof trigger.baseDamage!='number') trigger.baseDamage=get.info(trigger.card,false).baseDamage||2;
                        trigger.baseDamage++;
                        player.storage.moGuanChongJi=trigger.card;
                        trigger.getParent('phaseUse').duoChongSheJi=false;
                    }
                },
                group:['moGuanChongJi_mingZhong','moGuanChongJi_weiMingZhong'],
                subSkill:{
                    mingZhong:{
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            if(!player.storage.moGuanChongJi) return false;
                            if(player.storage.moGuanChongJi!=event.card) return false;
                            var cards=player.getExpansions('chongNengPai');
                            if(cards.length==0) return false;
                            return true; 
                        },
                        direct:true,
                        content:function(){
                            'step 0'
                            var cards=player.getExpansions('chongNengPai');
                            var next=player.chooseCardButton(cards);
                            next.set('filterButton',function(button){
                                return get.xiBie(button)=='huo';
                            });
                            next.set('prompt',get.prompt('moGuanChongJi'));
                            next.set('prompt2',lib.translate.moGuanChongJi_info);
                            'step 1'
                            if(result.bool){
                                player.logSkill(event.name,trigger.targets);
                                player.discard(result.links,'chongNengPai');
                                player.showGaiPai(result.links);
                                trigger.getParent().baseDamage++;
                            }
                        }
                    },
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            if(!player.storage.moGuanChongJi) return false;
                            if(player.storage.moGuanChongJi!=event.source_card) return false;
                            return true;
                        },
                        direct:true,
                        content:function(){
                            trigger.player.damageFaShu(3,player);
                        }
                    }
                }

            },
            leiGuangSanShe:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(event.getParent('phaseUse').leiGuangSanShe==false) return false;
                    var cards=player.getExpansions('chongNengPai');
                    if(cards.length==0) return false;
                    for(var i=0;i<cards.length;i++){
                        if(get.xiBie(cards[i])=='lei') return true;
                    }
                    return false;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('雷光散射：移除1+X个雷系【充能】[展示]','hidden');
                        var cards=player.getExpansions('chongNengPai');
                        dialog.add(cards);
                        return dialog;
                    },
                    select:[1,Infinity],
                    filter:function(button,player){
                        if(get.xiBie(button)=='lei'){
                            return true;
                        }else{
                            return false;
                        }
                    },
                    backup:function(links,player){
                        return{
                            links:links,
                            type:'faShu',
                            selectTarget:-1,
                            filterTarget:function(card,player,target){
                                return player.side!=target.side;
                            },
                            contentBefore:function(){
                                'step 0'
                                event.links=lib.skill.leiGuangSanShe_backup.links;
                                player.discard(event.links,'chongNengPai');
                                player.showGaiPai(event.links);
                                for(var target of targets){
                                    target.storage.leiGuangSanShe=1;
                                }
                                'step 1'
                                event.num=event.links.length-1;
                                if(event.num>0){
                                    player.chooseTarget('对其造成的伤害额外+'+event.num,true,function(card,player,target){
                                        return target.side!=player.side;
                                    }).set('ai',function(target){
                                        return -get.damageEffect(target,2);
                                    });
                                }else{
                                    event.finish();
                                }
                                'step 2'
                                game.log(player,'选择了',result.targets[0],'伤害额外+'+event.num);
                                player.line(result.targets[0],'green');
                                result.targets[0].storage.leiGuangSanShe+=event.num;
                            },
                            content:function(){
                                target.damageFaShu(target.storage.leiGuangSanShe,player);

                            },
                        }
                    },
                    check:function(button){
                        if(get.xiBie(button.link)=='lei') return 1;
                        return 0;
                    }
                },
                ai:{
                    order:function(item,player){
                        var cards=player.getExpansions('chongNengPai');
                        var num=1.5;
                        for(var i=0;i<cards.length;i++){
                            if(get.xiBie(cards[i])=='lei') num+=0.7;
                        }
                        return num;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            duoChongSheJi:{
                trigger:{player:'useCardAfter'},
                direct:true,
                filter:function(event,player){
                    var cards=player.getExpansions('chongNengPai');
                    if(cards.length==0) return false;
                    if(!get.is.gongJiXingDong(event)) return false;
                    if(event.getParent('phaseUse').duoChongSheJi==false) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('chongNengPai');
                    var next=player.chooseCardButton('是否发动【[响应]多重射击】',cards);
                    next.set('filterButton',function(button){
                        return get.xiBie(button)=='feng';
                    });
                    next.set('ai',function(button){
                        if(get.xiBie(button.link)=='feng') return 1;
                        return 0;
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.discard(result.links,'chongNengPai');
                        trigger.getParent('phaseUse').moGuanChongJi=false;
                        var next=player.chooseTarget(true,function(card,player,target){
                            if(target==_status.event.trigger_target) return false;
                            return player.canUse('anMie',target);
                        }).set('trigger_target',trigger.targets_x[0]);
                    }else{
                        event.finish();
                    }
                    'step 2'
                    player.useCard({name:'anMie',xiBie:'an'},result.targets[0]).set('duoChongSheJi',true).set('action',true);
                },
                group:['duoChongSheJi_1'],
                subSkill:{
                    1:{
                        trigger:{player:'useCard2'},
                        direct:true,
                        filter:function(event,player){
                            return event.duoChongSheJi==true;
                        },
                        content:function(){
                            trigger.baseDamage--;
                        }
                    }

                }
            },
            chongNeng:{
                type:'qiDong',
                //priority:1,
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&event.qiDong!=true;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(player.countCards('h')==0){
                        event.flag=true;
                    }
                    if(player.countCards('h')>4){
                        player.chooseToDiscard(true,player.countCards('h')-4);
                    }
                    'step 2'
                    var list=[0,1,2,3,4];
                    player.chooseControl(list).set('prompt','充能：摸X张牌').set('ai',function(){
                        return 2;
                    });
                    'step 3'
                    event.num=result.control;
                    if(event.num>0){
                        player.draw(event.num);
                    }
                    'step 4'
                    if(event.num==0){
                        event.goto(9);
                    }
                    'step 5'
                    if(event.flag){
                        player.chooseCard('h',[1,event.num-1]).set('prompt',`将至多${event.num-1}张手牌作为充能`).set('ai',function(card){
                            var xiBie=get.xiBie(card);
                            if(xiBie=='lei'||xiBie=='huo'||xiBie=='feng') return 1;
                            return 0;
                        });
                    }else{
                        player.chooseCard('h',[1,event.num]).set('prompt',`将至多${event.num}张手牌作为充能`).set('ai',function(card){
                            var xiBie=get.xiBie(card);
                            if(xiBie=='lei'||xiBie=='huo'||xiBie=='feng') return 1;
                            return 0;
                        });
                    }
                    'step 6'
                    if(result.cards){
                        player.addToExpansion('draw',result.cards,'log').gaintag.add('chongNengPai');
                    }
                    'step 7'
                    var cards=player.getExpansions('chongNengPai');
                    if(cards.length>8){
                        player.chooseCardButton(cards,true,cards.length-8,`充能：舍弃${cards.length-8}张【充能】`);
                    }else{
                        event.goto(9);
                    }
                    'step 8'
                    if(result.links){
                        player.discard(result.links);
                    }
                    'step 9'
                    trigger.moGuanChongJi=false;
                    trigger.leiGuangSanShe=false;
                },
                check:function(event,player){
                    if(player.countNengLiang('r')>0) return false;
                    return true;
                },
                ai:{
                    shuiJing:true,
                }
            },
            moYan:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaBaoShi()&&event.qiDong!=true;
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    var choiceList=['目标角色弃1张牌','你摸3张牌【强制】'];
                    player.chooseControl().set('prompt','魔眼').set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')<2){
                            return '选项二'
                        }else{
                            return '选项一'
                        }
                    });
                    'step 2'
                    if(result.control=='选项一'){
                        event.goto(3);
                    }else{
                        event.goto(5);
                    }
                    'step 3'
                    player.chooseTarget(true,'目标角色弃1张牌',function(card,player,target){
                        if(target==player){
                            if(player.countCards('h')>2){
                                return true;
                            }
                            var cards=player.getExpansions('chongNengPai');
                            for(var i in cards){
                                if(get.xiBie(i)=='lei'){
                                    return true;
                                }
                            }
                            return false;
                        }
                        return true;
                    }).set('ai',function(target){
                        return Math.random();
                    });
                    'step 4'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'green');
                    result.targets[0].chooseToDiscard('h',true);
                    event.goto(6);
                    'step 5'
                    player.draw(3);
                    'step 6'
                    if(player.countCards('h')>0){
                        player.chooseCard('h',1,true).set('prompt','将自己1张手牌作为充能').set('ai',function(card){
                            var xiBie=get.xiBie(card);
                            if(xiBie=='lei'||xiBie=='huo'||xiBie=='feng') return 1;
                            return 0;
                        });
                    }else{
                        event.goto(10);
                    }
                    'step 7'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('chongNengPai');
                    'step 8'
                    var cards=player.getExpansions('chongNengPai');
                    if(cards.length>8){
                        player.chooseCardButton(cards,true,cards.length-8,`充能：舍弃${cards.length-8}张【充能】`);
                    }else{
                        event.goto(10);
                    }
                    'step 9'
                    if(result.links){
                        player.discard(result.links);
                    }
                    'step 10'
                    player.addNengLiang('b',1);
                },
                ai:{
                    baoShi:true,
                }
            },
            chongNengPai:{
                intro:{
                    name:'充能',
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('chongNengPai');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
            },

            //魔枪
            anZhiJieFang:{
                type:'qiDong',
                //priority:1,
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.qiDong) return false;
                    return !player.isLinked();
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.addTempSkill('anZhiJieFang_shangHai');
                    trigger.qiHeiZhiQiang=false;
                    trigger.chongYing=false;
                    player.storage.anZhiJieFang=0;
                    'step 1'
                    player.qiPai();
                },
                check:function(event,player){
					return player.countCards('h')>0;
				},
                subSkill:{
                    shangHai:{
                        trigger:{player:"useCard2"},
                        forced:true,
                        filter:function(event,player){
                            if(player.storage.anZhiJieFang!=0) return false;
                            return get.is.zhuDongGongJi(event);
                        },
                        content:function(){
                            trigger.baseDamage++;
                            player.storage.anZhiJieFang=1;
                        }
                    }
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isLinked()) return 5;
                    }
                }
            },
            huanYingXingChen:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.qiDong) return false;
                    return player.isLinked();
                },
                content:function(){
                    'step 0'
                    player.storage.huanYingXingChen=true;
                    player.addTempSkill('huanYingXingChen_shiQiXiaJiang');
                    player.damage(2,player).set('faShu',true).set('huanYingXingChen',true);
                    'step 1'
                    player.chongZhi();
                    'step 2'
                    if(player.storage.huanYingXingChen){
                        player.chooseTarget('对目标角色造成2点法术伤害③',true).set('ai',function(target){
                            var player=_status.event.player;
                            return player.side!=target.side;
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'red');
                    result.targets[0].damageFaShu(2,player);
                },
                subSkill:{
                    shiQiXiaJiang:{
                        trigger:{player:'changeShiQiEnd'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return event.getParent('damage').huanYingXingChen==true&&event.num<0;
                        },
                        content:function(){
                            player.storage.huanYingXingChen=false;
                        }
                    },
                },
                check:function(event,player){
                    if(player.getHandcardLimit()-player.countCards('h')>=2) return true;
                    return false;
                }
            },
            heiAnShuFu:{
                mod:{
                    cardEnabled:function(card,player){
                        if(get.type(card)=='faShu') return false;
                    }
                }
            },
            anZhiZhangBi:{
                trigger:{player:'damageBegin0'},
                direct:true,
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard([1,Infinity],function(card){
                        if(ui.selected.cards.length==0) return get.type(card)=='faShu'||get.xiBie(card)=='lei';
                        var dict={'faShu':0,'lei':0};
                        for(var i=0;i<ui.selected.cards.length;i++){
                            if(get.type(ui.selected.cards[i])=='faShu') dict[get.type(ui.selected.cards[i])]++;
                            if(get.xiBie(ui.selected.cards[i])=='lei') dict[get.xiBie(ui.selected.cards[i])]++;
                        }
                        if(dict['faShu']==dict['lei']){
                            return get.type(card)=='faShu'||get.xiBie(card)=='lei';
                        }else if(dict['faShu']>dict['lei']){
                            return get.type(card)=='faShu'
                        }else if(dict['lei']>dict['faShu']){
                            return get.xiBie(card)=='lei';
                        }
                        
                    });
                    next.set('complexCard',true);
                    next.set('prompt',get.prompt('anZhiZhangBi'));
                    next.set('prompt2',lib.translate.anZhiZhangBi_info);
                    next.set('ai',function(card){
                        if(get.type(card)=='faShu') return 10;
                        return 0;
                    })
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.showCards(result.cards);
                    }else{
                        event.finish();
                    }
                }
            },
            chongYing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(event.getParent('phaseUse').chongYing==false) return false;
                    return player.countCards('h',card=>get.type(card)=='faShu'||get.xiBie(card)=='lei')>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.type(card)=='faShu'||get.xiBie(card)=='lei';
                },
                selectTarget:-1,
                filterTarget:true,
                prepare:'showCards',
                contentBefore:function(){
                    player.storage.chongYing=0;
                },
                content:function(){
                    'step 0'
                    if(target.countCards('h')>0){
                        if(player.side==target.side){
                            target.chooseToDiscard('h').set('ai',function(card){
                                if(get.type(card)=='faShu'||get.xiBie(card)=='lei') return 1;
                                return 0;
                            });
                        }else{
                            target.chooseToDiscard('h',true).set('ai',function(card){
                                if(get.type(card)=='faShu'||get.xiBie(card)=='lei') return 0;
                                return 1;
                            });
                        }
                    }
                    'step 1'
                    if(result.bool){
                        target.showCards(result.cards);
                        if((get.type(result.cards[0])=='faShu'||get.xiBie(result.cards[0])=='lei')&&target!=player){
                            player.storage.chongYing+=1;
                        }
                    }
                },
                contentAfter:function(){
                    player.addTempSkill('chongYing_shangHai');
                    player.storage.gongJi++;
                    player.storage.chongYing_use=false;
                },
                subSkill:{
                    shangHai:{
                        trigger:{player:"useCard2"},
                        direct:true,
                        filter:function(event,player){
                            if(player.storage.chongYing_use) return false;
                            return get.is.zhuDongGongJi(event);
                        },
                        content:function(){
                            trigger.baseDamage+=player.storage.chongYing;
                            player.storage.chongYing_use=true;
                        }   
                    }
                },
                ai:{
					order:8,
					result:{
						player:2,
					},
				},
            },
            qiHeiZhiQiang:{
                trigger:{player:"useCardToTargeted"},
                filter:function(event,player){
                    if(!player.isLinked()) return false;
                    if(event.getParent('phaseUse').qiHeiZhiQiang==false) return false;
                    if(!player.canBiShaShuiJing()) return false;
                    if(!get.is.zhuDongGongJi(event.getParent())) return false;
                    if(event.target.countCards('h')!=1&&event.target.countCards('h')!=2) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    var list=[];
                    for(var i=0;i<player.countMark('_tiLian_r');i++){
                        list.push('宝石');
                    }
                    for(var i=0;i<player.countMark('_tiLian_b');i++){
                        list.push('水晶');
                    }
                    var next=player.chooseButton(['本次攻击伤害额外+(X+2)',[list,'tdnodes']]);
                    next.set('forced',true);
                    next.set('selectButton',[1,Infinity]);
                    'step 1'
                    if(result.bool){
                        var num=result.links.length;
                        if(num>0){
                            trigger.getParent().baseDamage+=num+2;
                            for(var i=0;i<result.links.length;i++){
                                if(result.links[i]=='宝石'){
                                    player.removeMark('_tiLian_r');
                                }else if(result.links[i]=='水晶'){
                                    player.removeMark('_tiLian_b');
                                }
                            }
                        }
                    }else{
                        event.finish();
                    }
                    
                },
                ai:{
                    shuiJing:true,
                }
            },

            //灵符师
            lingFu_leiMing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='lei')>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='lei';
                },
                selectTarget:2,
                filterTarget:true,
                prepare:'showCards',
                contentBefore:function(){
                    'step 0'
                    event.player=player;
                    player.storage.lingFu_leiMing=1;
                    'step 1'
                    event.trigger('lingFu');
                    'step 2'
                    event.trigger('lingFu_leiMing');
                },
                content:function(){
                    target.damageFaShu(player.storage.lingFu_leiMing,player);
                },
                ai:{
                    order:4,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,1);
                        },
                    }
                }
            },
            lingFu_fengXing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='feng')>0;
                },
                selectCard:1,
                filterCard:function(card){
                    return get.xiBie(card)=='feng';
                },
                selectTarget:2,
                filterTarget:true,
                prepare:'showCards',
                contentBefore:function(){
                    event.player=player;
                    event.trigger('lingFu');
                },
                content:function(){
                    target.chooseToDiscard('h',true);
                },
                ai:{
                    order:3.7,
                    result:{
                        target:1,
                    }
                }
            },
            nianZhou:{
                trigger:{player:'lingFu'},
                filter:function(event,player){
                    return player.countCards('h')>0&&player.getExpansions('yaoLi').length<2;
                },
                content:function(){
                    'step 0'
                    player.chooseCard('h',true);
                    'step 1'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('yaoLi');
                }
            },
            baiGuiYeXing:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    if(!get.is.zhuDongGongJi(event.getParent())) return false;
                    return player.getExpansions('yaoLi').length>0;
                },
                content:function(){
                    'step 0'
                    event.player=player;
                    player.storage.baiGuiYeXing=1;
                    var next=player.chooseCardButton(player.getExpansions('yaoLi'),true,1,'移除1张【妖力】');
                    next.set('prompt2',lib.translate.baiGuiYeXing_info);
                    'step 1'
                    event.card=result.links[0];
                    player.discard(result.links,'yaoLi');
                    var list=['否'];
                    if(get.xiBie(event.card)=='huo'){
                        list.unshift('是');
                    }
                    player.chooseControl(list).set('prompt','是否展示');
                    'step 2'
                    if(result.control=='是'){
                        event.flag=true;
                        player.showGaiPai(event.card);
                    }
                    'step 3'
                    event.trigger('baiGuiYeXing');
                    'step 4'
                    if(event.flag){
                        player.chooseTarget('选取不受伤害的2名角色',2,true).set('ai',function(target){
                            return get.attitude(player, target);
                        }).set('num',player.storage.baiGuiYeXing);
                    }else{
                        player.chooseTarget(`对目标角色造成${player.storage.baiGuiYeXing}点法术伤害③`,1,true).set('ai',function(target){
                            return -get.attitude(player, target);
                        }).set('num',player.storage.baiGuiYeXing);
                    }
                    'step 5'
                    if(event.flag){
                        game.log(player,'选择了',result.targets[0],'不受伤害');
                        player.line(result.targets[0],'green');
                        event.targets=game.filterPlayer(function(current){
                            return !result.targets.includes(current);
                        }).sortBySeat(player);
                    }else{
                        game.log(player,'选择了',result.targets[0]);
                        player.line(result.targets[0],'red');
                        event.targets=result.targets;
                    }
                    'step 6'
                    for(var i=0;i<event.targets.length;i++){
                        event.targets[i].damageFaShu(player.storage.baiGuiYeXing,player);
                    }
                }
            },
            lingLiBengJie:{
                trigger:{player:['baiGuiYeXing','lingFu_leiMing']},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    if(trigger.name=='baiGuiYeXing'){
                        player.storage.baiGuiYeXing++;
                    }else if(trigger.name=='lingFu_leiMingContentBefore'){
                        player.storage.lingFu_leiMing++;
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            yaoLi:{
                intro:{
                    name:'妖力',
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('yaoLi');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
            },


            //吟游诗人
            chenLunXieZouQu:{
                trigger:{global:'damageBegin0'},
                lastDo:true,
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    if(event.faShu!=true) return false;
                    if(!(event.player.side!=player.side&&event.source.side==player.side)) return false; 
                    if(player.countCards('h')<2) return false;                
                    if(player.storage.chenLunXieZouQu_insert==true) return false;    
                    if(player.storage.chenLunXieZouQu_use==true) return false;
                    return player.storage.chenLunXieZouQu.length>=2;
                },
                direct:true,
                content:function(){
                    player.storage.chenLunXieZouQu_insert=true;
                    trigger.getParent().insertAfter(lib.skill.chenLunXieZouQu.contentx,{
                        player:player,
                    });
                },
                contentx:function(){
                    'step 0'
                    if(!player.isLinked()){
                        var next=player.chooseToDiscard('h',2,function(card){
                            if(ui.selected.cards.length==0) return true;
                            return get.xiBie(card)==get.xiBie(ui.selected.cards[0]);
                        });
                        next.set('complexCard',true);
                        next.set('prompt',get.prompt('chenLunXieZouQu'));
                        next.set('prompt2',lib.translate.chenLunXieZouQu_info);
                    }else{
                        event.finish();
                    }
                    'step 1'
                    if(result.bool){
                        player.logSkill('chenLunXieZouQu');
                        player.showCards(result.cards);
                        event.cards=result.cards;
                        player.storage.chenLunXieZouQu_use=true;
                    }else{
                        player.storage.chenLunXieZouQu_insert=false;
                        event.finish();
                    }
                    'step 2'
                    player.addZhiShiWu('lingGan');
                    for(var i=0;i<event.cards.length;i++){
                        if(get.type(event.cards[i])=='faShu') event.flag=true;
                    }
                    if(event.flag){
                        player.chooseTarget('对目标对手造成1点法术伤害',true,function(card,player,target){
                            return player.side!=target.side;
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'red');
                    result.targets[0].damageFaShu(1,player);
                },
                group:['chenLunXieZouQu_chongZhi','chenLunXieZouQu_jiShu'],
                subSkill:{
                    chongZhi:{
                        trigger:{global:'phaseBegin'},
                        direct:true,
                        firstDo:true,
                        content:function(){
                            player.storage.chenLunXieZouQu=[];
                            player.storage.chenLunXieZouQu_use=false;
                            player.storage.chenLunXieZouQu_insert=false;
                        }
                    },
                    jiShu:{
                        trigger:{global:'damageBegin0'},
                        filter:function(event,player){
                            if(event.faShu!=true) return false;
                            if(player.storage.chenLunXieZouQu.includes(event.player)) return false;
                            return event.player.side!=player.side&&event.source.side==player.side;
                        },
                        direct:true,
                        content:function(){
                            player.storage.chenLunXieZouQu.add(trigger.player);
                        }
                    }
                }
            },
            buXieHeXian:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('lingGan')>1;
                },
                chooseButton:{
                    check:function (button) {
                        var player = _status.event.player;
                        if(typeof button.link=="number"){
                            var num=player.getHandcardLimit()-player.countCards('h');
                            if(num>=button.link-1) return button.link;
                        }else if(typeof button.link=="string"){
                            var num=player.getHandcardLimit()-player.countCards('h');
                            if(num>=2&&button.link=='摸'){
                                return 1;
                            }
                            if(num<2&&button.link=='弃'){
                                return 1;
                            }
                        }
                        return 0.5;
                    },

                    dialog:function(event,player){
						var dialog=ui.create.dialog('不谐和弦：移除X点【灵感】','hidden');
                        var list=[];
                        for(var i=0;i<=player.countZhiShiWu('lingGan');i++){
                            if(i<2) continue;
                            list.push(i);
                        }
						dialog.add([list,'tdnodes']);
                        dialog.add([['摸','弃'],'tdnodes'])
						return dialog;
					},
                    filter:function(button,player){
                        if (ui.selected.buttons.length) return typeof ui.selected.buttons[0].link != typeof button.link;
                        else return true;
                    },
                    select:2,
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
                            selectTarget:1,
                            filterTarget:true,
                            contentBefore:function(){
                                'step 0'
                                var links=lib.skill.buXieHeXian_backup.links;
                                for(var i=0;i<links.length;i++){
                                    if(typeof links[i]=='number'){
                                        event.buXieHeXian_num=links[i]-1;
                                        event.buXieHeXian=links[i];
                                    }
                                }
                                'step 1'
                                if(player.isLinked()) player.chongZhi();
                                'step 2'
                                player.removeZhiShiWu('lingGan',event.buXieHeXian_num+1);
                            },
							content:function(){
								'step 0'
                                var links=lib.skill.buXieHeXian_backup.links;
                                for(var i=0;i<links.length;i++){
                                    if(typeof links[i]=='number'){
                                        event.buXieHeXian_num=links[i]-1;
                                    }else if(typeof links[i]=='string'){
                                        event.buXieHeXian=links[i];
                                    }
                                }
								if(event.buXieHeXian=='摸'){
                                    player.draw(event.buXieHeXian_num);
                                }else{
                                    player.chooseToDiscard('h',event.buXieHeXian_num,true);
                                }
                                'step 1'
                                if(event.buXieHeXian=='摸'){
                                    target.draw(event.buXieHeXian_num);
                                }else{
                                    target.chooseToDiscard('h',event.buXieHeXian_num,true);
                                }
                                
							},
                            ai:{
                                result:{
                                    target:function(player,target){
                                        var num=player.getHandcardLimit()-player.countCards('h');
                                        if(num>=2) return -target.countCards('h');
                                        else return target.countCards('h');
                                    }
                                }
                            }
						}
					},
                    prompt:function(links,player){
                        for(var i=0;i<links.length;i++){
                            if(typeof links[i]=='number'){
                                var buXieHeXian_num=links[i]-1;
                            }else if(typeof links[i]=='string'){
                                var buXieHeXian=links[i];
                            }
                        }
                        if(buXieHeXian=='摸'){
                            return `你和目标角色各摸${buXieHeXian_num}张牌[强制]`
                        }else{
                            return `你和目标角色各弃${buXieHeXian_num}张牌`
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        var num=3+player.countZhiShiWu('lingGan')*0.5;
                        return num;
                    },
                    result:{
                        player:1,
                    }
                }
                
            },
            jinJiShiPian:{
                trigger:{global:'yongHengYueZhang'},
                forced:true,
                content:function(){
                    'step 0'
                    var info=get.info('lingGan');
                    if(player.countZhiShiWu('lingGan')<info.intro.max){
                        player.addZhiShiWu('lingGan');
                        trigger.player.removeZhiShiWu('yongHengYueZhang');
                    }else{
                        player.damageFaShu(3,player);
                        player.hengZhi();
                    }
                }
            },
            xiWangFuGeQu:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                   'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseControl(['是','否']).set('prompt','是否摸1张牌').set("ai",function(){
                        return '否'
                    });
                    'step 2'
                    if(result.control=='是'){
                        player.draw();
                    }
                    'step 3'
                    var players=game.filterPlayer((function(current){
                        return current.side==player.side;
                    }));
                    event.flag=false;
                    for(var i=0;i<players.length;i++){
                        if(players[i].hasZhiShiWu('yongHengYueZhang')){
                            event.owner=players[i];
                            event.flag=true;
                            break;
                        }
                    }
                    if(event.flag){
                        event.owner.removeZhiShiWu('yongHengYueZhang');
                        player.chooseTarget('将【永恒乐章】转移给我方另一名目标角色',true,function(card,player,target){
                            return target.side==player.side&&target!=event.owner;
                        });
                    }else{
                        player.chooseTarget('将【永恒乐章】放置于目标队友面前',true,function(card,player,target){
                            return target.side==player.side&&target!=player;
                        });
                    }
                    'step 4'
                    event.target=result.targets[0];
                    if(!event.target.hasSkill('yongHengYueZhang')){
                        event.target.addSkill('yongHengYueZhang');
                    }
                    'step 5'
                    event.target.addZhiShiWu('yongHengYueZhang');
                    event.target.storage.yongHengYueZhang_player=player;
                    'step 6'
                    if(event.flag){
                        if(player.countCards('h')>0){
                            player.chooseToDiscard(1,true);
                        }
                        var list=['治疗','灵感'];
                        player.chooseControl(list).set('prompt','选择+1( )');
                    }else{
                        event.finish();
                    }
                    'step 7'
                    if(result.control=='治疗'){
                        player.changeZhiLiao(1);
                    }else{
                        player.addZhiShiWu('lingGan');
                    }
                },
                ai:{
                    shuiJing:true,
                }
            },
            jiAngKuangXiangQu:{},
            shengLiJiaoXiangShi:{},
            lingGan:{
                intro:{
                    name:'灵感',
                    markcount:'mark',
                    max:3,
                    content:'mark',
                },
                markimage:'image/card/hong.png'
            },
            yongHengYueZhang:{
                intro:{
                    name:'(专)永恒乐章',
                    content:"(专)[响应]激昂狂想曲：<span class='tiaoJian'>(回合开始时若你拥有【永恒乐章】)</span>选择以下一项执行：<br>·吟游诗人对2名目标对手各造成1点法术伤害③。 <br>·你弃2张牌。<br>(专)[响应]胜利交响诗：<span class='tiaoJian'>(回合结束时若你拥有【永恒乐章】)</span>选择以下一项执行<br>·将我方【战绩区】的1个星石提炼成为你的能量。<br>·为我方【战绩区】+1[宝石]，你+1[治疗]。",
                    nocount:true,
                },
                group:['yongHengYueZhang_jiAngKuangXiangQu','yongHengYueZhang_shengLiJiaoXiangShi'],
                markimage:'image/card/yongHengYueZhang.png',
                subSkill:{
                    jiAngKuangXiangQu:{
                        trigger:{player:'phaseBegin'},
                        lastDo:true,
                        filter:function(event,player){
                            return player.hasZhiShiWu('yongHengYueZhang');
                        },
                        content:function(){
                            'step 0'
                            var choiceList=['吟游诗人对2名目标对手各造成1点法术伤害③','你弃2张牌'];
                            player.chooseControl().set('choiceList',choiceList);
                            'step 1'
                            if(result.control=='选项一'){
                                player.storage.yongHengYueZhang_player.chooseTarget(2,'对2名目标对手各造成1点法术伤害③',true,function(card,player,target){
                                    return target.side!=player.side;
                                });
                            }else{
                                player.chooseToDiscard(2,true);
                                event.goto(4);
                            }
                            'step 2'
                            event.targets=result.targets.sortBySeat(player);
                            game.log(player.storage.yongHengYueZhang_player,'选择了',event.targets);
                            player.storage.yongHengYueZhang_player.line(event.targets,'red');
                            event.targets[0].damageFaShu(1,player.storage.yongHengYueZhang_player);
                            'step 3'
                            event.targets[1].damageFaShu(1,player.storage.yongHengYueZhang_player);
                            'step 4'
                            event.trigger('yongHengYueZhang');
                        }
                    },
                    shengLiJiaoXiangShi:{
                        trigger:{player:'phaseEnd'},
                        lastDo:true,
                        priority:1,
                        filter:function(event,player){
                            return player.hasZhiShiWu('yongHengYueZhang');
                        },
                        content:function(){
                            'step 0'
                            var choiceList=['将我方【战绩区】的1个星石提炼成为你的能量','为我方【战绩区】+1[宝石]，你+1[治疗]'];
                            var list=['选项二'];
                            if(player.side==true){
                                var xingShi=game.hongZhanJi;
                            }else{
                                var xingShi=game.lanZhanJi;
                            }
                            if(player.countNengLiangAll()<player.getNengLiangLimit()&&xingShi.length>0){
                                list.unshift('选项一');
                            }
                            var next=player.chooseControl(list).set('choiceList',choiceList).set("ai",function(){
                                var num=Math.random();
                                if(num<0.5) return '选项一';
                                return '选项二';
                            });
                            'step 1'
                            if(result.control=='选项一'){
                                event.goto(2);
                            }else{
                                event.goto(4);
                            }
                            'step 2'
                            if(player.side==true){
                                var list=game.hongZhanJi;
                            }else if(player.side==false){
                                var list=game.lanZhanJi;
                            }
                            var next=player.chooseButton(['将我方【战绩区】的1个星石提炼成为你的能量',[list,'tdnodes']],true);
                            next.set('forced',true);
                            'step 3'
                            for(var i=0;i<result.links.length;i++){
                                if(result.links[i]=='宝石'){
                                    player.addMark('_tiLian_r');
                                    player.changeZhanJi('r',-1);
                                }else if(result.links[i]=='水晶'){
                                    player.addMark('_tiLian_b');
                                    player.changeZhanJi('b',-1);
                                }
                            }
                            event.goto(5);
                            'step 4'
                            player.addZhanJi('r',1);
                            player.changeZhiLiao(1);
                            'step 5'
                            event.trigger('yongHengYueZhang');
                        }
                    }
                }
            },

            //勇者
            yongZheZhiXin:{
                trigger:{global:'phaseBefore'},
                forced:true,
                filter:function(event,player){
                    return game.phaseNumber==0;
                },
                content:function(){
                    player.addNengLiang('b',2);
                }
            },
            nuHou:{
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('nuQi')) return false;
                    return get.is.zhuDongGongJi(event);
                },
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('nuQi');
                    trigger.baseDamage+=2;
                    player.storage.nuHou=trigger.card;
                    var list=['是','否'];
                    player.chooseControl(list).set('prompt','是否摸1张牌');
                    'step 1'
                    if(result.control=='是'){
                        player.draw(1);
                    }
                },
                group:"nuHou_weiMingZhong",
                subSkill:{
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            if(!player.storage.nuHou) return false;
                            if(player.storage.nuHou!=event.source_card) return false;
                            return true;
                        },
                        priority:1,
                        direct:true,
                        content:function(){
                            player.addZhiShiWu('zhiXing');
                        }
                    }
                }
            },
            jinPiLiJin:{
                trigger:{player:'jinDuanZhiLi'},
                forced:true,
                content:function(){
                    'step 0'
                    player.hengZhi();
                    player.storage.gongJi++;
                    'step 1'
                    player.qiPai();
                },
                group:'jinPiLiJin_chongZhi',
                subSkill:{
                    chongZhi:{
                        trigger:{player:'phaseUseBegin'},
                        direct:true,
                        priority:3,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.chongZhi();
                            player.damageFaShu(3,player);
                        },
                    }
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        if(player.isLinked()) return 4;
                    }
                }
            },
            mingJingZhiShui:{
                //trigger:{player:'useCardBefore'},
                trigger:{player:'useCard'},
                filter:function(event,player){
                    if(player.countZhiShiWu('zhiXing')<4) return false;
                    return get.is.zhuDongGongJi(event);
                },
                content:function(){
                    player.removeZhiShiWu('zhiXing',4);
                    trigger.canYingZhan=false;
                    trigger.mingJingZhiShui=true;
                },
                group:'mingJingZhiShui_jieShu',
                subSkill:{
                    jieShu:{
                        trigger:{player:'useCardEnd'},
                        direct:true,
                        filter:function(event,player){
                            return event.mingJingZhiShui;
                        },
                        content:function(){
                           player.addNengLiang('b');
                        },
                    }
                }
            },
            tiaoXin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    var players=game.filterPlayer(function(current){
                        return player.side!=current.side;
                    });
                    for(var i=0;i<players.length;i++){
                        if(players[i].hasZhiShiWu('tiaoXinX')) return false;
                    }
                    return player.hasZhiShiWu('nuQi');
                },
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return player.side!=target.side;
                },
                content:function(){
                    player.removeZhiShiWu('nuQi');
                    player.addZhiShiWu('zhiXing');
                    if(!target.hasSkill('tiaoXinX')){
                        target.addSkill('tiaoXinX');
                    }
                    target.addZhiShiWu('tiaoXinX');
                    target.storage.tiaoXinX_player=player;
                },
                ai:{
                    order:3.8,
                    result:{
                        target:-1,
                    }
                }
            },
            tiaoXinX:{
                intro:{
                    name:"(专)[法术]挑衅",
                    content:'你在下个行动阶段必须且只能主动攻击勇者，否则你跳过该行动阶段，触发后移除此牌。',
                    nocount:true,
                },
                markimage:'image/card/tiaoXin.png',

                filterx:function(event,player,num){
                    //无可启动技，跳过启动前后挑衅
                    if(event.name=='phaseUse'&&num==1){
						if(player.storage.qiDong==false) return false;
					}
					return player.hasZhiShiWu('tiaoXinX');
				},
                filter:function(event,player){
                    return lib.skill.tiaoXinX.filterx(event,player);
                },
                enable:'wuFaXingDong',
				type:'wuFaXingDong',
                content:function(){
                    player.removeZhiShiWu('tiaoXinX')
                    var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
                    player.removeSkill('tiaoXinX');
                },
                group:['tiaoXinX_qiDongQian','tiaoXinX_qiDongHou','tiaoXinX_kaiShi','tiaoXinX_sheZhi','tiaoXinX_yiChu'],
                subSkill:{
                    qiDongQian:{
						trigger:{player:'phaseUseBegin'},
						priority:2,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player,1);
						},
                        direct:true,
                        content:function(){
                            'step 0'
                            var list=['继续回合','跳过回合'];
                            player.chooseControl(list).set('prompt','启动前：你被挑衅了');
                            'step 1'
                            if(result.control=='跳过回合'){
                                player.removeZhiShiWu('tiaoXinX')
                                player.removeSkill('tiaoXinX');
                                trigger.cancel();
                            }
                        },
                    },
                    qiDongHou:{
						trigger:{player:'phaseUseBegin'},
                        priority:-1,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player,1);
						},
                        direct:true,
                        content:function(){
                            'step 0'
                            var list=['继续回合','跳过回合'];
                            player.chooseControl(list).set('prompt','启动后：你被挑衅了');
                            'step 1'
                            if(result.control=='跳过回合'){
                                player.removeZhiShiWu('tiaoXinX')
                                player.removeSkill('tiaoXinX');
                                trigger.cancel();
                            }
                        },
                    },
                    kaiShi:{
						trigger:{player:'phaseUseBegin'},
						firstDo:true,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player);
						},
                        direct:true,
                        content:function(){
                            'step 0'
                            var list=['继续回合','跳过回合'];
                            player.chooseControl(list).set('prompt','开始：你被挑衅了');
                            'step 1'
                            if(result.control=='跳过回合'){
                                player.removeZhiShiWu('tiaoXinX')
                                player.removeSkill('tiaoXinX');
                                trigger.cancel();
                            }
                        },
                    },
                    sheZhi:{
                        trigger:{player:'phaseUseBegin'},
						lastDo:true,
                        direct:true,
						filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player);
						},
                        content:function(){
                            trigger.canTeShu=false;
                            player.addTempSkill('tiaoXinX_xianZhi');
                        },
                    },
                    yiChu:{
                        trigger:{player:'phaseUseAfter'},
                        filter:function(event,player){
							return lib.skill.tiaoXinX.filterx(event,player);
						},
                        direct:true,
                        content:function(){
                            player.removeZhiShiWu('tiaoXinX')
                            player.removeSkill('tiaoXinX');
                        },
                    },
                    xianZhi:{
                        init:function(player,skill){
                            player.addSkillBlocker(skill);
                        },
                        onremove:function(player,skill){
                            player.removeSkillBlocker(skill);
                        },
                        skillBlocker:function(skill,player){
                            var info=get.info(skill);
                            return info.type=='faShu'||info.type=='teShu';
                        },
                        mod:{
                            playerEnabled:function(card,player,target){
                                if(!player.hasZhiShiWu('tiaoXinX')) return;
                                if(_status.event.yingZhan==true) return;
                                if(player.storage.tiaoXinX_player!=target) return false;
                            },
                            cardEnabled:function(card,player){
                                if(!player.hasZhiShiWu('tiaoXinX')) return;
                                if(_status.event.yingZhan==true) return;
                                if(get.type(card)=='faShu') return false;
                            },
                        }
                    }
                }, 
            },
            jinDuanZhiLi:{
                group:['jinDuanZhiLi_mingZhong','jinDuanZhiLi_weiMingZhong'],
                subSkill:{
                    mingZhong:{
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            if(!player.canBiShaShuiJing()) return false;
                            return get.is.zhuDongGongJi(event.getParent());
                        },
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            'step 1'
                            event.cards=player.getCards('h');
                            player.discard(event.cards);
                            'step 2'
                            player.showCards(event.cards);
                            'step 3'
                            var num=0;
                            var nuQi=0;
                            for(var i=0;i<event.cards.length;i++){
                                if(get.type(event.cards[i])=='faShu'){
                                    nuQi++;
                                }
                                if(get.xiBie(event.cards[i])=='huo'){
                                    num++;
                                }
                            };
                            if(nuQi>0){
                                player.addZhiShiWu('nuQi',nuQi);
                            }
                            if(num>0){
                                trigger.getParent().baseDamage+=num;
                                player.damageFaShu(num,player);
                            }
                            'step 4'
                            event.player=player;
                            event.trigger('jinDuanZhiLi');
                        }
                    },
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            if(!player.canBiShaShuiJing()) return false;
                            if(event.yingZhan==true) return false;
                            return true;
                        },
                        content:function(){
                            'step 0'
                            player.removeBiShaShuiJing();
                            'step 1'
                            event.cards=player.getCards('h');
                            player.discard(event.cards);
                            'step 2'
                            player.showCards(event.cards);
                            'step 3'
                            var nuQi=0;
                            var zhiXing=0;
                            for(var i=0;i<event.cards.length;i++){
                                if(get.type(event.cards[i])=='faShu'){
                                    nuQi++;
                                }
                                if(get.xiBie(event.cards[i])=='shui'){
                                    zhiXing++;
                                }
                            };
                            if(nuQi>0) player.addZhiShiWu('nuQi',nuQi);
                            if(zhiXing>0) player.addZhiShiWu('zhiXing',zhiXing);
                            'step 4'
                            event.player=player;
                            event.trigger('jinDuanZhiLi');
                        }
                    },
                },
                ai:{
                    shuiJing:true,
                }
            },
            siDou:{
                trigger:{player:'jiangYaoChengShou2'},
                lastDo:true,
                filter:function(event,player){
                    return event.faShu&&player.canBiShaBaoShi();
                },
                content:function(){
                    player.removeBiShaBaoShi();
                    player.addZhiShiWu('nuQi',3);
                    trigger.shiQiMax=-1;
                },
                check:function(event,player){
                    var num=Math.random();
                    if(event.num+player.countCards('h')>player.getHandcardLimit()){
                        return num>0.1;
                    }else{
                        return num>0.6;
                    }
                },
                ai:{
                    baoShi:true
                }
            },
            nuQi:{
                intro:{
                    max:4,
                    content:'mark',
                },
                markimage:'image/card/hong.png',
            },
            zhiXing:{
                intro:{
                    max:4,
                    content:'mark',
                },
                markimage:'image/card/lan.png',
            },

            //格斗家
            nianQiLiChang:{
                trigger:{player:"damageBegin0"},
                filter:function(event,player){
                    return event.num>4;
                },
                forced:true,
                content:function(){
                    trigger.num=4
                }
            },
            xuLiYiji:{
                trigger:{player:"useCard"},
                //priority:1,
                filter:function(event,player){
                    if(player.countZhiShiWu('douQi')>=lib.skill.douQi.intro.max) return false;

                    if(event.selected) return false;

                    return get.is.zhuDongGongJi(event);
                },
                firstDo:true,
                content:function(){
                    trigger.selected=true;
                    player.addZhiShiWu('douQi');
                    trigger.baseDamage+=1;
                    player.storage.xuLiYiji=trigger.card;
                },
                check:function(event,player){
                    if(!player.isLinked()) return true;
                    var num=Math.random();
                    return num>0.9;
                },
                group:'xuLiYiji_weiMingZhong',
                subSkill:{
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return player.storage.xuLiYiji==event.source_card;
                        },
                        content:function(){
                            player.damageFaShu(player.countZhiShiWu('douQi'),player);
                        }
                    },
                    
                }
            },
            nianDan:{
                trigger:{player:['useSkillEnd','useCardEnd']},
                filter:function(event,player){
                    if(player.countZhiShiWu('douQi')>=lib.skill.douQi.intro.max) return false;
                    return get.is.faShuXingDong(event);
                },
                content:function(){
                    'step 0'
                    player.addZhiShiWu('douQi');
                    'step 1'
                    player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 2'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'red');
                    event.target=result.targets[0];
                    if(event.target.zhiLiao==0){
                        event.flag=true;
                    }
                    'step 3'
                    event.target.damageFaShu(1,player);
                    'step 4'
                    if(event.flag){
                        player.damageFaShu(player.countZhiShiWu('douQi'),player);
                    }
                    
                },
                check:function(event,player){
                    return player.countZhiShiWu('douQi')<=3;
                },
            },
            baiShiHuanLongQuan:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.qiDong) return false;
                    return player.countZhiShiWu('douQi')>=3;
                },
                //priority:1,
                content:function(){
                    player.removeZhiShiWu('douQi',3);
                    if(!player.isLinked()) player.storage.baiShiHuanLongQuan=[];
                    player.hengZhi();
                },
                group:['baiShiHuanLongQuan_zhuDong','baiShiHuanLongQuan_yingZhan','baiShiHuanLongQuan_faShuAndTeShu','baiShiHuanLongQuan_gongJi','baiShiHuanLongQuan_xuLiYiji'],
                subSkill:{
                    zhuDong:{
                        trigger:{player:'useCard'},
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            return get.is.zhuDongGongJi(event);
                        },
                        priority:1,
                        direct:true,
                        content:function(){
                            trigger.baseDamage+=2;
                        }
                    },
                    yingZhan:{
                        trigger:{player:'useCard'},
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            return get.is.yingZhanGongJi(event);
                        },
                        direct:true,
                        content:function(){
                            trigger.baseDamage+=1;
                        }
                    },
                    faShuAndTeShu:{
                        trigger:{player:['useSkill','useCard']},
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            if(event.name=='useSkill'){
                                var info=get.info(event.skill);
                                if(info.type=='teShu') return true;
                            }
                            return get.is.faShuXingDong(event);
                        }, 
                        direct:true,
                        content:function(){
                            player.chongZhi();
                            player.storage.baiShiHuanLongQuan=[];
                        }
                    },
                    gongJi:{
                        trigger:{player:'useCardBefore'},
                        direct:true,
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            return get.is.zhuDongGongJi(event);
                        },
                        content:function(){
                            if(player.storage.baiShiHuanLongQuan.length==0){
                                player.storage.baiShiHuanLongQuan.push(trigger.targets[0]);
                            }else{
                                if(!player.storage.baiShiHuanLongQuan.includes(trigger.targets[0])){
                                    player.chongZhi();
                                    player.storage.baiShiHuanLongQuan=[];
                                }
                            }
                        }
                    },
                    xuLiYiji:{
                        trigger:{player:"xuLiYijiBegin"},
                        direct:true,
                        content:function(){
                            player.chongZhi();
                            player.storage.baiShiHuanLongQuan=[];
                        }
                    }
                },
                check:function(event,player){
                    if(player.countCards('h',card=>get.type(card)=='gongJi')==0) return false;
                    return true;
                }


            },
            qiJueBengJi:{
                trigger:{player:"useCard"},
                filter:function(event,player){
                    if(event.selected) return false;
                    if(!player.hasZhiShiWu('douQi')) return false;
                    return get.is.zhuDongGongJi(event);
                },
                content:function(){
                    trigger.selected=true;
                    player.removeZhiShiWu('douQi');
                    trigger.canYingZhan=false;
                    trigger.qiJueBengJi=true;
                },
                group:'qiJueBengJi_gongJiJieShu',
                subSkill:{
                    gongJiJieShu:{
                        trigger:{player:'useCardAfter'},
                        direct:true,
                        filter:function(event,player){
                            return event.qiJueBengJi;
                        },
                        content:function(){
                            player.damageFaShu(player.countZhiShiWu('douQi'),player);
                        }
                    }
                }
            },
            douShenTianQu:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.qiDong) return false;
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    player.removeBiShaShuiJing();
                    if(player.countCards('h')>3){
                        player.chooseToDiscard(true,'h',player.countCards('h')-3);
                    };
                    player.changeZhiLiao(2);
                },
                ai:{
                    shuiJing:true,
                },
                check:function(event,player){
                    if(player.countCards('h')<=3) return false;
                    return true;
                }
            },
            douQi:{
                intro:{
                    content:'mark',
                    max:6,
                },
                markimage:'image/card/hong.png',
            },

            //圣弓
            tianZhiGong:{
                trigger:{global:'phaseBefore'},
                filter:function(event,player){
                    return game.phaseNumber==0;
                },
                forced:true,
                content:function(){
                    player.addZhiShiWu('shengHuangHuiGuangPaoX');
                    player.addNengLiang('b',2);
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num+1;
                    }
                },
                group:['tianZhiGong_zhuDongGongJi','tianZhiGong_zhuDongGongJiMingZhong'],
                subSkill:{
                    zhuDongGongJi:{
                        trigger:{player:'useCard'},
                        forced:true,
                        filter:function(event,player){
                            return get.is.zhuDongGongJi(event)&&get.mingGe(event.card)!='sheng';
                        },
                        content:function(){
                            trigger.baseDamage-=1;
                        }
                    },
                    zhuDongGongJiMingZhong:{
                        trigger:{player:'useCardToTargeted'},
                        forced:true,
                        filter:function(event,player){
                            return get.is.zhuDongGongJi(event.getParent())&&get.mingGe(event.card)=='sheng';
                        },
                        content:function(){
                            player.addZhiShiWu('xinYang')
                        }
                    }
                }
            },
            shengXieJuBao:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    var h=player.getCards('h');
					var dict={};
                    for(var i=0;i<h.length;i++){
                        if(get.type(h[i])!='gongJi') continue;
                        var xiBie=get.xiBie(h[i]);
                        if(!dict[xiBie]) dict[xiBie]=0;
                        dict[xiBie]++;
                    }
    				let maxValue=-Infinity;  
                    for(let key in dict) {  
						if (dict[key] > maxValue) {  
							maxValue = dict[key];  
						}
					}
                    return maxValue>=2;
                },
                selectCard:2,
                filterCard:function(card){
                    if(get.type(card)!='gongJi') return false;
                    if(!ui.selected.cards.length) return true;
                    var xiBie=get.xiBie(card);
                    return get.xiBie(ui.selected.cards[0])==xiBie;
                },
                complexCard:true,
                prepare:'showCards',
                selectTarget:1,
                filterTarget:function(card,player,target){
                    return player.canUse_xingBei('anMie',target);
                },
                content:function(){
                    var xiBie=get.xiBie(cards[0]);
                    var name;
                    switch(xiBie){
                        case 'shui':name='shuiLianZhan';break;
                        case 'huo':name='huoYanZhan';break;
                        case 'feng':name='fengShenZhan';break;
                        case 'lei':name='leiGuangZhan';break;
                        case 'di':name='diLieZhan';break;
                        case 'an':name='anMie';break;
                    }
                    player.useCard({name:name,xiBie:xiBie,number:'sheng',shengXieJuBao:true},target).set('action',true);
                },
                group:'shengXieJuBao_gongJiWeiMingZhong',
                subSkill:{
                    gongJiWeiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            return player.zhiLiao>0&&event.source_card.shengXieJuBao;
                        },
                        direct:true,
                        content:function(){
                            'step 0'
                            if(player.zhiLiao>1){
                                var list=[1,2,'cancel2'];
                            }else{
                                var list=[1,'cancel2'];
                            }
                            var next=player.chooseControl(list);
                            next.set('prompt','是否移除X点[治疗]，目标队友弃X张牌');
                            next.set('ai',function(){
                                return 'cancel2';
                            });
                            'step 1'
                            if(result.control=='cancel2'){
                                event.finish();
                            }else{
                                event.num=result.control;
                                player.changeZhiLiao(-event.num);
                                player.chooseTarget(true,function(card,player,target){
                                    return target!=player&&target.side==player.side;
                                });
                            }
                            'step 2'
                            game.log(player,'选择了',result.targets[0]);
                            player.line(result.targets[0],'green');
                            result.targets[0].chooseToDiscard('h',true,event.num);
                        }
                    }
                },
                ai:{
                    order:5.5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2);
                        }
                    }
                }
            },
            shengHuangJiangLin:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(player.isLinked()) return false;
                    return player.zhiLiao>=2||player.countZhiShiWu('xinYang')>=2;
                },
                chooseButton:{
                    dialog:function(event,player){
						var dialog=ui.create.dialog('圣煌降临：移除[治疗]或【信仰】','hidden');
                        var list=[];
                        if(player.zhiLiao>=2){
                            list.push('治疗');
                        }
                        if(player.countZhiShiWu('xinYang')>=2){
                            list.push('信仰');
                        }
						dialog.add([list,'tdnodes']);
						return dialog;
					},
                    backup:function(links,player){
						return{
							links:links,
							type:'faShu',
							content:function(){
								event.links=lib.skill.shengHuangJiangLin_backup.links;
                                if(event.links[0]=='治疗'){
                                    player.changeZhiLiao(-2);
                                }else if(event.links[0]=='信仰'){
                                    player.removeZhiShiWu('xinYang',2);
                                }
                                player.hengZhi();
                                player.storage.faShu++;
							},
						}
					},
                },
                group:"shengHuangJiangLin_chongZhi",
                subSkill:{
                    chongZhi:{
                        trigger:{player:'useSkillBegin'},
                        direct:true,
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            var info=get.info(event.skill);
                            return info.type=='teShu';
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            var list=['治疗','信仰'];
                            player.chooseControl(list).set('prompt','+1点[治疗]或【信仰】');
                            'step 2'
                            if(result.control=='治疗'){
                                player.changeZhiLiao(1);
                            }else if(result.control=='信仰'){
                                player.addZhiShiWu('xinYang',1);
                            }
                        }
                    }
                },
                ai:{
                    order:7,
                    result:{
                        player:1,
                    }
                }
            },
            shengGuangBaoLie:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.isLinked();
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('圣光爆裂','hidden');
                        var list=[['1',"摸1张牌[强制]，移除你的1点[治疗]，你+1【信仰】，目标队友+1[治疗]"],['2',"<span class='tiaoJian'>(移除你的X[治疗]，选择最多X名手牌数不大于你手牌数-X的对手)</span>你弃X张牌，然后对他们各造成(Y+2)点攻击伤害。 Y为目标数中拥有[治疗]的人数"]];
						dialog.add([list,'textbutton']);
						return dialog;
                    },
                    filter:function(button,player){
                        var link=button.link;
                        if(link=='1'){
                            return true;
                        }
                        if(link=='2'){
                            var targets=game.filterPlayer(function(current){
                                return current.side!=player.side&&current.countCards('h')<=player.countCards('h')-1;
                            })
                            return player.zhiLiao>0&&targets.length>0;
                        }
                    },
                    backup:function(links,player){
                        if(links[0]=='1'){
                            var next=get.copy(lib.skill['shengGuangBaoLie_1']);
                        }else if(links[0]=='2'){
                            var next=get.copy(lib.skill['shengGuangBaoLie_2']);
                        }
						return next;
					},
                    prompt:function(links,player){
                        if(links[0]=='1'){
                            return '目标队友+1[治疗]';
                        }else if(links[0]=='2'){
                            return;
                        }
                        
                    },
                },
                subSkill:{
                    1:{
                        type:'faShu',
                        selectTarget:1,
                        filterTarget:function(card,player,target){
                            return target.side==player.side&&target!=player;
                        },
                        content:function(){
                            'step 0'
                            player.draw(1);
                            'step 1'
                            if(player.zhiLiao>0){
                                player.changeZhiLiao(-1);
                            }
                            'step 2'
                            player.addZhiShiWu('xinYang');
                            'step 3'
                            target.changeZhiLiao(1);
                        },
                        ai:{
                            result:{
                                target:function(target,player){
                                    return get.zhiLiaoEffect(target,1);
                                }
                            }
                        }
                    },
                    2:{
                        type:'faShu',
                        content:function(){
                            'step 0'
                            var targets=game.filterPlayer(function(current){
                                return current.side!=player.side;
                            });
                            //获取对手中手牌数最小的角色的手牌数
                            var num=10;
                            for(var i=0;i<targets.length;i++){
                                if(targets[i].countCards('h')<num) num=targets[i].countCards('h');
                            }
                            var cha=player.countCards('h')-num;
                            var list=[];
                            for(var i=1;i<=player.zhiLiao;i++){
                                if(i>cha) break;
                                list.push(i);
                            }
                            player.chooseControl(list).set('prompt','移除你的X[治疗]');
                            'step 1'
                            event.x=result.control;
                            player.changeZhiLiao(-result.control);
                            'step 2'
                            player.chooseTarget(true,[1,event.x],function(card,player,target){
                                return target.countCards('h')<=player.countCards('h')-_status.event.x&&target.side!=player.side;
                            }).set('x',event.x);
                            'step 3'
                            event.targets=result.targets.sortBySeat(player);
                            game.log(player,'选择了',event.targets);
                            player.line(event.targets,'red');
                            player.chooseToDiscard(true,'h',event.x);
                            'step 4'
                            event.num=2;
                            for(var i=0;i<event.targets.length;i++){
                                if(event.targets[i].zhiLiao>0) event.num++;
                            }
                            'step 5'
                            var target=event.targets.shift();
                            target.damage(event.num,player);
                            if(event.targets.length>0){
                                event.redo();
                            }
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        return 10-player.countCards('h');
                    },
                    result:{
                        player:1,
                    }
                }
            },
            liuXingShengDan:{
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    if(!player.isLinked()) return false;
                    return get.is.zhuDongGongJi(event)&&(player.zhiLiao>0||player.countZhiShiWu('xinYang')>0);
                },
                content:function(){
                    'step 0'
                    var list=[];
                    if(player.zhiLiao>0){
                        list.push('治疗');
                    }
                    if(player.countZhiShiWu('xinYang')>0){
                        list.push('信仰');
                    }
                    player.chooseControl(list).set('prompt','移除1点[治疗]或1点【信仰】');
                    'step 1'
                    if(result.control=='治疗'){
                        player.changeZhiLiao(-1);
                    }else if(result.control=='信仰'){
                        player.removeZhiShiWu('xinYang',1);
                    }
                    player.chooseTarget(true,function(card,player,target){
                        return target.side==player.side;
                    }).set('prompt','我方目标角色+1[治疗]').set('ai',function(target){
                        return get.zhiLiaoEffect(target,1);
                    });
                    'step 2'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'blue');
                    result.targets[0].changeZhiLiao(1);
                }
            },
            shengHuangHuiGuangPao:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    if(!player.isLinked()) return false;
                    if(player.countZhiShiWu('shengHuangHuiGuangPaoX')<1) return false;
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi;
                        num+=Math.max(0,shiQiCha);
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                        num+=Math.max(0,shiQiCha);
                    }
                    return player.countZhiShiWu('xinYang')>=num;
                },
                selectTarget:-1,
                filterTarget:true,
                contentBefore:function(){
                    var num=4;
                    if(player.side==true){
                        var shiQiCha=game.lanShiQi-game.hongShiQi;
                        num+=Math.max(0,shiQiCha);
                    }else{
                        var shiQiCha=game.hongShiQi-game.lanShiQi;
                        num+=Math.max(0,shiQiCha);
                    }
                    player.removeZhiShiWu('shengHuangHuiGuangPaoX',num);
                    player.removeZhiShiWu('xinYang',num);
                },
                content:function(){
                    if(target.countCards('h')>4){
                        target.chooseToDiscard(true,'h',target.countCards('h')-4);
                    }else if(target.countCards('h')<4&&target.getHandcardLimit()>=4){
                        target.drawTo(4);
                    }else if(target.countCards('h')<4&&target.getHandcardLimit()<4&&target.countCards('h')<target.getHandcardLimit()){
                        target.drawTo(target.getHandcardLimit());
                    }
                },
                contentAfter:function(){
                    'step 0'
                    player.changeXingBei(1);
                    var choiceList=['红方士气设置为蓝方士气','蓝方士气设置为红方士气'];
                    var list=['选项一','选项二']
                    player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        var num=Math.random();
                        if(num<0.5) return '选项一';
                        else return '选项二';
                    });
                    'step 1'
                    if(result.control=='选项一'){
                        var num=game.lanShiQi-game.hongShiQi;
                        game.changeShiQi(num,true);
                    }else{
                        var num=game.hongShiQi-game.lanShiQi;
                        game.changeShiQi(num,false);
                    }
                },
                ai:{
                    order:function(item,player){
                        if(player.side==true){
                            if(game.hongShiQi<game.lanShiQi) return 10;
                        }else{
                            if(game.lanShiQi<game.hongShiQi) return 10;
                        }
                        return 2;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            ziDongTianChong:{
                forced:true,
                trigger:{player:'phaseEnd'},
                priority:1,
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&!event.teShu;
                },
                content:function(){
                    'step 0'
                    var choiceList=['[水晶]你+1【信仰】或+1[治疗]','[宝石]你+1[水晶]，+2【信仰】或+2[治疗]'];
                    var list=['选项一'];
                    if(player.canBiShaBaoShi()){
                        list.push('选项二');
                    }
                    player.chooseControl(list).set('choiceList',choiceList).set('ai',function(){
                        var player=_status.event.player;
                        if(player.canBiShaBaoShi()) return '选项二';
                        return '选项一';
                    });
                    'step 1'
                    if(result.control=='选项一'){
                        player.removeBiShaShuiJing();
                        event.num=1;
                    }else{
                        player.removeBiShaBaoShi();
                        player.addNengLiang('b');
                        event.num=2;
                    }
                    'step 2'
                    var list=['信仰','治疗'];
                    player.chooseControl(list).set('prompt','+'+event.num+'点【信仰】或[治疗]');
                    'step 3'
                    if(result.control=='治疗'){
                        player.changeZhiLiao(event.num);
                    }else if(result.control=='信仰'){
                        player.addZhiShiWu('xinYang',event.num);
                    }
                },
                group:'ziDongTianChong_teShu',
                subSkill:{
                    teShu:{
                        trigger:{player:'useSkill'},
                        direct:true,
                        filter:function(event,player){
                            var info=get.info(event.skill);
                            return info.type=='teShu';
                        },
                        content:function(){
                            trigger.getParent('phase').teShu=true;
                        }
                    }
                },
                ai:{
                    shuiJing:true,
                    baoShi:true,
                }
            },
            xinYang:{
                intro:{
                    content:'mark',
                    max:10,
                },
                markimage:'image/card/hong.png',
            },
            shengHuangHuiGuangPaoX:{
                intro:{
                    content:'mark',
                    max:1,
                    nocount:true,
                },
                markimage:'image/card/lan.png',
            },

            //剑帝
            jianHunShouHu:{
                trigger:{source:'gongJiWeiMingZhong'},
                filter:function(event,player){
                    if(event.storage.tianShiZhiHun) return false;
                    if(event.storage.eMoZhiHun) return false;
                    return !event.yingZhan&&player.getExpansions('jianHun').length<lib.skill.jianHun.intro.max;
                },
                forced:true,
                priority:2,
                content:function(){
                    //game.log(player,'将',trigger.source_card.cards,'作为盖牌');
                    player.addToExpansion('draw',trigger.source_card.cards,player,'log').gaintag.add('jianHun');
                }
            },
            yangGong:{
                trigger:{source:'gongJiWeiMingZhong'},
                forced:true,
                priority:1,
                filter:function(event,player){
                    return !event.yingZhan;
                },
                content:function(){
                    player.addZhiShiWu('jianQi');
                }
            },
            jianQiZhan:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event.getParent())&&player.countZhiShiWu('jianQi')>0;
                },
                direct:true,
                priority:1,
                content:function(){
                    'step 0'
                    var list=[];
                    var num=player.countZhiShiWu('jianQi');
                    for(var i=1;i<=num;i++){
                        if(i>3) break;
                        list.push(i);
                    }
                    list.push('cancel2');
                    var next=player.chooseControl(list);
                    next.set('prompt',get.prompt('jianQiZhan'));
                    next.set('prompt2',lib.translate.jianQiZhan_info);
                    next.set('ai',function(){
                        return _status.event.num;
                    });
                    next.set('num',list.length-2);
                    'step 1'
                    if(result.control=='cancel2'){
                        event.finish();
                    }else{
                        player.logSkill(event.name);
                        event.num=result.control;
                        player.removeZhiShiWu('jianQi',event.num);
                        var targetx=trigger.target;
                        var name=get.translation(targetx);
                        var next=player.chooseTarget(`对除你所攻击的目标以外的任意一名角色造成${event.num}点法术伤害③`,true,function(card,player,target){
                            return target!=_status.event.targetx;
                        });
                        next.set('targetx',targetx);
                        next.set('ai',function(target){
                            var player=_status.event.player;
                            return target.side!=player.side;
                        });
                    }
                    'step 2'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'red');
                    result.targets[0].damageFaShu(event.num,player);
                }

            },
            tianShiZhiHun:{
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)&&lib.skill.jianHun.tianShiZhiHun(player)>0;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('jianHun');
                    var next=player.chooseCardButton(cards,'是否发动【天使之魂】');
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.discard(result.links,'jianHun');
                        trigger.storage.tianShiZhiHun=true;
                    }else{
                        event.finish();
                    }
                },
                group:['tianShiZhiHun_gongJiMingZhong','tianShiZhiHun_gongJiWeiMingZhong'],
                subSkill:{
                    gongJiMingZhong:{
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            return event.getParent().storage.tianShiZhiHun;
                        },
                        direct:true,
                        content:function(){
                            player.changeZhiLiao(2);
                        }
                    },
                    gongJiWeiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return event.storage.tianShiZhiHun;
                        },
                        content:function(){
                            player.changeShiQi(1);
                        }
                    },
                }
            },
            eMoZhiHun:{
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)&&lib.skill.jianHun.eMoZhiHun(player)>0;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('jianHun');
                    var next=player.chooseCardButton(cards,'是否发动【恶魔之魂】');
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.discard(result.links,'jianHun');
                        trigger.storage.eMoZhiHun=true;
                    }else{
                        event.finish();
                    }
                },
                group:['eMoZhiHun_gongJiMingZhong','eMoZhiHun_gongJiWeiMingZhong'],
                subSkill:{
                    gongJiMingZhong:{
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            return event.getParent().storage.eMoZhiHun;
                        },
                        direct:true,
                        content:function(){
                            trigger.getParent().baseDamage++;
                        }
                    },
                    gongJiWeiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        direct:true,
                        filter:function(event,player){
                            return event.storage.eMoZhiHun;
                        },
                        content:function(){
                           player.addZhiShiWu('jianQi',2);
                        }
                    },
                }
            },
            buQuYiZhi:{
                trigger:{player:'useCardAfter'},
                filter:function(event,player){
                    //if(event.selected) return false;
                    return get.is.gongJiXingDong(event)&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    //trigger.selected=true;
                    player.draw();
                    player.addZhiShiWu('jianQi',1);
                    player.storage.gongJi++;
                },
            },
            jianHun:{
                intro:{
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('jianHun');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                    max:3,
                },
                tianShiZhiHun:function(player){
                    if(player.countNengLiangAll()==0) return 0;
                    else if(player.countNengLiangAll()%2==1) return player.getExpansions('jianHun').length;
                    else return 0;
                },
                eMoZhiHun:function(player){
                    if(player.countNengLiangAll()==0) return 0;
                    else if(player.countNengLiangAll()%2==0) return player.getExpansions('jianHun').length;
                    else return 0;
                },
                ai:{
                    shuiJing:true,
                }
            },
            jianQi:{
                intro:{
                    content:'mark',
                    max:5,
                },
                markimage:'image/card/hong.png',
            },

            //兽灵武士
            wuZheCanXin:{
                usable:1,
                trigger:{player:'useCardEnd'},
                filter:function(event,player){
                    return get.is.gongJiXingDong(event);
                },
                content:function(){
                    player.addZhiShiWu('canXin',1);
                }
            },
            yiJiWuNian:{
                trigger:{player:'useCardAfter'},
                filter:function(event,player){
                    //if(event.selected) return false;
                    return get.is.gongJiXingDong(event)&&player.countZhiShiWu('canXin')>=4;
                },
                content:function(){
                    player.removeZhiShiWu('canXin',4);
                    //trigger.selected=true;
                    player.storage.gongJi++;
                    player.storage.yiJiWuNian=false;
                    player.addTempSkill('yiJiWuNian_1');
                },
                subSkill:{
                    1:{
                        trigger:{player:'useCardToPlayer'},
                        filter:function(event,player){
                            return player.storage.yiJiWuNian==false&&get.is.gongJiXingDong(event.getParent());
                        },
                        direct:true,
                        content:function(){
                            player.storage.yiJiWuNian=true;
                            if(get.mingGe(trigger.card)=='ji'){
                                trigger.getParent().canShengDun=false;
                                trigger.getParent().canShengGuang=false;
                                trigger.getParent().canYingZhan=false;
                            }else{
                                trigger.getParent().canShengDun=false;
                                trigger.getParent().canShengGuang=false;
                            }
                        }
                    }
                }
            },
            shouHunYiNian:{
                forced:true,
                trigger:{player:'removeZhiShiWuEnd'},
                filter:function(event,player){
                    return event.zhiShiWu=='shouHun'&&event.num>0;
                },
                content:function(){
                    player.addZhiShiWu('canXin',trigger.num);
                },
                group:'shouHunYiNian_zhuDongGongJiMingZhong',
                subSkill:{
                    zhuDongGongJiMingZhong:{
                        forced:true,
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            return (!player.isLinked())&&get.is.zhuDongGongJi(event.getParent());
                        },
                        content:function(){
                            player.addZhiShiWu('shouHun',1);
                        }
                    }
                }

            },
            shouHunJingJie:{
                trigger:{global:'hengZhiEnd'},
                filter:function(event,player){
                    if(player.storage.shouHunJingJie_insert==true) return false;
                    return event.player!=player&&player.countZhiShiWu('shouHun')>0&&(!player.isLinked());
                },
                direct:true,
                contentx:function(){
                    'step 0'
                    var list=['是','否'];
                    player.chooseControl(list).set('prompt','是否发动【兽魂警戒】');
                    'step 1'
                    if(result.control=='是'){
                        player.logSkill('shouHunJingJie');
                        player.removeZhiShiWu('shouHun');
                        player.hengZhi();
                    }else{
                        event.goto(5);
                    }
                    'step 2'
                    var next=player.chooseTarget(true,"目标角色弃1张牌[展示]");
                    'step 3'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'green');
                    event.target=result.targets[0];
                    event.target.chooseToDiscard('h',true);
                    'step 4'
                    event.target.showCards(result.cards);
                    if(get.type(result.cards[0])=='faShu'){
                        player.addZhiShiWu('shouHun');
                    }
                    'step 5'
                    player.storage.shouHunJingJie_insert=false;
                },
                content:function(){
                    player.storage.shouHunJingJie_insert=true;
                    trigger.getParent().insertAfter(lib.skill.shouHunJingJie.contentx,{
                        player:player,
                    });
                }

            },
            shouFan:{
                trigger:{player:'damageBegin0'},
                filter:function(event,player){
                    return get.is.faShuShangHai(event)&&player.countZhiShiWu('shouHun')>0;
                },
                content:function(){
                    'step 0'
                    var list=[];
                    var num=player.countZhiShiWu('shouHun');
                    for(var i=1;i<=num;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','移除X点兽魂');
                    'step 1'
                    var num=result.control;
                    player.removeZhiShiWu('shouHun',num);
                    player.chooseToDiscard('h',true,num);
                    'step 2'
                    trigger.source.chooseToDiscard('h',true);
                    'step 3'
                    trigger.source.showCards(result.cards);
                    if(get.type(result.cards[0])=='faShu'){
                        player.addZhiShiWu('shouHun');
                    }
                }

            },
            yuHunLiuJuHeXingTai:{
                group:['yuHunLiuJuHeXingTai_shangHai','yuHunLiuJuHeXingTai_shouHunJianShao','yuHunLiuJuHeXingTai_shangHaiTuoLi','yuHunLiuJuHeXingTai_shouHunTuoLi'],
                subSkill:{
                    shangHai:{
                        trigger:{player:'useCard'},
                        filter:function(event,player){
                            return player.isLinked()&&get.is.gongJi(event)&&event.targets[0].isLinked();
                        },
                        forced:true,
                        content:function(){
                            trigger.baseDamage++;
                        }
                    },
                    shouHunJianShao:{
                        trigger:{player:'phaseEnd'},
                        priority:1,
                        forced:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            if(player.countZhiShiWu('shouHun')>0){
                                player.removeZhiShiWu('shouHun');
                            }
                        }
                    },
                    shangHaiTuoLi:{
                        trigger:{source:'jiangYaoChengShou1'},
                        firstDo:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        forced:true,
                        content:function(){
                            player.chongZhi();
                        }
                    },
                    shouHunTuoLi:{
                        trigger:{player:'phaseEnd'},
                        priority:0,
                        forced:true,
                        filter:function(event,player){
                            return player.isLinked()&&player.countZhiShiWu('shouHun')==0;
                        },
                        content:function(){
                            player.chongZhi();
                        }
                    }
                }
            },
            niFanJuHeZhan:{
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    return player.isLinked()&&get.is.gongJi(event)&&event.targets[0].countCards('h')<4;
                },
                content:function(){
                    'step 0'
                    var list=[];
                    var num=player.countZhiShiWu('shouHun');
                    for(var i=0;i<=num;i++){
                        list.push(i);
                    }
                    player.chooseControl(list).set('prompt','移除X点兽魂');
                    'step 1'
                    trigger.storage.niFanJuHeZhan_num=result.control;
                    if(result.control>0){
                        player.removeZhiShiWu('shouHun',result.control);
                    }
                },
                group:'niFanJuHeZhan_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        trigger:{player:'useCardToTargeted'},
                        forced:true,
                        filter:function(event,player){
                            return typeof event.getParent().storage.niFanJuHeZhan_num=='number';
                        },
                        content:function(){
                            'step 0'
                            trigger.target.chooseToDiscard('h',true,trigger.getParent().storage.niFanJuHeZhan_num+2);
                            'step 1'
                            if(result.cards.length<trigger.getParent().storage.niFanJuHeZhan_num+2){
                                trigger.target.changeShiQi(-1);
                            }
                            'step 2'
                            trigger.getParent().finish();
                        }
                    }
                }
            },
            yuHunLiuJuHeShi:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    player.addZhiShiWu('shouHun',1,Infinity);
                    'step 1'
                    var list=['摸','弃','放弃'];
                    player.chooseControl(list).set('prompt','摸或弃1张牌');
                    'step 2'
                    if(result.control=='摸'){
                        player.draw();
                    }else if(result.control=='弃'){
                        player.chooseToDiscard('h',true,1);
                    }
                    'step 3'
                    if(player.isLinked()){
                        player.addZhiShiWu('canXin');
                    }else{
                        player.hengZhi();
                    }
                },
                ai:{
                    baoShi:true,
                }
            },
            shouHun:{
                intro:{
                    content:'mark',
                    max:2,
                },
                markimage:'image/card/lan.png',
            },
            canXin:{
                intro:{
                    content:'mark',
                    max:4,
                },
                markimage:'image/card/hong.png',
            },

            //灵魂术士
            lingHunTunShi:{
                forced:true,
                trigger:{global:'changeShiQiEnd'},
                filter:function(event,player){
                    return player.side==event.side&&event.num<0;
                },
                content:function(){
                    player.addZhiShiWu('huangSeLingHun',Math.abs(trigger.num));
                }
            },
            lingHunZhaoHuan:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.type(card)=='faShu')>0;
                },
                filterCard:function(card){
                    return get.type(card)=='faShu';
                },
                selectCard:[1,Infinity],
                prepare:'showCards',
                content:function(){
                    player.addZhiShiWu('lanSeLingHun',cards.length);
                },
                ai:{
                    order:function(item,player){
                        return 2.1+player.countCards('h',card=>get.type(card)=='faShu');
                    },
                    result:{
                        player:1,
                    }
                }
            },
            lingHunZhuanHuan:{
                trigger:{player:'useCard'},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)&&(player.hasZhiShiWu('huangSeLingHun')||player.hasZhiShiWu('lanSeLingHun'));
                },
                content:function(){
                    'step 0'
                    var lanSe=player.hasZhiShiWu('lanSeLingHun');
                    var huangSe=player.hasZhiShiWu('huangSeLingHun');
                    if(lanSe&&huangSe){
                        var list=['黄色->蓝色','蓝色->黄色'];
                        player.chooseControl(list).set('prompt','选择转换的灵魂').set('ai',function(){
                            var player=_status.event.player;
                            if(player.countZhiShiWu('lanSeLingHun')>=player.countZhiShiWu('huangSeLingHun')) return '黄色->蓝色';
                            else return '蓝色->黄色';
                        });
                    }else if(lanSe){
                        player.removeZhiShiWu('lanSeLingHun');
                        player.addZhiShiWu('huangSeLingHun');
                        event.finish();
                    }else if(huangSe){
                        player.removeZhiShiWu('huangSeLingHun');
                        player.addZhiShiWu('lanSeLingHun');
                        event.finish();
                    }
                    'step 1'
                    if(result.control=='黄色->蓝色'){
                        player.removeZhiShiWu('huangSeLingHun');
                        player.addZhiShiWu('lanSeLingHun');
                    }else if(result.control=='蓝色->黄色'){
                        player.removeZhiShiWu('lanSeLingHun');
                        player.addZhiShiWu('huangSeLingHun');
                    }
                }
            },
            lingHunJingXiang:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('huangSeLingHun')>=2;
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('huangSeLingHun',2);
                    player.chooseToDiscard('h',true,2);
                    'step 1'
                    var chaZhi=target.getHandcardLimit()-target.countCards('h');
                    if(chaZhi<2){
                        var num=chaZhi;
                    }else{
                        var num=2;
                    }
                    target.draw(num);
                },
                ai:{
                    order:4,
                    result:{
                        target:-1,
                    }
                }
            },
            lingHunZhenBao:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>card.hasNature('lingHunZhenBao'))>0&&player.countZhiShiWu('huangSeLingHun')>=3;
                },
                useCard:true,
                filterCard:function(card){
                    return card.hasNature('lingHunZhenBao');
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('huangSeLingHun',3);
                    'step 1'
                    var num=3;
                    if(target.countCards('h')<3&&target.getHandcardLimit()>5){
                        num+=2;
                    }
                    target.damageFaShu(num,player);
                },
                ai:{
                    order:5,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,3);
                        },
                    }
                }
            },
            lingHunFuYu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>card.hasNature('lingHunFuYu'))>0&&player.countZhiShiWu('lanSeLingHun')>=3
                },
                useCard:true,
                filterCard:function(card){
                    return card.hasNature('lingHunFuYu');
                },
                selectCard:1,
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.removeZhiShiWu('lanSeLingHun',3);
                    'step 1'
                    target.addNengLiang('r',2);
                },
                ai:{
                    order:5,
                    result:{
                        target:function(player,target){
                            if(target.getHandcardLimit()-target.countNengLiangAll()>=2){
                                return 2;
                            }else if(target.getHandcardLimit()-target.countNengLiangAll()>=1){
                                return 1;
                            }else{
                                return 0;
                            }
                        }
                    }
                }
            },
            lingHunLianJie:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                //priority:1,
                filter:function(event,player){
                    if(event.qiDong) return false;
                    if(game.players.length==4) return false;
                    if(player.storage.lingHunLianJie) return false;
                    return player.hasZhiShiWu('huangSeLingHun')&&player.hasZhiShiWu('lanSeLingHun');
                },
                content:function(){
                    'step 0'
                    player.storage.lingHunLianJie=true;
                    player.removeZhiShiWu('huangSeLingHun');
                    player.removeZhiShiWu('lanSeLingHun'); 
                    'step 1'
                    var next=player.chooseTarget(true,'将【灵魂链接】放置于一名队友面前',function(card,player,target){
                        return target!=player&&target.side==player.side;
                    });
                    'step 2'
                    var target=result.targets[0];
                    player.storage.lingHunLianJie_player=target;
                    target.addZhiShiWu('lingHunLianJie');
                },
                intro:{
                    content:"<span class='tiaoJian'>(每当你们之间有人承受伤害时⑥，移除X点【蓝色灵魂】)</span>将X点伤害转移给另1人，转移后的伤害为法术伤害⑥。",  
                    nocount:true,
                },
                markimage:'image/card/lingHunLianJie.png',
                group:'lingHunLianJie_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        trigger:{global:'jiangYaoChengShou1'},
                        priority:5,
                        filter:function(event,player){
                            if(!player.storage.lingHunLianJie) return false;
                            if(!event.player.storage.lingHunLianJie) return false;
                            if(event.lingHunLianJie) return false;
                            return player.hasZhiShiWu('lanSeLingHun');
                        },
                        content:function(){
                            'step 0'
                            var num=player.countZhiShiWu('lanSeLingHun');
                            var list=[];
                            for(var i=1;i<=num;i++){
                                if(i>trigger.num) break;
                                list.push(i);
                            }

                            //计算移除量
                            var num1=player.getHandcardLimit()-player.countCards('h');
                            var num2=player.storage.lingHunLianJie_player.getHandcardLimit()-player.storage.lingHunLianJie_player.countCards('h');
                            if(trigger.player==player){
                                var yiChu=trigger.num-num1;
                                yiChu=Math.min(yiChu,list.length);
                                yiChu=Math.min(yiChu,num2);
                            }else{
                                var yiChu=trigger.num-num2;
                                yiChu=Math.min(yiChu,list.length);
                                yiChu=Math.min(yiChu,num1);
                            }
                            yiChu=Math.max(yiChu,1);
                            player.chooseControl(list).set('prompt','\u9009\u62e9\u8f6c\u79fb\u4f24\u5bb3\u91cf\uff0c\u76ee\u524d\u4f24\u5bb3\u91cf\u4e3a'+trigger.num).set('ai',function(player){
                                return _status.event.num-1;
                            }).set('num',yiChu);
                            'step 1'
                            event.num=result.control;
                            player.removeZhiShiWu('lanSeLingHun',event.num)
                            trigger.num-=event.num;
                            'step 2'
                            var list=[player,player.storage.lingHunLianJie_player];
                            list.sortBySeat(_status.currentPhase);
                            if(trigger.player==player){
                                if(list[0]==player){
                                    trigger.insertAfter(function(){
                                        player.damage(num,source).set('step',7).set('faShu',true).set('lingHunLianJie',true);
                                    },{
                                        player:player.storage.lingHunLianJie_player,
                                        num:event.num,
                                        source:player,
                                    })
                                }else{
                                    player.storage.lingHunLianJie_player.damage(event.num,player).set('step',7).set('faShu',true).set('lingHunLianJie',true); 
                                }
                            }else{
                                if(list[0]==player){
                                    player.damage(event.num,player).set('step',7).set('faShu',true).set('lingHunLianJie',true);
                                }else{
                                    trigger.insertAfter(function(){
                                        player.damage(num,player).set('step',7).set('faShu',true).set('lingHunLianJie',true);
                                    },{
                                        player:player,
                                        num:event.num,
                                    })
                                }
                            }
                        },
                        check:function(event,player){
                            if(event.player.name=='xianZhe'&&event.faShu==true){
                                if(event.num==1||event.num==4) return false;
                            }
                            var num1=player.getHandcardLimit()-player.countCards('h');
                            var num2=player.storage.lingHunLianJie_player.getHandcardLimit()-player.storage.lingHunLianJie_player.countCards('h');
                            if(event.player==player){ 
                                if(event.num<=num1) return false
                            }else{
                                if(event.num<=num2) return false
                            }
                            return true;
                        }
                    }
                }
            },
            lingHunZengFu:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    if(event.qiDong) return false;
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.addZhiShiWu('huangSeLingHun',2);
                    player.addZhiShiWu('lanSeLingHun',2);
                },
                ai:{
                    baoShi:true,
                }
            },
            huangSeLingHun:{
                intro:{
                    content:'mark',
                    max:6
                },
                markimage:'image/card/hong.png',
            },
            lanSeLingHun:{
                intro:{
                    content:'mark',
                    max:6
                },
                markimage:'image/card/lan.png',
            },

            //血之巫女
            xueZhiAiShang:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.storage.tongShengGongSi_use;
                },
                content:function(){
                    'step 0'
                    player.damageFaShu(2,player);
                    'step 1'
                    var next=player.chooseTarget('转移【同生共死】目标，取消则移除【同生共死】',function(card,player,target){
                        return target!=_status.event.targetX;
                    });
                    next.set('targetX',player.storage.tongShengGongSi_target);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        if(target==player) return -1;
                        if(target.side==player.side) return -1;
                        else return target.countCards('h')-player.storage.tongShengGongSi_target.countCards('h');
                    });
                    'step 2'
                    if(result.bool){
                        player.storage.tongShengGongSi_target.removeZhiShiWu('tongShengGongSi');
                        event.target=result.targets[0];
                    }else{
                        player.storage.tongShengGongSi_target.removeZhiShiWu('tongShengGongSi');
                        player.storage.tongShengGongSi_use=false;
                    }
                    'step 3'
                    player.qiPai();
                    'step 4'
                    player.storage.tongShengGongSi_target.qiPai();
                    if(!event.target){
                        player.storage.tongShengGongSi_target=null;
                        event.finish();
                    }
                    'step 5'
                    event.target.addZhiShiWu('tongShengGongSi');
                    if(!target.hasSkill('tongShengGongSi_xiaoGuo')){
                        event.target.storage.tongShengGongSi_player=player;
                        event.target.addSkill('tongShengGongSi_xiaoGuo');                        
                    }
                    player.storage.tongShengGongSi_target=event.target;
                    'step 6'
                    event.target.qiPai();
                },
                check:function(event,player){
                    if(player.isLinked()&&player.storage.tongShengGongSi_target.side==player.side) return false;
                    var minus=player.getHandcardLimit()-player.countCards('h');
                    var num=Math.random();
                    if(player.isLinked()&&minus>=1) return num>0.1;
                    if(minus>=3) return num>0.15;
                    return false;
                }
            },
            liuXue:{
                forced:true,
                priority:-1,
                trigger:{global:'changeShiQiEnd'},
                filter:function(event,player){
                    return player==event.player&&event.num<0&&event.yuanYin=='damage'&&!player.isLinked();
                },
                content:function(){
                    'step 0'
                    player.hengZhi();
                    'step 1'
                    player.changeZhiLiao(1);
                },
                group:['liuXue_shangHai','liuXue_chongZhi'],
                subSkill:{
                    shangHai:{
                        firstDo:true,
                        trigger:{player:'phaseBegin'},
                        direct:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.damageFaShu(1,player);
                        }
                    },
                    chongZhi:{
                        trigger:{
                            player:'loseAfter',
                            global:['gainAfter','loseAsyncAfter','addToExpansionAfter'],
                        },
                        filter:function(event,player){
                            if(!player.isLinked()) return false;
                            if(event.name=='gain'&&event.player==player) return false;
                            var evt=event.getl(player);
                            return evt&&evt.cards2&&evt.cards2.length>0&&player.countCards('h')<3;
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.qiPai();
                            'step 2'
                            if(player.storage.tongShengGongSi_target){
                                player.storage.tongShengGongSi_target.qiPai();
                            }
                        }
                    }
                }
            },
            niLiu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.isLinked();
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(true,2);
                    'step 1'
                    player.changeZhiLiao(1);
                },
                ai:{
                    order:7.5,
                    result:{
                        player:2,
                    }
                }
            },
            xueZhiBeiMing:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.isLinked()&&player.countCards('h',card=>card.hasNature('xueZhiBeiMing'))>0;
                },
                filterCard:function(card){
                    return card.hasNature('xueZhiBeiMing');
                },
                selectCard:1,
                useCard:true,
                filterTarget:true,
                selectTarget:1,
                contentBefore:function(){
                    'step 0'
                    var list=[1,2,3];
                    player.chooseControl(list).set('prompt','选择伤害值').set('ai',function(){
                        var num=Math.random();
                        if(num>0.5) return 2;
                        else if(num>0.2) return 3;
                        else return 1;
                    });
                    'step 1'
                    player.storage.xueZhiBeiMin=result.control;
                },
                content:function(){
                    'step 0'
                    target.damageFaShu(player.storage.xueZhiBeiMin,player);
                    'step 1'
                    player.damageFaShu(player.storage.xueZhiBeiMin,player);
                },
                ai:{
                    order:function(card,player){
                        return 8-player.countCards('h');
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2)
                        }
                    }
                }
            },
            tongShengGongSi:{
                intro:{
                    content:"<span class='tiaoJian'>(在【普通形态】下)</span>你和他手牌上限各-2。 <span class='tiaoJian'>(在【流血形态】下)</span>你和他手牌上限各+1。",
                    nocount:true,
                },
                markimage:'image/card/tongShengGongSi.png',
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return !player.storage.tongShengGongSi_use;
                },
                selectTarget:1,
                filterTarget:true,
                content:function(){
                    'step 0'
                    player.draw(2);
                    'step 1'
                    player.storage.tongShengGongSi_target=target;
                    player.storage.tongShengGongSi_use=true;
                    target.addZhiShiWu('tongShengGongSi');
                    if(!target.hasSkill('tongShengGongSi_xiaoGuo')){
                        target.storage.tongShengGongSi_player=player;
                        target.addSkill('tongShengGongSi_xiaoGuo');
                    }
                    'step 2'
                    player.qiPai();
                    'step 3'
                    target.qiPai();
                },
                group:'tongShengGongSi_xiaoGuo',
                subSkill:{
                    xiaoGuo:{
                        mod:{
                            maxHandcard:function(player,num){
                                if(player.storage.tongShengGongSi_use){
                                    if(player.isLinked()){
                                        return num+1;
                                    }else{
                                        return num-2;
                                    }
                                }else if(player.hasZhiShiWu('tongShengGongSi')){
                                        if(player.storage.tongShengGongSi_player.isLinked()){
                                            return num+1;
                                        }else{
                                            return num-2;
                                    }
                                }
                            }
                        }
                    }
                },
                ai:{
                    order:function(item,player){
                        var num=0;
                        if(player.isLinked()) num+=2;
                        return 7-player.countCards('h')+num;
                    },
                    result:{
                        target:function(player,target){
                            return -target.countCards('h');
                        },
                    }
                }
            },
            xueZhiZuZhou:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                filterTarget:true,
                selectTarget:1,
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    target.damageFaShu(2,player);
                    'step 2'
                    player.chooseToDiscard(3,true,'h');
                },
                ai:{
                    baoShi:true,
                    order:function(card,player){
                        return 3+player.countCards('h');
                    },
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,2)
                        }
                    }
                }
            },

            //蝶舞者
            shengMingZhiHuo:{
                mod:{
                    maxHandcardFinal:function(player,num){
                        var x=player.countZhiShiWu('DWZyong');
                        var n=num-x;
                        if(n<=3){
                            return 3;
                        }else{
                            return n
                        }
                    }
                }
            },
            wuDong:{
                type:"faShu",
                enable:['chooseToUse','faShu'],
                selectCard:[0,1],
                filterCard:true,
                content:function(){
                    'step 0'
                    if(cards.length==0){
                        player.draw();
                    }
                    'step 1'
                    var cards=get.cards();
                    player.addToExpansion('draw',cards,'log').gaintag.add('jian');
                    'step 2'
                    var next=game.createEvent();
                    next.player=player;
                    next.setContent(lib.skill.jian.contentx);
                },
                ai:{
                    order:4.1,
                    result:{
                        player:1,
                    }
                }
            },
            duFen:{
                trigger:{global:'shiJiShangHai'},
                filter:function(event,player){
                    return event.num==1&&event.faShu==true&&player.getExpansions('jian').length>0;
                },
                direct:true,
                priority:1,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('jian');
                    var name=get.translation(trigger.player);
                    var next=player.chooseCardButton(cards,"是否发动【毒粉】,移除1个【茧】，目标"+name);
                    next.set('ai',function(button){
                        if(_status.event.bool) return 0;
                        return 1;
                    });
                    next.set('bool',trigger.player.side==player.side);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,trigger.player);
                        player.discard(result.links,'jian').set('jian',true);
                    }else{
                        event.finish();
                    }
                    'step 2'
                    trigger.num++;
                },
            },
            chaoSheng:{
                trigger:{player:'jiangYaoChengShou1'},
                filter:function(event,player){
                    return event.num>0&&player.getExpansions('jian').length>0;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('jian');
                    var next=player.chooseCardButton(cards,"是否发动【朝圣】,移除1个【茧】,目前伤害量"+trigger.num);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.discard(result.links,'jian').set('jian',true);
                    }else{
                        event.finish();
                    }
                    'step 2'
                    trigger.num--;
                }
            },
            jingHuaShuiYue:{
                trigger:{global:'shiJiShangHai'},
                filter:function(event,player){
                    return event.num==2&&event.faShu==true&&player.getExpansions('jian').length>1;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('jian');
                    var name=get.translation(trigger.player);
                    var next=player.chooseCardButton(cards,2,"是否发动【镜花水月】，移除2张同系【茧】，目标"+name);
                    next.set('filterButton',function(button){
                        if(ui.selected.buttons.length==0) return true;
                        var xiBie=get.xiBie(button);
                        if(xiBie==get.xiBie(ui.selected.buttons[0])) return true;
                        else return false;
                    });
                    next.set('ai',function(button){
                        if(_status.event.bool) return 0;
                        return 1;
                    });
                    next.set('bool',trigger.player.side==player.side);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,trigger.player);
                        player.discard(result.links,'jian').set('jian',true);
                        player.showGaiPai(result.links);
                    }else{
                        event.finish();
                    }
                    'step 2'
                    trigger.num=0;
                    'step 3'
                    trigger.player.damageFaShu(1,player);
                    'step 4'
                    trigger.player.damageFaShu(1,player);
                },
            },
            diaoLing:{
                trigger:{player:'discard'},
                filter:function(event,player){
                    return event.jian;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var next=player.chooseCardButton(cards,[1,Infinity],"是否发动【凋零】,展示法术茧");
                    next.set('filterButton',function(button){
                        return get.type(button)=='faShu';
                    });
                    'step 1'
                    if(result.bool){
                        if(!player.hasSkill('diaoLing2')) player.addTempSkill('diaoLing2',{player:'phaseBefore'});
                        player.logSkill(event.name);
                        player.showGaiPai(result.links);
                        event.num=result.links.length;
                    }else{
                        event.finish();
                    }
                    'step 2'
                    event.num--;
                    var next=player.chooseTarget('对目标角色造成1点法术伤害',true);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return target.side!=player.side;
                    });
                    'step 3'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'red');
                    result.targets[0].damageFaShu(1,player);
                    'step 4'
                    player.damageFaShu(2,player);
                    if(event.num>0) event.goto(2);
                    
                },
            },
            diaoLing2:{
                filterx:function(event,player){
                    if(player.side==event.side) return false;
                    if(player.side==true){
                        var shiQi=game.lanShiQi;
                    }else{
                        var shiQi=game.hongShiQi;
                    }
                    return shiQi+event.num<1;
                },
                group:['diaoLing2_changeShiQiBegin','diaoLing2_changeShiQi1','diaoLing2_changeShiQi4'],
                subSkill:{
                    changeShiQiBegin:{
                        trigger:{global:'changeShiQiBegin'},
                        forced:true,
                        filter:function(event,player){
                            return lib.skill.diaoLing2.filterx(event,player);
                        },
                        content:function(){
                            if(player.side==true){
                                var shiQi=game.lanShiQi;
                            }else{
                                var shiQi=game.hongShiQi;
                            }
                            var num=1-shiQi;
                            trigger.num=num;
                        },
                    },
                    changeShiQi1:{
                        trigger:{global:'changeShiQi1'},
                        forced:true,
                        filter:function(event,player){
                            return lib.skill.diaoLing2.filterx(event,player);
                        },
                        content:function(){
                            if(player.side==true){
                                var shiQi=game.lanShiQi;
                            }else{
                                var shiQi=game.hongShiQi;
                            }
                            var num=1-shiQi;
                            trigger.num=num;
                        },
                    },
                    changeShiQi4:{
                        trigger:{global:'changeShiQi4'},
                        forced:true,
                        filter:function(event,player){
                            return lib.skill.diaoLing2.filterx(event,player);
                        },
                        content:function(){
                            if(player.side==true){
                                var shiQi=game.lanShiQi;
                            }else{
                                var shiQi=game.hongShiQi;
                            }
                            var num=1-shiQi;
                            trigger.num=num;
                        },
                    },
                }
            },
            yongHua:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaBaoShi();
                    'step 1'
                    player.addZhiShiWu('DWZyong');
                    'step 2'
                    player.qiPai();
                    var card=get.cards(4);
                    player.addToExpansion('draw',card,'log').gaintag.add('jian');
                    'step 3'
                    var next=game.createEvent();
                    next.player=player;
                    next.setContent(lib.skill.jian.contentx);
                },
                ai:{
                    baoShi:true,
                    order:function(card,player){
                        return 9-player.getExpansions('jian').length;
                    },
                    result:{
                        player:1,
                    }
                }
            },
            daoNiZhiDie:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseToDiscard(2,true);
                    'step 2'
                    var choiceList=['对目标角色造成1点法术伤害③，该伤害不能用[治疗]抵御',"<span class='tiaoJian'>(移除2个【茧】或对自己造成4点法术伤害③)</span>移除1个【蛹】"];
                    var next=player.chooseControl().set('choiceList',choiceList).set('ai',function(){
                        return '选项一';
                    });
                    'step 3'
                    if(result.control=='选项一'){
                        event.goto(4);
                    }else if(result.control=='选项二'){
                        event.goto(6);
                    }
                    'step 4'
                    var next=player.chooseTarget("对目标角色造成1点法术伤害③，该伤害不能用[治疗]抵御",true);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        return target.side!=player.side;
                    })
                    'step 5'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'red');
                    result.targets[0].damage(1,player).set('faShu',true).set('canZhiLiao',false);
                    event.finish();

                    'step 6'
                    var cards=player.getExpansions('jian');
                    var next=player.chooseCardButton(cards,2,'移除2个【茧】或对自己造成4点法术伤害③');
                    'step 7'
                    if(result.bool){
                        player.discard(result.links,'jian').set('jian',true);
                    }else{
                        player.damageFaShu(4,player);
                    }
                    'step 8'
                    player.removeZhiShiWu('DWZyong');
                    event.finish();

                },
                ai:{
                    shuiJing:true,
                    order:4,
                    result:{
                        player:1,
                    }
                }
            },
            jian:{
                intro:{
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('jian');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
                contentx:function(){
                    'step 0'
                    var num=player.getExpansions('jian').length;
                    var cards=player.getExpansions('jian');
                    if(num>8){
                        player.chooseCardButton(num-8,true,cards,`舍弃${num-8}张【茧】`);
                    }else{
                        event.finish();
                    }
                    'step 1'
                    player.discard(result.links);
                }
            },
            DWZyong:{
                intro:{
                    content:'mark',
                },
                markimage:'image/card/hong.png'
            },

		},
		
		translate:{
            //角色名字
			fengZhiJianSheng:"风之剑圣",
            kuangZhanShi:"狂战士",
            shenJianShou:"神箭手",
            fengYinShi:"封印师",
            anShaZhe:"暗杀者",
            shengNv:"圣女",
            tianShi:"天使",
            moFaShaoNv:"魔法少女",
            moJianShi:"魔剑士",
            shengQiangQiShi:"圣枪骑士",
            yuanSuShi:"元素师",
            maoXianJia:"冒险家",
            wenYiFaShi:"瘟疫法师",
            zhongCaiZhe:"仲裁者",
            shenGuan:"神官",
            qiDaoShi:"祈祷师",
            xianZhe:"贤者",
            lingFuShi:"灵符师",
            jianDi:"剑帝",
            geDouJia:"格斗家",
            yongZhe:"勇者",
            lingHunShuShi:"灵魂术士",
            xueZhiWuNv:"血之巫女",
            dieWuZhe:"蝶舞者",
            nvWuShen:"女武神",
            moGong:"魔弓",
            hongLianQiShi:"红莲骑士",
            yingLingRenXing:"英灵人形",
            moQiang:"魔枪",
            cangYanMoNv:"苍炎魔女",
            yinYouShiRen:"吟游诗人",
            jingLingSheShou:"精灵射手",
            yinYangShi:"阴阳师",
            xueSeJianLing:"血色剑灵",
            yueZhiNvShen:"月之女神",
            shouLingWuShi:"兽灵武士",
            shengGong:"圣弓",

            
            
            //风之剑圣
            fengNuZhuiJi:'[响应]风怒追击[回合限定]',
            fengNuZhuiJi_info:"<span class='tiaoJian'>([攻击行动]结束后发动)</span>额外+1风系[攻击行动]",
            shengJian:'[被动]圣剑',
            shengJian_info:"若你的主动攻击为本次行动阶段的第3次[攻击行动]，则此攻击强制命中。本次[攻击行动]结束时，你摸X张牌，弃X张牌(X<4)。",
            lieFengJi:"(独)[响应]烈风技",
            lieFengJi_info:"<span class='tiaoJian'>(攻击的目标拥有圣盾时发动)</span>无视对手圣盾的效果,且此攻击对手无法应战。",
            jiFengJi:"(独)[响应]疾风技",
            jiFengJi_info:"<span class='tiaoJian'>(作为主动攻击打出后发动)</span>额外+1[攻击行动]。",
            jianYing:"[响应]剑影[回合限定]",
            jianYing_info:"[水晶]<span class='tiaoJian'>([攻击行动]结束后发动)</span>额外+1[攻击行动]。",

            //狂战士
            kuangHua:"[被动]狂化",
            kuangHua_info:"你发动的所有攻击伤害额外+1；<span class='tiaoJian'>(攻击命中时②，若你的手牌数>3)</span>本次攻击伤害额外+1。",
            xueYingKuangDao:"(独)[响应]血影狂刀",
            xueYingKuangDao_info:"<span class='tiaoJian'>(作为主动攻击打出时发动)</span><br>·若命中手牌为2的对手②，本次攻击伤害额外+2；<br>·若命中手牌为3的对手②，本次攻击伤害额外+1。",
            xueXingPaoXiao:"(独)[响应]血腥咆哮",
            xueXingPaoXiao_info:'<span class="tiaoJian">(作为主动攻击打出时发动)</span>若攻击的目标拥有的[治疗]为2，则本次攻击强制命中。',
            siLie:"[响应]撕裂",
            siLie_info:"[宝石]<span class='tiaoJian'>(攻击命中后发动②)</span>本次攻击伤害额外+2。",

            //圣女
            bingShuangDaoYan:"[被动]冰霜祷言",
            bingShuangDaoYan_info:"<span class='tiaoJian'>(每当你使用水系牌或【圣光】时发动)</span>目标角色+1[治疗]。",
            zhiLiaoShu:"(独)[法术]治疗术",
            zhiLiaoShu_info:"目标角色+2[治疗]。",
            zhiYuZhiGuang:"(独)[法术]治愈之光",
            zhiYuZhiGuang_info:"指定最多3名角色各+1[治疗]。",
            lianMin:"[启动]怜悯[持续]",
            lianMin_info:"[宝石][横置]你的手牌上限恒定为7[持续]，你+1[水晶]。",
            shengLiao:"[法术]圣疗[回合限定]",
            shengLiao_info:"[水晶]任意分配3[治疗]给1~3名角色，额外+1[攻击行动]或[法术行动]。",

            //暗杀者
            fanShi:"[被动]反噬",
            fanShi_info:"<span class='tiaoJian'>(承受攻击伤害时发动⑥)</span>攻击你的对手摸1张牌[强制]。",
            shuiYing:"[响应]水影",
            shuiYing_info:"<span class='tiaoJian'>(除【特殊行动】外，当你摸牌前发动)</span>弃X张水系牌[展示]；<span class='tiaoJian'>(若你处于【潜行】效果下)</span>你可额外弃1张法术牌[展示]。",
            qianXing:"[启动]潜行",
            qianXing_info:"[宝石]你可选择摸1张牌，[横置]持续到你的下个行动阶段开始，你的手牌上限-1；你不能成为主动攻击的目标；你的主动攻击对手无法应战且伤害额外+X，X为你剩余的【能量】数。【潜行】的效果结束时[重置]。",

            //封印师
            faShuJiDang:"[响应]法术激荡",
            faShuJiDang_info:"<span class='tiaoJian'>([法术行动]结束后发动)</span>额外+1[攻击行动]。",
            diZhiFengYin:"(独)[法术]地之封印",
            diZhiFengYin_info:"<span class='tiaoJian'>(将【地之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出地系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            shuiZhiFengYin:"(独)[法术]水之封印",
            shuiZhiFengYin_info:"<span class='tiaoJian'>(将【水之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出水系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            huoZhiFengYin:"(独)[法术]火之封印",
            huoZhiFengYin_info:"<span class='tiaoJian'>(将【火之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出火系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            fengZhiFengYin:"(独)[法术]风之封印",
            fengZhiFengYin_info:"<span class='tiaoJian'>(将【风之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出风系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            leiZhiFengYin:"(独)[法术]雷之封印",
            leiZhiFengYin_info:"<span class='tiaoJian'>(将【雷之封印】放置于目标对手面前)</span>该对手获得(直到他从手中打出或展示出雷系牌时强制触发)：对他造成3点法术伤害③，触发后移除此牌。",
            wuXiShuFu:"(专)[法术]五系束缚",
            wuXiShuFu_info:"[水晶]<span class='tiaoJian'>(将【五系束缚】放置于目标对手面前)</span>该对手跳过其下个行动阶段。在其下个行动阶段开始前他可以选择摸(2+X)张牌来取消【五系束缚】的效果。X为场上封印的数量，X最高为2。无论效果是否发动，触发后移除此牌。",
            fengYinPoSui:"[法术]封印破碎",
            fengYinPoSui_info:"[水晶]将场上任意一张基础效果牌收入自己手中。",

            
            //天使
            fengZhiJieJing:'[法术]风之洁净',
            fengZhiJieJing_info:"<span class='tiaoJian'>(弃1张风系牌[展示])</span>移除场上任意一个基础效果。",
            tianShiZhuFu:"[法术]天使祝福",
            tianShiZhuFu_info:"<span class='tiaoJian'>(弃1张水系牌[展示])</span>目标角色给你2张牌或指定2名角色各给你1张牌。",
            tianShiJiBan:"[被动]天使羁绊",
            tianShiJiBan_info:"<span class='tiaoJian'>(每当你移除场上任意一个基础效果或使用【圣盾】时)</span>目标角色+1[治疗]。",
            tianShiZhiQiang:"(独)[法术]天使之墙",
            tianShiZhiQiang_info:"可作为【圣盾】使用。",
            tianShiZhiGe:"[响应]天使之歌(回合限定)",
            tianShiZhiGe_info:"[水晶]<span class='tiaoJian'>(在你的回合开始前发动)</span>移除场上任意一个基础效果。",
            shenZhiBiHu:"[响应]神之庇护",
            shenZhiBiHu_info:"X[水晶]为我方抵御X点因法术伤害而造成的士气下降。",

            //神箭手
            shanDianJian:"[被动]闪电箭",
            shanDianJian_info:"你的雷系攻击对手无法应战。",
            guanChuanSheJi:"[响应]贯穿射击",
            guanChuanSheJi_info:"<span class='tiaoJian'>(主动攻击未命中时发动①，弃1张法术牌[展示])</span>对你所攻击的目标造成2点法术伤害③。",
            shanGuangXianJing:'(独)[法术]闪光陷阱',
            shanGuangXianJing_info:"对目标角色造成2点法术伤害③。",
            jingZhunSheJi:"(独)[响应]精准射击",
            jingZhunSheJi_info:"此攻击强制命中，但本次攻击伤害-1。",
            juJi:"[法术]狙击",
            juJi_info:"[水晶]目标角色手牌补到5张[强制]，额外+1[攻击行动]",

            //魔法少女
            moBaoChongJi:'[法术]魔爆冲击',
            moBaoChongJi_info:'<span class="tiaoJian">(弃1张法术牌[展示])</span>我方【战绩区】+1[宝石]。2名目标对手各弃一张法术牌[展示]，每有人不如此做，你对他造成2点法术伤害③，你弃一张牌。',
            moDanZhangWo:'[响应]魔弹掌握',
            moDanZhangWo_info:'你主动使用【魔弹】时可以选择逆向传递。',
            moDanRongHe:'[响应]魔弹融合',
            moDanRongHe_info:'你的地系或火系牌可以当【魔弹】使用。',
            huiMieFengBao:'[法术]毁灭风暴',
            huiMieFengBao_info:'[宝石]对2名目标对手各造成2点法术伤害③。',

            //女武神
            shenShengZhuiJi:"[响应]神圣追击",
            shenShengZhuiJi_info:"<span class='tiaoJian'>(攻击或[法术行动]结束后，移除你的1[治疗])</span>额外+1[攻击行动]。",
            zhiXuZhiYin:"[法术]秩序之印",
            zhiXuZhiYin_info:"<span class='tiaoJian'>(摸2张牌[强制])</span>你加+1[治疗]并+1[水晶]。",
            hePingXingZhe:"[被动]和平行者",
            hePingXingZhe_info:"<span class='tiaoJian'>(你的回合内，发动【英灵召唤】后强制触发[强制])</span>[横置]，转入【英灵形态】；<span class='tiaoJian'>(每当你执行主动攻击时发动①)</span>[重置]脱离【英灵形态】。",
            junShenWeiGuan:"[被动]军神威光",
            junShenWeiGuan_info:"<span class='tiaoJian'>(回合开始时，若你处于【英灵形态】)</span>选择以下1项发动：<br>·你+1[治疗]，[重置]脱离【英灵形态】；<br>·<span class='tiaoJian'>(移除我方【战绩区】X个星石，X<3)</span>目标角色+X[治疗]。",
            yingLingZhaoHuan:"[响应]英灵召唤",
            yingLingZhaoHuan_info:"[水晶]<span class='tiaoJian'>(攻击命中时发动②)</span>本次攻击伤害额外+1，<span class='tiaoJian'>(若你额外弃置1张法术牌[展示])</span>目标角色+1[治疗]",   

            //元素师
            yuanSuXiShou:'[响应]元素吸收',
            yuanSuXiShou_info:'<span class="tiaoJian">(对目标角色造成法术伤害时发动③)</span>你+1<span class="hong">【</span>元素<span class="hong">】</span>。',
            yuanSuDianRan:'[法术]元素点燃',
            yuanSuDianRan_info:'<span class="tiaoJian">(移除3点</span><span class="hong">【</span>元素<span class="hong">】</span><span class="tiaoJian">)</span>对目标角色造成2点法术伤害③，额外+1[法术行动]；不能与【元素吸收】同时发动。',
            yunShi:'(独)[法术]陨石',
            yunShi_info:'对目标角色造成1点法术伤害③，额外+1[法术行动]；<span class="tiaoJian">(若你额外弃1张地系牌[展示]①)</span>本次伤害额外+1。',
            bingDong:'(独)[法术]冰冻',
            bingDong_info:'对目标角色造成1点法术伤害③，并指定1名角色+1[治疗]<span class="tiaoJian">(若你额外弃1张水系牌[展示]①)</span>本次伤害额外+1。',
            huoQou:'(独)[法术]火球',
            huoQou_info:'对目标角色造成2点法术伤害③，<span class="tiaoJian">(若你额外弃1张火系牌[展示]①)</span>本次伤害额外+1。',
            fengRen:'(独)[法术]风刃',
            fengRen_info:'对目标角色造成1点法术伤害③，额外+1[攻击行动]；<span class="tiaoJian">(若你额外弃1张风系牌[展示]①)</span>本次伤害额外+1。',
            leiJi:'(独)[法术]雷击',
            leiJi_info:'对目标角色造成1点法术伤害③，我方【战绩区】+1[宝石]；<span class="tiaoJian">(若你额外弃1张雷系牌[展示]①)</span>本次伤害额外+1。',
            yueGuang:'[法术]月光',
            yueGuang_info:'[宝石]对目标角色造成(X+1)点法术伤害③，X为你剩余的【能量】数。',
            yuanSu:'元素',
            yuanSu_info:'</span><span class="hong">【</span>元素<span class="hong">】</span>为元素师专有指示物，上限为3。',

            //月之女神
            xinYueBiHu:"[响应]新月庇护[持续]",
            xinYueBiHu_info:"<span class='tiaoJian'>(我方角色因承受伤害造成手牌数超过手牌上限，导致士气即将下降时)</span>[横置]转为【暗月形态】，将因此而造成的弃牌面朝下放置于角色旁，作为【暗月】。本次士气不会下降。",
            anYueZuZhou:"[被动]暗月诅咒",
            anYueZuZhou_info:"<span class='tiaoJian'>(你每次移除【暗月】)</span>我方士气-1；<span class='tiaoJian'>(你的【暗月】数为0时)</span>[重置]脱离【暗月形态】。",
            meiDuShaZhiYan:"[响应]美杜莎之眼",
            meiDuShaZhiYan_info:"<span class='tiaoJian'>(目标对手攻击时①，移除1个与攻击牌系别相应的系别的【暗月】[展示])</span>你+1[治疗]，你+1<span class='lan'>【</span>石化<span class='lan'>】</span>。<span class='tiaoJian'>(若该【暗月】为法术牌)</span>你弃1张牌，对目标对手造成1点法术伤害③。",
            yueZhiLunHui:"[响应]月之轮回",
            yueZhiLunHui_info:"<span class='tiaoJian'>(你的回合结束时)</span>选择以下一项发动：<br>·<span class='tiaoJian'>(移除1个【暗月】)</span>目标角色+1[治疗]；<br>·<span class='tiaoJian'>(移除你的1[治疗])</span>你+1<span class='hong'>【</span>新月<span class='hong'>】</span>。",
            yueDu:"[响应]月渎[回合限定]",
            yueDu_info:"<span class='tiaoJian'>(目标角色承受你造成的法术伤害⑥后，移除你的1[治疗])</span>对目标对手造成1点法术伤害③。",
            anYueZhan:"[响应]暗月斩",
            anYueZhan_info:"[水晶]<span class='tiaoJian'>(仅【暗月形态】下可发动，主动攻击命中时②，移除X个【暗月】(x<3))</span>本次攻击伤害额外+X。",
            cangBaiZhiYue:"[法术]苍白之月",
            cangBaiZhiYue_info:"[宝石]选择以下一项发动：<br>·<span class='tiaoJian'>(移除3点</span><span class='lan'>【</span>石化<span class='lan'>】</span><span class='tiaoJian'>)</span>你的下次主动攻击对手无法应战，额外+1[攻击行动]。你额外获得一个回合；<br>·移除X点<span class='hong'>【</span>新月<span class='hong'>】</span>，你+1点<span class='lan'>【</span>石化<span class='lan'>】</span>，弃1张牌，对目标对手造成(X+1)点法术伤害③。",
            xinYue:"新月",
            xinYue_info:"<span class='hong'>【</span>新月<span class='hong'>】</span>为月之女神专有指示物，上限为2。",
            shiHua:"石化",
            shiHua_info:"<span class='lan'>【</span>石化<span class='lan'>】</span>为月之女神专有指示物，上限为3。",
            anYue:"暗月",
            anYue_info:"【暗月】为月之女神专用盖牌，无上限。",
            
            //仲裁者
            zhongCaiFaZe:"[被动]仲裁法则",
            zhongCaiFaZe_info:"游戏初始时。你加+2[水晶]。",
            yiShiZhongDuan:"[启动]仪式中断",
            yiShiZhongDuan_info:"<span class='tiaoJian'>(仅【审判形态】下发动)</span>[重置]脱离【审判形态】，我方【战绩区】+1[宝石]。",
            moRiShenPan:"[\u6cd5\u672f]\u672b\u65e5\u5ba1\u5224",
            moRiShenPan_info:"<span class='tiaojian'>(\u79fb\u9664\u6240\u6709</span><span class='hong'>\u3010</span>\u5ba1\u5224<span class='hong'>\u3011</span><span class='tiaojian'>)</span>\u5bf9\u76ee\u6807\u89d2\u8272\u9020\u6210\u7b49\u91cf\u7684\u6cd5\u672f\u4f24\u5bb3\u2462\uff1b\u5728\u8bb0\u5f97\u884c\u52a8\u9636\u6bb5\u5f00\u59cb\u65f6\uff0c\u82e5\u4f60\u7684<span class='hong'>\u3010</span>\u5ba1\u5224<span class='hong'>\u3011</span>\u5df2\u8fbe\u5230\u4e0a\u9650\uff0c\u8be5\u884c\u52a8\u9636\u6bb5\u4f60\u5fc5\u987b\u53d1\u52a8\u3010\u672b\u65e5\u5ba1\u5224\u3011\u3002",
            shenPanLangChao:"[被动]审判浪潮",
            shenPanLangChao_info:"<span class='tiaoJian'>(你每承受一次伤害⑥)</span>你+1<span class='hong'>【</span>审判<span class='hong'>】</span>。",
            zhongCaiYiShi:"[启动]仲裁仪式[持续]",
            zhongCaiYiShi_info:"[宝石][横置]转为【审判形态】，你的手牌上限恒定为5[恒定]；每次你的回合开始时，你+1<span class='hong'>【</span>审判<span class='hong'>】</span>。",
            panJueTianPing:"[法术]判决天平",
            panJueTianPing_info:"[水晶]你+1<span class='hong'>【</span>审判<span class='hong'>】</span>，再选择一下一项发动：<br>·弃掉所有手牌。<br>·将你的手牌补到上限[强制]，我方【战绩区】+1[宝石]。",
            shenPan:"审判",
            shenPan_info:"<span class='hong'>【</span>审判<span class='hong'>】</span>为仲裁者专有指示物，上限为4。",

            //冒险家
            qiZha:"[响应]欺诈",
            qiZha_info:"<span class='tiaoJian'>(弃2张同系牌[展示])</span>视为一次除暗系以外的任意系的主动攻击，该系由你决定；或<span class='tiaoJian'>(弃3张同系牌[展示])</span>视为一次暗系的主动攻击。",
            qiangYun:"[被动]强运",
            qiangYun_info:"<span class='tiaoJian'>(当你发动【欺诈】时)</span>你+1[水晶]。",
            diXiaFaZe:"[被动]地下法则",
            diXiaFaZe_info:"<span class='tiaoJian'>(你执行【购买】时)</span>改为【战绩区】+2[宝石]。",
            maoXianJiaTianTang:"[响应]冒险者天堂",
            maoXianJiaTianTang_info:"你执行【提炼】时，将提炼出的[宝石]和[水晶]全部交给目标队友。然后移除你的1[能量]",
            touTianHuanRi:"[法术]偷天换日[回合限定]",
            touTianHuanRi_backup:"[法术]偷天换日[回合限定]",
            touTianHuanRi_info:"[水晶]将对方【战绩区】的1[宝石]转移到我方【战绩区】，或将我方【战绩区】的[水晶]全部转换为[宝石]。额外+1[攻击行动]或[法术行动]。",

            //圣枪骑士
            shenShengXinYang:"[被动]神圣信仰",
            shenShengXinYang_info:"<span class='tiaoJian'>(我方[星杯区]的[星杯]数不小于对方时)</span>你的[治疗]上限+1。",
            huiYao:"[法术]辉耀",
            huiYao_info:"<span class='tiaoJian'>(弃1张水系牌[展示])</span>所有角色各+1[治疗]，额外+1[攻击行动]。",
            chengJie:"[法术]惩戒",
            chengJie_info:"<span class='tiaoJian'>(弃1张法术牌[展示])</span>将其他角色的1[治疗]转移给你，额外+1[攻击行动]。",
            shengJi:"[被动]圣击",
            shengJi_info:"<span class='tiaoJian'>(攻击命中后发动②)</span>你+1[治疗]。",
            tianQiang:"[响应]天枪",
            tianQiang_info:"<span class='tiaoJian'>(主动攻击前发动①，移除你的2[治疗])</span>本次攻击对手无法应战，不能和【圣击】同时发动。",
            diQiang:"[响应]地枪",
            diQiang_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除你的X[治疗])</span>本次攻击伤害额外+X，X最高为4；不能和【圣击】同时发动。",
            shengGuangQiYu:"[法术]圣光祈愈",
            shengGuangQiYu_info:"[宝石]无视你的[治疗]上限为你+2[治疗]，但你的[治疗]最高为5，额外+1[攻击行动]；本回合你不能再发动天枪。",
            
            //精灵射手
            yuanSuSheJi:"[响应]元素射击[回合限定]",
            yuanSuSheJi_info:"<span class='tiaoJian'>(主动攻击时①，若攻击牌非暗系，弃1张法术牌[展示]或移除1个【祝福】)</span>根据攻击牌类别附加以下【元素箭】效果：<br>【火之矢】：本次攻击伤害额外+1。<br>【水之矢】：<span class='tiaoJian'>(主动攻击命中时)</span>目标角色+1[治疗]。<br>【风之矢】：<span class='tiaoJian'>([攻击行动]结束后)</span>额外+1[攻击行动]。<br>【雷之矢】：本次攻击无法应战。<br>【地之矢】：<span class='tiaoJian'>(主动攻击命中时②)</span>对目标角色造成1点法术伤害③。",
            dongWuHuoBan:"[响应]动物伙伴",
            dongWuHuoBan_info:"<span class='tiaoJian'>(你的回合内，目标角色承受你造成的伤害⑥后)</span>你摸1张牌[强制]，你弃1张牌。",
            jingLingMiYi:"[启动]精灵秘仪[持续]",
            jingLingMiYi_info:"[宝石][横置]转为【精灵祝福形态】，将牌堆顶的3张牌面朝下放置于角色旁作为【祝福】。此形态下你的【祝福】可视为手牌使用或打出。<span class='tiaoJian'>(你的回合结束时，若你未拥有【祝福】)</span>[重置]脱离【精灵祝福形态】，对目标角色造成2点法术伤害。",
            chongWuQiangHua:"[响应]宠物强化",
            chongWuQiangHua_info:"[水晶]<span class='tiaoJian'>(触发【动物伙伴】时)</span>效果改为“目标角色摸1张牌[强制]，弃1张牌”。",
            zhuFu:"祝福",
            zhuFu_info:"【祝福】为精灵射手专有盖牌，上限为3。",

            //瘟疫法师
            buXiu:"[响应]不朽",
            buXiu_info:"<span class='tiaoJian'>([法术行动]结束时发动)</span>你+1[治疗]。",
            shengDu:"[被动]圣渎",
            shengDu_info:"你的[治疗]不能抵御攻击伤害，你的[治疗]上限+3。",
            wenYi:"[法术]瘟疫",
            wenYi_info:"<span class='tiaoJian'>(弃1张地系牌[展示])</span>对所有其他角色各造成1点法术伤害③。",
            siWangZhiChu:"[法术]死亡之触",
            siWangZhiChu_info:"<span class='tiaoJian'>(移除你的a[治疗]并弃b张同系牌，a，b的数值由你决定，但每项最少为2)</span>对目标角色造成(a+b-3)点伤害③，不能和【不朽】同时发动。",
            siWangZhiChu_backup:"[法术]死亡之触",
            juDuXinXing:"[法术]剧毒新星",
            juDuXinXing_info:"[宝石]对其他角色各造成2点法术伤害③，你+1[治疗]。",

            //魔剑士
            xiuLuoLianZhan:"[响应]修罗连斩[回合限定]",
            xiuLuoLianZhan_info:"<span class='tiaoJian'>([攻击行动]结束后发动)</span>额外+1火系[攻击行动]。",
            anYingNingJu:"[启动]暗影凝聚",
            anYingNingJu_info:"<span class='tiaoJian'>(对自己造成1点法术伤害③)</span>[横置]持续到你的下个行动阶段开始，你都处于【暗影形态】，脱离【暗影形态】时[重置]。",
            anYingZhiLi:"[被动]暗影之力",
            anYingZhiLi_info:"<span class='tiaoJian'>(仅【暗影形态】下发动)</span>你发动的所有攻击伤害额外+1。",
            anYingKangJu:"[被动]暗影抗拒",
            anYingKangJu_info:"在你的行动阶段你始终不能使用法术牌。",
            anYingLiuXing:"[法术]暗影流星",
            anYingLiuXing_info:"<span class='tiaoJian'>(仅【暗影形态】下发动，弃2张法术牌[展示])</span>对目标角色造成2点法术伤害③；<span class='tiaoJian'>(若你额外移除我方【战绩区】2星石)</span>[重置]脱离【暗影形态】，你+1[宝石]。",
            huangQaunZhenChan:"[响应]黄泉震颤[回合限定]",
            huangQaunZhenChan_info:"[宝石]<span class='tiaoJian'>(主动攻击前发动①)</span>本次攻击对手不能应战，<span class='tiaoJian'>(若命中②)</span>你将手牌补至上限，然后弃2张牌。",

            //血色剑灵
            xueSeJingJi:"[被动]血色荆棘",
            xueSeJingJi_info:"<span class='tiaoJian'>(攻击命中时②)你+1</span><span class='hong'>【</span>鲜血<span class='hong'>】</span>。",
            chiSeYiShan:"[响应]赤色一闪",
            chiSeYiShan_info:"<span class='tiaoJian'>([攻击行动]结束后，移除1点</span><span class='hong'>【</span>鲜血<span class='hong'>】</span><span class='tiaoJian'>，对自己造成2点法术伤害③)</span>额外+1[攻击行动]。",
            xueRanQiangWei:"[法术]血染蔷薇",
            xueRanQiangWei_info:"<span class='tiaoJian'>(移除2点</span><span class='hong'>【</span>鲜血<span class='hong'>】</span><span class='tiaoJian'>)</span>移除目标角色2[治疗]，将我方角色[能量区]的1[水晶]翻面为[宝石]。<span class='tiaoJian'>(若【血蔷薇庭院】在场)</span>额外对所有角色造成1点法术伤害。",
            xueQiPingZhang:"[响应]血气屏障",
            xueQiPingZhang_info:"<span class='tiaoJian'>(目标角色对你造成法术伤害③时，移除1点</span><span class='hong'>【</span>鲜血<span class='hong'>】</span><span class='tiaoJian'>)</span>本次法术伤害-1③，对目标对手造成1点法术伤害③。",
            xueQiangWeiTingYuan:"(专)[被动]血蔷薇庭院",
            xueQiangWeiTingYuan_info:"<span class='tiaoJian'>(此卡在场时)</span>所有角色的[治疗]无法用于抵御伤害；<span class='tiaoJian'>(血色剑灵的回合结束时)</span>移除此卡。",
            sanHuaLunWu:"[启动]散华轮舞",
            sanHuaLunWu_info:"你选择以下一项发动：<br>·[水晶]将【血蔷薇庭院】放置于场上，你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>；<br>·[宝石]将【血蔷薇庭院】放置于场上，无视你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>上限为你+2<span class='hong'>【</span>鲜血<span class='hong'>】</span>但你的<span class='hong'>【</span>鲜血<span class='hong'>】</span>数最高为4，你弃到4张牌。",
            xianXue:"鲜血",
            xianXue_info:"<span class='hong'>【</span>鲜血<span class='hong'>】</span>为血色剑灵专有指示物，上限为3。",

            //祈祷师
            guangHuiXinYang:"[法术]光辉信仰",
            guangHuiXinYang_info:"<span class='tiaoJian'>(仅在【祈祷形态】下发动，移除1点</span><span class='hong'>【</span>祈祷符文<span class='hong'>】</span><span class='tiaoJian'>)</span>你弃2张牌，我方【战绩区】+1[宝石]，目标队友+1[治疗]。",
            heiAnZuZhou:"[法术]黑暗诅咒",
            heiAnZuZhou_info:"<span class='tiaoJian'>(仅在【祈祷形态】下发动，移除1点</span><span class='hong'>【</span>祈祷符文<span class='hong'>】</span><span class='tiaoJian'>)</span>对目标角色和自己各造成2点法术伤害③。",
            weiLiCiFu:"(独)[法术]威力赐福",
            weiLiCiFu_info:"<span class='tiaoJian'>(将威力赐福放置于目标队友面前)</span>该队友获得<span class='tiaoJian'>(攻击命中后可以移除此牌发动②)</span>本次攻击伤害额外+2。",
            xunJieCiFu:"(独)[法术]迅捷赐福",
            xunJieCiFu_info:"<span class='tiaoJian'>(将迅捷赐福放置于目标队友面前)</span>该队友获得<span class='tiaoJian'>([法术行动]或[攻击行动]结束后可以移除此牌发动)</span>额外+1[攻击行动]。",
            qiDao:"[启动]祈祷[持续]",
            qiDao_info:"[宝石][横置]转为【祈祷形态】，在此形态下，你每发动一次主动攻击①，你+2<span class='hong'>【</span>祈祷符文<span class='hong'>】</span>。",
            faLiChaoXi:"[响应]法力潮汐[回合限定]",
            faLiChaoXi_info:"[水晶]<span class='tiaoJian'>([法术行动]结束后发动)</span>额外+1[法术行动]。",
            qiDaoFuWen:"祈祷符文",
            qiDaoFuWen_info:"<span class='hong'>【</span>祈祷符文<span class='hong'>】</span>为祈祷师专有指示物，其上限为3。",
            
            //红莲骑士
            xingHongShengYue:"[响应]腥红圣约[回合限定]",
            xingHongShengYue_info:"<span class='tiaoJian'>(主动攻击时发动①)</span>你+1[治疗]。",
            xingHongXinYang:"[被动]猩红信仰",
            xingHongXinYang_info:"你的[治疗]只能抵御自己造成的伤害，你的[治疗]上限+2。",
            xueXingDaoYan:"[启动]血腥祷言",
            xueXingDaoYan_info:"<span class='tiaoJian'>(移除你的X[治疗]，对自己造成X点法术伤害③)</span>任意分配X[治疗]给1~2名队友，你+1<span class='hong'>【</span>血印<span class='hong'>】</span>。",
            shaLuShengYan:"[响应]杀戮盛宴",
            shaLuShengYan_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除1点</span><span class='hong'>【</span>血印<span class='hong'>】</span><span class='tiaoJian'>对自己造成4点法术伤害③)</span>本次攻击伤害额外+2。",
            reXueFeiTeng:"[被动]热血沸腾",
            reXueFeiTeng_info:"<span class='tiaoJian'>(当你因承受伤害而导致我方士气下降时强制发动[强制])</span>[横置]转发【热血沸腾状态】，该形态你因承受伤害不会导致我方士气下降[强制]。在你的回合结束阶段，若你处于此形态，[重置]并脱离此形态[强制],你+2[治疗]。",
            jieJiaoJieZao:"[响应]戒骄戒躁",
            jieJiaoJieZao_info:"[水晶]<span class='tiaoJian'>(仅【热血沸腾状态】下，[攻击行动]或[法术行动]结束后发动)</span>[重置]并脱离此形态，额外+1[攻击行动]或[法术行动]。",
            xingHongShiZi:"[法术]猩红十字",
            xingHongShiZi_info:"[水晶]<span class='tiaoJian'>(移除1点</span><span class='hong'>【</span>血印<span class='hong'>】</span><span class='tiaoJian'>弃2张法术牌[展示]，对自己造成4点法术伤害)</span>对目标角色造成3点法术伤害③。",
            xueYin:"血印",
            xueYin_info:"<span class='hong'>【</span>血印<span class='hong'>】</span>为红莲骑士专有指示物，其上限为2。",

            //英灵人形
            zhanWenZhangWo:"[被动]战纹掌握",
            zhanWenZhangWo_info:"游戏初始时，你拥有3个【战纹】。【战纹】和【魔纹】是英灵人性的专属指示物，上限之和为3。",
            nuHuoYaZhi:"[响应]怒火压制",
            nuHuoYaZhi_info:"<span class='tiaoJian'>(主动攻击未命中时②)</span>翻转1个【战纹】，不能与【魔纹融合】同时发动。",
            zhanWenSuiJi:"[响应]战纹碎击",
            zhanWenSuiJi_info:"<span class='tiaoJian'>(主动攻击命中时②，翻转1个【战纹】，弃X张同系牌[展示](X>1))</span>本次攻击伤害额外+(X-1)，<span class='tiaoJian'>(若你处于【蓄势迸发形态】下，额外翻转Y个【战纹】)</span>本次攻击伤害额外+Y。",
            moWenRongHe:"[响应]魔纹融合",
            moWenRongHe_info:"<span class='tiaoJian'>(主动攻击未命中时②，翻转1个【魔纹】，弃X张异系牌[展示](X>1))</span>对本次攻击的角色造成(X-1)点法术伤害③，<span class='tiaoJian'>(若你处于【蓄势迸发形态】下，额外翻转Y个【魔纹】)</span>本次法术伤害额外+Y。",
            fuWenGaiZao:"[启动]符文改造",
            fuWenGaiZao_info:"[宝石][横置]转为【蓄势迸发形态】，在此形态下你的手牌上限+1；摸1张牌[强制]并任意调整你的【战纹】和【魔纹】，在你回合结束阶段，[重置]并脱离此形态。",
            shuangChongHuiXiang:"[响应]双重回响[回合限定]",
            shuangChongHuiXiang_info:"[水晶]<span class='tiaoJian'>(对目标角色造成攻击或法术伤害时发动③)</span>对另一目标角色造成X点法术伤害③，X与本次伤害相同但最高为3。【双重回响】的伤害不会造成士气下降。",
            
            //神官
            shenShengQiShi:"[响应]神圣启示",
            shenShengQiShi_info:"<span class='tiaoJian'>(【特殊行动】结束时发动)</span>你+1[治疗]。",
            shenShengQiFu:"[法术]神圣祈福",
            shenShengQiFu_info:"<span class='tiaoJian'>(弃2张法术牌[展示])</span>你+2[治疗]。",
            shuiZhiShenLi:"[法术]水之神力",
            shuiZhiShenLi_info:"<span class='tiaoJian'>(弃1张水系牌[展示])</span>将手中的1张牌交给目标队友[强制]，你和他各加+1[治疗]。",
            shengShiShouHu:"[被动]圣使守护",
            shengShiShouHu_info:"你的[治疗]上限+4，每当你用[治疗]抵挡伤害时，最多只能使用1点。",
            shenShengQiYue:"[启动]神圣契约",
            shenShengQiYue_info:"[水晶]将你的X[治疗]转移给目标队友，以此法所转移的[治疗]无视他的[治疗]上限，但他的[治疗]最高为4。",
            shenShengLingYu:"[法术]神圣领域",
            shenShengLingYu_info:"[水晶]你弃2张牌，再选择以下一项发动：<br>·<span class='tiaoJian'>(移除你的1[治疗])</span>对目标角色造成2点法术伤害③。<br>·你+2[治疗]，目标队友+1[治疗]。",
            
            //阴阳师
            shiShenJiangLin:"[法术]式神降临[持续]",
            shiShenJiangLin_info:"<span class='tiaoJian'>(弃2张命格相同的手牌[展示])</span>[横置]转为【式神形态】，你+1<span class='hong'>【</span>鬼火<span class='hong'>】</span>，额外+1[攻击行动]。",
            yinYangZhanHuan:"[响应]阴阳转换",
            yinYangZhanHuan_info:"<span class='tiaoJian'>(应战攻击时①，打出1张与攻击牌命格相同的攻击牌[展示])</span>你应战此次攻击，并将本次攻击系别转为与此牌相同，你+1<span class='hong'>【</span>鬼火<span class='hong'>】</span>。<span class='tiaoJian'>(若处于【式神形态】，[重置]脱离【式神形态】)</span>本次攻击伤害为X，X为你的<span class='hong'>【</span>鬼火<span class='hong'>】</span>数。",
            shiShenZhuanHuan:"[响应]式神转换",
            shiShenZhuanHuan_info:"<span class='tiaoJian'>(与【阴阳转换】同时发动)</span>你摸1张牌[强制]，你+1<span class='hong'>【</span>鬼火<span class='hong'>】</span>。",
            heiAnJiLi:"[被动]黑暗祭礼",
            heiAnJiLi_info:"<span class='tiaoJian'>(你的回合结束时，若</span><span class='hong'>【</span>鬼火<span class='hong'>】</span><span class='tiaoJian'>达到上限)</span>移除所有<span class='hong'>【</span>鬼火<span class='hong'>】</span>，对目标角色造成2点法术伤害③。",
            shiShenZhouShu:"[响应]式神咒束",
            shiShenZhouShu_info:"<span class='tiaoJian'>(目标队友受到主动攻击时①，若此攻击可应战且你处于【式神形态】，打出1张合理的应战攻击牌[展示]，移除我方【战绩区】1[宝石]1[水晶])</span>将本次攻击目标变更为你，且视为你使用此牌执行应战攻击。",
            shengMingJieJie:"[法术]生命结界",
            shengMingJieJie_backup:"[法术]生命结界",
            shengMingJieJie_info:"[水晶]你+1<span class='hong'>【</span>鬼火<span class='hong'>】</span>，选择以下一项发动：<br>·目标队友+1[宝石]并+1[治疗]；然后对自己造成X点法术伤害③，X为你的<span class='hong'>【</span>鬼火<span class='hong'>】</span>数。(若X为3)本次法术伤害③不会造成我方士气下降。<br>·<span class='tiaoJian'>(仅【式神形态】下，弃2张命格相同的手牌[展示])</span>[重置]脱离【式神形态】目标队友弃1张牌。",
            guiHuo:"鬼火",
            guiHuo_info:"<span class='hong'>【</span>鬼火<span class='hong'>】</span>为阴阳师专有指示物，上限为3。",
            
            //苍炎魔女
            cangYanFaDian:"[法术]苍炎法典",
            cangYanFaDian_info:"<span class='tiaoJian'>(弃1张火系牌[展示])</span>对目标角色和自己造成2点法术伤害③。",
            tianHuoDianKong:"[法术]天火断空",
            tianHuoDianKong_info:"<span class='tiaoJian'>(弃2张火系牌[展示]，移除1点【重生】)</span>对目标角色和自己造成3点火焰伤害③，<span class='tiaoJian'>(若我方士气落后于该目标)</span>本次法术伤害额外+1[强制]。",
            moNvZhiNu:"[启动]魔女之怒",
            moNvZhiNu_info:"<span class='tiaoJian'>(手牌<4张时)</span>[横置]摸0-2张牌，数值由你决定，持续到你的下个行动阶段开始前，你都处于【烈焰形态】，在此形态下你的所有除水系和暗系外的攻击牌均视为火系[强制]，你释放【天火断空】时无需消耗【重生】，你的手牌上限+(X-2)(X为你的【重生】数量)；脱离【烈焰形态】时[重置]。",
            tiShenWanOu:"[响应]替身玩偶",
            tiShenWanOu_info:"<span class='tiaoJian'>(任何人对你造成攻击伤害时③，弃1张法术牌[展示])</span>，目标队友摸1张牌[强制]。",
            yongShengYinShiJi:"[被动]永生银时计",
            yongShengYinShiJi_info:"<span class='tiaoJian'>(当你因承受法术伤害而造成士气下降时)</span>，你+1【重生】",
            tongKuLianJie:"[法术]痛苦链接",
            tongKuLianJie_info:"[水晶]对目标对手和自己各造成1点法术伤害③，然后你弃到3张牌。",
            moNengFanZhuan:"[响应]魔能反转",
            moNengFanZhuan_info:"[水晶]<span class='tiaoJian'>(任何人对你造成法术伤害时③，弃X张法术牌[展示](X>1))</span>，对目标对手造成(X-1)点法术伤害。",
            chongSheng:"重生",
            chongSheng_info:"<span class='hong'>【</span>重生<span class='hong'>】</span>为苍炎魔女专有指示物，上限为4。",

            //贤者
            zhiHuiFaDian:"[被动]智慧法典",
            zhiHuiFaDian_info:"你的【能量】上限+1；<span class='tiaoJian'>(你每次承受法术伤害时⑥，若该伤害>3)</span>你+2[宝石]并弃1张牌。",
            faShuFanTan:"[响应]法术反弹",
            faShuFanTan_info:"<span class='tiaoJian'>(你每次承受法术伤害时⑥，若该伤害仅为1点，则可以弃X张同系牌[展示](X>1))</span>对目标角色造成(X-1)点法术伤害③，并对自己造成X点法术伤害③。",
            moDaoFaDian:"[法术]魔道法典",
            moDaoFaDian_info:"[宝石]<span class='tiaoJian'>(弃X张异系牌[展示](X>1))</span>对目标角色和自己各造成(X-1)点法术伤害③。",
            shengJieFaDian:"[法术]圣洁法典",
            shengJieFaDian_info:"[宝石]<span class='tiaoJian'>(弃X张异系牌[展示](X>2))</span>最多(X-2)名角色各+2[治疗]，并对自己造成(X-1)点法术伤害③。",

            //魔弓
            moGuanChongJi:"[响应]魔贯冲击",
            moGuanChongJi_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1个火系【充能】[展示])</span>本次攻击伤害额外+1，不能攻击手牌达到上限的对手；<span class='tiaoJian'>(若命中②，额外移除1个火系【充能】[展示])</span>，本次攻击伤害额外+1；<span class='tiaoJian'>(若未命中②)</span>对对手造成3点法术伤害③，本回合你不能发动【多重射击】。",
            leiGuangSanShe:"[法术]雷光散射",
            leiGuangSanShe_backup:"[法术]雷光散射",
            leiGuangSanShe_info:"<span class='tiaoJian'>(移除1个雷系【充能】[展示])</span>对所有对手造成1点法术伤害③；<span class='tiaoJian'>(若你额外移除X个雷系【充能】[展示])</span>指定一名对手，本次对其攻击伤害额外+X③。",
            duoChongSheJi:"[响应]多重射击",
            duoChongSheJi_info:"<span class='tiaoJian'>([攻击行动]结束后发动，移除1个风系【充能】[展示])</span>视为一次暗系的主动攻击，但不能攻击上次的目标且本次攻击伤害-1；本回合你不能发动【魔贯冲击】。",
            chongNeng:"[启动]充能",
            chongNeng_info:"[水晶]你弃到4张牌，摸X张牌[强制]，可将自己至多X张手牌面朝下放置在你的角色旁，作为【充能】(X<5)；本回合你不能发动【魔贯冲击】和【雷光散射】。",
            moYan:"[启动]魔眼",
            moYan_info:"[宝石]目标角色弃1张牌或你摸3张牌[强制]，将自己1张手牌作为【充能】，你+1[水晶]。",
            chongNengPai:"充能",
            chongNengPai_info:"【充能】为魔弓专有盖牌，上限为8",

            //魔枪
            anZhiJieFang:"[启动]暗之解放",
            anZhiJieFang_info:"[横置]转为【幻影形态】，你的手牌上限恒定为5[恒定]；本回合你的下次主动攻击伤害额外+1，但不能发动【漆黑之枪】和【充盈】。",
            huanYingXingChen:"[启动]幻影星辰",
            huanYingXingChen_info:"<span class='tiaoJian'>(仅【幻影形态】下发动，对自己造成2点法术伤害③)</span>[重置]脱离【幻影形态】；若没有因此造成我方士气下降，则对目标角色造成2点法术伤害③。",
            heiAnShuFu:"[被动]黑暗束缚",
            heiAnShuFu_info:"你始终不能使用法术牌。",
            anZhiZhangBi:"[响应]暗之障壁",
            anZhiZhangBi_info:"<span class='tiaoJian'>(任何人对你造成伤害时发动③)</span>弃X张法术牌或雷系牌[展示]。",
            chongYing:"[法术]充盈",
            chongYing_info:"<span class='tiaoJian'>(弃1张法术牌或雷系牌[展示])</span>所有人各弃1张牌[展示]，我方角色可选择不如此做，除你以外每以此法弃1张法术牌或雷系牌，本回合你的下次主动攻击伤害额外+1；额外+1[攻击行动]。",
            qiHeiZhiQiang:"[响应]漆黑之枪",
            qiHeiZhiQiang_info:"X[水晶]<span class='tiaoJian'>(仅【幻影形态】下，主动攻击手牌为1或2的对手并命中后发动②)</span>本次攻击伤害额外+(X+2)。",

            //灵符师
            lingFu_leiMing:"[法术]灵符-雷鸣",
            lingFu_leiMing_info:"<span class='tiaoJian'>(弃1张雷系牌[展示])</span>对任意2名角色各造成1点法术伤害③。",
            lingFu_fengXing:"[法术]灵符-风行",
            lingFu_fengXing_info:"<span class='tiaoJian'>(弃1张风系牌[展示])</span>指定2名角色各弃1张牌。",
            nianZhou:"[响应]念咒",
            nianZhou_info:"每当你发动【灵符】，可将自己的1张手牌面朝下放置在你的角色旁，作为【妖力】。",
            baiGuiYeXing:"[响应]百鬼夜行",
            baiGuiYeXing_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除1个【妖力】)</span>对目标角色造成1点法术伤害③；<span class='tiaoJian'>(若【妖力】为火系牌，可展示之[展示])</span>改为指定2名角色，对除他们以外的其他所有角色各造成1点法术伤害③。",
            lingLiBengJie:"[响应]灵力崩解",
            lingLiBengJie_info:"[水晶]<span class='tiaoJian'>(和【灵符-雷鸣】或【百鬼夜行】同时发动)</span>你的本次【灵符-雷鸣】或【百鬼夜行】每次造成的伤害额外+1。",
            yaoLi:"妖力",
            yaoLi_info:"【妖力】为灵符师专有盖牌，上限为2；若【妖力】达到上限，则不能发动【念咒】。",

            //吟游诗人
            chenLunXieZouQu:"[响应]沉沦协奏曲[回合限定]",
            chenLunXieZouQu_info:"<span class='tiaoJian'>(仅【普通形态】下，一回合内我方对至少2名对手造成法术伤害③且结算之后，弃2张同系牌[展示])</span>你+1【灵感】。<span class='tiaoJian'>(若弃牌中有法术牌)</span>对目标对手造成1点法术伤害③。",
            buXieHeXian:"[法术]不谐和弦",
            buXieHeXian_backup:"[法术]不谐和弦",
            buXieHeXian_info:"<span class='tiaoJian'>(移除X点【灵感】，X>1)(若你处于【永恒囚徒形态】，[重置]脱离【永恒囚徒形态】)</span>你选择以下一项发动：<br>·你和目标角色各摸(X-1)张牌[强制]。<br>·你和目标角色各弃(X-1)张牌。",
            jinJiShiPian:"[被动]禁忌诗篇",
            jinJiShiPian_info:"<span class='tiaoJian'>(【激昂狂想曲】或【胜利交响诗】的效果结算完后)</span>根据【灵感】数量：<br>·(【灵感】未达上限)你+1【灵感】，移除【永恒乐章】。<br> ·(【灵感】已达上限)对自己造成3点法术伤害③。<span class='tiaoJian'>(若你处于【普通形态】)</span>[横置]转为【永恒囚徒形态】。",
            jiAngKuangXiangQu:"(专)[响应]激昂狂想曲",
            jiAngKuangXiangQu_info:"<span class='tiaoJian'>(回合开始时若你拥有【永恒乐章】)</span>选择以下一项执行：<br>·吟游诗人对2名目标对手各造成1点法术伤害③。 <br>·你弃2张牌。",
            shengLiJiaoXiangShi:"(专)[响应]胜利交响诗",
            shengLiJiaoXiangShi_info:"<span class='tiaoJian'>(回合结束时若你拥有【永恒乐章】)</span>选择以下一项执行<br>·将我方【战绩区】的1个星石提炼成为你的能量。<br>·为我方【战绩区】+1[宝石]，你+1[治疗]。",
            xiWangFuGeQu:"[启动]希望赋格曲",
            xiWangFuGeQu_info:"[水晶]你可以选择摸1张牌，如果【永恒乐章】不在场，则将【永恒乐章】放置于目标队友面前；否则将【永恒乐章】转移给我方另一名目标角色，你弃1张牌，+1[治疗]或+1【灵感】。",
            lingGan:"灵感",
            lingGan_info:"【灵感】为吟游诗人的专有指示物，上限为3。",
            yongHengYueZhang_jiAngKuangXiangQu:"(专)[响应]激昂狂想曲",
            yongHengYueZhang_shengLiJiaoXiangShi:"(专)[响应]胜利交响诗",

            //勇者
            yongZheZhiXin:"[被动]勇者之心",
            nuHou:"[响应]怒吼",
            jinPiLiJin:"[被动]精疲力竭",
            mingJingZhiShui:"[响应]明镜止水",
            tiaoXin:"(专)[法术]挑衅",
            tiaoXinX:"挑衅-结束回合",
            tiaoXinX_kaiShi:"挑衅-开始",
            tiaoXinX_qiDongQian:"挑衅-启动前",
            tiaoXinX_qiDongHou:"挑衅-启动后",
            jinDuanZhiLi:"[响应]禁断之力",
            siDou:"[响应]死斗",
            nuQi:"怒气",
            zhiXing:"知性",
            yongZheZhiXin_info:"游戏初始时，你+2[水晶]。",
            nuHou_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1点【怒气】)</span>你可以摸1张牌，本次攻击伤害额外+2；<span class='tiaoJian'>(若未命中②)</span>你+1【知性】。",
            jinPiLiJin_info:"<span class='tiaoJian'>(发动【禁断之力】后强制触发[强制])</span>[横置]额外+1[攻击行动]；持续到你的下个行动阶段开始，你的手牌上限恒定为4[恒定]。 【精疲力竭】的效果结束时[重置]，并对自己造成3点法术伤害③。",
            mingJingZhiShui_info:"<span class='tiaoJian'>(主动攻击前发动①，移除4点【知性】)</span>本次攻击对手无法应战。<span class='tiaoJian'>(本次攻击结束时)</span>你+1[水晶]",
            tiaoXin_info:"<span class='tiaoJian'>(移除1点【怒气】)</span>将【挑衅】放置于目标对手面前，你+1【知性】；该对手在其下个行动阶段必须且只能主动攻击你，否则他跳过该行动阶段，触发后移除此牌。",
            jinDuanZhiLi_info:"[水晶]<span class='tiaoJian'>(主动攻击命中或未命中后发动②)</span>弃掉你所有手牌[展示]，其中每有1张法术牌，你+1【怒气】；<span class='tiaoJian'>(若未命中②)</span>其中每有1张水系牌，你+1【知性】；<span class='tiaoJian'>(若命中②)</span>其中每有1张火系牌，本次攻击伤害额外+1，并对自己造成等同于火系牌数量的法术伤害③。",
            siDou_info:"[宝石](每当你将要承受法术伤害时发动⑥)你+3【怒气】；<span class='tiaoJian'>(若此伤害造成士气实际下降)</span>本次的士气下降值恒定为1[强制]。",
            nuQi_info:"【怒气】为勇者专有指示物，上限为4。",
            zhiXing_info:"【知性】为勇者专有指示物，上限为4。",

            //格斗家
            nianQiLiChang:"[被动]念气立场",
            xuLiYiji:"[响应]蓄力一击",
            nianDan:"[响应]念弹",
            baiShiHuanLongQuan:"[启动]百式幻龙拳",
            qiJueBengJi:"[响应]气绝崩击",
            douShenTianQu:"[启动]斗神天驱",
            douQi:"斗气",
            nianQiLiChang_info:"所有对你造成的伤害每次最高为4点③。",
            xuLiYiji_info:"<span class='tiaoJian'>(主动攻击前发动①，+1【斗气】)</span>本次攻击伤害额外+1；<span class='tiaoJian'>(若未命中②)</span>对自己造成X点法术伤害③，X为你所拥有的【斗气】数；<span class='tiaoJian'>(若【斗气】已经达到上限)</span>你不能发动【蓄力一击】。",
            nianDan_info:"<span class='tiaoJian'>([法术行动]结束时发动，+1【斗气】)</span>，对目标对手造成1点法术伤害③，<span class='tiaoJian'>(若发动前对方的[治疗]为0)</span>对自己造成X点法术伤害③，X为你拥有的【斗气】数；<span class='tiaoJian'>(若【斗气】已达到上限)</span>你不能发动【念弹】。",
            baiShiHuanLongQuan_info:"[持续]<span class='tiaoJian'>(移除3点【斗气】)</span>[横置]你的所有主动攻击伤害额外+2，所有应战攻击伤害额外+1 ；在你接下来的行动阶段，你不能执行[法术行动]和[特殊行动]；你的主动攻击必须以同一名角色为目标，并且不能发动【蓄力一击】；若不如此做，则取消【百式幻龙拳】的效果并[重置]。",
            qiJueBengJi_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1点【斗气】)</span>本次攻击对方无法应战，然后对自己造成X点法术伤害③，X为你的【斗气】数；不能和蓄力一击同时发动。",
            douShenTianQu_info:"[水晶]你弃到3张牌，+2[治疗]。",
            douQi_info:"【斗气】为格斗家专有指示物，上限为6",

            //圣弓
            tianZhiGong:"[被动]天之弓",
            shengXieJuBao:"[法术]圣屑飓暴",
            shengHuangJiangLin:"[法术]圣煌降临[持续]",
            shengHuangJiangLin_backup:"[法术]圣煌降临[持续]",
            shengGuangBaoLie:"[法术]圣光爆裂",
            shengGuangBaoLie_backup:"[法术]圣光爆裂",
            liuXingShengDan:"[响应]流星圣弹",
            shengHuangHuiGuangPao:"[法术]圣煌辉光炮",
            ziDongTianChong:"[被动]自动填充",
            xinYang:"信仰",
            shengHuangHuiGuangPaoX:"圣煌辉光炮",
            
            tianZhiGong_info:"游戏初始时，你+2[水晶]，你+1【圣煌辉光炮】。你的[治疗]上限+1。 <span class='tiaoJian'>(主动攻击时，若攻击牌不为圣类命格)</span>本次攻击伤害-1；<span class='tiaoJian'>(主动攻击命中时，若攻击牌为圣类命格)</span>你+1【信仰】。",
            shengXieJuBao_info:"<span class='tiaoJian'>(弃2张同系攻击牌[展示])</span>视为一次圣类命格的该系主动攻击。 <span class='tiaoJian'>(若攻击未命中②，移除X点[治疗]，X最高为2)</span>目标队友弃X张牌。",
            shengHuangJiangLin_info:"<span class='tiaoJian'>(移除你的2个[治疗]或2点【信仰】)</span>[横置]，转为【圣煌形态】，额外+1[法术行动]。此形态下，你若执行【特殊行动】，则[重置]脱离【圣煌形态】并+1[治疗]或+1【信仰】。",
            shengGuangBaoLie_info:"<span class='tiaoJian'>(仅【圣煌形态】下可发动)</span>你选择以下一项发动：<br>·摸1张牌[强制]，移除你的1点[治疗]，你+1【信仰】，目标队友+1[治疗]。 <br>·<span class='tiaoJian'>(移除你的X[治疗]，选择最多X名手牌数不大于你手牌数-X的对手)</span>你弃X张牌，然后对他们各造成(Y+2)点攻击伤害。 Y为目标数中拥有[治疗]的人数。",
            liuXingShengDan_info:"<span class='tiaoJian'>(仅【圣煌形态】下，主动攻击前①，移除你的1点[治疗]或是1点【信仰】)</span>我方目标角色+1[治疗]。",
            shengHuangHuiGuangPao_info:"<span class='tiaoJian'>(仅【圣煌形态】下可发动，移除1点【圣煌辉光炮】，移除4点【信仰】，并额外移除等同我方落后士气的【信仰】数)</span>所有角色将手牌调整为4张，我方[星杯区]+1[星杯]，然后将一方[士气]调整与另一方相同。",
            ziDongTianChong_info:"<span class='tiaoJian'>(你的回合结束时，若你未执行【特殊行动】)</span>你选择以下一项发动：<br>·[水晶]你+1【信仰】或+1[治疗]。 <br>·[宝石]你+1[水晶]，+2【信仰】或+2[治疗]。",
            xinYang_info:"【信仰】为圣弓专有指示物，上限为10。",
            shengHuangHuiGuangPaoX_info:"【圣煌辉光炮】为圣弓专有指示物，上限为1。",

            //剑帝
            jianHunShouHu:"[被动]剑魂守护",
            yangGong:"[被动]佯攻",
            jianQiZhan:"[响应]剑气斩",
            tianShiZhiHun:"[响应]天使之魂",
            eMoZhiHun:"[响应]恶魔之魂",
            buQuYiZhi:"[响应]不屈意志",
            jianHun:"剑魂",
            jianQi:"剑气",
            jianHunShouHu_info:"<span class='tiaoJian'>(主动攻击未命中时发动②)</span>将本次打出的攻击牌作为面朝下放置在你的角色旁，作为【剑魂】。若你现有能量为单数，你的所有【剑魂】视为【天使之魂】；若为双数，视为【恶魔之魂】；若没有能量，则不属于任何一种。 <span class='tiaoJian'>(若【剑魂】达到上限)</span>你不能发动[剑魂守护]。",
            yangGong_info:"<span class='tiaoJian'>(主动攻击未命中时发动②)</span>你+1【剑气】。",
            jianQiZhan_info:"<span class='tiaoJian'>(主动攻击命中后发动②，移除X点【剑气】，X最高为3)</span>对除你所攻击的目标以外的任意一名角色造成X点法术伤害③。",
            tianShiZhiHun_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1张【天使之魂】)</span>本次攻击若命中②，你+2[治疗]；若未命中②，我方+1士气；不能和【剑魂守护】同时发动。",
            eMoZhiHun_info:"<span class='tiaoJian'>(主动攻击前发动①，移除1张【恶魔之魂】)</span>本次攻击伤害额外+1；若未命中②，你+2【剑气】；不能和【剑魂守护】同时发动。",
            buQuYiZhi_info:"[水晶]<span class='tiaoJian'>([攻击行动]结束后发动)</span>你摸1张[强制]，+1【剑气】，额外+1[攻击行动]。",
            jianHun_info:"【剑魂】为剑帝专有盖牌，上限为3。",
            jianQi_info:"【剑气】为剑帝专有指示物，上限为5。",
          
            //兽灵武士
            wuZheCanXin:"[响应]武者残心[回合限定]",
            yiJiWuNian:"[响应]一击无念",
            shouHunYiNian:"[被动]兽魂意念",
            shouHunJingJie:"[响应]兽魂警戒[持续]",
            shouFan:"[响应]兽反",
            yuHunLiuJuHeXingTai:"[被动]御魂流居合形态",
            niFanJuHeZhan:"[响应]逆反居合斩",
            yuHunLiuJuHeShi:"[启动]御魂流居合形态[持续]",
            shouHun:"兽魂",
            canXin:"残心",
            
            wuZheCanXin_info:"<span class='tiaoJian'>([攻击行动]结束时)</span>你+1【残心】。",
            yiJiWuNian_info:"<span class='tiaoJian'>([攻击行动]结束后，移除4点【残心】)</span>额外+1[攻击行动]，本次攻击无视【圣盾】且无法用【圣光】抵挡。 <span class='tiaoJian'>(若攻击牌为技类命格)</span>本次攻击强制命中。",
            shouHunYiNian_info:"<span class='tiaoJian'>(你每移除1点【兽魂】)</span>你+1【残心】；<span class='tiaoJian'>(仅【普通形态】下，主动攻击命中时②)</span>你+1【兽魂】。",
            shouHunJingJie_info:"<span class='tiaoJian'>(其他角色的[横置]效果结算完成后，移除1点【兽魂】，[横置]转为【御魂流居合形态】)</span>目标角色弃1张牌[展示]； <span class='tiaoJian'>(若弃牌为法术牌)</span>你+1【兽魂】。",
            shouFan_info:"<span class='tiaoJian'>(目标角色对你造成法术伤害③时，移除X点【兽魂】)</span>你弃X张牌，他弃1张牌；<span class='tiaoJian'>(若他的弃牌为法术牌)</span>你+1【兽魂】。",
            yuHunLiuJuHeXingTai_info:"在此形态下，你对[横置]的目标角色攻击伤害+1。你回合结束前-1【兽魂】。 <span class='tiaoJian'>(你造成伤害⑥，或你的回合结束时【兽魂】为0)</span>[转正]脱离御魂流居合形态。",
            niFanJuHeZhan_info:"<span class='tiaoJian'>(仅【御魂流居合形态】下，攻击手牌<4的对手前①发动)</span>移除X点【兽魂】。本次攻击命中时②，改为攻击目标弃置<span class='tiaoJian'>(X+2)</span>张手牌。 <span class='tiaoJian'>(若因此弃牌数小于X+2)</span>对方士气-1。",
            yuHunLiuJuHeShi_info:"[宝石]无视你的【兽魂】上限+1【兽魂】，你可选择摸或弃1张牌；<span class='tiaoJian'>(若你处于【御魂流居合形态】)</span>你+1【残心】 ；<span class='tiaoJian'>(若你处于[普通型态])</span>[横置]转为【御魂流居合形态】。",
            shouHun_info:"【兽魂】为兽灵武士专有指示物，上限为2。",
            canXin_info:"【残心】为兽灵武士专有指示物，上限为4。",

            //灵魂术士
            lingHunTunShi:"[被动]灵魂吞噬",
            lingHunZhaoHuan:"[法术]灵魂召还",
            lingHunZhuanHuan:"[响应]灵魂转换",
            lingHunJingXiang:"[法术]灵魂镜像",
            lingHunZhenBao:"(独)[法术]灵魂震爆",
            lingHunFuYu:"(独)[法术]灵魂赋予",
            lingHunLianJie:"(专)[启动]灵魂链接(2v2禁用)",
            lingHunZengFu:"[启动]灵魂增幅",
            huangSeLingHun:"黄色灵魂",
            lanSeLingHun:"蓝色灵魂",

            lingHunTunShi_info:"<span class='tiaoJian'>(我方每有1点士气下降)</span>你+1【黄色灵魂】。",
            lingHunZhaoHuan_info:"<span class='tiaoJian'>(弃X张法术牌[展示])</span>你+X点【蓝色灵魂】。",
            lingHunZhuanHuan_info:"<span class='tiaoJian'>(你每发动1次主动攻击①)</span>可转换1点你拥有的[灵魂]的颜色。",
            lingHunJingXiang_info:"<span class='tiaoJian'>(移除2点【黄色灵魂】)</span>你弃2张牌，目标角色摸2张牌[强制]，但最多补到其手牌上限。",
            lingHunZhenBao_info:"<span class='tiaoJian'>(移除3点【黄色灵魂】)</span>对目标角色造成3点法术伤害③，若他手牌<3且手牌上限>5，则本次伤害额外+2。",
            lingHunFuYu_info:"<span class='tiaoJian'>(移除3点【蓝色灵魂】)</span>目标角色+2[宝石]。",
            lingHunLianJie_info:"<span class='tiaoJian'>(移除1点【黄色灵魂】和1点【蓝色灵魂】)</span>将【灵魂链接】放置于一名队友面前，<span class='tiaoJian'>(每当你们之间有人承受伤害时⑥，移除X点【蓝色灵魂】)</span>将X点伤害转移给另1人，转移后的伤害为法术伤害⑥。",
            lingHunZengFu_info:"[宝石]你+2【黄色灵魂】和2【蓝色灵魂】。",
            huangSeLingHun_info:"【黄色灵魂】为灵魂术士专有指示物，上限为6。",
            lanSeLingHun_info:"【蓝色灵魂】为灵魂术士专有指示物，上限为6。",
            
            //血之巫女
            xueZhiAiShang:"[启动]血之哀伤",
            liuXue:"[被动]流血[持续]",
            niLiu:"[法术]逆流",
            xueZhiBeiMing:"(独)[法术]血之悲鸣",
            tongShengGongSi:"(专)[法术]同生共死",
            xueZhiZuZhou:"[法术]血之诅咒",

            xueZhiAiShang_info:"<span class='tiaoJian'>(对自己造成2点法术伤害③)</span>转移同生共死的目标或是移除【同生共死】。",
            liuXue_info:"[持续]<span class='tiaoJian'>(当你在【普通形态】下，因承受伤害而导致我方士气减少时强制发动[强制])</span>[横置]转为【流血形态】，你+1[治疗]。此形态下在你的每次回合开始时，对自己造成1点法术伤害③。 <span class='tiaoJian'>(自身手牌<3时强制发动[强制])</span>[重置]脱离【流血形态】。",
            niLiu_info:"<span class='tiaoJian'>(仅【流血形态】下发动)</span>你弃2张牌，你+1[治疗]。",
            xueZhiBeiMing_info:"<span class='tiaoJian'>(仅【流血形态】下发动)</span>对目标角色和自己各造成(X+1)点法术伤害③，X<3。",
            tongShengGongSi_info:"<span class='tiaoJian'>(你摸2张牌[强制])</span>将【同生共死】放置于目标角色面前。<span class='tiaoJian'>(在【普通形态】下)</span>你和他手牌上限各-2。<span class='tiaoJian'>(在【流血形态】下)</span>你和他手牌上限各+1。",
            xueZhiZuZhou_info:"[宝石]对目标角色造成2点法术伤害③，你弃3张牌。",

            //蝶舞者
            shengMingZhiHuo:"[被动]生命之火",
            wuDong:"[法术]舞动",
            duFen:"[响应]毒粉",
            chaoSheng:"[响应]朝圣",
            jingHuaShuiYue:"[响应]镜花水月",
            diaoLing:"[响应]凋零",
            diaoLing2:"[响应]凋零",
            yongHua:"[法术]蛹化",
            daoNiZhiDie:"[法术]倒逆之蝶",
            jian:"茧",
            DWZyong:"蛹",

            shengMingZhiHuo_info:"你的手牌上限-X，X为你拥有的【蛹】的数量，但你的手牌上限最少为3。",
            wuDong_info:"<span class='tiaoJian'>(摸1张牌[强制]或弃 1 张牌[强制])</span>将牌库顶的1张牌面朝下放置在你角色旁，作为【茧】。(选中牌发动即为弃牌)",
            duFen_info:"<span class='tiaoJian'>(每当有角色产生1点实际法术伤害时发动⑤，移除1个【茧】)</span>该次伤害额外+1。",
            chaoSheng_info:"<span class='tiaoJian'>(每当你承受伤害时发动⑥，移除1个【茧】)</span>抵御1点该来源的伤害。",
            jingHuaShuiYue_info:"<span class='tiaoJian'>(每当有角色承受2点实际法术伤害时发动⑤，移除2张同系【茧】[展示])</span>抵御该次伤害，你对他造成2次法术伤害③，每次伤害为1点。",
            diaoLing_info:"<span class='tiaoJian'>(你每次移除【茧】时，若为法术牌，可展示之[展示])</span>你对目标角色造成1点法术伤害③，再对自己造成2点法术伤害③；此技能发动后，直到你下个回合开始前，对方的士气最少为1[强制]。",
            yongHua_info:"[宝石]<span class='tiaoJian'>(你+1【蛹】)</span>将牌库顶的4张牌面朝下放置在你角色旁，作为【茧】。",
            daoNiZhiDie_info:"[水晶]你弃2张牌，再选择以下1项发动：<br>·对目标角色造成1点法术伤害③，该伤害不能用[治疗]抵御。<br> ·<span class='tiaoJian'>(移除2个【茧】或对自己造成4点法术伤害③)</span>移除1个【蛹】。",
            jian_info:"【茧】为蝶舞者专有盖牌，上限为8。",
            DWZyong_info:"【蛹】为蝶舞者专有指示物，无上限。",

		},
	};
});
