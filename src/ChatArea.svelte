<script>
    import IoIosAddCircleOutline from 'svelte-icons/io/IoIosAddCircleOutline.svelte'
</script>

<div class="flex flex-col h-full flex-1">
    <div class="bg-[#121212] p-4 rounded-lg shadow-md flex-1 flex flex-col h-full">
        <div class="flex-1 overflow-y-auto flex items-center justify-center">
          <h4 class="text-center text-2xl flex items-center iRec ">How can I assist you<br>at the moment ?</h4>
        </div>
    </div>
    <div class="mt-4 relative">
        <input type="text" placeholder="Type something..." class="w-full p-2 bg-transparent border-2 border-[#5D5D5C] rounded-lg">
        <span class="absolute inset-y-0 right-0 flex items-center pr-3">
            <div class="w-[24px] h-[24px]">
                <IoIosAddCircleOutline class="text-[#5D5D5D]"/>
            </div>
        </span>
    </div>
</div>