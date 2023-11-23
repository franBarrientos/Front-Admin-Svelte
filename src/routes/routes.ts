import Employees from "./../pages/Employees.svelte"
import Login from "./../pages/Login.svelte"
import Products from "./../pages/Products.svelte"
import {wrap} from 'svelte-spa-router/wrap'
import type { SvelteComponent } from "svelte"
import {requireAdminRole } from "../guards/requireAdminRole"
import type { RoutePrecondition } from "svelte-spa-router"

export const routes = {
    '/': Login,
    '/employees': wrap({
      component: Employees as typeof SvelteComponent,
      conditions: [requireAdminRole]
    }),
    '/products': wrap({
      component: Products as typeof SvelteComponent,
      conditions: [requireAdminRole]
    }),


}

