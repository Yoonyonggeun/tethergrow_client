// import { useLoaderData } from "react-router";
// import type { Route } from "./+types/profile";
// import { requireAuth } from "~/core/lib/auth-session.server";
// import { apiRequest } from "~/core/lib/api.server";
// import {
// 	Card,
// 	CardContent,
// 	CardHeader,
// 	CardTitle,
// } from "~/core/components/ui/card";

// export default function Profile() {
// 	const { user } = useLoaderData<typeof loader>();

// 	return (
// 		<div className="container mx-auto py-8">
// 			<Card>
// 				<CardHeader>
// 					<CardTitle>마이페이지</CardTitle>
// 				</CardHeader>
// 				<CardContent>
// 					<div className="space-y-4">
// 						<div>
// 							<p className="text-sm text-muted-foreground">이메일</p>
// 							<p className="text-lg font-medium">{user.userID}</p>
// 						</div>
// 						<div>
// 							<p className="text-sm text-muted-foreground">회원 ID</p>
// 							<p className="text-lg font-medium">{user._id}</p>
// 						</div>
// 						<div>
// 							<p className="text-sm text-muted-foreground">회원 등급</p>
// 							<p className="text-lg font-medium">{user.role}</p>
// 						</div>
// 					</div>
// 				</CardContent>
// 			</Card>
// 		</div>
// 	);
// }

// // 로그인이 필요한 페이지 - loader에서 세션 체크
// export async function loader({ request }: Route.LoaderArgs) {
// 	// 세션에서 토큰 가져오기 (인증 체크)
// 	const token = await requireAuth(request);

// 	// 백엔드 API를 호출해서 사용자 정보 가져오기
// 	const user = await apiRequest({
// 		request,
// 		endpoint: "/user/profile", // 실제 프로필 조회 API 엔드포인트로 변경
// 		method: "GET",
// 	});

// 	return { user };
// }
