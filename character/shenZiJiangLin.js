'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shenZiJiangLin',
		connect:true,
        characterSort:{
            shenZiJiangLin:{
                "3星":['jinGuiZhiNv'],
                "3.5星":[],
                "4星":['shenMiXueZhe','wuRanZhe'],
                "4.5星":[],
                '5星':['nvPuZhang','jieJieShi'],
            }
        },
		character:{
            //jinGuiZhiNv:['female','yong',3,[],],
            //nvPuZhang:['female','ji',5,[],],
            //jieJieShi:['female','huan',5,[],],
            //shenMiXueZhe:['female','yong',4,[],],
            //wuRanZhe:['female','xue',4,[],],
		},
        characterIntro:{
            
        },
		
		skill:{
            

        },
		
		translate:{
            jinGuiZhiNv:'矜贵之女',
            nvPuZhang:'女仆长',
            jieJieShi:'结界师',
            shenMiXueZhe:'神秘学者',
            wuRanZhe:'污染者',
        },
	};
});
