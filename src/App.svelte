
<script>
  import ChatArea from './ChatArea.svelte';
  import Sidebar from './Sidebar.svelte';
  import RightPanel from './RightPanel.svelte';

  let showMenu = false;
</script>

<div class="flex h-screen bg-[#171717] text-white">
  <Sidebar bind:showMenu={showMenu} />

  <div class="flex-1 p-4 relative">
    <div class="mb-4">
      <h1 class="text-2xl flex items-center iRec">
        My Chat
      </h1>
    </div>
    <div class="flex" style="height: calc(100% - 48px);">
      <ChatArea />
      <RightPanel />
    </div>
  </div>
</div>

<style>
    @import './app.css';
</style>
