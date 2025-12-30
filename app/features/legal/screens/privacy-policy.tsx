// import { apiRequest } from "~/core/lib/api.server";
// import type { Route } from "./+types/privacy-policy";
// import { useTranslation } from "react-i18next";
// import { data } from "react-router";

// export async function loader({ request }: Route.LoaderArgs) {
// 	const privacy = await apiRequest({
// 		request,
// 		endpoint: "/common/privacy",
// 		method: "GET",
// 	});
// 	return data(privacy);
// }
// export default function PrivacyPolicy({ loaderData }: Route.ComponentProps) {
// 	const { i18n } = useTranslation();
// 	return (
// 		<div>
// 			<h1>개인정보 처리방침</h1>
// 			<div
// 				dangerouslySetInnerHTML={{
// 					__html: loaderData?.privacy?.translation?.[i18n.language] ?? "",
// 				}}
// 			/>
// 		</div>
// 	);
// }
