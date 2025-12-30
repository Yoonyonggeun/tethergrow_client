import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createReadableStreamFromReadable } from "@react-router/node";
import { createInstance } from "i18next";
import { isbot } from "isbot";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { initReactI18next, I18nextProvider, useTranslation } from "react-i18next";
import { createCookie, ServerRouter, Link, UNSAFE_withComponentProps, useNavigation, useSearchParams, useNavigate, useLocation, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, useRouteLoaderData, Meta, Links, ScrollRestoration, Scripts, data, createCookieSessionStorage, Await, useFetcher } from "react-router";
import "i18next-resources-to-backend";
import { RemixI18Next } from "remix-i18next/server";
import NProgress from "nprogress";
import * as React from "react";
import React__default, { useEffect, Suspense, useRef, useCallback, useContext, useState, useMemo } from "react";
import { useChangeLanguage } from "remix-i18next/react";
import { ThemeProvider, Theme, useTheme, PreventFlashOnWrongTheme } from "remix-themes";
import { Toaster, toast } from "sonner";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon, Lock, PartyPopper, Loader2, Info, Clock, Trophy, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as LabelPrimitive from "@radix-ui/react-label";
import { OTPInput, OTPInputContext } from "input-otp";
import { useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame, motion } from "motion/react";
const supportedLngs = ["en", "es", "ko", "zh-CN", "ja"];
const i18n = {
  // List of languages the application supports
  supportedLngs,
  // Fallback language when user's preferred language is not supported
  // English is used as the default fallback
  fallbackLng: "en",
  // The default namespace for translations
  // All general translations are stored in the 'common' namespace
  defaultNS: "common"
};
const en = {
  home: {
    title: "Supaplate",
    subtitle: "It's time to build!",
    hero: {
      titleLine1: "Simple payback is just the beginning,",
      titleLine2: "The era of",
      titleLine3: "designing returns with AI analysis!",
      subtitle: "Experience it now at TetherGrow.",
      ctaButton: "Get Started"
    },
    integration: {
      selectExchange: "Select Exchange",
      uidPlaceholder: "Enter your UID"
    },
    exchanges: {
      title: "Partner Exchanges"
    }
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
    logout: "Logout"
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
      hidePassword: "Hide password"
    },
    join: {
      title: "Join",
      submitButton: "Join",
      checkDuplicate: "Check Duplicate",
      duplicateCheckSuccess: "Email is available"
    }
  },
  validation: {
    auth: {
      email: {
        required: "Email is required",
        invalid: "Invalid email format",
        duplicateCheckRequired: "Please check email availability",
        alreadyRegistered: "Email is already registered"
      },
      password: {
        required: "Password is required",
        minLength: "Password is required (at least 8 characters)",
        requireFormat: "Must include numbers and special characters"
      }
    },
    home: {
      uid: {
        required: "UID is required"
      },
      exchangeID: {
        required: "Please select an exchange"
      }
    }
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
      "010305": "Verification code does not match."
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
      "020404": "Password does not match."
    },
    integration: {
      "200": "UID integration request successful.",
      "050104": "This UID has already been requested."
    }
  },
  service: {
    hero: {
      badge: "AI-Powered Profit Enhancement Platform",
      titlePart1: "Still comparing",
      titleHighlight1: "0.01% payback rates",
      titlePart2: "?",
      titleHighlight2: "Real profits",
      titlePart3: "are what matter now.",
      description: "TetherGrow learns from trading data to detect herd behavior and suggests profit improvement strategies through personalized dashboards. Beyond simple rate competition, your trading grows.",
      buttonAnalyze: "Analyze My Trading Now",
      buttonDemo: "View Demo Dashboard",
      stats: {
        monthlyReport: "Monthly Report",
        herdAlert: "Herd Behavior Alert",
        exchangeCompatible: "Exchange Compatible"
      },
      statsValues: {
        realTime: "Real-time"
      }
    },
    problem: {
      title: "Limitations of Existing Platforms",
      items: {
        rateCompetition: "Focus only on rate competition, with no real profit improvement or learning.",
        highPayback: "High payback rates are quickly matched elsewhere, preventing loyal customers from settling.",
        noAnalysis: "No trading pattern analysis, risk alerts, or improvement guides are provided."
      }
    },
    solution: {
      title: "TetherGrow's Solution",
      features: {
        aiAnalysis: {
          title: "AI Trading Pattern Analysis",
          desc: "Learns individual trading habits to suggest profit improvement strategies."
        },
        herdDetection: {
          title: "Herd Behavior Detection & Alerts",
          desc: "Warns in real-time about excessive entries during sharp price movements."
        },
        dashboard: {
          title: "Profitability Report Dashboard",
          desc: "Visualizes weekly/monthly performance reports and realized profit/loss per trade."
        },
        paybackOptimization: {
          title: "Payback Optimization",
          desc: "Recommends optimal rates reflecting fee and reward structures by exchange."
        }
      }
    },
    comparison: {
      title: "What's Different?",
      existingPlatform: {
        title: "Existing Referral Platforms",
        items: {
          rateOnly: "Emphasize payback rates only",
          noAnalysis: "No data analysis/alerts",
          temporary: "Temporary churn and influx repeat",
          rewardOnly: "Provide reward history only"
        }
      },
      tethergrow: {
        items: {
          aiAnalysis: "AI trading pattern analysis and improvement reports",
          herdAlert: "Real-time herd behavior detection alerts",
          personalized: "Form profit habits with personalized dashboards",
          optimalPayback: "Optimal payback recommendations by exchange"
        }
      }
    },
    dashboard: {
      title: "Demo Dashboard Preview",
      monthlyReturn: {
        title: "Monthly Return Change",
        change: "vs. Last Month"
      },
      herdWarning: {
        title: "Herd Behavior Warning",
        pattern: "Excessive FOMO buying pattern",
        suggestion: "Strategy suggestion: Staggered entry, stop loss fixed at -0.8%"
      },
      exchangeRecommend: {
        title: "Exchange Recommendation",
        desc: "Fee/reward combination recommendation matching your pattern"
      },
      riskIndicator: {
        title: "Risk Indicator",
        mdd: "Maximum Drawdown (MDD)",
        volatility: "Weekly volatility 1.8%"
      },
      whyNow: {
        title: "Why TetherGrow Now?",
        items: {
          habit: "Designs 'profit habits', not just simple rewards.",
          personalized: "Creates reproducible results with personalized alerts and reports.",
          winWin: "A structure where the platform and members grow together (Win-Win)."
        }
      }
    },
    cta: {
      title: "Experience AI Trading Analysis Now",
      description: "Provides immediately applicable improvement points through the first analysis report.",
      buttonStart: "Start Free",
      buttonDetails: "View Features in Detail"
    }
  },
  exchange: {
    orderTypes: {
      limitOrder: "Limit Order",
      marketOrder: "Market Order"
    },
    benefits: {
      newBenefit: "New Benefit",
      newBenefitTooltip: "Payback benefit applied for 3 weeks after registration",
      regularBenefit: "Regular Benefit",
      fee: "Fee",
      payback: "Payback"
    },
    howToJoin: {
      step1: {
        description: "Provided by TetherGrow",
        linkText: "Join Link"
      },
      step2: {
        description: "After registration",
        uidLink: "UID Linking"
      },
      step3: {
        description: "When accumulating 20 USDT or more",
        autoDeposit: "Payback will be automatically deposited"
      }
    },
    help: {
      title: "Having trouble signing up?",
      description: "Please refer to the links below!",
      newRegistration: "New Registration Method",
      changeRegistration: "Change Registration Method"
    },
    joinButton: "Join"
  }
};
const es = {
  home: {
    title: "Supaplate",
    subtitle: "Es hora de construir!",
    hero: {
      titleLine1: "El simple reembolso es solo el comienzo,",
      titleLine2: "La era de",
      titleLine3: "¡diseñar rendimientos con análisis de IA!",
      subtitle: "Experiméntalo ahora en TetherGrow.",
      ctaButton: "Comenzar"
    },
    integration: {
      selectExchange: "Seleccionar Exchange",
      uidPlaceholder: "Ingrese su UID"
    },
    exchanges: {
      title: "Exchanges Socios"
    }
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
    logout: "Cerrar Sesión"
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
      hidePassword: "Ocultar contraseña"
    },
    join: {
      title: "Registrarse",
      submitButton: "Registrarse",
      checkDuplicate: "Verificar Duplicado",
      duplicateCheckSuccess: "Correo disponible"
    }
  },
  validation: {
    auth: {
      email: {
        required: "El correo electrónico es obligatorio",
        invalid: "Formato de correo electrónico inválido",
        duplicateCheckRequired: "Por favor, verifique la disponibilidad del correo",
        alreadyRegistered: "El correo ya está registrado"
      },
      password: {
        required: "La contraseña es obligatoria",
        minLength: "La contraseña es obligatoria (al menos 8 caracteres)",
        requireFormat: "Debe incluir números y caracteres especiales"
      }
    },
    home: {
      uid: {
        required: "UID es obligatorio"
      },
      exchangeID: {
        required: "Por favor seleccione un exchange"
      }
    }
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
      "010305": "El código de verificación no coincide."
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
      "020404": "La contraseña no coincide."
    },
    integration: {
      "200": "Solicitud de integración UID completada con éxito.",
      "050104": "Este UID ya ha sido solicitado."
    }
  },
  service: {
    hero: {
      badge: "Plataforma de Mejora de Beneficios Basada en IA",
      titlePart1: "¿Todavía comparas",
      titleHighlight1: "tasas de reembolso del 0.01%",
      titlePart2: "?",
      titleHighlight2: "Beneficios reales",
      titlePart3: "es lo que importa ahora.",
      description: "TetherGrow aprende de los datos de trading para detectar comportamiento de manada y sugiere estrategias de mejora de beneficios a través de dashboards personalizados. Más allá de la simple competencia de tasas, tu trading crece.",
      buttonAnalyze: "Analizar Mi Trading Ahora",
      buttonDemo: "Ver Dashboard Demo",
      stats: {
        monthlyReport: "Informe Mensual",
        herdAlert: "Alerta de Comportamiento de Manada",
        exchangeCompatible: "Compatible con Exchanges"
      },
      statsValues: {
        realTime: "Tiempo Real"
      }
    },
    problem: {
      title: "Limitaciones de las Plataformas Existentes",
      items: {
        rateCompetition: "Se enfocan solo en la competencia de tasas, sin mejora real de beneficios ni aprendizaje.",
        highPayback: "Las altas tasas de reembolso son rápidamente igualadas en otros lugares, impidiendo que los clientes leales se establezcan.",
        noAnalysis: "No se proporcionan análisis de patrones de trading, alertas de riesgo o guías de mejora."
      }
    },
    solution: {
      title: "La Solución de TetherGrow",
      features: {
        aiAnalysis: {
          title: "Análisis de Patrones de Trading con IA",
          desc: "Aprende los hábitos de trading individuales para sugerir estrategias de mejora de beneficios."
        },
        herdDetection: {
          title: "Detección y Alertas de Comportamiento de Manada",
          desc: "Advierte en tiempo real sobre entradas excesivas durante movimientos bruscos de precios."
        },
        dashboard: {
          title: "Dashboard de Informes de Rentabilidad",
          desc: "Visualiza informes de rendimiento semanales/mensuales y ganancias/pérdidas realizadas por operación."
        },
        paybackOptimization: {
          title: "Optimización de Reembolsos",
          desc: "Recomienda tasas óptimas que reflejan estructuras de comisiones y recompensas por exchange."
        }
      }
    },
    comparison: {
      title: "¿Qué es Diferente?",
      existingPlatform: {
        title: "Plataformas de Referidos Existentes",
        items: {
          rateOnly: "Enfatizan solo las tasas de reembolso",
          noAnalysis: "Sin análisis de datos/alertas",
          temporary: "Rotación temporal e influxo se repiten",
          rewardOnly: "Proporcionan solo historial de recompensas"
        }
      },
      tethergrow: {
        items: {
          aiAnalysis: "Análisis de patrones de trading con IA e informes de mejora",
          herdAlert: "Alertas de detección de comportamiento de manada en tiempo real",
          personalized: "Forma hábitos de beneficios con dashboards personalizados",
          optimalPayback: "Recomendaciones de reembolso óptimo por exchange"
        }
      }
    },
    dashboard: {
      title: "Vista Previa del Dashboard Demo",
      monthlyReturn: {
        title: "Cambio de Rentabilidad Mensual",
        change: "vs. Mes Pasado"
      },
      herdWarning: {
        title: "Advertencia de Comportamiento de Manada",
        pattern: "Patrón de compra FOMO excesivo",
        suggestion: "Sugerencia de estrategia: Entrada escalonada, stop loss fijo en -0.8%"
      },
      exchangeRecommend: {
        title: "Recomendación de Exchange",
        desc: "Recomendación de combinación de comisiones/recompensas que coincide con tu patrón"
      },
      riskIndicator: {
        title: "Indicador de Riesgo",
        mdd: "Drawdown Máximo (MDD)",
        volatility: "Volatilidad semanal 1.8%"
      },
      whyNow: {
        title: "¿Por Qué TetherGrow Ahora?",
        items: {
          habit: "Diseña 'hábitos de beneficios', no solo recompensas simples.",
          personalized: "Crea resultados reproducibles con alertas e informes personalizados.",
          winWin: "Una estructura donde la plataforma y los miembros crecen juntos (Win-Win)."
        }
      }
    },
    cta: {
      title: "Experimenta el Análisis de Trading con IA Ahora",
      description: "Proporciona puntos de mejora aplicables inmediatamente a través del primer informe de análisis.",
      buttonStart: "Comenzar Gratis",
      buttonDetails: "Ver Características en Detalle"
    }
  },
  exchange: {
    orderTypes: {
      limitOrder: "Orden Límite",
      marketOrder: "Orden de Mercado"
    },
    benefits: {
      newBenefit: "Beneficio Nuevo",
      newBenefitTooltip: "Beneficio de reembolso aplicado durante 3 semanas después del registro",
      regularBenefit: "Beneficio Regular",
      fee: "Comisión",
      payback: "Reembolso"
    },
    howToJoin: {
      step1: {
        description: "Proporcionado por TetherGrow",
        linkText: "Enlace de Registro"
      },
      step2: {
        description: "Después del registro",
        uidLink: "Vinculación de UID"
      },
      step3: {
        description: "Al acumular 20 USDT o más",
        autoDeposit: "El reembolso se depositará automáticamente"
      }
    },
    help: {
      title: "¿Tiene problemas para registrarse?",
      description: "¡Consulte los enlaces a continuación!",
      newRegistration: "Método de Registro Nuevo",
      changeRegistration: "Método de Cambio de Registro"
    },
    joinButton: "Registrarse"
  }
};
const ja = {
  home: {
    title: "スーパープレート",
    subtitle: "構築の時間です！",
    hero: {
      titleLine1: "シンプルなペイバックは始まりに過ぎません、",
      titleLine2: "AI分析で",
      titleLine3: "収益率を設計する時代！",
      subtitle: "今すぐTetherGrowで体験してください。",
      ctaButton: "今すぐ始める"
    },
    integration: {
      selectExchange: "取引所を選択",
      uidPlaceholder: "UIDを入力してください"
    },
    exchanges: {
      title: "パートナー取引所"
    }
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
    logout: "ログアウト"
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
      hidePassword: "パスワードを非表示"
    },
    join: {
      title: "会員登録",
      submitButton: "登録",
      checkDuplicate: "重複確認",
      duplicateCheckSuccess: "メールアドレスが利用可能です"
    }
  },
  validation: {
    auth: {
      email: {
        required: "メールアドレスを入力してください",
        invalid: "正しいメールアドレス形式ではありません",
        duplicateCheckRequired: "メールアドレスの利用可能性を確認してください",
        alreadyRegistered: "メールアドレスは既に登録されています"
      },
      password: {
        required: "パスワードを入力してください",
        minLength: "パスワードを入力してください（8文字以上）",
        requireFormat: "数字と特殊文字を含める必要があります"
      }
    },
    home: {
      uid: {
        required: "UIDを入力してください"
      },
      exchangeID: {
        required: "取引所を選択してください"
      }
    }
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
      "010305": "認証コードが一致しません。"
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
      "020404": "パスワードが一致しません。"
    },
    integration: {
      "200": "UID連携申請成功",
      "050104": "既に申請されたUIDです。"
    }
  },
  service: {
    hero: {
      badge: "AIベースの収益向上プラットフォーム",
      titlePart1: "まだ",
      titleHighlight1: "ペイバック率0.01%",
      titlePart2: "を比較していますか？",
      titleHighlight2: "実際の収益",
      titlePart3: "を上げる時です。",
      description: "TetherGrowは取引データを学習して群集行動を検出し、パーソナライズされたダッシュボードで収益改善戦略を提案します。単純なレート競争を超えて、あなたの取引が成長します。",
      buttonAnalyze: "今すぐ取引分析を受ける",
      buttonDemo: "デモダッシュボードを見る",
      stats: {
        monthlyReport: "月間レポート",
        herdAlert: "群集行動アラート",
        exchangeCompatible: "取引所対応"
      },
      statsValues: {
        realTime: "リアルタイム"
      }
    },
    problem: {
      title: "既存プラットフォームの限界",
      items: {
        rateCompetition: "レート競争にのみ焦点を当て、実質的な収益改善や学習が行われません。",
        highPayback: "高いペイバックもすぐに他の場所に追いやられ、忠実な顧客が定着しません。",
        noAnalysis: "取引パターン分析、リスクアラート、改善ガイドは提供されません。"
      }
    },
    solution: {
      title: "TetherGrowの解決策",
      features: {
        aiAnalysis: {
          title: "AI取引パターン分析",
          desc: "個人別の取引習慣を学習して収益向上戦略を提案します。"
        },
        herdDetection: {
          title: "群集行動検出＆アラート",
          desc: "急騰・急落区間での過度な参入をリアルタイムで警告します。"
        },
        dashboard: {
          title: "収益率レポートダッシュボード",
          desc: "週/月間のパフォーマンスレポートと取引別の実現損益を可視化します。"
        },
        paybackOptimization: {
          title: "ペイバック最適化",
          desc: "取引所別の手数料・リワード構造を反映した最適比率を推奨します。"
        }
      }
    },
    comparison: {
      title: "何が違うのか？",
      existingPlatform: {
        title: "既存の紹介プラットフォーム",
        items: {
          rateOnly: "ペイバック率のみ強調",
          noAnalysis: "データ分析/アラート不在",
          temporary: "一時的な離脱・流入の繰り返し",
          rewardOnly: "リワード履歴のみ提供"
        }
      },
      tethergrow: {
        items: {
          aiAnalysis: "AI取引パターン分析と改善レポート",
          herdAlert: "群集行動リアルタイム検出アラート",
          personalized: "パーソナライズドダッシュボードで収益習慣形成",
          optimalPayback: "取引所別最適ペイバック推奨"
        }
      }
    },
    dashboard: {
      title: "デモダッシュボードプレビュー",
      monthlyReturn: {
        title: "月間収益率の変化",
        change: "先月比"
      },
      herdWarning: {
        title: "群集行動警告",
        pattern: "過度な追い上げ買いパターン",
        suggestion: "戦略提案：分割参入、損切り-0.8%固定"
      },
      exchangeRecommend: {
        title: "取引所推奨",
        desc: "あなたのパターンに合った手数料/リワード組み合わせ推奨"
      },
      riskIndicator: {
        title: "リスク指標",
        mdd: "最大ドローダウン（MDD）",
        volatility: "週間変動率1.8%"
      },
      whyNow: {
        title: "なぜ今TetherGrowなのか？",
        items: {
          habit: "単純なリワードではなく、「収益習慣」を設計します。",
          personalized: "パーソナライズされたアラートとレポートで再現可能な成果を作ります。",
          winWin: "プラットフォームとメンバーが共に成長する構造（Win-Win）。"
        }
      }
    },
    cta: {
      title: "今すぐAI取引分析を体験してください。",
      description: "最初の分析レポートを通じて即座に適用可能な改善ポイントを提供します。",
      buttonStart: "無料で始める",
      buttonDetails: "機能を詳しく見る"
    }
  },
  exchange: {
    orderTypes: {
      limitOrder: "指値注文",
      marketOrder: "成行注文"
    },
    benefits: {
      newBenefit: "新規特典",
      newBenefitTooltip: "登録後3週間適用されるペイバック特典",
      regularBenefit: "通常特典",
      fee: "手数料",
      payback: "ペイバック"
    },
    howToJoin: {
      step1: {
        description: "TetherGrowが提供する",
        linkText: "登録リンク"
      },
      step2: {
        description: "登録後に生成された",
        uidLink: "UID連携"
      },
      step3: {
        description: "20USDT以上累積時",
        autoDeposit: "ペイバックが自動入金されます"
      }
    },
    help: {
      title: "登録でお困りですか？",
      description: "以下のリンクを参照してください！",
      newRegistration: "新規登録方法",
      changeRegistration: "変更登録方法"
    },
    joinButton: "登録する"
  }
};
const ko = {
  home: {
    title: "슈파플레이트",
    subtitle: "빌드하는 시간이야!",
    hero: {
      titleLine1: "단순한 페이백은 시작일 뿐,",
      titleLine2: "AI 분석으로",
      titleLine3: "수익률을 설계하는 시대!",
      subtitle: "지금, 테더그로우에서 경험해 보세요.",
      ctaButton: "지금 시작하기"
    },
    integration: {
      selectExchange: "거래소 선택",
      uidPlaceholder: "UID를 입력해주세요"
    },
    exchanges: {
      title: "제휴 거래소"
    }
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
    logout: "로그아웃"
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
      hidePassword: "비밀번호 숨기기"
    },
    join: {
      title: "회원가입",
      submitButton: "회원가입",
      checkDuplicate: "중복 확인",
      duplicateCheckSuccess: "사용 가능한 이메일입니다"
    }
  },
  validation: {
    auth: {
      email: {
        required: "이메일을 입력해주세요",
        invalid: "올바른 이메일 형식이 아닙니다",
        duplicateCheckRequired: "이메일 중복확인을 해주세요",
        alreadyRegistered: "이미 가입된 이메일입니다"
      },
      password: {
        required: "비밀번호를 입력해주세요",
        minLength: "비밀번호를 입력해주세요 (최소 8자)",
        requireFormat: "숫자, 특수문자를 포함해 주세요"
      }
    },
    home: {
      uid: {
        required: "UID를 입력해주세요"
      },
      exchangeID: {
        required: "거래소를 선택해주세요"
      }
    }
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
      "010305": "인증번호가 일치하지 않습니다."
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
      "020404": "비밀번호가 일치하지 않습니다."
    },
    integration: {
      "200": "UID 연동 신청 성공",
      "050104": "이미 신청된 UID입니다."
    }
  },
  service: {
    hero: {
      badge: "AI 기반 수익 향상 플랫폼",
      titlePart1: "아직도",
      titleHighlight1: "페이백률 0.01%",
      titlePart2: "을 비교하나요?",
      titleHighlight2: "실제 수익",
      titlePart3: "을 높일 때.",
      description: "TetherGrow는 거래 데이터를 학습해 뇌동매매를 감지하고, 개인화된 대시보드로 수익 개선 전략을 제안합니다. 단순 요율 경쟁을 넘어, 당신의 거래가 성장합니다.",
      buttonAnalyze: "지금 내 거래 분석받기",
      buttonDemo: "데모 대시보드 보기",
      stats: {
        monthlyReport: "월간 리포트",
        herdAlert: "뇌동매매 알림",
        exchangeCompatible: "거래소 호환"
      },
      statsValues: {
        realTime: "실시간"
      }
    },
    problem: {
      title: "기존 플랫폼의 한계",
      items: {
        rateCompetition: "요율 경쟁에만 집중해 실질 수익 개선과 학습이 이뤄지지 않습니다.",
        highPayback: "높은 페이백도 금세 다른 곳에 밀려, 충성 고객이 정착하지 않습니다.",
        noAnalysis: "거래 패턴 분석, 리스크 알림, 개선 가이드는 제공되지 않습니다."
      }
    },
    solution: {
      title: "TetherGrow의 해답",
      features: {
        aiAnalysis: {
          title: "AI 거래 패턴 분석",
          desc: "개인별 거래 습관을 학습해 수익 향상 전략을 제안합니다."
        },
        herdDetection: {
          title: "뇌동매매 감지 & 알림",
          desc: "급등·급락 구간에서 과도한 진입을 실시간으로 경고합니다."
        },
        dashboard: {
          title: "수익률 리포트 대시보드",
          desc: "주/월간 성과 리포트와 거래별 실현손익을 시각화합니다."
        },
        paybackOptimization: {
          title: "페이백 최적화",
          desc: "거래소별 수수료·리워드 구조를 반영한 최적 비율을 추천합니다."
        }
      }
    },
    comparison: {
      title: "무엇이 다른가요?",
      existingPlatform: {
        title: "기존 셀퍼럴 플랫폼",
        items: {
          rateOnly: "페이백률만 강조",
          noAnalysis: "데이터 분석/알림 부재",
          temporary: "일시적 이탈·유입 반복",
          rewardOnly: "리워드 이력만 제공"
        }
      },
      tethergrow: {
        items: {
          aiAnalysis: "AI 거래 패턴 분석과 개선 리포트",
          herdAlert: "뇌동매매 실시간 감지 알림",
          personalized: "개인화 대시보드로 수익 습관 형성",
          optimalPayback: "거래소별 최적 페이백 추천"
        }
      }
    },
    dashboard: {
      title: "데모 대시보드 미리보기",
      monthlyReturn: {
        title: "월간 수익률 변화",
        change: "지난달 대비"
      },
      herdWarning: {
        title: "뇌동매매 경고",
        pattern: "과도한 추격매수 패턴",
        suggestion: "전략 제안: 분할 진입, 손절 -0.8% 고정"
      },
      exchangeRecommend: {
        title: "거래소 추천",
        desc: "내 패턴에 맞는 수수료/리워드 조합 추천"
      },
      riskIndicator: {
        title: "리스크 지표",
        mdd: "최대 낙폭(MDD)",
        volatility: "주간 변동성 1.8%"
      },
      whyNow: {
        title: "왜 지금 TetherGrow인가?",
        items: {
          habit: "단순 리워드가 아닌, '수익 습관'을 설계합니다.",
          personalized: "개인화된 알림과 리포트로 재현 가능한 성과를 만듭니다.",
          winWin: "플랫폼과 회원이 함께 성장하는 구조(Win-Win)."
        }
      }
    },
    cta: {
      title: "지금 바로 AI 거래 분석을 경험해보세요.",
      description: "첫 분석 리포트를 통해 즉시 적용 가능한 개선 포인트를 제공합니다.",
      buttonStart: "무료로 시작하기",
      buttonDetails: "기능 자세히 보기"
    }
  },
  exchange: {
    orderTypes: {
      limitOrder: "지정가",
      marketOrder: "시장가"
    },
    benefits: {
      newBenefit: "신규 혜택",
      newBenefitTooltip: "가입후 3주 동안 적용되는 페이백 혜택",
      regularBenefit: "일반 혜택",
      fee: "수수료",
      payback: "페이백"
    },
    howToJoin: {
      step1: {
        description: "테더그로우에서 제공하는",
        linkText: "가입하기 링크"
      },
      step2: {
        description: "가입 후 생성된",
        uidLink: "UID 연동"
      },
      step3: {
        description: "20USDT 이상 누적 시",
        autoDeposit: "페이백이 자동 입금됩니다"
      }
    },
    help: {
      title: "가입이 어려우신가요?",
      description: "아래 링크를 참고하세요!",
      newRegistration: "신규 가입 방법",
      changeRegistration: "변경 가입 방법"
    },
    joinButton: "가입하기"
  }
};
const zhCN = {
  home: {
    title: "超级模板",
    subtitle: "是时候构建了！",
    hero: {
      titleLine1: "简单的返利只是开始，",
      titleLine2: "通过AI分析",
      titleLine3: "设计收益率的时代！",
      subtitle: "现在就在TetherGrow体验吧。",
      ctaButton: "立即开始"
    },
    integration: {
      selectExchange: "选择交易所",
      uidPlaceholder: "请输入您的UID"
    },
    exchanges: {
      title: "合作交易所"
    }
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
    logout: "退出"
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
      hidePassword: "隐藏密码"
    },
    join: {
      title: "注册",
      submitButton: "注册",
      checkDuplicate: "检查重复",
      duplicateCheckSuccess: "邮箱可用"
    }
  },
  validation: {
    auth: {
      email: {
        required: "请输入邮箱",
        invalid: "邮箱格式不正确",
        duplicateCheckRequired: "请检查邮箱可用性",
        alreadyRegistered: "邮箱已被注册"
      },
      password: {
        required: "请输入密码",
        minLength: "请输入密码（至少8个字符）",
        requireFormat: "必须包含数字和特殊字符"
      }
    },
    home: {
      uid: {
        required: "请输入UID"
      },
      exchangeID: {
        required: "请选择交易所"
      }
    }
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
      "010305": "验证码不匹配。"
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
      "020404": "密码不匹配。"
    },
    integration: {
      "200": "UID 绑定申请成功。",
      "050104": "该 UID 已经提交过申请。"
    }
  },
  service: {
    hero: {
      badge: "AI驱动的利润提升平台",
      titlePart1: "还在比较",
      titleHighlight1: "0.01%返佣率",
      titlePart2: "吗？",
      titleHighlight2: "实际利润",
      titlePart3: "才是现在最重要的。",
      description: "TetherGrow从交易数据中学习，检测跟风行为，通过个性化仪表板提供利润改进策略。超越简单的费率竞争，让您的交易成长。",
      buttonAnalyze: "立即分析我的交易",
      buttonDemo: "查看演示仪表板",
      stats: {
        monthlyReport: "月度报告",
        herdAlert: "跟风行为警报",
        exchangeCompatible: "交易所兼容"
      },
      statsValues: {
        realTime: "实时"
      }
    },
    problem: {
      title: "现有平台的局限性",
      items: {
        rateCompetition: "只专注于费率竞争，没有真正的利润改进或学习。",
        highPayback: "高返佣很快被其他地方匹配，忠诚客户无法稳定下来。",
        noAnalysis: "不提供交易模式分析、风险警报或改进指南。"
      }
    },
    solution: {
      title: "TetherGrow的解决方案",
      features: {
        aiAnalysis: {
          title: "AI交易模式分析",
          desc: "学习个人交易习惯，提出利润提升策略。"
        },
        herdDetection: {
          title: "跟风行为检测与警报",
          desc: "实时警告价格剧烈波动期间的过度入场。"
        },
        dashboard: {
          title: "利润率报告仪表板",
          desc: "可视化每周/每月业绩报告和每笔交易的已实现盈亏。"
        },
        paybackOptimization: {
          title: "返佣优化",
          desc: "推荐反映各交易所费用和奖励结构的最优费率。"
        }
      }
    },
    comparison: {
      title: "有什么不同？",
      existingPlatform: {
        title: "现有推荐平台",
        items: {
          rateOnly: "只强调返佣率",
          noAnalysis: "无数据分析/警报",
          temporary: "临时流失和流入重复",
          rewardOnly: "只提供奖励历史"
        }
      },
      tethergrow: {
        items: {
          aiAnalysis: "AI交易模式分析和改进报告",
          herdAlert: "实时跟风行为检测警报",
          personalized: "通过个性化仪表板形成利润习惯",
          optimalPayback: "按交易所推荐最优返佣"
        }
      }
    },
    dashboard: {
      title: "演示仪表板预览",
      monthlyReturn: {
        title: "月度收益率变化",
        change: "与上月相比"
      },
      herdWarning: {
        title: "跟风行为警告",
        pattern: "过度追涨买入模式",
        suggestion: "策略建议：分批入场，止损固定在-0.8%"
      },
      exchangeRecommend: {
        title: "交易所推荐",
        desc: "匹配您模式的费用/奖励组合推荐"
      },
      riskIndicator: {
        title: "风险指标",
        mdd: "最大回撤（MDD）",
        volatility: "周波动率1.8%"
      },
      whyNow: {
        title: "为什么选择TetherGrow？",
        items: {
          habit: "设计'利润习惯'，而不仅仅是简单的奖励。",
          personalized: "通过个性化警报和报告创造可重现的成果。",
          winWin: "平台和会员共同成长的结构（双赢）。"
        }
      }
    },
    cta: {
      title: "立即体验AI交易分析",
      description: "通过首次分析报告提供立即可应用的改进点。",
      buttonStart: "免费开始",
      buttonDetails: "详细了解功能"
    }
  },
  exchange: {
    orderTypes: {
      limitOrder: "限价单",
      marketOrder: "市价单"
    },
    benefits: {
      newBenefit: "新用户福利",
      newBenefitTooltip: "注册后3周内适用的返佣福利",
      regularBenefit: "常规福利",
      fee: "手续费",
      payback: "返佣"
    },
    howToJoin: {
      step1: {
        description: "由TetherGrow提供",
        linkText: "注册链接"
      },
      step2: {
        description: "注册后生成的",
        uidLink: "UID关联"
      },
      step3: {
        description: "累计20 USDT或以上时",
        autoDeposit: "返佣将自动入账"
      }
    },
    help: {
      title: "注册有困难吗？",
      description: "请参考以下链接！",
      newRegistration: "新用户注册方法",
      changeRegistration: "更改注册方法"
    },
    joinButton: "立即注册"
  }
};
const localeCookie = createCookie("locale", {
  path: "/",
  sameSite: "lax"
});
const i18next = new RemixI18Next({
  // Language detection configuration
  detection: {
    // Use the localeCookie for persistent language preference
    cookie: localeCookie,
    // Languages supported by the application
    supportedLanguages: i18n.supportedLngs,
    // Fallback language when the requested language is not available
    fallbackLanguage: i18n.fallbackLng
  },
  // i18next configuration
  i18next: {
    // Spread the base i18n configuration
    ...i18n,
    // In-memory translation resources for each supported language
    resources: {
      // English translations
      en: {
        common: en
      },
      // Spanish translations
      es: {
        common: es
      },
      // Japanese translations
      ja: {
        common: ja
      },
      // Korean translations
      ko: {
        common: ko
      },
      // Chinese (Simplified) translations
      "zh-CN": {
        common: zhCN
      }
    }
  }
});
const streamTimeout = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise(async (resolve, reject) => {
    const i18nextInstance = createInstance();
    const lng = await i18next.getLocale(request);
    const ns = i18next.getRouteNamespaces(routerContext);
    await i18nextInstance.use(initReactI18next).init({
      ...i18n,
      lng,
      ns,
      resources: {
        en: {
          common: en
        },
        es: {
          common: es
        },
        ko: {
          common: ko
        }
      }
    });
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(I18nextProvider, { i18n: i18nextInstance, children: /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }) }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
          );
          if (process.env.NODE_ENV === "production") ;
          responseHeaders.set("X-Content-Type-Options", "nosniff");
          responseHeaders.set(
            "Referrer-Policy",
            "strict-origin-when-cross-origin"
          );
          responseHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
          responseHeaders.set("Cross-Origin-Embedder-Policy", "unsafe-none");
          responseHeaders.set("X-Frame-Options", "DENY");
          responseHeaders.set("X-XSS-Protection", "1; mode=block");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error2) {
          reject(error2);
        },
        onError(error2) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error2);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const handleError = (error2, { request }) => {
  if (!request.signal.aborted && process.env.SENTRY_DSN && process.env.NODE_ENV === "production") {
    console.error(error2);
  }
};
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  handleError,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const nProgressStyles = "/assets/nprogress-BgDCIyLK.css";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "sheet", ...props });
}
function getClientIP(request) {
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",").map((ip) => ip.trim());
    const firstIP = ips[0];
    if (firstIP && firstIP !== "127.0.0.1" && firstIP !== "::1") {
      return firstIP;
    }
  }
  const xRealIP = request.headers.get("x-real-ip");
  if (xRealIP && xRealIP !== "127.0.0.1" && xRealIP !== "::1") {
    return xRealIP;
  }
  const url = new URL(request.url);
  const hostname = url.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
    return "localhost";
  }
  return null;
}
function getCountryFromCloudflare(request) {
  return request.headers.get("cf-ipcountry") || null;
}
async function getCountryFromIP(ip) {
  var _a;
  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=countryCode`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(2e3)
        // 2 second timeout
      }
    );
    if (!response.ok) {
      return null;
    }
    const data2 = await response.json();
    return ((_a = data2.countryCode) == null ? void 0 : _a.toUpperCase()) || null;
  } catch (error2) {
    console.error("GeoIP lookup failed:", error2);
    return null;
  }
}
async function detectCountry(request) {
  var _a;
  const cfCountry = getCountryFromCloudflare(request);
  if (cfCountry && cfCountry !== "XX") {
    return cfCountry;
  }
  const ip = getClientIP(request);
  if (ip === "localhost" || !ip) {
    try {
      const response = await fetch(
        "http://ip-api.com/json/?fields=countryCode,query",
        {
          method: "GET",
          headers: {
            Accept: "application/json"
          },
          signal: AbortSignal.timeout(3e3)
          // 3 second timeout
        }
      );
      if (response.ok) {
        const data2 = await response.json();
        return ((_a = data2.countryCode) == null ? void 0 : _a.toUpperCase()) || null;
      }
    } catch (error2) {
      console.error("Failed to detect country from public IP service:", error2);
    }
    return null;
  }
  return await getCountryFromIP(ip);
}
function getLocaleFromCountry(countryCode) {
  if (countryCode === "KR") {
    return "ko";
  }
  return "en";
}
const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen flex-col items-center justify-center gap-2.5", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-5xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl", children: "The page you are looking for does not exist." }),
    /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Go home →" }) })
  ] });
}
const links = () => [
  // favicon, web & app icons
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/favicon-16x16.png"
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/favicon-32x32.png"
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/favicon/favicon-96x96.png"
  },
  {
    rel: "shortcut icon",
    href: "/favicon/favicon.ico"
  },
  // --- Apple Touch Icons ---
  {
    rel: "apple-touch-icon",
    sizes: "57x57",
    href: "/favicon/apple-touch-icon-57x57.png"
  },
  {
    rel: "apple-touch-icon",
    sizes: "72x72",
    href: "/favicon/apple-touch-icon-72x72.png"
  },
  {
    rel: "apple-touch-icon",
    sizes: "76x76",
    href: "/favicon/apple-touch-icon-76x76.png"
  },
  {
    rel: "apple-touch-icon",
    sizes: "114x114",
    href: "/favicon/apple-touch-icon-114x114.png"
  },
  {
    rel: "apple-touch-icon",
    sizes: "120x120",
    href: "/favicon/apple-touch-icon-120x120.png"
  },
  {
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: "/favicon/apple-touch-icon-144x144.png"
  },
  {
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: "/favicon/apple-touch-icon-152x152.png"
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/apple-touch-icon-180x180.png"
  },
  {
    rel: "apple-touch-icon",
    sizes: "192x192",
    href: "/favicon/apple-touch-icon-192x192.png"
  },
  // --- Android / PWA ---
  {
    rel: "manifest",
    href: "/site.webmanifest"
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
  },
  {
    rel: "stylesheet",
    href: nProgressStyles
  }
];
async function loader$3({
  request
}) {
  const cookie = await localeCookie.parse(request.headers.get("Cookie"));
  let locale;
  if (cookie) {
    locale = cookie;
  } else {
    const countryCode = await detectCountry(request);
    locale = getLocaleFromCountry(countryCode);
  }
  return {
    theme: "light",
    locale
  };
}
const handle = {
  i18n: "common"
};
function Layout({
  children
}) {
  return /* @__PURE__ */ jsx(ThemeProvider, {
    specifiedTheme: Theme.LIGHT,
    themeAction: "",
    children: /* @__PURE__ */ jsx(InnerLayout, {
      children
    })
  });
}
function InnerLayout({
  children
}) {
  const [theme] = useTheme();
  const data2 = useRouteLoaderData("root");
  const {
    i18n: i18n2
  } = useTranslation();
  const {
    pathname
  } = useLocation();
  useChangeLanguage((data2 == null ? void 0 : data2.locale) ?? "en");
  const isPreRendered = pathname.includes("/legal") || pathname.includes("/blog");
  return /* @__PURE__ */ jsxs("html", {
    lang: (data2 == null ? void 0 : data2.locale) ?? "en",
    className: cn(theme ?? "", "h-full"),
    dir: i18n2.dir(),
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), isPreRendered ? /* @__PURE__ */ jsx("script", {
        src: "/scripts/prerendered-theme.js"
      }) : /* @__PURE__ */ jsx(PreventFlashOnWrongTheme, {
        ssrTheme: Boolean(data2 == null ? void 0 : data2.theme)
      }), /* @__PURE__ */ jsx("script", {
        src: "https://static.geetest.com/v4/gt4.js"
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(Toaster, {
        richColors: true,
        position: "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  const navigation = useNavigation();
  useEffect(() => {
    NProgress.configure({
      showSpinner: true
    });
  }, []);
  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    } else if (navigation.state === "idle") {
      NProgress.done();
    }
  }, [navigation.state]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      const error2 = searchParams.get("error");
      const code = searchParams.get("code");
      if (error2) {
        navigate(`/error?${searchParams.toString()}`);
      } else if (code) {
        navigate(`/dashboard/account`);
      }
    }
  }, [searchParams]);
  return /* @__PURE__ */ jsx(Sheet, {
    children: /* @__PURE__ */ jsx(Dialog, {
      children: /* @__PURE__ */ jsx(Outlet, {})
    })
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error: error2
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error2)) {
    if (error2.status === 404) {
      return /* @__PURE__ */ jsx(NotFound, {});
    }
    message = "Error";
    details = error2.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "container mx-auto p-4 pt-16",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  handle,
  links,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const localeSchema = z.enum(i18n.supportedLngs);
async function action$1({
  request
}) {
  const url = new URL(request.url);
  const locale = localeSchema.parse(url.searchParams.get("locale"));
  return data(null, {
    headers: {
      "Set-Cookie": await localeCookie.serialize(locale)
    }
  });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "text-muted-foreground mt-auto flex items-center justify-between border-t p-4 text-sm md:py-5", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto h-full w-full max-w-screen-2xl gap-2.5 md:flex md:items-end md:justify-between md:gap-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/logo/tethergrow_logo_light_mode_full.svg",
          alt: "logo",
          className: "h-6"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { children: "E-mail : tethergrow25@gmail.com" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-4", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/sns/instagram.svg",
              alt: "instagram",
              className: "size-6"
            }
          ) }),
          /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/sns/threads.png",
              alt: "threads",
              className: "size-5"
            }
          ) }),
          /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/sns/telegram.svg",
              alt: "telegram",
              className: "size-6"
            }
          ) }),
          /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("img", { src: "/images/sns/x.svg", alt: "twitter", className: "size-6" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        void 0,
        ". All rights reserved."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-10 mt-6 *:underline md:order-none md:mt-0", children: [
      /* @__PURE__ */ jsx(Link, { to: "/legal/privacy-policy", viewTransition: true, children: "개인정보 처리방침" }),
      /* @__PURE__ */ jsx(Link, { to: "/legal/terms-of-use", viewTransition: true, children: "이용약관" })
    ] })
  ] }) });
}
function NavigationBar({
  email,
  loading
}) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: "fixed top-0 left-0 z-10 mx-auto flex h-16 w-full items-center justify-between border-b px-5 shadow-xs backdrop-blur-lg transition-opacity md:px-10",
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between py-3", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/logo/tethergrow_logo_light_mode_full.svg",
            alt: "logo",
            className: "h-6"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: loading ? /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("div", { className: "bg-muted-foreground/20 size-8 animate-pulse rounded-lg" }) }) : /* @__PURE__ */ jsx(Fragment, {}) })
      ] })
    }
  );
}
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    // XSS 방어
    path: "/",
    sameSite: "lax",
    secrets: [
      process.env.SESSION_SECRET || "default-secret-change-in-production"
    ],
    secure: process.env.MODE === "production",
    // production에서는 HTTPS only
    maxAge: 60 * 60 * 24 * 7
    // 7일
  }
});
async function getAuthToken(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const token = session.get("token");
  return token;
}
async function apiRequest({
  request,
  endpoint,
  method = "GET",
  body
}) {
  const token = await getAuthToken(request);
  const headers = {
    "Content-Type": "application/json",
    key: process.env.TETHERGROW_API_KEY || ""
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${process.env.VITE_API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : void 0,
    credentials: "include"
  });
  const responseData = await response.json();
  return responseData;
}
async function loader$2({
  request
}) {
  const token = await getAuthToken(request);
  if (!token) {
    return {
      user: null
    };
  }
  try {
    const responseData = await apiRequest({
      request,
      endpoint: "/my-page/user/info",
      method: "GET"
    });
    return {
      user: responseData.user
    };
  } catch (error2) {
    console.error("Failed to fetch user info:", error2);
    return {
      user: null
    };
  }
}
const navigation_layout = UNSAFE_withComponentProps(function NavigationLayout({
  loaderData
}) {
  const {
    user
  } = loaderData;
  return /* @__PURE__ */ jsxs("div", {
    className: "flex min-h-screen flex-col justify-between pt-16",
    children: [/* @__PURE__ */ jsx(Suspense, {
      fallback: /* @__PURE__ */ jsx(NavigationBar, {
        loading: true
      }),
      children: /* @__PURE__ */ jsx(Await, {
        resolve: user,
        children: (user2) => user2 === null ? /* @__PURE__ */ jsx(NavigationBar, {
          loading: false
        }) : /* @__PURE__ */ jsx(NavigationBar, {
          email: user2.userID,
          loading: false
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: navigation_layout,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1({
  request
}) {
  return {};
}
const public_layout = UNSAFE_withComponentProps(function PublicLayout() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: public_layout,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      style: {
        "--bg-size": `${speed * 300}%`,
        "--color-from": colorFrom,
        "--color-to": colorTo
      },
      className: cn(
        `animate-gradient inline bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
        className
      ),
      ...props,
      children
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const fieldVariants = cva("group/field flex flex-col gap-1.5", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-center justify-between gap-3"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});
function Field({
  className,
  orientation,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "field",
      className: cn(fieldVariants({ orientation, className })),
      ...props
    }
  );
}
function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "field-group",
      className: cn("flex flex-col gap-4", className),
      ...props
    }
  );
}
function FieldLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      "data-slot": "field-label",
      className: cn(
        "text-foreground text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[invalid=true]/field:text-destructive",
        className
      ),
      ...props
    }
  );
}
function FieldDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "field-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function FieldError({
  className,
  errors,
  ...props
}) {
  if (!errors) return null;
  const getErrorMessage = (error2) => {
    if (typeof error2 === "string") {
      return error2;
    }
    if (Array.isArray(error2)) {
      if (error2.length === 0) return null;
      return getErrorMessage(error2[0]);
    }
    if (error2 && typeof error2 === "object") {
      if ("message" in error2 && typeof error2.message === "string") {
        return error2.message;
      }
      if ("toString" in error2 && typeof error2.toString === "function") {
        const str = error2.toString();
        if (str !== "[object Object]") {
          return str;
        }
      }
    }
    return null;
  };
  const errorMessage = getErrorMessage(errors);
  if (!errorMessage) return null;
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "field-error",
      className: cn("text-destructive text-sm font-medium", className),
      role: "alert",
      "aria-live": "polite",
      ...props,
      children: errorMessage
    }
  );
}
function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    OTPInput,
    {
      "data-slot": "input-otp",
      containerClassName: cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      ),
      className: cn("disabled:cursor-not-allowed", className),
      ...props
    }
  );
}
function InputOTPGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "input-otp-group",
      className: cn("flex items-center", className),
      ...props
    }
  );
}
function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = (inputOTPContext == null ? void 0 : inputOTPContext.slots[index]) ?? {};
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "input-otp-slot",
      "data-active": isActive,
      className: cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "animate-caret-blink bg-foreground h-4 w-px duration-1000" }) })
      ]
    }
  );
}
const bitgetApiKeyFormSchema = z.object({
  exchange: z.string().min(1, { message: "거래소를 선택해주세요." }),
  apiKey: z.string(),
  secret: z.string(),
  passphrase: z.string()
}).refine(
  (data2) => {
    if (data2.exchange !== "bitget" && data2.exchange !== "okx") {
      return true;
    }
    return !!data2.apiKey && data2.apiKey.length > 0 && !!data2.secret && data2.secret.length > 0 && !!data2.passphrase && data2.passphrase.length > 0;
  },
  {
    message: "모든 필드를 입력해주세요.",
    path: ["apiKey"]
    // 첫 번째 필드에 에러 표시
  }
);
const betaWaitlistFormSchema = z.object({
  email: z.string().min(1, { message: "이메일 주소를 입력해주세요." }).email({ message: "올바른 이메일 형식이 아닙니다." })
});
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function useGeetestCaptcha(config) {
  const captchaObjRef = useRef(null);
  const isInitializedRef = useRef(false);
  const captchaHandler = useCallback(
    (captchaObj) => {
      captchaObjRef.current = captchaObj;
      isInitializedRef.current = true;
      captchaObj.appendTo("#captcha").onReady(() => {
        console.log("[Geetest] Captcha ready");
      }).onSuccess(() => {
        console.log("[Geetest] Captcha success");
        if (config.onSuccess) {
          config.onSuccess();
        }
      }).onError((error2) => {
        console.error("[Geetest] Captcha error:", error2);
      });
    },
    [config]
  );
  const captchaConfig = {
    config: {
      captchaId: config.captchaId,
      language: config.language || "eng",
      product: config.product || "bind",
      protocol: config.protocol || "https://"
    },
    handler: captchaHandler
  };
  const showCaptcha = useCallback(() => {
    if (captchaObjRef.current) {
      captchaObjRef.current.showCaptcha();
      return true;
    } else {
      console.warn("[Geetest] Captcha not initialized yet");
      return false;
    }
  }, []);
  const getValidate = useCallback(() => {
    if (!captchaObjRef.current) {
      return null;
    }
    return captchaObjRef.current.getValidate();
  }, []);
  const reset = useCallback(() => {
    if (captchaObjRef.current) {
      captchaObjRef.current.reset();
    }
  }, []);
  const isInitialized = () => isInitializedRef.current;
  return {
    captchaConfig,
    showCaptcha,
    getValidate,
    reset,
    isInitialized
  };
}
function GeetestCaptcha({
  captchaConfig,
  className = ""
}) {
  useEffect(() => {
    if (window.initGeetest4) {
      window.initGeetest4(captchaConfig.config, captchaConfig.handler);
    } else {
      console.error("[Geetest] initGeetest4 is not loaded");
    }
  }, [captchaConfig]);
  return /* @__PURE__ */ jsx("div", { id: "captcha", className });
}
const createOTPSchema = (t) => z.object({
  otp: z.string().superRefine((value, ctx) => {
    if (!/^\d*$/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "숫자만 입력 가능합니다."
      });
    }
  }),
  emailAuthID: z.string()
});
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
const ScrollVelocityContext = React__default.createContext(
  null
);
function ScrollVelocityContainer({
  children,
  className,
  ...props
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, Math.abs(v) / 1e3 * 5);
    return sign * magnitude;
  });
  return /* @__PURE__ */ jsx(ScrollVelocityContext.Provider, { value: velocityFactor, children: /* @__PURE__ */ jsx("div", { className: cn("relative w-full", className), ...props, children }) });
}
function ScrollVelocityRow(props) {
  const sharedVelocityFactor = useContext(ScrollVelocityContext);
  if (sharedVelocityFactor) {
    return /* @__PURE__ */ jsx(ScrollVelocityRowImpl, { ...props, velocityFactor: sharedVelocityFactor });
  }
  return /* @__PURE__ */ jsx(ScrollVelocityRowLocal, { ...props });
}
function ScrollVelocityRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
  velocityFactor,
  ...props
}) {
  const containerRef = useRef(null);
  const blockRef = useRef(null);
  const [numCopies, setNumCopies] = useState(1);
  const baseX = useMotionValue(0);
  const baseDirectionRef = useRef(direction >= 0 ? 1 : -1);
  const currentDirectionRef = useRef(direction >= 0 ? 1 : -1);
  const unitWidth = useMotionValue(0);
  const isInViewRef = useRef(true);
  const isPageVisibleRef = useRef(true);
  const prefersReducedMotionRef = useRef(false);
  useEffect(() => {
    const container = containerRef.current;
    const block = blockRef.current;
    if (!container || !block) return;
    const updateSizes = () => {
      const cw = container.offsetWidth || 0;
      const bw = block.scrollWidth || 0;
      unitWidth.set(bw);
      const nextCopies = bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 1;
      setNumCopies((prev) => prev === nextCopies ? prev : nextCopies);
    };
    updateSizes();
    const ro = new ResizeObserver(updateSizes);
    ro.observe(container);
    ro.observe(block);
    const io = new IntersectionObserver(([entry2]) => {
      isInViewRef.current = entry2.isIntersecting;
    });
    io.observe(container);
    const handleVisibility = () => {
      isPageVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility, {
      passive: true
    });
    handleVisibility();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePRM = () => {
      prefersReducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", handlePRM);
    handlePRM();
    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      mq.removeEventListener("change", handlePRM);
    };
  }, [children, unitWidth]);
  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1;
    const offset = Number(v) || 0;
    return `${-wrap(0, width, offset)}px`;
  });
  useAnimationFrame((_, delta) => {
    if (!isInViewRef.current || !isPageVisibleRef.current) return;
    const dt = delta / 1e3;
    const vf = velocityFactor.get();
    const absVf = Math.min(5, Math.abs(vf));
    const speedMultiplier = prefersReducedMotionRef.current ? 1 : 1 + absVf;
    if (absVf > 0.1) {
      const scrollDirection = vf >= 0 ? 1 : -1;
      currentDirectionRef.current = baseDirectionRef.current * scrollDirection;
    }
    const bw = unitWidth.get() || 0;
    if (bw <= 0) return;
    const pixelsPerSecond = bw * baseVelocity / 100;
    const moveBy = currentDirectionRef.current * pixelsPerSecond * speedMultiplier * dt;
    baseX.set(baseX.get() + moveBy);
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: cn("w-full overflow-hidden whitespace-nowrap", className),
      ...props,
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "inline-flex transform-gpu items-center will-change-transform select-none",
          style: { x },
          children: Array.from({ length: numCopies }).map((_, i) => /* @__PURE__ */ jsx(
            "div",
            {
              ref: i === 0 ? blockRef : null,
              "aria-hidden": i !== 0,
              className: "inline-flex shrink-0 items-center",
              children
            },
            i
          ))
        }
      )
    }
  );
}
function ScrollVelocityRowLocal(props) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400
  });
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, Math.abs(v) / 1e3 * 5);
    return sign * magnitude;
  });
  return /* @__PURE__ */ jsx(ScrollVelocityRowImpl, { ...props, velocityFactor: localVelocityFactor });
}
function meta$1({}) {
  return [{
    title: "TetherGrow | 회원가입 없이 당신의 '필살기 패턴'을 10초 만에 분석합니다"
  }, {
    name: "description",
    content: "페이백은 기본 TetherGrow AI가 당신의 Read-Only API 키를 스캔하여 '승률 80% 알파 패턴' 1개를 즉시 찾아드립니다. 100% Read-Only. AES-256 암호화. 회원가입 없음."
  }, {
    name: "keywords",
    content: "TetherGrow, AI 거래 분석, 필살기 패턴, 알파 탐색기, Bitget, 페이백"
  }, {
    property: "og:type",
    content: "website"
  }, {
    property: "og:title",
    content: "TetherGrow | AI가 당신의 필살기 패턴을 발견합니다"
  }, {
    property: "og:description",
    content: "회원가입 없이 10초 만에 당신의 승률 80% 알파 패턴을 확인하세요."
  }, {
    property: "og:image",
    content: "https://tethergrow.app/og/tethergrow_opengraph.png"
  }, {
    property: "og:url",
    content: "https://tethergrow.app"
  }];
}
async function loader({
  request
}) {
  const exchanges = await apiRequest({
    request,
    endpoint: "/exchange/all",
    method: "GET"
  });
  return data({
    exchanges: exchanges.exchanges || []
  });
}
async function action({
  request
}) {
  const formData = await request.json();
  const {
    actionType,
    ...formValues
  } = formData;
  if (actionType === "analyze-bitget") {
    const response = await apiRequest({
      request,
      endpoint: "/bitget-api/validate",
      method: "POST",
      body: {
        apiKey: formValues.apiKey,
        apiSecret: formValues.apiSecret,
        passphrase: formValues.passphrase
      }
    });
    if (response.success && !response.alreadyAnalyzed) {
      const analyzeResponse = await apiRequest({
        request,
        endpoint: "/bitget-api/analyze",
        method: "POST",
        body: {
          apiKey: formValues.apiKey,
          apiSecret: formValues.apiSecret,
          passphrase: formValues.passphrase
        }
      });
      return data(analyzeResponse);
    }
    return data(response);
  }
  if (actionType === "analyze-okx") {
    const response = await apiRequest({
      request,
      endpoint: "/okx-api/validate",
      method: "POST",
      body: {
        apiKey: formValues.apiKey,
        apiSecret: formValues.apiSecret,
        passphrase: formValues.passphrase
      }
    });
    if (response.success && !response.alreadyAnalyzed) {
      const analyzeResponse = await apiRequest({
        request,
        endpoint: "/okx-api/analyze",
        method: "POST",
        body: {
          apiKey: formValues.apiKey,
          apiSecret: formValues.apiSecret,
          passphrase: formValues.passphrase
        }
      });
      return data(analyzeResponse);
    }
    return data(response);
  }
  if (actionType === "checkEmail") {
    const response = await apiRequest({
      request,
      endpoint: "/common/check-email",
      method: "POST",
      body: {
        userID: formValues.userID
      }
    });
    return data(response);
  }
  if (actionType === "sendEmailAuthCode") {
    const response = await apiRequest({
      request,
      endpoint: "/common/send-email-auth-code",
      method: "POST",
      body: {
        userID: formValues.userID
      }
    });
    return data(response);
  }
  if (actionType === "checkEmailAuthCode") {
    const response = await apiRequest({
      request,
      endpoint: "/common/check-email-auth-code",
      method: "POST",
      body: {
        emailAuthID: formValues.emailAuthID,
        authCode: formValues.authCode
      }
    });
    return data(response);
  }
  if (actionType === "checkBetaWaitlistEmail") {
    const response = await apiRequest({
      request,
      endpoint: "/beta/waitlist/check",
      method: "POST",
      body: {
        email: formValues.email || null
      }
    });
    return data(response);
  }
  if (actionType === "beta-waitlist") {
    const response = await apiRequest({
      request,
      endpoint: "/beta/waitlist",
      method: "POST",
      body: {
        email: formValues.email || null
      }
    });
    return data(response);
  }
  return data({
    error: "Invalid action"
  }, {
    status: 400
  });
}
const landing = UNSAFE_withComponentProps(function Landing({
  loaderData
}) {
  var _a;
  const {
    exchanges
  } = loaderData;
  const analyzeFetcher = useFetcher();
  const waitlistFetcher = useFetcher();
  const {
    t
  } = useTranslation();
  const form = useForm({
    defaultValues: {
      exchange: "bitget",
      apiKey: "",
      secret: "",
      passphrase: ""
    },
    validators: {
      onChange: bitgetApiKeyFormSchema,
      onSubmit: bitgetApiKeyFormSchema
    },
    onSubmit: async ({
      value
    }) => {
      if (value.exchange !== "bitget" && value.exchange !== "okx") {
        const conversionSection = document.getElementById("conversion");
        if (conversionSection) {
          conversionSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
        return;
      }
      const actionType = value.exchange === "bitget" ? "analyze-bitget" : "analyze-okx";
      analyzeFetcher.submit({
        actionType,
        apiKey: value.apiKey || "",
        apiSecret: value.secret || "",
        passphrase: value.passphrase || ""
      }, {
        method: "POST",
        encType: "application/json"
      });
    }
  });
  const isAnalyzing = analyzeFetcher.state === "submitting" || analyzeFetcher.state === "loading";
  useEffect(() => {
    if (!analyzeFetcher.data) return;
    if (analyzeFetcher.data.success === false && analyzeFetcher.data.error) {
      toast.error(analyzeFetcher.data.error, {
        position: "bottom-right"
      });
      form.setFieldValue("apiKey", "");
      form.setFieldValue("secret", "");
      form.setFieldValue("passphrase", "");
      return;
    }
    const ahaSection = document.getElementById("aha");
    if (!ahaSection) return;
    if (analyzeFetcher.data.success === true && !analyzeFetcher.data.alreadyAnalyzed) {
      setTimeout(() => {
        ahaSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 500);
    } else if (analyzeFetcher.data.alreadyAnalyzed === true) {
      setTimeout(() => {
        ahaSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 300);
    } else if (analyzeFetcher.data.insufficientData === true) {
      setTimeout(() => {
        ahaSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 500);
    }
  }, [analyzeFetcher.data, form]);
  const [emailAuthId, setEmailAuthId] = useState(null);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [hasRequestedResend, setHasRequestedResend] = useState(false);
  const [apiGuideDialogOpen, setApiGuideDialogOpen] = useState(false);
  const [selectedExchangeForGuide, setSelectedExchangeForGuide] = useState(null);
  const {
    captchaConfig,
    showCaptcha,
    getValidate,
    reset: resetCaptcha,
    isInitialized
  } = useGeetestCaptcha({
    captchaId: "6b00696bfd2bfe351d88eab503dbfeb3",
    language: "kor",
    product: "bind",
    onSuccess: () => {
      waitlistForm.handleSubmit();
    }
  });
  const checkWaitlistEmailFetcher = useFetcher();
  const sendEmailAuthCodeFetcher = useFetcher();
  const checkEmailAuthCodeFetcher = useFetcher();
  const otpSchema = useMemo(() => createOTPSchema(), [t]);
  const otpForm = useForm({
    defaultValues: {
      otp: "",
      emailAuthID: emailAuthId || ""
    },
    validators: {
      onChange: otpSchema,
      onSubmit: otpSchema,
      onMount: otpSchema
    },
    onSubmit: async ({
      value
    }) => {
      checkEmailAuthCodeFetcher.submit({
        actionType: "checkEmailAuthCode",
        emailAuthID: value.emailAuthID,
        authCode: value.otp
      }, {
        method: "POST",
        encType: "application/json"
      });
    }
  });
  useEffect(() => {
    if (emailAuthId) {
      otpForm.setFieldValue("emailAuthID", emailAuthId);
    }
  }, [emailAuthId]);
  const waitlistForm = useForm({
    defaultValues: {
      email: ""
    },
    validators: {
      onChange: betaWaitlistFormSchema,
      onSubmit: betaWaitlistFormSchema
    },
    onSubmit: async ({
      value
    }) => {
      var _a2;
      if (!isInitialized()) {
        toast.error("캡차 초기화 중입니다. 잠시만 기다려주세요.", {
          position: "bottom-right"
        });
        return;
      }
      const captchaResult = getValidate();
      if (!captchaResult) {
        const shown = showCaptcha();
        if (!shown) {
          toast.error("캡차를 완료해주세요.", {
            position: "bottom-right"
          });
        }
        return;
      }
      checkWaitlistEmailFetcher.submit({
        actionType: "checkBetaWaitlistEmail",
        email: ((_a2 = value.email) == null ? void 0 : _a2.trim()) || ""
      }, {
        method: "POST",
        encType: "application/json"
      });
    }
  });
  const isSubmittingWaitlist = waitlistFetcher.state === "submitting" || waitlistFetcher.state === "loading";
  const waitlistSuccess = ((_a = waitlistFetcher.data) == null ? void 0 : _a.success) === true;
  useEffect(() => {
    var _a2;
    if (checkWaitlistEmailFetcher.state === "idle" && checkWaitlistEmailFetcher.data) {
      const responseData = checkWaitlistEmailFetcher.data;
      if (responseData.alreadyRegistered) {
        toast.error("이미 신청한 이메일입니다.", {
          position: "bottom-right"
        });
        waitlistForm.setFieldValue("email", "");
        waitlistForm.setFieldMeta("email", (prev) => ({
          ...prev,
          isTouched: false,
          errors: [],
          errorMap: {}
        }));
        resetCaptcha();
      } else if (responseData.success && !responseData.alreadyRegistered) {
        sendEmailAuthCodeFetcher.submit({
          actionType: "sendEmailAuthCode",
          userID: ((_a2 = waitlistForm.state.values.email) == null ? void 0 : _a2.trim()) || ""
        }, {
          method: "POST",
          encType: "application/json"
        });
      } else if (responseData.error) {
        toast.error(responseData.error || "중복 체크에 실패했습니다.", {
          position: "bottom-right"
        });
        resetCaptcha();
      }
    }
  }, [checkWaitlistEmailFetcher.state, checkWaitlistEmailFetcher.data]);
  useEffect(() => {
    if (sendEmailAuthCodeFetcher.state === "idle" && sendEmailAuthCodeFetcher.data) {
      const responseData = sendEmailAuthCodeFetcher.data;
      if (responseData.code) {
        toast.error(responseData.msg || "인증번호 발송에 실패했습니다.", {
          position: "bottom-right"
        });
        resetCaptcha();
      } else {
        setEmailAuthId(responseData.emailAuthID);
        setOtpDialogOpen(true);
        setCountdown(30);
        setIsResendDisabled(true);
        toast.success("인증번호가 발송되었습니다.", {
          position: "bottom-right"
        });
        resetCaptcha();
      }
    }
  }, [sendEmailAuthCodeFetcher.state, sendEmailAuthCodeFetcher.data]);
  useEffect(() => {
    var _a2;
    if (checkEmailAuthCodeFetcher.state === "idle" && checkEmailAuthCodeFetcher.data) {
      const responseData = checkEmailAuthCodeFetcher.data;
      if (responseData.code) {
        otpForm.setFieldMeta("otp", (prev) => ({
          ...prev,
          errors: [responseData.msg || "인증번호가 일치하지 않습니다."],
          errorMap: {
            onChange: responseData.msg || "인증번호가 일치하지 않습니다."
          }
        }));
      } else {
        setOtpDialogOpen(false);
        otpForm.reset();
        toast.success("인증번호가 확인되었습니다.", {
          position: "bottom-right"
        });
        waitlistFetcher.submit({
          actionType: "beta-waitlist",
          email: ((_a2 = waitlistForm.state.values.email) == null ? void 0 : _a2.trim()) || ""
        }, {
          method: "POST",
          encType: "application/json"
        });
      }
    }
  }, [checkEmailAuthCodeFetcher.state, checkEmailAuthCodeFetcher.data]);
  useEffect(() => {
    if (waitlistFetcher.state === "idle" && waitlistFetcher.data) {
      const responseData = waitlistFetcher.data;
      if (responseData.alreadyRegistered) {
        toast.error("이미 신청한 이메일입니다.", {
          position: "bottom-right"
        });
        waitlistForm.setFieldValue("email", "");
        waitlistForm.setFieldMeta("email", (prev) => ({
          ...prev,
          isTouched: false,
          errors: [],
          errorMap: {}
        }));
        resetCaptcha();
      } else if (responseData.success) {
        toast.success("등록되었습니다! 12월 말, 런칭 알림을 보내드립니다.", {
          position: "bottom-right"
        });
      } else if (responseData.error) {
        toast.error(responseData.error || "등록에 실패했습니다.", {
          position: "bottom-right"
        });
      }
    }
  }, [waitlistFetcher.state, waitlistFetcher.data]);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1e3);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);
  useEffect(() => {
    if (sendEmailAuthCodeFetcher.state === "idle" && sendEmailAuthCodeFetcher.data && hasRequestedResend) {
      const responseData = sendEmailAuthCodeFetcher.data;
      if (!responseData.code) {
        toast.success("인증번호가 재전송되었습니다.");
        setCountdown(30);
        setIsResendDisabled(true);
        setEmailAuthId(responseData.emailAuthID);
        otpForm.setFieldValue("emailAuthID", responseData.emailAuthID);
      } else {
        toast.error("인증번호 재전송에 실패했습니다.");
      }
      setHasRequestedResend(false);
    }
  }, [sendEmailAuthCodeFetcher.state, sendEmailAuthCodeFetcher.data, hasRequestedResend]);
  const handleResend = () => {
    const email = waitlistForm.state.values.email;
    if (email) {
      setHasRequestedResend(true);
      sendEmailAuthCodeFetcher.submit({
        actionType: "sendEmailAuthCode",
        userID: email.trim()
      }, {
        method: "POST",
        encType: "application/json"
      });
    }
  };
  const handleScrollToTeaser = (e) => {
    e.preventDefault();
    const teaserSection = document.getElementById("teaser");
    if (teaserSection) {
      teaserSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  useEffect(() => {
    if (analyzeFetcher.state === "idle" && analyzeFetcher.data) {
      if (!analyzeFetcher.data.error) {
        const ahaSection = document.getElementById("aha");
        if (ahaSection) {
          ahaSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    }
  }, [analyzeFetcher.state, analyzeFetcher.data]);
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-background scroll-smooth relative overflow-hidden",
    children: [/* @__PURE__ */ jsx("section", {
      id: "hook",
      className: "relative flex flex-col items-center justify-center px-4 py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center max-w-4xl mx-auto space-y-8",
        children: [/* @__PURE__ */ jsx(Badge, {
          variant: "secondary",
          className: "text-xs font-medium",
          children: /* @__PURE__ */ jsx(AnimatedGradientText, {
            speed: 1,
            colorFrom: "#8b5cf6",
            colorTo: "#06b6d4",
            className: "inline-block",
            children: "수수료 페이백 + AI 거래 코치"
          })
        }), /* @__PURE__ */ jsxs("h1", {
          className: "text-4xl break-keep leading-tight md:text-5xl lg:text-6xl font-bold mb-6",
          children: ["페이백은 기본,", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx(AnimatedGradientText, {
            speed: 1,
            colorFrom: "#8b5cf6",
            colorTo: "#06b6d4",
            className: "inline-block",
            children: "AI로 내 '필살기 패턴'까지 찾아주는 곳"
          })]
        }), /* @__PURE__ */ jsxs("h2", {
          className: "text-lg break-keep md:text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto",
          children: ["TetherGrow는 수수료 페이백을 최대로 돌려주면서,", " ", /* @__PURE__ */ jsx("br", {
            className: "hidden md:block"
          }), "실제 거래 데이터를 기반으로 당신만의", " ", /* @__PURE__ */ jsx("span", {
            className: "font-semibold text-foreground",
            children: "'승률 80% 패턴'"
          }), "과", " ", /* @__PURE__ */ jsx("span", {
            className: "font-semibold text-foreground",
            children: "'치명적 습관'"
          }), "까지 찾아내는 AI 분석 플랫폼입니다."]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground mb-10",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(Lock, {
              className: "w-5 h-5 text-primary"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-medium",
              children: "페이백 최대 지급"
            })]
          }), /* @__PURE__ */ jsx("span", {
            className: "hidden sm:inline",
            children: "•"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(Lock, {
              className: "w-5 h-5 text-primary"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-medium",
              children: "AI 거래 패턴 분석"
            })]
          }), /* @__PURE__ */ jsx("span", {
            className: "hidden sm:inline",
            children: "•"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(Lock, {
              className: "w-5 h-5 text-primary"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-medium",
              children: "AES-256 암호화"
            })]
          })]
        }), /* @__PURE__ */ jsx(Button, {
          onClick: handleScrollToTeaser,
          size: "lg",
          className: "text-lg px-8 py-2 h-auto font-semibold",
          children: "지금 바로 '필살기 패턴' 맛보기"
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "teaser",
      className: "relative flex flex-col items-center justify-center px-4 py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "w-full max-w-2xl space-y-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center space-y-4",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold break-keep",
            children: ["회원가입 없이, 10초 만에", /* @__PURE__ */ jsx("br", {}), "내 '필살기 패턴' 맛보기"]
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-lg text-muted-foreground break-keep leading-relaxed",
            children: ["Read-Only API 키만으로 지난 30일 거래에서", " ", /* @__PURE__ */ jsx("span", {
              className: "font-semibold text-foreground",
              children: "승률 80% 이상 패턴 1개"
            }), "를 바로 찾아드립니다."]
          }), /* @__PURE__ */ jsx(Card, {
            className: "border-primary/50 bg-primary/5 mt-4",
            children: /* @__PURE__ */ jsx(CardContent, {
              children: /* @__PURE__ */ jsxs("p", {
                className: "text-sm text-muted-foreground break-keep",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "font-semibold text-foreground",
                  children: "지금 단계에서는,"
                }), /* @__PURE__ */ jsx("br", {}), '페이백 가입 없이도 "AI 분석 맛보기"만', /* @__PURE__ */ jsx("br", {}), "먼저 경험하실 수 있어요.", /* @__PURE__ */ jsx("span", {
                  className: "font-medium text-foreground mt-2 block",
                  children: "나중에 전체 대시보드와 실시간 알림이 제공됩니다."
                })]
              })
            })
          })]
        }), /* @__PURE__ */ jsx("form", {
          onSubmit: (e) => {
            e.preventDefault();
            form.handleSubmit();
          },
          children: /* @__PURE__ */ jsxs(FieldGroup, {
            children: [/* @__PURE__ */ jsx(form.Field, {
              name: "exchange",
              children: (field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return /* @__PURE__ */ jsxs(Field, {
                  "data-invalid": isInvalid,
                  children: [/* @__PURE__ */ jsx(Label, {
                    htmlFor: "exchange",
                    className: "text-sm font-medium mb-4 block",
                    children: "현재 이용 중인 거래소를 선택하세요."
                  }), /* @__PURE__ */ jsx(Tabs, {
                    value: field.state.value || "bitget",
                    onValueChange: (value) => {
                      if (isAnalyzing) return;
                      field.handleChange(value);
                      if (value !== "bitget" && value !== "okx") {
                        form.setFieldValue("apiKey", "");
                        form.setFieldValue("secret", "");
                        form.setFieldValue("passphrase", "");
                      }
                    },
                    className: "w-full",
                    children: /* @__PURE__ */ jsx(TabsList, {
                      className: "w-full flex flex-wrap gap-2",
                      children: exchanges.map((exchange) => {
                        var _a2;
                        const exchangeValue = ((_a2 = exchange.nameEn) == null ? void 0 : _a2.toLowerCase()) || "";
                        return /* @__PURE__ */ jsx(TabsTrigger, {
                          value: exchangeValue,
                          disabled: isAnalyzing,
                          className: "flex items-center justify-center p-2",
                          children: /* @__PURE__ */ jsx("img", {
                            src: exchange.logo,
                            alt: exchange.nameEn || exchange.nameKo,
                            className: "size-6 rounded-full object-cover"
                          })
                        }, exchange._id || exchange.nameEn);
                      })
                    })
                  }), isInvalid && /* @__PURE__ */ jsx(FieldError, {
                    errors: field.state.meta.errors
                  })]
                });
              }
            }), /* @__PURE__ */ jsx(form.Subscribe, {
              selector: (state) => state.values.exchange,
              children: (exchange) => exchange === "bitget" || exchange === "okx" ? /* @__PURE__ */ jsxs(Card, {
                className: "space-y-6",
                children: [/* @__PURE__ */ jsxs(CardHeader, {
                  children: [/* @__PURE__ */ jsx(CardTitle, {
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [/* @__PURE__ */ jsxs("p", {
                        children: [exchange === "bitget" ? "Bitget" : "OKX", " API 키 입력"]
                      }), /* @__PURE__ */ jsx(Button, {
                        type: "button",
                        variant: "secondary",
                        size: "sm",
                        className: "gap-2",
                        onClick: () => {
                          setSelectedExchangeForGuide(exchange);
                          setApiGuideDialogOpen(true);
                        },
                        children: /* @__PURE__ */ jsx("span", {
                          className: "text-sm",
                          children: "API 키 생성 가이드"
                        })
                      })]
                    })
                  }), /* @__PURE__ */ jsx(CardDescription, {
                    children: "Read-Only 권한의 API 키를 입력해주세요."
                  })]
                }), /* @__PURE__ */ jsxs(CardContent, {
                  className: "space-y-4",
                  children: [/* @__PURE__ */ jsx(form.Field, {
                    name: "apiKey",
                    children: (field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                      return /* @__PURE__ */ jsxs(Field, {
                        "data-invalid": isInvalid,
                        children: [/* @__PURE__ */ jsx(Label, {
                          htmlFor: "apiKey",
                          className: "text-sm font-medium",
                          children: "API Key"
                        }), /* @__PURE__ */ jsx(Input, {
                          id: "apiKey",
                          name: field.name,
                          type: "text",
                          placeholder: "API Key를 입력하세요",
                          value: field.state.value || "",
                          onChange: (e) => field.handleChange(e.target.value),
                          onBlur: field.handleBlur,
                          disabled: isAnalyzing,
                          "aria-invalid": isInvalid
                        }), isInvalid && /* @__PURE__ */ jsx(FieldError, {
                          errors: field.state.meta.errors
                        })]
                      });
                    }
                  }), /* @__PURE__ */ jsx(form.Field, {
                    name: "secret",
                    children: (field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                      return /* @__PURE__ */ jsxs(Field, {
                        "data-invalid": isInvalid,
                        children: [/* @__PURE__ */ jsx(Label, {
                          htmlFor: "secret",
                          className: "text-sm font-medium",
                          children: "Secret"
                        }), /* @__PURE__ */ jsx(Input, {
                          id: "secret",
                          name: field.name,
                          type: "password",
                          placeholder: "Secret을 입력하세요",
                          value: field.state.value || "",
                          onChange: (e) => field.handleChange(e.target.value),
                          onBlur: field.handleBlur,
                          disabled: isAnalyzing,
                          "aria-invalid": isInvalid
                        }), isInvalid && /* @__PURE__ */ jsx(FieldError, {
                          errors: field.state.meta.errors
                        })]
                      });
                    }
                  }), /* @__PURE__ */ jsx(form.Field, {
                    name: "passphrase",
                    children: (field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                      return /* @__PURE__ */ jsxs(Field, {
                        "data-invalid": isInvalid,
                        children: [/* @__PURE__ */ jsx(Label, {
                          htmlFor: "passphrase",
                          className: "text-sm font-medium",
                          children: "Passphrase"
                        }), /* @__PURE__ */ jsx(Input, {
                          id: "passphrase",
                          name: field.name,
                          type: "password",
                          placeholder: "Passphrase를 입력하세요",
                          value: field.state.value || "",
                          onChange: (e) => field.handleChange(e.target.value),
                          onBlur: field.handleBlur,
                          disabled: isAnalyzing,
                          "aria-invalid": isInvalid
                        }), isInvalid && /* @__PURE__ */ jsx(FieldError, {
                          errors: field.state.meta.errors
                        })]
                      });
                    }
                  })]
                })]
              }) : null
            }), /* @__PURE__ */ jsx(form.Subscribe, {
              selector: (state) => state.values.exchange,
              children: (exchange) => exchange && exchange !== "bitget" && exchange !== "okx" ? /* @__PURE__ */ jsxs("div", {
                className: "space-y-6",
                children: [/* @__PURE__ */ jsx(Card, {
                  className: "border-primary/50 bg-primary/5",
                  children: /* @__PURE__ */ jsxs(CardHeader, {
                    children: [/* @__PURE__ */ jsxs(CardTitle, {
                      className: "leading-relaxed",
                      children: ["TetherGrow AI의", " ", (() => {
                        const exchange2 = exchanges.find((e) => {
                          var _a2;
                          return ((_a2 = e.nameEn) == null ? void 0 : _a2.toLowerCase()) === form.state.values.exchange;
                        });
                        return exchange2 ? exchange2.nameEn || exchange2.nameKo : "해당 거래소";
                      })(), " ", "분석은 12월 말 런칭됩니다."]
                    }), /* @__PURE__ */ jsx(CardDescription, {
                      className: "break-keep",
                      children: "현재 Bitget 및 OKX 유저들은 실시간 분석 기능을 테스트 중입니다."
                    })]
                  })
                }), /* @__PURE__ */ jsxs(Card, {
                  className: "border-muted",
                  children: [/* @__PURE__ */ jsx(CardHeader, {
                    children: /* @__PURE__ */ jsx(CardTitle, {
                      className: "text-xl break-keep text-center",
                      children: "TetherGrow 1차 베타 테스터(선착순 500명)에게"
                    })
                  }), /* @__PURE__ */ jsxs(CardContent, {
                    className: "space-y-4",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "flex items-center justify-center gap-2",
                      children: /* @__PURE__ */ jsx(Badge, {
                        variant: "secondary",
                        className: "text-lg px-4 py-2",
                        children: /* @__PURE__ */ jsx("span", {
                          className: "font-bold text-primary",
                          children: "120 USDT 구독 크레딧(6개월 무료)"
                        })
                      })
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-sm text-center text-muted-foreground",
                      children: "런칭 즉시 지급됩니다."
                    })]
                  })]
                }), waitlistSuccess ? /* @__PURE__ */ jsx(Card, {
                  className: "border-primary/50 bg-primary/5",
                  children: /* @__PURE__ */ jsx(CardContent, {
                    className: "pt-6",
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "text-center space-y-4",
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "flex items-center justify-center mb-4",
                        children: /* @__PURE__ */ jsx("div", {
                          className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10",
                          children: /* @__PURE__ */ jsx(PartyPopper, {
                            className: "h-6 w-6 text-primary"
                          })
                        })
                      }), /* @__PURE__ */ jsx("h3", {
                        className: "text-xl font-semibold",
                        children: "등록되었습니다!"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-muted-foreground",
                        children: "12월 말, 런칭 알림을 보내드립니다."
                      })]
                    })
                  })
                }) : /* @__PURE__ */ jsx("div", {
                  children: /* @__PURE__ */ jsx(FieldGroup, {
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "space-y-4",
                      children: [/* @__PURE__ */ jsxs(Field, {
                        children: [/* @__PURE__ */ jsx(Label, {
                          htmlFor: "waitlist-contact-section3",
                          children: "이메일 주소 입력"
                        }), /* @__PURE__ */ jsx(waitlistForm.Field, {
                          name: "email",
                          children: (field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return /* @__PURE__ */ jsxs("div", {
                              className: "space-y-2",
                              children: [/* @__PURE__ */ jsx(Input, {
                                id: "waitlist-contact-section3",
                                name: field.name,
                                value: field.state.value,
                                onBlur: field.handleBlur,
                                onChange: (e) => field.handleChange(e.target.value),
                                "aria-invalid": isInvalid,
                                type: "email",
                                placeholder: "example@email.com",
                                disabled: isSubmittingWaitlist,
                                className: isInvalid ? "border-destructive" : ""
                              }), isInvalid && /* @__PURE__ */ jsx(FieldError, {
                                errors: field.state.meta.errors
                              })]
                            });
                          }
                        })]
                      }), /* @__PURE__ */ jsx(waitlistForm.Subscribe, {
                        selector: (state) => [state.canSubmit, state.isSubmitting],
                        children: ([canSubmit, isSubmitting]) => {
                          var _a2;
                          const canSubmitWaitlist = ((_a2 = waitlistForm.state.values.email) == null ? void 0 : _a2.trim()) && !waitlistSuccess;
                          return /* @__PURE__ */ jsx("div", {
                            className: "flex flex-col gap-4",
                            children: isSubmittingWaitlist || isSubmitting ? /* @__PURE__ */ jsxs("div", {
                              className: "flex flex-col items-center gap-4 py-8",
                              children: [/* @__PURE__ */ jsx(Loader2, {
                                className: "w-8 h-8 animate-spin text-primary"
                              }), /* @__PURE__ */ jsx("p", {
                                className: "text-lg text-muted-foreground",
                                children: "등록 중..."
                              })]
                            }) : /* @__PURE__ */ jsx(Button, {
                              type: "button",
                              size: "lg",
                              className: "w-full text-lg py-2 h-auto font-semibold",
                              disabled: !canSubmitWaitlist,
                              onClick: (e) => {
                                e.preventDefault();
                                waitlistForm.handleSubmit();
                              },
                              children: "1차 베타 알림 신청하고 120 USDT 크레딧 받기"
                            })
                          });
                        }
                      })]
                    })
                  })
                })]
              }) : null
            }), /* @__PURE__ */ jsx(form.Subscribe, {
              selector: (state) => state.values.exchange,
              children: (exchange) => exchange === "bitget" || exchange === "okx" ? /* @__PURE__ */ jsx(Card, {
                className: "border-muted",
                children: /* @__PURE__ */ jsx(CardContent, {
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "flex gap-3",
                    children: [/* @__PURE__ */ jsx(Info, {
                      className: "w-5 h-5 text-primary mt-0.5 shrink-0"
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "space-y-1 text-sm",
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "font-medium",
                        children: "왜 안전한가요?"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-muted-foreground",
                        children: "이 키는 '읽기 전용'으로 절대 출금/거래가 불가능하며, 분석 후 즉시 암호화/폐기됩니다."
                      })]
                    })]
                  })
                })
              }) : null
            }), /* @__PURE__ */ jsx(form.Subscribe, {
              selector: (state) => [state.canSubmit, state.isSubmitting, state.values.exchange],
              children: ([canSubmit, isSubmitting, exchange]) => {
                if (exchange !== "bitget" && exchange !== "okx") {
                  return null;
                }
                return /* @__PURE__ */ jsx("div", {
                  className: "flex flex-col gap-4",
                  children: isAnalyzing || isSubmitting ? /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col items-center gap-4 py-8",
                    children: [/* @__PURE__ */ jsx(Loader2, {
                      className: "w-8 h-8 animate-spin text-primary"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-lg text-muted-foreground",
                      children: "AI가 지난 30일간의 거래 내역을 분석 중입니다..."
                    })]
                  }) : /* @__PURE__ */ jsx(Button, {
                    type: "submit",
                    size: "lg",
                    className: "w-full text-lg py-2 h-auto font-semibold",
                    disabled: !canSubmit || !exchange,
                    children: "AI 즉시 분석 시작하기"
                  })
                });
              }
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "aha",
      className: "relative flex flex-col items-center justify-center px-4 py-20",
      children: /* @__PURE__ */ jsx("div", {
        className: "w-full max-w-2xl space-y-8",
        children: (() => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          const alreadyAnalyzed = ((_a2 = analyzeFetcher.data) == null ? void 0 : _a2.alreadyAnalyzed) === true;
          const hasInsufficientData = ((_b = analyzeFetcher.data) == null ? void 0 : _b.insufficientData) === true;
          if (alreadyAnalyzed) {
            return /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-center space-y-4",
                children: /* @__PURE__ */ jsxs("h2", {
                  className: "text-3xl md:text-4xl font-bold break-keep",
                  children: ["이미 AI가", " ", /* @__PURE__ */ jsx("span", {
                    className: "text-primary",
                    children: "'필살기 패턴' 1개"
                  }), "를 발견했습니다."]
                })
              }), /* @__PURE__ */ jsx(Card, {
                className: "border-primary/50 bg-primary/5",
                children: /* @__PURE__ */ jsx(CardContent, {
                  className: "pt-2",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "space-y-4 text-center",
                    children: [/* @__PURE__ */ jsxs("p", {
                      className: "text-lg font-medium break-keep",
                      children: ["TetherGrow AI는 당신의 패턴을", " ", /* @__PURE__ */ jsx("span", {
                        className: "text-primary font-semibold",
                        children: "'실시간(Real-time)'"
                      }), "으로 추적합니다."]
                    }), /* @__PURE__ */ jsxs("p", {
                      className: "text-muted-foreground break-keep",
                      children: ["지금 1차 베타(120 USDT 크레딧)에 등록하고,", " ", /* @__PURE__ */ jsx("span", {
                        className: "font-semibold text-foreground",
                        children: "모든 패턴의 '실시간 알림'"
                      }), "을 받으세요."]
                    })]
                  })
                })
              }), /* @__PURE__ */ jsx(Button, {
                onClick: () => {
                  const conversionSection = document.getElementById("conversion");
                  if (conversionSection) {
                    conversionSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                  }
                },
                size: "lg",
                className: "w-full text-lg py-2 h-auto font-semibold",
                children: "1차 베타 알림 신청하기"
              })]
            });
          }
          const hasAnalysisResult = ((_c = analyzeFetcher.data) == null ? void 0 : _c.success) === true && !((_d = analyzeFetcher.data) == null ? void 0 : _d.alreadyAnalyzed) && !((_e = analyzeFetcher.data) == null ? void 0 : _e.insufficientData) && ((_f = analyzeFetcher.data) == null ? void 0 : _f.analysisResult);
          if (hasInsufficientData) {
            return /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsxs("div", {
                className: "text-center space-y-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex flex-col items-center justify-center gap-3 mb-4",
                  children: [/* @__PURE__ */ jsx(Clock, {
                    className: "h-8 w-8 text-muted-foreground"
                  }), /* @__PURE__ */ jsx("h2", {
                    className: "text-3xl break-keep md:text-4xl font-bold",
                    children: "AI가 분석할 데이터가 아직 충분하지 않습니다."
                  })]
                }), /* @__PURE__ */ jsxs("p", {
                  className: "text-lg break-keep text-muted-foreground leading-relaxed",
                  children: ["TetherGrow AI는 당신의 '필살기 패턴'과 '치명적 습관'을 정확히 찾아내기 위해 최소", " ", /* @__PURE__ */ jsx("span", {
                    className: "font-semibold text-foreground",
                    children: "100회 이상의 거래 내역"
                  }), "이 필요합니다."]
                })]
              }), /* @__PURE__ */ jsx(Card, {
                className: "border-primary/50 bg-primary/5",
                children: /* @__PURE__ */ jsx(CardContent, {
                  children: /* @__PURE__ */ jsx("div", {
                    className: "space-y-4",
                    children: /* @__PURE__ */ jsxs("p", {
                      className: "text-lg font-medium break-keep",
                      children: ["하지만 걱정 마십시오. 지금 1차 베타에 등록하시면,", " ", /* @__PURE__ */ jsx("span", {
                        className: "text-primary font-semibold",
                        children: "거래 데이터가 쌓이는 즉시 AI가 자동으로 분석을 시작"
                      }), "하고 리포트 완료 알림을 보내드립니다."]
                    })
                  })
                })
              }), /* @__PURE__ */ jsxs(Card, {
                className: "border-muted",
                children: [/* @__PURE__ */ jsx(CardHeader, {
                  children: /* @__PURE__ */ jsx(CardTitle, {
                    className: "text-xl break-keep text-center",
                    children: "TetherGrow 1차 베타 테스터(선착순 500명)에게"
                  })
                }), /* @__PURE__ */ jsxs(CardContent, {
                  className: "space-y-4 flex flex-col items-center",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "flex items-center gap-2",
                    children: /* @__PURE__ */ jsx(Badge, {
                      variant: "secondary",
                      className: "text-lg px-4 py-2",
                      children: /* @__PURE__ */ jsx("span", {
                        className: "font-bold text-primary",
                        children: "120 USDT 구독 크레딧(6개월 무료)"
                      })
                    })
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-center text-muted-foreground",
                    children: "런칭 즉시 지급됩니다."
                  })]
                })]
              }), /* @__PURE__ */ jsxs(Button, {
                onClick: () => {
                  const conversionSection = document.getElementById("conversion");
                  if (conversionSection) {
                    conversionSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                  }
                },
                size: "lg",
                className: "w-full text-lg py-2 h-auto font-semibold",
                children: ["AI 코치 1차 베타 알림 신청하기", /* @__PURE__ */ jsx("br", {}), "(120 USDT 크레딧 받기)"]
              })]
            });
          }
          if (hasAnalysisResult) {
            const analysisResult = (_g = analyzeFetcher.data) == null ? void 0 : _g.analysisResult;
            const tokenUsage = (_h = analyzeFetcher.data) == null ? void 0 : _h.tokenUsage;
            const summary = analysisResult == null ? void 0 : analysisResult.summary;
            const hiddenStrength = analysisResult == null ? void 0 : analysisResult.hiddenStrengthTop1;
            const fatalHabit = analysisResult == null ? void 0 : analysisResult.fatalHabitTop1;
            const profitDrivers = analysisResult == null ? void 0 : analysisResult.profitDrivers;
            const lossDrivers = analysisResult == null ? void 0 : analysisResult.lossDrivers;
            const statistics = analysisResult == null ? void 0 : analysisResult.statistics;
            console.log("=== AI 분석 결과 (프론트엔드) ===");
            console.log("Summary:", summary);
            console.log("Hidden Strength:", hiddenStrength);
            console.log("Fatal Habit:", fatalHabit);
            console.log("Profit Drivers:", profitDrivers);
            console.log("Loss Drivers:", lossDrivers);
            console.log("Statistics:", statistics);
            console.log("Token Usage:", tokenUsage);
            console.log("================================");
            return /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-center space-y-4",
                children: /* @__PURE__ */ jsxs("h2", {
                  className: "text-3xl md:text-4xl font-bold",
                  children: ["AI가", " ", /* @__PURE__ */ jsx("span", {
                    className: "text-primary",
                    children: "'필살기 패턴' 1개"
                  }), /* @__PURE__ */ jsx("br", {}), "발견했습니다!"]
                })
              }), summary && /* @__PURE__ */ jsxs(Card, {
                className: "border-primary/50 bg-primary/5",
                children: [/* @__PURE__ */ jsx(CardHeader, {
                  children: /* @__PURE__ */ jsx(CardTitle, {
                    className: "text-xl",
                    children: "AI 3줄 요약"
                  })
                }), /* @__PURE__ */ jsxs(CardContent, {
                  className: "space-y-2",
                  children: [summary.totalPnl !== void 0 && /* @__PURE__ */ jsxs("p", {
                    className: "text-lg",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "font-semibold",
                      children: "총 손익:"
                    }), " ", summary.totalPnl > 0 ? "+" : "", summary.totalPnl.toLocaleString(), " USDT"]
                  }), summary.fatalHabit && /* @__PURE__ */ jsxs("p", {
                    className: "text-lg",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "font-semibold",
                      children: "치명적 습관:"
                    }), " ", summary.fatalHabit]
                  }), summary.paybackAmount !== void 0 && /* @__PURE__ */ jsxs("p", {
                    className: "text-lg",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "font-semibold",
                      children: "페이백 적립액:"
                    }), " ", summary.paybackAmount.toLocaleString(), " USDT"]
                  })]
                })]
              }), hiddenStrength && /* @__PURE__ */ jsxs(Card, {
                className: "border-primary/50 bg-primary/5",
                children: [/* @__PURE__ */ jsx(CardHeader, {
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10",
                      children: /* @__PURE__ */ jsx(Trophy, {
                        className: "h-6 w-6 text-primary"
                      })
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "flex-1",
                      children: [/* @__PURE__ */ jsx(CardTitle, {
                        className: "text-xl",
                        children: "필살기 패턴 #1"
                      }), /* @__PURE__ */ jsx(CardDescription, {
                        className: "mt-1",
                        children: "당신의 승률 80% 이상 알파 패턴"
                      })]
                    })]
                  })
                }), /* @__PURE__ */ jsx(CardContent, {
                  className: "space-y-4",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "grid gap-4 md:grid-cols-2",
                    children: [(hiddenStrength.title || hiddenStrength.pattern) && /* @__PURE__ */ jsxs("div", {
                      className: "space-y-1",
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children: "패턴"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-lg font-semibold flex items-center gap-2",
                        children: hiddenStrength.title || hiddenStrength.pattern
                      })]
                    }), hiddenStrength.winRate !== void 0 && /* @__PURE__ */ jsxs("div", {
                      className: "space-y-1",
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children: "승률"
                      }), /* @__PURE__ */ jsxs("p", {
                        className: "text-lg font-semibold text-primary",
                        children: [hiddenStrength.winRate, "%"]
                      })]
                    }), hiddenStrength.profit !== void 0 && /* @__PURE__ */ jsxs("div", {
                      className: "space-y-1",
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children: "수익"
                      }), /* @__PURE__ */ jsxs("p", {
                        className: "text-lg font-semibold text-primary",
                        children: ["+", hiddenStrength.profit.toLocaleString(), " USDT"]
                      })]
                    }), hiddenStrength.executionCount !== void 0 && /* @__PURE__ */ jsxs("div", {
                      className: "space-y-1",
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children: "실행 횟수"
                      }), /* @__PURE__ */ jsxs("p", {
                        className: "text-lg font-semibold",
                        children: ["지난 30일, ", hiddenStrength.executionCount, "회 실행"]
                      })]
                    })]
                  })
                })]
              }), fatalHabit && /* @__PURE__ */ jsx(Card, {
                className: "border-muted",
                children: /* @__PURE__ */ jsx(CardContent, {
                  className: "pt-6",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "flex gap-3",
                    children: [/* @__PURE__ */ jsx(AlertTriangle, {
                      className: "w-5 h-5 text-amber-500 mt-0.5 shrink-0"
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "space-y-1 text-sm",
                      children: [/* @__PURE__ */ jsxs("p", {
                        className: "font-medium break-keep",
                        children: ["...하지만 AI가", " ", /* @__PURE__ */ jsx("span", {
                          className: "text-amber-500",
                          children: "'치명적 습관' 2개"
                        }), "도 함께 발견했습니다."]
                      }), fatalHabit.title && /* @__PURE__ */ jsxs("p", {
                        className: "text-muted-foreground break-keep",
                        children: ["(예: '", fatalHabit.title, "'", " ", fatalHabit.frequency ? `${fatalHabit.frequency}회` : "", lossDrivers && lossDrivers.length > 0 && typeof lossDrivers[0] === "object" && ((_i = lossDrivers[0]) == null ? void 0 : _i.behavior) ? `, '${lossDrivers[0].behavior}' ${lossDrivers[0].frequency || ""}회` : lossDrivers && lossDrivers.length > 0 ? `, '${lossDrivers[0]}'` : "", ")"]
                      })]
                    })]
                  })
                })
              }), fatalHabit && /* @__PURE__ */ jsxs(Card, {
                className: "border-amber-500/50 bg-amber-500/5",
                children: [/* @__PURE__ */ jsx(CardHeader, {
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10",
                      children: /* @__PURE__ */ jsx(AlertTriangle, {
                        className: "h-6 w-6 text-amber-500"
                      })
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "flex-1",
                      children: [/* @__PURE__ */ jsx(CardTitle, {
                        className: "text-xl",
                        children: "치명적 습관 TOP 1"
                      }), /* @__PURE__ */ jsx(CardDescription, {
                        className: "mt-1",
                        children: "AI가 발견한 개선이 필요한 습관"
                      })]
                    })]
                  })
                }), /* @__PURE__ */ jsxs(CardContent, {
                  className: "space-y-4",
                  children: [(fatalHabit.title || fatalHabit.habit) && /* @__PURE__ */ jsxs("div", {
                    className: "space-y-1",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-sm text-muted-foreground",
                      children: "습관"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-lg font-semibold text-amber-500",
                      children: fatalHabit.title || fatalHabit.habit
                    })]
                  }), (fatalHabit.lossAmount !== void 0 || fatalHabit.amount !== void 0) && /* @__PURE__ */ jsxs("div", {
                    className: "space-y-1",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-sm text-muted-foreground",
                      children: "손실액"
                    }), /* @__PURE__ */ jsxs("p", {
                      className: "text-lg font-semibold text-amber-500",
                      children: [(fatalHabit.lossAmount || fatalHabit.amount || 0).toLocaleString(), " ", "USDT"]
                    })]
                  }), fatalHabit.frequency !== void 0 && /* @__PURE__ */ jsxs("div", {
                    className: "space-y-1",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-sm text-muted-foreground",
                      children: "빈도"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-lg font-semibold",
                      children: fatalHabit.frequency
                    })]
                  }), fatalHabit.description && /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-muted-foreground",
                    children: fatalHabit.description
                  })]
                })]
              }), (profitDrivers || lossDrivers) && /* @__PURE__ */ jsxs(Card, {
                className: "border-muted",
                children: [/* @__PURE__ */ jsx(CardHeader, {
                  children: /* @__PURE__ */ jsx(CardTitle, {
                    className: "text-xl",
                    children: "수익 vs 손실 드라이버"
                  })
                }), /* @__PURE__ */ jsxs(CardContent, {
                  className: "space-y-4",
                  children: [profitDrivers && profitDrivers.length > 0 && /* @__PURE__ */ jsxs("div", {
                    className: "space-y-2",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "font-semibold text-primary",
                      children: "수익을 준 행위"
                    }), /* @__PURE__ */ jsx("ul", {
                      className: "list-disc list-inside space-y-2 text-sm",
                      children: profitDrivers.map((driver, index) => /* @__PURE__ */ jsxs("li", {
                        className: "space-y-1",
                        children: [/* @__PURE__ */ jsx("span", {
                          className: "font-medium",
                          children: driver.behavior || "알 수 없음"
                        }), driver.frequency !== void 0 && /* @__PURE__ */ jsxs("span", {
                          className: "text-muted-foreground",
                          children: [" ", "(", driver.frequency, "회)"]
                        }), driver.amount !== void 0 && /* @__PURE__ */ jsxs("span", {
                          className: "text-primary font-semibold",
                          children: [" ", "+", driver.amount.toLocaleString(), " USDT"]
                        })]
                      }, index))
                    })]
                  }), lossDrivers && lossDrivers.length > 0 && /* @__PURE__ */ jsxs("div", {
                    className: "space-y-2",
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "font-semibold text-amber-500",
                      children: "손실을 준 행위"
                    }), /* @__PURE__ */ jsx("ul", {
                      className: "list-disc list-inside space-y-2 text-sm",
                      children: lossDrivers.map((driver, index) => /* @__PURE__ */ jsxs("li", {
                        className: "space-y-1",
                        children: [/* @__PURE__ */ jsx("span", {
                          className: "font-medium",
                          children: driver.behavior || "알 수 없음"
                        }), driver.frequency !== void 0 && /* @__PURE__ */ jsxs("span", {
                          className: "text-muted-foreground",
                          children: [" ", "(", driver.frequency, "회)"]
                        }), driver.amount !== void 0 && /* @__PURE__ */ jsxs("span", {
                          className: "text-amber-500 font-semibold",
                          children: [" ", driver.amount.toLocaleString(), " USDT"]
                        })]
                      }, index))
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs(Card, {
                className: "border-primary/50 bg-primary/5",
                children: [/* @__PURE__ */ jsx(CardHeader, {
                  children: /* @__PURE__ */ jsx(CardTitle, {
                    className: "text-xl",
                    children: "이게 나중에 이런 대시보드로 확장됩니다"
                  })
                }), /* @__PURE__ */ jsxs(CardContent, {
                  className: "space-y-4",
                  children: [/* @__PURE__ */ jsxs("p", {
                    className: "text-muted-foreground break-keep",
                    children: ["지금은", " ", /* @__PURE__ */ jsx("span", {
                      className: "font-semibold text-foreground",
                      children: "'필살기 패턴 1개'"
                    }), "만 보여드렸고,", /* @__PURE__ */ jsx("br", {}), "정식 런칭 시에는 이 패턴들이", " ", /* @__PURE__ */ jsx("span", {
                      className: "font-semibold text-primary",
                      children: "실시간으로 추적"
                    }), "되고,", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                      className: "font-semibold text-primary",
                      children: "페이백 규모 + 손익 패턴"
                    }), "까지 한 번에 관리됩니다."]
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground break-keep",
                    children: ["우리는 단순 AI 분석이 아니라,", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                      className: "font-semibold text-foreground",
                      children: "페이백 + 실전 트레이딩 코치 대시보드"
                    }), "를 만듭니다."]
                  }), /* @__PURE__ */ jsx("div", {
                    className: "pt-4 border-t",
                    children: /* @__PURE__ */ jsxs("p", {
                      className: "text-sm text-muted-foreground break-keep",
                      children: ["이 모든 기능은 12월 말, 완성된 TetherGrow AI 대시보드에서", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                        className: "font-semibold text-primary",
                        children: "'월 20 USDT (페이백 차감 결제)'"
                      }), "로 제공될 예정입니다."]
                    })
                  })]
                })]
              }), tokenUsage && /* @__PURE__ */ jsxs(Card, {
                className: "border-muted",
                children: [/* @__PURE__ */ jsx(CardHeader, {
                  children: /* @__PURE__ */ jsx(CardTitle, {
                    className: "text-sm text-muted-foreground",
                    children: "토큰 사용량 (디버깅)"
                  })
                }), /* @__PURE__ */ jsxs(CardContent, {
                  className: "space-y-2 text-sm",
                  children: [/* @__PURE__ */ jsxs("p", {
                    children: ["프롬프트 토큰:", " ", (_j = tokenUsage.promptTokens) == null ? void 0 : _j.toLocaleString()]
                  }), /* @__PURE__ */ jsxs("p", {
                    children: ["완성 토큰:", " ", (_k = tokenUsage.completionTokens) == null ? void 0 : _k.toLocaleString()]
                  }), /* @__PURE__ */ jsxs("p", {
                    children: ["총 토큰: ", (_l = tokenUsage.totalTokens) == null ? void 0 : _l.toLocaleString()]
                  }), tokenUsage.estimatedCost && /* @__PURE__ */ jsx("div", {
                    className: "space-y-1",
                    children: typeof tokenUsage.estimatedCost === "object" ? /* @__PURE__ */ jsxs(Fragment, {
                      children: [tokenUsage.estimatedCost.inputCost !== void 0 && /* @__PURE__ */ jsxs("p", {
                        children: ["입력 비용: $", tokenUsage.estimatedCost.inputCost.toFixed(6), " ", "USD"]
                      }), tokenUsage.estimatedCost.outputCost !== void 0 && /* @__PURE__ */ jsxs("p", {
                        children: ["출력 비용: $", tokenUsage.estimatedCost.outputCost.toFixed(6), " ", "USD"]
                      }), tokenUsage.estimatedCost.totalCost !== void 0 && /* @__PURE__ */ jsxs("p", {
                        className: "font-semibold",
                        children: ["총 비용: $", tokenUsage.estimatedCost.totalCost.toFixed(6), " ", "USD"]
                      })]
                    }) : /* @__PURE__ */ jsxs("p", {
                      children: ["예상 비용: $", tokenUsage.estimatedCost, " USD"]
                    })
                  })]
                })]
              })]
            });
          }
          return null;
        })()
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "conversion",
      className: "flex flex-col items-center justify-center px-4 py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "w-full max-w-2xl space-y-8",
        children: [/* @__PURE__ */ jsx(Card, {
          className: "border-primary/50 bg-primary/5",
          children: /* @__PURE__ */ jsx(CardContent, {
            children: /* @__PURE__ */ jsxs("p", {
              className: "text-center text-muted-foreground break-keep",
              children: ["지금 1차 베타(선착순 500명)에 등록하시면,", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                className: "font-semibold text-primary",
                children: "120 USDT 구독 크레딧으로 6개월 동안 무료로 사용"
              }), "하실 수 있습니다."]
            })
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center space-y-4",
          children: /* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold break-keep",
            children: ["나머지 ", /* @__PURE__ */ jsx("span", {
              className: "text-primary",
              children: "'치명적 습관'"
            }), "과", " ", /* @__PURE__ */ jsx("span", {
              className: "text-primary",
              children: "'모든 필살기 패턴'"
            }), "의 실시간 알림을 받으시겠습니까?"]
          })
        }), waitlistSuccess ? /* @__PURE__ */ jsx(Card, {
          className: "border-primary/50 bg-primary/5",
          children: /* @__PURE__ */ jsx(CardContent, {
            className: "pt-6",
            children: /* @__PURE__ */ jsxs("div", {
              className: "text-center space-y-4",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex items-center justify-center mb-4",
                children: /* @__PURE__ */ jsx("div", {
                  className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10",
                  children: /* @__PURE__ */ jsx(Lock, {
                    className: "h-6 w-6 text-primary"
                  })
                })
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-xl font-semibold",
                children: "등록되었습니다!"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-muted-foreground",
                children: "12월 말, 런칭 알림을 보내드립니다."
              })]
            })
          })
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs(Card, {
            className: "border-muted",
            children: [/* @__PURE__ */ jsx(CardHeader, {
              children: /* @__PURE__ */ jsx(CardTitle, {
                className: "text-xl break-keep text-center",
                children: "TetherGrow 1차 베타 테스터(선착순 500명)에게"
              })
            }), /* @__PURE__ */ jsxs(CardContent, {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex items-center justify-center gap-2",
                children: /* @__PURE__ */ jsx(Badge, {
                  variant: "secondary",
                  className: "text-lg px-4 py-2",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "font-bold text-primary",
                    children: "120 USDT 구독 크레딧(6개월 무료)"
                  })
                })
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-center text-muted-foreground",
                children: "런칭 즉시 지급됩니다."
              })]
            })]
          }), /* @__PURE__ */ jsx("form", {
            onSubmit: (e) => {
              e.preventDefault();
              waitlistForm.handleSubmit();
            },
            children: /* @__PURE__ */ jsx(FieldGroup, {
              children: /* @__PURE__ */ jsxs("div", {
                className: "space-y-4",
                children: [/* @__PURE__ */ jsxs(Field, {
                  children: [/* @__PURE__ */ jsx(Label, {
                    htmlFor: "waitlist-email",
                    children: "이메일 주소 입력"
                  }), /* @__PURE__ */ jsx(waitlistForm.Field, {
                    name: "email",
                    children: (field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                      return /* @__PURE__ */ jsxs("div", {
                        className: "space-y-2",
                        children: [/* @__PURE__ */ jsx(Input, {
                          id: "waitlist-email",
                          name: field.name,
                          value: field.state.value,
                          onBlur: field.handleBlur,
                          onChange: (e) => field.handleChange(e.target.value),
                          "aria-invalid": isInvalid,
                          type: "email",
                          placeholder: "example@email.com",
                          disabled: isSubmittingWaitlist,
                          className: isInvalid ? "border-destructive" : ""
                        }), isInvalid && /* @__PURE__ */ jsx(FieldError, {
                          errors: field.state.meta.errors
                        })]
                      });
                    }
                  })]
                }), /* @__PURE__ */ jsx(GeetestCaptcha, {
                  captchaConfig
                }), /* @__PURE__ */ jsx(waitlistForm.Subscribe, {
                  selector: (state) => [state.canSubmit, state.isSubmitting],
                  children: ([canSubmit, isSubmitting]) => /* @__PURE__ */ jsx("div", {
                    className: "flex flex-col gap-4",
                    children: isSubmittingWaitlist || isSubmitting ? /* @__PURE__ */ jsxs("div", {
                      className: "flex flex-col items-center gap-4 py-8",
                      children: [/* @__PURE__ */ jsx(Loader2, {
                        className: "w-8 h-8 animate-spin text-primary"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-lg text-muted-foreground",
                        children: "등록 중..."
                      })]
                    }) : /* @__PURE__ */ jsx(Button, {
                      type: "submit",
                      size: "lg",
                      className: "w-full text-lg py-2 h-auto font-semibold",
                      disabled: !canSubmit,
                      children: "1차 베타 알림 신청하고 120 USDT 크레딧 받기"
                    })
                  })
                })]
              })
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(Dialog, {
      open: otpDialogOpen,
      onOpenChange: setOtpDialogOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        children: [/* @__PURE__ */ jsxs(DialogHeader, {
          children: [/* @__PURE__ */ jsx(DialogTitle, {
            children: "이메일 인증번호 입력"
          }), /* @__PURE__ */ jsx(DialogDescription, {
            children: "이메일로 발송된 6자리 인증번호를 입력해주세요."
          })]
        }), /* @__PURE__ */ jsx("form", {
          onSubmit: (e) => {
            e.preventDefault();
            otpForm.handleSubmit();
          },
          children: /* @__PURE__ */ jsxs(FieldGroup, {
            children: [/* @__PURE__ */ jsx(otpForm.Field, {
              name: "otp",
              children: (field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return /* @__PURE__ */ jsxs(Field, {
                  "data-invalid": isInvalid,
                  children: [/* @__PURE__ */ jsx(FieldLabel, {
                    htmlFor: "otp",
                    children: "인증번호"
                  }), /* @__PURE__ */ jsx(InputOTP, {
                    maxLength: 6,
                    id: "otp",
                    value: field.state.value,
                    onChange: (value) => {
                      field.setMeta((prev) => ({
                        ...prev,
                        errors: [],
                        errorMap: {}
                      }));
                      field.handleChange(value);
                    },
                    onBlur: field.handleBlur,
                    children: /* @__PURE__ */ jsxs(InputOTPGroup, {
                      className: "gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border",
                      children: [/* @__PURE__ */ jsx(InputOTPSlot, {
                        index: 0
                      }), /* @__PURE__ */ jsx(InputOTPSlot, {
                        index: 1
                      }), /* @__PURE__ */ jsx(InputOTPSlot, {
                        index: 2
                      }), /* @__PURE__ */ jsx(InputOTPSlot, {
                        index: 3
                      }), /* @__PURE__ */ jsx(InputOTPSlot, {
                        index: 4
                      }), /* @__PURE__ */ jsx(InputOTPSlot, {
                        index: 5
                      })]
                    })
                  }), isInvalid && /* @__PURE__ */ jsx(FieldError, {
                    errors: field.state.meta.errors
                  }), /* @__PURE__ */ jsx(FieldDescription, {
                    children: "이메일로 발송된 6자리 인증번호를 입력해주세요."
                  })]
                });
              }
            }), /* @__PURE__ */ jsx(FieldGroup, {
              children: /* @__PURE__ */ jsx(otpForm.Subscribe, {
                selector: (state) => [state.canSubmit, state.isSubmitting, state.values.otp],
                children: ([canSubmit, isSubmitting, otp]) => {
                  const otpValue = otp;
                  return /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col gap-4",
                    children: [/* @__PURE__ */ jsx(Button, {
                      type: "submit",
                      disabled: !canSubmit || otpValue.length !== 6,
                      children: isSubmitting ? "확인 중..." : "인증번호 확인"
                    }), /* @__PURE__ */ jsxs(FieldDescription, {
                      className: "text-center",
                      children: ["인증번호를 받지 못하셨나요?", " ", /* @__PURE__ */ jsx(Button, {
                        type: "button",
                        variant: "ghost",
                        onClick: (e) => {
                          e.preventDefault();
                          handleResend();
                        },
                        disabled: isResendDisabled,
                        className: isResendDisabled ? "cursor-not-allowed opacity-50" : "",
                        children: isResendDisabled ? `재전송 (${countdown}초)` : "재전송"
                      })]
                    })]
                  });
                }
              })
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "exchanges",
      className: "px-4 py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-7xl",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-12 space-y-4",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-2xl md:text-3xl font-semibold",
            children: ["테더그로우 페이백 & AI 분석이", /* @__PURE__ */ jsx("br", {}), "적용될 거래소들"]
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-muted-foreground break-keep max-w-2xl mx-auto",
            children: ["아래 거래소들에서 발생하는 선물 수수료를, TetherGrow가 다시 돌려드립니다", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
              className: "text-sm",
              children: "기존 셀퍼럴 플랫폼처럼 레버리지 거래 수수료를 돌려받으면서, 추가로 AI 분석까지 함께 받는 구조입니다"
            })]
          })]
        }), /* @__PURE__ */ jsxs(ScrollVelocityContainer, {
          className: "space-y-8",
          children: [/* @__PURE__ */ jsx(ScrollVelocityRow, {
            baseVelocity: -2,
            direction: 1,
            children: exchanges.map((item, index) => /* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-3 px-6 py-4 mx-2 rounded-lg border bg-card hover:bg-accent transition-colors",
              children: [/* @__PURE__ */ jsx("img", {
                className: "size-8 rounded-full object-cover shrink-0",
                src: item.logo,
                alt: item.nameEn
              }), /* @__PURE__ */ jsx("span", {
                className: "text-base font-medium whitespace-nowrap",
                children: item.nameEn
              })]
            }, `row1-${item.nameEn}-${index}`))
          }), /* @__PURE__ */ jsx(ScrollVelocityRow, {
            baseVelocity: -2,
            direction: -1,
            children: exchanges.map((item, index) => /* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-3 px-6 py-4 mx-2 rounded-lg border bg-card hover:bg-accent transition-colors",
              children: [/* @__PURE__ */ jsx("img", {
                className: "size-8 rounded-full object-cover shrink-0",
                src: item.logo,
                alt: item.nameEn
              }), /* @__PURE__ */ jsx("span", {
                className: "text-base font-medium whitespace-nowrap",
                children: item.nameEn
              })]
            }, `row2-${item.nameEn}-${index}`))
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "contact",
      className: "px-4 py-20",
      children: /* @__PURE__ */ jsx("div", {
        className: "mx-auto max-w-2xl",
        children: /* @__PURE__ */ jsxs(Card, {
          className: "border-muted",
          children: [/* @__PURE__ */ jsxs(CardHeader, {
            children: [/* @__PURE__ */ jsxs(CardTitle, {
              className: "text-2xl text-center",
              children: ["궁금한 점 / 제안하고 싶은", /* @__PURE__ */ jsx("br", {}), "기능이 있으신가요?"]
            }), /* @__PURE__ */ jsxs(CardDescription, {
              className: "text-center",
              children: ["TetherGrow는 아직 베타 단계입니다", /* @__PURE__ */ jsx("br", {}), "유저 피드백을 듣고 같이 만들어갑니다"]
            })]
          }), /* @__PURE__ */ jsxs(CardContent, {
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row items-center justify-center gap-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-2",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-sm text-muted-foreground",
                  children: "이메일:"
                }), /* @__PURE__ */ jsx("a", {
                  href: "mailto:tethergrow25@gmail.com",
                  className: "text-sm font-medium text-primary hover:underline",
                  children: "tethergrow25@gmail.com"
                })]
              }), /* @__PURE__ */ jsx("span", {
                className: "hidden sm:inline text-muted-foreground",
                children: "•"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "flex justify-center pt-4",
              children: /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                asChild: true,
                children: /* @__PURE__ */ jsx("a", {
                  href: "mailto:support@tethergrow.app",
                  children: "문의메일 보내기"
                })
              })
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx(Dialog, {
      open: apiGuideDialogOpen,
      onOpenChange: setApiGuideDialogOpen,
      children: /* @__PURE__ */ jsxs(DialogContent, {
        className: "w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto ",
        children: [/* @__PURE__ */ jsxs(DialogHeader, {
          children: [/* @__PURE__ */ jsxs(DialogTitle, {
            className: "text-2xl",
            children: [selectedExchangeForGuide === "bitget" ? "Bitget" : "OKX", " API 키 생성 가이드"]
          }), /* @__PURE__ */ jsx(DialogDescription, {
            children: "Read-Only 권한의 API 키를 생성하는 방법을 단계별로 안내합니다."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "space-y-6 mt-4",
          children: selectedExchangeForGuide === "bitget" ? /* @__PURE__ */ jsx(Fragment, {
            children: /* @__PURE__ */ jsxs("div", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "1"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "Bitget 계정에 로그인"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: ["Bitget 공식 웹사이트(", /* @__PURE__ */ jsx("a", {
                      href: "https://www.bitget.com",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-primary hover:underline",
                      children: "www.bitget.com"
                    }), ")에 접속하여 계정에 로그인합니다."]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "2"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "API 관리 페이지로 이동"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: ["우측 상단 프로필 아이콘을 클릭", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                      className: "font-semibold text-primary",
                      children: "→ API Keys"
                    }), " ", "메뉴를 선택합니다."]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "3"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "API 키 생성"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "API 키 생성"
                    }), " 버튼을 클릭합니다.", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                      className: "font-semibold text-primary",
                      children: "→ System-generated API key"
                    }), " ", "메뉴를 선택합니다."]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "4"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "권한 설정 (중요!)"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Permissions → 읽기 권한 (Read-only)"
                    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Permission type → Select all"
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "5"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "Passphrase 설정"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: ["API 키 사용 시 필요한", " ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Passphrase"
                    }), "를 설정하고 안전한 곳에 저장합니다."]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "6"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "API 키 정보 복사"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: ["생성된 ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "API Key"
                    }), ",", " ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Secret Key"
                    }), ",", " ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Passphrase"
                    }), "를 각각 복사하여 안전하게 보관합니다."]
                  })]
                })]
              })]
            })
          }) : selectedExchangeForGuide === "okx" ? /* @__PURE__ */ jsx(Fragment, {
            children: /* @__PURE__ */ jsxs("div", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "1"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "OKX 계정에 로그인"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: ["OKX 공식 웹사이트(", /* @__PURE__ */ jsx("a", {
                      href: "https://www.okx.com",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-primary hover:underline",
                      children: "www.okx.com"
                    }), ")에 접속하여 계정에 로그인합니다."]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "2"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "API 관리 페이지로 이동"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: ["우측 상단 프로필 아이콘을 클릭 →", " ", /* @__PURE__ */ jsx("span", {
                      className: "font-semibold text-primary",
                      children: "API"
                    }), " ", "메뉴를 선택합니다."]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "3"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "API 키 생성"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "API 키 생성"
                    }), " 버튼을 클릭합니다."]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "4"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "권한 설정 (중요!)"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Purpose → API trading"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Permissions → 읽기 권한 (Read)"
                    }), /* @__PURE__ */ jsx("br", {})]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "5"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "Passphrase 설정"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: ["API 키 사용 시 필요한", " ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Passphrase"
                    }), "를 설정하고 안전한 곳에 저장합니다."]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-sm font-semibold text-primary",
                    children: "6"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 flex-1",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-lg",
                    children: "API 키 정보 복사"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-muted-foreground",
                    children: ["생성된 ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "API Key"
                    }), ",", " ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Secret Key"
                    }), ",", " ", /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Passphrase"
                    }), "를 각각 복사하여 안전하게 보관합니다."]
                  })]
                })]
              })]
            })
          }) : null
        })]
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: landing,
  loader,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [{
    title: `Server Error | ${void 0}`
  }];
};
const error = UNSAFE_withComponentProps(function ErrorPage() {
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center justify-center gap-2",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-semibold text-red-700",
      children: "Error"
    }), /* @__PURE__ */ jsxs("p", {
      className: "text-muted-foreground",
      children: ["Error code: ", errorCode]
    }), /* @__PURE__ */ jsx("p", {
      className: "text-muted-foreground",
      children: errorDescription
    }), /* @__PURE__ */ jsx(Button, {
      variant: "link",
      asChild: true,
      children: /* @__PURE__ */ jsx(Link, {
        to: "/",
        children: "Go to home →"
      })
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: error,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DDSlmRpP.js", "imports": ["/assets/chunk-OIYGIGL5-DX_vVQkj.js", "/assets/index-CkUPkfOJ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DovdSls6.js", "imports": ["/assets/chunk-OIYGIGL5-DX_vVQkj.js", "/assets/index-CkUPkfOJ.js", "/assets/dialog-BpYTPjwr.js", "/assets/button-D6qkQ7nO.js"], "css": ["/assets/root-BUI7VBKy.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/settings/api/set-locale": { "id": "features/settings/api/set-locale", "parentId": "root", "path": "/api/settings/locale", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/set-locale-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "core/layouts/navigation.layout": { "id": "core/layouts/navigation.layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/navigation.layout-C5XI7mf1.js", "imports": ["/assets/chunk-OIYGIGL5-DX_vVQkj.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "core/layouts/public.layout": { "id": "core/layouts/public.layout", "parentId": "core/layouts/navigation.layout", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/public.layout-D7zNSdWg.js", "imports": ["/assets/chunk-OIYGIGL5-DX_vVQkj.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "features/home/screens/landing": { "id": "features/home/screens/landing", "parentId": "core/layouts/public.layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/landing-DCcEbZ-C.js", "imports": ["/assets/chunk-OIYGIGL5-DX_vVQkj.js", "/assets/button-D6qkQ7nO.js", "/assets/dialog-BpYTPjwr.js", "/assets/index-CkUPkfOJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "core/screens/error": { "id": "core/screens/error", "parentId": "core/layouts/navigation.layout", "path": "/error", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/error-_Ol8yrc5.js", "imports": ["/assets/chunk-OIYGIGL5-DX_vVQkj.js", "/assets/button-D6qkQ7nO.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-2d2976e0.js", "version": "2d2976e0", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "features/settings/api/set-locale": {
    id: "features/settings/api/set-locale",
    parentId: "root",
    path: "/api/settings/locale",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "core/layouts/navigation.layout": {
    id: "core/layouts/navigation.layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "core/layouts/public.layout": {
    id: "core/layouts/public.layout",
    parentId: "core/layouts/navigation.layout",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "features/home/screens/landing": {
    id: "features/home/screens/landing",
    parentId: "core/layouts/public.layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route4
  },
  "core/screens/error": {
    id: "core/screens/error",
    parentId: "core/layouts/navigation.layout",
    path: "/error",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
