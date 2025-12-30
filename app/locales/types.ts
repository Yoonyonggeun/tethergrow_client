export type Translation = {
	home: {
		title: string;
		subtitle: string;
		hero: {
			titleLine1: string;
			titleLine2: string;
			titleLine3: string;
			subtitle: string;
			ctaButton: string;
		};
		integration: {
			selectExchange: string;
			uidPlaceholder: string;
		};
		exchanges: {
			title: string;
		};
	};
	navigation: {
		en: string;
		kr: string;
		es: string;
		zh: string;
		ja: string;
		service: string;
		login: string;
		join: string;
		dashboard: string;
		logout: string;
	};
	auth: {
		login: {
			title: string;
			emailLabel: string;
			passwordLabel: string;
			passwordHint: string;
			submitButton: string;
			submitting: string;
			resetButton: string;
			successMessage: string;
			showPassword: string;
			hidePassword: string;
		};
		join: {
			title: string;
			submitButton: string;
			checkDuplicate: string;
			duplicateCheckSuccess: string;
		};
	};
	validation: {
		auth: {
			email: {
				required: string;
				invalid: string;
				duplicateCheckRequired: string;
				alreadyRegistered: string;
			};
			password: {
				required: string;
				minLength: string;
				requireFormat: string;
			};
		};
		home: {
			uid: {
				required: string;
			};
			exchangeID: {
				required: string;
			};
		};
	};
	error: {
		common: {
			"010101": string;
			"010102": string;
			"010201": string;
			"010301": string;
			"010302": string;
			"010303": string;
			"010304": string;
			"010305": string;
		};
		user: {
			"020101": string;
			"020102": string;
			"020103": string;
			"020201": string;
			"020202": string;
			"020203": string;
			"020301": string;
			"020302": string;
			"020401": string;
			"020402": string;
			"020403": string;
			"020404": string;
		};
		integration: {
			"200": string;
			"050104": string;
		};
	};
	service: {
		hero: {
			badge: string;
			titlePart1: string;
			titleHighlight1: string;
			titlePart2: string;
			titleHighlight2: string;
			titlePart3: string;
			description: string;
			buttonAnalyze: string;
			buttonDemo: string;
			stats: {
				monthlyReport: string;
				herdAlert: string;
				exchangeCompatible: string;
			};
			statsValues: {
				realTime: string;
			};
		};
		problem: {
			title: string;
			items: {
				rateCompetition: string;
				highPayback: string;
				noAnalysis: string;
			};
		};
		solution: {
			title: string;
			features: {
				aiAnalysis: {
					title: string;
					desc: string;
				};
				herdDetection: {
					title: string;
					desc: string;
				};
				dashboard: {
					title: string;
					desc: string;
				};
				paybackOptimization: {
					title: string;
					desc: string;
				};
			};
		};
		comparison: {
			title: string;
			existingPlatform: {
				title: string;
				items: {
					rateOnly: string;
					noAnalysis: string;
					temporary: string;
					rewardOnly: string;
				};
			};
			tethergrow: {
				items: {
					aiAnalysis: string;
					herdAlert: string;
					personalized: string;
					optimalPayback: string;
				};
			};
		};
		dashboard: {
			title: string;
			monthlyReturn: {
				title: string;
				change: string;
			};
			herdWarning: {
				title: string;
				pattern: string;
				suggestion: string;
			};
			exchangeRecommend: {
				title: string;
				desc: string;
			};
			riskIndicator: {
				title: string;
				mdd: string;
				volatility: string;
			};
			whyNow: {
				title: string;
				items: {
					habit: string;
					personalized: string;
					winWin: string;
				};
			};
		};
		cta: {
			title: string;
			description: string;
			buttonStart: string;
			buttonDetails: string;
		};
	};
	exchange: {
		orderTypes: {
			limitOrder: string;
			marketOrder: string;
		};
		benefits: {
			newBenefit: string;
			newBenefitTooltip: string;
			regularBenefit: string;
			fee: string;
			payback: string;
		};
		howToJoin: {
			step1: {
				description: string;
				linkText: string;
			};
			step2: {
				description: string;
				uidLink: string;
			};
			step3: {
				description: string;
				autoDeposit: string;
			};
		};
		help: {
			title: string;
			description: string;
			newRegistration: string;
			changeRegistration: string;
		};
		joinButton: string;
	};
};
