import { useEffect } from "react";

interface CaptchaProps {
	captchaConfig: {
		config: {
			captchaId: string;
			language?: string;
			product?: string;
			protocol?: string;
		};
		handler: (captchaObj: any) => void;
	};
	className?: string;
}

export default function GeetestCaptcha({
	captchaConfig,
	className = "",
}: CaptchaProps) {
	useEffect(() => {
		// Geetest 스크립트가 로드되었는지 확인
		if ((window as any).initGeetest4) {
			(window as any).initGeetest4(captchaConfig.config, captchaConfig.handler);
		} else {
			console.error("[Geetest] initGeetest4 is not loaded");
		}
	}, [captchaConfig]);

	return <div id="captcha" className={className}></div>;
}
