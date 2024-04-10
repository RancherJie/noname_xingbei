'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'yiDuanYeHuo',
		connect:true,
        characterSort:{
            yiDuanYeHuo:{
                3:['zhanDouFaShi'],
                3.5:['lieWuRen'],
                4:['shengTingJianChaShi','shengDianQiShi'],
                4.5:['xingZhuiNvWu','yuanChuZhiGong'],
            }
        },
		character:{
            zhanDouFaShi:['female','yong',6,['jianxiong'],],
            xingZhuiNvWu:['female','yong',6,['jianxiong'],],
            shengTingJianChaShi:['female','sheng',6,['jianxiong'],],
            lieWuRen:['male','ji',6,['jianxiong'],],
            shengDianQiShi:['female','sheng',6,['jianxiong'],],
            yuanChuZhiGong:['female','sheng',6,['jianxiong'],],

		},
		
		skill:{

        },
		
		translate:{

        },
	};
});
