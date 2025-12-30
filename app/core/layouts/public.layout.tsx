import type { Route } from "./+types/public.layout";

import { Outlet, redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
	// Return an empty object to avoid the "Cannot read properties of undefined" error
	return {};
}

export default function PublicLayout() {
	return <Outlet />;
}
