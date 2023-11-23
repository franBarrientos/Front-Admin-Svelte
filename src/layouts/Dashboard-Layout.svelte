<script>
  import "../app.css";

  import TopBar from "../components/TopBar.svelte";
  import Overlay from "../components/Overlay.svelte";
  // @ts-ignore
  import Sidebar from "../components/Sidebar.svelte";
  import { closeSidebar, sidebarOpen } from "../store/store";
  import { onDestroy } from "svelte";

  /*	lg:w-[calc(100%-16rem)] class get the remained width of the main tag from lg:viewport by subtracting
	(the total width by the width of the Sidebar component which is w-64 = 16rem)*/

  const style = {
    container: `h-screen overflow-hidden relative`,
    mainContainer: `bg-[#25074d] flex flex-col h-screen pl-0 w-full lg:w-[calc(100%-16rem)]`,
    main: `bg-gray-100 h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6 lg:rounded-tl-3xl`,
  };

  function handleRouteChange() {
    if ($sidebarOpen && window.innerWidth < 1024) {
      closeSidebar();
    }
  }
  window.addEventListener("popstate", handleRouteChange);

  // Asegúrate de eliminar el evento cuando el componente se destruya
  onDestroy(() => {
    window.removeEventListener("popstate", handleRouteChange);
  });
</script>

<div class={style.container}>
  <div class="flex items-start">
    <Overlay />
    <Sidebar mobileOrientation="end" />
    <div class={style.mainContainer}>
      <TopBar />
      <main class={style.main}>
        <slot class="h-full"/>
      </main>
    </div>
  </div>
</div>
