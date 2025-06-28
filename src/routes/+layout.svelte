<script>
	import '../app.css';
	import '@fontsource/electrolize';
	import { onMount } from 'svelte';

	let { children } = $props();
	
	onMount(() => {
    document.documentElement.classList.add('dark');
  });
</script>

{@render children()}
