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

<!-- <div class="flex flex-1 flex-row gap-4 p-2">
	<div
		class="border-cyan-500 border-1 bg-muted/50 flex aspect-video h-12 w-full items-center justify-between gap-y-1 rounded-md"
	>
		<div
			class="my-2 ml-2  w-fit flex-shrink-0 border border-dashed border-slate-500/50 text-right text-sm font-bold text-[#1DB954]"
		>
			100.
        </div>
        <Separator class="ml-2" orientation="vertical" decorative="true" />

		<div class="flex flex-1 flex-col justify-between gap-y-1 mx-1">
			<div class="flex-grow border border-dashed border-slate-500/50 text-xs font-bold text-white">
				Flex item 2
			</div>
			<div class="flex-grow border border-dashed border-slate-500/50 text-xs text-gray-400">
				Flex item 2
			</div>
		</div>

		<Separator class="mr-2" orientation="vertical" decorative="true" />

		<div class="mr-2 size-10 border border-dashed border-orange-500 flex-shrink-0">
			<img src="https://placehold.co/200" alt="track thumbnail" />
		</div>
	</div>
</div> -->

<!-- <Card.Root>
	<Card.Header>
		<Card.Title>Card Title</Card.Title>
		<Card.Description>Card Description</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>Card Content</p>
	</Card.Content>
	<Card.Footer>
		<p>Card Footer</p>
	</Card.Footer>
</Card.Root> -->


<ul class="flex flex-col gap-2 p-2"> {#each tracks as track (track.id)}
    <li class="flex flex-1 flex-row gap-4 p-2">
      <div
        class="border-cyan-500 border-1 bg-muted/50 flex aspect-video h-12 w-full items-center justify-between gap-y-1 rounded-md"
      >
        <div
          class="my-2 ml-2 w-fit flex-shrink-0 border border-dashed border-slate-500/50 text-right text-sm font-bold text-[#1DB954]"
        >
          {track.number}.
        </div>
        <Separator class="ml-2" orientation="vertical" decorative="true" />

        <div class="flex flex-1 flex-col justify-between gap-y-1 mx-1">
          <div class="flex-grow border border-dashed border-slate-500/50 text-xs font-bold text-white">
            {track.title}
          </div>
          <div class="flex-grow border border-dashed border-slate-500/50 text-xs text-gray-400">
            {track.artist}
          </div>
        </div>

        <Separator class="mr-2" orientation="vertical" decorative="true" />

        <div class="mr-2 size-10 border border-dashed border-orange-500 flex-shrink-0">
          <img src={track.thumbnail} alt={`Thumbnail for ${track.title}`} />
        </div>
      </div>
    </li>
  {/each}
</ul>