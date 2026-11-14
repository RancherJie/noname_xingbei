// 百年战争·序章：直接维护本文件中的角色、技能、翻译与资源配置。
game.import('extension', function (lib, game, ui, get, ai, _status) {
    'use strict';

    const bnzzQi_assetStem = id => String(id).replace(/^bnzz_qi_/, '');
    const bnzzQi_characterImage = id => 'ext:百年战争·序章/bnzz_' + bnzzQi_assetStem(id) + '.webp';
    const bnzzQi_markImage = id => 'extension/百年战争·序章/mark_bnzz_' + bnzzQi_assetStem(id) + '.webp';

    const bnzzQiVoiceSkillPaths = {
        bnzz_qi_gongFangZhiRen: 'ext:百年战争·序章/audio/skill/bingShuangJianZong/gongFangZhiRen.mp3',
        bnzz_qi_gongFangZhiRen_renNai: 'ext:百年战争·序章/audio/skill/bingShuangJianZong/gongFangZhiRen.mp3',
        bnzz_qi_jiHanJianRen: 'ext:百年战争·序章/audio/skill/bingShuangJianZong/jiHanJianRen.mp3',
        bnzz_qi_jiaoCuoLianZhan: 'ext:百年战争·序章/audio/skill/bingShuangJianZong/jiaoCuoLianZhan.mp3',
        bnzz_qi_yuJianJiDao: 'ext:百年战争·序章/audio/skill/bingShuangJianZong/yuJianJiDao.mp3',
        bnzz_qi_shouHuJianLing: 'ext:百年战争·序章/audio/skill/bingShuangJianZong/shouHuJianLing.mp3',
        bnzz_qi_wuJinHanLiu: 'ext:百年战争·序章/audio/skill/bingShuangJianZong/wuJinHanLiu.mp3',
        bnzz_qi_huiFuZhiJi: 'ext:百年战争·序章/audio/skill/shaNa/huiFuZhiJi.mp3',
        bnzz_qi_dingDangBaoZha: 'ext:百年战争·序章/audio/skill/shaNa/dingDangBaoZha.mp3',
        bnzz_qi_duXingYinBao: 'ext:百年战争·序章/audio/skill/shaNa/duXingYinBao.mp3',
        bnzz_qi_yingJiChuLi: 'ext:百年战争·序章/audio/skill/shaNa/yingJiChuLi.mp3',
        bnzz_qi_duBaoZhiJi: 'ext:百年战争·序章/audio/skill/shaNa/duBaoZhiJi.mp3',
        bnzz_qi_baoPoDanYao: 'ext:百年战争·序章/audio/skill/jinWeiQiangShou/baoPoDanYao.mp3',
        bnzz_qi_shangTang: 'ext:百年战争·序章/audio/skill/jinWeiQiangShou/shangTang.mp3',
        bnzz_qi_shuangFaSheJi: 'ext:百年战争·序章/audio/skill/jinWeiQiangShou/shuangFaSheJi.mp3',
        bnzz_qi_huWeiJiDong: 'ext:百年战争·序章/audio/skill/jinWeiQiangShou/huWeiJiDong.mp3',
        bnzz_qi_teZhuangDanYao: 'ext:百年战争·序章/audio/skill/jinWeiQiangShou/teZhuangDanYao.mp3',
        bnzz_qi_zhouFuZhiChui: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/zhouFuZhiChui.mp3',
        bnzz_qi_jingJiMiYi: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/jingJiMiYi.mp3',
        bnzz_qi_hongLianYeHuo: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/hongLianYeHuo.mp3',
        bnzz_qi_fuWenZuDuan: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/fuWenZuDuan.mp3',
        bnzz_qi_chiSeJiMie: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/chiSeJiMie.mp3',
        bnzz_qi_ziRanBianHuan: 'ext:百年战争·序章/audio/skill/chengYue/ziRanBianHuan.mp3',
        bnzz_qi_fengZhiYan: 'ext:百年战争·序章/audio/skill/chengYue/fengZhiYan.mp3',
        bnzz_qi_fengSeFaDian: 'ext:百年战争·序章/audio/skill/chengYue/fengSeFaDian.mp3',
        bnzz_qi_fengLiuHuanRao: 'ext:百年战争·序章/audio/skill/chengYue/fengLiuHuanRao.mp3',
        bnzz_qi_yiFengJiHua: 'ext:百年战争·序章/audio/skill/chengYue/yiFengJiHua.mp3',
        bnzz_qi_fengYunZhouFa: 'ext:百年战争·序章/audio/skill/chengYue/fengYunZhouFa.mp3',
        bnzz_qi_shenSuFu: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/shenSuFu.mp3',
        bnzz_qi_tianHuoFu: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/tianHuoFu.mp3',
        bnzz_qi_jieZhenBaMenTianDiFa: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/jieZhenBaMenTianDiFa.mp3',
        bnzz_qi_tianDiJian: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/tianDiJian.mp3',
        bnzz_qi_zhenMenLeiJi: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/zhenMenLeiJi.mp3',
        bnzz_qi_yuanLiFanShi: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/yuanLiFanShi.mp3',
        bnzz_qi_wuLiangTianLei: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/wuLiangTianLei.mp3',
        bnzz_qi_nengYuanWeiHu: 'ext:百年战争·序章/audio/skill/luoKe/nengYuanWeiHu.mp3',
        bnzz_qi_ceLiuChongNeng: 'ext:百年战争·序章/audio/skill/luoKe/ceLiuChongNeng.mp3',
        bnzz_qi_xingNengZhuanHuan: 'ext:百年战争·序章/audio/skill/luoKe/xingNengZhuanHuan.mp3',
        bnzz_qi_jiaoHuShuNiu: 'ext:百年战争·序章/audio/skill/luoKe/jiaoHuShuNiu.mp3',
        bnzz_qi_nengJiFenLiu: 'ext:百年战争·序章/audio/skill/luoKe/nengJiFenLiu.mp3',
        bnzz_qi_gaoNengShuSong: 'ext:百年战争·序章/audio/skill/luoKe/gaoNengShuSong.mp3',
        bnzz_qi_xuNengChi: 'ext:百年战争·序章/audio/skill/luoKe/xuNengChi.mp3',
        bnzz_qi_xunMiZhanJi: 'ext:百年战争·序章/audio/skill/juJiShou/xunMiZhanJi.mp3',
        bnzz_qi_zhuangTian: 'ext:百年战争·序章/audio/skill/juJiShou/zhuangTian.mp3',
        bnzz_qi_zhiYuanSheJi: 'ext:百年战争·序章/audio/skill/juJiShou/zhiYuanSheJi.mp3',
        bnzz_qi_kuaiSuZhuangTian: 'ext:百年战争·序章/audio/skill/juJiShou/kuaiSuZhuangTian.mp3',
        bnzz_qi_niZongJuJi: 'ext:百年战争·序章/audio/skill/juJiShou/niZongJuJi.mp3',
        bnzz_qi_shanShuoZhiGuang: 'ext:百年战争·序章/audio/skill/jingLingChiHou/shanShuoZhiGuang.mp3',
        bnzz_qi_xianXingZhenCha: 'ext:百年战争·序章/audio/skill/jingLingChiHou/xianXingZhenCha.mp3',
        bnzz_qi_jiSuMoSha: 'ext:百年战争·序章/audio/skill/jingLingChiHou/jiSuMoSha.mp3',
        bnzz_qi_zhanShuCheTui: 'ext:百年战争·序章/audio/skill/jingLingChiHou/zhanShuCheTui.mp3',
        bnzz_qi_jieJieSheJi: 'ext:百年战争·序章/audio/skill/jingLingChiHou/jieJieSheJi.mp3',
        bnzz_qi_huiGuangYueLv: 'ext:百年战争·序章/audio/skill/huiXiangYueShi/huiGuangYueLv.mp3',
        bnzz_qi_yinLvZhiBi: 'ext:百年战争·序章/audio/skill/huiXiangYueShi/yinLvZhiBi.mp3',
        bnzz_qi_jiDangYinFu: 'ext:百年战争·序章/audio/skill/huiXiangYueShi/jiDangYinFu.mp3',
        bnzz_qi_ciDiJianZou: 'ext:百年战争·序章/audio/skill/huiXiangYueShi/ciDiJianZou.mp3',
        bnzz_qi_wanQiQiMing: 'ext:百年战争·序章/audio/skill/huiXiangYueShi/wanQiQiMing.mp3',
        bnzz_qi_gongMingBeiYue: 'ext:百年战争·序章/audio/skill/huiXiangYueShi/gongMingBeiYue.mp3',
        bnzz_qi_dunJi: 'ext:百年战争·序章/audio/skill/lingYuQiShi/dunJi.mp3',
        bnzz_qi_zhuangBeiJianCha: 'ext:百年战争·序章/audio/skill/lingYuQiShi/zhuangBeiJianCha.mp3',
        bnzz_qi_zhanShuChongFeng: 'ext:百年战争·序章/audio/skill/lingYuQiShi/zhanShuChongFeng.mp3',
        bnzz_qi_lvJiJingShen: 'ext:百年战争·序章/audio/skill/lingYuQiShi/lvJiJingShen.mp3',
        bnzz_qi_zhanShiXiuZheng: 'ext:百年战争·序章/audio/skill/lingYuQiShi/zhanShiXiuZheng.mp3',
        bnzz_qi_zhanYiRanShao: 'ext:百年战争·序章/audio/skill/buSiZhe/zhanYiRanShao.mp3',
        bnzz_qi_zhanYiRanShao_xueShang: 'ext:百年战争·序章/audio/skill/buSiZhe/zhanYiRanShao.mp3',
        bnzz_qi_huiXuanJi: 'ext:百年战争·序章/audio/skill/buSiZhe/huiXuanJi.mp3',
        bnzz_qi_xueYueHuGuang: 'ext:百年战争·序章/audio/skill/buSiZhe/xueYueHuGuang.mp3',
        bnzz_qi_lingHunZhenLie: 'ext:百年战争·序章/audio/skill/buSiZhe/lingHunZhenLie.mp3',
        bnzz_qi_xueSeJingJi: 'ext:百年战争·序章/audio/skill/buSiZhe/xueSeJingJi.mp3',
        bnzz_qi_qianRenSaoDang: 'ext:百年战争·序章/audio/skill/buSiZhe/qianRenSaoDang.mp3',
        bnzz_qi_daHaiZhuFu: 'ext:百年战争·序章/audio/skill/haiShenJiSi/daHaiZhuFu.mp3',
        bnzz_qi_shenLiCiFu: 'ext:百年战争·序章/audio/skill/haiShenJiSi/shenLiCiFu.mp3',
        bnzz_qi_juLangTaoTian: 'ext:百年战争·序章/audio/skill/haiShenJiSi/juLangTaoTian.mp3',
        bnzz_qi_shengMingChaoXi: 'ext:百年战争·序章/audio/skill/haiShenJiSi/shengMingChaoXi.mp3',
        bnzz_qi_siWangLangYong: 'ext:百年战争·序章/audio/skill/haiShenJiSi/siWangLangYong.mp3',
        bnzz_qi_haiShenQingYu: 'ext:百年战争·序章/audio/skill/haiShenJiSi/haiShenQingYu.mp3',
        bnzz_qi_yeZhiYouHuo: 'ext:百年战争·序章/audio/skill/zhuoYanWuZhe/yeZhiYouHuo.mp3',
        bnzz_qi_baiYanDan: 'ext:百年战争·序章/audio/skill/zhuoYanWuZhe/baiYanDan.mp3',
        bnzz_qi_ranShaoDaiJin: 'ext:百年战争·序章/audio/skill/zhuoYanWuZhe/ranShaoDaiJin.mp3',
        bnzz_qi_huGuangSanShe: 'ext:百年战争·序章/audio/skill/zhuoYanWuZhe/huGuangSanShe.mp3',
        bnzz_qi_hunPoJiQu: 'ext:百年战争·序章/audio/skill/zhuoYanWuZhe/hunPoJiQu.mp3',
        bnzz_qi_jiuZhuanShanWu: 'ext:百年战争·序章/audio/skill/zhuoYanWuZhe/jiuZhuanShanWu.mp3',
        bnzz_qi_hunLiJiQu: 'ext:百年战争·序章/audio/skill/zhiMoZhe/hunLiJiQu.mp3',
        bnzz_qi_xiuQi: 'ext:百年战争·序章/audio/skill/zhiMoZhe/xiuQi.mp3',
        bnzz_qi_kuangLuanShuFu: 'ext:百年战争·序章/audio/skill/zhiMoZhe/kuangLuanShuFu.mp3',
        bnzz_qi_zhiGanZhiYan: 'ext:百年战争·序章/audio/skill/zhiMoZhe/zhiGanZhiYan.mp3'
    };

    function bnzzQiApplyVoiceSkillAudio(enabled, packageSkills) {
        Object.entries(bnzzQiVoiceSkillPaths).forEach(([skill, path]) => {
            const audio = enabled ? path : false;
            if (packageSkills?.[skill]) packageSkills[skill].audio = audio;
            if (lib.skill[skill]) lib.skill[skill].audio = audio;
        });
        const renNaiAudio = enabled ? bnzzQiVoiceSkillPaths.bnzz_qi_gongFangZhiRen_renNai : false;
        if (packageSkills?.bnzz_qi_gongFangZhiRen?.subSkill?.renNai)
            packageSkills.bnzz_qi_gongFangZhiRen.subSkill.renNai.audio = renNaiAudio;
        const padingBloodVoiceAudio = enabled ? bnzzQiVoiceSkillPaths.bnzz_qi_zhanYiRanShao_xueShang : false;
        if (packageSkills?.bnzz_qi_zhanYiRanShao?.subSkill?.xueShang)
            packageSkills.bnzz_qi_zhanYiRanShao.subSkill.xueShang.audio = padingBloodVoiceAudio;
        if (lib.skill.bnzz_qi_zhanYiRanShao_xueShang)
            lib.skill.bnzz_qi_zhanYiRanShao_xueShang.audio = padingBloodVoiceAudio;
    }

    // 冰霜剑宗·散华：辅助函数与常量
    // Inspect only the nearest action owned by the attacker. A counterattack or
    // an attack from another extra action must never inherit the combo marker.
    function sanhua_attackAction(event, player) {
        if (!event || event.yingZhan === true || event.player !== player)
            return null;
        if (event.extraXingDongType === 'gongJi')
            return event;
        const seen = new Set();
        for (let current = event; current && !seen.has(current);) {
            seen.add(current);
            if (current !== event && (current.name === 'useCard' || current.name === 'useSkill'))
                return null;
            if (current.action === true)
                return current.player === player ? current : null;
            if (current.name === 'xingDong' || current.name === 'phase')
                return null;
            current = typeof current.getParent === 'function' ? current.getParent() : current.parent;
        }
        return null;
    }

    function sanhua_conversionOptions(player) {
        const options = [];
        if (player.countZhiShiWu('bnzz_qi_xuLi') > 0 &&
            player.countZhiShiWu('bnzz_qi_renNai') < player.getZhiShiWuLimit('bnzz_qi_renNai')) {
            options.push('蓄力→忍耐');
        }
        if (player.countZhiShiWu('bnzz_qi_renNai') > 0 &&
            player.countZhiShiWu('bnzz_qi_xuLi') < player.getZhiShiWuLimit('bnzz_qi_xuLi')) {
            options.push('忍耐→蓄力');
        }
        return options;
    }

    // 近卫枪手·伽纳：辅助函数与常量
    const gana_P = 'bnzz_qi_';

    const gana_blast = gana_P + 'baoPoDanYao';

    const gana_aim = gana_P + 'miaoZhunXingTai';

    function gana_discardable(card, player, skill) {
        return player.getCards('h').includes(card) && lib.filter.cardDiscardable(card, player, skill);
    }

    function gana_sameSuit(card, player, attack, skill) {
        return gana_discardable(card, player, skill) && get.xiBie(card) === get.xiBie(attack.card);
    }

    function gana_blastState(attack) {
        return attack && attack.customArgs && attack.customArgs[gana_blast];
    }

    function gana_aiming(player) {
        return player.hasSkill(gana_aim) && player.isHengZhi();
    }

    async function gana_leaveAim(player) {
        player.removeSkill(gana_aim);
        await player.chongZhi();
    }

    function gana_activeAttackDamage(event) {
        if (event.faShu === true || !event.card)
            return false;
        const seen = new Set();
        for (let current = event; current && !seen.has(current);) {
            seen.add(current);
            if (current.name === 'useCard') {
                return current.yingZhan !== true && get.type(current.card) === 'gongJi' &&
                    current.player === event.source && current.card === event.card;
            }
            current = typeof current.getParent === 'function' ? current.getParent() : current.parent;
        }
        return false;
    }

    async function gana_loadBlast(player, attack, card, withoutDiscard = false) {
        if (gana_blastState(attack) || (!withoutDiscard && !gana_sameSuit(card, player, attack, gana_blast)))
            return false;
        const data = {
            spell: !withoutDiscard && get.type(card) === 'faShu',
            targetId: (attack.target || attack.oriTarget)?.playerid,
            resolved: false
        };
        attack.customArgs = attack.customArgs || {};
        // Reserve this attack before the discard/show response chain runs.
        attack.customArgs[gana_blast] = data;
        if (!withoutDiscard)
            await player.discard([card]).set('showCards', true);
        attack.changeDamageNum(1);
        return true;
    }

    // 放逐骑士·扎克斯：辅助函数与常量
    const zhakesi_P = 'bnzz_qi_';

    const zhakesi_hammer = zhakesi_P + 'zhouFuZhiChui';

    const zhakesi_usedKey = zhakesi_hammer + '_used';

    const zhakesi_countKey = zhakesi_hammer + '_attacks';

    const zhakesi_damageLabel = '攻击伤害+2';

    const zhakesi_pursuitLabel = '首次攻击未命中追击';

    function zhakesi_used(player) { return player.storage[zhakesi_usedKey] || []; }

    function zhakesi_available(player) { return [zhakesi_damageLabel, zhakesi_pursuitLabel].filter(label => !zhakesi_used(player).includes(label)); }

    function zhakesi_grant(player, label) {
        if (!zhakesi_available(player).includes(label))
            return;
        player.storage[zhakesi_usedKey] = zhakesi_used(player).concat(label);
        player.syncStorage(zhakesi_usedKey);
        player.markSkill(zhakesi_hammer);
        game.log(player, '发动【咒赋之锤】的', label, '效果');
    }

    async function zhakesi_grantChoice(player) {
        const choices = zhakesi_available(player);
        if (!choices.length)
            return;
        const result = await player.chooseControl(choices).set('prompt', '选择本回合尚未发动的咒赋效果').set('choice', 0).forResult() || {};
        zhakesi_grant(player, result.control);
    }

    function zhakesi_originalAttack(damage, player) {
        if (damage.faShu === true || !damage.card)
            return null;
        const seen = new Set();
        for (let current = damage; current && !seen.has(current);) {
            seen.add(current);
            if (current.name === 'useCard')
                return current.player === player && get.type(current.card) === 'gongJi' && current.card === damage.card ? current : null;
            current = typeof current.getParent === 'function' ? current.getParent() : current.parent;
        }
        return null;
    }

    // 药剂学者·莎娜：辅助函数与常量
    const shana_P = 'bnzz_qi_';

    const shana_poisonSkill = shana_P + 'duXingYinBao';

    function shana_canDiscard(card, player, skill) {
        return player.getCards('h').includes(card) && lib.filter.cardDiscardable(card, player, skill);
    }

    function shana_attackAction(event, player) {
        if (!event || event.yingZhan === true || event.player !== player)
            return null;
        if (event.extraXingDongType === 'gongJi')
            return event;
        const seen = new Set();
        for (let current = event; current && !seen.has(current);) {
            seen.add(current);
            if (current !== event && (current.name === 'useCard' || current.name === 'useSkill'))
                return null;
            if (current.action === true)
                return current.player === player ? current : null;
            if (current.name === 'xingDong' || current.name === 'phase')
                return null;
            current = typeof current.getParent === 'function' ? current.getParent(1, true) : current.parent;
        }
        return null;
    }

    function shana_poisonDamage(event) {
        if (event.faShu !== true)
            return null;
        // Only the damage directly created by this physical poison may be increased.
        // A response nested under that damage must never inherit its poison identity.
        const parent = event.getParent();
        return parent?.name === '_zhongDu' && parent.indexedData ? parent : null;
    }

    function shana_recoverablePoison(event, player) {
        const seen = new Set();
        // The core returns {} at the end of an unforced getParent() lookup.
        // Ordinary lose events also reach this filter, with no poison ancestor.
        for (let current = event?.getParent?.(1, true); current && !seen.has(current);
            current = typeof current.getParent === 'function' ? current.getParent(1, true) : current.parent) {
            seen.add(current);
            if (current.name !== '_zhongDu')
                continue;
            const card = current.indexedData;
            const record = current[shana_poisonSkill]?.find(item => item.owner === player.playerid);
            if (record?.pending && record.cardid === card?.cardid &&
                event.cards?.includes(card) && get.position(card, true) === 'd') {
                return { card, record };
            }
            // Each _zhongDu instance represents exactly one poison card.
            return null;
        }
        return null;
    }

    // 风云之灵·承月：辅助函数与常量
    const chengyue_P = 'bnzz_qi_';

    const chengyue_book = chengyue_P + 'fengSeFaDian';

    const chengyue_ring = chengyue_P + 'fengLiuHuanRao';

    const chengyue_intensify = chengyue_P + 'yiFengJiHua';

    const chengyue_cloud = chengyue_P + 'fengYunZhouFa';

    function chengyue_discardable(card, player, id) {
        return player.getCards('h').includes(card) && lib.filter.cardDiscardable(card, player, id);
    }

    function chengyue_basicHandCards(event, player) {
        return (event.cards || []).filter(card => player.getCards('h').includes(card) &&
            lib.cardPack.xingBei?.includes(get.name(card)));
    }

    function chengyue_rewardRecord(event) {
        const parent = event.getParent();
        if (parent?.name !== '_gongJiXingShi')
            return null;
        return parent.getTrigger()?.customArgs?.[chengyue_intensify] || null;
    }

    async function chengyue_forceDiscard(player, count, prompt) {
        count = Math.min(count, player.countCards('h', card => lib.filter.cardDiscardable(card, player)));
        if (count > 0)
            await player.chooseToDiscard('h', count, true, prompt);
    }

    async function chengyue_chooseBookTarget(player, others) {
        const result = await player.chooseTarget('风色法典：选择目标角色', true, (card, player, target) => !_status.event.bnzzQiOtherOnly || target !== player)
            .set('bnzzQiOtherOnly', others)
            .set('ai', target => {
                const e = _status.event;
                if (e.bnzzQiOtherOnly) return target.side === e.player.side ? Math.max(0, target.getHandcardLimit() - target.countCards('h')) : target.countCards('h') * 1.1;
                return target.side !== e.player.side && target.countCards('h') > 0 ? 3 : 0;
            }).forResult();
        return result?.targets?.[0];
    }

    // 求道者·九萌：辅助函数与常量
    const jiumeng_P = 'bnzz_qi_';

    const jiumeng_energy = jiumeng_P + 'yuanLi';

    const jiumeng_formation = jiumeng_P + 'zhenYanXingTai';

    const jiumeng_payment = jiumeng_P + 'wuLiangTianLei_paying';

    function jiumeng_formed(player) { return player.hasSkill(jiumeng_formation) && player.isHengZhi(); }

    function jiumeng_canDiscard(card, player, skill) {
        return player.getCards('h').includes(card) && lib.filter.cardDiscardable(card, player, skill);
    }

    function jiumeng_shouldBacklash(player) {
        return jiumeng_formed(player) && !player.storage[jiumeng_payment] &&
            (player.countCards('h') === 0 || player.countZhiShiWu(jiumeng_energy) === 0);
    }

    async function jiumeng_backlash(player) {
        if (!jiumeng_shouldBacklash(player))
            return;
        const emptyHand = player.countCards('h') === 0;
        const removed = emptyHand ? player.countZhiShiWu(jiumeng_energy) : 0;
        player.removeSkill(jiumeng_formation);
        await player.chongZhi();
        if (removed > 0)
            await player.removeZhiShiWu(jiumeng_energy, removed);
        await player.faShuDamage(3 + removed, player, 'nocard');
    }

    function jiumeng_talisman(element, id, swift) {
        return {
            audio: false,
            type: 'faShu', enable: 'faShu', position: 'h', selectCard: [1, 2],
            discard: false, lose: false,
            filter(event, player) {
                return !jiumeng_formed(player) && player.countCards('h', card => get.xiBie(card) === element &&
                    jiumeng_canDiscard(card, player, id)) > 0 &&
                    (!swift || game.hasPlayer(target => target !== player && target.side === player.side));
            },
            filterCard: swift ? function (card, player) {
                return get.xiBie(card) === 'feng' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_shenSuFu');
            } : function (card, player) {
                return get.xiBie(card) === 'huo' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_tianHuoFu');
            },
            filterTarget: swift ? function (card, player, target) {
                return target !== player && target.side === player.side;
            } : true,
            selectTarget: 1,
            async content(event, trigger, player) {
                const cards = event.cards || [];
                const target = event.target;
                if (jiumeng_formed(player) || !target?.isIn() || cards.length < 1 || cards.length > 2 ||
                    cards.some(card => get.xiBie(card) !== element || !jiumeng_canDiscard(card, player, id)) ||
                    (swift && (target === player || target.side !== player.side)))
                    return;
                await player.discard(cards).set('showCards', true);
                if (!target.isIn())
                    return;
                if (swift) {
                    const count = Math.min(cards.length, target.countCards('h', card => lib.filter.cardDiscardable(card, target)));
                    if (count)
                        await target.chooseToDiscard('h', count, true, '神速符：弃' + count + '张牌');
                    if (cards.length > 1)
                        await target.changeZhiLiao(cards.length - 1, player);
                }
                else
                    await target.faShuDamage(cards.length, player, 'nocard');
            },
            check(card) { return 6 - get.value(card); },
            ai: {
                order: 3.5,
                result: {
                    target: swift ? function (player, target) { return 1; } :
                        function (player, target) { return get.damageEffect(target, 1); }
                }
            }
        };
    }

    // 狙击手·兰卡：辅助函数与常量
    const lanka_P = 'bnzz_qi_', lanka_bullets = lanka_P + 'qiangDan', lanka_blocked = lanka_P + 'xunMiZhanJi_block';

    async function lanka_removeBullets(player, number, prompt) {
        if (!number)
            return true;
        const available = player.getGaiPai(lanka_bullets);
        if (available.length < number)
            return false;
        if (available.length === number) {
            await player.discard(available, lanka_bullets);
            return true;
        }
        const result = await player.chooseCardButton(available, prompt, true, number).forResult();
        if (!result || !result.links || result.links.length !== number)
            return false;
        await player.discard(result.links, lanka_bullets);
        return true;
    }

    // 供能技师·萝可：辅助函数与常量
    const luoke_P = 'bnzz_qi_', luoke_pool = luoke_P + 'xuNengChi', luoke_extra = luoke_P + 'jiaoHuShuNiu';

    const luoke_values = player => player.storage[luoke_pool] || [];

    const luoke_canSpendCrystals = (player, count) => luoke_values(player).length >= count;

    function luoke_setPool(player, list, suppressAudio = false) {
        const previousCount = luoke_values(player).length;
        const nextPool = list.slice(0, 4);
        game.broadcastAll(function (owner, stars) {
            owner.storage.bnzz_qi_xuNengChi = stars.slice();
            owner.markSkill('bnzz_qi_xuNengChi');
        }, player, nextPool);
        player.syncStorage(luoke_pool);
        const audioPath = bnzzQiVoiceSkillPaths[luoke_pool];
        if (!suppressAudio && !player._bnzzQiRefineSuppressPoolAudio && nextPool.length > previousCount && audioPath && lib.config['extension_百年战争·序章_voiceAudio'] === true) {
            game.broadcastAll(function (path, speaker) {
                if (!lib.config.background_speak || lib.config['extension_百年战争·序章_voiceAudio'] !== true) return;
                game.playAudio({ path: path, spatialPlayer: speaker, addVideo: false, onError: function () {} });
            }, audioPath, player);
        }
    }

    function luoke_receive(player, type, number) {
        const list = luoke_values(player).slice();
        for (let i = 0; i < number && list.length < 4; i++) {
            if (!list.length && type === 'baoShi')
                list.push('shuiJing', 'shuiJing');
            else
                list.push(type);
        }
        luoke_setPool(player, list);
    }

    async function luoke_spendCrystals(player, count) {
        if (!luoke_canSpendCrystals(player, count))
            return false;
        const list = luoke_values(player).slice();
        for (let i = 0; i < count; i++) {
            const crystal = list.indexOf('shuiJing');
            list.splice(crystal >= 0 ? crystal : list.indexOf('baoShi'), 1);
        }
        luoke_setPool(player, list);
        return true;
    }

    function luoke_extraAttack(event, player) {
        const seen = new Set();
        for (let current = event; current && !seen.has(current); current = current.getParent?.() || current.parent) {
            seen.add(current);
            if (current.player === player && (current.name === 'gongJi' || current.name === 'chooseToUse'))
                return current[luoke_extra] === true;
            if (current !== event && (current.name === 'useCard' || current.name === 'useSkill'))
                return false;
        }
        return event.extraXingDongType?.[luoke_extra] === true;
    }

    function luoke_counterCard(type) {
        const names = { shui: 'shuiLianZhan', huo: 'huoYanZhan', feng: 'fengShenZhan', lei: 'leiGuangZhan', di: 'diLieZhan', an: 'anMie', guang: 'guangHuiZhan' };
        return { name: names[type] || 'shuiLianZhan', xiBie: type, mingGe: 'ji', isCard: true };
    }

    // 回响乐师·恩普洛斯：辅助函数与常量
    const enpuluosi_P = 'bnzz_qi_';

    const enpuluosi_rhythm = enpuluosi_P + 'yueLv';

    const enpuluosi_glow = enpuluosi_P + 'huiGuangYueLv';

    const enpuluosi_wall = enpuluosi_P + 'yinLvZhiBi';

    const enpuluosi_note = enpuluosi_P + 'jiDangYinFu';

    const enpuluosi_crescendo = enpuluosi_P + 'ciDiJianZou';

    const enpuluosi_orchestra = enpuluosi_P + 'wanQiQiMing';

    const enpuluosi_resonance = enpuluosi_P + 'gongMingBeiYue';

    const enpuluosi_boost = enpuluosi_orchestra + '_effect';

    function enpuluosi_canDiscard(card, player, id) {
        return player.getCards('h').includes(card) && lib.filter.cardDiscardable(card, player, id);
    }

    function enpuluosi_effect(player, target, value) {
        return value + (target !== player && player.hasSkill(enpuluosi_boost) ? 1 : 0);
    }

    function enpuluosi_lostShield(event) {
        return (event.xs || []).some(card => (event.gaintag_map?.[card.cardid] || []).includes('_shengDun'));
    }

    function enpuluosi_otherEffect(id) {
        const seen = new Set();
        while (id && !seen.has(id)) {
            seen.add(id);
            if (id === '_shengDun')
                return false;
            const info = lib.skill[id];
            if (info?.tag?.jiChuXiaoGuo)
                return true;
            id = info?.sourceSkill;
        }
        return false;
    }

    function enpuluosi_hasPair(player) {
        const cards = player.getCards('h').filter(card => enpuluosi_canDiscard(card, player, enpuluosi_crescendo));
        return cards.some((card, index) => cards.slice(index + 1).some(other => get.mingGe(card) === get.mingGe(other)));
    }

    const enpuluosi_id = enpuluosi_P + 'huiXiangYueShi', enpuluosi_name = enpuluosi_P + 'enPuLuoSi_name';

    // 精灵斥候·阿芙洛蒂亚：辅助函数与常量
    const afuro_P = 'bnzz_qi_';

    const afuro_flash = afuro_P + 'shanXian';

    const afuro_retreat = afuro_P + 'zhanShuCheTui';

    const afuro_barrier = afuro_P + 'jieJieSheJi';

    function afuro_waterCost(card, player) {
        return player.getCards('h').includes(card) && get.xiBie(card) === 'shui' &&
            lib.filter.cardDiscardable(card, player, afuro_retreat);
    }

    function afuro_ownAttackDamage(event, player) {
        if (event.faShu === true || !event.card || event.source !== player)
            return null;
        const seen = new Set();
        for (let current = event; current && !seen.has(current);) {
            seen.add(current);
            if (current.name === 'useCard') {
                return current.player === player && current.yingZhan !== true &&
                    current.card === event.card && get.type(current.card) === 'gongJi' ? current : null;
            }
            current = typeof current.getParent === 'function' ? current.getParent() : current.parent;
        }
        return null;
    }

    function afuro_healingAllocation(targets) {
        const result = new Map();
        for (const target of targets || [])
            result.set(target, (result.get(target) || 0) + 1);
        return result;
    }

    // 翎羽骑士·洛肯·煌：辅助函数与常量
    const luoken_P = 'bnzz_qi_';

    function luoken_hasDiscard(player, type, skill) {
        return player.countCards('h', card => (!type || get.xiBie(card) === type) && lib.filter.cardDiscardable(card, player, skill)) > 0;
    }

    function luoken_within(event, root) {
        const seen = new Set();
        for (let current = event; current && !seen.has(current);) {
            if (current === root)
                return true;
            seen.add(current);
            current = typeof current.getParent === 'function' ? current.getParent() : current.parent;
        }
        return false;
    }

    // 海神祭司·让·梅莎拉：辅助函数与常量
    const meishala_P = 'bnzz_qi_';

    const meishala_surge = meishala_P + 'siWangLangYong';

    const meishala_tracked = meishala_surge + '_targets';

    const meishala_blocked = meishala_surge + '_blocked';

    const meishala_wave = meishala_P + 'juLangTaoTian';

    const meishala_tide = meishala_P + 'shengMingChaoXi';

    function meishala_attackAction(event, player) {
        if (!event || event.yingZhan === true || event.player !== player)
            return null;
        if (event.extraXingDongType === 'gongJi')
            return event;
        const seen = new Set();
        for (let current = event; current && !seen.has(current);) {
            seen.add(current);
            if (current !== event && (current.name === 'useCard' || current.name === 'useSkill'))
                return null;
            if (current.action === true)
                return current.player === player ? current : null;
            if (current.name === 'xingDong' || current.name === 'phase')
                return null;
            current = typeof current.getParent === 'function' ? current.getParent() : current.parent;
        }
        return null;
    }

    function meishala_canDiscard(card, player, skill) {
        return player.getCards('h').includes(card) && lib.filter.cardDiscardable(card, player, skill);
    }

    function meishala_victims(player) {
        const ids = player.storage[meishala_tracked] || [];
        return game.filterPlayer(target => target.side !== player.side && ids.includes(target.playerid));
    }

    // 不死者·帕丁：辅助函数与常量
    const pading_P = 'bnzz_qi_';

    const pading_blood = pading_P + 'xueShang';

    const pading_soul = pading_P + 'zhanHun';

    const pading_moon = pading_P + 'xueYueHuGuang';

    const pading_thorns = pading_P + 'xueSeJingJi';

    const pading_ignoreDamage = pading_P + 'xueSeJingJiDamage';

    const pading_pendingZhanVoice = pading_P + 'pendingZhanYiRanShaoVoice';

    const pading_suppressZhanVoice = pading_P + 'suppressZhanYiRanShaoVoice';

    function pading_attackAction(event, player) {
        if (!event || event.yingZhan === true || event.player !== player)
            return null;
        if (event.extraXingDongType === 'gongJi')
            return event;
        const seen = new Set();
        for (let current = event; current && !seen.has(current);) {
            seen.add(current);
            if (current !== event && (current.name === 'useCard' || current.name === 'useSkill'))
                return null;
            if (current.action === true)
                return current.player === player ? current : null;
            if (current.name === 'xingDong' || current.name === 'phase')
                return null;
            current = typeof current.getParent === 'function' ? current.getParent() : current.parent;
        }
        return null;
    }

    function pading_moonAttack(event, player) {
        const action = pading_attackAction(event, player);
        return !!action && action[pading_moon] === true;
    }

    function pading_spellCost(card, player) {
        return get.type(card) === 'faShu' && player.getCards('h').includes(card) &&
            lib.filter.cardDiscardable(card, player, pading_thorns);
    }

    // 灼焰舞者·炙霞：辅助函数与常量
    const zhixia_P = 'bnzz_qi_';

    const zhixia_ghost = zhixia_P + 'youHuo';

    const zhixia_dance = zhixia_P + 'huoWuXingTai';

    const zhixia_scatter = zhixia_P + 'huGuangSanShe';

    function zhixia_dancing(player) { return player.hasSkill(zhixia_dance) && player.isHengZhi(); }

    function zhixia_discardable(card, player, skill) {
        return player.getCards('h').includes(card) && lib.filter.cardDiscardable(card, player, skill);
    }

    function zhixia_scatterRecord(event, player) {
        const data = event.customArgs?.[zhixia_scatter];
        return data?.owner === player.playerid && !data.resolved ? data : null;
    }

    async function zhixia_scatterDamage(event, player, originalTarget) {
        const data = zhixia_scatterRecord(event, player);
        if (!data)
            return;
        data.resolved = true;
        if (!game.hasPlayer(target => target.side !== player.side && target !== originalTarget))
            return;
        const result = await player.chooseTarget('弧光散射：对攻击目标以外的一名对手造成1点法术伤害', true, (card, player, target) => target.side !== player.side && target.playerid !== _status.event.bnzzQiOriginalTarget)
            .set('bnzzQiOriginalTarget', originalTarget?.playerid)
            .set('ai', target => get.damageEffect2(target, _status.event.player, 1)).forResult();
        const target = result?.targets?.[0];
        if (target?.isIn() && target.side !== player.side && target !== originalTarget) {
            await target.faShuDamage(1, player, 'nocard');
        }
    }

    async function zhixia_leaveDance(player) {
        player.removeSkill(zhixia_dance);
        await player.chongZhi();
    }

    // 织魔者·蕾乌：辅助函数与常量
    const leiwu_P = 'bnzz_qi_';

    const leiwu_soul = leiwu_P + 'hunLiJiQu', leiwu_weave = leiwu_P + 'buWang', leiwu_line = leiwu_P + 'xianZhen';

    const leiwu_rest = leiwu_P + 'xiuQi', leiwu_frenzy = leiwu_P + 'kuangLuanShuFu', leiwu_eye = leiwu_P + 'zhiGanZhiYan';

    const leiwu_form = leiwu_P + 'zhiGanXingTai', leiwu_bind = leiwu_P + 'shuFu';

    const leiwu_light = leiwu_P + 'guangWang', leiwu_dark = leiwu_P + 'anWang', leiwu_conduct = leiwu_P + 'daoMo';

    const leiwu_nets = [leiwu_light, leiwu_dark], leiwu_recoil = leiwu_conduct + '_recoil', leiwu_used = leiwu_conduct + '_used';

    const leiwu_lineEvent = leiwu_line + '_change';

    function leiwu_playVoice(line, speaker) {
        if (!speaker || lib.config['extension_百年战争·序章_voiceAudio'] !== true)
            return;
        const path = 'ext:百年战争·序章/audio/skill/zhiMoZhe/' + line + '.mp3';
        game.broadcastAll(function (audioPath, owner) {
            if (!lib.config.background_speak || lib.config['extension_百年战争·序章_voiceAudio'] !== true)
                return;
            game.playAudio({ path: audioPath, spatialPlayer: owner, addVideo: false, onError: function () {} });
        }, path, speaker);
    }

    function leiwu_hasNet(player, id) { return player.getExpansions(id).length > 0; }

    function leiwu_energized(player, id) { return player.storage[id + '_energized'] === true; }

    function leiwu_availableNets() { return leiwu_nets.filter(id => !game.hasPlayer(player => leiwu_hasNet(player, id))); }

    function leiwu_freshNets(player) { return leiwu_nets.filter(id => leiwu_hasNet(player, id) && !leiwu_energized(player, id)); }

    function leiwu_setEnergized(player, id, value) {
        player.storage[id + '_energized'] = value;
        player.syncStorage(id + '_energized');
        if (leiwu_hasNet(player, id))
            player.markSkill(id);
    }

    async function leiwu_placeNet(player, id) {
        if (!leiwu_nets.includes(id) || !leiwu_availableNets().includes(id))
            return false;
        // Exclusive cards live outside the ordinary deck and discard pile.
        const card = game.createCard2(id + '_card');
        const next = player.addToExpansion(card, 'gain2');
        next.gaintag.add(id);
        await next;
        if (!leiwu_hasNet(player, id))
            return false;
        leiwu_setEnergized(player, id, false);
        game.log(player, '在自己面前放置了', '#y' + get.translation(id));
        return true;
    }

    async function leiwu_removeNet(player, id) {
        const cards = player.getExpansions(id);
        if (!cards.length)
            return;
        await player.lose(cards, ui.special).set('type', 'exclusiveCardRemove').set('getlx', false);
        delete player.storage[id + '_energized'];
        player.syncStorage(id + '_energized');
        player.unmarkSkill(id);
    }

    async function leiwu_exitForm(player) {
        await player.chongZhi();
        player.removeSkill(leiwu_form);
    }

    function leiwu_actionOf(event) {
        if (!event || event.yingZhan === true || !['useCard', 'useSkill'].includes(event.name))
            return null;
        const seen = new Set();
        for (let current = event; current && !seen.has(current);) {
            seen.add(current);
            if (current !== event && ['useCard', 'useSkill'].includes(current.name))
                return null;
            if (current.action === true)
                return current.player === event.player ? current : null;
            if (['xingDong', 'phase'].includes(current.name))
                return null;
            current = typeof current.getParent === 'function' ? current.getParent() : current.parent;
        }
        return null;
    }

    function leiwu_silenceOthers(event, player) {
        event[leiwu_lineEvent] = player.playerid;
        event._notrigger = game.filterPlayer(target => target !== player);
        return event;
    }

    function leiwu_handPlay(event) {
        if (!event.card || !event.cards?.length || !event.player)
            return false;
        return event.player.getHistory('lose').some(loss => loss.getParent() === event &&
            (loss.hs || []).some(card => event.cards.includes(card)));
    }

    function leiwu_traps(player, element) {
        const id = element === 'guang' ? leiwu_light : element === 'an' ? leiwu_dark : null;
        return id ? game.filterPlayer(owner => owner.side !== player.side && leiwu_hasNet(owner, id) && !leiwu_energized(owner, id)) : [];
    }

    const leiwu_id = leiwu_P + 'zhiMoZhe', leiwu_name = leiwu_P + 'leiWu_name';

    function leiwu_createNetSkill(id) {
        return {
            audio: false, charlotte: true, forced: true,
            trigger: { player: 'phaseBegin' },
            filter(event, player) { return leiwu_hasNet(player, id) && leiwu_energized(player, id); },
            async content(event, trigger, player) {
                await leiwu_removeNet(player, id);
                leiwu_playVoice('poWang', player);
            },
            markimage: bnzzQi_markImage(id),
            intro: {
                name: id === leiwu_light ? '光网' : '暗网',
                content: 'expansion', markcount: 'expansion',
                mark(dialog, storage, player) {
                    dialog.addText(leiwu_energized(player, id) ? '已激发：下个回合开始时移除；导魔仍生效，诱捕不再生效。' : '未激发：导魔与诱捕生效。');
                    dialog.addSmall(player.getExpansions(id));
                }
            }
        };
    }

    // Display conventions follow 轮回遗梦; keep the source rules as plain text.
    const bnzzQi_resourceColors = {
        '【蓄力】': '#74c8ee', '【忍耐】': '#9db9da',
        '【瞄准形态】': '#d2b365', '【咒赋之锤】': '#b695d9',
        '【元力】': '#66cbb5', '【阵眼形态】': '#a2d6bb',
        '【枪弹】': '#d7b27e', '【蓄能池】': '#62c9df',
        '【乐律】': '#e4bd66', '【闪现】': '#88d5b5',
        '【血殇】': '#db8593', '【战魂】': '#80b9ee',
        '【幽火】': '#ed9c8c', '【火舞形态】': '#efb36b',
        '【束缚】': '#b8a2dc', '【直感形态】': '#c0a6ec',
        '【光网】': '#e5cd85', '【暗网】': '#b59bdf'
    };

    function bnzzQi_colorConditions(text) {
        let result = '', start = 0, depth = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] === '（') {
                if (depth++ === 0) {
                    result += text.slice(start, i);
                    start = i;
                }
            }
            else if (text[i] === '）' && depth > 0 && --depth === 0) {
                result += '<span style="color:#e6b85c">' + text.slice(start, i + 1) + '</span>';
                start = i + 1;
            }
        }
        return result + text.slice(start);
    }

    function bnzzQi_formatInfo(text) {
        const prepared = String(text)
            .replace(/；（/g, '；<br>（')
            .replace(/•\s*/g, '·');
        return bnzzQi_colorConditions(prepared)
            .replace(/【[^】]+】/g, keyword => {
                if (keyword === '【水晶】') return '<span class="lan">' + keyword + '</span>';
                if (keyword === '【宝石】') return '<span style="color:#E02B17;font-weight:bold">' + keyword + '</span>';
                const color = bnzzQi_resourceColors[keyword];
                return color ? '<span style="color:' + color + ';font-weight:bold">' + keyword + '</span>' : keyword;
            });
    }

    const bnzzQi_characterIntro = {
        "bnzz_qi_bingShuangJianZong": "散华是战技殿堂的冰霜剑士，寡言而沉着，习惯在攻守交替间寻找对手的破绽。挥剑积蓄力量，受创磨炼忍耐；寒流封住应战的退路，剑灵则替同伴承接锋芒。",
        "bnzz_qi_jinWeiQiangShou": "伽纳是战技殿堂的近卫枪手，重视阵线与同伴，出手果决。瞄准后以双发射击压制敌人，用爆破弹药打乱对手节奏，也随时准备以护卫机动掩护队友。",
        "bnzz_qi_fangZhuQiShi": "扎克斯是背负咒印的放逐骑士，离开旧日归属后，仍以战锤与符文践行自己的信念。咒赋换来猛烈的进攻，荆棘秘仪与符文阻断却让每次交锋都有另一种解法。",
        "bnzz_qi_yaoJiXueZhe": "莎娜是幻影联盟的药剂学者，总在试管与药瓶之间寻找新的配方。恢复制剂能稳住同伴的阵线，毒性引爆与毒爆制剂则让看似轻微的伤势化作危机；危急时刻，处理伤口的手同样迅速。",
        "bnzz_qi_fengYunZhiLing": "承月是幻影联盟的风云术者，行事自在，擅长顺着战场的变化调整法术。风之眼传递支援，风色法典随投入的风牌展开不同篇章；一阵微风，也能改变攻击与星石的归属。",
        "bnzz_qi_qiuDaoZhe": "九萌是幻影联盟的求道者，以符术探索天地间的力量。平时凭神速符与天火符支援进攻，结阵后则化为八门阵眼，以元力引动剑势与雷霆；阵中力量越盛，也越需要提防反噬。",
        "bnzz_qi_juJiShou": "兰卡是咏歌城的狙击手，耐心比枪声更早抵达战场。寻觅战机、暗置枪弹，再以支援射击照应同伴；真正的狙击往往留给准备充分的瞬间，让超量装填化作致命一击。",
        "bnzz_qi_gongNengJiShi": "萝可是咏歌城的供能技师，擅长让晶械与星石各尽其用。随身的蓄能池收存战场能量，交互枢纽连接同伴，高能输送补充阵线；敌人的星石，也可能成为下一次进攻的燃料。",
        "bnzz_qi_huiXiangYueShi": "恩普洛斯是咏歌城的回响乐师，相信战场上每一次碰撞都有自己的节拍。圣盾构成音律之壁，激荡音符积成乐律；当渐奏汇成共鸣，乐声既能击向敌人，也会震动演奏者自身。",
        "bnzz_qi_jingLingChiHou": "阿芙洛蒂亚是神圣教廷的精灵斥候，目光敏锐，行动轻捷。侦查为同伴争取治疗与先机，闪现让箭矢越过防线；该进击时疾速抹杀，该收阵时则以战术撤退保存力量。",
        "bnzz_qi_lingYuQiShi": "洛肯·煌是神圣教廷的翎羽骑士，习惯先确认同伴的装备，再迎向下一场战斗。圣盾既是守护也是盾击的助力；战术冲锋带动队列，战时修整则让疲惫的阵线重新站稳。",
        "bnzz_qi_haiShenJiSi": "让·梅莎拉是神圣教廷的海神祭司，以潮汐的起落理解生息与消亡。大海祝福积蓄治疗，生命潮汐可滋养同伴，也可冲击他人；当巨浪退去，死亡浪涌仍会追向受创的敌人。",
        "bnzz_qi_buSiZhe": "帕丁是鲜血议会的不死者，将伤痕与战意一并留在身上。每次进攻凝成战魂，每次受创积下血殇；回旋击与血月弧光催动连番攻势，而灵魂振裂也让力量的代价落回自身。",
        "bnzz_qi_zhuoYanWuZhe": "炙霞是鲜血议会的灼焰舞者，以扇舞牵动幽火，在灼痛与汲取之间维持舞步。白焰弹追逐落空的攻势，火舞形态放大弧光与火系压制；魂魄汲取的火焰同样会触及自己。",
        "bnzz_qi_zhiMoZhe": "蕾乌是鲜血议会的织魔者，安静地观察每个人的行动，将光与暗织成魔网。直感让法术更加锐利，线振把行动化作束缚；同伴可借网导魔，敌人却可能在出牌时惊动伏线。"
    };

    const extension = {
        name: '百年战争·序章',
        version: '0.2.1-dev',
        connect: true,
        editable: false,
        help: {},
        config: {
            voiceAudio: {
                name: '百年战争角色语音',
                init: !!(lib.config.extensions && lib.config.extensions.includes('十周年语音包')),
                intro: '控制本扩展的技能与购买、提炼、合成语音；关闭后不影响其他扩展。',
                onclick: function (enabled) {
                    game.saveConfig('extension_百年战争·序章_voiceAudioDefaultHandled', true);
                    bnzzQiApplyVoiceSkillAudio(enabled === true, extension.package?.skill?.skill);
                }
            }
        },
        content: function () {},
        precontent: function ()  {
            // Match the existing expansion action-audio convention.
            const voiceAudioConfigKey = 'extension_百年战争·序章_voiceAudio';
            const voiceAudioDefaultHandledKey = 'extension_百年战争·序章_voiceAudioDefaultHandled';
            const hasTenYearAudioPack = Array.isArray(lib.config.extensions) && lib.config.extensions.includes('十周年语音包');
            if (hasTenYearAudioPack && lib.config[voiceAudioDefaultHandledKey] !== true) {
                if (lib.config[voiceAudioConfigKey] !== true) game.saveConfig(voiceAudioConfigKey, true);
                game.saveConfig(voiceAudioDefaultHandledKey, true);
            }
            bnzzQiApplyVoiceSkillAudio(lib.config[voiceAudioConfigKey] === true, extension.package?.skill?.skill);
            const actionAudioSkill = 'bnzz_qi_sanhua_actionAudio';
            if (!lib.skill[actionAudioSkill]) {
                lib.skill[actionAudioSkill] = {
                    audio: false,
                    trigger: { player: ['gouMai', 'heCheng', 'tiLian', '_tiLian_backupAfter'] },
                    forced: true,
                    popup: false,
                    charlotte: true,
                    firstDo: true,
                    filter: function (event, player) {
                        const character = [player.name, player.name1, player.name2].find(function (name) {
                                return ['bnzz_qi_bingShuangJianZong', 'bnzz_qi_yaoJiXueZhe', 'bnzz_qi_jinWeiQiangShou', 'bnzz_qi_fangZhuQiShi', 'bnzz_qi_fengYunZhiLing', 'bnzz_qi_qiuDaoZhe', 'bnzz_qi_gongNengJiShi', 'bnzz_qi_juJiShou', 'bnzz_qi_jingLingChiHou', 'bnzz_qi_huiXiangYueShi', 'bnzz_qi_lingYuQiShi', 'bnzz_qi_buSiZhe', 'bnzz_qi_haiShenJiSi', 'bnzz_qi_zhuoYanWuZhe', 'bnzz_qi_zhiMoZhe'].includes(name);
                        });
                        return !!character;
                    },
                    content: function (event, trigger, player) {
                        let action = event.triggername || (trigger && trigger.name);
                        const names = [player.name, player.name1, player.name2];
                        const chengyuePresent = names.includes('bnzz_qi_fengYunZhiLing') || player.hasSkill('bnzz_qi_ziRanBianHuan');
                        if (action === 'tiLian' && chengyuePresent) {
                            player._bnzzQiChengYueRefineVoicePending = { naturalTriggered: false };
                            return;
                        }
                        if (action === '_tiLian_backupAfter') {
                            const pending = player._bnzzQiChengYueRefineVoicePending;
                            delete player._bnzzQiChengYueRefineVoicePending;
                            if (!chengyuePresent || !pending || pending.naturalTriggered) return;
                            action = 'tiLian';
                        }
                        if (!['gouMai', 'heCheng', 'tiLian'].includes(action)) return;
                        const character = names.find(function (name) {
                                return ['bnzz_qi_bingShuangJianZong', 'bnzz_qi_yaoJiXueZhe', 'bnzz_qi_jinWeiQiangShou', 'bnzz_qi_fangZhuQiShi', 'bnzz_qi_fengYunZhiLing', 'bnzz_qi_qiuDaoZhe', 'bnzz_qi_gongNengJiShi', 'bnzz_qi_juJiShou', 'bnzz_qi_jingLingChiHou', 'bnzz_qi_huiXiangYueShi', 'bnzz_qi_lingYuQiShi', 'bnzz_qi_buSiZhe', 'bnzz_qi_haiShenJiSi', 'bnzz_qi_zhuoYanWuZhe', 'bnzz_qi_zhiMoZhe'].includes(name);
                        });
                        if (!character) return;
                        const folder = character === 'bnzz_qi_yaoJiXueZhe' ? 'shaNa' : character === 'bnzz_qi_jinWeiQiangShou' ? 'jinWeiQiangShou' : character === 'bnzz_qi_fangZhuQiShi' ? 'fangZhuQiShi' : character === 'bnzz_qi_fengYunZhiLing' ? 'chengYue' : character === 'bnzz_qi_qiuDaoZhe' ? 'qiuDaoZhe' : character === 'bnzz_qi_gongNengJiShi' ? 'luoKe' : character === 'bnzz_qi_juJiShou' ? 'juJiShou' : character === 'bnzz_qi_jingLingChiHou' ? 'jingLingChiHou' : character === 'bnzz_qi_huiXiangYueShi' ? 'huiXiangYueShi' : character === 'bnzz_qi_lingYuQiShi' ? 'lingYuQiShi' : character === 'bnzz_qi_buSiZhe' ? 'buSiZhe' : character === 'bnzz_qi_haiShenJiSi' ? 'haiShenJiSi' : character === 'bnzz_qi_zhuoYanWuZhe' ? 'zhuoYanWuZhe' : character === 'bnzz_qi_zhiMoZhe' ? 'zhiMoZhe' : 'bingShuangJianZong';
                        const path = 'ext:百年战争·序章/audio/action/' + folder + '/' + action + '.mp3';
                        game.broadcastAll(function (audioPath, speaker) {
                            if (!lib.config.background_speak || lib.config['extension_百年战争·序章_voiceAudio'] !== true) return;
                            game.playAudio({
                                path: audioPath,
                                spatialPlayer: speaker,
                                addVideo: false,
                                onError: function () {},
                            });
                        }, path, player);
                    },
                };
            }
            game.addGlobalSkill(actionAudioSkill);
    const refine = lib.skill._tiLian;
    if (!refine || refine._bnzzQiPoolAdapted)
        return;
    refine._bnzzQiPoolAdapted = true;
    const filter = refine.filter, select = refine.chooseButton.select;
    refine.filter = function (event, player) {
        if (player.hasSkill('bnzz_qi_xuNengChi'))
            return (player.storage.bnzz_qi_xuNengChi || []).length < 4 && get.zhanJi(player.side).length > 0;
        return filter.call(this, event, player);
    };
    refine.chooseButton.select = function () {
        const player = _status.event.player;
        if (player.hasSkill('bnzz_qi_xuNengChi'))
            return [1, Math.min(2, 4 - (player.storage.bnzz_qi_xuNengChi || []).length)];
        return select.apply(this, arguments);
    };
    refine._bnzzQiOriginalOrder = refine.ai.order;
    refine._bnzzQiOriginalResult = refine.ai.result.player;
    refine._bnzzQiOriginalCheck = refine.chooseButton.check;
    refine._bnzzQiOriginalBackup = refine.chooseButton.backup;
    refine.chooseButton.backup = function (links, player) {
        const info = lib.skill._tiLian._bnzzQiOriginalBackup(links, player);
        if (player.hasSkill(luoke_pool)) {
            const owner = player;
            const originalContentBefore = info.contentBefore;
            const originalContentAfter = info.contentAfter;
            info.contentBefore = async function (event) {
                owner._bnzzQiRefineSuppressPoolAudio = true;
                if (owner.hasSkill('bnzz_qi_ceLiuChongNeng')) {
                    const use = event.parent;
                    // The core writes links on the content child, not on useSkillAfter.
                    if (use)
                        use.bnzz_qi_refinedStones = Array.from(lib.skill._tiLian_backup.links || []);
                }
                if (typeof originalContentBefore === 'function')
                    await originalContentBefore.apply(this, arguments);
            };
            info.contentAfter = async function () {
                try {
                    if (typeof originalContentAfter === 'function')
                        await originalContentAfter.apply(this, arguments);
                }
                finally {
                    delete owner._bnzzQiRefineSuppressPoolAudio;
                }
            };
        }
        return info;
    };
    refine.ai.order = function (item, player) {
        if (!player.hasSkill('bnzz_qi_ai')) {
            const original = lib.skill._tiLian._bnzzQiOriginalOrder;
            return typeof original === 'function' ? original(item, player) : original;
        }
        return lib.skill.bnzz_qi_ai.refineNeed(player) > 0 ? 7.6 : 0;
    };
    refine.ai.result.player = function (player) {
        if (!player.hasSkill('bnzz_qi_ai')) {
            const original = lib.skill._tiLian._bnzzQiOriginalResult;
            return typeof original === 'function' ? original(player) : original;
        }
        return lib.skill.bnzz_qi_ai.refineNeed(player) > 0 ? 2 : 0;
    };
    refine.chooseButton.check = function (button) {
        const player = _status.event.player;
        if (!player.hasSkill('bnzz_qi_ai')) return lib.skill._tiLian._bnzzQiOriginalCheck(button);
        return lib.skill.bnzz_qi_ai.refineStone(player, button.link);
    };
},
        package: {
            character: {
                connect: true,
                character: {
                    // 冰霜剑宗·散华
                    "bnzz_qi_bingShuangJianZong": [
                        "bnzz_qi_sanHua_name",
                        "jiGroup",
                        4,
                        [
                            "bnzz_qi_gongFangZhiRen",
                            "bnzz_qi_jiHanJianRen",
                            "bnzz_qi_jiaoCuoLianZhan",
                            "bnzz_qi_yuJianJiDao",
                            "bnzz_qi_shouHuJianLing",
                            "bnzz_qi_wuJinHanLiu",
                            "bnzz_qi_xuLi",
                            "bnzz_qi_renNai"
                        ],
                        [
                            bnzzQi_characterImage('bnzz_qi_bingShuangJianZong')
                        ]
                    ],

                    // 近卫枪手·伽纳
                    "bnzz_qi_jinWeiQiangShou": [gana_P + 'gaNa_name', 'jiGroup', 4,
                        [gana_blast, gana_P + 'shangTang', gana_P + 'shuangFaSheJi', gana_P + 'huWeiJiDong', gana_P + 'teZhuangDanYao'],
                        [bnzzQi_characterImage(gana_P + 'jinWeiQiangShou')]],

                    // 放逐骑士·扎克斯
                    "bnzz_qi_fangZhuQiShi": [zhakesi_P + 'zhaKeSi_name', 'jiGroup', 4.5,
                        [zhakesi_hammer, zhakesi_P + 'jingJiMiYi', zhakesi_P + 'hongLianYeHuo', zhakesi_P + 'fuWenZuDuan', zhakesi_P + 'chiSeJiMie'],
                        [bnzzQi_characterImage(zhakesi_P + 'fangZhuQiShi')]],

                    // 药剂学者·莎娜
                    "bnzz_qi_yaoJiXueZhe": [shana_P + 'shaNa_name', 'huanGroup', 3.5,
                        [shana_P + 'huiFuZhiJi', shana_P + 'dingDangBaoZha', shana_poisonSkill, shana_P + 'yingJiChuLi', shana_P + 'duBaoZhiJi'],
                        [bnzzQi_characterImage(shana_P + 'yaoJiXueZhe')]],

                    // 风云之灵·承月
                    "bnzz_qi_fengYunZhiLing": [chengyue_P + 'chengYue_name', 'huanGroup', 4.5,
                        [chengyue_P + 'ziRanBianHuan', chengyue_P + 'fengZhiYan', chengyue_book, chengyue_ring, chengyue_intensify, chengyue_cloud],
                        [bnzzQi_characterImage(chengyue_P + 'fengYunZhiLing')]],

                    // 求道者·九萌
                    "bnzz_qi_qiuDaoZhe": [jiumeng_P + 'jiuMeng_name', 'huanGroup', 5,
                        [jiumeng_P + 'shenSuFu', jiumeng_P + 'tianHuoFu', jiumeng_P + 'jieZhenBaMenTianDiFa', jiumeng_P + 'tianDiJian',
                            jiumeng_P + 'zhenMenLeiJi', jiumeng_P + 'yuanLiFanShi', jiumeng_P + 'wuLiangTianLei', jiumeng_energy],
                        [bnzzQi_characterImage(jiumeng_P + 'qiuDaoZhe')]],

                    // 狙击手·兰卡
                    "bnzz_qi_juJiShou": [lanka_P + 'lanKa_name', 'yongGroup', 4,
                        [lanka_P + 'xunMiZhanJi', lanka_P + 'zhuangTian', lanka_P + 'zhiYuanSheJi', lanka_P + 'kuaiSuZhuangTian', lanka_P + 'niZongJuJi', lanka_bullets],
                        [bnzzQi_characterImage(lanka_P + 'juJiShou')]],

                    // 供能技师·萝可
                    "bnzz_qi_gongNengJiShi": [luoke_P + 'luoKe_name', 'yongGroup', 5,
                        [luoke_P + 'nengYuanWeiHu', luoke_P + 'ceLiuChongNeng', luoke_P + 'xingNengZhuanHuan', luoke_extra, luoke_P + 'nengJiFenLiu', luoke_P + 'gaoNengShuSong', luoke_pool],
                        [bnzzQi_characterImage(luoke_P + 'gongNengJiShi')]],

                    // 回响乐师·恩普洛斯
                    "bnzz_qi_huiXiangYueShi": [enpuluosi_name, 'yongGroup', 5, [enpuluosi_glow, enpuluosi_wall, enpuluosi_note, enpuluosi_crescendo, enpuluosi_orchestra, enpuluosi_resonance, enpuluosi_rhythm], [bnzzQi_characterImage(enpuluosi_id)]],

                    // 精灵斥候·阿芙洛蒂亚
                    "bnzz_qi_jingLingChiHou": [afuro_P + 'aFuLuoDiYa_name', 'shengGroup', 4,
                        [afuro_P + 'shanShuoZhiGuang', afuro_P + 'xianXingZhenCha', afuro_P + 'jiSuMoSha', afuro_retreat, afuro_barrier, afuro_flash],
                        [bnzzQi_characterImage(afuro_P + 'jingLingChiHou')]],

                    // 翎羽骑士·洛肯·煌
                    "bnzz_qi_lingYuQiShi": [luoken_P + 'luoKen_name', 'shengGroup', 3.5,
                        [luoken_P + 'dunJi', luoken_P + 'zhuangBeiJianCha', luoken_P + 'zhanShuChongFeng', luoken_P + 'lvJiJingShen', luoken_P + 'zhanShiXiuZheng'],
                        [bnzzQi_characterImage(luoken_P + 'lingYuQiShi')]],

                    // 海神祭司·让·梅莎拉
                    "bnzz_qi_haiShenJiSi": [meishala_P + 'meiShaLa_name', 'shengGroup', 4,
                        [meishala_P + 'daHaiZhuFu', meishala_P + 'shenLiCiFu', meishala_wave, meishala_tide, meishala_surge, meishala_P + 'haiShenQingYu'],
                        [bnzzQi_characterImage(meishala_P + 'haiShenJiSi')]],

                    // 不死者·帕丁
                    "bnzz_qi_buSiZhe": [pading_P + 'paDing_name', 'xueGroup', 4,
                        [pading_P + 'zhanYiRanShao', pading_P + 'huiXuanJi', pading_moon, pading_P + 'lingHunZhenLie', pading_thorns, pading_P + 'qianRenSaoDang', pading_blood, pading_soul],
                        [bnzzQi_characterImage(pading_P + 'buSiZhe')]],

                    // 灼焰舞者·炙霞
                    "bnzz_qi_zhuoYanWuZhe": [zhixia_P + 'zhiXia_name', 'xueGroup', 4.5,
                        [zhixia_P + 'yeZhiYouHuo', zhixia_P + 'baiYanDan', zhixia_P + 'ranShaoDaiJin', zhixia_scatter, zhixia_P + 'hunPoJiQu', zhixia_P + 'jiuZhuanShanWu', zhixia_ghost],
                        [bnzzQi_characterImage(zhixia_P + 'zhuoYanWuZhe')]],

                    // 织魔者·蕾乌
                    "bnzz_qi_zhiMoZhe": [leiwu_name, 'xueGroup', 5, [leiwu_soul, leiwu_weave, leiwu_line, leiwu_rest, leiwu_frenzy, leiwu_eye, "bnzz_qi_guangWang_description", "bnzz_qi_anWang_description", leiwu_bind], [bnzzQi_characterImage(leiwu_id)]]
                },
                translate: {
                    '百年战争·序章': '百年战争·序章',
                    // 冰霜剑宗·散华
                    "百年战争·序章": "百年战争·序章",
                    "bnzz_qi_bingShuangJianZong": "冰霜剑宗",
                    "bnzz_qi_sanHua_name": "散华",

                    // 近卫枪手·伽纳
                    "bnzz_qi_jinWeiQiangShou": '近卫枪手',
                    "bnzz_qi_gaNa_name": '伽纳',

                    // 放逐骑士·扎克斯
                    "bnzz_qi_fangZhuQiShi": '放逐骑士',
                    "bnzz_qi_zhaKeSi_name": '扎克斯',

                    // 药剂学者·莎娜
                    "bnzz_qi_yaoJiXueZhe": '药剂学者',
                    "bnzz_qi_shaNa_name": '莎娜',

                    // 风云之灵·承月
                    "bnzz_qi_fengYunZhiLing": '风云之灵',
                    "bnzz_qi_chengYue_name": '承月',

                    // 求道者·九萌
                    "bnzz_qi_qiuDaoZhe": '求道者',
                    "bnzz_qi_jiuMeng_name": '九萌',

                    // 狙击手·兰卡
                    "bnzz_qi_juJiShou": '狙击手',
                    "bnzz_qi_lanKa_name": '兰卡',

                    // 供能技师·萝可
                    "bnzz_qi_gongNengJiShi": '供能技师',
                    "bnzz_qi_luoKe_name": '萝可',

                    // 回响乐师·恩普洛斯
                    "bnzz_qi_huiXiangYueShi": '回响乐师',
                    "bnzz_qi_enPuLuoSi_name": '恩普洛斯',

                    // 精灵斥候·阿芙洛蒂亚
                    "bnzz_qi_jingLingChiHou": '精灵斥候',
                    "bnzz_qi_aFuLuoDiYa_name": '阿芙洛蒂亚',

                    // 翎羽骑士·洛肯·煌
                    "bnzz_qi_lingYuQiShi": '翎羽骑士',
                    "bnzz_qi_luoKen_name": '洛肯·煌',

                    // 海神祭司·让·梅莎拉
                    "bnzz_qi_haiShenJiSi": '海神祭司',
                    "bnzz_qi_meiShaLa_name": '让·梅莎拉',

                    // 不死者·帕丁
                    "bnzz_qi_buSiZhe": '不死者',
                    "bnzz_qi_paDing_name": '帕丁',

                    // 灼焰舞者·炙霞
                    "bnzz_qi_zhuoYanWuZhe": '灼焰舞者',
                    "bnzz_qi_zhiXia_name": '炙霞',

                    // 织魔者·蕾乌
                    "bnzz_qi_zhiMoZhe": '织魔者',
                    "bnzz_qi_leiWu_name": '蕾乌'
                }
            },
            skill: {
                skill: {
                    // 冰霜剑宗·散华
                    "bnzz_qi_gongFangZhiRen": {
                        audio: "ext:百年战争·序章/audio/skill/bingShuangJianZong/gongFangZhiRen.mp3",
                        trigger: { player: 'gongJiShi' },
                        forced: true,
                        filter: function (event, player) {
                            if (event.yingZhan === true)
                                return false;
                            const action = sanhua_attackAction(event, player);
                            return !action || action.bnzz_qi_jiaoCuoLianZhan !== true;
                        },
                        content: async function (event, trigger, player) {
                            await player.addZhiShiWu('bnzz_qi_xuLi', 1);
                        },
                        group: 'bnzz_qi_gongFangZhiRen_renNai',
                        subSkill: {
                            renNai: {
                                audio: "ext:百年战争·序章/audio/skill/bingShuangJianZong/gongFangZhiRen.mp3",
                                trigger: { player: 'chengShouShangHaiAfter' },
                                forced: true,
                                filter: function (event) { return event.num > 0; },
                                content: async function (event, trigger, player) {
                                    // Counterattack damage during the combo still earns endurance.
                                    await player.addZhiShiWu('bnzz_qi_renNai', 1);
                                }
                            }
                        }
                    },
                    "bnzz_qi_jiHanJianRen": {
                        audio: "ext:百年战争·序章/audio/skill/bingShuangJianZong/jiHanJianRen.mp3",
                        trigger: { player: 'gongJiMingZhong' },
                        filter: function (event, player) {
                            return event.yingZhan !== true;
                        },
                        cost: async function (event, trigger, player) {
                            event.result = await player.chooseCard('h', 1, '极寒剑刃：弃1张水系牌【展示】，本次攻击伤害+1', function (card, player) {
                                return get.xiBie(card) === 'shui' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_jiHanJianRen');
                            }).set('bnzzQiBenefit', get.damageEffect2(trigger.target, player, 1))
                                .set('ai', function (card) {
                                return _status.event.bnzzQiBenefit > 0 ? lib.skill.bnzz_qi_ai.costValue(card, _status.event.player, 10) : 0;
                            }).forResult();
                        },
                        content: async function (event, trigger, player) {
                            if (!event.cards || event.cards.length !== 1 || !player.getCards('h').includes(event.cards[0]) ||
                                get.xiBie(event.cards[0]) !== 'shui' || !lib.filter.cardDiscardable(event.cards[0], player, 'bnzz_qi_jiHanJianRen'))
                                return;
                            await player.discard(event.cards).set('showCards', true);
                            trigger.changeDamageNum(1);
                        }
                    },
                    "bnzz_qi_jiaoCuoLianZhan": {
                        audio: "ext:百年战争·序章/audio/skill/bingShuangJianZong/jiaoCuoLianZhan.mp3",
                        trigger: { player: 'gongJiEnd' },
                        usable: 1,
                        filter: function (event, player) {
                            return !!sanhua_attackAction(event, player) && player.countZhiShiWu('bnzz_qi_xuLi') >= 2;
                        },
                        cost: async function (event, trigger, player) {
                            event.result = await player.chooseBool('交错连斩：移除2点【蓄力】，额外+1【攻击行动】？')
                                .set('choice', lib.skill.bnzz_qi_ai.attacks(player).length > 0).forResult();
                        },
                        content: async function (event, trigger, player) {
                            if (player.countZhiShiWu('bnzz_qi_xuLi') < 2)
                                return;
                            await player.removeZhiShiWu('bnzz_qi_xuLi', 2);
                            player.addExtraXingDong({
                                xingDong: 'gongJi',
                                bnzz_qi_jiaoCuoLianZhan: true,
                                prompt: '交错连斩：额外攻击（本次主动攻击不获得蓄力）'
                            });
                            player.syncStorage('extraXingDong');
                            game.log(player, '因【交错连斩】额外+1【攻击行动】');
                        }
                    },
                    "bnzz_qi_yuJianJiDao": {
                        audio: "ext:百年战争·序章/audio/skill/bingShuangJianZong/yuJianJiDao.mp3",
                        trigger: { target: 'gongJiMingZhong' },
                        usable: 1,
                        filter: function (event, player) {
                            return event.yingZhan !== true && player.countCards('h') > 3;
                        },
                        cost: async function (event, trigger, player) {
                            event.result = await player.chooseCard('h', 1, '御剑极道：弃1张法术牌【展示】', function (card, player) {
                                return get.type(card) === 'faShu' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_yuJianJiDao');
                            }).set('ai', function (card) { return lib.skill.bnzz_qi_ai.costValue(card, _status.event.player, 11); }).forResult();
                        },
                        content: async function (event, trigger, player) {
                            if (!event.cards || event.cards.length !== 1 || !player.getCards('h').includes(event.cards[0]) ||
                                get.type(event.cards[0]) !== 'faShu' || !lib.filter.cardDiscardable(event.cards[0], player, 'bnzz_qi_yuJianJiDao'))
                                return;
                            await player.discard(event.cards).set('showCards', true);
                        }
                    },
                    "bnzz_qi_shouHuJianLing": {
                        audio: "ext:百年战争·序章/audio/skill/bingShuangJianZong/shouHuJianLing.mp3",
                        trigger: { global: 'shouDaoShangHai' },
                        usable: 1,
                        filter: function (event, player) {
                            return event.num > 0 && !!event.player && event.player.side === player.side &&
                                player.countZhiShiWu('bnzz_qi_renNai') > 0;
                        },
                        cost: async function (event, trigger, player) {
                            const count = player.countZhiShiWu('bnzz_qi_renNai');
                            const controls = Array.from({ length: count }, function (_, i) { return '移除' + (i + 1) + '点忍耐'; });
                            controls.push('取消');
                            const drawRoom = Math.max(0, player.getHandcardLimit() - player.countCards('h'));
                            const preferred = Math.max(1, Math.min(count, trigger.num, drawRoom + 1));
                            const result = await player.chooseControl(controls)
                                .set('prompt', '守护剑灵：抵御等量伤害，然后你摸（移除量－1）张牌')
                                .set('choice', preferred - 1).forResult() || {};
                            const index = controls.indexOf(result.control);
                            event.result = { bool: index >= 0 && index < count, cost_data: index + 1 };
                        },
                        content: async function (event, trigger, player) {
                            const count = event.cost_data;
                            if (!Number.isInteger(count) || count < 1 || player.countZhiShiWu('bnzz_qi_renNai') < count)
                                return;
                            await player.removeZhiShiWu('bnzz_qi_renNai', count);
                            trigger.changeDamageNum(-count);
                            // Complete this draw here even if prevention reduced the damage to zero.
                            if (count > 1)
                                await player.draw(count - 1);
                        }
                    },
                    "bnzz_qi_wuJinHanLiu": {
                        audio: "ext:百年战争·序章/audio/skill/bingShuangJianZong/wuJinHanLiu.mp3",
                        trigger: { player: 'gongJiBefore' },
                        filter: function (event, player) {
                            return event.yingZhan !== true && !!event.card && get.mingGe(event.card) === 'ji' && player.canBiShaShuiJing();
                        },
                        cost: async function (event, trigger, player) {
                            event.result = await player.chooseBool('无尽寒流：支付1【水晶】，使本次攻击无法应战，并在行动结束时可转换1点指示物？')
                                .set('choice', !!trigger.target && trigger.target.side !== player.side && trigger.canYingZhan !== false)
                                .forResult();
                        },
                        content: async function (event, trigger, player) {
                            if (!player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            trigger.wuFaYingZhan();
                            trigger.customArgs = trigger.customArgs || {};
                            trigger.customArgs.bnzz_qi_wuJinHanLiu = true;
                        },
                        ai: { shuiJing: true },
                        group: 'bnzz_qi_wuJinHanLiu_convert',
                        subSkill: {
                            convert: {
                                audio: false,
                                trigger: { player: 'gongJiEnd' },
                                filter: function (event, player) {
                                    return !!sanhua_attackAction(event, player) && !!event.customArgs &&
                                        event.customArgs.bnzz_qi_wuJinHanLiu === true && sanhua_conversionOptions(player).length > 0;
                                },
                                cost: async function (event, trigger, player) {
                                    const controls = sanhua_conversionOptions(player);
                                    controls.push('不转换');
                                    const preferred = player.countZhiShiWu('bnzz_qi_xuLi') < 2 && player.canGongJi() ? '忍耐→蓄力' : '蓄力→忍耐';
                                    const result = await player.chooseControl(controls)
                                        .set('prompt', '无尽寒流：可将1点指示物转换为另一种')
                                        .set('choice', Math.max(0, controls.indexOf(preferred))).forResult() || {};
                                    event.result = {
                                        bool: result.control !== '不转换' && controls.includes(result.control),
                                        cost_data: result.control
                                    };
                                },
                                content: async function (event, trigger, player) {
                                    if (!sanhua_conversionOptions(player).includes(event.cost_data))
                                        return;
                                    const toEndurance = event.cost_data === '蓄力→忍耐';
                                    await player.removeZhiShiWu(toEndurance ? 'bnzz_qi_xuLi' : 'bnzz_qi_renNai', 1);
                                    await player.addZhiShiWu(toEndurance ? 'bnzz_qi_renNai' : 'bnzz_qi_xuLi', 1);
                                }
                            }
                        }
                    },
                    "bnzz_qi_xuLi": {
                        intro: { name: '蓄力', content: 'mark', max: 3 },
                        onremove: 'storage',
                        markimage: 'extension/百年战争·序章/mark_bnzz_xuLi.webp'
                    },
                    "bnzz_qi_renNai": {
                        intro: { name: '忍耐', content: 'mark', max: 2 },
                        onremove: 'storage',
                        markimage: 'extension/百年战争·序章/mark_bnzz_renNai.webp'
                    },

                    // 近卫枪手·伽纳
                    "bnzz_qi_baoPoDanYao": {
                        audio: "ext:百年战争·序章/audio/skill/jinWeiQiangShou/baoPoDanYao.mp3",
                        trigger: { player: 'gongJiShi' },
                        filter(event, player) {
                            return event.yingZhan !== true && !gana_blastState(event);
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseCard('h', 1, '爆破弹药：弃1张同系牌【展示】，本次攻击伤害+1', (card, player) => get.xiBie(card) === _status.event.bnzzQiAttackSuit &&
                                lib.filter.cardDiscardable(card, player, 'bnzz_qi_baoPoDanYao'))
                                .set('bnzzQiAttackSuit', get.xiBie(trigger.card))
                                .set('bnzzQiBenefit', get.damageEffect2(trigger.target, player, 1))
                                .set('ai', card => _status.event.bnzzQiBenefit > 0 ? lib.skill.bnzz_qi_ai.costValue(card, _status.event.player, 10) : 0)
                                .forResult();
                        },
                        async content(event, trigger, player) {
                            if (event.cards?.length === 1)
                                await gana_loadBlast(player, trigger, event.cards[0]);
                        },
                        group: gana_blast + '_miss',
                        subSkill: {
                            miss: {
                                audio: false,
                                trigger: { source: 'gongJiWeiMingZhong' },
                                forced: true,
                                filter(event) {
                                    const data = gana_blastState(event);
                                    return event.yingZhan !== true && !!data && !data.resolved;
                                },
                                async content(event, trigger, player) {
                                    const data = gana_blastState(trigger);
                                    if (!data || data.resolved)
                                        return;
                                    data.resolved = true;
                                    const target = trigger.player && trigger.player !== player ? trigger.player :
                                        game.findPlayer(current => current.playerid === data.targetId);
                                    const amount = data.spell ? 2 : 1;
                                    // These are skill-created attack damage, not new active attacks.
                                    if (target?.isIn())
                                        await target.damage(amount, player, 'nocard');
                                    if (player.isIn())
                                        await player.damage(amount, player, 'nocard');
                                }
                            }
                        }
                    },
                    "bnzz_qi_shangTang": {
                        audio: "ext:百年战争·序章/audio/skill/jinWeiQiangShou/shangTang.mp3",
                        type: 'qiDong',
                        trigger: { player: 'qiDong' },
                        async cost(event, trigger, player) {
                            const result = await player.chooseControl(['摸1张牌', '摸3张牌', '取消'])
                                .set('prompt', '上膛：摸牌后横置，进入瞄准形态')
                                .set('ai', () => {
                                const p = _status.event.player;
                                const room = p.getHandcardLimit() - p.countCards('h');
                                if (room < 1 || !lib.skill.bnzz_qi_ai.attacks(p).length)
                                    return '取消';
                                return room >= 3 ? '摸3张牌' : '摸1张牌';
                            }).forResult();
                            const amount = result?.control === '摸1张牌' ? 1 : result?.control === '摸3张牌' ? 3 : 0;
                            event.result = { bool: amount > 0, cost_data: amount };
                        },
                        async content(event, trigger, player) {
                            if (![1, 3].includes(event.cost_data))
                                return;
                            await player.draw(event.cost_data);
                            await player.hengZhi();
                            if (player.isHengZhi())
                                player.addSkill(gana_aim);
                        }
                    },
                    "bnzz_qi_shuangFaSheJi": {
                        audio: "ext:百年战争·序章/audio/skill/jinWeiQiangShou/shuangFaSheJi.mp3",
                        trigger: { player: 'gongJiMingZhong' },
                        forced: true,
                        filter(event, player) { return event.yingZhan !== true && gana_aiming(player); },
                        async content(event, trigger, player) {
                            const opponents = game.filterPlayer(target => target.side !== player.side && target !== trigger.target);
                            if (opponents.length) {
                                const result = await player.chooseTarget('双发射击：对另一名对手造成2点攻击伤害', true, (card, player, target) => target.side !== player.side && target !== _status.event.bnzzQiAttackTarget)
                                    .set('bnzzQiAttackTarget', trigger.target)
                                    .set('ai', target => get.damageEffect2(target, _status.event.player, 2))
                                    .forResult();
                                const target = result?.targets?.[0];
                                if (target?.isIn())
                                    await target.damage(2, player, 'nocard');
                            }
                            await gana_leaveAim(player);
                        }
                    },
                    "bnzz_qi_huWeiJiDong": {
                        audio: "ext:百年战争·序章/audio/skill/jinWeiQiangShou/huWeiJiDong.mp3",
                        trigger: { global: 'gongJiMingZhong' },
                        usable: 1,
                        filter(event, player) {
                            return event.yingZhan !== true && event.target && event.target !== player &&
                                event.target.side === player.side;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseCard('h', 1, '护卫机动：弃1张风系牌【展示】，令被命中的队友弃1张牌', (card, player) => get.xiBie(card) === 'feng' &&
                                lib.filter.cardDiscardable(card, player, 'bnzz_qi_huWeiJiDong'))
                                .set('ai', card => lib.skill.bnzz_qi_ai.costValue(card, _status.event.player, 10)).forResult();
                        },
                        async content(event, trigger, player) {
                            const card = event.cards?.[0];
                            if (!card || get.xiBie(card) !== 'feng' || !gana_discardable(card, player, gana_P + 'huWeiJiDong'))
                                return;
                            await player.discard([card]).set('showCards', true);
                            const target = trigger.target;
                            if (target?.isIn() && target.countCards('h', card => lib.filter.cardDiscardable(card, target)) > 0) {
                                await target.chooseToDiscard('h', 1, true, '护卫机动：弃1张牌');
                            }
                            if (gana_aiming(player))
                                await gana_leaveAim(player);
                        }
                    },
                    "bnzz_qi_teZhuangDanYao": {
                        audio: "ext:百年战争·序章/audio/skill/jinWeiQiangShou/teZhuangDanYao.mp3",
                        trigger: { player: 'gongJiBefore' },
                        filter(event, player) { return event.yingZhan !== true && player.canBiShaShuiJing(); },
                        async cost(event, trigger, player) {
                            const controls = ['无法应战，伤害-1'];
                            if (!gana_blastState(trigger))
                                controls.push('发动爆破弹药');
                            controls.push('取消');
                            const choice = await player.chooseControl(controls)
                                .set('prompt', '特装弹药：支付1【水晶】并选择效果')
                                .set('bnzzQiUseful', trigger.target?.side !== player.side && trigger.canYingZhan !== false && (lib.skill.bnzz_qi_ai.attackDamage(trigger) > 1 || gana_aiming(player)))
                                .set('bnzzQiBlastUseful', controls.includes('发动爆破弹药') && trigger.target?.side !== player.side && get.damageEffect2(trigger.target, player, 1) > 0)
                                .set('ai', () => _status.event.bnzzQiUseful ? '无法应战，伤害-1' : _status.event.bnzzQiBlastUseful ? '发动爆破弹药' : '取消')
                                .forResult();
                            if (!choice || !controls.includes(choice.control) || choice.control === '取消') {
                                event.result = { bool: false };
                                return;
                            }
                            event.result = { bool: true, cost_data: choice.control === '发动爆破弹药' ? 'blast' : 'pierce' };
                        },
                        async content(event, trigger, player) {
                            if (!player.canBiShaShuiJing())
                                return;
                            if (event.cost_data === 'blast') {
                                if (gana_blastState(trigger))
                                    return;
                                await player.removeBiShaShuiJing();
                                await gana_loadBlast(player, trigger, null, true);
                            }
                            else if (event.cost_data === 'pierce') {
                                await player.removeBiShaShuiJing();
                                trigger.wuFaYingZhan();
                                trigger.changeDamageNum(-1);
                            }
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_miaoZhunXingTai": {
                        audio: false,
                        mark: true,
                        markimage: 'extension/百年战争·序章/mark_bnzz_miaoZhunXingTai.webp',
                        intro: { name: '瞄准形态', content: '受到主动攻击的伤害额外+1；（主动攻击命中时）发动双发射击并重置。', nocount: true },
                        trigger: { player: 'shouDaoShangHai' },
                        forced: true,
                        filter(event, player) { return gana_aiming(player) && gana_activeAttackDamage(event); },
                        async content(event, trigger) { trigger.changeDamageNum(1); },
                        group: gana_aim + '_reset',
                        subSkill: {
                            reset: {
                                audio: false,
                                trigger: { player: 'chongZhiAfter' },
                                forced: true,
                                popup: false,
                                async content(event, trigger, player) { player.removeSkill(gana_aim); }
                            }
                        }
                    },

                    // 放逐骑士·扎克斯
                    "bnzz_qi_zhouFuZhiChui": {
                        audio: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/zhouFuZhiChui.mp3',
                        type: 'qiDong', trigger: { player: 'qiDong' },
                        markimage: 'extension/百年战争·序章/mark_bnzz_zhouFuZhiChui.webp',
                        intro: { name: '咒赋之锤', content(storage, player) { return zhakesi_used(player).join('；') || '本回合尚未发动咒赋效果'; } },
                        filter(event, player) { return get.zhanJi(player.side).length > 0 && zhakesi_available(player).length > 0; },
                        async cost(event, trigger, player) {
                            const choices = zhakesi_available(player);
                            if (choices.length === 2 && get.zhanJi(player.side).length >= 2)
                                choices.push('两项都发动');
                            choices.push('取消');
                            const result = await player.chooseControl(choices).set('prompt', '咒赋之锤：每项效果消耗我方战绩区1【星石】').set('bnzzQiReady', lib.skill.bnzz_qi_ai.attacks(player).length > 0).set('ai', () => _status.event.bnzzQiReady ? 0 : '取消').forResult() || {};
                            event.result = { bool: choices.includes(result.control) && result.control !== '取消', cost_data: result.control };
                        },
                        async content(event, trigger, player) {
                            const effects = event.cost_data === '两项都发动' ? [zhakesi_damageLabel, zhakesi_pursuitLabel] : [event.cost_data];
                            if (effects.some(label => !zhakesi_available(player).includes(label)) || get.zhanJi(player.side).length < effects.length)
                                return;
                            const paid = await player.chooseRemoveZhanJi(effects.length).set('side', player.side).set('forced', true).forResult();
                            if (!paid || !paid.bool)
                                return;
                            for (const effect of effects)
                                zhakesi_grant(player, effect);
                        },
                        group: [zhakesi_hammer + '_track', zhakesi_hammer + '_boost', zhakesi_hammer + '_cap', zhakesi_hammer + '_miss', zhakesi_hammer + '_clear'],
                        subSkill: {
                            track: {
                                audio: false, trigger: { player: 'gongJiBefore' }, forced: true, firstDo: true, priority: 100,
                                popup: false,
                                filter(event) { return event.yingZhan !== true; },
                                async content(event, trigger, player) {
                                    const count = player.storage[zhakesi_countKey] || 0;
                                    trigger.customArgs = trigger.customArgs || {};
                                    trigger.customArgs.bnzz_qi_firstAttack = count === 0;
                                    player.storage[zhakesi_countKey] = count + 1;
                                    player.syncStorage(zhakesi_countKey);
                                }
                            },
                            boost: {
                                audio: false, trigger: { player: 'gongJiSheZhi' }, forced: true,
                                filter(event, player) { return zhakesi_used(player).includes(zhakesi_damageLabel); },
                                async content(event, trigger) {
                                    trigger.changeDamageNum(2);
                                    trigger.customArgs = trigger.customArgs || {};
                                    trigger.customArgs.bnzz_qi_zhouFuDamage = true;
                                }
                            },
                            cap: {
                                audio: false, trigger: { source: 'zaoChengShangHai' }, forced: true, popup: false,
                                filter(event, player) {
                                    const attack = zhakesi_originalAttack(event, player);
                                    return !!attack && !!attack.customArgs && attack.customArgs.bnzz_qi_zhouFuDamage === true;
                                },
                                async content(event, trigger) {
                                    // Core forwards the signed morale cap through damage/draw/discard.
                                    trigger.shiQiMax = Math.max(typeof trigger.shiQiMax === 'number' ? trigger.shiQiMax : -Infinity, -1);
                                }
                            },
                            miss: {
                                audio: false, trigger: { source: 'gongJiWeiMingZhong' }, forced: true,
                                filter(event, player) {
                                    return event.yingZhan !== true && zhakesi_used(player).includes(zhakesi_pursuitLabel) && !!event.customArgs &&
                                        event.customArgs.bnzz_qi_firstAttack === true && !event.customArgs.bnzz_qi_zhouFuPursuit;
                                },
                                async content(event, trigger, player) {
                                    trigger.customArgs.bnzz_qi_zhouFuPursuit = true;
                                    await player.draw(1);
                                    await player.chooseToDiscard('h', 2, true, '咒赋之锤：弃2张牌');
                                    player.addGongJi();
                                }
                            },
                            clear: {
                                audio: false, trigger: { global: ['phaseBefore', 'phaseAfter'] }, forced: true,
                                popup: false, firstDo: true,
                                async content(event, trigger, player) {
                                    delete player.storage[zhakesi_usedKey];
                                    delete player.storage[zhakesi_countKey];
                                    player.syncStorage(zhakesi_usedKey);
                                    player.syncStorage(zhakesi_countKey);
                                    player.unmarkSkill(zhakesi_hammer);
                                }
                            }
                        }
                    },
                    "bnzz_qi_jingJiMiYi": {
                        audio: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/jingJiMiYi.mp3', trigger: { player: 'gongJiBefore' }, usable: 1,
                        filter(event, player) { return event.yingZhan !== true && game.hasPlayer(target => target !== player && target.side === player.side); },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseTarget('荆棘秘仪：改为攻击一名队友，本次伤害-1', function (card, player, target) {
                                return target !== player && target.side === player.side;
                            }).set('bnzzQiAttackSuit', get.xiBie(trigger.card)).set('bnzzQiDamage', Math.max(0, lib.skill.bnzz_qi_ai.attackDamage(trigger) - 1)).set('bnzzQiCounterable', trigger.canYingZhan !== false && get.xiBie(trigger.card) !== 'an').set('ai', function (target) {
                                const e = _status.event;
                                const counter = target.getCards('h').some(c => get.type(c) === 'gongJi' && (get.xiBie(c) === 'an' || get.xiBie(c) === e.bnzzQiAttackSuit));
                                return e.bnzzQiCounterable && counter && lib.skill.bnzz_qi_ai.safe(target, e.bnzzQiDamage) ? 3 : 0;
                            }).forResult();
                        },
                        async content(event, trigger, player) {
                            const target = event.targets && event.targets[0];
                            if (!target || !target.isIn() || target === player || target.side !== player.side)
                                return;
                            trigger.target = target;
                            trigger.oriTarget = target;
                            trigger.targets = [target];
                            trigger.changeDamageNum(-1);
                            // The core counterattack selector still chooses the defender's opponents.
                        }
                    },
                    "bnzz_qi_hongLianYeHuo": {
                        audio: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/hongLianYeHuo.mp3', trigger: { player: 'gongJiShi' },
                        filter(event, player) {
                            return event.yingZhan !== true && !!event.card && get.xiBie(event.card) === 'huo' &&
                                ((event.target && event.target.countZhiLiao() > 0) || zhakesi_available(player).length > 0);
                        },
                        async cost(event, trigger, player) {
                            const choices = [];
                            if (trigger.target && trigger.target.countZhiLiao() > 0)
                                choices.push('移除目标治疗');
                            if (zhakesi_available(player).length)
                                choices.push('发动咒赋效果');
                            choices.push('取消');
                            const result = await player.chooseControl(choices).set('prompt', '红莲业火：选择一项').set('bnzzQiEnemy', trigger.target?.side !== player.side).set('ai', () => {
                                const e = _status.event;
                                if (e.controls.includes('发动咒赋效果')) return '发动咒赋效果';
                                return e.bnzzQiEnemy ? '移除目标治疗' : '取消';
                            }).forResult() || {};
                            event.result = { bool: choices.includes(result.control) && result.control !== '取消', cost_data: result.control };
                        },
                        async content(event, trigger, player) {
                            if (event.cost_data === '移除目标治疗' && trigger.target && trigger.target.countZhiLiao() > 0)
                                await trigger.target.changeZhiLiao(-1);
                            else if (event.cost_data === '发动咒赋效果')
                                await zhakesi_grantChoice(player);
                        }
                    },
                    "bnzz_qi_fuWenZuDuan": {
                        audio: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/fuWenZuDuan.mp3', trigger: { player: 'gongJiMingZhong' }, usable: 1,
                        filter(event, player) {
                            return event.yingZhan !== true && !!event.target && event.target.countCards('h') > 0 && player.countCards('h') > 0 && player.canBiShaShuiJing();
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('符文阻断：支付1【水晶】，取消本次伤害、交换各1张手牌并转换我方战绩？')
                                .set('choice', !!trigger.target && trigger.target.side === player.side).forResult();
                        },
                        async content(event, trigger, player) {
                            const target = trigger.target;
                            if (!target || !target.isIn() || target.countCards('h') < 1 || player.countCards('h') < 1 || !player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            trigger.setDamageNum(0);
                            const own = await player.chooseCard('h', 1, true, '符文阻断：选择1张手牌用于交换')
                                .set('ai', function (card) { return 7 - get.value(card); }).forResultCards() || [];
                            const other = await target.chooseCard('h', 1, true, '符文阻断：选择1张手牌用于交换')
                                .set('ai', function (card) { return 7 - get.value(card); }).forResultCards() || [];
                            if (own.length && other.length)
                                await player.swapHandcards(target, own, other);
                            const pool = get.zhanJi(player.side), choices = [];
                            if (pool.includes('baoShi'))
                                choices.push('1宝石→2水晶');
                            if (pool.filter(stone => stone === 'shuiJing').length >= 2)
                                choices.push('2水晶→1宝石');
                            if (!choices.length)
                                return;
                            const choice = await player.chooseControl(choices).set('prompt', '符文阻断：转换我方战绩区星石').set('choice', 0).forResult() || {};
                            if (choice.control === '1宝石→2水晶' && get.zhanJi(player.side).includes('baoShi')) {
                                await player.removeZhanJi('baoShi', 1);
                                await player.addZhanJi('shuiJing', 2);
                            }
                            else if (choice.control === '2水晶→1宝石' && get.zhanJi(player.side).filter(stone => stone === 'shuiJing').length >= 2) {
                                await player.removeZhanJi('shuiJing', 2);
                                await player.addZhanJi('baoShi', 1);
                            }
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_chiSeJiMie": {
                        audio: 'ext:百年战争·序章/audio/skill/fangZhuQiShi/chiSeJiMie.mp3', trigger: { player: 'gongJiBefore' },
                        filter(event, player) { return event.yingZhan !== true && player.canBiShaBaoShi(); },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('赤色寂灭：支付1【宝石】，令本次攻击无法应战？')
                                .set('choice', !!trigger.target && trigger.target.side !== player.side && trigger.canYingZhan !== false).forResult();
                        },
                        async content(event, trigger, player) {
                            if (!player.canBiShaBaoShi())
                                return;
                            await player.removeBiShaBaoShi();
                            trigger.wuFaYingZhan();
                            if (!zhakesi_available(player).length || !player.countCards('h', card => get.type(card) === 'faShu' && lib.filter.cardDiscardable(card, player, zhakesi_P + 'chiSeJiMie')))
                                return;
                            const cards = await player.chooseCard('h', 1, '赤色寂灭：可额外弃1张法术牌，获得一个未发动的咒赋效果；技命格可强制命中', function (card, player) {
                                return get.type(card) === 'faShu' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_chiSeJiMie');
                            }).set('ai', function (card) { return 7 - get.value(card) + (get.mingGe(card) === 'ji' ? 2 : 0); }).forResultCards() || [];
                            if (!cards.length)
                                return;
                            const force = get.mingGe(cards[0]) === 'ji';
                            await player.discard(cards).set('showCards', true);
                            await zhakesi_grantChoice(player);
                            if (force)
                                trigger.qiangZhiMingZhong();
                        },
                        ai: { baoShi: true }
                    },

                    // 药剂学者·莎娜
                    "bnzz_qi_huiFuZhiJi": {
                        audio: "ext:百年战争·序章/audio/skill/shaNa/huiFuZhiJi.mp3",
                        type: 'faShu',
                        enable: 'faShu',
                        usable: 1,
                        position: 'h',
                        selectCard: 1,
                        discard: false,
                        lose: false,
                        filter(event, player) {
                            return player.countCards('h', card => get.xiBie(card) === 'shui' &&
                                shana_canDiscard(card, player, shana_P + 'huiFuZhiJi')) > 0;
                        },
                        filterCard(card, player) {
                            return get.xiBie(card) === 'shui' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_huiFuZhiJi');
                        },
                        filterTarget: true,
                        selectTarget: 1,
                        async content(event, trigger, player) {
                            const card = event.cards?.[0];
                            const target = event.target;
                            if (!target?.isIn() || !card || get.xiBie(card) !== 'shui' ||
                                !shana_canDiscard(card, player, shana_P + 'huiFuZhiJi'))
                                return;
                            await player.discard([card]).set('showCards', true);
                            if (target.isIn())
                                await target.changeZhiLiao(1, player);
                            await player.draw(1);
                            player.addGongJi();
                        },
                        check(card) { return 7 - get.value(card); },
                        ai: {
                            order: 4,
                            result: {
                                player: 1,
                                target(player, target) { return get.zhiLiaoEffect(target, 1); }
                            }
                        }
                    },
                    "bnzz_qi_dingDangBaoZha": {
                        audio: "ext:百年战争·序章/audio/skill/shaNa/dingDangBaoZha.mp3",
                        trigger: { player: 'gongJiAfter' },
                        usable: 1,
                        filter(event, player) { return !!shana_attackAction(event, player); },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('叮当爆炸：额外+1【法术行动】？')
                                .set('choice', player.canFaShu()).forResult();
                        },
                        async content(event, trigger, player) { player.addFaShu(); }
                    },
                    "bnzz_qi_duXingYinBao": {
                        audio: "ext:百年战争·序章/audio/skill/shaNa/duXingYinBao.mp3",
                        trigger: { global: 'zaoChengShangHai' },
                        usable: 1,
                        filter(event, player) {
                            const poison = shana_poisonDamage(event);
                            return !!poison && !poison[shana_poisonSkill]?.some(item => item.owner === player.playerid);
                        },
                        async cost(event, trigger, player) {
                            const poison = shana_poisonDamage(trigger);
                            if (!poison) {
                                event.result = { bool: false };
                                return;
                            }
                            event.result = await player.chooseCard('h', 1, '毒性引爆：弃1张与此中毒同系的牌【展示】，本次中毒伤害+1，并可回收此中毒', (card, player) => get.xiBie(card) === _status.event.bnzzQiPoisonSuit &&
                                lib.filter.cardDiscardable(card, player, 'bnzz_qi_duXingYinBao'))
                                .set('bnzzQiPoisonSuit', get.xiBie(poison.indexedData))
                                .set('bnzzQiBenefit', get.damageEffect2(trigger.player, player, 1))
                                .set('ai', card => _status.event.bnzzQiBenefit > 0 ? lib.skill.bnzz_qi_ai.costValue(card, _status.event.player, 10) : 0)
                                .forResult();
                        },
                        async content(event, trigger, player) {
                            const poison = shana_poisonDamage(trigger);
                            const card = event.cards?.[0];
                            if (!poison || !card || get.xiBie(card) !== get.xiBie(poison.indexedData) ||
                                !shana_canDiscard(card, player, shana_poisonSkill))
                                return;
                            const records = poison[shana_poisonSkill] || (poison[shana_poisonSkill] = []);
                            if (records.some(item => item.owner === player.playerid))
                                return;
                            // Keep the recovery permission on this single core event, not on a card
                            // name or persistent player storage. It expires with this poison event.
                            records.push({ owner: player.playerid, cardid: poison.indexedData.cardid, pending: true });
                            await player.discard([card]).set('showCards', true);
                            trigger.changeDamageNum(1);
                        },
                        group: shana_poisonSkill + '_recover',
                        subSkill: {
                            recover: {
                                audio: false,
                                trigger: { global: 'loseAfter' },
                                forced: true,
                                popup: false,
                                filter(event, player) { return !!shana_recoverablePoison(event, player); },
                                async content(event, trigger, player) {
                                    const pending = shana_recoverablePoison(trigger, player);
                                    if (!pending)
                                        return;
                                    // Consume the opportunity before gain/other nested movement can fire.
                                    pending.record.pending = false;
                                    const result = await player.chooseBool('毒性引爆：将此中毒牌加入手牌？')
                                        .set('choice', player.countCards('h') < player.getHandcardLimit()).forResult();
                                    if (result?.bool && get.position(pending.card, true) === 'd') {
                                        player.logSkill('bnzz_qi_duXingYinBao_recover');
                                        await player.gain(pending.card, 'gain2');
                                    }
                                }
                            }
                        }
                    },
                    "bnzz_qi_yingJiChuLi": {
                        audio: "ext:百年战争·序章/audio/skill/shaNa/yingJiChuLi.mp3",
                        trigger: { global: 'chengShouShangHai' },
                        usable: 1,
                        filter(event, player) {
                            return event.faShu === true && event.num > 1 && event.player?.side === player.side;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseCard('h', 1, '应急处理：弃1张地系牌【展示】，抵御1点本次法术伤害并摸1张牌', (card, player) => get.xiBie(card) === 'di' &&
                                lib.filter.cardDiscardable(card, player, 'bnzz_qi_yingJiChuLi'))
                                .set('ai', card => lib.skill.bnzz_qi_ai.room(_status.event.player, 1) >= 1 ? lib.skill.bnzz_qi_ai.costValue(card, _status.event.player, 11) : 0).forResult();
                        },
                        async content(event, trigger, player) {
                            const card = event.cards?.[0];
                            if (trigger.faShu !== true || trigger.num <= 1 || trigger.player?.side !== player.side ||
                                !card || get.xiBie(card) !== 'di' || !shana_canDiscard(card, player, shana_P + 'yingJiChuLi'))
                                return;
                            await player.discard([card]).set('showCards', true);
                            // Stage ⑤ before actual settlement; do not wait for ...After.
                            trigger.changeDamageNum(-1);
                            await player.draw(1);
                        }
                    },
                    "bnzz_qi_duBaoZhiJi": {
                        audio: "ext:百年战争·序章/audio/skill/shaNa/duBaoZhiJi.mp3",
                        type: 'faShu',
                        enable: 'faShu',
                        filter(event, player) {
                            return player.canBiShaShuiJing() && game.countPlayer(target => target.side !== player.side) >= 2;
                        },
                        selectTarget: 2,
                        filterTarget(card, player, target) { return target.side !== player.side; },
                        multitarget: true,
                        multiline: true,
                        async content(event, trigger, player) {
                            const targets = event.targets?.filter(target => target.isIn() && target.side !== player.side) || [];
                            if (targets.length !== 2 || targets[0] === targets[1] || !player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            let amount = 1;
                            if (game.hasPlayer(target => target.side === player.side && target.countNengLiangAll() > 0)) {
                                const result = await player.chooseTarget('毒爆制剂：可额外移除我方一名角色的1【能量】，令两次伤害各+1', (card, player, target) => target.side === player.side && target.countNengLiangAll() > 0)
                                    .set('ai', target => target.countNengLiang('shuiJing') > 0 ? 2 : 1).forResult();
                                const owner = result?.targets?.[0];
                                if (owner?.isIn() && owner.side === player.side && owner.countNengLiangAll() > 0) {
                                    const types = ['shuiJing', 'baoShi'].filter(type => owner.countNengLiang(type) > 0);
                                    let energy = types[0];
                                    if (types.length > 1) {
                                        const choice = await player.chooseControl(['水晶', '宝石'])
                                            .set('prompt', '毒爆制剂：选择额外移除的能量')
                                            .set('ai', () => '水晶').forResult();
                                        energy = choice?.control === '宝石' ? 'baoShi' : 'shuiJing';
                                    }
                                    if (owner.isIn() && owner.side === player.side && owner.countNengLiang(energy) > 0) {
                                        await owner.removeNengLiang(energy, 1);
                                        amount++;
                                    }
                                }
                            }
                            for (const target of targets.sortBySeat(player)) {
                                if (target.isIn())
                                    await target.faShuDamage(amount, player);
                            }
                        },
                        ai: {
                            shuiJing: true,
                            order: 4.2,
                            result: { target(player, target) { return get.damageEffect(target, 1); } }
                        }
                    },

                    // 风云之灵·承月
                    "bnzz_qi_ziRanBianHuan": {
                        audio: false,
                        trigger: { player: 'changeNengLiangAfter' },
                        forced: true,
                        filter(event) { return event.xingShi === 'baoShi' && event.num > 0; },
                        async content(event, trigger, player) {
                            if (player._bnzzQiChengYueRefineVoicePending)
                                player._bnzzQiChengYueRefineVoicePending.naturalTriggered = true;
                            await player.addNengLiang('shuiJing', 1);
                            await chengyue_forceDiscard(player, 1, '自然变幻：弃1张牌');
                            await player.draw(1);
                        }
                    },
                    "bnzz_qi_fengZhiYan": {
                        audio: false,
                        type: 'faShu', enable: 'faShu', position: 'h',
                        selectCard: 1, filterCard: true, discard: false, lose: false,
                        filter(event, player) { return player.countCards('h') > 0 && game.hasPlayer(target => target !== player); },
                        filterTarget(card, player, target) { return target !== player; },
                        async content(event, trigger, player) {
                            const card = event.cards?.[0];
                            const target = event.target;
                            if (!card || !player.getCards('h').includes(card) || !target?.isIn() || target === player)
                                return;
                            await player.give([card], target);
                            await player.draw(1);
                            await player.changeZhiLiao(1, player);
                        },
                        check(card) { return 7 - get.value(card); },
                        ai: { order: 3.5, result: { player: 1, target(player, target) { return target.side === player.side ? 1 : -1; } } }
                    },
                    "bnzz_qi_fengSeFaDian": {
                        audio: false,
                        type: 'faShu', enable: 'faShu', position: 'h',
                        selectCard: [1, 4], discard: false, lose: false,
                        filter(event, player) {
                            return player.countCards('h', card => get.xiBie(card) === 'feng' && chengyue_discardable(card, player, chengyue_book)) > 0;
                        },
                        filterCard(card, player) {
                            return get.xiBie(card) === 'feng' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_fengSeFaDian');
                        },
                        async content(event, trigger, player) {
                            const cards = (event.cards || []).slice();
                            if (cards.length < 1 || cards.length > 4 || cards.some(card => get.xiBie(card) !== 'feng' || !chengyue_discardable(card, player, chengyue_book)))
                                return;
                            if (cards.length < 4 && player.hasSkill(chengyue_cloud) && player.canBiShaShuiJing() &&
                                player.countCards('h', card => get.xiBie(card) !== 'feng' && chengyue_discardable(card, player, chengyue_cloud)) > 0) {
                                const result = await player.chooseCard('h', 1, '风云咒法：可支付1【水晶】并额外弃1张非风系牌，按风系计入法典张数', (card, player) => get.xiBie(card) !== 'feng' &&
                                    lib.filter.cardDiscardable(card, player, 'bnzz_qi_fengYunZhouFa'))
                                    .set('bnzzQiExtraUseful', cards.length === 1 || cards.length === 2 && game.hasPlayer(t => t !== player && (t.side !== player.side ? t.countCards('h') >= 4 : t.getHandcardLimit() - t.countCards('h') >= 3)))
                                    .set('ai', card => _status.event.bnzzQiExtraUseful ? 9 - get.value(card) : 0).forResult();
                                const extra = result?.cards?.[0];
                                if (result?.bool && extra && get.xiBie(extra) !== 'feng' &&
                                    chengyue_discardable(extra, player, chengyue_cloud) && player.canBiShaShuiJing()) {
                                    await player.removeBiShaShuiJing();
                                    player.logSkill(chengyue_cloud);
                                    cards.push(extra);
                                }
                            }
                            if (cards.some(card => !chengyue_discardable(card, player, chengyue_book)))
                                return;
                            event.bnzzQiRingResponded = false;
                            await player.discard(cards).set('showCards', true).set('bnzzQiFaDianCost', true);
                            const amount = cards.length;
                            if (amount === 1) {
                                const target = await chengyue_chooseBookTarget(player, false);
                                if (!target?.isIn())
                                    return;
                                await chengyue_forceDiscard(target, 1, '风色法典：弃1张牌');
                                let healed = player;
                                if (target !== player && target.isIn()) {
                                    const result = await player.chooseTarget('风色法典：你或目标角色+1【治疗】', true, (card, player, target) => target === player || target.playerid === _status.event.bnzzQiHealTarget)
                                        .set('bnzzQiHealTarget', target.playerid)
                                        .set('ai', target => get.zhiLiaoEffect2(target, _status.event.player, 1)).forResult();
                                    healed = result?.targets?.[0];
                                }
                                if (healed?.isIn())
                                    await healed.changeZhiLiao(1, player);
                            }
                            else if (amount === 2) {
                                const result = await player.chooseTarget('风色法典：对目标角色造成2点法术伤害', true)
                                    .set('ai', target => get.damageEffect2(target, _status.event.player, 2)).forResult();
                                const target = result?.targets?.[0];
                                if (target?.isIn())
                                    await target.faShuDamage(2, player, 'nocard');
                            }
                            else if (amount === 3) {
                                const target = await chengyue_chooseBookTarget(player, true);
                                if (!target?.isIn())
                                    return;
                                const result = await player.chooseControl(['补至手牌上限', '弃置全部手牌'])
                                    .set('prompt', '风色法典：选择目标角色执行的效果')
                                    .set('bnzzQiFriendly', target.side === player.side)
                                    .set('ai', () => _status.event.bnzzQiFriendly ? '补至手牌上限' : '弃置全部手牌').forResult();
                                if (result?.control === '补至手牌上限') {
                                    const count = Math.max(0, target.getHandcardLimit() - target.countCards('h'));
                                    if (count)
                                        await target.draw(count);
                                }
                                else if (result?.control === '弃置全部手牌') {
                                    await chengyue_forceDiscard(target, target.countCards('h'), '风色法典：弃置全部手牌');
                                }
                            }
                            else {
                                if (game.countPlayer(target => target !== player) < 2)
                                    return;
                                const result = await player.chooseTarget('风色法典：指定2名其他角色', 2, true, (card, player, target) => target !== player)
                                    .set('ai', target => target.side === _status.event.player.side ? 5 + target.countCards('h') / 10 : 0).forResult();
                                const recipients = result?.targets || [];
                                if (recipients.length !== 2)
                                    return;
                                const sources = game.filterPlayer(target => target !== player && !recipients.includes(target)).sortBySeat(player);
                                for (const source of sources) {
                                    if (!source.isIn() || source.countCards('h') === 0)
                                        continue;
                                    const given = await source.chooseCard('h', 1, true, '风色法典：交给承月1张手牌')
                                        .set('ai', card => 7 - get.value(card)).forResultCards() || [];
                                    if (given.length)
                                        await source.give(given, player);
                                }
                                for (const recipient of recipients.slice().sortBySeat(player)) {
                                    if (!recipient.isIn() || player.countCards('h') === 0)
                                        continue;
                                    const given = await player.chooseCard('h', [1, Math.min(3, player.countCards('h'))], '风色法典：可交给' + get.translation(recipient) + '1～3张手牌')
                                        .set('bnzzQiFriendly', recipient.side === player.side).set('bnzzQiGiftRoom', Math.max(0, recipient.getHandcardLimit() - recipient.countCards('h')))
                                        .set('ai', card => _status.event.bnzzQiFriendly && ui.selected.cards.length < _status.event.bnzzQiGiftRoom ? 10 - get.value(card) : 0).forResultCards() || [];
                                    if (given.length)
                                        await player.give(given, recipient);
                                }
                                if (!event.bnzzQiRingResponded)
                                    await player.addZhanJi('baoShi', 1);
                            }
                        },
                        check(card) { return 7 - get.value(card); },
                        ai: { order: 3.7, result: { player: 1 } }
                    },
                    "bnzz_qi_fengLiuHuanRao": {
                        audio: false,
                        trigger: { player: 'showCardsEnd' },
                        filter(event) {
                            return event.discard === true && event.getParent()?.name === 'discard' &&
                                event.cards?.some(card => get.type(card) === 'faShu');
                        },
                        getIndex(event) { return event.cards.filter(card => get.type(card) === 'faShu'); },
                        async cost(event, trigger, player) {
                            const controls = [];
                            if (game.hasPlayer(target => target.side !== player.side))
                                controls.push('双方受到法术伤害');
                            if (game.hasPlayer(target => target !== player && target.countCards('h', card => lib.filter.cardDiscardable(card, target)) > 0)) {
                                controls.push('其他角色弃1张牌');
                            }
                            if (!controls.length) {
                                event.result = { bool: false };
                                return;
                            }
                            controls.push('取消');
                            const choice = await player.chooseControl(controls)
                                .set('prompt', '风流环绕：为此张展示的法术牌选择效果')
                                .set('ai', () => {
                                    const p = _status.event.player;
                                    if (game.hasPlayer(t => t.side !== p.side && t.countCards('h') > 0)) return '其他角色弃1张牌';
                                    return lib.skill.bnzz_qi_ai.safe(p, 1) && game.hasPlayer(t => t.side !== p.side && get.damageEffect2(t, p, 1) > 0) ? '双方受到法术伤害' : '取消';
                                }).forResult();
                            const mode = choice?.control === '双方受到法术伤害' ? 'damage' :
                                choice?.control === '其他角色弃1张牌' ? 'discard' : null;
                            if (!mode) {
                                event.result = { bool: false };
                                return;
                            }
                            const result = await player.chooseTarget(mode === 'damage' ? '风流环绕：选择与你各受1点法术伤害的对手' :
                                '风流环绕：选择弃1张牌的其他角色', true, (card, player, target) => _status.event.bnzzQiRingMode === 'damage' ? target.side !== player.side :
                                target !== player && target.countCards('h', card => lib.filter.cardDiscardable(card, target)) > 0)
                                .set('bnzzQiRingMode', mode)
                                .set('ai', target => target.side !== _status.event.player.side ? 2 : 1).forResult();
                            event.result = { bool: !!result?.bool, targets: result?.targets, cost_data: mode };
                        },
                        async content(event, trigger, player) {
                            const target = event.targets?.[0];
                            if (!target?.isIn())
                                return;
                            const discard = trigger.getParent();
                            if (discard?.bnzzQiFaDianCost && discard.getParent()?.name === chengyue_book) {
                                discard.getParent().bnzzQiRingResponded = true;
                            }
                            if (event.cost_data === 'damage' && target.side !== player.side) {
                                for (const current of [target, player].sortBySeat(player)) {
                                    if (current.isIn())
                                        await current.faShuDamage(1, player, 'nocard');
                                }
                            }
                            else if (event.cost_data === 'discard' && target !== player) {
                                await chengyue_forceDiscard(target, 1, '风流环绕：弃1张牌');
                            }
                        }
                    },
                    "bnzz_qi_yiFengJiHua": {
                        audio: false,
                        trigger: { global: 'gongJiMingZhong' },
                        firstDo: true,
                        priority: 100,
                        filter(event, player) { return !!event.card && get.xiBie(event.card) === 'feng' && player.canBiShaShuiJing(); },
                        async cost(event, trigger, player) {
                            const result = await player.chooseControl(['伤害+1', '伤害-1', '取消'])
                                .set('prompt', '异风激化：支付1【水晶】，修改风系攻击的伤害并选择其星石奖励')
                                .set('bnzzQiIncrease', trigger.target?.side !== player.side)
                                .set('ai', () => _status.event.bnzzQiIncrease ? '伤害+1' : '伤害-1').forResult();
                            if (!['伤害+1', '伤害-1'].includes(result?.control)) {
                                event.result = { bool: false };
                                return;
                            }
                            const stone = await player.chooseControl(['宝石', '水晶'])
                                .set('prompt', '异风激化：本次攻击获得的星石种类')
                                .set('bnzzQiFriendly', trigger.player?.side === player.side)
                                .set('ai', () => _status.event.bnzzQiFriendly ? '宝石' : '水晶').forResult();
                            event.result = { bool: !!stone, cost_data: { delta: result.control === '伤害+1' ? 1 : -1,
                                    stone: stone?.control === '宝石' ? 'baoShi' : 'shuiJing' } };
                        },
                        async content(event, trigger, player) {
                            const data = event.cost_data;
                            if (!data || ![1, -1].includes(data.delta) || !player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            trigger.changeDamageNum(data.delta);
                            trigger.customArgs = trigger.customArgs || {};
                            trigger.customArgs[chengyue_intensify] = { owner: player.playerid, stone: data.stone };
                        },
                        group: chengyue_intensify + '_reward',
                        subSkill: {
                            reward: {
                                audio: false,
                                trigger: { global: 'changeZhanJiBefore' },
                                forced: true, popup: false,
                                filter(event, player) { return event.num > 0 && chengyue_rewardRecord(event)?.owner === player.playerid; },
                                async content(event, trigger) { trigger.xingShi = chengyue_rewardRecord(trigger).stone; }
                            }
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_fengYunZhouFa": {
                        audio: false,
                        trigger: { player: ['useCardBefore', 'respondBefore'] },
                        filter(event, player) { return player.canBiShaShuiJing() && chengyue_basicHandCards(event, player).length > 0; },
                        async cost(event, trigger, player) {
                            const result = await player.chooseCardButton('风云咒法：支付1【水晶】，指定其中1张基础牌使本次用牌视为风系', chengyue_basicHandCards(trigger, player), 1)
                                .set('bnzzQiWindUseful', get.type(trigger.card) === 'gongJi' && trigger.targets?.some(t => t.side !== player.side) && player.countNengLiangAll() >= 2)
                                .set('ai', button => _status.event.bnzzQiWindUseful && get.xiBie(button.link) !== 'feng' ? 1 : 0).forResult();
                            event.result = { bool: !!result?.bool, cards: result?.links };
                        },
                        async content(event, trigger, player) {
                            const card = event.cards?.[0];
                            if (!card || !chengyue_basicHandCards(trigger, player).includes(card) || !player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            const virtual = get.autoViewAs(trigger.card, trigger.cards || []);
                            game.setXiBie(virtual, 'feng');
                            trigger.card = virtual;
                            game.log(player, '指定', card, '令本次用牌视为风系');
                        },
                        ai: { shuiJing: true }
                    },

                    // 求道者·九萌
                    "bnzz_qi_shenSuFu": jiumeng_talisman('feng', jiumeng_P + 'shenSuFu', true),
                    "bnzz_qi_tianHuoFu": jiumeng_talisman('huo', jiumeng_P + 'tianHuoFu', false),
                    "bnzz_qi_jieZhenBaMenTianDiFa": {
                        audio: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/jieZhenBaMenTianDiFa.mp3',
                        type: 'qiDong',
                        trigger: { player: 'qiDong' },
                        filter(event, player) {
                            return player.countCards('h') >= player.getHandcardLimit() &&
                                player.countCards('h', card => jiumeng_canDiscard(card, player, jiumeng_P + 'jieZhenBaMenTianDiFa')) > 0;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseCard('h', [1, 3], '结阵·八门天地法：弃1～3张牌，横置并获得等量元力', (card, player) => lib.filter.cardDiscardable(card, player, 'bnzz_qi_jieZhenBaMenTianDiFa'))
                                .set('ai', card => {
                                    const p = _status.event.player, selected = ui.selected.cards;
                                    if (selected.length >= Math.min(3, p.countCards('h') - 1)) return 0;
                                    if (!lib.skill.bnzz_qi_ai.attacks(p, selected.concat(card)).length) return 0;
                                    return lib.skill.bnzz_qi_ai.costValue(card, p, 11);
                                }).forResult();
                        },
                        async content(event, trigger, player) {
                            const cards = event.cards || [];
                            if (player.countCards('h') < player.getHandcardLimit() || cards.length < 1 || cards.length > 3 ||
                                cards.some(card => !jiumeng_canDiscard(card, player, jiumeng_P + 'jieZhenBaMenTianDiFa')))
                                return;
                            await player.discard(cards);
                            await player.hengZhi();
                            await player.addZhiShiWu(jiumeng_energy, cards.length);
                            if (player.isHengZhi())
                                player.addSkill(jiumeng_formation);
                            if (jiumeng_shouldBacklash(player)) {
                                player.logSkill('bnzz_qi_yuanLiFanShi');
                                await jiumeng_backlash(player);
                            }
                        }
                    },
                    "bnzz_qi_tianDiJian": {
                        audio: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/tianDiJian.mp3',
                        trigger: { player: 'gongJiShi' },
                        forced: true,
                        filter(event, player) { return jiumeng_formed(player); },
                        async content(event, trigger) { trigger.changeDamageNum(1); }
                    },
                    "bnzz_qi_zhenMenLeiJi": {
                        audio: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/zhenMenLeiJi.mp3',
                        trigger: { global: 'gongJiMingZhong' },
                        filter(event, player) {
                            return jiumeng_formed(player) && player.countZhiShiWu(jiumeng_energy) > 0 && event.yingZhan !== true &&
                                event.player?.isIn() && event.player.side !== player.side;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('阵门雷击：移除1点元力，对主动攻击者造成2点法术伤害？')
                                .set('choice', player.countZhiShiWu('bnzz_qi_yuanLi') > 1 || lib.skill.bnzz_qi_ai.safe(player, 3)).forResult();
                        },
                        async content(event, trigger, player) {
                            if (!jiumeng_formed(player) || player.countZhiShiWu(jiumeng_energy) < 1)
                                return;
                            await player.removeZhiShiWu(jiumeng_energy, 1);
                            if (trigger.player?.isIn())
                                await trigger.player.faShuDamage(2, player, 'nocard');
                        }
                    },
                    "bnzz_qi_yuanLiFanShi": {
                        audio: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/yuanLiFanShi.mp3',
                        trigger: { player: ['loseAfter', 'changeZhiShiWuAfter'] },
                        forced: true,
                        filter(event, player) { return jiumeng_shouldBacklash(player); },
                        async content(event, trigger, player) { await jiumeng_backlash(player); }
                    },
                    "bnzz_qi_wuLiangTianLei": {
                        audio: 'ext:百年战争·序章/audio/skill/qiuDaoZhe/wuLiangTianLei.mp3',
                        type: 'faShu', enable: 'faShu', position: 'h',
                        discard: false, lose: false,
                        filter(event, player) {
                            const count = player.countZhiShiWu(jiumeng_energy);
                            return count > 0 && player.canBiShaBaoShi() &&
                                player.countCards('h', card => jiumeng_canDiscard(card, player, jiumeng_P + 'wuLiangTianLei')) >= count &&
                                game.countPlayer(target => target.side !== player.side) >= 2;
                        },
                        selectCard() { return _status.event.player.countZhiShiWu('bnzz_qi_yuanLi'); },
                        filterCard(card, player) { return lib.filter.cardDiscardable(card, player, 'bnzz_qi_wuLiangTianLei'); },
                        selectTarget: 2,
                        filterTarget(card, player, target) { return target.side !== player.side; },
                        multitarget: true, multiline: true,
                        async content(event, trigger, player) {
                            const count = player.countZhiShiWu(jiumeng_energy);
                            const cards = event.cards || [];
                            const targets = event.targets || [];
                            if (count < 1 || !player.canBiShaBaoShi() || cards.length !== count ||
                                cards.some(card => !jiumeng_canDiscard(card, player, jiumeng_P + 'wuLiangTianLei')) ||
                                targets.length !== 2 || targets.some(target => !target.isIn() || target.side === player.side))
                                return;
                            // Both costs belong to one payment. Backlash sees the final state once.
                            player.storage[jiumeng_payment] = true;
                            let paid = false;
                            try {
                                await player.removeBiShaBaoShi();
                                await player.discard(cards);
                                const remaining = player.countZhiShiWu(jiumeng_energy);
                                if (remaining)
                                    await player.removeZhiShiWu(jiumeng_energy, remaining);
                                paid = true;
                            }
                            finally {
                                delete player.storage[jiumeng_payment];
                            }
                            if (jiumeng_shouldBacklash(player)) {
                                player.logSkill('bnzz_qi_yuanLiFanShi');
                                await jiumeng_backlash(player);
                            }
                            if (paid)
                                for (const target of targets.slice().sortBySeat(player)) {
                                    if (target.isIn())
                                        await target.faShuDamage(4 - count, player, 'nocard');
                                }
                        },
                        check(card) { return 7 - get.value(card); },
                        ai: { baoShi: true, order: 4, result: { target(player, target) { return get.damageEffect(target, 2); } } }
                    },
                    "bnzz_qi_yuanLi": {
                        intro: { name: '元力', content: 'mark', max: 3 },
                        onremove: 'storage', markimage: 'extension/百年战争·序章/mark_bnzz_yuanLi.webp'
                    },
                    "bnzz_qi_zhenYanXingTai": {
                        nopop: true,
                        mark: true, markimage: 'extension/百年战争·序章/mark_bnzz_zhenYanXingTai.webp',
                        intro: { name: '阵眼形态', content: '不能发动神速符、天火符；所有攻击伤害+1。（特殊行动时）重置并移除所有元力；（手牌或元力为0时）触发元力反噬。', nocount: true },
                        group: [jiumeng_formation + '_special', jiumeng_formation + '_reset'],
                        subSkill: {
                            special: {
                                audio: false, trigger: { player: 'teShuBefore' }, forced: true,
                                async content(event, trigger, player) {
                                    player.removeSkill(jiumeng_formation);
                                    await player.chongZhi();
                                    const count = player.countZhiShiWu(jiumeng_energy);
                                    if (count)
                                        await player.removeZhiShiWu(jiumeng_energy, count);
                                }
                            },
                            reset: {
                                audio: false, trigger: { player: 'chongZhiAfter' }, forced: true, popup: false,
                                async content(event, trigger, player) { player.removeSkill(jiumeng_formation); }
                            }
                        }
                    },

                    // 狙击手·兰卡
                    "bnzz_qi_xunMiZhanJi": {
                        audio: false, type: 'qiDong', trigger: { player: 'qiDong' },
                        filter(event, player) { return player.countCards('h', c => lib.filter.cardDiscardable(c, player, lanka_P + 'xunMiZhanJi')) > 0; },
                        async content(event, trigger, player) {
                            const result = await player.chooseToDiscard('h', 1, true, '寻觅战机：弃1张手牌').forResult();
                            if (!result || !result.bool)
                                return;
                            player.addTempSkill(lanka_blocked, 'phaseAfter');
                            await player.draw(1);
                            if (!player.isHengZhi()) {
                                const card = get.cards(1);
                                if (player.countGaiPai(lanka_bullets) < 2)
                                    await player.addGaiPai(card, lanka_bullets);
                                else
                                    await player.discard(card);
                                await player.hengZhi();
                            }
                            if (player.hasNengLiang('baoShi')) {
                                const extra = await player.chooseBool('寻觅战机：额外摸1张牌，并将1【宝石】转换为2【水晶】？').set('choice', lib.skill.bnzz_qi_ai.room(player) >= 1).forResult();
                                if (extra && extra.bool && player.hasNengLiang('baoShi')) {
                                    await player.draw(1);
                                    await player.removeNengLiang('baoShi');
                                    await player.addNengLiang('shuiJing', 2);
                                }
                            }
                        },
                        ai: { order: 4 }
                    },
                    "bnzz_qi_xunMiZhanJi_block": { charlotte: true, mark: true, markimage: bnzzQi_markImage('bnzz_qi_xunMiZhanJi_block'), intro: { content: '本回合不能发动【匿踪狙击】。' } },
                    "bnzz_qi_zhuangTian": {
                        audio: false, trigger: { player: 'gongJiBefore' },
                        filter(event, player) {
                            return event.yingZhan !== true && (player.countGaiPai(lanka_bullets) < 2 ? player.countCards('h') > 0 : get.zhanJi(player.side).length >= 2);
                        },
                        async cost(event, trigger, player) {
                            if (player.countGaiPai(lanka_bullets) < 2) {
                                event.result = await player.chooseCard('h', 1, '装填：将1张手牌盖作【枪弹】')
                                    .set('ai', function (card) { return lib.skill.bnzz_qi_ai.costValue(card, _status.event.player); }).forResult();
                            }
                            else
                                event.result = await player.chooseBool('装填：移除我方战绩区2【星石】，获得1【水晶】？').set('choice', lib.skill.bnzz_qi_ai.supply(player) > 0 && !player.hasNengLiang('shuiJing')).forResult();
                        },
                        async content(event, trigger, player) {
                            if (event.cards && event.cards.length) {
                                if (player.countGaiPai(lanka_bullets) < 2 && player.getCards('h').includes(event.cards[0]))
                                    await player.addGaiPai(event.cards, player, lanka_bullets);
                            }
                            else if (player.countGaiPai(lanka_bullets) >= 2 && get.zhanJi(player.side).length >= 2) {
                                const paid = await player.chooseRemoveZhanJi(2).set('side', player.side).set('forced', true).forResult();
                                if (paid && paid.bool)
                                    await player.addNengLiang('shuiJing');
                            }
                        }
                    },
                    "bnzz_qi_zhiYuanSheJi": {
                        audio: false, trigger: { global: 'gongJiMingZhong' }, usable: 1,
                        filter(event, player) { return event.yingZhan !== true && event.player !== player && event.player.side === player.side && player.hasGaiPai(lanka_bullets); },
                        async cost(event, trigger, player) {
                            const result = await player.chooseCardButton(player.getGaiPai(lanka_bullets), '支援射击：移除1个【枪弹】，使队友本次攻击伤害+1', 1).set('bnzzQiUseful', trigger.target?.side !== player.side).set('ai', button => _status.event.bnzzQiUseful ? 10 - get.value(button.link) : 0).forResult();
                            event.result = { bool: !!result?.bool, cost_data: result?.links };
                        },
                        async content(event, trigger, player) {
                            const cards = (event.cost_data || []).filter(c => player.getGaiPai(lanka_bullets).includes(c));
                            if (cards.length !== 1)
                                return;
                            await player.discard(cards, lanka_bullets);
                            trigger.changeDamageNum(1);
                            await player.chongZhi();
                        }
                    },
                    "bnzz_qi_kuaiSuZhuangTian": {
                        audio: false, type: 'qiDong', trigger: { player: 'qiDong' },
                        filter(event, player) { return player.canBiShaShuiJing() && player.countGaiPai(lanka_bullets) > 0; },
                        async content(event, trigger, player) {
                            if (!player.canBiShaShuiJing() || player.countGaiPai(lanka_bullets) < 1)
                                return;
                            const count = player.countGaiPai(lanka_bullets);
                            const choices = Array.from({ length: count }, (_, i) => String(i + 1));
                            const result = await player.chooseControl(choices).set('prompt', '快速装填：选择移除的枪弹数X，然后补充X+1个枪弹')
                                .set('choice', 0).forResult() || {};
                            if (!choices.includes(result.control))
                                return;
                            const number = Number(result.control);
                            if (!Number.isInteger(number) || number < 1 || number > player.countGaiPai(lanka_bullets) || !player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            if (!await lanka_removeBullets(player, number, '快速装填：选择要移除的枪弹'))
                                return;
                            await player.addGaiPai(get.cards(number + 1), lanka_bullets);
                            if (player.countCards('h') && player.hasGaiPai(lanka_bullets)) {
                                const hand = await player.chooseCard('h', 1, '快速装填：可将1张手牌与1个枪弹交换')
                                    .set('ai', function (card) { return 4 - get.value(card); }).forResultCards() || [];
                                if (hand.length) {
                                    const chosen = await player.chooseCardButton(player.getGaiPai(lanka_bullets), '选择交换回手的枪弹', true, 1).forResult();
                                    if (chosen?.links?.length && player.getCards('h').includes(hand[0])) {
                                        await player.addGaiPai(hand, player, lanka_bullets);
                                        await player.gain(chosen.links, 'gain2');
                                    }
                                }
                            }
                        },
                        ai: { shuiJing: true, order: 4 }
                    },
                    "bnzz_qi_niZongJuJi": {
                        audio: false, trigger: { player: 'gongJiBefore' },
                        filter(event, player) { return event.yingZhan !== true && player.isHengZhi() && !player.hasSkill(lanka_blocked) && player.canBiShaShuiJing(); },
                        async cost(event, trigger, player) { event.result = await player.chooseBool('匿踪狙击：支付【水晶】，使本次攻击无法应战并增加伤害？').set('choice', trigger.target?.side !== player.side).forResult(); },
                        async content(event, trigger, player) {
                            if (!player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            trigger.wuFaYingZhan();
                            trigger.changeDamageNum(Math.max(0, player.countGaiPai(lanka_bullets) - 2) + 1);
                            (trigger.customArgs || (trigger.customArgs = {}))[lanka_P + 'niZongJuJi'] = true;
                        },
                        group: lanka_P + 'niZongJuJi_hit',
                        subSkill: {
                            hit: {
                                audio: false, trigger: { player: 'gongJiMingZhong' }, forced: true, popup: false,
                                filter(event) { return event.customArgs?.[lanka_P + 'niZongJuJi'] === true; },
                                async content(event, trigger, player) {
                                    delete trigger.customArgs[lanka_P + 'niZongJuJi'];
                                    const count = player.countGaiPai(lanka_bullets);
                                    if (count > 1)
                                        await lanka_removeBullets(player, count - 1, '匿踪狙击：将枪弹数量调整到1');
                                    else if (!count)
                                        await player.addGaiPai(get.cards(1), lanka_bullets);
                                    await player.chongZhi();
                                }
                            }
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_qiangDan": {
                        mark: true, markimage: bnzzQi_markImage('bnzz_qi_qiangDan'),
                        intro: { name: '枪弹', markcount: 'gaiPai', content: 'gaiPai' },
                        onremove(player, key) { const cards = player.getGaiPai(key); if (cards.length)
                            player.loseToDiscardpile(cards); }
                    },

                    // 供能技师·萝可
                    "bnzz_qi_nengYuanWeiHu": {
                        audio: false, trigger: { global: 'gameStart', player: 'enterGame' }, forced: true,
                        async content(event, trigger, player) { lib.skill[luoke_pool].install(player); luoke_setPool(player, luoke_values(player)); }
                    },
                    "bnzz_qi_xuNengChi": {
                        audio: false, mark: true, markimage: 'extension/百年战争·序章/mark_bnzz_xuNengChi.webp',
                        intro: {
                            name: '蓄能池', markcount(storage) { return (storage || []).length; },
                            content(storage) { const list = storage || []; return '专属【蓄能池】<br>宝石：' + list.filter(x => x === 'baoShi').length + '　水晶：' + list.filter(x => x === 'shuiJing').length + '<br>星石总数：' + list.length + '/4'; }
                        },
                        receive: luoke_receive,
                        install(player) {
                            if (!Array.isArray(player.storage[luoke_pool]))
                                player.storage[luoke_pool] = [];
                            if (player._bnzzQiEnergyOriginal)
                                return;
                            game.broadcastAll(function (owner) {
                                if (owner._bnzzQiEnergyOriginal)
                                    return;
                                const original = owner.changeNengLiang;
                                owner._bnzzQiEnergyOriginal = original;
                                owner.changeNengLiang = function (xingShi, num) {
                                    if (typeof num !== 'number' || !num)
                                        num = 1;
                                    if (num < 0 || !this.hasSkill('bnzz_qi_xuNengChi') || !xingShi)
                                        return original.call(this, xingShi, num);
                                    const next = game.createEvent('changeNengLiang');
                                    next.player = this;
                                    next.xingShi = xingShi;
                                    next.num = Math.min(num, Math.max(0, 4 - (this.storage.bnzz_qi_xuNengChi || []).length));
                                    next.setContent(async function (event, trigger, player) {
                                        if (event.num > 0)
                                            lib.skill.bnzz_qi_xuNengChi.receive(player, event.xingShi, event.num);
                                    });
                                    return next;
                                };
                            }, player);
                        },
                        init(player) { lib.skill[luoke_pool].install(player); },
                        onremove(player) {
                            game.broadcastAll(function (owner) {
                                if (owner._bnzzQiEnergyOriginal) {
                                    owner.changeNengLiang = owner._bnzzQiEnergyOriginal;
                                    delete owner._bnzzQiEnergyOriginal;
                                }
                                delete owner.storage.bnzz_qi_xuNengChi;
                            }, player);
                        }
                    },
                    "bnzz_qi_ceLiuChongNeng": {
                        audio: false, trigger: { player: 'useSkillAfter' },
                        filter(event, player) {
                            return event.skill === '_tiLian_backup' && event.bnzz_qi_refinedStones?.length === 1 && get.zhanJi(player.side).length > 0 &&
                                game.hasPlayer(target => target !== player && target.side === player.side && (target.hasSkill(luoke_pool) ? luoke_values(target).length < 4 : target.countNengLiangAll() < target.getNengLiangLimit()));
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseTarget('侧流充能：将我方战绩区1【星石】提炼给一名队友', function (card, player, target) {
                                return target !== player && target.side === player.side && (target.hasSkill('bnzz_qi_xuNengChi') ? (target.storage.bnzz_qi_xuNengChi || []).length < 4 : target.countNengLiangAll() < target.getNengLiangLimit());
                            }).set('ai', function (target) { return lib.skill.bnzz_qi_ai.supply(target, true); }).forResult();
                        },
                        async content(event, trigger, player) {
                            const target = event.targets?.[0];
                            if (!target || !get.zhanJi(player.side).length)
                                return;
                            const result = await player.chooseRemoveZhanJi(1).set('side', player.side).set('forced', true).forResult();
                            if (result?.bool && result.links?.length)
                                await target.addNengLiang(result.links[0]);
                        }
                    },
                    "bnzz_qi_xingNengZhuanHuan": {
                        audio: false, trigger: { player: 'gongJiMingZhong' },
                        filter(event, player) { return event.yingZhan !== true && (luoke_values(player).length > 0 || (luoke_values(player).length < 4 && get.zhanJi(!player.side).length > 0)); },
                        async cost(event, trigger, player) {
                            const choices = [];
                            if (luoke_values(player).length < 4 && get.zhanJi(!player.side).length)
                                choices.push('转移敌方星石');
                            for (let i = 1; i <= Math.min(2, luoke_values(player).length); i++)
                                choices.push('移除' + i + '星石');
                            const result = await player.chooseControl(choices.concat('cancel2')).set('prompt', '星能转换：选择效果').set('bnzzQiEnemy', trigger.target?.side !== player.side).set('ai', () => {
                                const e = _status.event, pool = e.player.storage.bnzz_qi_xuNengChi || [];
                                if (e.controls.includes('转移敌方星石') && pool.length < 3) return '转移敌方星石';
                                if (!e.bnzzQiEnemy) return e.controls.includes('转移敌方星石') ? '转移敌方星石' : 'cancel2';
                                return e.controls.includes('移除2星石') ? '移除2星石' : '移除1星石';
                            }).forResult() || {};
                            event.result = { bool: choices.includes(result.control), cost_data: result.control };
                        },
                        async content(event, trigger, player) {
                            if (event.cost_data === '转移敌方星石') {
                                const enemy = get.zhanJi(!player.side);
                                if (!enemy.length || luoke_values(player).length >= 4)
                                    return;
                                const type = enemy.includes('shuiJing') ? 'shuiJing' : 'baoShi';
                                await player.changeZhanJi(type, -1, !player.side);
                                // 转移不是“获得”，不触发空池宝石转换。
                                luoke_setPool(player, luoke_values(player).concat(type), true);
                                trigger.changeDamageNum(-1);
                            }
                            else {
                                const count = Number(String(event.cost_data).slice(2, 3));
                                if (!(count >= 1 && count <= 2) || luoke_values(player).length < count)
                                    return;
                                if (!(await luoke_spendCrystals(player, count)))
                                    return;
                                trigger.changeDamageNum(count);
                            }
                        }
                    },
                    "bnzz_qi_jiaoHuShuNiu": {
                        audio: false, type: 'faShu', enable: 'faShu',
                        filter(event, player) { return luoke_canSpendCrystals(player, 2) && player.countCards('h') > 0 && game.hasPlayer(t => t !== player && t.side === player.side && t.countCards('h') > 0); },
                        filterTarget(card, player, target) { return target !== player && target.side === player.side && target.countCards('h') > 0; },
                        async content(event, trigger, player) {
                            const target = event.target;
                            if (!target || !player.countCards('h') || !target.countCards('h') || !(await luoke_spendCrystals(player, 2)))
                                return;
                            const own = await player.chooseCard('h', 1, true, '交互枢纽：选择要交换的手牌').forResultCards() || [];
                            const other = await target.chooseCard('h', 1, true, '交互枢纽：选择要交换的手牌').forResultCards() || [];
                            if (own.length && other.length)
                                await player.swapHandcards(target, own, other);
                            player.addExtraXingDong({ xingDong: 'gongJi', [luoke_extra]: true, prompt: '交互枢纽：本次额外攻击可发动【精准射击】' });
                        },
                        group: luoke_extra + '_precise',
                        subSkill: {
                            precise: {
                                audio: false, trigger: { player: 'gongJiShi' },
                                filter(event, player) { return event.yingZhan !== true && luoke_extraAttack(event, player); },
                                async cost(event, trigger, player) { event.result = await player.chooseBool('精准射击：本次攻击强制命中，伤害-1？').set('choice', trigger.target?.countCards('h') > 3).forResult(); },
                                async content(event, trigger) { trigger.qiangZhiMingZhong(); trigger.changeDamageNum(-1); }
                            }
                        },
                        ai: { order: 4, result: { target: 1 } }
                    },
                    "bnzz_qi_nengJiFenLiu": {
                        audio: false, trigger: { global: 'shouDaoGongJiBefore' },
                        filter(event, player) {
                            return event.yingZhan !== true && event.canYingZhan !== false && event.target && event.target !== player && event.target.side === player.side &&
                                luoke_canSpendCrystals(player, 2) && player.countCards('h', c => lib.filter.cardDiscardable(c, player, luoke_P + 'nengJiFenLiu')) >= 2;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseCard('h', 2, '能级分流：移除池中2【水晶】，弃2张手牌【展示】', function (card, player) {
                                return lib.filter.cardDiscardable(card, player, 'bnzz_qi_nengJiFenLiu');
                            }).set('ai', function (card) {
                                const selected = ui.selected.cards, p = _status.event.player, suit = get.xiBie(card);
                                if (!selected.length) {
                                    const paired = p.getCards('h').some(c => c !== card && get.xiBie(c) === suit && lib.filter.cardDiscardable(c, p, 'bnzz_qi_nengJiFenLiu'));
                                    return suit === 'an' || paired ? 12 - get.value(card) : 0;
                                }
                                return suit === 'an' || get.xiBie(selected[0]) === 'an' || suit === get.xiBie(selected[0]) ? 12 - get.value(card) : 0;
                            }).forResult();
                        },
                        async content(event, trigger, player) {
                            const defender = trigger.target, source = trigger.player, cards = event.cards || [];
                            if (!defender || cards.length !== 2 || !(await luoke_spendCrystals(player, 2)))
                                return;
                            const types = cards.map(c => get.xiBie(c));
                            await player.discard(cards).set('showCards', true);
                            let type = types.includes('an') ? 'an' : types[0] === types[1] ? get.xiBie(trigger.card) : null;
                            if (type) {
                                const card = luoke_counterCard(type);
                                const legal = game.hasPlayer(t => t !== source && t.side !== defender.side && lib.filter.targetEnabled(card, defender, t));
                                if (!legal)
                                    return;
                                const targets = await defender.chooseTarget(true, '能级分流：选择应战目标', function (card, player, target) {
                                    return target !== _status.event.attackSource && target.side !== player.side && lib.filter.targetEnabled(_status.event.counter, player, target);
                                }).set('attackSource', source).set('counter', card).set('ai', function (target) { return -get.attitude(_status.event.player, target); }).forResultTargets() || [];
                                if (!targets.length)
                                    return;
                                const miss = game.createEvent(luoke_P + 'nengJiFenLiu_miss');
                                miss.player = defender;
                                miss.source = source;
                                miss.card = trigger.card;
                                miss.customArgs = trigger.customArgs;
                                miss.yingZhan = false;
                                miss.cause = 'yingZhan';
                                miss.causeCard = card;
                                miss.setContent(async function (event) { await event.trigger('gongJiWeiMingZhong'); });
                                await miss;
                                trigger.weiMingZhong();
                                trigger.canYingZhan = false;
                                trigger.canShengGuang = false;
                                trigger.canShengDun = false;
                                await defender.useCard(card, targets[0]).set('yingZhan', true);
                            }
                            else {
                                const available = cards.filter(card => get.position(card, true) === 'd');
                                if (!available.length)
                                    return;
                                const result = await defender.chooseCardButton(available, '能级分流：可将1～2张弃牌加入手牌', [1, Math.min(2, available.length)]).forResult();
                                if (result?.bool && result.links?.length)
                                    await defender.gain(result.links.filter(card => get.position(card, true) === 'd'), 'gain2');
                            }
                        }
                    },
                    "bnzz_qi_gaoNengShuSong": {
                        audio: false, type: 'qiDong', trigger: { player: 'qiDong' },
                        filter(event, player) { return luoke_canSpendCrystals(player, 2) && game.hasPlayer(t => t !== player && t.side === player.side); },
                        async content(event, trigger, player) {
                            const targets = await player.chooseTarget(true, '高能输送：选择一名队友', function (card, player, target) { return target !== player && target.side === player.side; })
                                .set('ai', function (target) { return lib.skill.bnzz_qi_ai.supply(target, true); }).forResultTargets() || [];
                            if (!targets.length || !(await luoke_spendCrystals(player, 2)))
                                return;
                            const choice = await player.chooseControl('宝石', '水晶和治疗').set('prompt', '高能输送：选择补给').set('bnzzQiRecipient', targets[0]).set('ai', () => {
                                const t = _status.event.bnzzQiRecipient;
                                return lib.skill.bnzz_qi_ai.healRoom(t) > 0 && t.hasNengLiang('baoShi') ? '水晶和治疗' : '宝石';
                            }).forResult() || {};
                            if (choice.control === '宝石')
                                await targets[0].addNengLiang('baoShi');
                            else {
                                await targets[0].addNengLiang('shuiJing');
                                await targets[0].changeZhiLiao(1, player);
                            }
                        },
                        ai: { order: 4 }
                    },

                    // 回响乐师·恩普洛斯
                    "bnzz_qi_huiGuangYueLv": {
                        audio: false,
                        forced: true,
                        trigger: { player: ['phaseEnd', 'chengShouShangHaiAfter'] },
                        filter(event, player) {
                            return event.name === 'damage' ? event.faShu === true && event.num >= 2 : !!player.storage[enpuluosi_glow];
                        },
                        async content(event, trigger, player) {
                            if (trigger.name === 'damage')
                                await player.addZhanJi('baoShi', 1);
                            else
                                await player.addZhiShiWu(enpuluosi_rhythm, 1);
                        },
                        group: [enpuluosi_glow + '_record', enpuluosi_glow + '_reset'],
                        subSkill: {
                            record: {
                                audio: false, forced: true, popup: false,
                                trigger: { source: 'zaoChengShangHai' },
                                filter(event) { return event.faShu === true && event.num > 0; },
                                async content(event, trigger, player) { player.storage[enpuluosi_glow] = true; }
                            },
                            reset: {
                                audio: false, forced: true, popup: false, firstDo: true, priority: 100,
                                trigger: { global: 'phaseBefore' },
                                async content(event, trigger, player) { delete player.storage[enpuluosi_glow]; }
                            }
                        }
                    },
                    "bnzz_qi_yinLvZhiBi": {
                        audio: false,
                        trigger: { player: 'triggerSkill' },
                        priority: 100,
                        firstDo: true,
                        filter(event, player) {
                            return event.skill !== enpuluosi_wall && player.hasExpansions('_shengDun') && enpuluosi_otherEffect(event.skill);
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('音律之壁：阻止本次【' + get.translation(trigger.skill) + '】触发？')
                                .set('choice', true).forResult();
                        },
                        async content(event, trigger, player) {
                            if (player.hasExpansions('_shengDun'))
                                trigger.cancel();
                        },
                        group: enpuluosi_wall + '_collapse',
                        subSkill: {
                            collapse: {
                                audio: false, forced: true,
                                trigger: { player: 'loseAfter' },
                                filter: enpuluosi_lostShield,
                                async content(event, trigger, player) {
                                    const effects = player.jiChuXiaoGuoList().filter(id => id !== '_shengDun');
                                    const cards = effects.flatMap(id => player.getExpansions(id));
                                    if (!cards.length)
                                        return;
                                    if (effects.includes('_zhongDu'))
                                        player.storage.zhongDu = [];
                                    const loss = player.loseToDiscardpile(cards);
                                    await loss;
                                    for (const id of effects) {
                                        if (!game.jiChuXiaoGuo.pai_xiaoGuo.includes(id) && !player.hasExpansions(id))
                                            player.removeSkill(id);
                                    }
                                    const removed = cards.filter(card => (loss.cards || []).includes(card)).length;
                                    if (removed > 0)
                                        await player.faShuDamage(removed, player, 'nocard');
                                }
                            }
                        }
                    },
                    "bnzz_qi_jiDangYinFu": {
                        audio: false,
                        usable: 1,
                        trigger: { global: 'loseAfter' },
                        filter(event, player) {
                            return enpuluosi_lostShield(event) && game.hasPlayer(target => target !== event.player);
                        },
                        async cost(event, trigger, player) {
                            const result = await player.chooseCardTarget({
                                prompt: '激荡音符：弃1张法术牌【展示】，对圣盾原持有者以外的1名角色造成1点法术伤害，获得1乐律',
                                position: 'h', selectCard: 1, selectTarget: 1,
                                filterCard(card, player) {
                                    return get.type(card) === 'faShu' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_jiDangYinFu');
                                },
                                filterTarget(card, player, target) { return target !== _status.event.bnzzQiShieldOwner; },
                                ai1(card) { return 7 - get.value(card); },
                                ai2(target) { return get.damageEffect2(target, _status.event.player, 1); }
                            }).set('bnzzQiShieldOwner', trigger.player).forResult();
                            event.result = result;
                        },
                        async content(event, trigger, player) {
                            const card = event.cards?.[0], target = event.targets?.[0];
                            if (!card || !target?.isIn() || target === trigger.player || get.type(card) !== 'faShu' || !enpuluosi_canDiscard(card, player, enpuluosi_note))
                                return;
                            await player.discard([card]).set('showCards', true);
                            if (target.isIn())
                                await target.faShuDamage(enpuluosi_effect(player, target, 1), player, 'nocard');
                            await player.addZhiShiWu(enpuluosi_rhythm, 1);
                        }
                    },
                    "bnzz_qi_ciDiJianZou": {
                        audio: false,
                        type: 'faShu', enable: 'faShu',
                        filter(event, player) {
                            if (!enpuluosi_hasPair(player))
                                return false;
                            return player.isZhiShiWuMax(enpuluosi_rhythm) ? game.hasPlayer(target => target.side !== player.side) :
                                game.filterPlayer(target => target !== player).length >= player.countZhiShiWu(enpuluosi_rhythm);
                        },
                        chooseButton: {
                            dialog(event, player) {
                                const options = player.isZhiShiWuMax(enpuluosi_rhythm) ? [['full', '移除所有乐律，对目标对手和自己各造成X点法术伤害']] :
                                    [['damage', '对X名其他角色各造成1点法术伤害'], ['discard', 'X名其他角色各弃1张牌']];
                                return ui.create.dialog('次第渐奏：弃2张同命格牌，先对自己造成1点法术伤害', [options, 'textbutton']);
                            },
                            check(button) { return button.link === 'discard' ? 1 : 2; },
                            backup(links) {
                                const mode = links[0];
                                return {
                                    audio: lib.config['extension_百年战争·序章_voiceAudio'] === true ? bnzzQiVoiceSkillPaths.bnzz_qi_ciDiJianZou : false,
                                    type: 'faShu', position: 'h', selectCard: 2,
                                    discard: false, lose: false, multitarget: true, multiline: true,
                                    filterCard(card, player) {
                                        return lib.filter.cardDiscardable(card, player, 'bnzz_qi_ciDiJianZou') &&
                                            (!ui.selected.cards.length || get.mingGe(card) === get.mingGe(ui.selected.cards[0]));
                                    },
                                    selectTarget() {
                                        const player = _status.event.player;
                                        return player.isZhiShiWuMax('bnzz_qi_yueLv') ? 1 : player.countZhiShiWu('bnzz_qi_yueLv');
                                    },
                                    filterTarget(card, player, target) {
                                        return player.isZhiShiWuMax('bnzz_qi_yueLv') ? target.side !== player.side : target !== player;
                                    },
                                    check(card) { return 7 - get.value(card); },
                                    async content(event, trigger, player) {
                                        const cards = event.cards || [], targets = event.targets || [];
                                        const x = player.countZhiShiWu(enpuluosi_rhythm), full = player.isZhiShiWuMax(enpuluosi_rhythm);
                                        if (cards.length !== 2 || !cards.every(card => enpuluosi_canDiscard(card, player, enpuluosi_crescendo)) ||
                                            get.mingGe(cards[0]) !== get.mingGe(cards[1]) || (mode === 'full') !== full ||
                                            targets.length !== (full ? 1 : x) || new Set(targets).size !== targets.length ||
                                            targets.some(target => !target.isIn() || (full ? target.side === player.side : target === player)))
                                            return;
                                        await player.discard(cards).set('showCards', true);
                                        await player.faShuDamage(1, player, 'nocard');
                                        if (full) {
                                            const remaining = player.countZhiShiWu(enpuluosi_rhythm);
                                            if (remaining > 0)
                                                await player.removeZhiShiWu(enpuluosi_rhythm, remaining);
                                            if (targets[0].isIn())
                                                await targets[0].faShuDamage(enpuluosi_effect(player, targets[0], x), player, 'nocard');
                                            await player.faShuDamage(x, player, 'nocard');
                                        }
                                        else {
                                            for (const target of targets)
                                                if (target.isIn()) {
                                                    if (mode === 'damage')
                                                        await target.faShuDamage(enpuluosi_effect(player, target, 1), player, 'nocard');
                                                    else {
                                                        const count = Math.min(enpuluosi_effect(player, target, 1), target.countCards('h', card => lib.filter.cardDiscardable(card, target)));
                                                        if (count > 0)
                                                            await target.chooseToDiscard('h', count, true, '次第渐奏：弃' + count + '张牌');
                                                    }
                                                }
                                        }
                                    },
                                    // Zero rhythm selects no targets; the core still evaluates this callback.
                                    ai: { result: { target(player, target) { return target && target.side !== player.side ? -1 : 0; } } }
                                };
                            },
                            prompt() { return '次第渐奏：弃2张同命格牌【展示】，先对自己造成1点法术伤害'; }
                        },
                        ai: { order: 4, result: { player: 1 } }
                    },
                    "bnzz_qi_wanQiQiMing": {
                        audio: false, type: 'qiDong', trigger: { player: 'qiDong' },
                        filter(event, player) { return player.canBiShaShuiJing(); },
                        async content(event, trigger, player) {
                            if (!player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            player.addTempSkill(enpuluosi_boost, { global: 'phaseAfter' });
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_wanQiQiMing_effect": {
                        charlotte: true, mark: true, markimage: bnzzQi_markImage('bnzz_qi_wanQiQiMing_effect'),
                        intro: { content: '本回合技能对其他角色的效果数值+1，目标人数不增加。' }
                    },
                    "bnzz_qi_gongMingBeiYue": {
                        audio: false, type: 'faShu', enable: 'faShu',
                        filter(event, player) { return player.canBiShaBaoShi(); },
                        filterTarget: lib.filter.opponent,
                        async content(event, trigger, player) {
                            const target = event.target;
                            if (!target?.isIn() || target.side === player.side || !player.canBiShaBaoShi())
                                return;
                            await player.removeBiShaBaoShi();
                            await target.faShuDamage(enpuluosi_effect(player, target, 2), player, 'nocard');
                            const options = [];
                            const shield = { name: 'shengDun' };
                            if (player.hasCard(card => card.hasDuYou('tianShiZhiQiang'), 'h') &&
                                game.hasPlayer(current => lib.filter.targetEnabled(shield, player, current)))
                                options.push('天使之墙');
                            if (player.hasJiChuXiaoGuo())
                                options.push('获得基础效果');
                            if (!options.length)
                                return;
                            options.push('cancel2');
                            const choice = await player.chooseControl(options).set('prompt', '共鸣悲乐：可以选择后续效果')
                                .set('ai', () => {
                                    const e = _status.event;
                                    if (e.controls.includes('天使之墙')) return '天使之墙';
                                    return lib.skill.bnzz_qi_ai.canReclaim(e.player) ? '获得基础效果' : 'cancel2';
                                }).forResultControl();
                            if (choice === '获得基础效果' && player.hasJiChuXiaoGuo()) {
                                await player.gainJiChuXiaoGuo(player);
                            }
                            else if (choice === '天使之墙') {
                                const result = await player.chooseCardTarget({
                                    prompt: '共鸣悲乐：将1张带有【天使之墙】的手牌作为【圣盾】使用',
                                    position: 'h', selectCard: 1, selectTarget: 1,
                                    filterCard(card) { return card.hasDuYou('tianShiZhiQiang'); },
                                    filterTarget(card, player, target) { return lib.filter.targetEnabled({ name: 'shengDun' }, player, target); },
                                    ai1(card) { return 7 - get.value(card); },
                                    ai2(target) { return get.attitude(_status.event.player, target); }
                                }).forResult();
                                const card = result.cards?.[0], recipient = result.targets?.[0];
                                if (result.bool && card && player.getCards('h').includes(card) && card.hasDuYou('tianShiZhiQiang') && recipient?.isIn() &&
                                    lib.filter.targetEnabled(shield, player, recipient)) {
                                    await player.useCard({ name: 'shengDun', isCard: true }, [card], recipient).set('skill', 'tianShiZhiQiang');
                                }
                            }
                        },
                        ai: { baoShi: true, order: 4, result: { target(player, target) { return get.damageEffect2(target, player, 2); } } }
                    },
                    "bnzz_qi_yueLv": {
                        mark: true, markimage: 'extension/百年战争·序章/mark_bnzz_yueLv.webp',
                        intro: { name: '乐律', content: 'mark', max: 3 }
                    },

                    // 精灵斥候·阿芙洛蒂亚
                    "bnzz_qi_shanShuoZhiGuang": {
                        audio: false,
                        trigger: { player: 'daChuPai' },
                        forced: true,
                        filter(event) { return !!event.card && get.type(event.card) === 'faShu'; },
                        async content(event, trigger, player) { await player.addZhiShiWu(afuro_flash, 1); }
                    },
                    "bnzz_qi_xianXingZhenCha": {
                        audio: false,
                        trigger: { global: 'shouDaoGongJi' },
                        filter(event, player) {
                            return event.target === player || (!!event.target && event.target.side === player.side &&
                                event.yingZhan !== true && player.countZhiShiWu(afuro_flash) >= 1);
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool(trigger.target === player ?
                                '先行侦查：移除牌库顶1张牌【展示】并按其系别结算？' :
                                '先行侦查：移除1点【闪现】，侦查队友受到的主动攻击？')
                                .set('choice', trigger.target === player || player.countZhiShiWu('bnzz_qi_shanXian') < 3 || !lib.skill.bnzz_qi_ai.attacks(player).length || trigger.target.countCards('h') >= trigger.target.getHandcardLimit() - 1).forResult();
                        },
                        async content(event, trigger, player) {
                            if (trigger.target !== player) {
                                if (player.countZhiShiWu(afuro_flash) < 1)
                                    return;
                                await player.removeZhiShiWu(afuro_flash, 1);
                            }
                            const cards = get.cards(1);
                            if (!cards.length)
                                return;
                            // Same deck-removal semantics as the core's 喧哗上等: no discard.
                            await player.showHiddenCards(cards, '先行侦查');
                            const suit = get.xiBie(cards[0]);
                            if (suit === 'shui' || suit === 'di') {
                                const choice = await player.chooseTarget('先行侦查：令目标角色+1【治疗】', true)
                                    .set('ai', target => get.attitude(_status.event.player, target) *
                                    Math.max(0, target.getZhiLiaoLimit() - target.zhiLiao)).forResult();
                                const target = choice?.targets?.[0];
                                if (target?.isIn())
                                    await target.changeZhiLiao(1, player);
                            }
                            else if (suit === 'guang' || suit === 'an') {
                                if (!game.hasPlayer(target => target.side !== player.side))
                                    return;
                                const choice = await player.chooseTarget('先行侦查：对目标对手造成1点法术伤害', true, (card, player, target) => target.side !== player.side)
                                    .set('ai', target => get.damageEffect2(target, _status.event.player, 1)).forResult();
                                const target = choice?.targets?.[0];
                                if (target?.isIn())
                                    await target.faShuDamage(1, player, 'nocard');
                            }
                            else if (get.type(cards[0]) === 'faShu')
                                await player.addZhiShiWu(afuro_flash, 1);
                        }
                    },
                    "bnzz_qi_jiSuMoSha": {
                        audio: false,
                        trigger: { player: 'gongJiShi' },
                        filter(event, player) { return event.yingZhan !== true && player.countZhiShiWu(afuro_flash) >= 3; },
                        async cost(event, trigger, player) {
                            const begin = await player.chooseBool('疾速抹杀：移除3点【闪现】，令本次攻击无法应战？')
                                .set('choice', trigger.target?.side !== player.side).forResult();
                            if (!begin?.bool) {
                                event.result = { bool: false };
                                return;
                            }
                            const available = game.filterPlayer(target => target.side === player.side)
                                .reduce((sum, target) => sum + target.zhiLiao, 0);
                            const targets = [];
                            if (available >= 2) {
                                const extra = await player.chooseBool('是否额外移除我方角色合计2【治疗】，使本次攻击强制命中？')
                                    .set('choice', true).forResult();
                                if (extra?.bool) {
                                    for (let i = 0; i < 2; i++) {
                                        const chosen = await player.chooseTarget('选择支付第' + (i + 1) + '点【治疗】的我方角色', (card, player, target) => target.side === player.side &&
                                            target.zhiLiao > (target === _status.event.bnzzQiFirstTarget ? 1 : 0))
                                            .set('bnzzQiFirstTarget', targets[0] || null)
                                            .set('ai', target => target.zhiLiao).forResult();
                                        if (!chosen?.targets?.length) {
                                            event.result = { bool: false };
                                            return;
                                        }
                                        targets.push(chosen.targets[0]);
                                    }
                                }
                            }
                            event.result = { bool: true, targets };
                        },
                        async content(event, trigger, player) {
                            if (player.countZhiShiWu(afuro_flash) < 3)
                                return;
                            const targets = event.targets || [];
                            const allocation = afuro_healingAllocation(targets);
                            if (targets.length && (targets.length !== 2 || [...allocation].some(([target, amount]) => !target.isIn() || target.side !== player.side || target.zhiLiao < amount)))
                                return;
                            await player.removeZhiShiWu(afuro_flash, 3);
                            trigger.wuFaYingZhan();
                            let paid = 0;
                            for (const [target, amount] of allocation) {
                                const payment = target.changeZhiLiao(-amount, player);
                                paid += Math.max(0, -payment.num);
                                await payment;
                            }
                            if (paid === 2)
                                trigger.qiangZhiMingZhong();
                        }
                    },
                    "bnzz_qi_zhanShuCheTui": {
                        audio: false,
                        trigger: { global: 'changeZhiLiaoAfter' },
                        usable: 1,
                        filter(event, player) {
                            return event.num < 0 && event[afuro_retreat] !== true && event.player?.side === player.side &&
                                player.countZhiShiWu(afuro_flash) < player.getZhiShiWuLimit(afuro_flash);
                        },
                        async cost(event, trigger, player) {
                            const result = await player.chooseCard('h', 1, '战术撤退：弃1张水系牌【展示】以获得闪现或返还治疗', (card, player) => get.xiBie(card) === 'shui' &&
                                lib.filter.cardDiscardable(card, player, 'bnzz_qi_zhanShuCheTui'))
                                .set('ai', card => lib.skill.bnzz_qi_ai.costValue(card, _status.event.player, 10)).forResult();
                            if (!result?.bool) {
                                event.result = { bool: false };
                                return;
                            }
                            const choice = await player.chooseControl(['获得1点闪现', '他获得1点治疗', '取消'])
                                .set('prompt', '战术撤退：选择效果')
                                .set('ai', () => '获得1点闪现').forResult();
                            event.result = { bool: ['获得1点闪现', '他获得1点治疗'].includes(choice?.control),
                                cards: result.cards, cost_data: choice?.control };
                        },
                        async content(event, trigger, player) {
                            const card = event.cards?.[0];
                            if (!card || !afuro_waterCost(card, player) || player.countZhiShiWu(afuro_flash) >= player.getZhiShiWuLimit(afuro_flash))
                                return;
                            await player.discard([card]).set('showCards', true);
                            if (event.cost_data === '获得1点闪现')
                                await player.addZhiShiWu(afuro_flash, 1);
                            else if (event.cost_data === '他获得1点治疗' && trigger.player?.isIn()) {
                                await trigger.player.changeZhiLiao(1, player).set(afuro_retreat, true);
                            }
                        }
                    },
                    "bnzz_qi_jieJieSheJi": {
                        audio: false,
                        trigger: { source: ['gongJiMingZhong', 'gongJiWeiMingZhong'] },
                        usable: 1,
                        filter(event, player) { return event.yingZhan !== true && player.canBiShaShuiJing(); },
                        async cost(event, trigger, player) {
                            const missed = event.triggername === 'gongJiWeiMingZhong';
                            const choice = await player.chooseBool(missed ?
                                '结界射击：支付1【水晶】，分配2点治疗并结算满治疗后的弃牌？' :
                                '结界射击：支付1【水晶】，令本次攻击伤害不能用治疗抵御？')
                                .set('choice', missed ? game.hasPlayer(target => target.side === player.side &&
                                target.zhiLiao < target.getZhiLiaoLimit()) : (trigger.target?.zhiLiao || 0) > 0)
                                .forResult();
                            event.result = { bool: !!choice?.bool, cost_data: missed ? 'miss' : 'hit' };
                        },
                        async content(event, trigger, player) {
                            if (!player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            if (event.cost_data === 'hit') {
                                trigger.customArgs = trigger.customArgs || {};
                                trigger.customArgs[afuro_barrier] = true;
                                return;
                            }
                            const targets = [];
                            for (let i = 0; i < 2; i++) {
                                const choice = await player.chooseTarget('结界射击：分配第' + (i + 1) + '点【治疗】', true, (card, player, target) => target.side === player.side)
                                    .set('bnzzQiFirstTarget', targets[0] || null)
                                    .set('ai', target => get.attitude(_status.event.player, target) * Math.max(0, target.getZhiLiaoLimit() - target.zhiLiao - (target === _status.event.bnzzQiFirstTarget ? 1 : 0)))
                                    .forResult();
                                if (choice?.targets?.length)
                                    targets.push(choice.targets[0]);
                            }
                            for (const [target, amount] of afuro_healingAllocation(targets)) {
                                if (target.isIn())
                                    await target.changeZhiLiao(amount, player);
                            }
                            if (player.zhiLiao >= player.getZhiLiaoLimit() &&
                                player.countCards('h', card => lib.filter.cardDiscardable(card, player, afuro_barrier)) > 0) {
                                const choice = await player.chooseCard('h', 1, true, '结界射击：治疗已满，弃1张牌【展示】', (card, player) => lib.filter.cardDiscardable(card, player, 'bnzz_qi_jieJieSheJi'))
                                    .set('ai', card => (get.mingGe(card) === 'sheng' ? 10 : 6) - get.value(card)).forResult();
                                const card = choice?.cards?.[0];
                                if (card && player.getCards('h').includes(card)) {
                                    const holy = get.mingGe(card) === 'sheng';
                                    await player.discard([card]).set('showCards', true);
                                    if (holy)
                                        await player.addZhiShiWu(afuro_flash, 1);
                                }
                            }
                        },
                        group: afuro_barrier + '_damage',
                        subSkill: {
                            damage: {
                                audio: false,
                                trigger: { source: 'shouDaoShangHai' },
                                forced: true,
                                firstDo: true,
                                popup: false,
                                filter(event, player) {
                                    const attack = afuro_ownAttackDamage(event, player);
                                    return !!attack?.customArgs?.[afuro_barrier];
                                },
                                async content(event, trigger) { trigger.canZhiLiao = false; }
                            }
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_shanXian": {
                        intro: { name: '闪现', content: 'mark', max: 3 },
                        onremove: 'storage',
                        markimage: 'extension/百年战争·序章/mark_bnzz_shanXian.webp'
                    },

                    // 翎羽骑士·洛肯·煌
                    "bnzz_qi_dunJi": {
                        audio: false,
                        trigger: { player: 'gongJiShi' },
                        forced: true,
                        filter(event, player) {
                            return event.yingZhan !== true && !!event.card && player.getExpansions('_shengDun')
                                .some(card => get.xiBie(card) === get.xiBie(event.card));
                        },
                        async content(event, trigger) { trigger.changeDamageNum(1); }
                    },
                    "bnzz_qi_zhuangBeiJianCha": {
                        audio: false,
                        type: 'faShu', enable: 'faShu',
                        filter(event, player) { return game.hasPlayer(target => target !== player && target.countCards('h') > 0); },
                        filterTarget(card, player, target) { return target !== player && target.countCards('h') > 0; },
                        async content(event, trigger, player) {
                            const target = event.target;
                            if (!target || !target.isIn() || target.countCards('h') === 0)
                                return;
                            const cards = await target.chooseCard('h', 1, true, '装备检查：交给翎羽骑士1张手牌')
                                .set('ai', function (card) { return 7 - get.value(card); }).forResultCards() || [];
                            if (!cards.length)
                                return;
                            const given = cards[0];
                            await target.give(cards, player);
                            const choices = ['额外攻击'];
                            if (player.countZhiLiao() > 0 && player.countCards('h') > 0)
                                choices.push('交换治疗');
                            const result = await player.chooseControl(choices).set('prompt', '装备检查：选择效果')
                                .set('choiceList', ['额外+1【攻击行动】；收到圣盾时可立即对自己使用', '移除1【治疗】，交还1张手牌，令对方+1【治疗】'])
                                .set('bnzzQiCanHeal', lib.skill.bnzz_qi_ai.healRoom(target) > 0).set('ai', () => !lib.skill.bnzz_qi_ai.attacks(_status.event.player).length && _status.event.bnzzQiCanHeal && _status.event.controls.includes('交换治疗') ? '交换治疗' : '额外攻击').forResult() || {};
                            if (result.control === '交换治疗') {
                                if (player.countZhiLiao() < 1 || player.countCards('h') < 1 || !target.isIn())
                                    return;
                                const returned = await player.chooseCard('h', 1, true, '装备检查：交给对方1张手牌')
                                    .set('ai', function (card) { return 7 - get.value(card); }).forResultCards() || [];
                                if (!returned.length)
                                    return;
                                await player.changeZhiLiao(-1);
                                await player.give(returned, target);
                                await target.changeZhiLiao(1, player);
                            }
                            else if (result.control === '额外攻击') {
                                player.addGongJi();
                                if (get.name(given) === 'shengDun' && player.getCards('h').includes(given) && player.canUse(given, player)) {
                                    const use = await player.chooseBool('装备检查：立即对自己使用收到的【圣盾】？').set('choice', true).forResult();
                                    if (use && use.bool && player.getCards('h').includes(given) && player.canUse(given, player))
                                        await player.useCard(given, player);
                                }
                            }
                        },
                        ai: { order: 3.5, result: { target(player, target) { return target.side === player.side ? 1 : -1; } } }
                    },
                    "bnzz_qi_zhanShuChongFeng": {
                        audio: false,
                        trigger: { player: 'gongJiShi' },
                        filter(event, player) {
                            return event.yingZhan !== true && game.hasPlayer(target => target !== player && target.side === player.side && luoken_hasDiscard(target, null, luoken_P + 'zhanShuChongFeng'));
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseTarget('战术冲锋：选择1名队友弃1张牌【展示】，然后摸1张牌', function (card, player, target) {
                                return target !== player && target.side === player.side && target.countCards('h', function (card) {
                                    return lib.filter.cardDiscardable(card, target, 'bnzz_qi_zhanShuChongFeng');
                                }) > 0;
                            }).set('bnzzQiAttackSuit', get.xiBie(trigger.card)).set('ai', function (target) {
                                if (lib.skill.bnzz_qi_ai.room(target, 1) < 1) return 0;
                                const same = target.countCards('h', c => get.xiBie(c) === _status.event.bnzzQiAttackSuit && lib.filter.cardDiscardable(c, target, 'bnzz_qi_zhanShuChongFeng')) > 0;
                                return same ? 5 : 1;
                            }).forResult();
                        },
                        async content(event, trigger, player) {
                            const target = event.targets && event.targets[0];
                            if (!target || !target.isIn() || !luoken_hasDiscard(target, null, luoken_P + 'zhanShuChongFeng'))
                                return;
                            const cards = await target.chooseCard('h', 1, true, '战术冲锋：弃1张牌【展示】', function (card, player) {
                                return lib.filter.cardDiscardable(card, player, 'bnzz_qi_zhanShuChongFeng');
                            }).set('bnzzQiAttackElement', get.xiBie(trigger.card)).set('ai', function (card) {
                                return 7 - get.value(card) + (get.xiBie(card) === _status.event.bnzzQiAttackElement ? 3 : 0);
                            }).forResultCards() || [];
                            if (!cards.length)
                                return;
                            const same = get.xiBie(cards[0]) === get.xiBie(trigger.card);
                            await target.discard(cards).set('showCards', true);
                            await target.draw(1);
                            if (same)
                                trigger.changeDamageNum(1);
                        }
                    },
                    "bnzz_qi_lvJiJingShen": {
                        audio: false,
                        trigger: { player: 'shouDaoShangHai' }, usable: 1,
                        filter(event, player) { return event.num > 0; },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseCard('h', 1, '律己精神：弃1张水系牌【展示】，摸1张牌并给予我方角色1【治疗】', function (card, player) {
                                return get.xiBie(card) === 'shui' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_lvJiJingShen');
                            }).set('ai', function (card) {
                                const p = _status.event.player;
                                return lib.skill.bnzz_qi_ai.room(p, 1) >= 1 && game.hasPlayer(t => t.side === p.side && lib.skill.bnzz_qi_ai.healRoom(t) > 0) ? lib.skill.bnzz_qi_ai.costValue(card, p, 11) : 0;
                            }).forResult();
                        },
                        async content(event, trigger, player) {
                            const cards = event.cards || [];
                            if (cards.length !== 1 || !player.getCards('h').includes(cards[0]) || get.xiBie(cards[0]) !== 'shui' ||
                                !lib.filter.cardDiscardable(cards[0], player, luoken_P + 'lvJiJingShen'))
                                return;
                            await player.discard(cards).set('showCards', true);
                            await player.draw(1);
                            const targets = await player.chooseTarget('律己精神：我方1名角色+1【治疗】', true, function (card, player, target) {
                                return player.side === target.side;
                            }).set('ai', function (target) { return Math.max(0, target.getZhiLiaoLimit() - target.countZhiLiao()); }).forResultTargets() || [];
                            if (targets[0])
                                await targets[0].changeZhiLiao(1, player);
                        }
                    },
                    "bnzz_qi_zhanShiXiuZheng": {
                        audio: false,
                        type: 'faShu', enable: 'faShu',
                        filter(event, player) { return player.canBiShaShuiJing(); },
                        filterTarget(card, player, target) { return target.side === player.side; },
                        async content(event, trigger, player) {
                            const target = event.target;
                            if (!target || !target.isIn() || !player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            const historyStart = target.getHistory('lose').length;
                            const adjustment = target.tiaoZhengShouPai(4);
                            await adjustment;
                            const discarded = target.getHistory('lose').slice(historyStart)
                                .filter(loss => loss.type === 'discard' && luoken_within(loss, adjustment))
                                .flatMap(loss => loss.cards2 || loss.cards || []);
                            await target.changeZhiLiao(1, player);
                            if (target === player || !discarded.length)
                                return;
                            const available = Array.from(new Set(discarded)).filter(card => get.position(card, true) === 'd');
                            if (!available.length)
                                return;
                            const take = await player.chooseBool('战时修整：获得队友此次弃置的牌，然后你+1【治疗】？')
                                .set('choice', player.countCards('h') + available.length <= player.getHandcardLimit()).forResult();
                            if (take && take.bool) {
                                const remaining = available.filter(card => get.position(card, true) === 'd');
                                if (!remaining.length)
                                    return;
                                await player.gain(remaining, 'gain2');
                                await player.changeZhiLiao(1, player);
                            }
                        },
                        ai: {
                            shuiJing: true, order: 3.6,
                            result: { target(player, target) { return target.countCards('h') - 4 + Math.max(0, target.getZhiLiaoLimit() - target.countZhiLiao()); } }
                        }
                    },

                    // 海神祭司·让·梅莎拉
                    "bnzz_qi_daHaiZhuFu": {
                        audio: false,
                        mod: { maxZhiLiao(player, num) { return num + 1; } },
                        trigger: { player: 'daChuPai' },
                        forced: true,
                        filter(event) { return !!event.card && get.type(event.card) === 'faShu'; },
                        async content(event, trigger, player) { await player.changeZhiLiao(1, player); }
                    },
                    "bnzz_qi_shenLiCiFu": {
                        audio: false,
                        trigger: { player: 'gongJiEnd' },
                        filter(event, player) { return !!meishala_attackAction(event, player); },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('神力赐福：先摸1张牌，再弃1张牌？')
                                .set('choice', player.countCards('h') + 1 <= player.getHandcardLimit()).forResult();
                        },
                        async content(event, trigger, player) {
                            await player.draw(1);
                            if (player.countCards('h', card => lib.filter.cardDiscardable(card, player)) > 0) {
                                await player.chooseToDiscard('h', 1, true, '神力赐福：弃1张牌');
                            }
                        }
                    },
                    "bnzz_qi_juLangTaoTian": {
                        audio: false,
                        type: 'faShu',
                        enable: 'faShu',
                        position: 'h',
                        selectCard: [1, Infinity],
                        selectTarget() { return [ui.selected.cards.length, ui.selected.cards.length]; },
                        multitarget: true,
                        multiline: true,
                        discard: false,
                        lose: false,
                        filter(event, player) {
                            return player.countCards('h', card => get.xiBie(card) === 'shui' && meishala_canDiscard(card, player, meishala_wave)) > 0;
                        },
                        filterCard(card, player) { return get.xiBie(card) === 'shui' && meishala_canDiscard(card, player, meishala_wave); },
                        filterTarget(card, player, target) {
                            return target !== player && target.countCards('h') > player.countCards('h') - ui.selected.cards.length;
                        },
                        check(card) { return 7 - get.value(card); },
                        async content(event, trigger, player) {
                            const cards = event.cards || [];
                            const targets = event.targets || [];
                            if (!cards.length || targets.length !== cards.length || new Set(targets).size !== targets.length ||
                                !cards.every(card => get.xiBie(card) === 'shui' && meishala_canDiscard(card, player, meishala_wave)))
                                return;
                            await player.discard(cards).set('showCards', true);
                            // One payment and one self-heal for the whole multi-target spell.
                            const eligible = targets.filter(target => target.isIn() && target !== player &&
                                target.countCards('h') > player.countCards('h'));
                            for (const target of eligible) {
                                if (target.isIn())
                                    await target.faShuDamage(target.zhiLiao > 0 ? 2 : 1, player, 'nocard');
                            }
                            await player.changeZhiLiao(1, player);
                        },
                        ai: {
                            order: 4,
                            result: { target(player, target) { return get.damageEffect2(target, player, target.zhiLiao > 0 ? 2 : 1); } }
                        }
                    },
                    "bnzz_qi_shengMingChaoXi": {
                        audio: false,
                        type: 'faShu',
                        enable: 'faShu',
                        filter(event, player) { return player.zhiLiao >= 1 && game.hasPlayer(target => target !== player); },
                        chooseButton: {
                            dialog() {
                                return ui.create.dialog('生命潮汐：先选择本次对所有目标执行的效果', [[['damage', '各造成1点法术伤害'], ['heal', '各获得1点治疗']], 'textbutton']);
                            },
                            check(button) {
                                const player = _status.event.player;
                                const count = game.filterPlayer(target => target !== player && (button.link === 'heal' ?
                                    target.side === player.side && target.zhiLiao < target.getZhiLiaoLimit() : target.side !== player.side)).length;
                                return Math.min(player.zhiLiao, count);
                            },
                            backup(links) {
                                const heal = links[0] === 'heal';
                                return {
                                    audio: lib.config['extension_百年战争·序章_voiceAudio'] === true ? bnzzQiVoiceSkillPaths.bnzz_qi_shengMingChaoXi : false,
                                    type: 'faShu',
                                    selectCard: -1,
                                    filterCard: () => false,
                                    selectTarget() {
                                        const player = _status.event.player;
                                        return [1, Math.min(player.zhiLiao, game.filterPlayer(target => target !== player).length)];
                                    },
                                    filterTarget(card, player, target) { return target !== player; },
                                    multitarget: true,
                                    multiline: true,
                                    async content(event, trigger, player) {
                                        const targets = event.targets || [];
                                        const amount = targets.length;
                                        if (!amount || player.zhiLiao < amount || new Set(targets).size !== amount ||
                                            targets.some(target => !target.isIn() || target === player))
                                            return;
                                        await player.changeZhiLiao(-amount, player);
                                        for (const target of targets)
                                            if (target.isIn()) {
                                                if (heal)
                                                    await target.changeZhiLiao(1, player);
                                                else
                                                    await target.faShuDamage(1, player, 'nocard');
                                            }
                                    },
                                    ai: { result: { target(player, target) {
                                                return !target ? 0 : heal ? (target.zhiLiao < target.getZhiLiaoLimit() ? 1 : 0) : get.damageEffect(target, 1);
                                            } } }
                                };
                            },
                            prompt(links) { return '生命潮汐：每选择1名其他角色移除1点治疗，令其' + (links[0] === 'heal' ? '+1治疗' : '受到1点法术伤害'); }
                        },
                        ai: { order: 4, result: { player: 1 } }
                    },
                    "bnzz_qi_siWangLangYong": {
                        audio: false,
                        trigger: { player: 'phaseEnd' },
                        filter(event, player) {
                            return !player.hasSkill(meishala_blocked) && meishala_victims(player).length > 0;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseCard('h', 1, '死亡浪涌：弃1张法术牌【展示】，对本回合实际受伤过的对手各造成1点法术伤害', (card, player) => get.type(card) === 'faShu' &&
                                lib.filter.cardDiscardable(card, player, 'bnzz_qi_siWangLangYong'))
                                .set('ai', card => lib.skill.bnzz_qi_ai.costValue(card, _status.event.player, 10)).forResult();
                        },
                        async content(event, trigger, player) {
                            const card = event.cards?.[0];
                            if (!card || get.type(card) !== 'faShu' || !meishala_canDiscard(card, player, meishala_surge) || player.hasSkill(meishala_blocked))
                                return;
                            const targets = meishala_victims(player);
                            if (!targets.length)
                                return;
                            await player.discard([card]).set('showCards', true);
                            for (const target of targets)
                                if (target.isIn())
                                    await target.faShuDamage(1, player, 'nocard');
                        },
                        group: [meishala_surge + '_record', meishala_surge + '_reset'],
                        onremove(player) { delete player.storage[meishala_tracked]; },
                        subSkill: {
                            record: {
                                audio: false,
                                trigger: { source: 'chengShouShangHaiAfter' },
                                forced: true,
                                popup: false,
                                filter(event, player) {
                                    return _status.currentPhase === player && event.num > 0 && event.player?.side !== player.side;
                                },
                                async content(event, trigger, player) {
                                    player.storage[meishala_tracked] = player.storage[meishala_tracked] || [];
                                    if (!player.storage[meishala_tracked].includes(trigger.player.playerid)) {
                                        player.storage[meishala_tracked].push(trigger.player.playerid);
                                        player.syncStorage(meishala_tracked);
                                    }
                                }
                            },
                            reset: {
                                audio: false,
                                trigger: { player: 'phaseBefore' },
                                forced: true,
                                firstDo: true,
                                popup: false,
                                async content(event, trigger, player) {
                                    player.storage[meishala_tracked] = [];
                                    player.syncStorage(meishala_tracked);
                                }
                            }
                        }
                    },
                    "bnzz_qi_haiShenQingYu": {
                        audio: false,
                        type: 'faShu',
                        enable: 'faShu',
                        filter(event, player) { return player.canBiShaBaoShi(); },
                        filterTarget: true,
                        selectTarget: 1,
                        async content(event, trigger, player) {
                            const target = event.target;
                            if (!target?.isIn() || !player.canBiShaBaoShi())
                                return;
                            await player.removeBiShaBaoShi();
                            const maximum = target.countCards('h', card => get.xiBie(card) === 'shui' &&
                                lib.filter.cardDiscardable(card, target, meishala_P + 'haiShenQingYu'));
                            let cards = [];
                            if (maximum > 0) {
                                const choice = await target.chooseCard('h', [0, maximum], true, '海神轻语：可弃任意张水系牌【展示】；若不弃，施法者本回合不能发动死亡浪涌', (card, player) => get.xiBie(card) === 'shui' &&
                                    lib.filter.cardDiscardable(card, player, 'bnzz_qi_haiShenQingYu'))
                                    .set('bnzzQiCaster', player)
                                    .set('ai', card => _status.event.player.side === _status.event.bnzzQiCaster.side ? 6 - get.value(card) : 0)
                                    .forResult();
                                cards = (choice?.cards || []).filter(card => get.xiBie(card) === 'shui' &&
                                    meishala_canDiscard(card, target, meishala_P + 'haiShenQingYu'));
                            }
                            if (cards.length)
                                await target.discard(cards).set('showCards', true);
                            else
                                player.addTempSkill(meishala_blocked, { global: 'phaseAfter' });
                            if (target.isIn())
                                await target.faShuDamage(3, player, 'nocard');
                            for (const card of cards) {
                                const controls = ['获得1点治疗'];
                                if (get.position(card, true) === 'd')
                                    controls.unshift('将此牌加入手牌');
                                const choice = await player.chooseControl(controls)
                                    .set('prompt', '海神轻语：结算弃牌' + get.translation(card))
                                    .set('bnzzQiCanGain', controls.includes('将此牌加入手牌') &&
                                    player.countCards('h') + 1 <= player.getHandcardLimit())
                                    .set('ai', () => _status.event.bnzzQiCanGain ? '将此牌加入手牌' : '获得1点治疗')
                                    .forResult();
                                if (choice?.control === '将此牌加入手牌' && get.position(card, true) === 'd')
                                    await player.gain(card, 'gain2');
                                else
                                    await player.changeZhiLiao(1, player);
                            }
                        },
                        ai: { baoShi: true, order: 5, result: { target(player, target) { return get.damageEffect2(target, player, 3); } } }
                    },
                    "bnzz_qi_siWangLangYong_blocked": {
                        mark: true, markimage: bnzzQi_markImage('bnzz_qi_siWangLangYong_blocked'),
                        intro: { content: '本回合不能发动【死亡浪涌】。' }
                    },

                    // 不死者·帕丁
                    "bnzz_qi_zhanYiRanShao": {
                        audio: false,
                        // 延后到 gongJiAfter，等同一攻击的可选响应完成后再决定是否播放。
                        logAudio(...args) { return args.length ? false : undefined; },
                        trigger: { player: 'gongJiEnd' },
                        forced: true,
                        filter(event, player) { return !!pading_attackAction(event, player) && !pading_moonAttack(event, player); },
                        async content(event, trigger, player) {
                            trigger[pading_pendingZhanVoice] = true;
                            await player.addZhiShiWu(pading_soul, 1);
                        },
                        group: [pading_P + 'zhanYiRanShao_xueShang', pading_P + 'zhanYiRanShao_voice'],
                        subSkill: {
                            xueShang: {
                                audio: false,
                                trigger: { player: 'chengShouShangHaiAfter' },
                                forced: true,
                                filter(event) { return event.num > 0 && event[pading_ignoreDamage] !== true; },
                                async content(event, trigger, player) { await player.addZhiShiWu(pading_blood, 1); }
                            },
                            voice: {
                                audio: false,
                                trigger: { player: 'gongJiAfter' },
                                forced: true,
                                popup: false,
                                filter(event) {
                                    return event[pading_pendingZhanVoice] === true && event[pading_suppressZhanVoice] !== true;
                                },
                                content(event, trigger, player) {
                                    delete trigger['bnzz_qi_pendingZhanYiRanShaoVoice'];
                                    game.trySkillAudio('bnzz_qi_zhanYiRanShao', player);
                                }
                            }
                        }
                    },
                    "bnzz_qi_huiXuanJi": {
                        audio: false,
                        trigger: { player: 'gongJiEnd' },
                        usable: 1,
                        filter(event, player) { return !!pading_attackAction(event, player); },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('回旋击：额外+1【攻击行动】？')
                                .set('choice', lib.skill.bnzz_qi_ai.attacks(player).length > 0).forResult();
                            if (event.result?.bool) trigger[pading_suppressZhanVoice] = true;
                        },
                        async content(event, trigger, player) { player.addGongJi(); }
                    },
                    "bnzz_qi_xueYueHuGuang": {
                        audio: false,
                        trigger: { player: 'gongJiEnd' },
                        usable: 1,
                        filter(event, player) { return !!pading_attackAction(event, player) && player.countZhiShiWu(pading_blood) >= 3; },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('血月弧光：移除3点【血殇】，额外进行一次无法应战的攻击？')
                                .set('choice', lib.skill.bnzz_qi_ai.attacks(player).length > 0).forResult();
                            if (event.result?.bool) trigger[pading_suppressZhanVoice] = true;
                        },
                        async content(event, trigger, player) {
                            if (player.countZhiShiWu(pading_blood) < 3)
                                return;
                            await player.removeZhiShiWu(pading_blood, 3);
                            player.addExtraXingDong({
                                xingDong: 'gongJi',
                                [pading_moon]: true,
                                prompt: '血月弧光：本次主动攻击无法应战，结束时不获得战魂'
                            });
                            player.syncStorage('extraXingDong');
                            game.log(player, '因【血月弧光】额外+1【攻击行动】');
                        },
                        group: pading_moon + '_setup',
                        subSkill: {
                            setup: {
                                audio: false,
                                trigger: { player: 'gongJiBefore' },
                                forced: true,
                                firstDo: true,
                                popup: false,
                                filter(event, player) { return pading_moonAttack(event, player); },
                                async content(event, trigger) { trigger.wuFaYingZhan(); }
                            }
                        }
                    },
                    "bnzz_qi_lingHunZhenLie": {
                        audio: false,
                        trigger: { player: 'gongJiMingZhong' },
                        usable: 1,
                        filter(event, player) { return event.yingZhan !== true && player.countZhiShiWu(pading_soul) >= 1; },
                        async cost(event, trigger, player) {
                            const count = player.countZhiShiWu(pading_soul);
                            const controls = Array.from({ length: count }, (_, i) => '移除' + (i + 1) + '点战魂');
                            controls.push('取消');
                            const room = player.getHandcardLimit() - player.countCards('h');
                            const desired = trigger.target?.side !== player.side ? (room >= 3 && count >= 3 && trigger.target.countCards('h') >= trigger.target.getHandcardLimit() - 1 ? 3 : room >= 1 ? 1 : 0) : 0;
                            const result = await player.chooseControl(controls)
                                .set('prompt', '灵魂振裂：攻击伤害+1，自伤X点；X大于2再令攻击伤害+1')
                                .set('bnzzQiChoice', desired > 0 ? controls[desired - 1] : '取消')
                                .set('ai', () => _status.event.bnzzQiChoice).forResult();
                            const index = result ? controls.indexOf(result.control) : -1;
                            event.result = { bool: index >= 0 && index < count, cost_data: index + 1 };
                        },
                        async content(event, trigger, player) {
                            const amount = event.cost_data;
                            if (!Number.isInteger(amount) || amount < 1 || player.countZhiShiWu(pading_soul) < amount)
                                return;
                            await player.removeZhiShiWu(pading_soul, amount);
                            trigger.changeDamageNum(1);
                            await player.faShuDamage(amount, player, 'nocard');
                            if (amount > 2)
                                trigger.changeDamageNum(1);
                        }
                    },
                    "bnzz_qi_xueSeJingJi": {
                        audio: false,
                        type: 'faShu',
                        enable: 'faShu',
                        position: 'h',
                        selectCard: [1, 2],
                        selectTarget: 1,
                        discard: false,
                        lose: false,
                        filter(event, player) {
                            return player.countZhiShiWu(pading_blood) >= 1 && player.countCards('h', card => pading_spellCost(card, player)) >= 1;
                        },
                        filterCard(card, player) { return pading_spellCost(card, player); },
                        filterTarget(card, player, target) { return target.side !== player.side; },
                        check(card) { return 7 - get.value(card); },
                        async content(event, trigger, player) {
                            const cards = event.cards || [];
                            const target = event.target;
                            if (cards.length < 1 || cards.length > 2 || !cards.every(card => pading_spellCost(card, player)) ||
                                !target?.isIn() || target.side === player.side)
                                return;
                            const count = player.countZhiShiWu(pading_blood);
                            if (count < 1)
                                return;
                            const controls = Array.from({ length: count }, (_, i) => '移除' + (i + 1) + '点血殇');
                            // The spell's card/target confirmation has already committed the
                            // action. This remaining mandatory cost therefore has no cancel.
                            const safe = Math.max(1, lib.skill.bnzz_qi_ai.blood(player, cards.length));
                            const result = await player.chooseControl(controls)
                                .set('prompt', '血色荆棘：选择至少1点血殇，与已选法术牌共同支付费用')
                                .set('bnzzQiChoice', controls[safe - 1])
                                .set('ai', () => _status.event.bnzzQiChoice).forResult();
                            const index = result ? controls.indexOf(result.control) : -1;
                            if (index < 0 || !cards.every(card => pading_spellCost(card, player)))
                                return;
                            const amount = index + 1;
                            if (player.countZhiShiWu(pading_blood) < amount)
                                return;
                            await player.discard(cards).set('showCards', true);
                            await player.removeZhiShiWu(pading_blood, amount);
                            const damage = cards.length + amount - 1;
                            // Only these two damage events suppress War Burning. Nested
                            // responses and all subsequent damage keep their own semantics.
                            if (player.isIn())
                                await player.faShuDamage(damage, player, 'nocard').set(pading_ignoreDamage, true);
                            if (target.isIn())
                                await target.faShuDamage(damage, player, 'nocard').set(pading_ignoreDamage, true);
                        },
                        ai: {
                            order(item, player) { return player.countCards('h') <= player.getHandcardLimit() ? 4 : 0; },
                            result: {
                                player(player) { return player.countCards('h') <= player.getHandcardLimit() ? 0 : -10; },
                                target(player, target) { return get.damageEffect2(target, player, Math.max(1, ui.selected.cards.length)); }
                            }
                        }
                    },
                    "bnzz_qi_qianRenSaoDang": {
                        audio: false,
                        trigger: { player: 'gongJiMingZhong' },
                        filter(event, player) {
                            return event.yingZhan !== true && player.canBiShaShuiJing() &&
                                game.filterPlayer(target => target !== player && target !== event.target).length >= 2;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseTarget(2, '千刃扫荡：支付1【水晶】，对两名其他目标各造成1点攻击伤害并获得1点血殇', (card, player, target) => target !== player && target !== _status.event.bnzzQiAttackTarget)
                                .set('bnzzQiAttackTarget', trigger.target)
                                .set('ai', target => get.damageEffect2(target, _status.event.player, 1))
                                .forResult();
                        },
                        async content(event, trigger, player) {
                            const targets = event.targets || [];
                            if (targets.length !== 2 || new Set(targets).size !== 2 || !player.canBiShaShuiJing() ||
                                targets.some(target => !target.isIn() || target === player || target === trigger.target))
                                return;
                            await player.removeBiShaShuiJing();
                            for (const target of targets)
                                if (target.isIn())
                                    await target.damage(1, player, 'nocard');
                            await player.addZhiShiWu(pading_blood, 1);
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_xueShang": {
                        intro: { name: '血殇', content: 'mark', max: 3 },
                        onremove: 'storage',
                        markimage: 'extension/百年战争·序章/mark_bnzz_xueShang.webp'
                    },
                    "bnzz_qi_zhanHun": {
                        intro: { name: '战魂', content: 'mark', max: 4 },
                        onremove: 'storage',
                        markimage: 'extension/百年战争·序章/mark_bnzz_zhanHun.webp'
                    },

                    // 灼焰舞者·炙霞
                    "bnzz_qi_yeZhiYouHuo": {
                        audio: false,
                        logAudio(trigger) {
                            if (lib.config['extension_百年战争·序章_voiceAudio'] !== true)
                                return false;
                            const fromWhiteFlameBullet = typeof trigger?.getParent === 'function' &&
                                !!trigger.getParent(zhixia_P + 'baiYanDan', true);
                            return fromWhiteFlameBullet ? false : bnzzQiVoiceSkillPaths.bnzz_qi_yeZhiYouHuo;
                        },
                        trigger: { player: 'shouDaoShangHai' },
                        forced: true,
                        filter(event) { return event.faShu === true && event.num > 0; },
                        async content(event, trigger, player) { await player.addZhiShiWu(zhixia_ghost, 1); }
                    },
                    "bnzz_qi_baiYanDan": {
                        audio: false,
                        trigger: { source: 'gongJiWeiMingZhong' },
                        filter(event, player) {
                            return event.yingZhan !== true && event.source === player && event.player?.isIn();
                        },
                        async cost(event, trigger, player) {
                            const benefit = get.damageEffect2(trigger.player, player, 1) +
                                (zhixia_dancing(player) ? 0 : get.damageEffect2(player, player, 1));
                            event.result = await player.chooseBool(zhixia_dancing(player) ?
                                '白焰弹：对攻击目标造成1点法术伤害？火舞形态下不对自己造成伤害。' :
                                '白焰弹：对你和攻击目标各造成1点法术伤害？')
                                .set('choice', trigger.player?.side !== player.side && (zhixia_dancing(player) || lib.skill.bnzz_qi_ai.safe(player, 1)) && benefit > 0).forResult();
                        },
                        async content(event, trigger, player) {
                            const target = trigger.player;
                            const targets = zhixia_dancing(player) ? [target] : [player, target];
                            for (const current of targets.filter(Boolean).sortBySeat(player)) {
                                if (current.isIn())
                                    await current.faShuDamage(1, player, 'nocard');
                            }
                        }
                    },
                    "bnzz_qi_ranShaoDaiJin": {
                        audio: false,
                        logAudio(trigger, player) {
                            if (lib.config['extension_百年战争·序章_voiceAudio'] !== true)
                                return false;
                            if (player && typeof player.hasSkill === 'function' && zhixia_dancing(player))
                                return false;
                            return bnzzQiVoiceSkillPaths.bnzz_qi_ranShaoDaiJin;
                        },
                        trigger: { player: 'gongJiShi' },
                        priority: 5,
                        filter(event, player) {
                            return event.yingZhan !== true && !!event.card && player.countZhiShiWu(zhixia_ghost) >= 2;
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('燃烧殆尽：移除2点【幽火】，获得1【治疗】并移除攻击目标的【圣盾】？')
                                .set('choice', !!trigger.target?.hasExpansions('_shengDun') ||
                                player.zhiLiao < player.getZhiLiaoLimit() || zhixia_dancing(player)).forResult();
                        },
                        async content(event, trigger, player) {
                            if (player.countZhiShiWu(zhixia_ghost) < 2 || !trigger.card)
                                return;
                            await player.removeZhiShiWu(zhixia_ghost, 2);
                            await player.changeZhiLiao(1, player);
                            const target = trigger.target;
                            if (target?.isIn()) {
                                const shields = target.getExpansions('_shengDun');
                                if (shields.length)
                                    await target.discard(shields, '_shengDun').set('visible', true);
                            }
                            if (!zhixia_dancing(player))
                                return;
                            if (get.xiBie(trigger.card) !== 'huo' && player.countCards('h', card => get.xiBie(card) === 'huo' && get.type(card) === 'faShu' &&
                                zhixia_discardable(card, player, zhixia_P + 'ranShaoDaiJin')) > 0) {
                                const result = await player.chooseCard('h', 1, '燃烧殆尽：可弃1张火系法术牌【展示】，使本次攻击视为火系并无法应战', (card, player) => get.xiBie(card) === 'huo' && get.type(card) === 'faShu' &&
                                    lib.filter.cardDiscardable(card, player, 'bnzz_qi_ranShaoDaiJin'))
                                    .set('ai', card => 7 - get.value(card)).forResult();
                                const card = result?.cards?.[0];
                                if (result?.bool && card && get.xiBie(card) === 'huo' && get.type(card) === 'faShu' &&
                                    zhixia_discardable(card, player, zhixia_P + 'ranShaoDaiJin')) {
                                    await player.discard([card]).set('showCards', true);
                                    // Supplying cards creates a fresh VCard even if the source is
                                    // already virtual. Never change the physical attack card.
                                    const fireCard = get.autoViewAs(trigger.card, trigger.cards || []);
                                    game.setXiBie(fireCard, 'huo');
                                    trigger.card = fireCard;
                                    game.log(player, '令本次攻击视为火系');
                                }
                            }
                            if (get.xiBie(trigger.card) === 'huo')
                                trigger.wuFaYingZhan();
                        }
                    },
                    "bnzz_qi_huGuangSanShe": {
                        audio: false,
                        trigger: { player: 'gongJiShi' },
                        forced: true,
                        filter(event, player) { return event.yingZhan !== true && zhixia_dancing(player); },
                        async content(event, trigger, player) {
                            trigger.customArgs = trigger.customArgs || {};
                            if (trigger.customArgs[zhixia_scatter])
                                return;
                            trigger.customArgs[zhixia_scatter] = { owner: player.playerid, resolved: false };
                            trigger.changeDamageNum(1);
                        },
                        group: [zhixia_scatter + '_hit', zhixia_scatter + '_miss'],
                        subSkill: {
                            hit: {
                                audio: false,
                                trigger: { player: 'gongJiMingZhong' },
                                forced: true,
                                filter(event, player) { return event.yingZhan !== true && !!zhixia_scatterRecord(event, player); },
                                async content(event, trigger, player) { await zhixia_scatterDamage(trigger, player, trigger.target); }
                            },
                            miss: {
                                audio: false,
                                trigger: { source: 'gongJiWeiMingZhong' },
                                forced: true,
                                filter(event, player) {
                                    return event.yingZhan !== true && event.source === player &&
                                        !!event.card && get.xiBie(event.card) === 'huo' && !!zhixia_scatterRecord(event, player);
                                },
                                async content(event, trigger, player) { await zhixia_scatterDamage(trigger, player, trigger.player); }
                            }
                        }
                    },
                    "bnzz_qi_hunPoJiQu": {
                        audio: false,
                        type: 'faShu',
                        enable: 'faShu',
                        position: 'h',
                        discard: false,
                        lose: false,
                        filter(event, player) {
                            return game.hasPlayer(target => target.side !== player.side) &&
                                player.countZhiShiWu(zhixia_ghost) > 0 &&
                                player.countCards('h', card => get.type(card) === 'faShu' &&
                                    zhixia_discardable(card, player, zhixia_P + 'hunPoJiQu')) > 0 &&
                                player.countCards('h', card => get.type(card) === 'faShu' &&
                                    zhixia_discardable(card, player, zhixia_P + 'hunPoJiQu')) + player.countZhiShiWu(zhixia_ghost) > 2;
                        },
                        selectCard() {
                            const player = _status.event.player;
                            return [Math.max(1, 3 - player.countZhiShiWu('bnzz_qi_youHuo')), Infinity];
                        },
                        filterCard(card, player) {
                            return get.type(card) === 'faShu' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_hunPoJiQu');
                        },
                        selectTarget: 1,
                        filterTarget(card, player, target) { return target.side !== player.side; },
                        async content(event, trigger, player) {
                            const cards = event.cards || [];
                            const target = event.target;
                            if (!target?.isIn() || target.side === player.side || cards.length < 1 || new Set(cards).size !== cards.length ||
                                cards.some(card => get.type(card) !== 'faShu' || !zhixia_discardable(card, player, zhixia_P + 'hunPoJiQu')))
                                return;
                            const minimum = Math.max(1, 3 - cards.length);
                            const maximum = player.countZhiShiWu(zhixia_ghost);
                            if (minimum > maximum)
                                return;
                            const values = Array.from({ length: maximum - minimum + 1 }, (_, index) => minimum + index);
                            const controls = values.map(value => '移除' + value + '点幽火');
                            let amount = minimum;
                            if (values.length > 1) {
                                const result = await player.chooseControl(controls)
                                    .set('prompt', '魂魄汲取：已选择弃' + cards.length + '张法术牌，选择移除的幽火数')
                                    .set('bnzzQiGhost', Math.max(minimum, lib.skill.bnzz_qi_ai.ghost(player, cards.length))).set('ai', () => '移除' + _status.event.bnzzQiGhost + '点幽火').forResult();
                                const index = controls.indexOf(result?.control);
                                if (index < 0)
                                    return;
                                amount = values[index];
                            }
                            if (player.countZhiShiWu(zhixia_ghost) < amount || cards.length + amount <= 2 ||
                                cards.some(card => !zhixia_discardable(card, player, zhixia_P + 'hunPoJiQu')))
                                return;
                            if (cards.length)
                                await player.discard(cards).set('showCards', true);
                            if (player.countZhiShiWu(zhixia_ghost) < amount)
                                return;
                            if (amount)
                                await player.removeZhiShiWu(zhixia_ghost, amount);
                            const damage = cards.length + amount - 2;
                            for (const current of [target, player].sortBySeat(player)) {
                                if (current.isIn())
                                    await current.faShuDamage(damage, player, 'nocard');
                            }
                        },
                        check(card) { return 6 - get.value(card); },
                        ai: {
                            order: 3.6,
                            result: {
                                player(player) { return player.hasSkill('bnzz_qi_huoWuXingTai') ? 0 : -1; },
                                target(player, target) { return get.damageEffect(target, 1); }
                            }
                        }
                    },
                    "bnzz_qi_jiuZhuanShanWu": {
                        audio: false,
                        type: 'qiDong',
                        trigger: { player: 'qiDong' },
                        filter(event, player) { return player.canBiShaShuiJing(); },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('九转扇舞：支付1【水晶】，获得1【幽火】并横置进入火舞形态？')
                                .set('choice', lib.skill.bnzz_qi_ai.attacks(player).length > 0 || (player.countCards('h', c => get.type(c) === 'faShu') + player.countZhiShiWu('bnzz_qi_youHuo') >= 2 && lib.skill.bnzz_qi_ai.room(player) >= 0)).forResult();
                        },
                        async content(event, trigger, player) {
                            if (!player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            await player.addZhiShiWu(zhixia_ghost, 1);
                            await player.hengZhi();
                            if (player.isHengZhi())
                                player.addSkill(zhixia_dance);
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_youHuo": {
                        intro: { name: '幽火', content: 'mark', max: 3 },
                        onremove: 'storage',
                        markimage: 'extension/百年战争·序章/mark_bnzz_youHuo.webp'
                    },
                    "bnzz_qi_huoWuXingTai": {
                        audio: false,
                        mark: true,
                        markimage: 'extension/百年战争·序章/mark_bnzz_huoWuXingTai.webp',
                        intro: {
                            name: '火舞形态',
                            content: '你对自己造成的伤害-1；白焰弹不对自己造成伤害。（你的回合结束时）重置并脱离此形态。',
                            nocount: true
                        },
                        trigger: { source: 'zaoChengShangHai' },
                        forced: true,
                        filter(event, player) {
                            return zhixia_dancing(player) && event.source === player && event.player === player && event.num > 0;
                        },
                        async content(event, trigger) { trigger.changeDamageNum(-1); },
                        group: [zhixia_dance + '_end', zhixia_dance + '_reset'],
                        subSkill: {
                            end: {
                                audio: false,
                                trigger: { player: 'phaseEnd' },
                                forced: true,
                                async content(event, trigger, player) { await zhixia_leaveDance(player); }
                            },
                            reset: {
                                audio: false,
                                trigger: { player: 'chongZhiAfter' },
                                forced: true,
                                popup: false,
                                async content(event, trigger, player) { player.removeSkill(zhixia_dance); }
                            }
                        }
                    },

                    // 织魔者·蕾乌
                    "bnzz_qi_hunLiJiQu": {
                        audio: false, usable: 1,
                        trigger: { source: 'zaoChengShangHai' },
                        lastDo: true, priority: -10,
                        filter(event) { return event.num > 0; },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('魂力汲取：获得1点【治疗】？')
                                .set('choice', player.zhiLiao < player.getZhiLiaoLimit()).forResult();
                        },
                        async content(event, trigger, player) { await player.changeZhiLiao(1, player); }
                    },
                    "bnzz_qi_buWang": {
                        audio: false,
                        global: [leiwu_light, leiwu_dark, leiwu_conduct, leiwu_P + 'youBu'],
                        trigger: { player: 'phaseEnd' },
                        filter() { return leiwu_availableNets().length > 0; },
                        async cost(event, trigger, player) {
                            const options = leiwu_availableNets();
                            const control = await player.chooseControl(options.concat('cancel2'))
                                .set('prompt', '布网：选择未在场的专属网放在自己面前；直感形态下摸1张牌，否则对自己造成3点法术伤害')
                                .set('ai', () => {
                                    const p = _status.event.player;
                                    return p.hasSkill('bnzz_qi_zhiGanXingTai') ? (lib.skill.bnzz_qi_ai.room(p) >= 1 ? 0 : 'cancel2') : (lib.skill.bnzz_qi_ai.safe(p, 3) ? 0 : 'cancel2');
                                }).forResultControl();
                            event.result = { bool: options.includes(control), cost_data: control };
                        },
                        async content(event, trigger, player) {
                            if (!await leiwu_placeNet(player, event.cost_data))
                                return;
                            leiwu_playVoice(event.cost_data === leiwu_light ? 'guangWang' : 'anWang', player);
                            if (player.hasSkill(leiwu_form))
                                await player.draw(1);
                            else
                                await player.faShuDamage(3, player, 'nocard');
                        }
                    },
                    "bnzz_qi_xianZhen": {
                        audio: false, forced: true,
                        trigger: { global: ['gongJiEnd', 'faShuEnd', 'teShuEnd'] },
                        filter(event, player) {
                            if (event.player === player || event.player !== _status.currentPhase)
                                return false;
                            const action = leiwu_actionOf(event);
                            return !!action && !(action[leiwu_line] || []).includes(player.playerid);
                        },
                        async content(event, trigger, player) {
                            const action = leiwu_actionOf(trigger);
                            if (!action || (action[leiwu_line] || []).includes(player.playerid))
                                return;
                            action[leiwu_line] = action[leiwu_line] || [];
                            action[leiwu_line].push(player.playerid);
                            await leiwu_silenceOthers(player.addZhiShiWu(leiwu_bind, 1), player);
                            if (player.storage._bnzzQiLeiwuLineVoiceRound !== game.roundNumber) {
                                player.storage._bnzzQiLeiwuLineVoiceRound = game.roundNumber;
                                leiwu_playVoice('xianZhen', player);
                            }
                        },
                        group: [leiwu_line + '_clear', leiwu_line + '_silence'],
                        subSkill: {
                            clear: {
                                audio: false, forced: true,
                                trigger: { global: 'phaseEnd' },
                                filter(event, player) { return player.countZhiShiWu(leiwu_bind) > 0; },
                                async content(event, trigger, player) {
                                    const amount = player.countZhiShiWu(leiwu_bind);
                                    if (!amount)
                                        return;
                                    const next = leiwu_silenceOthers(player.removeZhiShiWu(leiwu_bind, amount), player);
                                    next.set('bnzzQiLineTurnPlayer', trigger.player);
                                    await next;
                                }
                            },
                            silence: {
                                audio: false, forced: true, popup: false, firstDo: true, priority: 1000,
                                trigger: { global: 'triggerSkill' },
                                filter(event, player) {
                                    return event.player !== player && event._trigger?.[leiwu_lineEvent] === player.playerid;
                                },
                                async content(event, trigger) { trigger.cancel(); }
                            }
                        }
                    },
                    "bnzz_qi_xiuQi": {
                        audio: false,
                        trigger: { player: 'phaseEnd' },
                        filter(event, player) { return player.hasSkill(leiwu_form); },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('休憩：重置并退出直感形态，弃到4张牌，随后可布置一个未在场的网并摸2张牌？')
                                .set('choice', true).forResult();
                        },
                        async content(event, trigger, player) {
                            if (!player.hasSkill(leiwu_form))
                                return;
                            await leiwu_exitForm(player);
                            const count = Math.min(Math.max(0, player.countCards('h') - 4), player.countCards('h', card => lib.filter.cardDiscardable(card, player, leiwu_rest)));
                            if (count > 0)
                                await player.chooseToDiscard('h', count, true, '休憩：弃到4张牌');
                            const options = leiwu_availableNets();
                            if (!options.length)
                                return;
                            const control = await player.chooseControl(options.concat('cancel2')).set('prompt', '休憩：可以放置一个未在场的网，再摸2张牌')
                                .set('ai', () => lib.skill.bnzz_qi_ai.room(_status.event.player) >= 2 ? 0 : 'cancel2').forResultControl();
                            if (options.includes(control) && await leiwu_placeNet(player, control)) {
                                leiwu_playVoice('buWang', player);
                                await player.draw(2);
                            }
                        }
                    },
                    "bnzz_qi_kuangLuanShuFu": {
                        audio: false,
                        trigger: { player: 'changeZhiShiWuEnd' },
                        filter(event, player) {
                            return event[leiwu_lineEvent] === player.playerid && event.zhiShiWu === leiwu_bind && event.num < 0 &&
                                event.bnzzQiLineTurnPlayer?.isIn() && player.canBiShaShuiJing() && leiwu_freshNets(player).length > 0;
                        },
                        async cost(event, trigger, player) {
                            const options = leiwu_freshNets(player);
                            const control = await player.chooseControl(options.concat('cancel2'))
                                .set('prompt', '狂乱束缚：支付1水晶并激发一个网，对当前回合角色造成' + (1 - trigger.num) + '点法术伤害')
                                .set('bnzzQiLineTarget', trigger.bnzzQiLineTurnPlayer)
                                .set('ai', () => _status.event.bnzzQiLineTarget.side !== _status.event.player.side ? 0 : 'cancel2').forResultControl();
                            event.result = { bool: options.includes(control), cost_data: control };
                        },
                        async content(event, trigger, player) {
                            const id = event.cost_data, target = trigger.bnzzQiLineTurnPlayer;
                            if (!leiwu_freshNets(player).includes(id) || !target?.isIn() || !player.canBiShaShuiJing())
                                return;
                            const amount = 1 - trigger.num;
                            await player.removeBiShaShuiJing();
                            if (!leiwu_freshNets(player).includes(id))
                                return;
                            leiwu_setEnergized(player, id, true);
                            game.log(player, '激发了', '#y' + get.translation(id));
                            if (target.isIn())
                                await target.faShuDamage(amount, player, 'nocard');
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_zhiGanZhiYan": {
                        audio: false, type: 'qiDong',
                        trigger: { player: 'qiDong' },
                        filter(event, player) { return player.canBiShaShuiJing(); },
                        async content(event, trigger, player) {
                            if (!player.canBiShaShuiJing())
                                return;
                            await player.removeBiShaShuiJing();
                            await player.hengZhi();
                            player.addSkill(leiwu_form);
                        },
                        ai: { shuiJing: true }
                    },
                    "bnzz_qi_zhiGanXingTai": {
                        audio: false, charlotte: true, mark: true, markimage: 'extension/百年战争·序章/mark_bnzz_zhiGanXingTai.webp',
                        intro: { name: '直感形态', content: '对其他角色造成的法术伤害+1；（下个行动阶段开始前）重置并退出。', nocount: true },
                        forced: true,
                        trigger: { source: 'zaoChengShangHai' },
                        filter(event, player) { return event.faShu === true && event.player !== player; },
                        async content(event, trigger) { trigger.changeDamageNum(1); },
                        group: [leiwu_form + '_expire', leiwu_form + '_reset'],
                        subSkill: {
                            expire: {
                                audio: false, forced: true, firstDo: true, priority: 100,
                                trigger: { player: 'xingDongBefore' },
                                async content(event, trigger, player) { await leiwu_exitForm(player); }
                            },
                            reset: {
                                audio: false, forced: true, popup: false,
                                trigger: { player: 'chongZhiAfter' },
                                async content(event, trigger, player) { player.removeSkill(leiwu_form); }
                            }
                        }
                    },
                    "bnzz_qi_daoMo": {
                        audio: false,
                        trigger: { global: 'zaoChengShangHai' },
                        filter(event, player) {
                            const source = event.source;
                            return source && source !== player && source.side === player.side && _status.currentPhase === source &&
                                leiwu_nets.some(id => leiwu_hasNet(player, id)) && event.faShu === true && event.num > 0 &&
                                !event[leiwu_used] && !event[leiwu_recoil];
                        },
                        async cost(event, trigger, player) {
                            event.result = await player.chooseBool('导魔：令队友本次法术伤害+1，并对你造成1点法术伤害？').forResult();
                        },
                        async content(event, trigger, player) {
                            const source = trigger.source;
                            if (trigger[leiwu_used] || trigger[leiwu_recoil] || !player.isIn() || !source?.isIn() ||
                                source === player || source.side !== player.side || _status.currentPhase !== source ||
                                !leiwu_nets.some(id => leiwu_hasNet(player, id)))
                                return;
                            // Both exclusive cards share one event lock. Recoil never conducts again.
                            trigger[leiwu_used] = true;
                            trigger.changeDamageNum(1);
                            leiwu_playVoice('daoMo', player);
                            await player.faShuDamage(1, source, 'nocard').set(leiwu_recoil, true);
                        }
                    },
                    "bnzz_qi_youBu": {
                        audio: false, forced: true,
                        trigger: { player: 'daChuPai' },
                        filter(event, player) { return leiwu_handPlay(event) && leiwu_traps(player, get.xiBie(event.card)).length > 0; },
                        async content(event, trigger, player) {
                            const element = get.xiBie(trigger.card), id = element === 'guang' ? leiwu_light : leiwu_dark;
                            const owners = leiwu_traps(player, element);
                            for (const owner of owners) {
                                if (!owner.isIn() || !leiwu_hasNet(owner, id) || leiwu_energized(owner, id))
                                    continue;
                                await player.faShuDamage(3, owner, 'nocard');
                                leiwu_playVoice('yinBu', owner);
                                await leiwu_removeNet(owner, id);
                            }
                        }
                    },
                    "bnzz_qi_shuFu": {
                        mark: true, markimage: 'extension/百年战争·序章/mark_bnzz_shuFu.webp',
                        intro: { name: '束缚', content: 'mark', max: 5 }
                    },
                    // Read-only exclusive entries, matching the core 风穴 presentation.
                    "bnzz_qi_guangWang_description": {},
                    "bnzz_qi_anWang_description": {},
                    "bnzz_qi_guangWang": leiwu_createNetSkill("bnzz_qi_guangWang"),
                    "bnzz_qi_anWang": leiwu_createNetSkill("bnzz_qi_anWang")
                },
                translate: {
                    // 内部技能也会进入触发顺序选择；补名称，不增加角色说明条目。
                    "bnzz_qi_miaoZhunXingTai_reset": '瞄准形态',
                    "bnzz_qi_zhouFuZhiChui_track": '咒赋之锤',
                    "bnzz_qi_zhouFuZhiChui_cap": '咒赋之锤',
                    "bnzz_qi_zhouFuZhiChui_clear": '咒赋之锤',
                    "bnzz_qi_zhenYanXingTai_special": '阵眼形态',
                    "bnzz_qi_zhenYanXingTai_reset": '阵眼形态',
                    "bnzz_qi_niZongJuJi_hit": '匿踪狙击',
                    "bnzz_qi_huiGuangYueLv_record": '辉光乐律',
                    "bnzz_qi_huiGuangYueLv_reset": '辉光乐律',
                    "bnzz_qi_jieJieSheJi_damage": '结界射击',
                    "bnzz_qi_siWangLangYong_record": '死亡浪涌',
                    "bnzz_qi_siWangLangYong_reset": '死亡浪涌',
                    "bnzz_qi_xueYueHuGuang_setup": '血月弧光',
                    "bnzz_qi_huoWuXingTai_reset": '火舞形态',
                    "bnzz_qi_xianZhen_silence": '线振',
                    "bnzz_qi_zhiGanXingTai_reset": '直感形态',
                    "bnzz_qi_ciDiJianZou_backup": '次第渐奏',
                    "bnzz_qi_sanhua_actionAudio": '特殊行动',
                    // 冰霜剑宗·散华
                    "bnzz_qi_gongFangZhiRen": "被动【攻防之刃】",
                    "bnzz_qi_gongFangZhiRen_renNai": "攻防之刃",
                    "bnzz_qi_gongFangZhiRen_info": "（主动攻击时①）+1【蓄力】；（实际承受伤害时⑥）+1【忍耐】。",
                    "bnzz_qi_jiHanJianRen": "响应【极寒剑刃】",
                    "bnzz_qi_jiHanJianRen_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（主动攻击命中时②，弃置1张水系牌【展示】）</span>本次攻击伤害额外+1。",
                    "bnzz_qi_jiaoCuoLianZhan": "响应【交错连斩】",
                    "bnzz_qi_jiaoCuoLianZhan_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（【攻击行动】结束时，移除2</span><span style=\"color:#74C8EE\">【蓄力】</span><span style=\"color:#E6B85C\">）</span>+1【攻击行动】；本次额外主动攻击不因【攻防之刃】获得<span style=\"color:#74C8EE\">【蓄力】</span>。",
                    "bnzz_qi_yuJianJiDao": "响应【御剑极道】",
                    "bnzz_qi_yuJianJiDao_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（你被主动攻击命中时②，若你的手牌数＞3）</span>弃置1张法术牌【展示】。",
                    "bnzz_qi_shouHuJianLing": "响应【守护剑灵】",
                    "bnzz_qi_shouHuJianLing_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（我方角色受到伤害时③，移除X</span><span style=\"color:#9DB9DA\">【忍耐】</span><span style=\"color:#E6B85C\">）</span>抵御X点该次伤害，你摸<span style=\"color:#E6B85C\">（X-1）</span>张牌。",
                    "bnzz_qi_wuJinHanLiu": "响应【无尽寒流】",
                    "bnzz_qi_wuJinHanLiu_convert": "无尽寒流·转换",
                    "bnzz_qi_wuJinHanLiu_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">（主动攻击前发动①，若攻击牌为技命格）</span>本次攻击无法应战；<br><span style=\"color:#E6B85C\">（本次【攻击行动】结束时）</span>可以将1<span style=\"color:#74C8EE\">【蓄力】</span>转换为1<span style=\"color:#9DB9DA\">【忍耐】</span>，或将1<span style=\"color:#9DB9DA\">【忍耐】</span>转换为1<span style=\"color:#74C8EE\">【蓄力】</span>。",
                    "bnzz_qi_xuLi": "蓄力",
                    "bnzz_qi_xuLi_info": "<!--diy-skill-description-->专属指示物，上限为3。",
                    "bnzz_qi_renNai": "忍耐",
                    "bnzz_qi_renNai_info": "<!--diy-skill-description-->专属指示物，上限为2。",

                    // 近卫枪手·伽纳
                    "bnzz_qi_baoPoDanYao": '响应【爆破弹药】',
                    "bnzz_qi_baoPoDanYao_miss": '爆破弹药',
                    "bnzz_qi_baoPoDanYao_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（主动攻击时①，弃置1张与本次攻击同系的牌【展示】）</span>本次攻击伤害额外+1；<br><span style=\"color:#E6B85C\">（若未命中②）</span>对攻击目标和你各造成1点攻击伤害③，<span style=\"color:#E6B85C\">（若弃牌为法术牌）</span>该效果对双方造成的伤害额外+1。",
                    "bnzz_qi_shangTang": '启动【上膛】',
                    "bnzz_qi_shangTang_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（你摸1或3张牌）</span>【横置】，进入【瞄准形态】，此形态下你受到的主动攻击伤害+1。",
                    "bnzz_qi_shuangFaSheJi": '被动【双发射击】',
                    "bnzz_qi_shuangFaSheJi_info": '（仅【瞄准形态】下，主动攻击命中时②）对攻击目标以外的另一名对手造成2点攻击伤害③；你【重置】脱离此形态。',
                    "bnzz_qi_huWeiJiDong": '响应【护卫机动】',
                    "bnzz_qi_huWeiJiDong_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（目标队友被主动攻击命中时②，你弃置1张风系牌【展示】）</span>他弃置1张牌；<br><span style=\"color:#E6B85C\">（若你处于</span><span style=\"color:#D2B365\">【瞄准形态】</span><span style=\"color:#E6B85C\">）</span>【重置】脱离此形态。",
                    "bnzz_qi_teZhuangDanYao": '响应【特装弹药】',
                    "bnzz_qi_teZhuangDanYao_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">（主动攻击前发动①）</span>选择一项发动：<br>·本次攻击无法应战，攻击伤害-1；<br>·视为本次攻击发动了【爆破弹药】。",
                    "bnzz_qi_miaoZhunXingTai": '瞄准形态',
                    "bnzz_qi_miaoZhunXingTai_info": "<!--diy-skill-description-->你受到主动攻击的伤害额外+1；<br><span style=\"color:#E6B85C\">（【重置】时）</span>脱离此形态。",

                    // 放逐骑士·扎克斯
                    "bnzz_qi_zhouFuZhiChui": '启动【咒赋之锤】',
                    "bnzz_qi_zhouFuZhiChui_boost": '咒赋之锤',
                    "bnzz_qi_zhouFuZhiChui_miss": '咒赋之锤',
                    "bnzz_qi_zhouFuZhiChui_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（移除我方战绩区X【星石】）</span>选择X项效果发动，X最大为2：<br>·本回合攻击伤害额外+2，但每次攻击至多造成1点士气下降。<br>·<span style=\"color:#E6B85C\">（本回合第一次主动攻击未命中时②）</span>摸1张牌，弃置2张牌，额外+1【攻击行动】。",
                    "bnzz_qi_jingJiMiYi": '响应【荆棘秘仪】',
                    "bnzz_qi_jingJiMiYi_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（主动攻击前发动①）</span>将本次攻击目标改为1名队友，且伤害-1；其应战正常指定对手。",
                    "bnzz_qi_hongLianYeHuo": '响应【红莲业火】',
                    "bnzz_qi_hongLianYeHuo_info": '（主动攻击时①，若攻击牌为火系）选择一项：<br>• 移除攻击目标1【治疗】<br>• 选择一项本回合未发动的【咒赋之锤】的效果发动。',
                    "bnzz_qi_fuWenZuDuan": '响应【符文阻断】',
                    "bnzz_qi_fuWenZuDuan_info": "【回合限定】【水晶】（主动攻击命中时②）本次攻击不造成伤害，你与攻击目标各选择自己1张手牌【交换】；将我方战绩区的1【宝石】转换为2【水晶】，或反之。",
                    "bnzz_qi_chiSeJiMie": '响应【赤色寂灭】',
                    "bnzz_qi_chiSeJiMie_info": "<!--diy-skill-description--><span style=\"color:#E02B17\">【宝石】</span><span style=\"color:#E6B85C\">（主动攻击前发动①）</span>本次攻击无法应战；<br><span style=\"color:#E6B85C\">（你可以额外弃置1张法术牌【展示】）</span>选择一项本回合未发动的<span style=\"color:#B695D9\">【咒赋之锤】</span>的效果发动；<br><span style=\"color:#E6B85C\">（若弃牌为技命格）</span>本次攻击强制命中。",

                    // 药剂学者·莎娜
                    "bnzz_qi_huiFuZhiJi": '法术【恢复制剂】',
                    "bnzz_qi_huiFuZhiJi_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（弃置1张水系牌【展示】）</span>目标角色+1【治疗】，你摸1张牌，+1【攻击行动】。",
                    "bnzz_qi_dingDangBaoZha": '响应【叮当爆炸】',
                    "bnzz_qi_dingDangBaoZha_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（【攻击行动】结束时）</span>+1【法术行动】。",
                    "bnzz_qi_duXingYinBao": '响应【毒性引爆】',
                    "bnzz_qi_duXingYinBao_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（场上有【中毒】触发时，你弃置1张与之同系的牌【展示】）</span>本次中毒伤害额外+1；<br><span style=\"color:#E6B85C\">（此【中毒】进入弃牌堆时）</span>你可以将其加入手牌。",
                    "bnzz_qi_duXingYinBao_recover": '毒性引爆·回收',
                    "bnzz_qi_yingJiChuLi": '响应【应急处理】',
                    "bnzz_qi_yingJiChuLi_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（任何人对我方角色实际造成法术伤害时⑤，若本次伤害＞1，弃置1张地系牌【展示】）</span>抵御1点本次伤害，你摸1张牌。",
                    "bnzz_qi_duBaoZhiJi": '法术【毒爆制剂】',
                    "bnzz_qi_duBaoZhiJi_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span>对2名对手各造成1点法术伤害③；<span style=\"color:#E6B85C\">（若额外移除我方角色的1【能量】）</span>伤害额外+1。",

                    // 风云之灵·承月
                    "bnzz_qi_ziRanBianHuan": '被动【自然变幻】',
                    "bnzz_qi_ziRanBianHuan_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（你获得</span><span style=\"color:#E02B17\">【宝石】</span><span style=\"color:#E6B85C\">时）</span>你+1<span class='lan'>【水晶】</span>，弃置1张牌，摸1张牌。",
                    "bnzz_qi_fengZhiYan": '法术【风之眼】',
                    "bnzz_qi_fengZhiYan_info": "（你将1张牌交给1名其他角色）你摸1张牌，+1【治疗】。",
                    "bnzz_qi_fengSeFaDian": '法术【风色法典】',
                    "bnzz_qi_fengSeFaDian_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（弃置X张风系牌【展示】）</span>根据弃牌数量，发动一项对应的效果：<br>·<span style=\"color:#E6B85C\">（1张）</span>目标角色弃置1张牌，你或他+1【治疗】。<br>·<span style=\"color:#E6B85C\">（2张）</span>对目标角色造成2点法术伤害③。<br>·<span style=\"color:#E6B85C\">（3张）</span>指定1名其他角色，他将手牌补至上限或全部弃置。<br>·<span style=\"color:#E6B85C\">（4张）</span>指定2名其他角色，除他们以外的其余角色各交给你1张手牌，你可以分别将1～3张牌交给这2名角色。<span style=\"color:#E6B85C\">（若发动时未响应【风流环绕】）</span>我方战绩区+1<span style=\"color:#E02B17\">【宝石】</span>。",
                    "bnzz_qi_fengLiuHuanRao": '响应【风流环绕】',
                    "bnzz_qi_fengLiuHuanRao_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（你弃牌并展示时，每有1张法术牌）</span>选择一项发动：<br>·对目标对手和你各造成1点法术伤害③<br>·指定1名其他角色弃置1张牌。",
                    "bnzz_qi_yiFengJiHua": '响应【异风激化】',
                    "bnzz_qi_yiFengJiHua_info": "【水晶】【优先响应】（任意角色的风系攻击命中时②）本次攻击伤害+1或-1；你决定本次攻击获得的【星石】种类。",
                    "bnzz_qi_yiFengJiHua_reward": '异风激化·星石',
                    "bnzz_qi_fengYunZhouFa": '响应【风云咒法】',
                    "bnzz_qi_fengYunZhouFa_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">（你从手中打出基础牌时）</span>指定其中1张牌视为风系；<br><span style=\"color:#E6B85C\">（发动【风色法典】时，额外弃置1张不为风系的牌）</span>将其视为风系一同弃置。",

                    // 求道者·九萌
                    "bnzz_qi_shenSuFu": '法术【神速符】',
                    "bnzz_qi_shenSuFu_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（弃置X张风系牌【展示】，X＜3）</span>目标队友弃置X张牌，+<span style=\"color:#E6B85C\">（X-1）</span>【治疗】。",
                    "bnzz_qi_tianHuoFu": '法术【天火符】',
                    "bnzz_qi_tianHuoFu_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（弃置X张火系牌【展示】，X＜3）</span>对目标角色造成X点法术伤害③。",
                    "bnzz_qi_jieZhenBaMenTianDiFa": '启动【结阵·八门天地法】',
                    "bnzz_qi_jieZhenBaMenTianDiFa_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（手牌达到上限时，弃置1～3张牌）</span>【横置】进入<span style=\"color:#A2D6BB\">【阵眼形态】</span>，+X<span style=\"color:#66CBB5\">【元力】</span>（X为你的弃牌数）；此形态下不能发动【神速符】、【天火符】。<br><span style=\"color:#E6B85C\">（执行【特殊行动】时）</span>【重置】脱离此形态并移除所有<span style=\"color:#66CBB5\">【元力】</span>。",
                    "bnzz_qi_tianDiJian": '被动【天地剑】',
                    "bnzz_qi_tianDiJian_info": '（仅【阵眼形态】下）你发动的所有攻击伤害额外+1。',
                    "bnzz_qi_zhenMenLeiJi": '响应【阵门雷击】',
                    "bnzz_qi_zhenMenLeiJi_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（仅</span><span style=\"color:#A2D6BB\">【阵眼形态】</span><span style=\"color:#E6B85C\">下，目标对手主动攻击命中时②，移除1</span><span style=\"color:#66CBB5\">【元力】</span><span style=\"color:#E6B85C\">）</span>对他造成2点法术伤害③。",
                    "bnzz_qi_yuanLiFanShi": '被动【元力反噬】',
                    "bnzz_qi_yuanLiFanShi_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（仅</span><span style=\"color:#A2D6BB\">【阵眼形态】</span><span style=\"color:#E6B85C\">下，你的手牌或</span><span style=\"color:#66CBB5\">【元力】</span><span style=\"color:#E6B85C\">为0时）</span>【重置】脱离此形态，对自己造成3点法术伤害③；<span style=\"color:#E6B85C\">（若因手牌为0触发）</span>移除所有<span style=\"color:#66CBB5\">【元力】</span>，本次伤害额外+X，X为移除的<span style=\"color:#66CBB5\">【元力】</span>数。",
                    "bnzz_qi_wuLiangTianLei": '法术【无量天雷】',
                    "bnzz_qi_wuLiangTianLei_info": "<!--diy-skill-description--><span style=\"color:#E02B17\">【宝石】</span><span style=\"color:#E6B85C\">（</span><span style=\"color:#66CBB5\">【元力】</span><span style=\"color:#E6B85C\">＞0，移除所有</span><span style=\"color:#66CBB5\">【元力】</span><span style=\"color:#E6B85C\">并弃置等量牌）</span>对2名目标对手各造成<span style=\"color:#E02B17\">（4-X）</span>点法术伤害③，X为移除的<span style=\"color:#66CBB5\">【元力】</span>数。",
                    "bnzz_qi_yuanLi": '元力',
                    "bnzz_qi_yuanLi_info": '专属指示物，上限是3。',
                    "bnzz_qi_zhenYanXingTai": '阵眼形态',
                    "bnzz_qi_zhenYanXingTai_info": "<!--diy-skill-description-->不能发动【神速符】、【天火符】；所有攻击伤害+1。<br><span style=\"color:#E6B85C\">（【特殊行动】时）</span>【重置】并移除所有【元力】；<br><span style=\"color:#E6B85C\">（手牌或【元力】为0时）</span>触发【元力反噬】。",

                    // 狙击手·兰卡
                    "bnzz_qi_xunMiZhanJi": '启动【寻觅战机】',
                    "bnzz_qi_xunMiZhanJi_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（你弃置1张牌）</span>摸1张牌，本回合不能发动【匿踪狙击】。<span style=\"color:#E6B85C\">（若你尚未【横置】）</span>从牌堆摸1张牌作为<span style=\"color:#D7B27E\">【枪弹】</span>并【横置】，<span style=\"color:#E6B85C\">（若</span><span style=\"color:#D7B27E\">【枪弹】</span><span style=\"color:#E6B85C\">已满）</span>弃置这张牌；<br><span style=\"color:#E6B85C\">（若额外摸1张牌）</span>将你的1<span style=\"color:#E02B17\">【宝石】</span>转换为2<span class='lan'>【水晶】</span>。",
                    "bnzz_qi_xunMiZhanJi_block": '寻觅战机',
                    "bnzz_qi_zhuangTian": '响应【装填】',
                    "bnzz_qi_zhuangTian_info": '（主动攻击前①，若【枪弹】数量＜2）将1张手牌面朝下作为【枪弹】；（若【枪弹】数量≥2，移除我方战绩区2【星石】）你+1【水晶】。',
                    "bnzz_qi_zhiYuanSheJi": '响应【支援射击】',
                    "bnzz_qi_zhiYuanSheJi_info": '【回合限定】（队友主动攻击命中时②，移除1个【枪弹】）本次攻击伤害+1，你【重置】。',
                    "bnzz_qi_kuaiSuZhuangTian": '启动【快速装填】',
                    "bnzz_qi_kuaiSuZhuangTian_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">（移除X个</span><span style=\"color:#D7B27E\">【枪弹】</span><span style=\"color:#E6B85C\">）</span>无视上限从牌堆摸（X+1）张牌作为<span style=\"color:#D7B27E\">【枪弹】</span>，你可以将1张手牌与1个<span style=\"color:#D7B27E\">【枪弹】</span>交换。",
                    "bnzz_qi_niZongJuJi": '响应【匿踪狙击】',
                    "bnzz_qi_niZongJuJi_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">（主动攻击前发动①，若你已【横置】）</span>本次攻击无法应战，且伤害额外+（X+1）（X为超出上限的<span style=\"color:#D7B27E\">【枪弹】</span>数量）；<br><span style=\"color:#E6B85C\">（若命中②）</span>你将<span style=\"color:#D7B27E\">【枪弹】</span>数量调整至1并【重置】。",
                    "bnzz_qi_qiangDan": '枪弹',
                    "bnzz_qi_qiangDan_info": "<!--diy-skill-description-->盖牌，上限是2。",

                    // 供能技师·萝可
                    "bnzz_qi_nengYuanWeiHu": '被动【能源维护】',
                    "bnzz_qi_nengYuanWeiHu_info": "（游戏初始时）你获得【蓄能池】。",
                    "bnzz_qi_ceLiuChongNeng": '响应【侧流充能】',
                    "bnzz_qi_ceLiuChongNeng_info": '（你提炼仅1【星石】后）将我方战绩区1【星石】提炼给目标队友。',
                    "bnzz_qi_xingNengZhuanHuan": '响应【星能转换】',
                    "bnzz_qi_xingNengZhuanHuan_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（主动攻击命中时②）</span>选择一项执行：<br>·<span style=\"color:#E6B85C\">（将敌方战绩区的1【星石】（优先</span><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">）转移至</span><span style=\"color:#62C9DF\">【蓄能池】</span><span style=\"color:#E6B85C\">）</span>本次攻击伤害-1。<br>·<span style=\"color:#E6B85C\">（移除</span><span style=\"color:#62C9DF\">【蓄能池】</span><span style=\"color:#E6B85C\">X【星石】，X＜3）</span>本次攻击伤害额外+X。",
                    "bnzz_qi_jiaoHuShuNiu": '法术【交互枢纽】',
                    "bnzz_qi_jiaoHuShuNiu_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（移除</span><span style=\"color:#62C9DF\">【蓄能池】</span><span style=\"color:#E6B85C\">2</span><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">）</span>你和目标队友选择1张手牌【交换】；你+1【攻击行动】，本次攻击可以发动独有技【精准射击】。",
                    "bnzz_qi_jiaoHuShuNiu_precise": '独有技【精准射击】',
                    "bnzz_qi_nengJiFenLiu": '响应【能级分流】',
                    "bnzz_qi_nengJiFenLiu_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（队友受到可应战的主动攻击时①，移除</span><span style=\"color:#62C9DF\">【蓄能池】</span><span style=\"color:#E6B85C\">2</span><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">，你弃置2张牌【展示】）</span><br><span style=\"color:#E6B85C\">（若弃牌为非暗系的同系牌）</span>视为他以原系列应战此次攻击；<br><span style=\"color:#E6B85C\">（若弃牌中含有暗系牌）</span>视为他以暗系应战此次攻击；<br><span style=\"color:#E6B85C\">（若均不是）</span>他可以选择1～2张弃牌加入手牌。",
                    "bnzz_qi_gaoNengShuSong": '启动【高能输送】',
                    "bnzz_qi_gaoNengShuSong_info": '（移除【蓄能池】2【水晶】）目标队友+1【宝石】，或+1【水晶】并+1【治疗】。',
                    "bnzz_qi_xuNengChi": '专属【蓄能池】',
                    "bnzz_qi_xuNengChi_info": "<!--diy-skill-description--><span class='greentext'>被动【蓄能机构】</span><br>此牌上至多存在4个【星石】；<br><span style=\"color:#E6B85C\">（你获得【星石】时）</span>直接添加至此牌；<br><span style=\"color:#E6B85C\">（此牌上的【星石】满时）</span>你无法执行【提炼】或获得【星石】；<br><span style=\"color:#E6B85C\">（获得</span><span style=\"color:#E02B17\">【宝石】</span><span style=\"color:#E6B85C\">时，若此卡上没有【星石】）</span>将其转换为2<span class='lan'>【水晶】</span>。",

                    // 回响乐师·恩普洛斯
                    "bnzz_qi_huiGuangYueLv": '被动【辉光乐律】',
                    "bnzz_qi_huiGuangYueLv_info": "（你的回合结束时，若本回合造成过法术伤害③）你+1【乐律】；（你实际承受2点以上的法术伤害时⑥）我方战绩区+1【宝石】。",
                    "bnzz_qi_yinLvZhiBi": '被动【音律之壁】',
                    "bnzz_qi_yinLvZhiBi_info": "【优先响应】<!--diy-skill-description--><span style=\"color:#E6B85C\">（你面前存在【圣盾】时）</span>你可以使面前的其他基础效果无法被触发；<br><span style=\"color:#E6B85C\">（你面前的【圣盾】被移除后）</span>移除你面前的其他所有基础效果，对自己造成X点法术伤害③（X为以此被移除的基础效果数量）。",
                    "bnzz_qi_yinLvZhiBi_collapse": '音律之壁',
                    "bnzz_qi_jiDangYinFu": '响应【激荡音符】',
                    "bnzz_qi_jiDangYinFu_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（场上任意角色的【圣盾】被移除时，弃置1张法术牌【展示】）</span>对除他以外的1名目标角色造成1点法术伤害③，你+1<span style=\"color:#E4BD66\">【乐律】</span>。",
                    "bnzz_qi_ciDiJianZou": '法术【次第渐奏】',
                    "bnzz_qi_ciDiJianZou_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（弃置2张同命格牌【展示】）</span>先对自己造成1点法术伤害③。X为发动前<span style=\"color:#E4BD66\">【乐律】</span>数：<br><span style=\"color:#E6B85C\">（未达上限时）</span>选择对X名其他角色各造成1点法术伤害③，或令X名其他角色各弃置1张牌；<br><span style=\"color:#E6B85C\">（达到上限时）</span>改为移除所有<span style=\"color:#E4BD66\">【乐律】</span>，对目标对手和自己各造成X点法术伤害③。",
                    "bnzz_qi_wanQiQiMing": '启动【万器齐鸣】',
                    "bnzz_qi_wanQiQiMing_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span>本回合你的技能对其他角色的效果数值+1；目标人数不因此增加。",
                    "bnzz_qi_wanQiQiMing_effect": '万器齐鸣',
                    "bnzz_qi_gongMingBeiYue": '法术【共鸣悲乐】',
                    "bnzz_qi_gongMingBeiYue_info": "<!--diy-skill-description--><span style=\"color:#E02B17\">【宝石】</span>对目标对手造成2点法术伤害③；你可以选择一项发动：<br>·使用1张独有技【天使之墙】<br>·将你面前的1个基础效果加入手牌。",
                    "bnzz_qi_yueLv": '乐律',
                    "bnzz_qi_yueLv_info": '专属指示物，上限是3。',

                    // 精灵斥候·阿芙洛蒂亚
                    "bnzz_qi_shanShuoZhiGuang": '被动【闪烁之光】',
                    "bnzz_qi_shanShuoZhiGuang_info": '（使用法术牌时）你+1【闪现】。',
                    "bnzz_qi_xianXingZhenCha": '响应【先行侦查】',
                    "bnzz_qi_xianXingZhenCha_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（队友受到主动攻击时①，移除1</span><span style=\"color:#88D5B5\">【闪现】</span><span style=\"color:#E6B85C\">；或你受到攻击时①）</span>移除牌库顶1张牌【展示】；<br><span style=\"color:#E6B85C\">（若此牌为水系或地系）</span>目标角色+1【治疗】；<br><span style=\"color:#E6B85C\">（若为光系或暗系）</span>对目标对手造成1点法术伤害③；<br><span style=\"color:#E6B85C\">（若为其他系别的法术牌）</span>你+1<span style=\"color:#88D5B5\">【闪现】</span>。",
                    "bnzz_qi_jiSuMoSha": '响应【疾速抹杀】',
                    "bnzz_qi_jiSuMoSha_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（主动攻击时①，移除3【闪现】）</span>本次攻击无法应战；<br><span style=\"color:#E6B85C\">（若额外移除我方角色合计2【治疗】）</span>本次攻击强制命中。",
                    "bnzz_qi_zhanShuCheTui": '响应【战术撤退】',
                    "bnzz_qi_zhanShuCheTui_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（我方角色【治疗】减少并结算后，若【闪现】未达到上限，弃置1张水系牌【展示】）</span>选择一项发动：<br>·你+1<span style=\"color:#88D5B5\">【闪现】</span><br>·他+1【治疗】。",
                    "bnzz_qi_jieJieSheJi": '响应【结界射击】',
                    "bnzz_qi_jieJieSheJi_info": "【回合限定】<!--diy-skill-description--><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">（主动攻击命中时②）</span>本次攻击伤害不能用【治疗】抵御；<br><span style=\"color:#E6B85C\">（主动攻击未命中时②）</span>任意分配2【治疗】给我方角色，且<span style=\"color:#E6B85C\">（若分配后你的【治疗】达到上限）</span>你弃置1张牌【展示】；<br><span style=\"color:#E6B85C\">（若此弃牌为圣命格）</span>你+1<span style=\"color:#88D5B5\">【闪现】</span>。",
                    "bnzz_qi_shanXian": '闪现',
                    "bnzz_qi_shanXian_info": '专属指示物，上限是3。',

                    // 翎羽骑士·洛肯·煌
                    "bnzz_qi_dunJi": '被动【盾击】',
                    "bnzz_qi_dunJi_info": '（你面前存在【圣盾】时）你与之同系的主动攻击伤害额外+1。',
                    "bnzz_qi_zhuangBeiJianCha": '法术【装备检查】',
                    "bnzz_qi_zhuangBeiJianCha_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（除你以外的目标角色给你1张牌）</span>你选择一项发动：<br>·你额外+1【攻击行动】，<span style=\"color:#E6B85C\">（若这张牌为【圣盾】）</span>你可以立即对自己使用；<br>·<span style=\"color:#E6B85C\">（移除你的1【治疗】）</span>给他1张牌，他+1【治疗】。",
                    "bnzz_qi_zhanShuChongFeng": '响应【战术冲锋】',
                    "bnzz_qi_zhanShuChongFeng_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（主动攻击时①，指定目标队友）</span>他弃置1张牌【展示】，摸1张牌，<span style=\"color:#E6B85C\">（若弃牌与本次攻击同系）</span>本次攻击伤害额外+1。",
                    "bnzz_qi_lvJiJingShen": '响应【律己精神】',
                    "bnzz_qi_lvJiJingShen_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（你受到伤害时③，弃置1张水系牌【展示】）</span>摸1张牌，我方目标角色+1【治疗】。",
                    "bnzz_qi_zhanShiXiuZheng": '法术【战时修整】',
                    "bnzz_qi_zhanShiXiuZheng_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span>目标我方角色将手牌调整至4张，+1【治疗】；<br><span style=\"color:#E6B85C\">（若指定队友且他因此弃牌）</span>你可以将他弃置的牌全部加入手牌，<span style=\"color:#E6B85C\">（若如此做）</span>你+1【治疗】。",

                    // 海神祭司·让·梅莎拉
                    "bnzz_qi_daHaiZhuFu": '被动【大海祝福】',
                    "bnzz_qi_daHaiZhuFu_info": '你的【治疗】上限+1；（使用法术牌时）你+1【治疗】。',
                    "bnzz_qi_shenLiCiFu": '响应【神力赐福】',
                    "bnzz_qi_shenLiCiFu_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（【攻击行动】结束时）</span>你摸1张牌，弃置1张牌。",
                    "bnzz_qi_juLangTaoTian": '法术【巨浪滔天】',
                    "bnzz_qi_juLangTaoTian_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（弃置X张水系牌【展示】）</span>对X名手牌数大于你的目标角色各造成1点法术伤害③，你+1【治疗】；<br><span style=\"color:#E6B85C\">（若指定的目标拥有【治疗】）</span>他受到的本次伤害额外+1。",
                    "bnzz_qi_shengMingChaoXi": '法术【生命潮汐】',
                    "bnzz_qi_shengMingChaoXi_backup": '生命潮汐',
                    "bnzz_qi_shengMingChaoXi_info": '（移除你的X【治疗】）对X名其他角色各造成1点法术伤害③，或各+1【治疗】。',
                    "bnzz_qi_siWangLangYong": '响应【死亡浪涌】',
                    "bnzz_qi_siWangLangYong_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（你的回合结束时，若本回合有对手实际承受过你的伤害⑥，你弃置1张法术牌【展示】）</span>对他们各造成1点法术伤害③。",
                    "bnzz_qi_haiShenQingYu": '法术【海神轻语】',
                    "bnzz_qi_haiShenQingYu_info": "<!--diy-skill-description--><span style=\"color:#E02B17\">【宝石】</span>目标角色弃置任意张水系牌【展示】，然后你对他造成3点法术伤害③；<br><span style=\"color:#E6B85C\">（他每因此弃置1张水系牌）</span>你将此牌加入手牌，或你+1【治疗】；<br><span style=\"color:#E6B85C\">（若他未弃牌）</span>本回合不能发动【死亡浪涌】。",
                    "bnzz_qi_siWangLangYong_blocked": '海神轻语·死亡浪涌禁用',

                    // 不死者·帕丁
                    "bnzz_qi_zhanYiRanShao": '被动【战意燃烧】',
                    "bnzz_qi_zhanYiRanShao_xueShang": '战意燃烧',
                    "bnzz_qi_zhanYiRanShao_info": '（【攻击行动】结束时）+1【战魂】；（实际承受伤害后⑥）你+1【血殇】。',
                    "bnzz_qi_huiXuanJi": '响应【回旋击】',
                    "bnzz_qi_huiXuanJi_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（【攻击行动】结束时）</span>+1【攻击行动】。",
                    "bnzz_qi_xueYueHuGuang": '响应【血月弧光】',
                    "bnzz_qi_xueYueHuGuang_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（【攻击行动】结束时，移除3</span><span style=\"color:#DB8593\">【血殇】</span><span style=\"color:#E6B85C\">）</span>+1【攻击行动】，本次主动攻击无法应战且不触发【战意燃烧】。",
                    "bnzz_qi_lingHunZhenLie": '响应【灵魂振裂】',
                    "bnzz_qi_lingHunZhenLie_info": "【回合限定】<!--diy-skill-description--><span style=\"color:#E6B85C\">（主动攻击命中时②，移除X</span><span style=\"color:#80B9EE\">【战魂】</span><span style=\"color:#E6B85C\">）</span>本次攻击伤害额外+1，你对自己造成X点法术伤害③；<br><span style=\"color:#E6B85C\">（若X＞2）</span>本次攻击伤害额外+1。",
                    "bnzz_qi_xueSeJingJi": '法术【血色荆棘】',
                    "bnzz_qi_xueSeJingJi_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（弃置X张法术牌【展示】，X≤2；移除Y</span><span style=\"color:#DB8593\">【血殇】</span><span style=\"color:#E6B85C\">）</span>对你和目标对手各造成（X+Y-1）点法术伤害③，本次伤害不触发【战意燃烧】。",
                    "bnzz_qi_qianRenSaoDang": '响应【千刃扫荡】',
                    "bnzz_qi_qianRenSaoDang_info": "<!--diy-skill-description--><span class=\"lan\">【水晶】</span><span style=\"color:#e6b85c\">（主动攻击命中时②）</span>对除你和攻击目标以外的2名角色各造成1点攻击伤害③，你+1<span style=\"color:#db8593;font-weight:bold\">【血殇】</span>。",
                    "bnzz_qi_xueShang": '血殇',
                    "bnzz_qi_xueShang_info": '专属指示物，上限是3。',
                    "bnzz_qi_zhanHun": '战魂',
                    "bnzz_qi_zhanHun_info": '专属指示物，上限是4。',

                    // 灼焰舞者·炙霞
                    "bnzz_qi_yeZhiYouHuo": '被动【夜之幽火】',
                    "bnzz_qi_yeZhiYouHuo_info": '（任何人对你造成法术伤害时③）你+1【幽火】。',
                    "bnzz_qi_baiYanDan": '响应【白焰弹】',
                    "bnzz_qi_baiYanDan_info": '（主动攻击未命中时②）对你和攻击目标各造成1点法术伤害③。',
                    "bnzz_qi_ranShaoDaiJin": '响应【燃烧殆尽】',
                    "bnzz_qi_ranShaoDaiJin_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（主动攻击时①，移除2【幽火】）</span>你+1【治疗】；<br><span style=\"color:#E6B85C\">（若攻击目标面前存在【圣盾】）</span>将其移除；<br><span style=\"color:#E6B85C\">（仅</span><span style=\"color:#EFB36B\">【火舞形态】</span><span style=\"color:#E6B85C\">下）（若本次攻击为火系）</span>则无法应战；<br><span style=\"color:#E6B85C\">（若非火系，你可弃置1张火系法术牌【展示】）</span>本次攻击视为火系。",
                    "bnzz_qi_huGuangSanShe": '被动【弧光散射】',
                    "bnzz_qi_huGuangSanShe_hit": '弧光散射',
                    "bnzz_qi_huGuangSanShe_miss": '弧光散射',
                    "bnzz_qi_huGuangSanShe_info": '（仅【火舞形态】下，主动攻击时①）本次攻击伤害额外+1，（若命中②，或该次攻击为火系且未命中②）对攻击目标以外的另一目标对手造成1点法术伤害③。',
                    "bnzz_qi_hunPoJiQu": '法术【魂魄汲取】',
                    "bnzz_qi_hunPoJiQu_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（弃置X张法术牌【展示】，移除Y</span><span style=\"color:#ED9C8C\">【幽火】</span><span style=\"color:#E6B85C\">，X+Y＞2）</span>对目标对手和你各造成（X+Y-2）点法术伤害③。",
                    "bnzz_qi_jiuZhuanShanWu": '启动【九转扇舞】',
                    "bnzz_qi_jiuZhuanShanWu_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span>你+1<span style=\"color:#ED9C8C\">【幽火】</span>，【横置】进入<span style=\"color:#EFB36B\">【火舞形态】</span>，此形态下你对自己造成的伤害-1，【白焰弹】不对自己造成伤害；<br><span style=\"color:#E6B85C\">（你的回合结束时）</span>【重置】脱离此形态。",
                    "bnzz_qi_youHuo": '幽火',
                    "bnzz_qi_youHuo_info": '专属指示物，上限是3。',
                    "bnzz_qi_huoWuXingTai": '火舞形态',
                    "bnzz_qi_huoWuXingTai_info": "<!--diy-skill-description-->你对自己造成的伤害-1；【白焰弹】不对自己造成伤害；<br><span style=\"color:#E6B85C\">（你的回合结束时）</span>【重置】并脱离此形态。",
                    "bnzz_qi_huoWuXingTai_end": '火舞形态·结束',

                    // 织魔者·蕾乌
                    "bnzz_qi_hunLiJiQu": '响应【魂力汲取】',
                    "bnzz_qi_hunLiJiQu_info": "【回合限定】（你造成伤害③后）你+1【治疗】。",
                    "bnzz_qi_buWang": '响应【布网】',
                    "bnzz_qi_buWang_info": "<!--diy-skill-description--><span style=\"color:#e6b85c\">（你的回合结束时，选择未在场的<span style=\"color:#e5cd85;font-weight:bold\">【光网】</span>或<span style=\"color:#b59bdf;font-weight:bold\">【暗网】</span>放置在你面前）</span>你对自己造成3点法术伤害③；<br><span style=\"color:#e6b85c\">（若处于<span style=\"color:#c0a6ec;font-weight:bold\">【直感形态】</span>）</span>改为摸1张牌。",
                    "bnzz_qi_xianZhen": '被动【线振】',
                    "bnzz_qi_xianZhen_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（其他角色的回合内，他每执行1个行动）</span>你+1<span style=\"color:#B8A2DC\">【束缚】</span>；<br><span style=\"color:#E6B85C\">（回合结束时）</span>移除所有<span style=\"color:#B8A2DC\">【束缚】</span>。其他角色无法响应此技能的效果。",
                    "bnzz_qi_xianZhen_clear": '线振',
                    "bnzz_qi_xiuQi": '响应【休憩】',
                    "bnzz_qi_xiuQi_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（你的回合结束时，若处于</span><span style=\"color:#C0A6EC\">【直感形态】</span><span style=\"color:#E6B85C\">）</span>【重置】并脱离此形态，将手牌弃至4张；你可以选择1个未在场的<span style=\"color:#E5CD85\">【光网】</span>或<span style=\"color:#B59BDF\">【暗网】</span>放置在自己面前；若如此做，摸2张牌。",
                    "bnzz_qi_kuangLuanShuFu": '响应【狂乱束缚】',
                    "bnzz_qi_kuangLuanShuFu_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span><span style=\"color:#E6B85C\">（因【线振】移除X</span><span style=\"color:#B8A2DC\">【束缚】</span><span style=\"color:#E6B85C\">时，将1个未激发的</span><span style=\"color:#E5CD85\">【光网】</span><span style=\"color:#E6B85C\">或</span><span style=\"color:#B59BDF\">【暗网】</span><span style=\"color:#E6B85C\">激发）</span>对当前回合角色造成<span style=\"color:#E6B85C\">（X+1）</span>点法术伤害③。",
                    "bnzz_qi_zhiGanZhiYan": '启动【直感之眼】',
                    "bnzz_qi_zhiGanZhiYan_info": "<!--diy-skill-description--><span class='lan'>【水晶】</span>【横置】，进入<span style=\"color:#C0A6EC\">【直感形态】</span>，对其他角色造成的法术伤害+1；<br><span style=\"color:#E6B85C\">（你的下个行动阶段开始前）</span>【重置】并脱离<span style=\"color:#C0A6EC\">【直感形态】</span>。",
                    "bnzz_qi_zhiGanXingTai": '直感形态',
                    "bnzz_qi_zhiGanXingTai_expire": '直感之眼',
                    "bnzz_qi_shuFu": '束缚',
                    "bnzz_qi_shuFu_info": '专属指示物，上限是5。',
                    "bnzz_qi_guangWang": '光网',
                    "bnzz_qi_guangWang_description": "专属【光网】",
                    "bnzz_qi_guangWang_description_info": "<!--diy-skill-description-->默认处于未激发状态。<br><span class='greentext'>响应【导魔】</span><br><span style=\"color:#E6B85C\">（织魔者的队友在自己的回合造成法术伤害时③）</span>令本次伤害+1，对织魔者造成1点法术伤害③，该次伤害不能再次发动【导魔】。同名导魔不能同时触发。<br><span class='greentext'>被动【诱捕】</span><br><span style=\"color:#E6B85C\">（织魔者的对手从手牌打出光系牌时，若此牌未激发）</span>织魔者对他造成3点法术伤害③，移除此牌。<br><span class='greentext'>被动【破网】</span><br><span style=\"color:#E6B85C\">（织魔者的回合开始时，若此牌已激发）</span>移除此牌。",
                    "bnzz_qi_anWang": '暗网',
                    "bnzz_qi_anWang_description": "专属【暗网】",
                    "bnzz_qi_anWang_description_info": "<!--diy-skill-description-->默认处于未激发状态。<br><span class='greentext'>响应【导魔】</span><br><span style=\"color:#E6B85C\">（织魔者的队友在自己的回合造成法术伤害时③）</span>令本次伤害+1，对织魔者造成1点法术伤害③，该次伤害不能再次发动【导魔】。同名导魔不能同时触发。<br><span class='greentext'>被动【诱捕】</span><br><span style=\"color:#E6B85C\">（织魔者的对手从手牌打出暗系牌时，若此牌未激发）</span>织魔者对他造成3点法术伤害③，移除此牌。<br><span class='greentext'>被动【破网】</span><br><span style=\"color:#E6B85C\">（织魔者的回合开始时，若此牌已激发）</span>移除此牌。",
                    "bnzz_qi_daoMo": '响应【导魔】',
                    "bnzz_qi_daoMo_info": "<!--diy-skill-description--><span style=\"color:#E6B85C\">（织魔者的队友在自己的回合造成法术伤害时③）</span>令本次伤害+1，对织魔者造成1点法术伤害，该伤害不能再次发动【导魔】。同名导魔不能同时触发。",
                    "bnzz_qi_youBu": '被动【诱捕】',
                    "bnzz_qi_youBu_info": "（织魔者的对手从手牌打出对应网的系别牌时，若网未激发）受到织魔者造成的3点法术伤害，并移除该网。"
                }
            },
            card: {
                card: {
                    // 织魔者·蕾乌
                    "bnzz_qi_guangWang_card": { type: 'special', enable: false, fullskin: true, image: 'ext:百年战争·序章/mark_bnzz_guangWang.webp' },
                    "bnzz_qi_anWang_card": { type: 'special', enable: false, fullskin: true, image: 'ext:百年战争·序章/mark_bnzz_anWang.webp' }
                },
                translate: {
                    // 织魔者·蕾乌
                    "bnzz_qi_guangWang_card": '光网',
                    "bnzz_qi_anWang_card": '暗网',
                },
                list: []
            },
            intro: "百年战争系列开篇，以星界持续百年的战争为背景，收录15名原创角色，围绕五大阵营、星石资源与攻防协作展开战斗。",
            author: '北风/蒙牛', diskURL: '', forumURL: '', version: '0.2.1-dev'
        },
        files: {
            "character": [
                "bnzz_bingShuangJianZong.webp",
                "bnzz_buSiZhe.webp",
                "bnzz_fangZhuQiShi.webp",
                "bnzz_fengYunZhiLing.webp",
                "bnzz_gongNengJiShi.webp",
                "bnzz_haiShenJiSi.webp",
                "bnzz_huiXiangYueShi.webp",
                "bnzz_jingLingChiHou.webp",
                "bnzz_jinWeiQiangShou.webp",
                "bnzz_juJiShou.webp",
                "bnzz_lingYuQiShi.webp",
                "bnzz_qiuDaoZhe.webp",
                "bnzz_yaoJiXueZhe.webp",
                "bnzz_zhiMoZhe.webp",
                "bnzz_zhuoYanWuZhe.webp"
            ],
            "skill": [
                "mark_bnzz_xuLi.webp",
                "mark_bnzz_renNai.webp",
                "mark_bnzz_miaoZhunXingTai.webp",
                "mark_bnzz_qiangDan.webp",
                "mark_bnzz_xunMiZhanJi_block.webp",
                "mark_bnzz_zhouFuZhiChui.webp",
                "mark_bnzz_yuanLi.webp",
                "mark_bnzz_zhenYanXingTai.webp",
                "mark_bnzz_xuNengChi.webp",
                "mark_bnzz_yueLv.webp",
                "mark_bnzz_wanQiQiMing_effect.webp",
                "mark_bnzz_shanXian.webp",
                "mark_bnzz_xueShang.webp",
                "mark_bnzz_zhanHun.webp",
                "mark_bnzz_youHuo.webp",
                "mark_bnzz_huoWuXingTai.webp",
                "mark_bnzz_shuFu.webp",
                "mark_bnzz_zhiGanXingTai.webp",
                "mark_bnzz_guangWang.webp",
                "mark_bnzz_anWang.webp",
                "mark_bnzz_siWangLangYong_blocked.webp"
            ],
            "card": [],
            "audio": [
                "audio/skill/bingShuangJianZong/gongFangZhiRen.mp3",
                "audio/skill/bingShuangJianZong/jiHanJianRen.mp3",
                "audio/skill/bingShuangJianZong/jiaoCuoLianZhan.mp3",
                "audio/skill/bingShuangJianZong/yuJianJiDao.mp3",
                "audio/skill/bingShuangJianZong/shouHuJianLing.mp3",
                "audio/skill/bingShuangJianZong/wuJinHanLiu.mp3",
                "audio/action/bingShuangJianZong/gouMai.mp3",
                "audio/action/bingShuangJianZong/tiLian.mp3",
                "audio/action/bingShuangJianZong/heCheng.mp3",
                "audio/skill/shaNa/huiFuZhiJi.mp3",
                "audio/skill/shaNa/dingDangBaoZha.mp3",
                "audio/skill/shaNa/duXingYinBao.mp3",
                "audio/skill/shaNa/yingJiChuLi.mp3",
                "audio/skill/shaNa/duBaoZhiJi.mp3",
                "audio/action/shaNa/gouMai.mp3",
                "audio/action/shaNa/tiLian.mp3",
                "audio/action/shaNa/heCheng.mp3",
                "audio/skill/jinWeiQiangShou/baoPoDanYao.mp3",
                "audio/skill/jinWeiQiangShou/shangTang.mp3",
                "audio/skill/jinWeiQiangShou/shuangFaSheJi.mp3",
                "audio/skill/jinWeiQiangShou/huWeiJiDong.mp3",
                "audio/skill/jinWeiQiangShou/teZhuangDanYao.mp3",
                "audio/action/jinWeiQiangShou/gouMai.mp3",
                "audio/action/jinWeiQiangShou/tiLian.mp3",
                "audio/action/jinWeiQiangShou/heCheng.mp3",
                "audio/skill/fangZhuQiShi/zhouFuZhiChui.mp3",
                "audio/skill/fangZhuQiShi/jingJiMiYi.mp3",
                "audio/skill/fangZhuQiShi/hongLianYeHuo.mp3",
                "audio/skill/fangZhuQiShi/fuWenZuDuan.mp3",
                "audio/skill/fangZhuQiShi/chiSeJiMie.mp3",
                "audio/action/fangZhuQiShi/gouMai.mp3",
                "audio/action/fangZhuQiShi/tiLian.mp3",
                "audio/action/fangZhuQiShi/heCheng.mp3",
                "audio/skill/chengYue/ziRanBianHuan.mp3",
                "audio/skill/chengYue/fengZhiYan.mp3",
                "audio/skill/chengYue/fengSeFaDian.mp3",
                "audio/skill/chengYue/fengLiuHuanRao.mp3",
                "audio/skill/chengYue/yiFengJiHua.mp3",
                "audio/skill/chengYue/fengYunZhouFa.mp3",
                "audio/action/chengYue/gouMai.mp3",
                "audio/action/chengYue/tiLian.mp3",
                "audio/action/chengYue/heCheng.mp3",
                "audio/skill/qiuDaoZhe/shenSuFu.mp3",
                "audio/skill/qiuDaoZhe/tianHuoFu.mp3",
                "audio/skill/qiuDaoZhe/jieZhenBaMenTianDiFa.mp3",
                "audio/skill/qiuDaoZhe/tianDiJian.mp3",
                "audio/skill/qiuDaoZhe/zhenMenLeiJi.mp3",
                "audio/skill/qiuDaoZhe/yuanLiFanShi.mp3",
                "audio/skill/qiuDaoZhe/wuLiangTianLei.mp3",
                "audio/action/qiuDaoZhe/gouMai.mp3",
                "audio/action/qiuDaoZhe/tiLian.mp3",
                "audio/action/qiuDaoZhe/heCheng.mp3",
                "audio/skill/luoKe/nengYuanWeiHu.mp3",
                "audio/skill/luoKe/ceLiuChongNeng.mp3",
                "audio/skill/luoKe/xingNengZhuanHuan.mp3",
                "audio/skill/luoKe/jiaoHuShuNiu.mp3",
                "audio/skill/luoKe/nengJiFenLiu.mp3",
                "audio/skill/luoKe/gaoNengShuSong.mp3",
                "audio/skill/luoKe/xuNengChi.mp3",
                "audio/action/luoKe/gouMai.mp3",
                "audio/action/luoKe/tiLian.mp3",
                "audio/action/luoKe/heCheng.mp3",
                "audio/skill/juJiShou/xunMiZhanJi.mp3",
                "audio/skill/juJiShou/zhuangTian.mp3",
                "audio/skill/juJiShou/zhiYuanSheJi.mp3",
                "audio/skill/juJiShou/kuaiSuZhuangTian.mp3",
                "audio/skill/juJiShou/niZongJuJi.mp3",
                "audio/action/juJiShou/gouMai.mp3",
                "audio/action/juJiShou/tiLian.mp3",
                "audio/action/juJiShou/heCheng.mp3",
                "audio/skill/jingLingChiHou/shanShuoZhiGuang.mp3",
                "audio/skill/jingLingChiHou/xianXingZhenCha.mp3",
                "audio/skill/jingLingChiHou/jiSuMoSha.mp3",
                "audio/skill/jingLingChiHou/zhanShuCheTui.mp3",
                "audio/skill/jingLingChiHou/jieJieSheJi.mp3",
                "audio/action/jingLingChiHou/gouMai.mp3",
                "audio/action/jingLingChiHou/tiLian.mp3",
                "audio/action/jingLingChiHou/heCheng.mp3",
                "audio/skill/huiXiangYueShi/huiGuangYueLv.mp3",
                "audio/skill/huiXiangYueShi/yinLvZhiBi.mp3",
                "audio/skill/huiXiangYueShi/jiDangYinFu.mp3",
                "audio/skill/huiXiangYueShi/ciDiJianZou.mp3",
                "audio/skill/huiXiangYueShi/wanQiQiMing.mp3",
                "audio/skill/huiXiangYueShi/gongMingBeiYue.mp3",
                "audio/action/huiXiangYueShi/gouMai.mp3",
                "audio/action/huiXiangYueShi/tiLian.mp3",
                "audio/action/huiXiangYueShi/heCheng.mp3",
                "audio/skill/lingYuQiShi/dunJi.mp3",
                "audio/skill/lingYuQiShi/zhuangBeiJianCha.mp3",
                "audio/skill/lingYuQiShi/zhanShuChongFeng.mp3",
                "audio/skill/lingYuQiShi/lvJiJingShen.mp3",
                "audio/skill/lingYuQiShi/zhanShiXiuZheng.mp3",
                "audio/action/lingYuQiShi/gouMai.mp3",
                "audio/action/lingYuQiShi/tiLian.mp3",
                "audio/action/lingYuQiShi/heCheng.mp3",
                "audio/skill/buSiZhe/zhanYiRanShao.mp3",
                "audio/skill/buSiZhe/huiXuanJi.mp3",
                "audio/skill/buSiZhe/xueYueHuGuang.mp3",
                "audio/skill/buSiZhe/lingHunZhenLie.mp3",
                "audio/skill/buSiZhe/xueSeJingJi.mp3",
                "audio/skill/buSiZhe/qianRenSaoDang.mp3",
                "audio/action/buSiZhe/gouMai.mp3",
                "audio/action/buSiZhe/tiLian.mp3",
                "audio/action/buSiZhe/heCheng.mp3",
                "audio/skill/haiShenJiSi/daHaiZhuFu.mp3",
                "audio/skill/haiShenJiSi/shenLiCiFu.mp3",
                "audio/skill/haiShenJiSi/juLangTaoTian.mp3",
                "audio/skill/haiShenJiSi/shengMingChaoXi.mp3",
                "audio/skill/haiShenJiSi/siWangLangYong.mp3",
                "audio/skill/haiShenJiSi/haiShenQingYu.mp3",
                "audio/action/haiShenJiSi/gouMai.mp3",
                "audio/action/haiShenJiSi/tiLian.mp3",
                "audio/action/haiShenJiSi/heCheng.mp3",
                "audio/skill/zhuoYanWuZhe/yeZhiYouHuo.mp3",
                "audio/skill/zhuoYanWuZhe/baiYanDan.mp3",
                "audio/skill/zhuoYanWuZhe/ranShaoDaiJin.mp3",
                "audio/skill/zhuoYanWuZhe/huGuangSanShe.mp3",
                "audio/skill/zhuoYanWuZhe/hunPoJiQu.mp3",
                "audio/skill/zhuoYanWuZhe/jiuZhuanShanWu.mp3",
                "audio/action/zhuoYanWuZhe/gouMai.mp3",
                "audio/action/zhuoYanWuZhe/tiLian.mp3",
                "audio/action/zhuoYanWuZhe/heCheng.mp3",
                "audio/skill/zhiMoZhe/hunLiJiQu.mp3",
                "audio/skill/zhiMoZhe/buWang.mp3",
                "audio/skill/zhiMoZhe/xianZhen.mp3",
                "audio/skill/zhiMoZhe/xiuQi.mp3",
                "audio/skill/zhiMoZhe/kuangLuanShuFu.mp3",
                "audio/skill/zhiMoZhe/zhiGanZhiYan.mp3",
                "audio/skill/zhiMoZhe/guangWang.mp3",
                "audio/skill/zhiMoZhe/anWang.mp3",
                "audio/skill/zhiMoZhe/daoMo.mp3",
                "audio/skill/zhiMoZhe/yinBu.mp3",
                "audio/skill/zhiMoZhe/poWang.mp3",
                "audio/action/zhiMoZhe/gouMai.mp3",
                "audio/action/zhiMoZhe/tiLian.mp3",
                "audio/action/zhiMoZhe/heCheng.mp3"
            ]
        }
    };

    // AI methods live in lib.skill so serialized choice callbacks work on clients too.
    extension.package.skill.skill.bnzz_qi_ai = {
        charlotte: true,
        room(player, paid = 0) { return player.getHandcardLimit() - player.countCards('h') + paid; },
        healRoom(player) { return Math.max(0, player.getZhiLiaoLimit() - player.countZhiLiao()); },
        attackDamage(event) { return event.damageNum ?? event.num ?? 2; },
        refineNeed(player) {
            if (!get.zhanJi(player.side).length) return 0;
            if (player.hasSkill('bnzz_qi_ziRanBianHuan') && lib.skill.bnzz_qi_ai.room(player) < 0 && get.zhanJi(player.side).every(stone => stone === 'baoShi')) return 0;
            if (player.hasSkill('bnzz_qi_xuNengChi')) return Math.max(0, 3 - (player.storage.bnzz_qi_xuNengChi || []).length);
            if (player.countNengLiangAll() >= player.getNengLiangLimit()) return 0;
            const gem = ['gongMingBeiYue', 'haiShenQingYu', 'wuLiangTianLei', 'chiSeJiMie'].some(id => player.hasSkill('bnzz_qi_' + id));
            if (gem && !player.hasNengLiang('baoShi') && get.zhanJi(player.side).includes('baoShi')) return 2;
            return Math.max(0, 2 - player.countNengLiangAll());
        },
        refineStone(player, stone) {
            const selected = ui.selected.buttons;
            if (stone === 'baoShi' && player.hasSkill('bnzz_qi_ziRanBianHuan') && lib.skill.bnzz_qi_ai.room(player) < 0) return -1;
            if (player.hasSkill('bnzz_qi_xuNengChi')) {
                if (selected.length) return -1;
                return (player.storage.bnzz_qi_xuNengChi || []).length === 0 ? (stone === 'baoShi' ? 8 : 6) : (stone === 'shuiJing' ? 8 : 5);
            }
            if (selected.length >= lib.skill.bnzz_qi_ai.refineNeed(player)) return -1;
            const gem = ['gongMingBeiYue', 'haiShenQingYu', 'wuLiangTianLei', 'chiSeJiMie'].some(id => player.hasSkill('bnzz_qi_' + id));
            const pickedGem = selected.some(button => button.link === 'baoShi');
            return gem && !player.hasNengLiang('baoShi') && !pickedGem ? (stone === 'baoShi' ? 8 : 4) : (stone === 'shuiJing' ? 7 : 5);
        },
        attacks(player, excluded = []) {
            // Predict the extra attack after the current spell action has finished.
            return player.getCards('h').filter(card => !excluded.includes(card) && get.type(card) === 'gongJi' && player.hasUseTargetXingBei(card));
        },
        ready(player) {
            return player.getCards('h').some(card => ['gongJi', 'faShu'].includes(get.type(card)) && player.hasUseTarget(card));
        },
        safe(player, amount, paid = 0) {
            const reduction = player.hasSkill('bnzz_qi_huoWuXingTai') ? 1 : 0;
            return lib.skill.bnzz_qi_ai.room(player, paid) >= Math.max(0, amount - reduction);
        },
        costValue(card, player, base = 9) {
            // Preserve the final attack for actual extra actions, rather than buying an unusable one.
            const ai = lib.skill.bnzz_qi_ai;
            const last = get.type(card) === 'gongJi' && ai.attacks(player).length === 1;
            return base - get.value(card) - (last && _status.currentPhase === player ? 2 : 0);
        },
        supply(target, gem = false) {
            if (gem && target.hasSkill('bnzz_qi_ziRanBianHuan') && lib.skill.bnzz_qi_ai.room(target) < 0) return 0;
            const pool = target.hasSkill('bnzz_qi_xuNengChi') ? target.storage.bnzz_qi_xuNengChi || [] : null;
            const count = pool ? pool.length : target.countNengLiangAll();
            const limit = pool ? 4 : target.getNengLiangLimit();
            if (count >= limit) return 0;
            let score = 3 + limit - count;
            if (gem && ['bnzz_qi_gongMingBeiYue', 'bnzz_qi_haiShenQingYu', 'bnzz_qi_wuLiangTianLei', 'bnzz_qi_chiSeJiMie'].some(id => target.hasSkill(id)) && !target.hasNengLiang('baoShi')) score += 2;
            return score;
        },
        canReclaim(player) {
            const effects = player.jiChuXiaoGuoList();
            const amounts = effects.map(id => id === '_zhongDu' ? 1 : player.getExpansions(id).length);
            const collapse = effects.includes('_shengDun') ? effects.filter(id => id !== '_shengDun').reduce((n, id) => n + player.getExpansions(id).length, 0) : 0;
            return effects.length > 0 && lib.skill.bnzz_qi_ai.room(player) >= Math.max(...amounts) + collapse;
        },
        bookPlan(player) {
            const wind = player.countCards('h', card => get.xiBie(card) === 'feng' && lib.filter.cardDiscardable(card, player, 'bnzz_qi_fengSeFaDian'));
            const enemies = game.filterPlayer(target => target.side !== player.side);
            const allies = game.filterPlayer(target => target !== player && target.side === player.side);
            const scores = [0, enemies.some(p => p.countCards('h') > 0) ? 2 : 0,
                enemies.length ? 4 : 0,
                Math.max(0, ...enemies.map(p => p.countCards('h') * 1.1), ...allies.map(p => Math.max(0, p.getHandcardLimit() - p.countCards('h'))))];
            // Four-wind collection occurs before redistribution; check the intermediate hand size.
            if (allies.length >= 2) {
                const recipients = allies.slice().sort((a, b) => b.countCards('h') - a.countCards('h')).slice(0, 2);
                const sources = game.filterPlayer(p => p !== player && !recipients.includes(p));
                const incoming = sources.filter(p => p.countCards('h') > 0).length;
                scores[4] = lib.skill.bnzz_qi_ai.room(player, 4) >= incoming ? 5 : 0;
            }
            let count = 0, score = 0;
            for (let i = 1; i <= Math.min(4, wind); i++) if ((scores[i] || 0) > score) { count = i; score = scores[i]; }
            return { count, score };
        },
        crescendo(player) {
            const rhythm = player.countZhiShiWu('bnzz_qi_yueLv');
            const damage = rhythm >= 3 ? rhythm + 1 : 1;
            return rhythm > 0 && lib.skill.bnzz_qi_ai.safe(player, damage, 2);
        },
        blood(player, cards = ui.selected.cards.length) {
            if (cards < 1) cards = 1;
            // H-X+(X+Y-1) <= limit: choosing more spell cards does not create extra room for Y.
            const cap = Math.min(player.countZhiShiWu('bnzz_qi_xueShang'), lib.skill.bnzz_qi_ai.room(player) + 1);
            return Math.max(0, cap);
        },
        ghost(player, cards = ui.selected.cards.length) {
            const minimum = Math.max(0, 3 - cards);
            const cap = Math.min(player.countZhiShiWu('bnzz_qi_youHuo'), lib.skill.bnzz_qi_ai.room(player) + 2 + (player.hasSkill('bnzz_qi_huoWuXingTai') ? 1 : 0));
            return cap >= minimum ? cap : -1;
        },
        mod: {
            aiOrder(player, item, num) {
                if (typeof item === 'string' || !item) return;
                const type = get.type(item), element = get.xiBie(item);
                if (type === 'gongJi') {
                    let bonus = 0;
                    if (player.hasSkill('bnzz_qi_gongFangZhiRen') || player.hasSkill('bnzz_qi_zhanYiRanShao')) bonus += 1.5;
                    if (player.hasSkill('bnzz_qi_xueYueHuGuang') && player.countZhiShiWu('bnzz_qi_xueShang') >= 3) bonus += 4;
                    if (player.hasSkill('bnzz_qi_miaoZhunXingTai') || player.hasSkill('bnzz_qi_zhenYanXingTai')) bonus += 2;
                    if (player.hasSkill('bnzz_qi_huoWuXingTai')) bonus += element === 'huo' ? 3 : 1;
                    if (player.hasSkill('bnzz_qi_hongLianYeHuo') && element === 'huo') bonus += 2;
                    if (player.hasSkill('bnzz_qi_dunJi') && player.getExpansions('_shengDun').some(c => get.xiBie(c) === element)) bonus += 2;
                    if (player.hasSkill('bnzz_qi_jiSuMoSha') && player.countZhiShiWu('bnzz_qi_shanXian') >= 3) bonus += 2;
                    return num + bonus;
                }
                if (type === 'faShu' && (player.hasSkill('bnzz_qi_shanShuoZhiGuang') || player.hasSkill('bnzz_qi_daHaiZhuFu'))) return num + 1.2;
            },
            aiValue(player, card, num) {
                const element = get.xiBie(card), type = get.type(card);
                let bonus = 0;
                if (element === 'shui' && ['jiHanJianRen', 'huiFuZhiJi', 'lvJiJingShen', 'zhanShuCheTui', 'juLangTaoTian'].some(id => player.hasSkill('bnzz_qi_' + id))) bonus += 1;
                if (element === 'feng' && (player.hasSkill('bnzz_qi_fengSeFaDian') || player.hasSkill('bnzz_qi_shenSuFu'))) bonus += 1.2;
                if (element === 'huo' && (player.hasSkill('bnzz_qi_hongLianYeHuo') || player.hasSkill('bnzz_qi_tianHuoFu'))) bonus += 1;
                if (element === 'di' && player.hasSkill('bnzz_qi_yingJiChuLi')) bonus += 1;
                if (type === 'faShu' && ['siWangLangYong', 'duXingYinBao', 'jiDangYinFu'].some(id => player.hasSkill('bnzz_qi_' + id))) bonus += 0.6;
                return num + bonus;
            }
        }
    };
    // Attach the AI-only modifiers to each character through their existing first skill.
    for (const character of Object.values(extension.package.character.character)) {
        const skill = extension.package.skill.skill[character[3][0]];
        skill.group = [].concat(skill.group || [], 'bnzz_qi_ai');
    }
    const bnzzQi_skills = extension.package.skill.skill;
    Object.assign(bnzzQi_skills.bnzz_qi_xunMiZhanJi, {
        check(event, player) {
            return lib.skill.bnzz_qi_ai.ready(player) && lib.skill.bnzz_qi_ai.room(player) >= 0 &&
                !(player.isHengZhi() && player.canBiShaShuiJing() && !player.hasSkill('bnzz_qi_xunMiZhanJi_block'));
        }
    });
    bnzzQi_skills.bnzz_qi_kuaiSuZhuangTian.check = function (event, player) { return lib.skill.bnzz_qi_ai.ready(player); };
    bnzzQi_skills.bnzz_qi_wanQiQiMing.check = function (event, player) {
        return lib.skill.bnzz_qi_ai.ready(player) && (player.countNengLiangAll() >= 2 && player.canBiShaBaoShi() || lib.skill.bnzz_qi_ai.crescendo(player) && lib.skill.bnzz_qi_ciDiJianZou.filter(event, player));
    };
    bnzzQi_skills.bnzz_qi_gaoNengShuSong.check = function (event, player) {
        if (!lib.skill.bnzz_qi_ai.ready(player)) return false;
        const allies = game.filterPlayer(p => p !== player && p.side === player.side && lib.skill.bnzz_qi_ai.supply(p, true) > 0);
        if (!allies.length) return false;
        if (lib.skill.bnzz_qi_ai.attacks(player).length && (player.storage.bnzz_qi_xuNengChi || []).length < 4 && !allies.some(p => p.countNengLiangAll() === 0)) return false;
        return true;
    };
    bnzzQi_skills.bnzz_qi_zhiGanZhiYan.check = function (event, player) {
        return lib.skill.bnzz_qi_ai.ready(player) && (lib.skill.bnzz_qi_ai.room(player) >= 1 || player.getCards('h').some(c => get.type(c) === 'faShu' && player.hasUseTarget(c)));
    };
    // Active skills: result.target is a raw effect; only chooseTarget callbacks multiply attitude.
    bnzzQi_skills.bnzz_qi_huiFuZhiJi.check = function (card) {
        const p = _status.event.player;
        return lib.skill.bnzz_qi_ai.room(p, 1) >= 1 && lib.skill.bnzz_qi_ai.attacks(p, [card]).length > 0 &&
            game.hasPlayer(t => t.side === p.side && lib.skill.bnzz_qi_ai.healRoom(t) > 0) ? lib.skill.bnzz_qi_ai.costValue(card, p) : 0;
    };
    bnzzQi_skills.bnzz_qi_huiFuZhiJi.ai = { order: 8, result: { player: 0, target(player, target) {
        if (target.side !== player.side) return 100;
        return lib.skill.bnzz_qi_ai.healRoom(target) > 0 ? 2 : 0;
    } } };
    bnzzQi_skills.bnzz_qi_fengZhiYan.check = function (card) {
        return lib.skill.bnzz_qi_ai.room(_status.event.player, 1) >= 1 ? lib.skill.bnzz_qi_ai.costValue(card, _status.event.player) : 0;
    };
    bnzzQi_skills.bnzz_qi_fengZhiYan.ai = { order: 5.5, result: { player: 0, target(player, target) {
        if (target.side !== player.side) return 100;
        return lib.skill.bnzz_qi_ai.room(target) >= 1 ? 2 + lib.skill.bnzz_qi_ai.healRoom(player) / 2 : -5;
    } } };
    bnzzQi_skills.bnzz_qi_fengSeFaDian.check = function (card) {
        const p = _status.event.player, plan = lib.skill.bnzz_qi_ai.bookPlan(p);
        return ui.selected.cards.length < plan.count ? 12 - get.value(card) : 0;
    };
    bnzzQi_skills.bnzz_qi_fengSeFaDian.ai = { order: 6.5, result: { player(player) { return lib.skill.bnzz_qi_ai.bookPlan(player).score; } } };
    bnzzQi_skills.bnzz_qi_shenSuFu.check = function (card) { return ui.selected.cards.length < 2 ? 10 - get.value(card) : 0; };
    bnzzQi_skills.bnzz_qi_shenSuFu.ai = { order: 5, result: { target(player, target) {
        const n = ui.selected.cards.length || 1;
        return (target.countCards('h') >= target.getHandcardLimit() ? 3 : 0) + (n > 1 ? Math.min(n - 1, lib.skill.bnzz_qi_ai.healRoom(target)) : 0);
    } } };
    bnzzQi_skills.bnzz_qi_tianHuoFu.check = function (card) { return 10 - get.value(card); };
    bnzzQi_skills.bnzz_qi_tianHuoFu.ai = { order: 6, result: { target(player, target) { return get.damageEffect(target, ui.selected.cards.length || 1); } } };
    bnzzQi_skills.bnzz_qi_wuLiangTianLei.ai = { baoShi: true, order: 6.5, result: {
        player(player) { return lib.skill.bnzz_qi_ai.safe(player, 3, player.countZhiShiWu('bnzz_qi_yuanLi')) ? 0 : -30; },
        target(player, target) { return get.damageEffect(target, 4 - player.countZhiShiWu('bnzz_qi_yuanLi')); }
    } };
    bnzzQi_skills.bnzz_qi_jiaoHuShuNiu.ai = { order: 7, result: { player(player) { return lib.skill.bnzz_qi_ai.attacks(player).length ? 2 : -20; }, target: 0 } };
    bnzzQi_skills.bnzz_qi_ciDiJianZou.ai = { order: 6.2, result: { player(player) { return lib.skill.bnzz_qi_ai.crescendo(player) ? 3 : -30; } } };
    bnzzQi_skills.bnzz_qi_gongMingBeiYue.ai = { baoShi: true, order: 7, result: { target(player, target) { return get.damageEffect(target, player.hasSkill('bnzz_qi_wanQiQiMing_effect') ? 3 : 2); } } };
    bnzzQi_skills.bnzz_qi_zhuangBeiJianCha.ai = { order: 7, result: { player: 0, target(player, target) {
        if (target.side !== player.side) return 100;
        if (lib.skill.bnzz_qi_ai.room(player) < 1) return -10;
        return lib.skill.bnzz_qi_ai.attacks(player).length || (player.countZhiLiao() > 0 && lib.skill.bnzz_qi_ai.healRoom(target) > 0) ? 3 : 0;
    } } };
    bnzzQi_skills.bnzz_qi_zhanShiXiuZheng.ai = { shuiJing: true, order(item, player) {
        return game.hasPlayer(t => t.side === player.side && (t.countCards('h') >= 5 || t.countCards('h') <= 1) && t.getHandcardLimit() >= 4) ? 8 : 5.7;
    }, result: { target(player, target) {
        if (target.getHandcardLimit() < 4 && target.countCards('h') < 4) return -20;
        const h = target.countCards('h');
        return (h > 4 ? (h - 4) * 1.4 : (4 - h) * 0.8) + Math.min(1, lib.skill.bnzz_qi_ai.healRoom(target)) - 0.3;
    } } };
    bnzzQi_skills.bnzz_qi_juLangTaoTian.check = function (card) {
        const p = _status.event.player, n = ui.selected.cards.length + 1;
        return game.countPlayer(t => t.side !== p.side && t.countCards('h') > p.countCards('h') - n) >= n ? 10 - get.value(card) : 0;
    };
    bnzzQi_skills.bnzz_qi_juLangTaoTian.ai = { order: 6, result: { target(player, target) { return get.damageEffect(target, target.countZhiLiao() > 0 ? 2 : 1); } } };
    bnzzQi_skills.bnzz_qi_shengMingChaoXi.ai = { order: 5.8, result: { player: 2 } };
    bnzzQi_skills.bnzz_qi_haiShenQingYu.ai = { baoShi: true, order: 7, result: { target(player, target) { return get.damageEffect(target, 3); } } };
    bnzzQi_skills.bnzz_qi_xueSeJingJi.check = function (card) {
        return lib.skill.bnzz_qi_ai.blood(_status.event.player) > 0 ? 10 - get.value(card) : 0;
    };
    bnzzQi_skills.bnzz_qi_xueSeJingJi.ai = { order: 6.3, result: {
        player(player) { return lib.skill.bnzz_qi_ai.blood(player) > 0 ? 0 : -30; },
        target(player, target) { return get.damageEffect(target, Math.max(1, ui.selected.cards.length) + lib.skill.bnzz_qi_ai.blood(player) - 1); }
    } };
    bnzzQi_skills.bnzz_qi_hunPoJiQu.check = function (card) {
        const p = _status.event.player, count = ui.selected.cards.length;
        const goal = Math.max(0, 3 - p.countZhiShiWu('bnzz_qi_youHuo'));
        return count < goal || count < 2 && lib.skill.bnzz_qi_ai.ghost(p, count + 1) >= 0 ? 10 - get.value(card) : 0;
    };
    bnzzQi_skills.bnzz_qi_hunPoJiQu.ai = { order: 6, result: {
        player(player) { return lib.skill.bnzz_qi_ai.ghost(player, Math.max(ui.selected.cards.length, 3 - player.countZhiShiWu('bnzz_qi_youHuo'))) >= 0 ? 0 : -30; },
        target(player, target) { return get.damageEffect(target, Math.max(1, ui.selected.cards.length + lib.skill.bnzz_qi_ai.ghost(player) - 2)); }
    } };


    // One description source serves both the character pack and the core's des: fallback.
    extension.package.character.characterIntro = bnzzQi_characterIntro;
    for (const [id, character] of Object.entries(extension.package.character.character)) {
        character[4] = character[4] || [];
        character[4].push('des:' + bnzzQi_characterIntro[id]);
    }
    for (const section of [extension.package.skill, extension.package.card]) {
        for (const [key, rawInfo] of Object.entries(section.translate)) {
            if (!key.endsWith('_info') || typeof rawInfo !== 'string') continue;
            const id = key.slice(0, -5);
            let info = rawInfo;
            for (const label of ['【回合限定】', '【优先响应】']) {
                if (info.includes(label) && typeof section.translate[id] === 'string') {
                    if (!section.translate[id].includes(label)) section.translate[id] += label;
                    info = info.replace(label, '');
                }
            }
            section.translate[key] = (info.startsWith('<!--diy-skill-description-->') ? info.slice(28) : bnzzQi_formatInfo(info));
        }
    }
    for (const skill of Object.values(extension.package.skill.skill)) {
        if (typeof skill.intro?.content === 'string' && /[\u3400-\u9fff]/.test(skill.intro.content)) {
            skill.intro.content = bnzzQi_formatInfo(skill.intro.content);
        }
    }
    // Share the displayed exclusive rules with the existing live net markers.
    for (const id of leiwu_nets) {
        extension.package.skill.translate[id + "_info"] = extension.package.skill.translate[id + "_description_info"];
        extension.package.card.translate[id + "_card_info"] = extension.package.skill.translate[id + "_description_info"];
    }
    extension.package.skill.skill.bnzz_qi_zhenYanXingTai.intro.content = extension.package.skill.translate.bnzz_qi_zhenYanXingTai_info;
    return extension;
});
