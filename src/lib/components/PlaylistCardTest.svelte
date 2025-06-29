<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	export let tracks: {
    id: string;
    number: number;
    title: string;
    artist: string;
    thumbnail: string;
  }[] = [];
</script>

<ul class="flex flex-col"> {#each tracks as track (track.id)}
    

    <li class="flex flex-1 flex-row mb-1 items-center">
  <div
    class="bg-muted/50 flex min-h-[3rem] w-full items-center justify-between gap-y-1 rounded-md py-2 h-12"
  >
    <div
      class="ml-2 w-[20px] flex-shrink-0 text-right text-sm font-bold text-[#1DB954]"
    >
      {track.number}.
    </div>

    <Separator class="ml-2 h-[100%]" orientation="vertical" decorative="true" />

    <div class="flex flex-1 flex-col justify-between gap-y-1 mx-2">
      <div class="flex-grow text-xs text-white leading-3">
        {track.title}
      </div>
      <div class="flex-grow text-[.65rem] text-gray-400">
        {track.artist}
      </div>
    </div>

    <Separator class="mr-2" orientation="vertical" decorative="true" />

    <div class="mr-2 size-10 flex-shrink-0">
      <img src={track.thumbnail} alt={`Thumbnail for ${track.title}`} />
    </div>
  </div>
</li>

  {/each}
</ul>