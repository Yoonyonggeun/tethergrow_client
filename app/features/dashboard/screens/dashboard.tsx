// import type { Route } from "./+types/dashboard";
// import { apiRequest } from "~/core/lib/api.server";
// import { data, Link } from "react-router";

// import { Card, CardHeader, CardTitle } from "~/core/components/ui/card";
// import { MagicCard } from "~/core/components/ui/magic-card";
// import { useTheme } from "remix-themes";
// import { useTranslation } from "react-i18next";
// import { ArrowBigRightDashIcon } from "lucide-react";

// const BASE = "https://api.bitget.com";
// type HttpMethod = "GET" | "POST" | "DELETE";

// export async function loader({ request }: Route.LoaderArgs) {
//   const exchanges = await apiRequest({
//     request,
//     endpoint: "/exchange/all",
//     method: "GET",
//   });

//   return data({
//     exchanges: exchanges.exchanges,
//   });
// }

// export default function Dashboard({ loaderData }: Route.ComponentProps) {
//   const { exchanges } = loaderData;
//   const [theme] = useTheme();
//   const { t } = useTranslation();

//   return (
//     <section className="mx-auto p-5 w-full max-w-[840px] lg:p-0">
//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {exchanges.map((item: any) => {
//           return (
//             <Link to={`/dashboard/${item.nameEn}`} key={item.nameEn}>
//               <Card className="p-0 border-none shadow-none">
//                 <MagicCard
//                   gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
//                   className="py-4"
//                 >
//                   <CardHeader>
//                     <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-4">
//                       <div className="flex items-center gap-2">
//                         <img
//                           className="size-8 rounded-full object-cover"
//                           src={item.logo}
//                           alt={item.nameEn}
//                         />
//                         <CardTitle className="text-lg">{item.nameEn}</CardTitle>
//                       </div>
//                       <ArrowBigRightDashIcon className="size-4 text-muted-foreground" />
//                     </div>
//                   </CardHeader>
//                 </MagicCard>
//               </Card>
//             </Link>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
