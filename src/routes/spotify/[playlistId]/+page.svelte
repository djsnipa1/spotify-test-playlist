<script>
    import * as Card from "$lib/components/ui/card/index.js";
    import PlaylistCardTest from "$lib/components/ui/card/PlaylistCardTest.svelte";
    export let data;

    const tracks = data.tracks;
    const playlistName = data.playlistName; // Ensure this is received if you're using it
    const playlistImage = data.playlistImage; 
</script>


<PlaylistCardTest />

<hr />

<div class="flex w-full justify-center p-2">
    <Card.Root class="w-full max-w-sm">
        <Card.Header class="justify-center">
       <div class="flex justify-center"> 
            {#if playlistImage}
    <img src={playlistImage} class="mb-2 rounded-md w-1/2 mx-auto object-cover" alt="Playlist Cover Art"/>
    {/if}
       </div>
  <Card.Title class="mx-auto font-bold text-lg">{playlistName}</Card.Title>
  <Card.Description class="mx-auto text-sm">Displaying {tracks.length} tracks</Card.Description>
</Card.Header>
<Card.Content>
    <div class="flex overflow-visible">
  <!-- <p>Card Content</p> -->
{#if tracks && tracks.length > 0}
        <div class="border border-pink-500"> 
            <!-- <p class="mb-4 text-lg">Displaying {tracks.length} tracks.</p> -->
            <ul class="list-none p-0 divide-y divide-gray-700">
                {#each tracks as item, i}
                    <li class="flex items-center py-3">
                        <div class="font-bold text-[#1DB954] mr-2 w-[30px] text-right text-sm">{i + 1}.</div>
                        <div class="flex-1 ml-4">
                            <div class="font-bold text-white text-xs">{item.track.name}</div>
                            <div class="text-gray-400 text-xs">{item.track.artists.map(a => a.name).join(', ')}</div>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    {:else if tracks}
        <p class="text-[#ff4d4d] text-center mt-8 text-lg">No tracks found for this playlist.</p>
    {:else}
        <p class="text-[#ff4d4d] text-center mt-8 text-lg">Could not load playlist tracks. Please check the playlist ID and your API credentials.</p>
    {/if}
    </div>
 </Card.Content>
 <Card.Footer>
  <p>Card Footer</p>
 </Card.Footer>
</Card.Root>
</div>

<!-- <div class="max-w-4xl mx-auto my-8 p-6 bg-[#1a1a1a] rounded-lg shadow-lg text-gray-200"> -->
    <!-- <h1 class="text-[#1DB954] text-center mb-6 text-3xl font-bold">{playlistName || 'Playlist Tracks'}</h1> -->

    <!-- {#if playlistImage} -->
        <!-- <div class="flex justify-center mb-6"> -->
            <!-- <img src={playlistImage} alt="Playlist Cover" class="rounded-lg shadow-md w-48 h-48 object-cover" /> -->
        <!-- </div> -->
    <!-- {/if} -->

    <!-- {#if tracks && tracks.length > 0} -->
        <!-- <div class="mt-4"> -->
            <!-- <p class="mb-4 text-lg">Displaying {tracks.length} tracks.</p> -->
            <!-- <ul class="list-none p-0 divide-y divide-gray-700"> -->
                <!-- {#each tracks as item, i} -->
                    <!-- <li class="flex items-center py-3">
                        <div class="font-bold text-[#1DB954] mr-2 w-[30px] text-right text-lg">{i + 1}.</div>
                        <div class="flex-1 ml-4">
                            <div class="font-bold text-white text-lg">{item.track.name}</div>
                            <div class="text-gray-400 text-sm">{item.track.artists.map(a => a.name).join(', ')}</div>
                        </div>
                    </li> -->
                <!-- {/each} -->
            <!-- </ul> -->
        <!-- </div> -->
    <!-- {:else if tracks} -->
        <!-- <p class="text-[#ff4d4d] text-center mt-8 text-lg">No tracks found for this playlist.</p> -->
    <!-- {:else} -->
        <!-- <p class="text-[#ff4d4d] text-center mt-8 text-lg">Could not load playlist tracks. Please check the playlist ID and your API credentials.</p> -->
    <!-- {/if} -->
<!-- </div> -->
