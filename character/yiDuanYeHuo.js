'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'yiDuanYeHuo',
		connect:true,
        characterSort:{
            yiDuanYeHuo:{
                "3星":['zhanDouFaShi'],
                "3.5星":['lieWuRen'],
                "4星":['shengTingJianChaShi','shengDianQiShi'],
                "4.5星":['xingZhuiNvWu'],
            }
        },
		character:{
            //zhanDouFaShi:['female','yong',6,['jianxiong'],],
            //xingZhuiNvWu:['female','yong',6,['jianxiong'],],
            //shengTingJianChaShi:['female','sheng',6,['jianxiong'],],
            //lieWuRen:['male','ji',6,['jianxiong'],],
            //shengDianQiShi:['female','sheng',6,['jianxiong'],],
		},
		
		skill:{

        },
		
		translate:{

        },
	};
});
