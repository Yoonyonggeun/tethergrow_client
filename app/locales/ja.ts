import type { Translation } from "./types";

const ja: Translation = {
	home: {
		title: "スーパープレート",
		subtitle: "構築の時間です！",
		hero: {
			titleLine1: "シンプルなペイバックは始まりに過ぎません、",
			titleLine2: "AI分析で",
			titleLine3: "収益率を設計する時代！",
			subtitle: "今すぐTetherGrowで体験してください。",
			ctaButton: "今すぐ始める",
		},
		integration: {
			selectExchange: "取引所を選択",
			uidPlaceholder: "UIDを入力してください",
		},
		exchanges: {
			title: "パートナー取引所",
		},
	},
	navigation: {
		en: "英語",
		kr: "韓国語",
		es: "スペイン語",
		zh: "中国語",
		ja: "日本語",
		service: "サービス",
		login: "ログイン",
		join: "登録",
		dashboard: "ダッシュボード",
		logout: "ログアウト",
	},
	auth: {
		login: {
			title: "ログイン",
			emailLabel: "メールアドレス",
			passwordLabel: "パスワード",
			passwordHint: "パスワードは8文字以上である必要があります",
			submitButton: "ログイン",
			submitting: "ログイン中...",
			resetButton: "リセット",
			successMessage: "以下の情報を送信しました",
			showPassword: "パスワードを表示",
			hidePassword: "パスワードを非表示",
		},
		join: {
			title: "会員登録",
			submitButton: "登録",
			checkDuplicate: "重複確認",
			duplicateCheckSuccess: "メールアドレスが利用可能です",
		},
	},
	validation: {
		auth: {
			email: {
				required: "メールアドレスを入力してください",
				invalid: "正しいメールアドレス形式ではありません",
				duplicateCheckRequired: "メールアドレスの利用可能性を確認してください",
				alreadyRegistered: "メールアドレスは既に登録されています",
			},
			password: {
				required: "パスワードを入力してください",
				minLength: "パスワードを入力してください（8文字以上）",
				requireFormat: "数字と特殊文字を含める必要があります",
			},
		},
		home: {
			uid: {
				required: "UIDを入力してください",
			},
			exchangeID: {
				required: "取引所を選択してください",
			},
		},
	},
	error: {
		common: {
			"010101": "メールアドレスを入力してください。",
			"010102": "既に使用されているメールアドレスです。",
			"010201": "メールアドレスを入力してください。",
			"010301": "EmailAuth idがありません。",
			"010302": "認証コードがありません。",
			"010303": "メール認証コードデータが存在しません。",
			"010304": "認証コードが期限切れです。",
			"010305": "認証コードが一致しません。",
		},
		user: {
			"020101": "メールアドレスを入力してください。",
			"020102": "パスワードを入力してください。",
			"020103": "既に使用されているメールアドレスです。",
			"020201": "メールアドレスを入力してください。",
			"020202": "パスワードを入力してください。",
			"020203": "メールアドレスまたはパスワードが一致しません。",
			"020301": "メールアドレスを入力してください。",
			"020302": "存在しないまたは無効なメールアドレスです。",
			"020401": "メールアドレスを入力してください。",
			"020402": "存在しないメールアドレスです。",
			"020403": "パスワードを入力してください。",
			"020404": "パスワードが一致しません。",
		},
		integration: {
			"200": "UID連携申請成功",
			"050104": "既に申請されたUIDです。",
		},
	},
	service: {
		hero: {
			badge: "AIベースの収益向上プラットフォーム",
			titlePart1: "まだ",
			titleHighlight1: "ペイバック率0.01%",
			titlePart2: "を比較していますか？",
			titleHighlight2: "実際の収益",
			titlePart3: "を上げる時です。",
			description:
				"TetherGrowは取引データを学習して群集行動を検出し、パーソナライズされたダッシュボードで収益改善戦略を提案します。単純なレート競争を超えて、あなたの取引が成長します。",
			buttonAnalyze: "今すぐ取引分析を受ける",
			buttonDemo: "デモダッシュボードを見る",
			stats: {
				monthlyReport: "月間レポート",
				herdAlert: "群集行動アラート",
				exchangeCompatible: "取引所対応",
			},
			statsValues: {
				realTime: "リアルタイム",
			},
		},
		problem: {
			title: "既存プラットフォームの限界",
			items: {
				rateCompetition:
					"レート競争にのみ焦点を当て、実質的な収益改善や学習が行われません。",
				highPayback:
					"高いペイバックもすぐに他の場所に追いやられ、忠実な顧客が定着しません。",
				noAnalysis:
					"取引パターン分析、リスクアラート、改善ガイドは提供されません。",
			},
		},
		solution: {
			title: "TetherGrowの解決策",
			features: {
				aiAnalysis: {
					title: "AI取引パターン分析",
					desc: "個人別の取引習慣を学習して収益向上戦略を提案します。",
				},
				herdDetection: {
					title: "群集行動検出＆アラート",
					desc: "急騰・急落区間での過度な参入をリアルタイムで警告します。",
				},
				dashboard: {
					title: "収益率レポートダッシュボード",
					desc: "週/月間のパフォーマンスレポートと取引別の実現損益を可視化します。",
				},
				paybackOptimization: {
					title: "ペイバック最適化",
					desc: "取引所別の手数料・リワード構造を反映した最適比率を推奨します。",
				},
			},
		},
		comparison: {
			title: "何が違うのか？",
			existingPlatform: {
				title: "既存の紹介プラットフォーム",
				items: {
					rateOnly: "ペイバック率のみ強調",
					noAnalysis: "データ分析/アラート不在",
					temporary: "一時的な離脱・流入の繰り返し",
					rewardOnly: "リワード履歴のみ提供",
				},
			},
			tethergrow: {
				items: {
					aiAnalysis: "AI取引パターン分析と改善レポート",
					herdAlert: "群集行動リアルタイム検出アラート",
					personalized: "パーソナライズドダッシュボードで収益習慣形成",
					optimalPayback: "取引所別最適ペイバック推奨",
				},
			},
		},
		dashboard: {
			title: "デモダッシュボードプレビュー",
			monthlyReturn: {
				title: "月間収益率の変化",
				change: "先月比",
			},
			herdWarning: {
				title: "群集行動警告",
				pattern: "過度な追い上げ買いパターン",
				suggestion: "戦略提案：分割参入、損切り-0.8%固定",
			},
			exchangeRecommend: {
				title: "取引所推奨",
				desc: "あなたのパターンに合った手数料/リワード組み合わせ推奨",
			},
			riskIndicator: {
				title: "リスク指標",
				mdd: "最大ドローダウン（MDD）",
				volatility: "週間変動率1.8%",
			},
			whyNow: {
				title: "なぜ今TetherGrowなのか？",
				items: {
					habit: "単純なリワードではなく、「収益習慣」を設計します。",
					personalized:
						"パーソナライズされたアラートとレポートで再現可能な成果を作ります。",
					winWin: "プラットフォームとメンバーが共に成長する構造（Win-Win）。",
				},
			},
		},
		cta: {
			title: "今すぐAI取引分析を体験してください。",
			description:
				"最初の分析レポートを通じて即座に適用可能な改善ポイントを提供します。",
			buttonStart: "無料で始める",
			buttonDetails: "機能を詳しく見る",
		},
	},
	exchange: {
		orderTypes: {
			limitOrder: "指値注文",
			marketOrder: "成行注文",
		},
		benefits: {
			newBenefit: "新規特典",
			newBenefitTooltip: "登録後3週間適用されるペイバック特典",
			regularBenefit: "通常特典",
			fee: "手数料",
			payback: "ペイバック",
		},
		howToJoin: {
			step1: {
				description: "TetherGrowが提供する",
				linkText: "登録リンク",
			},
			step2: {
				description: "登録後に生成された",
				uidLink: "UID連携",
			},
			step3: {
				description: "20USDT以上累積時",
				autoDeposit: "ペイバックが自動入金されます",
			},
		},
		help: {
			title: "登録でお困りですか？",
			description: "以下のリンクを参照してください！",
			newRegistration: "新規登録方法",
			changeRegistration: "変更登録方法",
		},
		joinButton: "登録する",
	},
};

export default ja;
