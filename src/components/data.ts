import HomeIcon from "./../icons/HomeIcon.svelte";
import Product from "../icons/ProductIcon.svelte";
import ContactIcon from "./../icons/ContactIcon.svelte";
import ServersIcon from "./../icons/ServersIcon.svelte";
import TerminalIcon from "./../icons/TerminalIcon.svelte";
import SettingsIcon from "./../icons/SettingsIcon.svelte";
import RecycleBinIcon from "./../icons/RecycleBin.svelte";
import DocumentationIcon from "./../icons/DocumentationIcon.svelte";
import { BackwardStepSolid } from "flowbite-svelte-icons"


export const data = [
  {
    title: "Employees",
    icon: HomeIcon,
    link: "#/employees",
  },
  {
    title: "Back",
    icon: BackwardStepSolid,
    link: "/admin",
  },
];
