window.config={
	extension_sources:{
		'gitmirror':'https://raw.staticdn.net/RancherJie/noname_xingbei_extension/master/',
		gitee:'https://gitee.com/RancherJie/noname_xingbei_extension/raw/master/',
		GitHub:'https://raw.githubusercontent.com/RancherJie/noname_xingbei_extension/master/'
	},
	extension_source:'gitee',
	forbidai:['ns_liuzhang'],
	forbidai_user:[],
	forbidall:[],
	forbidstone:[],
	forbidchess:[],
	forbidboss:[],
	forbiddouble:[],
	forbidthreecard:[],
	zhinang_tricks:[],
	connect_zhinang_tricks:[],
	all:{
		sgscharacters:['shiZhouNian'],
		sgscards:['xingbei'],
		sgsmodes:['connect','xingbei'],
		stockmode:['connect','xingbei'],
		stockextension:[],
		layout:['default','newlayout'],
		theme:['woodden','music','simple'],
		card_font:['xiaozhuan','huangcao','caoshu','xingshu'],
		double_hp:['hejiansan','pingjun','zuidazhi','zuixiaozhi','zonghe'],
		image_background_filter:['default','blur','gray','sepia','invert','saturate','contrast','hue','brightness'],
	},

	game:'sgs',
	duration:500,
	hoveration:1000,
	doubleclick_intro:true,
	cheat:false,
	volumn_background:4,
	volumn_audio:4,

	connect_avatar:'fengZhiJianSheng',
	connect_nickname:'无名玩家',
	config_menu:true,
	auto_popped_config:true,
	auto_popped_history:false,
	auto_skill:true,
	auto_confirm:true,
	enable_drag:true,
	enable_pressure:false,
	pressure_taptic:true,
	hover_handcard:true,
	hover_all:true,
	right_info:true,
	longpress_info:true,
	long_info:true,
	background_music:'Made_in_Abyss',
	background_audio:true,
	background_speak:true,
	glow_phase:'purple',
	die_move:'flip',

	skin:{},
	gameRecord:{},
	extensionInfo:{},
	autoskilllist:[],
	hiddenModePack:[],
	hiddenCharacterPack:[],
	hiddenCardPack:[],
	hiddenPlayPack:[],
	hiddenBackgroundPack:[],
	customBackgroundPack:[],
	favouriteCharacter:[],
	favouriteMode:[],
	recentIP:[],
	vintageSkills:[],
	alteredSkills:[],
	brokenFile:[],

	theme:'woodden',
	layout:'nova',
	card_style:'default',
	cardback_style:'xingbei',
	hp_style:'xingbei',

	image_character:'default',
	image_background:'xingBei_bg',

	asset_image:true,
	asset_font:true,

	card_font:'xiaozhuan',
	show_statusbar_ios:'off',
	show_statusbar_android:false,
	show_name:true,
	show_replay:false,
	show_round_menu:true,
	show_pause:true,
	show_auto:true,
	show_volumn:true,
	show_cardpile:true,
	only_fullskin:true,
	show_connect:true,
	show_wuxie:false,
	show_wuxie_self:true,
	show_stat:true,
	//show_playerids:true,
	show_scrollbar:false,
	mousewheel:true,
	fold_card:true,
	threed_card:false,
	vertical_scroll:false,
	handcard_scroll:0,
	animation:true,
	skill_animation_type:'default',
	paused:false,
	title:false,
	button_press:true,
	damage_shake:true,
	log_highlight:true,
	player_border:'normal',
	radius_size:'default',

	modeconfig:false,
	gameconfig:false,
	appearence:false,
	video:'5',
	coin:0,

	intro:'i',
	right_click:'pause',
	sort:'type_sort',

	cards:['xingbei'],
	characters:['shiZhouNian'],
	connect_characters:['yiDuanYeHuo','shenZiChuangLin'],
	connect_cards:[],
	plays:[], 
	extensions:[],
	banned:[],
	bannedcards:[],
	forbidlist:[],
	bannedpile:{},
	customcardpile:{},
	addedpile:{},

	link_style2:'rotate',

	mode:'xingbei',
	mode_config:{
		xingbei:{
			free_choose:true,
			change_identity:true,
			versus_mode:'two',
			team_sequence:'random',
			change_choice:true,
			choose_number:3,
			choose_mode:"多选1"
		},
		identity:{
			identity:[
				['zhu','fan'],
				['zhu','nei','fan'],
				['zhu','zhong','nei','fan'],
				['zhu','zhong','nei','fan','fan'],
				['zhu','zhong','nei','fan','fan','fan'],
				['zhu','zhong','zhong','nei','fan','fan','fan'],
				['zhu','zhong','zhong','nei','fan','fan','fan','fan'],
			],
			choice:{
				zhu:3,
				zhong:4,
				nei:5,
				fan:3,
			},
			show_identity:true,
			difficulty:'normal',
			dierestart:true
		},
		guozhan:{
			difficulty:'normal',
			initshow_draw:'mark',
			dierestart:true
		},
	},
	current_mode:{},
	customforbid:[],
	forbid:[
		
	]
};
