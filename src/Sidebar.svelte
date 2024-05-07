<script>
    import { fly } from 'svelte/transition';
    import { FaChevronDown, FaChevronUp, FaCommentDots } from 'svelte-icons/fa';
    import IoIosSettings from 'svelte-icons/io/IoIosSettings.svelte'

    import UserInfo from './UserInfo.svelte';
  
    export let showMenu = false;
  
    let ChevronIcon = FaChevronDown;
  
    function toggleMenu() {
      showMenu = !showMenu;
      ChevronIcon = showMenu ? FaChevronUp : FaChevronDown;
    }
</script>
  
<div class="w-64 p-4">
    <div class="mb-4">
        <h1 class="text-2xl iRec text-lime-400">VirtuHand</h1>
        <div class="flex justify-between mt-4">
            <h3 class="font-semibold">Main Menu</h3>
            <button class="text-black-400 hover:text-black-300 h-[22px] w-[22px]" on:click={toggleMenu}>
                <svelte:component this={ChevronIcon} />
            </button>
        </div>
    </div>
    {#if showMenu}
        <nav transition:fly="{{ y: 0, duration: 300 }}" style="opacity: 1;">
            <ul class="mt-6">
                <li class="mb-4 w-full">
                    <a href="#" class="flex flex-row items-center justify-start rounded gap-[10px] py-2 px-4 bg-[#1F2021]">
                        <div class="h-[20px] w-[20px]">
                            <FaCommentDots />
                        </div>
                        Chatbots
                    </a>
                </li>
                <li class="mb-4 w-full">
                    <a href="#" class="hover:bg-[#242424] flex flex-row items-center rounded justify-start gap-[10px] py-2 px-4">
                        <div class="h-[24px] w-[24px]">
                            <IoIosSettings />
                        </div>
                        Settings
                    </a>
                </li>
            </ul>
        </nav>
    {:else}
        <nav transition:fly="{{ y: -100, duration: 300 }}" style="opacity: 0;">
            <ul>
                
            </ul>
        </nav>
    {/if}
    <div class="fixed bottom-0 left-0 flex flex-col p-4 w-64">
        <div class="mb-4">
            <h2 class="text-md"><a href="#" class="link">Reviews & Feedbacks</a></h2>
        </div>
        <div class="mb-4">
            <h2 class="text-md"><a href="#" class="link">About</a></h2>
        </div>
        <div class="mb-4">
            <h2 class="text-md"><a href="#" class="link">Terms & Policies</a></h2>
        </div>
        <div class="mt-4">
            <UserInfo />
        </div>
    </div>
</div>
  
<style>
    @import './app.css';

    .link {
        position: relative;
        text-decoration: none;
        font-size: 1.125rem;
        line-height: 1.75rem;
    }

    .link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, #EFEFEF, #EFEFEF);
        background-size: 0% 100%;
        background-repeat: no-repeat;
        transition: background-size 0.3s ease;
    }

    .link:hover::after {
        background-size: 100% 100%;
    }
</style>