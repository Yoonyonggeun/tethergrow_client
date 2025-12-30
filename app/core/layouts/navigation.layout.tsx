import type { Route } from "./+types/navigation.layout";

import { Suspense } from "react";
import { Await, Outlet } from "react-router";

import Footer from "../components/footer";
import { NavigationBar } from "../components/navigation-bar";
import { apiRequest } from "../lib/api.server";
import { getAuthToken } from "../lib/auth-session.server";

/**
 * Navigation Layout Loader
 *
 * 토큰이 있으면 유저정보를 가져오고, 없으면 null을 반환합니다.
 * 토큰이 없어도 페이지 접근은 허용됩니다.
 */
export async function loader({ request }: Route.LoaderArgs) {
  // 토큰을 가져오되, 없어도 에러를 발생시키지 않음
  const token = await getAuthToken(request);
  // 토큰이 없으면 유저정보 없이 반환
  if (!token) {
    return { user: null };
  }

  // 토큰이 있으면 유저정보를 가져옴
  try {
    const responseData = await apiRequest({
      request,
      endpoint: "/my-page/user/info",
      method: "GET",
    });

    return { user: responseData.user };
  } catch (error) {
    // API 요청 실패 시 (토큰이 유효하지 않은 경우 등) 유저정보 없이 반환
    console.error("Failed to fetch user info:", error);
    return { user: null };
  }
}

export default function NavigationLayout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="flex min-h-screen flex-col justify-between pt-16">
      <Suspense fallback={<NavigationBar loading={true} />}>
        <Await resolve={user}>
          {(user) =>
            user === null ? (
              <NavigationBar loading={false} />
            ) : (
              <NavigationBar email={user.userID} loading={false} />
            )
          }
        </Await>
      </Suspense>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
