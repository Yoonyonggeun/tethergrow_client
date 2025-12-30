import type { Translation } from "./types";

const en: Translation = {
	home: {
		title: "Supaplate",
		subtitle: "It's time to build!",
		hero: {
			titleLine1: "Simple payback is just the beginning,",
			titleLine2: "The era of",
			titleLine3: "designing returns with AI analysis!",
			subtitle: "Experience it now at TetherGrow.",
			ctaButton: "Get Started",
		},
		integration: {
			selectExchange: "Select Exchange",
			uidPlaceholder: "Enter your UID",
		},
		exchanges: {
			title: "Partner Exchanges",
		},
	},
	navigation: {
		en: "English",
		kr: "Korean",
		es: "Spanish",
		zh: "Chinese",
		ja: "Japanese",
		service: "Service",
		login: "Login",
		join: "Join",
		dashboard: "Dashboard",
		logout: "Logout",
	},
	auth: {
		login: {
			title: "Login",
			emailLabel: "Email",
			passwordLabel: "Password",
			passwordHint: "Password must be at least 8 characters",
			submitButton: "Sign In",
			submitting: "Signing in...",
			resetButton: "Reset",
			successMessage: "You submitted the following values",
			showPassword: "Show password",
			hidePassword: "Hide password",
		},
		join: {
			title: "Join",
			submitButton: "Join",
			checkDuplicate: "Check Duplicate",
			duplicateCheckSuccess: "Email is available",
		},
	},
	validation: {
		auth: {
			email: {
				required: "Email is required",
				invalid: "Invalid email format",
				duplicateCheckRequired: "Please check email availability",
				alreadyRegistered: "Email is already registered",
			},
			password: {
				required: "Password is required",
				minLength: "Password is required (at least 8 characters)",
				requireFormat: "Must include numbers and special characters",
			},
		},
		home: {
			uid: {
				required: "UID is required",
			},
			exchangeID: {
				required: "Please select an exchange",
			},
		},
	},
	error: {
		common: {
			"010101": "Please enter your email.",
			"010102": "Email is already in use.",
			"010201": "Please enter your email.",
			"010301": "EmailAuth id does not exist.",
			"010302": "Verification code does not exist.",
			"010303": "Email verification code data does not exist.",
			"010304": "Verification code has expired.",
			"010305": "Verification code does not match.",
		},
		user: {
			"020101": "Please enter your email.",
			"020102": "Please enter your password.",
			"020103": "Email is already in use.",
			"020201": "Please enter your email.",
			"020202": "Please enter your password.",
			"020203": "Email or password does not match.",
			"020301": "Please enter your email.",
			"020302": "Email address does not exist or is invalid.",
			"020401": "Please enter your email.",
			"020402": "Email does not exist.",
			"020403": "Please enter your password.",
			"020404": "Password does not match.",
		},
		integration: {
			"200": "UID integration request successful.",
			"050104": "This UID has already been requested.",
		},
	},
	service: {
		hero: {
			badge: "AI-Powered Profit Enhancement Platform",
			titlePart1: "Still comparing",
			titleHighlight1: "0.01% payback rates",
			titlePart2: "?",
			titleHighlight2: "Real profits",
			titlePart3: "are what matter now.",
			description:
				"TetherGrow learns from trading data to detect herd behavior and suggests profit improvement strategies through personalized dashboards. Beyond simple rate competition, your trading grows.",
			buttonAnalyze: "Analyze My Trading Now",
			buttonDemo: "View Demo Dashboard",
			stats: {
				monthlyReport: "Monthly Report",
				herdAlert: "Herd Behavior Alert",
				exchangeCompatible: "Exchange Compatible",
			},
			statsValues: {
				realTime: "Real-time",
			},
		},
		problem: {
			title: "Limitations of Existing Platforms",
			items: {
				rateCompetition:
					"Focus only on rate competition, with no real profit improvement or learning.",
				highPayback:
					"High payback rates are quickly matched elsewhere, preventing loyal customers from settling.",
				noAnalysis:
					"No trading pattern analysis, risk alerts, or improvement guides are provided.",
			},
		},
		solution: {
			title: "TetherGrow's Solution",
			features: {
				aiAnalysis: {
					title: "AI Trading Pattern Analysis",
					desc: "Learns individual trading habits to suggest profit improvement strategies.",
				},
				herdDetection: {
					title: "Herd Behavior Detection & Alerts",
					desc: "Warns in real-time about excessive entries during sharp price movements.",
				},
				dashboard: {
					title: "Profitability Report Dashboard",
					desc: "Visualizes weekly/monthly performance reports and realized profit/loss per trade.",
				},
				paybackOptimization: {
					title: "Payback Optimization",
					desc: "Recommends optimal rates reflecting fee and reward structures by exchange.",
				},
			},
		},
		comparison: {
			title: "What's Different?",
			existingPlatform: {
				title: "Existing Referral Platforms",
				items: {
					rateOnly: "Emphasize payback rates only",
					noAnalysis: "No data analysis/alerts",
					temporary: "Temporary churn and influx repeat",
					rewardOnly: "Provide reward history only",
				},
			},
			tethergrow: {
				items: {
					aiAnalysis: "AI trading pattern analysis and improvement reports",
					herdAlert: "Real-time herd behavior detection alerts",
					personalized: "Form profit habits with personalized dashboards",
					optimalPayback: "Optimal payback recommendations by exchange",
				},
			},
		},
		dashboard: {
			title: "Demo Dashboard Preview",
			monthlyReturn: {
				title: "Monthly Return Change",
				change: "vs. Last Month",
			},
			herdWarning: {
				title: "Herd Behavior Warning",
				pattern: "Excessive FOMO buying pattern",
				suggestion:
					"Strategy suggestion: Staggered entry, stop loss fixed at -0.8%",
			},
			exchangeRecommend: {
				title: "Exchange Recommendation",
				desc: "Fee/reward combination recommendation matching your pattern",
			},
			riskIndicator: {
				title: "Risk Indicator",
				mdd: "Maximum Drawdown (MDD)",
				volatility: "Weekly volatility 1.8%",
			},
			whyNow: {
				title: "Why TetherGrow Now?",
				items: {
					habit: "Designs 'profit habits', not just simple rewards.",
					personalized:
						"Creates reproducible results with personalized alerts and reports.",
					winWin:
						"A structure where the platform and members grow together (Win-Win).",
				},
			},
		},
		cta: {
			title: "Experience AI Trading Analysis Now",
			description:
				"Provides immediately applicable improvement points through the first analysis report.",
			buttonStart: "Start Free",
			buttonDetails: "View Features in Detail",
		},
	},
	exchange: {
		orderTypes: {
			limitOrder: "Limit Order",
			marketOrder: "Market Order",
		},
		benefits: {
			newBenefit: "New Benefit",
			newBenefitTooltip:
				"Payback benefit applied for 3 weeks after registration",
			regularBenefit: "Regular Benefit",
			fee: "Fee",
			payback: "Payback",
		},
		howToJoin: {
			step1: {
				description: "Provided by TetherGrow",
				linkText: "Join Link",
			},
			step2: {
				description: "After registration",
				uidLink: "UID Linking",
			},
			step3: {
				description: "When accumulating 20 USDT or more",
				autoDeposit: "Payback will be automatically deposited",
			},
		},
		help: {
			title: "Having trouble signing up?",
			description: "Please refer to the links below!",
			newRegistration: "New Registration Method",
			changeRegistration: "Change Registration Method",
		},
		joinButton: "Join",
	},
};

export default en;
