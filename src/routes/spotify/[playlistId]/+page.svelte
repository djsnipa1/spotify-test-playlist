<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import PlaylistCardTest from '$lib/components/PlaylistCardTest.svelte';
	export let data;

	const tracks = data.tracks.map((track, index) => ({
		id: track.id,
		number: index + 1,
		title: track.name,
		artist: track.artist,
		thumbnail: track.thumbnail
	}));
	const playlistName = data.playlistName; // Ensure this is received if you're using it
	const playlistImage = data.playlistImage;
</script>


<hr />

<div class="flex w-full justify-center p-2 font-electrolize">
	<Card.Root class="w-full max-w-sm">
		<Card.Header class="justify-center">
			<div class="flex justify-center">
				{#if playlistImage}
				<img
				src={playlistImage}
				class="mx-auto mb-2 w-1/2 rounded-md object-cover"
				alt="Playlist Cover Art"
				/>
				{/if}
			</div>
			<Card.Title class="mx-auto text-center text-lg font-electoize">{playlistName}</Card.Title>
			<Card.Description class="mx-auto text-sm">Displaying {tracks.length} tracks</Card.Description>
		</Card.Header>
		<Card.Content>
			<!-- <div class="flex overflow-visible"> -->
				<PlaylistCardTest tracks={tracks} />
			<!-- </div> -->
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</div>