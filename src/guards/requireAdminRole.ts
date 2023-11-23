import type { RouteDetail, RouteLoadedEvent, RoutePrecondition } from "svelte-spa-router";
import { isAdmin } from "../store/store";
export const requireAdminRole: RoutePrecondition = (detail: RouteDetail ) => {
    return isAdmin() ? true : false;
}