// import { apiRequest } from "~/core/lib/api.server";
// import type { Route } from "./+types/dashboard-bitget";

// export async function loader({ request }: Route.LoaderArgs) {
//   const exchangeName = "Bitget";
//   // 1) 거래소 기본 정보
//   const exchange = await apiRequest({
//     request,
//     endpoint: `/exchange/detail?exchangeName=${exchangeName}`,
//     method: "GET",
//   });

//   const exchangeID = exchange.exchange._id;
// }
// export default function DashboardBitget() {
//   return <div>DashboardBitget</div>;
// }
