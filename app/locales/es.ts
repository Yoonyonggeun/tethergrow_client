import type { Translation } from "./types";

const es: Translation = {
	home: {
		title: "Supaplate",
		subtitle: "Es hora de construir!",
		hero: {
			titleLine1: "El simple reembolso es solo el comienzo,",
			titleLine2: "La era de",
			titleLine3: "¡diseñar rendimientos con análisis de IA!",
			subtitle: "Experiméntalo ahora en TetherGrow.",
			ctaButton: "Comenzar",
		},
		integration: {
			selectExchange: "Seleccionar Exchange",
			uidPlaceholder: "Ingrese su UID",
		},
		exchanges: {
			title: "Exchanges Socios",
		},
	},
	navigation: {
		en: "Inglés",
		kr: "Coreano",
		es: "Español",
		zh: "Chino",
		ja: "Japonés",
		service: "Servicio",
		login: "Iniciar Sesión",
		join: "Registrarse",
		dashboard: "Panel de Control",
		logout: "Cerrar Sesión",
	},
	auth: {
		login: {
			title: "Iniciar Sesión",
			emailLabel: "Correo Electrónico",
			passwordLabel: "Contraseña",
			passwordHint: "La contraseña debe tener al menos 8 caracteres",
			submitButton: "Iniciar Sesión",
			submitting: "Iniciando sesión...",
			resetButton: "Restablecer",
			successMessage: "Enviaste los siguientes valores",
			showPassword: "Mostrar contraseña",
			hidePassword: "Ocultar contraseña",
		},
		join: {
			title: "Registrarse",
			submitButton: "Registrarse",
			checkDuplicate: "Verificar Duplicado",
			duplicateCheckSuccess: "Correo disponible",
		},
	},
	validation: {
		auth: {
			email: {
				required: "El correo electrónico es obligatorio",
				invalid: "Formato de correo electrónico inválido",
				duplicateCheckRequired:
					"Por favor, verifique la disponibilidad del correo",
				alreadyRegistered: "El correo ya está registrado",
			},
			password: {
				required: "La contraseña es obligatoria",
				minLength: "La contraseña es obligatoria (al menos 8 caracteres)",
				requireFormat: "Debe incluir números y caracteres especiales",
			},
		},
		home: {
			uid: {
				required: "UID es obligatorio",
			},
			exchangeID: {
				required: "Por favor seleccione un exchange",
			},
		},
	},
	error: {
		common: {
			"010101": "Por favor, ingrese su correo electrónico.",
			"010102": "El correo ya está en uso.",
			"010201": "Por favor, ingrese su correo electrónico.",
			"010301": "El correo electrónico no existe.",
			"010302": "El código de verificación no existe.",
			"010303": "El código de verificación no existe.",
			"010304": "El código de verificación ha expirado.",
			"010305": "El código de verificación no coincide.",
		},
		user: {
			"020101": "Por favor, ingrese su correo electrónico.",
			"020102": "Por favor, ingrese su contraseña.",
			"020103": "El correo ya está en uso.",
			"020201": "Por favor, ingrese su correo electrónico.",
			"020202": "Por favor, ingrese su contraseña.",
			"020203": "El correo o la contraseña no coinciden.",
			"020301": "Por favor, ingrese su correo electrónico.",
			"020302": "La dirección de correo electrónico no existe o es inválida.",
			"020401": "Por favor, ingrese su correo electrónico.",
			"020402": "El correo electrónico no existe.",
			"020403": "Por favor, ingrese su contraseña.",
			"020404": "La contraseña no coincide.",
		},
		integration: {
			"200": "Solicitud de integración UID completada con éxito.",
			"050104": "Este UID ya ha sido solicitado.",
		},
	},
	service: {
		hero: {
			badge: "Plataforma de Mejora de Beneficios Basada en IA",
			titlePart1: "¿Todavía comparas",
			titleHighlight1: "tasas de reembolso del 0.01%",
			titlePart2: "?",
			titleHighlight2: "Beneficios reales",
			titlePart3: "es lo que importa ahora.",
			description:
				"TetherGrow aprende de los datos de trading para detectar comportamiento de manada y sugiere estrategias de mejora de beneficios a través de dashboards personalizados. Más allá de la simple competencia de tasas, tu trading crece.",
			buttonAnalyze: "Analizar Mi Trading Ahora",
			buttonDemo: "Ver Dashboard Demo",
			stats: {
				monthlyReport: "Informe Mensual",
				herdAlert: "Alerta de Comportamiento de Manada",
				exchangeCompatible: "Compatible con Exchanges",
			},
			statsValues: {
				realTime: "Tiempo Real",
			},
		},
		problem: {
			title: "Limitaciones de las Plataformas Existentes",
			items: {
				rateCompetition:
					"Se enfocan solo en la competencia de tasas, sin mejora real de beneficios ni aprendizaje.",
				highPayback:
					"Las altas tasas de reembolso son rápidamente igualadas en otros lugares, impidiendo que los clientes leales se establezcan.",
				noAnalysis:
					"No se proporcionan análisis de patrones de trading, alertas de riesgo o guías de mejora.",
			},
		},
		solution: {
			title: "La Solución de TetherGrow",
			features: {
				aiAnalysis: {
					title: "Análisis de Patrones de Trading con IA",
					desc: "Aprende los hábitos de trading individuales para sugerir estrategias de mejora de beneficios.",
				},
				herdDetection: {
					title: "Detección y Alertas de Comportamiento de Manada",
					desc: "Advierte en tiempo real sobre entradas excesivas durante movimientos bruscos de precios.",
				},
				dashboard: {
					title: "Dashboard de Informes de Rentabilidad",
					desc: "Visualiza informes de rendimiento semanales/mensuales y ganancias/pérdidas realizadas por operación.",
				},
				paybackOptimization: {
					title: "Optimización de Reembolsos",
					desc: "Recomienda tasas óptimas que reflejan estructuras de comisiones y recompensas por exchange.",
				},
			},
		},
		comparison: {
			title: "¿Qué es Diferente?",
			existingPlatform: {
				title: "Plataformas de Referidos Existentes",
				items: {
					rateOnly: "Enfatizan solo las tasas de reembolso",
					noAnalysis: "Sin análisis de datos/alertas",
					temporary: "Rotación temporal e influxo se repiten",
					rewardOnly: "Proporcionan solo historial de recompensas",
				},
			},
			tethergrow: {
				items: {
					aiAnalysis:
						"Análisis de patrones de trading con IA e informes de mejora",
					herdAlert:
						"Alertas de detección de comportamiento de manada en tiempo real",
					personalized:
						"Forma hábitos de beneficios con dashboards personalizados",
					optimalPayback: "Recomendaciones de reembolso óptimo por exchange",
				},
			},
		},
		dashboard: {
			title: "Vista Previa del Dashboard Demo",
			monthlyReturn: {
				title: "Cambio de Rentabilidad Mensual",
				change: "vs. Mes Pasado",
			},
			herdWarning: {
				title: "Advertencia de Comportamiento de Manada",
				pattern: "Patrón de compra FOMO excesivo",
				suggestion:
					"Sugerencia de estrategia: Entrada escalonada, stop loss fijo en -0.8%",
			},
			exchangeRecommend: {
				title: "Recomendación de Exchange",
				desc: "Recomendación de combinación de comisiones/recompensas que coincide con tu patrón",
			},
			riskIndicator: {
				title: "Indicador de Riesgo",
				mdd: "Drawdown Máximo (MDD)",
				volatility: "Volatilidad semanal 1.8%",
			},
			whyNow: {
				title: "¿Por Qué TetherGrow Ahora?",
				items: {
					habit: "Diseña 'hábitos de beneficios', no solo recompensas simples.",
					personalized:
						"Crea resultados reproducibles con alertas e informes personalizados.",
					winWin:
						"Una estructura donde la plataforma y los miembros crecen juntos (Win-Win).",
				},
			},
		},
		cta: {
			title: "Experimenta el Análisis de Trading con IA Ahora",
			description:
				"Proporciona puntos de mejora aplicables inmediatamente a través del primer informe de análisis.",
			buttonStart: "Comenzar Gratis",
			buttonDetails: "Ver Características en Detalle",
		},
	},
	exchange: {
		orderTypes: {
			limitOrder: "Orden Límite",
			marketOrder: "Orden de Mercado",
		},
		benefits: {
			newBenefit: "Beneficio Nuevo",
			newBenefitTooltip:
				"Beneficio de reembolso aplicado durante 3 semanas después del registro",
			regularBenefit: "Beneficio Regular",
			fee: "Comisión",
			payback: "Reembolso",
		},
		howToJoin: {
			step1: {
				description: "Proporcionado por TetherGrow",
				linkText: "Enlace de Registro",
			},
			step2: {
				description: "Después del registro",
				uidLink: "Vinculación de UID",
			},
			step3: {
				description: "Al acumular 20 USDT o más",
				autoDeposit: "El reembolso se depositará automáticamente",
			},
		},
		help: {
			title: "¿Tiene problemas para registrarse?",
			description: "¡Consulte los enlaces a continuación!",
			newRegistration: "Método de Registro Nuevo",
			changeRegistration: "Método de Cambio de Registro",
		},
		joinButton: "Registrarse",
	},
};

export default es;
