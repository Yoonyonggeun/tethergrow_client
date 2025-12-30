import type { Translation } from "./types";

const ko: Translation = {
	home: {
		title: "슈파플레이트",
		subtitle: "빌드하는 시간이야!",
		hero: {
			titleLine1: "단순한 페이백은 시작일 뿐,",
			titleLine2: "AI 분석으로",
			titleLine3: "수익률을 설계하는 시대!",
			subtitle: "지금, 테더그로우에서 경험해 보세요.",
			ctaButton: "지금 시작하기",
		},
		integration: {
			selectExchange: "거래소 선택",
			uidPlaceholder: "UID를 입력해주세요",
		},
		exchanges: {
			title: "제휴 거래소",
		},
	},
	navigation: {
		kr: "한국어",
		es: "스페인어",
		en: "영어",
		zh: "중국어",
		ja: "일본어",
		service: "서비스",
		login: "로그인",
		join: "회원가입",
		dashboard: "대시보드",
		logout: "로그아웃",
	},
	auth: {
		login: {
			title: "로그인",
			emailLabel: "이메일",
			passwordLabel: "비밀번호",
			passwordHint: "비밀번호는 최소 8자 이상이어야 합니다",
			submitButton: "로그인",
			submitting: "로그인 중...",
			resetButton: "초기화",
			successMessage: "로그인 정보를 제출했습니다",
			showPassword: "비밀번호 보기",
			hidePassword: "비밀번호 숨기기",
		},
		join: {
			title: "회원가입",
			submitButton: "회원가입",
			checkDuplicate: "중복 확인",
			duplicateCheckSuccess: "사용 가능한 이메일입니다",
		},
	},
	validation: {
		auth: {
			email: {
				required: "이메일을 입력해주세요",
				invalid: "올바른 이메일 형식이 아닙니다",
				duplicateCheckRequired: "이메일 중복확인을 해주세요",
				alreadyRegistered: "이미 가입된 이메일입니다",
			},
			password: {
				required: "비밀번호를 입력해주세요",
				minLength: "비밀번호를 입력해주세요 (최소 8자)",
				requireFormat: "숫자, 특수문자를 포함해 주세요",
			},
		},
		home: {
			uid: {
				required: "UID를 입력해주세요",
			},
			exchangeID: {
				required: "거래소를 선택해주세요",
			},
		},
	},
	error: {
		common: {
			"010101": "이메일을 입력해주세요.",
			"010102": "이미 사용중인 이메일입니다.",
			"010201": "이메일을 입력해주세요.",
			"010301": "EmailAuth id가 없습니다.",
			"010302": "인증번호가 없습니다.",
			"010303": "이메일 인증번호 데이터가 존재하지 않습니다.",
			"010304": "인증번호가 만료되었습니다.",
			"010305": "인증번호가 일치하지 않습니다.",
		},
		user: {
			"020101": "이메일을 입력해주세요.",
			"020102": "비밀번호를 입력해주세요.",
			"020103": "이미 사용중인 이메일입니다.",
			"020201": "이메일을 입력해주세요.",
			"020202": "비밀번호를 입력해주세요.",
			"020203": "이메일 또는 비밀번호가 일치하지 않습니다.",
			"020301": "이메일을 입력해주세요.",
			"020302": "존재하지 않거나 잘못된 이메일 주소입니다.",
			"020401": "이메일을 입력해주세요.",
			"020402": "존재하지 않는 이메일입니다.",
			"020403": "비밀번호를 입력해주세요.",
			"020404": "비밀번호가 일치하지 않습니다.",
		},
		integration: {
			"200": "UID 연동 신청 성공",
			"050104": "이미 신청된 UID입니다.",
		},
	},
	service: {
		hero: {
			badge: "AI 기반 수익 향상 플랫폼",
			titlePart1: "아직도",
			titleHighlight1: "페이백률 0.01%",
			titlePart2: "을 비교하나요?",
			titleHighlight2: "실제 수익",
			titlePart3: "을 높일 때.",
			description:
				"TetherGrow는 거래 데이터를 학습해 뇌동매매를 감지하고, 개인화된 대시보드로 수익 개선 전략을 제안합니다. 단순 요율 경쟁을 넘어, 당신의 거래가 성장합니다.",
			buttonAnalyze: "지금 내 거래 분석받기",
			buttonDemo: "데모 대시보드 보기",
			stats: {
				monthlyReport: "월간 리포트",
				herdAlert: "뇌동매매 알림",
				exchangeCompatible: "거래소 호환",
			},
			statsValues: {
				realTime: "실시간",
			},
		},
		problem: {
			title: "기존 플랫폼의 한계",
			items: {
				rateCompetition:
					"요율 경쟁에만 집중해 실질 수익 개선과 학습이 이뤄지지 않습니다.",
				highPayback:
					"높은 페이백도 금세 다른 곳에 밀려, 충성 고객이 정착하지 않습니다.",
				noAnalysis:
					"거래 패턴 분석, 리스크 알림, 개선 가이드는 제공되지 않습니다.",
			},
		},
		solution: {
			title: "TetherGrow의 해답",
			features: {
				aiAnalysis: {
					title: "AI 거래 패턴 분석",
					desc: "개인별 거래 습관을 학습해 수익 향상 전략을 제안합니다.",
				},
				herdDetection: {
					title: "뇌동매매 감지 & 알림",
					desc: "급등·급락 구간에서 과도한 진입을 실시간으로 경고합니다.",
				},
				dashboard: {
					title: "수익률 리포트 대시보드",
					desc: "주/월간 성과 리포트와 거래별 실현손익을 시각화합니다.",
				},
				paybackOptimization: {
					title: "페이백 최적화",
					desc: "거래소별 수수료·리워드 구조를 반영한 최적 비율을 추천합니다.",
				},
			},
		},
		comparison: {
			title: "무엇이 다른가요?",
			existingPlatform: {
				title: "기존 셀퍼럴 플랫폼",
				items: {
					rateOnly: "페이백률만 강조",
					noAnalysis: "데이터 분석/알림 부재",
					temporary: "일시적 이탈·유입 반복",
					rewardOnly: "리워드 이력만 제공",
				},
			},
			tethergrow: {
				items: {
					aiAnalysis: "AI 거래 패턴 분석과 개선 리포트",
					herdAlert: "뇌동매매 실시간 감지 알림",
					personalized: "개인화 대시보드로 수익 습관 형성",
					optimalPayback: "거래소별 최적 페이백 추천",
				},
			},
		},
		dashboard: {
			title: "데모 대시보드 미리보기",
			monthlyReturn: {
				title: "월간 수익률 변화",
				change: "지난달 대비",
			},
			herdWarning: {
				title: "뇌동매매 경고",
				pattern: "과도한 추격매수 패턴",
				suggestion: "전략 제안: 분할 진입, 손절 -0.8% 고정",
			},
			exchangeRecommend: {
				title: "거래소 추천",
				desc: "내 패턴에 맞는 수수료/리워드 조합 추천",
			},
			riskIndicator: {
				title: "리스크 지표",
				mdd: "최대 낙폭(MDD)",
				volatility: "주간 변동성 1.8%",
			},
			whyNow: {
				title: "왜 지금 TetherGrow인가?",
				items: {
					habit: "단순 리워드가 아닌, '수익 습관'을 설계합니다.",
					personalized: "개인화된 알림과 리포트로 재현 가능한 성과를 만듭니다.",
					winWin: "플랫폼과 회원이 함께 성장하는 구조(Win-Win).",
				},
			},
		},
		cta: {
			title: "지금 바로 AI 거래 분석을 경험해보세요.",
			description:
				"첫 분석 리포트를 통해 즉시 적용 가능한 개선 포인트를 제공합니다.",
			buttonStart: "무료로 시작하기",
			buttonDetails: "기능 자세히 보기",
		},
	},
	exchange: {
		orderTypes: {
			limitOrder: "지정가",
			marketOrder: "시장가",
		},
		benefits: {
			newBenefit: "신규 혜택",
			newBenefitTooltip: "가입후 3주 동안 적용되는 페이백 혜택",
			regularBenefit: "일반 혜택",
			fee: "수수료",
			payback: "페이백",
		},
		howToJoin: {
			step1: {
				description: "테더그로우에서 제공하는",
				linkText: "가입하기 링크",
			},
			step2: {
				description: "가입 후 생성된",
				uidLink: "UID 연동",
			},
			step3: {
				description: "20USDT 이상 누적 시",
				autoDeposit: "페이백이 자동 입금됩니다",
			},
		},
		help: {
			title: "가입이 어려우신가요?",
			description: "아래 링크를 참고하세요!",
			newRegistration: "신규 가입 방법",
			changeRegistration: "변경 가입 방법",
		},
		joinButton: "가입하기",
	},
};

export default ko;
