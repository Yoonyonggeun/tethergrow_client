import { getAuthToken } from "./auth-session.server";

/**
 * 서버 사이드에서 API를 호출할 때 사용하는 유틸리티
 * 세션에서 토큰을 자동으로 가져와서 Authorization 헤더에 포함합니다
 */
export async function apiRequest({
	request,
	endpoint,
	method = "GET",
	body,
}: {
	request: Request;
	endpoint: string;
	method?: string;
	body?: any;
}) {
	// 세션에서 토큰 가져오기
	const token = await getAuthToken(request);


	const headers: HeadersInit = {
		"Content-Type": "application/json",
		key: process.env.TETHERGROW_API_KEY || "",
	};


	// 토큰이 있으면 Authorization 헤더에 추가
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}


	const response = await fetch(`${process.env.VITE_API_BASE_URL}${endpoint}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
		credentials: "include",
	});

	
	const responseData = await response.json();



	return responseData;
}

/**
 * 사용 예제:
 *
 * // loader에서 사용
 * export async function loader({ request }: Route.LoaderArgs) {
 *   const data = await apiRequest({
 *     request,
 *     endpoint: "/user/profile",
 *     method: "GET",
 *   });
 *   return data;
 * }
 *
 * // action에서 사용
 * export async function action({ request }: Route.ActionArgs) {
 *   const formData = await request.json();
 *   const data = await apiRequest({
 *     request,
 *     endpoint: "/user/update",
 *     method: "PUT",
 *     body: formData,
 *   });
 *   return data;
 * }
 */
