import { useRef, useCallback } from "react";

interface GeetestConfig {
	captchaId: string;
	language?: string;
	product?: "float" | "bind" | "popup";
	protocol?: string;
	onSuccess?: () => void; // 캡차 성공 시 콜백 추가
}

interface CaptchaValidateResult {
	lot_number: string;
	pass_token: string;
	gen_time: string;
	captcha_output: string;
}

export function useGeetestCaptcha(config: GeetestConfig) {
	const captchaObjRef = useRef<any>(null);
	const isInitializedRef = useRef(false);

	// 캡차 초기화 핸들러
	const captchaHandler = useCallback(
		(captchaObj: any) => {
			captchaObjRef.current = captchaObj;
			isInitializedRef.current = true;

			captchaObj
				.appendTo("#captcha")
				.onReady(() => {
					console.log("[Geetest] Captcha ready");
				})
				.onSuccess(() => {
					console.log("[Geetest] Captcha success");
					// 캡차 성공 시 콜백 실행 (자동 제출)
					if (config.onSuccess) {
						config.onSuccess();
					}
				})
				.onError((error: any) => {
					console.error("[Geetest] Captcha error:", error);
				});
		},
		[config]
	);

	// 캡차 설정
	const captchaConfig = {
		config: {
			captchaId: config.captchaId,
			language: config.language || "eng",
			product: config.product || "bind",
			protocol: config.protocol || "https://",
		},
		handler: captchaHandler,
	};

	// 캡차 보여주기 (bind 모드용)
	const showCaptcha = useCallback(() => {
		if (captchaObjRef.current) {
			captchaObjRef.current.showCaptcha();
			return true;
		} else {
			console.warn("[Geetest] Captcha not initialized yet");
			return false;
		}
	}, []);

	// 캡차 검증 결과 가져오기
	const getValidate = useCallback((): CaptchaValidateResult | null => {
		if (!captchaObjRef.current) {
			return null;
		}
		return captchaObjRef.current.getValidate();
	}, []);

	// 캡차 리셋
	const reset = useCallback(() => {
		if (captchaObjRef.current) {
			captchaObjRef.current.reset();
		}
	}, []);

	// 초기화 여부
	const isInitialized = () => isInitializedRef.current;

	return {
		captchaConfig,
		showCaptcha,
		getValidate,
		reset,
		isInitialized,
	};
}
