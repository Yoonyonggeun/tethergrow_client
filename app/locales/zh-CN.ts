import type { Translation } from "./types";

const zhCN: Translation = {
	home: {
		title: "超级模板",
		subtitle: "是时候构建了！",
		hero: {
			titleLine1: "简单的返利只是开始，",
			titleLine2: "通过AI分析",
			titleLine3: "设计收益率的时代！",
			subtitle: "现在就在TetherGrow体验吧。",
			ctaButton: "立即开始",
		},
		integration: {
			selectExchange: "选择交易所",
			uidPlaceholder: "请输入您的UID",
		},
		exchanges: {
			title: "合作交易所",
		},
	},
	navigation: {
		en: "英语",
		kr: "韩语",
		es: "西班牙语",
		zh: "中文",
		ja: "日语",
		service: "服务",
		login: "登录",
		join: "注册",
		dashboard: "仪表盘",
		logout: "退出",
	},
	auth: {
		login: {
			title: "登录",
			emailLabel: "邮箱",
			passwordLabel: "密码",
			passwordHint: "密码至少需要8个字符",
			submitButton: "登录",
			submitting: "登录中...",
			resetButton: "重置",
			successMessage: "您已提交以下信息",
			showPassword: "显示密码",
			hidePassword: "隐藏密码",
		},
		join: {
			title: "注册",
			submitButton: "注册",
			checkDuplicate: "检查重复",
			duplicateCheckSuccess: "邮箱可用",
		},
	},
	validation: {
		auth: {
			email: {
				required: "请输入邮箱",
				invalid: "邮箱格式不正确",
				duplicateCheckRequired: "请检查邮箱可用性",
				alreadyRegistered: "邮箱已被注册",
			},
			password: {
				required: "请输入密码",
				minLength: "请输入密码（至少8个字符）",
				requireFormat: "必须包含数字和特殊字符",
			},
		},
		home: {
			uid: {
				required: "请输入UID",
			},
			exchangeID: {
				required: "请选择交易所",
			},
		},
	},
	error: {
		common: {
			"010101": "请输入邮箱。",
			"010102": "邮箱已被使用。",
			"010201": "请输入邮箱。",
			"010301": "EmailAuth id不存在。",
			"010302": "验证码不存在。",
			"010303": "邮箱验证码数据不存在。",
			"010304": "验证码已过期。",
			"010305": "验证码不匹配。",
		},
		user: {
			"020101": "请输入邮箱。",
			"020102": "请输入密码。",
			"020103": "邮箱已被使用。",
			"020201": "请输入邮箱。",
			"020202": "请输入密码。",
			"020203": "邮箱或密码不匹配。",
			"020301": "请输入邮箱。",
			"020302": "邮箱地址不存在或无效。",
			"020401": "请输入邮箱。",
			"020402": "邮箱不存在。",
			"020403": "请输入密码。",
			"020404": "密码不匹配。",
		},
		integration: {
			"200": "UID 绑定申请成功。",
			"050104": "该 UID 已经提交过申请。",
		},
	},
	service: {
		hero: {
			badge: "AI驱动的利润提升平台",
			titlePart1: "还在比较",
			titleHighlight1: "0.01%返佣率",
			titlePart2: "吗？",
			titleHighlight2: "实际利润",
			titlePart3: "才是现在最重要的。",
			description:
				"TetherGrow从交易数据中学习，检测跟风行为，通过个性化仪表板提供利润改进策略。超越简单的费率竞争，让您的交易成长。",
			buttonAnalyze: "立即分析我的交易",
			buttonDemo: "查看演示仪表板",
			stats: {
				monthlyReport: "月度报告",
				herdAlert: "跟风行为警报",
				exchangeCompatible: "交易所兼容",
			},
			statsValues: {
				realTime: "实时",
			},
		},
		problem: {
			title: "现有平台的局限性",
			items: {
				rateCompetition: "只专注于费率竞争，没有真正的利润改进或学习。",
				highPayback: "高返佣很快被其他地方匹配，忠诚客户无法稳定下来。",
				noAnalysis: "不提供交易模式分析、风险警报或改进指南。",
			},
		},
		solution: {
			title: "TetherGrow的解决方案",
			features: {
				aiAnalysis: {
					title: "AI交易模式分析",
					desc: "学习个人交易习惯，提出利润提升策略。",
				},
				herdDetection: {
					title: "跟风行为检测与警报",
					desc: "实时警告价格剧烈波动期间的过度入场。",
				},
				dashboard: {
					title: "利润率报告仪表板",
					desc: "可视化每周/每月业绩报告和每笔交易的已实现盈亏。",
				},
				paybackOptimization: {
					title: "返佣优化",
					desc: "推荐反映各交易所费用和奖励结构的最优费率。",
				},
			},
		},
		comparison: {
			title: "有什么不同？",
			existingPlatform: {
				title: "现有推荐平台",
				items: {
					rateOnly: "只强调返佣率",
					noAnalysis: "无数据分析/警报",
					temporary: "临时流失和流入重复",
					rewardOnly: "只提供奖励历史",
				},
			},
			tethergrow: {
				items: {
					aiAnalysis: "AI交易模式分析和改进报告",
					herdAlert: "实时跟风行为检测警报",
					personalized: "通过个性化仪表板形成利润习惯",
					optimalPayback: "按交易所推荐最优返佣",
				},
			},
		},
		dashboard: {
			title: "演示仪表板预览",
			monthlyReturn: {
				title: "月度收益率变化",
				change: "与上月相比",
			},
			herdWarning: {
				title: "跟风行为警告",
				pattern: "过度追涨买入模式",
				suggestion: "策略建议：分批入场，止损固定在-0.8%",
			},
			exchangeRecommend: {
				title: "交易所推荐",
				desc: "匹配您模式的费用/奖励组合推荐",
			},
			riskIndicator: {
				title: "风险指标",
				mdd: "最大回撤（MDD）",
				volatility: "周波动率1.8%",
			},
			whyNow: {
				title: "为什么选择TetherGrow？",
				items: {
					habit: "设计'利润习惯'，而不仅仅是简单的奖励。",
					personalized: "通过个性化警报和报告创造可重现的成果。",
					winWin: "平台和会员共同成长的结构（双赢）。",
				},
			},
		},
		cta: {
			title: "立即体验AI交易分析",
			description: "通过首次分析报告提供立即可应用的改进点。",
			buttonStart: "免费开始",
			buttonDetails: "详细了解功能",
		},
	},
	exchange: {
		orderTypes: {
			limitOrder: "限价单",
			marketOrder: "市价单",
		},
		benefits: {
			newBenefit: "新用户福利",
			newBenefitTooltip: "注册后3周内适用的返佣福利",
			regularBenefit: "常规福利",
			fee: "手续费",
			payback: "返佣",
		},
		howToJoin: {
			step1: {
				description: "由TetherGrow提供",
				linkText: "注册链接",
			},
			step2: {
				description: "注册后生成的",
				uidLink: "UID关联",
			},
			step3: {
				description: "累计20 USDT或以上时",
				autoDeposit: "返佣将自动入账",
			},
		},
		help: {
			title: "注册有困难吗？",
			description: "请参考以下链接！",
			newRegistration: "新用户注册方法",
			changeRegistration: "更改注册方法",
		},
		joinButton: "立即注册",
	},
};

export default zhCN;
