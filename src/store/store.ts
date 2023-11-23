import { writable, type Writable } from "svelte/store";
import type { UserDto } from "../interfaces/user.dto";

const userStore = writable(JSON.parse(localStorage.getItem("user") ?? "{}"));

let isAdminValue = false; 
	userStore.subscribe((user) => {
		isAdminValue = user.isAdmin;
	});

const setUser = (user: UserDto) => {
	userStore.set(user);
};

const isAdmin = () => {
	return isAdminValue;
};

/* 
const fetchCategories = async () => {
  return axios
    .get("http://localhost:8085/api/v1/categories")
    .then((res) => {
      return res.data.body.categories;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
const categoriesStore = writable(await fetchCategories()); */



const sidebarOpen = writable(false);

const openSidebar = () => {
  sidebarOpen.update(() => true);
};

const closeSidebar = () => {
  sidebarOpen.update(() => false);
};

export {
  sidebarOpen,
  openSidebar,
  closeSidebar,
  userStore,
  setUser,
  isAdmin
};
