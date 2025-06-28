<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
</script>

<div class="flex flex-1 flex-col gap-4 p-4">
	<div class="bg-muted/50 aspect-video h-12 w-full rounded-lg"></div>
	<div class="bg-muted/50 aspect-video h-12 w-full rounded-lg"></div>
</div>

<!-- <div class="flex h-full items-center justify-between"> -->
<div class="flex flex-1 flex-row gap-4 p-4">
	<div
		class="bg-muted/50 flex aspect-video h-12 w-full items-center justify-between gap-y-1 rounded-md"
	>
		<div
			class="my-2 ml-2 w-1/12 border border-dashed border-slate-500/50 text-right text-sm font-bold text-[#1DB954]"
		>
			100.
        </div>
        <Separator class="mr-2" orientation="vertical" decorative="true" />
		<div class="mx-2 pl-2 flex flex-1 flex-col justify-between gap-y-1">
			<div class="flex-grow border border-dashed border-slate-500/50 text-xs font-bold text-white">
				Flex item 2
			</div>
			<div class="flex-grow border border-dashed border-slate-500/50 text-xs text-gray-400">
				Flex item 2
			</div>
		</div>

		<Separator class="mr-2" orientation="vertical" decorative="true" />
		<div class="my-2 size-10 border border-dashed border-orange-500">
			<img src="https://placehold.co/200" alt="track thumbnail" />
		</div>
	</div>
</div>

<hr />
<ul>
	<li class="flex items-center py-3">
		<!-- <div class="mr-2 w-[30px] text-right text-sm font-bold text-[#1DB954]">{i + 1}.</div> -->
		<div class="ml-4 flex-1">
			<!-- <div class="text-xs font-bold text-white">{item.track.name}</div> -->
			<!-- <div class="text-xs text-gray-400">{item.track.artists.map((a) => a.name).join(', ')}</div> -->
		</div>
	</li>
</ul>
<hr />
<Card.Root>
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
</Card.Root>
