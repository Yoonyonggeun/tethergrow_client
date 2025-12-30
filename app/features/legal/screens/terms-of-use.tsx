// import { apiRequest } from "~/core/lib/api.server";
// import type { Route } from "./+types/terms-of-use";
// import { data } from "react-router";
// import { useTranslation } from "react-i18next";

// export async function loader({ request }: Route.LoaderArgs) {
// 	const termsOfUse = await apiRequest({
// 		request,
// 		endpoint: "/common/terms",
// 		method: "GET",
// 	});
// 	return data(termsOfUse);
// }
// export default function TermsOfUse({ loaderData }: Route.ComponentProps) {
// 	const { i18n } = useTranslation();

// 	return (
// 		<div>
// 			<h1>이용약관</h1>
// 			<div
// 				dangerouslySetInnerHTML={{
// 					__html: loaderData?.terms?.translation?.[i18n.language] ?? "",
// 				}}
// 			/>
// 		</div>
// 	);
// }
