<script>
	import { blur, fade } from 'svelte/transition';
	export let pathname = '';
</script>

{#key pathname}
	<div in:fade out:blur>
		<slot />
	</div>
{/key}
