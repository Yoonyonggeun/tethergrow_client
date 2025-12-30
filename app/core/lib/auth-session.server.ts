import { createCookieSessionStorage, redirect } from "react-router";

// 세션 스토리지 생성 (토큰 저장용)
const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__session",
		httpOnly: true, // XSS 방어
		path: "/",
		sameSite: "lax",
		secrets: [
			process.env.SESSION_SECRET || "default-secret-change-in-production",
		],
		secure: process.env.MODE === "production", // production에서는 HTTPS only
		maxAge: 60 * 60 * 24 * 7, // 7일
	},
});

// 세션에서 토큰 가져오기
export async function getAuthToken(request: Request) {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);
	const token = session.get("token");
	return token;
}

// 로그인: 토큰을 세션에 저장 (토큰만 저장)
export async function createUserSession({
	request,
	token,
	redirectTo = "/",
}: {
	request: Request;
	token: string;
	redirectTo?: string;
}) {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);

	// 토큰만 저장
	session.set("token", token);

	return {
		token,
		headers: {
			"Set-Cookie": await sessionStorage.commitSession(session),
		},
	};
}

// 로그아웃: 세션 삭제
export async function logout(request: Request) {
	const session = await sessionStorage.getSession(
		request.headers.get("Cookie")
	);
	return {
		headers: {
			"Set-Cookie": await sessionStorage.destroySession(session),
		},
	};
}

// 인증된 사용자인지 확인하고 토큰 반환
export async function requireAuth(request: Request) {
	const token = await getAuthToken(request);

	if (!token) {
		// throw new Response("Unauthorized", { status: 401 });
		// 토큰 삭제 및 로그인페이지 이동
		const { headers } = await logout(request);
		return redirect("/auth/login", {
			headers,
		});
	}

	return token;
}
