<script lang='ts'>
    import { afterUpdate, createEventDispatcher, tick } from 'svelte';

    // @ts-ignore
    import IoIosAddCircleOutline from 'svelte-icons/io/IoIosAddCircleOutline.svelte';
    
    // @ts-ignore
    import MdSend from 'svelte-icons/md/MdSend.svelte';
    import { onMount } from 'svelte';

    export let isMobile;

    import axios from 'axios'

    let messageInput = '';
    let messages = [];
    const dispatch = createEventDispatcher();

    let scrollEl;

    async function sendMessage() {
        if (messageInput.trim() !== '') {
            messages = [...messages, { type: 'user', text: messageInput.trim() }];
            dispatch('message', messageInput.trim());
            messageInput = '';

            await tick()
            
            scrollToBottom(scrollEl)
        }
    }

    const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }; 

    async function readAllChunks(readableStream) {
        const reader = readableStream.getReader();
        const chunks = [];

        let done, value;
        while (!done) {
            ({ value, done } = await reader.read());
            if (done) {
                return chunks;
            }

            const string = new TextDecoder().decode(value);

            try {
                
                // const parsed = JSON.parse(string).candidates![0].content.parts[0].text

                messages = [...messages, { type: 'bot', text: string }];
            
            } catch (error) {
                
            }

            chunks.push(value);
        }
    }

    async function handleFileUpload(event) {
        const file = event.target.files[0];

        let b64file: string;

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {

                b64file = (e.target.result as string).split(',')[1];

                messages = [...messages, { type: 'user', image: e.target.result }];
                dispatch('image', e.target.result);
            };
            reader.readAsDataURL(file);
        }

        const fd = new FormData()

        fd.append('image', file)

        const response = await fetch("https://10f4-172-188-97-97.ngrok-free.app/chat", {
            method: 'POST',
            body: fd,
        });

        if (!response.ok) throw new Error(await response.text());

        // for await (const chunk of response.body.getReader()) {
        //     console.log('got', chunk);
        // }

        readAllChunks(response.body).then((chunks) => {
            console.log('DONE');
        })

        // const response = await axios.postForm('https://10f4-172-188-97-97.ngrok-free.app/chat', {
        //     image: file
        // }, {
        //     responseType: 'stream'
        // })

        // const stream = response.data

        // messages = [...messages, { type: 'bot', text: '' }];

        // for await (const chunk of stream) {

        //     // console.log(chunk);

        //     const _temp = messages

        //     const lm = _temp[_temp.length - 1]

        //     lm.text = lm.text + chunk

        //     _temp[_temp.length - 1] = lm

        //     messages = _temp;
        // }

        // const _temp = messages

        // const lm = _temp[_temp.length - 1]

        // lm.text = JSON.parse(lm.text).candidates![0].content.parts[0].text

        // _temp[_temp.length - 1] = lm

        // messages = _temp

    }

    onMount(() => {
        messages = [
            { type: 'bot', text: 'How can I assist you at the moment?' },
        ];
    });
</script>

<div class="flex flex-col h-full {isMobile ? 'w-full' : 'flex-1'}">
    <div class="bg-[#121212] p-4 rounded-lg shadow-md flex-1 flex flex-col flex-grow overflow-y-auto" bind:this={scrollEl}>
        <div class="flex-1 flex flex-col gap-4">
            {#each messages as message}
                <div class="flex {message.type === 'user' ? 'justify-end' : 'justify-start'}">
                    <div class="max-w-[70%] p-2 rounded {message.type === 'user' ? 'bg-purple-600 text-white' : 'bg-[#1F2021] text-gray-300'}">
                        {#if message.text}
                            {message.text}
                        {/if}
                        {#if message.image}
                            <img src={message.image} alt="Uploaded image" class="max-w-full h-auto rounded" />
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="mt-4 relative flex items-center">
        <input
            type="text"
            placeholder="Type something..."
            class="w-full p-2 bg-transparent border-2 border-[#5D5D5C] rounded-lg"
            bind:value={messageInput}
            on:keydown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <input type="file" id="fileInput" class="hidden" on:change={handleFileUpload} />
        <span class="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
            <button
                class="w-[24px] h-[24px] rounded-md cursor-pointer text-[#5D5D5D] hover:bg-[#D5D5D5]"
                on:click={() => document.getElementById('fileInput').click()}
                aria-label="Upload image"
            >
                <IoIosAddCircleOutline />
            </button>
            <button
                class="w-[24px] h-[24px] rounded-md cursor-pointer text-[#5D5D5D] hover:bg-[#D5D5D5]"
                on:click={sendMessage}
                aria-label="Send message"
            >
                <MdSend />
            </button>
        </span>
    </div>
</div>
