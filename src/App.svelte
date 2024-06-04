<script>
  import { onMount } from 'svelte';
  import ChatArea from './ChatArea.svelte';
  import Sidebar from './Sidebar.svelte';
  import RightPanel from './RightPanel.svelte';
  import UserInfo from './UserInfo.svelte';
  // @ts-ignore
  import GiHamburgerMenu from 'svelte-icons/gi/GiHamburgerMenu.svelte'

  let showSidebar = false;
  let isMobile = false;

  onMount(() => {
    const handleResize = () => {
      isMobile = window.innerWidth <= 768;
      showSidebar = !isMobile;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div class="flex h-screen bg-[#171717] text-white relative">
  <Sidebar bind:showSidebar={showSidebar} />

  <div class="flex-1 p-4 relative">
    <div class="mb-4 flex justify-start gap-4">
      <button class="md:hidden" on:click={() => (showSidebar = !showSidebar)}>
        <div class="h-[24px] w-[24px]">
          <GiHamburgerMenu />
        </div>
      </button>
      <h1 class="text-2xl flex items-center iRec">My Chat</h1>
    </div>
    <div class="flex" style="height: calc(100% - 48px);">
      <ChatArea {isMobile} />
      {#if !isMobile}
        <RightPanel />
      {/if}
    </div>
  </div>
</div>

<style>
  @import './app.css';
</style>
