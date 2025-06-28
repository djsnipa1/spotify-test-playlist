<script lang="ts">
 import { Button } from "$lib/components/ui/button/index.js";
</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->



<div class="flex justify-center items-center min-h-screen">
  <Button href="/spotify/4ihNP1UPb4UiA15BFfWr6g"
    class="text-xl text-white w-48 font-electrolize h-12 rounded-full bg-spotify  relative overflow-hidden group z-10 duration-1000"
  >
  <span
      class="absolute bg-spotify-200 w-56 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"
    ></span>
    <span
      class="absolute bg-spotify-300 w-56 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"
    ></span>
  Spotify Playlist</Button>
</div>

