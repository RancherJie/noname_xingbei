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
            zhanDouFaShi:['female','yong',3,['fuWenZhiHuan','fuMoDaJi','shangBian','moLiShangZeng'],],
            xingZhuiNvWu:['female','yong','4/5',['mingDingZhiLi','xingHuan','xingKe','qunXingQiShi','huangJinLv','fanXing','yingYue','shiRi','chuangKeLvDong','luEn'],],
            shengTingJianChaShi:['female','sheng',4,['kuangXinTu','caiJueLunDing','enDianShenShou','jingHuaZhiShu','biHuLingYu','caiJueZhe','shenShengBianCe','caiJue'],],
            lieWuRen:['male','ji','3/4',['zhuanHuan','shouMoCi','faShuBoLi','guanYinDuRen','touXi','moLiPing'],],
            shengDianQiShi:['female','sheng',4,['shenXuanZhe','shenWei','shengCai','shengYu','shenZhiZi','shenLinShengQi','shengYanQiFu','shengYin'],],
		},
        characterIntro:{
            zhanDouFaShi:`\u4E3A\u5BFB\u627E\u9B54\u6CD5\u7684\u771F\u7406\uFF0C\u5E26\u7740\u7B26\u6587\u4E4B\u77F3\u8F97\u8F6C\u6765\u5230\u6614\u65E5\u597D\u53CB\uFF08\u771FCP\uFF09\u857E\u5A1C\u6240\u5728\u7684\u6751\u5E84\uFF0C\u4E00\u573A\u98CE\u66B4\u5373\u5C06\u6765\u4E34\u3002\u539F\u4F4F\u5740\u8BE6\u89C1\u201C\u4E16\u754C\u5730\u56FE\u201D
            \u5728\u5B66\u9662\u90FD\u5E02\u4E2D\u5B66\u4E60\uFF0C\u4EBA\u79F0\u540A\u8F66\u5C3E\u6CD5\u5E08\u2014\u2014\u8DEF\u5C14\u8389\u5609\uFF1B\u4F46\u540A\u8F66\u5C3E\u6CD5\u5E08\uFF0C\u867D\u7136\u540A\u8F66\u5C3E\uFF0C\u4F46\u5374\u662F\u5C5E\u4E8E\u9996\u5E2D\u4E0E\u5B66\u9738\u5C42\u6B21\u7684\u540A\u8F66\u5C3E\u3002\u5BF9\u4E8E\u666E\u901A\u7684\u6CD5\u5E08\u6765\u8BF4\uFF0C\u5979\u8FD8\u662F\u4E00\u6D41\u7684\uFF0C\u4F46\u5BF9\u4E8E\u90A3\u4E9B\u5929\u624D\u6765\u8BF4\uFF0C\u5979\u53EA\u662F\u7A0D\u5FAE\u6709\u70B9\u5929\u8D4B\u7684\u79C0\u624D\u3002\u5468\u56F4\u7684\u4EBA\u90FD\u7B11\u8BDD\u8BF4\uFF0C\u5982\u679C\u4E0D\u662F\u56E0\u4E3A\u7B26\u6587\u6CD5\u672F\u7684\u7406\u8BBA\u8BBA\u6587\u88AB\u7B26\u6587\u5B66\u9662\u7684\u957F\u8001\u76F8\u4E2D\u5E76\u6536\u4E3A\u76F4\u7CFB\u5F1F\u5B50\uFF0C\u5979\u5C31\u662F\u4E2A\u4E0D\u5165\u6D41\u7684\u6CD5\u5E08\u800C\u5DF2
            \u4E0E\u857E\u5A1C\u662F\u540C\u4E00\u4E2A\u8001\u5E08
            
            \u8DEF\u5C14\u8389\u5609\u51FA\u751F\u5728\u5927\u9646\u4E2D\u90E8\u7684\u5730\u533A\uFF0C\u6574\u4E2A\u5BB6\u65CF\u4E3B\u8981\u4ECE\u4E8B\u4E1C\u897F\u738B\u56FD\u4E4B\u95F4\u7684\u8D38\u6613\u751F\u610F\uFF08\u5305\u542B\u8D70\u79C1\u548C\u5974\u96B6\u8D38\u6613\u7B49\uFF09\uFF0C\u7ECF\u5E38\u5C45\u65E0\u5B9A\u6240\u3002\u5BB6\u65CF\u4E2D\u9664\u53BB\u957F\u8F88\u5916\uFF0C\u5C31\u53EA\u6709\u5C1A\u5728\u8941\u8913\u4E2D\u7684\u5F1F\u59B9\uFF0C\u57FA\u672C\u4E0A\u6CA1\u6709\u80FD\u4E00\u8D77\u73A9\u800D\u7684\u670B\u53CB\u3002\u6240\u4EE5\u5F53\u90A3\u5929\u5979\u89C1\u5230\u4E00\u4E2A\u8DDF\u5979\u5DEE\u4E0D\u591A\u5E74\u7EAA\uFF0C\u4F46\u5934\u9876\u7740\u6BDB\u7ED2\u7ED2\u8033\u6735\u7684\u5974\u96B6\u5973\u5B69\u65F6\uFF0C\u5979\u51B3\u5B9A\u8BA9\u8FD9\u540D\u5973\u5B69\u6210\u81EA\u5DF1\u7684\u597D\u53CB\uFF0C\u4E8E\u662F\u9F13\u8D77\u52C7\u6C14\u8BF7\u6C42\u7236\u4EB2\u4E3A\u81EA\u5DF1\u4ECE\u5BB6\u65CF\u91CC\u4E70\u4E0B\u8FD9\u4E2A\u5974\u96B6\u3002
            \u5974\u96B6\u8D38\u6613\u662F\u6B8B\u9177\u7684\uFF0C\u5979\u66FE\u7ECF\u76EE\u7779\u8005\u4E00\u540D\u5C11\u5973\u8DDF\u7740\u4E00\u540D\u7537\u5B50\u6765\u5230\u5BB6\u65CF\uFF0C\u5C11\u5973\u660E\u660E\u9762\u5E26\u60C5\u612B\uFF0C\u7136\u800C\u7537\u5B50\u5374\u900F\u8FC7\u5BB6\u65CF\u65E0\u60C5\u7684\u5C06\u5973\u5B50\u5356\u7ED9\u4E86\u6559\u4F1A\u3002\u56E0\u6B64\u5974\u96B6\u8D38\u6613\uFF0C\u4E5F\u662F\u4F1A\u53D7\u5230\u88AD\u51FB\uFF0C\u4E00\u65E5\uFF0C\u4E00\u7FA4\u7CBE\u7075\u65CF\u65CF\u4EBA\u51B2\u8FDB\u4E86\u7EFF\u6D32\u5C0F\u57CE\uFF0C\u6740\u5BB3\u4E86\u5F53\u5730\u9886\u4E3B\uFF0C\u81EA\u5DF1\u5BB6\u65CF\u4E5F\u56E0\u6B64\u8986\u706D\u3002\u5176\u4E2D\uFF0C\u6709\u4E00\u4E2A\u84DD\u5934\u53D1\u5E26\u773C\u955C\u7684\u7CBE\u7075\u5728\u8FD9\u6B21\u51B2\u7A81\u4E2D\u88AB\u5BB6\u65CF\u536B\u5175\u548C\u5F53\u5730\u536B\u5175\u56F4\u56F0\u65F6\uFF0C\u5929\u964D\u9668\u77F3\u706B\u7403\uFF0C\u5939\u7740\u96F7\u51FB\u51B0\u971C\uFF0C\u8F70\u70B8\u4E86\u56F4\u56F0\u7684\u536B\u5175\u3002\u6B64\u523B\u5BF9\u4EC0\u4E48\u4E8B\u90FD\u89C9\u5F97\u65E0\u804A\u7684\u6218\u6CD5\uFF0C\u611F\u53D7\u5230\u9B54\u6CD5\u7684\u6709\u8DA3\u3002
            \u5F53\u7136\uFF0C\u5BF9\u4E8E\u8DEF\u5C14\u8389\u5609\u6765\u8BF4\uFF0C\u5BB6\u65CF\u5BF9\u5979\u6765\u8BF4\u4E5F\u662F\u53EF\u6709\u53EF\u65E0\uFF0C\u6CA1\u6709\u611F\u60C5\u8054\u7CFB\u7684\u5B58\u5728\uFF0C\u4F46\u662F\u8FD9\u6B21\u4E8B\u4EF6\u540E\uFF0C\u5979\u88AB\u8FEB\u627F\u62C5\u8D77\u4E86\u5BB6\u65CF\u91CD\u5174\u7684\u91CD\u62C5\u3002\u4E4B\u524D\u5BB6\u65CF\u8986\u706D\u7684\u6559\u8BAD\u8BA9\u5BB6\u65CF\u7ECF\u5546\u7684\u8303\u56F4\u8C28\u614E\u4E86\u8BB8\u591A\uFF0C\u800C\u8DEF\u5C14\u8389\u5609\u4E3A\u4E86\u5B66\u4E60\u9B54\u6CD5\uFF0C\u7ECF\u5E38\u8DDF\u81EA\u5DF1\u7684\u597D\u53CB\u517C\u987E\u5974\u96B6\u7684\u5C11\u5973\uFF0C\u5077\u5077\u7EC3\u4E60\u3002
            \u540E\u6765\u8FD9\u4F4D\u5974\u96B6\u5C11\u5973\u4E00\u76F4\u5728\u5BB6\u65CF\u91CC\u6210\u4E3A\u6218\u6CD5\u4EE3\u7406\u62C5\u4EFB\u4E86\u5404\u79CD\u8981\u52A1\uFF0C\u5BB6\u65CF\u603B\u7B97\u5B89\u7A33\u4E86\u4E9B\u8BB8\uFF0C\u4F46\u597D\u666F\u4E0D\u957F\uFF0C\u8FD9\u4F4D\u597D\u53CB\u5728\u67D0\u6B21\u8D38\u6613\u56E0\u4E3A\u4E00\u573A\u6C99\u5C18\u66B4\u5931\u53BB\u8054\u7EDC\uFF0C\u5546\u961F\u5E26\u56DE\u6765\u7684\u53EA\u6709\u8FD9\u4F4D\u5C11\u5973\u8DDF\u6218\u6CD5\u513F\u65F6\u7ECF\u5E38\u73A9\u7684\u7B26\u6587\u540A\u5760\u3002`,
            xingZhuiNvWu:`\u4E3A\u63A2\u5BFB\u661F\u7A7A\u7684\u79D8\u5BC6\uFF0C\u4E00\u76F4\u5C45\u4F4F\u5728\u504F\u8FDC\u7684\u5C0F\u5C71\u6751\uFF0C\u81EA\u7531\u81EA\u5728\u7684\u505A\u7740\u7814\u7A76\u3002\u5076\u5C14\u4E5F\u4F1A\u5E2E\u52A9\u6C42\u52A9\u4E8E\u5979\u7684\u5C71\u4E0B\u6751\u6C11\u3002\u6700\u8FD1\u6C42\u52A9\u7684\u6751\u6C11\u591A\u4E86\u8D77\u6765\u3002\u3002\u3002\u3002\u3002\u3002
            \u67D0\u65E5\uFF0C\u5979\u6536\u5230\u6614\u65E5\u597D\u53CB\u8DEF\u5C14\u8389\u5609\u5373\u5C06\u5230\u8BBF\u7684\u6765\u4FE1\uFF1B\u7136\u800C\u7D27\u63A5\u7740\uFF0C\u730E\u5DEB\u884C\u52A8\u7A81\u7136\u7206\u53D1\uFF0C\u4E00\u5207\u7684\u4E00\u5207\u5982\u540C\u6D9F\u6F2A\u4E00\u822C~
            \u66FE\u7ECF\u5728\u5B66\u9662\u90FD\u5E02\u5B66\u4E60\uFF0C\u7528\u90A3\u5929\u7136\u900F\u5207\u7684\u53CC\u7738\u6CE8\u89C6\u7740\u661F\u7A7A\uFF0C\u770B\u7740\u5355\u7EAF\u5446\u949D\uFF0C\u5B9E\u9645\u4E0A\u7ECF\u5E38\u8BED\u51FA\u60CA\u4EBA\u76F4\u51FB\u6838\u5FC3\uFF0C\u4EBA\u79F0\u6574\u5929\u671B\u5929\u770B\u661F\u661F\u7684\u5929\u624D\u3002\u5929\u624D?\u7B28\u86CB?\u4E0D\uFF0C\u5979\u5355\u7EAF\u662F\u5929\u624D\u7684\u5F02\u7C7B\u3002
            \u4E0E\u8DEF\u5C14\u8389\u5609\u662F\u4E00\u4E2A\u8001\u5E08\uFF0C\u540C\u65F6\u4E0E\u8DEF\u5C14\u8389\u5609\u4E3ACP`,
            shengTingJianChaShi:`\u575A\u5B9A\u7684\u795E\u5723\u6559\u5EF7\u7684\u4FE1\u5F92\uFF0C\u751A\u81F3\u5DF2\u7ECF\u8FBE\u5230\u4E86\u75AF\u72C2\u7684\u5730\u6B65\uFF0C\u53EA\u8981\u662F\u6559\u5EF7\u7684\u90FD\u662F\u6B63\u786E\u7684\u3002
            \u6B64\u6B21\u5979\u4F5C\u4E3A\u5723\u6BBF\u9A91\u58EB\u7684\u526F\u5B98\u51FA\u5F81\u8BA8\u4F10\u5F02\u6559\u5F92\uFF0C\u5BA1\u5224\u4E00\u5207\u8FDD\u53CD\u6559\u5EF7\u7684\u4E1C\u897F\uFF1B\u540C\u65F6\u4E5F\u4F5C\u4E3A\u6559\u5EF7\u5B89\u63D2\u5728\u5723\u6BBF\u9A91\u58EB\u56E2\u5185\u7684\u76D1\u89C6\u4E4B\u773C
            \u4ECE\u65AF\u5361\u96F7\u7279\u7684\u5C60\u6740\u4E2D\u552F\u4E00\u5E78\u5B58\u8005\uFF0C\u8179\u9ED1`,
            lieWuRen:`\u66FE\u7ECF\u5728\u201C\u7F6A\u6076\u90FD\u5E02\u201D\u6DF7\u65E5\u5B50\uFF0C\u6574\u5929\u6C89\u6D78\u5728\u9152\u9986\u91CC\u6DF7\u65E5\u5B50\uFF0C\u66FE\u7ECF\u68A6\u60F3\u6210\u4E3A\u51FA\u8272\u7684\u9B54\u6CD5\u5E08\u4F46\u5B9E\u5728\u6CA1\u6709\u8FD9\u65B9\u9762\u7684\u5929\u8D4B\u3002\u6BCF\u5F53\u65BD\u5C55\u9B54\u6CD5\uFF0C\u603B\u662F\u6362\u6765\u56F4\u89C2\u8005\u7684\u8BAA\u7B11\u58F0\u3002\u67D0\u5929\u5728\u9152\u9986\u91CC\u56E0\u4E3A\u966A\u9152\u5C0F\u59D0\u7684\u4E8B\u60C5\uFF0C\u4E0E\u9694\u58C1\u9189\u9152\u95F9\u4E8B\u7684\u9B54\u6CD5\u5E08\u5927\u6253\u51FA\u624B\uFF0C\u56E0\u6B64\u53D1\u73B0\u4E86\u81EA\u5DF1\u72EC\u6709\u7684\u4F18\u79C0\u7684\u5E94\u4ED8\u6CD5\u672F\u7684\u80FD\u529B\uFF1B\u4E8E\u662F\u4ED6\u52AA\u529B\u8BAD\u7EC3\u81EA\u5DF1\uFF0C\u4EE5\u4FBF\u66F4\u597D\u7684\u638C\u63A7\u8FD9\u80A1\u529B\u91CF\u3002\u6570\u5E74\u540E\uFF0C\u6559\u5EF7\u63A8\u52A8\u7684\u201C\u730E\u5DEB\u884C\u52A8\u201D\u5F00\u59CB\uFF0C\u767D\u72FC\u5361\u62C9\u739B\u56E0\u6B64\u58F0\u540D\u9E4A\u8D77`,
            shengDianQiShi:`\u8BE6\u89C1\u201C\u7EA2\u83B2\u4E8B\u4EF6\u201D
            \u5E26\u7740\u661F\u75D5\u51FA\u751F\uFF0C\u88AB\u9882\u4E3A\u795E\u4E4B\u5B50\u3002\u81EA\u5C0F\u5C31\u5728\u6559\u4F1A\u91CC\u957F\u5927\u7684\u65AF\u5361\u96F7\u7279\uFF0C\u4E0D\u5355\u662F\u4E00\u4E2A\u8654\u8BDA\u7684\u4FE1\u5F92\uFF0C\u4E5F\u56E0\u4E3A\u5176\u51FA\u8272\u7684\u6218\u6597\u80FD\u529B\u6210\u4E3A\u6559\u5EF7\u60E9\u6212\u90E8\u961F\u7684\u9996\u5E2D\u5723\u6BBF\u9A91\u58EB\u3002
            \u4F5C\u4E3A\u6559\u5EF7\u7684\u5F62\u8C61\u4E4B\u4E00\uFF0C\u5979\u62E5\u6709\u4E0D\u5C11\u8FFD\u968F\u8005\u4E0E\u5D07\u62DC\u8005\u3002
            \u81EA\u5F81\u8BA8\u5F00\u59CB\uFF0C\u4E00\u80A1\u62B5\u89E6\u7684\u60F3\u6CD5\u5728\u65AF\u5361\u96F7\u7279\u8111\u6D77\u4E2D\u6325\u4E4B\u4E0D\u53BB\u3002\u672A\u66FE\u6000\u7591\u8FC7\u6559\u5EF7\u6555\u4EE4\u7684\u5979\u9677\u5165\u4E86\u8FF7\u832B\u548C\u70E6\u8E81\uFF0C\u6700\u7EC8\u90A3\u4E00\u591C\u8FC7\u540E\uFF0C\u6559\u5EF7\u7684\u60E9\u6212\u90E8\u961F\u71C3\u8D77\u4E86\u5927\u706B\uFF0C\u706B\u52BF\u5982\u540C\u7EA2\u83B2\u822C\u7EDA\u70C2\u7EFD\u653E`,
        },
		
		skill:{
            //圣殿骑士
            shenXuanZhe:{
                trigger:{player:'useCardToTargeted'},
                forced:true,
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event.parent);
                },
                content:function(){
                    player.changeZhiLiao(1);
                },
                group:'shenXuanZhe_yiChu',
                subSkill:{
                    yiChu:{
                        trigger:{player:'zhiLiaoYiChu'},
                        forced:true,
                        priority:-1,
                        content:function(){
                            player.addZhiShiWu('shengYin');
                        }
                    },
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        return num-1;
                    }
                }

            },
            shenWei:{
                trigger:{player:'useCardBefore'},
                priority:1,
                filter:function(event,player){
                    if(event.getParent('phaseUse').shenWei==false) return false;
                    return player.countZhiShiWu('shengYin')>=2&&get.is.zhuDongGongJi(event);
                },
                content:function(){
                    player.removeZhiShiWu('shengYin',2);
                    trigger.canYingZhan=false;
                    if(get.mingGe(trigger.card)=='sheng'){
                        if(typeof trigger.baseDamage!='number') trigger.baseDamage=get.info(trigger.card,false).baseDamage||2;
                        trigger.baseDamage+=1;   
                    }
                    player.addTempSkill('shenWei_zhiLiao');
                    trigger.targets[0].addTempSkill('shenWei_zhiLiao');
                },
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'changeZhiLiaoBefore'},
                        direct:true,
                        filter:function(event,player){
                            return event.num>=0;
                        },
                        content:function(){
                            trigger.cancel();
                        }
                    }
                }
            },
            shengCai:{
                trigger:{player:'useCardBefore'},
                filter:function(event,player){
                    return player.countZhiShiWu('shengYin')>=1&&get.is.zhuDongGongJi(event);
                },
                direct:true,
                content:function(){
                    'step 0'
                    var list=[];
                    var num=player.countZhiShiWu('shengYin');
                    for(var i=1;i<=num;i++){
                        list.push(i);
                    }
                    list.push('cancel2');
                    var next=player.chooseControl(list);
                    next.set('prompt',get.prompt('shengCai'));
                    next.set('prompt2',lib.translate.shengCai_info);
                    next.set('ai',function(){
                        return _status.event.num;
                    });
                    next.set('num',list.length-2)
                    'step 1'
                    if(result.control=='cancel2'){
                        event.finish();
                    }else{
                        player.logSkill(event.name,trigger.targets);
                        player.removeZhiShiWu('shengYin',result.control);
                        trigger.targets[0].damageFaShu(1,player);
                        if(typeof trigger.baseDamage!='number') trigger.baseDamage=get.info(trigger.card,false).baseDamage||2;
                        trigger.baseDamage+=result.control-1;
                    }
                }
            },
            shengYu:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countZhiShiWu('shengYin')>=1;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('圣愈：移除X点【圣印】','hidden');
                        var list=[];
                        var num=player.countZhiShiWu('shengYin');
                        for(var i=1;i<=num;i++){
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
                            filterTarget:function(card,player,target){
                                return target!=player&&target.side==player.side;
                            },
                            content:function(){
                                'step 0'
                                event.links=lib.skill.shengYu_backup.links;
                                player.removeZhiShiWu('shengYin',event.links[0]);
                                target.changeZhiLiao(event.links[0]);
                                'step 1'
                                player.chooseToDiscard(1,true);
                                'step 2'
                                player.storage.gongJi++;
                            },
                            ai:{
                                result:{
                                    target:function(player, target){
                                        return get.zhiLiaoEffect(target,1);
                                    }
                                }
                            }
                        }
                    },
                    prompt:function(links,player){
                        return `目标队友+${links[0]}[治疗]`;
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
            shenZhiZi:{
                forced:true,
                trigger:{player:'addZhiShiWuEnd'},
                filter:function(event,player){
                    return !player.isLinked()&&event.num>0&&event.zhiShiWu=='shengYin';
                },
                content:function(){
                    player.changeZhiLiao(-player.zhiLiao);
                    player.hengZhi();
                    player.storage.shenZhiZi=0;
                },

                filterx:function(event,player){
                    if(!player.isLinked()) return false;
                    if(player.side!=event.side) return false;
                    if(player.side==true){
                        var shiQi=game.hongShiQi;
                    }else{
                        var shiQi=game.lanShiQi;
                    }
                    return shiQi+event.num<1; 
                },
                group:['shenZhiZi_changeShiQiBegin','shenZhiZi_changeShiQi1','shenZhiZi_changeShiQi4','shenZhiZi_huiHekaiShi','shenZhiZi_chongZhiHuiHe','shenZhiZi_chongZhiShangHai'],
                subSkill:{
                    changeShiQiBegin:{
                        trigger:{global:'changeShiQiBegin'},
                        forced:true,
                        filter:function(event,player){
                            return lib.skill.shenZhiZi.filterx(event,player);
                        },
                        content:function(){
                            if(player.side==true){
                                var shiQi=game.hongShiQi;
                            }else{
                                var shiQi=game.lanShiQi;
                            }
                            var num=1-shiQi;
                            trigger.num=num;
                        },
                    },
                    changeShiQi1:{
                        trigger:{global:'changeShiQi1'},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return lib.skill.shenZhiZi.filterx(event,player);
                        },
                        content:function(){
                            if(player.side==true){
                                var shiQi=game.hongShiQi;
                            }else{
                                var shiQi=game.lanShiQi;
                            }
                            var num=1-shiQi;
                            trigger.num=num;
                        }
                    },
                    changeShiQi4:{
                        trigger:{global:'changeShiQi4'},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return lib.skill.shenZhiZi.filterx(event,player);
                        },
                        content:function(){
                            if(player.side==true){
                                var shiQi=game.hongShiQi;
                            }else{
                                var shiQi=game.lanShiQi;
                            }
                            var num=1-shiQi;
                            trigger.num=num;
                        }
                    },
                    huiHekaiShi:{
                        trigger:{player:'phaseBegin'},
                        lastDo:true,
                        direct:true,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            player.storage.shenZhiZi++;
                        }
                    },
                    chongZhiHuiHe:{
                        priority:1,
                        trigger:{player:'phaseEnd'},
                        forced:true,
                        filter:function(event,player){
                            return player.storage.shenZhiZi>=1&&player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            player.chongZhi();
                            'step 1'
                            player.chooseTarget(function(card,player,target){
                                return target.side!=player.side;
                            },true,'对目标对手造成1点法术伤害③')
                            'step 2'
                            game.log(player,'选择了',result.targets[0]);
                            player.line(result.targets[0],'red');
                            result.targets[0].damageFaShu(1,player);
                        }
                    },
                    chongZhiShangHai:{
                        trigger:{player:'damageBegin1'},
                        forced:true,
                        priority:-1,
                        filter:function(event,player){
                            return player.isLinked();
                        },
                        content:function(){
                            'step 0'
                            trigger.cancel();
                            player.damage(1,player).set('faShu',true).set('step',7);
                            'step 1'
                            player.chongZhi();
                        }
                    }
                }
            },
            shenLinShengQi:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    player.removeBiShaShuiJing();
                    player.addZhiShiWu('shengYin',2,4);
                    player.storage.gongJi++;
                    event.getParent('phaseUse').shenWei=false;
                },
                ai:{
                    shuiJing:true,
                    order:function(item,player){
                        return 4;
                    },
                    result:{
                        player:2,
                    }
                }
            },
            shengYanQiFu:{
                trigger:{player:'chongZhiEnd'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseTarget();
                    next.set('prompt',get.prompt('shengYanQiFu'));
                    next.set('prompt2',lib.translate.shengYanQiFu_info);
                    next.set('ai',function(target){
                        if(target.side!=player.side){
                            return -1;
                        }
                        return get.zhiLiaoEffect(target,2);
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,result.targets);
                        player.removeBiShaShuiJing();
                        player.line(result.targets[0],'blue');
                        result.targets[0].changeZhiLiao(2);
                    }
                    
                },
                ai:{
                    shuiJing:true,
                }
            },
            shengYin:{
                intro:{
                    content:'mark',
                    max:2,
                },
                markimage:'image/card/hong.png',
            },

            //圣庭监察士
            kuangXinTu:{
                trigger:{global:"phaseBefore"},
                forced:true,
                filter:function(event,player){
                    return game.phaseNumber==0
                },
                content:function(){
                    player.addSkill('yiDuanCaiJueSuo');
                },
                mod:{
                    maxZhiLiao:function(player,num){
                        var players=game.filterPlayer(function(current){
                            return current.side==player.side&&current!=player&&current.group=='sheng';
                        });
                        if(players.length>0) return num+1;
                    }
                },
                group:'kuangXinTu_zhiLiao',
                subSkill:{
                    zhiLiao:{
                        trigger:{player:'useCardAfter'},
                        filter:function(event,player){
                            return get.is.gongJiXingDong(event);
                        },
                        forced:true,
                        content:function(){
                            'step 0'
                            var next=player.chooseTarget(true,'目标角色+1[治疗]');
                            next.set('ai',function(target){
                                var player=_status.event.player;
                                return get.attitude(player,target);
                            });
                            'step 1'
                            game.log(player,'选择了',result.targets[0]);
                            player.line(result.targets[0],'blue');
                            result.targets[0].changeZhiLiao(1);
                        }
                    }
                }
            },
            caiJueLunDing:{
                trigger:{global:'zhiLiaoYiChu'},
                usable:1,
                firstDo:true,
                filter:function(event,player){
                    return event.player.side==player.side;
                },
                content:function(){
                    var bool=lib.skill.yiDuanCaiJueSuo.addZhiLiao(player,1);
                    if(bool){
                        player.addNengLiang('b');
                    }
                }   
            },
            enDianShenShou:{
                enable:'phaseUse',
                type:'teShu',
                filter:function(event,player){
                    if(event.parent.canTeShu==false) return false;
                    var side=player.side;
                    if(side==true){
                        if(game.hongZhanJi.length==0) return false;
                    }else if(side==false){
                        if(game.lanZhanJi.length==0) return false;
                    }
                    var num=0;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].side!=side) continue;
                        num+=game.players[i].zhiLiao;
                    }
                    if(!(num>=2||player.storage.yiDuanCaiJueSuo>=3)) return false
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
                    var num=0;
                    var side=player.side;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].side!=side) continue;
                        num+=game.players[i].zhiLiao;
                    }
                    if(num>=2&&player.storage.yiDuanCaiJueSuo>=3){
                        var next=player.chooseTarget('是否移除我方角色合计2[治疗]，否则移除【异端裁决所】3[治疗]',[1,2],function(card,player,target){
                            return target.side==player.side&&target.zhiLiao>=1;
                        });
                        next.set('filterOk',function(){
                            var num=0;
                            for(var i=0;i<ui.selected.targets.length;i++){
                                num+=ui.selected.targets[i].zhiLiao;
                            }
                            return num>=2;
                        })
                    }else if(num>=2&&!(player.storage.yiDuanCaiJueSuo>=3)){
                        var next=player.chooseTarget('移除我方角色合计2[治疗]',true,[1,2],function(card,player,target){
                            return target.side==player.side&&target.zhiLiao>=1;
                        });
                        next.set('filterOk',function(){
                            var num=0;
                            for(var i=0;i<ui.selected.targets.length;i++){
                                num+=ui.selected.targets[i].zhiLiao;
                            }
                            return num>=2;
                        })
                    }
                    'step 1'
                    if(result.bool){
                        game.log(player,'选择了',result.targets);
                        player.line(result.targets,'green');
                        if(result.targets.length==1){
                            result.targets[0].changeZhiLiao(-2);
                        }else{
                            result.targets[0].changeZhiLiao(-1);
                            result.targets[1].changeZhiLiao(-1);
                        }
                    }else{
                        lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,3);
                    }
                    'step 2'
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
                        var target=_status.event.target;
                        if(target.hasSkillTag('baoShi')&&!target.hasSkillTag('shuiJing')){
                            if(button.link=='宝石') return 5;
                            else return -1;
                        }
                        if(target.hasSkillTag('shuiJing')&&!target.hasSkillTag('baoShi')){
                            if(button.link=='水晶') return 5;
                            else return 2;
                        }
                        //既有水晶也有宝石
                        return 2;
                    });
                    next.set('target',target);
                    'step 3'
                    for(var i=0;i<result.links.length;i++){
                        if(result.links[i]=='宝石'){
                            target.addMark('_tiLian_r');
                            player.changeZhanJi('r',-1);
                        }else if(result.links[i]=='水晶'){
                            target.addMark('_tiLian_b');
                            player.changeZhanJi('b',-1);
                        }
                    }
                    'step 4'
                    if(player.countCards('h')==0){
                        event.finish();
                    }else{
                        player.chooseToDiscard('h',1,true);
                    }
                    'step 5'
                    if(result.bool){
                        var next=player.chooseCardButton(result.cards,'是否展示,对目标角色造成1点法术伤害③');
                        next.set('filterButton',function(button){
                            return get.mingGe(button)=='sheng';
                        });
                    }else{
                        event.finish();
                    }
                    
                    'step 6'
                    if(result.bool){
                        player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                            return target.side!=player.side;
                        })
                    }else{
                        event.finish();
                    }
                    'step 7'
                    game.log(player,'选择了',result.targets[0]);
                    player.line(result.targets[0],'red');
                    result.targets[0].damageFaShu(1,player);
                },
                ai:{
                    order:3.6,
                    result:{
                        target:function(player,target){
                            if(!(target.hasSkillTag('baoShi')||target.hasSkillTag('shuiJing'))) return -1;
                            var num=target.getNengLiangLimit()-target.countNengLiangAll();
                            if(num>=2) return 2;
                            return 0;
                        },
                    }
                }
            },
            jingHuaZhiShu:{
                trigger:{player:'damageAfter'},
                priority:-1,
                filter:function(event,player){
                    return player.countCards('h')>0;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseToDiscard('h',function(card){
                        return get.type(card)=='faShu';
                    });
                    next.set('prompt',get.prompt('jingHuaZhiShu'));
                    next.set('prompt2',lib.translate.jingHuaZhiShu_info);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.showCards(result.cards);
                        player.changeZhiLiao(1);
                        player.draw(1);
                        event.flag=true;
                    }else{
                        event.finish();
                    }
                    'step 2'
                    if(event.flag){
                        lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,1);
                    }
                }
            },
            biHuLingYu:{
                trigger:{global:'damageBegin1'},
                firstDo:true,
                filter:function(event,player){
                    return player.storage.yiDuanCaiJueSuo>=3&&event.player.side==player.side;
                },
                content:function(){
                    lib.skill.yiDuanCaiJueSuo.removeZhiLiao(player,3);
                    trigger.num--;
                    player.addZhiShiWu('caiJue',1);
                },
            },
            caiJueZhe:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    return player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    player.addZhiShiWu('caiJue',1);
                    lib.skill.yiDuanCaiJueSuo.addZhiLiao(player,2);
                }
            },
            shenShengBianCe:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&player.countZhiShiWu('caiJue')>=1;
                },
                chooseButton:{
                    dialog:function(event,player){
                        var dialog=ui.create.dialog('神圣鞭策：移除X点【裁决】','hidden');
                        var list=[];
                        var num=player.countZhiShiWu('caiJue');
                        for(var i=1;i<=num;i++){
                            list.push(i);
                        }
                        dialog.add([list,'tdnodes']);
                        return dialog;
                    },
                    backup:function(links,player){
                        return{
                            links:links,
                            type:'faShu',
                            selectTarget:links[0],
                            filterTarget:true,
                            contentBefore:function(){
                                event.links=lib.skill.shenShengBianCe_backup.links;
                                player.removeBiShaShuiJing();
                                player.removeZhiShiWu('caiJue',event.links[0]);
                            }, 
                            content:function(){
                                target.draw();

                            },
                            contentAfter:function(){
                                event.links=lib.skill.shenShengBianCe_backup.links;
                                player.chooseToDiscard(true,'h',event.links[0])
                            },
                            ai:{
                                result:{
                                    target:-1,
                                }
                            }
                        }
                    },
                    prompt:function(links,player){
                        return `${links[0]}名目标角色各摸1张牌[强制]`;
                    },
                    check: function (button) {
                        return button.link;
                    },
                },
                ai:{
                    order:function(item,player){
                        return 2.3+player.countZhiShiWu('caiJue');
                    },
                    result:{
                        player:1,
                    }
                }
            },
            yiDuanCaiJueSuo:{
                init:function(player){
                    player.storage.yiDuanCaiJueSuo=0;
                },
                intro:{
                    content:'共有#个[治疗]',
                    max:4,
                },
                mark:true,
                markimage:'image/card/yiDuanCaiJueSuo.png',
                addZhiLiao:function(player,num){
                    var current=player.storage.yiDuanCaiJueSuo;
                    var max=4;
                    if(current>=max){
                        return false;
                    }else if(current+num>max){
                        num=max-current;
                    }
                    player.storage.yiDuanCaiJueSuo+=num;
                    game.log('【异端裁决所】','增加'+num,'[治疗]');
                    player.updateMarks('yiDuanCaiJueSuo');
                    return true;
                },
                removeZhiLiao:function(player,num){
                    var current=player.storage.yiDuanCaiJueSuo;
                    if(current<=0){
                        return false
                    }else if(current-num<0){
                        num=current;
                    }
                    player.storage.yiDuanCaiJueSuo-=num;
                    game.log('【异端裁决所】','减少'+num,'[治疗]');
                    player.updateMarks('yiDuanCaiJueSuo');
                    return true;
                }
            },
            caiJue:{
                intro:{
                    content:'mark',
                    max:3,
                },
                markimage:'image/card/hong.png',
            },

            //战斗法师
            fuWenZhiHuan:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                usable:1,
                filter:function(event,player){
                    return player.countTongXiPai()>=2;
                },
                selectCard:2,
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
                prepare:'showCards',
                content:function(){
                    'step 0'
                    player.draw(1);
                    'step 1'
                    for(var i=0;i<cards.length;i++){
                        if(get.mingGe(cards[i])=='yong'||get.type(cards[i])=='faShu'){
                            event.flag=true;
                            break;
                        }
                    }
                    if(event.flag){
                        player.storage.gongJi++;
                    }
                },
                ai:{
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            fuMoDaJi:{
                trigger:{global:'phaseBefore'},
                direct:true,
                priority:-1,
                content:function(){
                    player.storage.fuMoDaJi=0;
                },
                group:['fuMoDaJi_mingZhong','fuMoDaJi_weiMingZhong'],
                subSkill:{
                    mingZhong:{
                        trigger:{player:'useCardToTargeted'},
                        filter:function(event,player){
                            return get.is.zhuDongGongJi(event.parent)&&player.storage.fuMoDaJi==0;
                        },
                        content:function(){
                            player.storage.faShu++;
                            player.storage.fuMoDaJi++;
                        }
                    },
                    weiMingZhong:{
                        trigger:{source:'gongJiWeiMingZhong'},
                        filter:function(event,player){
                            return !event.yingZhan&&get.mingGe(event.source_card)=='yong'&&player.storage.fuMoDaJi==0;
                        },
                        content:function(){
                            player.storage.faShu++;
                            player.storage.fuMoDaJi++;
                        }
                    }
                }
            },
            shangBian:{
                trigger:{player:['chooseToUseEnd','gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    if(event.result.bool!=true) return false;
                    if(player.side){
                        var bool=game.hongZhanJi.includes('宝石');
                    }else{
                        var bool=game.lanZhanJi.includes('宝石');
                    }
                    var players=game.filterPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.countNengLiangAll()>0;
                    });
                    return player.storage.shangBian==3&&(bool||players.length>0);
                },
                content:function(){
                    'step 0'
                    if(player.side){
                        var bool=game.hongZhanJi.includes('宝石');
                    }else{
                        var bool=game.lanZhanJi.includes('宝石');
                    }
                    var players=game.filterPlayer(function(current){
                        return current.side==player.side&&current!=player&&current.countNengLiangAll()>0;
                    });
                    if(bool&&players.length>0){
                        var next=player.chooseTarget('是否消耗队友【能量区】1【能量】,否者消耗我方【战绩区】1[宝石]',function(card,player,target){
                            return target.side==player.side&&target!=player&&target.countNengLiangAll()>0;
                        });
                    }else if(!bool&&players.length>0){
                        var next=player.chooseTarget('消耗队友【能量区】1【能量】',true,function(card,player,target){
                            return target.side==player.side&&target!=player&&target.countNengLiangAll()>0;
                        });
                    }
                    'step 1'
                    if(result.bool){
                        game.log(player,'选择了',result.targets);
                        player.line(result.targets,'green');
                        var target=result.targets[0];
                        event.target=target;
                        if(target.countNengLiang('r')>0&&target.countNengLiang('b')>0){
                            var list=['宝石','水晶'];
                            var next=player.chooseControl(list);
                            next.set('prompt','选择消耗的能量');
                            next.set('ai',function(control){
                                return 1;
                            });
                        }else if(target.countNengLiang('r')>0){
                            event.target.removeNengLiang('r',1);
                            event.goto(3);
                        }else if(target.countNengLiang('b')>0){
                            event.target.removeNengLiang('b',1);
                            event.goto(3);
                        }
                    }else{
                        player.removeZhanJi('r',1);
                        event.goto(3);
                    }
                    'step 2'
                    if(result.control=='宝石'){
                        event.target.removeNengLiang('r',1);
                    }else{
                        event.target.removeNengLiang('b',1);
                    }
                    'step 3'
                    var next=player.chooseTarget(2,'对2名目标对手各造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 4'
                    event.targets=result.targets.sortBySeat(player);
                    game.log(player,'选择了',event.targets);
                    player.line(event.targets,'red');
                    'step 5'
                    var target=event.targets.shift();
                    target.damageFaShu(1,player);

                    if(event.targets.length){
                        event.redo();
                    }
                },
                group:['shangBian_jiShu','shangBian_chongZhi'],
                subSkill:{
                    jiShu:{
                        priority:1,
                        trigger:{player:['chooseToUseEnd','gongJiEnd','faShuEnd']},
                        filter:function(event,player){
                            return event.result.bool==true;
                        },
                        direct:true,
                        content:function(){
                            player.storage.shangBian++;
                        }
                    },
                    chongZhi:{
                        trigger:{player:'phaseBefore'},
                        direct:true,
                        priority:-2,
                        content:function(){
                            player.storage.shangBian=0;
                        }
                    }
                }
            },
            moLiShangZeng:{
                trigger:{player:['chooseToUseEnd','gongJiEnd','faShuEnd']},
                filter:function(event,player){
                    return event.result.bool==true&&event.type!='phase'&&player.canBiShaShuiJing();
                },
                content:function(){
                    'step 0'
                    player.removeBiShaShuiJing();
                    'step 1'
                    player.chooseTarget('对目标对手造成1点法术伤害③',true,function(card,player,target){
                        return target.side!=player.side;
                    });
                    'step 2'
                    game.log(player,'选择了',result.targets);
                    player.line(result.targets,'red');
                    result.targets[0].damageFaShu(1,player);
                },
                ai:{
                    shuiJing:true,
                }
            },

            //星坠巫女
            mingDingZhiLi:{
                trigger:{global:'phaseBefore'},
                filter:function(event,player){
                    return game.phaseNumber==0;
                },
                forced:true,
                content:function(){
                    player.addZhiShiWu('fanXing');
                },
                mod:{
                    maxHandcardFinal:function(player,num){
                        var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                        return game.handcardLimit+1-x;
                    }
                },
                group:'mingDingZhiLi_addLvFa',
                subSkill:{
                    addLvFa:{
                        trigger:{player:'addZhiShiWuEnd'},
                        direct:true,
                        content:function(){
                            player.qiPai();
                        }
                    }
                }
            },
            xingHuan:{
                type:'faShu',
                usable:1,
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.countCards('h',card=>get.xiBie(card)=='di');
                },
                selectCard:[1,Infinity],
                filterCard:function(card){
                    return get.xiBie(card)=='di';
                },
                prepare:'showCards',
                selectTarget:function(){
                    return ui.selected.cards.length-1;
                },
                filterTarget:true,
                content:function(){
                    'step 0'
                    if(target){
                        target.changeZhiLiao(1);
                        target.draw();
                    }
                },
                contentAfter:function(){
                    player.changeZhiLiao(1);
                    player.draw();
                    player.storage.faShu++;
                },
                ai:{
                    order:function(item,player){
                        return 1+player.countCards('h');
                    },
                    result:{
                        target:1,
                    }
                }
            },
            xingKe:{
                trigger:{player:['useCardAfter','useSkillAfter']},
                filter:function(event,player){
                    return get.is.zhuDongGongJi(event)||get.is.faShuXingDong(event);
                },
                content:function(){
                    var cards=get.cards();
                    player.addToExpansion('draw',cards).gaintag.add('luEn');
                }
            },
            qunXingQiShi:{
                type:'qiDong',
                trigger:{player:'phaseUseBegin'},
                filter:function(event,player){
                    var bool1,bool2;
                    var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                    if(x<3&&player.countCards('h')>0) bool1=true;
                    else bool1=false;

                    if(player.getExpansions('luEn').length>0) bool2=true;
                    else bool2=false;

                    return bool1||bool2;
                },
                content:function(){
                    'step 0'
                    var bool1,bool2;
                    var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                    if(x<3&&player.countCards('h')>0) bool1=true;
                    else bool1=false;

                    if(player.getExpansions('luEn').length>0) bool2=true;
                    else bool2=false;

                    var list=[];
                    if(bool1) list.push('选项一');
                    if(bool2) list.push('选项二');
                    var choiceList=["<span class='tiaoJian'>(将1张手牌面朝下放置在你角色旁，作为【卢恩】。选择1个【律法】放置于你面前)</span>你摸0-1张牌。","<span class='tiaoJian'>(移除X个【卢恩】[展示])</span>发动任意符合条件的【律法】，然后移除1个【律法】。"];

                    player.chooseControl(list).set('prompt','选择以下一项发动').set('choiceList',choiceList);
                    'step 1'
                    if(result.control=='选项一'){
                        event.goto(2)
                    }else{
                        event.goto(6);
                    }

                    'step 2'
                    player.chooseCard('h',true,'将1张手牌面朝下放置在你角色旁，作为【卢恩】');
                    'step 3'
                    player.addToExpansion('draw',result.cards).gaintag.add('luEn');
                    var list=[];
                    if(!player.hasZhiShiWu('fanXing')) list.push('繁星');
                    if(!player.hasZhiShiWu('yingYue')) list.push('影月');
                    if(!player.hasZhiShiWu('shiRi')) list.push('蚀日');
                    player.chooseControl(list).set('prompt','选择1个【律法】放置于你面前');
                    'step 4'
                    switch(result.control){
                        case '繁星':
                            player.addZhiShiWu('fanXing');
                            break;
                        case '影月':
                            player.addZhiShiWu('yingYue');
                            break;
                        case '蚀日':
                            player.addZhiShiWu('shiRi');
                            break;
                    }
                    var list=[0,1];
                    player.chooseControl(list).set('prompt','摸0-1张牌').set('ai',function(){
                        var player=_status.event.player;
                        if(player.countCards('h')<4) return 0;
                        else return 1;
                    });
                    'step 5'
                    if(result.control==1){
                        player.draw();
                    }
                    event.finish();

                    'step 6'
                    var cards=player.getExpansions('luEn');
                    player.chooseCardButton(cards,true,[1,Infinity],'移除X张【卢恩】');
                    'step 7'
                    player.discard(result.links,'luEn');
                    player.showGaiPai(result.links);
                    event.cards=result.links;
                    event.trigger('yiChuLuEn')
                    'step 8'
                    var list=[];
                    if(player.hasZhiShiWu('fanXing')) list.push('繁星');
                    if(player.hasZhiShiWu('yingYue')) list.push('影月');
                    if(player.hasZhiShiWu('shiRi')) list.push('蚀日');
                    if(list.length>0){
                        player.chooseControl(list).set('prompt','选择1个【律法】移除');
                    }else{
                        event.finish();
                    }
                    'step 9'
                    switch(result.control){
                        case '繁星':
                            player.removeZhiShiWu('fanXing');
                            break;
                        case '影月':
                            player.removeZhiShiWu('yingYue');
                            break;
                        case '蚀日':
                            player.removeZhiShiWu('shiRi');
                            break;
                    }
                    event.finish();
                }
            },
            huangJinLv:{
                trigger:{player:'qunXingQiShiAfter'},
                filter:function(event,player){
                    return player.countCards('h')<2;
                },
                content:function(){
                    'step 0'
                    player.draw(1);
                    'step 1'
                    var cards = player.getExpansions("luEn");
                    if(cards.length>0){
                        var next = player.chooseToMove("黄金律：是否交换【卢恩】和手牌");
                        next.set("list", [
                            ["卢恩", cards],
                            ["手牌", player.getCards("h")],
                        ]);
                        next.set("filterMove", function (from, to, moved) {
                            if (typeof to == "number") return false;
                            var player = _status.event.player;
                            var hs = player.getCards("h");
                            var changed = hs.filter(function (card) {
                                return !moved[1].includes(card);
                            });
                            var changed2 = moved[1].filter(function (card) {
                                return !hs.includes(card);
                            });
                            if (changed.length < 1) return true;
                            var pos1 = moved[0].includes(from.link) ? 0 : 1,
                                pos2 = moved[0].includes(to.link) ? 0 : 1;
                            if (pos1 == pos2) return true;
                            if (pos1 == 0) {
                                if (changed.includes(from.link)) return true;
                                return changed2.includes(to.link);
                            }
                            if (changed2.includes(from.link)) return true;
                            return changed.includes(to.link);
                        });
                    }else{
                        event.finish();
                    }
                    "step 2";
                    if (result.bool) {
                        var pushs = result.moved[0],
                            gains = result.moved[1];
                        pushs.removeArray(player.getExpansions("luEn"));
                        gains.removeArray(player.getCards("h"));
                        if (!pushs.length || pushs.length != gains.length) return;
                        player.gain(gains, "draw");
                        player.addToExpansion(pushs, player, "giveAuto").gaintag.add("luEn");
			        }
                }
            },
            fanXing:{
                intro:{
                    name:'律法：繁星',
                    content:"<span class='tiaoJian'>(当移除的【卢恩】包含4个不同系别或4个不同命格)</span>对所有对手各造成1点法术伤害③；<span class='tiaoJian'>(若移除的【卢恩】包含4个不同系别与4个不同命格)</span>目标队友额外+1[宝石]。",
                    nocount:true,
                },
                markimage:'image/card/fanXing.png',
                trigger:{player:'yiChuLuEn'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('fanXing')) return false;
                    
                    var cards=event.cards;
                    var xiBie=[],mingGe=[];
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(!xiBie.contains(get.xiBie(card))) xiBie.push(get.xiBie(card));
                        if(!mingGe.contains(get.mingGe(card))) mingGe.push(get.mingGe(card));
                    }

                    return xiBie.length>=4||mingGe.length>=4;
                },
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var xiBie=[],mingGe=[];
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(!xiBie.contains(get.xiBie(card))) xiBie.push(get.xiBie(card));
                        if(!mingGe.contains(get.mingGe(card))) mingGe.push(get.mingGe(card));
                    }

                    if(xiBie.length>=4&&mingGe.length>=4) event.flag=true;

                    event.targets=game.filterPlayer(function(current){
                        return current.side!=player.side;
                    });
                    'step 1'
                    var target=event.targets.shift();
                    target.damageFaShu(1,player);
                    if(event.targets.length>0){
                        event.redo();
                    }
                    'step 2'
                    if(event.flag){
                        player.chooseTarget('目标队友额外+1[宝石]',true,function(card,player,target){
                            return target.side==player.side&&target!=player;
                        }).set('ai',function(target){
                            var num=target.getNengLiangLimit()-target.countNengLiangAll();
                            return num;
                        });
                    }else{
                        event.finish();
                    }
                    'step 3'
                    game.log(player,'选择了',result.targets);
                    player.line(result.targets,'green');
                    result.targets[0].addNengLiang('r',1);
                }
            },
            yingYue:{
                intro:{
                    name:'律法：影月',
                    content:"<span class='tiaoJian'>(当移除的【卢恩】包含X对相同系别的【卢恩】，X>1)</span>对目标角色造成X点法术伤害③。<span class='tiaoJian'>(当移除的【卢恩】包含X对相同命格的【卢恩】，X>1)</span>任意分配X点[治疗]给1~2位我方角色。",
                    nocount:true,
                },
                markimage:'image/card/yingYue.png',
                trigger:{player:'yiChuLuEn'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('yingYue')) return false;

                    var cards=event.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    var xiBie_num=0;
                    var mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=2){
                            xiBie_num+=(xiBie[i]/2) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=2){
                            mingGe_num+=(mingGe[i]/2) >> 0;
                        }
                    }
                    return xiBie_num>1||mingGe_num>1;
                },
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    event.xiBie_num=0;
                    event.mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=2){
                            event.xiBie_num+=(xiBie[i]/2) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=2){
                            event.mingGe_num+=(mingGe[i]/2) >> 0;
                        }
                    }

                    'step 1'
                    if(event.xiBie_num>1){
                        var next=player.chooseTarget(`对目标角色造成${event.xiBie_num}点法术伤害③`,true);
                        next.set('ai',function(target){
                            var player=_status.event.player;
                            return -get.attitude(player,target);
                        });
                    }
                    'step 2'
                    if(event.xiBie_num>1){
                        game.log(player,'选择了',result.targets);
                        player.line(result.targets,'red');
                        result.targets[0].damageFaShu(event.xiBie_num,player);
                    }

                    'step 3'
                    if(event.mingGe_num>1){//分配[治疗]
                        var next=player.chooseTarget([1,2],`任意分配${event.mingGe_num}点[治疗]给1~2位我方角色`,true,function(card,player,target){
                            return target.side==player.side;
                        });
                        next.set('ai',function(target){
                            return get.zhiLiaoEffect(target);
                        });
                    }else{
                        event.finish();
                    }
                    'step 4'
                    result.targets.sortBySeat(player);
                    game.log(player,'选择了',result.targets);
                    player.line(result.targets,'blue');
                    if(result.targets.length==1){
                        result.targets[0].changeZhiLiao(event.mingGe_num);
                        event.finish();
                    }else{
                        if(event.mingGe_num==2){
                            result.targets[0].changeZhiLiao(1);
                            result.targets[1].changeZhiLiao(1);
                            event.finish();
                        }else{//治疗数>2 后面需要选择分配
                            event.targets=result.targets;
                        }
                    }
                    'step 5'
                    var list=[];
                    for(var i=1;i<=event.mingGe_num-1;i++){
                        list.push(i);
                    }
                    var name=get.translation(event.targets[0]);
                    var str=name+'获得几点[治疗]';
                    player.chooseControl(list).set('prompt',str);
                    'step 6'
                    event.targets[0].changeZhiLiao(result.control);
                    event.mingGe_num-=result.control;
                    'step 7'
                    event.targets[1].changeZhiLiao(event.mingGe_num);
                }
            },
            shiRi:{
                intro:{
                    name:'律法：蚀日',
                    content:"<span class='tiaoJian'>(当移除的【卢恩】包含每3个相同系别的【卢恩】)</span>你+1[宝石]。<span class='tiaoJian'>(当移除的【卢恩】包含每3个相同命格的【卢恩】)</span>我方【战绩区】+1[宝石]。",
                    nocount:true,
                },
                markimage:'image/card/shiRi.png',
                trigger:{player:'yiChuLuEn'},
                filter:function(event,player){
                    if(!player.hasZhiShiWu('shiRi')) return false;

                    var cards=event.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    var xiBie_num=0;
                    var mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=3){
                            xiBie_num+=(xiBie[i]/3) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=3){
                            mingGe_num+=(mingGe[i]/3) >> 0;
                        }
                    }
                    return xiBie_num>0||mingGe_num>0;
                },
                content:function(){
                    'step 0'
                    var cards=trigger.cards;
                    var xiBie={};
                    var mingGe={};
                    for(var i=0;i<cards.length;i++){
                        var card=cards[i];
                        if(xiBie[get.xiBie(card)]) xiBie[get.xiBie(card)]++;
                        else xiBie[get.xiBie(card)]=1;
                        if(mingGe[get.mingGe(card)]) mingGe[get.mingGe(card)]++;
                        else mingGe[get.mingGe(card)]=1;
                    }
                    event.xiBie_num=0;
                    event.mingGe_num=0;
                    for(var i in xiBie){
                        if(xiBie[i]>=3){
                            event.xiBie_num+=(xiBie[i]/3) >> 0;
                        }
                    }
                    for(var i in mingGe){
                        if(mingGe[i]>=3){
                            event.mingGe_num+=(mingGe[i]/3) >> 0;
                        }
                    }
                    'step 1'
                    if(event.xiBie_num>0) player.addNengLiang('r',event.xiBie_num);
                    if(event.mingGe_num>0) player.addZhanJi('r',event.mingGe_num);
                }
            },
            chuangKeLvDong:{
                type:'faShu',
                enable:['chooseToUse','faShu'],
                filter:function(event,player){
                    return player.canBiShaBaoShi();
                },
                content:function(){
                    'step 0'
                    player.storage.chuangKeLvDong=true;
                    player.removeBiShaBaoShi();
                    'step 1'
                    var list=[0,1];
                    player.chooseControl(list).set('prompt','无视你的手牌上限摸0-1张牌').set('ai',function(){return 1;});
                    'step 2'
                    if(result.control==1) player.draw(1);
                    'step 3'
                    var x=player.countZhiShiWu('fanXing')+player.countZhiShiWu('yingYue')+player.countZhiShiWu('shiRi');
                    player.chooseCard('h',true,`将最多${x+1}张手牌面朝下放置在你角色旁，作为【卢恩】`,[0,x+1]);
                    'step 4'
                    player.addToExpansion('draw',result.cards).gaintag.add('luEn');
                    player.storage.chuangKeLvDong=false;
                    'step 5'
                    player.qiPai();
                },
                mod:{
                    maxHandcardWuShi:function(player,num){
                        if(player.storage.chuangKeLvDong) return 99;
                    }
                },
                ai:{
                    baoShi:true,
                    order:3.8,
                    result:{
                        player:1,
                    }
                }
            },
            luEn:{
                intro:{
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('luEn');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
                direct:true,
                trigger:{player:'addToExpansionEnd'},
                filter:function(event,player){
                    return player.getExpansions('luEn').length>6;
                },
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('luEn');
                    var next=player.chooseCardButton(cards,true,cards.length-6,`舍弃${cards.length-6}张【卢恩】`);
                    'step 1'
                    player.discard(result.links);
                }
            },

            //猎巫人
            zhuanHuan:{
                enable:['chooseToUse','gongJi','chooseToUse_yingZhan'],
                filter:function(event,player){
                    if(event.name=='chooseToUse_yingZhan'&&(event.canYingZhan==false||get.xiBie(event.trigger_card)=='an')) return false;

                    if(event.name=='chooseToUse_yingZhan'){
                        var cards=player.getCards();
                        for(var i=0;i<cards.length;i++){
                            var card=cards[i];
                            if(card.name!='shengGuang'&&get.type(card)=='faShu'){
                                if(get.xiBie(card)==get.xiBie(event.trigger_card)) return true;
                            }
                        }
                        return false;
                    }

                    return player.countCards('h',function(card){
                        return card.name!='shengGuang'&&get.type(card)=='faShu';
                    });
                },
                filterCard:function(card,player,event){
                    return card.name!='shengGuang'&&get.type(card)=='faShu';
                },
                position:'h',
                viewAs:function(cards,player){
                    var xiBie=get.xiBie(cards[0]);
                    var name;
                    switch(xiBie){
                        case 'shui':
                            name='shuiLianZhan';
                            break;
                        case 'huo':
                            name='huoYanZhan';
                            break;
                        case 'feng':
                            name='fengShenZhan';
                            break;
                        case 'lei':
                            name='leiGuangZhan';
                            break;
                        case 'di':
                            name='diLieZhan';
                            break;
                    }

					return {name:name,xiBie:xiBie}
				},
                ai:{
                    order:3.5,
                    result:{
                        player:1,
                    }
                }
            },
            shouMoCi:{
                trigger:{player:'useCard'},
                filter:function(event,player){
                    var num=player.getExpansions('moLiPing').length;
                    if(num>=4) return false;

                    return get.is.zhuDongGongJi(event)&&event.targets[0].countCards('h')<4&&event.targets[0].countCards('h')>0;
                },
                content:function(){
                    'step 0'
                    trigger.targets[0].chooseToDiscard(true);
                    'step 1'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('moLiPing');
                }
            },
            faShuBoLi:{
                trigger:{player:'useCardToTargeted'},
                filter:function(event,player){
                    var num=player.getExpansions('moLiPing').length;
                    if(num>=4) return false;

                    return get.is.zhuDongGongJi(event.parent);
                },
                direct:true,
                content:function(){
                    'step 0'
                    var next=player.chooseTarget();
                    next.set('prompt',get.prompt('faShuBoLi'));
                    next.set('prompt2',lib.translate.faShuBoLi_info);
                    next.set('ai',function(target){
                        var player=_status.event.player;
                        if(target.countCards('h')<=0) return -1;
                        return -get.attitude(player,target);
                    });
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name,result.targets);
                        player.line(result.targets,'green');
                        var target=result.targets[0];
                        if(target.countCards('h')>0){
                            target.chooseToDiscard('h',true);
                        }else{
                            event.finish();
                        }
                    }else{
                        event.finish();
                    }
                    'step 2'
                    player.addToExpansion('draw',result.cards,'log').gaintag.add('moLiPing');
                }
            },
            guanYinDuRen:{
                trigger:{source:'jiangYaoChengShou2'},
                filter:function(event,player){
                    return player.getExpansions('moLiPing').length>=1;
                },
                direct:true,
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('moLiPing');
                    var next=player.chooseCardButton(cards,`是否发动【灌银毒刃】，移除1个【魔力瓶】`);
                    'step 1'
                    if(result.bool){
                        player.logSkill(event.name);
                        player.discard(result.links,'moLiPing');
                        trigger.num--;
                        game.log(trigger.player,'获得了',result.links.length,'张牌');
                        trigger.player.gain(result.links,'draw');
                        player.changeZhiLiao(1);
                    }else{
                        event.finish();
                    }
                }
            },
            touXi:{
                usable:1,
                trigger:{player:'useCardEnd'},
                filter:function(event,player){
                    return player.canBiShaShuiJing()&&get.is.gongJiXingDong(event)&&player.getExpansions('moLiPing').length>=2;
                },
                content:function(){
                    'step 0'
                    var cards=player.getExpansions('moLiPing');
                    var next=player.chooseCardButton(cards,2,`是否发动【偷袭】，移除2个【魔力瓶】`);
                    'step 1'
                    if(result.bool){
                        player.logSkill('touXi');
                        player.removeBiShaShuiJing();
                        player.discard(result.links,'moLiPing');
                        player.showGaiPai(result.links);
                        event.cards=result.links;
                    }else{
                        event.finish();
                    }

                    'step 2'
                    event.faShu=0;
                    event.gongJi=0;
                    event.tongXi=false;

                    for(var i=0;i<event.cards.length;i++){
                        var card=event.cards[i];
                        if(get.type(card)=='faShu'){
                            event.faShu++;
                        }else if(get.type(card)=='gongJi'){
                            event.gongJi++;
                        }
                    }
                    if(get.xiBie(event.cards[0])==get.xiBie(event.cards[1])) event.tongXi=true;

                    'step 3'
                    if(event.faShu>=1){
                        player.chooseTarget(`对${event.faShu}个目标对手造成1点法术伤害③`,true,event.faShu,function(card,player,target){
                            return target.side!=player.side;
                        }).set('ai',function(target){
                            return get.damageEffect(target,1);
                        });
                    }else{
                        event.goto(6);
                    }
                    'step 4'
                    game.log(player,'选择了',result.targets);
                    player.line(result.targets,'red');
                    event.targets=result.targets;
                    'step 5'
                    var target=event.targets.shift();
                    target.damageFaShu(1,player);
                    if(event.targets.length>0) event.redo();

                    'step 6'
                    if(event.gongJi>=2) player.storage.gongJi++;
                    
                    'step 7'
                    if(event.tongXi){
                        player.chooseTarget(`对目标角色造成1点法术伤害③`,true).set('ai',function(target){
                            var player=_status.event.player;
                            if(target.side==player.side) return -1;
                            return get.damageEffect(target,1);
                        });
                    }else{
                        event.finish();
                    }
                    'step 8'
                    game.log(player,'选择了',result.targets);
                    player.line(result.targets,'red');
                    result.targets[0].damageFaShu(1,player);
                },
                ai:{
                    shuiJing:true,
                }
            },
            moLiPing:{
                intro:{
                    markcount:'expansion',
                    mark:function(dialog,storage,player){
						var cards=player.getExpansions('moLiPing');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+cards.length+'张牌';
					},
                },
            },

        },
		
		translate:{
            zhanDouFaShi:"战斗法师",
            xingZhuiNvWu:"星坠女巫",
            shengTingJianChaShi:"圣庭检察士",
            lieWuRen:"猎巫人",
            shengDianQiShi:"圣殿骑士",


            //圣殿骑士
            shenXuanZhe:"[被动]神选者",
            shenWei:"[响应]神威",
            shengCai:"[响应]圣裁",
            shengYu:"[法术]圣愈",
            shengYu_backup:"圣愈",
            shenZhiZi:"[被动]神之子",
            shenLinShengQi:"[法术]神临圣启",
            shengYanQiFu:"[响应]圣炎祈愿",
            shengYin:'圣印',
            shenXuanZhe_info:"你的[治疗]上限-1。 <span class='tiaoJian'>(主动攻击命中后②)</span>你+1[治疗]。 <span class='tiaoJian'>(当你获得[治疗]并溢出时)</span>你+1【圣印】。",
            shenWei_info:"<span class='tiaoJian'>(主动攻击前①，移除2点【圣印】)</span>本次攻击对手无法应战；<span class='tiaoJian'>(若攻击牌为圣类命格)</span>本次攻击伤害额外+1。本回合你与攻击目标无法获得[治疗]。",
            shengCai_info:"<span class='tiaoJian'>(主动攻击前①，移除X点【圣印】)</span>对攻击目标造成1点法术伤害③。本次攻击伤害额外+(X-1)。",
            shengYu_info:"<span class='tiaoJian'>(移除X点【圣印】)</span>目标队友+X[治疗]，你弃1张牌，额外+1[攻击行动]。",
            shenZhiZi_info:"<span class='tiaoJian'>(当你【圣印】增加时)</span>[横置]移除你的所有[治疗]，持续到你的下个回合结束时，你都处于【圣炎形态】，此形态下我方士气最少为1[强制]。 【神之子】的效果结束时[重置]，脱离【圣炎形态】，然后对目标对手造成1点法术伤害③。 <span class='tiaoJian'>(当【圣炎形态】下你受到伤害时③)</span>抵御本次伤害，改为承受1点来自自身的法术伤害⑥，然后[重置]脱离【圣炎形态】。",
            shenLinShengQi_info:"[水晶]无视你的【圣印】上限为你+2【圣印】，但你的【圣印】最高为4，额外+1[攻击行动]；本回合你不能发动[神威]。",
            shengYanQiFu_info:"[水晶]<span class='tiaoJian'>([重置]脱离【圣炎形态】时)</span>目标角色+2[治疗]。",
            shengYin_info:'【圣印】为圣殿骑士专有指示物，上限为2。',
            
            //圣庭监察士
            kuangXinTu:"[被动]狂信徒",
            caiJueLunDing:"[响应]裁决论定[回合限定]",
            enDianShenShou:"[响应]恩典神授",
            jingHuaZhiShu:"[响应]净化之术",
            biHuLingYu:"(专)[响应]庇护领域",
            caiJueZhe:"[启动]裁决者",
            shenShengBianCe:"[法术]神圣鞭策",
            shenShengBianCe_backup:"[法术]神圣鞭策",
            yiDuanCaiJueSuo:"异端裁决所",
            caiJue:"裁决",

            kuangXinTu_info:"游戏初始时你拥有【异端裁决所】。 <span class='tiaoJian'>(我方队友存在圣类命格时)</span>你的[治疗]上限+1。 <span class='tiaoJian'>(你的[攻击行动]结束后)</span>目标角色+1[治疗]。",
            caiJueLunDing_info:"<span class='tiaoJian'>(我方目标角色[治疗]溢出时)</span>【异端裁决所】+1[治疗]；<span class='tiaoJian'>(若因此【异端裁决所】[治疗]增加)</span>你+1[水晶]。",
            enDianShenShou_info:"<span class='tiaoJian'>(你执行[提炼]时，移除我方角色合计2[治疗]或【异端裁决所】3[治疗])</span>将提炼出的[宝石]和[水晶]全部交给目标队友，你弃1张牌；<span class='tiaoJian'>(若该弃牌为圣类命格，可展示之[展示])</span>对目标对手造成1点法术伤害③。",
            jingHuaZhiShu_info:"<span class='tiaoJian'>(你承受伤害⑥并结算完成后，弃1张法术牌[展示])</span>你+1[治疗]，摸1张牌[强制]，然后移除【异端裁决所】上1[治疗]。",
            biHuLingYu_info:"<span class='tiaoJian'>(我方目标角色受到伤害时③，移除【异端裁决所】3[治疗])</span>本次伤害-1，你+1【裁决】。",
            caiJueZhe_info:"[水晶]你+1【裁决】，【异端裁决所】+2[治疗]。",
            shenShengBianCe_info:"[水晶]<span class='tiaoJian'>(移除X点【裁决】)</span>X名目标角色各摸1张牌[强制]，你弃X张牌。",
            yiDuanCaiJueSuo_info:"【异端裁决所】的[治疗]上限为4。",
            caiJue_info:"【裁决】为圣庭监察士专有指示物，上限为3。",

            //战斗法师
            fuWenZhiHuan:"[法术]符文置换[回合限定]",
            fuWenZhiHuan_info:"<span class='tiaoJian'>(弃2张同系牌[展示])</span>摸1张牌[强制]；<span class='tiaoJian'>(若弃牌包含咏类命格或法术牌)</span>额外+1[攻击行动]。",
            fuMoDaJi:"[响应]附魔打击[回合限定]",
            fuMoDaJi_info:"<span class='tiaoJian'>(主动攻击命中时②)</span>额外+1[法术行动]。 <span class='tiaoJian'>(主动攻击未命中②且攻击牌为咏类命格)</span>额外+1[法术行动]。",
            shangBian:"[响应]熵变",
            shangBian_info:"<span class='tiaoJian'>(本回合第三次行动结束时，消耗我方【战绩区】1[宝石]或队友【能量区】1【能量】)</span>对2名目标对手各造成1点法术伤害③。",
            moLiShangZeng:"[响应]魔力熵增",
            moLiShangZeng_info:"[水晶]<span class='tiaoJian'>(每次额外行动结束时)</span>对目标对手造成1点法术伤害③。",
            
            //星坠巫女
            mingDingZhiLi:"[被动]命定之理",
            mingDingZhiLi_info:"你手牌上限+(1-X)[恒定]，X为你拥有的【律法】数。游戏初始时你拥有【律法：繁星】。",
            xingHuan:"[法术]星环[回合限定]",
            xingHuan_info:"<span class='tiaoJian'>(弃X张地系牌[展示])</span>指定(X-1)名角色与你各+1[治疗]并各摸1张牌[强制]，你+1[法术行动]。",
            xingKe:"[响应]星刻",
            xingKe_info:"<span class='tiaoJian'>([攻击行动]或[法术行动]结束后)</span>将牌库顶1张牌面朝下放置在你角色旁，作为【卢恩】。",
            qunXingQiShi:"[启动]群星启示",
            qunXingQiShi_info:"你选择以下一项发动:<br>·<span class='tiaoJian'>(将1张手牌面朝下放置在你角色旁，作为【卢恩】。选择1个【律法】放置于你面前)</span>你摸0-1张牌。<br>·<span class='tiaoJian'>(移除X个【卢恩】[展示])</span>发动任意符合条件的【律法】，然后移除1个【律法】。",
            huangJinLv:"[响应]黄金律",
            huangJinLv_info:"<span class='tiaoJian'>(当【群星启示】发动后，你的手牌数<2时)</span>摸1张牌[强制]，并可将1张手牌与1个【卢恩】交换。",
            fanXing:"(专)[响应]繁星",
            fanXing_info:"<span class='tiaoJian'>(当移除的【卢恩】包含4个不同系别或4个不同命格)</span>对所有对手各造成1点法术伤害③；<span class='tiaoJian'>(若移除的【卢恩】包含4个不同系别与4个不同命格)</span>目标队友额外+1[宝石]。",
            yingYue:"(专)[响应]影月",
            yingYue_info:"<span class='tiaoJian'>(当移除的【卢恩】包含X对相同系别的【卢恩】，X>1)</span>对目标角色造成X点法术伤害③。<span class='tiaoJian'>(当移除的【卢恩】包含X对相同命格的【卢恩】，X>1)</span>任意分配X点[治疗]给1~2位我方角色。",
            shiRi:"(专)[响应]蚀日",
            shiRi_info:"<span class='tiaoJian'>(当移除的【卢恩】包含每3个相同系别的【卢恩】)</span>你+1[宝石]。<span class='tiaoJian'>(当移除的【卢恩】包含每3个相同命格的【卢恩】)</span>我方【战绩区】+1[宝石]。",
            chuangKeLvDong:"[法术]创刻律动",
            chuangKeLvDong_info:"[宝石]<span class='tiaoJian'>(无视你的手牌上限摸0-1张牌)</span>将最多(1+X)张手牌面朝下放置在你角色旁，作为【卢恩】，X为你拥有的【律法】数。",
            luEn:"卢恩",
            luEn_info:"【卢恩】为星坠巫女专有改盖牌，上限为6。",

            //猎巫人
            zhuanHuan:"[响应]转换",
            zhuanHuan_info:"除[圣光]外，你的法术牌都可作为对应系别攻击牌使用。",
            shouMoCi:"[响应]狩魔刺",
            shouMoCi_info:"<span class='tiaoJian'>(主动攻击手牌<4的目标对手时①，该目标弃1张牌)</span>将弃牌面朝下放置于你的角色旁，作为【魔力瓶】。",
            faShuBoLi:"[响应]法术剥离",
            faShuBoLi_info:"<span class='tiaoJian'>(主动攻击命中时②发动)</span>目标角色弃1张牌，将弃牌面朝下放置于你的角色旁，作为【魔力瓶】。",
            guanYinDuRen:"[响应]灌银毒刃",
            guanYinDuRen_info:"<span class='tiaoJian'>(目标角色将要承受你造成的伤害时⑥发动，移除1个【魔力瓶】)</span>本次伤害-1，将移除的【魔力瓶】加入他手牌[强制]，你+1[治疗]。",
            touXi:"[响应]偷袭[回合限定]",
            touXi_info:"[水晶]<span class='tiaoJian'>([攻击行动]结束时，移除2个【魔力瓶】[展示])</span>每有X张法术牌，对X名目标对手造成1点法术伤害③；<span class='tiaoJian'>(若有2张攻击牌)</span>额外+1[攻击行动]。 <span class='tiaoJian'>(若为同系牌)</span>对目标角色造成1点法术伤害③。",
            moLiPing:"魔力瓶",
            moLiPing_info:"【魔力瓶】为猎巫人专有盖牌，上限为4；若【魔力瓶】达到上限，则不能发动【狩魔刺】、【法术剥离】",
        },
	};
});
