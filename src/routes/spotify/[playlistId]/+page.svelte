<script>
    export let data;

    // Access the tracks from the data loaded by +page.server.js
    const tracks = data.tracks;
</script>

<div class="max-w-4xl mx-auto my-8 p-6 bg-[#1a1a1a] rounded-lg shadow-lg text-gray-200">
    <h1 class="text-[#1DB954] text-center mb-6 text-3xl font-bold">Playlist Tracks</h1>

    {#if tracks && tracks.length > 0}
        <p class="mb-4 text-lg">Displaying {tracks.length} tracks.</p>
        <ul class="list-none p-0 divide-y divide-gray-700">
            {#each tracks as item, i}
                <li class="flex items-center py-3">
                    <div class="font-bold text-[#1DB954] mr-2 w-[30px] text-right text-lg">{i + 1}.</div>
                    <div class="flex-1 ml-4">
                        <div class="font-bold text-white text-lg">{item.track.name}</div>
                        <div class="text-gray-400 text-sm">{item.track.artists.map(a => a.name).join(', ')}</div>
                    </div>
                </li>
            {/each}
        </ul>
    {:else if tracks}
        <p class="text-[#ff4d4d] text-center mt-8 text-lg">No tracks found for this playlist.</p>
    {:else}
        <p class="text-[#ff4d4d] text-center mt-8 text-lg">Could not load playlist tracks. Please check the playlist ID and your API credentials.</p>
    {/if}
</div>
